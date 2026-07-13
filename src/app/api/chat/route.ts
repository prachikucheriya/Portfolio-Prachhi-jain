import { NextRequest, NextResponse } from "next/server";
import { buildSystemPrompt } from "@/lib/digitalTwinPrompt";

export const runtime = "nodejs";

const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";
const MODEL = "openai/gpt-oss-120b";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

function isChatMessage(value: unknown): value is ChatMessage {
  if (typeof value !== "object" || value === null) return false;
  const record = value as Record<string, unknown>;
  return (
    (record.role === "user" || record.role === "assistant") &&
    typeof record.content === "string"
  );
}

function siteOrigin(req: NextRequest): string {
  const fromEnv =
    process.env.URL ||
    process.env.DEPLOY_PRIME_URL ||
    process.env.NEXT_PUBLIC_SITE_URL;
  if (fromEnv) return fromEnv.replace(/\/$/, "");

  const host = req.headers.get("x-forwarded-host") || req.headers.get("host");
  const proto = req.headers.get("x-forwarded-proto") || "https";
  if (host) return `${proto}://${host}`;

  return "http://localhost:3000";
}

function extractReply(data: unknown): string | null {
  if (typeof data !== "object" || data === null) return null;
  const message = (
    data as {
      choices?: Array<{ message?: { content?: unknown; reasoning?: unknown } }>;
    }
  ).choices?.[0]?.message;

  if (!message) return null;

  if (typeof message.content === "string" && message.content.trim()) {
    return message.content.trim();
  }

  // Reasoning models occasionally return empty content; avoid hard-failing.
  if (typeof message.reasoning === "string" && message.reasoning.trim()) {
    return message.reasoning.trim();
  }

  return null;
}

export async function POST(req: NextRequest) {
  const apiKey = process.env.OPENROUTER_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      {
        error:
          "Chat is not configured on this deployment. Add OPENROUTER_API_KEY in Netlify Environment variables, then redeploy.",
      },
      { status: 500 }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid request body." },
      { status: 400 }
    );
  }

  const { messages } = (body ?? {}) as { messages?: unknown };

  if (!Array.isArray(messages) || !messages.every(isChatMessage)) {
    return NextResponse.json(
      { error: "Request must include a `messages` array of {role, content}." },
      { status: 400 }
    );
  }

  const trimmedMessages = messages.slice(-20);

  try {
    const upstream = await fetch(OPENROUTER_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": siteOrigin(req),
        "X-Title": "Prachhi Jain - Digital Twin",
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [
          { role: "system", content: buildSystemPrompt() },
          ...trimmedMessages,
        ],
        temperature: 0.6,
        // gpt-oss uses reasoning tokens from this budget; keep headroom for the answer.
        max_tokens: 1200,
        reasoning: { effort: "low" },
      }),
    });

    if (!upstream.ok) {
      const errText = await upstream.text();
      console.error("OpenRouter error:", upstream.status, errText);
      return NextResponse.json(
        {
          error:
            "The digital twin is having trouble responding right now. Please try again shortly.",
        },
        { status: 502 }
      );
    }

    const data = await upstream.json();
    const reply = extractReply(data);

    if (!reply) {
      return NextResponse.json(
        { error: "No response was generated. Please try again." },
        { status: 502 }
      );
    }

    return NextResponse.json({ reply });
  } catch (err) {
    console.error("Chat route error:", err);
    return NextResponse.json(
      { error: "Unexpected error contacting the digital twin." },
      { status: 500 }
    );
  }
}

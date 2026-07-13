"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Bot, MessageCircle, Send, Sparkles, X } from "lucide-react";
import { profile } from "@/data/profile";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const SUGGESTIONS = [
  "What roles are you looking for right now?",
  "Tell me about your solar RMS experience.",
  "Why would you be a good insurance underwriter?",
  "Walk me through your career journey.",
];

const WELCOME_MESSAGE: Message = {
  role: "assistant",
  content: `Hi, I'm ${profile.name}'s digital twin 👋 Ask me anything about my career, skills, or what I'm looking for next.`,
};

export default function DigitalTwinChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, loading, open]);

  useEffect(() => {
    if (open) {
      const t = setTimeout(() => inputRef.current?.focus(), 350);
      return () => clearTimeout(t);
    }
  }, [open]);

  async function sendMessage(text: string) {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    const nextMessages: Message[] = [
      ...messages,
      { role: "user", content: trimmed },
    ];
    setMessages(nextMessages);
    setInput("");
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: nextMessages
            .filter((m) => m !== WELCOME_MESSAGE)
            .map(({ role, content }) => ({ role, content })),
        }),
      });

      const contentType = res.headers.get("content-type") || "";
      const data = contentType.includes("application/json")
        ? await res.json()
        : null;

      if (!res.ok) {
        throw new Error(
          data?.error ||
            (res.status === 404
              ? "Chat API is not available on this deploy. Check Netlify base directory and rebuild."
              : "Something went wrong.")
        );
      }

      if (!data?.reply || typeof data.reply !== "string") {
        throw new Error("Empty reply from the digital twin. Please try again.");
      }

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.reply as string },
      ]);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <motion.button
        onClick={() => setOpen((v) => !v)}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, type: "spring", stiffness: 260, damping: 20 }}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 z-[60] flex items-center gap-2 px-5 py-4 rounded-full bg-accent text-background font-semibold text-sm shadow-[0_10px_40px_rgba(0,153,204,0.35)] hover:bg-accent-dim transition-colors duration-300"
        aria-label={open ? "Close chat" : "Chat with my digital twin"}
      >
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.span
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <X size={18} />
            </motion.span>
          ) : (
            <motion.span
              key="chat"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="flex items-center gap-2"
            >
              <MessageCircle size={18} />
              <span className="hidden sm:inline">Chat with my Digital Twin</span>
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-24 right-6 z-[60] w-[92vw] max-w-sm glass rounded-lg overflow-hidden flex flex-col"
            style={{ height: "min(600px, 70vh)" }}
          >
            <div className="flex items-center gap-3 px-5 py-4 border-b border-border bg-surface-elevated/60">
              <div className="w-9 h-9 rounded-full bg-accent/15 flex items-center justify-center shrink-0">
                <Bot size={18} className="text-accent" />
              </div>
              <div className="min-w-0">
                <p className="font-[family-name:var(--font-syne)] font-semibold text-sm text-foreground truncate">
                  {profile.name}&apos;s Digital Twin
                </p>
                <p className="text-xs text-muted flex items-center gap-1">
                  <Sparkles size={11} className="text-accent" />
                  Ask about my career
                </p>
              </div>
            </div>

            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto px-4 py-4 space-y-3"
            >
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${
                    msg.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[85%] rounded-lg px-4 py-2.5 text-sm leading-relaxed whitespace-pre-wrap ${
                      msg.role === "user"
                        ? "bg-accent text-background rounded-br-sm"
                        : "bg-surface-elevated text-foreground border border-border rounded-bl-sm"
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}

              {loading && (
                <div className="flex justify-start">
                  <div className="bg-surface-elevated border border-border rounded-lg rounded-bl-sm px-4 py-3 flex items-center gap-1.5">
                    {[0, 1, 2].map((i) => (
                      <motion.span
                        key={i}
                        className="w-1.5 h-1.5 rounded-full bg-accent/70"
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{
                          duration: 1.1,
                          repeat: Infinity,
                          delay: i * 0.15,
                        }}
                      />
                    ))}
                  </div>
                </div>
              )}

              {error && (
                <p className="text-xs text-red-500 bg-red-500/5 border border-red-500/20 rounded-sm px-3 py-2">
                  {error}
                </p>
              )}

              {messages.length === 1 && !loading && (
                <div className="pt-2 space-y-2">
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      onClick={() => sendMessage(s)}
                      className="block w-full text-left text-xs text-muted hover:text-accent border border-border hover:border-accent/30 rounded-sm px-3 py-2 transition-colors"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                sendMessage(input);
              }}
              className="flex items-center gap-2 p-3 border-t border-border bg-surface-elevated/40"
            >
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about my career..."
                disabled={loading}
                className="flex-1 bg-background border border-border rounded-full px-4 py-2.5 text-sm text-foreground placeholder:text-muted/50 focus:outline-none focus:border-accent/50 transition-colors disabled:opacity-60"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="w-10 h-10 shrink-0 rounded-full bg-accent text-background flex items-center justify-center hover:bg-accent-dim transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                aria-label="Send message"
              >
                <Send size={16} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

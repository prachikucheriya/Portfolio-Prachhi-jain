import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#08090c",
          borderRadius: 6,
          border: "1px solid rgba(0,229,255,0.3)",
        }}
      >
        <span
          style={{
            fontSize: 18,
            fontWeight: 800,
            color: "#00e5ff",
            fontFamily: "system-ui",
          }}
        >
          P
        </span>
      </div>
    ),
    { ...size }
  );
}

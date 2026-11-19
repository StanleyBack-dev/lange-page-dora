import { ImageResponse } from "next/og";

// Cover shown when the site is shared (WhatsApp, Instagram, LinkedIn, X…).
export const alt = "Dora · O app do seu condomínio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const PILLS = ["Reservas", "Portaria com QR code", "Eventos", "Comunicados"];

export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 72,
        background:
          "radial-gradient(circle at 85% 15%, rgba(255,107,26,0.45), transparent 45%), #0a0a0a",
        color: "#fafafa",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
        <svg width="76" height="76" viewBox="0 0 64 64">
          <rect width="64" height="64" rx="16" fill="#ff6b1a" />
          <circle
            cx="31"
            cy="38"
            r="11"
            fill="none"
            stroke="#0a0a0a"
            strokeWidth="7"
          />
          <rect x="40" y="12" width="7" height="40.5" rx="3.5" fill="#0a0a0a" />
        </svg>
        <div style={{ display: "flex", fontSize: 48, fontWeight: 800 }}>
          dora<span style={{ color: "#ff6b1a" }}>.</span>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <div
          style={{
            display: "flex",
            fontSize: 74,
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: -2,
            maxWidth: 950,
          }}
        >
          O condomínio inteiro organizado em um só app.
        </div>
        <div style={{ display: "flex", gap: 14 }}>
          {PILLS.map((pill) => (
            <div
              key={pill}
              style={{
                display: "flex",
                padding: "10px 22px",
                borderRadius: 999,
                background: "rgba(255,255,255,0.1)",
                fontSize: 26,
                color: "#e7e5e4",
              }}
            >
              {pill}
            </div>
          ))}
        </div>
      </div>
    </div>,
    size,
  );
}

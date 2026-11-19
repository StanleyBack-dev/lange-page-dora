import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// The Dora mark as the iOS home screen icon.
export default function AppleIcon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#ff6b1a",
      }}
    >
      <svg width="140" height="140" viewBox="0 0 64 64">
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
    </div>,
    size,
  );
}

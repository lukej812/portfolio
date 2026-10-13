import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0d121a, #05070b)",
          color: "#43e2ff",
          fontSize: 92,
          fontWeight: 700,
          letterSpacing: -6,
        }}
      >
        LJ
      </div>
    ),
    size,
  );
}

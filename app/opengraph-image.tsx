import { ImageResponse } from "next/og";

import { hero, site } from "@/content/site";

export const alt = `${site.name}, ${site.positioning}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "#05070b",
          backgroundImage:
            "radial-gradient(circle at 85% 10%, rgba(67,226,255,0.32), transparent 45%), radial-gradient(circle at 0% 100%, rgba(79,125,255,0.30), transparent 50%)",
          color: "#edf2f7",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 24, color: "#a3aebd", letterSpacing: 4, textTransform: "uppercase" }}>
          <div style={{ width: 12, height: 12, borderRadius: 999, background: "#2fd9a9" }} />
          UW Informatics &apos;26 · Seattle, WA
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 124, fontWeight: 700, letterSpacing: -5, lineHeight: 1 }}>{site.name}</div>
          <div style={{ marginTop: 28, fontSize: 40, color: "#a3aebd", maxWidth: 900, lineHeight: 1.25 }}>
            {hero.headline}
          </div>
        </div>
        <div style={{ display: "flex", height: 6, width: "100%", borderRadius: 999, background: "linear-gradient(90deg, #43e2ff, #4f7dff 55%, #2fd9a9)" }} />
      </div>
    ),
    size,
  );
}

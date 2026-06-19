import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = `${site.name} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(135deg, #1a1714 0%, #2a241d 100%)",
          padding: "72px",
          fontFamily: "serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 18,
              height: 18,
              borderRadius: 9,
              background: "#b68a4e",
              display: "flex",
            }}
          />
          <div style={{ color: "#faf7f2", fontSize: 34, letterSpacing: 1 }}>LumoCAD</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ color: "#e8a94b", fontSize: 26, marginBottom: 12, letterSpacing: 4 }}>
            LUMINAIRES ARTISANAUX · IMPRIMÉS EN 3D
          </div>
          <div style={{ color: "#faf7f2", fontSize: 76, lineHeight: 1.05, maxWidth: 920 }}>
            La lumière, façonnée à la main.
          </div>
        </div>

        <div style={{ color: "#a99f90", fontSize: 26 }}>
          Design · Éco-conçu · Fabriqué en France
        </div>
      </div>
    ),
    size,
  );
}

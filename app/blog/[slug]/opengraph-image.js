import { ImageResponse } from "next/og";
import { getPostBySlug } from "../../../lib/blog";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({ params }) {
  const post = await getPostBySlug(params.slug);
  const title = post?.title || "CraftedTemplate Blog";
  const cat = post?.categories?.[0]?.title || "";
  const author = post?.author?.name || "";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(135deg, #0ea5e9 0%, #111827 60%)",
          color: "white",
          padding: 48,
          fontSize: 32
        }}
      >
        <div style={{ display: "flex", gap: 12, alignItems: "center", opacity: 0.9, fontSize: 24 }}>
          <div
            style={{
              width: 14, height: 14, borderRadius: 9999, background: "white", display: "inline-block"
            }}
          />
          <span>CraftedTemplate</span>
          {cat ? <span style={{ opacity: 0.8 }}>• {cat}</span> : null}
        </div>

        <div style={{ fontSize: 64, lineHeight: 1.1, fontWeight: 800, letterSpacing: -1, maxWidth: 1000 }}>
          {title}
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ opacity: 0.9, fontSize: 22 }}>{author ? `By ${author}` : ""}</div>
          <div style={{ fontSize: 22, opacity: 0.9 }}>craftedtemplate.com</div>
        </div>
      </div>
    ), { ...size }
  );
}

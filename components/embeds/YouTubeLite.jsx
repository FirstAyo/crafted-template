"use client";
import { useState } from "react";

function parseYouTubeId(input = "") {
  try {
    const u = new URL(input);
    if (u.hostname.includes("youtu.be")) return u.pathname.slice(1);
    if (u.searchParams.get("v")) return u.searchParams.get("v");
    const m = u.pathname.match(/\/embed\/([^/?]+)/);
    return m?.[1] || null;
  } catch {
    // allow passing an ID directly
    return /^[a-zA-Z0-9_-]{6,}$/.test(input) ? input : null;
  }
}

export default function YouTubeLite({
  url,
  id: rawId,
  title = "Video",
  start = 0,
  aspect = "16/9",
}) {
  const id = rawId || parseYouTubeId(url);
  const [play, setPlay] = useState(false);
  if (!id) return null;

  const thumb = `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
  const embed = `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&start=${start}&rel=0`;

  return play ? (
    <div
      className="relative w-full overflow-hidden rounded-xl"
      style={{ aspectRatio: aspect }}
    >
      <iframe
        src={embed}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        loading="lazy"
        referrerPolicy="origin-when-cross-origin"
        className="absolute inset-0 h-full w-full border-0"
      />
    </div>
  ) : (
    <button
      type="button"
      onClick={() => setPlay(true)}
      className="group relative w-full overflow-hidden rounded-xl"
      style={{ aspectRatio: aspect }}
      aria-label={`Play video: ${title}`}
    >
      {/* Use <img> so you don't need next/image domain config */}
      <img
        src={thumb}
        alt=""
        className="h-full w-full object-cover"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-black/30 transition group-hover:bg-black/20" />
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-white/95 shadow-md transition group-hover:scale-105">
          <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            className="h-6 w-6 fill-black"
          >
            <path d="M8 5v14l11-7z" />
          </svg>
        </span>
      </div>
    </button>
  );
}

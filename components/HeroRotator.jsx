"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function HeroRotator({ items = [], intervalMs = 4000 }) {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (!items.length) return;
    const id = setInterval(
      () => setIdx((i) => (i + 1) % items.length),
      intervalMs
    );
    return () => clearInterval(id);
  }, [items.length, intervalMs]);

  if (!items.length) {
    return (
      <div className="aspect-[16/10] w-full rounded-xl bg-gradient-to-br from-zinc-100 to-zinc-200 flex items-center justify-center">
        <div className="text-zinc-500 text-sm">Your template preview here</div>
      </div>
    );
  }

  return (
    <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl">
      {/* Slides */}
      {items.map((it, i) => (
        <div
          key={it.slug ?? i}
          className={`absolute inset-0 transition-opacity duration-700 ${
            i === idx ? "opacity-100" : "opacity-0"
          }`}
          aria-hidden={i !== idx}
        >
          <Image
            src={it.src}
            alt={it.title}
            fill
            className="object-cover"
            sizes="(min-width:1024px) 50vw, 100vw"
            priority={i === 0}
            {...(it.lqip ? { placeholder: "blur", blurDataURL: it.lqip } : {})}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5 flex items-end justify-between">
            <div className="max-w-[80%]">
              <h3 className="text-white text-base md:text-lg font-semibold leading-tight">
                <Link
                  href={`/templates/${it.slug}`}
                  className="hover:underline"
                >
                  {it.title}
                </Link>
              </h3>
            </div>
            <Link
              href={`/templates/${it.slug}`}
              className="hidden md:inline-block rounded-lg bg-white/90 px-3 py-1.5 text-sm font-medium hover:bg-white"
            >
              View
            </Link>
          </div>
        </div>
      ))}

      {/* Dots */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
        {items.map((_, i) => (
          <button
            key={i}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => setIdx(i)}
            className={`h-1.5 w-3 rounded-full transition ${
              i === idx ? "bg-white" : "bg-white/50 hover:bg-white/70"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

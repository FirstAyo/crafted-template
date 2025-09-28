"use client";
import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-zinc-200 bg-white/80 backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="font-bold text-xl tracking-tight">
          Crafted<span className="text-brand">Template</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm text-zinc-700">
          <Link href="/templates" className="hover:text-black">
            Templates
          </Link>
          <Link href="/pricing" className="hover:text-black">
            Pricing
          </Link>
          <Link href="/blog" className="hover:text-black">
            Blog
          </Link>
          <Link href="/hosting-academy" className="hover:text-black">
            Hosting Academy
          </Link>
        </nav>
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden rounded-xl border border-zinc-200 px-3 py-2 text-sm"
        >
          Menu
        </button>
      </div>
      {open && (
        <div className="border-t border-zinc-200 bg-white md:hidden">
          <div className="container py-4 flex flex-col gap-3 text-sm">
            <Link href="/templates" onClick={() => setOpen(false)}>
              Templates
            </Link>
            <Link href="/pricing" onClick={() => setOpen(false)}>
              Pricing
            </Link>
            <Link href="/blog" onClick={() => setOpen(false)}>
              Blog
            </Link>
            <Link
              href="/hosting-academy"
              onClick={() => setOpen(false)}
              className="hover:text-black"
            >
              Hosting Academy
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

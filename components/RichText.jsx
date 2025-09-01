"use client";
import { PortableText } from "@portabletext/react";
import Image from "next/image";

const components = {
  types: {
    image: ({ value }) => {
      const url = value?.asset?._ref ? null : value?.asset?.url;
      if (!url) return null;
      return (
        <div className="my-6 relative aspect-[16/9] bg-zinc-100 rounded-xl overflow-hidden">
          <Image src={url} alt={value?.alt || ""} fill className="object-cover" />
        </div>
      );
    }
  },
  block: {
    h1: ({ children }) => <h1 className="mt-8 text-3xl font-bold">{children}</h1>,
    h2: ({ children }) => <h2 className="mt-8 text-2xl font-bold">{children}</h2>,
    h3: ({ children }) => <h3 className="mt-6 text-xl font-semibold">{children}</h3>,
    normal: ({ children }) => <p className="mt-4 leading-7 text-zinc-800">{children}</p>,
    blockquote: ({ children }) => (
      <blockquote className="mt-6 border-l-4 border-zinc-300 pl-4 italic text-zinc-700">{children}</blockquote>
    ),
  },
  marks: {
    strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    link: ({ value, children }) => (
      <a href={value?.href} className="text-brand hover:text-brand-dark underline" target={value?.href?.startsWith('http') ? '_blank' : undefined}>
        {children}
      </a>
    )
  },
  list: {
    bullet: ({ children }) => <ul className="mt-4 list-disc pl-5 space-y-2">{children}</ul>,
    number: ({ children }) => <ol className="mt-4 list-decimal pl-5 space-y-2">{children}</ol>,
  },
};

export default function RichText({ value }) {
  if (!value) return null;
  return <PortableText value={value} components={components} />;
}

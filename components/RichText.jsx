"use client";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import imageUrlBuilder from "@sanity/image-url";
import YouTubeLite from "./embeds/YouTubeLite";

const builder = imageUrlBuilder({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
});
const urlFor = (src) => builder.image(src).width(1600).url();

/* ----- Code block ----- */
function CodeBlock({ value }) {
  const { language, code, filename } = value || {};
  return (
    <figure className="my-6">
      {(filename || language) && (
        <figcaption className="mb-2 text-xs text-zinc-500">
          {filename || "Code"}
          {language ? ` · ${language}` : ""}
        </figcaption>
      )}
      <pre className="overflow-x-auto rounded-xl bg-zinc-900 p-4 text-sm text-zinc-100">
        <code>{code}</code>
      </pre>
    </figure>
  );
}

/* ----- Table block (robust thead) ----- */
function TableBlock({ value }) {
  const rowsRaw = Array.isArray(value?.rows) ? value.rows : [];
  if (!rowsRaw.length) return null;

  // Normalize row shape: [{cells:[...]}] or [ [...cells] ]
  const rows = rowsRaw.map((r) => (Array.isArray(r) ? { cells: r } : r));

  // Prefer explicit flag from the plugin; otherwise assume first row is header
  const hasHeaderRow =
    typeof value?.hasHeaderRow === "boolean" ? value.hasHeaderRow : true;

  const headRow = hasHeaderRow ? rows[0] : null;
  const bodyRows = hasHeaderRow ? rows.slice(1) : rows;

  const renderCells = (cells, isHeader) => {
    const Tag = isHeader ? "th" : "td";
    return (cells || []).map((cell, i) => {
      const content = cell?.content ?? cell; // string or PT array
      return (
        <Tag
          key={cell?._key || i}
          className={`border border-zinc-300 px-3 py-2 ${
            isHeader ? "font-semibold text-left bg-zinc-50" : "align-top"
          }`}
        >
          {typeof content === "string" ? (
            content
          ) : Array.isArray(content) ? (
            <PortableText value={content} />
          ) : (
            (content?.text ?? String(content ?? ""))
          )}
        </Tag>
      );
    });
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse border border-zinc-300 text-sm">
        {headRow && (
          <thead>
            <tr>{renderCells(headRow.cells, true)}</tr>
          </thead>
        )}
        <tbody>
          {bodyRows.map((row, ri) => (
            <tr key={row?._key || ri}>{renderCells(row.cells, false)}</tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ----- PortableText components map ----- */
const components = {
  types: {
    code: CodeBlock,
    table: TableBlock, // ✅ register table INSIDE types
    image: ({ value }) => {
      const url =
        value?.asset?.url || (value?.asset?._ref ? urlFor(value) : null);
      if (!url) return null;
      return (
        <div className="my-6 relative aspect-[16/9] bg-zinc-100 rounded-xl overflow-hidden">
          <Image
            src={url}
            alt={value?.alt || ""}
            fill
            className="object-cover"
          />
        </div>
      );
    },
    youtube: ({ value }) => (
      <div className="my-6">
        <YouTubeLite
          url={value?.url}
          title={value?.title || "Video tutorial"}
          start={value?.start || 0}
        />
        {value?.caption && (
          <p className="mt-2 text-center text-sm text-zinc-600">
            {value.caption}
          </p>
        )}
      </div>
    ),
  },
  block: {
    h1: ({ children }) => (
      <h1 className="mt-8 text-3xl font-bold">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="mt-8 text-2xl font-bold">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-6 text-xl font-semibold">{children}</h3>
    ),
    normal: ({ children }) => (
      <p className="mt-4 leading-7 text-zinc-800">{children}</p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="mt-6 border-l-4 border-zinc-300 pl-4 italic text-zinc-700">
        {children}
      </blockquote>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold">{children}</strong>
    ),
    em: ({ children }) => <em className="italic">{children}</em>,
    code: ({ children }) => (
      <code className="rounded bg-zinc-100 px-1 py-0.5 text-[0.9em]">
        {children}
      </code>
    ),
    link: ({ value, children }) => (
      <a
        href={value?.href}
        className="text-brand hover:text-brand-dark underline"
        target={
          value?.blank || value?.href?.startsWith("http") ? "_blank" : undefined
        }
        rel={
          value?.blank || value?.href?.startsWith("http")
            ? "noopener noreferrer"
            : undefined
        }
      >
        {children}
      </a>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="mt-4 list-disc pl-5 space-y-2">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="mt-4 list-decimal pl-5 space-y-2">{children}</ol>
    ),
  },
};

export default function RichText({ value }) {
  if (!value) return null;
  return <PortableText value={value} components={components} />;
}

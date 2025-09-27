import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-zinc-200 bg-white">
      <div className="container py-12 grid grid-cols-1 md:grid-cols-4 gap-8 text-sm">
        <div>
          <div className="font-bold text-lg">
            Crafted<span className="text-brand">Template</span>
          </div>
          <p className="mt-3 text-zinc-600">
            Curated templates with docs, demos, and deploy guides.
          </p>
        </div>
        <div>
          <div className="font-semibold">Product</div>
          <ul className="mt-3 space-y-2 text-zinc-700">
            <li>
              <Link href="/templates">Templates</Link>
            </li>
            <li>
              <Link href="/pricing">Pricing</Link>
            </li>
            <li>
              <Link href="/blog">Blog</Link>
            </li>
          </ul>
        </div>
        <div>
          <div className="font-semibold">Company</div>
          <ul className="mt-3 space-y-2 text-zinc-700">
            <li>
              <Link href="/about">About</Link>
            </li>
            <li>
              <Link href="/contact">Contact</Link>
            </li>
          </ul>
        </div>
        <div>
          <div className="font-semibold">Legal</div>
          <ul className="mt-3 space-y-2 text-zinc-700">
            <li>
              <Link href="/terms">Terms</Link>
            </li>
            <li>
              <Link href="/privacy">Privacy</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-zinc-200">
        <div className="container py-6 text-xs text-zinc-600">
          &copy; {new Date().getFullYear()} CraftedTemplate.
        </div>
      </div>
    </footer>
  );
}

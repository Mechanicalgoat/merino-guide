import Link from "next/link";

export default function Header() {
  return (
    <nav className="border-b-4 border-border bg-white/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-black tracking-tight">
          🐑 メリノちゃんのVTuberガイド
        </Link>
        <div className="flex gap-4 text-sm font-bold">
          <Link
            href="/"
            className="hover:text-mint-dark transition-colors"
          >
            記事一覧
          </Link>
          <a
            href="https://merino-kobo.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-mint-dark transition-colors"
          >
            メリノ工房
          </a>
        </div>
      </div>
    </nav>
  );
}

import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-cream border-b-4 border-border">
      {/* 上部アクセントライン（Neubrutalism editorial） */}
      <div className="h-1.5 bg-mint w-full" />
      <nav className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link
          href="/"
          className="font-black text-lg tracking-tight leading-none group"
        >
          <span className="block text-[10px] font-bold text-navy/40 tracking-widest uppercase mb-0.5">
            メリノちゃんの
          </span>
          VTuberガイド
        </Link>

        <div className="flex items-center gap-1">
          <Link
            href="/"
            className="font-black text-sm px-4 py-2 rounded-lg border-2 border-transparent hover:border-border hover:bg-white transition-all"
          >
            記事一覧
          </Link>
          <a
            href="https://merino-kobo.booth.pm"
            target="_blank"
            rel="noopener noreferrer"
            className="font-black text-sm px-4 py-2 bg-mint border-2 border-border rounded-lg shadow-[3px_3px_0_var(--color-border)] hover:bg-mint-dark hover:text-white transition-colors"
          >
            BOOTH
          </a>
        </div>
      </nav>
    </header>
  );
}

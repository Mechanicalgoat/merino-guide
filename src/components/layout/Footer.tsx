import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t-4 border-border bg-white mt-16">
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <p className="font-black text-lg mb-1">🐑 メリノちゃんのVTuberガイド</p>
            <p className="text-sm text-navy/50">
              VTuberを始めたい人のための情報サイト
            </p>
          </div>
          <div className="flex gap-4 text-sm font-bold">
            <a
              href="https://merino-kobo.booth.pm"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-mint-dark transition-colors"
            >
              BOOTH
            </a>
            <a
              href="https://www.nizima.com/Profile/Detail?userId=1066453"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-mint-dark transition-colors"
            >
              nizima
            </a>
            <Link href="/" className="hover:text-mint-dark transition-colors">
              記事一覧
            </Link>
          </div>
        </div>
        <p className="text-xs text-navy/40 text-center mt-6">
          © 2026 メリノ工房 / merino-kobo.com
        </p>
      </div>
    </footer>
  );
}

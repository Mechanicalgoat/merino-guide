import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t-4 border-border bg-navy text-white mt-20">
      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="flex flex-col sm:flex-row justify-between gap-8">

          {/* ブランド */}
          <div>
            <p className="font-black text-xl mb-1 tracking-tight">
              VTuberガイド
            </p>
            <p className="text-xs text-white/40 font-bold tracking-widest uppercase mb-3">
              by Merino-kobo
            </p>
            <p className="text-sm text-white/50 leading-relaxed max-w-xs">
              VTuberを始めたい人のための情報サイト。メリノちゃんがやさしく解説します。
            </p>
          </div>

          {/* リンク */}
          <div className="flex flex-col sm:flex-row gap-8">
            <div>
              <p className="text-xs font-black tracking-widest uppercase text-white/30 mb-3">
                Links
              </p>
              <div className="flex flex-col gap-2">
                <Link href="/" className="text-sm text-white/70 hover:text-white font-bold transition-colors">
                  記事一覧
                </Link>
                <a href="https://merino-kobo.com" target="_blank" rel="noopener noreferrer"
                  className="text-sm text-white/70 hover:text-white font-bold transition-colors">
                  メリノ工房
                </a>
              </div>
            </div>
            <div>
              <p className="text-xs font-black tracking-widest uppercase text-white/30 mb-3">
                Shop
              </p>
              <div className="flex flex-col gap-2">
                <a href="https://merino-kobo.booth.pm" target="_blank" rel="noopener noreferrer"
                  className="text-sm text-white/70 hover:text-white font-bold transition-colors">
                  BOOTH
                </a>
                <a href="https://www.nizima.com/Profile/Detail?userId=1066453" target="_blank" rel="noopener noreferrer"
                  className="text-sm text-white/70 hover:text-white font-bold transition-colors">
                  nizima
                </a>
              </div>
            </div>
          </div>

        </div>

        <div className="border-t border-white/10 mt-8 pt-6 flex items-center justify-between">
          <p className="text-xs text-white/30">© 2026 メリノ工房</p>
          <div className="h-2 w-8 bg-mint rounded-full" />
        </div>
      </div>
    </footer>
  );
}

import Image from "next/image";
import CategoryFilter from "@/components/navigation/CategoryFilter";
import TableOfContents from "@/components/article/TableOfContents";
import type { CategoryKey } from "@/lib/constants";

export default function Sidebar({
  showToc = false,
  currentCategory,
}: {
  showToc?: boolean;
  currentCategory?: CategoryKey;
}) {
  return (
    <aside className="space-y-6">
      {/* 目次（記事ページのみ） */}
      {showToc && <TableOfContents />}

      {/* カテゴリ */}
      <div className="bg-white border-3 border-border rounded-xl p-5 shadow-[4px_4px_0px_0px_var(--color-border)]">
        <p className="font-black text-sm mb-3">📂 カテゴリ</p>
        <CategoryFilter current={currentCategory} />
      </div>

      {/* BOOTH CTA */}
      <a
        href="https://merino-kobo.booth.pm"
        target="_blank"
        rel="noopener noreferrer"
        className="block bg-mint/20 border-3 border-border rounded-xl p-5 shadow-[4px_4px_0px_0px_var(--color-border)] hover:shadow-[2px_2px_0px_0px_var(--color-border)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 border-2 border-border rounded-full overflow-hidden bg-white">
            <Image
              src="/images/merino/merino-recommend.png"
              alt="メリノちゃん"
              width={40}
              height={40}
              className="object-cover"
            />
          </div>
          <p className="font-black text-sm">BOOTH ショップ</p>
        </div>
        <p className="text-xs text-navy/60">
          Live2Dモデル・PSD素材を販売中！
        </p>
      </a>

      {/* nizima CTA */}
      <a
        href="https://www.nizima.com/Profile/Detail?userId=1066453"
        target="_blank"
        rel="noopener noreferrer"
        className="block bg-lavender/20 border-3 border-border rounded-xl p-5 shadow-[4px_4px_0px_0px_var(--color-border)] hover:shadow-[2px_2px_0px_0px_var(--color-border)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
      >
        <p className="font-black text-sm mb-1">🎨 nizima ストア</p>
        <p className="text-xs text-navy/60">
          ぴにおん制作のLive2Dモデルはこちら
        </p>
      </a>
    </aside>
  );
}

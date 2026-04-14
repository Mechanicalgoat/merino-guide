import Image from "next/image";
import { ExternalLink, ShoppingBag, Store } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const CTA_DATA: Record<
  string,
  { label: string; color: string; bg: string; url: string; icon: LucideIcon }
> = {
  booth: {
    label:  "BOOTH",
    color:  "text-teal-600",
    bg:     "bg-mint/20",
    url:    "https://merino-kobo.booth.pm",
    icon:   ShoppingBag,
  },
  nizima: {
    label:  "nizima",
    color:  "text-purple-600",
    bg:     "bg-lavender/20",
    url:    "https://www.nizima.com/Profile/Detail?userId=1066453",
    icon:   Store,
  },
};

export default function CTACard({
  type = "booth",
  title,
  price,
  description,
  href,
  imageUrl,
}: {
  type?: "booth" | "nizima";
  title: string;
  price?: string;
  description?: string;
  /** プラットフォームデフォルト URL を上書きして特定商品へリンク */
  href?: string;
  /** 商品サムネイル画像 URL（省略時はプラットフォームアイコンを表示） */
  imageUrl?: string;
}) {
  const data = CTA_DATA[type] ?? CTA_DATA.booth;
  const Icon = data.icon;
  const url  = href ?? data.url;

  return (
    <div className="my-8 not-prose">
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={`flex items-center gap-5 ${data.bg} border-4 border-border rounded-2xl p-6 shadow-[6px_6px_0px_0px_var(--color-border)] hover:shadow-[3px_3px_0px_0px_var(--color-border)] hover:bg-white transition-all`}
      >
        {/* 商品画像 or プラットフォームアイコン */}
        <div className="shrink-0 w-16 h-16 bg-white border-3 border-border rounded-xl flex items-center justify-center shadow-[2px_2px_0px_0px_var(--color-border)] overflow-hidden">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={title}
              width={64}
              height={64}
              className="w-full h-full object-cover"
            />
          ) : (
            <Icon size={28} aria-hidden="true" className={data.color} />
          )}
        </div>

        <div className="flex-1 min-w-0">
          {/* プラットフォームバッジ */}
          <span className={`inline-block ${data.bg} border-2 border-border rounded-md px-2 py-0.5 text-xs font-black mb-2 ${data.color}`}>
            {data.label}
          </span>
          <p className="font-black text-base leading-snug">{title}</p>
          {description && (
            <p className="text-xs text-navy/60 mt-1 leading-relaxed">{description}</p>
          )}
        </div>

        {/* 価格 + リンクボタン */}
        <div className="shrink-0 text-right flex flex-col items-end gap-2">
          {price && (
            <p className="font-black text-xl text-peach">{price}</p>
          )}
          <div className="flex items-center gap-1 bg-white border-2 border-border rounded-lg px-3 py-1.5 font-black text-xs shadow-[2px_2px_0px_0px_var(--color-border)]">
            詳細を見る
            <ExternalLink size={12} aria-hidden="true" />
          </div>
        </div>
      </a>
    </div>
  );
}

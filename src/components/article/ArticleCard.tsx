import Image from "next/image";
import Link from "next/link";
import { CATEGORIES } from "@/lib/constants";
import type { ArticleFrontmatter } from "@/lib/articles";

/** 記事slug → サムネイル設定（背景写真 + メリノちゃんポーズ） */
const ARTICLE_THUMB: Record<string, { photo: string; merino: string }> = {
  "psd-parts-guide":           { photo: "/images/thumbnails/psd-parts-guide.jpg",           merino: "merino-point"     },
  "vtuber-cost-guide":         { photo: "/images/thumbnails/vtuber-cost-guide.jpg",         merino: "merino-thinking"  },
  "where-to-buy-vtuber-model": { photo: "/images/thumbnails/where-to-buy-vtuber-model.jpg", merino: "merino-recommend" },
};

const FALLBACK_THUMB = { photo: "/images/thumbnails/vtuber-cost-guide.jpg", merino: "merino-explain" };

/** カテゴリカラー → グラデーションの終端色（右側） */
const GRAD_MAP: Record<string, string> = {
  lavender: "to-[#c8b4f8]",
  mint:     "to-[#80e8c8]",
  peach:    "to-[#ffb49a]",
  yellow:   "to-[#ffe066]",
};

export default function ArticleCard({
  frontmatter,
}: {
  frontmatter: ArticleFrontmatter;
}) {
  const category  = CATEGORIES[frontmatter.category];
  const thumb     = ARTICLE_THUMB[frontmatter.slug] ?? FALLBACK_THUMB;
  const gradTo    = GRAD_MAP[category?.color ?? "mint"] ?? GRAD_MAP.mint;
  const merinoSrc = `/images/merino/${thumb.merino}.png`;

  return (
    <Link href={`/articles/${frontmatter.slug}`} className="block group">
      <article className="bg-white border-3 border-border rounded-2xl overflow-hidden shadow-[5px_5px_0_var(--color-border)] group-hover:shadow-[5px_5px_0_var(--color-mint-dark)] transition-shadow duration-150">

        {/* サムネイル：写真背景 + 右側グラデ + メリノちゃん右端（左向き） */}
        <div className="relative h-44 border-b-3 border-border overflow-hidden">

          {/* 背景写真 */}
          <Image
            src={thumb.photo}
            alt=""
            fill
            className="object-cover object-center"
            sizes="(max-width: 768px) 100vw, 400px"
          />

          {/* 右側カテゴリカラーグラデーション */}
          <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-transparent/30 ${gradTo} opacity-80`} />

          {/* メリノちゃん（右端・左向き） */}
          <div className="absolute right-0 bottom-0 w-28 h-36 [transform:scaleX(-1)]">
            <Image
              src={merinoSrc}
              alt={`メリノちゃん（${category?.label ?? ""}）`}
              fill
              className="object-contain object-bottom"
              sizes="112px"
            />
          </div>

          {/* カテゴリバッジ */}
          <span className="absolute top-3 left-3 bg-white/90 text-xs font-black border-2 border-border rounded-md px-2 py-0.5">
            {category?.label ?? frontmatter.category}
          </span>
        </div>

        {/* テキスト */}
        <div className="p-5">
          <p className="text-xs text-navy/40 font-bold mb-2">
            {frontmatter.publishedAt}
          </p>
          <h2 className="text-base font-black leading-snug mb-2 group-hover:underline group-hover:underline-offset-2 decoration-2">
            {frontmatter.title}
          </h2>
          <p className="text-sm text-navy/55 leading-relaxed line-clamp-2">
            {frontmatter.description}
          </p>
        </div>

      </article>
    </Link>
  );
}

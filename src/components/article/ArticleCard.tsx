import Image from "next/image";
import Link from "next/link";
import { CATEGORIES } from "@/lib/constants";
import type { ArticleFrontmatter } from "@/lib/articles";

const BG_MAP: Record<string, string> = {
  lavender: "bg-lavender",
  mint:     "bg-mint",
  peach:    "bg-peach",
  yellow:   "bg-yellow",
};

export default function ArticleCard({
  frontmatter,
}: {
  frontmatter: ArticleFrontmatter;
}) {
  const category  = CATEGORIES[frontmatter.category];
  const bgColor   = BG_MAP[category?.color ?? "mint"] ?? "bg-mint";
  const merinoSrc = `/images/merino/${category?.merino ?? "merino-explain"}.png`;

  return (
    <Link href={`/articles/${frontmatter.slug}`} className="block group">
      <article className="bg-white border-3 border-border rounded-2xl overflow-hidden shadow-[5px_5px_0_var(--color-border)] group-hover:shadow-[5px_5px_0_var(--color-mint-dark)] transition-shadow duration-150">

        {/* サムネイル：カテゴリカラー背景 + カテゴリ別メリノちゃん */}
        <div className={`relative ${bgColor} h-44 border-b-3 border-border overflow-hidden`}>
          <Image
            src={merinoSrc}
            alt={`メリノちゃん（${category?.label ?? ""}）`}
            fill
            className="object-contain object-bottom"
            sizes="(max-width: 768px) 100vw, 400px"
          />
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

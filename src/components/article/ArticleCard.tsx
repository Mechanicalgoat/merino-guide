import Link from "next/link";
import { CATEGORIES } from "@/lib/constants";
import type { ArticleFrontmatter } from "@/lib/articles";

const COLOR_MAP: Record<string, string> = {
  lavender: "bg-lavender",
  mint: "bg-mint",
  peach: "bg-peach",
  yellow: "bg-yellow",
};

export default function ArticleCard({
  frontmatter,
}: {
  frontmatter: ArticleFrontmatter;
}) {
  const category = CATEGORIES[frontmatter.category];
  const bgColor = COLOR_MAP[category?.color ?? "mint"] ?? "bg-mint";

  return (
    <Link href={`/articles/${frontmatter.slug}`} className="block group">
      <article className="bg-white border-4 border-border rounded-2xl overflow-hidden shadow-[6px_6px_0px_0px_var(--color-border)] group-hover:shadow-[3px_3px_0px_0px_var(--color-border)] group-hover:translate-x-[3px] group-hover:translate-y-[3px] transition-all">
        {/* サムネイルプレースホルダー */}
        <div className={`${bgColor} h-40 flex items-center justify-center border-b-4 border-border`}>
          <span className="text-4xl">📖</span>
        </div>
        <div className="p-6">
          <div className="flex items-center gap-2 mb-3">
            <span
              className={`${bgColor} text-xs font-black border-2 border-border rounded-lg px-2 py-0.5`}
            >
              {category?.label ?? frontmatter.category}
            </span>
            <span className="text-xs text-navy/50">
              {frontmatter.publishedAt}
            </span>
          </div>
          <h2 className="text-lg font-black leading-snug mb-2">
            {frontmatter.title}
          </h2>
          <p className="text-sm text-navy/60 leading-relaxed line-clamp-2">
            {frontmatter.description}
          </p>
        </div>
      </article>
    </Link>
  );
}

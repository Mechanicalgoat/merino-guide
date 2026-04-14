import { CATEGORIES } from "@/lib/constants";
import type { ArticleFrontmatter } from "@/lib/articles";
import Breadcrumb from "@/components/navigation/Breadcrumb";

const COLOR_MAP: Record<string, string> = {
  lavender: "bg-lavender",
  mint: "bg-mint",
  peach: "bg-peach",
  yellow: "bg-yellow",
};

export default function ArticleHeader({
  frontmatter,
}: {
  frontmatter: ArticleFrontmatter;
}) {
  const category = CATEGORIES[frontmatter.category];
  const bgColor = COLOR_MAP[category?.color ?? "mint"] ?? "bg-mint";

  return (
    <header className="mb-10">
      <Breadcrumb
        items={[
          {
            label: category?.label ?? frontmatter.category,
            href: `/category/${frontmatter.category}`,
          },
          { label: frontmatter.title },
        ]}
      />

      {/* カテゴリ + 日付 */}
      <div className="flex items-center gap-3 mb-4">
        <span
          className={`${bgColor} text-sm font-black border-3 border-border rounded-lg px-3 py-1`}
        >
          {category?.label ?? frontmatter.category}
        </span>
        <time className="text-sm text-navy/50">{frontmatter.publishedAt}</time>
        {frontmatter.updatedAt &&
          frontmatter.updatedAt !== frontmatter.publishedAt && (
            <span className="text-sm text-navy/50">
              （更新: {frontmatter.updatedAt}）
            </span>
          )}
      </div>

      {/* タイトル */}
      <h1 className="text-3xl sm:text-4xl font-black leading-tight mb-4">
        {frontmatter.title}
      </h1>

      {/* 説明文 */}
      <p className="text-lg text-navy/60 leading-relaxed">
        {frontmatter.description}
      </p>

      {/* タグ */}
      {frontmatter.tags && frontmatter.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-4">
          {frontmatter.tags.map((tag) => (
            <span
              key={tag}
              className="bg-cream border-2 border-border rounded-lg px-3 py-0.5 text-xs font-bold"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      <hr className="border-t-4 border-border mt-8" />
    </header>
  );
}

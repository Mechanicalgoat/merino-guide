import ArticleCard from "./ArticleCard";
import type { Article } from "@/lib/articles";

export default function ArticleList({ articles }: { articles: Article[] }) {
  if (articles.length === 0) {
    return (
      <div className="bg-white border-4 border-border rounded-2xl p-12 text-center shadow-[6px_6px_0px_0px_var(--color-border)]">
        <span className="text-4xl mb-4 block">🐑</span>
        <p className="font-black text-lg">まだ記事がないよ！</p>
        <p className="text-sm text-navy/50 mt-2">
          メリノちゃんが記事を準備中です。お楽しみに！
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {articles.map((article) => (
        <ArticleCard
          key={article.frontmatter.slug}
          frontmatter={article.frontmatter}
        />
      ))}
    </div>
  );
}

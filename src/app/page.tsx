import Image from "next/image";
import { getAllArticles } from "@/lib/articles";
import ArticleList from "@/components/article/ArticleList";
import CategoryFilter from "@/components/navigation/CategoryFilter";

export default function Home() {
  const articles = getAllArticles();

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">

      {/* ── Hero ── OGP画像をそのままバナー表示 */}
      <section className="mb-16">
        <div className="border-4 border-border rounded-2xl overflow-hidden shadow-[6px_6px_0_var(--color-border)]">
          <Image
            src="/images/og/og-default.png"
            alt="メリノちゃんのVTuberガイド"
            width={1200}
            height={630}
            className="w-full h-auto"
            priority
          />
        </div>
      </section>

      {/* ── カテゴリ ── */}
      <section className="mb-10">
        <div className="flex items-center gap-4 mb-4">
          <h2 className="text-sm font-black tracking-widest uppercase text-navy/40">
            Category
          </h2>
          <div className="flex-1 h-px bg-border/20" />
        </div>
        <CategoryFilter />
      </section>

      {/* ── 記事一覧 ── */}
      <section>
        <div className="flex items-center gap-4 mb-6">
          <h2 className="text-2xl font-black">最新の記事</h2>
          <div className="flex-1 h-1 bg-border rounded-full" />
        </div>
        <ArticleList articles={articles} />
      </section>

    </div>
  );
}

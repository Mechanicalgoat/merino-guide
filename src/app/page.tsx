import Image from "next/image";
import { getAllArticles } from "@/lib/articles";
import ArticleList from "@/components/article/ArticleList";
import CategoryFilter from "@/components/navigation/CategoryFilter";

export default function Home() {
  const articles = getAllArticles();

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">

      {/* ── Hero ── editorial × Neubrutalism */}
      <section className="mb-16">
        <div className="bg-white border-4 border-border rounded-2xl overflow-hidden shadow-[6px_6px_0_var(--color-border)]">
          <div className="flex flex-col md:flex-row">

            {/* テキスト左 */}
            <div className="flex-1 p-8 md:p-10">
              {/* 上部カラーライン */}
              <div className="flex gap-1.5 mb-6">
                <span className="h-2 w-8 bg-mint rounded-full border border-border" />
                <span className="h-2 w-4 bg-peach rounded-full border border-border" />
                <span className="h-2 w-6 bg-lavender rounded-full border border-border" />
              </div>

              <p className="text-xs font-black tracking-widest text-navy/40 uppercase mb-3">
                VTuber Starter Guide
              </p>
              <h1 className="text-4xl sm:text-5xl font-black leading-[1.1] mb-5 tracking-tight">
                メリノちゃんの<br />
                <span className="relative inline-block">
                  VTuberガイド
                  <span className="absolute -bottom-1 left-0 w-full h-1.5 bg-mint" />
                </span>
              </h1>
              <p className="text-base text-navy/60 leading-relaxed max-w-sm">
                VTuberを始めたいあなたへ。モデルの選び方から配信のコツまで、メリノちゃんがわかりやすく解説します。
              </p>
            </div>

            {/* キャラ右 */}
            <div className="relative bg-mint/30 border-t-4 md:border-t-0 md:border-l-4 border-border w-full md:w-52 h-48 md:h-auto shrink-0 overflow-hidden">
              <Image
                src="/images/merino/merino-happy.png"
                alt="メリノちゃん"
                fill
                className="object-cover object-top"
                priority
              />
            </div>

          </div>
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

import Image from "next/image";
import { getAllArticles } from "@/lib/articles";
import ArticleList from "@/components/article/ArticleList";
import CategoryFilter from "@/components/navigation/CategoryFilter";

export default function Home() {
  const articles = getAllArticles();

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      {/* ヒーロー */}
      <section className="text-center mb-16">
        <div className="inline-block bg-mint border-4 border-border rounded-2xl px-6 py-2 mb-6 shadow-[4px_4px_0px_0px_var(--color-border)] rotate-[-1deg]">
          <span className="font-bold text-sm">VTuber はじめてガイド</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black mb-4 leading-tight">
          メリノちゃんの<br />VTuberガイド
        </h1>
        <p className="text-lg text-navy/70 max-w-xl mx-auto leading-relaxed">
          VTuberを始めたいあなたへ。<br />
          モデルの選び方から配信のコツまで、メリノちゃんがやさしく解説するよ！
        </p>
        <div className="mt-8 inline-flex items-center gap-3 bg-white border-4 border-border rounded-2xl px-6 py-4 shadow-[4px_4px_0px_0px_var(--color-border)]">
          <div className="w-12 h-12 border-2 border-border rounded-full overflow-hidden bg-white shrink-0">
            <Image
              src="/images/merino/merino-explain.png"
              alt="メリノちゃん"
              width={48}
              height={48}
              className="object-cover"
            />
          </div>
          <p className="text-sm font-bold text-left">
            メリノちゃんがナビゲートするよ！<br />
            <span className="text-navy/50 font-normal">気になる記事をチェックしてね</span>
          </p>
        </div>
      </section>

      {/* カテゴリフィルター */}
      <section className="mb-8">
        <CategoryFilter />
      </section>

      {/* 記事一覧 */}
      <section>
        <h2 className="text-2xl font-black mb-8">
          <span className="bg-yellow border-4 border-border rounded-xl px-5 py-1.5 inline-block shadow-[4px_4px_0px_0px_var(--color-border)]">
            最新の記事
          </span>
        </h2>
        <ArticleList articles={articles} />
      </section>
    </div>
  );
}

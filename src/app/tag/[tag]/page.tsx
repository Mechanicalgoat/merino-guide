import type { Metadata } from "next";
import { getArticlesByTag, getAllTags } from "@/lib/articles";
import ArticleList from "@/components/article/ArticleList";
import Breadcrumb from "@/components/navigation/Breadcrumb";

interface PageProps {
  params: Promise<{ tag: string }>;
}

export function generateStaticParams() {
  return getAllTags().map((tag) => ({ tag: encodeURIComponent(tag) }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { tag } = await params;
  const decoded = decodeURIComponent(tag);
  return {
    title: `#${decoded} の記事一覧`,
    description: `「${decoded}」タグが付いたVTuberガイド記事の一覧です。`,
  };
}

export default async function TagPage({ params }: PageProps) {
  const { tag } = await params;
  const decoded = decodeURIComponent(tag);
  const articles = getArticlesByTag(decoded);

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <Breadcrumb items={[{ label: `#${decoded}` }]} />

      <h1 className="text-3xl font-black mb-8">
        <span className="bg-yellow border-4 border-border rounded-xl px-5 py-1.5 inline-block shadow-[4px_4px_0px_0px_var(--color-border)]">
          #{decoded}
        </span>
      </h1>

      <ArticleList articles={articles} />
    </div>
  );
}

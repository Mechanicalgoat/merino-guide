import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getArticlesByCategory } from "@/lib/articles";
import { CATEGORIES, SITE_NAME, type CategoryKey } from "@/lib/constants";
import ArticleList from "@/components/article/ArticleList";
import CategoryFilter from "@/components/navigation/CategoryFilter";
import Breadcrumb from "@/components/navigation/Breadcrumb";

interface PageProps {
  params: Promise<{ category: string }>;
}

export function generateStaticParams() {
  return Object.keys(CATEGORIES).map((category) => ({ category }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { category } = await params;
  const cat = CATEGORIES[category as CategoryKey];
  if (!cat) return {};
  return {
    title: `${cat.label}の記事一覧`,
    description: `${cat.label}に関するVTuberガイド記事の一覧です。`,
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { category } = await params;
  const cat = CATEGORIES[category as CategoryKey];
  if (!cat) notFound();

  const articles = getArticlesByCategory(category as CategoryKey);

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <Breadcrumb items={[{ label: cat.label }]} />

      <h1 className="text-3xl font-black mb-6">
        <span className="bg-lavender border-4 border-border rounded-xl px-5 py-1.5 inline-block shadow-[4px_4px_0px_0px_var(--color-border)]">
          {cat.label}
        </span>
      </h1>

      <div className="mb-8">
        <CategoryFilter current={category as CategoryKey} />
      </div>

      <ArticleList articles={articles} />
    </div>
  );
}

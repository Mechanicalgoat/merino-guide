import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getArticleBySlug, getArticleSlugs } from "@/lib/articles";
import { SITE_NAME, SITE_URL } from "@/lib/constants";
import ArticleHeader from "@/components/article/ArticleHeader";
import ArticleBody from "@/components/article/ArticleBody";
import Sidebar from "@/components/layout/Sidebar";
import CTABanner from "@/components/cta/CTABanner";
import { ArticleJsonLd } from "@/components/JsonLd";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getArticleSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  try {
    const { frontmatter } = getArticleBySlug(slug);
    return {
      title: frontmatter.title,
      description: frontmatter.description,
      openGraph: {
        title: frontmatter.title,
        description: frontmatter.description,
        type: "article",
        url: `${SITE_URL}/articles/${frontmatter.slug}`,
        siteName: SITE_NAME,
        images: frontmatter.ogImage
          ? [{ url: frontmatter.ogImage, width: 1200, height: 630 }]
          : undefined,
        publishedTime: frontmatter.publishedAt,
        modifiedTime: frontmatter.updatedAt,
      },
      twitter: {
        card: "summary_large_image",
        title: frontmatter.title,
        description: frontmatter.description,
        images: frontmatter.ogImage ? [frontmatter.ogImage] : undefined,
      },
    };
  } catch {
    return {};
  }
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  let article;
  try {
    article = getArticleBySlug(slug);
  } catch {
    notFound();
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <ArticleJsonLd frontmatter={article.frontmatter} />
      <div className="flex gap-10">
        {/* メインコンテンツ */}
        <article className="flex-1 min-w-0">
          <ArticleHeader frontmatter={article.frontmatter} />
          <ArticleBody content={article.content} />
          <CTABanner />
        </article>

        {/* サイドバー（デスクトップのみ） */}
        <div className="hidden lg:block w-64 shrink-0 sticky top-24 self-start">
          <Sidebar showToc currentCategory={article.frontmatter.category} />
        </div>
      </div>
    </div>
  );
}

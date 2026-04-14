import type { MetadataRoute } from "next";
import { getAllArticles } from "@/lib/articles";
import { SITE_URL, CATEGORIES } from "@/lib/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  const articles = getAllArticles();

  const articleEntries: MetadataRoute.Sitemap = articles.map((article) => ({
    url: `${SITE_URL}/articles/${article.frontmatter.slug}`,
    lastModified: article.frontmatter.updatedAt ?? article.frontmatter.publishedAt,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const categoryEntries: MetadataRoute.Sitemap = Object.keys(CATEGORIES).map(
    (key) => ({
      url: `${SITE_URL}/category/${key}`,
      changeFrequency: "weekly",
      priority: 0.6,
    })
  );

  return [
    {
      url: SITE_URL,
      lastModified: new Date().toISOString(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    ...categoryEntries,
    ...articleEntries,
  ];
}

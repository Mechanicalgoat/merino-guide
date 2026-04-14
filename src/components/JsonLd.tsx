import { SITE_URL, SITE_NAME, SITE_DESCRIPTION } from "@/lib/constants";
import type { ArticleFrontmatter } from "@/lib/articles";

export function SiteJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    publisher: {
      "@type": "Organization",
      name: "メリノ工房",
      url: "https://merino-kobo.com",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export function ArticleJsonLd({
  frontmatter,
}: {
  frontmatter: ArticleFrontmatter;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: frontmatter.title,
    description: frontmatter.description,
    datePublished: frontmatter.publishedAt,
    dateModified: frontmatter.updatedAt ?? frontmatter.publishedAt,
    url: `${SITE_URL}/articles/${frontmatter.slug}`,
    image: frontmatter.ogImage
      ? `${SITE_URL}${frontmatter.ogImage}`
      : undefined,
    author: {
      "@type": "Organization",
      name: "メリノ工房",
      url: "https://merino-kobo.com",
    },
    publisher: {
      "@type": "Organization",
      name: "メリノ工房",
      url: "https://merino-kobo.com",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

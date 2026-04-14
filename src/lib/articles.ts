import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { CategoryKey } from "./constants";

const ARTICLES_DIR = path.join(process.cwd(), "content/articles");

export interface ArticleFrontmatter {
  title: string;
  slug: string;
  description: string;
  category: CategoryKey;
  tags: string[];
  publishedAt: string;
  updatedAt?: string;
  thumbnail?: string;
  ogImage?: string;
  merinoMood?: string;
}

export interface Article {
  frontmatter: ArticleFrontmatter;
  content: string;
}

export function getArticleSlugs(): string[] {
  if (!fs.existsSync(ARTICLES_DIR)) return [];
  return fs
    .readdirSync(ARTICLES_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

const SAFE_SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export function getArticleBySlug(slug: string): Article {
  if (!SAFE_SLUG.test(slug)) {
    throw new Error(`Invalid slug: ${slug}`);
  }
  const filePath = path.join(ARTICLES_DIR, `${slug}.mdx`);
  const resolved = path.resolve(filePath);
  if (!resolved.startsWith(path.resolve(ARTICLES_DIR))) {
    throw new Error(`Path traversal detected: ${slug}`);
  }
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);
  return {
    frontmatter: { slug, ...data } as ArticleFrontmatter,
    content,
  };
}

export function getAllArticles(): Article[] {
  const slugs = getArticleSlugs();
  return slugs
    .map((slug) => getArticleBySlug(slug))
    .sort(
      (a, b) =>
        new Date(b.frontmatter.publishedAt).getTime() -
        new Date(a.frontmatter.publishedAt).getTime()
    );
}

export function getArticlesByCategory(category: CategoryKey): Article[] {
  return getAllArticles().filter(
    (a) => a.frontmatter.category === category
  );
}

export function getArticlesByTag(tag: string): Article[] {
  return getAllArticles().filter((a) =>
    a.frontmatter.tags.includes(tag)
  );
}

export function getAllTags(): string[] {
  const tags = new Set<string>();
  getAllArticles().forEach((a) =>
    a.frontmatter.tags.forEach((t) => tags.add(t))
  );
  return Array.from(tags).sort();
}

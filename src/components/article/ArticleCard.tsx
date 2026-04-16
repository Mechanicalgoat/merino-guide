import Image from "next/image";
import Link from "next/link";
import { CATEGORIES } from "@/lib/constants";
import type { ArticleFrontmatter } from "@/lib/articles";

export default function ArticleCard({
  frontmatter,
}: {
  frontmatter: ArticleFrontmatter;
}) {
  const category   = CATEGORIES[frontmatter.category];
  const thumbSrc   = `/images/thumbnails/${frontmatter.slug}.jpg`;

  return (
    <Link href={`/articles/${frontmatter.slug}`} className="block group">
      <article className="bg-white border-3 border-border rounded-2xl overflow-hidden shadow-[5px_5px_0_var(--color-border)] group-hover:shadow-[5px_5px_0_var(--color-mint-dark)] transition-shadow duration-150">

        {/* サムネイル（生成済み画像をそのまま表示） */}
        <div className="relative h-44 border-b-3 border-border overflow-hidden">
          <Image
            src={thumbSrc}
            alt={frontmatter.title}
            fill
            className="object-cover object-center"
            sizes="(max-width: 768px) 100vw, 400px"
          />
        </div>

        {/* テキスト */}
        <div className="p-5">
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-cream text-xs font-black border-2 border-border rounded-md px-2 py-0.5">
              {category?.label ?? frontmatter.category}
            </span>
            <time className="text-xs text-navy/40 font-bold">
              {frontmatter.publishedAt}
            </time>
          </div>
          <h2 className="text-base font-black leading-snug mb-2 group-hover:underline group-hover:underline-offset-2 decoration-2">
            {frontmatter.title}
          </h2>
          <p className="text-sm text-navy/55 leading-relaxed line-clamp-2">
            {frontmatter.description}
          </p>
        </div>

      </article>
    </Link>
  );
}

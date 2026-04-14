import { compileMdxContent } from "@/lib/mdx";

export default async function ArticleBody({ content }: { content: string }) {
  const mdxContent = await compileMdxContent(content);

  return <div className="article-body">{mdxContent}</div>;
}

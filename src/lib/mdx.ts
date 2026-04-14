import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import MerinoNavigator from "@/components/MerinoNavigator";
import Callout from "@/components/mdx/Callout";
import ComparisonTable from "@/components/mdx/ComparisonTable";
import StepGuide from "@/components/mdx/StepGuide";
import AmazonLink from "@/components/mdx/AmazonLink";
import CTACard from "@/components/cta/CTACard";
import CTAInline from "@/components/cta/CTAInline";
import CTABanner from "@/components/cta/CTABanner";

const mdxComponents = {
  MerinoNavigator,
  Callout,
  ComparisonTable,
  StepGuide,
  AmazonLink,
  CTACard,
  CTAInline,
  CTABanner,
};

export async function compileMdxContent(source: string) {
  const { content } = await compileMDX({
    source,
    components: mdxComponents,
    options: {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [
          rehypeSlug,
          [rehypeAutolinkHeadings, { behavior: "wrap" }],
        ],
      },
    },
  });
  return content;
}

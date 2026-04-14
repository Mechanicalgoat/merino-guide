function isValidUrl(url: string): boolean {
  return url.startsWith("https://") || url.startsWith("http://");
}

export default function CTAInline({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  if (!isValidUrl(href)) return null;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1 bg-mint border-2 border-border rounded-lg px-3 py-1 text-sm font-black shadow-[2px_2px_0px_0px_var(--color-border)] hover:shadow-[1px_1px_0px_0px_var(--color-border)] hover:translate-x-[1px] hover:translate-y-[1px] transition-all no-underline not-prose"
    >
      {children} →
    </a>
  );
}

import Link from "next/link";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

export default function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="パンくずリスト" className="text-sm text-navy/50 mb-6 font-bold">
      <ol className="flex flex-wrap items-center gap-1">
        <li>
          <Link href="/" className="hover:text-mint-dark transition-colors">
            トップ
          </Link>
        </li>
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-1">
            <span className="mx-1">›</span>
            {item.href ? (
              <Link
                href={item.href}
                className="hover:text-mint-dark transition-colors"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-navy/70">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

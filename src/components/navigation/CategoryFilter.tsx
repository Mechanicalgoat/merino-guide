import Link from "next/link";
import { CATEGORIES, type CategoryKey } from "@/lib/constants";

const COLOR_MAP: Record<string, string> = {
  lavender: "bg-lavender",
  mint:     "bg-mint",
  peach:    "bg-peach",
  yellow:   "bg-yellow",
};

export default function CategoryFilter({ current }: { current?: CategoryKey }) {
  return (
    <div className="flex flex-wrap gap-2">
      <Link
        href="/"
        className={`border-2 border-border rounded-lg px-4 py-1.5 text-xs font-black transition-colors ${
          !current
            ? "bg-navy text-white"
            : "bg-white hover:bg-navy/5"
        }`}
      >
        すべて
      </Link>
      {(Object.entries(CATEGORIES) as [CategoryKey, (typeof CATEGORIES)[CategoryKey]][]).map(
        ([key, cat]) => {
          const bgActive = COLOR_MAP[cat.color] ?? "bg-mint";
          const isActive = current === key;
          return (
            <Link
              key={key}
              href={`/category/${key}`}
              className={`border-2 border-border rounded-lg px-4 py-1.5 text-xs font-black transition-colors ${
                isActive
                  ? `${bgActive}`
                  : "bg-white hover:bg-navy/5"
              }`}
            >
              {cat.label}
            </Link>
          );
        }
      )}
    </div>
  );
}

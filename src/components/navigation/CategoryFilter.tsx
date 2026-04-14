import Link from "next/link";
import { CATEGORIES, type CategoryKey } from "@/lib/constants";

const COLOR_MAP: Record<string, string> = {
  lavender: "bg-lavender",
  mint: "bg-mint",
  peach: "bg-peach",
  yellow: "bg-yellow",
};

export default function CategoryFilter({
  current,
}: {
  current?: CategoryKey;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      <Link
        href="/"
        className={`border-2 border-border rounded-lg px-3 py-1 text-xs font-black transition-all ${
          !current
            ? "bg-navy text-white shadow-[2px_2px_0px_0px_var(--color-border)]"
            : "bg-white hover:translate-x-[1px] hover:translate-y-[1px]"
        }`}
      >
        すべて
      </Link>
      {(Object.entries(CATEGORIES) as [CategoryKey, (typeof CATEGORIES)[CategoryKey]][]).map(
        ([key, cat]) => {
          const bgColor = COLOR_MAP[cat.color] ?? "bg-mint";
          const isActive = current === key;
          return (
            <Link
              key={key}
              href={`/category/${key}`}
              className={`border-2 border-border rounded-lg px-3 py-1 text-xs font-black transition-all ${
                isActive
                  ? `${bgColor} shadow-[2px_2px_0px_0px_var(--color-border)]`
                  : "bg-white hover:translate-x-[1px] hover:translate-y-[1px]"
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

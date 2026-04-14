"use client";

import { useEffect, useState } from "react";

interface TocItem {
  id: string;
  text: string;
  level: number;
}

export default function TableOfContents() {
  const [headings, setHeadings] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const article = document.querySelector(".article-body");
    if (!article) return;

    const elements = article.querySelectorAll("h2, h3");
    const items: TocItem[] = Array.from(elements)
      .filter((el) => el.id)
      .map((el) => ({
        id: el.id,
        text: el.textContent ?? "",
        level: el.tagName === "H2" ? 2 : 3,
      }));
    setHeadings(items);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((e) => e.isIntersecting);
        if (visible?.target.id) {
          setActiveId(visible.target.id);
        }
      },
      { rootMargin: "-80px 0px -60% 0px", threshold: 0 }
    );

    elements.forEach((el) => {
      if (el.id) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  if (headings.length === 0) return null;

  return (
    <nav
      aria-label="目次"
      className="bg-white border-3 border-border rounded-xl p-5 shadow-[4px_4px_0px_0px_var(--color-border)]"
    >
      <p className="font-black text-sm mb-3">📑 目次</p>
      <ul className="space-y-1.5">
        {headings.map((h) => (
          <li
            key={h.id}
            className={h.level === 3 ? "ml-4" : ""}
          >
            <a
              href={`#${h.id}`}
              className={`block text-xs leading-relaxed py-0.5 transition-colors ${
                activeId === h.id
                  ? "text-mint-dark font-black"
                  : "text-navy/50 hover:text-navy"
              }`}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export const SITE_URL = "https://guide.merino-kobo.com";
export const SITE_NAME = "メリノちゃんのVTuberガイド";
export const SITE_DESCRIPTION =
  "VTuberを始めたい人のための情報サイト。モデルの選び方、必要な機材、ソフトの使い方をメリノちゃんがわかりやすく解説します。";

export const CATEGORIES = {
  model:           { label: "モデル・素材", color: "lavender", merino: "merino-recommend" },
  "getting-started": { label: "はじめかた",   color: "mint",     merino: "merino-explain"   },
  software:        { label: "ソフトウェア", color: "peach",    merino: "merino-thinking"  },
  equipment:       { label: "機材",         color: "yellow",   merino: "merino-point"     },
  management:      { label: "運営",         color: "mint",     merino: "merino-surprise"  },
} as const;

export type CategoryKey = keyof typeof CATEGORIES;

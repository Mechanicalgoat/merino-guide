import Image from "next/image";

export type MoodType = "explain" | "surprise" | "recommend" | "thinking" | "happy" | "point";

/** キャラ画像マッピング
 *  thinking は正面向きの explain を仮使用（横向きポーズで別デザインに見えるため）
 *  → 差し替え素材が届いたら merino-thinking.png を再配置して下記を戻す
 */
const MOOD_IMAGES: Record<MoodType, string> = {
  explain:   "/images/merino/merino-explain.png",
  surprise:  "/images/merino/merino-surprise.png",
  recommend: "/images/merino/merino-recommend.png",
  thinking:  "/images/merino/merino-explain.png",   // TODO: 正面向き thinking 素材に差し替え
  happy:     "/images/merino/merino-happy.png",
  point:     "/images/merino/merino-point.png",
};

/** ムード別：吹き出し上部アクセントバーの色（細いラインで統一感を保ちつつ区別） */
const MOOD_ACCENT: Record<MoodType, string> = {
  explain:   "bg-mint",
  surprise:  "bg-peach",
  recommend: "bg-lavender",
  thinking:  "bg-yellow",
  happy:     "bg-mint",
  point:     "bg-yellow",
};

const MOOD_LABEL: Record<MoodType, string> = {
  explain:   "メリノちゃん",
  surprise:  "メリノちゃん",
  recommend: "メリノちゃん",
  thinking:  "メリノちゃん",
  happy:     "メリノちゃん",
  point:     "メリノちゃん",
};

const MOOD_ALT: Record<MoodType, string> = {
  explain:   "説明するメリノちゃん",
  surprise:  "驚くメリノちゃん",
  recommend: "おすすめするメリノちゃん",
  thinking:  "考えるメリノちゃん",
  happy:     "喜ぶメリノちゃん",
  point:     "ポイントを伝えるメリノちゃん",
};

export default function MerinoNavigator({
  mood = "explain",
  children,
}: {
  mood?: MoodType;
  children: React.ReactNode;
}) {
  const src    = MOOD_IMAGES[mood];
  const alt    = MOOD_ALT[mood];
  const accent = MOOD_ACCENT[mood];
  const label  = MOOD_LABEL[mood];

  return (
    <div className="flex items-end gap-0 my-8 not-prose">

      {/* ── キャラクター ─────────────────────────────────────────
          ・縦長コンテナで全身表示（object-contain object-bottom）
          ・元画像はすでに右向き/正面なのでフリップなし            */}
      <div className="shrink-0 relative w-24 h-36 sm:w-28 sm:h-40">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="112px"
          className="object-contain object-bottom"
        />
      </div>

      {/* ── 吹き出し ──────────────────────────────────────────────
          ・全ムード共通：白地 + 細いアクセントバーのみでムード表現
          ・rounded-bl-none でキャラ側をシャープに → テール代わり
          ・mb-3 でキャラの足元より少し上に浮かせる               */}
      <div className="flex-1 bg-white border-3 border-border rounded-2xl rounded-bl-none mb-3 shadow-[3px_3px_0px_0px_var(--color-border)] overflow-hidden">
        {/* ムード別アクセントバー（上部 3px） */}
        <div className={`h-[3px] w-full ${accent}`} />

        <div className="px-5 py-4">
          {/* 話者ラベル */}
          <p className="text-xs font-black text-navy/35 mb-1.5 tracking-wide">
            {label}
          </p>
          <p className="text-sm sm:text-base leading-relaxed font-bold text-navy">
            {children}
          </p>
        </div>
      </div>

    </div>
  );
}

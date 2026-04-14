import Image from "next/image";

export type MoodType = "explain" | "surprise" | "recommend" | "thinking" | "happy" | "point";

const MOOD_IMAGES: Record<MoodType, string> = {
  explain:   "/images/merino/merino-explain.png",
  surprise:  "/images/merino/merino-surprise.png",
  recommend: "/images/merino/merino-recommend.png",
  thinking:  "/images/merino/merino-thinking.png",
  happy:     "/images/merino/merino-happy.png",
  point:     "/images/merino/merino-point.png",
};

// ムード別吹き出し背景色
const MOOD_BUBBLE: Record<MoodType, string> = {
  explain:   "bg-mint/30 border-mint/60",
  surprise:  "bg-peach/30 border-peach/60",
  recommend: "bg-lavender/30 border-lavender/60",
  thinking:  "bg-yellow/30 border-yellow/60",
  happy:     "bg-mint/30 border-mint/60",
  point:     "bg-yellow/30 border-yellow/60",
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
  const bubble = MOOD_BUBBLE[mood];

  return (
    <div className="flex items-end gap-0 my-8 not-prose">

      {/* ── キャラクター ──────────────────────────────────────
          ・縦長コンテナで全身表示 (object-contain object-bottom)
          ・scaleX(-1) で右向きに反転 → 吹き出し方向へ顔を向ける  */}
      <div className="shrink-0 relative w-24 h-36 sm:w-28 sm:h-40">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="112px"
          className="object-contain object-bottom [transform:scaleX(-1)]"
        />
      </div>

      {/* ── 吹き出し ──────────────────────────────────────────
          ・rounded-bl-none でキャラ側コーナーをシャープに → テール代わり
          ・mb-3 でキャラの足元に合わせて少し浮かせる            */}
      <div
        className={`flex-1 ${bubble} border-3 border-border rounded-2xl rounded-bl-none px-5 py-4 mb-3 shadow-[3px_3px_0px_0px_var(--color-border)]`}
      >
        <span className="sr-only">{`メリノちゃん（${alt}）:`}</span>
        <p className="text-sm sm:text-base leading-relaxed font-bold">
          {children}
        </p>
      </div>

    </div>
  );
}

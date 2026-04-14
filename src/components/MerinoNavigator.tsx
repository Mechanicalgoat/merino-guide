import Image from "next/image";

export type MoodType = "explain" | "surprise" | "recommend" | "thinking" | "happy" | "point";

const MOOD_IMAGES: Record<MoodType, string> = {
  explain: "/images/merino/merino-explain.png",
  surprise: "/images/merino/merino-surprise.png",
  recommend: "/images/merino/merino-recommend.png",
  thinking: "/images/merino/merino-thinking.png",
  happy: "/images/merino/merino-happy.png",
  point: "/images/merino/merino-point.png",
};

const MOOD_ALT: Record<MoodType, string> = {
  explain: "説明するメリノちゃん",
  surprise: "驚くメリノちゃん",
  recommend: "おすすめするメリノちゃん",
  thinking: "考えるメリノちゃん",
  happy: "喜ぶメリノちゃん",
  point: "ポイントを伝えるメリノちゃん",
};

export default function MerinoNavigator({
  mood = "explain",
  children,
}: {
  mood?: MoodType;
  children: React.ReactNode;
}) {
  const src = MOOD_IMAGES[mood];
  const alt = MOOD_ALT[mood];

  return (
    <div className="flex items-start gap-4 my-8 not-prose">
      <div className="shrink-0 w-16 h-16 sm:w-20 sm:h-20 border-3 border-border rounded-full overflow-hidden bg-white shadow-[3px_3px_0px_0px_var(--color-border)]">
        <Image
          src={src}
          alt={alt}
          width={80}
          height={80}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex-1 bg-mint/30 border-3 border-border rounded-2xl rounded-tl-none px-5 py-4 shadow-[3px_3px_0px_0px_var(--color-border)] relative">
        <span className="sr-only">{`メリノちゃん（${alt}）:`}</span>
        <div className="absolute -left-2.5 top-4 w-3 h-3 bg-mint/30 border-l-3 border-b-3 border-border rotate-45" />
        <p className="text-sm sm:text-base leading-relaxed font-bold">
          {children}
        </p>
      </div>
    </div>
  );
}

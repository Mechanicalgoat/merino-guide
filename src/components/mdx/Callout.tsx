export type CalloutType = "point" | "warning" | "tip" | "merino" | "thinking" | "surprise" | "recommend";

const STYLES: Record<CalloutType, { bg: string; border: string; emoji: string; label: string }> = {
  point:     { bg: "bg-yellow/50",   border: "border-yellow",   emoji: "💡", label: "ポイント" },
  warning:   { bg: "bg-peach/50",    border: "border-peach",    emoji: "⚠️", label: "注意" },
  tip:       { bg: "bg-mint/50",     border: "border-mint",     emoji: "✅", label: "ヒント" },
  merino:    { bg: "bg-lavender/30", border: "border-lavender", emoji: "🐑", label: "メリノちゃんメモ" },
  thinking:  { bg: "bg-cream",       border: "border-navy/30",  emoji: "🤔", label: "考えてみると" },
  surprise:  { bg: "bg-peach/30",    border: "border-peach",    emoji: "😲", label: "意外と知らない" },
  recommend: { bg: "bg-mint/30",     border: "border-mint",     emoji: "⭐", label: "おすすめ" },
};

export default function Callout({
  type = "point",
  children,
}: {
  type?: CalloutType;
  children: React.ReactNode;
}) {
  const style = STYLES[type];

  return (
    <div
      role="note"
      aria-label={style.label}
      className={`${style.bg} border-l-4 ${style.border} border-3 border-border rounded-xl px-5 py-4 my-6 not-prose shadow-[3px_3px_0px_0px_var(--color-border)]`}
    >
      <div className="flex items-start gap-3">
        <span className="text-xl shrink-0" aria-hidden="true">{style.emoji}</span>
        <div className="text-sm leading-relaxed">{children}</div>
      </div>
    </div>
  );
}

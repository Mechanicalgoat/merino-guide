import {
  Lightbulb,
  AlertTriangle,
  CheckCircle2,
  MessageCircle,
  HelpCircle,
  Zap,
  Star,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type CalloutType =
  | "point"
  | "warning"
  | "tip"
  | "merino"
  | "thinking"
  | "surprise"
  | "recommend";

const STYLES: Record<
  CalloutType,
  { bg: string; border: string; icon: LucideIcon; iconColor: string; label: string }
> = {
  point:     { bg: "bg-yellow/40",   border: "border-yellow",   icon: Lightbulb,     iconColor: "text-yellow-600", label: "ポイント"        },
  warning:   { bg: "bg-peach/40",    border: "border-peach",    icon: AlertTriangle, iconColor: "text-orange-500", label: "注意"            },
  tip:       { bg: "bg-mint/40",     border: "border-mint",     icon: CheckCircle2,  iconColor: "text-teal-500",   label: "ヒント"          },
  merino:    { bg: "bg-lavender/30", border: "border-lavender", icon: MessageCircle, iconColor: "text-purple-400", label: "メリノちゃんメモ" },
  thinking:  { bg: "bg-cream",       border: "border-navy/30",  icon: HelpCircle,    iconColor: "text-navy/50",    label: "考えてみると"    },
  surprise:  { bg: "bg-peach/30",    border: "border-peach",    icon: Zap,           iconColor: "text-orange-400", label: "意外と知らない"  },
  recommend: { bg: "bg-mint/30",     border: "border-mint",     icon: Star,          iconColor: "text-teal-500",   label: "おすすめ"        },
};

export default function Callout({
  type = "point",
  children,
}: {
  type?: CalloutType;
  children: React.ReactNode;
}) {
  const style = STYLES[type] ?? STYLES.point;
  const Icon  = style.icon;

  return (
    <div
      role="note"
      aria-label={style.label}
      className={`${style.bg} border-l-4 ${style.border} border-3 border-border rounded-xl px-5 py-4 my-6 not-prose shadow-[3px_3px_0px_0px_var(--color-border)]`}
    >
      <div className="flex items-start gap-3">
        <Icon
          size={20}
          aria-hidden="true"
          className={`shrink-0 mt-0.5 ${style.iconColor}`}
        />
        <div className="text-sm leading-relaxed">{children}</div>
      </div>
    </div>
  );
}

/** ステップごとに番号バッジ付きで手順を表示するコンポーネント。
 *  body 内の **text** は太字としてレンダリングされます。
 */

type Step = { title: string; body: string };

/** "**text**" をインライン太字に変換する */
function renderBody(text: string) {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    return part;
  });
}

export default function StepGuide({ steps = [] }: { steps?: Step[] }) {
  if (!steps.length) return null;
  return (
    <div className="my-6 not-prose space-y-3">
      {steps.map((step, i) => (
        <div
          key={i}
          className="flex items-start gap-4 bg-white border-3 border-border rounded-xl p-5 shadow-[3px_3px_0px_0px_var(--color-border)]"
        >
          {/* ステップ番号バッジ */}
          <div className="shrink-0 w-10 h-10 bg-mint border-3 border-border rounded-full flex items-center justify-center font-black text-lg">
            {i + 1}
          </div>

          <div>
            <h4 className="font-black text-base mb-1">{step.title}</h4>
            <div className="text-sm text-navy/70 leading-relaxed">
              {renderBody(step.body)}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

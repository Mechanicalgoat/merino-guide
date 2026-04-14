export default function StepGuide({
  steps,
}: {
  steps: { title: string; description: string }[];
}) {
  return (
    <div className="my-6 not-prose space-y-4">
      {steps.map((step, i) => (
        <div
          key={i}
          className="flex items-start gap-4 bg-white border-3 border-border rounded-xl p-5 shadow-[3px_3px_0px_0px_var(--color-border)]"
        >
          <div className="shrink-0 w-10 h-10 bg-mint border-3 border-border rounded-full flex items-center justify-center font-black text-lg">
            {i + 1}
          </div>
          <div>
            <h4 className="font-black text-base mb-1">{step.title}</h4>
            <p className="text-sm text-navy/70 leading-relaxed">
              {step.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

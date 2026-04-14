export default function AmazonLink({
  asin,
  title,
  price,
}: {
  asin: string;
  title: string;
  price?: string;
}) {
  const safeAsin = asin.replace(/[^A-Z0-9]/gi, "").slice(0, 10);

  return (
    <div className="my-6 not-prose">
      <a
        href={`https://www.amazon.co.jp/dp/${safeAsin}?tag=merinokobo-22`}
        target="_blank"
        rel="nofollow sponsored noopener noreferrer"
        className="flex items-center gap-4 bg-white border-3 border-border rounded-xl p-5 shadow-[4px_4px_0px_0px_var(--color-border)] hover:shadow-[2px_2px_0px_0px_var(--color-border)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
      >
        <div className="shrink-0 text-3xl">📦</div>
        <div className="flex-1 min-w-0">
          <p className="font-black text-sm leading-snug truncate">{title}</p>
          {price && (
            <p className="text-peach font-black text-lg mt-1">{price}</p>
          )}
          <p className="text-xs text-navy/40 mt-1">Amazon.co.jp で見る</p>
        </div>
        <div className="shrink-0 bg-yellow border-2 border-border rounded-lg px-3 py-1.5 font-black text-xs shadow-[2px_2px_0px_0px_var(--color-border)]">
          詳細 →
        </div>
      </a>
    </div>
  );
}

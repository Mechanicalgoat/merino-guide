import Image from "next/image";

const CTA_DATA: Record<string, { label: string; color: string; url: string }> = {
  booth: {
    label: "BOOTH",
    color: "bg-mint",
    url: "https://merino-kobo.booth.pm",
  },
  nizima: {
    label: "nizima",
    color: "bg-lavender",
    url: "https://www.nizima.com/Profile/Detail?userId=1066453",
  },
};

export default function CTACard({
  type = "booth",
  title,
  price,
  description,
}: {
  type?: "booth" | "nizima";
  title: string;
  price?: string;
  description?: string;
}) {
  const data = CTA_DATA[type] ?? CTA_DATA.booth;

  return (
    <div className="my-8 not-prose">
      <a
        href={data.url}
        target="_blank"
        rel="noopener noreferrer"
        className={`block ${data.color}/20 border-4 border-border rounded-2xl overflow-hidden shadow-[6px_6px_0px_0px_var(--color-border)] hover:shadow-[3px_3px_0px_0px_var(--color-border)] hover:translate-x-[3px] hover:translate-y-[3px] transition-all`}
      >
        <div className="p-6 flex items-center gap-4">
          <div className="shrink-0 w-16 h-16 border-3 border-border rounded-xl overflow-hidden bg-white flex items-center justify-center">
            <Image
              src="/images/merino/merino-recommend.png"
              alt="おすすめするメリノちゃん"
              width={56}
              height={56}
              className="object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <span className={`inline-block ${data.color} border-2 border-border rounded-lg px-2 py-0.5 text-xs font-black mb-1`}>
              {data.label}
            </span>
            <p className="font-black text-base leading-snug">{title}</p>
            {description && (
              <p className="text-xs text-navy/60 mt-1">{description}</p>
            )}
          </div>
          {price && (
            <div className="shrink-0 text-right">
              <p className="font-black text-xl text-peach">{price}</p>
              <p className="text-xs text-navy/40">詳細を見る →</p>
            </div>
          )}
        </div>
      </a>
    </div>
  );
}

import Image from "next/image";

export default function CTABanner() {
  return (
    <div className="my-12 not-prose bg-gradient-to-r from-mint/30 to-lavender/30 border-4 border-border rounded-2xl p-8 shadow-[6px_6px_0px_0px_var(--color-border)] text-center">
      <div className="flex items-center justify-center gap-3 mb-4">
        <div className="w-14 h-14 border-3 border-border rounded-full overflow-hidden bg-white shadow-[2px_2px_0px_0px_var(--color-border)]">
          <Image
            src="/images/merino/merino-happy.png"
            alt="メリノちゃん"
            width={56}
            height={56}
            className="object-cover"
          />
        </div>
        <p className="font-black text-lg">メリノちゃんの工房もチェックしてね！</p>
      </div>
      <p className="text-sm text-navy/60 mb-6">
        VTuber向けのLive2Dモデルやパーツ分けPSDを販売中
      </p>
      <div className="flex gap-3 justify-center flex-wrap">
        <a
          href="https://merino-kobo.booth.pm"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-mint border-3 border-border rounded-xl px-6 py-2.5 font-black text-sm shadow-[4px_4px_0px_0px_var(--color-border)] hover:shadow-[2px_2px_0px_0px_var(--color-border)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
        >
          🛒 BOOTH ショップ
        </a>
        <a
          href="https://www.nizima.com/Profile/Detail?userId=1066453"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-lavender border-3 border-border rounded-xl px-6 py-2.5 font-black text-sm shadow-[4px_4px_0px_0px_var(--color-border)] hover:shadow-[2px_2px_0px_0px_var(--color-border)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
        >
          🎨 nizima ストア
        </a>
      </div>
    </div>
  );
}

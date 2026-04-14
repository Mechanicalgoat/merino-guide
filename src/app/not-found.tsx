import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-24 text-center">
      <div className="w-24 h-24 border-4 border-border rounded-full overflow-hidden bg-white shadow-[4px_4px_0px_0px_var(--color-border)] mx-auto mb-8">
        <Image
          src="/images/merino/merino-surprise.png"
          alt="驚くメリノちゃん"
          width={96}
          height={96}
          className="object-cover"
        />
      </div>
      <h1 className="text-4xl font-black mb-4">404</h1>
      <p className="text-lg text-navy/70 mb-8">
        ページが見つからなかったよ…！
      </p>
      <Link
        href="/"
        className="inline-block bg-mint border-4 border-border rounded-xl px-8 py-3 font-black shadow-[4px_4px_0px_0px_var(--color-border)] hover:shadow-[2px_2px_0px_0px_var(--color-border)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
      >
        トップに戻る
      </Link>
    </div>
  );
}

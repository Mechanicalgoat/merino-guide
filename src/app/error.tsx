"use client";

import Link from "next/link";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="max-w-2xl mx-auto px-6 py-24 text-center">
      <span className="text-6xl block mb-6">🐑💦</span>
      <h1 className="text-3xl font-black mb-4">
        エラーが発生しました
      </h1>
      <p className="text-navy/70 mb-8">
        ページの読み込み中にエラーが起きちゃったみたい…
      </p>
      <div className="flex gap-4 justify-center">
        <button
          onClick={reset}
          className="bg-yellow border-4 border-border rounded-xl px-6 py-3 font-black shadow-[4px_4px_0px_0px_var(--color-border)] hover:shadow-[2px_2px_0px_0px_var(--color-border)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
        >
          もう一度試す
        </button>
        <Link
          href="/"
          className="bg-mint border-4 border-border rounded-xl px-6 py-3 font-black shadow-[4px_4px_0px_0px_var(--color-border)] hover:shadow-[2px_2px_0px_0px_var(--color-border)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
        >
          トップに戻る
        </Link>
      </div>
    </div>
  );
}

import Image from "next/image";

export type MoodType =
  // ── 基本（既存） ──────────────────────────
  | "explain"       // 両手広げて説明
  | "happy"         // 笑顔・目閉じ
  | "point"         // 指を上に向ける
  | "recommend"     // ウインク・おすすめ
  | "surprise"      // 驚き
  | "thinking"      // 考える（正面向き）
  // ── 表情追加 ─────────────────────────────
  | "serious"       // 真剣・シリアス
  | "smile"         // 優しい微笑み
  | "laugh"         // 笑い・目閉じ笑顔
  | "worried"       // 心配・不安
  | "angry"         // 怒り
  | "embarrassed"   // 恥ずかしい・照れ
  | "love"          // ハート・ラブ
  | "excited"       // 興奮・テンション高め
  | "cheer"         // バンザイ・大喜び
  | "sad"           // 悲しい
  | "shocked"       // 叫び・大驚き
  | "nervous"       // 緊張・不安
  | "dejected"      // 落ち込み
  | "sideEye"       // 半目・疑い
  // ── ジェスチャー ─────────────────────────
  | "thumbsup"      // サムズアップ
  | "wave"          // 手を振る
  | "peace"         // ダブルピース
  | "ok"            // OKサイン
  | "armsCrossed"   // 腕組み
  | "determined"    // 気合い・ガッツポーズ
  | "stop"          // ストップ
  // ── シチュエーション ──────────────────────
  | "mic"           // マイクを持つ
  | "singing"       // 歌
  | "gaming"        // ゲーミング・PC作業
  | "panic";        // パニック

const MOOD_IMAGES: Record<MoodType, string> = {
  explain:      "/images/merino/merino-explain.png",
  happy:        "/images/merino/merino-happy.png",
  point:        "/images/merino/merino-point.png",
  recommend:    "/images/merino/merino-recommend.png",
  surprise:     "/images/merino/merino-surprise.png",
  thinking:     "/images/merino/merino-thinking.png",
  serious:      "/images/merino/merino-serious.png",
  smile:        "/images/merino/merino-smile.png",
  laugh:        "/images/merino/merino-laugh.png",
  worried:      "/images/merino/merino-worried.png",
  angry:        "/images/merino/merino-angry.png",
  embarrassed:  "/images/merino/merino-embarrassed.png",
  love:         "/images/merino/merino-love.png",
  excited:      "/images/merino/merino-excited.png",
  cheer:        "/images/merino/merino-cheer.png",
  sad:          "/images/merino/merino-sad.png",
  shocked:      "/images/merino/merino-shocked.png",
  nervous:      "/images/merino/merino-nervous.png",
  dejected:     "/images/merino/merino-dejected.png",
  sideEye:      "/images/merino/merino-side-eye.png",
  thumbsup:     "/images/merino/merino-thumbsup.png",
  wave:         "/images/merino/merino-wave.png",
  peace:        "/images/merino/merino-peace.png",
  ok:           "/images/merino/merino-ok.png",
  armsCrossed:  "/images/merino/merino-arms-crossed.png",
  determined:   "/images/merino/merino-determined.png",
  stop:         "/images/merino/merino-stop.png",
  mic:          "/images/merino/merino-mic.png",
  singing:      "/images/merino/merino-singing.png",
  gaming:       "/images/merino/merino-gaming.png",
  panic:        "/images/merino/merino-panic.png",
};

/** ムード別：吹き出し上部アクセントバーの色 */
const MOOD_ACCENT: Record<MoodType, string> = {
  explain:     "bg-mint",
  happy:       "bg-mint",
  point:       "bg-yellow",
  recommend:   "bg-lavender",
  surprise:    "bg-peach",
  thinking:    "bg-yellow",
  serious:     "bg-navy/40",
  smile:       "bg-mint",
  laugh:       "bg-mint",
  worried:     "bg-yellow",
  angry:       "bg-peach",
  embarrassed: "bg-lavender",
  love:        "bg-lavender",
  excited:     "bg-peach",
  cheer:       "bg-mint",
  sad:         "bg-lavender",
  shocked:     "bg-peach",
  nervous:     "bg-yellow",
  dejected:    "bg-navy/20",
  sideEye:     "bg-yellow",
  thumbsup:    "bg-mint",
  wave:        "bg-mint",
  peace:       "bg-mint",
  ok:          "bg-mint",
  armsCrossed: "bg-navy/30",
  determined:  "bg-peach",
  stop:        "bg-peach",
  mic:         "bg-lavender",
  singing:     "bg-lavender",
  gaming:      "bg-mint",
  panic:       "bg-peach",
};

const MOOD_ALT: Record<MoodType, string> = {
  explain:     "説明するメリノちゃん",
  happy:       "笑顔のメリノちゃん",
  point:       "ポイントを伝えるメリノちゃん",
  recommend:   "おすすめするメリノちゃん",
  surprise:    "驚くメリノちゃん",
  thinking:    "考えるメリノちゃん",
  serious:     "真剣なメリノちゃん",
  smile:       "微笑むメリノちゃん",
  laugh:       "笑うメリノちゃん",
  worried:     "心配するメリノちゃん",
  angry:       "怒るメリノちゃん",
  embarrassed: "恥ずかしがるメリノちゃん",
  love:        "ラブなメリノちゃん",
  excited:     "興奮するメリノちゃん",
  cheer:       "大喜びするメリノちゃん",
  sad:         "悲しむメリノちゃん",
  shocked:     "大驚きするメリノちゃん",
  nervous:     "緊張するメリノちゃん",
  dejected:    "落ち込むメリノちゃん",
  sideEye:     "疑うメリノちゃん",
  thumbsup:    "サムズアップするメリノちゃん",
  wave:        "手を振るメリノちゃん",
  peace:       "ピースするメリノちゃん",
  ok:          "OKサインのメリノちゃん",
  armsCrossed: "腕を組むメリノちゃん",
  determined:  "気合いを入れるメリノちゃん",
  stop:        "ストップするメリノちゃん",
  mic:         "マイクを持つメリノちゃん",
  singing:     "歌うメリノちゃん",
  gaming:      "ゲームするメリノちゃん",
  panic:       "パニックなメリノちゃん",
};

export default function MerinoNavigator({
  mood = "explain",
  children,
}: {
  mood?: MoodType;
  children: React.ReactNode;
}) {
  const src    = MOOD_IMAGES[mood] ?? MOOD_IMAGES.explain;
  const alt    = MOOD_ALT[mood]    ?? MOOD_ALT.explain;
  const accent = MOOD_ACCENT[mood] ?? "bg-mint";

  return (
    <div className="flex items-start gap-3 my-8 not-prose">

      {/* ── 丸アイコン ─────────────────────────────────────── */}
      <div className={`shrink-0 relative w-12 h-12 sm:w-14 sm:h-14 rounded-full border-3 border-border ${accent} overflow-hidden shadow-[2px_2px_0px_0px_var(--color-border)]`}>
        <Image
          src={src}
          alt={alt}
          fill
          sizes="56px"
          className="object-cover object-top scale-[1.8] translate-y-[30%]"
        />
      </div>

      {/* ── 吹き出し ──────────────────────────────────────────
          丸い吹き出し + 左上アクセントバー                      */}
      <div className="flex-1 bg-white border-3 border-border rounded-2xl shadow-[3px_3px_0px_0px_var(--color-border)] overflow-hidden">
        <div className={`h-[3px] w-full ${accent}`} />
        <div className="px-5 py-4">
          <span className="text-xs font-black text-navy/35 mb-1.5 tracking-wide block">
            メリノちゃん
          </span>
          <div className="text-sm sm:text-base leading-relaxed font-bold text-navy">
            {children}
          </div>
        </div>
      </div>

    </div>
  );
}

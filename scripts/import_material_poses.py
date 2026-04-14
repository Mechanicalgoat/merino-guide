"""
material/ フォルダの全身立ち絵を上半身クロップして
merino-guide/public/images/merino/ にコピーするスクリプト

処理:
  1. 上部 CROP_RATIO (62%) をクロップ → 足・ブーツを除去
  2. ガイド用ファイル名にリネームして保存

使い方:
  python scripts/import_material_poses.py
"""

from pathlib import Path
from PIL import Image

# ── パス設定 ─────────────────────────────────────────────
ROOT        = Path(__file__).parent.parent
SRC_DIR     = Path("D:/ClaudeCodemovie/merino-video/public/character/material")
DEST_DIR    = ROOT / "public" / "images" / "merino"
CROP_RATIO  = 0.62   # 上部何%を残すか（足・ブーツを切り取る）
CANVAS_W    = 620    # 正規化キャンバス幅（全画像統一）
CANVAS_H    = 720    # 正規化キャンバス高さ（全画像統一）

# ── material名 → ガイド用ファイル名マッピング ─────────────
MAPPING = {
    # 既存6枚を差し替え（material版で統一）
    "merino_presenting":        "merino-explain",       # 両手広げて説明
    "merino_happy":             "merino-happy",         # 笑顔（目を開けたver）
    "merino_pointing_up":       "merino-point",         # 指を上に向ける
    "merino_wink":              "merino-recommend",     # ウインク・おすすめ
    "merino_surprised":         "merino-surprise",      # 驚き
    "merino_thinking":          "merino-thinking",      # 考える（正面向き版に差し替え！）
    # 新規追加
    "merino_neutral":           "merino-serious",       # 真剣・シリアス
    "merino_smile_gentle":      "merino-smile",         # 優しい微笑み
    "merino_smile_eyes_closed": "merino-laugh",         # 目を閉じた笑顔
    "merino_thumbsup":          "merino-thumbsup",      # サムズアップ
    "merino_waving":            "merino-wave",          # 手を振る
    "merino_double_peace":      "merino-peace",         # ダブルピース
    "merino_peace":             "merino-ok",            # ピースサイン
    "merino_arms_crossed":      "merino-arms-crossed",  # 腕組み
    "merino_worried":           "merino-worried",       # 心配
    "merino_angry":             "merino-angry",         # 怒り
    "merino_embarrassed":       "merino-embarrassed",   # 恥ずかしい
    "merino_heart":             "merino-love",          # ハート・ラブ
    "merino_excited":           "merino-excited",       # 興奮・テンション高め
    "merino_laugh":             "merino-cheer",         # 大笑い
    "merino_microphone":        "merino-mic",           # マイクを持つ
    "merino_panic":             "merino-panic",         # パニック
    "merino_sad":               "merino-sad",           # 悲しい
    "merino_scream":            "merino-shocked",       # 叫び・大驚き
    "merino_singing":           "merino-singing",       # 歌
    "merino_skeptical":         "merino-side-eye",      # 半目・疑い
    "merino_stop":              "merino-stop",          # ストップ
    "merino_fistpump":          "merino-determined",    # 気合い・ガッツポーズ
    "merino_gaming":            "merino-gaming",        # ゲーミング・PC作業
    "merino_anxious":           "merino-nervous",       # 不安・緊張
    "merino_dejected":          "merino-dejected",      # 落ち込み
}

# ── チェックリスト（目視確認用） ──────────────────────────
CHECKLIST = """
生成後の目視確認チェックリスト
──────────────────────────────
[ ] 足・ブーツが画像に含まれていない（またはほぼ見えない）
[ ] 顔・頭部が切れていない
[ ] キャラクターが画像下端付近に揃っている
[ ] 透過背景が維持されている（白/黒の塗りつぶしなし）
"""


def crop_upper(img: Image.Image, ratio: float) -> Image.Image:
    """上部 ratio 分をクロップして返す（足・ブーツ除去）"""
    w, h = img.size
    new_h = int(h * ratio)
    return img.crop((0, 0, w, new_h))


def normalize_canvas(img: Image.Image, canvas_w: int, canvas_h: int) -> Image.Image:
    """
    指定キャンバスサイズに正規化する。
    - はみ出す場合はスケールダウン
    - 水平中央・下端揃えで配置
    → object-contain object-bottom 使用時にキャラが全画像で同スケール・同位置になる
    """
    iw, ih = img.size
    scale = min(canvas_w / iw, canvas_h / ih, 1.0)
    if scale < 1.0:
        img = img.resize((int(iw * scale), int(ih * scale)), Image.LANCZOS)
        iw, ih = img.size

    canvas = Image.new("RGBA", (canvas_w, canvas_h), (0, 0, 0, 0))
    paste_x = (canvas_w - iw) // 2   # 水平中央
    paste_y =  canvas_h - ih          # 下端揃え
    canvas.paste(img, (paste_x, paste_y), img)
    return canvas


def main():
    DEST_DIR.mkdir(parents=True, exist_ok=True)
    ok = []
    skipped = []

    for src_name, dest_name in MAPPING.items():
        src_path  = SRC_DIR / f"{src_name}.png"
        dest_path = DEST_DIR / f"{dest_name}.png"

        if not src_path.exists():
            print(f"  [SKIP] {src_name}.png が見つかりません")
            skipped.append(src_name)
            continue

        img        = Image.open(src_path).convert("RGBA")
        cropped    = crop_upper(img, CROP_RATIO)
        normalized = normalize_canvas(cropped, CANVAS_W, CANVAS_H)
        normalized.save(dest_path, "PNG", optimize=True)

        w, h = normalized.size
        print(f"  [OK]   {src_name}.png → {dest_name}.png  ({w}×{h}px)")
        ok.append(dest_name)

    print(f"\n完了: {len(ok)} 枚 → {DEST_DIR}")
    if skipped:
        print(f"スキップ: {skipped}")
    print(CHECKLIST)


if __name__ == "__main__":
    main()

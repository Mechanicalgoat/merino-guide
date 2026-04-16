"""
OGP画像生成スクリプト v3
完全2ゾーン分割レイアウト（テキスト左 / キャラ右）
Neubrutalism: ハードボーダー・シャドウなしテキスト・ベタ色分割
"""
import hashlib
import math
import os
import random
import re
import sys
import yaml
from pathlib import Path

try:
    from PIL import Image, ImageDraw, ImageFont
except ImportError:
    print("pip install Pillow pyyaml")
    sys.exit(1)

ROOT         = Path(__file__).parent.parent
ARTICLES_DIR = ROOT / "content" / "articles"
OUTPUT_DIR   = ROOT / "public" / "images" / "ogp"
MERINO_DIR   = ROOT / "public" / "images" / "merino"

# 記事ごとの固有ポーズプール（スラグハッシュで振り分け）
MERINO_POSE_POOL = [
    "merino-explain",
    "merino-happy",
    "merino-thinking",
    "merino-point",
    "merino-recommend",
    "merino-serious",
    "merino-excited",
    "merino-ok",
    "merino-thumbsup",
    "merino-wave",
    "merino-smile",
    "merino-peace",
    "merino-determined",
    "merino-cheer",
    "merino-mic",
    "merino-surprise",
]

# カテゴリ別フォールバック（frontmatter に merino 指定がない & ハッシュ不使用の場合）
MERINO_BY_CATEGORY = {
    "model":           "merino-recommend",
    "getting-started": "merino-explain",
    "software":        "merino-thinking",
    "equipment":       "merino-point",
    "management":      "merino-surprise",
}

W, H   = 1200, 630
SPLIT  = 680   # 左ゾーン幅（テキスト専用）
BORDER = 6     # 外枠
PAD    = 56    # テキストゾーン内パディング

# ── カラーパレット（全てRGBタプル、透明度なし） ──────────
BG     = (255, 251, 240)   # クリーム
DARK   = ( 26,  26,  46)   # ネイビー（テキスト・ボーダー）
WHITE  = (255, 255, 255)

CAT_COLORS = {
    "model":           (184, 169, 232),  # lavender
    "getting-started": (127, 255, 212),  # mint
    "software":        (255, 179,  71),  # peach
    "equipment":       (255, 224, 102),  # yellow
    "management":      (127, 255, 212),  # mint
}
CAT_LABELS = {
    "model":           "モデル・素材",
    "getting-started": "はじめかた",
    "software":        "ソフトウェア",
    "equipment":       "機材",
    "management":      "運営",
}

# ── フォント ──────────────────────────────────────────────
FONT_PATHS = [
    "C:/Windows/Fonts/NotoSansCJKjp-Bold.otf",
    "C:/Windows/Fonts/YuGothB.ttc",
    "C:/Windows/Fonts/meiryo.ttc",
    "C:/Windows/Fonts/msgothic.ttc",
]
_cache: dict = {}

def f(size: int) -> ImageFont.FreeTypeFont:
    if size not in _cache:
        for p in FONT_PATHS:
            if os.path.exists(p):
                _cache[size] = ImageFont.truetype(p, size)
                break
        else:
            _cache[size] = ImageFont.load_default()
    return _cache[size]

def tw(draw: ImageDraw.ImageDraw, text: str, fnt) -> int:
    bb = draw.textbbox((0, 0), text, font=fnt)
    return bb[2] - bb[0]

def th(draw: ImageDraw.ImageDraw, text: str, fnt) -> int:
    bb = draw.textbbox((0, 0), text, font=fnt)
    return bb[3] - bb[1]


# 行頭禁則文字（行の先頭に置いてはいけない文字）
KINSOKU_START = set("）］｝〉》」』】〕。、・：；？！゛゜ヽヾゝゞ々〒…‥")
# 行末禁則文字（行の末尾に置いてはいけない文字）
KINSOKU_END   = set("（［｛〈《「『【〔")


def px_wrap(draw: ImageDraw.ImageDraw, text: str, fnt,
            max_width: int) -> list[str]:
    """
    ピクセル幅ベースの折り返し（日本語行頭・行末禁則対応）。
    - 英数字トークンは途中で切らない（mid-word break 防止）
    - 行頭禁則: ？！。、・等が行頭に来ないよう前行末に繰り越し
    - 行末禁則: 「（等が行末に来ないよう次行先頭に移動
    """
    tokens = re.findall(r'[A-Za-z0-9]+|.', text)

    lines: list[str] = []
    current = ""

    for token in tokens:
        candidate = current + token
        if tw(draw, candidate, fnt) <= max_width:
            current = candidate
        else:
            if current:
                lines.append(current)
            current = token

    if current:
        lines.append(current)

    # ── 禁則処理 ──────────────────────────────────────────
    # 行頭禁則: 次行先頭が禁則文字なら前行末に繰り越す
    changed = True
    while changed:
        changed = False
        for i in range(1, len(lines)):
            if lines[i] and lines[i][0] in KINSOKU_START:
                move_char = lines[i][0]
                lines[i-1] += move_char
                lines[i]    = lines[i][1:]
                changed = True
        # 行末禁則: 現行末が禁則文字なら次行先頭に移動
        for i in range(len(lines) - 1):
            if lines[i] and lines[i][-1] in KINSOKU_END:
                move_char = lines[i][-1]
                lines[i]   = lines[i][:-1]
                lines[i+1] = move_char + lines[i+1]
                changed = True
        # 空行を除去
        lines = [l for l in lines if l]

    return lines


# ── メリノちゃん読み込み ──────────────────────────────────
def load_merino(category: str = "getting-started", slug: str = "", merino_override: str = "", pose_index: int = -1) -> Image.Image | None:
    if merino_override:
        name = merino_override
    elif pose_index >= 0:
        name = MERINO_POSE_POOL[pose_index % len(MERINO_POSE_POOL)]
    elif slug:
        idx  = int(hashlib.md5(slug.encode()).hexdigest(), 16) % len(MERINO_POSE_POOL)
        name = MERINO_POSE_POOL[idx]
    else:
        name = MERINO_BY_CATEGORY.get(category, "merino-explain")
    path = MERINO_DIR / f"{name}.png"
    if not path.exists():
        path = MERINO_DIR / "merino-explain.png"
    if not path.exists():
        return None
    try:
        img = Image.open(path).convert("RGBA")
        char_zone_w = W - SPLIT - BORDER  # 右ゾーン幅
        # フルハイトでスケール、頭が絶対切れないよう少し余裕を持たせる
        scale = (H - 20) / img.height
        new_w = int(img.width * scale)
        new_h = H - 20
        img = img.resize((new_w, new_h), Image.LANCZOS)
        return img
    except Exception as e:
        print(f"  [warn] {e}")
        return None


# ── カテゴリ別イラスト風背景パターン ─────────────────────
def _darker(col: tuple, amount: int = 35) -> tuple:
    return tuple(max(0, c - amount) for c in col)

def _lighter(col: tuple, amount: int = 40) -> tuple:
    return tuple(min(255, c + amount) for c in col)

def draw_pattern_model(draw: ImageDraw.ImageDraw, col: tuple, x0: int):
    """model — ラベンダー地に輝く星✦とダイヤ◆"""
    rng = random.Random(42)
    bg2 = _lighter(col, 30)
    # グラデーション風：2色帯を交互に
    for row in range(0, H, 60):
        c = bg2 if (row // 60) % 2 == 0 else col
        draw.rectangle([x0, row, W, row + 60], fill=c)
    # 星形（4点）
    dark = _darker(col, 50)
    for _ in range(22):
        cx = rng.randint(x0 + 10, W - 10)
        cy = rng.randint(10, H - 10)
        r  = rng.randint(6, 18)
        pts = []
        for k in range(8):
            angle = math.pi / 4 * k
            rad   = r if k % 2 == 0 else r // 2
            pts.append((cx + rad * math.cos(angle), cy + rad * math.sin(angle)))
        draw.polygon(pts, fill=dark, outline=None)
    # 小さいドット
    for _ in range(30):
        cx = rng.randint(x0 + 5, W - 5)
        cy = rng.randint(5, H - 5)
        r  = rng.randint(3, 7)
        draw.ellipse([cx - r, cy - r, cx + r, cy + r], fill=_darker(col, 30))

def draw_pattern_getting_started(draw: ImageDraw.ImageDraw, col: tuple, x0: int):
    """getting-started — ミント地に浮かぶ丸バブル"""
    rng = random.Random(7)
    draw.rectangle([x0, 0, W, H], fill=col)
    for _ in range(28):
        cx = rng.randint(x0 + 5, W - 5)
        cy = rng.randint(5, H - 5)
        r  = rng.randint(10, 55)
        lgt = _lighter(col, rng.randint(20, 50))
        draw.ellipse([cx - r, cy - r, cx + r, cy + r], fill=lgt, outline=_darker(col, 20), width=2)

def draw_pattern_software(draw: ImageDraw.ImageDraw, col: tuple, x0: int):
    """software — ピーチ地にドット方眼"""
    rng = random.Random(99)
    draw.rectangle([x0, 0, W, H], fill=_lighter(col, 30))
    dot_col = _darker(col, 40)
    step = 28
    for gx in range(x0, W + step, step):
        for gy in range(0, H + step, step):
            draw.ellipse([gx - 3, gy - 3, gx + 3, gy + 3], fill=dot_col)
    # ランダムに大きいドット
    for _ in range(10):
        cx = rng.randint(x0 + 20, W - 20)
        cy = rng.randint(20, H - 20)
        r  = rng.randint(12, 28)
        draw.ellipse([cx - r, cy - r, cx + r, cy + r], fill=_darker(col, 25), outline=None)

def draw_pattern_equipment(draw: ImageDraw.ImageDraw, col: tuple, x0: int):
    """equipment — イエロー地にハーフトーン斜め縞"""
    draw.rectangle([x0, 0, W, H], fill=col)
    stripe = _darker(col, 35)
    width  = 18
    gap    = 36
    for offset in range(-H, W - x0 + H, gap):
        x1 = x0 + offset
        pts = [(x1, 0), (x1 + width, 0), (x1 + width + H, H), (x1 + H, H)]
        draw.polygon(pts, fill=stripe)

def draw_pattern_management(draw: ImageDraw.ImageDraw, col: tuple, x0: int):
    """management — ミント地にコンフェッティ（小矩形・菱形）"""
    rng = random.Random(13)
    draw.rectangle([x0, 0, W, H], fill=col)
    shapes = ["rect", "diamond", "circle"]
    colors = [_darker(col, 50), _darker(col, 30), _lighter(col, 40)]
    for _ in range(40):
        cx  = rng.randint(x0, W)
        cy  = rng.randint(0, H)
        s   = rng.randint(8, 22)
        shp = rng.choice(shapes)
        fc  = rng.choice(colors)
        if shp == "rect":
            angle_off = rng.randint(-15, 15)
            draw.rectangle([cx - s, cy - s // 2, cx + s, cy + s // 2], fill=fc)
        elif shp == "diamond":
            draw.polygon([(cx, cy - s), (cx + s, cy), (cx, cy + s), (cx - s, cy)], fill=fc)
        else:
            draw.ellipse([cx - s // 2, cy - s // 2, cx + s // 2, cy + s // 2], fill=fc)

PATTERN_FUNCS = {
    "model":           draw_pattern_model,
    "getting-started": draw_pattern_getting_started,
    "software":        draw_pattern_software,
    "equipment":       draw_pattern_equipment,
    "management":      draw_pattern_management,
}

def draw_bg_pattern(draw: ImageDraw.ImageDraw, category: str, col: tuple, x0: int):
    fn = PATTERN_FUNCS.get(category, draw_pattern_getting_started)
    fn(draw, col, x0)


# ── Neubrutalism バッジ描画 ──────────────────────────────
def draw_badge(draw: ImageDraw.ImageDraw, x: int, y: int,
               text: str, bg: tuple, fnt) -> int:
    """バッジを描画してバッジ高さを返す"""
    px, py = 14, 8
    bw = tw(draw, text, fnt) + px * 2
    bh = th(draw, text, fnt) + py * 2
    # Neubrutalism ハードシャドウ（オフセット塗りつぶし）
    SHADOW_OFF = 4
    draw.rectangle(
        [x + SHADOW_OFF, y + SHADOW_OFF, x + bw + SHADOW_OFF, y + bh + SHADOW_OFF],
        fill=DARK
    )
    draw.rectangle([x, y, x + bw, y + bh], fill=bg, outline=DARK, width=3)
    draw.text((x + px, y + py), text, font=fnt, fill=DARK)
    return bh + SHADOW_OFF


# ── メイン生成 ────────────────────────────────────────────
def generate_ogp(title: str, category: str, slug: str, merino_override: str = "", pose_index: int = -1) -> Path:
    cat_col   = CAT_COLORS.get(category, (127, 255, 212))
    cat_label = CAT_LABELS.get(category, category)

    img  = Image.new("RGB", (W, H), BG)
    draw = ImageDraw.Draw(img)

    # ─────────────────────────────────────────────────────
    # 右ゾーン：カテゴリ別イラスト風パターン背景
    # ─────────────────────────────────────────────────────
    draw_bg_pattern(draw, category, cat_col, SPLIT)

    # ─────────────────────────────────────────────────────
    # メリノちゃん：右ゾーン中央、ボトムアンカー
    # ─────────────────────────────────────────────────────
    merino = load_merino(category, slug, merino_override, pose_index)
    if merino:
        char_zone_w = W - SPLIT
        # 右ゾーン内で水平中央寄せ
        mx = SPLIT + (char_zone_w - merino.width) // 2
        # はみ出しても左ゾーンに入らないよう最低ライン
        mx = max(mx, SPLIT - 10)
        my = H - merino.height - 10
        img.paste(merino, (mx, my), merino)

    # ─────────────────────────────────────────────────────
    # 縦区切りライン（Neubrutalism：太い実線）
    # ─────────────────────────────────────────────────────
    draw.rectangle([SPLIT - BORDER, 0, SPLIT, H], fill=DARK)

    # ─────────────────────────────────────────────────────
    # 左ゾーン：テキストエリア（クリーム背景は img の初期色）
    # ─────────────────────────────────────────────────────
    draw = ImageDraw.Draw(img)  # 再取得

    # 上部アクセントバー（全幅・カテゴリカラー）— Neobrutalism editorial
    draw.rectangle([0, 0, SPLIT - BORDER, 12], fill=cat_col)
    draw.rectangle([0, 0, SPLIT - BORDER, 12], outline=DARK, width=2)

    # カテゴリバッジ（絵文字なし — ui-ux-pro-max: SVG icons, no emoji）
    badge_y   = PAD
    badge_h   = draw_badge(draw, PAD, badge_y, cat_label, cat_col, f(22))

    # ── タイトル ──────────────────────────────────────────
    avail_w  = SPLIT - BORDER - PAD * 2  # テキスト利用可能幅
    title_y  = badge_y + badge_h + 28
    title_max_y = H - PAD - 96           # サイト名のための余白

    def fit_title(size: int, max_lines: int):
        """ピクセル幅ベース折り返し。全文が max_lines 以内に収まる場合のみ採用。"""
        fnt   = f(size)
        lh    = int(size * 1.20)
        lines = px_wrap(draw, title, fnt, avail_w)
        fits_h = title_y + len(lines) * lh <= title_max_y
        if len(lines) <= max_lines and fits_h:
            return lines, fnt, size, lh
        return None

    result = None
    for size in [80, 72, 64, 56, 48, 40]:
        result = fit_title(size, 3)
        if result:
            break

    if result is None:
        # フォールバック：40pxで強制3行（末尾切り捨て）
        fnt   = f(40)
        lines = px_wrap(draw, title, fnt, avail_w)[:3]
        result = (lines, fnt, 40, int(40 * 1.20))

    lines, title_fnt, title_size, line_h = result

    ty = title_y
    for line in lines:
        draw.text((PAD, ty), line, font=title_fnt, fill=DARK)
        ty += line_h

    # ── 区切り線（下部） ──────────────────────────────────
    divider_y = H - PAD - 52
    draw.rectangle([PAD, divider_y, SPLIT - BORDER - PAD, divider_y + 3], fill=DARK)

    # ── サイト名 ──────────────────────────────────────────
    DARK_MID  = ( 80,  80, 100)   # ネイビー中間色（サイト名用）
    DARK_LIGHT= (140, 140, 160)   # ネイビー薄め（ドメイン用）

    draw.text((PAD, divider_y + 10),
              "メリノちゃんのVTuberガイド",
              font=f(24), fill=DARK_MID)

    draw.text((PAD, divider_y + 38),
              "guide.merino-kobo.com",
              font=f(20), fill=DARK_LIGHT)

    # ─────────────────────────────────────────────────────
    # 外枠（最前面）
    # ─────────────────────────────────────────────────────
    draw.rectangle([0, 0, W - 1, H - 1], outline=DARK, width=BORDER)

    # ── 保存 ──
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    out_path = OUTPUT_DIR / f"{slug}.png"
    img.save(out_path, "PNG", optimize=True)
    print(f"  OK: {out_path.name}")
    return out_path


def parse_frontmatter(mdx_path: Path) -> dict:
    text = mdx_path.read_text(encoding="utf-8")
    if not text.startswith("---"):
        return {}
    end = text.index("---", 3)
    return yaml.safe_load(text[3:end])


def main():
    print("OGP v3 start...\n")
    generated = []
    mdx_list = sorted(ARTICLES_DIR.glob("*.mdx"))
    for i, mdx in enumerate(mdx_list):
        fm       = parse_frontmatter(mdx)
        title    = fm.get("title", mdx.stem)
        category = fm.get("category", "model")
        slug     = mdx.stem
        merino_override = fm.get("merino", "")
        pose_index = i if not merino_override else -1
        print(f"Generating: {slug}  ({MERINO_POSE_POOL[pose_index % len(MERINO_POSE_POOL)] if not merino_override else merino_override})")
        generated.append(generate_ogp(title, category, slug, merino_override, pose_index))
    print(f"\nDone: {len(generated)} images -> {OUTPUT_DIR}")
    return generated


if __name__ == "__main__":
    main()

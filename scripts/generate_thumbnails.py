"""
記事カードサムネイル生成スクリプト
800x450 (16:9) — カテゴリ別イラスト風パターン + メリノちゃん
記事ごとに固有ポーズ（連番割り当て、重複なし）
"""
import hashlib
import math
import os
import random
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
OUTPUT_DIR   = ROOT / "public" / "images" / "thumbnails"
MERINO_DIR   = ROOT / "public" / "images" / "merino"

# OGPと逆順で割り当て → カード一覧でOGPと違うポーズになる
MERINO_POSE_POOL = [
    "merino-wave",
    "merino-cheer",
    "merino-mic",
    "merino-peace",
    "merino-smile",
    "merino-determined",
    "merino-ok",
    "merino-excited",
    "merino-serious",
    "merino-recommend",
    "merino-point",
    "merino-thinking",
    "merino-happy",
    "merino-surprise",
    "merino-thumbsup",
    "merino-explain",
]

W, H   = 800, 450
BORDER = 5
PAD    = 40

BG   = (255, 251, 240)   # クリーム
DARK = ( 26,  26,  46)   # ネイビー

CAT_COLORS = {
    "model":           (184, 169, 232),
    "getting-started": (127, 255, 212),
    "software":        (255, 179,  71),
    "equipment":       (255, 224, 102),
    "management":      (127, 255, 212),
}
CAT_LABELS = {
    "model":           "モデル・素材",
    "getting-started": "はじめかた",
    "software":        "ソフトウェア",
    "equipment":       "機材",
    "management":      "運営",
}

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

def tw(draw, text, fnt):
    bb = draw.textbbox((0, 0), text, font=fnt)
    return bb[2] - bb[0]

def th(draw, text, fnt):
    bb = draw.textbbox((0, 0), text, font=fnt)
    return bb[3] - bb[1]


# ── パターン描画（OGPと共通ロジック、サイズだけ違う） ─────

def _darker(col, amount=35):
    return tuple(max(0, c - amount) for c in col)

def _lighter(col, amount=40):
    return tuple(min(255, c + amount) for c in col)

def draw_pattern_model(draw, col):
    rng = random.Random(42)
    bg2 = _lighter(col, 30)
    for row in range(0, H, 50):
        c = bg2 if (row // 50) % 2 == 0 else col
        draw.rectangle([0, row, W, row + 50], fill=c)
    dark = _darker(col, 50)
    for _ in range(28):
        cx = rng.randint(10, W - 10)
        cy = rng.randint(10, H - 10)
        r  = rng.randint(5, 16)
        pts = []
        for k in range(8):
            angle = math.pi / 4 * k
            rad   = r if k % 2 == 0 else r // 2
            pts.append((cx + rad * math.cos(angle), cy + rad * math.sin(angle)))
        draw.polygon(pts, fill=dark)
    for _ in range(35):
        cx = rng.randint(5, W - 5)
        cy = rng.randint(5, H - 5)
        r  = rng.randint(3, 6)
        draw.ellipse([cx-r, cy-r, cx+r, cy+r], fill=_darker(col, 30))

def draw_pattern_getting_started(draw, col):
    rng = random.Random(7)
    draw.rectangle([0, 0, W, H], fill=col)
    for _ in range(32):
        cx = rng.randint(5, W - 5)
        cy = rng.randint(5, H - 5)
        r  = rng.randint(10, 50)
        lgt = _lighter(col, rng.randint(20, 50))
        draw.ellipse([cx-r, cy-r, cx+r, cy+r], fill=lgt, outline=_darker(col, 20), width=2)

def draw_pattern_software(draw, col):
    rng = random.Random(99)
    draw.rectangle([0, 0, W, H], fill=_lighter(col, 30))
    dot_col = _darker(col, 40)
    step = 24
    for gx in range(0, W + step, step):
        for gy in range(0, H + step, step):
            draw.ellipse([gx-3, gy-3, gx+3, gy+3], fill=dot_col)
    for _ in range(12):
        cx = rng.randint(20, W - 20)
        cy = rng.randint(20, H - 20)
        r  = rng.randint(10, 24)
        draw.ellipse([cx-r, cy-r, cx+r, cy+r], fill=_darker(col, 25))

def draw_pattern_equipment(draw, col):
    draw.rectangle([0, 0, W, H], fill=col)
    stripe = _darker(col, 35)
    width  = 16
    gap    = 32
    for offset in range(-H, W + H, gap):
        pts = [(offset, 0), (offset + width, 0),
               (offset + width + H, H), (offset + H, H)]
        draw.polygon(pts, fill=stripe)

def draw_pattern_management(draw, col):
    rng = random.Random(13)
    draw.rectangle([0, 0, W, H], fill=col)
    colors = [_darker(col, 50), _darker(col, 30), _lighter(col, 40)]
    shapes = ["rect", "diamond", "circle"]
    for _ in range(45):
        cx  = rng.randint(0, W)
        cy  = rng.randint(0, H)
        s   = rng.randint(7, 20)
        shp = rng.choice(shapes)
        fc  = rng.choice(colors)
        if shp == "rect":
            draw.rectangle([cx-s, cy-s//2, cx+s, cy+s//2], fill=fc)
        elif shp == "diamond":
            draw.polygon([(cx, cy-s), (cx+s, cy), (cx, cy+s), (cx-s, cy)], fill=fc)
        else:
            draw.ellipse([cx-s//2, cy-s//2, cx+s//2, cy+s//2], fill=fc)

PATTERN_FUNCS = {
    "model":           draw_pattern_model,
    "getting-started": draw_pattern_getting_started,
    "software":        draw_pattern_software,
    "equipment":       draw_pattern_equipment,
    "management":      draw_pattern_management,
}


# ── メリノちゃん読み込み ──────────────────────────────────

def load_merino(pose_name: str, target_h: int) -> Image.Image | None:
    path = MERINO_DIR / f"{pose_name}.png"
    if not path.exists():
        path = MERINO_DIR / "merino-explain.png"
    if not path.exists():
        return None
    try:
        img   = Image.open(path).convert("RGBA")
        scale = target_h / img.height
        new_w = int(img.width * scale)
        new_h = target_h
        return img.resize((new_w, new_h), Image.LANCZOS)
    except Exception as e:
        print(f"  [warn] {e}")
        return None


# ── バッジ描画 ────────────────────────────────────────────

def draw_badge(draw, x, y, text, bg, fnt):
    px, py = 12, 6
    bw = tw(draw, text, fnt) + px * 2
    bh = th(draw, text, fnt) + py * 2
    SHAD = 3
    draw.rectangle([x+SHAD, y+SHAD, x+bw+SHAD, y+bh+SHAD], fill=DARK)
    draw.rectangle([x, y, x+bw, y+bh], fill=bg, outline=DARK, width=2)
    draw.text((x+px, y+py), text, font=fnt, fill=DARK)


# ── メイン生成 ────────────────────────────────────────────

def generate_thumbnail(title: str, category: str, slug: str,
                       pose_name: str) -> Path:
    col       = CAT_COLORS.get(category, (127, 255, 212))
    cat_label = CAT_LABELS.get(category, category)

    img  = Image.new("RGB", (W, H), BG)
    draw = ImageDraw.Draw(img)

    # ── 全面パターン背景 ──────────────────────────────────
    fn = PATTERN_FUNCS.get(category, draw_pattern_getting_started)
    fn(draw, col)

    # ── 左半分にクリーム半透明オーバーレイ（テキスト読みやすさ確保）──
    SPLIT = W // 2 + 20
    overlay = Image.new("RGBA", (SPLIT, H), (255, 251, 240, 210))
    img.paste(Image.new("RGB", (SPLIT, H), BG),
              (0, 0),
              overlay)

    draw = ImageDraw.Draw(img)

    # ── 縦区切り線 ────────────────────────────────────────
    draw.rectangle([SPLIT - BORDER, 0, SPLIT, H], fill=DARK)

    # ── テキストレイアウト計算（センター配置） ────────────
    BADGE_H   = 35          # バッジ高さ概算
    BADGE_GAP = 18          # バッジ〜タイトル間隔
    avail_w   = SPLIT - BORDER - PAD * 2

    def fit_title(size, max_lines):
        fnt   = f(size)
        lh    = int(size * 1.25)
        lines = []
        cur   = ""
        for ch in title:
            cand = cur + ch
            bb   = draw.textbbox((0, 0), cand, font=fnt)
            if (bb[2] - bb[0]) <= avail_w:
                cur = cand
            else:
                if cur:
                    lines.append(cur)
                cur = ch
        if cur:
            lines.append(cur)
        if len(lines) <= max_lines:
            return lines, fnt, lh
        return None

    result = None
    for size in [52, 44, 36, 30, 24]:
        result = fit_title(size, 4)
        if result:
            break

    lines, title_fnt, lh = result or ([""], f(24), 30)
    title_block_h = len(lines) * lh

    # バッジ + ギャップ + タイトルを縦センター
    total_h  = BADGE_H + BADGE_GAP + title_block_h
    start_y  = (H - total_h) // 2

    # ── カテゴリバッジ ────────────────────────────────────
    draw_badge(draw, PAD, start_y, cat_label, col, f(18))

    # ── タイトル ──────────────────────────────────────────
    ty = start_y + BADGE_H + BADGE_GAP
    for line in lines:
        draw.text((PAD, ty), line, font=title_fnt, fill=DARK)
        ty += lh

    # ── メリノちゃん（左向き・右ゾーン中央・下に少しはみ出し） ──
    merino = load_merino(pose_name, H - 10)
    if merino:
        # 左向きに反転
        merino = merino.transpose(Image.Transpose.FLIP_LEFT_RIGHT)
        right_zone_w = W - SPLIT
        mx = SPLIT + (right_zone_w - merino.width) // 2
        mx = max(mx, SPLIT + 5)
        # 下に30px余分にはみ出させて「地面に立っている」感
        my = H - merino.height + 30
        img.paste(merino, (mx, my), merino)

    # ── 外枠 ──────────────────────────────────────────────
    draw = ImageDraw.Draw(img)
    draw.rectangle([0, 0, W-1, H-1], outline=DARK, width=BORDER)

    # ── 保存（JPG） ───────────────────────────────────────
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    out_path = OUTPUT_DIR / f"{slug}.jpg"
    img.convert("RGB").save(out_path, "JPEG", quality=92, optimize=True)
    print(f"  OK: {out_path.name}  ({pose_name})")
    return out_path


def parse_frontmatter(mdx_path: Path) -> dict:
    text = mdx_path.read_text(encoding="utf-8")
    if not text.startswith("---"):
        return {}
    end = text.index("---", 3)
    return yaml.safe_load(text[3:end])


def main():
    print("Thumbnail generator start...\n")
    generated = []
    mdx_list = sorted(ARTICLES_DIR.glob("*.mdx"))
    for i, mdx in enumerate(mdx_list):
        fm       = parse_frontmatter(mdx)
        title    = fm.get("title", mdx.stem)
        category = fm.get("category", "model")
        slug     = mdx.stem
        # frontmatterに merino: 指定があれば優先
        merino_fm = fm.get("merino", "")
        pose_name = merino_fm if merino_fm else MERINO_POSE_POOL[i % len(MERINO_POSE_POOL)]
        print(f"Generating: {slug}")
        generated.append(generate_thumbnail(title, category, slug, pose_name))
    print(f"\nDone: {len(generated)} thumbnails -> {OUTPUT_DIR}")


if __name__ == "__main__":
    main()

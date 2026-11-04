"""Source images -> optimised WebP under public/.

    python -I scripts/optimize-images.py

Sources (committed): assets/generated/ (ChatGPT renders), assets/old-site/
(client photography and facade renders from the previous site), assets/client/
(client's own factory and site photography), assets/keyframes/.
"""
from pathlib import Path
from PIL import Image, ImageEnhance, ImageOps

ROOT = Path(__file__).resolve().parent.parent
GEN = ROOT / 'assets' / 'generated'
OLD = ROOT / 'assets' / 'old-site'
CLIENT = ROOT / 'assets' / 'client'
PUB = ROOT / 'public'


def save(src: Path, dst: Path, max_w: int, q: int = 82, crop=None):
    im = Image.open(src)
    im = im.convert('RGBA' if im.mode in ('RGBA', 'LA', 'P') and 'A' in im.getbands() else 'RGB')
    if crop:
        im = im.crop(crop(im))
    if im.width > max_w:
        im = im.resize((max_w, round(im.height * max_w / im.width)), Image.LANCZOS)
    dst.parent.mkdir(parents=True, exist_ok=True)
    im.save(dst, 'WEBP', quality=q, method=6)
    print(f'{dst.relative_to(ROOT)}  {im.width}x{im.height}  {dst.stat().st_size // 1024}KB')


def main():
    # Stone textures for the 3D slab + swatches
    for name in ['calacatta', 'blackgold', 'emerald', 'travertine', 'azul']:
        src = GEN / f'rm-tex-{name}.png'
        if src.exists():
            save(src, PUB / 'img' / 'stone' / f'{name}.webp', 1024, 86)

    # Service / editorial photography
    services = {
        'kitchen': 'rm-svc-kitchen.png',
        'bathroom': 'rm-svc-bathroom.png',
        'facade': 'rm-svc-facade.png',
        'factory': 'rm-svc-factory.png',
        'stair': 'rm-svc-stair.png',
        'mosaic': 'rm-svc-mosaic.png',
        'hall': 'rm-kf-desktop-end.png',
        'slabs': 'rm-kf-desktop-mid.png',
        'block': 'rm-kf-desktop-start.png',
    }
    for out, name in services.items():
        src = GEN / name
        if src.exists():
            save(src, PUB / 'img' / 'services' / f'{out}.webp', 1600, 80)

    # Materials page: each stone in use (ChatGPT renders); the flat textures above feed the 3D slab on home.
    for name in ['calacatta', 'nero', 'emerald', 'travertine', 'azul']:
        src = GEN / f'rm-mat-{name}.png'
        if src.exists():
            save(src, PUB / 'img' / 'materials' / f'{name}.webp', 1024, 82)
    extra = {
        GEN / 'rm-svc-stair-floating.png': PUB / 'img' / 'services' / 'stair-floating.webp',
        GEN / 'rm-projects-hero.png': PUB / 'img' / 'projects' / 'hero.webp',
        GEN / 'rm-svc-hero.png': PUB / 'img' / 'services' / 'hero.webp',
        OLD / 'hero-slabs.webp': PUB / 'img' / 'services' / 'slab-trio.webp',
        OLD / 'slab-carrara.webp': PUB / 'img' / 'stone' / 'carrara-slab.webp',
    }
    for src, dst in extra.items():
        if src.exists():
            save(src, dst, 1600, 80)

    # Polished marble objects for the home stat cards: true-alpha cutouts, kept transparent.
    for name in ['sphere', 'cube', 'discs', 'arch']:
        src = GEN / f'rm-obj-{name}.png'
        if src.exists():
            im = Image.open(src).convert('RGBA')
            im = im.crop(im.getbbox())
            im.thumbnail((420, 420), Image.LANCZOS)
            dst = PUB / 'img' / 'objects' / f'{name}.webp'
            dst.parent.mkdir(parents=True, exist_ok=True)
            im.save(dst, 'WEBP', quality=86, method=6)
            print(f'{dst.relative_to(ROOT)}  {im.width}x{im.height}  {dst.stat().st_size // 1024}KB')

    # Project photography from the previous site
    for src in sorted(OLD.iterdir()):
        stem = src.stem
        if stem.startswith(('fx', 'rockany', 'slab-', 'logo', 'icon', 'apple', 'hero-')):
            continue
        save(src, PUB / 'img' / 'projects' / f'{stem}.webp', 1400, 80)

    # Client photography from the Drive shoot (factory + finished sites).
    # Shot flat on site, so a light auto-contrast and a touch of warmth bring
    # them in line with the renders without looking filtered.
    for src in sorted(CLIENT.glob('*.jpg')):
        im = ImageOps.exif_transpose(Image.open(src)).convert('RGB')
        im = ImageOps.autocontrast(im, cutoff=0.6, preserve_tone=True)
        im = ImageEnhance.Color(im).enhance(1.06)
        r, g, b = im.split()
        im = Image.merge('RGB', (r.point(lambda v: min(255, round(v * 1.025))), g, b.point(lambda v: round(v * 0.975))))
        tmp = ROOT / '.tmp-client.png'
        im.save(tmp)
        save(tmp, PUB / 'img' / 'work' / f'{src.stem}.webp', 1600 if im.width >= im.height else 1067, 80)
        tmp.unlink()

    # Facade system renders
    for code, fx in {'sa6': 'sa6', 'ca': 'ca', 'ra': 'ra', 'uc': 'uc'}.items():
        save(OLD / f'fx-{fx}.webp', PUB / 'img' / 'facade' / f'{code}.webp', 1100, 84)
        save(OLD / f'fxd-{fx}.webp', PUB / 'img' / 'facade' / f'{code}-detail.webp', 520, 84)

    # Brand: mark (top of the logo, above the script), favicons.
    # assets/brand/logo-gold-clean.png is the old-site logo with its white matte
    # fringe and scan-line streaks removed, at 2x; it is the source of truth.
    clean = ROOT / 'assets' / 'brand' / 'logo-gold-clean.png'
    if clean.exists():
        im = Image.open(clean)
        im.save(PUB / 'brand' / 'logo-gold.png', optimize=True)
        im.resize((600, round(im.height * 600 / im.width)), Image.LANCZOS).save(PUB / 'brand' / 'logo-gold.webp', 'WEBP', quality=90, method=6)
    logo = PUB / 'brand' / 'logo-gold.png'
    if logo.exists():
        for tone in ['gold', 'ink']:
            im = Image.open(PUB / 'brand' / f'logo-{tone}.png')
            mark = im.crop((0, 0, im.width, round(im.height * 0.7)))
            mark = mark.crop(mark.getbbox())
            mark.save(PUB / 'brand' / f'mark-{tone}.png')
            if mark.width > 600:
                mark = mark.resize((600, round(mark.height * 600 / mark.width)), Image.LANCZOS)
            mark.save(PUB / 'brand' / f'mark-{tone}.webp', 'WEBP', quality=92, method=6)
        mark = Image.open(PUB / 'brand' / 'mark-gold.png')
        for size, name in [(192, 'icon-192.png'), (180, 'apple-touch-icon.png'), (32, 'icon-32.png')]:
            bg = Image.new('RGBA', (size, size), (26, 19, 16, 255))
            m = mark.copy()
            m.thumbnail((round(size * 0.74), round(size * 0.74)), Image.LANCZOS)
            bg.alpha_composite(m, ((size - m.width) // 2, (size - m.height) // 2))
            bg.convert('RGB').save(PUB / 'brand' / name)
        # favicon.ico for crawlers and old browsers
        Image.open(PUB / 'brand' / 'icon-192.png').convert('RGBA').save(ROOT / 'app' / 'favicon.ico', sizes=[(32, 32), (48, 48)])

    # Open Graph card from the slab-fan keyframe
    og = GEN / 'rm-kf-desktop-mid.png'
    if og.exists():
        im = Image.open(og).convert('RGB')
        w, h = im.size
        th = round(w * 630 / 1200)
        im = im.crop((0, (h - th) // 2, w, (h - th) // 2 + th)).resize((1200, 630), Image.LANCZOS)
        if logo.exists():
            lg = Image.open(PUB / 'brand' / 'logo-gold.png')
            lg.thumbnail((210, 210), Image.LANCZOS)
            im.paste(lg, (64, 630 - lg.height - 56), lg)
        im.save(PUB / 'img' / 'og.jpg', quality=86)
        print('public/img/og.jpg')


if __name__ == '__main__':
    main()

"""Stitch screenshots into one contact sheet.
   python3 contact_sheet.py <dir> [out=sheet.jpg] [cols=4] [tile=600]"""
import sys, glob
from PIL import Image
d = sys.argv[1]; out = sys.argv[2] if len(sys.argv) > 2 else "sheet.jpg"
cols = int(sys.argv[3]) if len(sys.argv) > 3 else 4; W = int(sys.argv[4]) if len(sys.argv) > 4 else 600
ims = [Image.open(f).convert("RGB") for f in sorted(glob.glob(f"{d}/*.png"))]
ims = [im.resize((W, int(im.height * W / im.width))) for im in ims]
rows = [ims[i:i + cols] for i in range(0, len(ims), cols)]
rh = [max(im.height for im in r) for r in rows]
s = Image.new("RGB", (W * cols + 8 * (cols - 1), sum(rh) + 8 * (len(rows) - 1)), "white")
y = 0
for r, h in zip(rows, rh):
    for c, im in enumerate(r): s.paste(im, (c * (W + 8), y))
    y += h + 8
s.save(out, quality=85); print(out, len(ims), "images")

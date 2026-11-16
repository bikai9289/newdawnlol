"""Optional asset maintenance only. Normal builds need Node, not Python/Pillow."""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont
root = Path(__file__).resolve().parent.parent
im = Image.new('RGB', (1200, 630), '#0c1214')
d = ImageDraw.Draw(im)
gold = '#d5b779'
def font(size, bold=False):
    for f in [Path('C:/Windows/Fonts') / ('arialbd.ttf' if bold else 'arial.ttf'), Path('/usr/share/fonts/truetype/dejavu') / ('DejaVuSans-Bold.ttf' if bold else 'DejaVuSans.ttf')]:
        if f.exists(): return ImageFont.truetype(str(f), size)
    return ImageFont.load_default()
for x in range(60, 1200, 140): d.line((x, 0, x, 630), fill='#182124')
d.ellipse((800, 130, 1100, 430), outline='#6f6243', width=2)
d.polygon([(650,630),(840,400),(880,460),(970,300),(1140,500),(1200,440),(1200,630)],fill='#202f2c')
d.rectangle((60,70,96,74), fill=gold)
d.text((60,110), 'LEAGUE OF LEGENDS', font=font(23), fill=gold)
d.text((50,174), 'NEW DAWN', font=font(105, True), fill='#f0dfbb')
d.text((60,320), 'The 2027 update. Facts first.', font=font(31), fill='#edf0e9')
d.line((60,440,1140,440),fill='#34413d',width=1)
d.text((60,480), 'CONFIRMED NEWS / RELEASE WINDOW / SOURCE TIMELINE', font=font(18), fill=gold)
d.text((60,556), 'newdawnlol.com  |  Independent fan guide', font=font(19), fill='#a6b1ad')
target=root/'public/assets/social-card.png'
target.parent.mkdir(parents=True,exist_ok=True)
im.save(target,optimize=True)
print(target)

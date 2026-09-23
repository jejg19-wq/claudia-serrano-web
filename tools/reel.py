"""Video nuevo (distinto al de la portada) con 6 fotos de Claudia: acercamientos, paneos y transiciones.
Salida: assets/video/reel.mp4 (720x1080, 30 fps, H.264) + póster."""
import subprocess, os
IMG = r"C:/Users/ivan/Desktop/claudia/assets/img/"
OUT = r"C:/Users/ivan/Desktop/claudia/assets/video/reel.mp4"
POSTER = r"C:/Users/ivan/Desktop/claudia/assets/img/reel-poster.webp"
shots = [  # (foto, movimiento)
    ("claudia-portrait-soft-xl", "in"),
    ("detail-lip-liner-xl", "left"),
    ("claudia-red-lip-portrait-xl", "out"),
    ("claudia-leather-glam-xl", "up"),
    ("detail-red-lip-xl", "in"),
    ("claudia-laugh-xl", "right"),
]
D, T = 2.6, 0.6               # segundos por foto y duración de cada transición
FPS = 30; N = int(D * FPS)
trans = ["fade", "smoothleft", "circleopen", "smoothup", "fadeblack"]
inputs, filters = [], []
for i, (name, mv) in enumerate(shots):
    inputs += ["-i", IMG + name + ".webp"]
    # zoompan suave: se escala al doble antes para evitar temblores
    if mv == "in":    z, x, y = "1.0+0.10*on/%d" % N, "iw/2-(iw/zoom/2)", "ih/2.6-(ih/zoom/2.6)"
    elif mv == "out": z, x, y = "1.10-0.10*on/%d" % N, "iw/2-(iw/zoom/2)", "ih/2.6-(ih/zoom/2.6)"
    elif mv == "left": z, x, y = "1.08", "(iw-iw/zoom)*(1-on/%d)" % N, "ih/2.4-(ih/zoom/2.4)"
    elif mv == "right": z, x, y = "1.08", "(iw-iw/zoom)*(on/%d)" % N, "ih/2.4-(ih/zoom/2.4)"
    else:              z, x, y = "1.08", "iw/2-(iw/zoom/2)", "(ih-ih/zoom)*(1-on/%d)" % N
    filters.append(f"[{i}:v]scale=1440:2160,zoompan=z='{z}':x='{x}':y='{y}':d={N}:s=720x1080:fps={FPS},setsar=1,format=yuv420p[v{i}]")
prev, off = "v0", D - T
for i in range(1, len(shots)):
    out = f"x{i}"
    filters.append(f"[{prev}][v{i}]xfade=transition={trans[(i - 1) % len(trans)]}:duration={T}:offset={off:.2f}[{out}]")
    prev = out; off += D - T
# grado cálido muy leve y viñeta suave
filters.append(f"[{prev}]eq=saturation=1.05:contrast=1.03,vignette=PI/6[out]")
cmd = ["ffmpeg", "-v", "error", "-y"] + inputs + ["-filter_complex", ";".join(filters), "-map", "[out]", "-r", str(FPS),
       "-c:v", "libx264", "-preset", "slow", "-crf", "27", "-pix_fmt", "yuv420p", "-movflags", "+faststart", "-an", OUT]
subprocess.run(cmd, check=True)
subprocess.run(["ffmpeg", "-v", "error", "-y", "-ss", "0.8", "-i", OUT, "-frames:v", "1", "-c:v", "libwebp", "-quality", "78", POSTER], check=True)
print(os.path.getsize(OUT), "bytes")

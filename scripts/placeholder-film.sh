#!/usr/bin/env bash
# Builds a stand-in master from the three keyframes (start, mid, end): slow
# push-ins joined by cross-dissolves, 10 s. Replace with the real generated
# film (docs/hero-video-prompt.md) and run `npm run film`.
#
#   bash scripts/placeholder-film.sh desktop 1920 1080
#   bash scripts/placeholder-film.sh mobile 1080 1920
set -euo pipefail
tier=$1; W=$2; H=$3
K=assets/keyframes
out=assets/masters/$tier.mp4
mkdir -p assets/masters

clip() { # image, zoom-from, zoom-to
  echo "scale=${W}*2:${H}*2:force_original_aspect_ratio=increase,crop=${W}*2:${H}*2,zoompan=z='$2+($3-$2)*on/95':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=96:s=${W}x${H}:fps=24,setsar=1"
}

ffmpeg -y -v error \
  -i "$K/rm-kf-$tier-start.png" \
  -i "$K/rm-kf-$tier-mid.png" \
  -i "$K/rm-kf-$tier-end.png" \
  -filter_complex "[0]$(clip x 1.0 1.10)[a];[1]$(clip x 1.04 1.14)[b];[2]$(clip x 1.12 1.0)[c];[a][b]xfade=transition=fade:duration=1:offset=3[ab];[ab][c]xfade=transition=fade:duration=1:offset=6,format=yuv420p[v]" \
  -map "[v]" -c:v libx264 -crf 16 -preset slow -r 24 "$out"
echo "wrote $out"

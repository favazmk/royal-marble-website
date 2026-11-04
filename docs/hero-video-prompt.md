# Royal Marble — hero scroll film: generation brief

The home hero is a scroll-scrubbed film (canvas frame sequence, same engine and same
style as the MENAARC hero): **one continuous golden-hour drone shot** that approaches a
luxury villa, flies in through the door and tours the house. The house is a showcase of
**real marble architecture** — every surface the camera passes is stone Royal Marble
supplies, cuts and installs: facade cladding, book-matched walls, floors, staircase,
fireplace, kitchen island, pool deck.

Scroll position = playhead, so the clip must be **one take, no cuts, steady speed**.
Inside the house the camera makes **four slow 90° turns** — into the hall, the living
room, the kitchen and out to the terrace — so every room is seen in full rather than
glimpsed straight ahead. Each turn is a smooth pan *while still moving forward*, never a
stop-and-spin.

Deliver **two masters**, same route, composed separately (do not crop one from the other):

| File | Aspect | Resolution | Length | FPS |
|---|---|---|---|---|
| `assets/masters/desktop.mp4` | 16:9 | 1920×1080 min (2K/4K better) | 15 s (12 s minimum) | 24 |
| `assets/masters/mobile.mp4` | 9:16 | 1080×1920 min | 15 s (12 s minimum) | 24 |

No audio. No watermark (if the tool adds one, tell me where).

## Beat sheet (both versions, 15 s)

| Time | Camera | What it shows | Site chapter |
|---|---|---|---|
| 0.0–2.5 s | High drone, descending and pushing in over palms and a reflecting pool | The whole villa at golden hour: travertine and marble facade, Nero entrance volume, open sea behind. First 0.5 s almost still. | 01 · Facade |
| 2.5–4.5 s | Glides low to the entrance; a marble-clad pivot door swings open; flies through | Facade joints and stone texture up close, then the threshold | 02 · Threshold |
| 4.5–7.0 s | **Turn 1 — 90° left**, rising into the double-height hall | The full hall: book-matched Calacatta wall, floating Nero staircase, polished floor, glass gallery above | 03 · Hall & living |
| 7.0–9.5 s | **Turn 2 — 90° right** through a wide opening into the living room | The full living room: emerald marble fireplace wall, sofas, glass wall to the sea | 03 · Hall & living |
| 9.5–12.0 s | **Turn 3 — 90° right** into the kitchen and dining | Calacatta waterfall island, full-height marble splashback, dining table, brass pendants | 04 · Detail |
| 12.0–15.0 s | **Turn 4 — 90° left** to the open glass sliders, out onto the terrace, slowing to a stop | Travertine pool deck, infinity pool flowing into the open sea, empty sunset horizon — no buildings. Last 0.5 s almost still. | 05 · Horizon |

---

## Prompt — DESKTOP (16:9)

```
One continuous cinematic drone shot, 15 seconds, no cuts, smooth constant-speed camera movement, 16:9, photoreal luxury architectural film at golden hour. Inside the house the camera makes four slow, smooth 90-degree turns while still gliding forward, so each room is revealed in full.

The camera begins high above a contemporary two-storey luxury villa on the Dubai coastline, secluded, with no other buildings in view, the calm open sea glowing in the warm sunset behind it. The villa is a showcase of marble architecture: its facade is clad in large-format honed beige travertine and Calacatta white marble panels with crisp, precise shadow joints, a dark Nero Marquina black-and-gold marble volume frames the entrance, bronze-framed floor-to-ceiling glass, a cantilevered upper floor, palm trees and a long reflecting pool in front.

The drone descends smoothly and glides low over the reflecting pool toward the entrance, revealing the real texture of the stone and the perfect alignment of the facade panels. A tall marble-clad pivot door slowly swings open and the camera flies through it.

Turn one: just inside, the camera slowly turns 90 degrees to the left while rising, revealing the entire double-height hall — a floor-to-ceiling book-matched Calacatta gold marble feature wall with mirrored veining, a floating Nero Marquina black-and-gold marble staircase with a slim brass handrail climbing to a glass gallery, polished Calacatta marble floors reflecting the warm light like water.

Turn two: the camera glides past the foot of the staircase and turns 90 degrees to the right through a wide opening, revealing the whole living room — a full-height deep emerald-green marble fireplace wall, low ivory sofas, a travertine coffee table, a polished marble floor and a long glass wall glowing with the sunset over the sea.

Turn three: the camera continues across the living room and turns 90 degrees to the right into the open kitchen and dining area — a monolithic Calacatta waterfall island with book-matched sides, a full-height marble splashback, warm oak cabinetry, brushed-brass taps and pendants, a long dining table.

Turn four: the camera turns 90 degrees to the left toward wide open glass sliders and drifts out onto a travertine pool terrace, slowing to a gentle stop above the infinity pool as it melts into the open sea and an empty sunset horizon ahead. The final second holds almost still.

Every turn is slow and smooth, like a stabilised gimbal, never a fast spin. Materials stay exactly the same throughout. Warm ivory, honey travertine, black-and-gold, emerald and brushed-brass palette. Physically accurate light, real stone textures and veining, crisp reflections, Architectural Digest quality. Elegant, weightless, steady motion. No people, no text.
```

**Negative prompt (if supported):**
```
cuts, scene change, jump cut, fast motion, speed ramp, fast spin, whip pan, stopping and rotating in place, shaky camera, motion blur smear, morphing walls, warping geometry, melting, flickering textures, changing materials, people, faces, hands, text, letters, logo, watermark, subtitles, cartoon, plastic CGI look, oversaturated, fisheye, city skyline, skyscrapers, towers, other buildings, Burj Khalifa
```

## Prompt — MOBILE (9:16)

```
One continuous cinematic drone shot, 15 seconds, no cuts, smooth constant-speed camera movement, vertical 9:16 composition, photoreal luxury architectural film at golden hour. Inside the house the camera makes four slow, smooth 90-degree turns while still gliding forward, so each room is revealed in full.

The camera begins above and in front of a contemporary two-storey luxury villa on the Dubai coastline, secluded, with no other buildings in view, framed tall and centred in the upper two-thirds of the frame, the calm open sea glowing at sunset behind it. The villa is a showcase of marble architecture: a facade of large-format honed beige travertine and Calacatta white marble panels with crisp shadow joints, a tall Nero Marquina black-and-gold marble entrance volume, bronze-framed floor-to-ceiling glass, a cantilevered upper floor, tall palms and a reflecting pool in the foreground.

The drone descends and glides forward along the reflecting pool toward the entrance. A tall marble-clad pivot door swings open and the camera flies through it.

Turn one: the camera slowly turns 90 degrees to the left while tilting up, revealing the full height of the double-height hall — a towering book-matched Calacatta gold marble wall with mirrored veining and a floating Nero Marquina black-and-gold staircase climbing up the frame to a glass gallery.

Turn two: the camera turns 90 degrees to the right into the living room, revealing a full-height emerald-green marble fireplace wall, ivory sofas and a tall glass wall glowing with sunset.

Turn three: the camera turns 90 degrees to the right into the kitchen, revealing a Calacatta waterfall island, a full-height marble splashback and brass pendants.

Turn four: the camera turns 90 degrees to the left toward tall open glass sliders and moves out onto a travertine pool terrace, slowing to a stop with the infinity pool flowing into the open sea and an empty sunset horizon, the warm sky filling the top of the frame. The final second holds almost still.

Every turn is slow and smooth, like a stabilised gimbal, never a fast spin. Keep the main subject in the upper two-thirds of every frame; the bottom third stays calmer — floor, water or soft shadow — for website text. Materials stay exactly the same throughout. Warm ivory, honey travertine, black-and-gold, emerald and brass palette. Real stone textures and veining, crisp reflections. Elegant, weightless, steady motion. No people, no text.
```

(Same negative prompt.)

---

## Tips for the generator

- **Short clip limit?** Split at a turn, never mid-turn: 0–7 s (exterior → door → hall
  turn), then extend from its last frame for 7–15 s (living → kitchen → terrace). Export
  as one file.
- **Keep the materials fixed.** If a wall changes colour or veining mid-shot, re-roll —
  the whole point is showing real stone.
- **Turns too fast?** Add "turning slowly over two seconds" after each turn sentence.
- Desktop: keep the **left 40 %** calmer (captions sit there). Mobile: keep the
  **bottom third** calmer.

## Hand-off

Save the files as `assets/masters/desktop.mp4` and `assets/masters/mobile.mp4`, then run
`npm run film`. The site rebuilds its frames — no code changes. The captions in
`content/film-chapters.json` are timed to the beat sheet above.

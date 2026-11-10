# Royal Marble — hero scroll film: generation brief

The home hero is a scroll-scrubbed film (canvas frame sequence, same engine and same
style as the MENAARC hero): **one continuous golden-hour drone shot** that approaches a
luxury villa, flies in through the door and tours the house. The house is a showcase of
**real marble architecture** — every surface the camera passes is stone Royal Marble
supplies, cuts and installs: facade cladding, book-matched walls, floors, staircase,
fireplace, kitchen island, lounge walls.

Scroll position = playhead, so the clip must be **one take, no cuts, steady speed**.
**Only the camera moves.** The villa, every wall, floor and piece of furniture, the light
and the sea stay completely still and unchanged; nothing appears, vanishes or swaps. The
only moving object is the wooden front door swinging open. Inside, the camera makes
**four slow 90° turns** — hall, living room, kitchen, then a marble lounge — and the film
**ends indoors**. It never goes out to the terrace, so no new sea view pops in at the end;
the sea is only seen through glass that is already in frame.

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
| 2.5–4.5 s | Glides low to the entrance; a tall solid-wood pivot door swings open; flies through | Facade joints and stone texture up close, then the threshold | 02 · Threshold |
| 4.5–7.0 s | **Turn 1 — 90° left**, rising into the double-height hall | Book-matched Calacatta wall, floating Nero staircase, polished Calacatta floor, glass gallery above | 03 · Hall & living |
| 7.0–9.5 s | **Turn 2 — 90° right** into the living room | Emerald marble fireplace wall, marble floor, sofas, glass wall with the sea beyond | 03 · Hall & living |
| 9.5–12.0 s | **Turn 3 — 90° right** into the kitchen and dining | Calacatta waterfall island, full-height marble splashback, marble floor, brass pendants | 04 · Detail |
| 12.0–15.0 s | **Turn 4 — 90° left** into a marble lounge, slowing to a stop indoors | Book-matched Arabescato marble walls, travertine floor, marble bench; camera comes to rest on the stone. Last 1 s almost still. | 05 · Horizon |

---

## Prompt — DESKTOP (16:9)

```
One continuous cinematic drone shot, 15 seconds, no cuts, smooth constant-speed camera movement, 16:9, photoreal luxury architectural film at golden hour. The scene is completely static: the architecture, furniture, light and sea never change, move, appear or disappear. Only the camera moves. The single moving object is the front door swinging open.

The camera begins high above a contemporary two-storey luxury villa on the Dubai coastline, secluded, with no other buildings in view, the calm open sea glowing in the warm sunset behind it. The facade is clad in large-format honed beige travertine and Calacatta white marble panels with crisp shadow joints, a dark Nero Marquina black-and-gold marble volume frames the entrance, bronze-framed floor-to-ceiling glass, a cantilevered upper floor, palm trees and a long reflecting pool in front.

The drone descends smoothly and glides low over the reflecting pool toward the entrance, revealing the real texture of the stone. A tall, solid warm-walnut wood pivot door with a fine vertical grain and a slim full-height brushed-brass pull, no stone on it, set flush within the Nero Marquina marble entrance frame, slowly swings open and the camera flies through it.

The entire interior is marble: every floor, wall and major surface is real natural stone.

Turn one: just inside, the camera slowly turns 90 degrees to the left while rising, revealing the double-height hall — a floor-to-ceiling book-matched Calacatta gold marble wall with mirrored veining, a floating Nero Marquina marble staircase with a slim brass handrail climbing to a glass gallery, polished Calacatta marble floors reflecting the warm light.

Turn two: the camera glides past the staircase and slowly turns 90 degrees to the right into the living room — a full-height emerald-green marble fireplace wall, a polished marble floor, low ivory sofas, a travertine coffee table, and a long glass wall with the sunset sea beyond.

Turn three: the camera continues and slowly turns 90 degrees to the right into the kitchen and dining area — a monolithic Calacatta waterfall island with book-matched sides, a full-height marble splashback, marble floor, warm oak cabinetry, brushed-brass pendants, a long dining table.

Turn four: the camera slowly turns 90 degrees to the left into a quiet lounge lined with book-matched Arabescato marble walls, a honed travertine floor and a low marble bench, then gradually slows and comes to rest inside the house, framed on the stone. The camera stays indoors to the end. The final second holds almost still.

Every turn takes about two seconds, slow and smooth like a stabilised gimbal, never a fast spin. Materials stay exactly the same throughout. Warm ivory, honey travertine, black-and-gold, emerald and brushed-brass palette. Physically accurate light, real stone textures and veining, crisp reflections, Architectural Digest quality. No people, no text.
```

**Negative prompt (if supported):**
```
marble door, stone door, stone-clad door, cuts, scene change, jump cut, sudden new scene, popping in, objects appearing, objects disappearing, moving furniture, moving walls, changing layout, going outdoors, terrace at the end, pool at the end, sea filling the frame at the end, fast motion, speed ramp, fast spin, whip pan, stopping and rotating in place, shaky camera, motion blur smear, morphing walls, warping geometry, melting, flickering textures, changing materials, painted walls, plaster walls, wooden floors, carpet, people, faces, hands, text, letters, logo, watermark, subtitles, cartoon, plastic CGI look, oversaturated, fisheye, city skyline, skyscrapers, towers, other buildings, Burj Khalifa
```

## Prompt — MOBILE (9:16)

```
One continuous cinematic drone shot, 15 seconds, no cuts, smooth constant-speed camera movement, vertical 9:16 composition, photoreal luxury architectural film at golden hour. The scene is completely static: the architecture, furniture, light and sea never change, move, appear or disappear. Only the camera moves. The single moving object is the front door swinging open.

The camera begins above and in front of a contemporary two-storey luxury villa on the Dubai coastline, secluded, with no other buildings in view, framed tall in the upper two-thirds of the frame, the calm open sea glowing at sunset behind it. A facade of honed beige travertine and Calacatta white marble panels with crisp shadow joints, a tall Nero Marquina black-and-gold marble entrance volume, bronze-framed glass, a cantilevered upper floor, tall palms and a reflecting pool in the foreground.

The drone descends and glides forward along the reflecting pool toward the entrance. A tall, solid warm-walnut wood pivot door with a fine vertical grain and a slim full-height brushed-brass pull, no stone on it, set flush within the Nero Marquina marble entrance frame, swings open and the camera flies through it.

The entire interior is marble: every floor, wall and major surface is real natural stone.

Turn one: the camera slowly turns 90 degrees to the left while tilting up, revealing the full height of the hall — a towering book-matched Calacatta gold marble wall and a floating Nero Marquina staircase climbing up the frame, polished marble floor below.

Turn two: the camera slowly turns 90 degrees to the right into the living room — a full-height emerald-green marble fireplace wall, marble floor, ivory sofas and a tall glass wall with the sunset sea beyond.

Turn three: the camera slowly turns 90 degrees to the right into the kitchen — a Calacatta waterfall island, a full-height marble splashback, marble floor and brass pendants.

Turn four: the camera slowly turns 90 degrees to the left into a quiet lounge with tall book-matched Arabescato marble walls and a travertine floor, then gradually slows and comes to rest indoors, framed on the stone. The camera stays inside to the end. The final second holds almost still.

Every turn takes about two seconds, slow and smooth like a stabilised gimbal. Keep the main subject in the upper two-thirds of every frame; the bottom third stays calmer — floor or soft shadow — for website text. Materials stay exactly the same throughout. Warm ivory, honey travertine, black-and-gold, emerald and brass palette. Real stone textures and veining, crisp reflections. No people, no text.
```

(Same negative prompt.)

---

## Tips for the generator

- **Short clip limit?** Split at a turn, never mid-turn: 0–7 s (exterior → door → hall
  turn), then extend from its last frame for 7–15 s (living → kitchen → lounge). Export
  as one file.
- **Keep the scene fixed.** If a wall changes colour or veining, furniture shifts, or a
  new view pops in, re-roll — only the camera may move.
- **Turns too fast?** Add "turning slowly over two seconds" after each turn sentence.
- Desktop: keep the **left 40 %** calmer (captions sit there). Mobile: keep the
  **bottom third** calmer.

## Hand-off

Save the files as `assets/masters/desktop.mp4` and `assets/masters/mobile.mp4`, then run
`npm run film`. The site rebuilds its frames — no code changes. The captions in
`content/film-chapters.json` are timed to the beat sheet above.

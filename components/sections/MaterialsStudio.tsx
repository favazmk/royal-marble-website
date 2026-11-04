'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { MATERIALS } from '@/content/data';
import { usePrefersReducedMotion } from '@/lib/use-media-query';
import { ArrowIcon } from '@/components/ui/icons';

const N = MATERIALS.length;
const smooth = (a: number, b: number, x: number) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};

/**
 * Scroll progress -> number of half-turns completed. Each stone holds for the
 * first half of its segment, then the slab flips to the next one.
 */
function turns(p: number) {
  const u = Math.min(N - 1, Math.max(0, p * (N - 1) * 1.06 - 0.03));
  const i = Math.floor(u);
  return i + smooth(0.5, 1, u - i);
}

/**
 * A polished slab, rendered in three.js, that flips through the collection as
 * the section scrolls. Front and back faces carry alternate stones, and each
 * face is re-skinned only while it faces away from the camera — so the swap is
 * never seen. The giant stone name sits BEHIND the canvas (back layer → slab →
 * front card), which is what puts the type inside the scene.
 */
export function MaterialsStudio() {
  const reduced = usePrefersReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wordRef = useRef<HTMLDivElement>(null);
  const targetP = useRef(0);
  const [active, setActive] = useState(0);
  const activeRef = useRef(0);

  // Scroll -> target progress. The render loop eases toward it.
  useLayoutEffect(() => {
    if (reduced) return;
    const section = sectionRef.current;
    if (!section) return;
    gsap.registerPlugin(ScrollTrigger);
    const st = ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        targetP.current = self.progress;
      },
      onRefresh: (self) => {
        targetP.current = self.progress;
      },
    });
    return () => st.kill();
  }, [reduced]);

  // three.js scene, loaded on demand so it never weighs on first paint.
  useEffect(() => {
    if (reduced) return;
    const canvas = canvasRef.current;
    const section = sectionRef.current;
    if (!canvas || !section) return;

    let disposed = false;
    let raf = 0;
    let visible = false;
    let cleanup = () => {};

    (async () => {
      const THREE = await import('three');
      const { RoomEnvironment } = await import('three/examples/jsm/environments/RoomEnvironment.js');
      if (disposed) return;

      const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance' });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.05;

      const scene = new THREE.Scene();
      const pmrem = new THREE.PMREMGenerator(renderer);
      scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;

      const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 100);
      camera.position.set(0, 0, 9.2);

      const loader = new THREE.TextureLoader();
      const maxAniso = renderer.capabilities.getMaxAnisotropy();
      const textures = MATERIALS.map((m) => {
        const t = loader.load(m.texture, () => (needsRender = true));
        t.colorSpace = THREE.SRGBColorSpace;
        t.anisotropy = maxAniso;
        return t;
      });

      const face = (tex: import('three').Texture) =>
        new THREE.MeshPhysicalMaterial({ map: tex, roughness: 0.16, metalness: 0, clearcoat: 1, clearcoatRoughness: 0.06, envMapIntensity: 0.9 });
      const edge = new THREE.MeshPhysicalMaterial({ color: 0xd9d1c6, roughness: 0.35, clearcoat: 0.6, envMapIntensity: 0.7 });
      const front = face(textures[0]);
      const back = face(textures[1]);
      // BoxGeometry groups: +x, -x, +y, -y, +z (front), -z (back).
      const slab = new THREE.Mesh(new THREE.BoxGeometry(2.3, 3.45, 0.09), [edge, edge, edge, edge, front, back]);
      scene.add(slab);

      const key = new THREE.DirectionalLight(0xfff1dc, 2.2);
      key.position.set(-3, 4, 5);
      scene.add(key);
      const rim = new THREE.PointLight(0xd6b47a, 5, 16);
      rim.position.set(3, -1, 6);
      scene.add(rim);
      scene.add(new THREE.AmbientLight(0xffffff, 0.25));

      let needsRender = true;
      let slabX = 0;
      let slabY = 0;
      let p = targetP.current;
      const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
      let frontIdx = 0;
      let backIdx = 1;

      const resize = () => {
        const r = canvas.getBoundingClientRect();
        renderer.setSize(r.width, r.height, false);
        camera.aspect = r.width / Math.max(1, r.height);
        // Keep the whole slab in frame on tall phone screens.
        camera.position.z = camera.aspect < 0.8 ? 15.5 : 9.2;
        // On phones the slab floats in the band between heading and card.
        slabY = camera.aspect < 0.8 ? 0.55 : 0;
        // On wide screens nudge the slab right of centre, clear of the heading.
        slabX = camera.aspect > 1.25 ? 0.55 : 0;
        camera.updateProjectionMatrix();
        needsRender = true;
      };
      resize();
      const ro = new ResizeObserver(resize);
      ro.observe(canvas);

      const onMove = (e: PointerEvent) => {
        const r = canvas.getBoundingClientRect();
        pointer.tx = ((e.clientX - r.left) / r.width - 0.5) * 2;
        pointer.ty = ((e.clientY - r.top) / r.height - 0.5) * 2;
      };
      const onLeave = () => { pointer.tx = 0; pointer.ty = 0; };
      section.addEventListener('pointermove', onMove);
      section.addEventListener('pointerleave', onLeave);

      const io = new IntersectionObserver(([e]) => {
        visible = e.isIntersecting;
        if (visible) { needsRender = true; loop(); }
      });
      io.observe(section);

      const clock = new THREE.Clock();
      const loop = () => {
        if (disposed || !visible) return;
        raf = requestAnimationFrame(loop);
        const dt = Math.min(0.05, clock.getDelta());
        const k = 1 - Math.exp(-dt * 6);
        const dp = targetP.current - p;
        p += dp * k;
        pointer.x += (pointer.tx - pointer.x) * k;
        pointer.y += (pointer.ty - pointer.y) * k;
        const idle = Math.abs(dp) < 1e-4 && Math.abs(pointer.tx - pointer.x) < 1e-3 && Math.abs(pointer.ty - pointer.y) < 1e-3;
        if (idle && !needsRender) return;
        needsRender = false;

        const n = turns(p);
        // Re-skin whichever face is turned away (see turns()).
        const fi = Math.min(N - 1, 2 * Math.round(n / 2));
        const bi = Math.min(N - 1, 2 * Math.floor(n / 2) + 1);
        if (fi !== frontIdx) { front.map = textures[fi]; front.needsUpdate = true; frontIdx = fi; }
        if (bi !== backIdx) { back.map = textures[bi]; back.needsUpdate = true; backIdx = bi; }

        const flipping = Math.sin((n % 1) * Math.PI); // 0 at rest, 1 mid-flip
        slab.rotation.y = n * Math.PI + pointer.x * 0.28 - 0.18;
        slab.rotation.x = -0.06 + pointer.y * 0.16 - flipping * 0.08;
        slab.rotation.z = 0.035 - flipping * 0.05;
        slab.position.y = slabY + Math.sin(p * Math.PI * 4) * 0.06 + flipping * 0.12;
        slab.position.x = slabX;
        rim.position.x = 3 - flipping * 6;
        renderer.render(scene, camera);

        const idx = Math.min(N - 1, Math.round(n));
        if (idx !== activeRef.current) {
          activeRef.current = idx;
          setActive(idx);
        }
      };

      cleanup = () => {
        cancelAnimationFrame(raf);
        io.disconnect();
        ro.disconnect();
        section.removeEventListener('pointermove', onMove);
        section.removeEventListener('pointerleave', onLeave);
        textures.forEach((t) => t.dispose());
        slab.geometry.dispose();
        [front, back, edge].forEach((m) => m.dispose());
        pmrem.dispose();
        renderer.dispose();
      };
    })();

    return () => {
      disposed = true;
      cleanup();
    };
  }, [reduced]);

  // Word swap: letters drop in, staggered, whenever the stone changes.
  useEffect(() => {
    const el = wordRef.current;
    if (!el || reduced) return;
    const letters = el.querySelectorAll('span');
    gsap.fromTo(letters, { yPercent: 60, opacity: 0, rotate: 4 }, { yPercent: 0, opacity: 1, rotate: 0, duration: 0.9, ease: 'expo.out', stagger: 0.035, overwrite: true });
  }, [active, reduced]);

  const jumpTo = (i: number) => {
    const s = sectionRef.current;
    if (!s) return;
    const top = s.getBoundingClientRect().top + window.scrollY;
    const len = s.offsetHeight - window.innerHeight;
    // Land on the hold of stone i, not mid-flip.
    const p = (i + 0.2 + 0.03) / ((N - 1) * 1.06);
    window.scrollTo({ top: top + Math.min(1, Math.max(0, p)) * len, behavior: 'smooth' });
  };

  const m = MATERIALS[active];

  if (reduced) {
    return (
      <section className="u-shell py-24" aria-labelledby="mat-title">
        <h2 id="mat-title" className="text-[length:var(--text-headline)]">The collection</h2>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {MATERIALS.map((x) => (
            <div key={x.id} className="u-card overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={x.texture} alt={`${x.name} slab`} className="aspect-[2/3] w-full object-cover" loading="lazy" />
              <div className="p-5"><h3 className="text-xl">{x.name}</h3><p className="mt-2 text-sm text-[var(--color-ink-2)]">{x.body}</p></div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section ref={sectionRef} aria-labelledby="mat-title" className="relative" style={{ height: `${N * 90 + 60}vh` }}>
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        {/* Back layer: giant stone name, tinted by the current stone. */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center" aria-hidden="true">
          <div
            ref={wordRef}
            key={m.id}
            className="select-none whitespace-nowrap text-center leading-none"
            style={{
              fontFamily: 'var(--font-outfit)',
              fontWeight: 200,
              fontSize: `min(${m.accent.length > 8 ? 15 : 19}vw, 30rem)`,
              letterSpacing: '-0.055em',
              color: 'color-mix(in oklab, var(--color-ink) 12%, transparent)',
            }}
          >
            {[...m.accent].map((c, i) => (
              <span key={i} className="inline-block">{c}</span>
            ))}
          </div>
        </div>

        {/* The slab. */}
        <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 h-full w-full touch-pan-y" />

        {/* Front layer: title, card, swatches. */}
        <div className="pointer-events-none absolute inset-0">
          <div className="u-shell relative flex h-full flex-col justify-between pb-8 pt-28 md:pb-12">
            <div className="flex items-start justify-between gap-6">
              <div>
                <p className="u-label text-[var(--color-ink-2)]">The collection</p>
                <h2 id="mat-title" className="mt-3 max-w-[13ch] text-[length:var(--text-headline)]">
                  Every stone, <span className="u-gold-text">in your hands.</span>
                </h2>
              </div>
              <p className="hidden max-w-[16rem] text-sm text-[var(--color-ink-2)] md:block">
                Natural and engineered stone, cut and polished in our own factory. Move your cursor to tilt the slab.
              </p>
            </div>

            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div className="u-glass pointer-events-auto max-w-[24rem] rounded-[var(--radius-lg)] p-5 md:p-6" aria-live="polite">
                <div className="flex items-center justify-between">
                  <span className="u-label text-[var(--color-ink-2)]">{m.family}</span>
                  <span className="u-label tabular-nums text-[var(--color-ink-3)]">{String(active + 1).padStart(2, '0')} / {String(N).padStart(2, '0')}</span>
                </div>
                <h3 className="mt-3 text-[1.75rem]">{m.name}</h3>
                <p className="mt-2 hidden text-sm leading-relaxed text-[var(--color-ink-2)] sm:block">{m.body}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {m.uses.map((u) => (
                    <span key={u} className="u-pill bg-white/70 !py-1.5 text-[0.72rem]">{u}</span>
                  ))}
                </div>
              </div>

              <div className="pointer-events-auto flex items-center gap-2 self-start md:self-end">
                {MATERIALS.map((x, i) => (
                  <button
                    key={x.id}
                    type="button"
                    onClick={() => jumpTo(i)}
                    aria-label={`Show ${x.name}`}
                    aria-pressed={i === active}
                    className="group relative h-12 w-12 overflow-hidden rounded-full border-2 transition-all duration-500 md:h-14 md:w-14"
                    style={{ borderColor: i === active ? 'var(--color-ink)' : 'transparent', transform: i === active ? 'scale(1.08)' : 'none' }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={x.texture} alt="" className="h-full w-full scale-150 object-cover transition-transform duration-700 group-hover:scale-[1.8]" loading="lazy" />
                  </button>
                ))}
                <Link href="/materials" className="icon-btn group ml-2 !h-12 !w-12 !bg-[var(--color-ink)] !text-white md:!h-14 md:!w-14" aria-label="All materials">
                  <ArrowIcon size={14} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

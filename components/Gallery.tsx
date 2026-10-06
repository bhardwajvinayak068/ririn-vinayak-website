"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import Reveal from "./Reveal";
import Divider from "./Divider";

const PHOTOS = [
  {
    src: "/gallery/movement-1.webp",
    title: "First Light",
    subtitle: "Where our journey quietly began",
    rotation: "-rotate-1",
  },
  {
    src: "/gallery/movement-2.webp",
    title: "Golden Hour Glow",
    subtitle: "Sunsets shared in quiet laughter",
    rotation: "rotate-1",
  },
  {
    src: "/gallery/movement-3.webp",
    title: "Serenade in Red",
    subtitle: "Celebrating sacred tradition & elegance",
    rotation: "-rotate-2",
  },
  {
    src: "/gallery/movement-4.webp",
    title: "Whispers & Promises",
    subtitle: "Moments meant to last a lifetime",
    rotation: "rotate-2",
  },
  {
    src: "/gallery/movement-5.webp",
    title: "Embrace of Tomorrow",
    subtitle: "Two hearts beating in harmony",
    rotation: "-rotate-1",
  },
  {
    src: "/gallery/movement-6.webp",
    title: "The Celebration",
    subtitle: "Ready for our cherished union",
    rotation: "rotate-1",
  },
];

export default function Gallery() {
  const [active, setActive] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => setActive(null), []);
  const step = useCallback(
    (dir: 1 | -1) =>
      setActive((cur) =>
        cur === null ? cur : (cur + dir + PHOTOS.length) % PHOTOS.length
      ),
    []
  );

  useEffect(() => {
    if (active === null) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, close, step]);

  function scrollReel(dir: 1 | -1) {
    if (!scrollRef.current) return;
    const amount = scrollRef.current.clientWidth * 0.75 * dir;
    scrollRef.current.scrollBy({ left: amount, behavior: "smooth" });
  }

  return (
    <section id="gallery" className="relative z-10 px-6 py-24 sm:py-32 overflow-hidden bg-cream">
      <div className="mx-auto max-w-6xl">
        <Reveal variant="clip" className="text-center">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="h-px w-8 bg-amber-600/40" />
            <p className="font-body text-xs uppercase tracking-widest3 text-amber-800 font-medium">
              The Royal Archive
            </p>
            <span className="h-px w-8 bg-amber-600/40" />
          </div>
          <h2 className="font-display text-4xl sm:text-5xl italic text-ink font-normal">
            Moments of Grace &amp; Devotion
          </h2>
          <div className="my-6">
            <Divider variant="kamal" />
          </div>
          <p className="mx-auto max-w-md font-body text-sm text-ink/75">
            A visual anthology of the smiles, travels, and sacred promises that led us here.
          </p>
        </Reveal>

        {/* Navigation Arrows for Filmstrip */}
        <div className="mt-8 flex items-center justify-end gap-3 px-2 sm:px-0">
          <button
            onClick={() => scrollReel(-1)}
            aria-label="Scroll left in gallery"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-amber-400/50 bg-white/90 text-amber-800 shadow-sm backdrop-blur-sm transition-all hover:bg-amber-600 hover:text-white active:scale-95"
          >
            ←
          </button>
          <button
            onClick={() => scrollReel(1)}
            aria-label="Scroll right in gallery"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-amber-400/50 bg-white/90 text-amber-800 shadow-sm backdrop-blur-sm transition-all hover:bg-amber-600 hover:text-white active:scale-95"
          >
            →
          </button>
        </div>

        {/* Horizontal Filmstrip Reel */}
        <div
          ref={scrollRef}
          className="mt-6 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-8 pt-4 scrollbar-none"
          tabIndex={0}
          role="region"
          aria-label="Wedding photo reel"
        >
          {PHOTOS.map((item, i) => (
            <div
              key={item.src}
              className={`group relative w-[80vw] max-w-[340px] shrink-0 snap-center transition-all duration-500 hover:z-20 sm:w-[320px] ${item.rotation} hover:rotate-0 hover:scale-[1.02]`}
            >
              <button
                onClick={() => setActive(i)}
                aria-label={`View ${item.title} - photo ${i + 1} of ${PHOTOS.length}`}
                className="block w-full overflow-hidden rounded-2xl border border-amber-400/40 bg-white p-3.5 text-left shadow-[0_12px_36px_-16px_rgba(212,175,55,0.25)] backdrop-blur-md transition-shadow duration-300 group-hover:shadow-[0_20px_48px_-16px_rgba(212,175,55,0.35)]"
              >
                <div className="relative aspect-[3/4] w-full overflow-hidden rounded-xl border border-amber-200/50">
                  <Image
                    src={item.src}
                    alt={item.title}
                    fill
                    sizes="(max-width: 640px) 80vw, 320px"
                    quality={84}
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <span className="absolute bottom-3 left-3 rounded-full bg-cream/95 px-3 py-1 font-body text-[10px] uppercase tracking-widest text-ink shadow-sm opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    View Portrait ↗
                  </span>
                </div>

                <div className="mt-4 px-1 pb-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-display text-lg text-ink font-semibold">{item.title}</h3>
                    <span className="font-body text-[11px] font-bold text-amber-800 tabular-nums">
                      0{i + 1} / 0{PHOTOS.length}
                    </span>
                  </div>
                  <p className="mt-1 font-body text-xs text-ink/70">{item.subtitle}</p>
                </div>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {active !== null && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Photo gallery lightbox"
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/92 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
          >
            <motion.div
              key={active}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.3 }}
              className="relative h-[82vh] w-[92vw] max-w-4xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={PHOTOS[active].src}
                alt={PHOTOS[active].title}
                fill
                sizes="92vw"
                quality={92}
                priority
                className="rounded-2xl object-contain"
              />
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full border border-amber-400/40 bg-[#160E12]/80 px-6 py-2.5 text-center text-cream backdrop-blur-md shadow-lg">
                <p className="font-display text-base font-semibold">{PHOTOS[active].title}</p>
                <p className="font-body text-xs text-amber-200/80">{PHOTOS[active].subtitle}</p>
              </div>
            </motion.div>

            <button
              onClick={close}
              className="absolute right-6 top-6 rounded-full border border-white/20 bg-white/10 px-4 py-2 font-body text-xs uppercase tracking-widest text-cream transition-all hover:bg-white/20 active:scale-95"
            >
              Close ✕
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                step(-1);
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/10 text-2xl text-cream backdrop-blur-md transition-all hover:bg-white/25 active:scale-90 sm:left-8"
              aria-label="Previous photo"
            >
              ‹
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                step(1);
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/10 text-2xl text-cream backdrop-blur-md transition-all hover:bg-white/25 active:scale-90 sm:right-8"
              aria-label="Next photo"
            >
              ›
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

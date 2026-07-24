"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Reveal from "./Reveal";
import Divider from "./Divider";

const PHOTOS = [
  "/gallery/movement-1.png",
  "/gallery/movement-2.png",
  "/gallery/movement-3.png",
  "/gallery/movement-4.png",
  "/gallery/movement-5.png",
  "/gallery/movement-6.png",
];

export default function Gallery() {
  const [active, setActive] = useState<number | null>(null);

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

  return (
    <section id="gallery" className="relative z-10 px-6 py-28 sm:py-36">
      <div className="mx-auto max-w-5xl">
        <Reveal variant="clip" className="text-center">
          <p className="font-body text-xs uppercase tracking-widest2 text-rose-gold">
            Moments
          </p>
          <h2 className="mt-4 font-display text-4xl italic text-ink sm:text-5xl">
            Our Gallery
          </h2>
          <div className="my-8">
            <Divider />
          </div>
          <p className="mx-auto max-w-md font-body text-sm text-ink/60">
            A few of our favorite moments together.
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6">
          {PHOTOS.map((src, i) => (
            <Reveal key={src} variant="scale">
              <button
                onClick={() => setActive(i)}
                className="group relative aspect-[4/5] w-full overflow-hidden rounded-xl border border-rose-gold/20 shadow-[0_8px_30px_-16px_rgba(183,110,121,0.4)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_36px_-16px_rgba(183,110,121,0.5)] active:scale-[0.98]"
              >
                <img
                  src={src}
                  alt={`Wedding moment ${i + 1}`}
                  className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-ink/0 transition group-hover:bg-ink/20" />
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {active !== null && (
          <motion.div
            className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/90 px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
          >
            <motion.img
              key={active}
              src={PHOTOS[active]}
              alt={`Wedding moment ${active + 1}`}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.35 }}
              className="max-h-[80vh] max-w-[90vw] rounded-lg object-contain"
              onClick={(e) => e.stopPropagation()}
            />

            <button
              onClick={close}
              className="absolute right-6 top-6 font-body text-xs uppercase tracking-widest2 text-cream/80 transition-transform hover:text-cream active:scale-90"
            >
              Close ✕
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                step(-1);
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl text-cream/70 transition-transform hover:text-cream active:scale-90 sm:left-8"
              aria-label="Previous photo"
            >
              ‹
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                step(1);
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-2xl text-cream/70 transition-transform hover:text-cream active:scale-90 sm:right-8"
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

"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type Stage = "idle" | "playing" | "done";

const VIDEO_SPEED = 1.6;

export default function EnvelopeHero({
  onComplete,
  onBegin,
}: {
  onComplete: () => void;
  onBegin?: () => void;
}) {
  const [stage, setStage] = useState<Stage>("idle");
  const [flash, setFlash] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  function begin() {
    // Must call play() synchronously within the click handler so the
    // browser still associates it with the user gesture.
    const el = videoRef.current;
    if (el) {
      el.playbackRate = VIDEO_SPEED;
      el.play().catch(() => {});
    }
    onBegin?.();
    setStage("playing");
    setFlash(true);
    setTimeout(() => setFlash(false), 350);
  }

  function finish() {
    setStage("done");
    setTimeout(onComplete, 450);
  }

  return (
    <AnimatePresence>
      {stage !== "done" && (
        <motion.div
          className="fixed inset-0 z-50 overflow-hidden bg-ink"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          <video
            ref={videoRef}
            src="/videos/envelope-cover.mp4"
            poster="/images/couple-arch.png"
            playsInline
            onEnded={finish}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
              stage === "playing" ? "opacity-100" : "opacity-0"
            }`}
          />

          {/* wax-seal-break flash on tap */}
          <AnimatePresence>
            {flash && (
              <motion.div
                initial={{ opacity: 0.85 }}
                animate={{ opacity: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(circle_at_center,rgba(255,253,249,0.95),rgba(232,197,206,0.4)_45%,transparent_75%)]"
              />
            )}
          </AnimatePresence>

          {/* Poster / idle state */}
          {stage === "idle" && (
            <motion.button
              onClick={begin}
              whileTap={{ scale: 0.97 }}
              whileHover={{ scale: 1.008 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              className="group absolute inset-0 block h-full w-full text-left"
              aria-label="Tap to begin"
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="h-full w-full"
              >
                <img
                  src="/images/couple-arch.png"
                  alt="Vinayak and Ririn"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-ink/60 via-ink/35 to-ink/75" />

                <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center text-cream">
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15, duration: 0.55 }}
                    className="font-body text-xs tracking-widest2 uppercase text-cream/95 text-shadow-soft"
                  >
                    You&rsquo;re Invited
                  </motion.p>

                  <motion.h1
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.28, duration: 0.6 }}
                    className="mt-4 font-display text-5xl italic tracking-wide text-shadow-soft sm:text-7xl"
                  >
                    Vinayak &amp; Ririn
                  </motion.h1>

                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.42, duration: 0.55 }}
                    className="mt-5 font-body text-sm tracking-wide text-cream/90 sm:text-base"
                  >
                    16th January 2027 &middot; Mahi Resort, Patti, Punjab
                  </motion.p>

                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.62, duration: 0.55 }}
                    className="mt-12 animate-shimmer font-body text-sm tracking-widest2 uppercase text-cream text-shadow-soft transition group-hover:text-rose-gold-light"
                  >
                    ✦ Tap to Begin ✦
                  </motion.span>
                </div>
              </motion.div>
            </motion.button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

interface EnvelopeHeroProps {
  onComplete: () => void;
  onBegin?: () => void;
}

export default function EnvelopeHero({ onComplete, onBegin }: EnvelopeHeroProps) {
  const [isOpening, setIsOpening] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [flash, setFlash] = useState(false);

  // Web Audio Synthesis (Crisp wax snap + 5-note sacred temple chime)
  const playSacredUnsealSound = useCallback(() => {
    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      if (ctx.state === "suspended") ctx.resume();
      const now = ctx.currentTime;

      // 1. Tactile wax break transient
      const snapOsc = ctx.createOscillator();
      const snapGain = ctx.createGain();
      snapOsc.type = "triangle";
      snapOsc.frequency.setValueAtTime(150, now);
      snapOsc.frequency.exponentialRampToValueAtTime(30, now + 0.08);
      snapGain.gain.setValueAtTime(0.35, now);
      snapGain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
      snapOsc.connect(snapGain);
      snapGain.connect(ctx.destination);
      snapOsc.start(now);
      snapOsc.stop(now + 0.09);

      // 2. Auspicious resonant temple bell pentatonic chord (F# major)
      const chimes = [
        { freq: 369.99, delay: 0.04, gain: 0.14, decay: 2.2 },
        { freq: 466.16, delay: 0.12, gain: 0.12, decay: 2.4 },
        { freq: 554.37, delay: 0.20, gain: 0.12, decay: 2.6 },
        { freq: 739.99, delay: 0.28, gain: 0.10, decay: 2.8 },
        { freq: 932.33, delay: 0.36, gain: 0.08, decay: 3.0 },
      ];

      chimes.forEach(({ freq, delay, gain, decay }) => {
        const osc = ctx.createOscillator();
        const g = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, now + delay);
        g.gain.setValueAtTime(0, now + delay);
        g.gain.linearRampToValueAtTime(gain, now + delay + 0.03);
        g.gain.exponentialRampToValueAtTime(0.0001, now + delay + decay);
        osc.connect(g);
        g.connect(ctx.destination);
        osc.start(now + delay);
        osc.stop(now + delay + decay);
      });
    } catch {
      // AudioContext unavailable
    }
  }, []);

  const handleUnseal = () => {
    if (isOpening) return;
    setIsOpening(true);
    setFlash(true);
    playSacredUnsealSound();
    onBegin?.();

    setTimeout(() => setFlash(false), 500);

    // After the diagonal flaps part and reveal the card, smoothly transition
    setTimeout(() => {
      setIsDone(true);
      setTimeout(onComplete, 550);
    }, 1550);
  };

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-hidden select-none bg-[radial-gradient(circle_at_center,#FDF9F2_0%,#EFE8DD_60%,#E2D7C7_100%)]"
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Subtle Golden Light Flash on Unseal */}
          <AnimatePresence>
            {flash && (
              <motion.div
                initial={{ opacity: 0.85 }}
                animate={{ opacity: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="pointer-events-none absolute inset-0 z-40 bg-[radial-gradient(circle_at_center,rgba(255,248,225,0.98),rgba(212,175,55,0.5)_40%,transparent_75%)]"
              />
            )}
          </AnimatePresence>

          {/* THE PINTEREST 9:16 INVITATION CARD STAGE */}
          <div
            className="relative w-full max-w-[390px] sm:max-w-[410px] aspect-[9/16] max-h-[88vh] rounded-[28px] overflow-hidden shadow-[0_25px_60px_-15px_rgba(90,70,50,0.35),0_0_40px_rgba(212,175,55,0.15)] border border-amber-400/40 bg-[#FFFDF9]"
            style={{ perspective: "1200px" }}
          >
            {/* ========================================================
                1. INNER CARD (Revealed underneath through V-openings & when opened)
                ======================================================== */}
            <div className="absolute inset-0 z-0 flex flex-col items-center justify-between p-7 text-center bg-[#FAF7F2] overflow-hidden">
              <Image
                src="/images/couple-arch.webp"
                alt="Vinayak & Ririn"
                fill
                priority
                sizes="(max-width: 640px) 390px, 410px"
                quality={90}
                className="object-cover object-[50%_25%] filter brightness-[0.96]"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-[#140F12]/65 via-[#140F12]/15 via-65% to-[#140F12]/85 pointer-events-none" />
              <div className="absolute inset-3 rounded-[20px] border border-amber-200/40 pointer-events-none" />

              {/* Inner Content: Top Invocation */}
              <div className="relative z-10">
                <div className="inline-flex items-center gap-1.5 rounded-full border border-amber-400/50 bg-[#FFFDF9]/90 px-4 py-1 text-[11px] font-serif font-bold text-amber-800 shadow-sm backdrop-blur-md">
                  <span>🪷</span>
                  <span>॥ श्री गणेशाय नमः ॥</span>
                  <span>🪷</span>
                </div>
              </div>

              {/* Inner Content: Middle Details */}
              <div className="relative z-10 my-auto text-[#FFFDF9] drop-shadow-md">
                <p className="font-body text-[10px] uppercase tracking-widest2 text-[#FCE182] font-semibold">
                  Shubh Vivah
                </p>
                <h1 className="mt-1 font-display text-4xl sm:text-5xl italic text-[#FFFDF9]">
                  Vinayak &amp; Ririn
                </h1>
                <p className="mt-2 font-body text-xs text-white/95 tracking-wide">
                  16th January 2027 &middot; Mahi Resort, Patti, Punjab
                </p>
              </div>

              {/* Inner Content: Bottom Blessing */}
              <div className="relative z-10 w-full border-t border-amber-200/30 pt-3">
                <p className="font-serif text-[11px] italic text-[#FCE182] tracking-wider">
                  ॥ सदा सौभाग्यवती भव ॥
                </p>
              </div>
            </div>

            {/* ========================================================
                2. DIAGONAL ANGLED GATEFOLD FLAPS (The Exact Pinterest Pin 1 Opening)
                ======================================================== */}
            <div className="absolute inset-0 z-10 pointer-events-none" style={{ transformStyle: "preserve-3d" }}>
              {/* LEFT ANGLED FLAP */}
              <motion.div
                className="absolute top-0 bottom-0 left-0 w-1/2 pointer-events-auto overflow-hidden bg-[#FDFBF7]"
                style={{
                  clipPath: "polygon(0% 0%, 100% 46%, 100% 54%, 0% 100%)",
                  transformOrigin: "left center",
                  boxShadow: "6px 0 20px rgba(70,50,30,0.2)",
                  backgroundImage:
                    "radial-gradient(circle at 40% 50%, rgba(255,255,255,0.85), transparent 70%), repeating-linear-gradient(45deg, rgba(220,205,185,0.08) 0px, rgba(220,205,185,0.08) 2px, transparent 2px, transparent 8px)",
                }}
                initial={{ x: 0, rotateY: 0, opacity: 1 }}
                animate={isOpening ? { x: "-105%", rotateY: -20, opacity: 0 } : { x: 0, rotateY: 0, opacity: 1 }}
                transition={{ duration: 1.25, ease: [0.25, 1, 0.35, 1] }}
              >
                {/* Botanical blind-embossed relief watermark */}
                <svg
                  className="absolute inset-0 w-full h-full opacity-35 mix-blend-multiply pointer-events-none"
                  viewBox="0 0 200 400"
                  preserveAspectRatio="none"
                  fill="#8C6F4B"
                >
                  <path d="M0,0 Q60,100 20,200 Q80,280 0,400 L0,0 Z" opacity="0.1" />
                  <circle cx="80" cy="180" r="40" opacity="0.08" />
                  <circle cx="120" cy="220" r="30" opacity="0.06" />
                </svg>

                {/* Cream Floral Blossom Cluster Near Seal (Pin 1) */}
                <svg
                  className="absolute right-[-8px] top-1/2 -translate-y-1/2 w-[90px] h-[90px] pointer-events-none drop-shadow-md"
                  viewBox="0 0 100 100"
                >
                  <circle cx="50" cy="50" r="28" fill="#FFFBF2" stroke="#E6D3B3" strokeWidth="1.5" />
                  <circle cx="50" cy="50" r="18" fill="#FDF4E1" />
                  <path d="M50 15 Q65 35 50 50 Q35 35 50 15 Z" fill="#FBF8EE" />
                  <path d="M50 85 Q65 65 50 50 Q35 65 50 85 Z" fill="#FBF8EE" />
                  <path d="M15 50 Q35 65 50 50 Q35 35 15 50 Z" fill="#FBF8EE" />
                  <path d="M85 50 Q65 65 50 50 Q65 35 85 50 Z" fill="#FBF8EE" />
                  <path d="M25 25 Q45 40 50 50 Q35 45 25 25 Z" fill="#93A27D" opacity="0.75" />
                  <path d="M75 75 Q55 60 50 50 Q65 55 75 75 Z" fill="#93A27D" opacity="0.75" />
                </svg>
              </motion.div>

              {/* RIGHT ANGLED FLAP */}
              <motion.div
                className="absolute top-0 bottom-0 right-0 w-1/2 pointer-events-auto overflow-hidden bg-[#FDFBF7]"
                style={{
                  clipPath: "polygon(100% 0%, 0% 46%, 0% 54%, 100% 100%)",
                  transformOrigin: "right center",
                  boxShadow: "-6px 0 20px rgba(70,50,30,0.2)",
                  backgroundImage:
                    "radial-gradient(circle at 60% 50%, rgba(255,255,255,0.85), transparent 70%), repeating-linear-gradient(-45deg, rgba(220,205,185,0.08) 0px, rgba(220,205,185,0.08) 2px, transparent 2px, transparent 8px)",
                }}
                initial={{ x: 0, rotateY: 0, opacity: 1 }}
                animate={isOpening ? { x: "105%", rotateY: 20, opacity: 0 } : { x: 0, rotateY: 0, opacity: 1 }}
                transition={{ duration: 1.25, ease: [0.25, 1, 0.35, 1] }}
              >
                {/* Botanical blind-embossed relief watermark */}
                <svg
                  className="absolute inset-0 w-full h-full opacity-35 mix-blend-multiply pointer-events-none"
                  viewBox="0 0 200 400"
                  preserveAspectRatio="none"
                  fill="#8C6F4B"
                >
                  <path d="M200,0 Q140,100 180,200 Q120,280 200,400 L200,0 Z" opacity="0.1" />
                  <circle cx="120" cy="180" r="40" opacity="0.08" />
                  <circle cx="80" cy="220" r="30" opacity="0.06" />
                </svg>

                {/* Cream Floral Blossom Cluster Near Seal (Pin 1) */}
                <svg
                  className="absolute left-[-8px] top-1/2 -translate-y-1/2 w-[90px] h-[90px] pointer-events-none scale-x-[-1] drop-shadow-md"
                  viewBox="0 0 100 100"
                >
                  <circle cx="50" cy="50" r="28" fill="#FFFBF2" stroke="#E6D3B3" strokeWidth="1.5" />
                  <circle cx="50" cy="50" r="18" fill="#FDF4E1" />
                  <path d="M50 15 Q65 35 50 50 Q35 35 50 15 Z" fill="#FBF8EE" />
                  <path d="M50 85 Q65 65 50 50 Q35 65 50 85 Z" fill="#FBF8EE" />
                  <path d="M15 50 Q35 65 50 50 Q35 35 15 50 Z" fill="#FBF8EE" />
                  <path d="M85 50 Q65 65 50 50 Q65 35 85 50 Z" fill="#FBF8EE" />
                  <path d="M25 25 Q45 40 50 50 Q35 45 25 25 Z" fill="#93A27D" opacity="0.75" />
                  <path d="M75 75 Q55 60 50 50 Q65 55 75 75 Z" fill="#93A27D" opacity="0.75" />
                </svg>
              </motion.div>

              {/* 3-STRAND BRAIDED GOLD CORD (Matching Pin 1) */}
              <motion.div
                className="absolute top-1/2 left-0 right-0 -translate-y-1/2 flex flex-col gap-1 z-20 pointer-events-none"
                animate={isOpening ? { scaleX: 0, opacity: 0 } : { scaleX: 1, opacity: 1 }}
                transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
              >
                {[1, 2, 3].map((c) => (
                  <div
                    key={c}
                    className="h-[3px] w-full shadow-sm"
                    style={{
                      background:
                        "repeating-linear-gradient(90deg, #96671C 0px, #FCE38A 4px, #D4AF37 8px, #96671C 12px)",
                    }}
                  />
                ))}
              </motion.div>

              {/* CENTER 24K GOLD WAX SEAL BUTTON */}
              <AnimatePresence>
                {!isOpening && (
                  <motion.div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-auto"
                    exit={{ scale: 1.35, opacity: 0, y: -15 }}
                    transition={{ duration: 0.45, ease: [0.34, 1.56, 0.64, 1] }}
                  >
                    <button
                      onClick={handleUnseal}
                      className="group relative w-28 h-28 sm:w-32 sm:h-32 flex items-center justify-center p-0 transition-transform duration-300 hover:scale-108 active:scale-95 focus:outline-none"
                      aria-label="Unseal Royal Wedding Invitation"
                    >
                      <div className="absolute -inset-2 rounded-full bg-amber-400/35 blur-md animate-pulse opacity-70 group-hover:opacity-100 transition-opacity" />
                      <div className="relative w-full h-full drop-shadow-[0_12px_22px_rgba(90,60,20,0.45)] drop-shadow-[0_0_20px_rgba(212,175,55,0.5)]">
                        <Image
                          src="/images/royal-wax-seal.webp"
                          alt="VR 2027 Royal Wax Seal"
                          fill
                          priority
                          sizes="130px"
                          quality={95}
                          className="object-contain pointer-events-none select-none transition-transform duration-300 group-hover:rotate-2"
                        />
                      </div>
                    </button>

                    {/* Tactile prompt tag */}
                    <motion.div
                      animate={{ y: [0, -3, 0] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                      className="absolute -bottom-9 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] font-semibold uppercase tracking-widest2 text-amber-900 bg-[#FFFDF9]/95 px-3.5 py-1 rounded-full border border-amber-400/40 shadow-sm backdrop-blur-md pointer-events-none"
                    >
                      ✦ Tap to Open ✦
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

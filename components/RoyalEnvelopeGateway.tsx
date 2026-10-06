"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

interface RoyalEnvelopeGatewayProps {
  onUnseal: () => void;
  isPlayingMusic: boolean;
  onToggleMusic: () => void;
}

export default function RoyalEnvelopeGateway({
  onUnseal,
  isPlayingMusic,
  onToggleMusic,
}: RoyalEnvelopeGatewayProps) {
  const [isOpening, setIsOpening] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [flash, setFlash] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [sealGlint, setSealGlint] = useState({ x: 40, y: 40 });

  const containerRef = useRef<HTMLDivElement>(null);
  const sealRef = useRef<HTMLButtonElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const burstParticlesRef = useRef<{
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    rot: number;
    vRot: number;
    opacity: number;
    color: string;
    isShard: boolean;
    life: number;
    maxLife: number;
  }[]>([]);

  // 1. Web Audio API Synthesis: Wax snap + Sacred temple bell pentatonic chord (F# major)
  const playSacredUnsealSound = useCallback(() => {
    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      if (ctx.state === "suspended") ctx.resume();
      const now = ctx.currentTime;

      // Tactile physical wax fracture snap
      const snap = ctx.createOscillator();
      const snapG = ctx.createGain();
      snap.type = "triangle";
      snap.frequency.setValueAtTime(160, now);
      snap.frequency.exponentialRampToValueAtTime(32, now + 0.08);
      snapG.gain.setValueAtTime(0.35, now);
      snapG.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
      snap.connect(snapG);
      snapG.connect(ctx.destination);
      snap.start(now);
      snap.stop(now + 0.09);

      // Resonant 5-note temple bell chord
      [369.99, 466.16, 554.37, 739.99, 932.33].forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const g = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, now + i * 0.07);
        g.gain.setValueAtTime(0, now + i * 0.07);
        g.gain.linearRampToValueAtTime(0.12, now + i * 0.07 + 0.03);
        g.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.07 + 2.2);
        osc.connect(g);
        g.connect(ctx.destination);
        osc.start(now + i * 0.07);
        osc.stop(now + i * 0.07 + 2.3);
      });
    } catch {}
  }, []);

  // 2. Physical Wax Fracture & Celebratory Petal Burst
  const triggerWaxFracture = (originX: number, originY: number) => {
    const burst: typeof burstParticlesRef.current = [];

    // Golden wax micro-shards
    for (let i = 0; i < 40; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 9 + 4;
      burst.push({
        x: originX,
        y: originY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 2.5,
        size: Math.random() * 4 + 2,
        rot: Math.random() * Math.PI * 2,
        vRot: (Math.random() - 0.5) * 0.35,
        opacity: 1,
        color: i % 2 === 0 ? "#D4AF37" : "#FCE38A",
        isShard: true,
        life: 0,
        maxLife: Math.random() * 40 + 35,
      });
    }

    // Festive marigold & rose celebration petals
    for (let i = 0; i < 35; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 7 + 2.5;
      burst.push({
        x: originX,
        y: originY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 4,
        size: Math.random() * 8 + 6,
        rot: Math.random() * Math.PI * 2,
        vRot: (Math.random() - 0.5) * 0.15,
        opacity: 1,
        color: i % 3 === 0 ? "rgba(235, 185, 195, 0.95)" : "rgba(245, 158, 11, 0.9)",
        isShard: false,
        life: 0,
        maxLife: Math.random() * 55 + 45,
      });
    }

    burstParticlesRef.current = burst;
  };

  // 3. Canvas Petal Animation Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // Ambient floating petals and golden dust
    interface AmbientParticle {
      x: number;
      y: number;
      size: number;
      vx: number;
      vy: number;
      rot: number;
      vRot: number;
      opacity: number;
      isPetal: boolean;
    }

    const ambientParticles: AmbientParticle[] = Array.from({ length: 30 }, (_, i) => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: i % 3 === 0 ? Math.random() * 7 + 6 : Math.random() * 2.5 + 1.2,
      vx: (Math.random() - 0.5) * 0.4,
      vy: i % 3 === 0 ? Math.random() * 0.6 + 0.3 : (Math.random() - 0.5) * 0.25 - 0.15,
      rot: Math.random() * Math.PI * 2,
      vRot: (Math.random() - 0.5) * 0.02,
      opacity: Math.random() * 0.5 + 0.25,
      isPetal: i % 3 === 0,
    }));

    function render() {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);

      // Ambient Drifting Petals & Stardust
      ambientParticles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.rot += p.vRot;

        if (p.y > height + 20) p.y = -20;
        if (p.y < -20) p.y = height + 20;
        if (p.x > width + 20) p.x = -20;
        if (p.x < -20) p.x = width + 20;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);

        if (p.isPetal) {
          ctx.beginPath();
          ctx.ellipse(0, 0, p.size * 0.7, p.size * 1.3, 0, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(235, 185, 195, ${p.opacity * 0.7})`;
          ctx.fill();
        } else {
          ctx.beginPath();
          ctx.arc(0, 0, p.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(212, 175, 55, ${p.opacity * 0.9})`;
          ctx.fill();
        }
        ctx.restore();
      });

      // Active Burst Particles
      const currentBurst = burstParticlesRef.current;
      for (let i = currentBurst.length - 1; i >= 0; i--) {
        const bp = currentBurst[i];
        bp.x += bp.vx;
        bp.y += bp.vy;
        bp.vy += bp.isShard ? 0.35 : 0.15; // Gravity
        bp.vx *= 0.97;
        bp.rot += bp.vRot;
        bp.life++;
        bp.opacity = Math.max(0, 1 - bp.life / bp.maxLife);

        ctx.save();
        ctx.translate(bp.x, bp.y);
        ctx.rotate(bp.rot);

        if (bp.isShard) {
          ctx.beginPath();
          ctx.moveTo(-bp.size, -bp.size);
          ctx.lineTo(bp.size, -bp.size * 0.4);
          ctx.lineTo(bp.size * 0.3, bp.size);
          ctx.closePath();
          ctx.fillStyle = bp.color;
          ctx.globalAlpha = bp.opacity;
          ctx.fill();
        } else {
          ctx.beginPath();
          ctx.ellipse(0, 0, bp.size * 0.6, bp.size * 1.2, 0, 0, Math.PI * 2);
          ctx.fillStyle = bp.color;
          ctx.globalAlpha = bp.opacity;
          ctx.fill();
        }
        ctx.restore();

        if (bp.life >= bp.maxLife) {
          currentBurst.splice(i, 1);
        }
      }

      animId = requestAnimationFrame(render);
    }

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animId);
    };
  }, []);

  // 4. Mouse Tilt on Desktop
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isOpening || isDone || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setTilt({ x: (y - 0.5) * -12, y: (x - 0.5) * 12 });
    setSealGlint({ x: 30 + (1 - x) * 40, y: 30 + (1 - y) * 40 });
  };

  const handleMouseLeave = () => {
    if (!isOpening && !isDone) {
      setTilt({ x: 0, y: 0 });
      setSealGlint({ x: 40, y: 40 });
    }
  };

  // 5. Unsealing Trigger
  const handleUnsealClick = () => {
    if (isOpening || isDone) return;
    setIsOpening(true);
    setFlash(true);
    playSacredUnsealSound();

    if (sealRef.current) {
      const rect = sealRef.current.getBoundingClientRect();
      triggerWaxFracture(rect.left + rect.width / 2, rect.top + rect.height / 2);
    } else {
      triggerWaxFracture(window.innerWidth / 2, window.innerHeight / 2);
    }

    setTimeout(() => setFlash(false), 500);

    // After unsealing animation completes, cleanly transition into main site
    setTimeout(() => {
      setIsDone(true);
      setTimeout(onUnseal, 650);
    }, 1650);
  };

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col items-center justify-between px-4 py-6 sm:py-8 select-none overflow-hidden"
          style={{
            backgroundColor: "#FAF7F2",
          }}
          exit={{
            opacity: 0,
            scale: 1.06,
            filter: "blur(6px)",
          }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* 1. Lush Romantic Floral Field Ambient Background */}
          <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            <Image
              src="/images/romantic-flower-field.webp"
              alt="Romantic Garden Rose Field"
              fill
              priority
              quality={90}
              className="object-cover object-center scale-105 filter brightness-[1.03] contrast-[0.98]"
            />
            {/* Soft Sunlit Radial Glow & Vignette */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_850px_at_50%_48%,rgba(255,253,249,0.35)_0%,rgba(255,253,249,0.7)_60%,rgba(245,238,228,0.92)_100%)]" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#FFFDF9]/85 via-transparent via-50% to-[#24171A]/40" />
          </div>

          {/* 2. Background Petals Canvas */}
          <canvas
            ref={canvasRef}
            className="pointer-events-none absolute inset-0 z-10 opacity-80"
          />

          {/* Golden Flash on Unseal */}
          <AnimatePresence>
            {flash && (
              <motion.div
                initial={{ opacity: 0.9 }}
                animate={{ opacity: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="pointer-events-none absolute inset-0 z-40 bg-[radial-gradient(circle_at_center,rgba(255,248,225,0.98),rgba(212,175,55,0.5)_40%,transparent_75%)]"
              />
            )}
          </AnimatePresence>

          {/* Top Header: Music Toggle & Sacred Invocation */}
          <div className="relative z-20 w-full max-w-5xl flex items-center justify-between">
            <div className="flex items-center gap-2 rounded-full border border-amber-300/60 bg-[#FFFDF9]/90 px-4 py-1.5 shadow-sm backdrop-blur-md">
              <span className="font-sanskrit text-sm sm:text-base text-amber-900 font-semibold tracking-normal">
                ॥ श्री गणेशाय नमः ॥
              </span>
            </div>

            <button
              onClick={onToggleMusic}
              data-cursor="interactive"
              className="inline-flex items-center gap-2 rounded-full border border-amber-400/60 bg-[#FFFDF9]/90 px-4 py-1.5 font-body text-[11px] uppercase tracking-widest text-amber-900 shadow-sm backdrop-blur-md hover:border-amber-600 transition-colors"
              aria-label="Toggle Shehnai soundtrack"
            >
              <span className="text-amber-700 animate-pulse">♫</span>
              <span>{isPlayingMusic ? "Shehnai Playing" : "Play Shehnai"}</span>
            </button>
          </div>

          {/* Top Editorial Masthead (Subtle romantic greeting) */}
          <div className="relative z-20 text-center my-auto pt-2 pb-3">
            <div className="inline-block rounded-3xl border border-amber-300/60 bg-[#FFFDF9]/92 px-6 sm:px-9 py-3 shadow-[0_8px_25px_rgba(70,45,20,0.08)] backdrop-blur-md">
              <p className="font-cinzel text-[10px] sm:text-xs uppercase tracking-widest3 text-amber-950 font-bold">
                The Royal Patrika &middot; Wedding Nuptials
              </p>
              <h1 className="mt-1 font-display text-3xl sm:text-4xl md:text-5xl italic text-amber-900 font-normal">
                Vinayak &amp; Ririn
              </h1>
              <p className="mt-1 font-body text-[11px] sm:text-xs text-[#2C2225]/75 uppercase tracking-widest">
                13th &ndash; 16th January 2027 &middot; Mahi Resort, Patti, Punjab
              </p>
            </div>
          </div>

          {/* Master Stage: The Proper Sealed Royal Envelope (Grand Scaled Size) */}
          <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="relative z-20 w-full max-w-[420px] sm:max-w-[520px] md:max-w-[600px] lg:max-w-[660px] xl:max-w-[700px] my-auto"
            style={{
              perspective: "1400px",
              transformStyle: "preserve-3d",
              transform: isOpening ? "none" : `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
              transition: isOpening ? "transform 1.1s cubic-bezier(0.25, 1, 0.35, 1)" : "transform 0.15s ease-out",
            }}
          >
            {/* The Envelope Body */}
            <div className="relative w-full aspect-[14/9.6] rounded-[24px] sm:rounded-[32px] overflow-hidden bg-[#FFFDF9] shadow-[0_35px_90px_-15px_rgba(40,20,5,0.48),0_0_60px_rgba(212,175,55,0.28)] border-2 border-amber-400/70">
              {/* Embossed Paper Texture on Envelope Base */}
              <div className="absolute inset-0 z-0">
                <Image
                  src="/images/embossed-paper.webp"
                  alt="Royal Envelope Texture"
                  fill
                  priority
                  unoptimized
                  className="object-cover opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-amber-100/25 via-transparent to-amber-900/10 pointer-events-none" />
                <div className="absolute inset-3 rounded-[20px] border border-amber-300/40 pointer-events-none" />
              </div>

              {/* Secret Inner Card (Slides Up out of Envelope upon opening) */}
              <motion.div
                className={`absolute inset-3 sm:inset-4 z-10 rounded-[18px] sm:rounded-[20px] overflow-hidden shadow-md bg-[#FAF7F2] ${
                  isOpening ? "pointer-events-auto" : "pointer-events-none"
                }`}
                initial={{ y: 0, opacity: 0 }}
                animate={
                  isOpening
                    ? { y: "-45%", opacity: 1, scale: 1.02 }
                    : { y: 0, opacity: 0 }
                }
                transition={{ delay: 0.25, duration: 1.1, ease: [0.25, 1, 0.35, 1] }}
              >
                <Image
                  src="/images/couple-hero.webp"
                  alt="Vinayak & Ririn"
                  fill
                  sizes="480px"
                  quality={92}
                  className="object-cover object-[50%_25%]"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-[#181214]/60 via-[#181214]/30 to-[#181214]/85" />
                <div className="absolute inset-0 flex flex-col items-center justify-between p-4 text-center text-[#FFFDF9]">
                  <div className="inline-flex items-center gap-1 rounded-full border border-amber-400/60 bg-[#FFFDF9]/95 px-3 py-0.5 text-[10px] text-amber-900 shadow-sm backdrop-blur-md">
                    <span>🪷</span>
                    <span className="font-sanskrit text-xs">॥ श्री गणेशाय नमः ॥</span>
                    <span>🪷</span>
                  </div>
                  <div>
                    <h2 className="font-display text-2xl sm:text-3xl italic text-[#FFFDF9]">
                      Vinayak &amp; Ririn
                    </h2>
                    <p className="mt-1 font-body text-[10px] uppercase tracking-widest text-[#FCE182]">
                      Shubh Vivah &middot; January 2027
                    </p>
                  </div>
                  <p className="font-sanskrit text-[11px] text-[#FCE182]">
                    ॥ सदा सौभाग्यवती भव ॥
                  </p>
                </div>
              </motion.div>

              {/* Lower Body of Envelope (Pocket holding the letter) */}
              <div
                className="absolute inset-0 z-20 pointer-events-none overflow-hidden"
                style={{
                  clipPath: "polygon(0% 40%, 50% 72%, 100% 40%, 100% 100%, 0% 100%)",
                  boxShadow: "0 -8px 25px rgba(70,45,20,0.18)",
                }}
              >
                <div className="relative w-full h-full bg-[#FAF7F2]">
                  <Image
                    src="/images/embossed-paper.webp"
                    alt="Envelope Pocket"
                    fill
                    unoptimized
                    className="object-cover opacity-95"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-amber-900/15 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-center whitespace-nowrap">
                    <p className="font-sanskrit text-xs text-amber-900/80">
                      ॥ सदा सौभाग्यवती भव ॥
                    </p>
                    <p className="font-cinzel text-[9px] uppercase tracking-widest2 text-[#2C2225]/50">
                      Patti &middot; Punjab
                    </p>
                  </div>
                </div>
              </div>

              {/* Braided Gold Cords Crossing Envelope Center */}
              <motion.div
                className="absolute top-1/2 left-0 right-0 -translate-y-1/2 flex flex-col gap-1 z-20 pointer-events-none"
                animate={isOpening ? { scaleX: 0, opacity: 0 } : { scaleX: 1, opacity: 1 }}
                transition={{ duration: 0.45, ease: "easeInOut" }}
              >
                {[1, 2, 3].map((c) => (
                  <div
                    key={`gateway-cord-${c}`}
                    className="h-[3px] w-full shadow-sm"
                    style={{
                      background:
                        "repeating-linear-gradient(90deg, #96671C 0px, #FCE38A 4px, #D4AF37 8px, #96671C 12px)",
                    }}
                  />
                ))}
              </motion.div>

              {/* Cream Peony Clusters Flanking the Seal */}
              <motion.div
                className="absolute right-[calc(50%+46px)] sm:right-[calc(50%+58px)] top-1/2 -translate-y-1/2 w-[105px] h-[105px] sm:w-[130px] sm:h-[130px] md:w-[150px] md:h-[150px] pointer-events-none z-20 drop-shadow-md"
                animate={isOpening ? { x: -160, opacity: 0 } : { x: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: [0.25, 1, 0.35, 1] }}
              >
                <Image
                  src="/images/cream-peony.webp"
                  alt="Floral cluster"
                  fill
                  unoptimized
                  className="object-contain"
                />
              </motion.div>

              <motion.div
                className="absolute left-[calc(50%+46px)] sm:left-[calc(50%+58px)] top-1/2 -translate-y-1/2 w-[105px] h-[105px] sm:w-[130px] sm:h-[130px] md:w-[150px] md:h-[150px] pointer-events-none z-20 scale-x-[-1] drop-shadow-md"
                animate={isOpening ? { x: 160, opacity: 0 } : { x: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: [0.25, 1, 0.35, 1] }}
              >
                <Image
                  src="/images/cream-peony.webp"
                  alt="Floral cluster"
                  fill
                  unoptimized
                  className="object-contain"
                />
              </motion.div>

              {/* Top Flap of Envelope: Folds UPWARD in 3D when unsealed! */}
              <motion.div
                className="absolute inset-x-0 top-0 h-[65%] z-20 pointer-events-none"
                style={{
                  clipPath: "polygon(0% 0%, 100% 0%, 50% 100%)",
                  transformOrigin: "top center",
                  transformStyle: "preserve-3d",
                  boxShadow: "0 10px 30px rgba(70,45,20,0.3)",
                }}
                animate={
                  isOpening
                    ? { rotateX: -160, opacity: 0 }
                    : { rotateX: 0, opacity: 1 }
                }
                transition={{ duration: 1.15, ease: [0.25, 1, 0.35, 1] }}
              >
                <div className="relative w-full h-full bg-[#FAF7F2]">
                  <Image
                    src="/images/embossed-paper.webp"
                    alt="Envelope Flap"
                    fill
                    unoptimized
                    className="object-cover opacity-95"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-amber-900/15" />
                  <div className="absolute top-2.5 left-1/2 -translate-x-1/2">
                    <div className="inline-flex items-center gap-1.5 rounded-full border border-amber-400/60 bg-[#FFFDF9]/95 px-3.5 py-0.5 text-[10px] text-amber-900 shadow-sm backdrop-blur-md">
                      <span>🪷</span>
                      <span className="font-sanskrit text-xs">॥ श्री गणेशाय नमः ॥</span>
                      <span>🪷</span>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* 24K GOLD WAX SEAL BUTTON IN CENTER */}
              <AnimatePresence>
                {!isOpening && (
                  <motion.div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[40] pointer-events-auto"
                    exit={{
                      scale: [1, 1.25, 0],
                      opacity: [1, 1, 0],
                      rotate: [0, 8, -12],
                      filter: "blur(3px)",
                    }}
                    transition={{ duration: 0.38, ease: "easeInOut" }}
                  >
                    <button
                      ref={sealRef}
                      onClick={handleUnsealClick}
                      data-cursor="seal"
                      className="group relative w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 flex items-center justify-center p-0 transition-transform duration-300 hover:scale-108 active:scale-95 focus:outline-none cursor-pointer"
                      aria-label="Unseal Royal Wedding Invitation"
                    >
                      <div className="absolute -inset-2 rounded-full bg-amber-400/35 blur-md animate-pulse opacity-70 group-hover:opacity-100 transition-opacity" />
                      <div className="relative w-full h-full drop-shadow-[0_12px_22px_rgba(90,60,20,0.45)] drop-shadow-[0_0_20px_rgba(212,175,55,0.5)]">
                        <Image
                          src="/images/royal-wax-seal.webp"
                          alt="VR 2027 Royal Wax Seal"
                          fill
                          priority
                          unoptimized
                          className="object-contain pointer-events-none select-none transition-transform duration-300 group-hover:rotate-2"
                        />
                        {/* Dynamic 24K Gold Medallion Glint */}
                        <div
                          className="absolute inset-0 rounded-full pointer-events-none mix-blend-overlay transition-opacity duration-200 opacity-60 group-hover:opacity-100"
                          style={{
                            background: `radial-gradient(circle 35px at ${sealGlint.x}% ${sealGlint.y}%, rgba(255, 255, 255, 0.95), transparent 70%)`,
                          }}
                        />
                      </div>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Centered Floating Pill Prompt under Envelope */}
            <AnimatePresence>
              {!isOpening && (
                <motion.div
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 4 }}
                  transition={{ duration: 0.3 }}
                  className="mt-5 flex justify-center pointer-events-none z-30"
                >
                  <motion.div
                    animate={{ y: [0, -4, 0] }}
                    transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                    className="whitespace-nowrap text-[10.5px] sm:text-xs font-bold uppercase tracking-widest2 text-amber-950 bg-[#FFFDF9]/95 px-5 py-2 rounded-full border border-amber-400/70 shadow-[0_4px_16px_rgba(100,70,30,0.18)] backdrop-blur-md"
                  >
                    ✦ Click Seal to Open ✦
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Bottom Coordinates & Vedic Proclamation */}
          <div className="relative z-20 text-center my-auto pb-2">
            <div className="inline-block rounded-full border border-amber-300/50 bg-[#FFFDF9]/90 px-6 py-2 shadow-sm backdrop-blur-md">
              <p className="font-sanskrit text-xs sm:text-sm text-amber-900/90 font-medium tracking-wide">
                ॥ मांगल्यं तन्तुनानेन मम जीवनहेतुना ॥
              </p>
              <p className="mt-0.5 font-body text-[10px] sm:text-[11px] uppercase tracking-widest text-[#2C2225]/70">
                Two Families &middot; Two Cultures &middot; One Eternal Love
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import Lenis from "lenis";
import CustomCursor from "@/components/CustomCursor";
import RoyalPreloader from "@/components/RoyalPreloader";
import RoyalEnvelopeGateway from "@/components/RoyalEnvelopeGateway";


// ==========================================
// SACRED CEREMONIES & 4-DAY ROYAL TIMELINE
// ==========================================
const CEREMONIES = [
  {
    step: "01",
    date: "Tuesday, 13th Jan 2027",
    time: "06:30 PM Onwards",
    title: "The Royal Lohri Celebration",
    sanskrit: "लोहड़ी उत्सव एवं अग्नि पूजन",
    desc: "Festive bonfire ceremony, traditional rewri & peanuts, live Punjabi folk giddha and bhangra, warming up the royal wedding festivities.",
    badge: "Day 1 • Lohri Eve",
  },
  {
    step: "02",
    date: "Wednesday, 14th Jan 2027",
    time: "05:00 PM Onwards",
    title: "Mehndi & Sangeet Utsav",
    sanskrit: "मेहंदी एवं संगीत उत्सव",
    desc: "Auspicious bridal henna adornment, exuberant family musical performances, live dhol rhythms, celebratory dances, and Punjabi feasts.",
    badge: "Day 2 • Mehndi & Sangeet",
  },
  {
    step: "03",
    date: "Thursday, 15th Jan 2027",
    time: "08:00 PM - Late Night",
    title: "The Auspicious Jaggo Night",
    sanskrit: "शाही जग्गो महोत्सव",
    desc: "The sacred ancestral illuminated brass Jaggo procession on heads, traditional folk boliyan, and vibrant all-night singing through the streets of Patti.",
    badge: "Day 3 • Jaggo Night",
  },
  {
    step: "04",
    date: "Saturday, 16th Jan 2027",
    time: "07:30 PM – 03:00 AM",
    title: "Shubh Vivah & Grand Night Wedding Party",
    sanskrit: "शुभ विवाह एवं भव्य रात्रि स्वागत समारोह",
    desc: "The grand wedding ceremony and celebration! Evening Baraat Agaman (7:30 PM), Shubh Jaimala, Vedic Vivah Pheras, followed by the royal feast, live DJ, music, cocktails, and celebrations continuing until 3:00 AM in the morning.",
    badge: "Day 4 • Wedding & Night Party",
  },
];

const GALLERY = [
  { src: "/gallery/movement-1.webp", title: "First Light", caption: "Where our journey quietly began", rot: "-rotate-1" },
  { src: "/gallery/movement-2.webp", title: "Golden Hour Glow", caption: "Sunsets shared in quiet laughter", rot: "rotate-1" },
  { src: "/gallery/movement-3.webp", title: "Serenade in Red", caption: "Celebrating sacred tradition & elegance", rot: "-rotate-2" },
  { src: "/gallery/movement-4.webp", title: "Whispers & Promises", caption: "Moments meant to last a lifetime", rot: "rotate-2" },
  { src: "/gallery/movement-5.webp", title: "Embrace of Tomorrow", caption: "Two hearts beating in harmony", rot: "-rotate-1" },
  { src: "/gallery/movement-6.webp", title: "The Celebration", caption: "Ready for our cherished union", rot: "rotate-1" },
];

// Helper Component: Editorial Masked Split-Text Reveal
function MaskedHeading({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-20px" }}
      className="overflow-hidden"
    >
      <motion.div
        variants={{
          hidden: { y: "115%", opacity: 0 },
          visible: { y: "0%", opacity: 1 },
        }}
        transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
        className={className}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

const WEDDING_TIMESTAMP = new Date("2027-01-16T19:30:00+05:30").getTime();

export default function MasterWeddingWebsite() {
  // Opening State (Pinterest Diagonal Flaps Unboxing & Royal Envelope Gateway)
  const [isUnsealed, setIsUnsealed] = useState(false);
  const [isOpened, setIsOpened] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [flash, setFlash] = useState(false);

  // Parallax Tilt & Dynamic 24K Specular Sheen for Invitation Card
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [lightPos, setLightPos] = useState({ x: 50, y: 50 });
  const [sealGlint, setSealGlint] = useState({ x: 40, y: 40 });

  const cardRef = useRef<HTMLDivElement>(null);
  const sealRef = useRef<HTMLButtonElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Active Burst Particles (Wax fracture shards & celebration marigolds)
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

  // Audio & Gallery
  const [isPlaying, setIsPlaying] = useState(false);
  const galleryRef = useRef<HTMLDivElement>(null);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  // RSVP Form State
  const [rsvpName, setRsvpName] = useState("");
  const [rsvpAttending, setRsvpAttending] = useState<"yes" | "no">("yes");
  const [rsvpGuests, setRsvpGuests] = useState(1);
  const [rsvpMessage, setRsvpMessage] = useState("");
  const [rsvpSubmitted, setRsvpSubmitted] = useState(false);
  const [copiedBank, setCopiedBank] = useState(false);
  const [copiedHashtag, setCopiedHashtag] = useState(false);

  const bgAudioRef = useRef<HTMLAudioElement | null>(null);
  const lenisRef = useRef<Lenis | null>(null);

  // ==========================================
  // LENIS INERTIAL LUXURY SMOOTH SCROLL (DESKTOP)
  // ==========================================
  useEffect(() => {
    // On touch mobile screens, native 120Hz iOS/Android inertia is vastly smoother
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    const rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Countdown timer
  useEffect(() => {
    function updateCountdown() {
      const diff = Math.max(0, WEDDING_TIMESTAMP - Date.now());
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    }
    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);
    return () => clearInterval(timer);
  }, []);

  // ==========================================
  // AMBIENT GOLDEN DUST & ROSE PETAL CANVAS (WITH BURST PHYSICS)
  // ==========================================
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

    // Particles: Golden stardust + soft rose petals
    interface Particle {
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

    const particles: Particle[] = Array.from({ length: 32 }, (_, i) => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: i % 3 === 0 ? Math.random() * 8 + 6 : Math.random() * 2.5 + 1,
      vx: (Math.random() - 0.5) * 0.4,
      vy: i % 3 === 0 ? Math.random() * 0.5 + 0.3 : (Math.random() - 0.5) * 0.3 - 0.2,
      rot: Math.random() * Math.PI * 2,
      vRot: (Math.random() - 0.5) * 0.02,
      opacity: Math.random() * 0.5 + 0.2,
      isPetal: i % 3 === 0,
    }));

    function render() {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);

      // 1. Ambient Golden Dust & Soft Petals
      particles.forEach((p) => {
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
          ctx.fillStyle = `rgba(235, 185, 195, ${p.opacity * 0.6})`;
          ctx.fill();
        } else {
          ctx.beginPath();
          ctx.arc(0, 0, p.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(212, 175, 55, ${p.opacity * 0.9})`;
          ctx.fill();
        }
        ctx.restore();
      });

      // 2. Dynamic Physical Bursts (Wax Fracture Micro-Shards & Marigold Petals)
      const currentBurst = burstParticlesRef.current;
      for (let i = currentBurst.length - 1; i >= 0; i--) {
        const bp = currentBurst[i];
        bp.x += bp.vx;
        bp.y += bp.vy;
        bp.rot += bp.vRot;
        bp.life++;
        bp.vy += bp.isShard ? 0.24 : 0.09; // gravity
        bp.vx *= 0.96; // air drag
        bp.opacity = Math.max(0, 1 - bp.life / bp.maxLife);

        if (bp.opacity <= 0 || bp.y > height + 40) {
          currentBurst.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.translate(bp.x, bp.y);
        ctx.rotate(bp.rot);
        ctx.fillStyle = bp.color;
        ctx.globalAlpha = bp.opacity;

        if (bp.isShard) {
          // Sharp angular physical golden wax shard
          ctx.beginPath();
          ctx.moveTo(-bp.size, -bp.size * 0.6);
          ctx.lineTo(bp.size * 0.8, -bp.size);
          ctx.lineTo(bp.size, bp.size * 0.8);
          ctx.lineTo(-bp.size * 0.4, bp.size);
          ctx.closePath();
          ctx.shadowColor = "#D4AF37";
          ctx.shadowBlur = 8;
          ctx.fill();
        } else {
          // Auspicious Marigold / Rose petal
          ctx.beginPath();
          ctx.ellipse(0, 0, bp.size * 0.8, bp.size * 1.4, 0, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      }

      animId = requestAnimationFrame(render);
    }
    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Trigger: 38 Golden Wax Shards on Unsealing
  const triggerWaxFracture = useCallback((cx: number, cy: number) => {
    const burst: any[] = [];
    const colors = ["#FCE38A", "#D4AF37", "#B38018", "#E5A93C", "#FFFDF9", "#96671C"];
    for (let i = 0; i < 42; i++) {
      const angle = (Math.PI * 2 * i) / 42 + (Math.random() - 0.5) * 0.4;
      const speed = 4 + Math.random() * 8.5;
      burst.push({
        x: cx + (Math.random() - 0.5) * 20,
        y: cy + (Math.random() - 0.5) * 20,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 2.5,
        size: Math.random() * 6 + 3,
        rot: Math.random() * Math.PI * 2,
        vRot: (Math.random() - 0.5) * 0.35,
        opacity: 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        isShard: true,
        life: 0,
        maxLife: Math.floor(Math.random() * 25 + 50),
      });
    }
    burstParticlesRef.current.push(...burst);
  }, []);

  // Trigger: Auspicious Marigold & Rose Shower on Blessing / RSVP
  const triggerCelebrationShower = useCallback(() => {
    const burst: any[] = [];
    const colors = ["#F59E0B", "#D97706", "#D4AF37", "#F43F5E", "#FB7185", "#FEF08A"];
    const width = typeof window !== "undefined" ? window.innerWidth : 1200;
    for (let i = 0; i < 48; i++) {
      burst.push({
        x: Math.random() * width,
        y: -15 - Math.random() * 120,
        vx: (Math.random() - 0.5) * 2,
        vy: 1.5 + Math.random() * 3,
        size: Math.random() * 7 + 5,
        rot: Math.random() * Math.PI * 2,
        vRot: (Math.random() - 0.5) * 0.08,
        opacity: 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        isShard: false,
        life: 0,
        maxLife: Math.floor(Math.random() * 60 + 110),
      });
    }
    burstParticlesRef.current.push(...burst);
  }, []);

  // Web Audio Chime Synthesis (Tactile wax snap + 5-note sacred temple chime)
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
      snap.frequency.setValueAtTime(260, now);
      snap.frequency.exponentialRampToValueAtTime(35, now + 0.07);
      snapG.gain.setValueAtTime(0.4, now);
      snapG.gain.exponentialRampToValueAtTime(0.001, now + 0.07);
      snap.connect(snapG);
      snapG.connect(ctx.destination);
      snap.start(now);
      snap.stop(now + 0.08);

      // Pentatonic temple bell chord
      [369.99, 466.16, 554.37, 739.99, 932.33].forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const g = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, now + i * 0.08);
        g.gain.setValueAtTime(0, now + i * 0.08);
        g.gain.linearRampToValueAtTime(0.12, now + i * 0.08 + 0.03);
        g.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.08 + 2.2);
        osc.connect(g);
        g.connect(ctx.destination);
        osc.start(now + i * 0.08);
        osc.stop(now + i * 0.08 + 2.3);
      });
    } catch {
      // AudioContext unavailable
    }
  }, []);

  // Auspicious High Harmonic Temple Bell Chime for Blessings
  const playTempleBellSound = useCallback(() => {
    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      if (ctx.state === "suspended") ctx.resume();
      const now = ctx.currentTime;
      [1046.5, 1318.5, 1567.98, 2093].forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const g = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, now + i * 0.05);
        g.gain.setValueAtTime(0, now + i * 0.05);
        g.gain.linearRampToValueAtTime(0.08, now + i * 0.05 + 0.02);
        g.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.05 + 1.8);
        osc.connect(g);
        g.connect(ctx.destination);
        osc.start(now + i * 0.05);
        osc.stop(now + i * 0.05 + 1.9);
      });
    } catch {}
  }, []);

  // Soft celestial harmonic ping for horological dials
  const playDialHoverSound = useCallback(() => {
    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(880, now);
      osc.frequency.exponentialRampToValueAtTime(1320, now + 0.035);
      gain.gain.setValueAtTime(0.012, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.035);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.04);
    } catch {}
  }, []);

  // Soft tactile paper rustle for interactive buttons and cards
  const playPaperRustle = useCallback(() => {
    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.exponentialRampToValueAtTime(70, now + 0.045);
      gain.gain.setValueAtTime(0.02, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.045);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.05);
    } catch {}
  }, []);

  // Smooth scroll gallery carousel left / right
  const scrollGallery = (direction: "left" | "right") => {
    playPaperRustle();
    if (galleryRef.current) {
      const scrollAmount = Math.min(galleryRef.current.clientWidth * 0.82, 340);
      galleryRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  // Handle Pinterest-Style Unsealing
  const handleUnseal = () => {
    if (isAnimating || isOpened) return;
    setIsAnimating(true);
    setFlash(true);
    playSacredUnsealSound();

    if (sealRef.current) {
      const rect = sealRef.current.getBoundingClientRect();
      triggerWaxFracture(rect.left + rect.width / 2, rect.top + rect.height / 2);
    } else {
      triggerWaxFracture(window.innerWidth / 2, window.innerHeight / 2);
    }

    if (bgAudioRef.current) {
      bgAudioRef.current.volume = 0.55;
      bgAudioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }

    setTimeout(() => setFlash(false), 500);

    // Flaps glide open smoothly in 1.25s
    setTimeout(() => {
      setIsOpened(true);
      setIsAnimating(false);
    }, 1250);
  };

  const handleGatewayUnseal = () => {
    setIsUnsealed(true);
    setIsOpened(true);
    if (bgAudioRef.current) {
      bgAudioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  const handleReseal = () => {
    window.scrollTo({ top: 0, behavior: "instant" });
    setIsUnsealed(false);
    setIsOpened(false);
    setIsAnimating(false);
  };

  const toggleMusic = () => {
    if (!bgAudioRef.current) return;
    if (isPlaying) {
      bgAudioRef.current.pause();
      setIsPlaying(false);
    } else {
      bgAudioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  // 3D Mouse Parallax & Dynamic Specular Sheen on Invitation Card
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isOpened || isAnimating || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setTilt({ x: (y - 0.5) * -11, y: (x - 0.5) * 11 });
    setLightPos({ x: x * 100, y: y * 100 });
    setSealGlint({ x: 30 + (1 - x) * 40, y: 30 + (1 - y) * 40 });
  };

  const handleMouseLeave = () => {
    if (!isOpened && !isAnimating) {
      setTilt({ x: 0, y: 0 });
      setLightPos({ x: 50, y: 50 });
      setSealGlint({ x: 40, y: 40 });
    }
  };

  const googleCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
    "Royal Wedding Festivities: Vinayak & Ririn (13th - 16th Jan 2027)"
  )}&dates=20270113T130000Z/20270116T213000Z&details=${encodeURIComponent(
    "Witness the 4-day royal wedding celebrations of Vinayak & Ririn: 13th Jan Lohri, 14th Jan Mehndi & Sangeet, 15th Jan Jaggo Night, and 16th Jan Grand Night Wedding Party (7:30 PM to 3:00 AM) at Mahi Resort, Patti, Punjab."
  )}&location=${encodeURIComponent("Mahi Resort, Patti, Punjab")}`;

  const copyBankInfo = async () => {
    try {
      await navigator.clipboard.writeText("BANK RAKYAT INDONESIA 323001031687534 RIRIN OKTOLINDA SARAGIH");
      setCopiedBank(true);
      playTempleBellSound();
      triggerCelebrationShower();
      setTimeout(() => setCopiedBank(false), 2000);
    } catch {
      // fallback
    }
  };

  const copyHashtag = async () => {
    try {
      await navigator.clipboard.writeText("#VinayakWedsRirin");
      setCopiedHashtag(true);
      playTempleBellSound();
      triggerCelebrationShower();
      setTimeout(() => setCopiedHashtag(false), 2400);
    } catch {
      // fallback
    }
  };

  return (
    <main
      className={`relative min-h-screen bg-[#FAF7F2] text-[#2C2225] font-body selection:bg-amber-200 selection:text-amber-950 overflow-x-hidden ${
        !isUnsealed ? "overflow-y-hidden max-h-screen" : ""
      }`}
    >
      {/* 1.2s Royal Entrance Preloader */}
      <RoyalPreloader />

      {/* Romantic Sealed Envelope Gateway Portal */}
      <AnimatePresence>
        {!isUnsealed && (
          <RoyalEnvelopeGateway
            onUnseal={handleGatewayUnseal}
            isPlayingMusic={isPlaying}
            onToggleMusic={toggleMusic}
          />
        )}
      </AnimatePresence>

      {/* Contextual Custom Cursor for Desktop */}
      <CustomCursor />

      {/* Background Shehnai Audio */}
      <audio ref={bgAudioRef} src="/audio/wedding-bgm.mp3" loop preload="none" />

      {/* Ambient Canvas: Gold Specks & Drifting Petals */}
      <canvas
        ref={canvasRef}
        className="pointer-events-none fixed inset-0 z-30 opacity-70"
      />

      {/* Floating Audio Controller (Only visible when unsealed into main site) */}
      {isUnsealed && (
        <button
          onClick={toggleMusic}
          aria-label={isPlaying ? "Mute ceremonial music" : "Play ceremonial music"}
          className="fixed top-3.5 sm:top-5 right-3.5 sm:right-5 z-50 flex items-center gap-1.5 sm:gap-2 rounded-full border border-amber-400/50 bg-[#FFFDF9]/90 px-3 sm:px-4 py-1.5 sm:py-2 text-[11px] sm:text-xs text-amber-900 shadow-md backdrop-blur-md transition-all hover:bg-white hover:scale-105 active:scale-95"
        >
          <div className="flex items-end gap-1 h-3.5">
            {[1, 2, 3, 4].map((bar) => (
              <span
                key={bar}
                className={`w-0.5 rounded-full bg-amber-700 transition-all duration-300 ${
                  isPlaying ? "animate-pulse" : "h-1 opacity-50"
                }`}
                style={{
                  height: isPlaying ? `${bar * 3 + 3}px` : "3px",
                  animationDelay: `${bar * 0.15}s`,
                }}
              />
            ))}
          </div>
          <span className="font-body text-[9.5px] sm:text-[10px] uppercase tracking-widest2 font-semibold">
            {isPlaying ? "Shehnai Playing" : "Play Music"}
          </span>
        </button>
      )}

      {/* ========================================================
          SCENE 1: THE GRAND ROYAL HERO SECTION (The Unveiled Nuptials)
          ======================================================== */}
      <section className="relative min-h-screen flex flex-col justify-between items-center px-4 py-8 sm:px-6 lg:px-12 overflow-hidden bg-[radial-gradient(ellipse_at_center,#FFFDF9_0%,#F8F3EA_55%,#EDE3D3_100%)]">
        {/* Luxury Peripheral Architectural Accents (Desktop Editorial Marks) */}
        <div className="hidden xl:flex flex-col gap-1 absolute left-10 top-12 text-left pointer-events-none z-10 opacity-75">
          <span className="font-cinzel text-[11px] font-semibold text-amber-950 tracking-widest2">
            ROYAL WEDDING FOLIO
          </span>
          <span className="font-body text-[10px] uppercase tracking-widest text-[#2C2225]/60">
            PUNJAB, BHARAT &middot; 31.2809&deg; N, 74.8569&deg; E
          </span>
          <span className="h-px w-20 bg-amber-400/50 mt-1" />
        </div>

        <div className="hidden xl:flex flex-col gap-1 absolute left-10 bottom-12 text-left pointer-events-none z-10 opacity-75">
          <span className="h-px w-20 bg-amber-400/50 mb-1" />
          <span className="font-cinzel text-[10px] tracking-widest2 text-amber-900 font-semibold">
            AUSPICIOUS SHUBH MUHURAT
          </span>
          <span className="font-body text-[10px] tracking-widest text-[#2C2225]/60">
            16 JAN &middot; NIGHT WEDDING PARTY (7:30 PM &ndash; 3:00 AM)
          </span>
        </div>

        <div className="hidden xl:flex flex-col gap-1 absolute right-10 bottom-12 text-right pointer-events-none z-10 opacity-75">
          <span className="h-px w-20 bg-amber-400/50 mb-1 ml-auto" />
          <span className="font-sanskrit text-xs text-amber-900 font-medium tracking-normal">
            ॥ सदा सौभाग्यवती भव ॥
          </span>
          <span className="font-cinzel text-[10px] uppercase tracking-widest2 text-[#2C2225]/60">
            SOLEMNIZED UNDER VEDIC TRADITION
          </span>
        </div>

        {/* Top Centered Editorial Masthead */}
        <div className="relative z-20 text-center mb-6 sm:mb-8 pt-12 sm:pt-4">
          <div className="inline-flex items-center gap-3 mb-2.5">
            <span className="h-px w-10 sm:w-16 bg-gradient-to-r from-transparent to-amber-600/60" />
            <div className="inline-flex items-center gap-1.5 rounded-full border border-amber-400/70 bg-[#FFFDF9]/95 px-4 py-1 text-[11px] text-amber-900 shadow-sm backdrop-blur-md">
              <span>🪷</span>
              <span className="font-sanskrit text-xs sm:text-sm font-semibold tracking-normal">
                ॥ श्री गणेशाय नमः ॥
              </span>
              <span>🪷</span>
            </div>
            <span className="h-px w-10 sm:w-16 bg-gradient-to-l from-transparent to-amber-600/60" />
          </div>
          <p className="font-cinzel text-xs sm:text-sm uppercase tracking-widest3 text-amber-950 font-bold">
            Shubh Vivah &middot; 4-Day Royal Celebrations
          </p>
          <h1 className="mt-1 font-display text-4xl sm:text-5xl md:text-6xl italic text-amber-900 font-normal">
            Vinayak &amp; Ririn
          </h1>
          <p className="mt-1.5 font-body text-xs sm:text-sm text-[#2C2225]/75 uppercase tracking-widest">
            13th &ndash; 16th January 2027 &middot; Mahi Resort, Patti, Punjab
          </p>
          <div className="mt-2 inline-flex items-center gap-2 rounded-full border border-amber-300/80 bg-amber-50/80 px-4 py-1 text-[11px] font-semibold text-amber-950 shadow-sm">
            <span>🎉</span>
            <span>Main Wedding Night Party &middot; 16th Jan &middot; 7:30 PM &ndash; 3:00 AM</span>
          </div>
        </div>

        {/* Master Stage: Regal 3-Column Editorial Spread (Desktop) & Balanced Single View (Mobile) */}
        <div className="relative w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-center gap-6 xl:gap-8 z-10 px-2 sm:px-4">

          {/* LEFT REGAL WING: Sacred Invocations & Family Welcome (Desktop) */}
          <div className="hidden lg:flex flex-col justify-between w-[280px] xl:w-[320px] 2xl:w-[340px] h-[580px] xl:h-[620px] shrink-0 rounded-[30px] border border-amber-300/60 bg-[#FFFDF9]/92 backdrop-blur-md p-6 xl:p-7 shadow-[0_15px_40px_rgba(70,45,20,0.08)] relative overflow-hidden text-center">
            {/* Corner Ornamental Accents */}
            <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-amber-400/60 rounded-tl-sm pointer-events-none" />
            <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-amber-400/60 rounded-tr-sm pointer-events-none" />
            <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-amber-400/60 rounded-bl-sm pointer-events-none" />
            <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-amber-400/60 rounded-br-sm pointer-events-none" />

            {/* Top: Sacred Ganesha Shloka */}
            <div>
              <div className="inline-flex items-center gap-1.5 rounded-full border border-amber-400/60 bg-amber-50/70 px-3.5 py-1 text-[11px] text-amber-900 font-medium">
                <span>🪷</span>
                <span className="font-sanskrit text-xs">॥ प्रथम पूज्य ॥</span>
                <span>🪷</span>
              </div>
              <p className="mt-4 font-sanskrit text-xs xl:text-sm text-amber-900/90 leading-relaxed font-medium">
                ॥ वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ ॥<br />
                ॥ निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा ॥
              </p>
              <div className="mt-3 mx-auto w-12 h-px bg-amber-400/50" />
            </div>

            {/* Middle: Royal Invitation Solicit */}
            <div className="space-y-3 py-2">
              <p className="font-cinzel text-[11px] uppercase tracking-widest2 text-amber-950 font-bold">
                The Sacred Union
              </p>
              <p className="font-body text-xs xl:text-[13px] leading-relaxed text-[#2C2225]/80">
                With the divine blessings of our revered ancestors, the <span className="font-semibold text-amber-950">Bhardwaj &amp; Saragih</span> families warmly solicit the honour of your benign presence and gracious blessings to solemnize the auspicious wedding nuptials of
              </p>
              <p className="font-display text-2xl xl:text-3xl italic text-amber-900 font-normal">
                Vinayak &amp; Ririn
              </p>
              <div className="inline-block rounded-full border border-amber-300/60 bg-amber-50/80 px-3 py-1 font-body text-[10px] uppercase tracking-widest text-amber-900 font-semibold">
                Patti &middot; Punjab &middot; Bharat
              </div>
            </div>

            {/* Bottom: Vedic Blessing */}
            <div className="border-t border-amber-300/40 pt-3">
              <p className="font-sanskrit text-xs xl:text-sm text-amber-800 tracking-wider">
                ॥ मांगल्यं तन्तुनानेन मम जीवनहेतुना ॥
              </p>
              <p className="mt-1 font-body text-[10px] uppercase tracking-widest2 text-[#2C2225]/60 font-medium">
                Two Families &middot; Two Cultures &middot; One Love
              </p>
            </div>
          </div>

          {/* CENTERPIECE: Grand Arched Royal Palace Portrait of Vinayak & Ririn */}
          <div className="flex flex-col items-center justify-center w-full max-w-[360px] sm:max-w-[400px] md:max-w-[430px] lg:max-w-[440px] xl:max-w-[460px]">
            <div
              ref={cardRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="relative w-full aspect-[9/14.5] rounded-t-[170px] sm:rounded-t-[200px] rounded-b-[28px] sm:rounded-b-[34px] overflow-hidden shadow-[0_35px_80px_-15px_rgba(70,45,20,0.38),0_0_55px_rgba(212,175,55,0.22)] border-[3px] border-amber-400/80 p-2 sm:p-2.5 bg-gradient-to-b from-amber-100/60 via-white to-amber-200/50"
              style={{
                perspective: "1400px",
                transformStyle: "preserve-3d",
                transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                transition: "transform 0.15s ease-out",
              }}
            >
              {/* Couple Photograph inside Royal Arch */}
              <div className="relative w-full h-full rounded-t-[160px] sm:rounded-t-[190px] rounded-b-[22px] sm:rounded-b-[26px] overflow-hidden">
                <Image
                  src="/images/couple-hero.webp"
                  alt="Vinayak & Ririn"
                  fill
                  priority
                  sizes="(max-width: 1024px) 440px, 500px"
                  quality={95}
                  className="object-cover object-[50%_25%]"
                />
                {/* Dynamic Vignette & Gold Luster */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#181214]/50 via-transparent via-45% to-[#181214]/85 pointer-events-none" />
                <div className="absolute inset-2 rounded-t-[152px] sm:rounded-t-[182px] rounded-b-[18px] border border-amber-200/50 pointer-events-none" />

                {/* Top Badge */}
                <div className="relative z-10 pt-4 flex justify-center">
                  <div className="inline-flex items-center gap-1.5 rounded-full border border-amber-400/70 bg-[#FFFDF9]/95 px-4 py-1 text-[11px] text-amber-900 shadow-sm backdrop-blur-md">
                    <span>🪷</span>
                    <span className="font-sanskrit text-xs">॥ श्री गणेशाय नमः ॥</span>
                    <span>🪷</span>
                  </div>
                </div>

                {/* Bottom Overlay over Arch */}
                <div className="absolute bottom-0 inset-x-0 z-10 p-5 sm:p-6 text-center text-[#FFFDF9]">
                  <p className="font-body text-[10px] sm:text-[11px] uppercase tracking-widest3 text-[#FCE182] font-semibold">
                    Shubh Vivah &middot; 4-Day Celebrations
                  </p>
                  <h2 className="mt-1 font-display text-3xl sm:text-4xl italic text-[#FFFDF9] font-normal">
                    Vinayak &amp; Ririn
                  </h2>
                  <p className="mt-1.5 font-body text-xs text-white/95 tracking-wide">
                    13th &ndash; 16th January 2027
                  </p>
                  <div className="mt-1 inline-block rounded-full border border-amber-400/60 bg-amber-500/25 px-3 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-amber-200">
                    Night Party &middot; 7:30 PM &ndash; 3:00 AM
                  </div>
                  <div className="mt-2.5 mx-auto w-16 h-px bg-amber-300/60" />
                  <p className="mt-2 font-sanskrit text-xs sm:text-sm text-amber-200/95 leading-relaxed">
                    &ldquo;ॐ समञ्जन्तु विश्वेदेवाः समापो हृदयानि नौ&rdquo;
                  </p>
                  <p className="mt-1 font-sanskrit text-[11px] text-[#FCE182] tracking-wider">
                    ॥ सदा सौभाग्यवती भव ॥
                  </p>
                </div>
              </div>
            </div>

            {/* CTA Button Row directly under Portrait */}
            <div className="mt-6 flex flex-col items-center gap-3 z-20">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    playPaperRustle();
                    const target = document.getElementById("story");
                    if (target && lenisRef.current) {
                      lenisRef.current.scrollTo(target, { duration: 1.2 });
                    } else if (target) {
                      target.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                  data-cursor="interactive"
                  className="inline-flex items-center gap-2.5 rounded-full border border-amber-600/70 bg-gradient-to-r from-[#FFFDF9] via-amber-100/90 to-[#FFFDF9] px-7 py-3 text-xs uppercase tracking-widest2 text-amber-950 font-extrabold shadow-[0_8px_25px_rgba(100,70,30,0.2)] backdrop-blur-md transition-all hover:scale-105 active:scale-95 hover:border-amber-700"
                >
                  <span>Explore The Celebrations</span>
                  <span className="animate-bounce text-sm text-amber-800 font-bold">↓</span>
                </button>

                <button
                  onClick={handleReseal}
                  data-cursor="interactive"
                  title="Re-seal envelope and re-experience the ritual"
                  className="inline-flex items-center gap-1.5 rounded-full border border-amber-300/80 bg-[#FFFDF9]/85 px-4 py-3 text-[11px] uppercase tracking-widest text-amber-900 shadow-sm backdrop-blur-md transition-all hover:bg-amber-50 active:scale-95"
                >
                  <span>↺</span>
                  <span className="hidden sm:inline">Re-seal</span>
                </button>
              </div>

              <p className="font-sanskrit text-xs text-amber-800/80 tracking-normal">
                ॥ विवाह उत्सव विवरण ॥
              </p>
            </div>
          </div>

          {/* RIGHT REGAL WING: 4-Day Festivities Snapshot & Venue (Desktop) */}
          <div className="hidden lg:flex flex-col justify-between w-[280px] xl:w-[320px] 2xl:w-[340px] h-[580px] xl:h-[620px] shrink-0 rounded-[30px] border border-amber-300/60 bg-[#FFFDF9]/92 backdrop-blur-md p-6 xl:p-7 shadow-[0_15px_40px_rgba(70,45,20,0.08)] relative overflow-hidden text-center">
            {/* Corner Ornamental Accents */}
            <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-amber-400/60 rounded-tl-sm pointer-events-none" />
            <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-amber-400/60 rounded-tr-sm pointer-events-none" />
            <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-amber-400/60 rounded-bl-sm pointer-events-none" />
            <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-amber-400/60 rounded-br-sm pointer-events-none" />

            {/* Top: Header */}
            <div>
              <div className="inline-flex items-center gap-1.5 rounded-full border border-amber-400/60 bg-amber-50/70 px-3.5 py-1 text-[11px] text-amber-900 font-medium">
                <span>🪔</span>
                <span className="font-sanskrit text-xs">॥ उत्सव पत्रिका ॥</span>
                <span>🪔</span>
              </div>
              <h3 className="mt-3 font-cinzel text-xs xl:text-sm uppercase tracking-widest2 text-amber-950 font-bold">
                4-Day Celebrations
              </h3>
              <div className="mt-2 mx-auto w-12 h-px bg-amber-400/50" />
            </div>

            {/* Middle: 4-Day Timeline Schedule */}
            <div className="space-y-2 text-left py-1">
              <div className="rounded-xl border border-amber-200/60 bg-white/70 p-2.5">
                <div className="flex items-center justify-between text-[10px] font-bold text-amber-900 uppercase">
                  <span>13 Jan &middot; Lohri</span>
                  <span className="text-amber-700">6:30 PM</span>
                </div>
                <p className="mt-0.5 font-body text-[11px] text-[#2C2225]/75 truncate">The Royal Lohri Celebration</p>
              </div>

              <div className="rounded-xl border border-amber-200/60 bg-white/70 p-2.5">
                <div className="flex items-center justify-between text-[10px] font-bold text-amber-900 uppercase">
                  <span>14 Jan &middot; Sangeet</span>
                  <span className="text-amber-700">5:00 PM</span>
                </div>
                <p className="mt-0.5 font-body text-[11px] text-[#2C2225]/75 truncate">Mehndi &amp; Sangeet Utsav</p>
              </div>

              <div className="rounded-xl border border-amber-200/60 bg-white/70 p-2.5">
                <div className="flex items-center justify-between text-[10px] font-bold text-amber-900 uppercase">
                  <span>15 Jan &middot; Jaggo</span>
                  <span className="text-amber-700">8:00 PM</span>
                </div>
                <p className="mt-0.5 font-body text-[11px] text-[#2C2225]/75 truncate">The Auspicious Jaggo Night</p>
              </div>

              <div className="rounded-xl border border-amber-400/80 bg-gradient-to-r from-amber-50 to-amber-100/50 p-2.5 shadow-sm">
                <div className="flex items-center justify-between text-[10px] font-bold text-amber-950 uppercase">
                  <span>16 Jan &middot; Vivah</span>
                  <span className="text-amber-800 font-extrabold">7:30 PM &ndash; 3 AM</span>
                </div>
                <p className="mt-0.5 font-body text-[11px] text-[#2C2225] font-semibold truncate">Shubh Vivah &amp; Night Party</p>
              </div>
            </div>

            {/* Bottom: Venue & Calendar Action */}
            <div className="border-t border-amber-300/40 pt-3 space-y-2">
              <p className="font-body text-[11px] text-[#2C2225]/80 font-medium">
                🏛️ <span className="font-semibold text-amber-950">Mahi Resort</span>, Patti, Punjab
              </p>
              <a
                href={googleCalUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={playPaperRustle}
                className="inline-flex items-center justify-center gap-1.5 w-full rounded-full border border-amber-400/80 bg-gradient-to-r from-amber-50 via-white to-amber-50 py-2 font-body text-[10px] uppercase tracking-widest font-bold text-amber-950 shadow-sm hover:border-amber-600 transition-colors"
              >
                <span>📅 Add to Calendar</span>
              </a>
              <p className="font-sanskrit text-xs text-amber-800/80 tracking-wider pt-0.5">
                ॥ शुभमस्तु ॥
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Decorative Footer of Hero */}
        <div className="relative z-10 pt-4 pb-2 text-center text-[10px] uppercase tracking-widest2 text-[#2C2225]/40 pointer-events-none">
          Scroll to explore the love story &amp; ceremony chronicles &darr;
        </div>
      </section>

      {/* ========================================================
          SCENE 2: THE ROYAL CHRONICLES (Editorial Manuscript Spread)
          ======================================================== */}
      <section id="story" className="relative px-6 py-28 sm:py-36 overflow-hidden bg-[#FAF7F2]">
        <div className="relative mx-auto max-w-5xl">
          {/* Section Header with Lotus Divider */}
          <div className="text-center">
            <div className="inline-flex items-center gap-3 mb-3">
              <span className="h-px w-10 bg-gradient-to-r from-transparent to-amber-600/50" />
              <p className="font-body text-xs uppercase tracking-widest3 text-amber-800 font-medium">
                <span className="font-sanskrit text-sm tracking-normal">॥ प्रणय कथा ॥</span> &middot; The Royal Chronicles
              </p>
              <span className="h-px w-10 bg-gradient-to-l from-transparent to-amber-600/50" />
            </div>
            <MaskedHeading>
              <h2 className="font-display text-4xl sm:text-6xl italic text-[#2C2225] font-light tracking-wide">
                Two Destinies, One Sacred Union
              </h2>
            </MaskedHeading>
            <div className="mx-auto my-6 flex items-center justify-center gap-3">
              <span className="h-px w-20 bg-gradient-to-r from-transparent to-amber-500/60" />
              <span className="text-amber-700 text-sm">🪷</span>
              <span className="h-px w-20 bg-gradient-to-l from-transparent to-amber-500/60" />
            </div>
          </div>

          {/* High-Fashion Editorial Spread */}
          <div className="mt-14 grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            {/* Arched Portrait with Ornate Double Frame & Scroll Reveal */}
            <motion.div
              initial={{ opacity: 0, y: 35, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, ease: [0.25, 1, 0.35, 1] }}
              className="relative mx-auto w-full max-w-[390px] aspect-[3/4] overflow-hidden rounded-t-[120px] rounded-b-2xl border border-amber-300/60 p-2.5 shadow-[0_20px_50px_rgba(100,70,40,0.15)] bg-[#FFFDF9]"
            >
              <div className="relative w-full h-full overflow-hidden rounded-t-[112px] rounded-b-xl border border-amber-200/40">
                <Image
                  src="/images/couple-story.webp"
                  alt="Vinayak and Ririn"
                  fill
                  quality={92}
                  sizes="(min-width: 1024px) 390px, 90vw"
                  className="object-cover transition-transform duration-700 hover:scale-103"
                />
              </div>
            </motion.div>

            {/* Editorial Text with Drop-Cap & Scroll Reveal */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.25, 1, 0.35, 1] }}
              className="space-y-6 text-[#2C2225]/85 text-base sm:text-lg leading-relaxed font-body"
            >
              <p>
                <span className="float-left mr-3.5 font-display text-5xl sm:text-6xl font-light leading-none text-amber-800 border-b-2 border-amber-400/40 pb-1">
                  I
                </span>
                t began the way eternal love stories do — quietly, without either of us noticing. Two souls whose paths crossed by divine design, unaware that destiny was already weaving their lives together into a shared sacred promise.
              </p>
              <p>
                Then came the glances that lingered a moment too long, and the effortless smiles neither of us could quite explain. In the warmth of those early conversations, Vinayak and Ririn started truly seeing each other beyond words.
              </p>
              <p>
                Late-night reflections turned into shared dreams, mutual hopes, and devotion to sacred traditions. Distance faded as understanding deepened, carving a bond grounded in laughter, loyalty, and unbreakable trust.
              </p>
              <p className="border-l-2 border-amber-400/60 pl-5 italic text-[#2C2225]/90">
                &ldquo;What began as two separate journeys slowly blossomed into one shared heartbeat. On the auspicious 16th of January 2027, under the sacred Agni and the blessings of our elders, our story becomes eternal.&rdquo;
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ========================================================
          SCENE 3: SHUBH MUHURAT (Vedic Horological Dial Countdown)
          ======================================================== */}
      <section className="relative px-6 py-24 bg-[#F5EFE6] border-y border-amber-200/70 overflow-hidden">
        {/* Subtle Decorative Celestial Rings in Background */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-amber-300/20" />
        <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[420px] rounded-full border border-amber-300/25 border-dashed" />

        <div className="relative mx-auto max-w-4xl text-center z-10">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="text-amber-600 text-xs">✦</span>
            <span className="font-body text-xs font-semibold uppercase tracking-widest3 text-amber-800">
              <span className="font-sanskrit text-sm tracking-normal">॥ शुभ मुहूर्त ॥</span> &middot; The Auspicious Alignment
            </span>
            <span className="text-amber-600 text-xs">✦</span>
          </div>

          <MaskedHeading>
            <h2 className="font-display text-3xl sm:text-5xl italic text-[#2C2225] font-light">
              Counting the Sacred Hours
            </h2>
          </MaskedHeading>
          <p className="mt-2 font-body text-xs sm:text-sm text-[#2C2225]/70 uppercase tracking-widest">
            Until the Sacred Pheras &middot; 16th January 2027
          </p>

          {/* Horological Gilded Circular Dials */}
          <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 max-w-3xl mx-auto">
            {[
              { label: "Days", sub: "दिवस", val: timeLeft.days },
              { label: "Hours", sub: "घण्टा", val: timeLeft.hours },
              { label: "Minutes", sub: "क्षण", val: timeLeft.minutes },
              { label: "Seconds", sub: "पल", val: timeLeft.seconds },
            ].map((u) => (
              <div
                key={u.label}
                onMouseEnter={playDialHoverSound}
                className="group relative flex flex-col items-center justify-center rounded-3xl border border-amber-400/40 bg-gradient-to-b from-[#FFFDF9] to-[#FAF7F2] py-7 px-4 shadow-[0_10px_30px_rgba(100,70,30,0.08)] backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-amber-500/70 hover:shadow-[0_15px_35px_rgba(212,175,55,0.18)] cursor-pointer"
              >
                <div className="font-display text-4xl sm:text-6xl font-light text-amber-900 tabular-nums">
                  {String(u.val).padStart(2, "0")}
                </div>
                <div className="mt-2 font-body text-[11px] uppercase tracking-widest2 text-[#2C2225]/75 font-semibold">
                  {u.label}
                </div>
                <div className="mt-0.5 font-sanskrit text-[11px] text-amber-700/80 tracking-normal">
                  ॥ {u.sub} ॥
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================
          SCENE 4: VIVAH SANSKAR (Illuminated Manuscript Timeline)
          ======================================================== */}
      <section id="details" className="relative px-6 py-28 sm:py-36 bg-[#FAF7F2]">
        <div className="mx-auto max-w-4xl">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/50 bg-[#FFFDF9] px-5 py-1.5 text-xs text-amber-800 shadow-sm">
              <span>🪷</span>
              <span className="font-sanskrit text-sm tracking-normal font-semibold uppercase">
                ॥ विवाह संस्कार ॥
              </span>
              <span>🪷</span>
            </div>
            <MaskedHeading>
              <h2 className="mt-4 font-display text-4xl sm:text-5xl italic text-[#2C2225] font-light">
                Sacred Rites &amp; Celebrations
              </h2>
            </MaskedHeading>
            <p className="mt-3 font-body text-sm sm:text-base text-[#2C2225]/75 max-w-xl mx-auto">
              The sacred ceremonies sanctifying the eternal union of Vinayak &amp; Ririn at Mahi Resort, Patti.
            </p>
          </div>

          {/* Venue & Muhurat Prominent Plaques */}
          <div className="mt-14 grid gap-6 sm:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6 }}
              className="relative rounded-3xl border border-amber-400/40 bg-gradient-to-br from-[#FFFDF9] to-[#FAF7F2] p-8 text-center shadow-md transition-shadow hover:shadow-lg"
            >
              <span className="text-2xl">🪔</span>
              <p className="mt-2 font-body text-xs uppercase tracking-widest2 text-amber-800 font-semibold">
                4-Day Royal Festivities
              </p>
              <p className="mt-2 font-display text-3xl font-medium text-[#2C2225]">13th &ndash; 16th Jan 2027</p>
              <p className="mt-1 font-body text-sm text-[#2C2225]/75">Lohri to Night Wedding Party (7:30 PM &ndash; 3:00 AM)</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="relative rounded-3xl border border-amber-400/40 bg-gradient-to-br from-[#FFFDF9] to-[#FAF7F2] p-8 text-center shadow-md transition-shadow hover:shadow-lg"
            >
              <span className="text-2xl">🏛️</span>
              <p className="mt-2 font-body text-xs uppercase tracking-widest2 text-amber-800 font-semibold">
                Royal Wedding Grounds
              </p>
              <p className="mt-2 font-display text-3xl font-medium text-[#2C2225]">Mahi Resort</p>
              <p className="mt-1 font-body text-sm text-[#2C2225]/75">Patti, Punjab, India</p>
            </motion.div>
          </div>

          {/* Continuous Gold Spine Timeline */}
          <div className="relative mt-16 pl-6 sm:pl-10 space-y-8 before:absolute before:left-2 sm:before:left-4 before:top-4 before:bottom-4 before:w-0.5 before:bg-gradient-to-b before:from-amber-400 before:via-amber-500 before:to-amber-600/30">
            {CEREMONIES.map((c, idx) => (
              <motion.div
                key={c.title}
                initial={{ opacity: 0, x: -22 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: idx * 0.08, ease: [0.25, 1, 0.35, 1] }}
                onMouseEnter={playPaperRustle}
                className="relative group transition-transform duration-300 hover:translate-x-1"
              >
                {/* Golden Node on Timeline Spine */}
                <span className="absolute -left-6 sm:-left-10 top-6 -translate-x-1/2 flex h-5 w-5 items-center justify-center rounded-full border-2 border-white bg-amber-600 shadow-md group-hover:scale-125 transition-transform" />

                {/* Manuscript Card */}
                <div className="rounded-3xl border border-amber-300/50 bg-[#FFFDF9] p-6 sm:p-7 shadow-[0_8px_25px_rgba(90,60,30,0.06)] backdrop-blur-md transition-all group-hover:border-amber-500 group-hover:shadow-[0_12px_30px_rgba(212,175,55,0.15)]">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-amber-400/50 bg-amber-50 font-serif text-xs font-semibold italic text-amber-800 shadow-inner">
                        {c.step}
                      </span>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-body text-[10px] font-bold uppercase tracking-widest text-amber-900 bg-amber-100/80 px-2.5 py-0.5 rounded-full border border-amber-300/60">
                            {c.badge}
                          </span>
                        </div>
                        <h3 className="font-display text-lg sm:text-xl font-semibold text-[#2C2225]">
                          {c.title}
                        </h3>
                        <p className="font-sanskrit text-xs sm:text-sm text-amber-800/85 tracking-wider">
                          ॥ {c.sanskrit} ॥
                        </p>
                      </div>
                    </div>
                    <div className="shrink-0 text-left sm:text-right">
                      <span className="inline-block font-body text-xs font-bold uppercase tracking-widest text-amber-900 bg-amber-100/70 px-4 py-1.5 rounded-full border border-amber-300/60">
                        {c.time}
                      </span>
                      <p className="mt-1 font-body text-[11px] text-[#2C2225]/60 tracking-wider">
                        {c.date}
                      </p>
                    </div>
                  </div>
                  <p className="mt-3 font-body text-xs sm:text-sm text-[#2C2225]/75 leading-relaxed pl-0 sm:pl-13">
                    {c.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Action Buttons: Venue & Calendar (Clean Royal Styling, No Emojis) */}
          <div className="mt-14 flex flex-wrap items-center justify-center gap-4 text-center">
            <a
              href="https://www.google.com/maps/search/?api=1&query=Mahi+Resort,+Patti,+Punjab"
              target="_blank"
              rel="noopener noreferrer"
              onClick={playPaperRustle}
              data-cursor="view"
              className="inline-flex items-center justify-center rounded-full border border-amber-600 bg-amber-600 px-8 py-3.5 font-body text-xs uppercase tracking-widest2 text-white shadow-md hover:bg-amber-700 font-semibold active:scale-95 transition-all hover:shadow-lg"
            >
              <span>Venue Map &amp; Directions</span>
            </a>

            <a
              href={googleCalUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={playPaperRustle}
              data-cursor="view"
              className="inline-flex items-center justify-center rounded-full border border-amber-400/70 bg-[#FFFDF9] px-8 py-3.5 font-body text-xs uppercase tracking-widest2 text-[#2C2225]/85 hover:bg-amber-50 hover:border-amber-500 font-medium active:scale-95 transition-all shadow-sm"
            >
              <span>Add to Calendar</span>
            </a>
          </div>
        </div>
      </section>

      {/* ========================================================
          SCENE 5: THE ROYAL ARCHIVE GALLERY
          ======================================================== */}
      <section id="gallery" className="relative px-6 py-28 sm:py-36 bg-[#F5EFE6]">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="h-px w-8 bg-amber-600/40" />
              <p className="font-body text-xs uppercase tracking-widest3 text-amber-800 font-medium">
                <span className="font-sanskrit text-sm">॥ छायाचित्र संग्रह ॥</span> &middot; The Royal Archive
              </p>
              <span className="h-px w-8 bg-amber-600/40" />
            </div>
            <MaskedHeading>
              <h2 className="font-display text-4xl sm:text-5xl italic text-[#2C2225] font-light">
                Moments of Grace &amp; Devotion
              </h2>
            </MaskedHeading>
            <p className="mt-2 font-body text-xs sm:text-sm text-[#2C2225]/70 uppercase tracking-widest">
              Glimpses from the Journey of Vinayak &amp; Ririn
            </p>
          </div>

          {/* Gallery Carousel Container with Left & Right Arrows */}
          <div className="relative mt-14">
            {/* Left Scroll Arrow */}
            <button
              type="button"
              onClick={() => scrollGallery("left")}
              aria-label="Previous photograph"
              className="absolute -left-3 sm:-left-5 top-1/2 -translate-y-1/2 z-20 flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-full border border-amber-400/80 bg-[#FFFDF9]/95 text-amber-900 shadow-xl backdrop-blur-md transition-all duration-200 hover:scale-110 hover:bg-amber-100 hover:border-amber-600 active:scale-95 cursor-pointer focus:outline-none"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-amber-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Right Scroll Arrow */}
            <button
              type="button"
              onClick={() => scrollGallery("right")}
              aria-label="Next photograph"
              className="absolute -right-3 sm:-right-5 top-1/2 -translate-y-1/2 z-20 flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-full border border-amber-400/80 bg-[#FFFDF9]/95 text-amber-900 shadow-xl backdrop-blur-md transition-all duration-200 hover:scale-110 hover:bg-amber-100 hover:border-amber-600 active:scale-95 cursor-pointer focus:outline-none"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-amber-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Scrollable Gallery Track */}
            <div
              ref={galleryRef}
              className="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-8 pt-4 px-2 sm:px-4 scrollbar-none scroll-smooth"
            >
              {GALLERY.map((p, idx) => (
                <motion.div
                  key={p.src}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-30px" }}
                  transition={{ duration: 0.6, delay: idx * 0.07, ease: [0.25, 1, 0.35, 1] }}
                  className={`w-[80vw] max-w-[320px] shrink-0 snap-center transition-all duration-300 hover:scale-102 ${p.rot} hover:rotate-0`}
                >
                  <div
                    className="block w-full overflow-hidden rounded-3xl border border-amber-400/40 bg-white p-3.5 text-left shadow-lg backdrop-blur-md transition-all duration-300 hover:shadow-[0_15px_35px_rgba(100,70,30,0.18)] select-none"
                  >
                    <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl border border-amber-200/50 bg-[#FAF7F2]">
                      <Image
                        src={p.src}
                        alt={p.title}
                        fill
                        sizes="320px"
                        quality={86}
                        className="object-cover transition-transform duration-700 hover:scale-105 pointer-events-none"
                      />
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <h3 className="font-display text-lg font-semibold text-[#2C2225]">{p.title}</h3>
                      <span className="font-body text-[11px] font-bold text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200/60">
                        0{idx + 1} / 06
                      </span>
                    </div>
                    <p className="mt-1 font-body text-xs text-[#2C2225]/70">{p.caption}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          SCENE 6: ASHIRWAD & RSVP (Royal Response Parchment)
          ======================================================== */}
      <section id="rsvp" className="relative px-6 py-28 sm:py-36 bg-[#FAF7F2]">
        <div className="mx-auto max-w-2xl">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="h-px w-8 bg-amber-600/40" />
              <p className="font-body text-xs uppercase tracking-widest3 text-amber-800 font-medium">
                <span className="font-sanskrit text-sm tracking-normal">॥ उपस्थिति सूचना ॥</span> &middot; Royal Presence
              </p>
              <span className="h-px w-8 bg-amber-600/40" />
            </div>
            <MaskedHeading>
              <h2 className="font-display text-4xl sm:text-5xl italic text-[#2C2225] font-light">
                Kindly Grace Us With Your Presence
              </h2>
            </MaskedHeading>
            <p className="mt-3 font-body text-sm text-[#2C2225]/75">
              Please confirm your auspicious attendance so we may reserve your royal welcome.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6 }}
            className="mt-14 overflow-hidden rounded-3xl border border-amber-400/40 bg-[#FFFDF9] p-8 shadow-xl sm:p-10"
          >
            {rsvpSubmitted ? (
              <div className="py-8 text-center">
                <span className="text-4xl">🪷</span>
                <h3 className="mt-4 font-display text-2xl font-semibold text-[#2C2225]">
                  Thank You, {rsvpName}!
                </h3>
                <p className="mt-2 font-body text-sm text-[#2C2225]/75">
                  Your response has been graciously received. We look forward to welcoming you with folded hands!
                </p>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (rsvpName.trim()) {
                    playPaperRustle();
                    playTempleBellSound();
                    triggerCelebrationShower();
                    setRsvpSubmitted(true);
                  }
                }}
                className="space-y-6"
              >
                <div>
                  <label className="block font-body text-xs uppercase tracking-widest2 text-[#2C2225]/70 font-semibold">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={rsvpName}
                    onChange={(e) => setRsvpName(e.target.value)}
                    placeholder="e.g. Gurpreet Singh & Family"
                    className="mt-2 w-full rounded-2xl border border-amber-300/60 bg-amber-50/20 px-4 py-3.5 font-body text-sm text-[#2C2225] focus:border-amber-600 focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <span className="block font-body text-xs uppercase tracking-widest2 text-[#2C2225]/70 font-semibold">
                    Will You Attend? *
                  </span>
                  <div className="mt-2 grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        playPaperRustle();
                        setRsvpAttending("yes");
                      }}
                      className={`rounded-2xl border py-3.5 font-body text-xs uppercase tracking-widest font-medium transition-all ${
                        rsvpAttending === "yes"
                          ? "border-amber-600 bg-amber-600 text-white shadow-sm"
                          : "border-amber-300/50 bg-white text-[#2C2225]/70 hover:border-amber-500"
                      }`}
                    >
                      ✓ Joyfully Accepts
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        playPaperRustle();
                        setRsvpAttending("no");
                      }}
                      className={`rounded-2xl border py-3.5 font-body text-xs uppercase tracking-widest font-medium transition-all ${
                        rsvpAttending === "no"
                          ? "border-amber-600 bg-amber-600 text-white shadow-sm"
                          : "border-amber-300/50 bg-white text-[#2C2225]/70 hover:border-amber-500"
                      }`}
                    >
                      ✕ Regretfully Declines
                    </button>
                  </div>
                </div>

                {rsvpAttending === "yes" && (
                  <div>
                    <label className="block font-body text-xs uppercase tracking-widest2 text-[#2C2225]/70 font-semibold">
                      Number of Guests Attending
                    </label>
                    <div className="mt-2 flex items-center gap-2.5">
                      {[1, 2, 3, 4, 5].map((num) => (
                        <button
                          key={num}
                          type="button"
                          onClick={() => {
                            playPaperRustle();
                            setRsvpGuests(num);
                          }}
                          className={`flex h-11 w-11 items-center justify-center rounded-2xl border font-body text-sm font-semibold transition-all ${
                            rsvpGuests === num
                              ? "border-amber-600 bg-amber-600 text-white shadow-sm"
                              : "border-amber-300/50 bg-white text-[#2C2225]/75 hover:border-amber-500"
                          }`}
                        >
                          {num}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <label className="block font-body text-xs uppercase tracking-widest2 text-[#2C2225]/70 font-semibold">
                    Ashirwad &amp; Blessings (Optional)
                  </label>
                  <textarea
                    rows={3}
                    value={rsvpMessage}
                    onChange={(e) => setRsvpMessage(e.target.value)}
                    placeholder="Share an auspicious blessing for Vinayak & Ririn..."
                    className="mt-2 w-full rounded-2xl border border-amber-300/60 bg-amber-50/20 px-4 py-3.5 font-body text-sm text-[#2C2225] focus:border-amber-600 focus:outline-none transition-colors"
                  />
                </div>

                <div className="pt-2 text-center">
                  <button
                    type="submit"
                    onClick={playPaperRustle}
                    className="w-full rounded-full border border-amber-600 bg-amber-600 py-4 font-body text-xs uppercase tracking-widest2 text-white shadow-md hover:bg-amber-700 active:scale-98 sm:w-auto sm:px-14 font-semibold hover:shadow-lg transition-all"
                  >
                    Confirm Royal RSVP
                  </button>
                </div>
              </form>
            )}
          </motion.div>

          {/* Shagun Bank Details */}
          <div className="mt-12 rounded-3xl border border-amber-400/40 bg-[#FFFDF9] p-8 shadow-md text-center">
            <p className="font-body text-xs uppercase tracking-widest2 text-amber-800 font-semibold">
              <span className="font-sanskrit text-sm tracking-normal">॥ शगुन एवं शुभेच्छा ॥</span> &middot; Shagun &amp; Blessings
            </p>
            <p className="mt-2 font-body text-xs text-[#2C2225]/70">
              For loved ones wishing to bestow their blessings from afar:
            </p>
            <div className="mt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <div className="text-xs font-mono bg-amber-50/60 px-5 py-3 rounded-2xl border border-amber-200 text-[#2C2225]/80">
                BANK RAKYAT INDONESIA &middot; A/C: 323001031687534 &middot; RIRIN OKTOLINDA SARAGIH
              </div>
              <button
                onClick={() => {
                  playPaperRustle();
                  copyBankInfo();
                }}
                className="shrink-0 rounded-full border border-amber-600 bg-amber-50 px-6 py-2.5 font-body text-xs uppercase tracking-widest text-amber-900 font-semibold hover:bg-amber-600 hover:text-white transition-all active:scale-95"
              >
                {copiedBank ? "Copied ✓" : "Copy Details"}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          SCENE 7: ROYAL HELPLINE & SOCIAL CELEBRATIONS
          ======================================================== */}
      {/* ========================================================
          SCENE 7: DIRECT CONTACT & SOCIAL CELEBRATIONS
          ======================================================== */}
      <section id="contact" className="relative px-6 py-20 sm:py-28 bg-[#F5EFE6] border-t border-amber-200/60">
        <div className="mx-auto max-w-4xl">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="h-px w-8 bg-amber-600/40" />
              <p className="font-body text-xs uppercase tracking-widest3 text-amber-800 font-medium">
                <span className="font-sanskrit text-sm">॥ सम्पर्क एवं सम्वाद ॥</span> &middot; Direct Contact &amp; Socials
              </p>
              <span className="h-px w-8 bg-amber-600/40" />
            </div>
            <MaskedHeading>
              <h2 className="font-display text-3xl sm:text-4xl italic text-[#2C2225] font-light">
                Reach Out &amp; Celebrate With Us
              </h2>
            </MaskedHeading>
            <p className="mt-2 font-body text-xs sm:text-sm text-[#2C2225]/70 max-w-xl mx-auto">
              For any questions regarding travel arrangements, accommodations in Patti, or venue directions, feel free to contact me directly.
            </p>
          </div>

          {/* Contact & Social Cards Grid */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Card 1: Vinayak Direct WhatsApp & Call */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="rounded-3xl border border-amber-300/60 bg-[#FFFDF9] p-7 sm:p-8 shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-3.5 mb-4">
                  <div className="w-11 h-11 rounded-2xl border border-amber-400/60 bg-amber-50 flex items-center justify-center text-amber-800 shadow-xs">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-semibold text-[#2C2225]">Vinayak Bhardwaj</h3>
                    <p className="font-body text-xs text-[#2C2225]/60">Direct WhatsApp &amp; Phone Support</p>
                  </div>
                </div>
                <p className="font-body text-xs sm:text-sm text-[#2C2225]/75 leading-relaxed">
                  Need any information about reaching Patti, Punjab, hotel stays, or ceremony timings? Message or call me anytime directly.
                </p>

                <div className="mt-4 inline-flex items-center gap-2 bg-amber-50/70 border border-amber-200/80 rounded-2xl px-4 py-2.5">
                  <span className="font-body text-xs font-semibold text-amber-900 tracking-wider">
                    +60 18-230 2045
                  </span>
                </div>
              </div>

              <div className="mt-7 flex flex-wrap gap-3">
                <a
                  href="https://wa.me/60182302045?text=Namaste%20Vinayak!%20Looking%20forward%20to%20the%20royal%20wedding%20celebrations."
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={playPaperRustle}
                  className="inline-flex items-center gap-2 rounded-full border border-amber-600 bg-amber-600 px-6 py-2.5 font-body text-xs uppercase tracking-widest text-white font-semibold shadow-sm hover:bg-amber-700 active:scale-95 transition-all"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0012.04 2zm0 18.15c-1.49 0-2.95-.4-4.22-1.16l-.3-.18-3.13.82.83-3.05-.2-.31a8.12 8.12 0 01-1.25-4.36c0-4.5 3.66-8.16 8.17-8.16 2.18 0 4.23.85 5.77 2.39 1.54 1.54 2.39 3.59 2.39 5.77 0 4.5-3.66 8.16-8.15 8.16z" />
                  </svg>
                  <span>WhatsApp Vinayak</span>
                </a>

                <a
                  href="tel:+60182302045"
                  onClick={playPaperRustle}
                  className="inline-flex items-center gap-2 rounded-full border border-amber-400/70 bg-white px-6 py-2.5 font-body text-xs uppercase tracking-widest text-[#2C2225]/85 font-medium shadow-sm hover:bg-amber-50 active:scale-95 transition-all"
                >
                  <svg className="w-3.5 h-3.5 text-amber-800" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span>Call Directly</span>
                </a>
              </div>
            </motion.div>

            {/* Card 2: Social Celebration & Instagram */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="rounded-3xl border border-amber-300/60 bg-[#FFFDF9] p-7 sm:p-8 shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-3.5 mb-4">
                  <div className="w-11 h-11 rounded-2xl border border-amber-400/60 bg-amber-50 flex items-center justify-center text-amber-800 shadow-xs">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                      <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-semibold text-[#2C2225]">Share the Memories</h3>
                    <p className="font-body text-xs text-[#2C2225]/60">Tag &amp; Celebrate on Instagram</p>
                  </div>
                </div>
                <p className="font-body text-xs sm:text-sm text-[#2C2225]/75 leading-relaxed">
                  Capture and share your cherished wedding moments with us using our official auspicious wedding hashtag:
                </p>

                {/* Hashtag Capsule */}
                <div className="mt-4 flex items-center justify-between gap-3 bg-amber-50/70 border border-amber-200/80 rounded-2xl px-4 py-3">
                  <span className="font-display text-base sm:text-lg font-semibold tracking-wider text-amber-900 select-all">
                    #VinayakWedsRirin
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      playPaperRustle();
                      copyHashtag();
                    }}
                    className="rounded-full bg-white border border-amber-300 px-4 py-1.5 font-body text-[11px] uppercase tracking-wider text-amber-900 font-semibold shadow-xs hover:bg-amber-100 transition-all active:scale-95 cursor-pointer"
                  >
                    {copiedHashtag ? "Copied ✓" : "Copy"}
                  </button>
                </div>
              </div>

              {/* Instagram handles */}
              <div className="mt-7 flex flex-wrap items-center gap-3">
                <a
                  href="https://www.instagram.com/bhardwajvinayak104/"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={playPaperRustle}
                  className="inline-flex items-center gap-2 rounded-full border border-amber-400/70 bg-white px-5 py-2 font-body text-xs uppercase tracking-widest text-[#2C2225]/85 font-medium hover:bg-amber-50 active:scale-95 transition-all shadow-xs"
                >
                  <svg className="w-3.5 h-3.5 text-amber-800" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <circle cx="12" cy="12" r="3.5" />
                  </svg>
                  <span>@bhardwajvinayak104</span>
                </a>

                <a
                  href="https://www.instagram.com/ririnsaragihh/"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={playPaperRustle}
                  className="inline-flex items-center gap-2 rounded-full border border-amber-400/70 bg-white px-5 py-2 font-body text-xs uppercase tracking-widest text-[#2C2225]/85 font-medium hover:bg-amber-50 active:scale-95 transition-all shadow-xs"
                >
                  <svg className="w-3.5 h-3.5 text-amber-800" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <circle cx="12" cy="12" r="3.5" />
                  </svg>
                  <span>@ririnsaragihh</span>
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ========================================================
          SCENE 8: SACRED CLOSING FOOTER
          ======================================================== */}
      <footer className="relative px-6 py-20 text-center border-t border-amber-200/70 bg-[#FAF7F2]">
        <div className="mx-auto max-w-md">
          <div className="mb-3 inline-flex items-center gap-2 text-xs text-amber-800 font-semibold">
            <span className="text-amber-600">✦</span>
            <span className="font-sanskrit text-sm tracking-normal uppercase">॥ शुभमस्तु ॥</span>
            <span className="text-amber-600">✦</span>
          </div>
          <p className="font-display text-4xl italic text-amber-900 font-light">Vinayak &amp; Ririn</p>
          <p className="mt-2 font-body text-xs uppercase tracking-widest2 text-[#2C2225]/60">
            16th January 2027 &middot; Mahi Resort, Patti, Punjab
          </p>
          <p className="mt-4 font-body text-[11px] text-[#2C2225]/50">
            Under the divine grace of the Almighty &middot; With eternal love and gratitude
          </p>
          <button
            onClick={() => {
              playPaperRustle();
              handleReseal();
            }}
            data-cursor="seal"
            className="mt-6 inline-flex items-center gap-2 font-body text-xs uppercase tracking-widest2 text-amber-800 hover:-translate-y-0.5 transition-transform bg-[#FFFDF9] px-5 py-2 rounded-full border border-amber-300/60 shadow-sm"
          >
            ↺ Re-Seal Invitation
          </button>
        </div>
      </footer>
    </main>
  );
}

"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

// ==========================================
// 1. DATA CONSTANTS & SCHEDULE
// ==========================================
const CEREMONIES = [
  {
    step: "01",
    time: "10:30 AM",
    title: "Baraat Agaman & Shahi Swagat",
    sanskrit: "बारात आगमन एवं शाही स्वागत",
    desc: "The grand royal procession of the groom with traditional dhol rhythms, greeted with the auspicious Milni family welcome.",
  },
  {
    step: "02",
    time: "11:45 AM",
    title: "Shubh Jaimala Ceremony",
    sanskrit: "शुभ जयमाला महोत्सव",
    desc: "The sacred exchange of fragrant floral garlands under the palatial Mandap, showered with rose petals and Vedic shlokas.",
  },
  {
    step: "03",
    time: "12:30 PM",
    title: "Vedic Vivah & Saptapadi",
    sanskrit: "सप्तपदी एवं वैदिक विवाह संस्कार",
    desc: "The Seven Sacred Vows around the holy Agni fire, Kanyadaan, and solemn eternal promises of companionship.",
  },
  {
    step: "04",
    time: "02:00 PM",
    title: "Shahi Preeti Bhoj",
    sanskrit: "शाही प्रीतिभोज",
    desc: "A celebratory royal feast of authentic Punjabi culinary heritage, aromatic delicacies, and celebratory sweets.",
  },
  {
    step: "05",
    time: "04:00 PM",
    title: "Aashirwaad & Vidai",
    sanskrit: "आशीर्वाद एवं विदाई",
    desc: "Heartfelt blessings from elders, auspicious coconut presentation, and the beginning of their eternal new journey.",
  },
];

const GALLERY_PHOTOS = [
  { src: "/gallery/movement-1.webp", title: "First Light", caption: "Where our journey quietly began", rot: "-rotate-1" },
  { src: "/gallery/movement-2.webp", title: "Golden Hour Glow", caption: "Sunsets shared in quiet laughter", rot: "rotate-1" },
  { src: "/gallery/movement-3.webp", title: "Serenade in Red", caption: "Celebrating sacred tradition & elegance", rot: "-rotate-2" },
  { src: "/gallery/movement-4.webp", title: "Whispers & Promises", caption: "Moments meant to last a lifetime", rot: "rotate-2" },
  { src: "/gallery/movement-5.webp", title: "Embrace of Tomorrow", caption: "Two hearts beating in harmony", rot: "-rotate-1" },
  { src: "/gallery/movement-6.webp", title: "The Celebration", caption: "Ready for our cherished union", rot: "rotate-1" },
];

const WEDDING_TIMESTAMP = new Date("2027-01-16T10:30:00+05:30").getTime();

// ==========================================
// 2. MAIN COMPONENT (PAGE)
// ==========================================
export default function FreshInvitationPage() {
  const [unsealed, setUnsealed] = useState(false);
  const [isOpening, setIsOpening] = useState(false);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [activePhoto, setActivePhoto] = useState<number | null>(null);

  // 3D Parallax & Glint state
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [glint, setGlint] = useState({ x: 50, y: 50 });
  const cardRef = useRef<HTMLDivElement>(null);

  // Background Audio Ref
  const bgAudioRef = useRef<HTMLAudioElement | null>(null);

  // Countdown State
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  // RSVP Form State
  const [rsvpName, setRsvpName] = useState("");
  const [rsvpAttending, setRsvpAttending] = useState<"yes" | "no">("yes");
  const [rsvpGuests, setRsvpGuests] = useState(1);
  const [rsvpMessage, setRsvpMessage] = useState("");
  const [rsvpSubmitted, setRsvpSubmitted] = useState(false);

  // Update Countdown timer
  useEffect(() => {
    function calcRemaining() {
      const diff = Math.max(0, WEDDING_TIMESTAMP - Date.now());
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    }
    calcRemaining();
    const interval = setInterval(calcRemaining, 1000);
    return () => clearInterval(interval);
  }, []);

  // Web Audio Synthesis (Tactile wax snap + 5-note sacred temple chime)
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
        { freq: 369.99, delay: 0.04, gain: 0.14, decay: 2.3 },
        { freq: 466.16, delay: 0.12, gain: 0.12, decay: 2.5 },
        { freq: 554.37, delay: 0.20, gain: 0.12, decay: 2.7 },
        { freq: 739.99, delay: 0.28, gain: 0.10, decay: 2.9 },
        { freq: 932.33, delay: 0.36, gain: 0.08, decay: 3.1 },
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

  // Handle Unsealing
  const handleUnseal = () => {
    if (isOpening) return;
    setIsOpening(true);
    playSacredUnsealSound();

    // Start background music
    if (bgAudioRef.current) {
      bgAudioRef.current.volume = 0.6;
      bgAudioRef.current.play().then(() => setAudioPlaying(true)).catch(() => {});
    }

    // Complete transition after 3D wings swing open
    setTimeout(() => {
      setUnsealed(true);
      setIsOpening(false);
    }, 1600);
  };

  // Music toggle
  const toggleAudio = () => {
    if (!bgAudioRef.current) return;
    if (audioPlaying) {
      bgAudioRef.current.pause();
      setAudioPlaying(false);
    } else {
      bgAudioRef.current.play().then(() => setAudioPlaying(true)).catch(() => {});
    }
  };

  // 3D Mouse Parallax & Specular Glint
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isOpening || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setTilt({ x: (y - 0.5) * -12, y: (x - 0.5) * 12 });
    setGlint({ x: Math.round(x * 100), y: Math.round(y * 100) });
  };

  const handleMouseLeave = () => {
    if (!isOpening) {
      setTilt({ x: 0, y: 0 });
      setGlint({ x: 50, y: 50 });
    }
  };

  // Export iCal (.ics)
  const downloadICS = () => {
    const icsContent = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Vinayak & Ririn Royal Wedding//EN",
      "CALSCALE:GREGORIAN",
      "METHOD:PUBLISH",
      "BEGIN:VEVENT",
      "UID:royal-wedding-vinayak-ririn-2027@vinayakbhardwaj.com",
      "DTSTAMP:20261003T000000Z",
      "DTSTART:20270116T050000Z",
      "DTEND:20270116T120000Z",
      "SUMMARY:Shubh Vivah: Vinayak & Ririn",
      "DESCRIPTION:Witness the royal Hindu wedding ceremony of Vinayak & Ririn at Mahi Resort, Patti, Punjab.",
      "LOCATION:Mahi Resort, Patti, Punjab",
      "STATUS:CONFIRMED",
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n");

    const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "vinayak-ririn-royal-wedding.ics");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const googleCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
    "Shubh Vivah: Vinayak & Ririn's Royal Wedding"
  )}&dates=20270116T050000Z/20270116T120000Z&details=${encodeURIComponent(
    "Witness the royal Hindu wedding ceremony of Vinayak & Ririn at Mahi Resort, Patti, Punjab."
  )}&location=${encodeURIComponent("Mahi Resort, Patti, Punjab")}`;

  return (
    <div className="min-h-screen bg-[#FAF6F0] text-[#23181C] font-body selection:bg-amber-200 selection:text-amber-950">
      {/* Background Audio Element */}
      <audio ref={bgAudioRef} src="/audio/wedding-bgm.mp3" loop preload="none" />

      {/* Floating Audio Equalizer Control */}
      {unsealed && (
        <button
          onClick={toggleAudio}
          aria-label={audioPlaying ? "Mute music" : "Play music"}
          className="fixed top-6 right-6 z-40 flex items-center gap-2 rounded-full border border-amber-400/50 bg-[#160E12]/80 px-4 py-2 text-xs text-amber-200 shadow-lg backdrop-blur-md transition-all hover:bg-[#160E12] active:scale-95"
        >
          <div className="flex items-end gap-1 h-3.5">
            {[1, 2, 3, 4].map((bar) => (
              <span
                key={bar}
                className={`w-0.5 rounded-full bg-amber-300 transition-all duration-300 ${
                  audioPlaying ? "animate-pulse" : "h-1 opacity-50"
                }`}
                style={{
                  height: audioPlaying ? `${(bar * 3) + 3}px` : "3px",
                  animationDelay: `${bar * 0.15}s`,
                }}
              />
            ))}
          </div>
          <span className="font-body text-[10px] uppercase tracking-widest2 font-semibold">
            {audioPlaying ? "Shehnai On" : "Music"}
          </span>
        </button>
      )}

      {/* ========================================================
          STAGE 0: THE SEALED ROYAL PATRIKA (Awwwards 3D Unboxing)
          ======================================================== */}
      <AnimatePresence>
        {!unsealed && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#0C080A] p-4 sm:p-6 overflow-hidden select-none"
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Ambient Velvet Lighting */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(85,20,30,0.65)_0%,rgba(28,10,16,0.92)_55%,rgba(12,8,10,0.98)_85%)] pointer-events-none" />

            {/* Floating Subtle Golden Kesar Particles */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              {[...Array(16)].map((_, i) => (
                <div
                  key={i}
                  className="absolute rounded-full bg-amber-300/30 blur-[0.5px] animate-pulse"
                  style={{
                    width: `${(i % 3) * 2 + 2}px`,
                    height: `${(i % 3) * 2 + 2}px`,
                    left: `${(i * 23) % 100}%`,
                    top: `${(i * 17) % 100}%`,
                    animationDuration: `${3 + (i % 3)}s`,
                    animationDelay: `${(i % 4) * 0.7}s`,
                  }}
                />
              ))}
            </div>

            {/* 3D LOCKED ARTIFACT CARD CONTAINER */}
            <div
              ref={cardRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="relative w-full max-w-[380px] sm:max-w-[410px] aspect-[1/1.65] max-h-[82vh] rounded-2xl sm:rounded-3xl shadow-[0_30px_90px_-15px_rgba(0,0,0,0.95),0_0_40px_rgba(212,175,55,0.2)] border border-amber-500/30 overflow-hidden"
              style={{
                perspective: "1400px",
                transformStyle: "preserve-3d",
                transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                transition: isOpening ? "transform 1.1s cubic-bezier(0.25, 1, 0.35, 1)" : "transform 0.15s ease-out",
              }}
            >
              {/* INNER CARD REVEAL (Underneath Flaps) */}
              <motion.div
                className="absolute inset-0 z-0 bg-[#FFFDF9] flex flex-col items-center justify-between overflow-hidden"
                initial={{ scale: 0.94, opacity: 0.8 }}
                animate={isOpening ? { scale: 1, opacity: 1 } : { scale: 0.94, opacity: 0.8 }}
                transition={{ duration: 1.3, ease: [0.25, 1, 0.35, 1] }}
              >
                <div className="relative w-full h-full">
                  <Image
                    src="/images/couple-arch.webp"
                    alt="Vinayak & Ririn"
                    fill
                    priority
                    sizes="(max-width: 640px) 380px, 410px"
                    quality={90}
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#140C0E]/95 via-[#140C0E]/30 to-[#140C0E]/65" />
                  <div className="absolute inset-3 rounded-xl border border-amber-400/40 pointer-events-none" />

                  {/* Inner Typography */}
                  <div className="absolute inset-0 flex flex-col items-center justify-between p-6 text-center text-[#FFFDF9] pointer-events-none">
                    <div className="inline-flex items-center gap-1.5 rounded-full border border-amber-400/50 bg-[#160E12]/70 px-4 py-1 text-[11px] text-amber-200 shadow-md backdrop-blur-md">
                      <span className="text-amber-300">🪷</span>
                      <span className="font-serif tracking-widest uppercase font-semibold">
                        ॥ श्री गणेशाय नमः ॥
                      </span>
                      <span className="text-amber-300">🪷</span>
                    </div>

                    <div className="my-auto">
                      <p className="font-body text-[10px] uppercase tracking-widest2 text-amber-200">
                        Shubh Vivah Patrika
                      </p>
                      <h2 className="mt-2 font-display text-3xl sm:text-4xl italic drop-shadow-md">
                        Vinayak &amp; Ririn
                      </h2>
                      <div className="mx-auto my-2.5 h-px w-20 bg-gradient-to-r from-transparent via-amber-300 to-transparent" />
                      <p className="font-body text-xs text-amber-100/90">
                        16th January 2027 &middot; Mahi Resort, Patti, Punjab
                      </p>
                    </div>

                    <div className="w-full border-t border-amber-400/30 pt-2.5">
                      <p className="font-serif text-[11px] italic tracking-wider text-amber-200/90">
                        ॥ सदा सौभाग्यवती भव ॥
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* GATEFOLD DOORS (Strict 50/50 Split, Real 24K Foil Textures) */}
              <div className="absolute inset-0 z-10 pointer-events-none" style={{ transformStyle: "preserve-3d" }}>
                {/* LEFT FLAP */}
                <motion.div
                  className="absolute top-0 left-0 w-1/2 h-full overflow-hidden pointer-events-auto shadow-[4px_0_20px_rgba(0,0,0,0.5)]"
                  style={{ transformOrigin: "left center", transformStyle: "preserve-3d" }}
                  initial={{ rotateY: 0 }}
                  animate={isOpening ? { rotateY: -120 } : { rotateY: 0 }}
                  transition={{ duration: 1.25, ease: [0.25, 1, 0.35, 1] }}
                >
                  <div className="relative w-full h-full">
                    <Image
                      src="/images/royal-flap-left-clean.webp"
                      alt="Left Flap"
                      fill
                      priority
                      sizes="205px"
                      quality={92}
                      className="object-cover pointer-events-none select-none"
                    />
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background: `radial-gradient(circle at ${glint.x}% ${glint.y}%, rgba(255,248,220,0.45) 0%, rgba(212,175,55,0.18) 30%, transparent 60%)`,
                        mixBlendMode: "overlay",
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/30 pointer-events-none" />
                  </div>
                </motion.div>

                {/* RIGHT FLAP */}
                <motion.div
                  className="absolute top-0 right-0 w-1/2 h-full overflow-hidden pointer-events-auto shadow-[-4px_0_20px_rgba(0,0,0,0.5)]"
                  style={{ transformOrigin: "right center", transformStyle: "preserve-3d" }}
                  initial={{ rotateY: 0 }}
                  animate={isOpening ? { rotateY: 120 } : { rotateY: 0 }}
                  transition={{ duration: 1.25, ease: [0.25, 1, 0.35, 1] }}
                >
                  <div className="relative w-full h-full">
                    <Image
                      src="/images/royal-flap-right-clean.webp"
                      alt="Right Flap"
                      fill
                      priority
                      sizes="205px"
                      quality={92}
                      className="object-cover pointer-events-none select-none"
                    />
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background: `radial-gradient(circle at ${glint.x}% ${glint.y}%, rgba(255,248,220,0.45) 0%, rgba(212,175,55,0.18) 30%, transparent 60%)`,
                        mixBlendMode: "overlay",
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-l from-black/20 via-transparent to-black/30 pointer-events-none" />
                  </div>
                </motion.div>

                {/* CENTER SEAM SHADOW */}
                <motion.div
                  className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-0.5 bg-black/40 pointer-events-none z-20"
                  animate={isOpening ? { opacity: 0 } : { opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />

                {/* BRAIDED GOLD SILK CORD (WAIST) */}
                <motion.div
                  className="absolute top-1/2 left-0 right-0 -translate-y-1/2 h-3 z-25 pointer-events-none overflow-hidden"
                  animate={isOpening ? { scaleX: 0, opacity: 0 } : { scaleX: 1, opacity: 1 }}
                  transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                >
                  <div className="w-full h-full bg-gradient-to-r from-[#8A5A12] via-[#FCE38A] to-[#8A5A12] shadow-md border-y border-[#FFE8A3]/60 relative">
                    <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_4px,rgba(90,40,0,0.25)_4px,rgba(90,40,0,0.25)_8px)]" />
                  </div>
                </motion.div>

                {/* 3D 24K GOLD WAX SEAL MEDALLION */}
                <AnimatePresence>
                  {!isOpening && (
                    <motion.div
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-auto"
                      exit={{ scale: 1.3, opacity: 0, y: -15 }}
                      transition={{ duration: 0.45, ease: [0.34, 1.56, 0.64, 1] }}
                    >
                      <button
                        onClick={handleUnseal}
                        className="group relative w-28 h-28 sm:w-32 sm:h-32 flex items-center justify-center p-0 transition-all duration-300 hover:scale-106 active:scale-95 focus:outline-none"
                        aria-label="Unseal Royal Wedding Invitation"
                      >
                        <div className="absolute -inset-2 rounded-full bg-amber-400/30 blur-md animate-pulse opacity-70 group-hover:opacity-100 transition-opacity" />
                        <div className="relative w-full h-full drop-shadow-[0_12px_22px_rgba(0,0,0,0.85)] drop-shadow-[0_0_20px_rgba(212,175,55,0.5)]">
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

                      <motion.div
                        animate={{ y: [0, -3, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute -bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] font-semibold uppercase tracking-widest2 text-amber-200 bg-[#140D10]/95 px-3.5 py-1 rounded-full border border-amber-400/40 shadow-lg backdrop-blur-md pointer-events-none"
                      >
                        ✦ Tap Seal to Open ✦
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ========================================================
          SCENE 1: THE DARBAR HERO (Full Bleed Royal Entrance)
          ======================================================== */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6 py-28 text-center text-white">
        <Image
          src="/images/couple-hero.webp"
          alt="Vinayak & Ririn"
          fill
          priority
          quality={90}
          sizes="100vw"
          className="object-cover object-[50%_30%] scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#120A0D]/80 via-[#120A0D]/40 to-[#120A0D]/90" />

        {/* Ornate Gold Border Corners */}
        <div className="pointer-events-none absolute inset-4 sm:inset-8 border border-amber-400/20 rounded-3xl" />
        <div className="pointer-events-none absolute top-6 left-6 sm:top-10 sm:left-10 w-12 h-12 border-t-2 border-l-2 border-amber-400/50 rounded-tl-xl" />
        <div className="pointer-events-none absolute top-6 right-6 sm:top-10 sm:right-10 w-12 h-12 border-t-2 border-r-2 border-amber-400/50 rounded-tr-xl" />
        <div className="pointer-events-none absolute bottom-6 left-6 sm:bottom-10 sm:left-10 w-12 h-12 border-b-2 border-l-2 border-amber-400/50 rounded-bl-xl" />
        <div className="pointer-events-none absolute bottom-6 right-6 sm:bottom-10 sm:right-10 w-12 h-12 border-b-2 border-r-2 border-amber-400/50 rounded-br-xl" />

        <div className="relative mx-auto max-w-3xl z-10">
          <div className="mb-5 inline-flex items-center gap-2.5 rounded-full border border-amber-400/50 bg-[#160E12]/60 px-6 py-1.5 shadow-md backdrop-blur-md">
            <span className="text-amber-300 text-xs">🪷</span>
            <span className="font-serif text-sm font-semibold tracking-widest text-amber-200">
              ॥ श्री गणेशाय नमः ॥
            </span>
            <span className="text-amber-300 text-xs">🪷</span>
          </div>

          <p className="font-body text-xs uppercase tracking-widest2 text-amber-200/90 font-medium">
            Under Divine Blessings &middot; Together With Their Families
          </p>

          <h1 className="mt-5 font-display text-5xl sm:text-7xl italic bg-gradient-to-r from-[#FFF5D6] via-[#F4D068] to-[#D4AF37] bg-clip-text text-transparent drop-shadow-lg">
            Vinayak &amp; Ririn
          </h1>

          <div className="mx-auto my-6 flex items-center justify-center gap-3">
            <span className="h-px w-16 bg-gradient-to-r from-transparent to-amber-400" />
            <span className="text-amber-300">🪷</span>
            <span className="h-px w-16 bg-gradient-to-l from-transparent to-amber-400" />
          </div>

          {/* Rigveda Vivah Shloka */}
          <div className="mx-auto max-w-lg rounded-2xl border border-amber-400/30 bg-[#160E12]/50 px-6 py-4 shadow-lg backdrop-blur-md">
            <p className="font-serif text-sm sm:text-base italic tracking-wide text-amber-200">
              &ldquo;ॐ समञ्जन्तु विश्वेदेवाः समापो हृदयानि नौ&rdquo;
            </p>
            <p className="mt-1.5 font-body text-[11px] uppercase tracking-widest text-amber-100/75">
              &ldquo;May all divine energies unite our hearts as one&rdquo; &middot; Rigveda
            </p>
          </div>

          <p className="mt-6 font-body text-sm sm:text-base text-amber-100/90 tracking-wide">
            16th January 2027 &middot; Mahi Resort, Patti, Punjab
          </p>
        </div>

        <a
          href="#story"
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-amber-200/80 hover:text-amber-100 transition-colors"
        >
          <span className="font-body text-[10px] uppercase tracking-widest2">Explore Celebrations</span>
          <span className="animate-bounce text-xs text-amber-300">↓</span>
        </a>
      </section>

      {/* ========================================================
          SCENE 2: THE ROYAL CHRONICLES (Editorial Story)
          ======================================================== */}
      <section id="story" className="relative px-6 py-24 sm:py-32 overflow-hidden bg-[#FAF6F0]">
        <div className="relative mx-auto max-w-5xl">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="h-px w-8 bg-amber-600/40" />
              <p className="font-body text-xs uppercase tracking-widest3 text-amber-800 font-medium">
                The Royal Chronicles
              </p>
              <span className="h-px w-8 bg-amber-600/40" />
            </div>
            <h2 className="font-display text-4xl sm:text-5xl italic text-[#23181C]">
              Two Destinies, One Sacred Union
            </h2>
            <div className="mx-auto my-6 flex items-center justify-center gap-3">
              <span className="h-px w-16 bg-gradient-to-r from-transparent to-amber-500/50" />
              <span className="text-amber-700">🪷</span>
              <span className="h-px w-16 bg-gradient-to-l from-transparent to-amber-500/50" />
            </div>
          </div>

          <div className="mt-12 grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
            <div className="relative mx-auto w-full max-w-[380px] aspect-[3/4] overflow-hidden rounded-t-[100px] rounded-b-2xl border-2 border-amber-400/40 shadow-xl">
              <Image
                src="/images/couple-story.webp"
                alt="Vinayak and Ririn"
                fill
                quality={88}
                sizes="(min-width: 1024px) 380px, 90vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
              <div className="absolute inset-2 rounded-t-[94px] rounded-b-xl border border-amber-300/30 pointer-events-none" />
            </div>

            <div className="space-y-5 text-[#23181C]/85 text-base sm:text-lg leading-relaxed">
              <p>
                <span className="float-left mr-3 font-display text-4xl sm:text-5xl font-bold leading-none text-amber-700">
                  I
                </span>
                t began the way eternal love stories do — quietly, without either of us noticing. Two strangers whose paths crossed by divine design, unaware that destiny was already weaving their lives together.
              </p>
              <p>
                Then came the glances that lingered a moment too long, and the effortless smiles neither of us could quite explain. In the warmth of those early conversations, Vinayak and Ririn started truly seeing each other.
              </p>
              <p>
                Moments turned into late-night reflections, sharing dreams, hopes, and sacred values. Distance faded as understanding deepened, building a foundation of devotion, laughter, and unbreakable trust.
              </p>
              <p>
                What began as two separate journeys slowly blossomed into one shared heartbeat. On the auspicious day of 16th January 2027, under the sacred Agni and the blessings of our elders, our story unites forever.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          SCENE 3: SHUBH MUHURAT (Sacred Countdown)
          ======================================================== */}
      <section className="relative px-6 py-16 bg-[#F5EFE6] border-y border-amber-200/60">
        <div className="mx-auto max-w-2xl text-center">
          <div className="inline-flex items-center gap-2 mb-6">
            <span className="text-amber-600 text-xs">✦</span>
            <span className="font-serif text-xs font-semibold uppercase tracking-widest3 text-amber-800">
              ॥ शुभ मुहूर्त ॥ &middot; Countdown to the Sacred Hours
            </span>
            <span className="text-amber-600 text-xs">✦</span>
          </div>

          <div className="grid grid-cols-4 gap-2.5 sm:gap-5">
            {[
              { label: "Days", sub: "दिवस", val: timeLeft.days },
              { label: "Hours", sub: "घण्टा", val: timeLeft.hours },
              { label: "Minutes", sub: "क्षण", val: timeLeft.minutes },
              { label: "Seconds", sub: "पल", val: timeLeft.seconds },
            ].map((u) => (
              <div
                key={u.label}
                className="rounded-2xl border border-amber-400/40 bg-white/90 py-5 sm:py-6 shadow-md backdrop-blur-md"
              >
                <div className="font-display text-3xl sm:text-5xl font-medium text-amber-800 tabular-nums">
                  {String(u.val).padStart(2, "0")}
                </div>
                <div className="mt-1 font-body text-[10px] sm:text-xs uppercase tracking-widest text-[#23181C]/70 font-semibold">
                  {u.label}
                </div>
                <div className="text-[9px] font-serif text-amber-700/60 mt-0.5">
                  {u.sub}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================
          SCENE 4: VIVAH SANSKAR (Sacred Timeline & Rites)
          ======================================================== */}
      <section className="relative px-6 py-24 sm:py-32 bg-[#FAF6F0]">
        <div className="mx-auto max-w-4xl">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/40 bg-amber-50/70 px-5 py-1 text-xs text-amber-800">
              <span>🪷</span>
              <span className="font-serif tracking-widest font-semibold uppercase">
                ॥ विवाह संस्कार ॥
              </span>
              <span>🪷</span>
            </div>
            <h2 className="mt-4 font-display text-4xl sm:text-5xl italic text-[#23181C]">
              Sacred Rites &amp; Celebrations
            </h2>
            <p className="mt-3 font-body text-sm sm:text-base text-[#23181C]/75">
              The auspicious timeline of ceremonies celebrating the union of Vinayak &amp; Ririn.
            </p>
          </div>

          {/* Date & Venue Cards */}
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            <div className="rounded-2xl border border-amber-400/40 bg-white/85 p-8 text-center shadow-md">
              <span className="text-2xl">🪔</span>
              <p className="mt-2 font-body text-xs uppercase tracking-widest2 text-amber-800 font-semibold">
                Auspicious Date &amp; Muhurat
              </p>
              <p className="mt-2 font-display text-3xl font-medium">16th January 2027</p>
              <p className="mt-1 font-body text-sm text-[#23181C]/75">Saturday &middot; Baraat at 10:30 AM</p>
            </div>

            <div className="rounded-2xl border border-amber-400/40 bg-white/85 p-8 text-center shadow-md">
              <span className="text-2xl">🏛️</span>
              <p className="mt-2 font-body text-xs uppercase tracking-widest2 text-amber-800 font-semibold">
                Royal Wedding Grounds
              </p>
              <p className="mt-2 font-display text-3xl font-medium">Mahi Resort</p>
              <p className="mt-1 font-body text-sm text-[#23181C]/75">Patti, Punjab, India</p>
            </div>
          </div>

          {/* Timeline Rites */}
          <div className="mt-12 space-y-4">
            {CEREMONIES.map((c) => (
              <div
                key={c.title}
                className="flex flex-col gap-3 rounded-2xl border border-amber-400/30 bg-white/90 p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between transition-all hover:border-amber-500/60"
              >
                <div className="flex items-start sm:items-center gap-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-amber-400/50 bg-amber-50 font-serif text-sm font-semibold italic text-amber-800 shadow-inner">
                    {c.step}
                  </span>
                  <div>
                    <div className="flex flex-wrap items-baseline gap-2">
                      <h3 className="font-display text-lg font-semibold">{c.title}</h3>
                      <span className="font-serif text-xs text-amber-800/80 italic">{c.sanskrit}</span>
                    </div>
                    <p className="mt-1 font-body text-xs sm:text-sm text-[#23181C]/70 leading-relaxed max-w-xl">
                      {c.desc}
                    </p>
                  </div>
                </div>
                <span className="shrink-0 font-body text-xs font-bold uppercase tracking-widest text-amber-800 bg-amber-50 px-3.5 py-1.5 rounded-full border border-amber-300/50 self-start sm:self-center">
                  {c.time}
                </span>
              </div>
            ))}
          </div>

          {/* Action Buttons: Calendar & Map */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-4 text-center">
            <a
              href="https://www.google.com/maps/search/?api=1&query=Mahi+Resort,+Patti,+Punjab"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-amber-600 bg-amber-600 px-7 py-3 font-body text-xs uppercase tracking-widest2 text-white shadow-md hover:bg-amber-700 font-semibold active:scale-95 transition-all"
            >
              <span>📍 Venue Map &amp; Directions</span>
            </a>

            <a
              href={googleCalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-amber-400/50 bg-white px-7 py-3 font-body text-xs uppercase tracking-widest2 text-[#23181C]/80 hover:bg-amber-50 font-medium active:scale-95 transition-all"
            >
              <span>📅 Add to Google Calendar</span>
            </a>

            <button
              onClick={downloadICS}
              className="inline-flex items-center gap-2 rounded-full border border-amber-400/50 bg-white px-7 py-3 font-body text-xs uppercase tracking-widest2 text-[#23181C]/80 hover:bg-amber-50 font-medium active:scale-95 transition-all"
            >
              <span>🍏 Apple / iCal (.ics)</span>
            </button>
          </div>
        </div>
      </section>

      {/* ========================================================
          SCENE 5: THE ROYAL ARCHIVE (Gallery Reel)
          ======================================================== */}
      <section className="relative px-6 py-24 sm:py-32 bg-[#F5EFE6]">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="h-px w-8 bg-amber-600/40" />
              <p className="font-body text-xs uppercase tracking-widest3 text-amber-800 font-medium">
                The Royal Archive
              </p>
              <span className="h-px w-8 bg-amber-600/40" />
            </div>
            <h2 className="font-display text-4xl sm:text-5xl italic text-[#23181C]">
              Moments of Grace &amp; Devotion
            </h2>
          </div>

          <div className="mt-12 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-8 pt-4 scrollbar-none">
            {GALLERY_PHOTOS.map((p, idx) => (
              <div
                key={p.src}
                className={`w-[80vw] max-w-[320px] shrink-0 snap-center transition-all hover:scale-[1.02] ${p.rot} hover:rotate-0`}
              >
                <button
                  onClick={() => setActivePhoto(idx)}
                  className="block w-full overflow-hidden rounded-2xl border border-amber-400/40 bg-white p-3.5 text-left shadow-lg backdrop-blur-md"
                >
                  <div className="relative aspect-[3/4] w-full overflow-hidden rounded-xl border border-amber-200/50">
                    <Image
                      src={p.src}
                      alt={p.title}
                      fill
                      sizes="320px"
                      quality={84}
                      className="object-cover"
                    />
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <h3 className="font-display text-lg font-semibold">{p.title}</h3>
                    <span className="font-body text-[11px] font-bold text-amber-800">
                      0{idx + 1} / 06
                    </span>
                  </div>
                  <p className="mt-1 font-body text-xs text-[#23181C]/70">{p.caption}</p>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Lightbox Modal */}
        <AnimatePresence>
          {activePhoto !== null && (
            <motion.div
              className="fixed inset-0 z-[60] flex items-center justify-center bg-black/92 p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActivePhoto(null)}
            >
              <div className="relative h-[82vh] w-[92vw] max-w-4xl" onClick={(e) => e.stopPropagation()}>
                <Image
                  src={GALLERY_PHOTOS[activePhoto].src}
                  alt={GALLERY_PHOTOS[activePhoto].title}
                  fill
                  sizes="92vw"
                  quality={92}
                  className="rounded-2xl object-contain"
                />
                <button
                  onClick={() => setActivePhoto(null)}
                  className="absolute right-4 top-4 rounded-full border border-white/20 bg-white/10 px-4 py-2 font-body text-xs uppercase tracking-widest text-white"
                >
                  Close ✕
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* ========================================================
          SCENE 6: ASHIRWAD & RSVP (Royal Parchment)
          ======================================================== */}
      <section className="relative px-6 py-24 sm:py-32 bg-[#FAF6F0]">
        <div className="mx-auto max-w-2xl">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="h-px w-8 bg-amber-600/40" />
              <p className="font-body text-xs uppercase tracking-widest3 text-amber-800 font-medium">
                ॥ उपस्थिति सूचना ॥
              </p>
              <span className="h-px w-8 bg-amber-600/40" />
            </div>
            <h2 className="font-display text-4xl sm:text-5xl italic text-[#23181C]">
              Kindly Grace Us With Your Presence
            </h2>
            <p className="mt-3 font-body text-sm text-[#23181C]/75">
              Please confirm your attendance so we may reserve your royal welcome at the darbar.
            </p>
          </div>

          <div className="mt-12 overflow-hidden rounded-3xl border border-amber-400/40 bg-white p-8 shadow-xl sm:p-10">
            {rsvpSubmitted ? (
              <div className="py-6 text-center">
                <span className="text-3xl">🪷</span>
                <h3 className="mt-3 font-display text-2xl font-semibold">Thank You, {rsvpName}!</h3>
                <p className="mt-2 font-body text-sm text-[#23181C]/75">
                  Your response has been graciously received. We look forward to celebrating together!
                </p>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (rsvpName.trim()) setRsvpSubmitted(true);
                }}
                className="space-y-6"
              >
                <div>
                  <label className="block font-body text-xs uppercase tracking-widest2 text-[#23181C]/70 font-semibold">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={rsvpName}
                    onChange={(e) => setRsvpName(e.target.value)}
                    placeholder="e.g. Gurpreet Singh & Family"
                    className="mt-2 w-full rounded-xl border border-amber-300/60 bg-amber-50/20 px-4 py-3 font-body text-sm text-[#23181C] focus:border-amber-600 focus:outline-none"
                  />
                </div>

                <div>
                  <span className="block font-body text-xs uppercase tracking-widest2 text-[#23181C]/70 font-semibold">
                    Will You Attend? *
                  </span>
                  <div className="mt-2 grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setRsvpAttending("yes")}
                      className={`rounded-xl border py-3 font-body text-xs uppercase tracking-widest font-medium transition-all ${
                        rsvpAttending === "yes"
                          ? "border-amber-600 bg-amber-600 text-white shadow-sm"
                          : "border-amber-300/50 bg-white text-[#23181C]/70 hover:border-amber-500"
                      }`}
                    >
                      ✓ Joyfully Accepts
                    </button>
                    <button
                      type="button"
                      onClick={() => setRsvpAttending("no")}
                      className={`rounded-xl border py-3 font-body text-xs uppercase tracking-widest font-medium transition-all ${
                        rsvpAttending === "no"
                          ? "border-amber-600 bg-amber-600 text-white shadow-sm"
                          : "border-amber-300/50 bg-white text-[#23181C]/70 hover:border-amber-500"
                      }`}
                    >
                      ✕ Regretfully Declines
                    </button>
                  </div>
                </div>

                {rsvpAttending === "yes" && (
                  <div>
                    <label className="block font-body text-xs uppercase tracking-widest2 text-[#23181C]/70 font-semibold">
                      Number of Guests Attending
                    </label>
                    <div className="mt-2 flex items-center gap-2.5">
                      {[1, 2, 3, 4, 5].map((num) => (
                        <button
                          key={num}
                          type="button"
                          onClick={() => setRsvpGuests(num)}
                          className={`flex h-11 w-11 items-center justify-center rounded-xl border font-body text-sm font-semibold transition-all ${
                            rsvpGuests === num
                              ? "border-amber-600 bg-amber-600 text-white shadow-sm"
                              : "border-amber-300/50 bg-white text-[#23181C]/75 hover:border-amber-500"
                          }`}
                        >
                          {num}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <label className="block font-body text-xs uppercase tracking-widest2 text-[#23181C]/70 font-semibold">
                    Ashirwad &amp; Blessings (Optional)
                  </label>
                  <textarea
                    rows={3}
                    value={rsvpMessage}
                    onChange={(e) => setRsvpMessage(e.target.value)}
                    placeholder="Share an auspicious blessing for Vinayak & Ririn..."
                    className="mt-2 w-full rounded-xl border border-amber-300/60 bg-amber-50/20 px-4 py-3 font-body text-sm text-[#23181C] focus:border-amber-600 focus:outline-none"
                  />
                </div>

                <div className="pt-2 text-center">
                  <button
                    type="submit"
                    className="w-full rounded-full border border-amber-600 bg-amber-600 py-3.5 font-body text-xs uppercase tracking-widest2 text-white shadow-md hover:bg-amber-700 active:scale-98 sm:w-auto sm:px-12 font-semibold"
                  >
                    Confirm RSVP
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Shagun Bank Details */}
          <div className="mt-12 rounded-3xl border border-amber-400/40 bg-white p-7 shadow-md text-center">
            <p className="font-body text-xs uppercase tracking-widest2 text-amber-800 font-semibold">
              ॥ शगुन एवं शुभेच्छा ॥ &middot; Shagun &amp; Blessings
            </p>
            <p className="mt-2 font-body text-xs text-[#23181C]/70">
              For loved ones wishing to bestow their blessings from afar:
            </p>
            <div className="mt-4 text-xs font-mono bg-amber-50/60 p-3.5 rounded-xl border border-amber-200 text-[#23181C]/80 inline-block">
              Bank: BANK RAKYAT INDONESIA &middot; A/C: 323001031687534 &middot; RIRIN OKTOLINDA SARAGIH
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          SCENE 7: SACRED CLOSING FOOTER
          ======================================================== */}
      <footer className="relative px-6 py-16 text-center border-t border-amber-200/60 bg-[#F5EFE6]">
        <div className="mx-auto max-w-md">
          <div className="mb-3 inline-flex items-center gap-2 text-xs text-amber-800 font-semibold">
            <span>🪷</span>
            <span className="font-serif tracking-widest uppercase">॥ शुभमस्तु ॥</span>
            <span>🪷</span>
          </div>
          <p className="font-display text-3xl italic text-amber-900">Vinayak &amp; Ririn</p>
          <p className="mt-2 font-body text-xs uppercase tracking-widest2 text-[#23181C]/60">
            16th January 2027 &middot; Mahi Resort, Patti, Punjab
          </p>
          <p className="mt-4 font-body text-[11px] text-[#23181C]/50">
            Under the divine grace of the Almighty &middot; With eternal love and gratitude
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="mt-6 inline-flex items-center gap-1.5 font-body text-[10px] uppercase tracking-widest2 text-amber-800 hover:-translate-y-0.5 transition-transform"
          >
            ↑ Back to Top
          </button>
        </div>
      </footer>
    </div>
  );
}

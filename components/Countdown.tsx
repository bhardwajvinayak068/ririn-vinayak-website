"use client";

import { useEffect, useState } from "react";
import Reveal from "./Reveal";

const WEDDING_DATE = new Date("2027-01-16T18:00:00+05:30").getTime();

function getRemaining() {
  const diff = Math.max(0, WEDDING_DATE - Date.now());
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

export default function Countdown() {
  const [time, setTime] = useState<ReturnType<typeof getRemaining>>(() => getRemaining());

  useEffect(() => {
    const id = setInterval(() => setTime(getRemaining()), 1000);
    return () => clearInterval(id);
  }, []);

  const units: { label: string; sub: string; value: number }[] = [
    { label: "Days", sub: "दिवस", value: time?.days ?? 0 },
    { label: "Hours", sub: "घण्टा", value: time?.hours ?? 0 },
    { label: "Minutes", sub: "क्षण", value: time?.minutes ?? 0 },
    { label: "Seconds", sub: "पल", value: time?.seconds ?? 0 },
  ];

  return (
    <section className="relative z-10 px-6 py-12 sm:py-16">
      <div className="mx-auto max-w-2xl text-center">
        <Reveal>
          <div className="inline-flex items-center gap-2 mb-6">
            <span className="text-amber-600 text-xs">✦</span>
            <span className="font-serif text-xs font-semibold uppercase tracking-widest3 text-amber-800">
              ॥ शुभ मुहूर्त ॥ &middot; Countdown to the Sacred Hours
            </span>
            <span className="text-amber-600 text-xs">✦</span>
          </div>
        </Reveal>

        <div className="grid grid-cols-4 gap-2.5 sm:gap-5">
          {units.map((u) => (
            <Reveal key={u.label} variant="scale">
              <div className="relative rounded-2xl border border-amber-400/40 bg-white/80 py-5 sm:py-6 shadow-[0_8px_30px_-10px_rgba(212,175,55,0.2)] backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-amber-500/60">
                <div
                  className="font-display text-3xl sm:text-5xl font-medium text-amber-800 tabular-nums"
                  suppressHydrationWarning
                >
                  {String(u.value).padStart(2, "0")}
                </div>
                <div className="mt-1 font-body text-[10px] sm:text-xs uppercase tracking-widest text-ink/70 font-semibold">
                  {u.label}
                </div>
                <div className="text-[9px] font-serif text-amber-700/60 mt-0.5">
                  {u.sub}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

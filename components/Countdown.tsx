"use client";

import { useEffect, useState } from "react";
import Reveal from "./Reveal";

const WEDDING_DATE = new Date("2027-01-16T00:00:00+05:30").getTime();

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
  const [time, setTime] = useState<ReturnType<typeof getRemaining> | null>(null);

  useEffect(() => {
    setTime(getRemaining());
    const id = setInterval(() => setTime(getRemaining()), 1000);
    return () => clearInterval(id);
  }, []);

  const units: { label: string; value: number }[] = [
    { label: "Days", value: time?.days ?? 0 },
    { label: "Hours", value: time?.hours ?? 0 },
    { label: "Minutes", value: time?.minutes ?? 0 },
    { label: "Seconds", value: time?.seconds ?? 0 },
  ];

  return (
    <section className="relative z-10 px-6 pb-28 sm:pb-36">
      <div className="mx-auto grid max-w-xl grid-cols-4 gap-3 text-center sm:gap-6">
        {units.map((u) => (
          <Reveal key={u.label} variant="scale">
            <div className="rounded-2xl border border-rose-gold/25 bg-cream/70 py-6 shadow-[0_8px_30px_-12px_rgba(183,110,121,0.25)] backdrop-blur-sm transition-transform duration-300 hover:-translate-y-1">
              <div
                className="font-display text-3xl text-rose-gold sm:text-5xl tabular-nums"
                suppressHydrationWarning
              >
                {String(u.value).padStart(2, "0")}
              </div>
              <div className="mt-1 font-body text-[10px] uppercase tracking-widest2 text-ink/60 sm:text-xs">
                {u.label}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

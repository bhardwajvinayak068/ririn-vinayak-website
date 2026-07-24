"use client";

import { useState } from "react";
import Reveal from "./Reveal";
import Divider from "./Divider";

const FIELDS = [
  { label: "Bank Name", value: "BANK RAKYAT INDONESIA" },
  { label: "Account Holder", value: "RIRIN OKTOLINDA SARAGIH" },
  { label: "Account Number", value: "323001031687534" },
];

const SOCIALS = [
  { name: "Vinayak", url: "https://www.instagram.com/bhardwajvinayak104?igsh=MTB3dnoyOGVpNDByNw==" },
  { name: "Ririn", url: "https://www.instagram.com/ririnsaragihh?igsh=c2Nydno0cXA2eWE5" },
];

function CopyField({ label, value }: { label: string; value: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      // clipboard unavailable — silently ignore
    }
  }

  return (
    <div className="flex items-center justify-between gap-4 border-b border-rose-gold/15 py-4 last:border-b-0">
      <div>
        <p className="font-body text-[10px] uppercase tracking-widest2 text-ink/50">
          {label}
        </p>
        <p className="mt-1 font-display text-lg text-ink">{value}</p>
      </div>
      <button
        onClick={copy}
        className="shrink-0 rounded-full border border-rose-gold/40 px-4 py-1.5 font-body text-[10px] uppercase tracking-widest2 text-rose-gold transition-all duration-200 hover:bg-rose-gold hover:text-cream active:scale-90"
      >
        {copied ? "Copied ✓" : "Copy"}
      </button>
    </div>
  );
}

export default function GiftBank() {
  return (
    <section id="gift" className="relative z-10 px-6 py-28 sm:py-36">
      <div className="mx-auto max-w-2xl">
        <Reveal variant="clip" className="text-center">
          <p className="font-body text-xs uppercase tracking-widest2 text-rose-gold">
            With Love
          </p>
          <h2 className="mt-4 font-display text-4xl italic text-ink sm:text-5xl">
            Blessings &amp; Gifts
          </h2>
          <div className="my-8">
            <Divider />
          </div>
          <p className="mx-auto max-w-md font-body text-sm text-ink/70">
            Your presence is the greatest gift of all. For those who wish to
            send their blessings from afar, here are our details.
          </p>
        </Reveal>

        <Reveal variant="scale" className="mt-12">
          <div className="rounded-2xl border border-rose-gold/25 bg-cream/80 px-8 py-6 shadow-[0_8px_30px_-12px_rgba(183,110,121,0.25)] backdrop-blur-sm">
            {FIELDS.map((f) => (
              <CopyField key={f.label} label={f.label} value={f.value} />
            ))}
          </div>
        </Reveal>

        <Reveal className="mt-12 text-center">
          <p className="font-body text-xs uppercase tracking-widest2 text-rose-gold">
            Follow Along
          </p>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-4">
            {SOCIALS.map((s) => (
              <a
                key={s.name}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-rose-gold px-6 py-2.5 font-body text-xs uppercase tracking-widest2 text-rose-gold transition-all duration-200 hover:bg-rose-gold hover:text-cream active:scale-95"
              >
                Instagram — {s.name}
              </a>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

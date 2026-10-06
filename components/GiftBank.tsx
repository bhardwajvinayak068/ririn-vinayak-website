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
      // clipboard unavailable
    }
  }

  return (
    <div className="flex items-center justify-between gap-4 border-b border-amber-200/60 py-4.5 last:border-b-0">
      <div>
        <p className="font-body text-[10px] uppercase tracking-widest2 text-ink/60 font-medium">
          {label}
        </p>
        <p className="mt-1 font-display text-lg text-ink font-semibold">{value}</p>
      </div>
      <button
        onClick={copy}
        aria-label={`Copy ${label}`}
        className="shrink-0 rounded-full border border-amber-400/60 bg-amber-50 px-4 py-1.5 font-body text-[10px] uppercase tracking-widest2 text-amber-800 transition-all duration-200 hover:bg-amber-600 hover:text-white active:scale-90 font-medium"
      >
        {copied ? "Copied ✓" : "Copy"}
      </button>
    </div>
  );
}

export default function GiftBank() {
  return (
    <section id="gift" className="relative z-10 px-6 py-24 sm:py-32 bg-[#FAF6F0] overflow-hidden">
      <div className="mx-auto max-w-2xl">
        <Reveal variant="clip" className="text-center">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="h-px w-8 bg-amber-600/40" />
            <p className="font-body text-xs uppercase tracking-widest3 text-amber-800 font-medium">
              ॥ शगुन एवं शुभेच्छा ॥
            </p>
            <span className="h-px w-8 bg-amber-600/40" />
          </div>
          <h2 className="font-display text-4xl sm:text-5xl italic text-ink font-normal">
            Shagun &amp; Sacred Blessings
          </h2>
          <div className="my-6">
            <Divider variant="kamal" />
          </div>
          <p className="mx-auto max-w-md font-body text-sm text-ink/75">
            Your sacred presence and blessings are our greatest treasure. For cherished well-wishers joining in spirit from afar, here are our details.
          </p>
        </Reveal>

        <Reveal variant="scale" className="mt-12">
          <div className="rounded-3xl border border-amber-400/40 bg-white/95 px-8 py-6 shadow-[0_8px_30px_-12px_rgba(212,175,55,0.2)] backdrop-blur-md">
            {FIELDS.map((f) => (
              <CopyField key={f.label} label={f.label} value={f.value} />
            ))}
          </div>
        </Reveal>

        <Reveal className="mt-12 text-center">
          <p className="font-body text-xs uppercase tracking-widest2 text-amber-800 font-semibold">
            Connect With The Couple
          </p>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-4">
            {SOCIALS.map((s) => (
              <a
                key={s.name}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-amber-500/60 bg-white px-7 py-2.5 font-body text-xs uppercase tracking-widest2 text-amber-800 transition-all duration-200 hover:bg-amber-600 hover:text-white active:scale-95 font-medium shadow-sm"
              >
                Instagram &middot; {s.name}
              </a>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

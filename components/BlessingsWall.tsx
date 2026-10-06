"use client";

import { useEffect, useState } from "react";
import Reveal from "./Reveal";
import Divider from "./Divider";

interface Blessing {
  id: string;
  author: string;
  relation: string;
  message: string;
  date: string;
}

const DEFAULT_BLESSINGS: Blessing[] = [
  {
    id: "b1",
    author: "The Bhardwaj Family",
    relation: "Groom's Family",
    message: "May your sacred union bring endless warmth, joy, and spiritual harmony. Welcome to the family with open arms, dear Ririn!",
    date: "Punjab",
  },
  {
    id: "b2",
    author: "Keluarga Saragih",
    relation: "Bride's Family",
    message: "Selamat menempuh hidup baru untuk Vinayak dan Ririn. Semoga cinta dan kebahagiaan menyertai kalian selamanya.",
    date: "Indonesia",
  },
  {
    id: "b3",
    author: "Aman & Harpreet",
    relation: "Close Friends",
    message: "From late-night talks to taking the sacred Saptapadi in Punjab! Beyond thrilled for you two beautiful souls.",
    date: "Chandigarh",
  },
  {
    id: "b4",
    author: "Rohit & Megha",
    relation: "Family Friends",
    message: "Watching this divine love story unfold across cultures has been pure magic. Counting down the days to Mahi Resort!",
    date: "Delhi",
  },
];

export default function BlessingsWall() {
  const [blessings, setBlessings] = useState<Blessing[]>(DEFAULT_BLESSINGS);
  const [author, setAuthor] = useState("");
  const [relation, setRelation] = useState("");
  const [message, setMessage] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("wedding_blessings");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setBlessings([...parsed, ...DEFAULT_BLESSINGS]);
        }
      } catch {
        // ignore
      }
    }
  }, []);

  function handleAddBlessing(e: React.FormEvent) {
    e.preventDefault();
    if (!author.trim() || !message.trim()) return;

    const newBlessing: Blessing = {
      id: "user_" + Date.now(),
      author: author.trim(),
      relation: relation.trim() || "Cherished Guest",
      message: message.trim(),
      date: "Just Now",
    };

    const updated = [newBlessing, ...blessings];
    setBlessings(updated);

    const userBlessingsOnly = updated.filter((b) => b.id.startsWith("user_"));
    localStorage.setItem("wedding_blessings", JSON.stringify(userBlessingsOnly));

    setAuthor("");
    setRelation("");
    setMessage("");
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setOpenModal(false);
    }, 1400);
  }

  return (
    <section id="blessings" className="relative z-10 px-6 py-24 sm:py-32 bg-cream overflow-hidden">
      <div className="mx-auto max-w-5xl">
        <Reveal variant="clip" className="text-center">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="h-px w-8 bg-amber-600/40" />
            <p className="font-body text-xs uppercase tracking-widest3 text-amber-800 font-medium">
              ॥ आशीर्वचनम् ॥
            </p>
            <span className="h-px w-8 bg-amber-600/40" />
          </div>
          <h2 className="font-display text-4xl sm:text-5xl italic text-ink font-normal">
            The Wall of Sacred Ashirwad
          </h2>
          <div className="my-6">
            <Divider variant="kamal" />
          </div>
          <p className="mx-auto max-w-md font-body text-sm text-ink/75">
            Cherished blessings and heartfelt prayers from our loved ones across the globe.
          </p>
          <div className="mt-8">
            <button
              onClick={() => setOpenModal(true)}
              className="inline-flex items-center gap-2 rounded-full border border-amber-600 bg-amber-600 px-8 py-3.5 font-body text-xs uppercase tracking-widest2 text-white shadow-md transition-all duration-200 hover:bg-amber-700 hover:shadow-lg active:scale-95 font-semibold"
            >
              <span>✍ Bestow Your Blessing</span>
            </button>
          </div>
        </Reveal>

        {/* Postcard Grid */}
        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          {blessings.map((b) => (
            <Reveal key={b.id} variant="scale">
              <div className="relative flex flex-col justify-between rounded-3xl border border-amber-400/35 bg-white p-7 shadow-[0_8px_30px_-14px_rgba(212,175,55,0.2)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-amber-500/60 hover:shadow-md">
                <div>
                  <div className="flex items-center justify-between text-xs text-amber-800 font-medium">
                    <span className="font-body uppercase tracking-wider">{b.relation}</span>
                    <span className="font-serif italic">🪷 {b.date}</span>
                  </div>
                  <p className="mt-4 font-display text-base italic leading-relaxed text-ink/90 sm:text-lg">
                    &ldquo;{b.message}&rdquo;
                  </p>
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-amber-200/60 pt-3.5">
                  <p className="font-body text-xs font-semibold uppercase tracking-widest text-ink/80">
                    — {b.author}
                  </p>
                  <span className="font-serif text-xs text-amber-700/80 font-bold">V &middot; R</span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Modal Dialog for Adding Blessing */}
      {openModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Add your blessing dialog"
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/75 px-4 backdrop-blur-sm"
          onClick={() => setOpenModal(false)}
        >
          <div
            className="w-full max-w-lg rounded-3xl border border-amber-400/40 bg-white p-8 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {submitted ? (
              <div className="py-8 text-center">
                <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-amber-600 text-2xl text-white shadow-md">
                  ✓
                </div>
                <h3 className="font-display text-2xl italic text-ink font-semibold">Ashirwad Bestowed!</h3>
                <p className="mt-2 font-body text-sm text-ink/75">
                  Thank you for gracing Vinayak &amp; Ririn with your sacred love and prayers.
                </p>
              </div>
            ) : (
              <form onSubmit={handleAddBlessing} className="space-y-5">
                <div className="flex items-center justify-between border-b border-amber-200 pb-3">
                  <h3 className="font-display text-2xl italic text-ink font-semibold">Write a Blessing</h3>
                  <button
                    type="button"
                    onClick={() => setOpenModal(false)}
                    className="font-body text-sm text-ink/60 hover:text-ink"
                  >
                    ✕
                  </button>
                </div>

                <div>
                  <label
                    htmlFor="blessing-author"
                    className="block font-body text-xs uppercase tracking-widest2 text-ink/70 font-semibold"
                  >
                    Your Name *
                  </label>
                  <input
                    id="blessing-author"
                    type="text"
                    required
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    placeholder="e.g. Jasleen Kaur / Uncle David"
                    className="mt-1.5 w-full rounded-xl border border-amber-300/60 bg-amber-50/20 px-4 py-2.5 font-body text-sm text-ink focus:border-amber-600 focus:outline-none focus:ring-1 focus:ring-amber-600"
                  />
                </div>

                <div>
                  <label
                    htmlFor="blessing-relation"
                    className="block font-body text-xs uppercase tracking-widest2 text-ink/70 font-semibold"
                  >
                    Relationship or City (Optional)
                  </label>
                  <input
                    id="blessing-relation"
                    type="text"
                    value={relation}
                    onChange={(e) => setRelation(e.target.value)}
                    placeholder="e.g. Friend, Cousin, Colleague..."
                    className="mt-1.5 w-full rounded-xl border border-amber-300/60 bg-amber-50/20 px-4 py-2.5 font-body text-sm text-ink focus:border-amber-600 focus:outline-none focus:ring-1 focus:ring-amber-600"
                  />
                </div>

                <div>
                  <label
                    htmlFor="blessing-message"
                    className="block font-body text-xs uppercase tracking-widest2 text-ink/70 font-semibold"
                  >
                    Your Message of Ashirwad *
                  </label>
                  <textarea
                    id="blessing-message"
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Write a sweet prayer, memory, or wish for the couple..."
                    className="mt-1.5 w-full rounded-xl border border-amber-300/60 bg-amber-50/20 px-4 py-2.5 font-body text-sm text-ink focus:border-amber-600 focus:outline-none focus:ring-1 focus:ring-amber-600"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setOpenModal(false)}
                    className="rounded-full border border-amber-300/60 px-6 py-2.5 font-body text-xs uppercase tracking-widest text-ink/70 hover:bg-amber-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded-full border border-amber-600 bg-amber-600 px-7 py-2.5 font-body text-xs uppercase tracking-widest text-white shadow-md transition-all hover:bg-amber-700 active:scale-95 font-semibold"
                  >
                    Share Ashirwad
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

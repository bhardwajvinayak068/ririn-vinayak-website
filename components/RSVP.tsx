"use client";

import { useEffect, useState } from "react";
import Reveal from "./Reveal";
import Divider from "./Divider";

interface RsvpData {
  name: string;
  attending: "yes" | "no";
  guests: number;
  message: string;
  submittedAt: string;
}

export default function RSVP() {
  const [data, setData] = useState<RsvpData>({
    name: "",
    attending: "yes",
    guests: 1,
    message: "",
    submittedAt: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("wedding_rsvp");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setData(parsed);
        setIsSubmitted(true);
      } catch {
        // ignore
      }
    }
  }, []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!data.name.trim()) return;

    const payload = {
      ...data,
      submittedAt: new Date().toISOString(),
    };
    setData(payload);
    setIsSubmitted(true);
    setIsEditing(false);
    localStorage.setItem("wedding_rsvp", JSON.stringify(payload));
  }

  return (
    <section id="rsvp" className="relative z-10 px-6 py-24 sm:py-32 bg-[#FAF6F0] overflow-hidden">
      <div className="mx-auto max-w-2xl">
        <Reveal variant="clip" className="text-center">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="h-px w-8 bg-amber-600/40" />
            <p className="font-body text-xs uppercase tracking-widest3 text-amber-800 font-medium">
              ॥ उपस्थिति सूचना ॥
            </p>
            <span className="h-px w-8 bg-amber-600/40" />
          </div>
          <h2 className="font-display text-4xl sm:text-5xl italic text-ink font-normal">
            Kindly Grace Us With Your Presence
          </h2>
          <div className="my-6">
            <Divider variant="kamal" />
          </div>
          <p className="mx-auto max-w-md font-body text-sm text-ink/75">
            Please confirm your attendance so we may reserve your royal welcome at the darbar.
          </p>
        </Reveal>

        <Reveal variant="scale" className="mt-12">
          <div className="overflow-hidden rounded-3xl border border-amber-400/40 bg-white/95 p-8 shadow-[0_16px_45px_-16px_rgba(212,175,55,0.2)] backdrop-blur-md sm:p-10">
            {isSubmitted && !isEditing ? (
              <div className="py-6 text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-amber-400/50 bg-amber-50 text-2xl text-amber-800 shadow-inner">
                  🪷
                </div>
                <h3 className="font-display text-3xl italic text-ink font-semibold">
                  Thank You, {data.name}!
                </h3>
                <p className="mt-3 font-body text-sm text-ink/80">
                  {data.attending === "yes" ? (
                    <>
                      We are deeply honored to celebrate with you! Your party of{" "}
                      <strong>{data.guests}</strong> is graciously reserved.
                    </>
                  ) : (
                    <>
                      You will be truly missed, but we hold your warm blessings close to our hearts!
                    </>
                  )}
                </p>
                {data.message && (
                  <p className="mt-5 rounded-2xl border border-amber-400/30 bg-amber-50/50 p-4 font-body text-xs italic text-ink/80">
                    &ldquo;{data.message}&rdquo;
                  </p>
                )}
                <button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="mt-8 rounded-full border border-amber-600/60 px-7 py-2.5 font-body text-xs uppercase tracking-widest2 text-amber-800 transition-all duration-200 hover:bg-amber-600 hover:text-white active:scale-95 font-medium"
                >
                  Update Response
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="guest-name"
                    className="block font-body text-xs uppercase tracking-widest2 text-ink/70 font-semibold"
                  >
                    Your Full Name *
                  </label>
                  <input
                    id="guest-name"
                    type="text"
                    required
                    value={data.name}
                    onChange={(e) => setData({ ...data, name: e.target.value })}
                    placeholder="e.g. Gurpreet Singh & Family"
                    className="mt-2 w-full rounded-xl border border-amber-300/60 bg-amber-50/20 px-4 py-3 font-body text-sm text-ink placeholder:text-ink/30 focus:border-amber-600 focus:outline-none focus:ring-1 focus:ring-amber-600"
                  />
                </div>

                <div>
                  <span className="block font-body text-xs uppercase tracking-widest2 text-ink/70 font-semibold">
                    Will You Attend? *
                  </span>
                  <div className="mt-2 grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setData({ ...data, attending: "yes" })}
                      className={`rounded-xl border py-3 font-body text-xs uppercase tracking-widest transition-all duration-200 font-medium ${
                        data.attending === "yes"
                          ? "border-amber-600 bg-amber-600 text-white shadow-sm"
                          : "border-amber-300/50 bg-white text-ink/70 hover:border-amber-500"
                      }`}
                    >
                      ✓ Joyfully Accepts
                    </button>
                    <button
                      type="button"
                      onClick={() => setData({ ...data, attending: "no" })}
                      className={`rounded-xl border py-3 font-body text-xs uppercase tracking-widest transition-all duration-200 font-medium ${
                        data.attending === "no"
                          ? "border-amber-600 bg-amber-600 text-white shadow-sm"
                          : "border-amber-300/50 bg-white text-ink/70 hover:border-amber-500"
                      }`}
                    >
                      ✕ Regretfully Declines
                    </button>
                  </div>
                </div>

                {data.attending === "yes" && (
                  <div>
                    <label
                      htmlFor="guest-count"
                      className="block font-body text-xs uppercase tracking-widest2 text-ink/70 font-semibold"
                    >
                      Number of Guests Attending
                    </label>
                    <div className="mt-2 flex items-center gap-2.5">
                      {[1, 2, 3, 4, 5].map((num) => (
                        <button
                          key={num}
                          type="button"
                          onClick={() => setData({ ...data, guests: num })}
                          className={`flex h-11 w-11 items-center justify-center rounded-xl border font-body text-sm font-semibold transition-all duration-200 ${
                            data.guests === num
                              ? "border-amber-600 bg-amber-600 text-white shadow-sm"
                              : "border-amber-300/50 bg-white text-ink/75 hover:border-amber-500"
                          }`}
                        >
                          {num}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <label
                    htmlFor="guest-wishes"
                    className="block font-body text-xs uppercase tracking-widest2 text-ink/70 font-semibold"
                  >
                    Ashirwad &amp; Blessings (Optional)
                  </label>
                  <textarea
                    id="guest-wishes"
                    rows={3}
                    value={data.message}
                    onChange={(e) => setData({ ...data, message: e.target.value })}
                    placeholder="Share an auspicious blessing for Vinayak & Ririn..."
                    className="mt-2 w-full rounded-xl border border-amber-300/60 bg-amber-50/20 px-4 py-3 font-body text-sm text-ink placeholder:text-ink/30 focus:border-amber-600 focus:outline-none focus:ring-1 focus:ring-amber-600"
                  />
                </div>

                <div className="pt-2 text-center">
                  <button
                    type="submit"
                    className="w-full rounded-full border border-amber-600 bg-amber-600 py-3.5 font-body text-xs uppercase tracking-widest2 text-white shadow-md transition-all duration-200 hover:bg-amber-700 hover:shadow-lg active:scale-98 sm:w-auto sm:px-12 font-semibold"
                  >
                    Confirm RSVP
                  </button>
                </div>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

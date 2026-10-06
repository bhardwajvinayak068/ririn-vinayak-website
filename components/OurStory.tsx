"use client";

import Image from "next/image";
import Reveal from "./Reveal";
import Divider from "./Divider";

const PARAGRAPHS = [
  "It began the way eternal love stories do — quietly, without either of us noticing. Two strangers whose paths crossed by divine design, unaware that destiny was already weaving their lives together.",
  "Then came the glances that lingered a moment too long, and the effortless smiles neither of us could quite explain. In the warmth of those early conversations, Vinayak and Ririn started truly seeing each other.",
  "Moments turned into late-night reflections, sharing dreams, hopes, and sacred values. Distance faded as understanding deepened, building a foundation of devotion, laughter, and unbreakable trust.",
  "What began as two separate journeys slowly blossomed into one shared heartbeat. On the auspicious day of 16th January 2027, under the sacred Agni and the blessings of our elders, our story unites forever.",
];

export default function OurStory() {
  return (
    <section id="story" className="relative z-10 px-6 py-24 sm:py-32 overflow-hidden bg-[#FAF6F0]">
      {/* Subtle Sandstone Texture Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(212,175,55,0.06)_0%,transparent_70%)] pointer-events-none" />

      <div className="relative mx-auto max-w-5xl">
        <Reveal variant="clip" className="text-center">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="h-px w-8 bg-amber-600/40" />
            <p className="font-body text-xs uppercase tracking-widest3 text-amber-800 font-medium">
              The Royal Chronicles
            </p>
            <span className="h-px w-8 bg-amber-600/40" />
          </div>
          <h2 className="font-display text-4xl sm:text-5xl italic text-ink font-normal">
            Two Destinies, One Sacred Union
          </h2>
          <div className="my-6">
            <Divider variant="kamal" />
          </div>
        </Reveal>

        <div className="mt-12 grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
          {/* Portrait with Arched Gold Frame */}
          <Reveal variant="scale">
            <div className="relative mx-auto w-full max-w-[380px] aspect-[3/4] overflow-hidden rounded-t-[100px] rounded-b-2xl border-2 border-amber-400/40 shadow-[0_16px_45px_-15px_rgba(180,83,9,0.25)]">
              <Image
                src="/images/couple-story.webp"
                alt="Vinayak and Ririn"
                fill
                quality={88}
                sizes="(min-width: 1024px) 380px, 90vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent pointer-events-none" />
              <div className="absolute inset-2 rounded-t-[94px] rounded-b-xl border border-amber-300/30 pointer-events-none" />
            </div>
          </Reveal>

          {/* Editorial Story Text */}
          <div className="space-y-5 text-ink/85">
            {PARAGRAPHS.map((p, i) => (
              <Reveal key={i}>
                <p className="font-body text-base leading-relaxed sm:text-lg">
                  {i === 0 ? (
                    <>
                      <span className="float-left mr-3 font-display text-4xl sm:text-5xl font-bold leading-none text-amber-700">
                        {p.charAt(0)}
                      </span>
                      {p.slice(1)}
                    </>
                  ) : (
                    p
                  )}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

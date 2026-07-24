import Image from "next/image";
import Reveal from "./Reveal";
import Divider from "./Divider";

const PARAGRAPHS = [
  "It started the way most love stories don't — quietly, without either of them noticing. Two strangers, crossing paths, unaware of what was beginning.",
  "Then came the glances that lingered a moment too long, and the smiles neither of them could quite explain. Somewhere in between, Ririn and Vinayak started truly seeing each other.",
  "Texts turned into late-night conversations. Conversations turned into calls. And soon, calls turned into video calls — hours spent talking about everything and nothing, never quite wanting to say goodnight.",
  "What began as two strangers slowly became two people falling in love, one conversation at a time. And on the 16th of January 2027, that story continues — as one.",
];

export default function OurStory() {
  return (
    <section id="story" className="relative z-10 px-6 py-28 sm:py-36">
      <div className="mx-auto max-w-5xl">
        <Reveal variant="clip" className="text-center">
          <p className="font-body text-xs uppercase tracking-widest2 text-rose-gold">
            Our Story
          </p>
          <h2 className="mt-4 font-display text-4xl italic text-ink sm:text-5xl">
            Two Strangers, One Story
          </h2>
          <div className="my-8">
            <Divider />
          </div>
        </Reveal>

        <div className="grid items-center gap-10 sm:grid-cols-[0.85fr_1.15fr] sm:gap-14">
          <Reveal variant="scale">
            <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl border border-rose-gold/20 shadow-[0_16px_50px_-20px_rgba(183,110,121,0.4)]">
              <Image
                src="/images/couple-story.png"
                alt="Vinayak and Ririn"
                fill
                sizes="(min-width: 640px) 40vw, 90vw"
                className="object-cover"
              />
            </div>
          </Reveal>

          <div className="space-y-6">
            {PARAGRAPHS.map((p, i) => (
              <Reveal key={i}>
                <p className="font-body text-base leading-relaxed text-ink/80 sm:text-lg">
                  {p}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

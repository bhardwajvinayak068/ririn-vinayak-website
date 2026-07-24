import Image from "next/image";
import Reveal from "./Reveal";

export default function CoupleIntro() {
  return (
    <section
      id="intro"
      className="relative z-10 flex min-h-screen items-center justify-center overflow-hidden px-6 py-28 sm:min-h-[92vh]"
    >
      <Image
        src="/images/couple-hero.png"
        alt="Vinayak and Ririn"
        fill
        priority
        sizes="100vw"
        className="object-cover object-[50%_32%]"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-ink/55 via-ink/25 to-ink/65" />

      <div className="relative mx-auto max-w-2xl text-center text-cream">
        <Reveal>
          <p className="font-body text-xs uppercase tracking-widest2 text-cream/90 text-shadow-soft">
            Together With Their Families
          </p>
        </Reveal>

        <Reveal variant="clip">
          <h2 className="mt-6 font-display text-5xl italic text-shadow-soft sm:text-6xl">
            Vinayak &amp; Ririn
          </h2>
        </Reveal>

        <Reveal>
          <div className="my-8 flex items-center justify-center gap-3 text-rose-gold-light">
            <span className="h-px w-16 bg-cream/40" />
            <span className="text-sm">❁</span>
            <span className="h-px w-16 bg-cream/40" />
          </div>
        </Reveal>

        <Reveal>
          <p className="font-body text-base leading-relaxed text-cream/90 sm:text-lg">
            Two families, two stories, and one love that grew quietly and
            beautifully — now ready to begin its most cherished chapter. We
            can&rsquo;t wait to celebrate this new beginning surrounded by the
            people who mean the most to us.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

"use client";

import Image from "next/image";
import Reveal from "./Reveal";
import Divider from "./Divider";

export default function CoupleIntro() {
  return (
    <section
      id="intro"
      className="relative z-10 flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 py-28 sm:min-h-[96vh]"
    >
      {/* Background Hero Image with Slow Cinematic Ken Burns Effect */}
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src="/images/couple-hero.webp"
          alt="Vinayak and Ririn"
          fill
          priority
          quality={90}
          sizes="100vw"
          className="object-cover object-[50%_32%] scale-105 transition-transform duration-1000 ease-out"
        />
        {/* Warm Palace Sunlit Vignette & Golden Ambient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#1C1417]/65 via-[#1C1417]/25 to-[#1C1417]/80" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.15)_0%,transparent_70%)] pointer-events-none" />
      </div>

      {/* Royal Gold Frame Corner Accents */}
      <div className="pointer-events-none absolute inset-4 sm:inset-8 border border-amber-300/30 rounded-3xl" />
      <div className="pointer-events-none absolute top-6 left-6 sm:top-10 sm:left-10 w-12 h-12 border-t-2 border-l-2 border-amber-400/60 rounded-tl-xl" />
      <div className="pointer-events-none absolute top-6 right-6 sm:top-10 sm:right-10 w-12 h-12 border-t-2 border-r-2 border-amber-400/60 rounded-tr-xl" />
      <div className="pointer-events-none absolute bottom-6 left-6 sm:bottom-10 sm:left-10 w-12 h-12 border-b-2 border-l-2 border-amber-400/60 rounded-bl-xl" />
      <div className="pointer-events-none absolute bottom-6 right-6 sm:bottom-10 sm:right-10 w-12 h-12 border-b-2 border-r-2 border-amber-400/60 rounded-br-xl" />

      <div className="relative mx-auto max-w-2xl text-center text-cream">
        <Reveal>
          {/* Sacred Auspicious Invocation Badge (Warm Ivory & Gold) */}
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-amber-400/60 bg-[#FFFDF9]/95 px-6 py-1.5 shadow-md backdrop-blur-md">
            <span className="text-xs text-amber-600">🪷</span>
            <span className="font-serif text-sm font-bold tracking-widest text-amber-900">
              ॥ श्री गणेशाय नमः ॥
            </span>
            <span className="text-xs text-amber-600">🪷</span>
          </div>

          <p className="font-body text-xs uppercase tracking-widest2 text-amber-100/90 font-medium drop-shadow-sm">
            Under Divine Blessings &middot; Together With Their Families
          </p>
        </Reveal>

        <Reveal variant="clip">
          <h2 className="mt-5 font-display text-5xl italic sm:text-6xl md:text-7xl bg-gradient-to-r from-[#FFF5D6] via-[#F4D068] to-[#D4AF37] bg-clip-text text-transparent drop-shadow-[0_4px_25px_rgba(212,175,55,0.45)]">
            Vinayak &amp; Ririn
          </h2>
        </Reveal>

        <Reveal>
          <div className="my-6">
            <Divider variant="kamal" />
          </div>
        </Reveal>

        {/* Sacred Vedic Vivah Shloka */}
        <Reveal>
          <div className="mx-auto max-w-lg rounded-2xl border border-amber-300/40 bg-white/15 px-6 py-4 shadow-lg backdrop-blur-md">
            <p className="font-serif text-sm italic tracking-wide text-amber-200 text-shadow-soft sm:text-base">
              &ldquo;ॐ समञ्जन्तु विश्वेदेवाः समापो हृदयानि नौ&rdquo;
            </p>
            <p className="mt-1.5 font-body text-[11px] uppercase tracking-widest text-amber-100/80">
              &ldquo;May all divine energies unite our hearts as one&rdquo; &middot; Rigveda
            </p>
          </div>
        </Reveal>

        <Reveal>
          <p className="mt-6 font-body text-base leading-relaxed text-cream/95 text-shadow-soft sm:text-lg">
            With the grace of the Almighty and the cherished blessings of our
            ancestors, two souls unite in the sacred bond of marriage. We
            cordially invite you to grace our royal wedding celebrations and
            bestow your love and blessings upon us.
          </p>
        </Reveal>
      </div>

      <a
        href="#story"
        aria-label="Scroll down to Our Story"
        className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-1.5 text-amber-200/90 transition-colors hover:text-amber-100"
      >
        <span className="font-body text-[10px] uppercase tracking-widest2">Explore Celebrations</span>
        <span className="animate-bounce text-xs text-amber-300">↓</span>
      </a>
    </section>
  );
}

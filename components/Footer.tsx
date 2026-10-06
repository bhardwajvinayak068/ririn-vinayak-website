"use client";

import Divider from "./Divider";

export default function Footer() {
  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <footer className="relative z-10 px-6 pb-20 pt-10 text-center">
      <div className="mx-auto max-w-md">
        <Divider variant="kamal" className="mb-6 opacity-80" />
        <div className="mb-3 inline-flex items-center gap-2 text-xs text-amber-700">
          <span>🪷</span>
          <span className="font-serif tracking-widest uppercase font-semibold">॥ शुभमस्तु ॥</span>
          <span>🪷</span>
        </div>
        <p className="font-display text-3xl italic tracking-wide text-amber-800">
          Vinayak &amp; Ririn
        </p>
        <p className="mt-2 font-body text-xs uppercase tracking-widest2 text-ink/60">
          16th January 2027 &middot; Mahi Resort, Patti, Punjab
        </p>
        <p className="mt-4 font-body text-[11px] tracking-wider text-ink/50">
          Under the divine grace of the Almighty &middot; With eternal love and gratitude
        </p>
        <button
          onClick={scrollToTop}
          aria-label="Scroll to top of page"
          className="mt-6 inline-flex items-center gap-1.5 font-body text-[10px] uppercase tracking-widest2 text-amber-700 transition-transform duration-200 hover:-translate-y-0.5 active:scale-95"
        >
          <span>↑ Back to Top</span>
        </button>
      </div>
    </footer>
  );
}

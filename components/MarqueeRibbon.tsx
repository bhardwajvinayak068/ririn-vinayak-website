"use client";

export default function MarqueeRibbon() {
  const phrase = "✦ शुभ विवाह ✦ VINAYAK & RIRIN ✦ 16TH JANUARY 2027 ✦ MAHI RESORT, PATTI, PUNJAB ✦ ॥ श्री गणेशाय नमः ॥ ✦ TWO SOULS, ONE SACRED JOURNEY ✦ ";

  return (
    <div
      className="relative z-10 w-full overflow-hidden border-y border-amber-400/30 bg-amber-50/40 py-3.5 backdrop-blur-sm select-none"
      aria-hidden="true"
    >
      <div className="flex w-fit whitespace-nowrap animate-marquee">
        <span className="font-display text-sm italic tracking-widest text-amber-800 sm:text-base">
          {phrase} {phrase}
        </span>
        <span className="font-display text-sm italic tracking-widest text-amber-800 sm:text-base">
          {phrase} {phrase}
        </span>
      </div>
    </div>
  );
}

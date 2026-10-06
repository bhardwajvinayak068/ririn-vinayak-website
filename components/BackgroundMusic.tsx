"use client";

import { forwardRef, useImperativeHandle, useRef, useState } from "react";

export type BackgroundMusicHandle = {
  play: () => void;
};

const BackgroundMusic = forwardRef<BackgroundMusicHandle>((_, ref) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [muted, setMuted] = useState(false);
  const [started, setStarted] = useState(false);

  useImperativeHandle(ref, () => ({
    play: () => {
      const el = audioRef.current;
      if (!el) return;
      el.volume = 0.5;
      el.play().catch(() => {});
      setStarted(true);
    },
  }));

  function toggleMute() {
    const el = audioRef.current;
    if (!el) return;
    el.muted = !el.muted;
    setMuted(el.muted);
  }

  return (
    <>
      <audio ref={audioRef} src="/audio/wedding-bgm.mp3" loop preload="auto" />
      {started && (
        <button
          onClick={toggleMute}
          aria-label={muted ? "Unmute background music" : "Mute background music"}
          className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5 rounded-full border border-rose-gold/30 bg-cream/90 px-4 py-2 text-rose-gold shadow-[0_8px_30px_-8px_rgba(183,110,121,0.4)] backdrop-blur-md transition-all duration-300 hover:scale-105 active:scale-95"
        >
          <span className="font-body text-[10px] font-medium uppercase tracking-widest2 text-ink/75">
            {muted ? "Muted" : "Music"}
          </span>
          <div className="flex h-3.5 w-4 items-end justify-center gap-0.5" aria-hidden="true">
            {muted ? (
              <span className="h-0.5 w-3 rounded-full bg-rose-gold/50" />
            ) : (
              <>
                <span className="h-2 w-0.5 animate-pulse rounded-full bg-rose-gold" />
                <span className="h-3.5 w-0.5 animate-pulse rounded-full bg-rose-gold [animation-delay:200ms]" />
                <span className="h-1.5 w-0.5 animate-pulse rounded-full bg-rose-gold [animation-delay:400ms]" />
                <span className="h-3 w-0.5 animate-pulse rounded-full bg-rose-gold [animation-delay:150ms]" />
              </>
            )}
          </div>
        </button>
      )}
    </>
  );
});

BackgroundMusic.displayName = "BackgroundMusic";

export default BackgroundMusic;

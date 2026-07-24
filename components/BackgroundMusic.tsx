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
          className="fixed bottom-5 right-5 z-40 flex h-10 w-10 items-center justify-center rounded-full border border-rose-gold/40 bg-cream/80 text-rose-gold shadow-[0_8px_24px_-12px_rgba(183,110,121,0.5)] backdrop-blur-sm transition-transform active:scale-90"
        >
          {muted ? (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M11 5 6 9H2v6h4l5 4V5Z" />
              <line x1="23" y1="9" x2="17" y2="15" />
              <line x1="17" y1="9" x2="23" y2="15" />
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M11 5 6 9H2v6h4l5 4V5Z" />
              <path d="M15.5 8.5a5 5 0 0 1 0 7" />
              <path d="M18.5 6a9 9 0 0 1 0 12" />
            </svg>
          )}
        </button>
      )}
    </>
  );
});

BackgroundMusic.displayName = "BackgroundMusic";

export default BackgroundMusic;

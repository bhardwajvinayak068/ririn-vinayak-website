export default function Divider({
  variant = "flourish",
  className = "",
}: {
  variant?: "flourish" | "monogram" | "minimal" | "kamal";
  className?: string;
}) {
  if (variant === "kamal") {
    return (
      <div className={`mx-auto flex w-full max-w-[280px] items-center justify-center gap-3 text-amber-700/80 ${className}`}>
        <span className="h-px flex-1 bg-gradient-to-r from-transparent via-amber-400/60 to-amber-600/50" />
        <svg
          width="26"
          height="26"
          viewBox="0 0 24 24"
          fill="none"
          className="shrink-0 drop-shadow-[0_1px_3px_rgba(212,175,55,0.4)]"
          aria-hidden="true"
        >
          <path
            d="M12 3C12 7.5 9 10.5 9 14.5C9 17.5 12 19.5 12 19.5C12 19.5 15 17.5 15 14.5C15 10.5 12 3 12 3Z"
            fill="url(#goldGradDivider)"
          />
          <path
            d="M12 9C9 12 5.5 13.5 5.5 16.5C5.5 19 8 20.5 9.8 20.5C10.5 18.5 11.5 16.5 12 15.5C12.5 16.5 13.5 18.5 14.2 20.5C16 20.5 18.5 19 18.5 16.5C18.5 13.5 15 12 12 9Z"
            fill="url(#goldGradDivider)"
            fillOpacity="0.85"
          />
          <defs>
            <linearGradient id="goldGradDivider" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FDE68A" />
              <stop offset="0.45" stopColor="#D4AF37" />
              <stop offset="1" stopColor="#B45309" />
            </linearGradient>
          </defs>
        </svg>
        <span className="h-px flex-1 bg-gradient-to-l from-transparent via-amber-400/60 to-amber-600/50" />
      </div>
    );
  }

  if (variant === "monogram") {
    return (
      <div className={`mx-auto flex w-full max-w-[240px] items-center justify-center gap-3 text-amber-700/80 ${className}`}>
        <span className="h-px flex-1 bg-gradient-to-r from-transparent to-amber-500/40" />
        <span className="font-display text-sm italic tracking-widest text-amber-700">V &middot; R</span>
        <span className="h-px flex-1 bg-gradient-to-l from-transparent to-amber-500/40" />
      </div>
    );
  }

  if (variant === "minimal") {
    return (
      <div className={`mx-auto flex w-full max-w-[160px] items-center justify-center gap-2 text-amber-700/70 ${className}`}>
        <span className="h-px flex-1 bg-gradient-to-r from-transparent to-amber-500/40" />
        <span className="h-1.5 w-1.5 rotate-45 border border-amber-600/60 bg-amber-400/20" />
        <span className="h-px flex-1 bg-gradient-to-l from-transparent to-amber-500/40" />
      </div>
    );
  }

  return (
    <div className={`mx-auto flex w-full max-w-[260px] items-center justify-center gap-3 text-amber-700/80 ${className}`}>
      <span className="h-px flex-1 bg-gradient-to-r from-transparent to-amber-500/50" />
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        className="shrink-0 text-amber-700 transition-transform duration-300 hover:rotate-45"
        aria-hidden="true"
      >
        <path
          d="M12 2C12 7.52 7.52 12 2 12C7.52 12 12 16.48 12 22C12 16.48 16.48 12 22 12C16.48 12 12 7.52 12 2Z"
          fill="currentColor"
          fillOpacity="0.8"
        />
        <circle cx="12" cy="12" r="1.5" fill="#FFFDF9" />
      </svg>
      <span className="h-px flex-1 bg-gradient-to-l from-transparent to-amber-500/50" />
    </div>
  );
}

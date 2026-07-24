type RevealVariant = "rise" | "scale" | "clip";

const VARIANT_CLASS: Record<RevealVariant, string> = {
  rise: "reveal",
  scale: "reveal-scale",
  clip: "reveal-clip",
};

export default function Reveal({
  children,
  variant = "rise",
  className,
}: {
  children: React.ReactNode;
  variant?: RevealVariant;
  className?: string;
}) {
  return (
    <div className={`${VARIANT_CLASS[variant]} ${className ?? ""}`}>
      {children}
    </div>
  );
}

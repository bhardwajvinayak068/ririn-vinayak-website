"use client";

import { useEffect, useState } from "react";

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  rotation: number;
  vrot: number;
  scale: number;
  color: string;
}

const PETAL_COLORS = ["#D4AF37", "#F59E0B", "#D97706", "#781D26", "#F43F5E", "#FDE68A"];

export default function PetalBurst() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    let idCounter = 0;

    function handlePointerDown(e: MouseEvent | TouchEvent) {
      // Don't trigger if interacting with form inputs
      const target = e.target as HTMLElement | null;
      if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.tagName === "BUTTON")) {
        return;
      }

      const clientX = "touches" in e ? e.touches[0].clientX : (e as MouseEvent).clientX;
      const clientY = "touches" in e ? e.touches[0].clientY : (e as MouseEvent).clientY;

      const newParticles: Particle[] = Array.from({ length: 6 }, () => {
        const angle = Math.random() * Math.PI * 2;
        const speed = 1.5 + Math.random() * 3.5;
        return {
          id: ++idCounter,
          x: clientX,
          y: clientY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 1.5,
          rotation: Math.random() * 360,
          vrot: (Math.random() - 0.5) * 8,
          scale: 0.6 + Math.random() * 0.6,
          color: PETAL_COLORS[Math.floor(Math.random() * PETAL_COLORS.length)],
        };
      });

      setParticles((prev) => [...prev.slice(-24), ...newParticles]);
    }

    window.addEventListener("pointerdown", handlePointerDown);
    return () => window.removeEventListener("pointerdown", handlePointerDown);
  }, []);

  useEffect(() => {
    if (particles.length === 0) return;

    let animId: number;
    function update() {
      setParticles((prev) =>
        prev
          .map((p) => ({
            ...p,
            x: p.x + p.vx,
            y: p.y + p.vy,
            vy: p.vy + 0.12, // gravity
            vx: p.vx * 0.98, // air drag
            rotation: p.rotation + p.vrot,
            scale: p.scale * 0.97, // gradual shrink
          }))
          .filter((p) => p.scale > 0.08)
      );
      animId = requestAnimationFrame(update);
    }

    animId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(animId);
  }, [particles.length]);

  if (particles.length === 0) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden" aria-hidden="true">
      {particles.map((p) => (
        <svg
          key={p.id}
          viewBox="0 0 20 20"
          className="absolute h-5 w-5 will-change-transform"
          style={{
            transform: `translate3d(${p.x}px, ${p.y}px, 0) rotate(${p.rotation}deg) scale(${p.scale})`,
            transformOrigin: "center center",
          }}
        >
          <path
            d="M10 2C10 6 6 10 2 10C6 10 10 14 10 18C10 14 14 10 18 10C14 10 10 6 10 2Z"
            fill={p.color}
            fillOpacity={0.85}
          />
        </svg>
      ))}
    </div>
  );
}

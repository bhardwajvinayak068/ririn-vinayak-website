"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [cursorState, setCursorState] = useState<"default" | "seal" | "view" | "interactive">("default");

  const [hasMoved, setHasMoved] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 28, stiffness: 350, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Only enable on non-touch desktop pointer devices
    if (window.matchMedia("(pointer: fine)").matches) {
      setEnabled(true);
    } else {
      return;
    }

    const updateCursorAtPoint = (x: number, y: number) => {
      const el = document.elementFromPoint(x, y);
      if (!el) {
        setCursorState("default");
        return;
      }
      const cursorTarget = el.closest("[data-cursor]") as HTMLElement | null;
      if (cursorTarget) {
        const type = cursorTarget.getAttribute("data-cursor");
        if (type === "seal") setCursorState("seal");
        else if (type === "view") setCursorState("view");
        else setCursorState("interactive");
      } else if (el.closest("button") || el.closest("a") || el.closest("[role='button']")) {
        setCursorState("interactive");
      } else {
        setCursorState("default");
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!hasMoved) setHasMoved(true);
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      updateCursorAtPoint(e.clientX, e.clientY);
    };

    const handleClick = () => {
      setCursorState("default");
      setTimeout(() => {
        updateCursorAtPoint(mouseX.get(), mouseY.get());
      }, 80);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("click", handleClick, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("click", handleClick);
    };
  }, [mouseX, mouseY, hasMoved]);

  if (!enabled || !hasMoved) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[99999] overflow-hidden">
      {/* 1. Precision Center Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-amber-700 shadow-sm pointer-events-none"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />

      {/* 2. Fluid Trailing Ring with Contextual Morphing */}
      <motion.div
        className="fixed top-0 left-0 flex items-center justify-center rounded-full pointer-events-none backdrop-blur-[1px]"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width:
            cursorState === "view"
              ? 68
              : cursorState === "interactive" || cursorState === "seal"
              ? 46
              : 28,
          height:
            cursorState === "view"
              ? 68
              : cursorState === "interactive" || cursorState === "seal"
              ? 46
              : 28,
          backgroundColor:
            cursorState === "view"
              ? "rgba(255, 253, 249, 0.85)"
              : cursorState === "interactive" || cursorState === "seal"
              ? "rgba(212, 175, 55, 0.06)"
              : "rgba(212, 175, 55, 0.03)",
          borderColor:
            cursorState === "view"
              ? "rgba(180, 130, 40, 0.8)"
              : cursorState === "interactive" || cursorState === "seal"
              ? "rgba(212, 175, 55, 0.65)"
              : "rgba(212, 175, 55, 0.35)",
          borderWidth: 1.5,
          scale: 1,
        }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
      >
        {cursorState === "view" && (
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="font-serif text-[10px] font-bold tracking-widest uppercase text-amber-900 select-none text-center leading-none"
          >
            VIEW
          </motion.span>
        )}
      </motion.div>
    </div>
  );
}

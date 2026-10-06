"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface RoyalPreloaderProps {
  onComplete?: () => void;
}

export default function RoyalPreloader({ onComplete }: RoyalPreloaderProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // 1.2s entrance choreography
    const timer = setTimeout(() => {
      setVisible(false);
      if (onComplete) onComplete();
    }, 1200);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.03 }}
          transition={{ duration: 0.65, ease: [0.25, 1, 0.35, 1] }}
          className="fixed inset-0 z-[100000] flex flex-col items-center justify-center bg-[#FAF7F2] select-none pointer-events-auto"
        >
          {/* Subtle Golden Ambient Aura */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,248,225,0.85)_0%,rgba(240,230,215,0.7)_60%,rgba(226,215,199,0.9)_100%)]" />

          {/* Center Emblem Container */}
          <div className="relative z-10 flex flex-col items-center text-center px-6">
            {/* Rotating Sacred Concentric Ring */}
            <div className="relative w-28 h-28 sm:w-32 sm:h-32 flex items-center justify-center mb-6">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full border border-amber-400/40 border-dashed"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
                className="absolute inset-2 rounded-full border border-amber-300/60"
              />
              <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-[#FFFDF9] to-[#F5EEDB] border border-amber-400/60 flex items-center justify-center shadow-md">
                <span className="font-serif text-2xl font-bold text-amber-900 tracking-wider">
                  VR
                </span>
              </div>
            </div>

            {/* Sacred Vedic Liturgy */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.5 }}
              className="space-y-2"
            >
              <p className="font-sanskrit text-base sm:text-lg text-amber-900 tracking-wider font-normal">
                ॥ श्री गणेशाय नमः ॥
              </p>
              <h1 className="font-display text-2xl sm:text-3xl italic text-[#2C2225] font-light">
                Vinayak &amp; Ririn
              </h1>
              <p className="font-body text-[10px] sm:text-[11px] uppercase tracking-widest3 text-amber-800 font-semibold pt-1">
                Royal Wedding Patrika &middot; 2027
              </p>
            </motion.div>

            {/* Minimal Gold Progress Filament */}
            <div className="mt-8 w-36 h-[2px] bg-amber-200/50 rounded-full overflow-hidden">
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{ duration: 1.1, ease: "easeInOut", repeat: Infinity }}
                className="w-1/2 h-full bg-gradient-to-r from-amber-400 to-amber-600 rounded-full"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

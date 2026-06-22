"use client";

import { AnimatePresence, motion } from "framer-motion";
import { PHRASES } from "../_data/gateData";

type GateTitleProps = {
  phraseIndex: number;
};

export default function GateTitle({ phraseIndex }: GateTitleProps) {
  return (
    <div className="mb-5 sm:mb-7 md:mb-8">
      <div className="mb-3 h-[44px] overflow-hidden sm:h-[56px] md:h-[72px]">
        <AnimatePresence mode="wait">
          <motion.p
            key={PHRASES[phraseIndex]}
            initial={{ opacity: 0, y: 18, filter: "blur(5px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -14, filter: "blur(5px)" }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="text-[44px] font-semibold leading-none tracking-[-0.06em] text-[var(--ink)] transition-colors duration-300 sm:text-5xl md:text-7xl"
          >
            {PHRASES[phraseIndex]}
          </motion.p>
        </AnimatePresence>
      </div>

      <p className="mx-auto max-w-[260px] font-mono text-[10px] font-semibold uppercase leading-5 tracking-[0.15em] text-[var(--muted)] transition-colors duration-300 sm:max-w-xs sm:text-[11px] sm:tracking-[0.18em]">
        Complete a gate to continue.
      </p>
    </div>
  );
}
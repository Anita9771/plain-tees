"use client";

import { KeyboardEvent } from "react";
import { motion } from "framer-motion";

import type { TeeSize } from "@/lib/types";

interface SizeSelectorProps {
  value: TeeSize;
  sizes: TeeSize[];
  onChange: (size: TeeSize) => void;
}

const spring = { type: "spring", stiffness: 120, damping: 18 } as const;

export default function SizeSelector({ value, sizes, onChange }: SizeSelectorProps) {
  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>, current: TeeSize) => {
    const index = sizes.indexOf(current);
    if (index === -1) return;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      event.preventDefault();
      const next = sizes[(index + 1) % sizes.length];
      onChange(next);
    }
    if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      event.preventDefault();
      const prev = sizes[(index - 1 + sizes.length) % sizes.length];
      onChange(prev);
    }
  };

  return (
    <div role="radiogroup" className="mt-3 flex flex-wrap gap-3" aria-label="Select tee size">
      {sizes.map((size) => {
        const isActive = size === value;
        return (
          <motion.button
            key={size}
            role="radio"
            aria-checked={isActive}
            onKeyDown={(event) => handleKeyDown(event, size)}
            onClick={() => onChange(size)}
            whileHover={{ y: -2 }}
            transition={spring}
            className={`flex h-12 min-w-[64px] items-center justify-center rounded-full border px-5 text-sm uppercase tracking-[0.3em] transition ${
              isActive
                ? "border-accent bg-accent/10 text-text"
                : "border-outline/60 text-subtext hover:border-accent/80"
            } focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent`}
          >
            {size}
          </motion.button>
        );
      })}
    </div>
  );
}


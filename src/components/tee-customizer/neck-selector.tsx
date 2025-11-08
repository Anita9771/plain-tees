"use client";

import { motion } from "framer-motion";

import type { TeeNeck } from "@/lib/types";
import { formatNeck } from "@/lib/whatsapp";

interface NeckSelectorProps {
  value: TeeNeck;
  necks: TeeNeck[];
  onChange: (neck: TeeNeck) => void;
}

const spring = { type: "spring", stiffness: 120, damping: 18 } as const;

export default function NeckSelector({ value, necks, onChange }: NeckSelectorProps) {
  return (
    <div role="radiogroup" className="mt-3 flex flex-wrap gap-3" aria-label="Select neck shape">
      {necks.map((neck) => {
        const isActive = neck === value;
        return (
          <motion.button
            key={neck}
            role="radio"
            aria-checked={isActive}
            onClick={() => onChange(neck)}
            whileHover={{ y: -2 }}
            transition={spring}
            className={`flex h-12 min-w-[88px] items-center justify-center rounded-full border px-5 text-sm uppercase tracking-[0.3em] transition ${
              isActive
                ? "border-accent bg-accent/10 text-text"
                : "border-outline/60 text-subtext hover:border-accent/80"
            } focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent`}
          >
            {formatNeck(neck)}
          </motion.button>
        );
      })}
    </div>
  );
}


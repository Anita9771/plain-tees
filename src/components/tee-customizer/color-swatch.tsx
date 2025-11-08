"use client";

import { motion } from "framer-motion";

import type { TeeColor } from "@/lib/types";

const spring = { type: "spring", stiffness: 120, damping: 18 } as const;

const colorHex: Record<TeeColor, string> = {
  white: "#F4F6FC",
  black: "#1C1D21",
  grey: "#7F8793",
  navy: "#1C2B4A",
  olive: "#3A4B2F",
  sand: "#C9A97B",
  yellow: "#FCD34D",
};

interface ColorSwatchProps {
  value: TeeColor;
  colors: TeeColor[];
  onChange: (color: TeeColor) => void;
}

export default function ColorSwatch({ value, colors, onChange }: ColorSwatchProps) {
  return (
    <div
      role="radiogroup"
      aria-label="Select tee color"
      className="mt-3 flex flex-wrap gap-4"
    >
      {colors.map((color) => {
        const isSelected = value === color;
        return (
          <motion.button
            key={color}
            role="radio"
            aria-checked={isSelected}
            aria-label={`${capitalize(color)} tee`}
            onClick={() => onChange(color)}
            whileHover={{ y: -4, scale: 1.05 }}
            whileFocus={{ scale: 1.05 }}
            transition={spring}
            className={`relative flex h-14 w-14 items-center justify-center rounded-full border-2 transition ${
              isSelected ? "border-accent shadow-glow" : "border-outline/60"
            } focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent`}
            style={{ backgroundColor: colorHex[color] }}
          >
            <span className="sr-only">{capitalize(color)}</span>
            {color === "white" && (
              <span
                className="absolute inset-1 rounded-full border border-outline/40"
                aria-hidden
              />
            )}
          </motion.button>
        );
      })}
    </div>
  );
}

function capitalize(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

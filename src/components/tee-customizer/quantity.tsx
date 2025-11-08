"use client";

import { motion } from "framer-motion";

interface QuantityInputProps {
  value: number;
  onChange: (qty: number) => void;
}

const spring = { type: "spring", stiffness: 120, damping: 18 } as const;

export default function QuantityInput({ value, onChange }: QuantityInputProps) {
  const decrement = () => onChange(Math.max(1, value - 1));
  const increment = () => onChange(value + 1);

  return (
    <div className="flex items-center justify-between rounded-2xl border border-outline/60 bg-surface/80 p-4 text-sm text-subtext">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-subtext/70">Quantity</p>
        <p className="mt-1 text-xs text-subtext/80">Order as many as you need.</p>
      </div>
      <div className="flex items-center gap-3">
        <IconButton ariaLabel="Decrease quantity" onClick={decrement} disabled={value <= 1}>
          −
        </IconButton>
        <span className="w-8 text-center text-lg font-semibold text-text">{value}</span>
        <IconButton ariaLabel="Increase quantity" onClick={increment}>
          +
        </IconButton>
      </div>
    </div>
  );
}

interface IconButtonProps {
  ariaLabel: string;
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
}

function IconButton({ ariaLabel, onClick, disabled, children }: IconButtonProps) {
  return (
    <motion.button
      type="button"
      aria-label={ariaLabel}
      onClick={onClick}
      disabled={disabled}
      whileTap={!disabled ? { scale: 0.92 } : undefined}
      transition={spring}
      className={`flex h-10 w-10 items-center justify-center rounded-full border text-lg font-semibold text-text transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
        disabled
          ? "cursor-not-allowed border-outline/40 text-subtext/40"
          : "border-outline/70 hover:border-accent hover:text-accent"
      }`}
    >
      {children}
    </motion.button>
  );
}


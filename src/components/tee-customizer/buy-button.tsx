"use client";

import { motion } from "framer-motion";
import Link from "next/link";

import type { TeeColor, TeeNeck, TeeSize } from "@/lib/types";
import { formatNeck } from "@/lib/whatsapp";

interface BuyButtonProps {
  href: string;
  disabled?: boolean;
  qty: number;
  selectedColor: TeeColor;
  selectedSize: TeeSize;
  selectedNeck: TeeNeck;
  compact?: boolean;
  spring: { type: string; stiffness: number; damping: number };
}

export default function BuyButton({
  href,
  disabled,
  qty,
  selectedColor,
  selectedSize,
  selectedNeck,
  compact = false,
  spring,
}: BuyButtonProps) {
  const label = compact ? "Buy on WhatsApp" : "Buy instantly on WhatsApp";
  return (
    <motion.div whileHover={!disabled ? { y: -2 } : undefined} transition={spring}>
      <Link
        href={href}
        target="_blank"
        rel="noreferrer"
        aria-disabled={disabled}
        className={`inline-flex w-full items-center justify-center gap-3 rounded-full border border-transparent bg-accent px-6 py-4 text-sm font-semibold text-[#04150E] shadow-glow transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
          disabled ? "pointer-events-none opacity-60" : "hover:-translate-y-0.5"
        } ${compact ? "max-w-[220px]" : ""}`}
      >
        <WhatsAppIcon className="h-5 w-5 text-[#04150E]" />
        <span>{label}</span>
        <span className="text-xs uppercase tracking-[0.3em] text-[#064C3A]">
          {qty} × {selectedSize} / {capitalize(selectedColor)} / {formatNeck(selectedNeck)}
        </span>
      </Link>
    </motion.div>
  );
}

function capitalize(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={className}
      role="img"
      focusable="false"
    >
      <path
        fill="currentColor"
        d="M12 1.75c-5.62 0-10.2 4.47-10.2 9.98 0 1.76.49 3.48 1.41 4.98l-1.47 5.36a.72.72 0 0 0 .88.88l5.36-1.47a10.7 10.7 0 0 0 4.02.76c5.62 0 10.2-4.47 10.2-9.98S17.62 1.75 12 1.75zm5.94 14.63c-.25.7-1.47 1.35-2.02 1.4-.52.05-1.19.07-1.93-.12-.44-.11-1-.33-1.72-.65-3.04-1.32-5-4.5-5.16-4.71-.15-.21-1.23-1.63-1.23-3.11 0-1.47.78-2.19 1.06-2.49.25-.26.66-.38 1.06-.38.13 0 .25 0 .36.01.32.01.48.03.69.53.25.6.86 2.07.94 2.22.08.15.12.32.02.52-.08.17-.12.27-.24.43-.11.13-.24.3-.34.4-.11.11-.23.23-.1.45.13.21.58.96 1.24 1.55.85.76 1.55 1 1.77 1.11.23.11.36.09.49-.06.14-.15.57-.66.73-.88.17-.21.33-.18.55-.11.22.07 1.41.66 1.65.78.24.11.4.17.46.27.06.1.06.7-.19 1.4z"
      />
    </svg>
  );
}


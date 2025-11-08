"use client";

import { useMemo } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";

import type { ProductVariant, TeeNeck } from "@/lib/types";
import { formatNeck } from "@/lib/whatsapp";

interface ModelViewerProps {
  variant: ProductVariant;
  onImageError: () => void;
  onImageLoad: () => void;
}

const transition = { type: "spring", stiffness: 120, damping: 18 } as const;

export default function ModelViewer({ variant, onImageError, onImageLoad }: ModelViewerProps) {
  const prefersReducedMotion = useReducedMotion();

  const animation = useMemo(() => {
    if (prefersReducedMotion) {
      return { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } };
    }
    return {
      initial: { opacity: 0, scale: 0.98 },
      animate: { opacity: 1, scale: 1 },
      exit: { opacity: 0, scale: 0.98 },
    };
  }, [prefersReducedMotion]);

  return (
    <div className="relative rounded-[32px] border border-outline/60 bg-gradient-to-br from-surface/60 to-surface/20 p-6">
      <div className="absolute inset-6 rounded-[28px] bg-[radial-gradient(circle_at_30%_20%,rgba(16,185,129,0.2),transparent_50%),radial-gradient(circle_at_70%_10%,rgba(255,209,102,0.08),transparent_50%)] blur-2xl" />
      <div className="relative isolate overflow-hidden rounded-[26px] bg-[#0B0C0E]">
        <AnimatePresence mode="wait" initial={false}>
          <motion.figure
            key={`${variant.color}-${variant.size}`}
            initial={animation.initial}
            animate={{ ...animation.animate, transition }}
            exit={{ ...animation.exit, transition }}
            className="flex items-center justify-center p-8"
          >
            <Image
              src={variant.imageSrc}
              alt={variant.alt}
              width={640}
              height={720}
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              onError={onImageError}
              onLoadingComplete={onImageLoad}
              className="h-auto w-full max-w-lg object-contain"
            />
          </motion.figure>
        </AnimatePresence>
      </div>
      <div className="mt-6 flex items-center justify-between text-xs uppercase tracking-[0.3em] text-subtext/70">
        <span>{variant.size} fit preview</span>
        <span>
          {capitalize(variant.color)} · {formatNeck(variant.neck ?? "o-neck")}
        </span>
      </div>
    </div>
  );
}

function capitalize(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}


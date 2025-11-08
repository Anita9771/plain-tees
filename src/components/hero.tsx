"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const spring = { type: "spring", stiffness: 120, damping: 18 } as const;

export default function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-outline/60 bg-gradient-to-b from-bg to-surface">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_20%,rgba(16,185,129,0.25),transparent_45%),radial-gradient(circle_at_80%_15%,rgba(255,209,102,0.2),transparent_40%)]" />
      <div className="container mx-auto grid min-h-[90vh] items-center gap-12 px-4 py-20 md:grid-cols-[1.1fr_0.9fr]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0, transition: spring }}
          className="space-y-8"
        >
          <p className="inline-flex items-center gap-2 rounded-full border border-outline/50 bg-[#111214]/80 px-3 py-1 text-xs uppercase tracking-[0.3em] text-subtext">
            Plain Tees 
          </p>
          <h1 className="max-w-xl text-balance text-4xl font-semibold tracking-tight md:text-5xl lg:text-6xl">
            Effortless essentials engineered for everyday movement.
          </h1>
          <p className="max-w-lg text-lg text-subtext">
            Premium combed cotton, tailored fit, and a palette built for modern wardrobes. Customize your tee and order instantly via WhatsApp.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="#shop"
              className="rounded-full bg-cta px-8 py-3 text-sm font-semibold text-[#1F1F1F] shadow-cta transition hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cta"
            >
              Shop now
            </Link>
            <motion.span
              className="text-sm text-subtext"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.4, ...spring } }}
            >
              Free Abuja delivery on orders above ₦50,000
            </motion.span>
          </div>
        </motion.div>
        <motion.div
          className="relative flex justify-center"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1, transition: { delay: 0.2, ...spring } }}
        >
          <motion.div
            animate={{ y: [0, -12, 0], scale: [1, 1.01, 1] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="relative isolate flex items-center justify-center"
          >
            <Image
              src="/models/plaintee.png"
              alt="Minimalist tee silhouette"
              width={640}
              height={640}
              priority
              className="max-w-full drop-shadow-[0_40px_120px_rgba(16,185,129,0.18)]"
            />
            {/* <div className="absolute inset-x-16 bottom-12 hidden rounded-3xl border border-outline/60 bg-black/40 p-4 text-center text-xs uppercase tracking-[0.4em] text-subtext/80 backdrop-blur md:block">
              tuned for movement
            </div> */}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}


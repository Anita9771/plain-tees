"use client";

import { motion } from "framer-motion";

const badges = [
  {
    title: "100% Combed Cotton",
    description: "Long-staple fibres for lasting softness.",
  },
  {
    title: "Anti-fade Dye",
    description: "Color locked through 30+ wash cycles.",
  },
  {
    title: "Tailored Everyday Fit",
    description: "Ergonomic drape with minimal seams.",
  },
  {
    title: "Eco-friendly Fabric",
    description: "Certified low-impact dye process.",
  },
];

const spring = { type: "spring", stiffness: 120, damping: 18 } as const;

export default function QualityBadges() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {badges.map((badge, index) => (
        <motion.article
          key={badge.title}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0, transition: { delay: index * 0.1, ...spring } }}
          viewport={{ once: true, amount: 0.3 }}
          className="group relative overflow-hidden rounded-3xl border border-outline/60 bg-surface/60 p-6 backdrop-blur transition hover:-translate-y-1"
        >
          <div className="pointer-events-none absolute inset-0 opacity-0 transition group-hover:opacity-100">
            <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent" />
          </div>
          <h3 className="text-lg font-semibold text-text/90">{badge.title}</h3>
          <p className="mt-2 text-sm text-subtext">{badge.description}</p>
        </motion.article>
      ))}
    </div>
  );
}


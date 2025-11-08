import type { Config } from "tailwindcss";

export default {
    content: [
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/lib/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                bg: "#0E0E0E",
                surface: "#111214",
                text: "#E6E7EB",
                subtext: "#A9AFB8",
                accent: "#10B981",
                cta: "#FFD166",
                outline: "#1F2937",
            },
            fontFamily: {
                sans: ["Inter", "Poppins", "sans-serif"],
            },
            letterSpacing: {
                tightish: "-0.01em",
            },
            boxShadow: {
                glow: "0 0 30px rgba(16, 185, 129, 0.35)",
                cta: "0 8px 30px rgba(255, 209, 102, 0.4)",
            },
            transitionTimingFunction: {
                spring: "cubic-bezier(0.18, 0.89, 0.32, 1.28)",
            },
            keyframes: {
                float: {
                    "0%, 100%": { transform: "translateY(0)" },
                    "50%": { transform: "translateY(-4px)" },
                },
            },
            animation: {
                float: "float 6s ease-in-out infinite",
            },
        },
    },
    plugins: [],
} satisfies Config;


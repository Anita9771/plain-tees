import type { TeeColor, TeeNeck, TeeSize } from "./types";

export const AVAILABLE_SIZES: TeeSize[] = ["XS", "S", "M", "L", "XL", "XXL"];
export const AVAILABLE_COLORS: TeeColor[] = [
    "white",
    "black",
    "grey",
    "navy",
    "olive",
  "sand",
  "yellow",
];

export const AVAILABLE_NECKS: TeeNeck[] = ["o-neck", "v-neck"];

export const colors = {
    bg: "#0E0E0E",
    surface: "#111214",
    text: "#E6E7EB",
    subtext: "#A9AFB8",
    accent: "#10B981",
    cta: "#FFD166",
    outline: "#1F2937",
} as const;


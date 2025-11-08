import type { Product } from "../types";

export const product: Product = {
  id: "plain-tee",
  name: "Plain Tees",
  description:
    "Crafted from 100% premium combed cotton for lasting comfort. Breathable, soft-touch texture. Tailored for everyday elegance.",
  basePrice: 7500,
  variants: [
    {
      color: "white",
      size: "M",
      imageSrc: "/renders/white.png",
      neck: "o-neck",
      alt: "Model wearing a white plain tee in size medium with an O-neck",
    },
    {
      color: "black",
      size: "M",
      imageSrc: "/renders/black.png",
      neck: "o-neck",
      alt: "Model wearing a black plain tee in size medium with an O-neck",
    },
    {
      color: "yellow",
      size: "M",
      imageSrc: "/renders/yellow.png",
      neck: "v-neck",
      alt: "Model wearing a yellow plain tee in size medium with a V-neck",
    },
  ],
};


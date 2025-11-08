export type TeeColor = "white" | "black" | "grey" | "navy" | "olive" | "sand" | "yellow";
export type TeeSize = "S" | "M" | "L" | "XL" | "XXL";
export type TeeNeck = "v-neck" | "o-neck";

export interface ProductVariant {
    color: TeeColor;
    size: TeeSize;
    imageSrc: string;
    alt: string;
  neck?: TeeNeck;
}

export interface Product {
    id: string;
    name: string;
    description: string;
    basePrice?: number;
    variants: ProductVariant[];
}


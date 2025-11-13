import type { TeeColor, TeeNeck, TeeSize } from "./types";

interface WhatsAppLinkParams {
    size: TeeSize;
    color: TeeColor;
  neck: TeeNeck;
    qty?: number;
    note?: string;
}

const phone = "2348103509951"; // without leading plus

const capitalize = (value: string) => value.charAt(0).toUpperCase() + value.slice(1);

export function buildWhatsAppLink({
    size,
    color,
  neck,
    qty = 1,
    note = "",
}: WhatsAppLinkParams) {
    const message =
        `Hello 👋 I’d like to order a Plain Tee.` +
        `\nSize: ${size}` +
        `\nColor: ${capitalize(color)}` +
    `\nNeck: ${formatNeck(neck)}` +
        `\nQuantity: ${qty}` +
        (note ? `\nNote: ${note}` : "");

    return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

export function formatPrice(amount?: number) {
    if (!amount && amount !== 0) return "";
    return new Intl.NumberFormat("en-NG", {
        style: "currency",
        currency: "NGN",
        maximumFractionDigits: 0,
    }).format(amount);
}

export function formatNeck(neck: TeeNeck) {
  return neck === "v-neck" ? "V-neck" : "O-neck";
}


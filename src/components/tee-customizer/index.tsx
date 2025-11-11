"use client";

import { useEffect, useMemo, useReducer } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { AVAILABLE_COLORS, AVAILABLE_NECKS, AVAILABLE_SIZES } from "@/lib/constants";
import { buildWhatsAppLink, formatNeck, formatPrice } from "@/lib/whatsapp";
import type { Product, ProductVariant, TeeColor, TeeNeck, TeeSize } from "@/lib/types";

import BuyButton from "./buy-button";
import ColorSwatch from "./color-swatch";
import ModelViewer from "./model-viewer";
import QuantityInput from "./quantity";
import SizeSelector from "./size-selector";
import NeckSelector from "./neck-selector";

type State = {
  size: TeeSize;
  color: TeeColor;
  qty: number;
  note: string;
  imageErrored: boolean;
  neck: TeeNeck;
};

type Action =
  | { type: "SET_SIZE"; payload: TeeSize }
  | { type: "SET_COLOR"; payload: TeeColor }
  | { type: "SET_QTY"; payload: number }
  | { type: "SET_NOTE"; payload: string }
  | { type: "SET_IMAGE_ERROR"; payload: boolean }
  | { type: "SET_NECK"; payload: TeeNeck };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_SIZE":
      return { ...state, size: action.payload };
    case "SET_COLOR":
      return { ...state, color: action.payload, imageErrored: false };
    case "SET_QTY":
      return { ...state, qty: clampQty(action.payload) };
    case "SET_NOTE":
      return { ...state, note: action.payload };
    case "SET_IMAGE_ERROR":
      return { ...state, imageErrored: action.payload };
    case "SET_NECK":
      return { ...state, neck: action.payload };
    default:
      return state;
  }
};

const spring = { type: "spring", stiffness: 120, damping: 18 } as const;

interface TeeCustomizerProps {
  product: Product;
}

export default function TeeCustomizer({ product }: TeeCustomizerProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const initialSizeParam = searchParams?.get("size")?.toUpperCase();
  const initialColorParam = searchParams?.get("color")?.toLowerCase();
  const initialQtyParam = Number.parseInt(searchParams?.get("qty") ?? "", 10);
  const initialNeckParam = searchParams?.get("neck")?.toLowerCase();

  const initialSize =
    (initialSizeParam as TeeSize) ?? product.variants[0]?.size ?? AVAILABLE_SIZES[2];
  const initialColor =
    (initialColorParam as TeeColor) ?? product.variants[0]?.color ?? AVAILABLE_COLORS[0];
  const initialQty = Number.isFinite(initialQtyParam) ? initialQtyParam : 1;
  const initialNeck =
    (initialNeckParam as TeeNeck) ?? product.variants[0]?.neck ?? AVAILABLE_NECKS[0];

  const [state, dispatch] = useReducer(reducer, {
    size: AVAILABLE_SIZES.includes(initialSize) ? initialSize : AVAILABLE_SIZES[0],
    color: AVAILABLE_COLORS.includes(initialColor) ? initialColor : AVAILABLE_COLORS[0],
    qty: clampQty(initialQty),
    note: searchParams?.get("note") ?? "",
    imageErrored: false,
    neck: AVAILABLE_NECKS.includes(initialNeck) ? initialNeck : AVAILABLE_NECKS[0],
  });

  const activeVariant = useMemo(
    () => resolveVariant(product.variants, state.color, state.size, state.neck),
    [product.variants, state.color, state.size, state.neck],
  );

  const encodedLink = useMemo(
    () =>
      buildWhatsAppLink({
        size: state.size,
        color: state.color,
        neck: state.neck,
        qty: state.qty,
        note: state.note,
      }),
    [state.color, state.neck, state.note, state.qty, state.size],
  );

  const searchKey = searchParams?.toString() ?? "";

  useEffect(() => {
    const params = new URLSearchParams(searchKey);
    params.set("size", state.size);
    params.set("color", state.color);
    params.set("qty", state.qty.toString());
    params.set("neck", state.neck);
    if (state.note) {
      params.set("note", state.note);
    } else {
      params.delete("note");
    }
    const nextQuery = params.toString();
    if (nextQuery !== searchKey) {
      const target = nextQuery ? `${pathname}?${nextQuery}` : pathname;
      router.replace(target as Parameters<typeof router.replace>[0], { scroll: false });
    }
  }, [
    pathname,
    router,
    searchKey,
    state.color,
    state.neck,
    state.note,
    state.qty,
    state.size,
  ]);

  return (
    <section className="relative grid gap-12 lg:grid-cols-[1.2fr_0.8fr]">
      <div className="order-2 space-y-8 lg:order-1">
        <header className="space-y-2">
          <p className="text-sm uppercase tracking-[0.3em] text-subtext/70">Customize</p>
          <h2 className="text-3xl font-semibold text-text">{product.name}</h2>
          <p className="max-w-2xl text-subtext">{product.description}</p>
        </header>

        <dl className="grid gap-4 text-sm text-subtext/90">
          {product.basePrice && (
            <div>
              <dt className="uppercase tracking-[0.3em] text-xs text-subtext/60">
                Price
              </dt>
              <dd className="text-lg font-semibold text-text">
                {formatPrice(product.basePrice)}
              </dd>
            </div>
          )}
          <div>
            <dt className="uppercase tracking-[0.3em] text-xs text-subtext/60">
              Selected
            </dt>
            <dd className="text-lg text-text">
              {capitalize(state.color)} / {state.size} / {formatNeck(state.neck)}
            </dd>
          </div>
        </dl>

        <div className="lg:hidden">
          <ModelViewer
            variant={activeVariant}
            onImageError={() => dispatch({ type: "SET_IMAGE_ERROR", payload: true })}
            onImageLoad={() => dispatch({ type: "SET_IMAGE_ERROR", payload: false })}
          />
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-subtext/70">
              Size
            </h3>
            <SizeSelector
              value={state.size}
              onChange={(size) => dispatch({ type: "SET_SIZE", payload: size })}
              sizes={AVAILABLE_SIZES}
            />
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-subtext/70">
              Color
            </h3>
            <ColorSwatch
              value={state.color}
              onChange={(color) => dispatch({ type: "SET_COLOR", payload: color })}
              colors={AVAILABLE_COLORS}
            />
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-subtext/70">
              Neck
            </h3>
            <NeckSelector
              value={state.neck}
              necks={AVAILABLE_NECKS}
              onChange={(neck) => dispatch({ type: "SET_NECK", payload: neck })}
            />
          </div>

          <QuantityInput
            value={state.qty}
            onChange={(qty) => dispatch({ type: "SET_QTY", payload: qty })}
          />

          <label className="block">
            <span className="text-sm font-semibold uppercase tracking-[0.3em] text-subtext/70">
              Optional note
            </span>
            <textarea
              value={state.note}
              onChange={(event) =>
                dispatch({ type: "SET_NOTE", payload: event.target.value })
              }
              placeholder="e.g. Gift wrap, preferred delivery window"
              className="mt-3 w-full rounded-2xl border border-outline/60 bg-surface/80 p-4 text-sm text-text outline-none transition focus:border-accent focus:shadow-glow"
              rows={3}
            />
          </label>
        </div>

        {state.imageErrored && (
          <div className="rounded-2xl border border-red-500/40 bg-red-500/10 p-4 text-sm text-red-300">
            We couldn&apos;t load the preview asset for this combination. Please choose a
            different color or try again later.
          </div>
        )}

        <BuyButton
          spring={spring}
          href={encodedLink}
          disabled={state.imageErrored}
          qty={state.qty}
          selectedColor={state.color}
          selectedSize={state.size}
          selectedNeck={state.neck}
        />
      </div>

      <div className="order-1 hidden lg:block lg:order-2">
        <ModelViewer
          key={`${activeVariant.color}-${activeVariant.size}`}
          variant={activeVariant}
          onImageError={() => dispatch({ type: "SET_IMAGE_ERROR", payload: true })}
          onImageLoad={() => dispatch({ type: "SET_IMAGE_ERROR", payload: false })}
        />
      </div>

      <div className="fixed inset-x-0 bottom-0 z-30 flex items-center justify-between gap-3 border-t border-outline/60 bg-[#111214]/95 px-4 py-4 backdrop-blur lg:hidden">
        <div className="text-xs text-subtext">
          <p className="font-semibold text-text">
            {capitalize(state.color)} / {state.size} / {formatNeck(state.neck)}
          </p>
          <p>Qty {state.qty}</p>
        </div>
        <BuyButton
          spring={spring}
          href={encodedLink}
          disabled={state.imageErrored}
          qty={state.qty}
          selectedColor={state.color}
          selectedSize={state.size}
          selectedNeck={state.neck}
          compact
        />
      </div>
    </section>
  );
}

function resolveVariant(
  variants: ProductVariant[],
  color: TeeColor,
  size: TeeSize,
  neck: TeeNeck,
): ProductVariant {
  const exact = variants.find(
    (variant) =>
      variant.color === color &&
      variant.size === size &&
      (variant.neck === undefined || variant.neck === neck),
  );
  if (exact) return exact;

  const colorMatch = variants.find(
    (variant) =>
      variant.color === color && (variant.neck === undefined || variant.neck === neck),
  );
  if (colorMatch) return { ...colorMatch, size };

  return {
    color,
    size,
    imageSrc: `/renders/${color}.png`,
    alt: `A ${capitalize(color)} plain tee in size ${size} with a ${formatNeck(neck)}`,
    neck,
  } satisfies ProductVariant;
}

function capitalize(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function clampQty(value: number) {
  if (!Number.isFinite(value)) return 1;
  return Math.max(1, value);
}

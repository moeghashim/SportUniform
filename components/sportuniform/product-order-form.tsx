"use client";

import { ArrowUpTrayIcon, ShoppingCartIcon } from "@heroicons/react/24/outline";
import { useCart } from "components/cart/cart-context";
import type { UniformProduct } from "lib/sportuniform-data";
import type { Product, ProductVariant } from "lib/shopify/types";
import { useMemo, useState } from "react";

type ProductOrderFormProps = {
  product: UniformProduct;
  shopifyProduct: Product;
};

type SizeQuantities = Record<string, number>;

function getInitialQuantities(sizes: string[]): SizeQuantities {
  return sizes.reduce<SizeQuantities>((quantities, size, index) => {
    quantities[size] = index === 0 ? 1 : 0;
    return quantities;
  }, {});
}

export function ProductOrderForm({
  product,
  shopifyProduct,
}: ProductOrderFormProps) {
  const { addCartItem } = useCart();
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [quantities, setQuantities] = useState<SizeQuantities>(() =>
    getInitialQuantities(product.sizes),
  );

  const selectedColor = product.colors[selectedColorIndex] || product.colors[0];
  const selectedLines = useMemo(
    () =>
      product.sizes
        .map((size) => ({ size, quantity: quantities[size] || 0 }))
        .filter((line) => line.quantity > 0),
    [product.sizes, quantities],
  );
  const totalQuantity = selectedLines.reduce(
    (sum, line) => sum + line.quantity,
    0,
  );
  const estimatedSubtotal = (totalQuantity * Number(product.price)).toFixed(2);

  const setSizeQuantity = (size: string, quantity: number) => {
    setQuantities((current) => ({
      ...current,
      [size]: Math.max(0, Math.min(999, quantity)),
    }));
  };

  const addSelectedSizesToCart = () => {
    const baseVariant = shopifyProduct.variants[0];
    if (!baseVariant || totalQuantity === 0) return;

    selectedLines.forEach(({ size, quantity }) => {
      const variant: ProductVariant = {
        ...baseVariant,
        id: `${baseVariant.id}/color-${selectedColorIndex + 1}/size-${size}`,
        title: `${size} / Color ${selectedColorIndex + 1}`,
        selectedOptions: [
          { name: "Color", value: `Option ${selectedColorIndex + 1}` },
          { name: "Size", value: size },
        ],
      };

      for (let count = 0; count < quantity; count += 1) {
        addCartItem(variant, shopifyProduct);
      }
    });
  };

  return (
    <div className="min-w-0">
      <div className="mt-5">
        <div className="text-sm font-black">
          Color:{" "}
          <span className="font-bold text-slate-600">
            Option {selectedColorIndex + 1}
          </span>
        </div>
        <div className="mt-2 grid grid-cols-3 gap-2 sm:grid-cols-6">
          {product.colors.map((color, index) => {
            const isSelected = index === selectedColorIndex;

            return (
              <button
                key={color}
                type="button"
                aria-label={`Select color option ${index + 1}`}
                aria-pressed={isSelected}
                className={`flex min-h-14 flex-col items-center justify-center rounded border px-2 py-2 text-[10px] font-black uppercase tracking-wide transition ${
                  isSelected
                    ? "border-[#0d63ff] bg-blue-50 text-[#0d63ff] ring-2 ring-[#0d63ff]/20"
                    : "border-slate-200 text-slate-500 hover:border-slate-300"
                }`}
                onClick={() => setSelectedColorIndex(index)}
              >
                <span
                  className="h-6 w-6 rounded-full border border-slate-300 shadow-sm"
                  style={{ backgroundColor: color }}
                />
                <span className="mt-1">Option {index + 1}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-5">
        <div className="flex items-end justify-between gap-3">
          <div>
            <div className="text-sm font-black">Sizes & Quantities:</div>
            <p className="mt-1 text-xs text-slate-500">
              Add quantities under every size you need.
            </p>
          </div>
          <div className="text-right text-xs text-slate-500">
            <div className="font-black text-slate-950">
              {totalQuantity} total
            </div>
            <div>${estimatedSubtotal}</div>
          </div>
        </div>

        <div className="mt-3 grid gap-3 sm:grid-cols-3">
          {product.sizes.map((size) => {
            const quantity = quantities[size] || 0;
            const hasQuantity = quantity > 0;

            return (
              <div
                key={size}
                className={`rounded-lg border p-3 transition ${
                  hasQuantity
                    ? "border-[#0d63ff] bg-blue-50/60"
                    : "border-slate-200 bg-white"
                }`}
              >
                <div className="text-center text-sm font-black text-slate-950">
                  {size}
                </div>
                <div className="mt-3 flex h-10 items-center overflow-hidden rounded border border-slate-200 bg-white">
                  <button
                    type="button"
                    aria-label={`Decrease ${size} quantity`}
                    className="h-full w-9 bg-slate-50 text-lg font-bold text-slate-700 transition hover:bg-slate-100"
                    onClick={() => setSizeQuantity(size, quantity - 1)}
                  >
                    -
                  </button>
                  <input
                    aria-label={`${size} quantity`}
                    inputMode="numeric"
                    type="number"
                    min={0}
                    value={quantity}
                    className="h-full min-w-0 flex-1 border-x border-slate-200 text-center text-sm font-black outline-none"
                    onChange={(event) => {
                      const nextQuantity = Number(event.target.value);
                      setSizeQuantity(
                        size,
                        Number.isFinite(nextQuantity) ? nextQuantity : 0,
                      );
                    }}
                  />
                  <button
                    type="button"
                    aria-label={`Increase ${size} quantity`}
                    className="h-full w-9 bg-slate-50 text-lg font-bold text-slate-700 transition hover:bg-slate-100"
                    onClick={() => setSizeQuantity(size, quantity + 1)}
                  >
                    +
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <label className="mt-5 block text-sm font-black">
        Upload your image for customization
        <span className="mt-2 flex min-h-16 min-w-0 items-center justify-center gap-3 rounded border border-dashed border-slate-300 bg-slate-50 px-4 text-center text-xs font-bold text-slate-500">
          <ArrowUpTrayIcon className="h-6 w-6 shrink-0 text-[#0d63ff]" />
          <span className="min-w-0">
            Drag & drop your file here, or browse PNG, JPG, PDF, AI, EPS
          </span>
        </span>
      </label>

      <label className="mt-4 block text-sm font-black">
        Add a note for your order
        <textarea
          className="mt-2 min-h-16 w-full resize-none rounded border border-slate-200 px-3 py-2 text-sm font-normal outline-none focus:border-[#0d63ff]"
          placeholder="e.g., Typography style, player names, logo placement, etc."
        />
      </label>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <button className="min-h-13 rounded bg-orange-500 px-5 text-sm font-black text-white shadow-lg shadow-orange-500/20 transition hover:bg-orange-600">
          Start Custom Order
        </button>
        <button
          className="inline-flex min-h-13 items-center justify-center gap-2 rounded border-2 border-[#0d63ff] bg-white px-5 text-sm font-black text-[#0d63ff] transition hover:bg-blue-50 disabled:cursor-not-allowed disabled:border-slate-300 disabled:text-slate-400 disabled:hover:bg-white"
          disabled={totalQuantity === 0}
          onClick={addSelectedSizesToCart}
        >
          <ShoppingCartIcon className="h-5 w-5" />
          Add Selected to Cart
        </button>
      </div>
    </div>
  );
}

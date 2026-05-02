"use client";

import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { useCart } from "components/cart/cart-context";
import type { Product } from "lib/shopify/types";

export function OrderActions({ product }: { product: Product }) {
  const { addCartItem } = useCart();
  const variant = product.variants[0];

  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <button className="min-h-13 rounded bg-orange-500 px-5 text-sm font-black text-white shadow-lg shadow-orange-500/20 transition hover:bg-orange-600">
        Start Custom Order
      </button>
      <button
        className="inline-flex min-h-13 items-center justify-center gap-2 rounded border-2 border-[#0d63ff] bg-white px-5 text-sm font-black text-[#0d63ff] transition hover:bg-blue-50"
        onClick={() => {
          if (variant) {
            addCartItem(variant, product);
          }
        }}
      >
        <ShoppingCartIcon className="h-5 w-5" />
        Add to Cart
      </button>
    </div>
  );
}

import Link from "next/link";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import type { UniformProduct } from "lib/sportuniform-data";
import { JerseyArt } from "./jersey-art";

export function ProductCard({ product }: { product: UniformProduct }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg">
      <Link
        href={`/product/${product.handle}`}
        className="block bg-slate-50 px-4 pt-4"
      >
        <div className="relative rounded-md bg-[radial-gradient(circle_at_50%_15%,#ffffff_0,#eef5ff_44%,#d9e8ff_100%)]">
          {product.badge ? (
            <span className="absolute left-3 top-3 rounded bg-orange-500 px-2 py-1 text-[10px] font-black uppercase tracking-wide text-white">
              {product.badge}
            </span>
          ) : null}
          <JerseyArt
            team={product.team}
            number={product.number}
            colors={product.colors}
            compact
          />
        </div>
      </Link>
      <div className="flex flex-1 flex-col p-4">
        <div className="mb-3 flex items-center gap-1">
          {product.colors.slice(0, 4).map((color) => (
            <span
              key={color}
              className="h-3 w-3 rounded-full border border-slate-300"
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
        <Link
          href={`/product/${product.handle}`}
          className="min-h-10 text-sm font-bold leading-tight text-slate-950 underline-offset-4 group-hover:underline"
        >
          {product.title}
        </Link>
        <div className="mt-3 text-xs text-slate-500">
          As low as{" "}
          <span className="font-black text-red-600">${product.price}</span>
        </div>
        <div className="mt-auto flex gap-2 pt-4">
          <Link
            href={`/product/${product.handle}`}
            className="flex min-h-9 flex-1 items-center justify-center rounded bg-[#09254a] px-3 text-xs font-black uppercase tracking-wide text-white transition hover:bg-[#0d3670]"
          >
            Customize
          </Link>
          <button
            className="flex h-9 w-10 items-center justify-center rounded border border-slate-300 text-[#09254a] transition hover:border-[#0d63ff] hover:text-[#0d63ff]"
            aria-label={`Add ${product.title} to cart`}
          >
            <ShoppingCartIcon className="h-4 w-4" />
          </button>
        </div>
      </div>
    </article>
  );
}

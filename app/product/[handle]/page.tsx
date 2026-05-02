import Footer from "components/layout/footer";
import { JerseyArt } from "components/sportuniform/jersey-art";
import { OrderActions } from "components/sportuniform/order-actions";
import { ProductCard } from "components/sportuniform/product-card";
import {
  getProductByHandle,
  products,
  type UniformProduct,
} from "lib/sportuniform-data";
import type { Product } from "lib/shopify/types";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ComponentType, SVGProps } from "react";
import {
  ArrowUpTrayIcon,
  CheckCircleIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ClockIcon,
  EnvelopeIcon,
  ShieldCheckIcon,
  TruckIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";

export async function generateMetadata(props: {
  params: Promise<{ handle: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const product = getProductByHandle(params.handle);

  if (!product) return notFound();

  return {
    title: product.title,
    description: product.description,
  };
}

function toShopifyProduct(product: UniformProduct): Product {
  const image = {
    url: "/sportuniform/product-design.png",
    altText: product.title,
    width: 1086,
    height: 1448,
  };

  return {
    id: `gid://dummy/${product.handle}`,
    handle: product.handle,
    availableForSale: true,
    title: product.title,
    description: product.description,
    descriptionHtml: `<p>${product.description}</p>`,
    options: [],
    priceRange: {
      maxVariantPrice: { amount: product.price, currencyCode: "USD" },
      minVariantPrice: { amount: product.price, currencyCode: "USD" },
    },
    variants: [
      {
        id: `gid://dummy/${product.handle}/default`,
        title: "Default",
        availableForSale: true,
        selectedOptions: [],
        price: { amount: product.price, currencyCode: "USD" },
      },
    ],
    featuredImage: image,
    images: [image],
    seo: { title: product.title, description: product.description },
    tags: [],
    updatedAt: new Date().toISOString(),
  };
}

const receiveOptions = [
  ["Standard", "May 28 - Jun 3"],
  ["Rush", "May 21 - May 27"],
  ["Super Rush", "May 16 - May 20"],
  ["Extreme Rush", "May 12 - May 15"],
];

const savings = [
  ["Spend $500", "5% OFF"],
  ["Spend $1k", "10% OFF"],
  ["Spend $2k", "15% OFF"],
  ["Spend $5k+", "20% OFF"],
];

type ProductServiceItem = {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  label: string;
  text: string;
};

const productServiceItems: ProductServiceItem[] = [
  { icon: TruckIcon, label: "Free Shipping", text: "No minimum" },
  { icon: EnvelopeIcon, label: "Work Proof", text: "By email" },
  { icon: UsersIcon, label: "Team Expert", text: "Support" },
  { icon: ShieldCheckIcon, label: "Flexible Returns", text: "30-day policy" },
];

export default async function ProductPage(props: {
  params: Promise<{ handle: string }>;
}) {
  const params = await props.params;
  const product = getProductByHandle(params.handle);

  if (!product) return notFound();

  const related = products
    .filter(
      (item) => item.sport === product.sport && item.handle !== product.handle,
    )
    .concat(products.filter((item) => item.sport !== product.sport))
    .slice(0, 4);

  return (
    <>
      <section className="mx-auto max-w-7xl px-4 py-6">
        <nav className="mb-5 flex flex-wrap items-center gap-2 text-xs text-slate-500">
          <Link href="/">Home</Link>
          <span>/</span>
          <Link href={`/search/${product.sport}`}>{product.sport}</Link>
          <span>/</span>
          <span className="text-slate-950">{product.title}</span>
        </nav>

        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="grid gap-3 md:grid-cols-[86px_1fr]">
            <div className="order-2 flex gap-2 overflow-x-auto md:order-1 md:flex-col">
              {product.colors.map((color, index) => (
                <button
                  key={color}
                  className="flex min-h-20 min-w-20 flex-col items-center justify-center rounded-lg border border-slate-200 bg-white p-1 shadow-sm"
                  aria-label={`Select color ${index + 1}`}
                >
                  <span
                    className="mb-1 h-8 w-8 rounded-full border border-slate-300"
                    style={{ backgroundColor: color }}
                  />
                  <span className="text-[10px] font-bold text-slate-500">
                    Option {index + 1}
                  </span>
                </button>
              ))}
            </div>
            <div className="relative order-1 overflow-hidden rounded-lg border border-slate-200 bg-[radial-gradient(circle_at_50%_8%,#fff_0,#eef5ff_45%,#dbeafe_100%)] md:order-2">
              <div className="absolute inset-0 opacity-30">
                <Image
                  src="/sportuniform/product-design.png"
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover object-left-top"
                  priority
                />
              </div>
              <div className="relative flex min-h-[520px] items-center justify-center">
                <JerseyArt
                  team={product.team}
                  number={product.number}
                  colors={product.colors}
                />
              </div>
              <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-4">
                <button className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow">
                  <ChevronLeftIcon className="h-5 w-5" />
                </button>
                <div className="flex gap-2">
                  {[0, 1, 2, 3].map((item) => (
                    <span
                      key={item}
                      className={`h-2 w-2 rounded-full ${item === 0 ? "bg-[#0d63ff]" : "bg-slate-300"}`}
                    />
                  ))}
                </div>
                <button className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow">
                  <ChevronRightIcon className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-start justify-between gap-5">
              <div>
                <h1 className="text-4xl font-black leading-none text-slate-950 md:text-5xl">
                  {product.title}
                </h1>
                <p className="mt-3 text-sm text-slate-500">
                  Brand: {product.brand} <span className="mx-2">|</span> SKU:{" "}
                  {product.sku}
                </p>
              </div>
              <div className="hidden rounded-lg border border-slate-200 p-3 text-center text-xs font-black uppercase text-[#09254a] md:block">
                {product.brand}
              </div>
            </div>

            <div className="mt-4 text-3xl font-black text-[#0d63ff]">
              ${product.price}
            </div>
            <div className="mt-2 flex items-center gap-2 text-sm">
              <span className="text-orange-500">★★★★★</span>
              <span className="font-bold">{product.rating}</span>
              <span className="text-slate-500">
                ({product.reviews} reviews)
              </span>
            </div>

            <div className="mt-6 rounded-lg border border-slate-200 bg-white p-4">
              <h2 className="mb-3 text-sm font-black text-slate-950">
                Order today to receive by:
              </h2>
              <div className="grid gap-2 sm:grid-cols-4">
                {receiveOptions.map(([label, date], index) => (
                  <button
                    key={label}
                    className={`rounded border p-3 text-center text-xs ${index === 0 ? "border-[#0d63ff] bg-blue-50" : "border-slate-200"}`}
                  >
                    <div className="font-black">{label}</div>
                    <div className="mt-1 text-slate-500">{date}</div>
                  </button>
                ))}
              </div>

              <h2 className="mb-3 mt-5 text-sm font-black text-slate-950">
                Order More. Save More.
              </h2>
              <div className="grid gap-2 sm:grid-cols-4">
                {savings.map(([label, discount], index) => (
                  <button
                    key={label}
                    className={`relative rounded border p-3 text-center text-xs ${index === 2 ? "border-orange-500 bg-orange-50" : "border-slate-200"}`}
                  >
                    {index === 2 ? (
                      <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded bg-orange-500 px-2 py-0.5 text-[10px] font-black text-white">
                        Best Value
                      </span>
                    ) : null}
                    <div className="font-black">{label}</div>
                    <div className="mt-1 text-lg font-black text-[#09254a]">
                      {discount}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-5">
              <div className="text-sm font-black">
                Color:{" "}
                <span className="font-bold text-slate-600">Black/Gold</span>
              </div>
              <div className="mt-2 flex flex-wrap gap-3">
                {product.colors.map((color, index) => (
                  <button
                    key={color}
                    aria-label={`Color ${index + 1}`}
                    className={`h-8 w-8 rounded-full border-2 ${index === 0 ? "border-[#0d63ff] ring-2 ring-[#0d63ff]/25" : "border-slate-300"}`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>

            <div className="mt-5">
              <div className="text-sm font-black">Size:</div>
              <div className="mt-2 flex gap-2">
                {product.sizes.map((size, index) => (
                  <button
                    key={size}
                    className={`h-8 min-w-10 rounded border px-3 text-sm font-bold ${index === 0 ? "border-[#0d63ff] bg-blue-50 text-[#0d63ff]" : "border-slate-200 text-slate-700"}`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <label className="mt-5 block text-sm font-black">
              Upload your image for customization
              <span className="mt-2 flex min-h-16 items-center justify-center gap-3 rounded border border-dashed border-slate-300 bg-slate-50 px-4 text-center text-xs font-bold text-slate-500">
                <ArrowUpTrayIcon className="h-6 w-6 text-[#0d63ff]" />
                Drag & drop your file here, or browse PNG, JPG, PDF, AI, EPS
              </span>
            </label>

            <label className="mt-4 block text-sm font-black">
              Add a note for your order
              <textarea
                className="mt-2 min-h-16 w-full resize-none rounded border border-slate-200 px-3 py-2 text-sm font-normal outline-none focus:border-[#0d63ff]"
                placeholder="e.g., Typography style, player names, logo placement, etc."
              />
            </label>

            <div className="mt-5 flex items-center gap-4">
              <span className="text-sm font-black">Quantity:</span>
              <div className="flex h-10 items-center overflow-hidden rounded border border-slate-200">
                <button className="h-full w-10 bg-slate-50 text-xl">-</button>
                <span className="flex h-full w-12 items-center justify-center text-sm font-black">
                  1
                </span>
                <button className="h-full w-10 bg-slate-50 text-xl">+</button>
              </div>
            </div>

            <div className="mt-5">
              <OrderActions product={toShopifyProduct(product)} />
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3 text-xs text-slate-600 md:grid-cols-4">
              {productServiceItems.map(({ icon: Icon, label, text }) => (
                <div key={label} className="flex items-center gap-2">
                  <Icon className="h-6 w-6 text-[#0d63ff]" />
                  <div>
                    <div className="font-black text-slate-950">{label}</div>
                    <div>{text}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-6">
        <div className="grid gap-3 rounded-lg border border-slate-200 bg-white p-4 md:grid-cols-[1fr_1fr_1fr_1fr]">
          <div>
            <p className="text-sm font-black uppercase text-[#0d63ff]">
              Customize in 3 Easy Steps
            </p>
          </div>
          {["Choose Style", "Upload Artwork", "Approve Proof"].map(
            (step, index) => (
              <div
                key={step}
                className="flex items-center gap-3 border-t border-slate-100 pt-3 md:border-l md:border-t-0 md:pl-4 md:pt-0"
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#0d63ff] text-xs font-black text-white">
                  {index + 1}
                </span>
                <div>
                  <h3 className="text-sm font-black">{step}</h3>
                  <p className="text-xs text-slate-500">
                    Review options and team details.
                  </p>
                </div>
              </div>
            ),
          )}
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-4 pb-8 lg:grid-cols-[1.6fr_1fr]">
        <div className="rounded-lg border border-slate-200 bg-white">
          <div className="flex border-b border-slate-200 text-sm font-black">
            {[
              "Overview",
              "Features",
              "Sizing",
              `Reviews (${product.reviews})`,
            ].map((tab, index) => (
              <button
                key={tab}
                className={`px-5 py-3 ${index === 0 ? "border-b-2 border-[#0d63ff] text-[#0d63ff]" : "text-slate-500"}`}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="grid gap-6 p-5 md:grid-cols-2">
            <p className="text-sm leading-7 text-slate-600">
              {product.description}
            </p>
            <ul className="space-y-2 text-sm text-slate-600">
              {[
                "Moisture-wicking fabric",
                "Ladies fit",
                "Extra length to stay tucked",
                "Ideal for screen printing",
                "Budget-friendly team option",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <CheckCircleIcon className="h-4 w-4 text-[#0d63ff]" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white p-5">
          <h2 className="mb-4 font-black">Why Teams Choose This Jersey</h2>
          {[
            ["Performance That Lasts", "Built to handle every inning."],
            ["Vibrant Colors", "True hue technology prevents color bleed."],
            ["Great Value", "Premium quality at team-friendly prices."],
          ].map(([label, text]) => (
            <div key={label} className="border-t border-slate-100 py-3">
              <div className="font-black text-slate-950">{label}</div>
              <div className="text-sm text-slate-500">{text}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-10">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-black">
            Related {product.sport} Jerseys
          </h2>
          <ClockIcon className="h-5 w-5 text-[#0d63ff]" />
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {related.map((item) => (
            <ProductCard key={item.handle} product={item} />
          ))}
        </div>
      </section>

      <Footer />
    </>
  );
}

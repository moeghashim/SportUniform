import Footer from "components/layout/footer";
import { ProductCard } from "components/sportuniform/product-card";
import { getProductsBySport, products, sports } from "lib/sportuniform-data";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  CheckCircleIcon,
  ChevronDownIcon,
  PencilSquareIcon,
  ShieldCheckIcon,
  TruckIcon,
  UserIcon,
} from "@heroicons/react/24/outline";

export async function generateMetadata(props: {
  params: Promise<{ collection: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const sport = sports.find((item) => item.slug === params.collection);

  return {
    title: sport ? `Custom ${sport.name} Uniforms` : "Custom Team Uniforms",
    description: sport
      ? `Shop custom ${sport.name.toLowerCase()} uniforms and jerseys.`
      : "Shop custom team uniforms and jerseys.",
  };
}

const filters = [
  {
    title: "Category",
    items: [
      ["Jerseys", "42"],
      ["Pants", "18"],
      ["Full Sets", "24"],
      ["Hats", "16"],
      ["Outerwear", "12"],
      ["Socks", "8"],
      ["Accessories", "20"],
    ],
  },
  { title: "Brand", items: [] },
  { title: "Price", items: [] },
  { title: "Size", items: [] },
  { title: "Colors", items: [] },
];

const serviceItems = [
  {
    icon: PencilSquareIcon,
    title: "Design Your Own",
    text: "Use our design notes to create your perfect look.",
  },
  {
    icon: UserIcon,
    title: "No Minimums",
    text: "Order as few or as many as your team needs.",
  },
  {
    icon: TruckIcon,
    title: "Fast & Reliable",
    text: "Quick production and on-time delivery.",
  },
  {
    icon: ShieldCheckIcon,
    title: "Quality Guaranteed",
    text: "Premium materials and expert craftsmanship.",
  },
];

export default async function CategoryPage(props: {
  params: Promise<{ collection: string }>;
}) {
  const params = await props.params;
  const sport = sports.find((item) => item.slug === params.collection);
  const title = sport
    ? `Custom ${sport.name} Uniforms`
    : "Custom Team Uniforms";
  const collectionProducts =
    getProductsBySport(params.collection).length > 0
      ? getProductsBySport(params.collection)
      : products;

  return (
    <>
      <section className="relative overflow-hidden bg-[#061d38] text-white">
        <Image
          src="/sportuniform/category-design.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-right opacity-45"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#061d38] via-[#061d38]/90 to-[#061d38]/25" />
        <div className="relative mx-auto max-w-7xl px-4 py-16">
          <nav className="mb-8 flex items-center gap-2 text-sm text-blue-100">
            <Link href="/">Home</Link>
            <span>/</span>
            <span>{title}</span>
          </nav>
          <h1 className="max-w-3xl text-4xl font-black uppercase tracking-wide md:text-6xl">
            {title}
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-blue-50">
            Create custom uniforms that represent your team with style,
            performance, colors, logo placement, and player details.
          </p>
          <div className="mt-10 grid max-w-3xl gap-5 md:grid-cols-3">
            {[
              ["Fully Customizable", "Design your unique look"],
              ["Premium Quality", "Built for performance"],
              ["Fast Turnaround", "Get your uniforms on time"],
            ].map(([label, text]) => (
              <div key={label} className="flex items-center gap-3">
                <CheckCircleIcon className="h-8 w-8 flex-none text-white" />
                <div>
                  <div className="text-sm font-black uppercase">{label}</div>
                  <div className="text-sm text-blue-100">{text}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 py-6 lg:grid-cols-[250px_1fr]">
          <aside className="h-max rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
            <div className="mb-4 flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="font-black uppercase text-slate-950">Filter By</h2>
              <button className="text-xs font-bold text-red-500">
                Clear All
              </button>
            </div>
            <div className="space-y-1">
              {filters.map((filter) => (
                <section
                  key={filter.title}
                  className="border-b border-slate-100 py-3 last:border-0"
                >
                  <div className="flex items-center justify-between text-sm font-bold uppercase text-slate-950">
                    {filter.title}
                    <span>{filter.items.length ? "-" : "+"}</span>
                  </div>
                  {filter.items.length ? (
                    <div className="mt-3 space-y-2">
                      {filter.items.map(([label, count], index) => (
                        <label
                          key={label}
                          className="flex items-center justify-between gap-3 text-sm text-slate-600"
                        >
                          <span className="inline-flex items-center gap-2">
                            <input
                              type="checkbox"
                              defaultChecked={index === 0}
                              className="h-4 w-4 rounded border-slate-300 accent-[#09254a]"
                            />
                            {label}
                          </span>
                          <span>{count}</span>
                        </label>
                      ))}
                    </div>
                  ) : null}
                </section>
              ))}
            </div>
          </aside>

          <div>
            <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-3xl font-black uppercase text-[#09254a]">
                  {title}
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Showing 1-{collectionProducts.length} of{" "}
                  {collectionProducts.length} results
                </p>
              </div>
              <button className="inline-flex min-h-11 items-center justify-between gap-4 rounded border border-slate-200 bg-white px-4 text-sm text-slate-600 shadow-sm">
                Sort by: Featured
                <ChevronDownIcon className="h-4 w-4" />
              </button>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
              {collectionProducts.map((product) => (
                <ProductCard key={product.handle} product={product} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-slate-100 bg-white py-7">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 md:grid-cols-4">
          {serviceItems.map((item) => (
            <div key={item.title} className="flex gap-4">
              <item.icon className="h-9 w-9 flex-none text-[#09254a]" />
              <div>
                <h3 className="text-sm font-black uppercase text-[#09254a]">
                  {item.title}
                </h3>
                <p className="mt-1 text-sm leading-6 text-slate-600">
                  {item.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </>
  );
}

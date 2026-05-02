import Footer from "components/layout/footer";
import { ProductCard } from "components/sportuniform/product-card";
import { getFeaturedProducts, sports } from "lib/sportuniform-data";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRightIcon,
  CheckBadgeIcon,
  ClockIcon,
  PencilSquareIcon,
  ShieldCheckIcon,
  TruckIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";

export const metadata = {
  description:
    "Custom sport uniforms, jerseys, caps, and team gear built for baseball, basketball, football, soccer, softball, volleyball, and hockey teams.",
  openGraph: {
    type: "website",
  },
};

const trustItems = [
  { icon: TruckIcon, label: "Free Shipping", text: "No minimum" },
  { icon: ClockIcon, label: "Rush Orders", text: "Available" },
  { icon: ShieldCheckIcon, label: "Satisfaction", text: "Guaranteed" },
  { icon: UserGroupIcon, label: "Team Experts", text: "Here to help" },
];

const whyItems = [
  {
    icon: PencilSquareIcon,
    title: "Custom Options",
    text: "Names, numbers, sponsor patches, colors, and full branding.",
  },
  {
    icon: CheckBadgeIcon,
    title: "Quality Fabrics",
    text: "Moisture-wicking, breathable materials built for team play.",
  },
  {
    icon: TruckIcon,
    title: "Fast Fulfillment",
    text: "Competitive bulk quotes, rush orders, and reliable USA shipping.",
  },
];

export default function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-slate-100 bg-white">
        <div className="absolute inset-y-0 right-0 hidden w-1/2 opacity-35 lg:block">
          <Image
            src="/sportuniform/homepage-design.png"
            alt=""
            fill
            sizes="50vw"
            className="object-cover object-right"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/75 to-white/20" />
        </div>
        <div className="mx-auto grid min-h-[560px] max-w-7xl items-center gap-10 px-4 py-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="relative z-10">
            <p className="mb-5 text-xs font-black uppercase tracking-wide text-[#0d63ff]">
              /// Built for teams. Designed to win.
            </p>
            <h1 className="max-w-xl text-5xl font-black leading-[0.98] tracking-normal text-slate-950 md:text-7xl">
              Custom Sport Uniforms for{" "}
              <span className="text-[#0d63ff]">Every Team</span>
            </h1>
            <p className="mt-6 max-w-lg text-base leading-7 text-slate-600">
              Premium custom jerseys and team uniforms for baseball, basketball,
              football, hockey, soccer, softball, and volleyball.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/search/baseball"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded bg-[#0d63ff] px-6 text-sm font-black text-white shadow-lg shadow-blue-500/20"
              >
                Shop by Sport
                <ArrowRightIcon className="h-4 w-4" />
              </Link>
              <Link
                href="/product/girls-cutter-custom-softball-jersey"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded border border-[#0d63ff] bg-white px-6 text-sm font-black text-[#0d63ff]"
              >
                Start Custom Order
                <ArrowRightIcon className="h-4 w-4" />
              </Link>
            </div>
            <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {trustItems.map((item) => (
                <div key={item.label} className="flex items-center gap-2">
                  <item.icon className="h-6 w-6 text-[#0d63ff]" />
                  <div className="text-xs">
                    <div className="font-black text-slate-950">
                      {item.label}
                    </div>
                    <div className="text-slate-500">{item.text}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative z-10 hidden lg:block" />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8">
        <h2 className="mb-5 text-center text-xl font-black uppercase tracking-wide text-slate-950">
          /// Shop Sports Uniforms by Sport ///
        </h2>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-7">
          {sports.map((sport) => (
            <Link
              key={sport.slug}
              href={`/search/${sport.slug}`}
              className="group overflow-hidden rounded-lg border border-slate-200 bg-white p-3 text-center shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
            >
              <div
                className="mb-3 flex aspect-[1.35] items-center justify-center rounded-md text-lg font-black text-white"
                style={{
                  background: `linear-gradient(135deg, ${sport.color}, #061d38)`,
                }}
              >
                {sport.imageHint}
              </div>
              <div className="text-xs font-black uppercase tracking-wide text-slate-950 group-hover:text-[#0d63ff]">
                {sport.name}
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-8">
        <div className="mb-4 flex items-end justify-between gap-4">
          <h2 className="text-2xl font-black uppercase tracking-wide text-slate-950">
            Best Sellers
          </h2>
          <Link
            href="/search/baseball"
            className="text-sm font-bold text-[#0d63ff]"
          >
            View All Products
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {getFeaturedProducts().map((product) => (
            <ProductCard key={product.handle} product={product} />
          ))}
        </div>
      </section>

      <section className="bg-[#061d38] py-7 text-white">
        <div className="mx-auto grid max-w-7xl gap-4 px-4 lg:grid-cols-[1fr_3fr]">
          <div>
            <p className="text-xs font-black uppercase tracking-wide text-blue-300">
              Customize in
            </p>
            <h2 className="text-4xl font-black uppercase leading-none">
              3 Easy Steps
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {["Choose Sport", "Customize Design", "Submit Team Order"].map(
              (step, index) => (
                <div
                  key={step}
                  className="rounded-lg bg-white p-4 text-slate-950"
                >
                  <div className="mb-3 flex h-7 w-7 items-center justify-center rounded-full bg-[#0d63ff] text-sm font-black text-white">
                    {index + 1}
                  </div>
                  <h3 className="font-black">{step}</h3>
                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    Select your product, add colors and artwork notes, then send
                    your order for review.
                  </p>
                </div>
              ),
            )}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-4 py-8 md:grid-cols-[1fr_3fr_1fr]">
        <div>
          <p className="text-xs font-black uppercase text-[#0d63ff]">
            Trusted by teams nationwide
          </p>
          <div className="mt-2 text-4xl font-black">5.00 ★</div>
          <p className="text-sm text-slate-500">
            Hundreds of coaches and teams count on SportUniform.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {[
            "The uniforms looked incredible and the quality is top notch.",
            "Fast turnaround and amazing customer service.",
            "Great communication and a go-to uniform company.",
          ].map((quote, index) => (
            <blockquote
              key={quote}
              className="rounded-lg border border-slate-200 p-4 text-sm text-slate-600"
            >
              "{quote}"
              <cite className="mt-3 block font-black not-italic text-slate-950">
                Coach {["Mark T.", "Sarah J.", "Mike D."][index]}
              </cite>
            </blockquote>
          ))}
        </div>
        <div className="rounded-lg border border-slate-200 p-5 text-center">
          <UserGroupIcon className="mx-auto h-10 w-10 text-[#0d63ff]" />
          <div className="mt-2 text-3xl font-black text-[#0d63ff]">10,000+</div>
          <p className="text-sm font-bold text-slate-600">Teams Equipped</p>
        </div>
      </section>

      <section className="border-t border-slate-100 bg-slate-50 py-8">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 md:grid-cols-3">
          {whyItems.map((item) => (
            <div key={item.title} className="flex gap-4">
              <item.icon className="h-10 w-10 flex-none text-[#0d63ff]" />
              <div>
                <h3 className="font-black uppercase text-slate-950">
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

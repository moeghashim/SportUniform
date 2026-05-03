import CartModal from "components/cart/modal";
import { sports } from "lib/sportuniform-data";
import Image from "next/image";
import Link from "next/link";
import {
  Bars3Icon,
  HeartIcon,
  MagnifyingGlassIcon,
  PhoneIcon,
  UserIcon,
} from "@heroicons/react/24/outline";

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white shadow-sm">
      <div className="bg-[#051f3d] text-xs font-bold text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-2">
          <div className="hidden items-center gap-5 md:flex">
            <span className="inline-flex items-center gap-1.5">
              <PhoneIcon className="h-3.5 w-3.5" />
              1-844-991-1845
            </span>
            <Link href="/help">Help Center</Link>
            <Link href="/upload-logo">Upload Logo</Link>
          </div>
          <div className="mx-auto uppercase tracking-wide md:mx-0">
            Free Shipping on Orders Over $99
          </div>
          <div className="hidden items-center gap-4 md:flex">
            <Link href="/account">Sign In / Sign Up</Link>
            <HeartIcon className="h-5 w-5" />
          </div>
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl grid-cols-[auto_1fr_auto] items-center gap-2 px-4 py-4 sm:gap-4">
        <button
          aria-label="Open navigation"
          className="flex h-10 w-10 items-center justify-center rounded border border-slate-200 text-slate-950 lg:hidden"
        >
          <Bars3Icon className="h-5 w-5" />
        </button>
        <Link href="/" className="relative h-11 w-32 sm:w-40 md:w-48">
          <Image
            src="/sportuniform/logo.svg"
            alt="SportUniform"
            fill
            sizes="192px"
            className="object-contain object-left"
            priority
          />
        </Link>
        <form action="/search" className="relative hidden lg:block">
          <input
            name="q"
            className="h-12 w-full rounded-full border border-slate-200 bg-white px-6 pr-12 text-sm text-slate-950 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-[#0d63ff] focus:ring-2 focus:ring-[#0d63ff]/20"
            placeholder="Search for products, brands or categories"
          />
          <button
            aria-label="Search"
            className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full text-slate-500"
          >
            <MagnifyingGlassIcon className="h-5 w-5" />
          </button>
        </form>
        <div className="flex items-center justify-end gap-2">
          <Link
            href="/search/baseball"
            className="hidden min-h-10 items-center justify-center rounded bg-[#08264c] px-5 text-xs font-black uppercase tracking-wide text-white shadow-sm md:flex"
          >
            Team Uniforms
          </Link>
          <Link
            href="/quote"
            className="hidden min-h-10 items-center justify-center rounded border border-red-500 px-5 text-xs font-black uppercase tracking-wide text-red-600 md:flex"
          >
            Quick Order
          </Link>
          <Link
            aria-label="Account"
            href="/account"
            className="hidden h-10 w-10 items-center justify-center rounded-full text-slate-950 sm:flex"
          >
            <UserIcon className="h-5 w-5" />
          </Link>
          <CartModal />
        </div>
      </div>

      <nav className="hidden border-t border-slate-100 lg:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4">
          {sports.map((sport) => (
            <Link
              key={sport.slug}
              href={`/search/${sport.slug}`}
              className="px-3 py-3 text-xs font-black uppercase tracking-wide text-slate-950 underline-offset-8 transition hover:text-[#0d63ff] hover:underline"
            >
              {sport.name}
            </Link>
          ))}
          <Link
            href="/search/accessories"
            className="px-3 py-3 text-xs font-black uppercase tracking-wide text-slate-950 underline-offset-8 transition hover:text-[#0d63ff] hover:underline"
          >
            Accessories
          </Link>
          <Link
            href="/sale"
            className="px-3 py-3 text-xs font-black uppercase tracking-wide text-red-600"
          >
            Sale
          </Link>
        </div>
      </nav>
    </header>
  );
}

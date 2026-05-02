import Image from "next/image";
import Link from "next/link";
import { EnvelopeIcon, PhoneIcon } from "@heroicons/react/24/outline";

const columns = [
  {
    title: "Artwork Resources",
    links: [
      "Design Templates",
      "Logo Guidelines",
      "Font Styles",
      "Color Charts",
    ],
  },
  {
    title: "Help & More",
    links: ["How It Works", "Size Charts", "FAQs", "Returns & Exchanges"],
  },
  {
    title: "Company",
    links: ["About Us", "Contact Us", "Blog", "Careers"],
  },
];

export default function Footer() {
  return (
    <footer className="bg-[#061d38] text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-10 md:grid-cols-[1.4fr_1fr_1fr_1fr_1.3fr]">
        <div>
          <Link href="/" className="relative mb-4 block h-12 w-48">
            <Image
              src="/sportuniform/logo.svg"
              alt="SportUniform"
              fill
              sizes="192px"
              className="object-contain object-left"
            />
          </Link>
          <p className="max-w-xs text-sm leading-6 text-blue-100">
            Custom team uniforms for every sport. Built for performance.
            Designed for your team.
          </p>
          <p className="mt-6 text-xs text-blue-200">© 2026 SportUniform.com</p>
        </div>
        {columns.map((column) => (
          <div key={column.title}>
            <h3 className="mb-3 text-xs font-black uppercase tracking-wide">
              {column.title}
            </h3>
            <ul className="space-y-2 text-sm text-blue-100">
              {column.links.map((link) => (
                <li key={link}>
                  <Link href="#" className="transition hover:text-white">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div>
          <h3 className="mb-3 text-xs font-black uppercase tracking-wide">
            Customer Service
          </h3>
          <div className="space-y-3 text-sm text-blue-100">
            <p className="flex items-center gap-2">
              <PhoneIcon className="h-4 w-4" />
              866-789-9911
            </p>
            <p className="flex items-center gap-2">
              <EnvelopeIcon className="h-4 w-4" />
              sales@sportuniform.com
            </p>
            <p>Mon - Fri: 8am - 6pm EST</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

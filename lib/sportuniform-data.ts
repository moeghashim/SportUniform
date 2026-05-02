export type Sport = {
  name: string;
  slug: string;
  color: string;
  image: string;
};

export type UniformProduct = {
  handle: string;
  title: string;
  brand: string;
  sku: string;
  sport: string;
  team: string;
  number: string;
  price: string;
  rating: string;
  reviews: number;
  colors: string[];
  sizes: string[];
  badge?: string;
  description: string;
};

export const sports: Sport[] = [
  {
    name: "Baseball",
    slug: "baseball",
    color: "#1f68d7",
    image: "/sportuniform/baseball.png",
  },
  {
    name: "Basketball",
    slug: "basketball",
    color: "#f97316",
    image: "/sportuniform/basketball.png",
  },
  {
    name: "Football",
    slug: "football",
    color: "#0f2d5a",
    image: "/sportuniform/football.png",
  },
  {
    name: "Hockey",
    slug: "hockey",
    color: "#008fb3",
    image: "/sportuniform/hockey.png",
  },
  {
    name: "Soccer",
    slug: "soccer",
    color: "#16a34a",
    image: "/sportuniform/soccer.png",
  },
  {
    name: "Softball",
    slug: "softball",
    color: "#ef4444",
    image: "/sportuniform/softball.png",
  },
  {
    name: "Volleyball",
    slug: "volleyball",
    color: "#7c3aed",
    image: "/sportuniform/volleyball.png",
  },
];

export const products: UniformProduct[] = [
  {
    handle: "mens-elusive-custom-football-jersey",
    title: "Men's Elusive Custom Football Jersey",
    brand: "Badger",
    sku: "FB24WLV",
    sport: "football",
    team: "WOLVES",
    number: "23",
    price: "57.82",
    rating: "5.0",
    reviews: 20,
    colors: ["#05264f", "#0b61d8", "#ffffff", "#111827"],
    sizes: ["S", "M", "L", "XL", "2XL"],
    badge: "Best Seller",
    description:
      "A durable custom football jersey with breathable performance fabric, stitched-look graphics, and room for player names, numbers, and team branding.",
  },
  {
    handle: "perforated-f3-performance-flexfit-flat-custom-cap",
    title: "Perforated F3 Performance FlexFit Flat Custom Cap",
    brand: "Richardson",
    sku: "CAP-F3",
    sport: "baseball",
    team: "SU",
    number: "5",
    price: "30.27",
    rating: "4.9",
    reviews: 18,
    colors: ["#111827", "#1d4ed8", "#dc2626", "#e5e7eb"],
    sizes: ["S/M", "L/XL"],
    description:
      "A structured team cap with lightweight perforated panels, a flat bill, and front logo customization for travel teams and clubs.",
  },
  {
    handle: "girls-cutter-custom-softball-jersey",
    title: "Girls Cutter Custom Softball Jersey",
    brand: "Augusta",
    sku: "U1523WD",
    sport: "softball",
    team: "TIGERS",
    number: "23",
    price: "34.79",
    rating: "4.9",
    reviews: 128,
    colors: [
      "#111827",
      "#f59e0b",
      "#f97316",
      "#dc2626",
      "#0f2d5a",
      "#1d4ed8",
      "#6d28d9",
    ],
    sizes: ["S", "M", "L"],
    badge: "Team Favorite",
    description:
      "This lightweight cutter jersey is built for softball teams that need bold colors, fast production, and easy name and number personalization.",
  },
  {
    handle: "mens-octane-custom-soccer-jersey",
    title: "Men's Octane Custom Soccer Jersey",
    brand: "Holloway",
    sku: "SOC10",
    sport: "soccer",
    team: "LIONS",
    number: "10",
    price: "33.36",
    rating: "4.8",
    reviews: 16,
    colors: ["#0057d8", "#111827", "#ffffff", "#16a34a"],
    sizes: ["S", "M", "L", "XL"],
    description:
      "A moisture-wicking soccer kit with a streamlined fit, vibrant sublimated panels, and options for front crest and back numbers.",
  },
  {
    handle: "augusta-cutter-baseball-jersey-2287",
    title: "Augusta Cutter Baseball Jersey 2287",
    brand: "Augusta",
    sku: "BB2287",
    sport: "baseball",
    team: "EAGLES",
    number: "25",
    price: "22.99",
    rating: "4.8",
    reviews: 42,
    colors: ["#071f3f", "#dc2626", "#ffffff", "#111827"],
    sizes: ["S", "M", "L", "XL", "2XL"],
    description:
      "A classic baseball jersey with contrast sleeve bands and a clean front panel for team marks, numbers, and custom lettering.",
  },
  {
    handle: "alleson-pinstripe-baseball-jersey-530j",
    title: "Alleson Pinstripe Baseball Jersey 530J",
    brand: "Alleson",
    sku: "BB530J",
    sport: "baseball",
    team: "TIGERS",
    number: "24",
    price: "24.99",
    rating: "4.7",
    reviews: 31,
    colors: ["#e5e7eb", "#b45309", "#111827"],
    sizes: ["S", "M", "L", "XL"],
    description:
      "A pinstripe baseball jersey made for traditional team looks, with bold lettering and clean number placement.",
  },
  {
    handle: "holloway-full-button-baseball-jersey-22550",
    title: "Holloway Full Button Baseball Jersey 22550",
    brand: "Holloway",
    sku: "BB22550",
    sport: "baseball",
    team: "WARRIORS",
    number: "23",
    price: "26.99",
    rating: "4.9",
    reviews: 54,
    colors: ["#071f3f", "#dc2626", "#9ca3af"],
    sizes: ["S", "M", "L", "XL", "2XL"],
    description:
      "A full-button baseball uniform top with strong contrast piping and a team-ready layout for names and numbers.",
  },
  {
    handle: "badger-c2-2-button-baseball-jersey-2184",
    title: "Badger C2 2-Button Baseball Jersey 2184",
    brand: "Badger",
    sku: "BB2184",
    sport: "baseball",
    team: "FALCONS",
    number: "15",
    price: "21.99",
    rating: "4.6",
    reviews: 22,
    colors: ["#1d4ed8", "#0f172a", "#ffffff"],
    sizes: ["S", "M", "L", "XL"],
    description:
      "A two-button baseball jersey with performance fabric, contrast sleeves, and easy team color matching.",
  },
];

export function getProductsBySport(sport: string) {
  return products.filter((product) => product.sport === sport);
}

export function getProductByHandle(handle: string) {
  return products.find((product) => product.handle === handle);
}

export function getFeaturedProducts() {
  return products.slice(0, 4);
}

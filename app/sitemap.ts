import { products, sports } from "lib/sportuniform-data";
import { baseUrl } from "lib/utils";
import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString();
  const staticPages = [
    "",
    "/help",
    "/upload-logo",
    "/quote",
    "/account",
    "/sale",
  ];
  const collectionPages = sports.map((sport) => `/search/${sport.slug}`);
  const productPages = products.map((product) => `/product/${product.handle}`);

  return [...staticPages, ...collectionPages, ...productPages].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: now,
  }));
}

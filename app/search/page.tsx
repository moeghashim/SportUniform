import CategoryPage from "./[collection]/page";

export const metadata = {
  title: "Search",
  description: "Browse custom team uniforms by sport.",
};

export default async function SearchPage() {
  return CategoryPage({ params: Promise.resolve({ collection: "baseball" }) });
}

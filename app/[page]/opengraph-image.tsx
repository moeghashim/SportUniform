import OpengraphImage from "components/opengraph-image";

export default async function Image({ params }: { params: { page: string } }) {
  const title = params.page
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return OpengraphImage({ title });
}

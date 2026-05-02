import type { Metadata } from "next";

const pageContent: Record<
  string,
  { title: string; description: string; body: string[] }
> = {
  help: {
    title: "Help Center",
    description:
      "Get help with custom uniforms, ordering, sizing, and artwork.",
    body: [
      "Find answers for sizing, artwork requirements, turnaround windows, and team order support.",
      "This static page is a placeholder while Shopify CMS content is intentionally disabled.",
    ],
  },
  "upload-logo": {
    title: "Upload Logo",
    description: "Send team artwork for custom uniform orders.",
    body: [
      "Artwork upload is represented in the product order UI for now.",
      "The production version can connect this flow to Vercel Blob, S3, or a Shopify-compatible upload app.",
    ],
  },
  quote: {
    title: "Quick Order",
    description: "Request a fast quote for custom team uniforms.",
    body: [
      "Use this placeholder for the future team quote workflow.",
      "The storefront currently uses dummy catalog data and does not submit quote requests.",
    ],
  },
  account: {
    title: "Account",
    description: "Sign in or create an account.",
    body: [
      "Account integration is not connected in this design phase.",
      "This route exists so the navigation can be reviewed without Shopify or customer account setup.",
    ],
  },
  sale: {
    title: "Sale",
    description: "Browse sale uniforms and team gear.",
    body: [
      "Sale merchandising can be wired to Shopify collections later.",
      "For now, browse the baseball category and product detail pages to review the static storefront.",
    ],
  },
};

function normalizeTitle(page: string) {
  return page
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export async function generateMetadata(props: {
  params: Promise<{ page: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const content = pageContent[params.page];

  return {
    title: content?.title || normalizeTitle(params.page),
    description:
      content?.description || "SportUniform static storefront placeholder.",
  };
}

export default async function Page(props: {
  params: Promise<{ page: string }>;
}) {
  const params = await props.params;
  const content = pageContent[params.page] || {
    title: normalizeTitle(params.page),
    body: ["This placeholder route is available for future content."],
  };

  return (
    <section className="rounded-lg border border-slate-200 bg-white p-8 shadow-sm">
      <p className="mb-3 text-xs font-black uppercase tracking-wide text-[#0d63ff]">
        SportUniform
      </p>
      <h1 className="text-4xl font-black text-slate-950">{content.title}</h1>
      <div className="mt-6 space-y-4 text-base leading-7 text-slate-600">
        {content.body.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    </section>
  );
}

import type { APIRoute } from "astro";
import { getEntry } from "astro:content";
import { isProductSlug } from "@roey/landing-page";

export const GET: APIRoute = async ({ params }) => {
  if (!params.app || !isProductSlug(params.app)) {
    return new Response("Not found", { status: 404 });
  }

  const product = await getEntry("productOverview", params.app);

  if (!product) {
    return new Response("Not found", { status: 404 });
  }

  return new Response(null, {
    status: 308,
    headers: {
      Location: product.data.siteUrl,
    },
  });
};

import type { APIRoute } from "astro";
import { getProduct } from "@roey/product-catalog";

export const GET: APIRoute = async ({ params }) => {
  if (params.app !== "finbar" && params.app !== "syphon") {
    return new Response("Not found", { status: 404 });
  }

  const path = params.rest ? `/${params.rest}` : "";

  return new Response(null, {
    status: 308,
    headers: {
      Location: `${getProduct(params.app).siteUrl}${path}`,
    },
  });
};

import type { APIRoute } from "astro";
import { product } from "../product";
import { getLatestDMG } from "../utils/s3";

export const GET: APIRoute = async () => {
  try {
    return await getLatestDMG(product.slug, product.downloadName);
  } catch {
    return new Response("Not found", { status: 404 });
  }
};

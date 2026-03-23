import type { APIRoute } from "astro";
import { product } from "../product";
import { getBinaryFile } from "../utils/s3";

export const GET: APIRoute = async ({ params }) => {
  try {
    if (!params.delta) {
      throw new Error("Delta filename is required");
    }

    return await getBinaryFile(product.slug, `${params.delta}.delta`);
  } catch {
    return new Response("Not found", { status: 404 });
  }
};

import type { APIRoute } from "astro";
import { getProductOverviewEntry } from "../utils/product";
import { getBinaryFile } from "../utils/s3";

export const GET: APIRoute = async ({ params }) => {
  try {
    if (!params.delta) {
      throw new Error("Delta filename is required");
    }

    const productEntry = await getProductOverviewEntry();

    return await getBinaryFile(productEntry.id, `${params.delta}.delta`);
  } catch {
    return new Response("Not found", { status: 404 });
  }
};

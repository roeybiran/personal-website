import type { APIRoute } from "astro";
import { getProductOverviewEntry } from "../utils/product";
import { getLatestDMG } from "../utils/s3";

export const GET: APIRoute = async () => {
  try {
    const productEntry = await getProductOverviewEntry();

    return await getLatestDMG(productEntry.id, productEntry.data.downloadName);
  } catch {
    return new Response("Not found", { status: 404 });
  }
};

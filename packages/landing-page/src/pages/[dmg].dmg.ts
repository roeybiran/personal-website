import type { APIRoute } from "astro";
import { getProductOverviewEntry } from "../utils/product";
import { getBinaryFile } from "../utils/s3";

export const GET: APIRoute = async ({ params }) => {
  try {
    if (!params.dmg) {
      throw new Error("DMG filename is required");
    }

    const productEntry = await getProductOverviewEntry();

    return await getBinaryFile(productEntry.id, `${params.dmg}.dmg`);
  } catch {
    return new Response("Not found", { status: 404 });
  }
};

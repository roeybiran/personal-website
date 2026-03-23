import type { APIRoute } from "astro";
import { product } from "../product";
import { getBinaryFile } from "../utils/s3";

export const GET: APIRoute = async ({ params }) => {
  try {
    if (!params.dmg) {
      throw new Error("DMG filename is required");
    }

    return await getBinaryFile(product.slug, `${params.dmg}.dmg`);
  } catch {
    return new Response("Not found", { status: 404 });
  }
};

import type { APIRoute } from "astro";
import { product } from "../product";
import { getTextFile } from "../utils/s3";

export const GET: APIRoute = async () => {
  try {
    const text = await getTextFile(product.slug, "appcast.xml");

    return new Response(text, {
      status: 200,
      headers: {
        "Content-Type": "application/xml",
      },
    });
  } catch {
    return new Response("Not found", { status: 404 });
  }
};

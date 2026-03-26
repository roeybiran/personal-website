import type { APIRoute } from "astro";
import { getProductOverviewEntry } from "../utils/product";
import { getTextFile } from "../utils/s3";

export const GET: APIRoute = async () => {
  try {
    const productEntry = await getProductOverviewEntry();
    const text = await getTextFile(productEntry.id, "appcast.xml");

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

import type { APIRoute } from "astro";
import { getEntry, type CollectionEntry } from "astro:content";
import R404 from "../../../util/Response404";

export const prerender = false;

export const GET: APIRoute = async ({ params: { app: slug } }) => {
  const entry: CollectionEntry<"apps"> | undefined = await getEntry(
    "apps",
    slug ?? ""
  );

  const appcastURL = entry?.data.sparkleAppcastURL;

  if (!appcastURL) return R404;

  const response = await fetch(appcastURL);

  return new Response(await response.text(), {
    status: 200,
    headers: {
      "Content-Type": "application/xml",
    },
  });
};

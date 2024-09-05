import type { APIRoute } from "astro";
import { getEntry } from "astro:content";
import R404 from "@util/Response404";

export const prerender = false;

export const GET: APIRoute = async ({ params: { app: slug } }) => {
  if (!slug) return R404;
  const entry = await getEntry("apps", slug);
  if (!entry) return R404;
  const text = await fetch(entry.data.sparkleAppcastURL).then((v) => v.text());
  return new Response(text, {
    status: 200,
    headers: {
      "Content-Type": "application/xml",
    },
  });
};

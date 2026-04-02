import type { APIRoute } from "astro";

export const GET: APIRoute = async () =>
  new Response(null, {
    status: 308,
    headers: {
      Location: "/",
    },
  });

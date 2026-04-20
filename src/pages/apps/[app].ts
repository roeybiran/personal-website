import type { APIRoute } from "astro";
import { getEntry } from "astro:content";
import { isAppSlug } from "../../utils/apps";

export const GET: APIRoute = async ({ params }) => {
  if (!params.app || !isAppSlug(params.app)) {
    return new Response("Not found", { status: 404 });
  }

  const app = await getEntry("apps", params.app);

  if (!app) {
    return new Response("Not found", { status: 404 });
  }

  return new Response(null, {
    status: 308,
    headers: {
      Location: app.data.siteUrl,
    },
  });
};

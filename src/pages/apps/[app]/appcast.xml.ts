import type { APIRoute } from "astro";
import { CollectionEntry, getCollection } from "astro:content";

// 1. Generate a new path for every collection entry
export async function getStaticPaths() {
  const appsEntries = await getCollection("apps");
  return appsEntries
    .filter(({ data: sparkleAppcastURL }) => sparkleAppcastURL)
    .map((entry) => ({
      params: { app: entry.slug },
      props: { appcastURL: entry.data.sparkleAppcastURL },
    }));
}

export const get: APIRoute = async function get({ props }) {
  if (!props.appcastURL) {
    return new Response(null, { status: 404, statusText: 'Page not found' });
  }

  const response = await fetch(props.appcastURL);

  return {
    body: await response.text(),
    headers: {
      "Content-Type": "application/xml",
    },
  };
};

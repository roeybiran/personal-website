import type { APIRoute } from "astro";
import { CollectionEntry, getCollection } from "astro:content";

// 1. Generate a new path for every collection entry
export async function getStaticPaths() {
  const appsEntries = await getCollection("apps");
  return appsEntries.map((entry) => ({
    params: { app: entry.slug },
  }));
}

export const get: APIRoute = async function get({ params, request, props }) {
  const response = await fetch(
    "https://f002.backblazeb2.com/file/roeybiran/finbar/appcast.xml"
  );

  return {
    body: await response.text(),
    headers: {
      "Content-Type": "application/xml",
    },
  };
};

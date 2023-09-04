import type { APIRoute } from "astro";
import { getEntry, type CollectionEntry } from "astro:content";
import R404 from "../../../util/Response404";

export const prerender = false;

export const GET: APIRoute = async ({ params: { app: slug }, redirect }) => {
  const entry: CollectionEntry<"apps"> | undefined = await getEntry(
    "apps",
    slug ?? ""
  );

  const downloadURL = entry?.data.downloadURL;

  if (!downloadURL) return R404;

  return redirect(downloadURL, 303);
};

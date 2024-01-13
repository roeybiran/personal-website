import type { APIRoute } from "astro";
import { getEntry } from "astro:content";
import R404 from "../../../util/Response404";

export const prerender = false;

export const GET: APIRoute = async ({ params: { app: slug } }) => {
  if (!slug) return R404;

  const entry = await getEntry("apps", slug);

  if (!entry) return R404;

  if (entry.data.release.type === "indie") {
    const response = await fetch(entry.data.release.sparkleAppcastURL).then(
      (r) => r.text()
    );
    const [, downloadURL] = response.match(/<enclosure url="(.+?)"/) ?? [];

    const url = new URL(downloadURL);
    const extension = url.pathname
      .split("/")
      .slice(-1)
      .at(0)
      ?.split(".")
      .slice(-1)
      .at(0);

    if (!extension) return R404;

    const file = await fetch(url).then((v) => v.blob());
    return new Response(file, {
      status: 200,
      headers: {
        "Content-Type": "application/octet-stream",
        "Content-Disposition": `attachment; filename="${entry.data.title}.${extension}"`,
      },
    });

  } else {
    return R404;
  }
};

import type { APIRoute } from "astro";
import { getTextFile } from "../../../utils/s3";

export const GET: APIRoute = async ({ params }) => {
  try {
    const { app } = params;

    if (!app) {
      throw new Error("App slug is required");
    }

    const text = await getTextFile(app, "appcast.xml");

    return new Response(text, {
      status: 200,
      headers: {
        "Content-Type": "application/xml",
      },
    });
  } catch {
    return new Response(null, {
      status: 404,
      headers: {
        Location: "/404",
      },
    });
  }
};

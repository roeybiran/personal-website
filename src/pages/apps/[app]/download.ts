export const prerender = false;

import type { APIRoute } from "astro";
import { getLatestDMG } from "../../../utils/s3";

export const GET: APIRoute = async ({ params }) => {
  try {
    const { app } = params;

    if (!app) {
      throw new Error("App slug is required");
    }

    return await getLatestDMG(app);
  } catch (error) {
    return new Response(null, {
      status: 301,
      headers: {
        Location: "/404",
      },
    });
  }
};

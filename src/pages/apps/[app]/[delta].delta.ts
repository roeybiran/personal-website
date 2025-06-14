import type { APIRoute } from "astro";
import { getBinaryFile } from "../../../utils/s3";

export const GET: APIRoute = async ({ params }) => {
  try {
    const { app, delta } = params;

    if (!app || !delta) {
      throw new Error("App slug and delta filename are required");
    }

    return await getBinaryFile(app, `${delta}.delta`);
  } catch {
    return new Response(null, {
      status: 404,
      headers: {
        Location: "/404",
      },
    });
  }
};

import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import path from "path";
import { S3_CONFIG, S3_PATHS } from "../constants.ts";

//   $sys_reqs = "macOS only.";
//   if ($appcast_content && preg_match('/<sparkle:minimumSystemVersion>([^<]+)<\/sparkle:minimumSystemVersion>/', $appcast_content, $matches)) {
//     $sys_reqs = sprintf('Requires <strong>macOS %s</strong> or later.', $matches[1]);
//   };

export const s3Client = new S3Client({
  endpoint: S3_CONFIG.endpoint,
  region: S3_CONFIG.region,
  credentials: {
    accessKeyId: S3_CONFIG.accessKeyId,
    secretAccessKey: S3_CONFIG.secretAccessKey,
  },
});

export async function getFile(slug: string, filename: string) {
  try {
    const Key = path.join(S3_PATHS.objectPrefix(slug), filename);

    const command = new GetObjectCommand({
      Bucket: S3_CONFIG.bucketName,
      Key,
    });

    const response = await s3Client.send(command);

    if (!response.Body) {
      throw new Error(`File not found: ${filename}`);
    }

    return {
      body: response.Body,
      size: response.ContentLength || 0,
    };
  } catch (error) {
    console.error(`Error getting file ${filename} for ${slug}:`, error);
    throw error;
  }
}

export async function getBinaryFile(slug: string, filename: string) {
  const { body, size } = await getFile(slug, filename);
  const buffer = await body.transformToByteArray();

  return new Response(buffer, {
    status: 200,
    headers: {
      "Content-Type": "application/octet-stream",
      "Content-Disposition": `attachment; filename="${filename}"`,
      "Content-Length": `${size}`,
    },
  });
}

export async function getTextFile(
  slug: string,
  filename: string
): Promise<string | undefined> {
  try {
    const { body } = await getFile(slug, filename);

    return await body.transformToString();
  } catch {
    return undefined;
  }
}

export async function getAppcast(slug: string) {
  try {
    const xmlContent = await getTextFile(slug, "appcast.xml");

    if (!xmlContent) {
      throw new Error(`No appcast.xml found for ${slug}`);
    }

    return xmlContent;
  } catch (error) {
    console.error("Error getting appcast:", error);
    throw error;
  }
}

export async function getLatestDMG(slug: string) {
  const xmlContent = await getAppcast(slug);

  const matches = xmlContent.matchAll(/<enclosure url="([^"]+)"/g);
  const firstMatch = matches.next();

  if (!firstMatch.value?.[1]) {
    throw new Error(`No enclosure URL found in appcast for ${slug}`);
  }

  const enclosureUrl = decodeURIComponent(firstMatch.value[1]);
  const filename = enclosureUrl.split("/").pop();

  if (!filename) {
    throw new Error(`Invalid enclosure URL format for ${slug}`);
  }

  return await getBinaryFile(slug, filename);
}

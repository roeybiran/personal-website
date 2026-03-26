import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";
import path from "node:path";
import type { ProductSlug } from "../index";

let s3Client: S3Client | undefined;
let bucketName: string | undefined;

async function getFile(slug: ProductSlug, filename: string) {
  const {
    S3_BUCKET_NAME,
    S3_ACCESS_KEY_ID,
    S3_SECRET_ACCESS_KEY,
    S3_ENDPOINT,
    S3_REGION,
  } = process.env;

  if (
    !S3_BUCKET_NAME ||
    !S3_ACCESS_KEY_ID ||
    !S3_SECRET_ACCESS_KEY ||
    !S3_ENDPOINT ||
    !S3_REGION
  ) {
    throw new Error("Missing S3 environment variables");
  }

  if (!s3Client || bucketName !== S3_BUCKET_NAME) {
    s3Client = new S3Client({
      endpoint: S3_ENDPOINT,
      region: S3_REGION,
      credentials: {
        accessKeyId: S3_ACCESS_KEY_ID,
        secretAccessKey: S3_SECRET_ACCESS_KEY,
      },
    });
    bucketName = S3_BUCKET_NAME;
  }

  const command = new GetObjectCommand({
    Bucket: bucketName,
    Key: path.join("apps", slug, filename),
  });

  const response = await s3Client.send(command);

  if (!response.Body) {
    throw new Error(`File not found: ${filename}`);
  }

  return {
    body: response.Body,
    size: response.ContentLength || 0,
  };
}

export async function getBinaryFile(
  slug: ProductSlug,
  filename: string,
  downloadFilename = filename
) {
  const { body, size } = await getFile(slug, filename);
  const buffer = await body.transformToByteArray();

  return new Response(buffer, {
    status: 200,
    headers: {
      "Content-Type": "application/octet-stream",
      "Content-Disposition": `attachment; filename="${downloadFilename}"`,
      "Content-Length": `${size}`,
    },
  });
}

export async function getTextFile(slug: ProductSlug, filename: string) {
  try {
    const { body } = await getFile(slug, filename);

    return await body.transformToString();
  } catch {
    return undefined;
  }
}

export async function getLatestDMG(slug: ProductSlug, downloadName: string) {
  const xmlContent = await getTextFile(slug, "appcast.xml");

  if (!xmlContent) {
    throw new Error(`No appcast.xml found for ${slug}`);
  }

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

  return await getBinaryFile(slug, filename, `${downloadName}.dmg`);
}

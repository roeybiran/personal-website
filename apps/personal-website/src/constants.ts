import path from "path";
import {
  S3_BUCKET_NAME,
  S3_ACCESS_KEY_ID,
  S3_SECRET_ACCESS_KEY,
  S3_ENDPOINT,
  S3_REGION,
} from "astro:env/server";

export const S3_CONFIG = {
  bucketName: S3_BUCKET_NAME,
  accessKeyId: S3_ACCESS_KEY_ID,
  secretAccessKey: S3_SECRET_ACCESS_KEY,
  endpoint: S3_ENDPOINT,
  region: S3_REGION,
} as const;

export const S3_PATHS = {
  objectPrefix: (slug: string) => path.join("apps", slug),
  appcastPrefix: (slug: string) =>
    path.join(S3_PATHS.objectPrefix(slug), "appcast.xml"),
} as const;

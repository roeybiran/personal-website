/**
 * Extracts the slug from a URL or path string
 * @param path The path to extract from (e.g. "/apps/my-app/index.md" or "https://example.com/apps/my-app/index.md")
 * @returns The slug (e.g. "my-app")
 */
export function extractSlug(path: string): string {
  let pathname: string;
  try {
    pathname = new URL(path).pathname;
  } catch {
    pathname = path;
  }
  const parts = pathname.split("/").filter(Boolean);
  const lastPart = parts[parts.length - 1];
  return lastPart?.replace(/\.md$/, "") ?? "";
}

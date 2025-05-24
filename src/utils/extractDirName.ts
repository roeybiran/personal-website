/**
 * Extracts the directory name from a path
 * @param path The path to extract from (e.g. "/apps/my-app/index.md")
 * @returns The directory name (e.g. "my-app")
 * @throws Error if the path doesn't match the expected format
 */
export function extractDirName(path: string): string {
  const result = path.split("/").slice(-2, -1)[0];
  if (!result) throw new Error(`Invalid path: ${path}`);
  return result;
}

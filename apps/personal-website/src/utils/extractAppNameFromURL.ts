/**
 * Extracts the app name from a URL path
 * @param url The URL to extract from (e.g. "http://HOST/apps/X/release-notes")
 * @returns The app name (e.g. "X")
 * @throws Error if the URL doesn't match the expected format
 */
export function extractAppNameFromURL(url: string): string {
  // Remove protocol and host if present
  const path = url.replace(/^https?:\/\/[^\/]+/, '');
  
  // Split by "/" and filter out empty strings
  const parts = path.split('/').filter(Boolean);
  
  // Verify we have at least 3 path components
  if (parts.length < 3) {
    throw new Error(`Invalid URL format: ${url}. Expected at least 3 path components after host.`);
  }
  
  // Return the second to last part
  return parts[parts.length - 2]!;
} 
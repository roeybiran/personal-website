export const appSlugs = ["finbar", "syphon"] as const;

export type AppSlug = (typeof appSlugs)[number];

export function isAppSlug(value: string): value is AppSlug {
  return appSlugs.includes(value as AppSlug);
}

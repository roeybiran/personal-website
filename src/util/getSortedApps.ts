import { getCollection } from "astro:content";

export default async function getSortedApps() {
  const apps = await getCollection("apps")
  apps.sort((a, b) => (a.data.releaseDate > b.data.releaseDate ? -1 : 1))

  return apps
    .map(({ data, slug }) => ({
      title: data.title,
      icon: data.icon,
      subtitle: data.tagline,
      iconAlt: data.title,
      slug: `./apps/${slug}`,
    }));
}

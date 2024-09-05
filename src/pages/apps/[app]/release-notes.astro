---
import { getCollection } from "astro:content";
import AppLayout from "@layouts/AppLayout.astro";
import "@styles/pages/release-notes.scss";

export async function getStaticPaths() {
  const collection = await getCollection("apps");
  return collection.map((entry) => ({
    params: {
      app: entry.slug,
    },
    props: {
      slug: entry.slug,
      appcast: entry.data.sparkleAppcastURL,
    },
  }));
}

const { appcast, slug } = Astro.props;


const appcastResponse = await fetch(appcast).then((v) => v.text());
const [, releaseNotesURL] =
appcastResponse.match(
  /<sparkle:releaseNotesLink>(.+?)<\/sparkle:releaseNotesLink>/
) ?? [];

let html: string | undefined;

if (releaseNotesURL) {
  const releaseNotes = await fetch(releaseNotesURL).then((v) => v.text());
  [, html] = releaseNotes.match(/<body>(.+?)<\/body>/s) ?? [];
} else {
  html = `<p>No release notes yet.</p>`
}
---

<AppLayout pageSuffix="Release Notes" {slug}>
  {html && <div class="content-release-notes" set:html={html} />}
</AppLayout>

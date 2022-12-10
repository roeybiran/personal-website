---
title: Graduates’ Exhibition
subtitle: The official website of my school’s department graduation exhibition.
date: 2021-08-10
links:
  - github: roeybiran/hitviscom-graduates-2021
  - url: https://hitviscom-graduates-2021.vercel.app
type: Website
responsibilities:
  - Code
  - Design
stack:
  - Next.js
  - TypeScript
  - Airtable
---

Two facilities ought to accompany the graduation exhibition at the **Holon Institute of Technology’s department of visual communications design**:

- A website showcasing the projects.
- An on-grounds device with a digital interface containing a map of the exhibition and guiding mechanisms, helping visitors reach their desired destinations.

Graduates are handed duties related to the show’s operation, and I was assigned to the PR team. Then, I decided to expand upon my responsibilities and volunteer to build both the exhibition’s website and the guiding interface, two tasks previously done by external contractors.

I realized a well-designed, responsive website could fulfill the two objectives in one fell swoop. Moreover, it was the first time this endeavor was done in-house, allowing for complete technical and artistic control.

## Back-end

Previously, in order to have their project displayed online, students sent information about their projects in advance, relinquishing the ability to edit their content once the site was launched.
This time, I devised a novel solution of using a department–wide, shared [Airtable](https://airtable.com) database, providing each student with total control over the insertion and editing of content. That includes images, videos, contact information, physical location of the project, and more. The data would then be pulled dynamically and continuously by the front-end. It worked tremendously well.

## Front-end

With the data infrastructure in place, manifesting it as a web page was simple enough. I opted for the [Next.js](https://nextjs.org) framework as a solid foundation for a performant, accessible, and scalable static site.

I designed the site to be fully responsive and look great on either the visitors’ phones or the large monitors in the exhibition’s entrance. Adding a convenient, live-search feature solidified the site’s ability to replace the traditional navigation stands used previously.

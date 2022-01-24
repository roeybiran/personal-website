---
title: Let’s Ski!
subtitle: A ski lover’s experiment in creative coding and big data parsing.
github: roeybiran/lets-ski
url: https://lets-ski.roeybiran.com
date: 2020-06-10
type: Website
responsibilities:
  - Code
  - Design
stack:
  - TypeScript
  - Next.js
  - p5.js
---

The project originated as a school assignment in a creative coding class, where the objective was to present big data in an enticing way, using [Processing](https://processing.org) specifically.

When I found [this data set from Kaggle](https://www.kaggle.com/beaubellamy/ski-resorts), I immediately knew this is the resource I’d like to utilize, being a ski lovers. I proceeded to build a website that would allow visitors to view the 5 top ranking resorts in a given region.

Firstly, I converted the CSV data set to JSON. Then, I wrote a script to parse the data into a list of resorts, sorted geographically and ranked by a custom algorithm.

Finally, I chose to express the data in a visually pure way. A given resort’s qualities are highlighted by mere geometry — for example, a destination with greater average difficulty will appear sharper. Beyond that, I used colors and shapes that to me, are evocative of the atmosphere in ski resorts.

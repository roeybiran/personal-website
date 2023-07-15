---
title: Finbar
subtitle: Supercharged menu bar search
tagline: Menu bar searching you didn’t know you wanted.
icon: ./icon.png
cover: ./cover.png
iconAlt: Finbar’s app icon
dateReleased: 2022-11-12
platform: macOS
systemRequirements: Big Sur
downloadURL: https://f002.backblazeb2.com/file/roeybiran/finbar/latest/Finbar.dmg
purchaseURL: https://roeybiran.gumroad.com/l/mgpnr
purchasePolicy: One time purchase, no in–app purchases.
openGraphImage: finbar-og.jpg
price: 9.99
---

**Finbar** reimagines your Mac’s [built–in menu bar search](https://support.apple.com/en-us/guide/mac-help/hlpvw003/13.0/mac/13.0) with great features such as fuzzy filtering and tracking of recently selected menu items — without sacrificing an ounce of speed. With Finbar, you’ll unlock the menu bar’s true potential as a native, ubiqtuous [command palette](https://capiche.com/e/consumer-dev-tools-command-palette).

## Features

### Blazing–Fast

Finbar is designed to do one thing, and do it well. **Built exclusively with native Apple technologies**, it’ll retrieve your desired menu item in no time. And when not in use, it awaits patiently in its own little spot in the menu bar, taking virtually no resources.

<video src="https://res.cloudinary.com/roeybiran/video/upload/f_auto:video,q_auto/fast_fgeio4" controls loop muted playsinline autoplay ></video>

### It got brains, too

Finbar remembers every menu item you’ve selected, gradually accumulating a list of your favorite menu items. This list stays relevant across launches, and even when menu items have a dynamic, varying title.

<video src="https://res.cloudinary.com/roeybiran/video/upload/f_auto:video,q_auto/u2rqypzaegh7h6xsaygf" controls loop muted playsinline autoplay ></video>

### Conqueror of menu bars

Traverse even the most complex of menu bars with just a few keystrokes: Finbar turns every menu bar into a browsable outline, just like the Finder does for your file system. Plus, selecting menu items containing other items will scope the search just to the nested items.

![navigation](./navigation.jpg)

### The menu bar, according to you

Utilize Finbar’s powerful rule editor to create incredibly intricate rule configurations, and never see an irrelevant menu item again.

![the rule editor](./rule-editor.jpg)

### Bring your own (menu items)

Finbar will automatically pick up any shell scripts or AppleScript files placed inside a special folder and integrate them with the rest of the menu bar.

![scripts](./scripts.jpg)

## About

### Why I built it

For a long time, I was a devout user of the Mac’s built–in menu bar search feature myself. While it is undoubtedly a great feature, I started to feel there’s a lot to be desired with the way it currently works, specifically:

- It can get slow. In addition to menu items, it searches for topics in the app’s “help books”.
- No fuzzy searching.
- It doesn’t remember your recently used items.
- It offers no control over excluding specific menu items from search results.
- It doesn’t search the “” menu item by default, with no way of changing that.

All of these (and then some) persuaded me to start building Finbar. My incentive at first was to scratch my own itch, but I soon realized there’re others who might find the app useful. Once I decided to release it for public use, it turned into a labor of love where I carefully considered every facet of engineering, UI and UX — first and foremost to make a compelling product worthy of the macOS standard, and also for my own challenge and enjoyment.

---
title: Finbar
tagline: Supercharged Menu Bar Search
icon: ./assets/icon.png
release:
  type: indie
  cover: ./assets/cover.png
  gumroadID: mgpnr
  sparkleAppcastURL: https://f002.backblazeb2.com/file/roeybiran/finbar/appcast.xml
  releaseDate: 2022-11-12
  platform: macOS
  cask: finbar
  purchasePolicy: One time purchase, no in–app purchases.
  productHuntEmbed: '<a href="https://www.producthunt.com/posts/finbar?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-finbar" target="_blank"><img src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=404865&theme=light" alt="Finbar - Supercharged&#0032;menu&#0032;bar&#0032;search&#0032;for&#0032;your&#0032;Mac | Product Hunt" style="width: 250px; height: 54px;" width="250" height="54" /></a>'
---

::: intro

**Finbar** reimagines the Mac’s [built–in menu bar search](https://support.apple.com/en-us/guide/mac-help/hlpvw003/13.0/mac/13.0) with great features such as fuzzy filtering and tracking of recently selected menu items — without sacrificing an ounce of speed. With Finbar, you’ll unlock the menu bar’s true potential as a native, ubiquitous [command palette](https://capiche.com/e/consumer-dev-tools-command-palette).

Yes, your Mac has built–in menu bar search capabilities, and in fact, I was a devout user of this feature myself for a long time. While quite serviceable right out of the box, I started to feel there’s a lot to be desired with the way it currently works: No fuzzy searching; it also searches through an app’s “help book” which slows things down; it doesn’t remember your recently selected menu items, and it offers no control over excluding or including specific menu items from search results. All of these, and more, persuaded me to start building Finbar.

:::

## Features

::: feat

### Fast

Finbar is designed to do one thing, and do it well. **Built exclusively with native Apple technologies**, it’ll retrieve your desired menu item in no time. And when not in use, it awaits patiently in its own little spot in the menu bar, taking virtually no resources.

:::

::: feat

### Fuzzy Search

Find the menu item you were looking for faster and with minimal typing, all while eschewing tiresome memorization of its title.

![fuzzy searching](./assets/fuzzy-search.png)

:::

::: feat

### Adaptable

Finbar remembers every menu item you’ve selected, gradually accumulating a list of your favorite menu items. This list stays relevant across launches, and even when menu items have a dynamic, varying title.

<div class="carousel">

![recents](./assets/recents-1.png)
![recents](./assets/recents-2.png)

</div>

:::

::: feat

### Powerful Rule Editor

Create incredibly intricate rules using the Mac’s tried and true rule editing interface, and never see an irrelevant menu item again.

![the rule editor](./assets/rule-editor.png)

:::

::: feat

### Navigate the Menu Bar with Ease

Traverse through the most complex menu bar hierarchies with just a few keystrokes: Finbar turns every menu bar into a browsable outline, just like the Finder does for your file system. Plus, selecting menu items containing other items will narrow down the results just to the nested items.

<video width="1350" height="860" src="/finbar/videos/navigation.mp4" poster="/finbar/videos/navigation.jpg" autoplay controls loop muted playsinline ></video>

:::

::: feat

### Extend with Custom Scripts

Finbar will automatically pick up any shell scripts or AppleScript files placed inside a designated folder and integrate them with the rest of the menu bar, essentially a way for you to add “menu items” of your own.

![scripts](./assets/scripts.png)

:::

::: feat

### Quick Selection

Quickly select the first nine eligible items using customizable keyboard shortcuts. Hold the <kbd>⌘</kbd> key to tell an item’s position among the other nine.

<video width="1350" height="860" src="/finbar/videos/quick-selection.mp4" poster="/finbar/videos/quick-selection.jpg" autoplay controls loop muted playsinline ></video>

:::

::: feat

### Fallback Search

Couldn’t find the menu item you were looking for? Searching the system’s help menu remains a click away.

![fallback](./assets/fallback.png)

:::

## Even More

::: misc

- Shows menu item key equivalents
- Shows menu item “mark characters” (e.g. ✓)
- Global keyboard shortcut
- Tabular interface with resizable, movable columns

:::

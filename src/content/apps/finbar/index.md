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
productHuntEmbed: '<a href="https://www.producthunt.com/posts/finbar?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-finbar" target="_blank"><img src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=404865&theme=light" alt="Finbar - Supercharged&#0032;menu&#0032;bar&#0032;search&#0032;for&#0032;your&#0032;Mac | Product Hunt" style="width: 250px; height: 54px;" width="250" height="54" /></a>'
price: 9.99
---

**Finbar** reimagines the Mac’s [built–in menu bar search](https://support.apple.com/en-us/guide/mac-help/hlpvw003/13.0/mac/13.0) with great features such as fuzzy filtering and tracking of recently selected menu items — without sacrificing an ounce of speed. With Finbar, you’ll unlock the menu bar’s true potential as a native, ubiquitous [command palette](https://capiche.com/e/consumer-dev-tools-command-palette).

Yes, your Mac’s built–in menu bar search capabilities, and in fact, I was a devout user of this feature myself for a long time. While perfectly serviceable right out of the box, I started to feel there’s a lot to be desired with the way it currently works. Here’s a non–exhaustive list:

- No fuzzy searching.
- It searches for topics in the app’s “help books” in addition to menu items, and this can hinder performance significantly.
- It doesn’t remember your recently selected menu items.
- It offers no control over excluding or including specific menu items from search results. For example, the “” menu item is never searched, and good luck with changing that.

These omissions became even more evident as [command palettes](https://capiche.com/e/consumer-dev-tools-command-palette) gained popularity as a graphical user interface pattern, and many apps started to include their own. All of this persuaded me to start building Finbar. My incentive at first was to scratch my own itch, but I soon realized there’re others who might find the app useful. Once I decided to release it for public use, I went all–in with the goal of crafting [the best, most beautiful macOS app](https://daringfireball.net/linked/2020/03/20/mac-assed-mac-apps) I can.

Nowadays, I use Finbar incessantly. Please enjoy it as much as I do!

## Highlights

### Blazing fast

Finbar is designed to do one thing, and do it well. **Built exclusively with native Apple technologies**, it’ll retrieve your desired menu item in no time. And when not in use, it awaits patiently in its own little spot in the menu bar, taking virtually no resources.

<video src="https://res.cloudinary.com/roeybiran/video/upload/f_auto:video,q_auto/fast_fgeio4" controls loop muted playsinline autoplay ></video>

### Fuzzy search

Find the menu item you were looking for faster and with minimal typing, all while eschewing tiresome memorization of its title.

![fuzzy searching](./fuzzy-search.jpg)

### Adapts to your habits

Finbar remembers every menu item you’ve selected, gradually accumulating a list of your favorite menu items. This list stays relevant across launches, and even when menu items have a dynamic, varying title.

<video src="https://res.cloudinary.com/roeybiran/video/upload/f_auto:video,q_auto/u2rqypzaegh7h6xsaygf" controls loop muted playsinline autoplay ></video>

### Pro navigation

Traverse the most complex of menu bar hierarchies with just a few keystrokes: Finbar turns every menu bar into a browsable outline, just like the Finder does for your file system. And selecting menu items containing other items will scope the search just to the nested items.

![navigation](./navigation.jpg)

### Powerful rule editor

Create incredibly intricate rules using an intuitive interface, and never see an irrelevant menu item again.

![the rule editor](./rule-editor.jpg)

### Extend with custom scripts

Finbar will automatically pick up any shell scripts or AppleScript files placed inside a special folder and integrate them with the rest of the menu bar.

![scripts](./scripts.jpg)

## More Features

- Can be launched quickly from anywhere using a global keyboard shortcut.
- Shows menu item shortcuts.
- Shows menu item “mark characters” (usually, a checkmark).
- Tabular interface: columns can be reordered and resized to your liking.

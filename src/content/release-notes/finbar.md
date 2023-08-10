---
app: "finbar"
title: ""
---

## 1.8.2

### Bug Fixes

- Fixed a bug where `finbar-cli` would not honor the passed `--predicate` argument.

## 1.8.1

### Bug Fixes

- Fixed a bug where `finbar-cli` would ignore the `--v2` flag passed to it.

## 1.8

### **Important message to `finbar-cli` users!**

Usage of the `list` subcommand in its current form is deprecated and will cease to work soon. Run `finbar-cli list -h` to learn more about this change and make the necessary changes to your scripts as soon as you can.

### What’s New

- The main window can now be freely resized (down to a minimum size).
- Filtering through the items list is now faster.
- Refined the way menu items are searched and displayed. [Read more about this change here](https://www.roeybiran.com/apps/finbar/help#how-searching-works).
- The help button under the rule editor now links directly to the relevant section in the user guide.
- Options menu:
  - Changed item order slightly.
  - Added a ”Find” menu item.
- Changed default column widths (thanks, [@gingerbeardman](https://twitter.com/gingerbeardman))
- Removed the alternating row colors in favor of line separators, for a cleaner look.
- Removed the fade–in animation on activation.

### Bug Fixes

- Fixed a highlighting issue in the key equivalent badges.
- Fixed a bug where the path column would unnecessarily truncate and wouldn’t expand even when there’s enough space.
- The settings window’s default position now defaults to the center of the screen. [Closes ticket #10](https://github.com/roeybiran/finbar-issues/issues/10) (thanks once more [@gingerbeardman](https://twitter.com/gingerbeardman)!)

## 1.7.3

### What’s New

- Added an ”Activate” menu item that triggers the designated action for the selected list item.

### Bug Fixes

- Fixed a bug where double clicking or pressing return on list items would not work in some circumstances.

## 1.7.2

### Bug Fixes

- The rule editor’s window now supports resizing.

## 1.7.1

### Bug Fixes

- Fixed a small interface issue in the release notes preview.
- Fixed a bug where the rule editor’s window size is initially shown with a tiny frame.

## 1.7

I’m pleased to present you with another **very** significant update to Finbar, and this time around: a completely revamped rule editor. Finbar now relies on the Mac’s tried–and–true rule editor — a worldwide first for menu item searching. Use this ultra powerful and endlessly flexible component to create the most elaborate rule configurations, and never see an irrelevant menu item ever again.

### What’s New

- A brand–new rule editor.
- Parts of the window now includes transparency for a more lightweight appearance.
- Updated the way errors, fruitless searches and loading states are presented.
- Finbar’s settings interface has been streamlined and consolidated into a single pane.
- The lower path bar now appears only when in the search is scoped to a specific menu item. Its design was slightly updated too.
- The menu bar owning application’s icon is now shown more prominently.

### Bug Fixes

- Fixed a bug where Finbar would not appear in full–screen apps.
- Fixed a bug where pressing return while the search field is focused would choose the last selected outline row, even if no rows are currently shown.
- Fixed a bug where double–clicking an outline column would choose the currently selected row.
- Fixed a bug where double–clicking a group row would choose the currently selected row.

## 1.6

Apologies for the relatively long period without any updates — I fractured my scaphoid bone while running outdoors, which greatly affected my ability to code 😔. Nevertheless, I’m thrilled to finally release a new update to Finbar, and a **huge** one at that. I truly believe this update makes Finbar the best menu bar searching utility there is — and it’s just the beginning.

### What’s New

- Revised interface: results are now displayed tabularly and in a much more compact, customizable fashion. Some of the UI is a bit rough around the edges — please bear with me while I perfect the experience.
- Finbar now includes a beautiful “overview” mode, where you’ll be able to see all menu items, scripts and recents Finbar could find for the menu bar owning app. To return to this screen after searching, simply erase the search query.
- While in overview mode, menu items are now browsable. Expand or collapse menu bar items or submenus and click menu items, all while having a bird’s view of the menu bar‘s hierarchy. And you don’t even have to shift the keyboard’s focus to the list to do so: Finbar comes with customizable keyboard shortcuts just for this purpose. They’re listed in the options menu in the lower right.

## 1.5.1

### Changes

- Added a better explanation of the rule editor’s exclusion behavior.

### Bug Fixes

- Fixed a bug where the main window wouldn’t remain centered when working across multiple displays.

## 1.5

### What’s New

- `finbar-cli`: you can now exclude menu items by specifying the `--excluding-title` option, followed by the menu item’s title. You should provide this option once for each menu item you want to exclude. See `finbar-cli list -h` for help.

### Changes

- Significant performance improvements to the fuzzy matching engine.

### Bug Fixes

- Fixed a small bug related to text selection in the search field.

## 1.4

### What’s New

- Settings: you can now choose to show Finbar on a specific screen.
- Settings: you can now configure software update behavior.
- Improved help for the `finbar-cli` command.

## 1.3

### What’s New

- A utility offering command–line access to Finbar, `finbar-cli`, is now included with the app.

### Bug Fixes

- Fixed a bug where search field wouldn’t regain focus upon app activation.

## 1.2

### What’s New

- Added a “Center Window” menu item.
- In multi–monitor setups, the app now appears on the screen with keyboard focus.
- Settings: you can now hide Finbar’s menu bar extra.

### Bug Fixes

- Menu item selection should now work reliably across JetBrains software products.

## 1.1

### What’s New

- Added Ventura–compatible launch at login setting.
- Finbar’s main window now closes on <kbd>⌘</kbd> + <kbd>W</kbd> and <kbd>⌘</kbd> + <kbd>H</kbd>.
- An icon now appears in Finbar’s status area when updates are available.
- Rows are now slightly more compact.
- Added a “Help” menu item.

### Bug Fixes

- Fixed a bug where entering the license key wouldn’t work in some cases (thanks, Raed)

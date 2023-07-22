---
app: "finbar"
---

# Finbar Help

## User Guide

### Using the Rule Editor

Finbar’s rule editor uses the Mac’s standard interface for editing rules and thus would work as you’d expect. There’re however a few special considerations to take into account when matching by the following criteria:

1. _Menu item’s path_: Path components should be separated with a backslash (\\). **For example,** to exclude Safari’s “View > Translation” menu item, specify the path as “View\Translation” (without the quotes).
2. _Menu item’s index_: The index in question refers to the menu item’s position among its neighboring menu items inside a given menu. The first menu item in that menu would have an index of 1. Note that separators between menu items should also be included in the count. **For example,** to exclude Safari’s “Edit > Cut” menu item, specify an index of 4 (that’s because it follows 3 menu items — “Undo“, “Redo”, and a separator).
3. _Menu item’s depth_: Menu bar items have a depth of 0, and each submenu increases that depth by 1. **For example,** to exclude Safari’s “File > Export > Bookmarks…” menu item, specify a depth of 2.

### Command–line Interface

Finbar includes an executable tool offering a command–line interface to some of its basic functionalities. It’s located within the application bundle, at the following path: **Finbar.app/Contents/MacOS/finbar-cli**. For usage instructions and help, run:

```shell
finbar-cli -h
```

### Adding Scripts

Any valid script — that is, any text file with an interpreter directive (or [shebang](<https://en.wikipedia.org/wiki/Shebang_(Unix)>)) supported by your system — can be used to extend Finbar.

To add a script:

1. Create the following directory: **~/Library/Application Scripts/com.roeybiran.Finbar**. The tilde is an alias to your [home directory](https://en.wikipedia.org/wiki/Home_directory).
2. Create a sub–folder named with the app’s [bundle identifier](https://cocoacasts.com/what-are-app-ids-and-bundle-identifiers/). For example, a folder for scripts specific to Safari should have the following path: **~/Library/Application Scripts/com.roeybiran.Finbar/com.apple.Safari**.
3. Put your script inside the sub–folder you’ve just created. For example, A Safari–only AppleScript script named “Close Tabs to the Right” should have the following path: **~/Library/Application Scripts/com.roeybiran.Finbar/com.apple.Safari/Close Tabs to the Right.scpt**.

Any scripts you add will be added to the search result on Finbar’s next launch. To do that immediately, click the “Reload Scripts” menu item in the options menu.

### Activating Finbar Programmatically

It’s possible to programmatically open Finbar without stealing focus from the frontmost application, with the following shell command:

```shell
open -ga Finbar
```

A use case for this feature is to activate Finbar from a specialized automation tool such as [Karabiner–Elements](https://github.com/pqrs-org/Karabiner-Elements) or [BetterTouchTool](https://folivora.ai/), which can run shell scripts in various ways, such as double–tapping a modifier key.

## Troubleshooting

### If you can’t find a specific menu item, or any menu items at all

First, try finding the desired menu item with the Mac’s standard search feature first. If this fails, it’s likely that the app has a non–standard implementation of the menu bar (for example, menu items lack the standard attributes Finbar uses for searching). **It would be best to report this to the app’s developer**, but you could also [submit an issue](https://github.com/roeybiran/finbar-issues/issues) and we’ll try to find a workaround.

If you did manage to find what you’ve been looking for using the regular search feature, it’s a problem within Finbar and I‘d appreciate it if you’d [submit an issue](https://github.com/roeybiran/finbar-issues/issues).

### If selecting a menu item does nothing

First, find and **select (with the keyboard)** the desired menu item using the Mac’s regular menu bar search feature. If this does nothing as well, the problem is most likely with the target app itself — some apps implement the menu bar clicking mechanisms in a non–standard way. Consider reporting this to the app’s developer.

**However**, if selecting the menu item did seem to work, the problem lies within Finbar and/or the way it works with the other app. Please [submit an issue](https://github.com/roeybiran/finbar-issues/issues).

## Privacy Policy

Finbar requires your consent to use your Mac’s accessibility features to search the menu bar and perform “clicks” on menu items when necessary. It retrieves the bare minimum of menu item attributes needed for the search experience, and all of that data is stored privately on your Mac. No other personal information or data is consumed by the app, in any way.

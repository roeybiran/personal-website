## User Guide

### How Searching Works
In Finbar, every item is matched by its title. Additionally, menu items below a certain depth are also matched by the title of the containing menu. This is similar to the way the built–in menu bar searching works.

### Disabled Menu Items
Finbar displays and allows the selection of disabled menu items, which will have a dimmed appearance.

The rationale to this is as follows: some apps disable some of their menu items when they lose keyboard focus. In other words, these menu items are disabled only while viewed in Finbar — they'll be re-enabled by the respective app once Finbar initiates a menu item click and deactivates. Thus, guarding against selection of disabled menu items means leaving out many that are perfectly valid.

Some menu items are disabled regardless of focus and will remain so after Finbar deactivates. Selecting them will trigger a system notification alerting you of this.

### Searching vs. Browsing
Finbar operates in two implicit "modes" — searching and browsing. The app enters searching mode whenever you type something in search field. Appropriately, you return to browsing mode by clearing the search field.

The differences between these two modes are:

| Searching | Browsing |
|-----------|----------|
| Items are a flat list | Items are a browsable outline |
| Deeply nested menu items' titles are preceded by the parent's | All titles shown as they are |

When activating a "container" menu item, you enter a new, scoped context that can be further browsed or searched. The differences noted above still apply.

### The Root Screen
Another "mode" worth mentioning is Finbar's "root mode". This is Finbar's initial state, and you return to it by clearing the search field completely. This mode is a combination of the two mentioned above. Here, deeply nested items in the "Recents" section have their title preceded by their parent's, and they are not browsable. However, items in the "menu items" section will be a browsable outline and have their title shown as is.

### Using the Rule Editor
Finbar's rule editor uses the Mac's **standard** rule editing component and thus would work as you'd expect (for a primer on macOS rule editors, see [this Apple support article](https://support.apple.com/en-gb/guide/mac-help/mh15155/mac)). There're however a few special considerations to take into account when matching by the following criteria, which are unique to Finbar:

1. *Menu item's path*: Path components should be separated with a backslash (\). **For example,** to exclude Safari's "View > Translation" menu item, specify the path as "View\Translation" (without the quotes).

2. *Menu item's index*: The index in question refers to the menu item's position among its neighboring menu items inside a given menu. The first menu item in that menu would have an index of 1. Note that separators between menu items should also be included in the count. **For example,** to exclude Safari's "Edit > Cut" menu item, specify an index of 4 (that's because it follows 3 menu items — "Undo", "Redo", and a separator).

3. *Menu item's depth*: Menu bar items have a depth of 0, and each submenu increases that depth by 1. **For example,** to exclude Safari's "File > Export > Bookmarks…" menu item, specify a depth of 2.

### Command–line Interface
Finbar includes an executable tool offering a command–line interface to some of its basic functionalities. It's located within the application bundle, at the following path: **Finbar.app/Contents/MacOS/finbar-cli**. For usage instructions and help, run:

```shell
finbar-cli -h
```

### Adding Scripts
Any valid script — that is, any text file with an interpreter directive (or [shebang](https://en.wikipedia.org/wiki/Shebang_(Unix))) supported by your system — can be used to extend Finbar.

To add a script:

1. Create the following directory: **~/Library/Application Scripts/com.roeybiran.Finbar**. The tilde is an alias to your [home directory](https://en.wikipedia.org/wiki/Home_directory).

2. Create a sub–folder named with the app's [bundle identifier](https://cocoacasts.com/what-are-app-ids-and-bundle-identifiers/). For example, a folder for scripts specific to Safari should have the following path: **~/Library/Application Scripts/com.roeybiran.Finbar/com.apple.Safari**.

3. Put your script inside the sub–folder you've just created. For example, A Safari–only AppleScript script named "Close Tabs to the Right" should have the following path: **~/Library/Application Scripts/com.roeybiran.Finbar/com.apple.Safari/Close Tabs to the Right.scpt**.

Any scripts you add will be added to the search result on Finbar's next launch. To do that immediately, click the "Reload Scripts" menu item in the options menu.

### Activating Programmatically
It's possible to programmatically open Finbar without stealing focus from the frontmost application, with the following shell command:

```shell
open -ga Finbar
```

A use case for this feature is to activate Finbar from a specialized automation tool such as [Karabiner–Elements](https://github.com/pqrs-org/Karabiner-Elements) or [BetterTouchTool](https://folivora.ai/), which can run shell scripts in various ways, such as double–tapping a modifier key.

## Troubleshooting

### If you can't find a specific menu item, or any menu items at all
First, try finding the desired menu item with the Mac's standard search feature first. If this fails, it's likely that the app has a non–standard implementation of the menu bar (for example, menu items lack the standard attributes Finbar uses for searching). **It would be best to report this to the app's developer**, but you could also [submit an issue](https://github.com/roeybiran/finbar-issues/issues) and we'll try to find a workaround.

If you did manage to find what you've been looking for using the regular search feature, it's a problem within Finbar and I'd appreciate it if you'd [submit an issue](https://github.com/roeybiran/finbar-issues/issues).

### If selecting a menu item does nothing
First, find and **select (with the keyboard)** the desired menu item using the Mac's regular menu bar search feature. If this does nothing as well, the problem is most likely with the target app itself — some apps implement the menu bar clicking mechanisms in a non–standard way. Consider reporting this to the app's developer.

**However**, if selecting the menu item did seem to work, the problem lies within Finbar and/or the way it works with the other app. Please [submit an issue](https://github.com/roeybiran/finbar-issues/issues).
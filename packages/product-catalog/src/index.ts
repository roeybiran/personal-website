export type ProductSlug = "finbar" | "syphon";

export interface HelpSection {
  title: string;
  body: string;
}

export interface ContactLink {
  label: string;
  href: string;
}

export interface ProductSupport {
  userGuideSections: HelpSection[];
  troubleshootingSections: HelpSection[];
  feedbackUrl: string;
  issueTrackerUrl?: string;
  contactLinks: ContactLink[];
}

export interface Product {
  slug: ProductSlug;
  name: string;
  tagline: string;
  metaDescription: string;
  siteUrl: string;
  gumroadId: string;
  downloadName: string;
  support: ProductSupport;
}

const contactLinks = [
  { label: "X", href: "https://x.com/roeybiran" },
  { label: "GitHub", href: "https://github.com/roeybiran" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/roeybiran/" },
] satisfies ContactLink[];

export const products = {
  finbar: {
    slug: "finbar",
    name: "Finbar",
    tagline: "Supercharged Menu Bar Search",
    metaDescription: "Finbar is a Mac app for supercharged menu bar searching.",
    siteUrl: "https://finbarapp.com",
    gumroadId: "mgpnr",
    downloadName: "Finbar",
    support: {
      userGuideSections: [
        {
          title: "How Searching Works",
          body: String.raw`In Finbar, every item is matched by its title. Additionally, menu items below a certain depth are also matched by the title of the containing menu. This is similar to the way the built-in menu bar searching works.`,
        },
        {
          title: "Disabled Menu Items",
          body: String.raw`Finbar displays and allows the selection of disabled menu items, which will have a dimmed appearance.

The rationale to this is as follows: some apps disable some of their menu items when they lose keyboard focus. In other words, these menu items are disabled only while viewed in Finbar. They'll be re-enabled by the respective app once Finbar initiates a menu item click and deactivates. Thus, guarding against selection of disabled menu items means leaving out many that are perfectly valid.

Some menu items are disabled regardless of focus and will remain so after Finbar deactivates. Selecting them will trigger a system notification alerting you of this.`,
        },
        {
          title: "Searching vs. Browsing",
          body: String.raw`Finbar operates in two implicit "modes": searching and browsing. The app enters searching mode whenever you type something in the search field. Appropriately, you return to browsing mode by clearing the search field.

| Searching | Browsing |
|-----------|----------|
| Items are a flat list | Items are a browsable outline |
| Deeply nested menu items' titles are preceded by the parent's | All titles shown as they are |

When activating a "container" menu item, you enter a new, scoped context that can be further browsed or searched. The differences noted above still apply.`,
        },
        {
          title: "The Root Screen",
          body: String.raw`Another "mode" worth mentioning is Finbar's root mode. This is Finbar's initial state, and you return to it by clearing the search field completely. This mode is a combination of the two mentioned above. Here, deeply nested items in the Recents section have their title preceded by their parent's, and they are not browsable. However, items in the menu items section will be a browsable outline and have their title shown as is.`,
        },
        {
          title: "Using the Rule Editor",
          body: String.raw`Finbar's rule editor uses the Mac's **standard** rule editing component and thus works as you'd expect. For a primer on macOS rule editors, see [Apple's support article](https://support.apple.com/en-gb/guide/mac-help/mh15155/mac).

There are a few special considerations when matching by these Finbar-specific criteria:

1. *Menu item's path*: Path components should be separated with a backslash (\). **For example**, to exclude Safari's "View > Translation" menu item, specify the path as "View\Translation" without the quotes.
2. *Menu item's index*: The index refers to the menu item's position among its neighboring menu items inside a given menu. The first menu item in that menu has an index of 1. Separators between menu items count too. **For example**, to exclude Safari's "Edit > Cut" menu item, specify an index of 4.
3. *Menu item's depth*: Menu bar items have a depth of 0, and each submenu increases that depth by 1. **For example**, to exclude Safari's "File > Export > Bookmarks…" menu item, specify a depth of 2.`,
        },
        {
          title: "Command-line Interface",
          body: String.raw`Finbar includes an executable tool offering a command-line interface to some of its basic functionalities. It's located within the application bundle at **Finbar.app/Contents/MacOS/finbar-cli**. For usage instructions and help, run:

\`\`\`shell
finbar-cli -h
\`\`\``,
        },
        {
          title: "Adding Scripts",
          body: String.raw`Any valid script, that is, any text file with an interpreter directive ([shebang](https://en.wikipedia.org/wiki/Shebang_(Unix))) supported by your system, can be used to extend Finbar.

To add a script:

1. Create the following directory: **~/Library/Application Scripts/com.roeybiran.Finbar**.
2. Create a sub-folder named with the app's [bundle identifier](https://cocoacasts.com/what-are-app-ids-and-bundle-identifiers/). For example, a folder for scripts specific to Safari should have the following path: **~/Library/Application Scripts/com.roeybiran.Finbar/com.apple.Safari**.
3. Put your script inside the sub-folder you've just created. For example, a Safari-only AppleScript named "Close Tabs to the Right" should have the following path: **~/Library/Application Scripts/com.roeybiran.Finbar/com.apple.Safari/Close Tabs to the Right.scpt**.

Any scripts you add will be added to the search results on Finbar's next launch. To reload immediately, click the "Reload Scripts" menu item in the options menu.`,
        },
        {
          title: "Activating Programmatically",
          body: String.raw`It's possible to programmatically open Finbar without stealing focus from the frontmost application:

\`\`\`shell
open -ga Finbar
\`\`\`

A good use case for this is activating Finbar from automation tools such as [Karabiner-Elements](https://github.com/pqrs-org/Karabiner-Elements) or [BetterTouchTool](https://folivora.ai/).`,
        },
      ],
      troubleshootingSections: [
        {
          title: "If You Can't Find a Specific Menu Item",
          body: String.raw`First, try finding the desired menu item with the Mac's standard search feature. If that fails, it's likely that the app has a non-standard implementation of the menu bar. It would be best to report this to the app's developer, but you can also [submit an issue](https://github.com/roeybiran/finbar-issues/issues) and I'll try to find a workaround.

If you **can** find the item with the regular search feature, the problem is within Finbar and I'd appreciate it if you'd [submit an issue](https://github.com/roeybiran/finbar-issues/issues).`,
        },
        {
          title: "If Selecting a Menu Item Does Nothing",
          body: String.raw`First, find and **select with the keyboard** the desired menu item using the Mac's regular menu bar search feature. If this does nothing as well, the problem is most likely with the target app itself. Consider reporting this to that app's developer.

If selecting the item **does** work with the regular search feature, the problem lies within Finbar and/or the way it works with the other app. Please [submit an issue](https://github.com/roeybiran/finbar-issues/issues).`,
        },
      ],
      feedbackUrl: "https://github.com/roeybiran/finbar-issues/issues",
      issueTrackerUrl: "https://github.com/roeybiran/finbar-issues/issues",
      contactLinks,
    },
  },
  syphon: {
    slug: "syphon",
    name: "Syphon",
    tagline: "Fuzzy App Switching",
    metaDescription:
      "Syphon is an application and window switcher designed for keyboard enthusiasts.",
    siteUrl: "https://syphonapp.com",
    gumroadId: "inkolq",
    downloadName: "Syphon",
    support: {
      userGuideSections: [
        {
          title: "Item Actions",
          body: String.raw`| Keyboard Shortcut | Selected Item | Action |
| ----------------- | ------------- | ------ |
| ⇧⌘Q | Running App | Quits the app |
| ⇧⌘H | Running App | Hides or unhides the app |
| ⇧⌘W | Window | Closes the window |
| ⇧⌘M | Window | Minimizes or un-minimizes the window |`,
        },
        {
          title: "Rules",
          body: String.raw`Rules allow you to alter the order and appearance of apps.

- The "Tuck" rule removes an app from normal switching order, puts it in a dedicated group at the end of the list, and gives it a compact appearance.
- The "Exclude" rule removes an app from the switching list altogether, but it'll remain reachable through search.

Rules take effect only after a given app has been inactive for a short while.`,
        },
        {
          title: "Aliases",
          body: String.raw`Aliases allow you to override Syphon's default ranking and guarantee a given app will always appear at the top of the results.

The same alias can be defined for different apps. In that case, matching apps will be ranked according to the order of their respective aliases in settings, which can be changed through drag and drop.

**For example**, if you've defined the alias "f" for both Finder and FaceTime, and FaceTime is ordered first in settings, then it'll appear first in the search results, followed by Finder.`,
        },
      ],
      troubleshootingSections: [
        {
          title: "If Pressing Escape Doesn't Dismiss Syphon in macOS Tahoe",
          body: String.raw`A new system keyboard shortcut called "Game Overlay" was added in macOS Tahoe, and it's bound to <kbd>⌘</kbd><kbd>⎋</kbd> by default. If the modifier key you're using to activate Syphon is <kbd>⌘</kbd>, the new system shortcut might prevent Escape from dismissing Syphon.

To work around this, go to **System Settings > Keyboard > Keyboard Shortcuts…** and either untick "Game Overlay" or assign a different key combination to it.`,
        },
      ],
      feedbackUrl: "https://x.com/roeybiran",
      contactLinks,
    },
  },
} satisfies Record<ProductSlug, Product>;

export const featuredProducts = Object.values(products);

export function getProduct(slug: ProductSlug) {
  return products[slug];
}

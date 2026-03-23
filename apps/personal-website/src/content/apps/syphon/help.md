## User Guide

### Item Actions

| Keyboard Shortcut | Selected Item | Action                               |
| ----------------- | ------------- | ------------------------------------ |
| ⇧⌘Q               | Running App   | Quits the app                        |
| ⇧⌘H               | Running App   | Hides or unhides the app             |
| ⇧⌘W               | Window        | Closes the window                    |
| ⇧⌘M               | Window        | Minimizes or un-minimizes the window |

### Rules

Rules allow you to alter the order and appearance of apps.

- The "Tuck" rule removes an app from normal switching order, puts it in a dedicated group at the end of the list, and gives it a compact appearance.
- The "Exclude" rule removes an app from the switching list altogether (but it'll remain reachable through search).

Rules take effect only after a given app has been inactive for a short while.

### Aliases

Aliases allow you to override Syphon's default ranking and guarantee a given app will always appear at the top of the results.

The same alias can be defined for different apps — in that case, matching apps will be ranked according to the order of their respective aliases in settings, which can be changed through drag and drop.
**For example**, if you've defined the alias "f" for both Finder and FaceTime, and FaceTime is ordered first in settings, then it'll appear first in the search results too — followed by Finder.

## Troubleshooting

### If pressing Escape doesn't dismiss Syphon in macOS Tahoe

A new system keyboard shortcut called "Game Overlay" was added in macOS Tahoe, which is bound to <kbd>⌘</kbd><kbd>⎋</kbd> by default. If the modifier key you're using to activate Syphon is <kbd>⌘</kbd>, the new system shortcut might prevent Escape from dismissing Syphon. To work around this, go to "System Settings > Keyboard > Keyboard Shortcuts…", and untick "Game Overlay" shortcut, or assign a different key combination to it.

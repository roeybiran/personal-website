interface ViewTransition {
  finished: Promise<void>;
}

interface Document {
  startViewTransition?(
    updateCallback: () => Promise<void> | void,
  ): ViewTransition;
}

interface CSSStyleDeclaration {
  viewTransitionName: string;
}

interface HTMLElement {
  showPopover(): void;
  hidePopover(): void;
  togglePopover(force?: boolean): boolean;
}

interface ToggleEvent extends Event {
  oldState: "open" | "closed";
  newState: "open" | "closed";
}

interface HTMLElementEventMap {
  beforetoggle: ToggleEvent;
}

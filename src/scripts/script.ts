import { gsap } from "gsap";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";

gsap.registerPlugin(MorphSVGPlugin);

document.querySelectorAll(".project-card__button").forEach((button) => {
  button.addEventListener("click", (e) => {
    const dialog = (e.target as HTMLButtonElement).dataset.popup;
    if (!dialog) return;
    const popup = document.getElementById(dialog) as HTMLDialogElement;
    popup?.showModal();
  });
});

document.querySelectorAll(".project-card__close-button").forEach((button) => {
  button.addEventListener("click", (e) => {
    const dialog = (e.target as HTMLButtonElement).closest("dialog");
    dialog?.close();
  });
});

document.addEventListener("click", ({ target }) => {
  if (target instanceof HTMLDialogElement) target.close();
});

const tl = gsap.timeline({
  paused: true,
  defaults: {
    ease: "power1.inOut",
    duration: 0.3,
  },
});

document
  .querySelectorAll("[data-js-app-nav-mobile-menu-button]")
  .forEach((button) => {
    const menu = button.parentElement?.querySelector("[data-js-mobile-menu]");
    if (!menu || !(menu instanceof HTMLDivElement)) return;
    const links = menu.querySelectorAll("[data-js-mobile-menu-link]");

    gsap.set(menu, {
      scaleY: 0,
      autoAlpha: 0,
    });
    gsap.set(links, {
      opacity: 0,
    });

    tl.to(menu, {
      autoAlpha: 1,
      duration: 0,
    })
      .to(menu, {
        scaleY: 1,
      })
      .to(links, {
        opacity: 1,
        stagger: 0.05,
      });

    button.addEventListener("click", () => {
      const previousIsExpanded = menu.getAttribute("aria-expanded") === "true";
      menu.setAttribute("aria-expanded", previousIsExpanded ? "false" : "true");
      const newIsExpanded = !previousIsExpanded;

      if (newIsExpanded) {
        tl.play();
      } else {
        tl.reverse();
      }
      gsap.to("#chevron-down", {
        duration: 0.3,
        morphSVG: newIsExpanded ? "#chevron-up" : "#chevron-down",
      });
    });
  });

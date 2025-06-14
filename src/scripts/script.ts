import { gsap } from "gsap";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";

gsap.registerPlugin(MorphSVGPlugin);

document
  .querySelectorAll("[data-js-app-nav-mobile-menu-button]")
  .forEach((button) => {
    const menu = button.parentElement?.querySelector("[data-js-mobile-menu]");
    if (!menu || !(menu instanceof HTMLDivElement)) return;
    const links = menu.querySelectorAll("[data-js-mobile-menu-link]");

    const tl = gsap.timeline({
      paused: true,
      defaults: {
        ease: "power1.inOut",
        duration: 0.3,
      },
    });

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

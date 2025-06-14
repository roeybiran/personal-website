import { gsap } from "gsap";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";

gsap.registerPlugin(MorphSVGPlugin);

const cards = document.querySelectorAll(".project-card");

cards.forEach((card) => {
  const button = card.querySelector(
    ".project-card__button"
  ) as HTMLButtonElement;
  const media = card.querySelector(".project-card__media") as HTMLDivElement;
  const popup = card.querySelector(".project-card__popup") as HTMLDivElement;
  card.ariaExpanded = "false";

  gsap.set(popup, {
    autoAlpha: 0,
  });

  gsap.set(button, {
    rotate: 0,
  });

  const tl = gsap
    .timeline({
      paused: true,
      defaults: {
        ease: "power1.inOut",
        duration: 0.3,
      },
    })
    .to(popup, {
      autoAlpha: 1,
    })
    .to(
      media,
      {
        borderRadius: "var(--card-radius) var(--card-radius) 0 0",
      },
      "<"
    )
    .to(
      `.projects-grid__section > *:not(#${card.id})`,
      {
        filter: "blur(10px)",
      },
      "<"
    )
    .to(button, {
      rotate: -45,
    }, "<")

  button.addEventListener("click", (e) => {
    const previousIsExpanded = button.ariaExpanded === "true";
    button.ariaExpanded = previousIsExpanded ? "false" : "true";
    const newIsExpanded = !previousIsExpanded;

    if (newIsExpanded) {
      tl.play();
    } else {
      tl.reverse();
    }
  });
});

document.querySelectorAll(".project-card__close-button").forEach((button) => {
  button.addEventListener("click", (e) => {
    // dialog?.close();
  });
});

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

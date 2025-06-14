import { gsap } from "gsap";

const cards = document.querySelectorAll(".project-card");

cards.forEach((card) => {
  const button = card.querySelector(
    ".project-card__button"
  ) as HTMLButtonElement;
  const svg = button.querySelector("svg") as SVGSVGElement;
  const media = card.querySelector(".project-card__media") as HTMLDivElement;
  const popup = card.querySelector(".project-card__popup") as HTMLDivElement;
  card.ariaExpanded = "false";

  gsap.set(popup, {
    autoAlpha: 0,
  });

  gsap.set(svg, {
    rotate: 0,
  });

  const tl = gsap
    .timeline({
      paused: true,
      defaults: {
        ease: "power1.inOut",
        duration: 0.2,
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
        pointerEvents: "none",
      },
      "<"
    )
    .to(
      svg,
      {
        rotate: -45,
      },
      "<"
    );

  const closer = (e: MouseEvent) => {
    if (!card.contains(e.target as Node)) {
      button.ariaExpanded = "false";
      tl.reverse();
    }
  };

  const escCloser = (e: KeyboardEvent) => {
    if (e.key === "Escape" && button.ariaExpanded === "true") {
      button.ariaExpanded = "false";
      tl.reverse();
    }
  };

  button.addEventListener("click", () => {
    const previousIsExpanded = button.ariaExpanded === "true";
    button.ariaExpanded = previousIsExpanded ? "false" : "true";
    const newIsExpanded = !previousIsExpanded;

    if (newIsExpanded) {
      tl.play();
      document.addEventListener("click", closer);
      document.addEventListener("keydown", escCloser);
    } else {
      tl.reverse();
      document.removeEventListener("click", closer);
      document.removeEventListener("keydown", escCloser);
    }
  });

});



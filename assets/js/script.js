// async function fetchGumroadData(gumroadID) {
//   const {
//     product: { formatted_price: price, short_url: purchaseURL },
//   } = await fetch(`https://api.gumroad.com/v2/products/${gumroadID}`, {
//     headers: {
//       Authorization: `Bearer ${WP.gumroad_access_token}`,
//     },
//   }).then((v) => v.json());
//   return  { price, purchaseURL }
// }

// document.querySelectorAll('[data-js-buy]').forEach(async el => {
//   const result = await fetchGumroadData(el.dataset.jsBuy);
//   el.querySelector('[data-js-price]').innerText = result.price;
// })

// const observer = new IntersectionObserver((entries) => {
//   const nav = document.querySelector('.page-projects__nav');
//   entries.forEach(({ target, isIntersecting, intersectionRatio, boundingClientRect }, i) => {
//     target.dataset.jsIntersecting = isIntersecting;
//     const anchor = nav.querySelector(`[href="#${target.id}"]`);
//     if (anchor) {
//       anchor.dataset.jsIntersecting = isIntersecting;
//     }
//   });
// });

// document.querySelectorAll('[data-js-projects-section]').forEach((el) => {
//   observer.observe(el);
// });

document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('nav a');

  const observer = new IntersectionObserver(
    (entries) => {
      const visibleSections = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => a.target.offsetTop - b.target.offsetTop);

      if (visibleSections.length) {
        navLinks.forEach((link) => (link.dataset.jsIntersecting = false));
        const firstVisibleSection = visibleSections[0].target.id;
        document.querySelector(
          `nav a[href="#${firstVisibleSection}"]`,
        ).dataset.jsIntersecting = true;
      }
    },
    { threshold: [0.1, 0.5] },
  );

  sections.forEach((section) => observer.observe(section));
});

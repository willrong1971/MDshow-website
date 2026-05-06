(function () {
  const header = document.querySelector("[data-header]");
  const navLinks = Array.from(document.querySelectorAll(".site-nav a, .guide-nav a"));
  const targets = navLinks
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  function setHeaderState() {
    header.classList.toggle("is-scrolled", window.scrollY > 24);
  }

  function setActiveLink(id) {
    navLinks.forEach((link) => {
      const isActive = link.getAttribute("href") === `#${id}`;
      link.classList.toggle("is-active", isActive);
    });
  }

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible) {
          setActiveLink(visible.target.id);
        }
      },
      {
        rootMargin: "-32% 0px -58% 0px",
        threshold: [0.08, 0.18, 0.32]
      }
    );

    targets.forEach((target) => observer.observe(target));
  }

  setHeaderState();
  window.addEventListener("scroll", setHeaderState, { passive: true });
})();

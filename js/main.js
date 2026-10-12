document.addEventListener("DOMContentLoaded", () => {

  /* ============================================================
     MOBILE MENU — .mnav structure
     ============================================================ */
  const toggle = document.getElementById("navToggle");
  const mnav   = document.getElementById("mnav");

  if (toggle && mnav) {

    const openMenu = () => {
      mnav.classList.add("is-open");
      mnav.setAttribute("aria-hidden", "false");
      toggle.setAttribute("aria-expanded", "true");
      document.body.style.overflow = "hidden";
    };

    const closeMenu = () => {
      mnav.classList.remove("is-open");
      mnav.setAttribute("aria-hidden", "true");
      toggle.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
    };

    toggle.addEventListener("click", (e) => {
      e.stopPropagation();
      mnav.classList.contains("is-open") ? closeMenu() : openMenu();
    });

    /* close on any [data-close] element */
    mnav.querySelectorAll("[data-close]").forEach((el) => {
      el.addEventListener("click", closeMenu);
    });

    /* close on link tap */
    mnav.querySelectorAll(".mnav-link").forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    /* Escape */
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && mnav.classList.contains("is-open")) {
        closeMenu();
      }
    });

    /* resize to desktop */
    window.addEventListener("resize", () => {
      if (window.innerWidth > 900 && mnav.classList.contains("is-open")) {
        closeMenu();
      }
    });
  }

  /* ============================================================
     SCROLL REVEAL
     ============================================================ */
  const revealElements = document.querySelectorAll(".reveal");

  if (revealElements.length && "IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.18, rootMargin: "0px 0px -60px 0px" });
    revealElements.forEach((el) => observer.observe(el));
  } else {
    revealElements.forEach((el) => el.classList.add("is-visible"));
  }

  /* ============================================================
     404 PAGE
     ============================================================ */
  if (document.body.classList.contains("page-404")) {
    document.body.classList.add("is-loaded");
  }


    /* ============================================================
     TESTIMONIALS SIGNATURE WALL — duplicate cards for seamless loop
     ============================================================ */
  (function () {
    const track = document.getElementById("signatureTrack");
    if (!track) return;

    /* Duplicate all cards once, so the marquee loops smoothly */
    const originalCards = Array.from(track.children);
    originalCards.forEach((card) => {
      const clone = card.cloneNode(true);
      clone.setAttribute("aria-hidden", "true");
      track.appendChild(clone);
    });
  })();

});
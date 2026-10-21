document.addEventListener("DOMContentLoaded", () => {

  /* ============================================================
     MOBILE MENU — OPEN/CLOSE
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

    mnav.querySelectorAll("[data-close]").forEach((el) => {
      el.addEventListener("click", closeMenu);
    });

    // Close on link tap
    mnav.querySelectorAll(".mnav-link:not(.has-sub)").forEach((link) => {
      link.addEventListener("click", closeMenu);
    });
    
    // Close if clicking a sub-link
    mnav.querySelectorAll(".mnav-sub-list a").forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && mnav.classList.contains("is-open")) {
        closeMenu();
      }
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 900 && mnav.classList.contains("is-open")) {
        closeMenu();
      }
    });
  }

    /* ============================================================
     MOBILE SUB-MENU TOGGLE
     ============================================================ */
  const dropdownButtons = document.querySelectorAll('.mnav-toggle-icon');

  dropdownButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault(); 
      e.stopPropagation(); 
      
      const parentItem = button.closest('.mnav-item-parent');
      
      // Close others
      document.querySelectorAll('.mnav-item-parent').forEach(item => {
        if (item !== parentItem) item.classList.remove('is-active');
      });
      
      // Toggle current
      parentItem.classList.toggle('is-active');
    });
  });


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
     TESTIMONIALS SIGNATURE WALL
     ============================================================ */
  (function () {
    const track = document.getElementById("signatureTrack");
    if (!track) return;

    const originalCards = Array.from(track.children);
    originalCards.forEach((card) => {
      const clone = card.cloneNode(true);
      clone.setAttribute("aria-hidden", "true");
      track.appendChild(clone);
    });
  })();


    /* ============================================================
     FEATURE VIDEO PLAYER
     ============================================================ */
  const videoWrapper = document.querySelector('.video-wrapper');
  const videoPlayer = document.getElementById('featureVideo');
  const videoOverlay = document.getElementById('videoPlayOverlay');

  if (videoWrapper && videoPlayer && videoOverlay) {
    // Click overlay to play
    videoOverlay.addEventListener('click', () => {
      videoWrapper.classList.add('is-playing');
      videoPlayer.play();
    });

    // Click video to play/pause
    videoPlayer.addEventListener('click', () => {
      if (videoPlayer.paused) {
        videoWrapper.classList.add('is-playing');
        videoPlayer.play();
      } else {
        videoPlayer.pause();
      }
    });

    // Pause event shows the overlay again (if they used native controls)
    videoPlayer.addEventListener('pause', () => {
      if (!videoPlayer.ended) {
        videoWrapper.classList.remove('is-playing');
      }
    });
  }

});
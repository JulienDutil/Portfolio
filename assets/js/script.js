// Reveal on scroll
const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealElements.forEach(el => revealObserver.observe(el));
} else {
  revealElements.forEach(el => el.classList.add("visible"));
}

// Accordion logic with smooth slide
document.querySelectorAll(".project-accordion").forEach(item => {
  const header = item.querySelector(".accordion-header");
  const body = item.querySelector(".accordion-body");
  if (!header || !body) return;

  // Ensure closed state
  body.style.maxHeight = "0px";

  header.addEventListener("click", () => {
    const isOpen = item.classList.contains("open");

    if (isOpen) {
      body.style.maxHeight = "0px";
      item.classList.remove("open");
    } else {
      body.style.maxHeight = body.scrollHeight + "px";
      item.classList.add("open");
    }
  });
});

// Featured cards scroll to corresponding accordion
document.querySelectorAll(".featured-card").forEach(card => {
  card.addEventListener("click", () => {
    const targetKey = card.getAttribute("data-target");
    if (!targetKey) return;

    const targetAccordion = document.querySelector(
      `.project-accordion[data-project-id="${targetKey}"]`
    );
    if (!targetAccordion) return;

    const body = targetAccordion.querySelector(".accordion-body");
    if (!body) return;

    // Open it if not already
    const isOpen = targetAccordion.classList.contains("open");
    if (!isOpen) {
      targetAccordion.classList.add("open");
      body.style.maxHeight = body.scrollHeight + "px";
    }

    const rect = targetAccordion.getBoundingClientRect();
    const offset = window.scrollY + rect.top - 90;

    window.scrollTo({
      top: offset,
      behavior: "smooth"
    });
  });
});

// Language toggle logic
const langToggle = document.getElementById("lang-toggle");
const bodyEl = document.body;

const savedLang = localStorage.getItem("lang") || "en";
if (savedLang === "fr") {
  bodyEl.classList.add("lang-fr-active");
}

if (langToggle) {
  langToggle.addEventListener("click", () => {
    bodyEl.classList.toggle("lang-fr-active");
    const lang = bodyEl.classList.contains("lang-fr-active") ? "fr" : "en";
    localStorage.setItem("lang", lang);
  });
}

// Horizontal timeline scroll with mouse wheel
const timeline = document.querySelector(".timeline-horizontal");
if (timeline) {
  timeline.addEventListener("wheel", e => {
    if (e.deltaY === 0) return;
    e.preventDefault();
    timeline.scrollLeft += e.deltaY * 0.6;
  });
}

// Lightbox for gallery thumbnails
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const lightboxBackdrop = lightbox ? lightbox.querySelector(".lightbox-backdrop") : null;

function openLightbox(src, alt) {
  if (!lightbox || !lightboxImg) return;
  lightboxImg.src = src;
  lightboxImg.alt = alt || "";
  lightbox.classList.add("visible");
}

function closeLightbox() {
  if (!lightbox || !lightboxImg) return;
  lightbox.classList.remove("visible");
  lightboxImg.src = "";
  lightboxImg.alt = "";
}

document.querySelectorAll(".project-thumb").forEach(img => {
  img.addEventListener("click", () => {
    const fullSrc = img.getAttribute("data-full") || img.src;
    const alt = img.alt || "";
    openLightbox(fullSrc, alt);
  });
});

if (lightboxBackdrop) {
  lightboxBackdrop.addEventListener("click", closeLightbox);
}

if (lightbox) {
  lightbox.addEventListener("click", e => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });
}

document.addEventListener("keydown", e => {
  if (e.key === "Escape") {
    closeLightbox();
  }
});

// Footer year
const yearSpan = document.getElementById("year");
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

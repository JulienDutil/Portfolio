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

// Accordion logic
document.querySelectorAll(".project-accordion").forEach(item => {
  const header = item.querySelector(".accordion-header");
  if (!header) return;

  header.addEventListener("click", () => {
    item.classList.toggle("open");
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

    // Open it if not already
    if (!targetAccordion.classList.contains("open")) {
      targetAccordion.classList.add("open");
    }

    const rect = targetAccordion.getBoundingClientRect();
    const offset = window.scrollY + rect.top - 90;

    window.scrollTo({
      top: offset,
      behavior: "smooth"
    });
  });
});

// Language toggle logic - hard EN/FR switch
const langToggle = document.getElementById("lang-toggle");
const body = document.body;

const savedLang = localStorage.getItem("lang") || "en";
if (savedLang === "fr") {
  body.classList.add("lang-fr-active");
}

if (langToggle) {
  langToggle.addEventListener("click", () => {
    body.classList.toggle("lang-fr-active");
    const lang = body.classList.contains("lang-fr-active") ? "fr" : "en";
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

// Lightbox for project images
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");

if (lightbox && lightboxImg) {
  document.querySelectorAll(".project-thumb").forEach(thumb => {
    thumb.addEventListener("click", () => {
      const fullSrc = thumb.getAttribute("data-full") || thumb.src;
      lightboxImg.src = fullSrc;
      lightbox.classList.add("visible");
    });
  });

  const closeLightbox = () => {
    lightbox.classList.remove("visible");
    lightboxImg.src = "";
  };

  lightbox.addEventListener("click", closeLightbox);

  document.addEventListener("keydown", e => {
    if (e.key === "Escape" && lightbox.classList.contains("visible")) {
      closeLightbox();
    }
  });
}

// Footer year
const yearSpan = document.getElementById("year");
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

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

//Dynamic Header
const header = document.querySelector('.site-header');
const aboutSection = document.querySelector('#about');

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  const aboutBottom =
    aboutSection.offsetTop + aboutSection.offsetHeight;

  // Collapse header after small scroll
  if (scrollY > 60) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }

  // Hide header completely past About section
  if (scrollY > aboutBottom) {
    header.classList.add('hidden');
  } else {
    header.classList.remove('hidden');
  }
});

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

// Language toggle logic
const langToggle = document.getElementById("lang-toggle");
const body = document.body;

const savedLang = localStorage.getItem("lang") || "en";
if (savedLang === "fr") {
  body.classList.add("lang-fr-active");
} else {
  body.classList.remove("lang-fr-active");
}

function updateLangToggleLabel() {
  const isFrench = body.classList.contains("lang-fr-active");
  langToggle.textContent = isFrench ? "EN" : "FR";
}

if (langToggle) {
  updateLangToggleLabel();

  langToggle.addEventListener("click", () => {
    body.classList.toggle("lang-fr-active");

    const lang = body.classList.contains("lang-fr-active") ? "fr" : "en";
    localStorage.setItem("lang", lang);

    updateLangToggleLabel();
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

// Footer year
const yearSpan = document.getElementById("year");
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

// Lightbox for project images
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
}

// Attach events to thumbnails
document.querySelectorAll(".project-thumb").forEach(img => {
  img.addEventListener("click", () => {
    const full = img.getAttribute("data-full") || img.src;
    const alt = img.alt || "";
    openLightbox(full, alt);
  });
});

if (lightboxBackdrop && lightbox) {
  lightboxBackdrop.addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", e => {
    if (e.target === lightbox) closeLightbox();
  });
}

document.addEventListener("keydown", e => {
  if (e.key === "Escape") {
    closeLightbox();
  }
});
 

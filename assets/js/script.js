// Smooth scroll for internal links
document.addEventListener("click", function (e) {
  const link = e.target.closest('a[href^="#"]');
  if (!link) return;

  const targetId = link.getAttribute("href");
  if (!targetId || targetId === "#") return;

  const target = document.querySelector(targetId);
  if (!target) return;

  e.preventDefault();
  const top = target.getBoundingClientRect().top + window.scrollY - 80;

  window.scrollTo({
    top,
    behavior: "smooth"
  });
});

// Reveal on scroll
const revealEls = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12
    }
  );

  revealEls.forEach((el) => observer.observe(el));
} else {
  // Fallback
  revealEls.forEach((el) => el.classList.add("visible"));
}

// Project cards jump to detailed section
document.querySelectorAll(".project-card").forEach((card) => {
  card.addEventListener("click", () => {
    const targetSelector = card.getAttribute("data-target");
    if (!targetSelector) return;
    const target = document.querySelector(targetSelector);
    if (!target) return;

    const top = target.getBoundingClientRect().top + window.scrollY - 80;

    window.scrollTo({
      top,
      behavior: "smooth"
    });
  });
});

// Footer year
const yearSpan = document.getElementById("year");
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}


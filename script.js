// SECTION: Utilities
function smoothScrollTo(targetSelector) {
  const target = document.querySelector(targetSelector);
  if (!target) return;
  const y = target.getBoundingClientRect().top + window.scrollY - 80;
  window.scrollTo({ top: y, behavior: "smooth" });
}

// SECTION: Navigation
const navToggle = document.querySelector(".nav-toggle");
const navList = document.querySelector(".nav-list");

if (navToggle && navList) {
  navToggle.addEventListener("click", () => {
    const isExpanded = navToggle.getAttribute("aria-expanded") === "true";
    navToggle.setAttribute("aria-expanded", String(!isExpanded));
    navList.classList.toggle("is-open");
  });

  navList.addEventListener("click", (event) => {
    const link = event.target.closest("a");
    if (!link) return;
    // Close mobile menu after selection
    if (window.innerWidth <= 768) {
      navList.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    }
  });
}

// SECTION: Smooth scroll for in-page links and CTAs
document.addEventListener("click", (event) => {
  const trigger = event.target.closest("a[href^='#'], [data-scroll-target]");
  if (!trigger) return;

  const explicitTarget = trigger.getAttribute("data-scroll-target");
  const hrefTarget = trigger.getAttribute("href");
  const targetSelector = explicitTarget || hrefTarget;

  if (!targetSelector || targetSelector === "#") return;

  const targetElement = document.querySelector(targetSelector);
  if (!targetElement) return;

  event.preventDefault();
  smoothScrollTo(targetSelector);
});

// SECTION: Footer year
const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = String(new Date().getFullYear());
}

// SECTION: Contact form (demo only)
const contactForm = document.querySelector(".contact-form");

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const button = contactForm.querySelector("button[type='submit']");
    const originalText = button ? button.textContent : "";
    if (button) {
      button.disabled = true;
      button.textContent = "Sending...";
    }

    // Simple simulated submit
    setTimeout(() => {
      if (button) {
        button.disabled = false;
        button.textContent = originalText || "Send request";
      }
      contactForm.reset();
      alert("Thanks for reaching out! We will get back to you within one business day.");
    }, 900);
  });
}


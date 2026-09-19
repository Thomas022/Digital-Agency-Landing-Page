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

// SECTION: Contact form (EmailJS)
const contactForm = document.querySelector(".contact-form");
const emailjsConfig = {
  publicKey: "lDCksyLUUsAu7SI8U",
  serviceId: "service_mmi0x1c",
  templateId: "template_au9cyvb",
};

if (contactForm) {
  let isSending = false;
  const formStatus = contactForm.querySelector(".form-status");

  contactForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (isSending || !contactForm.reportValidity()) return;

    const button = contactForm.querySelector("button[type='submit']");
    const originalText = button ? button.textContent : "";
    isSending = true;
    contactForm.setAttribute("aria-busy", "true");
    if (formStatus) formStatus.textContent = "Enviando sua solicitação...";
    if (button) {
      button.disabled = true;
      button.textContent = "Enviando...";
    }

    try {
      if (typeof window.emailjs?.sendForm !== "function") {
        throw new Error("A biblioteca EmailJS não carregou. Verifique a conexão e o acesso ao CDN.");
      }

      // Os atributos name do HTML devem corresponder às variáveis do template.
      await window.emailjs.sendForm(emailjsConfig.serviceId, emailjsConfig.templateId, contactForm, {
        publicKey: emailjsConfig.publicKey,
      });
      contactForm.reset();
      if (formStatus) formStatus.textContent = "Obrigado pelo contato! Responderemos em até um dia útil.";
    } catch (error) {
      console.error("Erro ao enviar pelo EmailJS:", {
        status: error?.status,
        text: error?.text || error?.message || String(error),
      });
      if (formStatus) {
        formStatus.textContent = typeof window.emailjs?.sendForm !== "function"
          ? "Não foi possível carregar o serviço de envio. Recarregue a página e tente novamente."
          : "Não foi possível enviar sua solicitação. Seus dados foram mantidos; tente novamente em instantes.";
      }
    } finally {
      isSending = false;
      contactForm.setAttribute("aria-busy", "false");
      if (button) {
        button.disabled = false;
        button.textContent = originalText || "Enviar solicitação";
      }
    }
  });
}

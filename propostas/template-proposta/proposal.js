// SECTION: Menu móvel — abre por toque e fecha por link, Escape, clique externo ou mudança de largura.
const menuToggle = document.querySelector('.menu-toggle');
const proposalNavigation = document.querySelector('#proposal-navigation');
function setMenuOpen(open) {
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
  proposalNavigation.classList.toggle('is-open', open);
}
menuToggle.addEventListener('click', () => setMenuOpen(menuToggle.getAttribute('aria-expanded') !== 'true'));
proposalNavigation.addEventListener('click', event => {
  if (event.target.closest('a')) setMenuOpen(false);
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menuToggle.getAttribute('aria-expanded') === 'true') {
    setMenuOpen(false);
    menuToggle.focus();
  }
});
document.addEventListener('click', event => {
  if (!event.target.closest('.topbar')) setMenuOpen(false);
});
window.matchMedia('(max-width: 900px)').addEventListener('change', () => setMenuOpen(false));

// SECTION: Exportação — abre a caixa nativa para imprimir ou salvar a proposta em PDF.
document.querySelectorAll("[data-print]").forEach((button) => {
  button.addEventListener("click", () => window.print());
});

// SECTION: Data — mantém o ano do rodapé atualizado automaticamente.
document.querySelectorAll("[data-year]").forEach((element) => {
  element.textContent = new Date().getFullYear();
});

// SECTION: Apresentação — revela blocos conforme entram na tela e respeita redução de movimento.
const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.12 }
  );

  revealElements.forEach((element) => observer.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add("visible"));
}

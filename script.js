// SECTION: Utilities
function smoothScrollTo(targetSelector) {
  const target = document.querySelector(targetSelector);
  if (!target) return;
  const y = target.getBoundingClientRect().top + window.scrollY - 80;
  window.scrollTo({ top: y, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
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

// Demonstração local: dados fictícios, sem conexões com sistemas de clientes.
const demoData = {
  orders: [['Pedido #1042', 'Em análise'], ['Pedido #1043', 'Aprovado'], ['Pedido #1044', 'Concluído']],
  clients: [['Cliente Aurora', 'Ativo'], ['Cliente Horizonte', 'Em implantação'], ['Cliente Norte', 'Ativo']],
  reports: [['Pedidos neste mês', '128'], ['Processos automatizados', '8'], ['Integrações conectadas', '4']]
};
let activeModule = 'orders';
const search = document.getElementById('demo-search');
function renderDemo() {
  const results = document.getElementById('demo-results');
  results.replaceChildren();
  const query = search.value.toLocaleLowerCase('pt-BR').trim();
  const rows = demoData[activeModule].filter(row => row.join(' ').toLocaleLowerCase('pt-BR').includes(query));
  for (const row of rows) {
    const item = document.createElement('div'); item.className = 'demo-row';
    for (const value of row) { const cell = document.createElement('span'); cell.textContent = value; item.append(cell); }
    results.append(item);
  }
  if (!rows.length) results.textContent = 'Nenhum resultado. Tente outro termo.';
}
document.querySelectorAll('[data-module]').forEach(button => button.addEventListener('click', () => {
  activeModule = button.dataset.module; search.value = '';
  document.querySelectorAll('[data-module]').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
  renderDemo();
}));
search.addEventListener('input', renderDemo); renderDemo();
const opportunities = [
 ['Comece pelas tarefas repetitivas', 'Centralize solicitações e automatize a classificação de pedidos para reduzir redigitação e retrabalho.'],
 ['Integre a operação de ponta a ponta', 'Conecte CRM, estoque e financeiro. O impacto pode ser alto, mas exige planejamento das integrações e qualidade dos dados.'],
 ['Simplifique a rotina de acompanhamento', 'Reúna os indicadores já disponíveis em um resumo periódico para reduzir consultas e reuniões de atualização.'],
 ['Valide antes de investir', 'Um portal completo pode exigir mais esforço do que o retorno inicial justifica. Teste a necessidade com um piloto menor.']
];
document.querySelectorAll('[data-opportunity]').forEach(button => button.addEventListener('click', () => {
 const [title, description] = opportunities[Number(button.dataset.opportunity)];
 document.querySelector('#opportunity-detail h3').textContent = title;
 document.querySelector('#opportunity-detail p').textContent = description;
 document.querySelectorAll('[data-opportunity]').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
}));
const diagnostic = document.getElementById('diagnostic');
let diagnosticSummary = '';
diagnostic.addEventListener('submit', event => {
 event.preventDefault(); if (!diagnostic.reportValidity()) return;
 const recommendations = { manual: 'Automação de tarefas repetitivas', systems: 'Integração entre sistemas', data: 'Centralização de dados e indicadores', service: 'Triagem assistida de atendimento' };
 const hours = Number(document.getElementById('hours').value);
 const readiness = document.getElementById('readiness').value;
 const next = readiness === 'ready' ? 'Comece com um piloto em um único processo e meça o resultado antes de ampliar.' : 'Comece organizando e padronizando os dados antes de automatizar o processo.';
 diagnosticSummary = 'Ponto de partida: ' + recommendations[document.getElementById('bottleneck').value] + '. Carga informada: ' + hours + ' horas por semana. ' + next + ' Esta orientação não estima economia nem substitui uma avaliação técnica.';
 const result = document.getElementById('diagnostic-result'); result.textContent = diagnosticSummary; result.hidden = false;
 document.getElementById('use-diagnostic').hidden = false; result.focus();
});
diagnostic.addEventListener('input', () => { diagnosticSummary = ''; document.getElementById('diagnostic-result').hidden = true; document.getElementById('use-diagnostic').hidden = true; });
document.getElementById('use-diagnostic').addEventListener('click', () => {
 const message = document.getElementById('message');
 if (!message.value.includes(diagnosticSummary)) message.value = [message.value, diagnosticSummary].filter(Boolean).join('\n\n');
 smoothScrollTo('#contact'); message.focus({preventScroll: true});
});
const serviceMenu = document.querySelector('.service-menu');
document.addEventListener('click', event => { if (!serviceMenu.contains(event.target) || event.target.closest('.service-dropdown a')) serviceMenu.open = false; });
document.addEventListener('keydown', event => { if (event.key === 'Escape') { if (serviceMenu.open) { serviceMenu.open = false; serviceMenu.querySelector('summary').focus(); } if (navList.classList.contains('is-open')) { navList.classList.remove('is-open'); navToggle.setAttribute('aria-expanded', 'false'); navToggle.focus(); } } });

const guidedStories = {
 rework: [
  ['A solicitação chega.', 'Um pedido chega por e-mail. Alguém precisa ler, conferir e copiar as informações para uma planilha.', 'E-mail', 'Digitação manual', 'A mesma informação passa por várias mãos.'],
  ['Os dados ganham estrutura.', 'A automação extrai os campos do pedido e verifica o que está faltando. Casos incompletos seguem para revisão humana.', 'Pedido recebido', 'Dados validados', 'A equipe revisa as exceções, sem redigitar tudo.'],
  ['A equipe decide e acompanha.', 'O pedido organizado fica disponível no sistema, com responsável e status. A equipe acompanha o andamento em um só lugar.', 'Pedido organizado', 'Próxima ação', 'Menos cópias manuais e mais rastreabilidade.']
 ],
 systems: [
  ['A venda é registrada.', 'Uma venda entra no CRM, mas estoque e financeiro ainda precisam receber as mesmas informações separadamente.', 'CRM', 'Repasse manual', 'Ferramentas isoladas deixam a operação esperando.'],
  ['Os sistemas se conectam.', 'Uma integração envia os dados da venda ao estoque e ao financeiro, com regras de validação e registro de falhas.', 'CRM', 'Estoque + financeiro', 'Cada área recebe os dados necessários ao seu trabalho.'],
  ['O andamento fica visível.', 'A equipe consulta o status do pedido e recebe alertas sobre pendências, sem precisar perguntar a cada departamento.', 'Status integrado', 'Equipe informada', 'Mais clareza sobre o que já aconteceu e o que falta fazer.']
 ],
 visibility: [
  ['As informações estão dispersas.', 'Para entender a operação, a equipe reúne planilhas, mensagens e relatórios de ferramentas diferentes.', 'Várias fontes', 'Conferência manual', 'Montar o relatório consome o tempo de analisar.'],
  ['Os indicadores se organizam.', 'Os dados relevantes são reunidos e padronizados. Cada indicador tem uma fonte e uma frequência de atualização definidas.', 'Dados dispersos', 'Visão centralizada', 'A equipe passa a consultar uma referência comum.'],
  ['As prioridades ficam claras.', 'Um painel destaca atrasos, volumes e pendências. A equipe identifica onde agir e acompanha a evolução dos indicadores.', 'Indicadores', 'Decisões informadas', 'Mais contexto para decidir o próximo passo.']
 ]
};
let guidedChallenge = 'rework';
let guidedIndex = 0;
function renderGuidedStory() {
 const story = guidedStories[guidedChallenge][guidedIndex];
 ['heading','description','source','destination','insight'].forEach((key,index) => { document.getElementById('guided-'+key).textContent = story[index]; });
 document.getElementById('guided-number').textContent = String(guidedIndex + 1).padStart(2,'0');
 document.getElementById('guided-phase').textContent = ['O ponto de partida','Como a EsseDe pode ajudar','O resultado na rotina'][guidedIndex];
 document.getElementById('guided-insight-label').textContent = ['O desafio','A mudança','O benefício'][guidedIndex];
 document.getElementById('guided-counter').textContent = (guidedIndex + 1) + ' de 3';
 document.getElementById('guided-prev').disabled = guidedIndex === 0;
 document.getElementById('guided-next').disabled = guidedIndex === 2;
 document.querySelectorAll('.guided-progress i').forEach((item,index) => item.classList.toggle('current', index === guidedIndex));
}
document.querySelectorAll('[data-challenge]').forEach(button => button.addEventListener('click', () => {
 guidedChallenge = button.dataset.challenge; guidedIndex = 0;
 document.querySelectorAll('[data-challenge]').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
 renderGuidedStory();
}));
document.getElementById('guided-prev').addEventListener('click', () => { guidedIndex = Math.max(0, guidedIndex - 1); renderGuidedStory(); });
document.getElementById('guided-next').addEventListener('click', () => { guidedIndex = Math.min(2, guidedIndex + 1); renderGuidedStory(); });

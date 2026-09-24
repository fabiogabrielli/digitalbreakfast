const siteHeader = document.getElementById('siteHeader');
const scrollProgress = document.getElementById('scrollProgress');

const onScroll = () => {
  const y = window.scrollY;
  siteHeader?.classList.toggle('bg-black/85', y > 24);
  siteHeader?.classList.toggle('backdrop-blur-xl', y > 24);
  siteHeader?.classList.toggle('border-white/10', y > 24);

  const doc = document.documentElement;
  const max = doc.scrollHeight - doc.clientHeight;
  const progress = max > 0 ? y / max : 0;
  if (scrollProgress) scrollProgress.style.transform = `scaleX(${progress})`;
};

window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

const translations = {
  pt: {
    htmlLang: 'pt-BR',
    title: 'IA & Seguros | E-book gratuito | Digital Breakfast',
    description: 'IA & Seguros — e-book gratuito da Digital Breakfast com dados, pesquisas e casos reais sobre inteligência artificial no mercado de seguros. Disponível em português, inglês e italiano.',
    backDesktop: 'Voltar ao site', backMobile: 'Voltar',
    badgeText: 'E-book gratuito · Digital Breakfast',
    heroTitle: 'IA & Seguros', heroSubtitle: 'A transformação que já começou.',
    heroDescription: 'Dados, pesquisas e casos reais sobre como a inteligência artificial está transformando seguradoras, corretoras, distribuição e a relação com o cliente.',
    pillNoSignup: 'Sem cadastro', pillFreeDownload: 'Download gratuito', pillLanguages: '3 idiomas', chooseLanguage: 'Escolher idioma',
    downloadEyebrow: 'Escolha seu idioma', downloadTitle: 'Leia na sua língua.',
    downloadCopy: 'O mesmo conteúdo completo está disponível em português, inglês e italiano. Escolha a versão e faça o download.',
    authorEyebrow: 'Sobre o autor',
    authorBio: 'Especialista em Strategy, Growth & AI para o mercado segurador. Founder da Digital Breakfast e criador das plataformas Rock Your Business e VVERIO.',
    authorQuote: '“A discussão sobre IA no seguro deixou de ser sobre quando a tecnologia chegará. Agora é sobre como transformá-la em capacidade real de negócio.”',
    authorCta: 'Conhecer a Digital Breakfast', rights: 'Todos os direitos reservados.'
  },
  en: {
    htmlLang: 'en',
    title: 'AI & Insurance | Free e-book | Digital Breakfast',
    description: 'AI & Insurance — a free Digital Breakfast e-book with data, research and real-world cases on artificial intelligence in insurance. Available in Portuguese, English and Italian.',
    backDesktop: 'Back to website', backMobile: 'Back',
    badgeText: 'Free e-book · Digital Breakfast',
    heroTitle: 'AI & Insurance', heroSubtitle: 'The transformation has already begun.',
    heroDescription: 'Data, research and real-world cases on how artificial intelligence is transforming insurers, brokers, distribution and customer relationships.',
    pillNoSignup: 'No registration', pillFreeDownload: 'Free download', pillLanguages: '3 languages', chooseLanguage: 'Choose language',
    downloadEyebrow: 'Choose your language', downloadTitle: 'Read it in your language.',
    downloadCopy: 'The complete e-book is available in Portuguese, English and Italian. Choose your version and download it for free.',
    authorEyebrow: 'About the author',
    authorBio: 'Strategy, Growth & AI specialist focused on the insurance industry. Founder of Digital Breakfast and creator of the Rock Your Business and VVERIO platforms.',
    authorQuote: '“The discussion about AI in insurance is no longer about when the technology will arrive. It is about how to turn it into a real business capability.”',
    authorCta: 'Discover Digital Breakfast', rights: 'All rights reserved.'
  },
  it: {
    htmlLang: 'it',
    title: 'IA & Assicurazioni | E-book gratuito | Digital Breakfast',
    description: 'IA & Assicurazioni — e-book gratuito di Digital Breakfast con dati, ricerche e casi reali sull’intelligenza artificiale nel settore assicurativo. Disponibile in portoghese, inglese e italiano.',
    backDesktop: 'Torna al sito', backMobile: 'Indietro',
    badgeText: 'E-book gratuito · Digital Breakfast',
    heroTitle: 'IA & Assicurazioni', heroSubtitle: 'La trasformazione è già iniziata.',
    heroDescription: 'Dati, ricerche e casi reali su come l’intelligenza artificiale sta trasformando compagnie, agenti, broker, distribuzione e relazione con il cliente.',
    pillNoSignup: 'Senza registrazione', pillFreeDownload: 'Download gratuito', pillLanguages: '3 lingue', chooseLanguage: 'Scegli la lingua',
    downloadEyebrow: 'Scegli la tua lingua', downloadTitle: 'Leggilo nella tua lingua.',
    downloadCopy: 'L’e-book completo è disponibile in portoghese, inglese e italiano. Scegli la versione e scaricala gratuitamente.',
    authorEyebrow: 'L’autore',
    authorBio: 'Specialista in Strategy, Growth & AI per il settore assicurativo. Founder di Digital Breakfast e creatore delle piattaforme Rock Your Business e VVERIO.',
    authorQuote: '“La discussione sull’IA nel settore assicurativo non riguarda più quando arriverà la tecnologia. Riguarda come trasformarla in una vera capacità di business.”',
    authorCta: 'Scopri Digital Breakfast', rights: 'Tutti i diritti riservati.'
  }
};

const translatableIds = [
  'backDesktop','backMobile','badgeText','heroTitle','heroSubtitle','heroDescription',
  'pillNoSignup','pillFreeDownload','pillLanguages','chooseLanguage','downloadEyebrow',
  'downloadTitle','downloadCopy','authorEyebrow','authorBio','authorQuote','authorCta'
];

const metaDescription = document.querySelector('meta[name="description"]');
let currentLanguage = 'pt';

function normalizeLanguage(lang) {
  const value = String(lang || '').toLowerCase().split('-')[0];
  return translations[value] ? value : 'pt';
}

function applyLanguage(lang, updateUrl = false) {
  const normalized = normalizeLanguage(lang);
  const t = translations[normalized];
  currentLanguage = normalized;

  document.documentElement.lang = t.htmlLang;
  document.title = t.title;
  if (metaDescription) metaDescription.setAttribute('content', t.description);

  translatableIds.forEach((id) => {
    const el = document.getElementById(id);
    if (el && t[id] !== undefined) el.textContent = t[id];
  });

  const footer = document.getElementById('footerRights');
  if (footer) footer.innerHTML = `© <span id="year">${new Date().getFullYear()}</span> Digital Breakfast. ${t.rights}`;

  document.querySelectorAll('[data-lang-switch]').forEach((button) => {
    const active = button.dataset.langSwitch === normalized;
    button.classList.toggle('is-active', active);
    button.setAttribute('aria-pressed', active ? 'true' : 'false');
  });

  if (updateUrl) {
    const url = new URL(window.location.href);
    url.searchParams.set('lang', normalized);
    window.history.replaceState({}, '', url);
  }
}

const initialParams = new URLSearchParams(window.location.search);
const requestedLanguage = initialParams.get('lang');
const browserLanguage = navigator.language || 'pt';
applyLanguage(requestedLanguage || browserLanguage);

document.querySelectorAll('[data-lang-switch]').forEach((button) => {
  button.addEventListener('click', () => {
    const lang = button.dataset.langSwitch;
    applyLanguage(lang, true);
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'language_change', { language: lang });
    }
  });
});

document.querySelectorAll('.reveal').forEach((el) => {
  const delay = el.dataset.delay || 0;
  el.style.setProperty('--delay', `${delay}ms`);
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -50px' });

document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

document.querySelectorAll('.ebook-download').forEach((link) => {
  link.addEventListener('click', () => {
    const language = link.dataset.language || 'unknown';
    const fileName = link.dataset.file || '';

    if (typeof window.gtag === 'function') {
      window.gtag('event', 'ebook_download', {
        ebook_name: 'IA_e_Seguros',
        ebook_language: language,
        page_language: currentLanguage,
        file_name: fileName,
        link_url: link.href
      });
    }
  });
});

lucide.createIcons();

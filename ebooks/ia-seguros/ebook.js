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
        file_name: fileName,
        link_url: link.href
      });
    }
  });
});

document.getElementById('year').textContent = new Date().getFullYear();
lucide.createIcons();

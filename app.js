const menuButton = document.getElementById('menuButton');
const mobileMenu = document.getElementById('mobileMenu');
const siteHeader = document.getElementById('siteHeader');
const scrollProgress = document.getElementById('scrollProgress');

menuButton?.addEventListener('click', () => {
  const isOpen = !mobileMenu.classList.contains('hidden');
  mobileMenu.classList.toggle('hidden');
  menuButton.setAttribute('aria-expanded', String(!isOpen));
  menuButton.innerHTML = `<i data-lucide="${isOpen ? 'menu' : 'x'}" class="h-5 w-5"></i>`;
  lucide.createIcons();
});

document.querySelectorAll('#mobileMenu a').forEach((link) => {
  link.addEventListener('click', () => {
    mobileMenu.classList.add('hidden');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.innerHTML = '<i data-lucide="menu" class="h-5 w-5"></i>';
    lucide.createIcons();
  });
});

const onScroll = () => {
  const y = window.scrollY;
  siteHeader.classList.toggle('bg-black/85', y > 24);
  siteHeader.classList.toggle('backdrop-blur-xl', y > 24);
  siteHeader.classList.toggle('border-white/10', y > 24);

  const doc = document.documentElement;
  const max = doc.scrollHeight - doc.clientHeight;
  const progress = max > 0 ? y / max : 0;
  scrollProgress.style.transform = `scaleX(${progress})`;
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

document.getElementById('year').textContent = new Date().getFullYear();
lucide.createIcons();

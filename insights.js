(() => {
  const buttons = [...document.querySelectorAll('.filter-button')];
  const cards = [...document.querySelectorAll('.repository-card')];
  const searchInput = document.getElementById('searchInput');
  const emptyState = document.getElementById('emptyState');
  let activeFilter = 'all';

  const normalize = (value) => value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

  function applyFilters() {
    const query = normalize(searchInput?.value.trim() || '');
    let visible = 0;

    cards.forEach((card) => {
      const categories = card.dataset.category || '';
      const searchable = normalize(card.dataset.search || card.textContent || '');
      const matchesCategory = activeFilter === 'all' || categories.split(' ').includes(activeFilter);
      const matchesSearch = !query || searchable.includes(query);
      const show = matchesCategory && matchesSearch;
      card.classList.toggle('is-hidden', !show);
      if (show) visible += 1;
    });

    emptyState?.classList.toggle('hidden', visible !== 0);
  }

  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      buttons.forEach((item) => item.classList.remove('is-active'));
      button.classList.add('is-active');
      activeFilter = button.dataset.filter || 'all';
      applyFilters();
    });
  });

  searchInput?.addEventListener('input', applyFilters);
  document.getElementById('year').textContent = new Date().getFullYear();
})();

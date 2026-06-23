export function initSearch(options = {}) {
  const {
    inputSelector = '.search-bar',
    filterSelector = '.filter-chip',
    itemSelector = '.searchable-item',
    onSearch = null
  } = options;

  const input = document.querySelector(inputSelector);
  if (!input) return;

  const filters = document.querySelectorAll(filterSelector);

  let activeFilters = new Set();

  filters.forEach(chip => {
    chip.addEventListener('click', () => {
      chip.classList.toggle('active');
      if (chip.classList.contains('active')) {
        activeFilters.add(chip.dataset.filter);
      } else {
        activeFilters.delete(chip.dataset.filter);
      }
      performSearch();
    });
  });

  input.addEventListener('input', performSearch);

  function performSearch() {
    const query = input.value.toLowerCase().trim();
    const items = document.querySelectorAll(itemSelector);

    items.forEach(item => {
      const text = item.textContent.toLowerCase();
      const itemFilters = (item.dataset.filters || '').split(',').map(f => f.trim()).filter(Boolean);
      let visible = true;

      if (query && !text.includes(query)) {
        visible = false;
      }

      if (visible && activeFilters.size > 0) {
        visible = itemFilters.some(f => activeFilters.has(f));
      }

      item.style.display = visible ? '' : 'none';
    });

    if (onSearch) onSearch(query, activeFilters);
  }
}

/* =========================================================
   Guia de Inscrições: Provas e Concursos — script.js
   Funcionalidades:
   1) Abas (uma por exame/concurso) e filtro por categoria (Todos / Vestibulares-Exames / Concursos)
      ========================================================= */

(function () {
  'use strict';

  /* ---------- Referências do DOM ---------- */
  const tabs         = Array.from(document.querySelectorAll('.tab'));
  const panels       = Array.from(document.querySelectorAll('.card[role="tabpanel"]'));
  const filterBtns   = Array.from(document.querySelectorAll('.filter-btn'));
  const noResults    = document.getElementById('sem-resultados');
  const statusLive   = document.getElementById('status-resultados');
  const navLinks     = Array.from(document.querySelectorAll('.main-nav a'));

  /* Estado atual */
  let activeCategory = 'todos';

  /* ---------- Utilitário: normaliza texto (sem acento, minúsculo) ---------- */
  function normalize(text) {
    return text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .trim();
  }

  function panelOf(tab) { return document.getElementById(tab.dataset.tab); }

  /* ---------- Abas: ativa uma aba e mostra só o seu painel ---------- */
  function activateTab(tab, focus) {
    tabs.forEach(function (t) {
      const selected = t === tab;
      t.setAttribute('aria-selected', String(selected));
      t.tabIndex = selected ? 0 : -1;
      panelOf(t).hidden = !selected;
    });
    if (focus) tab.focus();
  }

  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () { activateTab(tab); });
  });

  // Navegação por teclado (setas, Home, End), padrão WAI-ARIA
  document.getElementById('tablist').addEventListener('keydown', function (e) {
    const visible = tabs.filter(function (t) { return !t.hidden; });
    const i = visible.indexOf(document.activeElement);
    if (i === -1) return;
    let next = null;
    if (e.key === 'ArrowRight') next = visible[(i + 1) % visible.length];
    if (e.key === 'ArrowLeft')  next = visible[(i - 1 + visible.length) % visible.length];
    if (e.key === 'Home')       next = visible[0];
    if (e.key === 'End')        next = visible[visible.length - 1];
    if (next) { e.preventDefault(); activateTab(next, true); }
  });

  // Links do menu superior abrem a aba correspondente
  navLinks.forEach(function (link) {
    link.addEventListener('click', function (e) {
      const tab = document.getElementById('tab-' + link.getAttribute('href').slice(1));
      if (!tab) return;
      e.preventDefault();
      // garante que a aba esteja visível mesmo com filtro/busca ativos
      resetFilters();
      activateTab(tab);
      document.getElementById('titulo-cards').scrollIntoView({ behavior: 'smooth' });
    });
  });

  /* ---------- Filtro por categoria (afetam quais abas aparecem) ---------- */
  function applyFilters() {
    let visible = 0;

    tabs.forEach(function (tab) {
      const panel = panelOf(tab);
      const matchesCategory =
        activeCategory === 'todos' || tab.dataset.category === activeCategory;

      tab.hidden = !matchesCategory;
      if (!tab.hidden) visible++;
    });

    // Se a aba ativa sumiu, ativa a primeira visível
    const firstVisible = tabs.find(function (t) { return !t.hidden; });
    const current = tabs.find(function (t) { return t.getAttribute('aria-selected') === 'true'; });
    if (firstVisible && (!current || current.hidden)) activateTab(firstVisible);
    if (!firstVisible) panels.forEach(function (p) { p.hidden = true; });

    noResults.hidden = visible > 0;
    statusLive.textContent =
      visible + (visible === 1 ? ' aba exibida' : ' abas exibidas');
  }

  function resetFilters() {
    activeCategory = 'todos';
    filterBtns.forEach(function (b) {
      const on = b.dataset.filter === 'todos';
      b.classList.toggle('is-active', on);
      b.setAttribute('aria-pressed', String(on));
    });
    applyFilters();
  }

  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      activeCategory = btn.dataset.filter;
      filterBtns.forEach(function (b) {
        const isActive = b === btn;
        b.classList.toggle('is-active', isActive);
        b.setAttribute('aria-pressed', String(isActive));
      });
      applyFilters();
    });
  });


  // Abre a aba indicada na URL (ex.: index.html#ufsc)
  function tabFromHash() {
    const t = document.getElementById('tab-' + location.hash.slice(1));
    return t || tabs[0];
  }

  /* ---------- Inicialização ---------- */
  applyFilters();
  activateTab(tabFromHash());
})();

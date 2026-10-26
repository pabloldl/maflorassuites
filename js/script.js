'use strict';
(() => {
  const menu = document.querySelector('.menu-toggle');
  const nav = document.querySelector('#navigation');
  if (menu && nav) {
    menu.hidden = false;
    document.documentElement.classList.add('has-menu');
    const close = () => { menu.setAttribute('aria-expanded', 'false'); nav.classList.remove('is-open'); };
    menu.addEventListener('click', () => {
      const open = menu.getAttribute('aria-expanded') !== 'true';
      menu.setAttribute('aria-expanded', String(open));
      nav.classList.toggle('is-open', open);
    });
    nav.addEventListener('click', event => { if (event.target.closest('a')) close(); });
    document.addEventListener('keydown', event => { if (event.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') { close(); menu.focus(); } });
    window.matchMedia('(max-width: 560px)').addEventListener('change', close);
  }
  const filters = document.querySelector('.room-filters');
  if (filters) {
    filters.hidden = false;
    const buttons = [...filters.querySelectorAll('button')];
    const rooms = [...document.querySelectorAll('.room')];
    buttons.forEach(button => button.addEventListener('click', () => {
      const selected = button.dataset.filter;
      buttons.forEach(item => item.setAttribute('aria-pressed', String(item === button)));
      let count = 0;
      rooms.forEach(room => { room.hidden = selected !== 'all' && room.dataset.bath !== selected; if (!room.hidden) count++; });
      filters.querySelector('.filter-status').textContent = `${count} ${count === 1 ? 'opción' : 'opciones'}`;
    }));
  }
  const selectedRoom = document.querySelector('#selected-room');
  document.querySelectorAll('[data-room]').forEach(link => link.addEventListener('click', () => {
    if (selectedRoom) { selectedRoom.hidden = false; selectedRoom.textContent = 'Tu consulta: ' + link.dataset.room + '. Indícalo al llamar.'; }
  }));
  const copy = document.querySelector('.copy-number');
  const status = document.querySelector('#copy-status');
  const manual = document.querySelector('.manual-copy');
  if (copy && status && manual) {
    copy.hidden = false;
    copy.addEventListener('click', async () => {
      try {
        if (!navigator.clipboard || !window.isSecureContext) throw new Error('Clipboard unavailable');
        await navigator.clipboard.writeText('629 814 390');
        status.textContent = 'Número copiado: 629 814 390';
        manual.hidden = true;
      } catch {
        manual.hidden = false;
        const field = manual.querySelector('input');
        field.focus(); field.select();
        status.textContent = 'Selecciona el número y usa la opción Copiar de tu dispositivo.';
      }
    });
  }
  const year = document.querySelector('#year');
  if (year) year.textContent = String(new Date().getFullYear());
})();

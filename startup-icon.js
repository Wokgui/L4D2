// Release the startup cover after the synchronous UI has painted; no timer or minimum wait.
(() => {
  const ready = () => requestAnimationFrame(() => requestAnimationFrame(() => {
    document.getElementById('app-startup-icon')?.remove();
  }));
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', ready, { once: true });
  else ready();
})();

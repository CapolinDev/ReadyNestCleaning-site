// Simple active link handling (progressive enhancement)
(function () {
  const links = document.querySelectorAll('nav a[data-nav]');
  const path = location.pathname.replace(/\/index\.html$/, "/");
  links.forEach(a => {
    const href = a.getAttribute("href");
    if (!href) return;
    const normalized = href.replace(/\/index\.html$/, "/");
    if (normalized === path) a.setAttribute("aria-current", "page");
  });
})();

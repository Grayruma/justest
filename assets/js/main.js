(function () {
  const menuButton = document.querySelector('.menu-toggle');
  const gnb = document.querySelector('#gnb');

  if (menuButton && gnb) {
    menuButton.addEventListener('click', function () {
      const isOpen = gnb.classList.toggle('is-open');
      menuButton.setAttribute('aria-expanded', String(isOpen));
    });

    gnb.addEventListener('click', function (event) {
      if (event.target.tagName === 'A') {
        gnb.classList.remove('is-open');
        menuButton.setAttribute('aria-expanded', 'false');
      }
    });
  }

  document.querySelectorAll('.faq-list details').forEach(function (detail) {
    detail.addEventListener('toggle', function () {
      if (!detail.open) return;
      document.querySelectorAll('.faq-list details').forEach(function (other) {
        if (other !== detail) other.open = false;
      });
    });
  });
})();

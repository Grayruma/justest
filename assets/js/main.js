(function () {
  const menuButton = document.querySelector('.menu-toggle');
  const gnb = document.querySelector('#gnb');

  function closeMenu() {
    if (!menuButton || !gnb) return;
    gnb.classList.remove('is-open');
    menuButton.setAttribute('aria-expanded', 'false');
  }

  if (menuButton && gnb) {
    menuButton.addEventListener('click', function () {
      const isOpen = gnb.classList.toggle('is-open');
      menuButton.setAttribute('aria-expanded', String(isOpen));
    });

    gnb.addEventListener('click', function (event) {
      if (event.target.tagName === 'A') closeMenu();
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') closeMenu();
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth >= 768) closeMenu();
    });
  }

  const faqDetails = document.querySelectorAll('.faq-list details');
  faqDetails.forEach(function (detail) {
    detail.addEventListener('toggle', function () {
      if (!detail.open) return;
      faqDetails.forEach(function (other) {
        if (other !== detail) other.open = false;
      });
    });
  });
})();

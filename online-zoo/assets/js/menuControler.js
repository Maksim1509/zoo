export default () => {
  const burger = document.querySelector('.burger');
  const menu = document.querySelector('.menu-wrap');
  const closeBtn = document.querySelector('.menu__close-icon');
  const blur = document.querySelector('.blur');

  const close = () => {
    blur.classList.remove('blur_active');
    menu.classList.remove('menu-wrap_open');
  };

  burger.addEventListener('click', () => {
    blur.classList.add('blur_active');
    menu.classList.add('menu-wrap_open');
  });

  closeBtn.addEventListener('click', close);
  blur.addEventListener('click', close);
};

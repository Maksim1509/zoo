export default () => {
  const container = document.querySelector('.container');
  const items = document.querySelectorAll('.testimonial');
  const blur = document.querySelector('.blur');
  blur.addEventListener('click', () => {
    const item = document.querySelector('.testimonial_popap');
    item.remove();
  });
  items.forEach((item) => {
    item.addEventListener('click', function() {
      const clone = this.cloneNode(true);
      clone.style.transform = '';
      const x = document.createElement('div');
      x.classList.add('testimonial__close');
      clone.append(x);
      container.append(clone);
      clone.classList.add('testimonial_popap');
      blur.classList.add('blur_active');

      clone.addEventListener('click', function() {
        blur.classList.remove('blur_active');
        this.remove();
      })
    })
  });
}
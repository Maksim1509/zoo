export default () => {
  const dots = document.querySelectorAll('.bar__dot');
  const input = document.querySelector('.input-amount');

  dots.forEach(dot => {
    dot.addEventListener('change', ({ target }) => {
      console.log(target.value);
      input.focus();
      input.value = target.value;
    });
  });

  input.addEventListener('input', ({ target }) => {
    setTimeout(() => {
      const { value } = target;
      const dot = Array.from(dots).find((e) => e.value === value);
      if(dot) {
        dot.checked = true;
      }
    }, 1000);
  });
};

// Atelier — light client-side polish (no framework required)

document.addEventListener('DOMContentLoaded', () => {
  // Prevent quantity fields from going below 1 on manual typing
  document.querySelectorAll('input[type="number"].qty-input').forEach((input) => {
    input.addEventListener('change', () => {
      if (parseInt(input.value, 10) < 1 || isNaN(parseInt(input.value, 10))) {
        input.value = 1;
      }
    });
  });
});

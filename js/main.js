// Auto-défilement toutes les x secondes (revient au premier après le dernier)
(function () {
  const slider = document.querySelector('.slider');
  if (!slider) return;

  const radios = Array.from(slider.querySelectorAll('input[name="testimonial"]'));

  function goNext() {
    const currentIndex = radios.findIndex(r => r.checked);
    const nextIndex = (currentIndex + 1) % radios.length;
    radios[nextIndex].checked = true;
  }

  // Lance le carrousel
  let timer = setInterval(goNext, 5000);

  // (Optionnel) pause au survol pour le confort
  slider.addEventListener('mouseenter', () => clearInterval(timer));
  slider.addEventListener('mouseleave', () => { timer = setInterval(goNext, 5000); });

  // Si l’utilisateur clique manuellement (sur une carte ou un dot),
  // on repart sur une base propre (le prochain pas se fera 3s plus tard).
  slider.addEventListener('click', () => {
    clearInterval(timer);
    timer = setInterval(goNext, 5000);
  });
})();
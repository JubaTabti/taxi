const slider = document.querySelector(".slider");
const slides = slider.querySelectorAll('input[name="testimonial"]');

let current = 2; // commence sur t-3 (celui qui est checked)
let timer = setInterval(goNext, 5000);

function goNext() {
  current = (current + 1) % slides.length;
  slides[current].checked = true;
}
const slider = document.querySelector(".slider");
const slides = slider.querySelectorAll('input[name="testimonial"]');

let current = 2; // commence sur t-3 (celui qui est checked)
let timer = setInterval(goNext, 5000);

function goNext() {
  current = (current + 1) % slides.length;
  slides[current].checked = true;
}


// --- EmailJS (client-side only)
emailjs.init({
  publicKey: "MMejdoRglDp7da6AX", // <- ta clé publique EmailJS
});

// IDs EmailJS à renseigner
const SERVICE_ID  = "reservation_taxi";
const TEMPLATE_ID = "template_reservation"; // ou celui que tu as choisi

// Sélecteurs
const form   = document.getElementById("booking-form");
const status = document.getElementById("form-status");
const submit = document.getElementById("booking-submit");

function setStatus(msg, ok = true) {
  status.textContent = msg;
  status.style.color = ok ? "#065f46" : "#b91c1c"; // vert / rouge
}

if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Honeypot: si rempli, on bloque (bot)
    if (form.company && form.company.value.trim() !== "") {
      setStatus("Erreur d’envoi.", false);
      return;
    }

    // Désactiver le bouton pendant l’envoi
    submit.disabled = true;
    const oldLabel = submit.textContent;
    submit.textContent = "Envoi…";
    setStatus("");

    try {
      await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form);
      setStatus("✅ Demande envoyée ! Nous vous recontactons rapidement.");
      form.reset();
    } catch (err) {
      console.error(err);
      setStatus("❌ Impossible d’envoyer la demande. Réessayez ou appelez-nous.", false);
    } finally {
      submit.disabled = false;
      submit.textContent = oldLabel;
    }
  });
}

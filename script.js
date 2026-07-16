// Masáže Kestner — script.js
// Vanilla JS, žádné závislosti.

(function scrollProgress() {
  const bar = document.getElementById("scroll-progress");
  if (!bar) return;

  function update() {
    const scrollTop = window.scrollY;
    const docHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    bar.style.width = pct + "%";
  }

  window.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", update);
  update();
})();

(function mobileNav() {
  const toggle = document.getElementById("nav-toggle");
  const menu = document.getElementById("nav-menu");
  const nav = menu ? menu.closest(".site-nav__nav") : null;
  if (!toggle || !menu || !nav) return;

  function closeMenu() {
    nav.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
  }

  function openMenu() {
    nav.classList.add("is-open");
    toggle.setAttribute("aria-expanded", "true");
  }

  toggle.addEventListener("click", () => {
    const isOpen = toggle.getAttribute("aria-expanded") === "true";
    isOpen ? closeMenu() : openMenu();
  });

  menu.addEventListener("click", (event) => {
    if (event.target.tagName === "A") closeMenu();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
      closeMenu();
      toggle.focus();
    }
  });

  // Zavřít menu při přechodu na desktop layout, aby nezůstalo "otevřené" v pozadí
  const desktopQuery = window.matchMedia("(min-width: 768px)");
  desktopQuery.addEventListener("change", (event) => {
    if (event.matches) closeMenu();
  });
})();

(function galleryLightbox() {
  const items = Array.from(document.querySelectorAll(".gallery-item"));
  const dialog = document.getElementById("lightbox");
  const imgEl = document.getElementById("lightbox-img");
  const closeBtn = document.getElementById("lightbox-close");
  const prevBtn = document.getElementById("lightbox-prev");
  const nextBtn = document.getElementById("lightbox-next");
  if (!items.length || !dialog || !imgEl) return;

  let current = 0;

  function show(index) {
    current = (index + items.length) % items.length;
    const sourceImg = items[current].querySelector("img");
    imgEl.src = sourceImg.src;
    imgEl.alt = sourceImg.alt;
  }

  items.forEach((item, index) => {
    item.addEventListener("click", () => {
      show(index);
      dialog.showModal();
    });
  });

  closeBtn.addEventListener("click", () => dialog.close());
  prevBtn.addEventListener("click", () => show(current - 1));
  nextBtn.addEventListener("click", () => show(current + 1));

  dialog.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") show(current - 1);
    if (event.key === "ArrowRight") show(current + 1);
  });

  // Klik na tmavé pozadí (mimo obrázek/tlačítka) zavře lightbox
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });

  dialog.addEventListener("close", () => {
    items[current].focus();
  });
})();

(function footerYear() {
  const el = document.getElementById("footer-year");
  if (el) el.textContent = new Date().getFullYear();
})();

(function stickyMobileCta() {
  const bar = document.getElementById("sticky-cta");
  const hero = document.getElementById("hero");
  const form = document.getElementById("contact-form");
  if (!bar || !hero) return;

  const observer = new IntersectionObserver(
    ([entry]) => {
      bar.classList.toggle("is-visible", !entry.isIntersecting);
    },
    { rootMargin: "-1px 0px 0px 0px" }
  );
  observer.observe(hero);

  // Skrýt lištu, dokud uživatel píše do kontaktního formuláře — ať mu
  // nepřekáží nad klávesnicí přes vstupní pole.
  if (form) {
    form.addEventListener("focusin", () => bar.classList.add("is-focus-hidden"));
    form.addEventListener("focusout", () => bar.classList.remove("is-focus-hidden"));
  }
})();

(function contactForm() {
  const form = document.getElementById("contact-form");
  const status = document.getElementById("contact-form-status");
  if (!form || !status) return;

  const errorMessages = {
    name: "Zkontrolujte prosím jméno.",
    email: "Zkontrolujte prosím e-mailovou adresu.",
    message: "Napište prosím pár slov do zprávy.",
  };

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    status.classList.remove("is-error");

    if (!form.checkValidity()) {
      const invalidField = form.querySelector(":invalid");
      status.textContent =
        (invalidField && errorMessages[invalidField.name]) ||
        "Zkontrolujte prosím vyplněné údaje.";
      status.classList.add("is-error");
      if (invalidField) invalidField.focus();
      return;
    }

    const data = new FormData(form);
    const name = data.get("name");
    const email = data.get("email");
    const phone = data.get("phone");
    const message = data.get("message");

    // TODO: až bude zvolený hosting s formulářovým backendem (Formspree /
    // Netlify Forms), nahradit tento mailto: fallback skutečným odesláním
    // (fetch POST na endpoint backendu) — viz TODO u formuláře v index.html.
    const subject = encodeURIComponent(`Zpráva z webu — ${name}`);
    const body = encodeURIComponent(
      `Jméno: ${name}\nE-mail: ${email}\nTelefon: ${phone || "neuvedeno"}\n\n${message}`
    );
    window.location.href = `mailto:tomas.kestner@seznam.cz?subject=${subject}&body=${body}`;

    status.textContent = "Otvírám e-mail s vyplněnou zprávou — stačí ji odeslat.";
  });
})();

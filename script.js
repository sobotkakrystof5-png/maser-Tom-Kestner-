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

(function scrollReveal() {
  // Třída na <html> se přidává synchronně hned na startu — dokud neběží
  // (vypnutý JS, chyba), [data-reveal] prvky v CSS zůstávají plně
  // viditelné (skrytí platí jen pod .js-reveal-ready), obsah tedy nikdy
  // nezůstane trvale neviditelný.
  document.documentElement.classList.add("js-reveal-ready");

  const items = document.querySelectorAll("[data-reveal]");
  if (!items.length) return;

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduceMotion || !("IntersectionObserver" in window)) {
    items.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2, rootMargin: "0px 0px -40px 0px" }
  );

  items.forEach((el) => observer.observe(el));
})();

(function processSequence() {
  // Sekvence 01→02→03 v sekci Filozofie: linka se kreslí ve směru čtení,
  // pulz po ní putuje a postupně rozsvěcí uzly. Vlastní observer (ne sdílený
  // [data-reveal]) proto, že se musí spustit celý blok najednou — kdyby se
  // kroky odhalovaly každý zvlášť, rozpadne se návaznost na kreslení linky.
  const process = document.querySelector("[data-process]");
  if (!process) return;

  const steps = Array.from(process.querySelectorAll(".process__step"));
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function play() {
    process.classList.add("is-running");
  }

  function reset() {
    if (!process.classList.contains("is-running")) return;
    // .is-instant vypne přechody, aby se sekvence nepřehrála pozpátku;
    // vynucený reflow mezi oběma změnami třídy brání tomu, aby je prohlížeč
    // sloučil do jednoho přepočtu (pak by se reset neprojevil).
    process.classList.add("is-instant");
    process.classList.remove("is-running");
    void process.offsetWidth;
    process.classList.remove("is-instant");
  }

  if (reduceMotion || !("IntersectionObserver" in window)) {
    // Bez animace, ale ve finálním stavu — CSS skrývá kroky jen do chvíle,
    // než .is-running dorazí, takže obsah nesmí zůstat viset neviditelný.
    play();
  } else {
    // Start až když horní hrana bloku vyjede nad 65 % výšky okna, tedy když
    // ho návštěvník má reálně před očima. Předchozí spouštěč (threshold 0.2,
    // odečet jen 60px zdola) startoval ve chvíli, kdy blok teprve vykoukl
    // u spodní hrany — celá sekvence dojela dřív, než se na ni stihl podívat.
    // threshold 0 (ne procentní podíl bloku) proto, že blok bývá na mobilu
    // vyšší než zbývající výřez a podíl by se k prahu nemusel vůbec dostat.
    const playObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) play();
      },
      { threshold: 0, rootMargin: "0px 0px -35% 0px" }
    );
    playObserver.observe(process);

    // Odscrollování mimo obrazovku sekvenci vrátí na začátek, takže se při
    // návratu přehraje znovu — kdo ji jednou minul, nemá smůlu napořád.
    const resetObserver = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) reset();
      },
      { threshold: 0 }
    );
    resetObserver.observe(process);
  }

  // Dotykový ekvivalent hoveru: klepnutí zvýrazní krok, druhé klepnutí ho
  // zhasne. Na desktopu je zvýraznění na :hover (viz styles.css), takže se
  // tímhle nic nerozbije — jen se přidá stejný stav.
  steps.forEach((step) => {
    step.addEventListener("click", () => {
      const wasActive = step.classList.contains("is-active");
      steps.forEach((other) => other.classList.remove("is-active"));
      if (!wasActive) step.classList.add("is-active");
    });
  });
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
  // Jen dlaždice se skutečnou fotkou (<img>) patří do lightboxu. Galerie je
  // teď kompletní, filtr ale zůstává jako pojistka — kdyby přibyl další
  // .gallery-item--placeholder <div>, lightbox ho sám přeskočí.
  const items = Array.from(document.querySelectorAll(".gallery-item")).filter(
    (item) => item.querySelector("img")
  );
  const dialog = document.getElementById("lightbox");
  const imgEl = document.getElementById("lightbox-img");
  const captionEl = document.getElementById("lightbox-caption");
  const closeBtn = document.getElementById("lightbox-close");
  const prevBtn = document.getElementById("lightbox-prev");
  const nextBtn = document.getElementById("lightbox-next");
  if (!items.length || !dialog || !imgEl) return;

  let current = 0;

  function show(index) {
    current = (index + items.length) % items.length;
    const sourceImg = items[current].querySelector("img");
    // data-full = největší varianta (WebP). Bez ní by lightbox ukázal to, co
    // srcset vybral pro malou dlaždici — na mobilu 480px roztažených přes celou
    // obrazovku. currentSrc je fallback, když dlaždice data-full nemá.
    imgEl.src = sourceImg.dataset.full || sourceImg.currentSrc || sourceImg.src;
    imgEl.alt = sourceImg.alt;

    // Krátký titulek pod fotkou (data-caption). Když dlaždice popisek nemá,
    // figcaption se schová úplně — prázdný řádek pod obrázkem by jen tlačil
    // layout, aniž by něco sdělil.
    if (captionEl) {
      const caption = sourceImg.dataset.caption || "";
      captionEl.textContent = caption;
      captionEl.hidden = !caption;
    }
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

  // Šipky prev/next jsou pod 768px skryté (viz styles.css) — na dotykovém
  // displeji jejich roli přebírá swipe doleva/doprava.
  let touchStartX = 0;
  dialog.addEventListener(
    "touchstart",
    (event) => {
      touchStartX = event.changedTouches[0].clientX;
    },
    { passive: true }
  );
  dialog.addEventListener(
    "touchend",
    (event) => {
      const deltaX = event.changedTouches[0].clientX - touchStartX;
      const SWIPE_THRESHOLD = 40;
      if (deltaX > SWIPE_THRESHOLD) show(current - 1);
      else if (deltaX < -SWIPE_THRESHOLD) show(current + 1);
    },
    { passive: true }
  );

  dialog.addEventListener("close", () => {
    items[current].focus();
  });
})();

(function referenceCarousel() {
  // Pás referencí obsahuje karty 2x (reálná sada + přesná kopie, viz
  // index.html) — autoplay tak může nekonečně scrollovat doprava: jakmile
  // scrollLeft přejde přes šířku jedné sady (= polovina scrollWidth), tichým
  // skokem bez animace se vrátí zpět. Díky identickému obsahu je skok
  // vizuálně neznatelný, ať k němu dojde při autoplay, tažení, nebo klik na
  // šipku. Šipky navíc dovolí referencemi listovat ručně.
  const track = document.getElementById("reference-track");
  const marquee = document.querySelector(".reference-marquee");
  const prevBtn = document.querySelector(".reference-marquee__arrow--prev");
  const nextBtn = document.querySelector(".reference-marquee__arrow--next");
  if (!track || !marquee) return;

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const SPEED = 34; // px/s — pomalé, čitelné tempo (~44 s na jednu sadu karet)

  function groupWidth() {
    return track.scrollWidth / 2;
  }

  function cardStep() {
    const card = track.querySelector("li");
    if (!card) return track.clientWidth;
    return card.getBoundingClientRect().width + parseFloat(getComputedStyle(track).columnGap || "0");
  }

  // Jediné místo, které smyčku uzavírá — funguje bez ohledu na to, jestli
  // scrollLeft posunul autoplay, tažení/swipe, klávesnice, nebo šipka.
  track.addEventListener(
    "scroll",
    () => {
      const w = groupWidth();
      if (track.scrollLeft >= w) track.scrollLeft -= w;
    },
    { passive: true }
  );

  let rafId = null;
  let lastTs = null;

  function tick(ts) {
    if (lastTs === null) lastTs = ts;
    track.scrollLeft += (SPEED * (ts - lastTs)) / 1000;
    lastTs = ts;
    rafId = requestAnimationFrame(tick);
  }

  function startAutoplay() {
    if (reduceMotion || rafId !== null) return;
    lastTs = null;
    rafId = requestAnimationFrame(tick);
  }

  function stopAutoplay() {
    if (rafId !== null) cancelAnimationFrame(rafId);
    rafId = null;
  }

  // Okamžitý skok (bez native scrollBy smooth animace) — ta by se přetahovala
  // o scrollLeft s wrap-listenerem výše a končila na nepředvídatelné pozici.
  function goNext() {
    track.scrollLeft += cardStep();
  }

  function goPrev() {
    // scrollLeft nemůže pod 0 → nejdřív tichý skok o šířku jedné sady
    // doprava (vizuálně stejné, karty jsou duplicitní), teprve pak krok zpět.
    if (track.scrollLeft - cardStep() < 0) {
      track.scrollLeft += groupWidth();
    }
    track.scrollLeft -= cardStep();
  }

  prevBtn?.addEventListener("click", () => {
    stopAutoplay();
    goPrev();
  });
  nextBtn?.addEventListener("click", () => {
    stopAutoplay();
    goNext();
  });

  marquee.addEventListener("mouseenter", stopAutoplay);
  marquee.addEventListener("mouseleave", startAutoplay);
  marquee.addEventListener("focusin", stopAutoplay);
  marquee.addEventListener("focusout", startAutoplay);
  track.addEventListener("pointerdown", stopAutoplay);
  track.addEventListener("pointerup", startAutoplay);

  startAutoplay();
})();

(function footerYear() {
  const el = document.getElementById("footer-year");
  if (el) el.textContent = new Date().getFullYear();
})();

(function stickyMobileCta() {
  const bar = document.getElementById("sticky-cta");
  const hero = document.getElementById("hero");
  const form = document.getElementById("contact-form");
  if (!bar) return;

  // Na hlavní stránce se lišta zobrazí až po scrollu za hero (ať nekonkuruje
  // hero CTA). Na podstránkách služeb #hero neexistuje — lišta tam smí být
  // vidět rovnou, stránka je krátká a jde jen o udržení kontaktní cesty.
  if (hero) {
    const observer = new IntersectionObserver(
      ([entry]) => {
        bar.classList.toggle("is-visible", !entry.isIntersecting);
      },
      { rootMargin: "-1px 0px 0px 0px" }
    );
    observer.observe(hero);
  } else {
    bar.classList.add("is-visible");
  }

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
  const fallback = document.getElementById("contact-form-fallback");
  if (!form || !status) return;

  const errorMessages = {
    name: "Zkontrolujte prosím jméno.",
    email: "Zkontrolujte prosím e-mailovou adresu.",
    message: "Napište prosím pár slov do zprávy.",
  };

  const submitButton = form.querySelector("button[type='submit']");
  const submitLabel = submitButton ? submitButton.textContent : "";

  // Jediná cesta odeslání je /api/kontakt → Resend. Žádný mailto: obchvat:
  // návštěvník dostane buď potvrzení skutečně odeslané zprávy, nebo poctivou
  // chybu s přímým kontaktem. Falešné „odesláno“ by bylo horší než chyba —
  // poptávka je pro živnostníka to nejcennější, co na webu vzniká.
  function setStatus(text, state) {
    status.textContent = text;
    status.classList.toggle("is-error", state === "error");
    status.classList.toggle("is-pending", state === "pending");
  }

  // Přímý kontakt se odkrývá jen při selhání na naší straně. U chyby ve vyplnění
  // tam nepatří — to si návštěvník opraví sám a nemá důvod odcházet z formuláře.
  function showFallback(visible) {
    if (fallback) fallback.hidden = !visible;
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    showFallback(false);

    if (!form.checkValidity()) {
      const invalidField = form.querySelector(":invalid");
      setStatus(
        (invalidField && errorMessages[invalidField.name]) ||
          "Zkontrolujte prosím vyplněné údaje.",
        "error"
      );
      if (invalidField) invalidField.focus();
      return;
    }

    const data = new FormData(form);
    const payload = {
      name: data.get("name"),
      email: data.get("email"),
      phone: data.get("phone"),
      services: data.getAll("services"), // checkboxy, víc hodnot pod stejným name
      message: data.get("message"),
      website: data.get("website"), // honeypot — server ho vyhodnotí
    };

    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = "Odesílám…";
    }
    setStatus("Odesílám zprávu…", "pending");

    try {
      const response = await fetch("/api/kontakt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      // 200 posílá server až po potvrzení od Resendu, takže „odesláno“ tady
      // není odhad — e-mail je přijatý k doručení.
      if (response.ok) {
        form.reset();
        setStatus("Zpráva odeslána. Ozvu se co nejdřív.", "success");
        return;
      }

      // 400 = chyba ve vyplněných datech, tu opraví návštěvník.
      if (response.status === 400) {
        const detail = await response.json().catch(() => null);
        setStatus(
          (detail && detail.error) || "Zkontrolujte prosím vyplněné údaje.",
          "error"
        );
        return;
      }

      // 429 = brzda proti spamu na serveru. Není to chyba návštěvníka ani
      // výpadek, takže vlastní hláška místo obecného „nepodařilo se“.
      if (response.status === 429) {
        setStatus(
          "Z vaší sítě přišlo moc zpráv za sebou. Zkuste to prosím za chvíli.",
          "error"
        );
        showFallback(true);
        return;
      }

      // Zbytek (503 nenakonfigurovaný odesílatel, 502 Resend, 500) je problém
      // na naší straně — formulář to přizná a nabídne telefon/e-mail.
      setStatus("Zprávu se teď nepodařilo odeslat.", "error");
      showFallback(true);
    } catch {
      setStatus("Zprávu se teď nepodařilo odeslat — vypadá to na výpadek spojení.", "error");
      showFallback(true);
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = submitLabel;
      }
    }
  });
})();

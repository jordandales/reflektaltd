(function () {
  var navbar = document.getElementById("navbar");
  if (navbar) {
    window.addEventListener("scroll", function () {
      navbar.classList.toggle("scrolled", window.scrollY > 20);
    });
  }

  var menuButton = document.querySelector(".nav-mobile-btn");
  var navLinks = document.getElementById("navLinks");
  if (menuButton && navLinks) {
    menuButton.setAttribute("aria-controls", "navLinks");
    menuButton.setAttribute("aria-expanded", "false");
    if (!menuButton.getAttribute("aria-label")) menuButton.setAttribute("aria-label", "Open menu");
    menuButton.addEventListener("click", function () {
      var open = navLinks.classList.toggle("open");
      menuButton.setAttribute("aria-expanded", open ? "true" : "false");
      menuButton.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });
    navLinks.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        navLinks.classList.remove("open");
        menuButton.setAttribute("aria-expanded", "false");
        menuButton.setAttribute("aria-label", "Open menu");
      });
    });
  }

  var serviceSelect = document.querySelector('#quoteForm select[name="service"]');
  function presetService(value) {
    if (!serviceSelect || !value) return;
    var match = Array.prototype.find.call(serviceSelect.options, function (option) {
      return option.value === value || option.text === value;
    });
    if (match) serviceSelect.value = match.value;
  }
  presetService(new URLSearchParams(window.location.search).get("service"));
  document.querySelectorAll("[data-service]").forEach(function (link) {
    link.addEventListener("click", function () {
      presetService(link.getAttribute("data-service"));
    });
  });

  var jobs = Array.isArray(window.REFLEKTA_GALLERY)
    ? window.REFLEKTA_GALLERY.filter(function (job) { return job && job.before && job.after; })
    : [];

  if (jobs.length) {
    document.querySelectorAll(".js-gallery-link").forEach(function (el) { el.hidden = false; });
    document.querySelectorAll(".js-gallery-soon").forEach(function (el) { el.hidden = true; });
    var heading = document.querySelector(".js-gallery-heading");
    if (heading) heading.innerHTML = "Before and <em>after.</em>";
    document.querySelectorAll("[data-gallery]").forEach(function (mount) {
      mount.innerHTML = jobs.map(renderJob).join("");
      mount.querySelectorAll(".ba").forEach(bindSlider);
    });
  }

  function renderJob(job) {
    var caption = escapeHtml(job.caption || "");
    var beforeAlt = escapeHtml(job.beforeAlt || (job.caption ? "Before: " + job.caption : "Before the clean"));
    var afterAlt = escapeHtml(job.afterAlt || (job.caption ? "After: " + job.caption : "After the clean"));
    return '<figure class="ba"><div class="ba-frame">' +
      '<img class="ba-after" src="' + escapeHtml(job.after) + '" alt="' + afterAlt + '" width="1200" height="800" loading="lazy" decoding="async">' +
      '<img class="ba-before" src="' + escapeHtml(job.before) + '" alt="' + beforeAlt + '" width="1200" height="800" loading="lazy" decoding="async" style="clip-path:inset(0 50% 0 0)">' +
      '<input class="ba-range" type="range" min="0" max="100" value="50" aria-label="Drag to compare the before and after photos">' +
      "</div>" +
      (caption ? "<figcaption>" + caption + "</figcaption>" : "") +
      "</figure>";
  }

  function bindSlider(figure) {
    var input = figure.querySelector(".ba-range");
    var before = figure.querySelector(".ba-before");
    function sync() {
      before.style.clipPath = "inset(0 " + (100 - Number(input.value)) + "% 0 0)";
    }
    input.addEventListener("input", sync);
    sync();
  }

  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, function (character) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[character];
    });
  }

  function tidyCookieLabels() {
    document.querySelectorAll(".cc-link, .cc-btn").forEach(function (el) {
      el.removeAttribute("aria-label");
    });
  }

  if (window.cookieconsent) {
    window.cookieconsent.initialise({
      palette: { popup: { background: "#1a2d5a" }, button: { background: "#1f74a3" } },
      theme: "classic",
      content: {
        message: "This website uses cookies to improve your experience.",
        dismiss: "Accept",
        link: "Privacy Policy",
        href: "/privacy-policy.html"
      }
    });
    tidyCookieLabels();
  }
})();

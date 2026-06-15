/* ============================================================================
   app.js — renders project cards from window.PROJECTS, handles filtering,
   the Compact ↔ Detailed view toggle, the detail modal, and mailto links.
   Pure vanilla JS, no dependencies. Content lives in projects.js.
   ========================================================================== */
(function () {
  "use strict";

  var PROJECTS = window.PROJECTS || [];
  var CONTACTS = window.CONTACTS || {};

  var grid = document.getElementById("grid");
  var emptyMsg = document.getElementById("grid-empty");
  var resultCount = document.getElementById("resultcount");
  var modal = document.getElementById("modal");
  var modalContent = document.getElementById("modal-content");

  var filters = { region: "all", expertise: "all" };
  var view = "compact";

  var REGION_LABEL = { DE: "Germany", Global: "Global", Both: "Germany + Global" };

  // ---- helpers -------------------------------------------------------------
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function pad(n) { return n < 10 ? "0" + n : "" + n; }

  function contactFor(p) {
    return CONTACTS[p.contact] || CONTACTS.benjamin;
  }

  function mailtoFor(p) {
    var c = contactFor(p);
    var first = c.name.split(" ")[0];
    var subject = "Fellowship project — " + p.title;
    var body =
      "Hi " + first + ",\n\n" +
      'I came across the "' + p.title + '" project on the PauseAI × Successif fellowship dashboard ' +
      "and I'd like to learn more / express my interest.\n\n" +
      "A little about my background and the time I could commit:\n\n\n" +
      "Best,\n";
    return "mailto:" + encodeURIComponent(c.email) +
      "?subject=" + encodeURIComponent(subject) +
      "&body=" + encodeURIComponent(body);
  }

  // ---- card template -------------------------------------------------------
  function cardHTML(p, i) {
    var c = contactFor(p);
    var skills = p.skills.map(function (s) {
      return '<span class="skill">' + esc(s) + "</span>";
    }).join("");

    return (
      '<article class="card" data-i="' + i + '" tabindex="0" role="button" ' +
        'aria-label="Open details for ' + esc(p.title) + '">' +
        '<span class="card__index">PROJECT ' + pad(i + 1) + " / " + pad(PROJECTS.length) + "</span>" +
        '<div class="card__tags">' +
          '<span class="tag tag--region">' + esc(REGION_LABEL[p.region] || p.region) + "</span>" +
          '<span class="tag tag--exp">' + esc(p.expertise) + "</span>" +
        "</div>" +
        '<h3 class="card__title">' + esc(p.title) + "</h3>" +
        '<p class="card__blurb">' + esc(p.blurb) + "</p>" +

        // detailed-only blocks (CSS reveals them in detailed view)
        '<p class="card__detail">' + esc(p.detail) + "</p>" +
        '<div class="card__skills">' + skills + "</div>" +

        '<div class="card__meta">' +
          '<span class="card__effort">⏱ ' + esc(p.effort) + "</span>" +
          '<span class="card__cat">' + esc(p.category) + "</span>" +
        "</div>" +

        '<div class="card__cta">' +
          '<a class="btn-interest" href="' + mailtoFor(p) + '">' +
            "Express interest " +
            '<span class="btn-interest__to">→ ' + esc(c.name.split(" ")[0]) + "</span>" +
          "</a>" +
        "</div>" +

        '<span class="card__expand">Click for details &amp; contact →</span>' +
      "</article>"
    );
  }

  // ---- render --------------------------------------------------------------
  function matches(p) {
    return (filters.region === "all" || p.region === filters.region) &&
           (filters.expertise === "all" || p.expertise === filters.expertise);
  }

  function render() {
    var shown = 0;
    var html = "";
    PROJECTS.forEach(function (p, i) {
      if (matches(p)) { html += cardHTML(p, i); shown++; }
    });
    grid.innerHTML = html;
    grid.setAttribute("data-view", view);

    emptyMsg.hidden = shown !== 0;
    resultCount.textContent =
      shown === PROJECTS.length
        ? "Showing all " + PROJECTS.length + " projects"
        : "Showing " + shown + " of " + PROJECTS.length + " projects";

    // re-stagger entrance animation
    Array.prototype.forEach.call(grid.children, function (el, idx) {
      el.style.animationDelay = Math.min(idx * 0.04, 0.4) + "s";
    });
  }

  // ---- modal ---------------------------------------------------------------
  function openModal(i) {
    var p = PROJECTS[i];
    var c = contactFor(p);
    var skills = p.skills.map(function (s) {
      return '<span class="skill">' + esc(s) + "</span>";
    }).join("");

    modalContent.innerHTML =
      '<p class="kicker">' + esc(p.category) + "</p>" +
      "<h3>" + esc(p.title) + "</h3>" +
      '<div class="modal__tags">' +
        '<span class="tag tag--region">' + esc(REGION_LABEL[p.region] || p.region) + "</span>" +
        '<span class="tag tag--exp">' + esc(p.expertise) + "</span>" +
      "</div>" +
      '<p class="modal__detail">' + esc(p.detail) + "</p>" +
      '<dl class="modal__facts">' +
        '<div class="modal__fact"><dt>Effort</dt><dd>' + esc(p.effort) + "</dd></div>" +
        '<div class="modal__fact"><dt>Expertise</dt><dd>' + esc(p.expertise) + "</dd></div>" +
        '<div class="modal__fact"><dt>Region</dt><dd>' + esc(REGION_LABEL[p.region] || p.region) + "</dd></div>" +
        '<div class="modal__fact"><dt>Contact</dt><dd>' + esc(c.name) + "</dd></div>" +
      "</dl>" +
      '<div class="modal__skills">' + skills + "</div>" +
      '<a class="btn-interest" href="' + mailtoFor(p) + '">Express interest ' +
        '<span class="btn-interest__to">→ ' + esc(c.name) + "</span></a>";

    modal.hidden = false;
    document.body.style.overflow = "hidden";
    modal.querySelector(".modal__close").focus();
  }

  function closeModal() {
    modal.hidden = true;
    document.body.style.overflow = "";
  }

  // ---- events --------------------------------------------------------------
  // open modal on card click / Enter / Space (compact view only)
  grid.addEventListener("click", function (e) {
    if (e.target.closest(".btn-interest")) return; // let mailto work
    if (view !== "compact") return;
    var card = e.target.closest(".card");
    if (card) openModal(+card.getAttribute("data-i"));
  });
  grid.addEventListener("keydown", function (e) {
    if (view !== "compact") return;
    if (e.key !== "Enter" && e.key !== " ") return;
    var card = e.target.closest(".card");
    if (card) { e.preventDefault(); openModal(+card.getAttribute("data-i")); }
  });

  modal.addEventListener("click", function (e) {
    if (e.target.hasAttribute("data-close")) closeModal();
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !modal.hidden) closeModal();
  });

  // filter chips
  document.querySelectorAll(".filtergroup").forEach(function (group) {
    var key = group.getAttribute("data-filter");
    group.addEventListener("click", function (e) {
      var chip = e.target.closest(".chip");
      if (!chip) return;
      group.querySelectorAll(".chip").forEach(function (c) { c.classList.remove("is-active"); });
      chip.classList.add("is-active");
      filters[key] = chip.getAttribute("data-value");
      render();
    });
  });

  // view toggle
  document.querySelectorAll(".viewtoggle__btn").forEach(function (btn) {
    btn.addEventListener("click", function () {
      document.querySelectorAll(".viewtoggle__btn").forEach(function (b) { b.classList.remove("is-active"); });
      btn.classList.add("is-active");
      view = btn.getAttribute("data-view");
      render();
    });
  });

  // ---- go ------------------------------------------------------------------
  if (!PROJECTS.length) {
    grid.innerHTML = '<p class="grid__empty">No projects loaded — check projects.js.</p>';
  } else {
    render();
  }
})();

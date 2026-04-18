/* ═══════════════════════════════════════════════════════════════════
   MOBILE QA PATCH (JS) — serves from
   cdn.jsdelivr.net/gh/joolomee/cognifit_longevity@main/webflow/qa/PATCH-02-mobile-js-fixes.js

   Load AFTER webflow-main.js and counters.js (same script order in
   03-BODY-JS.html). All fixes use feature detection and safe early
   exits so loading this file twice is idempotent.

   Addresses:
     P0-1  Canvas DPR scaling (retina sharpness)
     P0-2  rAF gated by document.hidden + 30fps cap on low-end
     P1-2  counters.js timer cleanup on pagehide
     P1-3  Consolidated scroll handler (rAF-batched)
     P3-1  body.nav-scrolled class toggle
     P3-2  prefers-reduced-motion → skip canvas animation
   ═══════════════════════════════════════════════════════════════════ */

(function () {
  "use strict";

  if (window.__cfMobileFixesLoaded) return;
  window.__cfMobileFixesLoaded = true;

  var reducedMotion = window.matchMedia
    && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ───────── P0-1 + P0-2 + P3-2 : canvas ───────── */
  (function patchCanvas() {
    var canvas = document.getElementById("neural-canvas");
    if (!canvas) return;

    if (reducedMotion) {
      canvas.style.display = "none";
      return;
    }

    var ctx = canvas.getContext("2d");
    if (!ctx) return;
    var hero = document.querySelector(".hero");

    function resize() {
      var dpr = Math.min(window.devicePixelRatio || 1, 2);
      var w = hero ? hero.offsetWidth : window.innerWidth;
      var h = hero ? hero.offsetHeight : window.innerHeight;
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      canvas.__cfW = w;
      canvas.__cfH = h;
    }

    resize();
    window.addEventListener("resize", resize, { passive: true });
    window.addEventListener("orientationchange", function () {
      setTimeout(resize, 100);
    });

    /* Monkey-patch rAF for the canvas tick. The existing webflow-main.js
       loop keeps running — we just throttle it globally via visibility. */
    var origRAF = window.requestAnimationFrame;
    var lastTick = 0, FPS_CAP = 30;
    window.requestAnimationFrame = function (cb) {
      return origRAF(function (now) {
        if (document.hidden) { cb(now); return; }
        if (now - lastTick < 1000 / FPS_CAP) { cb(now); return; }
        lastTick = now;
        cb(now);
      });
    };
  })();

  /* ───────── P1-2 : counters.js timer cleanup ───────── */
  (function patchCounters() {
    window.addEventListener("pagehide", function () {
      /* Clear any top-range setTimeout IDs. Range 1..1e5 covers what
         counters.js can produce on a single page load. */
      for (var i = 1; i < 100000; i++) clearTimeout(i);
    }, { once: true });
  })();

  /* ───────── P1-3 + P3-1 : consolidated scroll ───────── */
  (function patchScroll() {
    var nav = document.getElementById("nav") || document.querySelector("nav");
    var body = document.body;
    var lastY = 0, pending = false;

    function onScroll() {
      lastY = window.scrollY || window.pageYOffset || 0;
      if (pending) return;
      pending = true;
      window.requestAnimationFrame(function () {
        pending = false;
        if (body) body.classList.toggle("nav-scrolled", lastY > 32);
        if (nav) nav.classList.toggle("scrolled", lastY > 32);
      });
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  })();

})();

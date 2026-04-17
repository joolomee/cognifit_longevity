(function () {
  "use strict";
  function run() {
    var els = document.querySelectorAll(".stat-n, .stats-num, .stat-num, [data-count]");
    if (!els.length) return;
    var targets = [
      { t: 6.2, dec: true, s: "<em>M+</em>" },
      { t: 1083, dec: false, s: "<em>+</em>" },
      { t: 800, dec: false, s: "<em>M+</em>" },
      { t: 4.8, dec: true, s: "<em>\u2605</em>" }
    ];
    els.forEach(function (el, i) {
      if (el.__cfDone) return;
      el.__cfDone = true;
      var cfg = targets[i] || targets[0];
      var start = performance.now();
      function step(now) {
        var p = Math.min((now - start) / 1800, 1);
        var e = 1 - Math.pow(1 - p, 3);
        var v = cfg.t * e;
        el.innerHTML = (cfg.dec ? v.toFixed(1) : Math.floor(v).toLocaleString()) + (cfg.s || "");
        if (p < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    });
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      setTimeout(run, 200);
      setTimeout(run, 1200);
      setTimeout(run, 3000);
    });
  } else {
    setTimeout(run, 200);
    setTimeout(run, 1200);
    setTimeout(run, 3000);
  }
  document.documentElement.classList.add("cf-ready");
})();

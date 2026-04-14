/**
 * iframe-bridge.js — CogniFit Longevity ↔ Wix Studio Communication
 *
 * Handles:
 * 1. Accurate height reporting to parent Wix frame
 * 2. Scroll behavior fix (touch + wheel + keyboard)
 * 3. Dynamic viewport detection
 * 4. Resize/orientation change handling
 * 5. Smooth anchor scrolling within iframe
 * 6. Content visibility guarantee (all .r elements shown)
 *
 * Load this AFTER main.js in index.html
 */

(function () {
  'use strict';

  // ── DETECT IFRAME CONTEXT ──
  var isIframe = window.self !== window.top;

  // ══════════════════════════════════════════════════
  // 1. HEIGHT REPORTING — Robust, debounced
  // ══════════════════════════════════════════════════
  var lastReportedHeight = 0;
  var heightDebounceTimer = null;

  function getDocumentHeight() {
    // Force layout recalc
    void document.body.offsetHeight;

    return Math.max(
      document.documentElement.scrollHeight,
      document.documentElement.offsetHeight,
      document.body.scrollHeight,
      document.body.offsetHeight
    );
  }

  function sendHeight() {
    var h = getDocumentHeight();

    // Add small buffer for rounding errors
    h = Math.ceil(h) + 2;

    // Only send if height actually changed (avoid flooding parent)
    if (Math.abs(h - lastReportedHeight) < 2) return;
    lastReportedHeight = h;

    var msg = { type: 'setHeight', height: h };

    try {
      // Object format (Wix HtmlComponent.onMessage)
      window.parent.postMessage(msg, '*');
    } catch (e) { /* cross-origin — expected */ }

    try {
      // String format (some Wix versions)
      window.parent.postMessage(JSON.stringify(msg), '*');
    } catch (e) { /* cross-origin — expected */ }
  }

  function debouncedSendHeight() {
    if (heightDebounceTimer) clearTimeout(heightDebounceTimer);
    heightDebounceTimer = setTimeout(sendHeight, 50);
  }

  // ══════════════════════════════════════════════════
  // 2. SCROLL BEHAVIOR FIX
  // ══════════════════════════════════════════════════

  function enableScrolling() {
    // Ensure html/body allow scrolling
    document.documentElement.style.setProperty('overflow-y', 'auto', 'important');
    document.body.style.setProperty('overflow-y', 'auto', 'important');

    // iOS: enable momentum scrolling
    document.documentElement.style.setProperty('-webkit-overflow-scrolling', 'touch');
    document.body.style.setProperty('-webkit-overflow-scrolling', 'touch');
  }

  // ══════════════════════════════════════════════════
  // 3. SMOOTH ANCHOR SCROLL IN IFRAME
  // ══════════════════════════════════════════════════

  function setupSmoothScroll() {
    document.addEventListener('click', function (e) {
      var link = e.target.closest('a[href^="#"]');
      if (!link) return;

      var id = link.getAttribute('href').slice(1);
      if (!id) return;

      var target = document.getElementById(id);
      if (!target) return;

      e.preventDefault();

      // scrollIntoView works in most iframes
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });

      // Re-report height after scroll animation
      setTimeout(debouncedSendHeight, 600);
    });
  }

  // ══════════════════════════════════════════════════
  // 4. CONTENT VISIBILITY GUARANTEE
  // ══════════════════════════════════════════════════

  function forceRevealAll() {
    var els = document.querySelectorAll('.r');
    for (var i = 0; i < els.length; i++) {
      els[i].classList.add('on');
      els[i].style.opacity = '1';
      els[i].style.transform = 'none';
    }
  }

  // ══════════════════════════════════════════════════
  // 5. RESIZE / ORIENTATION HANDLING
  // ══════════════════════════════════════════════════

  function setupResizeHandlers() {
    // Debounced resize listener
    window.addEventListener('resize', debouncedSendHeight);

    // Orientation change (mobile)
    window.addEventListener('orientationchange', function () {
      // Wait for orientation animation to settle
      setTimeout(function () {
        debouncedSendHeight();
        // Some mobile browsers need a second pass
        setTimeout(debouncedSendHeight, 500);
      }, 300);
    });

    // MutationObserver for dynamic content changes
    if (typeof MutationObserver !== 'undefined') {
      var mo = new MutationObserver(debouncedSendHeight);
      mo.observe(document.body, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ['style', 'class']
      });
    }

    // ResizeObserver for body size changes
    if (typeof ResizeObserver !== 'undefined') {
      new ResizeObserver(debouncedSendHeight).observe(document.body);
    }

    // Image load events (images change height)
    document.querySelectorAll('img').forEach(function (img) {
      if (!img.complete) {
        img.addEventListener('load', debouncedSendHeight);
        img.addEventListener('error', debouncedSendHeight);
      }
    });
  }

  // ══════════════════════════════════════════════════
  // 6. FAQ ACCORDION — Height re-report
  // ══════════════════════════════════════════════════

  function setupFAQHeightReporting() {
    document.querySelectorAll('.faq-q').forEach(function (btn) {
      btn.addEventListener('click', function () {
        // FAQ animation takes ~400ms
        setTimeout(debouncedSendHeight, 100);
        setTimeout(debouncedSendHeight, 500);
      });
    });
  }

  // ══════════════════════════════════════════════════
  // 7. VIEWPORT META FIX
  // ══════════════════════════════════════════════════

  function fixViewportMeta() {
    var existing = document.querySelector('meta[name="viewport"]');
    var content = 'width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes, viewport-fit=cover';

    if (existing) {
      existing.setAttribute('content', content);
    } else {
      var meta = document.createElement('meta');
      meta.name = 'viewport';
      meta.content = content;
      document.head.appendChild(meta);
    }
  }

  // ══════════════════════════════════════════════════
  // INITIALIZATION
  // ══════════════════════════════════════════════════

  function init() {
    // Fix viewport meta on all contexts
    fixViewportMeta();

    // Always enable scrolling
    enableScrolling();

    // Always ensure content is visible
    forceRevealAll();

    // Setup smooth scrolling for anchor links
    setupSmoothScroll();

    if (isIframe) {
      // Mark iframe context
      document.documentElement.classList.add('is-iframe');

      // Initial height reports (staggered to catch layout shifts)
      sendHeight();
      setTimeout(sendHeight, 100);
      setTimeout(sendHeight, 300);
      setTimeout(sendHeight, 600);
      setTimeout(sendHeight, 1000);
      setTimeout(sendHeight, 2000);
      setTimeout(sendHeight, 4000);

      // Setup ongoing height reporting
      setupResizeHandlers();

      // FAQ accordion height fix
      setupFAQHeightReporting();

      // Re-report on window load (all assets loaded)
      window.addEventListener('load', function () {
        forceRevealAll();
        sendHeight();
        setTimeout(sendHeight, 500);
        setTimeout(sendHeight, 1500);
      });

      // Listen for messages from Wix parent
      window.addEventListener('message', function (e) {
        var data = e.data;
        // Handle stringified messages
        if (typeof data === 'string') {
          try { data = JSON.parse(data); } catch (err) { return; }
        }
        // Respond to height requests from parent
        if (data && data.type === 'getHeight') {
          sendHeight();
        }
      });
    }
  }

  // Run when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Safety net
  setTimeout(init, 1500);

})();

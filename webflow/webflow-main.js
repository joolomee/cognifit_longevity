// ── CTA URL ROUTING: Desktop → /assessments, Mobile → App Store ──
function applyCTARouting() {
  var isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
  var isAndroid = /Android/.test(navigator.userAgent);

  var iosURL = 'https://itunes.apple.com/app/cognifit-brain-fitness/id528285610?mt=8';
  var androidURL = 'https://play.google.com/store/apps/details?id=com.cognifit.app&hl=en';
  var desktopURL = 'https://www.cognifit.com/assessments';

  var targetURL = desktopURL;
  if (isIOS) targetURL = iosURL;
  else if (isAndroid) targetURL = androidURL;

  // ALL links open in NEW TAB — never replace current page (works in iframe too)
  var linkTarget = '_blank';

  var selectors = '.btn-primary, .btn-secondary, .btn-login, .btn-white, .pro-cta, .sticky-cta-btn';
  document.querySelectorAll(selectors).forEach(function(btn) {
    if (!btn.classList.contains('pro-cta') && !btn.classList.contains('btn-login')) {
      btn.setAttribute('href', targetURL);
    }
    if (btn.classList.contains('btn-login')) {
      btn.setAttribute('href', 'https://www.cognifit.com/login');
    }
    btn.setAttribute('target', linkTarget);
    btn.setAttribute('rel', 'noopener noreferrer');
  });

  // FORCE ALL external links to open in new tab — overrides any existing target
  document.querySelectorAll('a[href]').forEach(function(a) {
    var href = a.getAttribute('href') || '';
    // Skip in-page anchors
    if (href.startsWith('#')) return;
    if (href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('//')) {
      a.setAttribute('target', '_blank');
      a.setAttribute('rel', 'noopener noreferrer');
    }
  });
}

// ── IFRAME MODE: adapt to Wix container ──
if (window.self !== window.top) {
  // Save real IntersectionObserver before overriding (needed for scroll-top button)
  var RealIntersectionObserver = window.IntersectionObserver;

  // Override IntersectionObserver so all sections render immediately
  window.IntersectionObserver = class {
    constructor(cb) { this.cb = cb; }
    observe(el) {
      this.cb([{ isIntersecting: true, target: el, intersectionRatio: 1 }], this);
    }
    unobserve() {}
    disconnect() {}
  };

  document.documentElement.classList.add('is-iframe');

  document.addEventListener('DOMContentLoaded', () => {
  // Move triad triangle ABOVE sci-grid
  const sciSection = document.querySelector('.sci-grid');
  const triadWrap = document.querySelector('.triad-wrap');
  if (sciSection && triadWrap && sciSection.parentElement) {
    sciSection.parentElement.insertBefore(triadWrap, sciSection);
  }

const heroBadge = document.querySelector('.hero-badge');
    if (heroBadge) {
      heroBadge.style.setProperty('margin-bottom', '12px', 'important');
    }

    // Hero height: controlled by CSS (100svh on desktop/tablet, auto on mobile)

    // shimmer kept — animation stays on "Stay Independent"

  // Device section: use real image + real badge PNGs
  var iframeReviewSection = document.querySelectorAll('section.s-black')[1];
  if (iframeReviewSection) {
    var ds = document.createElement('section');
    ds.className = 'devices-section';
    ds.innerHTML = '<div class="devices-container">' +
      '<h2 class="devices-heading" data-i18n="device.h2">Train on Any Device</h2>' +
      '<p class="devices-sub" data-i18n="device.sub">Start on your computer, continue on your phone. Your progress syncs everywhere.</p>' +
      '<img src="devices_cognifit.png" alt="CogniFit on all devices" class="devices-img">' +
      '<div class="store-badges">' +
        '<a href="https://apps.apple.com/app/cognifit-brain-training/id544218985" target="_blank" rel="noopener noreferrer" class="store-btn store-btn-apple" aria-label="Download on the App Store"><svg class="store-icon" viewBox="0 0 24 24" aria-hidden="true" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg><span class="store-txt"><span class="store-line1" data-i18n="store.apple.line1">Download on the</span><span class="store-line2">App Store</span></span></a>' +
        '<a href="https://play.google.com/store/apps/details?id=com.cognifit.app" target="_blank" rel="noopener noreferrer" class="store-btn store-btn-google" aria-label="Get it on Google Play"><svg class="store-icon" viewBox="0 0 24 24" aria-hidden="true"><path fill="#EA4335" d="M3.6 2.3c-.3.3-.5.8-.5 1.4v16.6c0 .6.2 1.1.5 1.4l10.8-9.7L3.6 2.3z"/><path fill="#34A853" d="M14.4 12l3.7-3.3-11.8-6.8c-.5-.3-1-.3-1.4-.1L14.4 12z"/><path fill="#FBBC04" d="M14.4 12L4.9 21.2c.4.2.9.2 1.4-.1l11.8-6.8L14.4 12z"/><path fill="#4285F4" d="M18.1 8.7L14.4 12l3.7 3.3 4-2.3c1-.6 1-2 0-2.6l-4-1.7z"/></svg><span class="store-txt"><span class="store-line1" data-i18n="store.google.line1">Get it on</span><span class="store-line2">Google Play</span></span></a>' +
      '</div>' +
    '</div>';
    iframeReviewSection.parentElement.insertBefore(ds, iframeReviewSection);
    // Reapply translations now that the device section has been injected
    if (window.CogniFitI18n && typeof window.CogniFitI18n.setLang === 'function') {
      try { window.CogniFitI18n.setLang(window.CogniFitI18n.getLang(), false); } catch(e) {}
    }
  }

  // Login button: open in new tab on mobile
  const loginBtn = document.querySelector('.btn-login');
  if (loginBtn && window.innerWidth <= 768) {
    loginBtn.setAttribute('target', '_blank');
    loginBtn.setAttribute('rel', 'noopener noreferrer');
  }

  // Athletes card: uses HTML SVG (no JS override)


  // Press logos: static, bigger, fill width, NO marquee
  var iframePressStrip = document.querySelector('.press-strip');
  if (iframePressStrip) {
    iframePressStrip.style.setProperty('justify-content', 'space-evenly', 'important');
    iframePressStrip.style.setProperty('gap', '0', 'important');
    iframePressStrip.style.setProperty('animation', 'none', 'important');
  }
  document.querySelectorAll('.press-strip-inner').forEach(function(el) {
    el.style.setProperty('animation', 'none', 'important');
    el.style.setProperty('display', 'flex', 'important');
    el.style.setProperty('justify-content', 'space-evenly', 'important');
    el.style.setProperty('width', '100%', 'important');
  });
  document.querySelectorAll('.press-logo-card').forEach(function(card) {
    card.style.setProperty('flex', '1 1 0', 'important');
  });
  document.querySelectorAll('.press-logo-img').forEach(function(img) {
    img.style.setProperty('max-height', '60px', 'important');
    img.style.setProperty('height', '60px', 'important');
    img.style.setProperty('object-fit', 'contain', 'important');
  });


    // Navbar: fixed (requested by QA). Leave CSS position:fixed in place.
    const nav = document.getElementById('nav');
    if (nav) nav.style.position = 'fixed';

    // Scroll button: hidden until hero is out of view
    // Uses IntersectionObserver because inside Wix iframe the parent scrolls, not window
    const scrollBtn = document.querySelector('.scroll-top-btn');
    if (scrollBtn) {
      scrollBtn.style.opacity = '0';
      scrollBtn.style.pointerEvents = 'none';
      scrollBtn.style.transition = 'opacity .3s ease';
      var heroEl = document.querySelector('.hero');
      if (heroEl && RealIntersectionObserver) {
        var io = new RealIntersectionObserver(function(entries) {
          entries.forEach(function(entry) {
            // Show button once hero is no longer intersecting viewport (user scrolled past it)
            if (!entry.isIntersecting) {
              scrollBtn.style.opacity = '1';
              scrollBtn.style.pointerEvents = 'auto';
            } else {
              scrollBtn.style.opacity = '0';
              scrollBtn.style.pointerEvents = 'none';
            }
          });
        }, { threshold: 0, rootMargin: '0px' });
        io.observe(heroEl);
      }
    }

    // Force all reveal animations
    document.querySelectorAll('.r').forEach(el => el.classList.add('on'));

    setTimeout(function() {
      document.querySelectorAll('.r:not(.on)').forEach(function(el) {
        el.classList.add('on');
        el.style.opacity = '1';
        el.style.transform = 'none';
      });
      sendHeight();
    }, 0);

    // ── HEIGHT REPORTING to Wix parent for auto-resize ──
    // Must match the Velo code: data.type === 'setHeight' && data.height
    function sendHeight() {
      // Force layout recalc
      document.body.offsetHeight;
      var h = Math.max(
        document.documentElement.scrollHeight,
        document.body.scrollHeight,
        document.documentElement.offsetHeight,
        document.body.offsetHeight
      );
      var msg = { type: 'setHeight', height: h };
      // Send as object (Wix HtmlComponent.onMessage receives event.data directly)
      try { window.parent.postMessage(msg, '*'); } catch(e){}
      // Also send stringified (some Wix versions need this)
      try { window.parent.postMessage(JSON.stringify(msg), '*'); } catch(e){}
    }

    // Send repeatedly until Wix catches it
    sendHeight();
    window.addEventListener('load', function() {
      sendHeight();
      setTimeout(sendHeight, 100);
      setTimeout(sendHeight, 500);
      setTimeout(sendHeight, 1000);
      setTimeout(sendHeight, 2000);
      setTimeout(sendHeight, 4000);
      setTimeout(sendHeight, 8000);
    });
    // Re-send on any content change
    if (typeof ResizeObserver !== 'undefined') {
      new ResizeObserver(sendHeight).observe(document.body);
    }
    window.addEventListener('resize', sendHeight);

    // ── SMOOTH SCROLL for anchor links inside Wix iframe ──
    // CSS scroll-behavior:smooth doesn't work reliably in iframes,
    // so we intercept anchor clicks and scroll programmatically.
    document.addEventListener('click', function(e) {
      var link = e.target.closest('a[href^="#"]');
      if (!link) return;
      var id = link.getAttribute('href').slice(1);
      if (!id) return;
      var target = document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // Re-send height after scroll settles
      setTimeout(sendHeight, 600);
    });

    // CTA routing: desktop → assessments, mobile → app store
    applyCTARouting();

    // Make entire pro-card clickable (especially for mobile/touch)
    document.querySelectorAll('.pro-card').forEach(function(card) {
      card.style.cursor = 'pointer';
      card.addEventListener('click', function(e) {
        if (e.target.closest('a')) return;
        var link = card.querySelector('.pro-cta');
        if (link) link.click();
      });
    });
  });
}

// Non-iframe version: run same DOM manipulations
(function(){
  if (window.self === window.top) {
    document.addEventListener('DOMContentLoaded', () => {

      // 1. Hero height: controlled by CSS (100svh on desktop/tablet, auto on mobile)

      // 2. Hero badge closer to headline
      const heroBadge = document.querySelector('.hero-badge');
      if (heroBadge) {
        heroBadge.style.setProperty('margin-bottom', '12px', 'important');
      }

      // 3. Shimmer animation kept on "Stay Independent"

      // 4. Scroll hint: stays visible, scrolls away naturally

      // 5. Move triad triangle ABOVE sci-grid
      const sciGrid = document.querySelector('.sci-grid');
      const triadWrap = document.querySelector('.triad-wrap');
      if (sciGrid && triadWrap && sciGrid.parentElement) {
        sciGrid.parentElement.insertBefore(triadWrap, sciGrid);
      }

      // 6. (triad node click handling moved to SCI-CARD CASCADE INTERACTION block)

      // 7. Device section: use real image + real badge PNGs
      var reviewSection = document.querySelectorAll('section.s-black')[1];
      if (reviewSection) {
        var ds = document.createElement('section');
        ds.className = 'devices-section';
        ds.innerHTML = '<div class="devices-container">' +
          '<h2 class="devices-heading" data-i18n="device.h2">Train on Any Device</h2>' +
          '<p class="devices-sub" data-i18n="device.sub">Start on your computer, continue on your phone. Your progress syncs everywhere.</p>' +
          '<img src="devices_cognifit.png" alt="CogniFit on all devices" class="devices-img">' +
          '<div class="store-badges">' +
            '<a href="https://apps.apple.com/app/cognifit-brain-training/id544218985" target="_blank" rel="noopener noreferrer" class="store-btn store-btn-apple" aria-label="Download on the App Store"><svg class="store-icon" viewBox="0 0 24 24" aria-hidden="true" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg><span class="store-txt"><span class="store-line1" data-i18n="store.apple.line1">Download on the</span><span class="store-line2">App Store</span></span></a>' +
            '<a href="https://play.google.com/store/apps/details?id=com.cognifit.app" target="_blank" rel="noopener noreferrer" class="store-btn store-btn-google" aria-label="Get it on Google Play"><svg class="store-icon" viewBox="0 0 24 24" aria-hidden="true"><path fill="#EA4335" d="M3.6 2.3c-.3.3-.5.8-.5 1.4v16.6c0 .6.2 1.1.5 1.4l10.8-9.7L3.6 2.3z"/><path fill="#34A853" d="M14.4 12l3.7-3.3-11.8-6.8c-.5-.3-1-.3-1.4-.1L14.4 12z"/><path fill="#FBBC04" d="M14.4 12L4.9 21.2c.4.2.9.2 1.4-.1l11.8-6.8L14.4 12z"/><path fill="#4285F4" d="M18.1 8.7L14.4 12l3.7 3.3 4-2.3c1-.6 1-2 0-2.6l-4-1.7z"/></svg><span class="store-txt"><span class="store-line1" data-i18n="store.google.line1">Get it on</span><span class="store-line2">Google Play</span></span></a>' +
          '</div>' +
        '</div>';
        reviewSection.parentElement.insertBefore(ds, reviewSection);
        // Reapply translations now that the device section has been injected
        if (window.CogniFitI18n && typeof window.CogniFitI18n.setLang === 'function') {
          try { window.CogniFitI18n.setLang(window.CogniFitI18n.getLang(), false); } catch(e) {}
        }
      }

      // 8. Login button: open in new tab on mobile
      var loginBtn = document.querySelector('.btn-login');
      if (loginBtn && window.innerWidth <= 768) {
        loginBtn.setAttribute('target', '_blank');
        loginBtn.setAttribute('rel', 'noopener noreferrer');
      }

      // 9. Press logos: static, bigger, fill width, NO marquee, NO new SVG logos
      var pressStrip = document.querySelector('.press-strip');
      if (pressStrip) {
        pressStrip.style.setProperty('justify-content', 'space-evenly', 'important');
        pressStrip.style.setProperty('gap', '0', 'important');
        pressStrip.style.setProperty('animation', 'none', 'important');
      }
      document.querySelectorAll('.press-strip-inner').forEach(function(el) {
        el.style.setProperty('animation', 'none', 'important');
        el.style.setProperty('display', 'flex', 'important');
        el.style.setProperty('justify-content', 'space-evenly', 'important');
        el.style.setProperty('width', '100%', 'important');
      });
      document.querySelectorAll('.press-logo-card').forEach(function(card) {
        card.style.setProperty('flex', '1 1 0', 'important');
      });
      document.querySelectorAll('.press-logo-img').forEach(function(img) {
        img.style.setProperty('max-height', '60px', 'important');
    img.style.setProperty('height', '60px', 'important');
        img.style.setProperty('object-fit', 'contain', 'important');
      });

      // 10. Athletes card: uses HTML SVG (no JS override)

      // 11. Scroll-top button handled by IntersectionObserver above (works across all media queries inside Wix iframe)

      // CTA routing: desktop → assessments, mobile → app store
      applyCTARouting();

      // Make entire pro-card clickable (especially for mobile/touch)
      document.querySelectorAll('.pro-card').forEach(function(card) {
        card.style.cursor = 'pointer';
        card.addEventListener('click', function(e) {
          if (e.target.closest('a')) return; // Don't double-navigate if they click the link directly
          var link = card.querySelector('.pro-cta');
          if (link) link.click();
        });
      });

    });
  }
})();

/* ── NEURON CANVAS — flowing streams, subtle somas ── */
(function(){
  const canvas = document.getElementById('neural-canvas');
  if(!canvas) return;
  // Skip heavy canvas on mobile or when user prefers reduced motion
  if(window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const ctx = canvas.getContext('2d');
  let W, H, neurons = [], signals = [], streams = [];
  const mouse = {x:-9999, y:-9999};

  const CFG = {
    count: 24,
    connDist: 250,
    palette: [{h:210,s:65,l:55},{h:220,s:60,l:58},{h:200,s:70,l:52}]
  };

  /* ── STREAM PARTICLE — flowing along a fixed path ── */
  class Stream {
    constructor() { this.reset(true); }
    reset(init) {
      this.x = init ? Math.random()*W : -10;
      this.y = init ? Math.random()*H : Math.random()*H;
      const angle = -0.2 + Math.random()*0.4 + (Math.random()<0.3 ? Math.PI : 0);
      const speed = 0.3 + Math.random()*0.5;
      this.vx = Math.cos(angle)*speed;
      this.vy = Math.sin(angle)*speed * 0.3;
      this.len = 40 + Math.random()*80;
      this.h = 205 + Math.random()*25;
      this.a = 0.04 + Math.random()*0.08;
      this.w = 0.4 + Math.random()*0.8;
      this.trail = [];
      this.maxTrail = Math.floor(this.len / Math.max(0.1, Math.hypot(this.vx, this.vy)));
    }
    update() {
      this.trail.unshift({x:this.x, y:this.y});
      if(this.trail.length > this.maxTrail) this.trail.pop();
      this.x += this.vx; this.y += this.vy;
      if(this.x > W+20 || this.x < -20 || this.y > H+20 || this.y < -20) this.reset(false);
    }
    draw() {
      if(this.trail.length < 2) return;
      for(let i=0; i<this.trail.length-1; i++) {
        const alpha = this.a * (1 - i/this.trail.length);
        ctx.beginPath();
        ctx.moveTo(this.trail[i].x, this.trail[i].y);
        ctx.lineTo(this.trail[i+1].x, this.trail[i+1].y);
        ctx.strokeStyle = `hsla(${this.h},70%,65%,${alpha})`;
        ctx.lineWidth = this.w * (1 - i/this.trail.length);
        ctx.stroke();
      }
    }
  }

  /* ── SIGNAL ── */
  class Signal {
    constructor(from, to) {
      this.from=from; this.to=to; this.t=0; this.alive=true;
      this.speed = 0.005 + Math.random()*0.006;
      this.color = from.color;
    }
    getPos(t) {
      const cx=(this.from.x+this.to.x)/2+this.from.bx;
      const cy=(this.from.y+this.to.y)/2+this.from.by;
      const m=1-t;
      return {x:m*m*this.from.x+2*m*t*cx+t*t*this.to.x,
              y:m*m*this.from.y+2*m*t*cy+t*t*this.to.y};
    }
    update() {
      this.t += this.speed;
      if(this.t>=1){ this.alive=false; this.to.activate(0.7); if(Math.random()<0.45) this.to.fire(); }
    }
    draw() {
      const pos = this.getPos(this.t);
      const {h,s,l} = this.color;
      const g = ctx.createRadialGradient(pos.x,pos.y,0,pos.x,pos.y,6);
      g.addColorStop(0,`hsla(${h},${s}%,${l+25}%,0.55)`);
      g.addColorStop(1,'transparent');
      ctx.beginPath(); ctx.arc(pos.x,pos.y,6,0,Math.PI*2);
      ctx.fillStyle=g; ctx.fill();
      ctx.beginPath(); ctx.arc(pos.x,pos.y,1.4,0,Math.PI*2);
      ctx.fillStyle=`hsla(${h},${s}%,90%,0.7)`; ctx.fill();
    }
  }

  /* ── NEURON ── */
  class Neuron {
    constructor(x,y) {
      this.x=x; this.y=y;
      this.vx=(Math.random()-.5)*0.1; this.vy=(Math.random()-.5)*0.1;
      this.r=1.8+Math.random()*2.2;
      this.color=CFG.palette[Math.floor(Math.random()*CFG.palette.length)];
      this.activation=0; this.breathe=Math.random()*Math.PI*2;
      this.breatheSpeed=0.006+Math.random()*0.004;
      this.connections=[]; this.fireTimer=100+Math.floor(Math.random()*280);
      this.bx=(Math.random()-.5)*70; this.by=(Math.random()-.5)*70;
      this.dendrites=Array.from({length:2+Math.floor(Math.random()*3)},()=>({
        angle:Math.random()*Math.PI*2, len:10+Math.random()*20
      }));
    }
    activate(v){ this.activation=Math.min(1,this.activation+v); }
    fire(){
      if(!this.connections.length) return;
      const t=this.connections[Math.floor(Math.random()*this.connections.length)];
      if(t) signals.push(new Signal(this,t));
    }
    update(){
      this.breathe+=this.breatheSpeed; this.activation*=0.94;
      const dx=this.x-mouse.x, dy=this.y-mouse.y;
      if(Math.hypot(dx,dy)<180) this.activate(0.02);
      this.x+=this.vx; this.y+=this.vy;
      if(this.x<50) this.vx+=0.006; if(this.x>W-50) this.vx-=0.006;
      if(this.y<50) this.vy+=0.006; if(this.y>H-50) this.vy-=0.006;
      this.vx*=0.996; this.vy*=0.996;
      this.fireTimer--;
      if(this.fireTimer<=0){ this.fire(); this.activate(0.4); this.fireTimer=140+Math.floor(Math.random()*300); }
    }
    drawAxons(){
      const {h,s,l}=this.color;
      this.connections.forEach(b=>{
        const d=Math.hypot(this.x-b.x,this.y-b.y);
        const str=1-d/CFG.connDist;
        const alpha=str*(0.07+this.activation*0.1);
        const cx=(this.x+b.x)/2+this.bx*0.4, cy=(this.y+b.y)/2+this.by*0.4;
        ctx.beginPath(); ctx.moveTo(this.x,this.y);
        ctx.quadraticCurveTo(cx,cy,b.x,b.y);
        const grad=ctx.createLinearGradient(this.x,this.y,b.x,b.y);
        grad.addColorStop(0,`hsla(${h},${s}%,${l}%,${alpha})`);
        grad.addColorStop(1,`hsla(${b.color.h},${b.color.s}%,${b.color.l}%,${alpha*0.4})`);
        ctx.strokeStyle=grad; ctx.lineWidth=0.5+str*0.7; ctx.stroke();
      });
    }
    drawDendrites(){
      const {h,s,l}=this.color;
      this.dendrites.forEach(d=>{
        const ex=this.x+Math.cos(d.angle+this.breathe*0.07)*d.len;
        const ey=this.y+Math.sin(d.angle+this.breathe*0.07)*d.len;
        ctx.beginPath(); ctx.moveTo(this.x,this.y); ctx.lineTo(ex,ey);
        ctx.strokeStyle=`hsla(${h},${s}%,${l}%,${0.07+this.activation*0.08})`;
        ctx.lineWidth=0.4; ctx.stroke();
      });
    }
    drawSoma(){
      const {h,s,l}=this.color;
      const bf=Math.sin(this.breathe)*0.1+0.9;
      const r=this.r*bf+this.activation*1.8;
      const glowR=r*(3+this.activation*5);
      const glow=ctx.createRadialGradient(this.x,this.y,0,this.x,this.y,glowR);
      glow.addColorStop(0,`hsla(${h},${s}%,${l+10}%,${0.07+this.activation*0.2})`);
      glow.addColorStop(1,'transparent');
      ctx.beginPath(); ctx.arc(this.x,this.y,glowR,0,Math.PI*2); ctx.fillStyle=glow; ctx.fill();
      const ba=0.25+this.activation*0.45;
      const body=ctx.createRadialGradient(this.x-r*.3,this.y-r*.3,0,this.x,this.y,r);
      body.addColorStop(0,`hsla(${h},${s}%,${l+22}%,${ba})`);
      body.addColorStop(1,`hsla(${h},${s}%,${l}%,${ba*.45})`);
      ctx.beginPath(); ctx.arc(this.x,this.y,r,0,Math.PI*2); ctx.fillStyle=body; ctx.fill();
    }
  }

  function drawAmbient(){
    const t=Date.now()*0.00015;
    [{x:0.22,y:0.32,r:400,a:0.03,h:215},{x:0.76,y:0.62,r:340,a:0.025,h:222}].forEach((b,i)=>{
      const bx=W*(b.x+Math.sin(t*(0.28+i*.12))*.05);
      const by=H*(b.y+Math.cos(t*(0.22+i*.1))*.05);
      const g=ctx.createRadialGradient(bx,by,0,bx,by,b.r);
      g.addColorStop(0,`hsla(${b.h},70%,45%,${b.a})`); g.addColorStop(1,'transparent');
      ctx.beginPath(); ctx.arc(bx,by,b.r,0,Math.PI*2); ctx.fillStyle=g; ctx.fill();
    });
  }

  function buildConnections(){
    neurons.forEach(n=>n.connections=[]);
    neurons.forEach((a,i)=>neurons.forEach((b,j)=>{
      if(i>=j) return;
      if(Math.hypot(a.x-b.x,a.y-b.y)<CFG.connDist){ a.connections.push(b); b.connections.push(a); }
    }));
  }

  function resize(){
    const hero=canvas.closest('.hero');
    W=canvas.width=hero?hero.offsetWidth:window.innerWidth;
    H=canvas.height=hero?hero.offsetHeight:window.innerHeight;
    buildConnections();
  }

  function tick(){
    ctx.clearRect(0,0,W,H);
    drawAmbient();
    streams.forEach(s=>{s.update();s.draw();});
    neurons.forEach(n=>n.drawAxons());
    neurons.forEach(n=>n.drawDendrites());
    signals=signals.filter(s=>{s.update();s.draw();return s.alive;});
    neurons.forEach(n=>{n.update();n.drawSoma();});
    requestAnimationFrame(tick);
  }

  canvas.addEventListener('mousemove',e=>{const r=canvas.getBoundingClientRect();mouse.x=e.clientX-r.left;mouse.y=e.clientY-r.top;});
  canvas.addEventListener('mouseleave',()=>{mouse.x=-9999;mouse.y=-9999;});
  canvas.addEventListener('click',e=>{
    const r=canvas.getBoundingClientRect();
    const cx=e.clientX-r.left,cy=e.clientY-r.top;
    let near=null,nd=Infinity;
    neurons.forEach(n=>{const d=Math.hypot(n.x-cx,n.y-cy);if(d<nd){nd=d;near=n;}});
    if(near){near.activate(1);near.fire();near.fire();}
  });
  canvas.addEventListener('touchmove',e=>{
    e.preventDefault();const r=canvas.getBoundingClientRect();
    mouse.x=e.touches[0].clientX-r.left;mouse.y=e.touches[0].clientY-r.top;
  },{passive:false});
  window.addEventListener('resize',resize);
  resize();
  neurons=Array.from({length:CFG.count},()=>new Neuron(80+Math.random()*(W-160),80+Math.random()*(H-160)));
  buildConnections();
  neurons.forEach((n,i)=>n.fireTimer=i*15+Math.floor(Math.random()*70));
  /* 55 stream particles for flowing movement */
  streams=Array.from({length:55},()=>new Stream());
  tick();
})();

/* Scroll reveal */
document.querySelectorAll('.r').forEach(el => el.classList.add('on'));

/* Nav — adaptive: transparent on dark, light bg on s-white/s-off */
const nav=document.getElementById('nav');
const _lightSecs=[...document.querySelectorAll('.s-white,.s-off')];
function updateNav(){
  if(!nav) return;
  const navH=nav.offsetHeight||60;
  let isLight=false;
  _lightSecs.forEach(sec=>{
    const r=sec.getBoundingClientRect();
    if(r.top<navH&&r.bottom>0) isLight=true;
  });
  nav.classList.toggle('nav-light',isLight);
  const past=window.scrollY>60;
  if(!isLight){
    nav.style.background=past?'rgba(0,0,0,0.45)':'rgba(0,0,0,0.15)';
  } else {
    nav.style.background='rgba(255,255,255,0.82)';
  }
}
window.addEventListener('scroll',updateNav,{passive:true});
updateNav(); // run once on load

/* Skill bars — transform-based animation (FIX 2026-04-26)
   Why transform: width animation collapsed in iframe shim because
   width=0% and width=target happened in same frame. Transform scaleX
   uses a class toggle so initial state paints first. The inline-style
   width on each bar is kept as the FINAL bar size; scaleX(0→1) animates
   the visual fill from empty to full. Works in iframe + standalone. */
document.querySelectorAll('.sk-fill').forEach(bar => {
  // Force the initial paint (scaleX(0) via CSS) before adding the class
  // that triggers scaleX(1) — double rAF guarantees a frame in between.
  new IntersectionObserver(([e], ob) => {
    if (e.isIntersecting) {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => bar.classList.add('is-visible'));
      });
      ob.unobserve(bar);
    }
  }, { threshold: 0.2 }).observe(bar);
});

/* ══════════════════════════════════════════════════════════
   PARALLAX ENGINE
══════════════════════════════════════════════════════════ */
(function(){
  /* ── 1. HERO CANVAS PARALLAX ── */
  const heroCanvas = document.getElementById('neural-canvas');
  if(heroCanvas){
    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      heroCanvas.style.transform = `translateY(${y * 0.3}px)`;
    }, {passive: true});
  }

  /* ── 2. SECTION BACKGROUND PARALLAX ── */
  const parallaxSections = document.querySelectorAll('.s-black, .s-dark, .s-blue, .closing');
  function updateSectionParallax() {
    const scrollY = window.scrollY;
    parallaxSections.forEach(sec => {
      const rect = sec.getBoundingClientRect();
      const centerOffset = (rect.top + rect.height / 2) - window.innerHeight / 2;
      const shift = centerOffset * 0.08;
      sec.style.backgroundPositionY = `calc(50% + ${shift}px)`;
    });
  }

  /* ── 3. PRO CARD 3D TILT ON MOUSE ── */
  document.querySelectorAll('.pro-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dx = (e.clientX - cx) / (r.width / 2);
      const dy = (e.clientY - cy) / (r.height / 2);
      card.style.transform = `translateY(-6px) rotateY(${dx * 5}deg) rotateX(${-dy * 4}deg)`;
      card.style.transition = 'transform 0.08s ease';
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.transition = 'transform 0.5s cubic-bezier(.4,0,.2,1)';
    });
  });

  /* ── 3b. SITEWIDE CARD TILT ── */
  document.querySelectorAll('.sci-card, .step-card, .who-card, .rev-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      const dx = (e.clientX - (r.left + r.width / 2)) / (r.width / 2);
      const dy = (e.clientY - (r.top + r.height / 2)) / (r.height / 2);
      card.style.transform = `translateY(-4px) rotateY(${dx * 4}deg) rotateX(${-dy * 3}deg)`;
      card.style.transition = 'transform 0.08s ease';
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.transition = 'transform 0.5s cubic-bezier(.4,0,.2,1)';
    });
  });

  /* ── 3b-ii. TRUST BADGE TILT ── */
  document.querySelectorAll('.t-badge').forEach(b => {
    b.addEventListener('mousemove', e => {
      const r = b.getBoundingClientRect();
      const dx = (e.clientX-(r.left+r.width/2))/(r.width/2);
      const dy = (e.clientY-(r.top+r.height/2))/(r.height/2);
      b.style.transform=`translateY(-3px) scale(1.04) rotateY(${dx*4}deg) rotateX(${-dy*3}deg)`;
      b.style.transition='transform 0.08s ease';
    });
    b.addEventListener('mouseleave',()=>{
      b.style.transform='';
      b.style.transition='transform 0.5s cubic-bezier(.4,0,.2,1)';
    });
  });

  /* ── 4. STATS COUNT-UP ANIMATION ── */
  function animateCount(textNode, target, isDecimal, duration) {
    const start = performance.now();
    function step(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = target * eased;
      textNode.nodeValue = isDecimal ? current.toFixed(1) : Math.floor(current).toLocaleString();
      if(progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  const statObserver = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if(!e.isIntersecting) return;
      const el = e.target;
      const raw = el.dataset.count;
      if(!raw) return;
      const target = parseFloat(raw);
      const isDecimal = raw.includes('.');
      let textNode = Array.from(el.childNodes).find(n => n.nodeType === 3);
      if(!textNode) return;
      animateCount(textNode, target, isDecimal, 1800);
      statObserver.unobserve(el);
    });
  }, {threshold: 0.5});

  document.querySelectorAll('.stat-n').forEach(el => {
    const textNode = Array.from(el.childNodes).find(n => n.nodeType === 3);
    if(!textNode) return;
    const raw = textNode.nodeValue.trim();
    const num = parseFloat(raw.replace(/,/g, ''));
    if(isNaN(num)) return;
    el.dataset.count = raw.replace(/,/g, '');
    textNode.nodeValue = raw.includes('.') ? '0.0' : '0';
    statObserver.observe(el);
  });

  /* ── 6. HERO TEXT LAYERS PARALLAX ── */
  const heroText = document.querySelector('.hero-text');
  if(heroText){
    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      if(y < window.innerHeight * 1.5) {
        heroText.style.transform = `translateY(${y * 0.18}px)`;
        heroText.style.opacity = `${1 - y / (window.innerHeight * 0.85)}`;
      }
    }, {passive: true});
  }

  /* ── 7. PRO CARD STAGGER ON SCROLL ENTER ── */
  const proCardObserver = new IntersectionObserver(entries => {
    entries.forEach((e, i) => {
      if(!e.isIntersecting) return;
      const delay = Array.from(e.target.parentNode.children).indexOf(e.target) * 120;
      setTimeout(() => {
        e.target.style.opacity = '1';
        e.target.style.transform = 'translateY(0) scale(1)';
      }, delay);
      proCardObserver.unobserve(e.target);
    });
  }, {threshold: 0.1});

  document.querySelectorAll('.pro-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(40px) scale(0.97)';
    card.style.transition = 'opacity 0.7s cubic-bezier(.4,0,.2,1), transform 0.7s cubic-bezier(.4,0,.2,1)';
    proCardObserver.observe(card);
  });

  /* ── COMBINED SCROLL HANDLER ── */
  function onScroll() {
    updateSectionParallax();
  }
  window.addEventListener('scroll', onScroll, {passive: true});
  onScroll();
})();

/* ═══════════════════════════════════════════════════
   COGNI:WAVE DYNAMIC LAYER
═══════════════════════════════════════════════════ */
(function(){
  /* ── 1. CURSOR GLOW ── */
  const glow = document.createElement('div');
  glow.className = 'cursor-glow';
  document.body.appendChild(glow);
  let glowX = 0, glowY = 0, mouseX = 0, mouseY = 0;
  document.addEventListener('mousemove', e => { mouseX = e.clientX; mouseY = e.clientY; });
  (function trackGlow(){
    glowX += (mouseX - glowX) * 0.07;
    glowY += (mouseY - glowY) * 0.07;
    glow.style.left = glowX + 'px';
    glow.style.top  = glowY + 'px';
    requestAnimationFrame(trackGlow);
  })();

  /* ── 2. MAGNETIC BUTTONS ── */
  document.querySelectorAll('.btn-primary, .btn-white, .btn-secondary').forEach(btn => {
    btn.addEventListener('mousemove', e => {
      const r = btn.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width  - 0.5) * 14;
      const y = ((e.clientY - r.top)  / r.height - 0.5) * 10;
      btn.style.transition = 'transform 0.1s ease';
      btn.style.transform  = `translate(${x}px, ${y}px)`;
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transition = 'transform 0.55s cubic-bezier(.4,0,.2,1)';
      btn.style.transform  = '';
    });
  });

  /* ── 3. SMOOTH GRADIENT TRANSITIONS between sections ── */
  const COLOR_MAP = {
    'hero':    '#000000',
    's-black': '#000000',
    's-dark':  '#080808',
    's-white': '#ffffff',
    's-off':   '#f4f4f4',
    's-blue':  '#1A73E8',
    'closing': '#000000',
  };
  function sectionColor(el) {
    for(const [cls, col] of Object.entries(COLOR_MAP)) {
      if(el.classList.contains(cls)) return col;
    }
    return null;
  }
  const sections = [...document.querySelectorAll('.hero, section, .closing')];
  sections.forEach((sec, i) => {
    if(i === 0) return;
    const from = sectionColor(sections[i - 1]);
    const to   = sectionColor(sec);
    if(!from || !to || from === to) return;
    const div = document.createElement('div');
    div.className = 'wave-div';
    div.style.cssText = `height:1px;background:linear-gradient(90deg,transparent 0%,rgba(26,115,232,.28) 25%,rgba(255,255,255,.1) 50%,rgba(26,115,232,.28) 75%,transparent 100%);box-shadow:0 0 16px 6px rgba(26,115,232,.07);margin:0;position:relative;z-index:2;pointer-events:none;`;
    sec.parentNode.insertBefore(div, sec);
  });

  /* ── 4. AMBIENT ORBS — all sections ── */
  const ORB_CONFIGS = [
    { selector: '.hero', orbs: [
      { w:750, h:750, left:'70%', top:'28%', color:'rgba(26,115,232,0.14)', cls:'a' },
      { w:500, h:500, left:'6%',  top:'58%', color:'rgba(110,50,230,0.09)', cls:'b' },
      { w:340, h:340, left:'42%', top:'78%', color:'rgba(0,200,210,0.07)',  cls:'c' },
    ]},
    { selector: '.s-dark', orbs: [
      { w:560, h:560, left:'88%', top:'22%', color:'rgba(26,115,232,0.10)', cls:'b' },
      { w:400, h:400, left:'4%',  top:'68%', color:'rgba(120,40,220,0.08)', cls:'a' },
      { w:260, h:260, left:'50%', top:'50%', color:'rgba(0,180,200,0.05)',  cls:'c' },
    ]},
    { selector: '.s-black', orbs: [
      { w:600, h:600, left:'15%', top:'35%', color:'rgba(26,115,232,0.09)', cls:'c' },
      { w:380, h:380, left:'82%', top:'65%', color:'rgba(100,40,200,0.07)', cls:'b' },
    ]},
    { selector: '.s-white', orbs: [
      { w:700, h:700, left:'80%', top:'20%', color:'rgba(26,115,232,0.04)', cls:'b' },
      { w:500, h:500, left:'5%',  top:'75%', color:'rgba(100,60,220,0.03)', cls:'a' },
    ]},
    { selector: '.s-off', orbs: [
      { w:600, h:600, left:'78%', top:'30%', color:'rgba(26,115,232,0.04)', cls:'a' },
      { w:400, h:400, left:'8%',  top:'60%', color:'rgba(80,40,180,0.03)',  cls:'c' },
    ]},
    { selector: '.s-blue', orbs: [
      { w:520, h:520, left:'82%', top:'38%', color:'rgba(255,255,255,0.07)', cls:'b' },
      { w:320, h:320, left:'12%', top:'68%', color:'rgba(255,255,255,0.05)', cls:'c' },
    ]},
    { selector: '.closing', orbs: [
      { w:650, h:650, left:'50%', top:'50%', color:'rgba(26,115,232,0.09)', cls:'a' },
      { w:350, h:350, left:'85%', top:'25%', color:'rgba(100,40,200,0.06)', cls:'c' },
    ]},
  ];
  ORB_CONFIGS.forEach(({ selector, orbs }) => {
    document.querySelectorAll(selector).forEach(sec => {
      orbs.forEach(cfg => {
        const orb = document.createElement('div');
        orb.className = `orb ${cfg.cls}`;
        Object.assign(orb.style, {
          width:      cfg.w + 'px',
          height:     cfg.h + 'px',
          left:       cfg.left,
          top:        cfg.top,
          background: cfg.color,
        });
        sec.appendChild(orb);
      });
    });
  });

  /* ── 5. SECTION ENTRANCE ── */
  const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if(!e.isIntersecting) return;
      e.target.style.opacity   = '1';
      e.target.style.transform = 'translateY(0)';
      sectionObserver.unobserve(e.target);
    });
  }, { threshold: 0.06 });

  /* ── 6. TRAVELING BACKGROUND STREAKS ── */
  const TRAVELER_CFGS = [
    { sel:'.hero',    ts:[{cls:'t1',top:'22%',dur:'13s',del:'0s'},{cls:'t2',top:'68%',dur:'19s',del:'-6s'},{cls:'t3',top:'44%',dur:'25s',del:'-11s'}] },
    { sel:'.s-dark',  ts:[{cls:'t1',top:'18%',dur:'16s',del:'-3s'},{cls:'t2',top:'72%',dur:'21s',del:'-9s'}] },
    { sel:'.s-black', ts:[{cls:'t1',top:'35%',dur:'18s',del:'-7s'},{cls:'t3',top:'60%',dur:'26s',del:'-14s'}] },
    { sel:'.s-blue',  ts:[{cls:'t1',top:'25%',dur:'14s',del:'-4s'},{cls:'t2',top:'70%',dur:'22s',del:'-10s'}] },
    { sel:'.closing', ts:[{cls:'t1',top:'30%',dur:'15s',del:'-2s'},{cls:'t3',top:'65%',dur:'24s',del:'-12s'}] },
  ];
  TRAVELER_CFGS.forEach(({ sel, ts }) => {
    document.querySelectorAll(sel).forEach(sec => {
      ts.forEach(cfg => {
        const el = document.createElement('div');
        el.className = `traveler ${cfg.cls}`;
        el.style.cssText = `--top:${cfg.top};--dur:${cfg.dur};--del:${cfg.del};top:${cfg.top}`;
        sec.appendChild(el);
      });
    });
  });

  /* ── 7. GLOW RING ── */
  const ccr = document.getElementById('ccr');
  if(ccr && window.matchMedia('(hover:hover)').matches) {
    document.addEventListener('mousemove', e => {
      ccr.style.left = e.clientX + 'px';
      ccr.style.top  = e.clientY + 'px';
    }, {passive:true});
    const hoverEls = 'a,button,.btn-primary,.btn-white,.btn-secondary,.btn-login,.pro-cta';
    document.querySelectorAll(hoverEls).forEach(el => {
      el.addEventListener('mouseenter', () => ccr.classList.add('hover'));
      el.addEventListener('mouseleave', () => ccr.classList.remove('hover'));
    });
  }
})();

/* ── SCI-CARD CASCADE INTERACTION (toggle system) ── */
(function(){
  const cards = document.querySelectorAll('.sci-card');
  const status = document.getElementById('sci-status');
  const resetHint = document.getElementById('sci-reset');
  if(!cards.length) return;

  function tx(key, fallback) {
    try {
      var lang = (window.CogniFitI18n && window.CogniFitI18n.getLang && window.CogniFitI18n.getLang()) || document.documentElement.lang || 'en';
      if (window.T && window.T[lang] && window.T[lang][key]) return window.T[lang][key];
      if (window.T && window.T.en && window.T.en[key]) return window.T.en[key];
    } catch(e){}
    return fallback;
  }

  function getNames() {
    return {
      executive: tx('sci.s1.t', 'Executive Function'),
      memory: tx('sci.s2.t', 'Working Memory'),
      attention: tx('sci.s3.t', 'Attention')
    };
  }

  const disabled = new Set();
  let autoResetTimer = null;

  // Move instruction text above sci-grid
  const sciGrid = document.querySelector('.sci-grid');
  let instructionEl = null;
  if (sciGrid) {
    instructionEl = document.createElement('p');
    instructionEl.className = 'sci-instruction';
    instructionEl.setAttribute('data-i18n', 'sci.tap.idle');
    instructionEl.textContent = tx('sci.tap.idle', 'Tap any system to see what happens when it fails');
    instructionEl.style.cssText = 'text-align:center;font-size:clamp(12px,2vw,14px);color:rgba(0,0,0,0.5);margin-bottom:16px;font-weight:600;letter-spacing:0.03em;transition:all .3s ease;';
    sciGrid.parentNode.insertBefore(instructionEl, sciGrid);
  }

  function clearAutoReset() {
    if (autoResetTimer) { clearTimeout(autoResetTimer); autoResetTimer = null; }
  }

  function restoreAll() {
    clearAutoReset();
    disabled.clear();
    cards.forEach(function(card) {
      card.classList.remove('sci-broken', 'sci-dim');
      card.style.removeProperty('background');
      card.style.removeProperty('opacity');
    });
    if (status) status.classList.add('hidden');
    if (resetHint) resetHint.classList.add('hidden');
    if (instructionEl) {
      instructionEl.setAttribute('data-i18n', 'sci.tap.idle');
      instructionEl.textContent = tx('sci.tap.idle', 'Tap any system to see what happens when it fails');
      instructionEl.style.color = 'rgba(0,0,0,0.5)';
    }
    if (window.triadSetBroken) window.triadSetBroken(false);
  }

  function scheduleAutoReset() {
    clearAutoReset();
    autoResetTimer = setTimeout(restoreAll, 10000);
  }

  function updateBrokenState() {
    var anyDisabled = disabled.size > 0;

    cards.forEach(function(card) {
      var sys = card.dataset.system;
      if (disabled.has(sys)) {
        card.classList.add('sci-broken');
        card.classList.remove('sci-dim');
        card.style.setProperty('background', 'rgba(239,68,68,.13)', 'important');
        card.style.setProperty('opacity', '1', 'important');
      } else if (anyDisabled) {
        card.classList.remove('sci-broken', 'sci-dim');
        card.style.setProperty('background', 'rgba(239,68,68,.07)', 'important');
        card.style.setProperty('opacity', '1', 'important');
      }
    });

    if (anyDisabled) {
      var _NAMES = getNames();
      var names = Array.from(disabled).map(function(s) { return _NAMES[s]; }).join(' & ');
      if (status) {
        var statusTpl = tx('sci.broken.status', '{names} weakened, the entire cognitive network is compromised.');
        status.textContent = statusTpl.replace('{names}', names);
        status.classList.remove('hidden');
      }
      if (resetHint) {
        resetHint.textContent = tx('sci.broken.hint', 'Tap disabled abilities to restore them');
        resetHint.classList.remove('hidden');
      }
      if (instructionEl) {
        instructionEl.setAttribute('data-i18n', 'sci.tap.hint');
        instructionEl.textContent = tx('sci.tap.hint', 'Tap the damaged system to restore balance');
        instructionEl.style.color = 'rgba(239,68,68,0.7)';
      }
      if (window.triadSetBroken) window.triadSetBroken(true);
      var firstDisabled = Array.from(disabled)[0];
      if (window.triadBreakFrom) window.triadBreakFrom(firstDisabled);
      scheduleAutoReset();
    }
  }

  cards.forEach(function(card) {
    card.style.cursor = 'pointer';
    card.addEventListener('click', function() {
      var sys = card.dataset.system;
      if (disabled.has(sys)) {
        // Tapping a damaged system -> restore ALL
        restoreAll();
      } else {
        // Tapping a healthy system -> break it
        disabled.add(sys);
        updateBrokenState();
      }
    });
  });

  // Triad nodes also toggle
  document.querySelectorAll('.td-node').forEach(function(node) {
    node.style.cursor = 'pointer';
    node.addEventListener('click', function() {
      var sysMap = { 'td-n0': 'executive', 'td-n1': 'memory', 'td-n2': 'attention' };
      var sys = sysMap[node.id];
      if (!sys) return;
      var card = document.querySelector('.sci-card[data-system="' + sys + '"]');
      if (card) card.click();
    });
  });
})();



/* ── TRIAD SVG — staggered cascade break ── */
const _SYS_NODE = { executive: '0', memory: '1', attention: '2' };
let _triadBreakTimer = null;
window.triadBreakFrom = function(sysName) {
  const svg = document.getElementById('triad-svg');
  if (!svg) return;
  if (_triadBreakTimer) { clearTimeout(_triadBreakTimer); _triadBreakTimer = null; }
  // Immediate: turn all 3 circles + edges red the moment user clicks
  svg.setAttribute('data-breaking', _SYS_NODE[sysName] || '0');
  svg.classList.add('triad-broken');
};
window.triadSetBroken = function(state) {
  const svg = document.getElementById('triad-svg');
  if (!svg) return;
  if (!state) {
    if (_triadBreakTimer) { clearTimeout(_triadBreakTimer); _triadBreakTimer = null; }
    svg.classList.remove('triad-broken');
    svg.removeAttribute('data-breaking');
  }
};

/* ── FAQ ACCORDION ── */
document.querySelectorAll('.faq-q').forEach(function(btn) {
  btn.addEventListener('click', function() {
    var item = btn.closest('.faq-item');
    var isOpen = item.classList.contains('open');
    // Close all other items
    document.querySelectorAll('.faq-item.open').forEach(function(openItem) {
      openItem.classList.remove('open');
      openItem.querySelector('.faq-q').setAttribute('aria-expanded', 'false');
    });
    // Toggle this one
    if (!isOpen) {
      item.classList.add('open');
      btn.setAttribute('aria-expanded', 'true');
    }
  });
});

// FAQ items start closed by default; users click to expand

/* ── READING PROGRESS BAR ── */
(function() {
  var bar = document.getElementById('reading-progress');
  if (!bar) return;
  function updateProgress() {
    var scrollTop = window.scrollY || document.documentElement.scrollTop;
    var docHeight = Math.max(
      document.documentElement.scrollHeight,
      document.body.scrollHeight
    ) - window.innerHeight;
    if (docHeight <= 0) return;
    var progress = Math.min((scrollTop / docHeight) * 100, 100);
    bar.style.width = progress + '%';
  }
  window.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();
})();

/* ── STICKY FLOATING CTA — show after hero ── */
(function() {
  var stickyCta = document.getElementById('sticky-cta');
  var hero = document.querySelector('.hero');
  var footer = document.querySelector('footer');
  if (!stickyCta || !hero) return;
  function updateStickyCta() {
    var heroBottom = hero.offsetTop + hero.offsetHeight;
    var scrollY = window.scrollY || document.documentElement.scrollTop;
    var footerTop = footer ? footer.getBoundingClientRect().top + scrollY : Infinity;
    var nearFooter = scrollY + window.innerHeight > footerTop - 80;
    if (scrollY > heroBottom && !nearFooter) {
      stickyCta.classList.add('visible');
    } else {
      stickyCta.classList.remove('visible');
    }
  }
  window.addEventListener('scroll', updateStickyCta, { passive: true });
  updateStickyCta();
})();

/* ════════════════════════════════════════════════════════
   QA FIX BLOCK — iPad Pro 13" pass
   (added April 2026)
   - Risk-card click/tap to reveal description on touch
   - Sci broken state: re-render on langChange + use fresh i18n
   - Nav kept fixed
   - App Store + Google Play localized buttons in closing section
   ════════════════════════════════════════════════════════ */
(function(){
  'use strict';

  /* ---- RISK CARDS: click/tap to toggle description on touch devices ---- */
  function initRiskCards() {
    var cards = document.querySelectorAll('.risk-card');
    if (!cards.length) return;
    cards.forEach(function(card){
      card.style.cursor = 'pointer';
      card.setAttribute('tabindex', '0');
      card.setAttribute('role', 'button');
      var toggle = function(e){
        e.preventDefault();
        e.stopPropagation();
        var isOpen = card.classList.toggle('rc-open');
        // Close siblings
        if (isOpen) {
          cards.forEach(function(other){
            if (other !== card) other.classList.remove('rc-open');
          });
        }
      };
      card.addEventListener('click', toggle);
      card.addEventListener('keydown', function(e){
        if (e.key === 'Enter' || e.key === ' ') toggle(e);
      });
    });
    // Click outside to close
    document.addEventListener('click', function(e){
      if (!e.target.closest('.risk-card')) {
        cards.forEach(function(c){ c.classList.remove('rc-open'); });
      }
    });
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initRiskCards);
  } else {
    initRiskCards();
  }

  /* ---- SCI BROKEN STATE: re-render on langChange ---- */
  document.addEventListener('langChange', function(){
    // Force the sci-status / sci-reset / sci-instruction text to refresh
    var status = document.getElementById('sci-status');
    var resetHint = document.getElementById('sci-reset');
    var instruction = document.querySelector('.sci-instruction');
    var lang = (window.CogniFitI18n && window.CogniFitI18n.getLang && window.CogniFitI18n.getLang()) || 'en';
    var T = window.T || {};
    var dict = (T[lang] || T.en || {});
    // If sci-status is currently visible (broken state), re-render with translated template
    if (status && !status.classList.contains('hidden')) {
      var brokenCards = document.querySelectorAll('.sci-card.sci-broken');
      var nameMap = {
        executive: dict['sci.s1.t'] || 'Executive Function',
        memory: dict['sci.s2.t'] || 'Working Memory',
        attention: dict['sci.s3.t'] || 'Attention'
      };
      var names = [];
      brokenCards.forEach(function(c){
        var sys = c.dataset.system;
        if (nameMap[sys]) names.push(nameMap[sys]);
      });
      var tpl = dict['sci.broken.status'] || '{names} weakened, the entire cognitive network is compromised.';
      status.textContent = tpl.replace('{names}', names.join(' & '));
    }
    if (resetHint && !resetHint.classList.contains('hidden')) {
      resetHint.textContent = dict['sci.broken.hint'] || 'Tap disabled abilities to restore them';
    }
    if (instruction) {
      var key = instruction.getAttribute('data-i18n') || 'sci.tap.idle';
      if (dict[key]) instruction.textContent = dict[key];
    }
  });

  /* ---- VAL MARQUEE: uses composite clinicsLogos.webp (HTML already set up) ---- */
  /* Individual clinic PNGs are not hosted separately; the composite webp from
     cognifit.com/img/newart/clinicsLogos.webp is used directly in the HTML.
     A local copy (clinicsLogos.webp) is the primary src with the remote URL
     as onerror fallback. No JS rebuild needed. */

  /* ---- APP STORE + GOOGLE PLAY BUTTONS in closing section ---- */
  function initStoreBadges() {
    var closing = document.querySelector('section.closing');
    if (!closing || closing.querySelector('.store-badges')) return;
    var wrap = document.createElement('div');
    wrap.className = 'store-badges';
    wrap.innerHTML =
      '<a href="https://apps.apple.com/app/cognifit-brain-training/id544218985" target="_blank" rel="noopener noreferrer" class="store-btn store-btn-apple" aria-label="Download on the App Store">' +
        '<svg class="store-icon" viewBox="0 0 24 24" aria-hidden="true" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>' +
        '<span class="store-txt"><span class="store-line1" data-i18n="store.apple.line1">Download on the</span><span class="store-line2">App Store</span></span>' +
      '</a>' +
      '<a href="https://play.google.com/store/apps/details?id=com.cognifit.app" target="_blank" rel="noopener noreferrer" class="store-btn store-btn-google" aria-label="Get it on Google Play">' +
        '<svg class="store-icon" viewBox="0 0 24 24" aria-hidden="true"><path fill="#EA4335" d="M3.6 2.3c-.3.3-.5.8-.5 1.4v16.6c0 .6.2 1.1.5 1.4l10.8-9.7L3.6 2.3z"/><path fill="#34A853" d="M14.4 12l3.7-3.3-11.8-6.8c-.5-.3-1-.3-1.4-.1L14.4 12z"/><path fill="#FBBC04" d="M14.4 12L4.9 21.2c.4.2.9.2 1.4-.1l11.8-6.8L14.4 12z"/><path fill="#4285F4" d="M18.1 8.7L14.4 12l3.7 3.3 4-2.3c1-.6 1-2 0-2.6l-4-1.7z"/></svg>' +
        '<span class="store-txt"><span class="store-line1" data-i18n="store.google.line1">Get it on</span><span class="store-line2">Google Play</span></span>' +
      '</a>';
    var btnCenter = closing.querySelector('.btn-center');
    if (btnCenter) btnCenter.after(wrap);
    else closing.appendChild(wrap);
    // Re-apply translations if i18n available
    if (window.CogniFitI18n && typeof window.CogniFitI18n.setLang === 'function') {
      try { window.CogniFitI18n.setLang(window.CogniFitI18n.getLang(), false); } catch(e){}
    }
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initStoreBadges);
  } else {
    initStoreBadges();
  }

  /* ---- SCROLL-TOP BUTTON: force bottom-right position (override older CSS) ---- */
  function initScrollTop() {
    var btn = document.querySelector('.scroll-top-btn');
    if (!btn) return;
    btn.style.setProperty('left', 'auto', 'important');
    btn.style.setProperty('right', '24px', 'important');
    btn.style.setProperty('bottom', '24px', 'important');
    btn.addEventListener('click', function(e){
      e.preventDefault();
      try { window.scrollTo({ top: 0, behavior: 'smooth' }); } catch(_) { window.scrollTo(0,0); }
    });
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initScrollTop);
  } else {
    initScrollTop();
  }
})();


// ────────────────────────────────────────────────────────────
// FORCE-PT TRANSLATION RUNTIME (added 2026-04-29)
// Translates hardcoded English text → European Portuguese
// Uses i18n.js dictionary entries that were never linked via data-i18n
// ────────────────────────────────────────────────────────────
(function(){
  // 1. Force PT in localStorage so i18n.js picks it up
  try {
    var stored = localStorage.getItem('cogfit_lang');
    if (!stored || stored === 'en') {
      localStorage.setItem('cogfit_lang', 'pt');
    }
  } catch(e) {}

  // 2. Translation map
  var EN2PT = {
  "* Every CogniFit cognitive assessment is intended as an aid for assessing cognitive wellbeing of an individual. In a clinical setting, the CogniFit results (when interpreted by a qualified healthcare provider), may be used as an aid in determining whether further cognitive evaluation is needed. CogniFit's brain trainings are designed to promote/encourage the general state of cognitive health. CogniFit does not offer any medical diagnosis or treatment of any medical disease or condition. CogniFit products may also be used for research purposes for any range of cognitive related assessments. If used for research purposes, all use of the product must be in compliance with appropriate human subjects' procedures as they exist within the researchers' institution and will be the researcher's obligation. All such human subject protections shall be under the provisions of all applicable sections of the Code of Federal Regulations.": "* Cada avaliação cognitiva da CogniFit foi concebida como um auxílio para avaliar o bem-estar cognitivo de uma pessoa. Num contexto clínico, os resultados da CogniFit (quando interpretados por um profissional de saúde qualificado) podem ser utilizados como apoio para determinar se é necessária uma avaliação cognitiva mais aprofundada. Os treinos cerebrais da CogniFit foram concebidos para promover o estado geral da saúde cognitiva. A CogniFit não oferece qualquer diagnóstico ou tratamento médico de qualquer doença ou condição. Os produtos CogniFit também podem ser utilizados para fins de investigação em qualquer avaliação cognitiva. Quando utilizados para investigação, toda a utilização do produto deve estar em conformidade com os procedimentos apropriados para sujeitos humanos em vigor na instituição do investigador, sendo da responsabilidade do mesmo. Todas essas proteções dos sujeitos humanos devem estar sob as disposições de todas as secções aplicáveis do Code of Federal Regulations.",
  "Think of it this way: we all invest in keeping our bodies healthy, but what about the organ that actually runs our lives? Cognitive longevity means keeping your memory, focus, reasoning, and decision-making sharp for as long as possible. The tricky part? Unlike a sore knee, cognitive decline sneaks up on you, most people don't notice until it's already affecting their daily life. The good news is that research shows you can actively build \"neural reserves\" through targeted training, just like building muscle. That's exactly what CogniFit is designed to do, and over 6 million people are already doing it. The earlier you start, the stronger your foundation becomes.": "Pense desta forma: todos investimos em manter os nossos corpos saudáveis, mas e o órgão que realmente comanda as nossas vidas? Longevidade cognitiva significa manter a memória, foco, raciocínio e tomada de decisões afiados o máximo de tempo possível. A parte complicada? Ao contrário de um joelho dorido, o declínio cognitivo aproxima-se sorrateiramente, a maioria das pessoas não nota até já estar a afetar a sua vida diária. A boa notícia é que a investigação mostra que pode construir ativamente \"reservas neurais\" através de treino direcionado, tal como se constrói músculo. É exatamente para isso que a CogniFit foi concebida, e mais de 6 milhões de pessoas já o estão a fazer. Quanto mais cedo começar, mais sólida será a sua base.",
  "Absolutely, and we don't say that lightly. CogniFit is one of the most researched cognitive platforms in the world, with over 1,083 clinical trials and peer-reviewed studies at institutions like Harvard Medical School, the University of Washington, and Tel Aviv University. Our assessments have been validated against gold-standard neuropsychological tests and shown strong correlations with traditional clinical measures. Over 3,530 healthcare professionals use CogniFit for clinical assessment and cognitive rehabilitation. We also hold FDA recognition for certain digital cognitive endpoints. This isn't marketing. It's decades of rigorous science.": "Absolutamente, e não dizemos isso de ânimo leve. A CogniFit é uma das plataformas cognitivas mais investigadas do mundo, com mais de 1.083 ensaios clínicos e estudos revistos por pares em instituições como a Harvard Medical School, University of Washington e Tel Aviv University. As nossas avaliações foram validadas contra testes neuropsicológicos padrão de ouro. Mais de 3.530 profissionais de saúde usam a CogniFit. Também temos reconhecimento da FDA para certos endpoints cognitivos digitais. Isto não é marketing: são décadas de ciência rigorosa.",
  "Most people tell us they start feeling sharper within 2-4 weeks, with more focused conversations, faster recall, and clearer thinking. Just 15-20 minutes, 3-4 times a week. Clinical studies show measurable improvements after about 8 weeks, and long-term research (including the famous ACTIVE trial) found that benefits can last 5-10 years. Your CogniFit dashboard tracks everything: your cognitive age, which skills are improving, and how consistent you've been. It's incredibly motivating to watch your own brain get stronger. The secret? Show up consistently. Even short daily sessions create compounding results over time.": "A maioria das pessoas diz-nos que começa a sentir-se mais desperta em 2 a 4 semanas, com conversas mais focadas, recordação mais rápida e pensamento mais claro. Apenas 15 a 20 minutos, 3 a 4 vezes por semana. Os estudos clínicos mostram melhorias mensuráveis após cerca de 8 semanas, e a investigação a longo prazo (incluindo o famoso ensaio ACTIVE) descobriu que os benefícios podem durar 5 a 10 anos. O painel da CogniFit regista tudo. O segredo: seja consistente.",
  "Here's what surprises most people: your processing speed, how fast you think, actually starts slowing down in your late 20s. Then in your 40s and 50s, working memory and executive function (planning, juggling tasks, making decisions) begin to dip. By your 60s, recalling specific events and experiences gets harder. But here's the bright side: your vocabulary, wisdom, and accumulated knowledge often keep getting better with age. CogniFit measures all 20+ of these skills individually, so you get a clear picture of exactly where you stand, and where to focus your training before small changes become big ones.": "Eis o que surpreende a maioria: a sua velocidade de processamento começa a abrandar já no final dos 20 anos. Depois, nos 40 e 50, a memória de trabalho e a função executiva (planeamento, multitarefas, decisões) começam a diminuir. Aos 60, recordar eventos específicos torna-se mais difícil. O lado positivo: o seu vocabulário, sabedoria e conhecimento acumulado muitas vezes continuam a melhorar com a idade. A CogniFit mede mais de 20 destas capacidades individualmente.",
  "Most brain training apps are really just games dressed up as science. CogniFit is different. It was built by neuroscientists in 1999, long before brain training was trendy. It's been used in 1,083+ clinical trials, trusted by 3,530+ healthcare professionals, and adopted by 6,438+ research institutions around the world. Instead of one-size-fits-all puzzles, CogniFit uses patented technology that adapts in real-time to your performance, so every session targets exactly what you need. You get a real Cognitive Age score, not just a game score. That's why 6 million+ people rate it 4.8 stars.": "A maioria das aplicações de treino cerebral são apenas jogos disfarçados de ciência. A CogniFit é diferente. Foi criada por neurocientistas em 1999, muito antes do treino cerebral estar na moda. Foi usada em mais de 1.083 ensaios clínicos, é confiada por mais de 3.530 profissionais de saúde e adotada por mais de 6.438 instituições de investigação. Em vez de puzzles iguais para todos, a CogniFit usa tecnologia patenteada que se adapta em tempo real ao seu desempenho. Obtenha uma verdadeira pontuação de Idade Cognitiva. Por isso, mais de 6 milhões de pessoas avaliam-na com 4,8 estrelas.",
  "It's a fair question, and the answer is yes, when it's done right. The landmark ACTIVE study, published in the Journal of the American Geriatrics Society, tracked thousands of older adults and found that cognitive training benefits lasted up to 10 years. The key difference? It has to be structured, adaptive, and targeted, not just sudoku on your phone. CogniFit's programs have been used in over 1,083 clinical trials because they actually challenge the specific areas where your brain needs it most. It's like having a personal trainer, but for your mind.": "É uma pergunta justa, e a resposta é sim, quando é feito corretamente. O estudo de referência ACTIVE, publicado no Journal of the American Geriatrics Society, acompanhou milhares de adultos mais velhos e descobriu que os benefícios do treino cognitivo duraram até 10 anos. A diferença chave: tem de ser estruturado, adaptativo e direcionado, não apenas sudoku no telemóvel. Os programas da CogniFit foram usados em mais de 1.083 ensaios clínicos. É como ter um personal trainer, mas para a sua mente.",
  "You don't need to wait for cognitive decline to act. The earlier you invest in brain health and cognitive training, the stronger and more resilient your brain becomes over time. Join 6M+ people training for healthy aging.": "Não precisa de esperar pelo declínio cognitivo para agir. Quanto mais cedo investir na saúde cerebral e no treino cognitivo, mais forte e resiliente o seu cérebro se torna com o tempo. Junte-se a mais de 6 milhões de pessoas que treinam para um envelhecimento saudável.",
  "Family history of dementia or Alzheimer's increases concern, and rightly so. The ACTIVE study showed that structured cognitive training can delay cognitive decline by up to 10 years. Acting early matters most.": "Histórico familiar de demência ou Alzheimer aumenta a preocupação, e com razão. O estudo ACTIVE mostrou que o treino cognitivo estruturado pode atrasar o declínio cognitivo até 10 anos. Agir cedo é o que mais importa.",
  "Processing speed peaks in your late 20s and begins declining from 35. Early cognitive training builds neural reserves that protect your independence for decades, like saving for a cognitive retirement fund.": "A velocidade de processamento atinge o pico no final dos 20 e começa a declinar a partir dos 35. O treino cognitivo precoce constrói reservas neurais que protegem a sua independência durante décadas, como poupar para uma reforma cognitiva.",
  "Executive function, working memory, and sustained attention directly impact career performance. CogniFit targets these high-demand cognitive skills with adaptive training that scales to your level.": "Função executiva, memória de trabalho e atenção sustentada têm impacto direto no desempenho profissional. A CogniFit visa estas competências cognitivas exigentes com treino adaptativo ao seu nível.",
  "Peak cognitive performance for elite sport. Reaction time, focus under pressure, and decision-making training for competitive athletes.": "Desempenho cognitivo de elite para o desporto de alto nível. Tempo de reação, concentração sob pressão e treino de tomada de decisões para atletas competitivos.",
  "Validated cognitive outcome measures for clinical research. FDA-recognized digital endpoints for neurological and psychiatric trials.": "Medidas de resultados cognitivos validadas para investigação clínica. Endpoints digitais reconhecidos pela FDA para ensaios neurológicos e psiquiátricos.",
  "Daily scientifically validated exercises that strengthen attention, memory, and executive function, preventing every risk above.": "Exercícios diários cientificamente validados que fortalecem a atenção, a memória e a função executiva, prevenindo cada um dos riscos acima.",
  "Neuropsychological exploration, stimulation, and cognitive rehabilitation. Clinically proven, reimbursable, reliable.": "Exploração neuropsicológica, estimulação e reabilitação cognitiva. Clinicamente comprovado, reembolsável, fiável.",
  "Cognitive Assessment Batteries and brain training for experimental studies. Validated tools for brain-based research.": "Baterias de Avaliação Cognitiva e treino cerebral para estudos experimentais. Ferramentas validadas para investigação baseada no cérebro.",
  "Online mental wellness platform giving everyone the power to improve with simple tools for wellbeing and performance.": "Plataforma online de bem-estar mental que dá a todos o poder de melhorar com ferramentas simples para bem-estar e desempenho.",
  "Real improvements in focus and memory within weeks. The personalized training adapts to exactly where I need it most.": "Melhorias reais em foco e memória em poucas semanas. O treino personalizado adapta-se exatamente onde mais preciso.",
  "A personalized cognitive system designed to measure, identify, and train exactly what matters for your independence.": "Um sistema cognitivo personalizado concebido para medir, identificar e treinar exatamente o que importa para a sua independência.",
  "First time with this type of cognitive evaluation. Eye-opening assessment and the training feels genuinely tailored.": "Primeira vez com este tipo de avaliação cognitiva. Avaliação reveladora e o treino parece genuinamente personalizado.",
  "Integrate CogniFit's cognitive technology into your own platform. Full SDK, custom branding, and dedicated support.": "Integre a tecnologia cognitiva da CogniFit na sua própria plataforma. SDK completo, branding personalizado e suporte dedicado.",
  "Neuropsychological evaluation, stimulation, and cognitive tools for your students in and beyond the classroom.": "Avaliação neuropsicológica, estimulação e ferramentas cognitivas para os seus alunos dentro e fora da sala de aula.",
  "Cognitive inactivity is a leading modifiable risk factor for Alzheimer's and other forms of dementia.": "A inatividade cognitiva é um dos principais fatores de risco modificáveis para o Alzheimer e outras formas de demência.",
  "Reduced working memory makes it harder to weigh options, follow instructions, or spot health risks.": "Uma memória de trabalho reduzida torna mais difícil ponderar opções, seguir instruções ou detetar riscos para a saúde.",
  "Mental clarity drives social connection, purpose, and enjoyment, all diminish as cognition fades.": "A clareza mental impulsiona a conexão social, o propósito e o prazer, tudo diminui à medida que a cognição se desvanece.",
  "Daily decisions, finances, medication, self-care, become increasingly difficult to manage alone.": "As decisões diárias, finanças, medicação, autocuidado, tornam-se cada vez mais difíceis de gerir sozinho.",
  "Press around the world is talking about our mental training programs and assessments.": "A imprensa de todo o mundo fala sobre os nossos programas e avaliações de treino mental.",
  "6438+ clinics and research institutions are currently running their studies with us.": "6438+ clínicas e instituições de investigação estão atualmente a realizar os seus estudos connosco.",
  "Offer our brain health technology to your patients, students, employees or clients": "Ofereça a nossa tecnologia de saúde cerebral aos seus pacientes, alunos, funcionários ou clientes",
  "Most people cover the basics, but miss the most critical pillar of healthy aging:": "A maioria das pessoas cobre o básico, mas esquece o pilar mais crítico do envelhecimento saudável:",
  "CogniFit, Your Brain Training Platform for a Better Brain & Cognitive Longevity": "CogniFit, A Sua Plataforma de Treino Cerebral para um Cérebro Melhor e Longevidade Cognitiva",
  "Start on your computer, continue on your phone. Your progress syncs everywhere.": "Comece no seu computador, continue no seu telemóvel. O seu progresso sincroniza-se em todo o lado.",
  "Scientifically validated cognitive assessment to establish your baseline.": "Avaliação cognitiva cientificamente validada para estabelecer a sua linha de base.",
  "Cognitive Longevity & Brain Health Training | CogniFit, 1,083+ Studies": "Longevidade Cognitiva e Treino Cerebral | CogniFit, 1.083+ Estudos",
  "{names} weakened, the entire cognitive network is compromised.": "{names} enfraquecido, toda a rede cognitiva está comprometida.",
  "AI adapts training specifically to your unique brain profile.": "A IA adapta o treino especificamente ao seu perfil cerebral único.",
  "What makes CogniFit different from other brain training apps?": "O que torna a CogniFit diferente de outras aplicações de treino cerebral?",
  "This Isn't Just Brain Training, It's Cognitive Longevity": "Isto Não é Apenas Treino Cerebral, É Longevidade Cognitiva",
  "Who Benefits from Cognitive Training for Healthy Aging?": "Quem Beneficia do Treino Cognitivo para um Envelhecimento Saudável?",
  "Short, engaging sessions designed for real-life impact.": "Sessões curtas e envolventes concebidas para impacto na vida real.",
  "Clear reports showing how your brain evolves over time.": "Relatórios claros que mostram como o seu cérebro evolui ao longo do tempo.",
  "Does brain training actually work, or is it just hype?": "O treino cerebral realmente funciona, ou é apenas hype?",
  "The Real Risk of Aging Isn't Physical, It's Cognitive": "O Verdadeiro Risco do Envelhecimento Não É Físico, É Cognitivo",
  "The Science Behind Brain Health & Cognitive Longevity": "A Ciência por Trás da Saúde Cerebral e da Longevidade Cognitiva",
  "What is cognitive longevity, and why should I care?": "O que é a longevidade cognitiva, e porque devo importar-me?",
  "How quickly will I actually notice a difference?": "Com que rapidez vou notar realmente a diferença?",
  "Tap any system to see what happens when it fails": "Toca em qualquer sistema para ver o que acontece quando falha",
  "Discover Your Brain's Strengths and Weaknesses": "Descubra os Pontos Fortes e Fracos do Seu Cérebro",
  "Measure attention, memory & executive function": "Mede atenção, memória e função executiva",
  "4 min read · Based on 1,083+ clinical studies": "4 min de leitura · Baseado em 1.083+ estudos clínicos",
  "Start Your Cognitive Longevity Journey Today": "Comece Hoje a Sua Jornada de Longevidade Cognitiva",
  "Your Questions About Brain Health, Answered": "As Suas Perguntas Sobre Saúde Cerebral, Respondidas",
  "Which mental abilities start fading first?": "Quais capacidades mentais começam a falhar primeiro?",
  "Tap the damaged system to restore balance": "Toca no sistema danificado para restaurar o equilíbrio",
  "What Consistent Brain Training Delivers": "O Que o Treino Cerebral Consistente Oferece",
  "Making better life decisions, every day": "Tomar melhores decisões de vida, todos os dias",
  "Staying sharp at 50, 60, 70 and beyond": "Manter-se afiado aos 50, 60, 70 anos e além",
  "Reducing your long-term cognitive risk": "Reduzir o seu risco cognitivo a longo prazo",
  "Is there real science behind CogniFit?": "Existe ciência real por trás da CogniFit?",
  "Tap disabled abilities to restore them": "Toque nas habilidades desativadas para as restaurar",
  "Click anywhere to restore all systems": "Clique em qualquer lugar para restaurar todos os sistemas",
  "Maintaining full autonomy as you age": "Manter total autonomia ao envelhecer",
  "Take Your Cognitive Assessment Now": "Faça a Sua Avaliação Cognitiva Agora",
  "Targets your weakest areas first": "Foca primeiro nas suas áreas mais fracas",
  "Adjusts difficulty continuously": "Ajusta a dificuldade continuamente",
  "Digital Therapeutics Validation": "Validação de Terapias Digitais",
  "Get a clear cognitive baseline": "Obtenha uma linha de base cognitiva clara",
  "Stay motivated with milestones": "Mantenha-se motivado com marcos",
  "Individualized Training System": "Sistema de Treino Individualizado",
  "and thousands more worldwide": "e milhares mais em todo o mundo",
  "100% Satisfaction Guaranteed": "Satisfação 100% Garantida",
  "Holding information in mind": "Reter informação",
  "Optimizes results over time": "Otimiza os resultados ao longo do tempo",
  "Discover your brain profile": "Descubra o seu perfil cerebral",
  "Cognitive Longevity System": "Sistema de Longevidade Cognitiva",
  "Get a Personalized Program": "Receba um Programa Personalizado",
  "When Will You See Results?": "Quando Vai Ver Resultados?",
  "👍 I recommend this product": "👍 Recomendo este produto",
  "Frequently Asked Questions": "Perguntas Frequentes",
  "Build lasting brain habits": "Construa hábitos cerebrais duradouros",
  "Get your personalized plan": "Receba o seu plano personalizado",
  "Healthy Older Adults Trial": "Estudo em Adultos Idosos Saudáveis",
  "What Prevents All of This": "O Que Previne Tudo Isto",
  "Scientific Advisory Board": "Conselho Consultivo Científico",
  "Join our global family of": "Junte-se à nossa família global de",
  "Improve focus & attention": "Melhora foco e atenção",
  "Strengthen working memory": "Fortalece a memória de trabalho",
  "Monitor progress visually": "Monitorize o progresso visualmente",
  "Intellectual Disabilities": "Deficiências Intelectuais",
  "Senior Cognitive Training": "Treino Cognitivo para Idosos",
  "Cognitive State in Adults": "Estado Cognitivo em Adultos",
  "Download on the App Store": "Descarregar na App Store",
  "Reduced lifespan quality": "Qualidade de vida reduzida",
  "Track Your Cognitive Age": "Acompanhe a Sua Idade Cognitiva",
  "Healthcare Professionals": "Profissionais de Saúde",
  "White Label Partnerships": "Parcerias White Label",
  "Following conversations": "Seguir conversas",
  "Sustained concentration": "Concentração sustentada",
  "Education Professionals": "Profissionais de Educação",
  "Enhance decision-making": "Melhora a tomada de decisões",
  "Filtering distractions": "Filtrar distrações",
  "Clinics & Institutions": "Clínicas e Instituições",
  "✅ Clinically Validated": "✅ Validado Clinicamente",
  "Real Age: 47 years old": "Idade Real: 47 anos",
  "Exercises for Children": "Exercícios para Crianças",
  "Hand-eye Coordination": "Coordenação Olho-Mão",
  "Poor health decisions": "Más decisões de saúde",
  "Delivered by CogniFit": "Fornecido pela CogniFit",
  "Your Mental Workspace": "O Seu Espaço Mental",
  "Better mental clarity": "Maior clareza mental",
  "Cognitive Score 0-800": "Pontuação Cognitiva 0-800",
  "Ideal cognitive age ✓": "Idade cognitiva ideal ✓",
  "Start improving today": "Comece a melhorar hoje",
  "Cognitive Development": "Desenvolvimento Cognitivo",
  "Free Brain Assessment": "Avaliação Cerebral Grátis",
  "Get it on Google Play": "Disponível no Google Play",
  "Cognitive Assessment": "Avaliação Cognitiva",
  "Loss of independence": "Perda de independência",
  "Greater independence": "Maior independência",
  "Discover Your Brain": "Descubra o Seu Cérebro",
  "Planning & Strategy": "Planeamento e Estratégia",
  "Learning new things": "Aprender coisas novas",
  "See What's Possible": "Veja o Que é Possível",
  "Longevity Investors": "Investidores em Longevidade",
  "Scientific Research": "Investigação Científica",
  "Life-changing at 58": "Mudou a minha vida aos 58",
  "Train on Any Device": "Treine Em Qualquer Dispositivo",
  "Take the First Step": "Dê o Primeiro Passo",
  "Executive Functions": "Funções Executivas",
  "Become an Affiliate": "Torne-se Afiliado",
  "Protect Your Brain": "Proteja o Seu Cérebro",
  "Cognitive Training": "Treino Cognitivo",
  "Executive Function": "Função Executiva",
  "Train What Matters": "Treine o Que Importa",
  "Stronger decisions": "Decisões mais fortes",
  "Employee Wellbeing": "Bem-Estar dos Funcionários",
  "Your Daily Workout": "O Seu Treino Diário",
  "Parts of the Brain": "Partes do Cérebro",
  "Stay Independent.": "Mantenha a sua independência.",
  "Contextual Memory": "Memória Contextual",
  "Physical Exercise": "Exercício Físico",
  "Your Focus System": "O Seu Sistema de Concentração",
  "Cognitive control": "Controlo cognitivo",
  "Assess Your Brain": "Avalie o Seu Cérebro",
  "Attention & Focus": "Atenção e Foco",
  "Prevention-Minded": "Mente Preventiva",
  "For Professionals": "Para Profissionais",
  "Discover CogniFit": "Descubra a CogniFit",
  "Products Pipeline": "Pipeline de Produtos",
  "Trusted Worldwide": "Confiável a Nível Mundial",
  "30 Day Money Back": "30 Dias de Devolução",
  "Systematic Review": "Revisão Sistemática",
  "See More Games...": "Ver mais jogos...",
  "CogniFit Newsroom": "Sala de Imprensa CogniFit",
  "Become a Reseller": "Torne-se Revendedor",
  "Cognitive Skills": "Competências Cognitivas",
  "The Real Problem": "O Verdadeiro Problema",
  "Diet & Nutrition": "Dieta e Nutrição",
  "Risk of dementia": "Risco de demência",
  "Your Brain's CEO": "O CEO do Seu Cérebro",
  "Brain Plasticity": "Plasticidade Cerebral",
  "Terms of Service": "Termos de Serviço",
  "Decision-making": "Tomada de decisões",
  "Problem-solving": "Resolução de problemas",
  "Faster thinking": "Pensamento mais rápido",
  "Clinical Trials": "Ensaios Clínicos",
  "Users Worldwide": "Utilizadores no Mundo",
  "The Human Brain": "O Cérebro Humano",
  "Brain Functions": "Funções Cerebrais",
  "Senior Wellness": "Bem-estar do Sénior",
  "Healthy Seniors": "Idosos Saudáveis",
  "For Researchers": "Para Investigadores",
  "Mental Exercise": "Exercício Mental",
  "Management Team": "Equipa de Gestão",
  "Download on the": "Descarregar na",
  "Brain Training": "Treino Cerebral",
  "Working Memory": "Memória de Trabalho",
  "Mental clarity": "Clareza mental",
  "Improved focus": "Foco melhorado",
  "Average Rating": "Classificação Média",
  "NEXT SESSION →": "PRÓXIMA SESSÃO →",
  "Brain and Mind": "Cérebro e Mente",
  "Computer Games": "Jogos de Computador",
  "Mini Crossword": "Mini Palavras Cruzadas",
  "For Clinicians": "Para Profissionais",
  "Brain Exercise": "Exercício Cerebral",
  "Privacy Policy": "Política de Privacidade",
  "Think Better.": "Pense melhor.",
  "Quality Sleep": "Sono de Qualidade",
  "Missing Piece": "Peça em Falta",
  "Professionals": "Profissionais",
  "United States": "Estados Unidos",
  "Concentration": "Concentração",
  "Cognitive Age": "Idade Cognitiva",
  "16 March 2026": "16 de março de 2026",
  "13 March 2026": "13 de março de 2026",
  "Brain Science": "Ciência do Cérebro",
  "Brain Fitness": "Fitness Cerebral",
  "SG4D Taxonomy": "Taxonomia SG4D",
  "Live Longer.": "Viva mais.",
  "Mind Balance": "Equilíbrio Mental",
  "Neuroscience": "Neurociência",
  "Self-control": "Autocontrolo",
  "Adaptability": "Adaptabilidade",
  "The Platform": "A Plataforma",
  "Memory Score": "Pontuação de Memória",
  "Your Profile": "O Seu Perfil",
  "Participants": "Participantes",
  "Active Users": "Utilizadores Ativos",
  "Games Played": "Jogos Jogados",
  "🏥 Healthcare": "🏥 Saúde",
  "Coordination": "Coordenação",
  "Brain Health": "Saúde Cerebral",
  "Chess Online": "Xadrez Online",
  "For Families": "Para Famílias",
  "The Results": "Os Resultados",
  "Researchers": "Investigadores",
  "🎓 Education": "🎓 Educação",
  "Brain Train": "Treino Cerebral",
  "Get Started": "Comece Agora",
  "Brain Games": "Jogos Mentais",
  "Memory Loss": "Perda de Memória",
  "Navy Pilots": "Pilotos da Marinha",
  "Back to top": "Voltar ao início",
  "Adults 35+": "Adultos 35+",
  "Clinicians": "Clínicos",
  "Validation": "Validação",
  "🔬 Research": "🔬 Investigação",
  "Perception": "Perceção",
  "Contact Us": "Contacte-nos",
  "System 01": "Sistema 01",
  "System 02": "Sistema 02",
  "System 03": "Sistema 03",
  "Attention": "Atenção",
  "Begin Now": "Começar Agora",
  "Companies": "Empresas",
  "Employees": "Funcionários",
  "Reasoning": "Raciocínio",
  "Executive": "Função",
  "Cognition": "Cognição",
  "Solitaire": "Solitário",
  "Education": "Educação",
  "Resellers": "Revendedores",
  "Get it on": "Disponível no",
  "Platform": "Plataforma",
  "Planning": "Planeamento",
  "Patients": "Pacientes",
  "Students": "Estudantes",
  "Partners": "Parceiros",
  "Athletes": "Atletas",
  "GOAL 670": "META 670",
  "Join Now": "Junte-se Agora",
  "Function": "Executiva",
  "Research": "Investigação",
  "Science": "Ciência",
  "Schools": "Escolas",
  "Coaches": "Treinadores",
  "Working": "Memória",
  "Neurons": "Neurónios",
  "IQ Test": "Teste de QI",
  "Memory": "Memória",
  "Scroll": "Deslize",
  "Patent": "Patente",
  "Week 1": "Semana 1",
  "Week 8": "Semana 8",
  "Users": "Utilizadores",
  "users": "utilizadores",
  "Spain": "Espanha",
  "Tools": "Ferramentas",
  "Wow!": "Uau!",
  "Help": "Ajuda",
  "FAQ": "Perguntas",
  "KEY": "CHAVE",
  "W1": "S1",
  "W8": "S8",
};


  // Sort keys by length DESC so longer phrases match before shorter substrings
  var EN2PT_KEYS = Object.keys(EN2PT).sort(function(a,b){ return b.length - a.length; });

  // ── KEYWORD-FOCUSED OVERRIDES (added 2026-04-29) ─────────────
  // Refocus copy on "Longevidade Cognitiva" + "Saúde Cerebral" 
  // (de-emphasizes "treino cerebral/cognitivo" — separate page targets that)
  var OVERRIDES_PT = {
    // Nav
    "Brain Training": "Programa",
    // Hero badge
    "Cognitive Longevity System": "Sistema de Longevidade Cognitiva",
    // CTA in hero
    "Start Training": "Começar Agora",
    // Brain Train widget label (keep short on mobile)
    "Brain Train": "Cérebro",
    // Risk section pillar (the 4th pillar)
    "Cognitive Training": "Saúde Cerebral",
    // Risk section solution title
    "What Prevents All of This": "O Que Protege Contra Tudo Isto",
    // Section 4 — platform headline (was: "CogniFit, Your Brain Training Platform for a Better Brain & Cognitive Longevity")
    "CogniFit, Your Brain Training Platform for a Better Brain & Cognitive Longevity": "CogniFit, a Plataforma Líder em Longevidade Cognitiva e Saúde Cerebral",
    // Section 5 — results headline
    "What Consistent Brain Training Delivers": "O Que a Longevidade Cognitiva Lhe Devolve",
    // Section 6 — segments headline
    "Who Benefits from Cognitive Training for Healthy Aging?": "Quem Beneficia de um Programa de Longevidade Cognitiva?",
    // Section 5 — H3
    "This Isn't Just Brain Training, It's Cognitive Longevity": "Isto não é só uma app. É Longevidade Cognitiva.",
    // Sec-deliv H3 (was "Cognitive training is the missing piece.")
    "Cognitive training is": "A Saúde Cerebral é",
    "the missing piece.": "a peça que falta.",
    "It completes the system that protects independence and daily decision-making.": "Completa o sistema que protege a sua independência e a tomada de decisões do dia-a-dia.",
    // Devices headline
    "Train on Any Device": "Cuide do Seu Cérebro em Qualquer Dispositivo",
    "Start on your computer, continue on your phone. Your progress syncs everywhere.": "Comece no computador, continue no telemóvel. O seu progresso sincroniza em todo o lado.",
    // CTA badge above final form
    "YOU'VE READ THIS FAR. NOW TRAIN.": "JÁ LEU ATÉ AQUI. AGORA AJA.",
    // Final CTA H2 — keep cognitive longevity prominent
    "Start Your Cognitive Longevity Journey Today": "Comece Hoje a Sua Jornada de Longevidade Cognitiva",
    // Try-CogniFit button
    "Try CogniFit": "Experimentar CogniFit",
    // Section eyebrow labels
    "COGNITIVE TRAINING": "SAÚDE CEREBRAL",
    "NEUROSCIENCE": "NEUROCIÊNCIA",
    "The Real Problem": "O Verdadeiro Problema",
    "The Results": "Os Resultados",
    "Your Profile": "O Seu Perfil",
    "TRUSTED WORLDWIDE": "CONFIADO EM TODO O MUNDO",
    "SCIENTIFIC PARTNERSHIPS": "PARCERIAS CIENTÍFICAS",
    "For Professionals": "Para Profissionais",
    // Roadmap
    "There are 3 stages on this Cognitive Longevity Roadmap. Discover and train, get tested again, and stay sharp for life.": "Três fases no caminho da Longevidade Cognitiva: descubra, atue, reavalie. Mantenha a clareza para a vida.",
    "Personalized Training": "Plano Personalizado",
    "Daily 15-minute sessions adapt to your performance, targeting the cognitive systems that need the most support.": "Sessões diárias de 15 minutos adaptam-se ao seu desempenho, focando-se nas áreas que mais precisam de apoio.",
    "Track Progress": "Acompanhe o Progresso",
    "Monitor your cognitive age and watch real improvements across memory, attention, and executive function.": "Monitorize a sua idade cognitiva e veja melhorias reais em memória, atenção e função executiva.",
    "Begin Now": "Começar",
    // FAQ
    "Your Questions About Brain Health, Answered": "As Suas Perguntas Sobre Saúde Cerebral, Respondidas",
    "Does brain training actually work, or is it just hype?": "A Longevidade Cognitiva é validada cientificamente?",
    "What makes CogniFit different from other brain training apps?": "O que torna a CogniFit diferente?",
    // Bento  
    "Adults 35+": "Adultos 35+",
    "Prevention-Minded": "Foco na Prevenção",
    "Longevity Investors": "Investidores em Longevidade",
    "Professionals": "Profissionais",
    // Hero subhead
    "Aging is inevitable.": "O envelhecimento é inevitável.",
    "Cognitive decline doesn't have to be.": "O declínio cognitivo não tem de ser.",
    "Protect the core mental abilities that determine how independently you live as you age.": "Proteja as capacidades mentais que determinam a sua independência ao envelhecer.",
    // CTA
    "Protect Your Brain": "Proteger o Seu Cérebro",
    "Get Started": "Começar",
    "Take the First Step": "Dar o Primeiro Passo",
    "Discover Your Brain": "Descobrir o Seu Cérebro",
    // Common nav
    "Platform": "Plataforma",
    "Science": "Ciência",
    // Stats labels
    "Active Users": "Utilizadores Ativos",
    "Clinics & Institutions": "Clínicas e Instituições",
    "Games Played": "Jogos Jogados",
    "Average Rating": "Avaliação Média",
    "Users Worldwide": "Utilizadores em Todo o Mundo"
  };

  // Apply overrides — these win over the auto-generated EN2PT entries
  Object.keys(OVERRIDES_PT).forEach(function(k){ EN2PT[k] = OVERRIDES_PT[k]; });
  EN2PT_KEYS = Object.keys(EN2PT).sort(function(a,b){ return b.length - a.length; });


  // 3. HTML-mixed entries (need innerHTML replacement)
  var EN2PT_HTML = [
  { key: "hero.sub", en: "Aging is inevitable. <strong>Cognitive decline doesn't have to be.</strong> Protect the core mental abilities that determine how independently you live as you age.", pt: "Envelhecer é inevitável. <strong>O declínio cognitivo não tem de ser.</strong> Proteja as capacidades mentais essenciais que determinam o quão independentemente vive à medida que envelhece." },
  { key: "discover.lead", en: "Our <a href=\"https://www.cognifit.com/cognitive-assessment\" style=\"color:var(--blue);text-decoration:none;font-weight:700\">scientifically validated cognitive assessments</a> measure 20+ brain skills across memory, attention, and executive function, giving you a complete picture of your cognitive health and brain wellness.", pt: "As nossas <a href=\"https://www.cognifit.com/cognitive-assessment\" style=\"color:var(--blue);text-decoration:none;font-weight:700\">avaliações cognitivas validadas cientificamente</a> medem mais de 20 competências cerebrais em memória, atenção e função executiva, dando-lhe uma imagem completa da sua saúde cognitiva e bem-estar cerebral." },
  { key: "risk.miss.text", en: "<strong>Cognitive training is<br><span class=\"rmp-highlight\">the missing piece.</span></strong> <span class=\"risk-line-break\">It completes the system that protects independence and daily decision-making.</span>", pt: "<strong>O treino cognitivo é<br><span class=\"rmp-highlight\">a peça que falta.</span></strong> <span class=\"risk-line-break\">Completa o sistema que protege a independência e a tomada de decisões diária.</span>" },
  { key: "sci.lead", en: "According to research published in <em>Nature Reviews Neuroscience</em>, long-term brain fitness depends on three interconnected cognitive systems that protect your mental health and independence as you age. <a href=\"https://www.cognifit.com/neuroscience\" style=\"color:var(--blue);text-decoration:none;font-weight:700\">Explore the full scientific validation</a>.", pt: "De acordo com investigação publicada na <em>Nature Reviews Neuroscience</em>, a aptidão cerebral a longo prazo depende de três sistemas cognitivos interligados que protegem a sua saúde mental e independência à medida que envelhece. <a href=\"https://www.cognifit.com/neuroscience\" style=\"color:var(--blue);text-decoration:none;font-weight:700\">Explore a validação científica completa</a>." },
  { key: "sci.s1.why", en: "<strong>Why it matters:</strong> Manages life, finances, health, relationships. <strong>When this declines → independence declines.</strong>", pt: "<strong>Porque importa:</strong> Gere a vida, finanças, saúde, relações. <strong>Quando isto declina → a independência declina.</strong>" },
  { key: "sci.s2.why", en: "<strong>Why it matters:</strong> Supports reasoning and daily functioning. <strong>When this weakens → confusion increases.</strong>", pt: "<strong>Porque importa:</strong> Suporta o raciocínio e o funcionamento diário. <strong>Quando enfraquece → a confusão aumenta.</strong>" },
  { key: "sci.s3.why", en: "<strong>Why it matters:</strong> Attention is the gateway to everything. <strong>If it drops → everything follows.</strong>", pt: "<strong>Porque importa:</strong> A atenção é a porta de entrada para tudo. <strong>Se cair → tudo o resto cai com ela.</strong>" },
  { key: "sci.chain", en: "Break one, and the whole system weakens.<br><strong>Strengthen all three, and you build cognitive resilience for life.</strong>", pt: "Quebre um, e todo o sistema enfraquece.<br><strong>Fortaleça os três e construa resiliência cognitiva para a vida.</strong>" },
  { key: "out.lead", en: "With regular use of <a href=\"https://www.cognifit.com/brain-training\" style=\"color:var(--blue);text-decoration:none;font-weight:700\">CogniFit's personalized brain training</a>, users across all age groups experience measurable improvements in daily cognitive performance, typically within 2-4 weeks.", pt: "Com o uso regular do <a href=\"https://www.cognifit.com/brain-training\" style=\"color:var(--blue);text-decoration:none;font-weight:700\">treino cerebral personalizado da CogniFit</a>, utilizadores de todas as idades experimentam melhorias mensuráveis no seu desempenho cognitivo diário, normalmente em 2 a 4 semanas." },
  { key: "out.box1.c", en: "It's not about adding years to your life.<br><strong>It's about adding clarity, control, and independence to those years.</strong>", pt: "Não se trata de adicionar anos à sua vida.<br><strong>Trata-se de adicionar clareza, controlo e independência a esses anos.</strong>" },
  { key: "out.box2.i1", en: "<strong>Week 1-2:</strong> Baseline assessment complete, you'll know exactly where you stand across 20+ cognitive skills", pt: "<strong>Semana 1-2:</strong> Avaliação inicial completa, saberá exatamente onde está em mais de 20 competências cognitivas" },
  { key: "out.box2.i2", en: "<strong>Week 2-4:</strong> Most users report feeling sharper, faster recall, better focus in conversations, clearer thinking", pt: "<strong>Semana 2-4:</strong> A maioria dos utilizadores sente-se mais alerta, recordação mais rápida, melhor foco em conversas, pensamento mais claro" },
  { key: "out.box2.i3", en: "<strong>Week 4-8:</strong> Measurable improvement in trained cognitive domains, tracked in your personal dashboard", pt: "<strong>Semana 4-8:</strong> Melhoria mensurável nos domínios cognitivos treinados, registada no seu painel pessoal" },
  { key: "out.box2.i4", en: "<strong>Month 3+:</strong> Compounding gains, the ACTIVE trial found structured training benefits last 5-10 years", pt: "<strong>Mês 3+:</strong> Ganhos cumulativos, o estudo ACTIVE descobriu que os benefícios do treino estruturado duram 5 a 10 anos" },
  { key: "out.box2.c", en: "Just 15-20 minutes, 3-4 times per week. <strong>Consistency is the key to cognitive longevity.</strong>", pt: "Apenas 15-20 minutos, 3-4 vezes por semana. <strong>A consistência é a chave para a longevidade cognitiva.</strong>" },
  { key: "who.lead", en: "Whether you're 35 or 75, cognitive training delivers measurable benefits. Research published in <em>Nature Reviews Neuroscience</em> shows that targeted brain exercises improve neural efficiency at any age.", pt: "Quer tenha 35 ou 75 anos, o treino cognitivo oferece benefícios mensuráveis. Investigação publicada na <em>Nature Reviews Neuroscience</em> mostra que exercícios cerebrais direcionados melhoram a eficiência neuronal em qualquer idade." },
  { key: "who.c4.d", en: "You track your VO2 max, sleep quality, and nutrition. Why not your brain? Cognitive Age is the missing metric in your longevity stack, and <a href=\"https://www.cognifit.com/assessments\" style=\"color:var(--blue);text-decoration:none;font-weight:700\">CogniFit measures it scientifically</a>.", pt: "Acompanha o seu VO2 máximo, qualidade do sono e nutrição. Porque não o seu cérebro? A Idade Cognitiva é a métrica em falta na sua estratégia de longevidade, e a <a href=\"https://www.cognifit.com/assessments\" style=\"color:var(--blue);text-decoration:none;font-weight:700\">CogniFit mede-a cientificamente</a>." },
  { key: "pro.cta", en: "Explore <span>→</span>", pt: "Explorar <span>→</span>" },
  { key: "closing.quote", en: "\"Your body may age. But your brain can stay <em>sharp, adaptable, and strong</em>. If you train it.\"", pt: "\"O seu corpo pode envelhecer. Mas o seu cérebro pode manter-se <em>ágil, adaptável e forte</em>. Se o treinar.\"" },
  { key: "closing.sub", en: "The question isn't whether you'll age.<br>It's how well your mind will age with you.", pt: "A pergunta não é se vai envelhecer.<br>É como a sua mente vai envelhecer consigo." },
];


  // 4. Walk text nodes and replace
  function translateTextNodes(root) {
    if (!root) return;
    if (typeof document.createTreeWalker !== 'function') return;
    var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode: function(n) {
        var p = n.parentNode;
        if (!p) return NodeFilter.FILTER_REJECT;
        var tag = (p.tagName || '').toLowerCase();
        if (tag === 'script' || tag === 'style' || tag === 'code' || tag === 'pre') return NodeFilter.FILTER_REJECT;
        if (p.dataset && (p.dataset.ptTranslated === '1')) return NodeFilter.FILTER_REJECT;
        var t = (n.nodeValue || '').trim();
        if (t.length < 2) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      }
    });
    var nodes = [];
    var n;
    while ((n = walker.nextNode())) nodes.push(n);
    nodes.forEach(function(node){
      var raw = node.nodeValue;
      var trimmed = raw.trim();
      if (!trimmed) return;
      if (EN2PT[trimmed]) {
        node.nodeValue = raw.replace(trimmed, EN2PT[trimmed]);
        if (node.parentNode && node.parentNode.dataset) node.parentNode.dataset.ptTranslated = '1';
        return;
      }
      var stripped = trimmed.replace(/[.,;:!?]+$/, '');
      if (stripped !== trimmed && EN2PT[stripped]) {
        var trail = trimmed.slice(stripped.length);
        node.nodeValue = raw.replace(trimmed, EN2PT[stripped] + trail);
        if (node.parentNode && node.parentNode.dataset) node.parentNode.dataset.ptTranslated = '1';
        return;
      }
    });
  }

  // 5. Handle HTML-mixed strings via innerHTML on paragraphs
  function translateHTMLMixed() {
    if (!EN2PT_HTML || !EN2PT_HTML.length) return;
    var candidates = document.querySelectorAll('p, li, span, div, em, strong, h1, h2, h3, h4, h5');
    EN2PT_HTML.forEach(function(entry){
      candidates.forEach(function(el){
        if (el.dataset && el.dataset.ptHtmlTranslated === '1') return;
        var html = el.innerHTML;
        if (html && html.indexOf(entry.en) !== -1) {
          el.innerHTML = html.replace(entry.en, entry.pt);
          el.dataset.ptHtmlTranslated = '1';
        }
      });
    });
  }

  // 6. Run translator multiple times (catches dynamic content)
  function runAll() {
    try {
      if (window.CogniFitI18n && typeof window.CogniFitI18n.setLang === 'function') {
        try { window.CogniFitI18n.setLang('pt', false); } catch(e){}
      }
      translateTextNodes(document.body);
      translateHTMLMixed();
    } catch(e) {
      console.warn('[FORCE-PT]', e);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', runAll);
  } else {
    runAll();
  }
  setTimeout(runAll, 500);
  setTimeout(runAll, 1500);
  setTimeout(runAll, 3500);
  setTimeout(runAll, 7000);

  // 7. MutationObserver for any further DOM updates
  if (typeof MutationObserver === 'function') {
    var mo = new MutationObserver(function(muts){
      var any = false;
      muts.forEach(function(m){
        if (m.addedNodes && m.addedNodes.length) any = true;
      });
      if (any) {
        clearTimeout(window.__ptTimer);
        window.__ptTimer = setTimeout(runAll, 200);
      }
    });
    if (document.body) {
      mo.observe(document.body, { childList: true, subtree: true });
    } else {
      document.addEventListener('DOMContentLoaded', function(){
        mo.observe(document.body, { childList: true, subtree: true });
      });
    }
  }
})();

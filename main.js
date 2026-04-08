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
    if (!btn.classList.contains('pro-cta')) {
      btn.setAttribute('href', targetURL);
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
  // Override IntersectionObserver so all sections render
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
      '<div class="app-badges">' +
        '<a href="https://itunes.apple.com/app/cognifit-brain-fitness/id528285610?mt=8" target="_blank" rel="noopener noreferrer" class="app-badge-img"><img src="appstore_badge_en.png" alt="Download on the App Store" data-i18n-attr="alt:app.badge.ios"></a>' +
        '<a href="https://play.google.com/store/apps/details?id=com.cognifit.app&hl=en" target="_blank" rel="noopener noreferrer" class="app-badge-img"><img src="playstore_badge_en.png" alt="Get it on Google Play" data-i18n-attr="alt:app.badge.android"></a>' +
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


    // Navbar: sticky instead of fixed (fixed breaks in iframes)
    const nav = document.getElementById('nav');
    if (nav) nav.style.position = 'sticky';

    // Scroll button: hidden until hero is out of view
    // Uses IntersectionObserver because inside Wix iframe the parent scrolls, not window
    const scrollBtn = document.querySelector('.scroll-top-btn');
    if (scrollBtn) {
      scrollBtn.style.opacity = '0';
      scrollBtn.style.pointerEvents = 'none';
      scrollBtn.style.transition = 'opacity .3s ease';
      var heroEl = document.querySelector('.hero');
      if (heroEl && 'IntersectionObserver' in window) {
        var io = new IntersectionObserver(function(entries) {
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

    // Robust height reporting — send multiple times to ensure Wix catches it
    function sendHeight() {
      var h = Math.max(
        document.documentElement.scrollHeight,
        document.body.scrollHeight,
        document.documentElement.offsetHeight,
        document.body.offsetHeight
      );
      // Standard postMessage
      window.parent.postMessage(JSON.stringify({ type: 'setHeight', h: h }), '*');
      // Wix-specific format
      window.parent.postMessage({ type: 'setHeight', height: h }, '*');
      window.parent.postMessage(JSON.stringify({ height: h }), '*');
    }

    // Re-send height after images load
    window.addEventListener('load', function() {
      sendHeight();
      // Keep re-sending as content settles
      setTimeout(sendHeight, 500);
      setTimeout(sendHeight, 1500);
      setTimeout(sendHeight, 3000);
    });

    // Keep iframe height updated when content changes
    if (typeof ResizeObserver !== 'undefined') {
      new ResizeObserver(function() {
        sendHeight();
      }).observe(document.body);
    }

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
          '<div class="app-badges">' +
            '<a href="https://itunes.apple.com/app/cognifit-brain-fitness/id528285610?mt=8" target="_blank" rel="noopener noreferrer" class="app-badge-img"><img src="appstore_badge_en.png" alt="Download on the App Store"></a>' +
            '<a href="https://play.google.com/store/apps/details?id=com.cognifit.app&hl=en" target="_blank" rel="noopener noreferrer" class="app-badge-img"><img src="playstore_badge_en.png" alt="Get it on Google Play"></a>' +
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

/* Skill bars animate on scroll */
document.querySelectorAll('.sk-fill').forEach(bar=>{
  const w=bar.style.width;bar.style.width='0%';
  new IntersectionObserver(([e],ob)=>{if(e.isIntersecting){bar.style.width=w;ob.unobserve(bar)}},{threshold:.5}).observe(bar);
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

  /* ── 5. FLOATING DEPTH LAYERS ── */
  const floaters = document.querySelectorAll('.eyebrow, .display');
  function updateFloaters() {
    const scrollY = window.scrollY;
    floaters.forEach(el => {
      const rect = el.getBoundingClientRect();
      if(rect.bottom < -100 || rect.top > window.innerHeight + 100) return;
      const distFromCenter = rect.top + rect.height / 2 - window.innerHeight / 2;
      const shift = distFromCenter * 0.04;
      el.style.transform = el.classList.contains('on')
        ? `translateY(${shift}px)`
        : el.style.transform;
    });
  }

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
      var lang = (window.CFi18n && window.CFi18n.getLang && window.CFi18n.getLang()) || document.documentElement.lang || 'en';
      if (window.T && window.T[lang] && window.T[lang][key]) return window.T[lang][key];
      if (window.CFi18n && window.CFi18n.t) return window.CFi18n.t(key) || fallback;
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
    instructionEl.textContent = 'Tap any system to see what happens when it fails';
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
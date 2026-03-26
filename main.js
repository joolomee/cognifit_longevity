// Detect iframe and force all reveal elements visible
if (window.self !== window.top) {
  // Force all reveal elements visible immediately
  document.addEventListener('DOMContentLoaded', () => {
    // Trigger all .r (reveal) elements
    document.querySelectorAll('.r').forEach(el => el.classList.add('on'));
    
    // Force all elements with opacity:0 to be visible
    document.querySelectorAll('*').forEach(el => {
      const style = getComputedStyle(el);
      if (style.opacity === '0') {
        el.style.opacity = '1';
        el.style.transform = 'none';
        el.style.transition = 'none';
      }
    });
    
    // Override IntersectionObserver to trigger immediately in iframe
    const OriginalObserver = IntersectionObserver;
    window.IntersectionObserver = class {
      constructor(callback, options) {
        this.callback = callback;
      }
      observe(target) {
        // Immediately trigger as if element is intersecting
        this.callback([{
          isIntersecting: true,
          target: target,
          intersectionRatio: 1
        }], this);
      }
      unobserve() {}
      disconnect() {}
    };
  });
}


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
   - Hero bg canvas drifts slower than scroll (depth feel)
   - Section eyebrow/h2 float upward on entry (stagger)
   - Pro cards tilt/float on mouse proximity
   - Stats numbers count up on viewport enter
   - Floating depth layers on scroll sections
══════════════════════════════════════════════════════════ */
(function(){

  /* ── 1. HERO CANVAS PARALLAX (canvas scrolls at 30% of page) ── */
  const heroCanvas = document.getElementById('neural-canvas');
  if(heroCanvas){
    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      heroCanvas.style.transform = `translateY(${y * 0.3}px)`;
    }, {passive: true});
  }

  /* ── 2. SECTION BACKGROUND PARALLAX ── */
  // Sections get a subtle background-position shift as you scroll past them
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

  /* ── 3b. SITEWIDE CARD TILT (sci, step, who, rev) ── */
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

  /* ── 3c. SECTION HEADING MOUSE-FOLLOW — removed per user request ── */

  /* ── 4. STATS COUNT-UP ANIMATION ── */
  // Stats use: <div class="stat-n">6.2<em>M+</em></div>
  // We animate only the text node, preserving the <em> child for styling.
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
      // Find or create the leading text node
      let textNode = Array.from(el.childNodes).find(n => n.nodeType === 3);
      if(!textNode) return;
      animateCount(textNode, target, isDecimal, 1800);
      statObserver.unobserve(el);
    });
  }, {threshold: 0.5});

  document.querySelectorAll('.stat-n').forEach(el => {
    // Get leading text node (before the <em>)
    const textNode = Array.from(el.childNodes).find(n => n.nodeType === 3);
    if(!textNode) return;
    const raw = textNode.nodeValue.trim();
    const num = parseFloat(raw.replace(/,/g, ''));
    if(isNaN(num)) return;
    el.dataset.count = raw.replace(/,/g, '');
    textNode.nodeValue = raw.includes('.') ? '0.0' : '0';
    statObserver.observe(el);
  });

  /* ── 5. FLOATING DEPTH LAYERS on scroll (sections with parallax-depth class) ── */
  // Eyebrow labels float up slightly faster than the page
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
        : el.style.transform; // don't interfere with reveal animation
    });
  }

  /* ── 6. HERO TEXT LAYERS PARALLAX (hero text floats slower) ── */
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
  onScroll(); // run once on load

})();

/* ═══════════════════════════════════════════════════
   COGNI:WAVE DYNAMIC LAYER
   Cursor glow · Magnetic buttons · Wave dividers ·
   Ambient orbs · Animated waveform bars
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

  /* Hero content 3D tilt removed — no JS on titles */

  /* ── 4. AMBIENT ORBS — all sections ── */
  // Dark sections: vivid orbs. Light sections: very subtle tinted orbs.
  const ORB_CONFIGS = [
    // ── Hero (black) ──
    { selector: '.hero', orbs: [
      { w:750, h:750, left:'70%', top:'28%', color:'rgba(26,115,232,0.14)', cls:'a' },
      { w:500, h:500, left:'6%',  top:'58%', color:'rgba(110,50,230,0.09)', cls:'b' },
      { w:340, h:340, left:'42%', top:'78%', color:'rgba(0,200,210,0.07)',  cls:'c' },
    ]},
    // ── s-dark (all) ──
    { selector: '.s-dark', orbs: [
      { w:560, h:560, left:'88%', top:'22%', color:'rgba(26,115,232,0.10)', cls:'b' },
      { w:400, h:400, left:'4%',  top:'68%', color:'rgba(120,40,220,0.08)', cls:'a' },
      { w:260, h:260, left:'50%', top:'50%', color:'rgba(0,180,200,0.05)',  cls:'c' },
    ]},
    // ── s-black ──
    { selector: '.s-black', orbs: [
      { w:600, h:600, left:'15%', top:'35%', color:'rgba(26,115,232,0.09)', cls:'c' },
      { w:380, h:380, left:'82%', top:'65%', color:'rgba(100,40,200,0.07)', cls:'b' },
    ]},
    // ── s-white (subtle — blue/lavender tints on white bg) ──
    { selector: '.s-white', orbs: [
      { w:700, h:700, left:'80%', top:'20%', color:'rgba(26,115,232,0.04)', cls:'b' },
      { w:500, h:500, left:'5%',  top:'75%', color:'rgba(100,60,220,0.03)', cls:'a' },
    ]},
    // ── s-off ──
    { selector: '.s-off', orbs: [
      { w:600, h:600, left:'78%', top:'30%', color:'rgba(26,115,232,0.04)', cls:'a' },
      { w:400, h:400, left:'8%',  top:'60%', color:'rgba(80,40,180,0.03)',  cls:'c' },
    ]},
    // ── s-blue ──
    { selector: '.s-blue', orbs: [
      { w:520, h:520, left:'82%', top:'38%', color:'rgba(255,255,255,0.07)', cls:'b' },
      { w:320, h:320, left:'12%', top:'68%', color:'rgba(255,255,255,0.05)', cls:'c' },
    ]},
    // ── closing ──
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

  /* ── 5. SECTION ENTRANCE: subtle scale from below ── */
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

  /* ── 7. GLOW RING — soft laggy halo (cursor is now CSS arrow) ── */
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

/* ── SCI-CARD CASCADE INTERACTION ── */
(function(){
  const cards = document.querySelectorAll('.sci-card');
  const status = document.getElementById('sci-status');
  const resetHint = document.getElementById('sci-reset');
  if(!cards.length || !status) return;

  const NAMES = {
    executive: 'Executive Function',
    memory:    'Working Memory',
    attention: 'Attention'
  };

  let broken = false;

  function breakAll(triggeredSystem) {
    broken = true;
    cards.forEach(card => {
      card.classList.add('sci-broken');
      card.classList.remove('sci-dim');
    });
    status.textContent = NAMES[triggeredSystem] + ' weakened — the entire network is compromised. All three systems depend on each other.';
    status.classList.remove('hidden');
    resetHint.classList.remove('hidden');
    if(window.triadBreakFrom) window.triadBreakFrom(triggeredSystem);
    setTimeout(() => {
      cards.forEach(card => {
        if(card.dataset.system !== triggeredSystem) card.classList.add('sci-dim');
      });
    }, 400);
  }

  function resetAll() {
    broken = false;
    cards.forEach(card => {
      card.classList.remove('sci-broken', 'sci-dim');
    });
    status.textContent = '';
    status.classList.add('hidden');
    resetHint.classList.add('hidden');
    if(window.triadSetBroken) window.triadSetBroken(false);
  }

  cards.forEach(card => {
    card.addEventListener('click', e => {
      e.stopPropagation();
      if(broken) { resetAll(); return; }
      breakAll(card.dataset.system);
    });
  });

  document.addEventListener('click', () => { if(broken) resetAll(); });
})();

/* ── STEP-CARD MOUSE SPOTLIGHT (--sx/--sy) ── */
document.querySelectorAll('.step-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const r = card.getBoundingClientRect();
    card.style.setProperty('--sx', ((e.clientX - r.left) / r.width * 100) + '%');
    card.style.setProperty('--sy', ((e.clientY - r.top)  / r.height * 100) + '%');
  });
});

/* ── TRIAD SVG — staggered cascade break ── */
const _SYS_NODE = { executive: '0', memory: '1', attention: '2' };

window.triadBreakFrom = function(sysName) {
  const svg = document.getElementById('triad-svg');
  if (!svg) return;
  // Step 1: particles leaving the broken node turn red immediately
  svg.setAttribute('data-breaking', _SYS_NODE[sysName] || '0');
  // Step 2: ~1.4s later the full network breaks (particles carry infection)
  setTimeout(() => {
    svg.classList.add('triad-broken');
    svg.removeAttribute('data-breaking');
  }, 1400);
};

window.triadSetBroken = function(state) {
  const svg = document.getElementById('triad-svg');
  if (!svg) return;
  if (!state) {
    svg.classList.remove('triad-broken');
    svg.removeAttribute('data-breaking');
  }

};

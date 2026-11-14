/* Small native WebGL renderer. No tracking, CDN or runtime dependency. */
(() => {
  'use strict';
  const reduced = () => document.documentElement.dataset.motion === 'reduce' || matchMedia('(prefers-reduced-motion:reduce)').matches;
  const fine = matchMedia('(hover:hover) and (pointer:fine)');
  const sculptures = [];
  const vertices = [], normals = [], indices = [];
  const segments = 220, sides = 32, tau = Math.PI * 2;
  const curve = t => [(1.25 + .43 * Math.cos(3 * t)) * Math.cos(2 * t), (1.25 + .43 * Math.cos(3 * t)) * Math.sin(2 * t), .67 * Math.sin(3 * t)];
  const norm = v => {const l = Math.hypot(...v) || 1; return v.map(x => x / l);};
  const cross = (a,b) => [a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]];
  for (let i=0;i<=segments;i++) {
    const t=i/segments*tau, p=curve(t), q=curve(t+.001), tangent=norm(q.map((n,j)=>n-p[j]));
    const n=norm(cross(tangent,[0,0,1])), b=norm(cross(tangent,n));
    for(let j=0;j<=sides;j++) {
      const a=j/sides*tau, normal=n.map((v,k)=>Math.cos(a)*v+Math.sin(a)*b[k]);
      vertices.push(...p.map((v,k)=>v+normal[k]*.34)); normals.push(...normal);
      if(i<segments&&j<sides){const k=i*(sides+1)+j;indices.push(k,k+sides+1,k+1,k+1,k+sides+1,k+sides+2);}
    }
  }
  const vertexSource=`attribute vec3 aPosition;attribute vec3 aNormal;uniform mat3 uRotation;uniform float uAspect;uniform float uScale;varying vec3 vNormal;varying vec3 vPosition;
  void main(){vec3 p=uRotation*aPosition;vNormal=uRotation*aNormal;vPosition=p;float z=5.5-p.z;gl_Position=vec4(p.x*uScale/uAspect,p.y*uScale,(z-3.0)*0.2,z);}`;
  const fragmentSource=`precision mediump float;varying vec3 vNormal;varying vec3 vPosition;uniform float uTone;
  void main(){vec3 N=normalize(vNormal);vec3 V=normalize(vec3(0.0,0.0,5.5)-vPosition);vec3 R=reflect(-V,N);
  float fresnel=pow(1.0-max(dot(N,V),0.0),3.0);float y=R.y;
  float top=smoothstep(0.05,0.52,y);float stripe=pow(max(0.0,1.0-abs(y-0.25)*7.0),2.0);
  float strip2=pow(max(0.0,1.0-abs(R.x+0.65)*6.0),4.0)*smoothstep(-0.7,0.7,R.y);
  vec3 chrome=mix(vec3(.045,.05,.06),vec3(.84,.87,.88),top)+vec3(stripe*.65)+vec3(strip2*.7);
  float warm=pow(max(dot(R,normalize(vec3(-.8,-.6,.5))),0.0),5.0);
  chrome+=vec3(1.0,.28,.09)*warm*.9;
  float bottom=1.0-smoothstep(-.9,-.1,y);chrome=mix(chrome,vec3(.21,.105,.075),bottom*.6);
  chrome+=fresnel*vec3(.32,.36,.4);float shadow=.56+.44*smoothstep(-1.3,1.5,vPosition.y);
  vec3 c=chrome*shadow;if(uTone>.5)c=mix(c,c*vec3(1.1,.70,.44),.27);
  c=c/(c+vec3(.32));c=pow(c,vec3(.85));gl_FragColor=vec4(c,1.0);}`;
  function rotation(x,y,z){
    const cx=Math.cos(x),sx=Math.sin(x),cy=Math.cos(y),sy=Math.sin(y),cz=Math.cos(z),sz=Math.sin(z);
    return new Float32Array([cy*cz,cy*sz,-sy,sx*sy*cz-cx*sz,sx*sy*sz+cx*cz,sx*cy,cx*sy*cz+sx*sz,cx*sy*sz-sx*cz,cx*cy]);
  }
  function create(el){
    const canvas=el.querySelector('canvas');
    const gl=canvas.getContext('webgl',{alpha:true,antialias:true,powerPreference:'low-power',preserveDrawingBuffer:false});
    if(!gl){el.dataset.render='fallback-webgl-unavailable';return;}
    const compile=(type,source)=>{const s=gl.createShader(type);gl.shaderSource(s,source);gl.compileShader(s);if(!gl.getShaderParameter(s,gl.COMPILE_STATUS))throw new Error('Shader unavailable');return s;};
    const program=gl.createProgram();
    gl.attachShader(program,compile(gl.VERTEX_SHADER,vertexSource));gl.attachShader(program,compile(gl.FRAGMENT_SHADER,fragmentSource));gl.linkProgram(program);
    if(!gl.getProgramParameter(program,gl.LINK_STATUS))return;
    gl.useProgram(program);
    const buffer=(name,values)=>{const b=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,b);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(values),gl.STATIC_DRAW);const at=gl.getAttribLocation(program,name);gl.enableVertexAttribArray(at);gl.vertexAttribPointer(at,3,gl.FLOAT,false,0,0);};
    buffer('aPosition',vertices);buffer('aNormal',normals);
    const ib=gl.createBuffer();gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,ib);gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,new Uint16Array(indices),gl.STATIC_DRAW);
    gl.enable(gl.DEPTH_TEST);gl.disable(gl.CULL_FACE);gl.clearColor(0,0,0,0);
    const loc={rotation:gl.getUniformLocation(program,'uRotation'),aspect:gl.getUniformLocation(program,'uAspect'),scale:gl.getUniformLocation(program,'uScale'),tone:gl.getUniformLocation(program,'uTone')};
    const state={el,canvas,gl,program,loc,x:0,y:0,tx:0,ty:0,visible:false,phase:el.dataset.sculpture==='studio'?1.8:.3,lost:false};
    sculptures.push(state);
    const resize=()=>{const rect=el.getBoundingClientRect();const ratio=Math.min(devicePixelRatio||1,fine.matches?1.65:1.25);canvas.width=Math.max(1,Math.round(rect.width*ratio));canvas.height=Math.max(1,Math.round(rect.height*ratio));gl.viewport(0,0,canvas.width,canvas.height);draw(state,0);};
    new ResizeObserver(resize).observe(el);resize();
    el.addEventListener('pointermove',e=>{if(reduced()||!fine.matches)return;const rect=el.getBoundingClientRect();state.tx=((e.clientY-rect.top)/rect.height-.5)*.55;state.ty=((e.clientX-rect.left)/rect.width-.5)*.8;});
    el.addEventListener('pointerleave',()=>{state.tx=0;state.ty=0;});
    canvas.addEventListener('webglcontextlost',e=>{e.preventDefault();state.lost=true;el.classList.remove('is-ready');});
    // A restored context needs freshly created buffers: retain the graceful image fallback.
    const observer=new IntersectionObserver(entries=>{state.visible=entries[0].isIntersecting;if(state.visible){draw(state,0);schedule();}},{rootMargin:'80px'});observer.observe(el);
    el.dataset.render='webgl';el.classList.add('is-ready');
  }
  function draw(s,time){
    if(s.lost)return;
    const {gl,loc,canvas}=s;
    s.x+=(s.tx-s.x)*.045;s.y+=(s.ty-s.y)*.045;
    const moving=!reduced();const phase=s.phase+(moving?time*.00008:0);
    const x=.56+(moving?s.x:0),y=.2+(moving?s.y+Math.sin(phase)*.25:0),z=-.35+(moving?Math.sin(phase*.7)*.09:0);
    gl.useProgram(s.program);gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);
    gl.uniformMatrix3fv(loc.rotation,false,rotation(x,y,z));gl.uniform1f(loc.aspect,canvas.width/canvas.height);
    gl.uniform1f(loc.scale,2.6);gl.uniform1f(loc.tone,s.el.dataset.sculpture==='studio'?1:0);
    gl.drawElements(gl.TRIANGLES,indices.length,gl.UNSIGNED_SHORT,0);
  }
  let frame=0,last=0;
  function tick(time){frame=0;if(document.hidden)return;const visible=sculptures.filter(s=>s.visible&&!s.lost);if(time-last>30){visible.forEach(s=>draw(s,time));last=time;}if(visible.length&&!reduced())frame=requestAnimationFrame(tick);}
  function schedule(){if(!frame&&!document.hidden)frame=requestAnimationFrame(tick);}
  document.querySelectorAll('[data-sculpture]').forEach(el=>{try{create(el);}catch(error){el.classList.remove('is-ready');el.dataset.render='fallback';console.warn('3D fallback:',error.message);}});
  new MutationObserver(()=>{sculptures.forEach(s=>draw(s,0));schedule();}).observe(document.documentElement,{attributes:true,attributeFilter:['data-motion']});
  document.addEventListener('visibilitychange',()=>{if(document.hidden){cancelAnimationFrame(frame);frame=0;}else schedule();});
  document.querySelectorAll('[data-depth]').forEach(el=>{
    let pending=0;
    const reset=()=>{el.style.setProperty('--depth-x','0deg');el.style.setProperty('--depth-y','0deg');};
    el.addEventListener('pointermove',e=>{if(reduced()||!fine.matches)return;cancelAnimationFrame(pending);pending=requestAnimationFrame(()=>{const b=el.getBoundingClientRect();el.style.setProperty('--depth-x',`${(0.5-(e.clientY-b.top)/b.height)*5}deg`);el.style.setProperty('--depth-y',`${((e.clientX-b.left)/b.width-.5)*7}deg`);});});
    el.addEventListener('pointerleave',()=>{cancelAnimationFrame(pending);reset();});
    el.addEventListener('blur',reset,true);
  });
})();

/* Mouvement permanent : aurore, particules, anneaux, bandeau sans fin. Aucune dépendance. */
(() => {
  'use strict';
  const reduced = () => document.documentElement.dataset.motion === 'reduce' || matchMedia('(prefers-reduced-motion:reduce)').matches;

  // Aurore de fond (décorative)
  if (!document.querySelector('.aurora')) {
    const aurora = document.createElement('div');
    aurora.className = 'aurora';
    aurora.setAttribute('aria-hidden', 'true');
    aurora.innerHTML = '<i></i><i></i><i></i>';
    document.body.prepend(aurora);
  }

  // Anneaux orbitaux autour de la sculpture du hero
  const heroObject = document.querySelector('.hero-object');
  if (heroObject && !heroObject.querySelector('.orbit')) {
    const orbit = document.createElement('div');
    orbit.className = 'orbit';
    orbit.setAttribute('aria-hidden', 'true');
    orbit.innerHTML = '<i></i><i></i><i></i>';
    heroObject.prepend(orbit);
  }

  // Bandeau qui défile sans fin : on duplique le contenu une fois (copie masquée aux lecteurs d'écran)
  document.querySelectorAll('.expertise-strip').forEach(strip => {
    if (strip.classList.contains('is-marquee')) return;
    const items = strip.innerHTML;
    strip.classList.add('is-marquee');
    strip.innerHTML = '<div class="marquee-track">' + items + '<i aria-hidden="true" class="ps-inline"><svg viewBox="0 0 32 32" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M5 25V7h5.2a5 5 0 0 1 0 10H5"/><path d="M27 9.6A5.2 5.2 0 0 0 22.6 7h-.4c-2.6 0-4.4 1.6-4.4 3.8 0 2.4 1.9 3.4 4.6 4l.9.2c2.7.6 4.6 1.8 4.6 4.3 0 2.3-2 3.9-4.8 3.9h-.5a5.6 5.6 0 0 1-4.8-2.6"/></svg></i>' + items.replace(/<span/g, '<span aria-hidden="true"') + '<i aria-hidden="true" class="ps-inline"><svg viewBox="0 0 32 32" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M5 25V7h5.2a5 5 0 0 1 0 10H5"/><path d="M27 9.6A5.2 5.2 0 0 0 22.6 7h-.4c-2.6 0-4.4 1.6-4.4 3.8 0 2.4 1.9 3.4 4.6 4l.9.2c2.7.6 4.6 1.8 4.6 4.3 0 2.3-2 3.9-4.8 3.9h-.5a5.6 5.6 0 0 1-4.8-2.6"/></svg></i></div>';
    const track = strip.firstElementChild;
    // Répète encore si l'écran est très large pour ne jamais voir de vide
    while (track.scrollWidth < strip.clientWidth * 2 && track.children.length < 80) track.innerHTML += track.innerHTML;
  });

  // Particules vivantes dans le hero
  const hero = document.querySelector('.dimension-hero');
  if (!hero) return;
  const canvas = document.createElement('canvas');
  canvas.className = 'hero-particles';
  canvas.setAttribute('aria-hidden', 'true');
  hero.prepend(canvas);
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  const small = matchMedia('(max-width:700px)').matches;
  const count = small ? 38 : 80;
  let w = 0, h = 0, dpr = 1, raf = 0, visible = true;
  const pts = [];
  const resize = () => {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = hero.clientWidth; h = hero.clientHeight;
    canvas.width = w * dpr; canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };
  const spawn = () => ({ x: Math.random() * w, y: Math.random() * h, r: Math.random() * 1.8 + .4, vx: (Math.random() - .5) * .35, vy: -(Math.random() * .45 + .08), a: Math.random() * .6 + .25, hot: Math.random() < .22 });
  const draw = () => {
    raf = 0;
    if (document.hidden || !visible) return;
    ctx.clearRect(0, 0, w, h);
    for (const p of pts) {
      p.x += p.vx; p.y += p.vy;
      if (p.y < -6) { p.y = h + 6; p.x = Math.random() * w; }
      if (p.x < -6) p.x = w + 6; else if (p.x > w + 6) p.x = -6;
      ctx.beginPath();
      ctx.fillStyle = p.hot ? `rgba(246,120,72,${p.a})` : `rgba(255,255,255,${p.a * .7})`;
      ctx.arc(p.x, p.y, p.r, 0, 6.2832);
      ctx.fill();
    }
    // Fils entre particules proches
    for (let i = 0; i < pts.length; i++) {
      for (let j = i + 1; j < pts.length; j++) {
        const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y, d = dx * dx + dy * dy;
        if (d < 8100) { ctx.strokeStyle = `rgba(255,255,255,${(1 - d / 8100) * .12})`; ctx.lineWidth = .6; ctx.beginPath(); ctx.moveTo(pts[i].x, pts[i].y); ctx.lineTo(pts[j].x, pts[j].y); ctx.stroke(); }
      }
    }
    if (!reduced()) raf = requestAnimationFrame(draw);
  };
  const start = () => { if (!raf && !reduced() && visible && !document.hidden) raf = requestAnimationFrame(draw); };
  resize();
  for (let i = 0; i < count; i++) pts.push(spawn());
  new ResizeObserver(() => { resize(); }).observe(hero);
  new IntersectionObserver(e => { visible = e[0].isIntersecting; start(); }, { rootMargin: '60px' }).observe(hero);
  document.addEventListener('visibilitychange', start);
  new MutationObserver(() => { if (reduced()) ctx.clearRect(0, 0, w, h); else start(); }).observe(document.documentElement, { attributes: true, attributeFilter: ['data-motion'] });
  matchMedia('(prefers-reduced-motion:reduce)').addEventListener?.('change', start);
  start();
})();

/* Finitions haut de gamme : progression, curseur, magnétisme, mots révélés, projecteur, parallaxe. */
(() => {
  'use strict';
  const isReduced = () => document.documentElement.dataset.motion === 'reduce' || matchMedia('(prefers-reduced-motion:reduce)').matches;
  const fine = matchMedia('(hover:hover) and (pointer:fine)').matches;
  const raf = window.requestAnimationFrame.bind(window);

  // Barre de progression de lecture
  const bar = document.createElement('div');
  bar.className = 'scroll-progress'; bar.setAttribute('aria-hidden', 'true');
  document.body.appendChild(bar);
  let ticking = false;
  const onScroll = () => {
    if (ticking) return; ticking = true;
    raf(() => {
      const max = document.documentElement.scrollHeight - innerHeight;
      bar.style.setProperty('--p', max > 0 ? Math.min(1, scrollY / max).toFixed(4) : 0);
      if (!isReduced()) document.querySelectorAll('[data-parallax]').forEach(el => {
        const r = el.getBoundingClientRect();
        if (r.bottom < -200 || r.top > innerHeight + 200) return;
        const speed = parseFloat(el.dataset.parallax) || .08;
        el.style.setProperty('--py', ((r.top + r.height / 2 - innerHeight / 2) * -speed).toFixed(1) + 'px');
      });
      ticking = false;
    });
  };
  addEventListener('scroll', onScroll, { passive: true }); addEventListener('resize', onScroll); onScroll();

  // Parallaxe sur éléments décoratifs
  document.querySelectorAll('.hero-object, .manifesto-mark, .studio-art, .identity-panel .studio-symbol').forEach((el, i) => {
    el.dataset.parallax = el.matches('.hero-object') ? '.06' : '.1';
  });

  // Titres h2 : révélation mot par mot (le h1 reste instantané pour ne pas retarder l'affichage)
  const split = el => {
    let i = 0;
    const walk = node => {
      [...node.childNodes].forEach(n => {
        if (n.nodeType === 3) {
          const frag = document.createDocumentFragment();
          n.textContent.split(/(\s+)/).forEach(part => {
            if (!part) return;
            if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(' ')); return; }
            const w = document.createElement('span'); w.className = 'rv-word';
            const inner = document.createElement('span'); inner.style.setProperty('--i', i++); inner.textContent = part;
            w.appendChild(inner); frag.appendChild(w);
          });
          n.replaceWith(frag);
        } else if (n.nodeType === 1 && n.tagName !== 'BR') walk(n);
      });
    };
    walk(el); el.classList.add('rv-split');
  };
  const targets = [...document.querySelectorAll('main h2')].filter(h => !h.closest('.dimension-hero'));
  if (!isReduced()) targets.forEach(split);
  const io = new IntersectionObserver(entries => entries.forEach(e => {
    if (!e.isIntersecting) return;
    e.target.classList.add('is-in'); e.target.classList.add('is-seen');
    const sec = e.target.closest('section'); if (sec) sec.classList.add('is-seen');
    io.unobserve(e.target);
  }), { threshold: .25, rootMargin: '0px 0px -8% 0px' });
  document.querySelectorAll('.rv-split, .eyebrow').forEach(el => io.observe(el));

  // Projecteur sur les cartes
  document.querySelectorAll('.offer, .dimension-service, .values-grid article, .metrics-grid > div, .quality-pills > span, .project-caption').forEach(el => {
    el.classList.add('spot');
    el.addEventListener('pointermove', e => {
      if (isReduced()) return;
      const b = el.getBoundingClientRect();
      el.style.setProperty('--sx', (e.clientX - b.left) + 'px'); el.style.setProperty('--sy', (e.clientY - b.top) + 'px');
    });
  });

  if (!fine) return;

  // Curseur : halo + anneau
  const glow = document.createElement('div'), ring = document.createElement('div');
  glow.className = 'cursor-glow'; ring.className = 'cursor-ring';
  glow.setAttribute('aria-hidden', 'true'); ring.setAttribute('aria-hidden', 'true');
  document.body.append(glow, ring);
  let tx = innerWidth / 2, ty = innerHeight / 2, gx = tx, gy = ty, rx = tx, ry = ty, run = false;
  const loop = () => {
    gx += (tx - gx) * .08; gy += (ty - gy) * .08; rx += (tx - rx) * .22; ry += (ty - ry) * .22;
    glow.style.transform = `translate3d(${gx}px,${gy}px,0)`; ring.style.transform = `translate3d(${rx}px,${ry}px,0)`;
    if (Math.abs(tx - rx) + Math.abs(ty - ry) > .3 || Math.abs(tx - gx) + Math.abs(ty - gy) > .3) raf(loop); else run = false;
  };
  addEventListener('pointermove', e => {
    if (isReduced()) { document.documentElement.classList.remove('has-cursor'); return; }
    document.documentElement.classList.add('has-cursor');
    tx = e.clientX; ty = e.clientY;
    ring.classList.toggle('is-link', !!e.target.closest('a,button,summary,label,.choice,[role=button]'));
    if (!run) { run = true; raf(loop); }
  }, { passive: true });
  document.addEventListener('pointerleave', () => document.documentElement.classList.remove('has-cursor'));

  // Boutons magnétiques
  document.querySelectorAll('.button').forEach(btn => {
    btn.classList.add('is-magnetic');
    btn.addEventListener('pointermove', e => {
      if (isReduced()) return;
      const b = btn.getBoundingClientRect();
      btn.style.setProperty('--mx', ((e.clientX - b.left - b.width / 2) * .22).toFixed(1) + 'px');
      btn.style.setProperty('--my', ((e.clientY - b.top - b.height / 2) * .3).toFixed(1) + 'px');
    });
    btn.addEventListener('pointerleave', () => { btn.style.setProperty('--mx', '0px'); btn.style.setProperty('--my', '0px'); });
  });
})();

(function(){
  'use strict';
  var $=function(s,r){return (r||document).querySelector(s)},$$=function(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s))};
  var reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* año */
  $$('.year').forEach(function(e){e.textContent=new Date().getFullYear()});

  /* nav solid al hacer scroll (si no es interior) */
  var nav=$('#nav');
  if(nav && !document.body.classList.contains('interior')){
    var on=function(){nav.classList.toggle('solid',window.scrollY>40)};on();window.addEventListener('scroll',on,{passive:true});
  }

  /* menú móvil */
  var burger=$('#burger'),menu=$('#menu');
  if(burger&&menu){
    function set(o){menu.classList.toggle('open',o);document.documentElement.classList.toggle('lock',o)}
    burger.addEventListener('click',function(){set(!menu.classList.contains('open'))});
    $$('a',menu).forEach(function(a){a.addEventListener('click',function(){set(false)})});
  }

  /* reloj Meta */
  var clock=$('#clock');
  if(clock){function tick(){try{clock.textContent=new Intl.DateTimeFormat('es-CO',{hour:'2-digit',minute:'2-digit',second:'2-digit',hour12:false,timeZone:'America/Bogota'}).format(new Date())}catch(e){}}tick();setInterval(tick,1000);}

  /* reveals + contadores (IntersectionObserver, sin dependencias) */
  var io=('IntersectionObserver'in window)?new IntersectionObserver(function(ents){
    ents.forEach(function(en){if(en.isIntersecting){en.target.classList.add('is-in');
      if(en.target.hasAttribute('data-count'))count(en.target);
      io.unobserve(en.target);}});
  },{threshold:.15}):null;
  function count(el){
    var end=+el.getAttribute('data-count'),suf=el.getAttribute('data-suffix')||'',t0=null,dur=1500;
    if(reduce){el.textContent=end+suf;return;}
    function step(t){if(!t0)t0=t;var p=Math.min(1,(t-t0)/dur);el.textContent=Math.round(end*(1-Math.pow(1-p,3)))+suf;if(p<1)requestAnimationFrame(step);}
    requestAnimationFrame(step);
  }
  if(io){$$('.reveal,[data-count]').forEach(function(e){io.observe(e)});}
  else{$$('.reveal').forEach(function(e){e.classList.add('is-in')});$$('[data-count]').forEach(function(e){e.textContent=e.getAttribute('data-count')+(e.getAttribute('data-suffix')||'')});}
})();

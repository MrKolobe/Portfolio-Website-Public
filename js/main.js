var DESIGN_WIDTH=1920,NAV_H=162,GLASS_MARGIN=50,GLASS_WIDTH=1820,FOOTER_H=40;
var SECTION_HEIGHTS={home:1010,about:4854,projects:2063,skills:2049,experience:2481,contact:2245,caseStudy:11222};
var NAV_ITEMS=[{id:'home',label:'Home'},{id:'about',label:'About Me'},{id:'projects',label:'Projects'},{id:'skills',label:'Skills'},{id:'experience',label:'Experience'},{id:'contact',label:'Contact'}];
var PAGE_PATHS={home:'index.html',about:'about.html',projects:'projects.html',skills:'skills.html',experience:'experience.html',contact:'contact.html',caseStudy:'case-study.html'};
var activeSection=document.body.getAttribute('data-page')||'home';
function getScale(){return window.innerWidth/DESIGN_WIDTH}
function toY(dy){return(dy-NAV_H)*getScale()}
function toX(dx){return(dx-GLASS_MARGIN)*getScale()}
function navigate(id){
  var path=PAGE_PATHS[id];
  if(path)window.location.href=path;
}
function updateNavActive(){
  var s=getScale();
  NAV_ITEMS.forEach(function(item){
    var btn=document.getElementById('nav-btn-'+item.id);
    if(!btn)return;
    var active=activeSection===item.id||(activeSection==='caseStudy'&&item.id==='projects');
    btn.style.fontSize=(active?25:21)*s+'px';
    btn.style.color=active?'#fd6f00':'white';
    btn.style.letterSpacing=(active?.75:.63)*s+'px';
    var ind=document.getElementById('indicator-'+item.id);
    if(ind)ind.style.display=active?'block':'none';
  });
}
function applyScale(){
  var s=getScale(),sH=SECTION_HEIGHTS[activeSection]||1010;
  var nav=document.getElementById('main-nav');
  if(nav){nav.style.height=NAV_H*s+'px';nav.style.paddingLeft=87*s+'px';nav.style.paddingRight=160*s+'px'}
  var lb=document.getElementById('nav-logo-btn');if(lb)lb.style.gap=27*s+'px';
  var av=document.getElementById('nav-avatar');if(av){av.style.width=60*s+'px';av.style.height=60*s+'px'}
  var lw=document.getElementById('nav-logo-words');if(lw)lw.style.gap=8*s+'px';
  document.querySelectorAll('.nav-logo-text').forEach(function(el){el.style.fontSize=40*s+'px';el.style.letterSpacing=1.2*s+'px'});
  var nl=document.getElementById('nav-links');if(nl)nl.style.gap=25*s+'px';
  NAV_ITEMS.forEach(function(item){
    var btn=document.getElementById('nav-btn-'+item.id);if(!btn)return;
    btn.style.padding=10*s+'px '+14*s+'px';
    var ind=document.getElementById('indicator-'+item.id);
    if(ind){ind.style.left=14*s+'px';ind.style.right=14*s+'px';ind.style.height=6*s+'px';ind.style.borderRadius=20*s+'px'}
  });
  updateNavActive();
  var cv=document.getElementById('nav-cv-btn');
  if(cv){cv.style.fontSize=21*s+'px';cv.style.letterSpacing=.63*s+'px';cv.style.borderRadius=5*s+'px';cv.style.padding=12*s+'px '+28*s+'px'}
  var vp=document.getElementById('viewport-container');
  if(vp){vp.style.width=GLASS_WIDTH*s+'px';vp.style.borderRadius=30*s+'px '+30*s+'px 0 0'}
  var glass=document.getElementById('glass-workspace');
  if(glass)glass.style.borderWidth=(2*s)+'px '+(2*s)+'px 0';
  var cs=document.getElementById('content-sizer');if(cs)cs.style.height=(sH-NAV_H)*s+'px';
  var sc=document.getElementById('section-scaler');
  if(sc){sc.style.top=-(NAV_H*s)+'px';sc.style.left=-(GLASS_MARGIN*s)+'px';sc.style.height=sH+'px';sc.style.transform='scale('+s+')'}
  var fo=document.getElementById('footer-overlay');
  if(fo){fo.style.width='100%';fo.style.height=FOOTER_H*s+'px';
    var p=fo.querySelector('p');if(p){p.style.fontSize=16*s+'px';p.style.letterSpacing=.3*s+'px'}}
  updateOverlays();
}
function updateOverlays(){
  var s=getScale();
  document.querySelectorAll('.overlay-btn').forEach(function(b){b.style.display='none'});
  if(activeSection==='caseStudy'){
    var bk=document.getElementById('overlay-back-projects');
    if(bk){bk.style.display='block';bk.style.top=toY(270)+'px';bk.style.left=toX(129)+'px';bk.style.width=260*s+'px';bk.style.height=60*s+'px'}
  }
}
function setupTestimonialCarousel(){
  var track=document.querySelector('#section-contact .contact-testimonial-track');
  if(!track)return;
  var previous=document.querySelector('#section-contact .contact-carousel-previous');
  var next=document.querySelector('#section-contact .contact-carousel-next');
  if(!previous||!next)throw new Error('Testimonial carousel navigation controls are missing.');
  var cards=[
    track.querySelector(':scope > .contact-group-mm-working-with-phemelo-was-a-game-alternate-12'),
    track.querySelector(':scope > .contact-group-mm-working-with-phemelo-was-a-game-alternate-3'),
    track.querySelector(':scope > .contact-group-mm-working-with-phemelo-was-a-game-alternate-8')
  ];
  if(cards.some(function(card){return !card}))throw new Error('Testimonial carousel cards are missing.');
  var indicators=['.contact-group-1','.contact-group-2','.contact-group-3','.contact-group-4'].map(function(selector){
    return document.querySelector('#section-contact .contact-group-slider > '+selector);
  }).filter(Boolean);
  var currentIndex=1;
  function render(){
    var responsive=window.matchMedia('(max-width: 1200px)').matches;
    cards.forEach(function(card,index){card.classList.toggle('is-active',index===currentIndex)});
    indicators.forEach(function(indicator,index){
      var active=index===currentIndex;
      indicator.style.backgroundColor=active?'rgb(253, 111, 0)':'rgba(217, 217, 217, 0.2)';
      indicator.style.boxShadow=active?'0 4px 4px rgba(0, 0, 0, 0.25)':'none';
    });
    previous.disabled=currentIndex===0;
    next.disabled=currentIndex===cards.length-1;
    if(responsive){
      track.style.setProperty('--carousel-position',-(currentIndex*100/3)+'%');
    }else{
      var offset=(1-currentIndex)*1127;
      cards.forEach(function(card){card.style.transform='translateX('+offset+'px)'});
    }
  }
  previous.addEventListener('click',function(){
    if(currentIndex>0){currentIndex--;render()}
  });
  next.addEventListener('click',function(){
    if(currentIndex<cards.length-1){currentIndex++;render()}
  });
  window.addEventListener('resize',render);
  render();
}
function setupSkillProgressBars(){
  if(document.body.getAttribute('data-page')!=='skills')return;
  var section=document.querySelector('#section-skills');
  if(!section)return;
  var cards=Array.from(section.querySelectorAll('.skill-progress-card'));
  if(!cards.length)return;
  var bars=Array.from(section.querySelectorAll('.skill-progress-fill[role="progressbar"]'));
  var reducedMotion=window.matchMedia('(prefers-reduced-motion: reduce)');
  var touchInteraction=window.matchMedia('(max-width: 1200px), (hover: none)');
  function updateWidth(bar){
    var rail=bar.parentElement.querySelector('.skill-progress-rail');
    if(!rail)throw new Error('A skill progress track is missing its rail.');
    var railWidth=parseFloat(window.getComputedStyle(rail).width);
    var value=Number(bar.getAttribute('aria-valuenow'));
    bar.style.setProperty('--skill-progress-width',railWidth*value/100+'px');
  }
  function rowsForCard(card){
    return Array.from(card.querySelectorAll('.skill-progress-row')).filter(function(row){
      return row.closest('.skill-progress-card')===card;
    });
  }
  function completeCard(card){
    card.dataset.progressStarted='true';
    card.dataset.progressCompleted='true';
    rowsForCard(card).forEach(function(row){
      row.classList.remove('is-animating');
      row.classList.add('is-complete');
    });
  }
  function waitForFill(bar){
    var transition=window.getComputedStyle(bar).transitionDuration.split(',')[0].trim();
    var duration=parseFloat(transition)*(transition.endsWith('ms')?1:1000);
    if(reducedMotion.matches||!duration){
      return new Promise(function(resolve){window.requestAnimationFrame(resolve)});
    }
    return new Promise(function(resolve){
      var timeout=window.setTimeout(finish,duration+100);
      function finish(){
        window.clearTimeout(timeout);
        bar.removeEventListener('transitionend',onTransitionEnd);
        resolve();
      }
      function onTransitionEnd(event){
        if(event.target===bar&&event.propertyName==='width')finish();
      }
      bar.addEventListener('transitionend',onTransitionEnd);
    });
  }
  async function animateCard(card){
    if(card.dataset.progressStarted==='true')return;
    card.dataset.progressStarted='true';
    var rows=rowsForCard(card);
    if(reducedMotion.matches){
      completeCard(card);
      return;
    }
    for(var row of rows){
      var bar=row.querySelector('.skill-progress-fill[role="progressbar"]');
      if(!bar)throw new Error('A skill card is missing its accessible progress bar.');
      row.classList.add('is-animating');
      await waitForFill(bar);
      if(card.dataset.progressCompleted==='true')return;
      row.classList.remove('is-animating');
      row.classList.add('is-complete');
      if(reducedMotion.matches){
        completeCard(card);
        return;
      }
      await new Promise(function(resolve){window.requestAnimationFrame(resolve)});
    }
  }
  cards.forEach(function(card){
    var heading=Array.from(card.querySelectorAll('.responsive-card-heading')).find(function(element){
      return element.closest('.skill-progress-card')===card;
    });
    if(heading)heading.setAttribute('tabindex','0');
    rowsForCard(card).forEach(function(row){
      var bar=row.querySelector('.skill-progress-fill[role="progressbar"]');
      var label=row.querySelectorAll('p')[1];
      if(!bar||!label)throw new Error('A skill card is missing its progress bar or percentage label.');
      var value=Number(bar.getAttribute('aria-valuenow'));
      if(!Number.isFinite(value)||value<0||value>100){
        throw new Error('A skill progress value must be a number between 0 and 100.');
      }
      label.classList.add('skill-progress-value');
      updateWidth(bar);
    });
  });
  section.addEventListener('pointerover',function(event){
    var card=event.target.closest('.skill-progress-card');
    if(card&&section.contains(card)&&!card.contains(event.relatedTarget))animateCard(card);
  });
  section.addEventListener('focusin',function(event){
    var card=event.target.closest('.skill-progress-card');
    if(card&&section.contains(card))animateCard(card);
  });
  window.addEventListener('resize',function(){
    bars.forEach(updateWidth);
    if(touchInteraction.matches)cards.forEach(completeCard);
  });
  reducedMotion.addEventListener('change',function(event){
    if(event.matches)cards.forEach(completeCard);
  });
  if(reducedMotion.matches||touchInteraction.matches){
    cards.forEach(completeCard);
  }
  section.classList.add('skill-progress-enhanced');
}
document.addEventListener('DOMContentLoaded',function(){
  var lb=document.getElementById('nav-logo-btn');if(lb)lb.onclick=function(){navigate('home')};
  NAV_ITEMS.forEach(function(item){var b=document.getElementById('nav-btn-'+item.id);if(b)b.onclick=function(){navigate(item.id)}});
  var hb=document.getElementById('hire-me-btn');if(hb)hb.onclick=function(){navigate('contact')};
  document.querySelectorAll('.project-case-study-button').forEach(function(b){b.onclick=function(){navigate('caseStudy')}});
  var aboutProjects=document.getElementById('about-view-projects-btn');if(aboutProjects)aboutProjects.onclick=function(){navigate('projects')};
  var backAll=document.getElementById('case-study-back-all');if(backAll)backAll.onclick=function(){navigate('projects')};
  var backProjects=document.getElementById('overlay-back-projects');if(backProjects)backProjects.onclick=function(){navigate('projects')};
  setupTestimonialCarousel();
  setupSkillProgressBars();
  applyScale();
});
window.addEventListener('resize',applyScale);

var DESIGN_WIDTH=1920,NAV_H=162,GLASS_MARGIN=50,GLASS_WIDTH=1820,FOOTER_H=40;
var SECTION_HEIGHTS={home:1010,about:4854,projects:2063,skills:2049,experience:2481,contact:2245,caseStudy:11222};
var NAV_ITEMS=[{id:'home',label:'Home'},{id:'about',label:'About Me'},{id:'projects',label:'Projects'},{id:'skills',label:'Skills'},{id:'experience',label:'Experience'},{id:'contact',label:'Contact'}];
var activeSection='home';
function getScale(){return window.innerWidth/DESIGN_WIDTH}
function toY(dy){return(dy-NAV_H)*getScale()}
function toX(dx){return(dx-GLASS_MARGIN)*getScale()}
function navigate(id){
  document.querySelectorAll('.portfolio-section').forEach(function(el){el.style.display='none'});
  var t=document.getElementById('section-'+id.toLowerCase());
  if(t)t.style.display='block';
  var sr=document.getElementById('scroll-region');
  if(sr)sr.scrollTop=0;
  activeSection=id;
  applyScale();
  updateNavActive();
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
  var cs=document.getElementById('content-sizer');if(cs)cs.style.height=(sH-NAV_H)*s+'px';
  var sc=document.getElementById('section-scaler');
  if(sc){sc.style.top=-(NAV_H*s)+'px';sc.style.left=-(GLASS_MARGIN*s)+'px';sc.style.height=sH+'px';sc.style.transform='scale('+s+')'}
  var sr=document.getElementById('scroll-region');if(sr)sr.style.paddingBottom=FOOTER_H*s+'px';
  var fo=document.getElementById('footer-overlay');
  if(fo){fo.style.width=GLASS_WIDTH*s+'px';fo.style.height=FOOTER_H*s+'px';
    var p=fo.querySelector('p');if(p){p.style.fontSize=16*s+'px';p.style.letterSpacing=.3*s+'px'}}
  updateOverlays();
}
function updateOverlays(){
  var s=getScale(),sH=SECTION_HEIGHTS[activeSection]||1010;
  document.querySelectorAll('.overlay-btn').forEach(function(b){b.style.display='none'});
  if(activeSection==='projects'){
    [166,733,1300].forEach(function(x){
      ['cs1','cs2'].forEach(function(row,ri){
        var dy=ri===0?1097:1874;
        var b=document.getElementById('overlay-'+row+'-'+x);
        if(b){b.style.display='block';b.style.top=toY(dy)+'px';b.style.left=toX(x)+'px';b.style.width=455*s+'px';b.style.height=52*s+'px'}
      });
    });
  }
  if(activeSection==='caseStudy'){
    var bk=document.getElementById('overlay-back-projects');
    if(bk){bk.style.display='block';bk.style.top=toY(270)+'px';bk.style.left=toX(129)+'px';bk.style.width=260*s+'px';bk.style.height=60*s+'px'}
    var ba=document.getElementById('overlay-back-all');
    if(ba){ba.style.display='block';ba.style.top=toY(sH*.98)+'px';ba.style.left=toX(DESIGN_WIDTH*.4347)+'px';ba.style.width=DESIGN_WIDTH*.1306*s+'px';ba.style.height=52*s+'px'}
  }
  if(activeSection==='about'){
    var vp=document.getElementById('overlay-view-projects');
    if(vp){vp.style.display='block';vp.style.top=toY(4620)+'px';vp.style.left=toX(DESIGN_WIDTH*.4598)+'px';vp.style.width=200*s+'px';vp.style.height=52*s+'px'}
  }
}
document.addEventListener('DOMContentLoaded',function(){
  var lb=document.getElementById('nav-logo-btn');if(lb)lb.onclick=function(){navigate('home')};
  NAV_ITEMS.forEach(function(item){var b=document.getElementById('nav-btn-'+item.id);if(b)b.onclick=function(){navigate(item.id)}});
  [166,733,1300].forEach(function(x){
    ['cs1','cs2'].forEach(function(row){
      var b=document.getElementById('overlay-'+row+'-'+x);if(b)b.onclick=function(){navigate('caseStudy')};
    });
  });
  ['overlay-back-projects','overlay-back-all'].forEach(function(id){var b=document.getElementById(id);if(b)b.onclick=function(){navigate('projects')}});
  var vp=document.getElementById('overlay-view-projects');if(vp)vp.onclick=function(){navigate('projects')};
  navigate('home');
});
window.addEventListener('resize',applyScale);

const menu=document.querySelector('.menu-toggle');
const nav=document.querySelector('#navigation');
function closeMenu(){menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','メニューを開く');nav.hidden=true;}
menu.addEventListener('click',()=>{const open=nav.hidden;nav.hidden=!open;menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'メニューを閉じる':'メニューを開く');});
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
document.addEventListener('click',e=>{if(!e.target.closest('.header'))closeMenu();});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!nav.hidden){closeMenu();menu.focus();}});
// The user requested that the LINE destination remain empty.
const LINE_URL='';
document.querySelectorAll('[data-line]').forEach(b=>b.addEventListener('click',()=>{if(LINE_URL)window.location.assign(LINE_URL);}));
// Match the original header and contact bar to the section being viewed.
const panels=[...document.querySelectorAll('.panel')];
const headerArt=document.querySelector('.header-art img');
const footerArt=document.querySelector('.footer-art img');
let currentArt='';
let framePending=false;
function syncSectionArt(){
 framePending=false;
 const boundary=document.querySelector('.header').getBoundingClientRect().bottom+2;
 let active=panels[0];
 for(const panel of panels){if(panel.getBoundingClientRect().top<=boundary)active=panel;else break;}
 const source=active.dataset.art || active.querySelector('.panel-art').getAttribute('src');
 if(source!==currentArt){headerArt.src=source;footerArt.src=source;currentArt=source;}
}
function queueSectionArt(){if(!framePending){framePending=true;requestAnimationFrame(syncSectionArt);}}
window.addEventListener('scroll',queueSectionArt,{passive:true});
window.addEventListener('resize',queueSectionArt);
window.addEventListener('pageshow',queueSectionArt);
syncSectionArt();

document.querySelectorAll(".faq-item").forEach(item=>item.addEventListener("toggle",queueSectionArt));

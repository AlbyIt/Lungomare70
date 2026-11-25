'use strict';
// Presentation only; existing rendering, languages, sections and guest data are retained.
(() => {
 const cards=document.getElementById('cards');
 function decorate(){
  for(const card of cards.children){
   let icon=card.querySelector(':scope > svg');
   if(!icon && card.querySelector('.room-button-signs') && !card.querySelector('.wood-icon')){
    icon=document.createElementNS('http://www.w3.org/2000/svg','svg');
    icon.setAttribute('viewBox','0 0 24 24');icon.setAttribute('aria-hidden','true');
    icon.innerHTML='<path d="M3 20V7m18 13V11H3m0 5h18M7 8h4v3H7zm7 0h4v3h-4z"/>';
    card.prepend(icon);
   }
   if(icon){const plaque=document.createElement('span');plaque.className='wood-icon';plaque.setAttribute('aria-hidden','true');icon.before(plaque);plaque.append(icon);}
  }
 }
 decorate();new MutationObserver(decorate).observe(cards,{childList:true});
 // Keep the section icon within the wooden heading, including after language changes.
 const title=document.getElementById('detail-title');
 function decorateTitle(){
  if(!title.textContent.trim() || title.querySelector('.section-title-label'))return;
  const signs=title.querySelector('.room-title-signs');
  const label=document.createElement('span');label.className='section-title-label';
  label.textContent=[...title.childNodes].filter(n=>n!==signs).map(n=>n.textContent).join('');
  const icon=document.createElement('span');icon.className='section-title-icon';icon.setAttribute('aria-hidden','true');
  const source=document.querySelector('#detail-icon svg');
  if(source)icon.append(source.cloneNode(true));
  else if(signs)icon.innerHTML=svg(3);
  title.replaceChildren(...(icon.firstChild?[icon]:[]),label,...(signs?[signs]:[]));
 }
 new MutationObserver(decorateTitle).observe(title,{childList:true});
 decorateTitle();
 const balcony=typeof PHOTO_ASSETS!=='undefined' && PHOTO_ASSETS.balcone;
 if(balcony)document.querySelector('.hero>img').src=balcony;
 document.querySelector('.topbar>.brand').addEventListener('click',event=>{event.preventDefault();document.getElementById('detail').close();window.scrollTo({top:0,behavior:'smooth'});});
})();

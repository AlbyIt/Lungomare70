'use strict';
const icons = [
'<path d="M4 21V4l12-2v19M1 21h21M16 7h4v14M12 11h.01"/>',
'<path d="M4 8h13v7a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5ZM17 9h2a3 3 0 0 1 0 6h-2M7 2v3M12 2v3M2 22h19"/>',
'<path d="M2 8a17 17 0 0 1 20 0M5 12a12 12 0 0 1 14 0M8 16a7 7 0 0 1 8 0"/><circle cx="12" cy="20" r="1"/>',
'<path d="M3 20V6M21 20V11H3M3 16h18M7 8h4v3H7ZM14 8h4v3h-4Z"/>',
'<path d="m14 3 6 6M17 6 9 14M4 13l7 7-4 3-6-6ZM4 16l4 4M18 14v7M15 17h6"/>',
'<path d="M12 2 3 6v6c0 5 9 10 9 10s9-5 9-10V6ZM8 12l3 3 5-6"/>',
'<path d="M4 13h16v3a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5ZM6 13V5a3 3 0 0 1 6 0M6 21v2M18 21v2M10 7h5M11 10v1M14 10v1"/>',
'<path d="M3 14c3-6 15-6 18 0ZM12 4v6M12 14v8M3 22h18M2 4l2 2M20 4l-2 2"/>',
'<path d="M4 11V7h16v4M4 17H2v-6h4v4h12v-4h4v6h-2M4 17v4M20 17v4M4 17h16"/>',
'<path d="m2 5 7-3 6 3 7-3v17l-7 3-6-3-7 3ZM9 2v17M15 5v17"/>',
'<path d="M10 3H3v18h7M8 12h14M17 7l5 5-5 5"/>',
'<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 6 10 7L22 6"/>'
];
const photos = {0:['esterno'],1:['veranda'],3:['stella','duna','onda','perla'],6:['bagno'],7:['giardino','balcone'],8:['sala','veranda'],9:['balcone']};
const fixedCaptions = {stella:'1 · Stella',duna:'2 · Duna',onda:'3 · Onda',perla:'4 · Perla'};
const svg = i => `<svg viewBox="0 0 24 24" aria-hidden="true">${icons[i]}</svg>`;
const language = document.querySelector('#language');
const dialog = document.querySelector('#detail');
let selected = 'it';
let activeSection = null;
try { const preferred = localStorage.getItem('lungomare70-language'); if (Object.hasOwn(GUIDE, preferred)) selected = preferred; else {const browserLanguage = navigator.language.split('-')[0]; if(Object.hasOwn(GUIDE,browserLanguage)) selected=browserLanguage;} } catch {}
function openSection(index) {
 if(guest?.invalid) return;
 activeSection = index;
 const t=GUIDE[selected];
 document.querySelector('#detail-icon').innerHTML=svg(index);
 document.querySelector('#detail-title').textContent=t.labels[index];
 document.querySelector('#detail-text').textContent=t.text[index];
 const links=document.querySelector('#detail-links');links.replaceChildren();
 if([0,9].includes(index)) addLink(links,t.map,'https://www.google.com/maps/search/?api=1&query=Lungomare+Italia+70+Marzocca+di+Senigallia',true);
 if([2,4,11].includes(index)) addLink(links,t.contact,'mailto:info@lungomare70.it');
 if(index===11) addLink(links,'+39 335 7739549','tel:+393357739549');
 const gallery=document.querySelector('#detail-photos');gallery.replaceChildren();
 const sectionPhotos = guest && !guest.invalid && index===3 ? [ROOM_KEYS[guest.room-1]] : guest && index===0 ? [] : guest && guest.room!==1 && index===6 ? [] : photos[index]||[];
 for(const photo of sectionPhotos){const figure=document.createElement('figure');const img=document.createElement('img');img.src=PHOTO_ASSETS[photo];img.alt=fixedCaptions[photo]||t.labels[index];img.loading='lazy';figure.append(img);if(fixedCaptions[photo]){const caption=document.createElement('figcaption');caption.textContent=fixedCaptions[photo];figure.append(caption);}gallery.append(figure);}
 renderPersonalSection(index,selected);
 if(!dialog.open){dialog.showModal();document.body.classList.add('modal-open');dialog.scrollTop=0;}
}
function addLink(parent,label,href,external=false){const a=document.createElement('a');a.textContent=label;a.href=href;if(external){a.target='_blank';a.rel='noopener noreferrer';}parent.append(a);}
function render(){const t=GUIDE[selected];document.documentElement.lang=selected;language.value=selected;document.title=`Lungomare 70 · ${t.subtitle}`;for(const id of ['subtitle','welcome','intro','footer'])document.getElementById(id).textContent=t[id];document.querySelector('#hero-title').textContent=t.title;document.querySelector('#guide-title').textContent=t.menu;document.querySelector('#close').setAttribute('aria-label',t.close);document.querySelector('.photo-strip').setAttribute('aria-label',t.photo);const cards=document.querySelector('#cards');cards.replaceChildren();t.labels.forEach((label,i)=>{const button=document.createElement('button');button.type='button';button.className='card';button.setAttribute('aria-haspopup','dialog');button.innerHTML=svg(i);const span=document.createElement('span');span.textContent=personalLabel(i,label,selected);button.append(span);button.addEventListener('click',()=>openSection(i));cards.append(button);});renderPersonalHeader(selected);if(dialog.open)openSection(activeSection);}
language.addEventListener('change',()=>{selected=language.value;try{localStorage.setItem('lungomare70-language',selected);}catch{}render();});
document.querySelector('#close').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',event=>{if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();}});
dialog.addEventListener('close',()=>{document.body.classList.remove('modal-open');activeSection=null;});
if(guest && !guest.invalid && Object.hasOwn(GUIDE,guest.lang)) selected=guest.lang;
window.addEventListener('hashchange',()=>{guest=readPersonalLink(location.hash);if(dialog.open)dialog.close();render();});
render();

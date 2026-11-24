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
icons.push('<path d="M4 2v7M7 2v7M1 2v7c0 3 6 3 6 0M4 11v11M16 2v20M16 2c-5 5-5 10 0 10"/>','<path d="M8 2h8v6h6v8h-6v6H8v-6H2V8h6Z"/>');
icons.push('<rect x="3" y="2" width="18" height="20" rx="2"/><path d="M9 18V6h4a4 4 0 0 1 0 8H9"/>');
icons.push(icons[7]);
icons[7]='<ellipse cx="9" cy="8" rx="5" ry="7" transform="rotate(35 9 8)"/><path d="m6 14-4 7M5 6l6 5M6 3l7 6M4 10l5-6"/><circle cx="19" cy="18" r="3"/>';
const photos = {0:['esterno'],1:['buffet','veranda'],3:['stella','duna','onda','perla'],6:['bagno'],15:['spiaggia-attrezzata','spiaggia-marzocca'],8:['sala','veranda'],9:['balcone']};
PHOTO_ASSETS.buffet='assets/buffet.jpg';
PHOTO_ASSETS['spiaggia-attrezzata']='assets/spiaggia-attrezzata-marzocca.jpg';
PHOTO_ASSETS['spiaggia-marzocca']='assets/spiaggia-marzocca-veduta-diurna.jpg';
const beachPhotoCaptions={ja:JAPANESE.beachCaptions,hu:HUNGARIAN.beachCaptions,bg:BULGARIAN.beachCaptions,cs:CZECH.beachCaptions,ro:ROMANIAN.beachCaptions,"it": {"spiaggia-attrezzata": "La spiaggia attrezzata di Marzocca", "spiaggia-marzocca": "La spiaggia di Marzocca"}, "en": {"spiaggia-attrezzata": "The equipped beach in Marzocca", "spiaggia-marzocca": "Marzocca beach"}, "de": {"spiaggia-attrezzata": "Der Strand mit Liegen und Sonnenschirmen in Marzocca", "spiaggia-marzocca": "Der Strand von Marzocca"}, "fr": {"spiaggia-attrezzata": "La plage aménagée de Marzocca", "spiaggia-marzocca": "La plage de Marzocca"}, "es": {"spiaggia-attrezzata": "La playa equipada de Marzocca", "spiaggia-marzocca": "La playa de Marzocca"}, "nl": {"spiaggia-attrezzata": "Het strand met ligbedden en parasols in Marzocca", "spiaggia-marzocca": "Het strand van Marzocca"}, "pl": {"spiaggia-attrezzata": "Plaża z leżakami i parasolami w Marzocca", "spiaggia-marzocca": "Plaża w Marzocca"}};
const breakfastCaptions={ja:JAPANESE.breakfastCaption,hu:HUNGARIAN.breakfastCaption,bg:BULGARIAN.breakfastCaption,cs:CZECH.breakfastCaption,ro:ROMANIAN.breakfastCaption,it:'Il buffet della colazione',en:'The breakfast buffet',de:'Das Frühstücksbuffet',fr:'Le buffet du petit-déjeuner',es:'El bufé del desayuno',nl:'Het ontbijtbuffet',pl:'Bufet śniadaniowy'};
const balconyCaptions={ja:JAPANESE.balconyCaption,hu:HUNGARIAN.balconyCaption,bg:BULGARIAN.balconyCaption,cs:CZECH.balconyCaption,ro:ROMANIAN.balconyCaption,"it":"Stella · Il balcone vista mare","en":"Stella · Sea-view balcony","de":"Stella · Balkon mit Meerblick","fr":"Stella · Le balcon vue mer","es":"Stella · El balcón con vistas al mar","nl":"Stella · Balkon met zeezicht","pl":"Stella · Balkon z widokiem na morze"};
const fixedCaptions = {stella:'1 · Stella',duna:'2 · Duna',onda:'3 · Onda',perla:'4 · Perla'};
const svg = i => `<svg viewBox="0 0 24 24" aria-hidden="true">${icons[i]}</svg>`;
const language = document.querySelector('#language');
const dialog = document.querySelector('#detail');
let selected = 'it';
let activeSection = null;
try { const preferred = localStorage.getItem('lungomare70-language'); if (Object.hasOwn(GUIDE, preferred)) selected = preferred; else {const browserLanguage = navigator.language.split('-')[0]; if(Object.hasOwn(GUIDE,browserLanguage)) selected=browserLanguage;} } catch {}
function createRoomSigns(className){
 const signs=document.createElement('span');signs.className=className;
 signs.setAttribute('aria-hidden','true');
 for(const room of guest.rooms){
  const image=document.createElement('img');
  image.src='assets/room-'+room+'-sign.png';
  image.alt=room+' · '+ROOM_NAMES[room-1];
  image.width=96;image.height=86;signs.append(image);
 }
 return signs;
}
function renderDepartureSection(lang){
 document.querySelector('#detail-title').textContent=lang==='ja'?'チェックアウト':'Check-out';
 const farewells={
  ja:JAPANESE.farewell,hu:HUNGARIAN.farewell,bg:BULGARIAN.farewell,cs:CZECH.farewell,ro:ROMANIAN.farewell,
  it:'Ci auguriamo che abbiate trascorso un piacevole soggiorno! Buon viaggio e speriamo di rivedervi presto!\n\nCinzia e Alberto',
  en:'We hope you have enjoyed your stay! Have a safe journey, and we look forward to seeing you again soon!\n\nCinzia and Alberto',
  de:'Wir hoffen, dass ihr einen schönen Aufenthalt hattet! Gute Reise und auf ein baldiges Wiedersehen!\n\nCinzia und Alberto',
  fr:'Nous espérons que vous avez passé un agréable séjour ! Bon voyage et au plaisir de vous revoir bientôt !\n\nCinzia et Alberto',
  es:'¡Esperamos que hayáis disfrutado de vuestra estancia! ¡Buen viaje y hasta pronto!\n\nCinzia y Alberto',
  nl:'We hopen dat jullie een fijn verblijf hebben gehad! Goede reis en graag tot ziens!\n\nCinzia en Alberto',
  pl:'Mamy nadzieję, że miło spędziliście u nas czas! Szczęśliwej podróży i do zobaczenia wkrótce!\n\nCinzia i Alberto'
 };
 const farewell=farewells[lang]||farewells.it;
 const text=document.querySelector('#detail-text');
 text.textContent=GUIDE[lang].text[10]+'\n\n'+farewell;
 text.style.whiteSpace='pre-line';
 if(!guest || guest.invalid || !/^\d{4}-\d{2}-\d{2}$/.test(guest.departure))return;
 const date=new Date(guest.departure+'T12:00:00Z');
 if(Number.isNaN(date.getTime()) || date.toISOString().slice(0,10)!==guest.departure)return;
 const multiple=guest.rooms.length>1;
 const templates={
  ja:JAPANESE.departure(multiple),hu:HUNGARIAN.departure(multiple),bg:BULGARIAN.departure(multiple),cs:CZECH.departure(multiple),ro:ROMANIAN.departure(multiple),
  it:multiple?'Dovrai lasciare le camere {date} entro le ore 10:00.':'Dovrai lasciare la camera {date} entro le ore 10:00.',
  en:multiple?'Please vacate your rooms on {date} by 10:00 am.':'Please vacate your room on {date} by 10:00 am.',
  de:multiple?'Bitte gib deine Zimmer am {date} bis spätestens 10:00 Uhr frei.':'Bitte gib dein Zimmer am {date} bis spätestens 10:00 Uhr frei.',
  fr:multiple?'Merci de libérer tes chambres le {date} avant 10 h.':'Merci de libérer ta chambre le {date} avant 10 h.',
  es:multiple?'Deberás dejar las habitaciones el {date} antes de las 10:00.':'Deberás dejar la habitación el {date} antes de las 10:00.',
  nl:multiple?'Verlaat je kamers op {date} uiterlijk om 10:00 uur.':'Verlaat je kamer op {date} uiterlijk om 10:00 uur.',
  pl:multiple?'Prosimy o opuszczenie pokoi w dniu {date} do godziny 10:00.':'Prosimy o opuszczenie pokoju w dniu {date} do godziny 10:00.'
 };
 const formatted=lang==='ja'?japaneseDate(date):new Intl.DateTimeFormat(lang,{timeZone:'Europe/Rome',weekday:'long',day:'numeric',month:'long',year:'numeric'}).format(date);
 const [before,after]=(templates[lang]||templates.it).split('{date}');
 const emphasized=document.createElement('strong');emphasized.textContent=formatted;
 const original=GUIDE[lang].text[10];
 const rest=lang==='ja'?original.slice(original.indexOf('。')+1).trim():original.slice(original.indexOf('. ')+2);
 text.replaceChildren(document.createTextNode(before),emphasized,document.createTextNode(after+'\n\n'+rest+'\n\n'+farewell));
 text.style.whiteSpace='pre-line';
}
function openSection(index) {
 if(guest?.invalid) return;
 activeSection = index;
 const t=GUIDE[selected];
 const detailIcon=document.querySelector('#detail-icon');
 detailIcon.innerHTML=index===3 && guest && !guest.invalid ? '' : svg(index);
 document.querySelector('#detail-title').textContent=index===3 && guest?.rooms?.length>1 ? personalLabel(index,t.labels[index]||'',selected) : areaLabel(index,t.labels[index]||'',selected);
 document.querySelector('#detail-text').textContent=t.text[index]||'';
 if(index===1){const breakfastInfo={ja:JAPANESE.breakfast,hu:HUNGARIAN.breakfast,bg:BULGARIAN.breakfast,cs:CZECH.breakfast,ro:ROMANIAN.breakfast,"it": "La colazione è servita al piano terra dalle ore 7:30 alle 9:30.\n\nPuoi scegliere liberamente dal buffet.\n\nLe bevande calde vi saranno servite da Cinzia e Alberto.", "en": "Breakfast is served on the ground floor from 7:30 to 9:30 am.\n\nHelp yourself to the buffet.\n\nHot drinks will be served by Cinzia and Alberto.", "de": "Das Frühstück wird im Erdgeschoss von 7:30 bis 9:30 Uhr serviert.\n\nBediene dich am Buffet.\n\nHeiße Getränke werden euch von Cinzia und Alberto serviert.", "fr": "Le petit-déjeuner est servi au rez-de-chaussée de 7 h 30 à 9 h 30.\n\nSers-toi librement au buffet.\n\nLes boissons chaudes vous seront servies par Cinzia et Alberto.", "es": "El desayuno se sirve en la planta baja de 7:30 a 9:30.\n\nPuedes servirte libremente del bufé.\n\nCinzia y Alberto os servirán las bebidas calientes.", "nl": "Het ontbijt wordt op de begane grond geserveerd van 7.30 tot 9.30 uur.\n\nJe kunt zelf kiezen van het buffet.\n\nWarme dranken worden door Cinzia en Alberto geserveerd.", "pl": "Śniadanie serwowane jest na parterze od 7:30 do 9:30.\n\nMożesz swobodnie korzystać z bufetu.\n\nCiepłe napoje podadzą Wam Cinzia i Alberto."};
  const text=document.querySelector('#detail-text');
  text.textContent=breakfastInfo[selected]||breakfastInfo.it;
  text.style.whiteSpace='pre-line';
 }
 if(index===2){const wifiInfo={ja:JAPANESE.wifi,hu:HUNGARIAN.wifi,bg:BULGARIAN.wifi,cs:CZECH.wifi,ro:ROMANIAN.wifi,"it": "Il Wi-Fi è gratuito e disponibile in tutta la struttura. Non è richiesta alcuna password.\n\nChiedi a Cinzia e Alberto il nome della rete a cui collegarti.", "en": "Wi-Fi is free and available throughout the property. No password is required.\n\nAsk Cinzia and Alberto which network to connect to.", "de": "WLAN ist kostenlos und in der gesamten Unterkunft verfügbar. Es ist kein Passwort erforderlich.\n\nFrag Cinzia und Alberto nach dem Namen des Netzwerks, mit dem du dich verbinden kannst.", "fr": "Le Wi-Fi est gratuit et disponible dans tout l’établissement. Aucun mot de passe n’est nécessaire.\n\nDemande à Cinzia et Alberto le nom du réseau auquel te connecter.", "es": "El Wi-Fi es gratuito y está disponible en todo el alojamiento. No se necesita contraseña.\n\nPregunta a Cinzia y Alberto el nombre de la red a la que puedes conectarte.", "nl": "Wifi is gratis en beschikbaar in de hele accommodatie. Er is geen wachtwoord nodig.\n\nVraag Cinzia en Alberto met welk netwerk je verbinding kunt maken.", "pl": "Wi-Fi jest bezpłatne i dostępne w całym obiekcie. Hasło nie jest wymagane.\n\nZapytaj Cinzię i Alberta o nazwę sieci, z którą możesz się połączyć."};
  const text=document.querySelector('#detail-text');
  text.textContent=wifiInfo[selected]||wifiInfo.it;
  text.style.whiteSpace='pre-line';
 }
 const links=document.querySelector('#detail-links');links.replaceChildren();
 if(index===0) addLink(links,t.map,'https://www.google.com/maps/search/?api=1&query=Lungomare+Italia+70+Marzocca+di+Senigallia',true);
 if([2,4,11].includes(index)) addLink(links,t.contact,'mailto:info@lungomare70.it');
 if(index===11) addLink(links,'+39 335 7739549','tel:+393357739549');
 const gallery=document.querySelector('#detail-photos');gallery.replaceChildren();
 const multiRoom = Boolean(guest && !guest.invalid && index===3 && guest.rooms && guest.rooms.length>1);
 gallery.classList.toggle('multi-room-gallery',multiRoom);
 const sectionPhotos = [9,12,13].includes(index) ? [] : guest && !guest.invalid && index===3 ? (multiRoom ? guest.rooms.map(n=>({1:'stella',2:'duna',3:'onda',4:'perla'})[n]) : (guest.room===1 ? ['stella','balcone'] : [ROOM_KEYS[guest.room-1]])) : guest && index===0 ? [] : guest && guest.room!==1 && index===6 ? [] : photos[index]||[];
 for(const photo of sectionPhotos){const figure=document.createElement('figure');const img=document.createElement('img');img.src=PHOTO_ASSETS[photo];const photoCaption=beachPhotoCaptions[selected]?.[photo]|| (photo==='balcone'&&index===3?balconyCaptions[selected]:photo==='buffet'?breakfastCaptions[selected]:fixedCaptions[photo]);img.alt=photoCaption||areaLabel(index,t.labels[index]||'',selected);img.loading='lazy';figure.append(img);if(photoCaption){const caption=document.createElement('figcaption');caption.textContent=photoCaption;figure.append(caption);}if(multiRoom && !img.getAttribute('src')){img.src='assets/'+photo+'.jpg';}gallery.append(figure);}
 renderPersonalSection(index,selected);
 renderAreaSection(index,selected);
 if(index===10)renderDepartureSection(selected);
 const detailTitle=document.querySelector('#detail-title');
 detailTitle.classList.toggle('room-title',index===3 && Boolean(guest && !guest.invalid));
 if(index===3 && guest && !guest.invalid)detailTitle.append(createRoomSigns('room-title-signs'));

 // Keep the map action immediately after the address, regardless of other section renderers.
 if(index===0){const address=document.getElementById('detail-text');const map=document.getElementById('detail-links');if(address && map && map.firstElementChild)address.insertAdjacentElement('afterend',map);}
 if(!dialog.open){dialog.showModal();document.body.classList.add('modal-open');dialog.scrollTop=0;}
}
function addLink(parent,label,href,external=false){const a=document.createElement('a');a.textContent=label;a.href=href;if(external){a.target='_blank';a.rel='noopener noreferrer';}parent.append(a);}
function render(){if(!guest || guest.invalid){document.body.classList.add('link-required');document.querySelector('main').hidden=true;document.querySelector('footer').hidden=true;let notice=document.getElementById('personal-link-required');if(!notice){notice=document.createElement('section');notice.id='personal-link-required';notice.setAttribute('role','status');document.querySelector('main').before(notice);}notice.textContent='Questa guida è disponibile soltanto tramite il link personale fornito da Lungomare 70. Per riceverlo, contatta Cinzia e Alberto: info@lungomare70.it.';return;}document.body.classList.remove('link-required');document.querySelector('main').hidden=false;document.querySelector('footer').hidden=false;document.getElementById('personal-link-required')?.remove();const t=GUIDE[selected];document.documentElement.lang=selected;language.value=selected;document.getElementById('language-flag').textContent={ja:'🇯🇵',hu:'🇭🇺',bg:'🇧🇬',cs:'🇨🇿',ro:'🇷🇴',it:'🇮🇹',en:'🇬🇧',de:'🇩🇪',fr:'🇫🇷',es:'🇪🇸',nl:'🇳🇱',pl:'🇵🇱'}[selected];document.getElementById('header-map').setAttribute('aria-label',`${t.map} · Lungomare 70 · Google Maps`);document.getElementById('header-map').title=`${t.map} · Lungomare 70 · Google Maps`;document.title=`Lungomare 70 · ${t.subtitle}`;for(const id of ['subtitle','welcome','intro','footer'])document.getElementById(id).textContent=t[id];document.querySelector('#hero-title').textContent=t.title;document.querySelector('#guide-title').textContent=t.menu;document.querySelector('#close').setAttribute('aria-label',t.close);document.querySelector('.photo-strip').setAttribute('aria-label',t.photo);const cards=document.querySelector('#cards');cards.replaceChildren();const menuLabels=[...t.labels,AREA_UI[selected].food,AREA_UI[selected].services,AREA_UI[selected].parking,BEACH_GUIDE_TEXT[selected].title];[0,14,3,2,1,4,15,7,9,12,5,13,10,11].forEach(i=>{const label=i===10?(selected==='ja'?'チェックアウト':'Check-out'):menuLabels[i];const button=document.createElement('button');button.type='button';button.className='card';button.setAttribute('aria-haspopup','dialog');if(i!==3)button.innerHTML=svg(i);const span=document.createElement('span');span.textContent=i===3 && guest?.rooms?.length>1 ? personalLabel(i,label,selected) : areaLabel(i,personalLabel(i,label,selected),selected);if(i===0)button.classList.add('entry-card');button.append(span);if(i===3)button.append(createRoomSigns('room-button-signs'));button.addEventListener('click',()=>openSection(i));cards.append(button);});renderPersonalHeader(selected);if(dialog.open)openSection(activeSection);}
language.addEventListener('change',()=>{selected=language.value;try{localStorage.setItem('lungomare70-language',selected);}catch{}render();});
document.querySelector('#close').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',event=>{if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();}});
dialog.addEventListener('close',()=>{document.body.classList.remove('modal-open');activeSection=null;});
if(guest && !guest.invalid && Object.hasOwn(GUIDE,guest.lang)) selected=guest.lang;
window.addEventListener('hashchange',()=>{guest=readPersonalLink(location.hash);if(guest && !guest.invalid && Object.hasOwn(GUIDE,guest.lang))selected=guest.lang;if(dialog.open)dialog.close();render();});
render();

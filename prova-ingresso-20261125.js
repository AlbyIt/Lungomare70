'use strict';
// Approved wood variant: greetings and signature depend on the stay, in Europe/Rome.
const WOOD_STAY_COPY = {
 "it": {
  "subtitle": "La guida su misura per la tua vacanza",
  "before": [
   "Vi aspettiamo",
   "Ti aspettiamo"
  ],
  "during": [
   "Siamo felici di accogliervi",
   "Siamo felici di accoglierti"
  ],
  "departure": [
   "Vi auguriamo un buon rientro",
   "Ti auguriamo un buon rientro"
  ]
 },
 "en": {
  "subtitle": "A tailor-made guide for your holiday",
  "before": [
   "We look forward to welcoming you",
   "We look forward to welcoming you"
  ],
  "during": [
   "We’re happy to welcome you",
   "We’re happy to welcome you"
  ],
  "departure": [
   "We wish you a pleasant journey home",
   "We wish you a pleasant journey home"
  ]
 },
 "de": {
  "subtitle": "Der maßgeschneiderte Begleiter für deinen Urlaub",
  "before": [
   "Wir freuen uns auf euch",
   "Wir freuen uns auf dich"
  ],
  "during": [
   "Wir freuen uns, euch begrüßen zu dürfen",
   "Wir freuen uns, dich begrüßen zu dürfen"
  ],
  "departure": [
   "Wir wünschen euch eine gute Heimreise",
   "Wir wünschen dir eine gute Heimreise"
  ]
 },
 "fr": {
  "subtitle": "Le guide sur mesure pour tes vacances",
  "before": [
   "Nous vous attendons",
   "Nous t’attendons"
  ],
  "during": [
   "Nous sommes heureux de vous accueillir",
   "Nous sommes heureux de t’accueillir"
  ],
  "departure": [
   "Nous vous souhaitons un bon retour",
   "Nous te souhaitons un bon retour"
  ]
 },
 "es": {
  "subtitle": "La guía a medida para tus vacaciones",
  "before": [
   "Os esperamos",
   "Te esperamos"
  ],
  "during": [
   "Nos alegra recibiros",
   "Nos alegra recibirte"
  ],
  "departure": [
   "Os deseamos un buen viaje de vuelta",
   "Te deseamos un buen viaje de vuelta"
  ]
 },
 "nl": {
  "subtitle": "De gids op maat voor jouw vakantie",
  "before": [
   "We kijken uit naar jullie komst",
   "We kijken uit naar je komst"
  ],
  "during": [
   "We zijn blij jullie te mogen verwelkomen",
   "We zijn blij je te mogen verwelkomen"
  ],
  "departure": [
   "We wensen jullie een goede reis naar huis",
   "We wensen je een goede reis naar huis"
  ]
 },
 "pl": {
  "subtitle": "Przewodnik dopasowany do Twoich wakacji",
  "before": [
   "Czekamy na Was",
   "Czekamy na Ciebie"
  ],
  "during": [
   "Cieszymy się, że możemy Was gościć",
   "Cieszymy się, że możemy Cię gościć"
  ],
  "departure": [
   "Życzymy Wam szczęśliwego powrotu",
   "Życzymy Ci szczęśliwego powrotu"
  ]
 },
 "ro": {
  "subtitle": "Ghidul creat special pentru vacanța ta",
  "before": [
   "Vă așteptăm",
   "Te așteptăm"
  ],
  "during": [
   "Ne bucurăm să vă primim",
   "Ne bucurăm să te primim"
  ],
  "departure": [
   "Vă dorim drum bun spre casă",
   "Îți dorim drum bun spre casă"
  ]
 },
 "cs": {
  "subtitle": "Průvodce na míru pro tvou dovolenou",
  "before": [
   "Těšíme se na vás",
   "Těšíme se na tebe"
  ],
  "during": [
   "Jsme rádi, že vás můžeme přivítat",
   "Jsme rádi, že tě můžeme přivítat"
  ],
  "departure": [
   "Přejeme vám šťastnou cestu domů",
   "Přejeme ti šťastnou cestu domů"
  ]
 },
 "hu": {
  "subtitle": "Személyre szabott útmutató a nyaralásodhoz",
  "before": [
   "Várunk benneteket",
   "Várunk téged"
  ],
  "during": [
   "Örülünk, hogy vendégül láthatunk benneteket",
   "Örülünk, hogy vendégül láthatunk"
  ],
  "departure": [
   "Jó hazautat kívánunk nektek",
   "Jó hazautat kívánunk neked"
  ]
 },
 "bg": {
  "subtitle": "Пътеводител, създаден за твоята почивка",
  "before": [
   "Очакваме ви",
   "Очакваме те"
  ],
  "during": [
   "Радваме се да ви посрещнем",
   "Радваме се да те посрещнем"
  ],
  "departure": [
   "Желаем ви приятно пътуване към дома",
   "Желаем ти приятно пътуване към дома"
  ]
 },
 "ja": {
  "subtitle": "あなたの休暇に合わせた専用ガイド",
  "before": [
   "皆さまのお越しをお待ちしています",
   "お越しをお待ちしています"
  ],
  "during": [
   "皆さまをお迎えできてうれしいです",
   "お迎えできてうれしいです"
  ],
  "departure": [
   "皆さま、どうぞお気をつけてお帰りください",
   "どうぞお気をつけてお帰りください"
  ]
 }
};
function woodStayDate(value){
 return typeof value==='string'&&/^\d{4}-\d{2}-\d{2}$/.test(value)&&!Number.isNaN(Date.parse(value+'T12:00:00Z'))&&new Date(value+'T12:00:00Z').toISOString().slice(0,10)===value;
}
function woodStayPhase(g,now=new Date()){
 const today=new Intl.DateTimeFormat('sv-SE',{timeZone:'Europe/Rome',year:'numeric',month:'2-digit',day:'2-digit'}).format(now);
 if(!woodStayDate(g?.arrival)||!woodStayDate(g?.departure)||g.arrival>=g.departure)return null;
 return today<g.arrival?'before':today>=g.departure?'departure':'during';
}
function woodKnownSolo(g,hash=location.hash){
 // Default to plural. A name, gender or room capacity does not establish occupancy.
 if(g?.gender==='p'||g?.rooms?.length>1)return false;
 const p=new URLSearchParams(hash.replace(/^#/,''));
 const total=g?.people??g?.guestCount??p.get('persone')??p.get('ospiti');
 if(total!==null&&total!==undefined&&/^[1-9]\d*$/.test(String(total)))return Number(total)===1;
 const adults=g?.adults??p.get('adulti'),children=g?.children??p.get('bambini');
 return String(adults)==='1'&&String(children)==='0';
}

const WOOD_SUBTITLE_LINES={
 it:['La guida su misura','per la tua vacanza'],
 en:['A tailor-made guide','for your holiday'],
 de:['Der maßgeschneiderte Begleiter','für deinen Urlaub'],
 fr:['Le guide sur mesure','pour tes vacances'],
 es:['La guía a medida','para tus vacaciones'],
 nl:['De gids op maat','voor jouw vakantie'],
 pl:['Przewodnik dopasowany','do Twoich wakacji'],
 ro:['Ghidul creat special','pentru vacanța ta'],
 cs:['Průvodce na míru','pro tvou dovolenou'],
 hu:['Személyre szabott útmutató','a nyaralásodhoz'],
 bg:['Пътеводител, създаден','за твоята почивка'],
 ja:['あなたの休暇に合わせた','専用ガイド']
};
function renderWoodSubtitle(subtitle,lang){
 const lines=WOOD_SUBTITLE_LINES[lang]||WOOD_SUBTITLE_LINES.it;
 const key=lang+':'+lines.join('|');
 if(subtitle.dataset.lines===key&&subtitle.children.length===2)return;
 subtitle.dataset.lines=key;
 const spans=lines.map(text=>{const span=document.createElement('span');span.className='stay-subtitle-line';span.textContent=text;return span;});
 subtitle.replaceChildren(spans[0],document.createTextNode(' '),spans[1]);
}
function woodFarewellExclamation(text,lang){
 return text.replace(/[.!！。\s]+$/u,'')+(lang==='ja'?'！':lang==='fr'?' !':'!');
}

function renderWoodStayCopy(lang){
 if(!guest||guest.invalid)return;
 const copy=WOOD_STAY_COPY[lang]||WOOD_STAY_COPY.it;
 document.getElementById('personal-awaiting')?.remove();
 const subtitle=document.getElementById('subtitle');
 renderWoodSubtitle(subtitle,lang);
 const phase=woodStayPhase(guest);
 if(!phase)return;
 const text=woodFarewellExclamation(copy[phase][woodKnownSolo(guest)?1:0],lang);
 const farewell=document.getElementById('footer');
 // Preserve the approved handwriting, two lines, names, address and background.
 const intro=farewell.querySelector('.signature-intro');
 if(intro){if(intro.textContent!==text)intro.textContent=text;}
 else farewell.textContent=text+', Cinzia e Alberto';
}
(() => {
 const previousGreetingState=personalGreetingState;
 personalGreetingState=function(...args){return {...previousGreetingState(...args),awaiting:''};};
 const previousHeader=renderPersonalHeader;
 renderPersonalHeader=function(lang){previousHeader(lang);renderWoodStayCopy(lang);};
 const refresh=()=>renderWoodStayCopy(document.documentElement.lang||'it');
 setInterval(refresh,30000);
 document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='visible')refresh();});
 window.addEventListener('focus',refresh);
 window.addEventListener('pageshow',refresh);

 // Move room signs from the fixed heading into the room-name row; menu signs stay intact.
 const previousOpenSection=openSection;
 openSection=function(index){
  previousOpenSection(index);
  if(index!==3||!guest||guest.invalid)return;
  const title=document.getElementById('detail-title');
  const signs=title.querySelector('.room-title-signs');
  const pictures=signs?[...signs.querySelectorAll('img')]:[];
  signs?.remove();
  document.getElementById('detail-icon').innerHTML=svg(3);
  const rows=guest.rooms.map((room,i)=>{
   const row=document.createElement('span');row.className='room-identity-row';
   const picture=pictures[i]||document.createElement('img');
   picture.src='assets/room-'+room+'-sign.png';picture.alt='';picture.width=64;picture.height=58;
   picture.className='room-identity-sign';
   const name=document.createElement('strong');name.textContent=room+' · '+ROOM_NAMES[room-1];
   row.append(picture,name);return row;
  });
  document.getElementById('detail-text').replaceChildren(...rows);
 };

 // Reuse each destination's existing, credited photograph in its collapsed row.
 function addVisitThumbnails(){
  if(![9,12].includes(activeSection))return;
  const isFood=activeSection===12;
  for(const row of document.querySelectorAll('#area-content .place-disclosure')){
   const summary=row.querySelector('summary');
   const photo=row.querySelector('.place-photo img');
   if(!summary || !photo || summary.querySelector('.visit-thumbnail') || row.dataset.thumbnailFailed)continue;
   const thumbnail=document.createElement('img');thumbnail.className='visit-thumbnail'+(isFood?' restaurant-thumbnail':'');
   thumbnail.src=photo.src;thumbnail.alt='';thumbnail.setAttribute('aria-hidden','true');
   thumbnail.width=56;thumbnail.height=46;thumbnail.loading='lazy';thumbnail.decoding='async';thumbnail.referrerPolicy='no-referrer';
   thumbnail.addEventListener('error',()=>{row.dataset.thumbnailFailed='true';thumbnail.remove();row.classList.remove('visit-with-thumbnail');},{once:true});
   row.classList.add('visit-with-thumbnail');
   if(isFood)row.classList.add('food-with-thumbnail');
   summary.prepend(thumbnail);
  }
 }
 new MutationObserver(addVisitThumbnails).observe(document.querySelector('.dialog-body'),{childList:true,subtree:true});
 // Present the existing stay-filtered events as collapsible rows, without changing event data.
 function formatEventRows(){
  if(activeSection!==16)return;
  const panel=document.getElementById('stay-events');
  if(!panel)return;
  for(const article of panel.querySelectorAll(':scope > article.place-item')){
   const heading=article.querySelector(':scope > h3');
   const dateLine=heading?.nextElementSibling;
   const venue=article.querySelector(':scope > .place-address');
   if(!heading || !dateLine || !venue)continue;
   if(heading.textContent==='Presepe Ilari · Chiaravalle'){const source=article.querySelector('.place-links a');if(source)source.textContent='Comune di Chiaravalle';}
   const row=document.createElement('details');row.className='place-disclosure stay-event-disclosure';
   const summary=document.createElement('summary');summary.className='stay-event-summary';
   const thumbnail=document.createElement('span');thumbnail.className='stay-event-thumbnail';thumbnail.setAttribute('aria-hidden','true');
   const fallback=()=>{thumbnail.innerHTML=svg(16);};
   const photo=article.querySelector('.stay-event-image img');
   if(photo){
    const image=document.createElement('img');image.src=photo.src;image.alt='';image.loading='lazy';image.decoding='async';image.referrerPolicy='no-referrer';image.width=56;image.height=60;
    image.addEventListener('error',fallback,{once:true});thumbnail.append(image);
   }else fallback();
   const copy=document.createElement('span');copy.className='stay-event-summary-copy';
   for(const [className,text] of [['stay-event-name',heading.textContent],['stay-event-date',dateLine.textContent],['stay-event-venue',venue.textContent]]){
    const line=document.createElement('span');line.className=className;line.textContent=text;copy.append(line);
   }
   summary.append(thumbnail,copy);
   const expanded=document.createElement('div');expanded.className='place-expanded';
   heading.remove();dateLine.remove();venue.remove();
   expanded.append(...article.childNodes);row.append(summary,expanded);
   row.addEventListener('toggle',()=>{if(row.open)for(const sibling of panel.querySelectorAll('.stay-event-disclosure'))if(sibling!==row)sibling.open=false;});
   article.replaceWith(row);
  }
 }
 new MutationObserver(formatEventRows).observe(document.querySelector('.dialog-body'),{childList:true,subtree:true});
 // Official organizer photograph, also shown in the expanded event with its source credit.
 const candelara=STAY_EVENTS.find(event=>event.id==='candelara-2026');
 if(candelara){candelara.image='assets/events/candelara-candele.jpg';candelara.imageSource='https://www.candelara.it/2018/wp-content/uploads/2018/10/campanile-tre-candele.jpg';candelara.credit='Pro Loco di Candelara · candelara.it';}
 // Chiaravalle (AN) is part of the event research area: see EVENTI.md.
 // Dates and venue: Comune di Chiaravalle, Giunta 158/2026, published 18 November.
 // Daily opening hours and admission conditions have not yet been published in that source.
 const chiaravalleCopy={
  it:['Mostra del Presepe Ilari nel plesso scolastico di viale Marconi, a Chiaravalle.','Giorni e orari di apertura e condizioni d’ingresso da verificare prima della visita.'],
  en:['The Presepe Ilari nativity exhibition at the school on Viale Marconi in Chiaravalle.','Check opening days, times and admission arrangements before visiting.'],
  de:['Krippenausstellung Presepe Ilari im Schulgebäude an der Viale Marconi in Chiaravalle.','Öffnungstage, Uhrzeiten und Eintrittsbedingungen vor dem Besuch prüfen.'],
  fr:['Exposition de la crèche Presepe Ilari dans l’école de viale Marconi à Chiaravalle.','Vérifie les jours, horaires et conditions d’entrée avant la visite.'],
  es:['Exposición del belén Presepe Ilari en la escuela de viale Marconi, en Chiaravalle.','Comprueba los días, horarios y condiciones de entrada antes de la visita.'],
  nl:['De kerststallententoonstelling Presepe Ilari in het schoolgebouw aan Viale Marconi in Chiaravalle.','Controleer openingsdagen, tijden en toegangsvoorwaarden voor je bezoek.'],
  pl:['Wystawa szopki Presepe Ilari w szkole przy viale Marconi w Chiaravalle.','Przed wizytą sprawdź dni i godziny otwarcia oraz warunki wstępu.'],
  ro:['Expoziția de Crăciun Presepe Ilari la școala de pe viale Marconi, în Chiaravalle.','Verifică zilele, orele de deschidere și condițiile de acces înainte de vizită.'],
  cs:['Výstava betléma Presepe Ilari ve škole na viale Marconi v Chiaravalle.','Před návštěvou si ověř otevírací dny, časy a podmínky vstupu.'],
  hu:['A Presepe Ilari betlehemkiállítás Chiaravalléban, a viale Marconi iskolájában.','Látogatás előtt ellenőrizd a nyitvatartási napokat, időpontokat és belépési feltételeket.'],
  bg:['Изложба на рождественската сцена Presepe Ilari в училището на viale Marconi в Киаравале.','Преди посещение провери дните, часовете на отваряне и условията за вход.'],
  ja:['キアラヴァッレのヴィアーレ・マルコーニ校舎で開催される、キリスト降誕場面の展示「Presepe Ilari」。','訪問前に開館日、時間、入場条件をご確認ください。']
 };
 const chiaravalleDescription=STAY_EVENTS_UI.it.length;
 for(const [lang,copy] of Object.entries(chiaravalleCopy))STAY_EVENTS_UI[lang].push(...copy);
 if(!STAY_EVENTS.some(event=>event.id==='chiaravalle-presepe-ilari-2026'))STAY_EVENTS.push({
  id:'chiaravalle-presepe-ilari-2026',area:'Chiaravalle (AN)',rank:1,start:'2026-12-08',end:'2027-01-06',
  title:'Presepe Ilari · Chiaravalle',description:chiaravalleDescription,price:chiaravalleDescription+1,
  venue:'I.C. Montessori–Levi Montalcini · plesso di viale Marconi, aula 3 · Chiaravalle (AN)',
  source:'https://portale.comune.chiaravalle.an.it/cmschiaravalle/portale/albopretorio/albopretorioconsultazione.aspx?P=8600',
  query:'Istituto Montessori Levi Montalcini Viale Marconi Chiaravalle AN',verified:'2026-11-25'
 });
 // January 2027 programme: official AMAT and Marche Teatro sources, checked 25 November.
 const januaryProgramme=[
  {id:'schiaccianoci-senigallia-2027',start:'2027-01-03',end:'2027-01-03',time:'17:00',title:'Lo Schiaccianoci · Balletto di Mosca',copy:'Pëtr Il’ič Čajkovskij · Marius Petipa · Russian Classical Ballet',venue:'Teatro La Fenice · Via Cesare Battisti, 30 · Senigallia',source:'https://www.amatmarche.net/lo-schiaccianoci-balletto-di-mosca/',query:'Teatro La Fenice Senigallia'},
  {id:'gruffalo-senigallia-2027',requiredLanguages:['it'],start:'2027-01-06',end:'2027-01-06',time:'17:00',title:'Il Gruffalò',copy:'Fondazione Aida · Teatro Stabile del Veneto · Julia Donaldson e Axel Scheffler · Manuel Renga',venue:'Teatro La Fenice · Via Cesare Battisti, 30 · Senigallia',source:'https://www.amatmarche.net/il-gruffalo-2/',query:'Teatro La Fenice Senigallia'},
  {id:'incompatibili-ancona-2027',requiredLanguages:['it'],area:'Ancona',rank:1,start:'2027-01-08',end:'2027-01-08',time:'20:30',title:'Totalmente incompatibili · Nuzzo / Di Biase',copy:'Corrado Nuzzo · Maria Di Biase · AGIDI · CMC/Nidodiragno',venue:'Teatro delle Muse · Ancona',source:'https://www.marcheteatro.it/totalmente-incompatibili/',query:'Teatro delle Muse Ancona'},
  {id:'pivetti-fano-2027',requiredLanguages:['it'],area:'Fano',rank:1,start:'2027-01-07',end:'2027-01-10',time:'21:00',title:'L’inferiorità mentale della donna · Veronica Pivetti',copy:'Veronica Pivetti · Giovanna Gra · Gra & Mramor',venue:'Teatro della Fortuna · Fano',query:'Teatro della Fortuna Fano'},
  {id:'giochiamo-ancona-2027',requiredLanguages:['it'],area:'Ancona',rank:1,start:'2027-01-06',end:'2027-01-06',time:'18:00',title:'Giochiamo o non giochiamo · Lannutti & Corbo',copy:'Tout Le Cirque · Lannutti & Corbo · Recremisi',venue:'Teatro Panettone · Ancona',query:'Teatro Panettone Ancona'},
  {id:'mortorio-ancona-2027',requiredLanguages:['it'],area:'Ancona',rank:1,start:'2027-01-09',end:'2027-01-09',time:'21:00',title:'Mortorio · Romina Antonelli',copy:'Made in Marche · Romina Antonelli · Recremisi',venue:'Teatro Panettone · Ancona',query:'Teatro Panettone Ancona'},
  {id:'cigni-pesaro-2027',area:'Pesaro',rank:1,start:'2027-01-07',end:'2027-01-07',time:'21:00',title:'Il lago dei cigni · Balletto di Milano',copy:'Pëtr Il’ič Čajkovskij · Teet Kask · Balletto di Milano',venue:'Teatro Rossini · Pesaro',query:'Teatro Rossini Pesaro'},
  {id:'motta-pesaro-2027',area:'Pesaro',rank:1,start:'2027-01-08',end:'2027-01-08',time:'21:00',title:'Motta · Piano Solo',copy:'Playlist Pesaro · Motta · Elettricaessenza · resetfestival / Glocal Sound',venue:'Teatro Rossini · Pesaro',query:'Teatro Rossini Pesaro'}
 ];
 const januaryPhotos={
  'schiaccianoci-senigallia-2027':['https://www.amatmarche.net/wp-content/uploads/2024/09/Nutcracker_04-1024x684.jpg','AMAT · Russian Classical Ballet'],
  'gruffalo-senigallia-2027':['https://www.amatmarche.net/wp-content/uploads/2024/10/Il_Gruffalo_EleonoraGusi06-1024x682.jpeg','AMAT · Eleonora Gusi']
 };
 for(const event of januaryProgramme){
  const description=STAY_EVENTS_UI.it.length;
  for(const texts of Object.values(STAY_EVENTS_UI))texts.push(event.copy);
  const {copy,...data}=event;
  const photo=januaryPhotos[event.id];if(photo){data.image=photo[0];data.imageSource=event.source;data.credit=photo[1];}
  if(!STAY_EVENTS.some(item=>item.id===event.id))STAY_EVENTS.push({...data,description,price:12,source:event.source||'https://www.amatmarche.net/platea-delle-marche-3/',verified:'2026-11-25'});
 }
 // Verified local images: photographs, official poster, and labelled archival Presepe photo.
 const verifiedEventImages={
  "schiaccianoci-senigallia-2027": {
    "image": "assets/events/cinzia-2027/schiaccianoci.webp",
    "imageSource": "https://www.amatmarche.net/lo-schiaccianoci-balletto-di-mosca/",
    "credit": "AMAT · Russian Classical Ballet"
  },
  "gruffalo-senigallia-2027": {
    "image": "assets/events/cinzia-2027/gruffalo.webp",
    "imageSource": "https://www.amatmarche.net/il-gruffalo-2/",
    "credit": "AMAT · Eleonora Gusi"
  },
  "incompatibili-ancona-2027": {
    "image": "assets/events/cinzia-2027/incompatibili.webp",
    "imageSource": "https://www.marcheteatro.it/totalmente-incompatibili/",
    "credit": "Marche Teatro · Riccardo Ghilardi"
  },
  "pivetti-fano-2027": {
    "image": "assets/events/cinzia-2027/pivetti.webp",
    "imageSource": "https://www.amatmarche.net/linferiorita-mentale-della-donna/",
    "credit": "AMAT · A.ArtistiAssociati"
  },
  "giochiamo-ancona-2027": {
    "image": "assets/events/cinzia-2027/giochiamo.webp",
    "imageSource": "https://lannuttiecorbo.com/",
    "credit": "Compagnia Lannutti & Corbo · To Play or Not To Play"
  },
  "mortorio-ancona-2027": {
    "image": "assets/events/cinzia-2027/mortorio.webp",
    "imageSource": "https://pesaronotizie.com/2026/04/25/mortorio-il-rito-tragicomico-di-romina-antonelli-in-scena-al-pac-di-pesaro/",
    "credit": "Silvia Borroni · PesaroNotizie · Mortorio"
  },
  "cigni-pesaro-2027": {
    "image": "assets/events/cinzia-2027/cigni.webp",
    "imageSource": "https://www.amatmarche.net/pesaro-danza-2026-27/",
    "credit": "AMAT · locandina Pesaro Danza 2026/27"
  },
  "motta-pesaro-2027": {
    "image": "assets/events/cinzia-2027/motta.webp",
    "imageSource": "https://www.amatmarche.net/motta-piano-solo/",
    "credit": "AMAT · Motta"
  },
  "chiaravalle-presepe-ilari-2026": {
    "image": "assets/events/cinzia-2027/ilari.webp",
    "imageSource": "https://www.laltrogiornale.it/2018/12/02/a-chiaravalle-un-gioiello-che-riproduce-la-magia-della-nativita/",
    "credit": "L’altrogiornale · Presepe Ilari, foto d’archivio 2018"
  }
};
 for(const [id,image] of Object.entries(verifiedEventImages)){
  const event=STAY_EVENTS.find(item=>item.id===id);if(event)Object.assign(event,image);
 }
 const fanoPivetti=STAY_EVENTS.find(event=>event.id==='pivetti-fano-2027');
 if(fanoPivetti){fanoPivetti.time='21:00 (7–9/01) · 17:00 (10/01)';fanoPivetti.source='https://www.amatmarche.net/linferiorita-mentale-della-donna/';}
 render();
})();

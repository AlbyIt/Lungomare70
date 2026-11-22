'use strict';
// Guest details live only in the link fragment, never in repository files.
// A personal link grants access to its contents to anyone who receives it.
const PERSONAL_TEXT = {
 it: {welcome:'Benvenuto, {name}!', room:'La mia camera', entry:'Come entrare', gate:'Codice del cancello', safe:'Codice della cassaforte', missing:'Da comunicare', gateHelp:'Digita le 6 cifre seguite da #.', safeHelp:'La cassaforte delle chiavi è a destra della vetrata. Il portachiavi contiene la chiave della camera e il mini-telecomando del cancello.', gatePhoto:'Foto della tastiera del cancello', safePhoto:'Foto della cassaforte', pending:'Foto da aggiungere', demo:'Prova · Camera {room}', capacity:['Fino a 2 persone.','Fino a 3 persone.','Fino a 2 persone.','2 adulti e 2 bambini oppure 1 adulto e 3 bambini.'], invalid:'Il link personale non è valido. Chiedi a Cinzia e Alberto di inviartelo nuovamente.'},
 en: {welcome:'Welcome, {name}!',room:'My room',entry:'How to enter',gate:'Gate code',safe:'Key safe code',missing:'To be provided',gateHelp:'Enter the 6 digits followed by #.',safeHelp:'The key safe is to the right of the glass entrance. The key ring holds your room key and the small gate remote.',gatePhoto:'Gate keypad photo',safePhoto:'Key safe photo',pending:'Photo coming soon',demo:'Preview · Room {room}',capacity:['Up to 2 guests.','Up to 3 guests.','Up to 2 guests.','2 adults and 2 children or 1 adult and 3 children.'],invalid:'This personal link is invalid. Please ask Cinzia and Alberto to send it again.'},
 de: {welcome:'Willkommen, {name}!',room:'Mein Zimmer',entry:'So kommst du hinein',gate:'Torcode',safe:'Schlüsselsafe-Code',missing:'Wird mitgeteilt',gateHelp:'Gib die 6 Ziffern gefolgt von # ein.',safeHelp:'Der Schlüsselsafe befindet sich rechts neben dem Glaseingang. Am Schlüsselbund sind dein Zimmerschlüssel und die kleine Torfernbedienung.',gatePhoto:'Foto der Tortastatur',safePhoto:'Foto des Schlüsselsafes',pending:'Foto folgt',demo:'Vorschau · Zimmer {room}',capacity:['Bis zu 2 Gäste.','Bis zu 3 Gäste.','Bis zu 2 Gäste.','2 Erwachsene und 2 Kinder oder 1 Erwachsener und 3 Kinder.'],invalid:'Dieser persönliche Link ist ungültig. Bitte Cinzia und Alberto um einen neuen Link.'},
 fr: {welcome:'Bienvenue, {name} !',room:'Ma chambre',entry:'Comment entrer',gate:'Code du portail',safe:'Code du coffre à clés',missing:'À communiquer',gateHelp:'Saisis les 6 chiffres suivis de #.',safeHelp:'Le coffre à clés est à droite de la baie vitrée. Le porte-clés contient la clé de ta chambre et la petite télécommande du portail.',gatePhoto:'Photo du clavier du portail',safePhoto:'Photo du coffre à clés',pending:'Photo à ajouter',demo:'Aperçu · Chambre {room}',capacity:['Jusqu’à 2 personnes.','Jusqu’à 3 personnes.','Jusqu’à 2 personnes.','2 adultes et 2 enfants ou 1 adulte et 3 enfants.'],invalid:'Ce lien personnel est invalide. Demande un nouveau lien à Cinzia et Alberto.'},
 es: {welcome:'¡Bienvenido, {name}!',room:'Mi habitación',entry:'Cómo entrar',gate:'Código de la puerta',safe:'Código de la caja de llaves',missing:'Por comunicar',gateHelp:'Introduce las 6 cifras seguidas de #.',safeHelp:'La caja de llaves está a la derecha de la cristalera. El llavero contiene la llave de tu habitación y el pequeño mando de la puerta.',gatePhoto:'Foto del teclado de la puerta',safePhoto:'Foto de la caja de llaves',pending:'Foto pendiente',demo:'Prueba · Habitación {room}',capacity:['Hasta 2 personas.','Hasta 3 personas.','Hasta 2 personas.','2 adultos y 2 niños o 1 adulto y 3 niños.'],invalid:'Este enlace personal no es válido. Pide otro enlace a Cinzia y Alberto.'},
 nl: {welcome:'Welkom, {name}!',room:'Mijn kamer',entry:'Zo kom je binnen',gate:'Poortcode',safe:'Code van het sleutelkluisje',missing:'Wordt meegedeeld',gateHelp:'Voer de 6 cijfers in, gevolgd door #.',safeHelp:'Het sleutelkluisje bevindt zich rechts van de glazen ingang. Aan de sleutelring zitten je kamersleutel en de kleine afstandsbediening van de poort.',gatePhoto:'Foto van het poorttoetsenbord',safePhoto:'Foto van het sleutelkluisje',pending:'Foto volgt',demo:'Voorbeeld · Kamer {room}',capacity:['Maximaal 2 gasten.','Maximaal 3 gasten.','Maximaal 2 gasten.','2 volwassenen en 2 kinderen of 1 volwassene en 3 kinderen.'],invalid:'Deze persoonlijke link is ongeldig. Vraag Cinzia en Alberto om een nieuwe link.'},
 pl: {welcome:'Witaj, {name}!',room:'Mój pokój',entry:'Jak wejść',gate:'Kod do bramy',safe:'Kod do sejfu na klucze',missing:'Do przekazania',gateHelp:'Wpisz 6 cyfr, a następnie #.',safeHelp:'Sejf na klucze znajduje się po prawej stronie przeszklonego wejścia. Brelok zawiera klucz do pokoju i mały pilot do bramy.',gatePhoto:'Zdjęcie klawiatury bramy',safePhoto:'Zdjęcie sejfu na klucze',pending:'Zdjęcie wkrótce',demo:'Podgląd · Pokój {room}',capacity:['Do 2 osób.','Do 3 osób.','Do 2 osób.','2 dorosłych i 2 dzieci lub 1 dorosły i 3 dzieci.'],invalid:'Ten link osobisty jest nieprawidłowy. Poproś Cinzię i Alberta o nowy link.'}
};
const ROOM_AMENITIES = {"it":{"title":"Le dotazioni della tua camera","items":["Mini frigo","Aria condizionata","TV","Wi-Fi gratuito","Ventilatore a soffitto","Asciugacapelli","Bagno privato con doccia e water-bidet","Balcone vista mare con tavolino, due sedie e mini stendino"]},"en":{"title":"Your room amenities","items":["Mini fridge","Air conditioning","TV","Free Wi-Fi","Ceiling fan","Hairdryer","Private bathroom with shower and bidet toilet","Sea-view balcony with a small table, two chairs and a small drying rack"]},"de":{"title":"Deine Zimmerausstattung","items":["Mini-Kühlschrank","Klimaanlage","Fernseher","Kostenloses WLAN","Deckenventilator","Haartrockner","Eigenes Bad mit Dusche und WC mit Bidetfunktion","Balkon mit Meerblick, kleinem Tisch, zwei Stühlen und kleinem Wäscheständer"]},"fr":{"title":"Les équipements de ta chambre","items":["Mini-réfrigérateur","Climatisation","Télévision","Wi-Fi gratuit","Ventilateur de plafond","Sèche-cheveux","Salle de bains privative avec douche et WC-bidet","Balcon vue mer avec petite table, deux chaises et petit étendoir"]},"es":{"title":"El equipamiento de tu habitación","items":["Mini nevera","Aire acondicionado","TV","Wi-Fi gratuito","Ventilador de techo","Secador de pelo","Baño privado con ducha y WC-bidé","Balcón con vistas al mar, mesita, dos sillas y pequeño tendedero"]},"nl":{"title":"De voorzieningen in je kamer","items":["Minikoelkast","Airconditioning","TV","Gratis wifi","Plafondventilator","Haardroger","Eigen badkamer met douche en bidettoilet","Balkon met zeezicht, tafeltje, twee stoelen en klein droogrek"]},"pl":{"title":"Wyposażenie Twojego pokoju","items":["Minilodówka","Klimatyzacja","Telewizor","Bezpłatne Wi-Fi","Wentylator sufitowy","Suszarka do włosów","Prywatna łazienka z prysznicem i WC z funkcją bidetu","Balkon z widokiem na morze, stolikiem, dwoma krzesłami i małą suszarką na pranie"]}};
const ROOM_KEYS = ['stella','duna','onda','perla'];
const ROOM_NAMES = ['Stella','Duna','Onda','Perla'];
// Add only the owner's actual access photographs here when supplied.
const ACCESS_PHOTOS = {gate:[],safe:[]};
function readPersonalLink(hash) {
 const p = new URLSearchParams(hash.replace(/^#/, ''));
 if (!p.has('nome') && !p.has('camera')) return null;
 const name=(p.get('nome')||'').trim();
 const room=p.get('camera');
 const gate=p.get('cancello')||'';
 const safe=p.get('cassaforte')||'';
 if (!name || name.length>100 || !/^[1-4]$/.test(room) || (gate && !/^\d{6}$/.test(gate)) || (safe && !/^\d{4}$/.test(safe))) return {invalid:true};
 return {name, room:Number(room), gate, safe, lang:p.get('lingua'), arrival:p.get('arrivo')||'', gender:p.get('genere')||'', demo:p.get('prova')==='1'};
}
let guest = readPersonalLink(location.hash);
function personalLabel(index, label, lang) {
 if (!guest || guest.invalid) return label;
 return index===3 ? PERSONAL_TEXT[lang].room : index===0 ? PERSONAL_TEXT[lang].entry : label;
}
function renderPersonalHeader(lang) {
 document.body.classList.toggle('personal-mode',Boolean(guest && !guest.invalid));
 if (!guest) return;
 document.querySelector('.brand').setAttribute('href',location.pathname+location.search+location.hash);
 const t=PERSONAL_TEXT[lang];
 if(guest.invalid){
  document.getElementById('welcome').textContent=t.invalid;
  document.getElementById('cards').replaceChildren();
  return;
 }
 const welcome=guest.gender==='f'&&lang==='it'?'Benvenuta, {name}!':guest.gender==='f'&&lang==='es'?'¡Bienvenida, {name}!':t.welcome;
 document.getElementById('welcome').textContent=welcome.replace('{name}',guest.name);
 const title=document.getElementById('hero-title');
 const [greeting,ending]=welcome.split('{name}');
 const name=document.createElement('span');name.className='guest-name';name.textContent=guest.name+ending;
 title.replaceChildren(document.createTextNode(greeting.trim()),name);
 document.getElementById('intro').textContent=`${t.room}: ${guest.room} · ${ROOM_NAMES[guest.room-1]}`;
 if(guest.demo) document.getElementById('subtitle').textContent=t.demo.replace('{room}',guest.room);
}
function renderPersonalSection(index,lang) {
 document.getElementById('room-amenities')?.remove();
 const previous=document.getElementById('personal-access');
 if(previous) previous.remove();
 if(!guest || guest.invalid) return;
 const t=PERSONAL_TEXT[lang];
 document.getElementById('detail-title').textContent=personalLabel(index,GUIDE[lang].labels[index],lang);
 if(index===3) {
  document.getElementById('detail-text').textContent=`${guest.room} · ${ROOM_NAMES[guest.room-1]}`;
  const amenities=ROOM_AMENITIES[lang];
  const section=document.createElement('section');section.id='room-amenities';
  const heading=document.createElement('h3');heading.textContent=amenities.title;
  const list=document.createElement('ul');list.className='room-amenities-list';
  for(const item of amenities.items){const li=document.createElement('li');const terms=['water-bidet','bidet toilet','WC mit Bidetfunktion','WC-bidet','WC-bidé','bidettoilet','WC z funkcją bidetu'];const term=terms.find(x=>item.toLocaleLowerCase().includes(x.toLocaleLowerCase()));if(term){const at=item.toLocaleLowerCase().indexOf(term.toLocaleLowerCase());li.append(document.createTextNode(item.slice(0,at)));const link=document.createElement('button');link.type='button';link.className='inline-bidet-link';link.textContent=item.slice(at,at+term.length);link.addEventListener('click',()=>{openSection(6);document.getElementById('detail').scrollTop=0;});li.append(link,document.createTextNode(item.slice(at+term.length)));}else li.textContent=item;list.append(li);}
  section.append(heading,list);document.getElementById('detail-text').after(section);
 }
 if(index!==0) return;
 const panel=document.createElement('div'); panel.id='personal-access';
 if(guest.arrival && /^\d{4}-\d{2}-\d{2}$/.test(guest.arrival)){
  const date=new Date(guest.arrival+'T12:00:00');
  if(!Number.isNaN(date.getTime())){
   const arrival=document.createElement('p');arrival.className='personal-arrival';
   const formatted=new Intl.DateTimeFormat(lang,{weekday:'long',day:'numeric',month:'long',year:'numeric'}).format(date);
   const prefix={it:'Ti aspettiamo',en:'We look forward to welcoming you',de:'Wir erwarten dich',fr:'Nous t’attendons',es:'Te esperamos',nl:'We verwachten je',pl:'Czekamy na Ciebie'}[lang]||'Ti aspettiamo';
   const timeWord={it:'a partire dalle ore',en:'at',de:'um',fr:'à',es:'a las',nl:'om',pl:'o godzinie'}[lang]||'alle ore';
   arrival.textContent=prefix+' '+formatted+' '+timeWord+' 15:00';
   const detail=document.getElementById('detail-text');
   detail.textContent=arrival.textContent+'.\nLungomare ITALIA, 70 – Marzocca di Senigallia.';
   detail.style.whiteSpace='pre-line';
  }
 }
 for(const kind of ['gate','safe']){
  const box=document.createElement('section');box.className='access-step';
  const heading=document.createElement('h3');heading.textContent=t[kind];
  const code=document.createElement('p');code.className=guest[kind]?'access-code':'access-missing';
  code.textContent=guest[kind] ? guest[kind]+(kind==='gate'?' #':'') : t.missing;
  const help=document.createElement('p');help.textContent=t[kind+'Help'];
  box.append(heading,code,help);
  if(ACCESS_PHOTOS[kind].length){
   for(const src of ACCESS_PHOTOS[kind]){const img=document.createElement('img');img.src=src;img.alt=t[kind+'Photo'];img.loading='lazy';box.append(img);}
  } else if(guest.demo){
   const pending=document.createElement('p');pending.className='access-photo-pending';pending.textContent=`${t[kind+'Photo']} · ${t.pending}`;box.append(pending);
  }
  panel.append(box);
 }
 document.getElementById('detail-text').after(panel);
}

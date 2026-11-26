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
function guestKnownSolo(g,hash=location.hash){
 const params=new URLSearchParams(hash.replace(/^#/,''));
 const count=value=>value!==null&&value!==undefined&&/^\d+$/.test(String(value))?Number(value):null;
 const total=count(g?.people??g?.guestCount??params.get('persone')??params.get('ospiti'));
 if(total!==null&&total>0)return total===1;
 const adults=count(g?.adults??params.get('adulti')),children=count(g?.children??params.get('bambini'));
 if(adults!==null&&adults>0&&children!==null)return adults+children===1;
 return false;
}
function readPersonalLink(hash) {
 const p = new URLSearchParams(hash.replace(/^#/, ''));
 if (!p.has('nome') && !p.has('camera')) return null;
 const name=(p.get('nome')||'').trim();
 const room=p.get('camera');
 const gate=p.get('cancello')||'';
 const safe=p.get('cassaforte')||'';
 if (!name || name.length>100 || !/^[1-4]$/.test(room) || (gate && !/^\d{6}$/.test(gate)) || (safe && !/^\d{4}$/.test(safe))) return {invalid:true};
 const rooms=(p.get('camere')||'').split(',').filter(Boolean).map(Number);
 if(rooms.length && (rooms.some(n=>![1,2,3,4].includes(n)) || !rooms.includes(Number(room)) || new Set(rooms).size!==rooms.length)) return {invalid:true};
 return {name, room:Number(room), rooms:rooms.length?rooms:[Number(room)], gate, safe, lang:p.get('lingua') || ({RO:'ro',ROMANIA:'ro','ROMÂNIA':'ro',CZ:'cs',CZE:'cs',HU:'hu',BG:'bg',JP:'ja',JPN:'ja'}[(p.get('nazionalita')||'').toUpperCase()]||null), arrival:p.get('arrivo')||'', gender:p.get('genere')||'', cleaning:p.get('pulizie')||'', departure:p.get('partenza')||'', demo:p.get('prova')==='1'};
}
let guest = readPersonalLink(location.hash);
function personalLabel(index, label, lang) {
 if (!guest || guest.invalid) return label;
 return index===3 ? (guest.rooms.length>1 ? ({ja:JAPANESE.rooms,hu:HUNGARIAN.rooms,bg:BULGARIAN.rooms,cs:CZECH.rooms,ro:ROMANIAN.rooms,it:'Le nostre camere',en:'Our rooms',de:'Unsere Zimmer',fr:'Nos chambres',es:'Nuestras habitaciones',nl:'Onze kamers',pl:'Nasze pokoje'}[lang]||'Le nostre camere') : PERSONAL_TEXT[lang].room) : index===0 ? PERSONAL_TEXT[lang].entry : label;
}

const PERSONAL_GREETING_TEXT = {
 it:['Buongiorno, {name}!','Buonasera, {name}!','Ti aspettiamo a Lungomare 70','Vi aspettiamo a Lungomare 70'],
 en:['Good morning, {name}!','Good evening, {name}!','We look forward to welcoming you to Lungomare 70','We look forward to welcoming you to Lungomare 70'],
 de:['Guten Morgen, {name}!','Guten Abend, {name}!','Wir freuen uns auf dich bei Lungomare 70','Wir freuen uns auf euch bei Lungomare 70'],
 fr:['Bonjour, {name} !','Bonsoir, {name} !','Nous t’attendons à Lungomare 70','Nous vous attendons à Lungomare 70'],
 es:['¡Buenos días, {name}!','¡Buenas tardes, {name}!','Te esperamos en Lungomare 70','Os esperamos en Lungomare 70'],
 nl:['Goedemorgen, {name}!','Goedenavond, {name}!','We kijken uit naar je komst bij Lungomare 70','We kijken uit naar jullie komst bij Lungomare 70'],
 pl:['Dzień dobry, {name}!','Dobry wieczór, {name}!','Czekamy na Ciebie w Lungomare 70','Czekamy na Was w Lungomare 70'],
 ro:['Bună dimineața, {name}!','Bună seara, {name}!','Te așteptăm la Lungomare 70','Vă așteptăm la Lungomare 70'],
 cs:['Dobré ráno, {name}!','Dobrý večer, {name}!','Těšíme se na tebe v Lungomare 70','Těšíme se na vás v Lungomare 70'],
 hu:['Jó reggelt, {name}!','Jó estét, {name}!','Várunk a Lungomare 70-ben','Várunk benneteket a Lungomare 70-ben'],
 bg:['Добро утро, {name}!','Добър вечер, {name}!','Очакваме те в Lungomare 70','Очакваме ви в Lungomare 70'],
 ja:['{name}さん、おはようございます！','{name}さん、こんばんは！','Lungomare 70でお待ちしています','Lungomare 70で皆さまをお待ちしています']
};
// Morning, daytime and evening forms; use local convention for each language.
const PERSONAL_DAY_GREETING = {it:'Buongiorno, {name}!',en:'Good afternoon, {name}!',de:'Guten Tag, {name}!',fr:'Bonjour, {name} !',es:'¡Buenas tardes, {name}!',nl:'Goedemiddag, {name}!',pl:'Dzień dobry, {name}!',ro:'Bună ziua, {name}!',cs:'Dobrý den, {name}!',hu:'Jó napot, {name}!',bg:'Добър ден, {name}!',ja:'{name}さん、こんにちは！'};
function personalGreetingState(g,lang,welcome,now=new Date()){
 const parts=new Intl.DateTimeFormat('en-CA',{timeZone:'Europe/Rome',year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',hourCycle:'h23'}).formatToParts(now);
 const part=type=>parts.find(p=>p.type===type).value;
 const today=part('year')+'-'+part('month')+'-'+part('day'),hour=Number(part('hour'));
 const arrival=g.arrival;
 const valid=typeof arrival==='string'&&/^\d{4}-\d{2}-\d{2}$/.test(arrival)&&!Number.isNaN(Date.parse(arrival+'T12:00:00Z'))&&new Date(arrival+'T12:00:00Z').toISOString().slice(0,10)===arrival;
 if(!valid||today===arrival)return {greeting:welcome,awaiting:''};
 const t=PERSONAL_GREETING_TEXT[lang]||PERSONAL_GREETING_TEXT.it;
 const greeting=hour>=18||hour<6?t[1]:hour<12?t[0]:(PERSONAL_DAY_GREETING[lang]||PERSONAL_DAY_GREETING.it);
 const plural=!guestKnownSolo(g);
 return {greeting,awaiting:today<arrival?t[plural?3:2]:''};
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
 let welcome=!guestKnownSolo(guest)?({ja:JAPANESE.pluralWelcome,hu:HUNGARIAN.pluralWelcome,bg:BULGARIAN.pluralWelcome,cs:CZECH.pluralWelcome,ro:ROMANIAN.pluralWelcome,it:'Benvenuti, {name}!',es:'¡Bienvenidos, {name}!',pl:'Witajcie, {name}!'}[lang]||t.welcome):guest.gender==='f'&&lang==='bg'?'Добре дошла, {name}!':guest.gender==='f'&&lang==='it'?'Benvenuta, {name}!':guest.gender==='f'&&lang==='es'?'¡Bienvenida, {name}!':t.welcome;
 const greetingState=personalGreetingState(guest,lang,welcome);
 welcome=greetingState.greeting;
 document.getElementById('welcome').textContent=welcome.replace('{name}',guest.name);
 const title=document.getElementById('hero-title');
 const [greeting,ending]=welcome.split('{name}');
 const name=document.createElement('span');name.className='guest-name';name.textContent=guest.name+ending;
 title.replaceChildren(document.createTextNode(greeting.trim()),name);
 let awaiting=document.getElementById('personal-awaiting');
 if(greetingState.awaiting){
  if(!awaiting){awaiting=document.createElement('p');awaiting.id='personal-awaiting';awaiting.style.cssText='font-size:clamp(.8rem,2.5vw,1rem);font-weight:400;line-height:1.35;margin:.4rem 0;';title.after(awaiting);}
  awaiting.textContent=greetingState.awaiting;
 }else awaiting?.remove();
 document.getElementById('intro').textContent=`${t.room}: ${guest.rooms.map(n=>n+' · '+ROOM_NAMES[n-1]).join(' / ')}`;
 if(guest.demo) document.getElementById('subtitle').textContent=t.demo.replace('{room}',guest.room);
}
function pendingSafes(g){const p=new URLSearchParams(location.hash.replace(/^#/,''));return g.rooms.map(n=>{const c=n===g.room?g.safe:(p.get('cassaforte'+n)||'');return c&&/^\d{4}$/.test(c)?n+' · '+ROOM_NAMES[n-1]+': '+c:'';}).filter(Boolean).join(' | ');}

// Cleaning dates are a guest-facing schedule, not confirmation of completed work.
const CLEANING_TIME_COPY={
 "it": [
  "Prossima pulizia",
  "Prossime pulizie",
  "Non sono previste altre pulizie durante il vostro soggiorno.",
  "Non sono previste altre pulizie durante il tuo soggiorno.",
  "Su richiesta, vi forniremo asciugamani puliti in qualsiasi momento.",
  "Su richiesta, ti forniremo asciugamani puliti in qualsiasi momento."
 ],
 "en": [
  "Next cleaning",
  "Upcoming cleanings",
  "No further cleaning is scheduled during your stay.",
  "No further cleaning is scheduled during your stay.",
  "If you need fresh towels, you can ask us at any time.",
  "If you need fresh towels, you can ask us at any time."
 ],
 "de": [
  "Nächste Reinigung",
  "Nächste Reinigungen",
  "Während eures Aufenthalts sind keine weiteren Reinigungen vorgesehen.",
  "Während deines Aufenthalts sind keine weiteren Reinigungen vorgesehen.",
  "Wenn ihr frische Handtücher braucht, könnt ihr uns jederzeit fragen.",
  "Wenn du frische Handtücher brauchst, kannst du uns jederzeit fragen."
 ],
 "fr": [
  "Prochain ménage",
  "Prochains ménages",
  "Aucun autre ménage n’est prévu pendant votre séjour.",
  "Aucun autre ménage n’est prévu pendant ton séjour.",
  "Si vous avez besoin de serviettes propres, vous pouvez nous en demander à tout moment.",
  "Si tu as besoin de serviettes propres, tu peux nous en demander à tout moment."
 ],
 "es": [
  "Próxima limpieza",
  "Próximas limpiezas",
  "No hay más limpiezas previstas durante vuestra estancia.",
  "No hay más limpiezas previstas durante tu estancia.",
  "Si necesitáis toallas limpias, podéis pedírnoslas en cualquier momento.",
  "Si necesitas toallas limpias, puedes pedírnoslas en cualquier momento."
 ],
 "nl": [
  "Volgende schoonmaak",
  "Komende schoonmaakbeurten",
  "Er is geen verdere schoonmaak gepland tijdens jullie verblijf.",
  "Er is geen verdere schoonmaak gepland tijdens je verblijf.",
  "Als jullie schone handdoeken nodig hebben, kunnen jullie het ons altijd vragen.",
  "Als je schone handdoeken nodig hebt, kun je het ons altijd vragen."
 ],
 "pl": [
  "Następne sprzątanie",
  "Najbliższe sprzątania",
  "Podczas Waszego pobytu nie zaplanowano już kolejnego sprzątania.",
  "Podczas Twojego pobytu nie zaplanowano już kolejnego sprzątania.",
  "Jeśli potrzebujecie świeżych ręczników, możecie poprosić nas o nie w każdej chwili.",
  "Jeśli potrzebujesz świeżych ręczników, możesz poprosić nas o nie w każdej chwili."
 ],
 "ro": [
  "Următoarea curățenie",
  "Următoarele curățenii",
  "Nu mai sunt prevăzute alte curățenii pe durata sejurului vostru.",
  "Nu mai sunt prevăzute alte curățenii pe durata sejurului tău.",
  "Dacă aveți nevoie de prosoape curate, ni le puteți cere oricând.",
  "Dacă ai nevoie de prosoape curate, ni le poți cere oricând."
 ],
 "cs": [
  "Příští úklid",
  "Nadcházející úklidy",
  "Během vašeho pobytu již není naplánován další úklid.",
  "Během tvého pobytu již není naplánován další úklid.",
  "Pokud potřebujete čisté ručníky, můžete nás o ně kdykoli požádat.",
  "Pokud potřebuješ čisté ručníky, můžeš nás o ně kdykoli požádat."
 ],
 "hu": [
  "Következő takarítás",
  "Következő takarítások",
  "A tartózkodásotok alatt további takarítás nincs betervezve.",
  "A tartózkodásod alatt további takarítás nincs betervezve.",
  "Ha tiszta törölközőre van szükségetek, bármikor kérhettek tőlünk.",
  "Ha tiszta törölközőre van szükséged, bármikor kérhetsz tőlünk."
 ],
 "bg": [
  "Следващо почистване",
  "Предстоящи почиствания",
  "Не са предвидени други почиствания по време на престоя ви.",
  "Не са предвидени други почиствания по време на престоя ти.",
  "Ако имате нужда от чисти кърпи, можете да ни помолите по всяко време.",
  "Ако имаш нужда от чисти кърпи, можеш да ни помолиш по всяко време."
 ],
 "ja": [
  "次回の清掃",
  "今後の清掃予定",
  "ご滞在中、これ以降の清掃予定はありません。",
  "ご滞在中、これ以降の清掃予定はありません。",
  "新しいタオルが必要な場合は、いつでもお申し付けください。",
  "新しいタオルが必要な場合は、いつでもお申し付けください。"
 ]
};
function cleaningValidDate(value){
 return typeof value==='string'&&/^\d{4}-\d{2}-\d{2}$/.test(value)&&!Number.isNaN(Date.parse(value+'T12:00:00Z'))&&new Date(value+'T12:00:00Z').toISOString().slice(0,10)===value;
}
function cleaningScheduleState(g,now=new Date()){
 const today=new Intl.DateTimeFormat('sv-SE',{timeZone:'Europe/Rome',year:'numeric',month:'2-digit',day:'2-digit'}).format(now);
 const all=String(g?.cleaning||'').split(',').map(x=>x.split(':')).filter(x=>x.length===2&&cleaningValidDate(x[0])&&['pulire','rifare'].includes(x[1])).sort((a,b)=>a[0].localeCompare(b[0]));
 const dated=cleaningValidDate(g?.arrival)&&cleaningValidDate(g?.departure)&&g.arrival<g.departure;
 const started=dated&&today>=g.arrival;
 return {all,items:started?all.filter(([day])=>day>=today):all,started,today};
}
function cleaningKnownSolo(g,hash=location.hash){
 if(typeof woodKnownSolo==='function')return woodKnownSolo(g,hash);
 const p=new URLSearchParams(hash.replace(/^#/,''));
 const total=g?.people??g?.guestCount??p.get('persone')??p.get('ospiti');
 if(total!==null&&total!==undefined&&/^[1-9]\d*$/.test(String(total)))return Number(total)===1;
 return String(g?.adults??p.get('adulti'))==='1'&&String(g?.children??p.get('bambini'))==='0';
}

function renderPersonalSection(index,lang) {
 document.getElementById('room-amenities')?.remove();
 document.querySelector('.personal-cleaning')?.remove();
 const previous=document.getElementById('personal-access');
 if(previous) previous.remove();
 if(!guest || guest.invalid) return;
 const t=PERSONAL_TEXT[lang];
 document.getElementById('detail-title').textContent=personalLabel(index,GUIDE[lang].labels[index],lang);
 if(index===3) {
  document.getElementById('detail-text').textContent=guest.rooms.map(n=>n+' · '+ROOM_NAMES[n-1]).join(' / ');
  const amenities=ROOM_AMENITIES[lang];
  const section=document.createElement('section');section.id='room-amenities';
  const heading=document.createElement('h3');heading.textContent=amenities.title;
  const list=document.createElement('ul');list.className='room-amenities-list';
  for(const item of amenities.items){const li=document.createElement('li');const terms=['ビデ機能付きトイレ','bidéfunkciós WC-vel','тоалетна с функция биде','toaletou s bidetovou funkcí','toaletă cu funcție de bideu','water-bidet','bidet toilet','WC mit Bidetfunktion','WC-bidet','WC-bidé','bidettoilet','WC z funkcją bidetu'];const term=terms.find(x=>item.toLocaleLowerCase().includes(x.toLocaleLowerCase()));if(term){const at=item.toLocaleLowerCase().indexOf(term.toLocaleLowerCase());li.append(document.createTextNode(item.slice(0,at)));const link=document.createElement('button');link.type='button';link.className='inline-bidet-link';link.textContent=item.slice(at,at+term.length);link.addEventListener('click',()=>{openSection(6);document.getElementById('detail').scrollTop=0;});li.append(link,document.createTextNode(item.slice(at+term.length)));}else li.textContent=item;list.append(li);}
  section.append(heading,list);document.getElementById('detail-text').after(section);
 }
 if(index===4){
  const labels={
   ja:JAPANESE.cleaning,hu:HUNGARIAN.cleaning,bg:BULGARIAN.cleaning,cs:CZECH.cleaning,ro:ROMANIAN.cleaning,
   it:{title:'Pulizie programmate',pulire:'Pulizia del pavimento e del bagno, con cambio degli asciugamani',rifare:'Pulizia totale della camera con cambio delle lenzuola e degli asciugamani',towels:'Se hai bisogno di asciugamani puliti, puoi richiederne il cambio in qualsiasi momento.'},
   de:{title:'Geplante Zimmerreinigung',pulire:'Reinigung von Boden und Bad sowie Handtuchwechsel',rifare:'Reinigung des gesamten Zimmers mit Wechsel der Bettwäsche und Handtücher',towels:'Wenn du frische Handtücher brauchst, kannst du jederzeit um einen Wechsel bitten.'},
   en:{title:'Scheduled room cleaning',pulire:'Floor and bathroom cleaning, with fresh towels',rifare:'Cleaning of the entire room, with a change of bed linen and towels',towels:'You can request fresh towels at any time.'},
   fr:{title:'Ménage prévu',pulire:'Nettoyage du sol et de la salle de bain, avec changement des serviettes',rifare:'Nettoyage de toute la chambre avec changement des draps et des serviettes',towels:'Tu peux demander des serviettes propres à tout moment.'},
   es:{title:'Limpieza programada',pulire:'Limpieza del suelo y del baño, con cambio de toallas',rifare:'Limpieza de toda la habitación con cambio de sábanas y toallas',towels:'Puedes pedir toallas limpias en cualquier momento.'},
   nl:{title:'Geplande schoonmaak',pulire:'Reiniging van vloer en badkamer, met schone handdoeken',rifare:'Schoonmaak van de hele kamer met verschoning van beddengoed en handdoeken',towels:'Je kunt op elk moment schone handdoeken vragen.'},
   pl:{title:'Planowane sprzątanie',pulire:'Mycie podłogi i łazienki oraz wymiana ręczników',rifare:'Sprzątanie całego pokoju z wymianą pościeli i ręczników',towels:'W każdej chwili możesz poprosić o wymianę ręczników.'}
  };
  const cleaningNames={ja:JAPANESE.cleaningNames,hu:HUNGARIAN.cleaningNames,bg:BULGARIAN.cleaningNames,cs:CZECH.cleaningNames,ro:ROMANIAN.cleaningNames,"it":{"pulire":"Pulizia standard","rifare":"Pulizia completa"},"de":{"pulire":"Standardreinigung","rifare":"Komplettreinigung"},"en":{"pulire":"Standard cleaning","rifare":"Full cleaning"},"fr":{"pulire":"Ménage standard","rifare":"Ménage complet"},"es":{"pulire":"Limpieza estándar","rifare":"Limpieza completa"},"nl":{"pulire":"Standaardschoonmaak","rifare":"Volledige schoonmaak"},"pl":{"pulire":"Sprzątanie standardowe","rifare":"Pełne sprzątanie"}};
  const tr=labels[lang]||labels.it;
  const schedule=cleaningScheduleState(guest);
  const items=schedule.items;
  const timeCopy=CLEANING_TIME_COPY[lang]||CLEANING_TIME_COPY.it;
  const solo=cleaningKnownSolo(guest);
  const section=document.createElement('section');section.className='personal-cleaning';
  const heading=document.createElement('h3');heading.textContent=schedule.started&&items.length?timeCopy[items.length===1?0:1]:tr.title;section.append(heading);
  if(!items.length&&schedule.all.length){
   const note=document.createElement('p');note.textContent=timeCopy[solo?3:2];section.append(note);
  }
  if(!items.length&&!schedule.all.length){
   const note=document.createElement('p');
   const start=guest.arrival?new Date(guest.arrival+'T12:00:00'):null;
   const end=guest.departure?new Date(guest.departure+'T12:00:00'):null;
   const nights=start&&end?Math.round((end-start)/86400000):null;
   const shortStay={ja:JAPANESE.shortStay,hu:HUNGARIAN.shortStay,bg:BULGARIAN.shortStay,cs:CZECH.shortStay,ro:ROMANIAN.shortStay,
    it:'Per un soggiorno di quattro notti non è prevista una pulizia intermedia. Su richiesta, vi forniremo asciugamani puliti in qualsiasi momento.',
    de:'Bei einem Aufenthalt von vier Nächten ist keine Zwischenreinigung vorgesehen. Wenn ihr frische Handtücher braucht, fragt uns bitte jederzeit danach.',
    en:'For a four-night stay, no intermediate cleaning is scheduled. If you need fresh towels, please do not hesitate to ask.',
    fr:'Pour un séjour de quatre nuits, aucun ménage intermédiaire n’est prévu. Si vous avez besoin de serviettes propres, n’hésitez pas à nous en demander.',
    es:'Para una estancia de cuatro noches no se prevé limpieza intermedia. Si necesitáis cambiar las toallas, no dudéis en pedirlo.',
    nl:'Bij een verblijf van vier nachten is er geen tussentijdse schoonmaak gepland. Hebben jullie schone handdoeken nodig, vraag er dan gerust om.',
    pl:'Przy pobycie na cztery noce nie przewidujemy sprzątania w trakcie pobytu. Jeśli potrzebujecie świeżych ręczników, śmiało poproście.'
   };
   const general={ja:JAPANESE.noCleaning,hu:HUNGARIAN.noCleaning,bg:BULGARIAN.noCleaning,cs:CZECH.noCleaning,ro:ROMANIAN.noCleaning,it:'Non sono previste pulizie intermedie durante il soggiorno.',de:'Während eures Aufenthalts ist keine Zwischenreinigung vorgesehen.',en:'No intermediate cleaning is scheduled during your stay.',fr:'Aucun ménage intermédiaire n’est prévu pendant votre séjour.',es:'No hay limpieza intermedia programada durante vuestra estancia.',nl:'Er is geen tussentijdse schoonmaak gepland tijdens jullie verblijf.',pl:'Podczas pobytu nie zaplanowano sprzątania pośredniego.'};
   note.textContent=nights===4?(shortStay[lang]||shortStay.it):(general[lang]||general.it);
   if(lang==='it'&&solo)note.textContent=note.textContent.replace('Se avete bisogno','Se hai bisogno').replace('non esitate a chiederlo','non esitare a chiederlo');
   section.append(note);
  }
  if(items.length){const list=document.createElement('ul');for(const [day,kind] of items){const d=new Date(day+'T12:00:00');if(Number.isNaN(d.getTime()))continue;const li=document.createElement('li');const date=document.createElement('strong');date.textContent=lang==='ja'?japaneseDate(d):new Intl.DateTimeFormat(lang,{timeZone:'Europe/Rome',weekday:'long',day:'numeric',month:'long',year:'numeric'}).format(d);date.textContent+=' — '+cleaningNames[lang][kind];const description=document.createElement('p');description.textContent=tr[kind];li.append(date,description);list.append(li);}section.append(list);}
  if(schedule.all.length || !(guest.arrival&&guest.departure&&Math.round((new Date(guest.departure+'T12:00:00')-new Date(guest.arrival+'T12:00:00'))/86400000)===4)){const towels=document.createElement('p');towels.textContent=timeCopy[solo?5:4];section.append(towels);}
  document.getElementById('detail-text').textContent='';
  document.getElementById('detail-text').after(section);
 }
 if(index!==0) return;
 const panel=document.createElement('div'); panel.id='personal-access';
 if(guest.arrival && /^\d{4}-\d{2}-\d{2}$/.test(guest.arrival)){
  const date=new Date(guest.arrival+'T12:00:00');
  if(!Number.isNaN(date.getTime())){
   const arrival=document.createElement('p');arrival.className='personal-arrival';
   const formatted=lang==='ja'?japaneseDate(date):new Intl.DateTimeFormat(lang,{weekday:'long',day:'numeric',month:'long',year:'numeric'}).format(date);
   const prefix={ja:JAPANESE.arrivalPrefix,hu:HUNGARIAN.arrivalPrefix,bg:BULGARIAN.arrivalPrefix,cs:CZECH.arrivalPrefix,ro:ROMANIAN.arrivalPrefix,it:'Ti aspettiamo',en:'We look forward to welcoming you',de:'Wir erwarten dich',fr:'Nous t’attendons',es:'Te esperamos',nl:'We verwachten je',pl:'Czekamy na Ciebie'}[lang]||'Ti aspettiamo';
   const timeWord={ja:JAPANESE.arrivalTime,hu:HUNGARIAN.arrivalTime,bg:BULGARIAN.arrivalTime,cs:CZECH.arrivalTime,ro:ROMANIAN.arrivalTime,it:'a partire dalle ore',en:'at',de:'um',fr:'à',es:'a las',nl:'om',pl:'o godzinie'}[lang]||'alle ore';
   arrival.textContent=prefix+' '+formatted+' '+timeWord+' 15:00';
   const detail=document.getElementById('detail-text');
   detail.textContent=arrival.textContent+(lang==='ja'?'。':'.')+'\nLungomare ITALIA, 70 – Marzocca di Senigallia.';
   detail.style.whiteSpace='pre-line';
  }
 }
 // Put the map action inside the entry panel, before either access code.
 const mapLabels={ja:JAPANESE.map,hu:HUNGARIAN.map,bg:BULGARIAN.map,cs:CZECH.map,ro:ROMANIAN.map,it:'Apri la mappa',en:'Open map',de:'Karte öffnen',fr:'Ouvrir la carte',es:'Abrir mapa',nl:'Open de kaart',pl:'Otwórz mapę'};
 const mapLink=document.createElement('a');
 mapLink.className='entry-map-button';
 mapLink.href='https://www.google.com/maps/search/?api=1&query=Lungomare+Italia+70+Marzocca+di+Senigallia';
 mapLink.target='_blank';mapLink.rel='noopener noreferrer';
 mapLink.textContent=mapLabels[lang]||mapLabels.it;
 panel.append(mapLink);
 const oldMapLinks=document.getElementById('detail-links');
 if(oldMapLinks)oldMapLinks.replaceChildren();
 for(const kind of ['gate','safe']){
  const box=document.createElement('section');box.className='access-step';
  const heading=document.createElement('h3');heading.textContent=t[kind];
  const code=document.createElement('p');code.className=guest[kind]?'access-code':'access-missing';
  code.textContent=guest[kind] ? guest[kind]+(kind==='gate'?' #':'') : t.missing;
  if(kind==='safe' && guest.rooms.length>1){code.textContent=guest.safe||t.missing;}
  const help=document.createElement('p');
  if(kind==='safe'){
   const multi=guest.rooms.length>1;
   const roomList=guest.rooms.slice().sort((a,b)=>a-b).map(n=>n+' – '+ROOM_NAMES[n-1]);
   const roomsText=new Intl.ListFormat(lang,{style:'long',type:'conjunction'}).format(roomList);
   const intro={
    ja:JAPANESE.safeIntro(multi,roomsText),hu:HUNGARIAN.safeIntro(multi,roomsText),bg:BULGARIAN.safeIntro(multi,roomsText),cs:CZECH.safeIntro(multi,roomsText),ro:ROMANIAN.safeIntro(multi,roomsText),
    it:multi?'La cassaforte delle chiavi si trova a destra della vetrata d’ingresso. Aprila con il codice indicato e ritira i portachiavi delle camere '+roomsText+'. Ogni portachiavi contiene:':'La cassaforte delle chiavi si trova a destra della vetrata d’ingresso. Aprila con il codice indicato e ritira il portachiavi della camera. Contiene:',
    de:multi?'Der Schlüsselsafe befindet sich rechts neben der verglasten Eingangstür. Öffnet ihn mit dem angegebenen Code und nehmt die Schlüsselbunde für die Zimmer '+roomsText+'. Jeder Schlüsselbund enthält:':'Der Schlüsselsafe befindet sich rechts neben der verglasten Eingangstür. Öffnet ihn mit dem angegebenen Code und nehmt den Schlüsselbund für euer Zimmer. Er enthält:',
    en:multi?'The key safe is to the right of the glass entrance door. Open it with the code shown and take the key rings for rooms '+roomsText+'. Each key ring contains:':'The key safe is to the right of the glass entrance door. Open it with the code shown and take your room key ring. It contains:',
    fr:multi?'Le coffre à clés se trouve à droite de la porte vitrée d’entrée. Ouvrez-le avec le code indiqué et prenez les trousseaux des chambres '+roomsText+'. Chaque trousseau contient:':'Le coffre à clés se trouve à droite de la porte vitrée d’entrée. Ouvrez-le avec le code indiqué et prenez le trousseau de votre chambre. Il contient:',
    es:multi?'La caja de llaves está a la derecha de la puerta acristalada de entrada. Abridla con el código indicado y recoged los llaveros de las habitaciones '+roomsText+'. Cada llavero contiene:':'La caja de llaves está a la derecha de la puerta acristalada de entrada. Abridla con el código indicado y recoged el llavero de vuestra habitación. Contiene:',
    nl:multi?'De sleutelkluis bevindt zich rechts van de glazen toegangsdeur. Open deze met de aangegeven code en neem de sleutelbossen voor kamers '+roomsText+'. Elke sleutelbos bevat:':'De sleutelkluis bevindt zich rechts van de glazen toegangsdeur. Open deze met de aangegeven code en neem de sleutelbos voor jullie kamer. Deze bevat:',
    pl:multi?'Sejf na klucze znajduje się po prawej stronie przeszklonych drzwi wejściowych. Otwórzcie go podanym kodem i zabierzcie komplety kluczy do pokoi '+roomsText+'. Każdy komplet zawiera:':'Sejf na klucze znajduje się po prawej stronie przeszklonych drzwi wejściowych. Otwórzcie go podanym kodem i zabierzcie komplet kluczy do swojego pokoju. Zawiera:'
   };
   const items={
    ja:JAPANESE.keys,hu:HUNGARIAN.keys,bg:BULGARIAN.keys,cs:CZECH.keys,ro:ROMANIAN.keys,
    it:['La chiave della camera','La chiave della vetrata d’ingresso','Il mini-telecomando del cancello'],
    de:['Den Zimmerschlüssel','Den Schlüssel zur verglasten Eingangstür','Die kleine Fernbedienung für das Tor'],
    en:['The room key','The glass entrance door key','The small gate remote'],
    fr:['La clé de la chambre','La clé de la porte vitrée d’entrée','La petite télécommande du portail'],
    es:['La llave de la habitación','La llave de la puerta acristalada de entrada','El pequeño mando del portón'],
    nl:['De kamersleutel','De sleutel van de glazen toegangsdeur','De kleine afstandsbediening voor de poort'],
    pl:['Klucz do pokoju','Klucz do przeszklonych drzwi wejściowych','Mały pilot do bramy']
   };
   const remote={
    ja:JAPANESE.remote,hu:HUNGARIAN.remote,bg:BULGARIAN.remote,cs:CZECH.remote,ro:ROMANIAN.remote,
    it:'Per aprire il cancello, basta avvicinare il mini-telecomando alla tastiera.',
    de:'Um das Tor zu öffnen, haltet die kleine Fernbedienung einfach an das Tastenfeld.',
    en:'To open the gate, simply hold the small remote close to the keypad.',
    fr:'Pour ouvrir le portail, il suffit d’approcher la petite télécommande du clavier.',
    es:'Para abrir el portón, basta con acercar el pequeño mando al teclado.',
    nl:'Houd de kleine afstandsbediening gewoon dicht bij het toetsenpaneel om de poort te openen.',
    pl:'Aby otworzyć bramę, wystarczy zbliżyć mały pilot do klawiatury.'
   };
   help.textContent=intro[lang]||intro.it;
   const list=document.createElement('ul');list.className='keyring-items';
   for(const item of (items[lang]||items.it)){const li=document.createElement('li');li.textContent=item;list.append(li);}
   const note=document.createElement('p');note.className='remote-note';note.textContent=remote[lang]||remote.it;
   box.append(heading,code,help,list,note);
  }else{
   help.textContent=t[kind+'Help'];
   box.append(heading,code,help);
  }
  if(ACCESS_PHOTOS[kind].length){
   for(const src of ACCESS_PHOTOS[kind]){const img=document.createElement('img');img.src=src;img.alt=t[kind+'Photo'];img.loading='lazy';box.append(img);}
  } else if(guest.demo){
   const pending=document.createElement('p');pending.className='access-photo-pending';pending.textContent=`${t[kind+'Photo']} · ${t.pending}`;box.append(pending);
  }
  panel.append(box);
 }
 document.getElementById('detail-text').after(panel);

}

function refreshPersonalGreeting(){
 if(!guest||guest.invalid)return;
 const lang=document.documentElement.lang||'it';
 const t=PERSONAL_TEXT[lang];
 if(!t)return;
 const state=personalGreetingState(guest,lang,t.welcome);
 const expected=state.greeting.replace('{name}',guest.name);
 // Arrival-day welcome may be gendered: its existing renderer owns that choice.
 if(state.greeting===t.welcome&&state.awaiting===''){
  const arrivalDay=new Intl.DateTimeFormat('sv-SE',{timeZone:'Europe/Rome'}).format(new Date());
  if(arrivalDay===guest.arrival&&document.getElementById('personal-awaiting'))renderPersonalHeader(lang);
  return;
 }
 if(document.getElementById('welcome')?.textContent!==expected||(document.getElementById('personal-awaiting')?.textContent||'')!==state.awaiting)renderPersonalHeader(lang);
}
setInterval(refreshPersonalGreeting,30000);
document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='visible')refreshPersonalGreeting();});
window.addEventListener('focus',refreshPersonalGreeting);
window.addEventListener('pageshow',refreshPersonalGreeting);

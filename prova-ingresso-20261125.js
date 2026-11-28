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
   "Felici di accogliervi",
   "Felici di accoglierti"
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
   "Happy to welcome you",
   "Happy to welcome you"
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
   "Froh, euch begrüßen zu dürfen",
   "Froh, dich begrüßen zu dürfen"
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
   "Heureux de vous accueillir",
   "Heureux de t’accueillir"
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
   "Encantados de recibiros",
   "Encantados de recibirte"
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
   "Blij jullie te mogen verwelkomen",
   "Blij je te mogen verwelkomen"
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
   "Miło Was gościć",
   "Miło Cię gościć"
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
   "Bucuroși să vă primim",
   "Bucuroși să te primim"
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
   "Rádi vás vítáme",
   "Rádi tě vítáme"
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
   "Örömmel látunk vendégül benneteket",
   "Örömmel látunk vendégül"
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
   "С радост ви посрещаме",
   "С радост те посрещаме"
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
   "皆さまを心より歓迎します",
   "心より歓迎します"
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
 return today<g.arrival?'before':today>g.departure?'after':today===g.departure?'departure':'during';
}
function woodKnownSolo(g,hash=location.hash){return guestKnownSolo(g,hash);}

const WOOD_HOLIDAY_SLOGAN={"it":"La guida alla tua vacanza su misura","en":"Your tailor-made holiday","de":"Dein Urlaub nach Maß","fr":"Tes vacances sur mesure","es":"Tus vacaciones a medida","nl":"Jouw vakantie op maat","pl":"Twoje wakacje na miarę","ro":"Vacanța ta pe măsura ta","cs":"Tvá dovolená na míru","hu":"A rád szabott nyaralás","bg":"Твоята почивка по мярка","ja":"あなたに合わせた休暇"};
// Arrival/departure reminders replace only the holiday slogan, preserving its typography.
const WOOD_DAY_REMINDERS={
 "it": [
  "Potrai entrare in camera a partire dalle 15:00 di oggi.",
  "Oggi è il giorno della partenza: ti preghiamo di lasciare la camera entro le 10:00 di questa mattina.",
  "Potrai entrare nelle camere a partire dalle 15:00 di oggi.",
  "Oggi è il giorno della partenza: ti preghiamo di lasciare le camere entro le 10:00 di questa mattina.",
  "Arrivederci, {name}!"
 ],
 "en": [
  "You can access your room from 3:00 pm today.",
  "Today is departure day: please vacate your room by 10:00 this morning.",
  "You can access your rooms from 3:00 pm today.",
  "Today is departure day: please vacate your rooms by 10:00 this morning.",
  "Goodbye, {name}!"
 ],
 "de": [
  "Dein Zimmer steht dir heute ab 15:00 Uhr zur Verfügung.",
  "Heute ist Abreisetag: Bitte verlasse dein Zimmer bis 10:00 Uhr heute Morgen.",
  "Eure Zimmer stehen euch heute ab 15:00 Uhr zur Verfügung.",
  "Heute ist Abreisetag: Bitte verlasst eure Zimmer bis 10:00 Uhr heute Morgen.",
  "Auf Wiedersehen, {name}!"
 ],
 "fr": [
  "Tu pourras accéder à ta chambre à partir de 15 h aujourd’hui.",
  "Aujourd’hui, c’est le jour du départ : merci de libérer ta chambre avant 10 h ce matin.",
  "Vous pourrez accéder à vos chambres à partir de 15 h aujourd’hui.",
  "Aujourd’hui, c’est le jour du départ : merci de libérer vos chambres avant 10 h ce matin.",
  "Au revoir, {name} !"
 ],
 "es": [
  "Podrás entrar en tu habitación a partir de las 15:00 de hoy.",
  "Hoy es el día de salida: deberás dejar la habitación antes de las 10:00 de esta mañana.",
  "Podréis entrar en las habitaciones a partir de las 15:00 de hoy.",
  "Hoy es el día de salida: deberéis dejar las habitaciones antes de las 10:00 de esta mañana.",
  "¡Hasta pronto, {name}!"
 ],
 "nl": [
  "Je kunt vandaag vanaf 15:00 uur je kamer in.",
  "Vandaag is de vertrekdag: verlaat je kamer uiterlijk om 10:00 uur vanochtend.",
  "Jullie kunnen vandaag vanaf 15:00 uur de kamers in.",
  "Vandaag is de vertrekdag: verlaat de kamers uiterlijk om 10:00 uur vanochtend.",
  "Tot ziens, {name}!"
 ],
 "pl": [
  "Możesz wejść do pokoju dzisiaj od godziny 15:00.",
  "Dziś jest dzień wyjazdu: opuść pokój do godziny 10:00 dzisiejszego ranka.",
  "Możecie wejść do pokoi dzisiaj od godziny 15:00.",
  "Dziś jest dzień wyjazdu: opuśćcie pokoje do godziny 10:00 dzisiejszego ranka.",
  "Do zobaczenia, {name}!"
 ],
 "ro": [
  "Vei putea intra în cameră începând de astăzi de la ora 15:00.",
  "Astăzi este ziua plecării: va trebui să eliberezi camera până la ora 10:00 în această dimineață.",
  "Veți putea intra în camere începând de astăzi de la ora 15:00.",
  "Astăzi este ziua plecării: va trebui să eliberați camerele până la ora 10:00 în această dimineață.",
  "La revedere, {name}!"
 ],
 "cs": [
  "Do pokoje můžeš vstoupit dnes od 15:00.",
  "Dnes je den odjezdu: pokoj prosím opusť do 10:00 dnes dopoledne.",
  "Do pokojů můžete vstoupit dnes od 15:00.",
  "Dnes je den odjezdu: pokoje prosím opusťte do 10:00 dnes dopoledne.",
  "Na shledanou, {name}!"
 ],
 "hu": [
  "A szobát ma 15:00 órától foglalhatod el.",
  "Ma van az elutazás napja: a szobát ma délelőtt 10:00 óráig kell elhagynod.",
  "A szobákat ma 15:00 órától foglalhatjátok el.",
  "Ma van az elutazás napja: a szobákat ma délelőtt 10:00 óráig kell elhagynotok.",
  "Viszontlátásra, {name}!"
 ],
 "bg": [
  "Можеш да влезеш в стаята днес след 15:00 ч.",
  "Днес е денят на заминаване: трябва да освободиш стаята до 10:00 ч. тази сутрин.",
  "Можете да влезете в стаите днес след 15:00 ч.",
  "Днес е денят на заминаване: трябва да освободите стаите до 10:00 ч. тази сутрин.",
  "Довиждане, {name}!"
 ],
 "ja": [
  "本日は15:00からお部屋をご利用いただけます。",
  "本日はご出発日です。今朝10:00までにお部屋をお空けください。",
  "本日は15:00から各お部屋をご利用いただけます。",
  "本日はご出発日です。今朝10:00までに各お部屋をお空けください。",
  "{name}様、またのお越しを！"
 ]
};
function woodDayReminder(g,lang,now=new Date()){
 const phase=woodStayPhase(g,now);
 if(!phase||phase==='before'||phase==='after')return '';
 const today=new Intl.DateTimeFormat('sv-SE',{timeZone:'Europe/Rome',year:'numeric',month:'2-digit',day:'2-digit'}).format(now);
 const copy=WOOD_DAY_REMINDERS[lang]||WOOD_DAY_REMINDERS.it;
 const offset=g.rooms?.length>1?2:0;
 let text=phase==='departure'?copy[offset+1]:today===g.arrival?copy[offset]:'';
 // Occupancy determines the Italian verb; room count only determines camera/camere.
 if(lang==='it'&&!woodKnownSolo(g))text=text.replace('Potrai','Potrete').replace('ti preghiamo','vi preghiamo');
 return text;
}
function renderWoodSubtitle(subtitle,lang){
 const reminder=woodDayReminder(guest,lang);
 const text=reminder||(WOOD_HOLIDAY_SLOGAN[lang]||WOOD_HOLIDAY_SLOGAN.it);
 subtitle.classList.toggle('stay-day-reminder',Boolean(reminder));
 if(subtitle.textContent!==text)subtitle.textContent=text;
 // Use the full photo width rather than the narrower greeting column.
 const hero=document.querySelector('.hero');
 if(hero&&subtitle.parentElement!==hero)hero.append(subtitle);
}
function woodFarewellExclamation(text,lang){
 return text.replace(/[.!！。\s]+$/u,'')+(lang==='ja'?'！':lang==='fr'?' !':'!');
}


const WOOD_POST_STAY_COPY={"it":{"thanks":"Grazie, {name}, per aver soggiornato con noi!","generic":"Grazie per aver soggiornato con noi!","invite":["Saremo felici di accogliervi di nuovo, quando vorrete!","Saremo felici di accoglierti di nuovo, quando vorrai!"],"call":"Chiamaci","write":"Scrivici"},"en":{"thanks":"Thank you, {name}, for staying with us!","generic":"Thank you for staying with us!","invite":["We’d be happy to welcome you back whenever you wish!","We’d be happy to welcome you back whenever you wish!"],"call":"Call","write":"Write to us"},"de":{"thanks":"Danke, {name}, für euren Aufenthalt bei uns!","soloThanks":"Danke, {name}, für deinen Aufenthalt bei uns!","generic":"Vielen Dank für den Aufenthalt bei uns!","invite":["Wir freuen uns, euch jederzeit wieder begrüßen zu dürfen!","Wir freuen uns, dich jederzeit wieder begrüßen zu dürfen!"],"call":"Anrufen","write":"Schreibt uns","soloWrite":"Schreib uns"},"fr":{"thanks":"Merci, {name}, d’avoir séjourné chez nous !","generic":"Merci d’avoir séjourné chez nous !","invite":["Nous serons heureux de vous accueillir à nouveau, quand vous le souhaiterez !","Nous serons heureux de t’accueillir à nouveau, quand tu le souhaiteras !"],"call":"Appeler","write":"Écrivez-nous","soloWrite":"Écris-nous"},"es":{"thanks":"¡Gracias, {name}, por alojaros con nosotros!","soloThanks":"¡Gracias, {name}, por alojarte con nosotros!","generic":"¡Gracias por vuestra estancia!","soloGeneric":"¡Gracias por tu estancia!","invite":["¡Estaremos encantados de recibiros de nuevo cuando queráis!","¡Estaremos encantados de recibirte de nuevo cuando quieras!"],"call":"Llamar","write":"Escribidnos","soloWrite":"Escríbenos"},"nl":{"thanks":"Bedankt, {name}, voor jullie verblijf bij ons!","soloThanks":"Bedankt, {name}, voor je verblijf bij ons!","generic":"Bedankt voor het verblijf bij ons!","invite":["We verwelkomen jullie graag opnieuw, wanneer jullie maar willen!","We verwelkomen je graag opnieuw, wanneer je maar wilt!"],"call":"Bellen","write":"Schrijf ons"},"pl":{"thanks":"Dziękujemy, {name}, za pobyt u nas!","generic":"Dziękujemy za pobyt u nas!","invite":["Z przyjemnością ugościmy Was ponownie, kiedy tylko zechcecie!","Z przyjemnością ugościmy Cię ponownie, kiedy tylko zechcesz!"],"call":"Zadzwoń","write":"Napisz do nas"},"ro":{"thanks":"Mulțumim, {name}, că ați stat la noi!","soloThanks":"Mulțumim, {name}, că ai stat la noi!","generic":"Vă mulțumim că ați stat la noi!","soloGeneric":"Îți mulțumim că ai stat la noi!","invite":["Ne vom bucura să vă primim din nou, oricând doriți!","Ne vom bucura să te primim din nou, oricând dorești!"],"call":"Sună","write":"Scrie-ne"},"cs":{"thanks":"Děkujeme, {name}, za váš pobyt u nás!","soloThanks":"Děkujeme, {name}, za tvůj pobyt u nás!","generic":"Děkujeme za pobyt u nás!","invite":["Rádi vás znovu přivítáme, kdykoli budete chtít!","Rádi tě znovu přivítáme, kdykoli budeš chtít!"],"call":"Zavolat","write":"Napište nám","soloWrite":"Napiš nám"},"hu":{"thanks":"Köszönjük, {name}, hogy nálunk szálltatok meg!","soloThanks":"Köszönjük, {name}, hogy nálunk szálltál meg!","generic":"Köszönjük, hogy nálunk szálltatok meg!","soloGeneric":"Köszönjük, hogy nálunk szálltál meg!","invite":["Örömmel várunk vissza benneteket, amikor csak szeretnétek!","Örömmel várunk vissza, amikor csak szeretnéd!"],"call":"Hívás","write":"Írjatok nekünk","soloWrite":"Írj nekünk"},"bg":{"thanks":"Благодарим, {name}, че бяхте наши гости!","soloThanks":"Благодарим, {name}, че беше наш гост!","generic":"Благодарим, че бяхте наши гости!","soloGeneric":"Благодарим, че беше наш гост!","invite":["Ще се радваме да ви посрещнем отново, когато пожелаете!","Ще се радваме да те посрещнем отново, когато пожелаеш!"],"call":"Обади се","write":"Пишете ни","soloWrite":"Пиши ни"},"ja":{"thanks":"{name}様、ご宿泊ありがとうございました！","generic":"ご宿泊ありがとうございました！","invite":["皆さまをまたお迎えできる日を楽しみにしています。いつでもお越しください！","またお迎えできる日を楽しみにしています。いつでもお越しください！"],"call":"電話する","write":"メールする"}};
function woodPostStayText(g,lang,hash=location.hash){
 const copy=WOOD_POST_STAY_COPY[lang]||WOOD_POST_STAY_COPY.it;
 const solo=woodKnownSolo(g,hash),name=String(g?.name||'').trim();
 const thanks=name?(solo&&copy.soloThanks?copy.soloThanks:copy.thanks).replace('{name}',name):(solo&&copy.soloGeneric?copy.soloGeneric:copy.generic);
 return {thanks,invite:copy.invite[solo?1:0],call:copy.call,write:solo&&copy.soloWrite?copy.soloWrite:copy.write};
}
function renderWoodPostStay(lang,phase){
 const ended=phase==='after';
 document.documentElement.classList.toggle('post-stay',ended);
 let panel=document.getElementById('post-stay-message');
 if(!ended){panel?.remove();return;}
 const dialog=document.getElementById('detail');
 if(dialog?.open){dialog.close();activeSection=null;}
 // Clear any open operational details before showing the farewell.
 for(const id of ['detail-text','detail-links','detail-photos'])document.getElementById(id)?.replaceChildren();
 if(!panel){
  panel=document.createElement('section');panel.id='post-stay-message';panel.setAttribute('aria-labelledby','post-stay-title');panel.setAttribute('aria-live','polite');
  const title=document.createElement('h1');title.id='post-stay-title';
  const invite=document.createElement('p');invite.className='post-stay-invite';
  const signature=document.createElement('p');signature.className='post-stay-signature';signature.textContent='Cinzia e Alberto';
  const contacts=document.createElement('nav');contacts.className='post-stay-contacts';
  const call=document.createElement('a');call.href='tel:+393357739549';call.className='post-stay-call';
  const write=document.createElement('a');write.href='mailto:info@lungomare70.it';write.className='post-stay-write';
  for(const [button,path] of [[call,'<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.1-8.7A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.4 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z"/>'],[write,'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>']]){
   const icon=document.createElement('span');icon.className='post-contact-icon';icon.setAttribute('aria-hidden','true');icon.innerHTML='<svg viewBox="0 0 24 24" focusable="false">'+path+'</svg>';
   const label=document.createElement('span');label.className='post-contact-label';button.append(icon,label);
  }
  contacts.append(call,write);panel.append(title,invite,signature,contacts);document.querySelector('main').append(panel);
 }
 const text=woodPostStayText(guest,lang);
 for(const [selector,value] of [['h1',text.thanks],['.post-stay-invite',text.invite],['.post-stay-call .post-contact-label',text.call],['.post-stay-write .post-contact-label',text.write]]){
  const el=panel.querySelector(selector);if(el.textContent!==value)el.textContent=value;
 }
 panel.querySelector('nav').setAttribute('aria-label',GUIDE[lang]?.contact||GUIDE.it.contact);
}

function renderWoodStayCopy(lang){
 if(!guest||guest.invalid){renderWoodPostStay(lang,null);return;}
 const copy=WOOD_STAY_COPY[lang]||WOOD_STAY_COPY.it;
 document.getElementById('personal-awaiting')?.remove();
 const subtitle=document.getElementById('subtitle');
 renderWoodSubtitle(subtitle,lang);
 const phase=woodStayPhase(guest);
 renderWoodPostStay(lang,phase);
 if(!phase||phase==='after')return;
 const text=woodFarewellExclamation(copy[phase][woodKnownSolo(guest)?1:0],lang);
 const farewell=document.getElementById('footer');
 // Preserve the approved handwriting, two lines, names, address and background.
 const intro=farewell.querySelector('.signature-intro');
 if(intro){if(intro.textContent!==text)intro.textContent=text;}
 else farewell.textContent=text+', Cinzia e Alberto';
}

const WOOD_HOUSE_RULE_ICONS=[
 // Quiet: moon. Pets: barred paw. Beach return: drying towel. Smoking: barred cigarette.
 '<path d="M20.5 14.2A8.5 8.5 0 0 1 9.8 3.5a8.5 8.5 0 1 0 10.7 10.7Z"/>',
 '<ellipse cx="7" cy="7.5" rx="1.5" ry="2"/><ellipse cx="12" cy="5.5" rx="1.5" ry="2"/><ellipse cx="17" cy="7.5" rx="1.5" ry="2"/><path d="M8 13c-2 2-3 5-1 6 2 1 3-1 5-1s3 2 5 1c2-1 1-4-1-6-2-3-6-3-8 0Z"/><path d="m3 3 18 18"/>',
 '<path d="M5 5h12v15H5zM8 5V3h12v14h-3M5 16h12M8 20v1m3-1v1m3-1v1"/><path d="M2 9c2-2 2-2 0-4m20 9c-2-2-2-2 0-4"/>',
 '<path d="M3 14h15v4H3zM15 14v4M20 14v4M21 11c2-4-4-3-2-7M16 10c2-3-3-3-2-6M3 3l18 18"/>'
];
function decorateHouseRules(){
 const panel=document.getElementById('area-content');
 if(!panel)return;
 [...panel.querySelectorAll(':scope > details')].forEach((row,index)=>{
  const path=WOOD_HOUSE_RULE_ICONS[index],summary=row.querySelector('summary');
  if(!path||!summary||summary.querySelector('.house-rule-icon'))return;
  const label=document.createElement('span');label.className='house-rule-label';
  label.append(...summary.childNodes);
  const icon=document.createElement('span');icon.className='house-rule-icon';icon.setAttribute('aria-hidden','true');
  const svg=document.createElementNS('http://www.w3.org/2000/svg','svg');
  svg.setAttribute('viewBox','0 0 24 24');svg.setAttribute('focusable','false');
  svg.innerHTML=path;icon.append(svg);
  summary.classList.add('house-rule-summary');summary.replaceChildren(icon,label);
 });
}

(() => {
 const previousGreetingState=personalGreetingState;
 personalGreetingState=function(g,lang,welcome,now=new Date()){
  const state=previousGreetingState(g,lang,welcome,now);
  return {...state,greeting:woodStayPhase(g,now)==='departure'?(WOOD_DAY_REMINDERS[lang]||WOOD_DAY_REMINDERS.it)[4]:state.greeting,awaiting:''};
 };
 const previousHeader=renderPersonalHeader;
 renderPersonalHeader=function(lang){previousHeader(lang);renderWoodStayCopy(lang);};
 const refresh=()=>{
  const lang=document.documentElement.lang||'it';
  renderPersonalHeader(lang);
  if(dialog.open&&activeSection===10)renderDepartureSection(lang);
  if(dialog.open&&activeSection===4)renderPersonalSection(4,lang);
 };
 setInterval(refresh,30000);
 document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='visible')refresh();});
 window.addEventListener('focus',refresh);
 window.addEventListener('pageshow',refresh);

 // On departure day, use the same today's reminder in the checkout section.
 const previousDepartureSection=renderDepartureSection;
 renderDepartureSection=function(lang){
  previousDepartureSection(lang);
  if(!guest||guest.invalid||woodStayPhase(guest)!=='departure')return;
  const text=document.getElementById('detail-text');
  const paragraphs=text.textContent.split('\n\n');
  paragraphs[0]=woodDayReminder(guest,lang);
  text.textContent=paragraphs.join('\n\n');
 };

 // Move room signs from the fixed heading into the room-name row; menu signs stay intact.
 const previousOpenSection=openSection;
 openSection=function(index){
  if(guest&&!guest.invalid&&woodStayPhase(guest)==='after'){renderWoodStayCopy(document.documentElement.lang||'it');return;}
  previousOpenSection(index);
  if(index===5)decorateHouseRules();
  if(index===13){
   const text=document.getElementById('detail-text');
   text.textContent=text.textContent.replace(/([.。])\s*/, '$1\n');
   text.style.whiteSpace='pre-line';
  }
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
   const placeName=summary?.querySelector('.place-name');
   if(isFood&&placeName?.textContent.trim()==='Madonnina del Pescatore'&&!placeName.querySelector('.michelin-list-stars')){
    const stars=document.createElement('span');stars.className='michelin-list-stars';stars.setAttribute('aria-label','2 MICHELIN');stars.style.cssText='display:inline-flex;vertical-align:middle;gap:2px;margin-left:.4rem';
    for(let count=0;count<2;count++){const star=document.createElement('img');star.src='https://guide.michelin.com/assets/images/icons/michelin-star_8519-e01f8a46cd78113499b826a74e01e7ac.svg';star.alt='';star.width=18;star.height=18;star.referrerPolicy='no-referrer';star.style.cssText='width:18px;height:18px;object-fit:contain';stars.append(star);}placeName.append(stars);
   }
   const photo=row.querySelector('.place-photo img');
   if(!summary || !photo || summary.querySelector('.visit-thumbnail') || row.dataset.thumbnailFailed)continue;
   const thumbnail=document.createElement('img');thumbnail.className='visit-thumbnail'+(isFood?' restaurant-thumbnail':'');
   const isGuelfi=isFood&&summary.querySelector('.place-name')?.textContent.trim()==='Taverna dei Guelfi';
   thumbnail.src=isGuelfi?'https://tavernadeiguelfi.com/wp-content/uploads/2020/01/IMG_1981.jpg':photo.src;thumbnail.alt='';thumbnail.setAttribute('aria-hidden','true');
   if(isGuelfi){summary.querySelector('.place-name > svg')?.remove();thumbnail.title='Foto: Taverna dei Guelfi · sito ufficiale';}
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

 // Sloppy Joe confirmed by Alberto; address/photo: venue-managed Tripadvisor listing.
 if(!AREA_PLACES.food.some(place=>place.name==='Sloppy Joe')){
  AREA_PLACES.food.push({
   name:'Sloppy Joe',address:'Lungomare Italia 53, Marzocca di Senigallia',
   query:'Sloppy Joe Lungomare Italia 53 Marzocca Senigallia',
   source:'https://www.tripadvisor.it/Restaurant_Review-g194914-d8547232-Reviews-Sloppy_Joe-Senigallia_Province_of_Ancona_Marche.html',
   description:{"it":"Pizzeria sul lungomare di Marzocca, con posti a sedere e servizio da asporto. Contatta il locale per aperture e prenotazioni.","en":"Pizzeria on the Marzocca seafront, with seating and takeaway. Contact the venue for opening times and bookings.","de":"Pizzeria an der Strandpromenade von Marzocca, mit Sitzplätzen und Speisen zum Mitnehmen. Öffnungszeiten und Reservierungen direkt erfragen.","fr":"Pizzeria sur le front de mer de Marzocca, avec places assises et vente à emporter. Contacte le restaurant pour les horaires et les réservations.","es":"Pizzería en el paseo marítimo de Marzocca, con mesas y comida para llevar. Contacta con el local para horarios y reservas.","nl":"Pizzeria aan de boulevard van Marzocca, met zitplaatsen en afhaalservice. Neem contact op voor openingstijden en reserveringen.","pl":"Pizzeria przy promenadzie w Marzocca, z miejscami siedzącymi i pizzą na wynos. O godziny otwarcia i rezerwacje zapytaj bezpośrednio.","ro":"Pizzerie pe faleza din Marzocca, cu locuri la masă și servire la pachet. Contactează localul pentru program și rezervări.","cs":"Pizzerie na pobřežní promenádě v Marzocce, s posezením a jídlem s sebou. Otevírací dobu a rezervace ověř přímo v podniku.","hu":"Pizzéria Marzocca tengerparti sétányán, ülőhelyekkel és elviteli lehetőséggel. Nyitvatartásért és foglalásért keresd a helyet.","bg":"Пицария на крайбрежната алея в Марцока, с места за сядане и храна за вкъщи. Свържи се със заведението за работно време и резервации.","ja":"マルツォッカの海沿いにあるピッツェリア。店内でのお食事とテイクアウトに対応しています。営業時間と予約はお店にご確認ください。"},
   extraLinks:[
    {label:{"it":"Telefono · 071 698451","en":"Phone · 071 698451","de":"Telefon · 071 698451","fr":"Téléphone · 071 698451","es":"Teléfono · 071 698451","nl":"Telefoon · 071 698451","pl":"Telefon · 071 698451","ro":"Telefon · 071 698451","cs":"Telefon · 071 698451","hu":"Telefon · 071 698451","bg":"Телефон · 071 698451","ja":"電話 · 071 698451"},url:'tel:+39071698451'},
    {label:{"it":"Cellulare · 338 8645959","en":"Mobile · 338 8645959","de":"Mobil · 338 8645959","fr":"Portable · 338 8645959","es":"Móvil · 338 8645959","nl":"Mobiel · 338 8645959","pl":"Telefon komórkowy · 338 8645959","ro":"Mobil · 338 8645959","cs":"Mobil · 338 8645959","hu":"Mobil · 338 8645959","bg":"Мобилен · 338 8645959","ja":"携帯電話 · 338 8645959"},url:'tel:+393388645959'}
   ]
  });
  PLACE_PREVIEW.food.push({
   meters:275.7,coords:[13.286694,43.67822],mode:'walking',
   photo:'assets/restaurants/sloppy-joe.jpg',credit:'Tripadvisor · Sloppy Joe',
   sourceUrl:'https://www.tripadvisor.it/Restaurant_Review-g194914-d8547232-Reviews-Sloppy_Joe-Senigallia_Province_of_Ancona_Marche.html'
  });
 }


 // Official venue photograph: brighter replacement for La Bilancia, including its credit.
 const bilanciaIndex=AREA_PLACES.food.findIndex(place=>place.name==='La Bilancia');
 if(bilanciaIndex>=0)Object.assign(PLACE_PREVIEW.food[bilanciaIndex],{
  photo:'https://d3e7ilti5q92ri.cloudfront.net/16_a62f937b90.jpg?width=1200',
  credit:'Ristorante La Bilancia · sito ufficiale',sourceUrl:'https://www.ristorantelabilancia.com/'
 });

 render();
})();

'use strict';
// Semantic equivalents of the current Italian copy: solo, group.
const STAY_TRANSLATION_PARITY={
 en:[['The guide to your tailor-made holiday','The guide to your tailor-made holiday'],['In front of the B&B, you can enjoy a long stretch of public beach.','In front of the B&B, you can enjoy a long stretch of public beach.'],['On request, we will provide fresh towels at any time.','On request, we will provide fresh towels at any time.']],
 de:[['Der Reiseführer für deinen Urlaub nach Maß','Der Reiseführer für euren Urlaub nach Maß'],['Direkt vor dem B&B kannst du einen langen, frei zugänglichen Strandabschnitt genießen.','Direkt vor dem B&B könnt ihr einen langen, frei zugänglichen Strandabschnitt genießen.'],['Auf Wunsch stellen wir dir jederzeit frische Handtücher zur Verfügung.','Auf Wunsch stellen wir euch jederzeit frische Handtücher zur Verfügung.']],
 fr:[['Le guide de tes vacances sur mesure','Le guide de vos vacances sur mesure'],['Devant le B&B, tu peux profiter d’une longue plage en accès libre.','Devant le B&B, vous pouvez profiter d’une longue plage en accès libre.'],['Sur demande, nous te fournirons des serviettes propres à tout moment.','Sur demande, nous vous fournirons des serviettes propres à tout moment.']],
 es:[['La guía para tus vacaciones a medida','La guía para vuestras vacaciones a medida'],['Frente al B&B puedes disfrutar de un largo tramo de playa de acceso libre.','Frente al B&B podéis disfrutar de un largo tramo de playa de acceso libre.'],['Si lo solicitas, te proporcionaremos toallas limpias en cualquier momento.','Si lo solicitáis, os proporcionaremos toallas limpias en cualquier momento.']],
 nl:[['De gids voor jouw vakantie op maat','De gids voor jullie vakantie op maat'],['Voor de B&B kun je genieten van een lang stuk vrij toegankelijk strand.','Voor de B&B kunnen jullie genieten van een lang stuk vrij toegankelijk strand.'],['Op verzoek geven we je op elk moment schone handdoeken.','Op verzoek geven we jullie op elk moment schone handdoeken.']],
 pl:[['Przewodnik po wakacjach dopasowanych do Ciebie','Przewodnik po wakacjach dopasowanych do Was'],['Przed B&B możesz korzystać z długiego odcinka ogólnodostępnej plaży.','Przed B&B możecie korzystać z długiego odcinka ogólnodostępnej plaży.'],['Na życzenie zapewnimy Ci świeże ręczniki w dowolnym momencie.','Na życzenie zapewnimy Wam świeże ręczniki w dowolnym momencie.']],
 ro:[['Ghidul pentru vacanța ta pe măsură','Ghidul pentru vacanța voastră pe măsură'],['În fața B&B-ului te poți bucura de o porțiune lungă de plajă cu acces liber.','În fața B&B-ului vă puteți bucura de o porțiune lungă de plajă cu acces liber.'],['La cerere, îți vom oferi prosoape curate în orice moment.','La cerere, vă vom oferi prosoape curate în orice moment.']],
 cs:[['Průvodce tvou dovolenou na míru','Průvodce vaší dovolenou na míru'],['Před B&B si můžeš užít dlouhý úsek volně přístupné pláže.','Před B&B si můžete užít dlouhý úsek volně přístupné pláže.'],['Na požádání ti kdykoli poskytneme čisté ručníky.','Na požádání vám kdykoli poskytneme čisté ručníky.']],
 hu:[['Útmutató a személyre szabott nyaralásodhoz','Útmutató a személyre szabott nyaralásotokhoz'],['A B&B előtt hosszú, szabadon látogatható partszakaszt élvezhetsz.','A B&B előtt hosszú, szabadon látogatható partszakaszt élvezhettek.'],['Kérésre bármikor biztosítunk neked tiszta törölközőt.','Kérésre bármikor biztosítunk nektek tiszta törölközőt.']],
 bg:[['Пътеводител за твоята почивка по мярка','Пътеводител за вашата почивка по мярка'],['Пред B&B можеш да се насладиш на дълга ивица плаж със свободен достъп.','Пред B&B можете да се насладите на дълга ивица плаж със свободен достъп.'],['При поискване ще ти предоставим чисти кърпи по всяко време.','При поискване ще ви предоставим чисти кърпи по всяко време.']],
 ja:[['あなたの希望に合わせた休暇ガイド','皆さまの希望に合わせた休暇ガイド'],['B&Bの目の前には、自由に利用できる長い海岸が広がっています。','B&Bの目の前には、自由に利用できる長い海岸が広がっています。'],['ご希望に応じて、いつでも清潔なタオルをご用意します。','ご希望に応じて、いつでも清潔なタオルをご用意します。']]
};
for(const [lang,copy] of Object.entries(STAY_TRANSLATION_PARITY)){
 WOOD_HOLIDAY_SLOGAN[lang]=copy[0][0];
 BEACH_GUIDE_TEXT[lang].parts[0][1]=copy[1][0];
 CLEANING_TIME_COPY[lang][4]=copy[2][1];
 CLEANING_TIME_COPY[lang][5]=copy[2][0];
}
const LANGUAGE_GUEST_COPY={
 en:[],
 de:[['Dein Zimmer','Euer Zimmer'],['dir heute','euch heute'],['Bitte verlasse','Bitte verlasst'],['Mein Zimmer','Unser Zimmer'],['Deine Zimmerausstattung','Eure Zimmerausstattung'],['DEIN REISEBEGLEITER','EUER REISEBEGLEITER'],['Wir erwarten dich','Wir erwarten euch'],['Bediene dich am Buffet','Bedient euch am Buffet'],['Frag Cinzia','Fragt Cinzia'],['Gib die 6 Ziffern','Gebt die 6 Ziffern'],['dein Zimmer','euer Zimmer'],['deine Zimmer','eure Zimmer'],['deines Aufenthalts','eures Aufenthalts'],['Wenn du frische Handtücher brauchst','Wenn ihr frische Handtücher braucht']],
 fr:[['Ma chambre','Notre chambre'],['Les équipements de ta chambre','Les équipements de votre chambre'],['TON GUIDE','VOTRE GUIDE'],['Nous t’attendons','Nous vous attendons'],['Sers-toi au buffet','Servez-vous au buffet'],['Demande à Cinzia','Demandez à Cinzia'],['tes chambres','vos chambres'],['ta chambre','votre chambre'],['ton séjour','votre séjour'],['ton départ','votre départ'],['tes vacances','vos vacances'],['tu pourras','vous pourrez'],['Tu pourras','Vous pourrez']],
 es:[['deberás dejar','deberéis dejar'],['Mi habitación','Nuestra habitación'],['El equipamiento de tu habitación','El equipamiento de vuestra habitación'],['TU GUÍA','VUESTRA GUÍA'],['Te esperamos','Os esperamos'],['Sírvete del bufé','Servíos del bufé'],['Pregunta a Cinzia','Preguntad a Cinzia'],['tu habitación','vuestra habitación'],['tus habitaciones','vuestras habitaciones'],['tu estancia','vuestra estancia'],['Deberás dejar','Deberéis dejar'],['Podrás entrar','Podréis entrar']],
 nl:[['Je kunt vandaag','Jullie kunnen vandaag'],['je kunt','jullie kunnen'],['Mijn kamer','Onze kamer'],['De voorzieningen in je kamer','De voorzieningen in jullie kamer'],['JOUW GIDS','JULLIE GIDS'],['je kamer','jullie kamer'],['je kamers','jullie kamers'],['je verblijf','jullie verblijf'],['je vakantie','jullie vakantie']],
 pl:[['Możesz','Możecie'],['opuść pokój','opuśćcie pokój'],['Mój pokój','Nasz pokój'],['Wyposażenie Twojego pokoju','Wyposażenie Waszego pokoju'],['TWÓJ PRZEWODNIK','WASZ PRZEWODNIK'],['Twojego pobytu','Waszego pobytu'],['Twoich wakacji','Waszych wakacji']],
 ro:[['Camera mea','Camera noastră'],['GHIDUL TĂU','GHIDUL VOSTRU'],['Te așteptăm','Vă așteptăm'],['Alege ce îți place','Alegeți ce vă place'],['Vei putea intra','Veți putea intra'],['va trebui să eliberezi camera','va trebui să eliberați camera'],['sejurului tău','sejurului vostru']],
 cs:[['Můj pokoj','Náš pokoj'],['TVŮJ PRŮVODCE','VÁŠ PRŮVODCE'],['Těšíme se na tebe','Těšíme se na vás'],['Vyber si z bufetu','Vyberte si z bufetu'],['můžeš vstoupit','můžete vstoupit'],['pokoj prosím opusť','pokoj prosím opusťte']],
 hu:[['foglalhatod el','foglalhatjátok el'],['elhagynod','elhagynotok'],['A szobám','A szobánk'],['A TE ÚTMUTATÓD','A TI ÚTMUTATÓTOK'],['Válassz a büfé kínálatából','Válasszatok a büfé kínálatából'],['a nyaralásodhoz','a nyaralásotokhoz'],['a tartózkodásod','a tartózkodásotok']],
 bg:[['Моята стая','Нашата стая'],['ТВОЯТ ПЪТЕВОДИТЕЛ','ВАШИЯТ ПЪТЕВОДИТЕЛ'],['Очакваме те','Очакваме ви'],['Избери си от бюфета','Изберете си от бюфета'],['Можеш да влезеш','Можете да влезете'],['трябва да освободиш стаята','трябва да освободите стаята']],
 ja:[['私の部屋','私たちの部屋']]
};
for(const [lang,copy] of Object.entries(STAY_TRANSLATION_PARITY))LANGUAGE_GUEST_COPY[lang].push(...copy);
const languageCopyMatchers={};
function localizedOccupancyText(text,solo,lang){
 if(lang==='it')return italianOccupancyText(text,solo);
 const pairs=LANGUAGE_GUEST_COPY[lang]||[];
 if(!languageCopyMatchers[lang]){
  const lookup=new Map();for(const pair of pairs)for(const form of pair)lookup.set(form,pair);
  const keys=[...lookup.keys()].sort((a,b)=>b.length-a.length);
  languageCopyMatchers[lang]={lookup,pattern:keys.length?new RegExp(keys.map(italianCopyEscape).join('|'),'gu'):null};
 }
 const {lookup,pattern}=languageCopyMatchers[lang];
 return pattern?text.replace(pattern,match=>lookup.get(match)[solo?0:1]):text;
}

// Reviewed Italian copy pairs. Guest count and room count are independent.
const ITALIAN_OCCUPANCY_COPY = [
 ['Di fronte al B&B puoi godere di un lungo tratto di spiaggia libera.','Di fronte al B&B potete godere di un lungo tratto di spiaggia libera.'],
 ['La mia camera','La nostra camera'],
 ['Le dotazioni della tua camera','Le dotazioni della vostra camera'],
 ['LA TUA GUIDA','LA VOSTRA GUIDA'],
 ['La tua guida','La vostra guida'],
 ['la tua vacanza','la vostra vacanza'],
 ['alla tua vacanza','alla vostra vacanza'],
 ['Il tuo soggiorno','Il vostro soggiorno'],
 ['il tuo soggiorno','il vostro soggiorno'],
 ['del tuo soggiorno','del vostro soggiorno'],
 ['i tuoi gusti','i vostri gusti'],
 ['ai tuoi programmi','ai vostri programmi'],
 ['a casa tua','a casa vostra'],
 ['Ti aspettiamo','Vi aspettiamo'],
 ['Ti auguriamo','Vi auguriamo'],
 ['ti preghiamo','vi preghiamo'],
 ['Siamo felici di accoglierti','Siamo felici di accogliervi'],
 ['Saremo felici di accoglierti di nuovo, quando vorrai!','Saremo felici di accogliervi di nuovo, quando vorrete!'],
 ['Su richiesta, ti forniremo asciugamani puliti in qualsiasi momento.','Su richiesta, vi forniremo asciugamani puliti in qualsiasi momento.'],
 ['Se hai bisogno','Se avete bisogno'],
 ['Se hai un saldo','Se avete un saldo'],
 ['Se non riconosci il comando o vuoi una dimostrazione','Se non riconoscete il comando o volete una dimostrazione'],
 ['non esitare a chiederlo','non esitate a chiederlo'],
 ['Ci auguriamo che tu abbia trascorso un piacevole soggiorno!','Ci auguriamo che abbiate trascorso un piacevole soggiorno!'],
 ['speriamo di rivederti presto!','speriamo di rivedervi presto!'],
 ['Saremo felici di aiutarti.','Saremo felici di aiutarvi.'],
 ['Per organizzarti','Per organizzarvi'],
 ['ti metteranno in contatto','vi metteranno in contatto'],
 ['prima di recarti in sede','prima di recarvi in sede'],
 ['restando seduto sul WC','restando seduti sul WC'],
 ['Il tuo WC','Il vostro WC'],
 ['a cui collegarti','a cui collegarvi'],
 ['Ci trovi anche','Ci trovate anche'],
 ['prenota la visita','prenotate la visita'],
 ['Ti chiediamo','Vi chiediamo'],
 ['non entrare bagnato','non entrate bagnati'],
 ['Goditi il giardino','Godetevi il giardino'],
 ['Mantieni gli spazi','Mantenete gli spazi'],
 ['rispetta il riposo','rispettate il riposo'],
 ['Puoi partire','Potete partire'],
 ['Usa la mappa per orientarti','Usate la mappa per orientarvi'],
 ['Se hai dubbi','Se avete dubbi'],
 ['Mantieni un tono','Mantenete un tono'],
 ['Tieni basso','Tenete basso'],
 ['Asciugati prima','Asciugatevi prima'],
 ['Dovrai lasciare','Dovrete lasciare'],
 ['Potrai entrare','Potrete entrare'],
 ['Puoi parcheggiare','Potete parcheggiare'],
 ['puoi usare','potete usare'],
 ['Scegli dal buffet','Scegliete dal buffet'],
 ['Digita le 6 cifre','Digitate le 6 cifre'],
 ['Aprila con il codice','Apritela con il codice'],
 ['ritira il portachiavi','ritirate il portachiavi'],
 ['ritira i portachiavi','ritirate i portachiavi'],
 ['Apri gradualmente','Aprite gradualmente'],
 ['regola temperatura','regolate temperatura'],
 ['chiudi completamente','chiudete completamente'],
 ['Usa il getto','Usate il getto'],
 ['segui via','seguite via'],
 ['Gira a sinistra','Girate a sinistra'],
 ['gira a destra','girate a destra'],
 ['attraversa il sottopassaggio','attraversate il sottopassaggio'],
 ['lascia le chiavi','lasciate le chiavi'],
 ['scrivi a info@lungomare70.it','scrivete a info@lungomare70.it'],
 ['Chiedi a','Chiedete a'],
 ['chiedi a','chiedete a'],
 ['Chiedici','Chiedeteci'],
 ['chiedici','chiedeteci'],
 ['Contatta','Contattate'],
 ['contatta','contattate'],
 ['Controlla','Controllate'],
 ['controlla','controllate'],
 ['Consulta','Consultate'],
 ['consulta','consultate'],
 ['Verifica','Verificate'],
 ['verifica','verificate'],
 ['Passeggia nel borgo','Passeggiate nel borgo'],
 ['Visita l’Abbazia','Visitate l’Abbazia'],
 ['Apri la','Aprite la'],
 ['Apri il','Aprite il'],
 ['Apri un','Aprite un'],
 ['Apri le','Aprite le'],
 ['Chiama','Chiamate'],
 ['chiama','chiamate'],
 ['Chiamaci','Chiamateci'],
 ['Scrivici','Scriveteci']
];
const italianCopyEscape = value => value.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
const italianCopyLookup = new Map();
for(const pair of ITALIAN_OCCUPANCY_COPY)for(const form of pair)italianCopyLookup.set(form,pair);
const italianCopyPattern = new RegExp('(?<![\\p{L}])(?:'+[...italianCopyLookup.keys()].sort((a,b)=>b.length-a.length).map(italianCopyEscape).join('|')+')(?![\\p{L}])','gu');
function italianOccupancyText(text,solo){
 return text.replace(italianCopyPattern,match=>italianCopyLookup.get(match)[solo?0:1]);
}
function applyItalianOccupancy(root){
 if(!root||!guest||guest.invalid)return;
 const solo=guestKnownSolo(guest);
 const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);
 const nodes=[];while(walker.nextNode())nodes.push(walker.currentNode);
 for(const node of nodes){
  // Names, addresses, credits and photographs are source data, not guest instructions.
  if(node.parentElement?.closest('.guest-name,.place-name,.place-address,figcaption,script,style'))continue;
  if(node.textContent.trim()===guest.name)continue;
  const next=localizedOccupancyText(node.textContent,solo,document.documentElement.lang||'it');
  if(next!==node.textContent)node.textContent=next;
 }
 const amenities=root.querySelector?.('#room-amenities h3');
 if(amenities&&guest.rooms.length>1&&document.documentElement.lang==='it')amenities.textContent=solo?'Le dotazioni delle tue camere':'Le dotazioni delle vostre camere';
}
// Apply after each complete render, preserving emphasis, buttons and photographs.
// Direct refreshes are used by the date/cleaning timers as well as by openSection.
(() => {
 const previousOpen=openSection;
 openSection=function(index){previousOpen(index);applyItalianOccupancy(document.getElementById('detail'));};
 const previousHeader=renderPersonalHeader;
 renderPersonalHeader=function(lang){
  previousHeader(lang);
  for(const selector of ['.hero','#cards','#footer','#post-stay-message','.topbar'])applyItalianOccupancy(document.querySelector(selector));
 };
 const previousPersonal=renderPersonalSection;
 renderPersonalSection=function(index,lang){previousPersonal(index,lang);applyItalianOccupancy(document.getElementById('detail'));};
 const previousDeparture=renderDepartureSection;
 renderDepartureSection=function(lang){previousDeparture(lang);applyItalianOccupancy(document.getElementById('detail'));};
 const previousEvents=renderStayEventsSection;
 renderStayEventsSection=function(index,lang){previousEvents(index,lang);applyItalianOccupancy(document.getElementById('detail'));};
 render();
})();

// Arrival instructions remain prominent until 21:00 on the arrival day in Rome.
// All subsequent stay days use the compact wooden gate action within the photograph.
const WOOD_GATE_COPY={
 it:['Entrare e uscire','Digita le 6 cifre seguite da #.','In alternativa, per aprire il cancello basta avvicinare il mini-telecomando alla tastiera.','Per uscire, premi il pulsante quadrato sul lato interno della colonna della veranda.','Dopo aver ritirato le chiavi, richiudi la cassaforte.','Il codice del cancello è valido durante il soggiorno.'],
 en:['Entering and leaving','Enter the 6 digits followed by #.','Alternatively, hold the small gate remote close to the keypad to open the gate.','To exit, press the square button on the inner side of the veranda column.','Close the key safe after collecting the keys.','The gate code is valid during the stay.'],
 de:['Ein- und ausgehen','Die 6 Ziffern eingeben, gefolgt von #.','Alternativ lässt sich das Tor öffnen, indem die kleine Torfernbedienung nahe an das Tastenfeld gehalten wird.','Zum Verlassen den quadratischen Knopf an der Innenseite der Verandasäule drücken.','Den Schlüsselsafe nach der Schlüsselentnahme wieder schließen.','Der Torcode gilt während des Aufenthalts.'],
 fr:['Entrer et sortir','Saisir les 6 chiffres suivis de #.','Il est aussi possible d’ouvrir le portail en approchant la petite télécommande du clavier.','Pour sortir, appuyer sur le bouton carré situé sur la face intérieure de la colonne de la véranda.','Refermer le coffre à clés après avoir récupéré les clés.','Le code du portail est valable pendant le séjour.'],
 es:['Entrar y salir','Introducir las 6 cifras seguidas de #.','También se puede abrir el portón acercando el pequeño mando al teclado.','Para salir, pulsar el botón cuadrado situado en el lado interior de la columna de la veranda.','Cerrar la caja de llaves después de recoger las llaves.','El código del portón es válido durante la estancia.'],
 nl:['Binnenkomen en weggaan','Voer de 6 cijfers in, gevolgd door #.','De poort kan ook worden geopend door de kleine afstandsbediening dicht bij het toetsenpaneel te houden.','Druk om naar buiten te gaan op de vierkante knop aan de binnenzijde van de verandazuil.','Sluit het sleutelkluisje na het ophalen van de sleutels.','De poortcode is geldig tijdens het verblijf.'],
 pl:['Wejście i wyjście','Należy wpisać 6 cyfr, a następnie #.','Bramę można też otworzyć, zbliżając mały pilot do klawiatury.','Aby wyjść, należy nacisnąć kwadratowy przycisk po wewnętrznej stronie kolumny werandy.','Po odebraniu kluczy należy zamknąć sejf na klucze.','Kod do bramy jest ważny podczas pobytu.'],
 ro:['Intrare și ieșire','Introduceți cele 6 cifre urmate de #.','Poarta se poate deschide și apropiind mica telecomandă de tastatură.','Pentru a ieși, apăsați butonul pătrat de pe partea interioară a coloanei verandei.','Închideți seiful după ridicarea cheilor.','Codul porții este valabil pe durata sejurului.'],
 cs:['Vstup a odchod','Zadejte 6 číslic a poté #.','Bránu lze také otevřít přiložením malého dálkového ovladače ke klávesnici.','Při odchodu stiskněte čtvercové tlačítko na vnitřní straně sloupu verandy.','Po vyzvednutí klíčů schránku opět zavřete.','Kód brány platí po dobu pobytu.'],
 hu:['Be- és kijutás','A 6 számjegyet, majd a # jelet kell beírni.','A kapu a kis távirányító billentyűzethez közelítésével is kinyitható.','Kifelé menet a veranda oszlopának belső oldalán lévő négyzet alakú gombot kell megnyomni.','A kulcsok átvétele után a kulcsszéfet vissza kell zárni.','A kapukód a tartózkodás ideje alatt érvényes.'],
 bg:['Влизане и излизане','Въведете 6-те цифри, последвани от #.','Порталът може да се отвори и чрез доближаване на малкото дистанционно до клавиатурата.','За излизане натиснете квадратния бутон от вътрешната страна на колоната на верандата.','След вземане на ключовете затворете сейфа.','Кодът за портала е валиден по време на престоя.'],
 ja:['出入りの方法','6桁の数字に続けて # を入力してください。','小型リモコンをキーパッドに近づけても門を開けられます。','外に出るときは、ベランダの柱の内側にある四角いボタンを押してください。','鍵を取り出した後は、キーボックスを閉めてください。','門の暗証番号は滞在期間中有効です。']
};
function woodGateCompact(g=guest,now=new Date()){
 if(!g||g.invalid)return false;
 const phase=woodStayPhase(g,now);
 const today=new Intl.DateTimeFormat('sv-SE',{timeZone:'Europe/Rome'}).format(now);
 const hour=Number(new Intl.DateTimeFormat('en-GB',{timeZone:'Europe/Rome',hour:'2-digit',hourCycle:'h23'}).format(now));
 return (phase==='during'||phase==='departure')&&(today>g.arrival||(today===g.arrival&&hour>=21));
}
function woodGateText(lang){
 const copy=[...(WOOD_GATE_COPY[lang]||WOOD_GATE_COPY.it)];
 if(lang==='it'&&!guestKnownSolo(guest)){copy[3]='Per uscire, premete il pulsante quadrato sul lato interno della colonna della veranda.';copy[4]='Dopo aver ritirato le chiavi, richiudete la cassaforte.';}
 if(guestKnownSolo(guest)){
  if(lang==='ro'){copy[1]='Introdu cele 6 cifre urmate de #.';copy[3]='Pentru a ieși, apasă butonul pătrat de pe partea interioară a coloanei verandei.';copy[4]='Închide seiful după ridicarea cheilor.';}
  if(lang==='cs'){copy[1]='Zadej 6 číslic a poté #.';copy[3]='Při odchodu stiskni čtvercové tlačítko na vnitřní straně sloupu verandy.';copy[4]='Po vyzvednutí klíčů schránku opět zavři.';}
  if(lang==='bg'){copy[1]='Въведи 6-те цифри, последвани от #.';copy[3]='За излизане натисни квадратния бутон от вътрешната страна на колоната на верандата.';copy[4]='След вземане на ключовете затвори сейфа.';}
 }
 return copy.map(text=>localizedOccupancyText(text,guestKnownSolo(guest),lang));
}
function renderWoodGateAction(lang){
 const compact=woodGateCompact();
 const entry=document.querySelector('#cards>.entry-card');
 if(entry){if(compact&&entry.contains(document.activeElement))document.activeElement.blur();entry.hidden=compact;}
 let action=document.getElementById('wood-gate-shortcut');
 if(!compact){action?.remove();return;}
 if(!action){
  action=document.createElement('button');action.id='wood-gate-shortcut';action.className='gate-shortcut';action.type='button';action.setAttribute('aria-haspopup','dialog');
  action.innerHTML='<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="8" cy="8" r="5"/><path d="m11.5 11.5 9 9m-3-3 3-3m-6 0 3-3"/></svg><span></span>';
  action.addEventListener('click',()=>openSection(0));document.querySelector('.hero').append(action);
 }
 action.querySelector('span').textContent=woodGateText(lang)[0];
}
const WOOD_ENTRY_DETAILS={
 "it": [
  "La cassaforte delle chiavi si trova a destra della vetrata d’ingresso. Per aprirla, inserire il codice indicato e ruotare il meccanismo di 90°.",
  "Portachiavi da ritirare",
  "Ogni portachiavi contiene:",
  "Le camere si trovano al piano superiore.",
  "Chiamaci"
 ],
 "en": [
  "The key safe is to the right of the glass entrance door. To open it, enter the code shown and turn the mechanism 90°.",
  "Key rings to collect",
  "Each key ring contains:",
  "The rooms are upstairs.",
  "Call us"
 ],
 "de": [
  "Der Schlüsselsafe befindet sich rechts neben der verglasten Eingangstür. Zum Öffnen den angegebenen Code eingeben und den Mechanismus um 90° drehen.",
  "Abzuholende Schlüsselbunde",
  "Jeder Schlüsselbund enthält:",
  "Die Zimmer befinden sich im Obergeschoss.",
  "Anrufen"
 ],
 "fr": [
  "Le coffre à clés se trouve à droite de la porte vitrée d’entrée. Pour l’ouvrir, saisir le code indiqué et tourner le mécanisme de 90°.",
  "Trousseaux à récupérer",
  "Chaque trousseau contient :",
  "Les chambres se trouvent à l’étage.",
  "Nous appeler"
 ],
 "es": [
  "La caja de llaves está a la derecha de la puerta acristalada de entrada. Para abrirla, introducir el código indicado y girar el mecanismo 90°.",
  "Llaveros que se deben recoger",
  "Cada llavero contiene:",
  "Las habitaciones están en la planta superior.",
  "Llámanos"
 ],
 "nl": [
  "De sleutelkluis bevindt zich rechts van de glazen toegangsdeur. Voer de aangegeven code in en draai het mechanisme 90° om de kluis te openen.",
  "Op te halen sleutelbossen",
  "Elke sleutelbos bevat:",
  "De kamers bevinden zich op de bovenverdieping.",
  "Bel ons"
 ],
 "pl": [
  "Sejf na klucze znajduje się po prawej stronie przeszklonych drzwi wejściowych. Aby go otworzyć, należy wpisać podany kod i obrócić mechanizm o 90°.",
  "Komplety kluczy do odebrania",
  "Każdy komplet zawiera:",
  "Pokoje znajdują się na piętrze.",
  "Zadzwoń do nas"
 ],
 "ro": [
  "Seiful pentru chei se află în dreapta ușii de sticlă de la intrare. Pentru a-l deschide, se introduce codul indicat și se rotește mecanismul cu 90°.",
  "Brelocuri cu chei de ridicat",
  "Fiecare breloc conține:",
  "Camerele se află la etaj.",
  "Sunați-ne"
 ],
 "cs": [
  "Schránka na klíče se nachází vpravo od prosklených vstupních dveří. Pro otevření je třeba zadat uvedený kód a otočit mechanismem o 90°.",
  "Svazky klíčů k vyzvednutí",
  "Každý svazek obsahuje:",
  "Pokoje se nacházejí v patře.",
  "Zavolejte nám"
 ],
 "hu": [
  "A kulcsszéf az üveg bejárati ajtótól jobbra található. A kinyitáshoz a megadott kódot kell beírni, majd a mechanizmust 90°-kal elfordítani.",
  "Átveendő kulcscsomók",
  "Minden kulcscsomó tartalma:",
  "A szobák az emeleten találhatók.",
  "Hívjon minket"
 ],
 "bg": [
  "Сейфът за ключове се намира вдясно от стъклената входна врата. За отваряне трябва да се въведе посоченият код и механизмът да се завърти на 90°.",
  "Връзки ключове за вземане",
  "Всяка връзка съдържа:",
  "Стаите се намират на горния етаж.",
  "Обадете ни се"
 ],
 "ja": [
  "キーボックスはガラスの入口ドアの右側にあります。表示された暗証番号を入力し、開閉つまみを90°回すと開きます。",
  "お受け取りいただくキーホルダー",
  "各キーホルダーには次のものが付いています。",
  "客室は上の階にあります。",
  "電話する"
 ]
};
function renderWoodGateInstructions(lang){
 const detail=document.getElementById('detail');detail.classList.remove('gate-only');
 if(activeSection!==0||!guest||guest.invalid)return;
 const panel=document.getElementById('personal-access');if(!panel)return;
 const copy=woodGateText(lang);
 const boxes=panel.querySelectorAll('.access-step');const gate=boxes[0];const safe=boxes[1];
 if(!gate)return;
 panel.querySelectorAll('.access-photo-pending').forEach(node=>node.remove());
 const help=gate.querySelector('p:not(.access-code):not(.access-missing)');if(help)help.textContent=copy[1];
 for(const index of [5,2,3]){const p=document.createElement('p');p.className='gate-instruction';p.textContent=copy[index];gate.append(p);}
 if(woodGateCompact()){
  detail.classList.add('gate-only');safe?.remove();panel.querySelector('.entry-map-button')?.remove();
  const title=document.getElementById('detail-title');const label=title.querySelector('.section-title-label');
  if(label)label.textContent=copy[0];else title.textContent=copy[0];
 }else if(safe){
  const entryCopy=WOOD_ENTRY_DETAILS[lang]||WOOD_ENTRY_DETAILS.it;
  const intro=safe.querySelector('p:not(.access-code):not(.access-missing)');
  if(intro){
   intro.textContent=entryCopy[0];
   const identity=document.createElement('p');identity.className='entry-keyring-identity';
   const roomNames=guest.rooms.slice().sort((a,b)=>a-b).map(n=>n+' · '+ROOM_NAMES[n-1]);
   const names=new Intl.ListFormat(lang,{style:'long',type:'conjunction'}).format(roomNames);
   const strong=document.createElement('strong');strong.textContent=names;
   identity.append(entryCopy[1]+': ',strong);
   const contents=document.createElement('p');contents.textContent=entryCopy[2];
   intro.after(identity,contents);
  }
  const close=document.createElement('p');close.textContent=copy[4];safe.append(close);
  const upstairs=document.createElement('p');upstairs.className='entry-upstairs';upstairs.textContent=entryCopy[3];panel.append(upstairs);
 }
 const entryCopy=WOOD_ENTRY_DETAILS[lang]||WOOD_ENTRY_DETAILS.it;
 const call=document.createElement('a');call.className='entry-map-button entry-call-button';call.href='tel:+393357739549';
 let callLabel=entryCopy[4];
 if(guestKnownSolo(guest))callLabel=({ro:'Sună-ne',cs:'Zavolej nám',bg:'Обади ни се'})[lang]||callLabel;
 call.textContent=callLabel;panel.append(call);
}
(() => {
 const previousHeader=renderPersonalHeader;
 renderPersonalHeader=function(lang){previousHeader(lang);renderWoodGateAction(lang);};
 const previousOpen=openSection;
 openSection=function(index){previousOpen(index);renderWoodGateInstructions(document.documentElement.lang||'it');};
 render();
})();

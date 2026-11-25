'use strict';
// This copy changes only this variant's farewell; the original trial remains available.
(() => {
 const farewells={it:'Felici di averti qui',en:'So glad you’re here',de:'Schön, dass du da bist',fr:'Heureux de t’accueillir',es:'Qué alegría tenerte aquí',nl:'Fijn dat je er bent',pl:'Miło Cię gościć',ro:'Ne bucurăm că ești aici',cs:'Jsme rádi, že jsi tady',hu:'Örülünk, hogy itt vagy',bg:'Радваме се, че си тук',ja:'お迎えできてうれしいです'};
 for(const [lang,text] of Object.entries(farewells))if(GUIDE[lang])GUIDE[lang].footer=text+', Cinzia e Alberto';
 // Reuse each destination's existing, credited photograph in its collapsed row.
 function addVisitThumbnails(){
  if(activeSection!==9)return;
  for(const row of document.querySelectorAll('#area-content .place-disclosure')){
   const summary=row.querySelector('summary');
   const photo=row.querySelector('.place-photo img');
   if(!summary || !photo || summary.querySelector('.visit-thumbnail') || row.dataset.thumbnailFailed)continue;
   const thumbnail=document.createElement('img');thumbnail.className='visit-thumbnail';
   thumbnail.src=photo.src;thumbnail.alt='';thumbnail.setAttribute('aria-hidden','true');
   thumbnail.width=56;thumbnail.height=46;thumbnail.loading='lazy';thumbnail.decoding='async';thumbnail.referrerPolicy='no-referrer';
   thumbnail.addEventListener('error',()=>{row.dataset.thumbnailFailed='true';thumbnail.remove();row.classList.remove('visit-with-thumbnail');},{once:true});
   row.classList.add('visit-with-thumbnail');summary.prepend(thumbnail);
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
  {id:'gruffalo-senigallia-2027',start:'2027-01-06',end:'2027-01-06',time:'17:00',title:'Il Gruffalò',copy:'Fondazione Aida · Teatro Stabile del Veneto · Julia Donaldson e Axel Scheffler · Manuel Renga',venue:'Teatro La Fenice · Via Cesare Battisti, 30 · Senigallia',source:'https://www.amatmarche.net/il-gruffalo-2/',query:'Teatro La Fenice Senigallia'},
  {id:'incompatibili-ancona-2027',area:'Ancona',rank:1,start:'2027-01-08',end:'2027-01-08',time:'20:30',title:'Totalmente incompatibili · Nuzzo / Di Biase',copy:'Corrado Nuzzo · Maria Di Biase · AGIDI · CMC/Nidodiragno',venue:'Teatro delle Muse · Ancona',source:'https://www.marcheteatro.it/totalmente-incompatibili/',query:'Teatro delle Muse Ancona'},
  {id:'pivetti-fano-2027',area:'Fano',rank:1,start:'2027-01-07',end:'2027-01-10',time:'21:00',title:'L’inferiorità mentale della donna · Veronica Pivetti',copy:'Veronica Pivetti · Giovanna Gra · Gra & Mramor',venue:'Teatro della Fortuna · Fano',query:'Teatro della Fortuna Fano'},
  {id:'giochiamo-ancona-2027',area:'Ancona',rank:1,start:'2027-01-06',end:'2027-01-06',time:'18:00',title:'Giochiamo o non giochiamo · Lannutti & Corbo',copy:'Tout Le Cirque · Lannutti & Corbo · Recremisi',venue:'Teatro Panettone · Ancona',query:'Teatro Panettone Ancona'},
  {id:'mortorio-ancona-2027',area:'Ancona',rank:1,start:'2027-01-09',end:'2027-01-09',time:'21:00',title:'Mortorio · Romina Antonelli',copy:'Made in Marche · Romina Antonelli · Recremisi',venue:'Teatro Panettone · Ancona',query:'Teatro Panettone Ancona'},
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

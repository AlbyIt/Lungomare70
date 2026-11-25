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
 render();
})();

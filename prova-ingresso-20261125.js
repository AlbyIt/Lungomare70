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
 render();
})();

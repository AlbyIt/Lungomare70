'use strict';
// This copy changes only this variant's farewell; the original trial remains available.
(() => {
 const farewells={it:'Felici di averti qui',en:'So glad you’re here',de:'Schön, dass du da bist',fr:'Heureux de t’accueillir',es:'Qué alegría tenerte aquí',nl:'Fijn dat je er bent',pl:'Miło Cię gościć',ro:'Ne bucurăm că ești aici',cs:'Jsme rádi, že jsi tady',hu:'Örülünk, hogy itt vagy',bg:'Радваме се, че си тук',ja:'お迎えできてうれしいです'};
 for(const [lang,text] of Object.entries(farewells))if(GUIDE[lang])GUIDE[lang].footer=text+', Cinzia e Alberto';
 render();
})();

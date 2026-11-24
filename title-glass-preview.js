'use strict';
// Glass headings are approved by default; titoli=classici keeps a reversible fallback.
if(new URLSearchParams(location.search).get('titoli')!=='classici'){
 document.documentElement.classList.add('glass-titles-preview');
 const sheet=document.createElement('link');
 sheet.rel='stylesheet';sheet.href='title-glass-preview.css?v=20261124-glass40';
 document.head.append(sheet);
}

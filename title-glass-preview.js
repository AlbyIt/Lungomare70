'use strict';
// Optional trial: remove titoli=vetro from the URL to restore the approved headings.
if(new URLSearchParams(location.search).get('titoli')==='vetro'){
 document.documentElement.classList.add('glass-titles-preview');
 const sheet=document.createElement('link');
 sheet.rel='stylesheet';sheet.href='title-glass-preview.css?v=20261124-titles1';
 document.head.append(sheet);
}

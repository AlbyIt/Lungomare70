'use strict';
// An explicit link parameter enables this reversible typography preview.
if(new URLSearchParams(location.search).get('font')==='lora'){
 document.documentElement.classList.add('font-preview');
 const sheet=document.createElement('link');
 sheet.rel='stylesheet';sheet.href='font-preview.css?v=20261124-font1';
 document.head.append(sheet);
}

'use strict';
(() => {
 const fixture=document.body.dataset.homeFixture;
 const expected=document.body.dataset.homeFragment;
 const personalURL=new URL('index.html#'+expected,location.href).href;
 const manifestURL=new URL('manifest.webmanifest',location.href).href;
 const appID=new URL('index.html',location.href).href;
 const key='l70-home-proof-v1:'+fixture;
 let installEvent=null, invite, help, add, later, title, helpTitle, helpText, copy, close, input;
 let checking=0, platformChoice=null, save, devices, cards, fallback, fallbackTitle, fallbackText, status;
 const detectedPlatform=(()=>{const ua=navigator.userAgent||'';if(/iPhone|iPad|iPod/i.test(ua)||(/Mac/i.test(navigator.platform||'')&&navigator.maxTouchPoints>1))return 'ios';if(/Android/i.test(ua))return 'android';return null;})();
 const stepStrings=()=>HOME_STEPS[document.documentElement.lang]||HOME_STEPS.it;
 function icon(kind){const svg=document.createElementNS('http://www.w3.org/2000/svg','svg');svg.setAttribute('viewBox','0 0 32 32');svg.setAttribute('aria-hidden','true');svg.innerHTML=kind==='share'?'<path d="M10 11H6v17h20V11h-4M16 21V3m-6 6 6-6 6 6"/>':kind==='dots'?'<circle cx="7" cy="16" r="1.5"/><circle cx="16" cy="16" r="1.5"/><circle cx="25" cy="16" r="1.5"/>':kind==='home'?'<path d="m3 15 13-12 13 12M7 13v16h18V13M13 29V19h6v10"/>':'<path d="m7 17 6 6L26 8"/>';return svg;}
 function renderSteps(){const t=stepStrings();const platform=platformChoice||detectedPlatform;save.textContent=t[0];save.hidden=hideSave();helpTitle.textContent=t[1];helpText.textContent=platform?t[20]:t[19];devices.replaceChildren();for(const [value,name] of [['ios','iPhone / iPad'],['android','Android']]){const b=document.createElement('button');b.type='button';b.textContent=name;b.setAttribute('aria-pressed',String(platform===value));b.addEventListener('click',()=>{platformChoice=value;renderSteps();});devices.append(b);}cards.replaceChildren();fallback.hidden=!platform;if(!platform)return;const indices=platform==='ios'?[2,4,6]:[11,13,15];indices.forEach((n,i)=>{const li=document.createElement('li');const pict=document.createElement('span');pict.className='home-step-icon';pict.append(icon(i===0?(platform==='ios'?'share':'dots'):i===1?'home':'check'));const body=document.createElement('div');const h=document.createElement('strong');h.textContent=t[n];const p=document.createElement('p');p.textContent=t[n+1];body.append(h,p);li.append(pict,body);cards.append(li);});fallbackTitle.textContent=t[8];fallbackText.textContent=t[platform==='ios'?9:17];status.textContent='';}

 const mode=matchMedia('(display-mode: standalone)');
 const full=matchMedia('(display-mode: fullscreen)');
 const label=document.createElement('div');label.className='home-test-label';
 label.append(document.createElement('span'));document.body.prepend(label);
 const strings=()=>HOME_COPY[document.documentElement.lang]||HOME_COPY.it;
 function matching(){return location.hash.slice(1)===expected;}
 function standalone(){return mode.matches||full.matches||navigator.standalone===true;}
 function stored(){try{return localStorage.getItem(key);}catch{return 'unavailable';}}
 function remember(state){try{localStorage.setItem(key,state);return localStorage.getItem(key)===state;}catch{return false;}}
 function hide(){if(invite)invite.hidden=true;}
 function hideSave(){return !matching()||standalone()||stored()==='installed';}
 function suppress(state){remember(state);hide();if(save)save.hidden=hideSave();}
 function translate(){const t=strings();label.firstChild.textContent=t[6];if(!invite)return;title.textContent=t[0];add.textContent=t[1];later.textContent=t[2];copy.textContent=t[4];close.textContent=t[5];input.setAttribute('aria-label',t[4]);renderSteps();}
 function showHelp(){if(!matching())return;input.value=personalURL;translate();if(!help.open)help.showModal();}
 function build(){
  invite=document.createElement('section');invite.className='home-invite';invite.hidden=true;invite.setAttribute('aria-labelledby','home-invite-title');
  title=document.createElement('h2');title.id='home-invite-title';
  const actions=document.createElement('div');actions.className='home-actions';
  add=document.createElement('button');later=document.createElement('button');add.type=later.type='button';
  actions.append(add,later);invite.append(title,actions);document.body.append(invite);
  help=document.createElement('dialog');help.className='home-help';help.setAttribute('aria-labelledby','home-help-title');
  helpTitle=document.createElement('h2');helpTitle.id='home-help-title';helpText=document.createElement('p');
  input=document.createElement('input');input.readOnly=true;input.type='url';
  copy=document.createElement('button');close=document.createElement('button');copy.type=close.type='button';
  const helpActions=document.createElement('div');helpActions.className='home-actions';helpActions.append(copy,close);
  devices=document.createElement('div');devices.className='home-device-choice';
  cards=document.createElement('ol');cards.className='home-steps';
  fallback=document.createElement('details');fallback.className='home-fallback';
  fallbackTitle=document.createElement('summary');fallbackText=document.createElement('p');
  status=document.createElement('p');status.setAttribute('role','status');
  fallback.append(fallbackTitle,fallbackText,input,copy,status);
  helpActions.replaceChildren(close);
  const head=document.createElement('div');head.className='home-help-head';head.append(helpTitle,close);
  help.append(head,helpText,devices,cards,fallback);document.body.append(help);
  save=document.createElement('button');save.type='button';save.className='home-save';save.addEventListener('click',showHelp);label.append(save);
  later.addEventListener('click',()=>suppress('dismissed'));
  close.addEventListener('click',()=>help.close());
  copy.addEventListener('click',async()=>{try{await navigator.clipboard.writeText(personalURL);status.textContent=stepStrings()[(platformChoice||detectedPlatform)==='android'?18:10];}catch{status.textContent=strings()[7];input.focus();input.select();}});
  add.addEventListener('click',async()=>{
   if(!matching()){hide();return;}
   suppress('requested');
   const pending=installEvent;installEvent=null;
   if(pending){try{await pending.prompt();await pending.userChoice;}catch{showHelp();}}
   else showHelp();
  });translate();
 }
 async function evaluate(){
  const current=++checking;hide();if(save)save.hidden=hideSave();
  const manifest=document.getElementById('home-manifest');
  if(!matching()) {manifest?.removeAttribute('href');help?.close();return;}
  manifest?.setAttribute('href','manifest.webmanifest');
  if(standalone()){suppress('installed');return;}
  if(stored()==='installed')return;
  if(navigator.getInstalledRelatedApps){
   try{const apps=await navigator.getInstalledRelatedApps();if(current!==checking)return;
    if(apps.some(app=>app.platform==='webapp'&&(app.url===manifestURL||app.id===appID))){suppress('installed');return;}
   }catch{/* No universal installation detection: never interpret failure as success. */}
  }
  if(current!==checking||!matching()||standalone()||stored())return;
  // Record at first display, before any reload; storage denied means fail closed.
  if(remember('shown'))invite.hidden=false;
 }
 window.addEventListener('beforeinstallprompt',event=>{event.preventDefault();installEvent=event;});
 window.addEventListener('appinstalled',()=>{installEvent=null;suppress('installed');help?.close();});
 window.addEventListener('storage',event=>{if(event.key===key&&event.newValue){hide();if(save)save.hidden=hideSave();if(event.newValue==='installed')help?.close();}});
 window.addEventListener('hashchange',evaluate);
 window.addEventListener('pageshow',evaluate);
 document.addEventListener('visibilitychange',()=>{if(!document.hidden)evaluate();});
 mode.addEventListener('change',()=>{if(standalone())suppress('installed');});
 
 // These fixtures live three directories below the shared assets.
 // Existing room renderers create relative image paths at runtime.
 function repairRoomSigns(){
  for(const img of document.querySelectorAll('img[src^="assets/room-"]')){
   const path=img.getAttribute('src');
   if(/^assets\/room-[1-4]-sign\.png$/.test(path))img.setAttribute('src',new URL('../../../'+path,location.href).href);
  }
 }
 repairRoomSigns();
 new MutationObserver(repairRoomSigns).observe(document.body,{childList:true,subtree:true,attributes:true,attributeFilter:['src']});

 new MutationObserver(translate).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
 // Do not let the original brand link leave this isolated fixture or lose its fragment.
 const brand=document.querySelector('.brand');if(brand)brand.href=personalURL;
 build();if(document.readyState==='complete')evaluate();
})();

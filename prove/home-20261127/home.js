'use strict';
(() => {
 const fixture=document.body.dataset.homeFixture;
 const expected=document.body.dataset.homeFragment;
 const personalURL=new URL('index.html#'+expected,location.href).href;
 const manifestURL=new URL('manifest.webmanifest',location.href).href;
 const appID=new URL('index.html',location.href).href;
 const key='l70-home-proof-v1:'+fixture;
 let installEvent=null, invite, help, add, later, title, helpTitle, helpText, copy, close, input;
 let checking=0;
 const mode=matchMedia('(display-mode: standalone)');
 const full=matchMedia('(display-mode: fullscreen)');
 const label=document.createElement('div');label.className='home-test-label';
 document.body.prepend(label);
 const strings=()=>HOME_COPY[document.documentElement.lang]||HOME_COPY.it;
 function matching(){return location.hash.slice(1)===expected;}
 function standalone(){return mode.matches||full.matches||navigator.standalone===true;}
 function stored(){try{return localStorage.getItem(key);}catch{return 'unavailable';}}
 function remember(state){try{localStorage.setItem(key,state);return localStorage.getItem(key)===state;}catch{return false;}}
 function hide(){if(invite)invite.hidden=true;}
 function suppress(state){remember(state);hide();}
 function translate(){const t=strings();label.textContent=t[6];if(!invite)return;title.textContent=t[0];add.textContent=t[1];later.textContent=t[2];helpTitle.textContent=t[1];helpText.textContent=t[3];copy.textContent=t[4];close.textContent=t[5];input.setAttribute('aria-label',t[4]);}
 function showHelp(){if(!matching())return;input.value=personalURL;translate();help.showModal();}
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
  help.append(helpTitle,helpText,input,helpActions);document.body.append(help);
  later.addEventListener('click',()=>suppress('dismissed'));
  close.addEventListener('click',()=>help.close());
  copy.addEventListener('click',async()=>{try{await navigator.clipboard.writeText(personalURL);}catch{helpText.textContent=strings()[7];input.focus();input.select();}});
  add.addEventListener('click',async()=>{
   if(!matching()){hide();return;}
   suppress('requested');
   const pending=installEvent;installEvent=null;
   if(pending){try{await pending.prompt();await pending.userChoice;}catch{showHelp();}}
   else showHelp();
  });translate();
 }
 async function evaluate(){
  const current=++checking;hide();
  const manifest=document.getElementById('home-manifest');
  if(!matching()) {manifest?.removeAttribute('href');help?.close();return;}
  manifest?.setAttribute('href','manifest.webmanifest');
  if(standalone()){suppress('installed');return;}
  if(stored())return;
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
 window.addEventListener('storage',event=>{if(event.key===key&&event.newValue)hide();});
 window.addEventListener('hashchange',evaluate);
 window.addEventListener('pageshow',evaluate);
 document.addEventListener('visibilitychange',()=>{if(!document.hidden)evaluate();});
 mode.addEventListener('change',()=>{if(standalone())suppress('installed');});
 new MutationObserver(translate).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
 // Do not let the original brand link leave this isolated fixture or lose its fragment.
 const brand=document.querySelector('.brand');if(brand)brand.href=personalURL;
 build();if(document.readyState==='complete')evaluate();
})();

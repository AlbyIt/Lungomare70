'use strict';
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
class Element{
 constructor(tag){this.tag=tag;this.children=[];this.attrs={};this.handlers={};this.hidden=false;this.open=false;this.textContent='';this.dataset={};}
 append(...items){this.children.push(...items);} prepend(x){this.children.unshift(x);} get firstChild(){return this.children[0];}
 replaceChildren(...items){this.children=items;}setAttribute(k,v){this.attrs[k]=v;}removeAttribute(k){delete this.attrs[k];}
 addEventListener(k,v){this.handlers[k]=v;} showModal(){this.open=true;} close(){this.open=false;}focus(){}select(){}
 all(){return [this,...this.children.flatMap(x=>x.all())];}
}
const base=process.argv[2]||__dirname;
const main=fs.readFileSync(base+'/home.js','utf8'),copy=fs.readFileSync(base+'/home-copy.js','utf8');
function page(ua,options={}){
 const body=new Element('body'),html=new Element('html');html.lang='it';body.dataset={homeFixture:'alfa',homeFragment:'nome=Ospite%20Prova%20Alfa&camera=1&lingua=it&persone=2&prova=1'};
 const brand=new Element('a'),manifest=new Element('link'),storage=new Map(options.stored?[['l70-home-proof-v1:alfa','dismissed']]:[]);
 let observer;const winHandlers={};const nav={userAgent:ua,platform:options.platform||'',maxTouchPoints:options.touch||0,standalone:options.standalone||false,clipboard:{writeText:async text=>{nav.copied=text;}}};
 const location=new URL('https://albyit.github.io/Lungomare70/prove/home-20261127/alfa/index.html#'+body.dataset.homeFragment);
 const document={body,documentElement:html,readyState:'complete',createElement:t=>new Element(t),createElementNS:(ns,t)=>new Element(t),getElementById:()=>manifest,querySelector:()=>brand,addEventListener(){}};
 const ctx=vm.createContext({document,navigator:nav,location,URL,localStorage:{getItem:k=>storage.get(k)||null,setItem:(k,v)=>storage.set(k,v)},matchMedia:()=>({matches:false,addEventListener(){}}),window:{addEventListener:(n,f)=>winHandlers[n]=f},MutationObserver:class{constructor(f){observer=f;}observe(){}}});
 vm.runInContext(copy+'\n'+main,ctx);
 const find=cls=>body.all().find(x=>x.className===cls),help=find('home-help'),save=find('home-save'),cards=find('home-steps'),devices=find('home-device-choice');
 return {body,html,help,save,cards,devices,brand,location,nav,storage,winHandlers,translate:()=>observer(),find};
}
(async()=>{
 const ios=page('Mozilla/5.0 (iPhone; CPU iPhone OS 26_3 like Mac OS X)');ios.save.handlers.click();
 assert.equal(ios.help.open,true);assert.equal(ios.cards.children.length,3);
 assert.match(ios.cards.children[0].children[1].children[1].textContent,/Safari/);
 assert.doesNotMatch(ios.cards.children.map(x=>x.children[1].children[1].textContent).join(' '),/Chrome/);
 assert.equal(ios.find('home-fallback').open,false);
 assert.equal(new URL(ios.brand.href).hash,ios.location.hash);
 const copyButton=ios.find('home-fallback').children.find(x=>x.tag==='button');await copyButton.handlers.click();assert.equal(ios.nav.copied,ios.location.href);
 ios.find('home-help-head').children[1].handlers.click();ios.save.handlers.click();assert.equal(ios.help.open,true);
 const dismissed=page('iPhone',{stored:true});assert.equal(dismissed.find('home-invite').hidden,true);assert.equal(dismissed.save.hidden,false);dismissed.save.handlers.click();assert.equal(dismissed.help.open,true);
 const android=page('Mozilla/5.0 (Linux; Android 16)');android.save.handlers.click();assert.match(android.cards.children[0].children[1].children[0].textContent,/Chrome/);
 const unknown=page('desktop');unknown.save.handlers.click();assert.equal(unknown.cards.children.length,0);unknown.devices.children[0].handlers.click();assert.equal(unknown.cards.children.length,3);
 const ipad=page('Macintosh',{platform:'MacIntel',touch:5});ipad.save.handlers.click();assert.equal(ipad.cards.children.length,3);
 for(const lang of ['it','en','de','fr','es','nl','pl','ro','cs','hu','bg','ja']){ios.html.lang=lang;ios.translate();assert.equal(ios.cards.children.length,3);assert.ok(ios.save.textContent);for(const row of ios.cards.children)assert.ok(row.children[1].children[1].textContent);}
 const home=page('iPhone',{standalone:true});assert.equal(home.save.hidden,true);assert.equal(home.find('home-invite').hidden,true);
 ios.location.hash='nome=Different';await ios.winHandlers.hashchange();assert.equal(ios.save.hidden,true);assert.equal(ios.help.open,false);
 console.log('Passed: iPhone/Android/iPad/unknown selection, 12 languages, three visual steps, recoverable help after dismissal, collapsed fallback, exact personal link copy, Home suppression and mismatched-fragment lock.');
})();

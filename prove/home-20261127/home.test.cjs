const {readFileSync}=require('node:fs');
const vm=require('node:vm');
const assert=require('node:assert/strict');
const path=require('node:path');
const root=__dirname;
class Element {
 constructor(tag){this.tag=tag;this.children=[];this.attrs={};this.events={};this.hidden=false;this.open=false;this.textContent='';}
 append(...els){this.children.push(...els);} prepend(el){this.children.unshift(el);}
 setAttribute(k,v){this.attrs[k]=v;} removeAttribute(k){delete this.attrs[k];}
 addEventListener(k,f){this.events[k]=f;} showModal(){this.open=true;} close(){this.open=false;}focus(){}select(){}
}
async function boot({store=new Map(),fixture='alfa',mode=false,ios=false,deny=false,related,hash}={}){
 const html=readFileSync(path.join(root,fixture,'index.html'),'utf8');
 const expected=html.match(/data-home-fragment="([^"]+)"/)[1].replaceAll('&amp;','&');
 const body=new Element('body');body.dataset={homeFixture:fixture,homeFragment:expected};
 const manifest=new Element('link');const brand=new Element('a');const docEvents={},events={};
 const document={body,documentElement:{lang:'it'},readyState:'complete',hidden:false,createElement:t=>new Element(t),getElementById:id=>id==='home-manifest'?manifest:null,querySelector:s=>s==='.brand'?brand:null,addEventListener:(k,f)=>docEvents[k]=f};
 const navigator={standalone:ios,...(related?{getInstalledRelatedApps:related}:{})};
 const location={href:'https://example.test/prove/home-20261127/'+fixture+'/index.html#'+(hash??expected),hash:'#'+(hash??expected)};
 const context=vm.createContext({document,navigator,location,URL,matchMedia:()=>({matches:mode,addEventListener(){}}),localStorage:{getItem:k=>{if(deny)throw Error();return store.get(k)||null;},setItem:(k,v)=>{if(deny)throw Error();store.set(k,v);}},MutationObserver:class{constructor(f){this.f=f;}observe(){}},window:{addEventListener:(k,f)=>events[k]=f}});
 vm.runInContext(readFileSync(path.join(root,'home-copy.js'),'utf8')+'\n'+readFileSync(path.join(root,'home.js'),'utf8'),context);
 await new Promise(setImmediate);
 const invite=body.children.find(x=>x.className==='home-invite');const help=body.children.find(x=>x.tag==='dialog');
 return {store,invite,help,events,manifest,location,expected,navigator,brand,add:invite.children[1].children[0],later:invite.children[1].children[1],key:'l70-home-proof-v1:'+fixture,context};
}
(async()=>{
 let passed=0;const test=async(name,f)=>{await f();passed++;console.log('PASS '+name);};
 await test('prima apertura mostra due azioni e registra shown',async()=>{const b=await boot();assert.equal(b.invite.hidden,false);assert.equal(b.add.textContent,'Aggiungi la guida');assert.equal(b.later.textContent,'Non ora');assert.equal(b.store.get(b.key),'shown');});
 await test('pageshow iniziale mostra il banner con script defer',async()=>{const b=await boot();b.store.clear();b.invite.hidden=true;await b.events.pageshow();assert.equal(b.invite.hidden,false);});
 await test('Non ora impedisce riapertura nello stesso archivio',async()=>{const b=await boot();await b.later.events.click();assert.equal((await boot({store:b.store})).invite.hidden,true);assert.equal(b.store.get(b.key),'dismissed');});
 await test('ricarica dopo visualizzazione non ripropone invito',async()=>{const b=await boot();assert.equal((await boot({store:b.store})).invite.hidden,true);});
 await test('iPhone standalone sopprime invito anche con archivio vuoto',async()=>{const b=await boot({ios:true});assert.equal(b.invite.hidden,true);assert.equal(b.store.get(b.key),'installed');});
 await test('display-mode standalone sopprime invito',async()=>{assert.equal((await boot({mode:true})).invite.hidden,true);});
 await test('storage negato non causa inviti ripetuti o errori',async()=>{assert.equal((await boot({deny:true})).invite.hidden,true);});
 await test('Alfa non sopprime Beta',async()=>{const a=await boot();assert.equal((await boot({store:a.store,fixture:'beta'})).invite.hidden,false);});
 await test('manifest riconosciuto installato sopprime invito',async()=>{const b=await boot({related:async()=>[{platform:'webapp',url:'https://example.test/prove/home-20261127/alfa/manifest.webmanifest'}]});assert.equal(b.invite.hidden,true);});
 await test('altra app installata non sopprime invito',async()=>{assert.equal((await boot({related:async()=>[{platform:'webapp',url:'https://other.test/manifest'}]})).invite.hidden,false);});
 await test('errore API non equivale a installazione avvenuta',async()=>{const b=await boot({related:async()=>{throw Error();}});assert.equal(b.invite.hidden,false);assert.equal(b.store.get(b.key),'shown');});
 await test('aggiunta manuale conserva esattamente il link con frammento',async()=>{const b=await boot();await b.add.events.click();assert.equal(b.help.open,true);assert.equal(b.help.children[2].value,b.location.href);assert.equal(b.brand.href,b.location.href);assert.equal(b.store.get(b.key),'requested');});
 await test('annullamento prompt nativo non è marcato installed',async()=>{const b=await boot();let prompts=0;await b.events.beforeinstallprompt({preventDefault(){},prompt:async()=>{prompts++;},userChoice:Promise.resolve({outcome:'dismissed'})});await b.add.events.click();assert.equal(prompts,1);assert.equal(b.store.get(b.key),'requested');assert.equal((await boot({store:b.store})).invite.hidden,true);});
 await test('appinstalled nasconde banner e guida manuale',async()=>{const b=await boot();await b.add.events.click();b.events.appinstalled();assert.equal(b.invite.hidden,true);assert.equal(b.help.open,false);assert.equal(b.store.get(b.key),'installed');});
 await test('link diverso disabilita manifest e invito evitando ospite errato',async()=>{const b=await boot({hash:'nome=Altro&camera=3'});assert.equal(b.invite.hidden,true);assert.equal(b.manifest.attrs.href,undefined);});
 await test('cambio frammento mentre banner visibile chiude invito',async()=>{const b=await boot();b.location.hash='#nome=Altro&camera=3';await b.events.hashchange();assert.equal(b.invite.hidden,true);assert.equal(b.manifest.attrs.href,undefined);});
 await test('12 traduzioni complete, non vuote, corrispondono al selettore',async()=>{const b=await boot();const langs=vm.runInContext('Object.keys(HOME_COPY)',b.context).sort();const html=readFileSync(path.join(root,'alfa/index.html'),'utf8');const available=[...html.matchAll(/<option value="([^"]+)"/g)].map(x=>x[1]).sort();assert.deepEqual([...langs],available);assert.equal(vm.runInContext('Object.values(HOME_COPY).every(a=>a.length===8&&a.every(s=>typeof s==="string"&&s.length>0))',b.context),true);});
 await test('manifest Alfa e Beta distinti e start_url personali completi',async()=>{for(const f of ['alfa','beta']){const b=await boot({fixture:f});const m=JSON.parse(readFileSync(path.join(root,f,'manifest.webmanifest')));const start=new URL(m.start_url,b.location.href);assert.equal(start.href,b.location.href);assert.equal(new URL(m.scope,b.location.href).pathname,'/prove/home-20261127/'+f+'/');}});
 // Deliberately demonstrate the unsatisfied acceptance criterion, not a passing device test.
 const installed=await boot({ios:true});const otherApp=await boot();
 assert.equal(installed.invite.hidden,true);assert.equal(otherApp.invite.hidden,false);
 console.log('LIMIT REPRODUCED: un archivio separato non vede installazione o invito mostrato altrove. Requisito globale NON superato.');
 console.log(`${passed} controlli automatici superati; test fisici NON eseguiti.`);
})().catch(e=>{console.error(e);process.exitCode=1;});

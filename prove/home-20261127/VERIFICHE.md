# Prova Home — 27 novembre 2026

**Esito: prototipo separato disponibile, requisito complessivo NON superato. Non applicare alla guida definitiva.**

## Isolamento

Sono aggiunti soltanto file in `prove/home-20261127/`. Nessun file preesistente modificato, nessun service worker registrato, nessuna cache o invito aggiunti alla guida pubblicata. Le copie HTML usano gli stessi asset e script esistenti, in sola lettura. Le due guide sono dimostrazioni tecniche con ospiti fittizi, senza date, codici o prenotazioni reali; non sono guide complete da inviare a ospiti.

La prova non crea prenotazioni, avvisi, email o messaggi WhatsApp/Booking.

## Comportamento implementato

- Due scelte: «Aggiungi la guida» e «Non ora», nelle dodici lingue disponibili; aggiornamento al cambio lingua.
- Invito registrato alla prima visualizzazione, per la singola guida e per l'archivio del browser. «Non ora», ricarica e annullamento non ripropongono l'invito nello stesso archivio.
- In modalità standalone (incluso `navigator.standalone` iPhone), invito soppresso. `appinstalled` registra l'installazione soltanto quando ricevuto. «Aggiungi» da solo non certifica installazione avvenuta.
- API `getInstalledRelatedApps` usata se disponibile, verificando l'identità di questa specifica guida.
- In assenza del prompt nativo si aprono istruzioni manuali per iPhone/Android, con copia del collegamento completo da aprire in Safari/Chrome quando l'app interna non permette l'aggiunta. Nessuna identificazione infallibile del browser interno dal solo user agent.
- Manifest statici distinti per Alfa e Beta: `start_url` conserva il relativo frammento fittizio completo. Il collegamento del marchio resta nella prova personale.
- Un frammento diverso da quello della dimostrazione disabilita l'invito e il manifest: la prova non può installare per errore Alfa con dati di un'altra persona. Non è un generatore per prenotazioni reali.
- Con memoria del browser bloccata, nessun invito automatico, per evitare ripetizioni non controllabili.
- Richiede connessione; nessuna promessa di funzionamento offline.

## Verifiche realmente eseguite

`node prove/home-20261127/home.test.cjs`: **18 controlli automatici superati**. Sono simulazioni controllate della logica, NON installazioni iOS/Android.

Controllati: prima apertura, due scelte, evento pageshow, Non ora e ricarica, riconoscimento standalone iPhone/standard, memoria negata, indipendenza Alfa/Beta, rilevamento app corretta/altra app/errore API, conservazione integrale link, annullamento, appinstalled, cambio frammento, completezza delle risorse delle 12 lingue, corrispondenza manifest/link personali.

Browser reale disponibile: **Chrome desktop remoto**, anteprima locale. Osservati prima apertura di Alfa con due pulsanti, «Non ora» seguito da ricarica senza banner, Beta con invito indipendente, «Aggiungi» con istruzioni manuali e campo contenente il suo link completo, cambio lingua giapponese della dicitura di prova, riapertura senza nuovo banner. Non è stata eseguita un'installazione dal sistema operativo. La presenza di tutte le traduzioni è controllata; le etichette dei menu di sistema possono variare con versione e lingua del telefono.

## Limite accertato e condizione bloccante

La logica riproduce esplicitamente questo caso: installazione osservata in un archivio; apertura dello stesso link in un altro archivio senza stato condiviso; l'invito torna visibile. Il test segnala **LIMIT REPRODUCED**, non un risultato di compatibilità positivo.

Su iPhone l'app Home e il browser possono avere archivi separati. `display-mode` riconosce la finestra attuale, non l'installazione da qualunque browser. Un flag localStorage/cookie non basta per sincronizzare Safari, Home, WhatsApp e Booking. `appinstalled` e `beforeinstallprompt` non sono segnali universali su iOS o nei browser interni. L'API Android non garantisce il comportamento dei browser interni delle app.

Per una soppressione condivisa tra contesti che non si parlano occorre un identificatore presente nel link e uno stato condiviso sul server, oppure un cambiamento del requisito. Lo stato per link/soggiorno può sopprimere l'invito anche sui telefoni degli accompagnatori; non dimostra che l'installazione esista su quello specifico telefono. Un marcatore registrato dall'apertura dell'icona certifica quell'apertura, non il completamento dell'installazione prima del primo avvio. Nessuna di queste scelte è stata applicata implicitamente.

Fonti primarie consultate:
- https://developer.apple.com/videos/play/wwdc2023/10120/ — ambienti delle app web e disponibilità dell'aggiunta dai browser interni compatibili.
- https://webkit.org/blog/ — documentazione WebKit su archiviazione delle app Home; fare riferimento alle versioni effettivamente provate.
- https://developer.chrome.com/docs/capabilities/get-installed-related-apps — requisiti e piattaforme supportate per riconoscere app correlate installate.

## Prove su telefoni reali — tutte DA ESEGUIRE

| Dispositivo | Percorso | Stato |
| --- | --- | --- |
| iPhone | Safari: aggiunta, chiusura, apertura da icona | Non eseguito |
| iPhone | Link WhatsApp prima e dopo installazione | Non eseguito |
| iPhone | Link email prima e dopo installazione | Non eseguito |
| iPhone | Chat ospite Booking, messaggio inviato tramite Pulse | Non eseguito |
| iPhone | Browser interno effettivo, passaggio a Safari, stesso link | Non eseguito |
| Android | Chrome: aggiunta, chiusura, apertura da icona | Non eseguito |
| Android | Link WhatsApp prima e dopo installazione | Non eseguito |
| Android | Link email prima e dopo installazione | Non eseguito |
| Android | Chat ospite Booking, messaggio inviato tramite Pulse | Non eseguito |
| Android | Browser interno effettivo, passaggio a Chrome, stesso link | Non eseguito |

Per ogni riga registrare modello, versione iOS/Android, browser e versione, app e versione, canale di provenienza, azione, invito presente/assente, nome e camera aperti, URL dell'icona e risultato. L'app Pulse del gestore non equivale all'app Booking dell'ospite: verificare il percorso effettivo lato ospite. Nessun invio a ospiti reali autorizzato o effettuato.

Sequenza per ogni canale: 1) prima apertura Alfa; 2) aggiunta manuale o nativa; 3) chiusura e primo avvio dall'icona; 4) verifica Alfa/camera 1; 5) riapertura dello stesso link da ciascun canale, verificando assenza dell'invito; 6) chiusura completa e ripetizione; 7) prova indipendente Beta/camera 2; 8) «Non ora» in un contesto pulito; 9) annullamento dell'aggiunta in un contesto pulito; 10) due icone distinte senza sostituzione della prima. Pulire soltanto i dati di prova quando necessario, mai quelli della guida reale.

**Accettazione finale:** tutte le righe eseguite con esito positivo, nessuna perdita di personalizzazione, nessuna ricomparsa nei percorsi richiesti, quindi decisione esplicita di Alberto prima di modificare la guida definitiva.

## Aggiornamento — istruzioni visive del 27 novembre 2026

La prova di apertura della condivisione da `share-test.html` è stata effettuata da Alberto sul suo iPhone: il pannello si apre, ma «Aggiungi alla schermata Home» non compare nemmeno in «Modifica azioni». Questo percorso non risolve l'aggiunta dell'icona nel contesto provato. Non estendere il risultato a ogni browser o dispositivo.

Nelle sole copie Alfa/Beta:
- Aiuto in tre passaggi con simboli, contenuti distinti per iPhone/iPad e Android.
- Riconoscimento indicativo del sistema con scelta manuale sempre correggibile; non certifica il modello, la versione, il browser o l'app di provenienza.
- Aiuto sempre recuperabile tramite «Salva la guida sul telefono», anche dopo il primo invito o «Non ora», salvo modalità Home o frammento non corrispondente.
- Istruzioni per uscire dal browser interno sotto «Non trovo questi tasti», senza presumere che ogni app abbia lo stesso menu.
- Link personale e copia disponibili soltanto in quell'approfondimento; conferma di copia e selezione manuale se la copia non riesce. Nessuna copia implica installazione.
- Tutte le dodici lingue; stessa struttura e significato delle istruzioni.
- Nessun cambiamento alla logica di soppressione dell'invito: restano i limiti tra archivi separati già descritti. Nessun nuovo stato server e nessuna garanzia di riconoscimento universale.
- La guida definitiva e le sue risorse esistenti non sono modificate.

`node prove/home-20261127/home-steps.test.cjs`: verifica simulata di selezione iPhone/Android/iPad/sistema ignoto, dodici lingue, tre passi, aiuto recuperabile dopo il rifiuto, approfondimento inizialmente chiuso, copia integrale del link personale, soppressione in Home e blocco per frammento estraneo. Non sostituisce le prove reali del flusso aggiornato, ancora da eseguire su iPhone e Android.

## Risultati riferiti da Alberto e correzione successiva

Prova reale sul suo iPhone, 27 novembre 2026:
- Link della prova Alfa inviato da Alberto su WhatsApp: apertura riferita in Safari, passaggio tramite tre puntini → Condividi → Aggiungi alla schermata Home disponibile.
- Icona aggiunta con «Apri come app web»; apertura dall'icona conserva Ospite Prova Alfa e camera 1 Stella. Il tasto Salva non compare in questa apertura.
- Riapertura dello stesso link da WhatsApp: finestra automatica non comparsa né alla prima apertura di questo percorso né alla successiva; resta visibile il tasto Salva. Non registrare questo come riconoscimento positivo dell'installazione.
- Alberto richiede che dopo l'installazione spariscano sia finestra sia tasto, anche riaprendo il link. Decisione su finestra automatica iniziale o solo pulsante rinviata. Restano da verificare altri telefoni, email e app Booking lato ospite.
- Targhette camera non caricate sia nel menu sia nella scheda. Causa verificata: il renderer condiviso usa `assets/room-N-sign.png` relativo alla pagina, mentre le copie si trovano tre livelli sotto la radice. Le quattro immagini esistono in `assets/`. La correzione è limitata alle copie tramite normalizzazione dei soli quattro percorsi delle targhette, anche dopo rigenerazione della scheda.

Correzione della visibilità: il tasto ora rispetta lo stato locale `installed` (anche al cambio lingua, agli eventi appinstalled/storage e al rientro). «shown», «requested» e «dismissed» non sono equiparati a installazione. L'API di app correlate, se disponibile, viene controllata anche dopo che l'invito è già stato mostrato. Questa correzione NON sincronizza archivi separati iOS: il requisito complessivo resta NON superato.

La documentazione WebKit conferma che, dopo la creazione dell'app Home, gli ulteriori dati non sono condivisi con il browser: https://webkit.org/blog/14787/webkit-features-in-safari-17-2/ . Non dichiarare risolto il ritorno da WhatsApp solo grazie a uno stato salvato nell'app Home. Un eventuale stato condiviso sul server richiede un progetto separato: uno stato per link può sopprimere il tasto anche sui telefoni degli accompagnatori e non dimostra l'installazione su ciascun telefono. Non è stato introdotto.

Test simulati estesi: stato installato nasconde tasto, appinstalled, evento storage, cambio lingua, conservazione dell'aiuto dopo rifiuto, percorso delle targhette corretto. Il test di due memorie separate riproduce esplicitamente il limite, senza presentarlo come successo.

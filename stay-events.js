'use strict';
// Curated public events. Never store guest data or access codes here.
const STAY_EVENTS_VERIFIED = '2026-11-24';
const STAY_EVENTS_UI = {
 it:['Eventi del tuo soggiorno','Eventi durante il tuo soggiorno','Una selezione di appuntamenti a Senigallia e nei dintorni, nelle date della tua vacanza.','Il tuo soggiorno','Programma ufficiale','Come arrivare','Altri eventi a Senigallia','Non abbiamo ancora selezionato eventi confermati per queste date. Consulta il calendario ufficiale o chiedi a Cinzia e Alberto.','Per scegliere gli eventi servono le date di arrivo e partenza nel link personale.','Selezione verificata il','Controlla il programma ufficiale prima di partire: orari, biglietti e disponibilità possono cambiare.','Appuntamenti e orari nel programma ufficiale.','Biglietto richiesto; disponibilità nel programma ufficiale.','Centro storico e altre sedi · Senigallia','Luci, mercatini e iniziative natalizie in città.','Teatro da Agatha Christie con Claudio “Greg” Gregori. Spettacolo in italiano.','Concerto con I Virtuosi Italiani per i trent’anni del teatro.','Posto unico numerato: 10 €.'],
 en:['Events during your stay','Events during your stay','Selected events in Senigallia and nearby during your holiday.','Your stay','Official programme','Directions','More events in Senigallia','We have not yet selected confirmed events for these dates. Check the official calendar or ask Cinzia and Alberto.','Arrival and departure dates are needed in your personal link to select events.','Selection checked on','Check the official programme before leaving: times, tickets and availability may change.','See the official programme for individual dates and times.','Ticket required; check availability in the official programme.','Historic centre and other venues · Senigallia','Christmas lights, markets and activities around town.','Agatha Christie on stage with Claudio “Greg” Gregori. Performed in Italian.','I Virtuosi Italiani celebrate the theatre’s thirtieth anniversary.','Numbered seat: €10.'],
 de:['Veranstaltungen im Urlaub','Veranstaltungen während deines Aufenthalts','Ausgewählte Veranstaltungen in Senigallia und Umgebung während deines Urlaubs.','Dein Aufenthalt','Offizielles Programm','Anfahrt','Weitere Veranstaltungen in Senigallia','Für diese Daten haben wir noch keine bestätigten Veranstaltungen ausgewählt. Schau im offiziellen Kalender nach oder frage Cinzia und Alberto.','Für die Auswahl werden Anreise- und Abreisedatum im persönlichen Link benötigt.','Auswahl geprüft am','Prüfe vor der Abfahrt das offizielle Programm: Zeiten, Tickets und Verfügbarkeit können sich ändern.','Einzelne Termine und Uhrzeiten stehen im offiziellen Programm.','Eintrittskarte erforderlich; Verfügbarkeit im offiziellen Programm prüfen.','Altstadt und weitere Veranstaltungsorte · Senigallia','Weihnachtsbeleuchtung, Märkte und Aktionen in der Stadt.','Agatha Christie mit Claudio „Greg“ Gregori. Aufführung auf Italienisch.','I Virtuosi Italiani feiern dreißig Jahre seit der Wiedereröffnung des Theaters.','Nummerierter Sitzplatz: 10 €.'],
 fr:['Événements du séjour','Événements pendant ton séjour','Une sélection de rendez-vous à Senigallia et dans les environs pendant tes vacances.','Ton séjour','Programme officiel','Itinéraire','Autres événements à Senigallia','Nous n’avons pas encore sélectionné d’événements confirmés pour ces dates. Consulte le calendrier officiel ou demande à Cinzia et Alberto.','Les dates d’arrivée et de départ sont nécessaires dans le lien personnel pour sélectionner les événements.','Sélection vérifiée le','Consulte le programme officiel avant de partir : horaires, billets et disponibilités peuvent changer.','Dates et horaires des rendez-vous dans le programme officiel.','Billet nécessaire ; disponibilités dans le programme officiel.','Centre historique et autres lieux · Senigallia','Illuminations, marchés et animations de Noël en ville.','Agatha Christie avec Claudio « Greg » Gregori. Spectacle en italien.','I Virtuosi Italiani célèbrent les trente ans de la réouverture du théâtre.','Place numérotée : 10 €.'],
 es:['Eventos de tu estancia','Eventos durante tu estancia','Una selección de eventos en Senigallia y sus alrededores durante tus vacaciones.','Tu estancia','Programa oficial','Cómo llegar','Más eventos en Senigallia','Todavía no hemos seleccionado eventos confirmados para estas fechas. Consulta el calendario oficial o pregunta a Cinzia y Alberto.','Se necesitan las fechas de llegada y salida en el enlace personal para seleccionar eventos.','Selección verificada el','Consulta el programa oficial antes de salir: horarios, entradas y disponibilidad pueden cambiar.','Fechas y horarios de cada actividad en el programa oficial.','Entrada necesaria; consulta la disponibilidad en el programa oficial.','Centro histórico y otros lugares · Senigallia','Luces, mercados y actividades navideñas por la ciudad.','Agatha Christie con Claudio «Greg» Gregori. Espectáculo en italiano.','I Virtuosi Italiani celebran los treinta años de la reapertura del teatro.','Asiento numerado: 10 €.'],
 nl:['Evenementen tijdens je verblijf','Evenementen tijdens je verblijf','Geselecteerde evenementen in Senigallia en omgeving tijdens je vakantie.','Je verblijf','Officieel programma','Route','Meer evenementen in Senigallia','We hebben nog geen bevestigde evenementen voor deze data geselecteerd. Bekijk de officiële agenda of vraag het Cinzia en Alberto.','Aankomst- en vertrekdatum in je persoonlijke link zijn nodig om evenementen te selecteren.','Selectie gecontroleerd op','Bekijk voor vertrek het officiële programma: tijden, tickets en beschikbaarheid kunnen veranderen.','Afzonderlijke data en tijden staan in het officiële programma.','Ticket nodig; bekijk de beschikbaarheid in het officiële programma.','Historisch centrum en andere locaties · Senigallia','Kerstverlichting, markten en activiteiten in de stad.','Agatha Christie met Claudio “Greg” Gregori. Voorstelling in het Italiaans.','I Virtuosi Italiani vieren dertig jaar sinds de heropening van het theater.','Genummerde zitplaats: € 10.'],
 pl:['Wydarzenia podczas pobytu','Wydarzenia podczas Twojego pobytu','Wybrane wydarzenia w Senigallii i okolicy w terminie Twoich wakacji.','Twój pobyt','Oficjalny program','Jak dojechać','Więcej wydarzeń w Senigallii','Nie wybraliśmy jeszcze potwierdzonych wydarzeń na te daty. Sprawdź oficjalny kalendarz lub zapytaj Cinzię i Alberta.','Do wyboru wydarzeń potrzebne są daty przyjazdu i wyjazdu w osobistym linku.','Wybór sprawdzony','Przed wyjściem sprawdź oficjalny program: godziny, bilety i dostępność mogą się zmienić.','Daty i godziny poszczególnych atrakcji w oficjalnym programie.','Wymagany bilet; dostępność w oficjalnym programie.','Stare miasto i inne miejsca · Senigallia','Świąteczne iluminacje, jarmarki i atrakcje w mieście.','Agatha Christie z Claudio „Gregiem” Gregorim. Spektakl po włosku.','I Virtuosi Italiani świętują trzydziestolecie ponownego otwarcia teatru.','Miejsce numerowane: 10 €.'],
 ro:['Evenimente în timpul șederii','Evenimente în timpul șederii tale','O selecție de evenimente din Senigallia și împrejurimi în perioada vacanței tale.','Șederea ta','Program oficial','Cum ajungi','Alte evenimente în Senigallia','Nu am selectat încă evenimente confirmate pentru aceste date. Consultă calendarul oficial sau întreabă-i pe Cinzia și Alberto.','Pentru selectarea evenimentelor sunt necesare datele de sosire și plecare în linkul personal.','Selecție verificată la','Verifică programul oficial înainte de plecare: orele, biletele și disponibilitatea se pot schimba.','Datele și orele fiecărei activități sunt în programul oficial.','Bilet necesar; verifică disponibilitatea în programul oficial.','Centrul istoric și alte locații · Senigallia','Lumini, târguri și activități de Crăciun în oraș.','Agatha Christie cu Claudio „Greg” Gregori. Spectacol în italiană.','I Virtuosi Italiani sărbătoresc treizeci de ani de la redeschiderea teatrului.','Loc numerotat: 10 €.'],
 cs:['Akce během pobytu','Akce během tvého pobytu','Výběr akcí v Senigallii a okolí během tvé dovolené.','Tvůj pobyt','Oficiální program','Jak se tam dostat','Další akce v Senigallii','Pro tento termín jsme zatím nevybrali potvrzené akce. Podívej se do oficiálního kalendáře nebo se zeptej Cinzie a Alberta.','Pro výběr akcí jsou v osobním odkazu potřeba data příjezdu a odjezdu.','Výběr ověřen dne','Před odchodem zkontroluj oficiální program: časy, vstupenky a dostupnost se mohou změnit.','Termíny a časy jednotlivých akcí jsou v oficiálním programu.','Vstupenka nutná; dostupnost ověř v oficiálním programu.','Historické centrum a další místa · Senigallia','Vánoční osvětlení, trhy a akce ve městě.','Agatha Christie s Claudiem „Gregem“ Gregorim. Představení v italštině.','I Virtuosi Italiani slaví třicet let od znovuotevření divadla.','Číslované místo: 10 €.'],
 hu:['Programok itt-tartózkodáskor','Programok az itt-tartózkodásod alatt','Válogatott programok Senigalliában és környékén a nyaralásod idején.','Az itt-tartózkodásod','Hivatalos program','Útvonal','További programok Senigalliában','Ezekre a napokra még nem válogattunk megerősített programokat. Nézd meg a hivatalos eseménynaptárt, vagy kérdezd Cinziát és Albertót.','A programok kiválasztásához az érkezés és távozás dátuma szükséges a személyes hivatkozásban.','A válogatás ellenőrzésének dátuma','Indulás előtt ellenőrizd a hivatalos programot: az időpontok, jegyek és elérhetőség változhatnak.','Az egyes események dátuma és időpontja a hivatalos programban található.','Jegy szükséges; az elérhetőséget a hivatalos programban ellenőrizd.','Történelmi belváros és más helyszínek · Senigallia','Karácsonyi fények, vásárok és városi programok.','Agatha Christie Claudio „Greg” Gregorival. Olasz nyelvű előadás.','Az I Virtuosi Italiani a színház újranyitásának harmincadik évfordulóját ünnepli.','Számozott ülőhely: 10 €.'],
 bg:['Събития по време на престоя','Събития по време на твоя престой','Подбрани събития в Сенигалия и околностите през твоята почивка.','Твоят престой','Официална програма','Как да стигнеш','Още събития в Сенигалия','Все още не сме подбрали потвърдени събития за тези дати. Провери официалния календар или попитай Чинция и Алберто.','За избора на събития са необходими датите на пристигане и заминаване в личния линк.','Подборът е проверен на','Преди да тръгнеш, провери официалната програма: часовете, билетите и наличността може да се променят.','Датите и часовете на отделните събития са в официалната програма.','Необходим е билет; провери наличността в официалната програма.','Исторически център и други места · Сенигалия','Коледни светлини, базари и инициативи в града.','Агата Кристи с Клаудио „Грег“ Грегори. Спектакъл на италиански.','I Virtuosi Italiani отбелязват тридесет години от повторното отваряне на театъра.','Номерирано място: 10 €.'],
 ja:['滞在中のイベント','滞在中のイベント','ご滞在の日程に合わせたセニガッリアと近郊のイベントをご紹介します。','ご滞在期間','公式プログラム','アクセス','セニガッリアのその他のイベント','この日程の開催が確認されたイベントは、まだ掲載していません。公式カレンダーをご覧になるか、チンツィアとアルベルトにお尋ねください。','イベントの表示には、個人用リンクに到着日と出発日が必要です。','掲載情報の確認日','お出かけ前に公式プログラムをご確認ください。時間、チケット、空席状況は変更される場合があります。','各催しの開催日と時間は公式プログラムをご確認ください。','チケットが必要です。販売状況は公式プログラムをご確認ください。','旧市街ほか · セニガッリア','街を彩るクリスマスのイルミネーション、マーケット、催し。','クラウディオ・「グレッグ」・グレゴーリ出演のアガサ・クリスティ作品。イタリア語上演。','劇場再開30周年を祝うイ・ヴィルトゥオージ・イタリアーニの演奏会。','全席指定：10ユーロ。']
};
// Approved short section titles, shared by menu buttons and dialog headings.
const VISIT_EVENTS_TITLES = {
 "it": [
  "Da visitare",
  "Eventi e spettacoli"
 ],
 "en": [
  "Places to visit",
  "Events and shows"
 ],
 "de": [
  "Sehenswürdigkeiten",
  "Events und Shows"
 ],
 "fr": [
  "À visiter",
  "Événements et spectacles"
 ],
 "es": [
  "Qué visitar",
  "Eventos y espectáculos"
 ],
 "nl": [
  "Bezienswaardigheden",
  "Evenementen en shows"
 ],
 "pl": [
  "Co zwiedzić",
  "Wydarzenia i spektakle"
 ],
 "ro": [
  "Locuri de vizitat",
  "Evenimente și spectacole"
 ],
 "cs": [
  "Kam na výlet",
  "Akce a představení"
 ],
 "hu": [
  "Látnivalók",
  "Események és előadások"
 ],
 "bg": [
  "Места за посещение",
  "Събития и спектакли"
 ],
 "ja": [
  "訪れたい場所",
  "イベント・公演"
 ]
};
for(const [lang,[visit,events]] of Object.entries(VISIT_EVENTS_TITLES)){
 AREA_UI[lang].visit=visit;
 GUIDE[lang].labels[9]=visit;
 STAY_EVENTS_UI[lang][0]=events;
 STAY_EVENTS_UI[lang][1]=events;
}
const STAY_EVENTS_NEARBY_TEXT = {
 "it": [
  "Luci e allestimenti natalizi nel centro di Ancona.",
  "Mercatini, luci e pista di pattinaggio nel centro di Fano.",
  "Mercatini natalizi e allestimenti nel borgo di Corinaldo.",
  "Mercatini al chiostro e presepi nel borgo di Mondolfo.",
  "Il borgo di Candelara si illumina con le candele: mercatini e atmosfera natalizia."
 ],
 "en": [
  "Christmas lights and displays in central Ancona.",
  "Christmas markets, lights and ice skating in central Fano.",
  "Christmas markets and decorations in the historic village of Corinaldo.",
  "Markets in the cloister and nativity displays in Mondolfo.",
  "Candelara lights up with candles, Christmas markets and a festive atmosphere."
 ],
 "de": [
  "Weihnachtsbeleuchtung und Installationen im Zentrum von Ancona.",
  "Weihnachtsmärkte, Lichter und Eisbahn im Zentrum von Fano.",
  "Weihnachtsmärkte und Dekorationen im historischen Corinaldo.",
  "Märkte im Kreuzgang und Krippen in Mondolfo.",
  "Kerzenlicht, Weihnachtsmärkte und festliche Stimmung im Dorf Candelara."
 ],
 "fr": [
  "Illuminations et installations de Noël dans le centre d’Ancône.",
  "Marchés de Noël, illuminations et patinoire dans le centre de Fano.",
  "Marchés et décorations de Noël dans le bourg de Corinaldo.",
  "Marchés dans le cloître et crèches à Mondolfo.",
  "Candelara s’illumine à la bougie entre marchés et ambiance de Noël."
 ],
 "es": [
  "Luces y decoraciones navideñas en el centro de Ancona.",
  "Mercados navideños, luces y pista de patinaje en el centro de Fano.",
  "Mercados y decoraciones navideñas en el pueblo de Corinaldo.",
  "Mercados en el claustro y belenes en Mondolfo.",
  "Candelara se ilumina con velas entre mercados y ambiente navideño."
 ],
 "nl": [
  "Kerstverlichting en versieringen in het centrum van Ancona.",
  "Kerstmarkten, verlichting en ijsbaan in het centrum van Fano.",
  "Kerstmarkten en versieringen in het historische Corinaldo.",
  "Markten in de kloostergang en kerststallen in Mondolfo.",
  "Kaarslicht, kerstmarkten en kerstsfeer in het dorp Candelara."
 ],
 "pl": [
  "Świąteczne iluminacje i dekoracje w centrum Ankony.",
  "Jarmarki świąteczne, iluminacje i lodowisko w centrum Fano.",
  "Jarmarki i dekoracje świąteczne w zabytkowym Corinaldo.",
  "Jarmarki w krużganku i szopki w Mondolfo.",
  "Candelara rozświetlona świecami, jarmarki i świąteczna atmosfera."
 ],
 "ro": [
  "Lumini și decorațiuni de Crăciun în centrul Anconei.",
  "Târguri de Crăciun, lumini și patinoar în centrul orașului Fano.",
  "Târguri și decorațiuni de Crăciun în satul istoric Corinaldo.",
  "Târguri în claustru și scene ale Nașterii Domnului în Mondolfo.",
  "Candelara se luminează cu lumânări, târguri și atmosferă de Crăciun."
 ],
 "cs": [
  "Vánoční osvětlení a výzdoba v centru Ancony.",
  "Vánoční trhy, světla a kluziště v centru Fana.",
  "Vánoční trhy a výzdoba v historickém Corinaldu.",
  "Trhy v klášterním ambitu a betlémy v Mondolfu.",
  "Candelara osvětlená svíčkami, vánoční trhy a sváteční atmosféra."
 ],
 "hu": [
  "Karácsonyi fények és díszítések Ancona központjában.",
  "Karácsonyi vásárok, fények és korcsolyapálya Fano központjában.",
  "Karácsonyi vásárok és díszítések Corinaldo történelmi városában.",
  "Vásárok a kolostor kerengőjében és betlehemek Mondolfóban.",
  "Gyertyafény, karácsonyi vásárok és ünnepi hangulat Candelarában."
 ],
 "bg": [
  "Коледни светлини и украса в центъра на Анкона.",
  "Коледни базари, светлини и ледена пързалка в центъра на Фано.",
  "Коледни базари и украса в историческото Кориналдо.",
  "Базари в манастирския двор и рождественски сцени в Мондолфо.",
  "Свещи, коледни базари и празнична атмосфера в Канделара."
 ],
 "ja": [
  "アンコーナ中心部のクリスマスイルミネーションと装飾。",
  "ファーノ中心部のクリスマスマーケット、イルミネーション、スケートリンク。",
  "歴史あるコリナルドのクリスマスマーケットと装飾。",
  "モンドルフォの回廊のマーケットとキリスト降誕の展示。",
  "キャンドルに照らされるカンデラーラの村とクリスマスマーケット。"
 ]
};
const STAY_EVENTS = [
 {id:'natale-2026',image:'assets/events/natale-senigallia-2026.jpg',imageSource:'https://www.feelsenigallia.it/wp-content/uploads/2026/11/FeelSenigallia-brochure.pdf',credit:'Feel Senigallia · Comune di Senigallia',start:'2026-11-28',end:'2027-01-06',title:'Vivi la magia del Natale a Senigallia',description:14,venue:13,source:'https://www.feelsenigallia.it/eventi/vivi-la-magia-del-natale-a-senigallia/',query:'Piazza Roma Senigallia'},
 {id:'orient-express-2026',requiredLanguages:['it'],image:'assets/events/orient-express-2026.jpg',imageSource:'https://www.feelsenigallia.it/wp-content/uploads/2026/09/2-ASSASSINIO-SULL_ORIENT-EXPRESS_Greg-2-Media.jpg',credit:'AMAT · Feel Senigallia',start:'2026-12-04',end:'2026-12-04',time:'21:00',title:'Assassinio sull’Orient Express',description:15,venue:'Teatro La Fenice · Via Cesare Battisti, 30 · Senigallia',source:'https://www.feelsenigallia.it/eventi/assassinio-sullorient-express/',query:'Teatro La Fenice Senigallia'},
 {id:'fenice-30-2026',image:'assets/events/fenice-30-2026.jpg',imageSource:'https://www.feelsenigallia.it/wp-content/uploads/2026/11/Fenice30_Carlino_PaginaIntera_2651x4035mm_CMYK300-scaled.jpg',credit:'Feel Senigallia · Teatro La Fenice',start:'2026-12-05',end:'2026-12-05',time:'18:00',title:'I Virtuosi Italiani · 30° Teatro La Fenice',description:16,price:17,venue:'Teatro La Fenice · Via Cesare Battisti, 30 · Senigallia',source:'https://www.feelsenigallia.it/eventi/30-anniversario-della-riapertura-del-teatro-la-fenice/',query:'Teatro La Fenice Senigallia'},
 {"id": "ancona-natale-2026", "area": "Ancona", "rank": 1, "start": "2026-11-28", "end": "2027-01-08", "title": "Ancona che brilla", "nearbyDescription": 0, "venue": "Piazza della Repubblica e centro · Ancona", "source": "https://www.comune.ancona.it/it/news/ancona-che-brilla?type=1", "query": "Piazza della Repubblica Ancona", "image": "assets/events/ancona-natale-2026.png", "imageSource": "https://www.comune.ancona.it/s3/223/media/copertina_sito_577x324.png", "credit": "Comune di Ancona"},
 {"id": "fano-natale-2026", "area": "Fano", "rank": 1, "start": "2026-11-28", "end": "2027-01-06", "title": "Fano, un Natale da Favola", "nearbyDescription": 1, "venue": "Centro storico · Fano", "source": "https://visitfano.info/fano-un-natale-da-favola-2026/", "query": "Piazza XX Settembre Fano", "image": "https://visitfano.info/wp-content/uploads/2026/11/LOCANDINA-ORIZZONTALE-WEB.png", "credit": "Visit Fano"},
 {"id": "corinaldo-natale-2026", "area": "Corinaldo", "rank": 1, "start": "2026-12-06", "end": "2026-12-20", "dates": ["2026-12-06", "2026-12-07", "2026-12-08", "2026-12-13", "2026-12-20"], "title": "Il Gran Natale di Corinaldo", "nearbyDescription": 2, "venue": "Via del Corso e centro storico · Corinaldo", "source": "https://www.visitcorinaldo.it/il-gran-natale-di-corinaldo/", "query": "Via del Corso Corinaldo", "image": "https://www.visitcorinaldo.it/site/wp-content/uploads/2026/10/Natale2026-manifsto.jpg", "credit": "Visit Corinaldo · Ufficio IAT"},
 {"id": "mondolfo-natale-2026", "area": "Mondolfo", "rank": 1, "start": "2026-11-29", "end": "2026-12-13", "dates": ["2026-11-29", "2026-12-06", "2026-12-13"], "title": "Natale tra borgo e Mare · Mondolfo", "nearbyDescription": 3, "venue": "Chiostro e centro storico · Mondolfo", "source": "https://comune.mondolfo.pu.it/notizie/3682120/natale-2026", "query": "Chiostro Sant Agostino Mondolfo", "image": "https://mycity.s3.sbg.io.cloud.ovh.net/5432409/Locandina-Eventi-Natalizi-2026.jpg", "credit": "Comune di Mondolfo"},
 {"id": "candelara-2026", "area": "Pesaro · Candelara", "rank": 2, "major": true, "start": "2026-11-28", "end": "2026-12-20", "dates": ["2026-11-28", "2026-11-29", "2026-12-05", "2026-12-06", "2026-12-07", "2026-12-08", "2026-12-12", "2026-12-13", "2026-12-19", "2026-12-20"], "title": "Candele a Candelara", "nearbyDescription": 4, "venue": "Borgo di Candelara · Pesaro", "source": "https://www.candelara.it/", "query": "Candelara Pesaro", "credit": "Pro Loco di Candelara"}
];
function validStayEventDate(value){
 if(typeof value!=='string'||!/^\d{4}-\d{2}-\d{2}$/.test(value))return false;
 const date=new Date(value+'T12:00:00Z');
 return !Number.isNaN(date.getTime())&&date.toISOString().slice(0,10)===value;
}
// Use the venue's calendar date even when the guest's device uses another timezone.
function stayEventsToday(now=new Date()){
 const parts=new Intl.DateTimeFormat('en-CA',{timeZone:'Europe/Rome',year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(now);
 const part=type=>parts.find(p=>p.type===type).value;
 return part('year')+'-'+part('month')+'-'+part('day');
}
function remainingStayEventDates(event,arrival,departure,now=new Date()){
 const today=stayEventsToday(now);
 return (event.dates||[]).filter(date=>date>=arrival&&date<departure&&date>=today);
}
function stayEventIsUpcoming(event,arrival,departure,now=new Date()){
 // endsAt is optional: record only verified end times with an explicit UTC offset.
 if(event.endsAt&&/T.*(?:Z|[+-]\d{2}:\d{2})$/.test(event.endsAt)){
  const end=Date.parse(event.endsAt);
  if(Number.isFinite(end))return now.getTime()<end&&(!event.dates||remainingStayEventDates(event,arrival,departure,now).length>0);
 }
 if(event.end<stayEventsToday(now))return false;
 return !event.dates||remainingStayEventDates(event,arrival,departure,now).length>0;
}
function eventsForStay(arrival,departure,lang='it',now=new Date()){
 if(!validStayEventDate(arrival)||!validStayEventDate(departure)||arrival>=departure)return [];
 // Departure is before 10:00: do not suggest events starting on departure day.
 return STAY_EVENTS.filter(event=>event.start<departure&&event.end>=arrival
  && (!event.dates||event.dates.some(date=>date>=arrival&&date<departure))
  && stayEventIsUpcoming(event,arrival,departure,now)
  && (!event.requiredLanguages||event.requiredLanguages.includes(lang))
  && ((event.rank||0)<2||event.major===true)
 ).sort((a,b)=>(a.rank||0)-(b.rank||0)||a.start.localeCompare(b.start));
}
function stayEventDate(value,lang,weekday=false){
 return new Intl.DateTimeFormat(lang,{timeZone:'Europe/Rome',...(weekday?{weekday:'long'}:{}),day:'numeric',month:'long',year:'numeric'}).format(new Date(value+'T12:00:00Z'));
}
let stayEventsRenderKey='';
function stayEventsKey(lang){
 return JSON.stringify([lang,guest?.arrival,guest?.departure,stayEventsToday(),eventsForStay(guest?.arrival,guest?.departure,lang).map(event=>event.id)]);
}
function renderStayEventsSection(index,lang){
 if(index===16)stayEventsRenderKey=stayEventsKey(lang);
 document.getElementById('stay-events')?.remove();
 document.getElementById('detail').classList.toggle('stay-events-dialog',index===16);
 if(index!==16)return;
 const t=STAY_EVENTS_UI[lang]||STAY_EVENTS_UI.it;
 document.getElementById('detail-title').textContent=t[1];
 const hasDates=validStayEventDate(guest?.arrival)&&validStayEventDate(guest?.departure)&&guest.arrival<guest.departure;
 document.getElementById('detail-text').textContent=hasDates?'':t[8];
 const panel=document.createElement('section');panel.id='stay-events';
 const paragraph=(text,className)=>{const p=document.createElement('p');p.textContent=text;if(className)p.className=className;return p;};
 if(hasDates){
  const rangeFormat=new Intl.DateTimeFormat(lang,{timeZone:'Europe/Rome',day:'numeric',month:'long',...(guest.arrival.slice(0,4)!==guest.departure.slice(0,4)?{year:'numeric'}:{})});
  panel.append(paragraph(rangeFormat.format(new Date(guest.arrival+'T12:00:00Z'))+' – '+rangeFormat.format(new Date(guest.departure+'T12:00:00Z')),'stay-events-dates'));
  const events=eventsForStay(guest.arrival,guest.departure,lang);
  if(!events.length)panel.append(paragraph(t[7]));
  for(const event of events){
   const article=document.createElement('article');article.className='place-item';
   const heading=document.createElement('h3');heading.textContent=event.title;
   const dates=event.dates?remainingStayEventDates(event,guest.arrival,guest.departure).map(date=>stayEventDate(date,lang)).join(' · '):stayEventDate(event.start,lang,true)+(event.end!==event.start?' – '+stayEventDate(event.end,lang):'')+(event.time?' · '+event.time:'');
   const dateLine=paragraph(dates);const strong=document.createElement('strong');strong.textContent=dates;dateLine.replaceChildren(strong);
   if(event.image){
    const figure=document.createElement('figure');figure.className='stay-event-image';
    const imageLink=document.createElement('a');imageLink.href=event.image;imageLink.target='_blank';imageLink.rel='noopener noreferrer';
    const image=document.createElement('img');image.src=event.image;image.alt=event.title;image.loading='lazy';image.decoding='async';image.referrerPolicy='no-referrer';
    image.addEventListener('error',()=>figure.remove(),{once:true});imageLink.append(image);
    const credit=document.createElement('figcaption');addLink(credit,event.credit,event.imageSource||event.source,true);
    figure.append(imageLink,credit);article.append(figure);
   }
   article.append(heading,dateLine,paragraph(typeof event.venue==='number'?t[event.venue]:event.venue,'place-address'),paragraph(event.nearbyDescription!==undefined?STAY_EVENTS_NEARBY_TEXT[lang][event.nearbyDescription]:t[event.description]),paragraph(t[event.price??(event.time?12:11)]));
   const links=document.createElement('div');links.className='place-links';
   addLink(links,t[4],event.source,true);
   addLink(links,t[5],'https://www.google.com/maps/dir/?api=1&origin='+encodeURIComponent('Lungomare Italia 70, Marzocca di Senigallia')+'&destination='+encodeURIComponent(event.query),true);
   article.append(links);panel.append(article);
  }
 }
 panel.append(paragraph(t[9]+' '+stayEventDate(STAY_EVENTS_VERIFIED,lang)+'. '+t[10],'place-note'));
 const more=document.createElement('div');more.className='place-links-subtle';addLink(more,t[6],'https://www.feelsenigallia.it/eventi/',true);panel.append(more);
 document.getElementById('detail-text').after(panel);
}

 // Refresh only when the visible selection changes, preserving focus between checks.
function refreshOpenStayEvents(){
 const detail=document.getElementById('detail');
 if(!detail?.open||!document.getElementById('stay-events'))return;
 const lang=document.documentElement.lang||'it';
 if(stayEventsKey(lang)===stayEventsRenderKey)return;
 const scrollTop=detail.scrollTop;
 renderStayEventsSection(16,lang);
 detail.scrollTop=scrollTop;
}
setInterval(refreshOpenStayEvents,30000);
document.addEventListener('visibilitychange',()=>{
 if(document.visibilityState==='visible')refreshOpenStayEvents();
});
window.addEventListener('focus',refreshOpenStayEvents);
window.addEventListener('pageshow',refreshOpenStayEvents);

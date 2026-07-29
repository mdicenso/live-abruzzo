/* ============================================================================
   Abruzzo Wild & Authentic — motore multilingua CONDIVISO (i18n).
   Un solo dizionario per tutte le pagine (prima era duplicato inline nella home).
   Uso: <script src="i18n.js"></script> in ogni pagina, PRIMA dello script di pagina.
     - marcare gli elementi traducibili con  data-i18n="chiave"  (usa innerHTML)
     - i placeholder con  data-i18n-placeholder="chiave"
     - i bottoni lingua con  onclick="setLang('it')"  ecc.
   Applica automaticamente la lingua salvata al caricamento (localStorage 'aw_lang').
   NB: qui c'è la CORNICE (nav/footer/newsletter) + le chiavi della HOME. I contenuti
   delle singole pagine (schede) verranno aggiunti in un secondo momento (fase A2).
   ============================================================================ */
const T18 = {
  en: {
    /* nav + footer (etichette condivise) */
    n_home:'Home', n_quiz:'Quiz', n_hiking:'Hiking', n_food:'Food & Wine',
    n_villages:'Villages', n_wellness:'Wellness', n_attractions:'Attractions',
    n_events:'Events', n_transport:'Transport', n_stay:'Where to Stay', n_plan:'Plan Trip', n_inspired:'Get Inspired', n_experience:'Experience',
    n_scopri:'Discover', n_taste:'Eat & Drink', n_pianifica:'Plan', h_ex:'Curated experiences & itineraries', h_ev:'Festivals & sagre all year round', scopri_h1:'Discover Abruzzo', scopri_lead:'Six ways to explore — experiences, mountains, villages, wellness, monuments and living traditions.',
    gusto_h1:'Eat & Drink in Abruzzo', gusto_lead:'What to eat and where to eat it — iconic dishes, cheeses and wines, plus the places that serve them.', g_what:'What to eat', g_what_sub:'Iconic dishes, cheeses & DOP products', g_seeall:'See all flavours →', g_where:'Where to eat', g_where_sub:'Trattorias, wineries & partner restaurants', g_soon:'Partner restaurants coming soon — we are onboarding local operators.',
    pianifica_h1:'Plan Your Trip', pianifica_lead:'Everything to organise your Abruzzo trip — itineraries, getting around, inspiration and a quiz to find your style.', h_pl:'Itineraries by type & duration', h_tr:'Airports, trains, roads & apps', h_qz:'Find your Abruzzo travel style', h_in:'Moods & ideas to get inspired',
    /* newsletter (condivisa) */
    nl_title:'Abruzzo in your inbox',
    nl_sub:'Events, trails and hidden gems — once a month, no spam.',
    nl_ph:'Your email address', nl_btn:'Subscribe →',
    /* footer */
    f_copy:'© 2026 Abruzzo Wild & Authentic — Made for travellers who go off the beaten path',
    f_credits:'Photo credits',
    n_privacy:'Privacy',
    /* home */
    home_eyebrow:"Central Italy's Best-Kept Secret",
    home_h1:'Where Nature Meets <em>Authentic</em> Italy',
    home_sub:"Mountains, sea, medieval villages, wild cuisine. Abruzzo remains one of Europe's most unspoiled destinations.",
    home_cta1:'Take the Quiz', home_cta2:'Plan Your Trip',
    home_tag:'Explore Everything', home_title:'What Would You Like to Explore?',
    h_hk:'3,000+ km across 3 national parks', h_fd:'Arrosticini, chitarra, Montepulciano',
    h_vl:'Medieval borghi frozen in time', h_wl:'Thermal baths since Roman times',
    h_at:'Castles, museums & natural wonders',
    explore_link:'Explore',
    promo_tag:'Always Worth It', promo_title:'Not to Be Missed',
    ip1:'10 featured trails for every level', ip2:'12 products, 3 DOC wines, 8 sagre',
    ip3:'24 festivals across the year',
    why_label:'Why Abruzzo',
    why1_title:'Wild Nature', why2_title:'Authentic Food',
    why3_title:'2h from Rome', why4_title:'Affordable',
    why1:"Marsican bears and Apennine wolves roam freely in the national parks — genuine wilderness, 2h from Rome.",
    why2:"No tourist menus. Arrosticini, saffron and wine unchanged for centuries.",
    why3:"The A24 connects Rome to L'Aquila in under 90 minutes. Yet it feels worlds away.",
    why4:"Half the price of Tuscany. Agriturismo from €50/night with home-cooked dinner.",
    stat_trails:'km of trails', stat_parks:'National Parks', stat_rome:'from Rome',
    hh2_peak:'Highest Apennine peak',
    scroll:'Scroll',
    /* quiz (fase A2) */
    qz_badge:'5 questions · discover your Abruzzo',
    qz_h1:'What kind of Abruzzo are <em>you</em> looking for?',
    qz_intro:"Two images, one choice. In 5 rounds we'll find your perfect Abruzzo experience — wild peaks, ancient villages, great food or total silence.",
    qz_start:'Start the Journey',
    qz_choose:'Choose this →',
    qz_or:'OR',
    qz_profile_tag:'Your Abruzzo Profile',
    qz_recommend:'We recommend for you',
    qz_retry:'Try again',
    qz_plan:'Plan My Trip',
    qz_cap_title:'Get your itinerary by email',
    qz_cap_sub:'We will send a tailored Abruzzo itinerary for your profile.',
    qz_cap_ph:'you@email.com',
    qz_cap_consent:'Keep me posted with Abruzzo travel ideas (optional)',
    qz_cap_send:'Send my itinerary',
    qz_cap_sending:'Sending your itinerary…',
    qz_cap_ok:'Thank you! Your itinerary is on its way — check your inbox (and the spam folder).',
    qz_cap_err:'Something went wrong. Please try again.',
    qz_cap_privacy:'Privacy notice'
  },
  it: {
    n_home:'Home', n_quiz:'Quiz', n_hiking:'Trekking', n_food:'Cibo & Vino',
    n_villages:'Borghi', n_wellness:'Benessere', n_attractions:'Attrazioni',
    n_events:'Eventi', n_transport:'Trasporti', n_stay:'Dove Dormire', n_plan:'Pianifica', n_inspired:'Ispirazione', n_experience:'Esperienza',
    n_scopri:'Scopri', n_taste:'Mangiare & Bere', n_pianifica:'Pianifica', h_ex:'Esperienze e itinerari curati', h_ev:'Feste e sagre tutto l\'anno', scopri_h1:'Scopri l\'Abruzzo', scopri_lead:'Sei modi per esplorare — esperienze, montagne, borghi, benessere, monumenti e tradizioni vive.',
    gusto_h1:'Mangiare & Bere in Abruzzo', gusto_lead:'Cosa mangiare e dove mangiarlo — piatti iconici, formaggi e vini, e i luoghi che li servono.', g_what:'Cosa mangiare', g_what_sub:'Piatti iconici, formaggi e prodotti DOP', g_seeall:'Vedi tutti i sapori →', g_where:'Dove mangiare', g_where_sub:'Trattorie, cantine e ristoranti partner', g_soon:'Ristoranti partner in arrivo — stiamo coinvolgendo gli operatori locali.',
    pianifica_h1:'Pianifica il Viaggio', pianifica_lead:'Tutto per organizzare il viaggio in Abruzzo — itinerari, come muoversi, ispirazione e un quiz per trovare il tuo stile.', h_pl:'Itinerari per tipo e durata', h_tr:'Aeroporti, treni, strade e app', h_qz:'Scopri il tuo stile di viaggio', h_in:'Atmosfere e idee per ispirarti',
    nl_title:"L'Abruzzo nella tua casella",
    nl_sub:'Eventi, sentieri e luoghi nascosti — una volta al mese, niente spam.',
    nl_ph:'La tua email', nl_btn:'Iscriviti →',
    f_copy:'© 2026 Abruzzo Wild & Authentic — Fatto per chi ama uscire dai sentieri battuti',
    f_credits:'Crediti foto',
    n_privacy:'Privacy',
    home_eyebrow:"Il Segreto Meglio Custodito d'Italia",
    home_h1:"Dove la Natura incontra l'<em>Italia Autentica</em>",
    home_sub:"Montagne, mare, borghi medievali, cucina selvaggia. L'Abruzzo rimane una delle destinazioni più incontaminate d'Europa.",
    home_cta1:'Fai il Quiz', home_cta2:'Pianifica il Viaggio',
    home_tag:'Scopri Tutto', home_title:'Cosa Vorresti Esplorare?',
    h_hk:'3.000+ km in 3 parchi nazionali', h_fd:'Arrosticini, chitarra, Montepulciano',
    h_vl:'Borghi medievali senza tempo', h_wl:'Terme dai tempi romani',
    h_at:'Castelli, musei e meraviglie naturali',
    explore_link:'Scopri',
    promo_tag:'Da Non Perdere', promo_title:'Imperdibili',
    ip1:'10 sentieri per ogni livello', ip2:'12 prodotti, 3 vini DOC, 8 sagre',
    ip3:"24 festival durante l'anno",
    why_label:"Perché l'Abruzzo",
    why1_title:'Natura Selvaggia', why2_title:'Cibo Autentico',
    why3_title:'2h da Roma', why4_title:'Conveniente',
    why1:"Orsi marsicani e lupi appenninici vivono liberi nei parchi nazionali — vera wilderness a 2h da Roma.",
    why2:"Niente menu turistici. Arrosticini, zafferano e vino immutati da secoli.",
    why3:"L'A24 collega Roma all'Aquila in meno di 90 minuti. Eppure sembra un altro mondo.",
    why4:"La metà dei prezzi della Toscana. Agriturismo da €50/notte con cena casalinga.",
    stat_trails:'km di sentieri', stat_parks:'Parchi Nazionali', stat_rome:'da Roma',
    hh2_peak:'Vetta più alta degli Appennini',
    scroll:'Scorri',
    /* quiz (fase A2) */
    qz_badge:'5 domande · scopri il tuo Abruzzo',
    qz_h1:'Che Abruzzo stai <em>cercando</em>?',
    qz_intro:"Due immagini, una scelta. In 5 turni troviamo la tua esperienza perfetta in Abruzzo — vette selvagge, borghi antichi, buon cibo o silenzio totale.",
    qz_start:'Inizia il Viaggio',
    qz_choose:'Scegli questo →',
    qz_or:'O',
    qz_profile_tag:'Il tuo profilo Abruzzo',
    qz_recommend:'Ti consigliamo',
    qz_retry:'Riprova',
    qz_plan:'Pianifica il Viaggio',
    qz_cap_title:'Ricevi il tuo itinerario via email',
    qz_cap_sub:'Ti inviamo un itinerario abruzzese su misura per il tuo profilo.',
    qz_cap_ph:'tu@email.com',
    qz_cap_consent:'Tienimi aggiornato con idee di viaggio in Abruzzo (facoltativo)',
    qz_cap_send:'Invia il mio itinerario',
    qz_cap_sending:'Invio in corso…',
    qz_cap_ok:'Grazie! Ti abbiamo inviato il tuo itinerario — controlla la posta (anche lo spam).',
    qz_cap_err:'Qualcosa è andato storto. Riprova.',
    qz_cap_privacy:'Informativa privacy'
  },
  de: {
    n_home:'Startseite', n_quiz:'Quiz', n_hiking:'Wandern', n_food:'Essen & Wein',
    n_villages:'Dörfer', n_wellness:'Wellness', n_attractions:'Sehenswürdigkeiten',
    n_events:'Veranstaltungen', n_transport:'Anreise', n_stay:'Übernachten', n_plan:'Reise Planen', n_inspired:'Inspiration', n_experience:'Erlebnis',
    n_scopri:'Entdecken', n_taste:'Essen & Trinken', n_pianifica:'Planen', h_ex:'Kuratierte Erlebnisse & Routen', h_ev:'Feste und Sagre das ganze Jahr', scopri_h1:'Entdecke die Abruzzen', scopri_lead:'Sechs Wege zu entdecken — Erlebnisse, Berge, Dörfer, Wellness, Monumente und lebendige Traditionen.',
    gusto_h1:'Essen & Trinken in den Abruzzen', gusto_lead:'Was man isst und wo — kultige Gerichte, Käse und Weine, und die Orte, die sie servieren.', g_what:'Was essen', g_what_sub:'Kultige Gerichte, Käse & DOP-Produkte', g_seeall:'Alle Spezialitäten →', g_where:'Wo essen', g_where_sub:'Trattorien, Weingüter & Partner-Restaurants', g_soon:'Partner-Restaurants folgen bald — wir gewinnen lokale Betriebe.',
    pianifica_h1:'Reise Planen', pianifica_lead:'Alles für die Planung deiner Abruzzen-Reise — Routen, Fortbewegung, Inspiration und ein Quiz für deinen Stil.', h_pl:'Routen nach Typ & Dauer', h_tr:'Flughäfen, Züge, Straßen & Apps', h_qz:'Finde deinen Reisestil', h_in:'Stimmungen & Ideen zur Inspiration',
    nl_title:'Abruzzen in Ihrem Posteingang',
    nl_sub:'Events, Wanderwege und Geheimtipps — einmal im Monat, kein Spam.',
    nl_ph:'Ihre E-Mail-Adresse', nl_btn:'Abonnieren →',
    f_copy:'© 2026 Abruzzo Wild & Authentic — Für Reisende abseits der ausgetretenen Pfade',
    f_credits:'Bildnachweis',
    n_privacy:'Datenschutz',
    home_eyebrow:"Italiens bestgehütetes Geheimnis",
    home_h1:'Wo die Natur auf <em>authentisches</em> Italien trifft',
    home_sub:'Berge, Meer, mittelalterliche Dörfer, wilde Küche. Abruzzen bleibt eines der unberührtesten Reiseziele Europas.',
    home_cta1:'Quiz starten', home_cta2:'Reise Planen',
    home_tag:'Alles Entdecken', home_title:'Was Möchten Sie Erkunden?',
    h_hk:'3.000+ km in 3 Nationalparks', h_fd:'Arrosticini, Chitarra-Pasta, Montepulciano',
    h_vl:'Mittelalterliche Dörfer aus der Zeit', h_wl:'Thermalbäder seit der Römerzeit',
    h_at:'Burgen, Museen & Naturwunder',
    explore_link:'Entdecken',
    promo_tag:'Immer Empfehlenswert', promo_title:'Nicht Verpassen',
    ip1:'10 Routen für jedes Niveau', ip2:'12 Produkte, 3 DOC-Weine, 8 Feste',
    ip3:'24 Festivals das ganze Jahr',
    why_label:'Warum Abruzzen',
    why1_title:'Wilde Natur', why2_title:'Authentisches Essen',
    why3_title:'2h von Rom', why4_title:'Erschwinglich',
    why1:'Marsikanische Bären und Apennin-Wölfe leben frei in den Nationalparks — echte Wildnis, 2h von Rom.',
    why2:'Keine Touristenmenüs. Arrosticini, Safran und Wein seit Jahrhunderten unverändert.',
    why3:"Die A24 verbindet Rom in unter 90 Minuten mit L'Aquila. Und fühlt sich wie eine andere Welt an.",
    why4:'Halb so teuer wie die Toskana. Agriturismo ab €50/Nacht mit Hausmannskost.',
    stat_trails:'km Wanderwege', stat_parks:'Nationalparks', stat_rome:'von Rom',
    hh2_peak:'Höchster Gipfel der Apenninen',
    scroll:'Scrollen',
    /* quiz (fase A2) */
    qz_badge:'5 Fragen · entdecke deine Abruzzen',
    qz_h1:'Welche Abruzzen <em>suchst</em> du?',
    qz_intro:'Zwei Bilder, eine Wahl. In 5 Runden finden wir dein perfektes Abruzzen-Erlebnis — wilde Gipfel, alte Dörfer, gutes Essen oder totale Stille.',
    qz_start:'Die Reise beginnen',
    qz_choose:'Das wählen →',
    qz_or:'ODER',
    qz_profile_tag:'Dein Abruzzen-Profil',
    qz_recommend:'Wir empfehlen dir',
    qz_retry:'Nochmal',
    qz_plan:'Reise planen',
    qz_cap_title:'Erhalte deine Reiseroute per E-Mail',
    qz_cap_sub:'Wir senden dir eine maßgeschneiderte Abruzzen-Route für dein Profil.',
    qz_cap_ph:'du@email.com',
    qz_cap_consent:'Haltet mich mit Reiseideen für die Abruzzen auf dem Laufenden (optional)',
    qz_cap_send:'Reiseroute senden',
    qz_cap_sending:'Wird gesendet…',
    qz_cap_ok:'Danke! Wir haben dir deine Reiseroute geschickt — prüfe dein Postfach (auch den Spam-Ordner).',
    qz_cap_err:'Etwas ist schiefgelaufen. Bitte versuche es erneut.',
    qz_cap_privacy:'Datenschutzhinweis'
  },
  fr: {
    n_home:'Accueil', n_quiz:'Quiz', n_hiking:'Randonnée', n_food:'Gastronomie',
    n_villages:'Villages', n_wellness:'Bien-être', n_attractions:'Attractions',
    n_events:'Événements', n_transport:'Transport', n_stay:'Où Loger', n_plan:'Planifier', n_inspired:'Inspiration', n_experience:'Expérience',
    n_scopri:'Découvrir', n_taste:'Manger & Boire', n_pianifica:'Planifier', h_ex:'Expériences et itinéraires', h_ev:'Fêtes et sagre toute l\'année', scopri_h1:'Découvrir les Abruzzes', scopri_lead:'Six façons d\'explorer — expériences, montagnes, villages, bien-être, monuments et traditions vivantes.',
    gusto_h1:'Manger & Boire dans les Abruzzes', gusto_lead:'Quoi manger et où — plats emblématiques, fromages et vins, et les lieux qui les servent.', g_what:'Quoi manger', g_what_sub:'Plats emblématiques, fromages et produits DOP', g_seeall:'Voir toutes les saveurs →', g_where:'Où manger', g_where_sub:'Trattorias, caves et restaurants partenaires', g_soon:'Restaurants partenaires bientôt disponibles — nous intégrons les opérateurs locaux.',
    pianifica_h1:'Planifiez Votre Voyage', pianifica_lead:'Tout pour organiser votre voyage dans les Abruzzes — itinéraires, transports, inspiration et un quiz pour trouver votre style.', h_pl:'Itinéraires par type et durée', h_tr:'Aéroports, trains, routes et applis', h_qz:'Trouvez votre style de voyage', h_in:'Ambiances et idées pour s\'inspirer',
    nl_title:'Les Abruzzes dans votre boîte mail',
    nl_sub:'Événements, sentiers et trésors cachés — une fois par mois, sans spam.',
    nl_ph:'Votre adresse e-mail', nl_btn:"S'abonner →",
    f_copy:'© 2026 Abruzzo Wild & Authentic — Pour les voyageurs qui sortent des sentiers battus',
    f_credits:'Crédits photos',
    n_privacy:'Confidentialité',
    home_eyebrow:"Le Secret le Mieux Gardé d'Italie",
    home_h1:"Là où la Nature rencontre l'<em>Italie Authentique</em>",
    home_sub:"Montagnes, mer, villages médiévaux, cuisine sauvage. Les Abruzzes restent l'une des destinations les plus préservées d'Europe.",
    home_cta1:'Faire le Quiz', home_cta2:'Planifier le Voyage',
    home_tag:'Tout Découvrir', home_title:'Que Souhaitez-Vous Explorer ?',
    h_hk:'3 000+ km dans 3 parcs nationaux', h_fd:'Arrosticini, chitarra, Montepulciano',
    h_vl:'Bourgs médiévaux figés dans le temps', h_wl:"Thermes depuis l'époque romaine",
    h_at:'Châteaux, musées & merveilles naturelles',
    explore_link:'Explorer',
    promo_tag:'Toujours Incontournable', promo_title:'À ne pas manquer',
    ip1:'10 sentiers pour tous les niveaux', ip2:'12 produits, 3 vins DOC, 8 sagre',
    ip3:"24 festivals tout au long de l'année",
    why_label:'Pourquoi les Abruzzes',
    why1_title:'Nature Sauvage', why2_title:'Cuisine Authentique',
    why3_title:'2h de Rome', why4_title:'Abordable',
    why1:'Des ours marsicans et des loups des Apennins vivent librement dans les parcs nationaux — nature sauvage authentique, à 2h de Rome.',
    why2:'Pas de menus touristiques. Arrosticini, safran et vin inchangés depuis des siècles.',
    why3:"L'A24 relie Rome à L'Aquila en moins de 90 minutes. Et pourtant, c'est un autre monde.",
    why4:"Moitié moins cher que la Toscane. Agriturismo à partir de €50/nuit avec dîner maison.",
    stat_trails:'km de sentiers', stat_parks:'Parcs Nationaux', stat_rome:'de Rome',
    hh2_peak:'Plus haut sommet des Apennins',
    scroll:'Défiler',
    /* quiz (fase A2) */
    qz_badge:'5 questions · découvrez vos Abruzzes',
    qz_h1:'Quelles Abruzzes <em>recherchez</em>-vous ?',
    qz_intro:"Deux images, un choix. En 5 tours, nous trouvons votre expérience idéale dans les Abruzzes — sommets sauvages, villages anciens, bonne cuisine ou silence total.",
    qz_start:'Commencer le Voyage',
    qz_choose:'Choisir ceci →',
    qz_or:'OU',
    qz_profile_tag:'Votre profil Abruzzes',
    qz_recommend:'Nous vous recommandons',
    qz_retry:'Réessayer',
    qz_plan:'Planifier le Voyage',
    qz_cap_title:'Recevez votre itinéraire par e-mail',
    qz_cap_sub:'Nous vous enverrons un itinéraire des Abruzzes adapté à votre profil.',
    qz_cap_ph:'vous@email.com',
    qz_cap_consent:'Tenez-moi informé des idées de voyage dans les Abruzzes (facultatif)',
    qz_cap_send:'Envoyer mon itinéraire',
    qz_cap_sending:'Envoi en cours…',
    qz_cap_ok:'Merci ! Nous vous avons envoyé votre itinéraire — vérifiez votre boîte mail (et les spams).',
    qz_cap_err:'Une erreur est survenue. Veuillez réessayer.',
    qz_cap_privacy:'Politique de confidentialité'
  }
};

let lang = (typeof localStorage !== 'undefined' && localStorage.getItem('aw_lang')) || 'en';

function T(k) {
  return (T18[lang] && T18[lang][k]) || T18.en[k] || k;
}

/* L(): sceglie la lingua da un valore multilingua {en,it,de,fr}.
   Se riceve una stringa semplice la restituisce così com'è (contenuti non ancora tradotti).
   Uso nei render dei contenuti (fase A2): L(item.desc) */
function L(v) {
  if (v && typeof v === 'object' && !Array.isArray(v)) return v[lang] ?? v.en ?? '';
  return v;
}

function setLang(l) {
  lang = l;
  try { localStorage.setItem('aw_lang', l); } catch (e) {}

  document.querySelectorAll('.lang-btn').forEach(b => {
    b.classList.toggle('active', b.textContent.trim() === l.toUpperCase());
  });
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const v = T(el.dataset.i18n);
    if (v) el.innerHTML = v;
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const v = T(el.dataset.i18nPlaceholder);
    if (v) el.placeholder = v;
  });
  document.documentElement.lang = l;

  /* avvisa le pagine con contenuti dinamici (schede) di ri-renderizzare nella nuova lingua */
  document.dispatchEvent(new CustomEvent('aw:langchange', { detail: l }));
}

/* applica la lingua salvata appena il DOM è pronto (robusto anche se lo script è in fondo) */
(function initI18n() {
  const run = () => setLang(lang);
  if (document.readyState !== 'loading') run();
  else document.addEventListener('DOMContentLoaded', run);
})();

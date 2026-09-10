/* ============================================================================
   Live Abruzzo — "Contatta per info" (Fase F).

   Il modulo con cui un visitatore scrive a una struttura dalla sua scheda. Prima
   c'era solo "Prenota", che è un link esterno: chi lo premeva usciva dal sito e
   non ne sapevamo più niente.

   UN SOLO FILE per tutte le pagine che mostrano strutture (dormire, gusto): il
   modulo è identico, e due copie divergono sempre — di solito in una lingua sola,
   che è il modo peggiore di accorgersene.

   Uso, dentro openModal() della pagina:
       AWRichiesta.monta('m-richiesta', s.id, s.nome);

   Il portale è statico (GitHub Pages): la scrittura passa dall'API del CDP, con
   honeypot e Turnstile, esattamente come il quiz.
   ============================================================================ */
(function () {
  'use strict';

  var CDP_API = 'https://api.liveabruzzo.com';
  var TURNSTILE_SITEKEY = '0x4AAAAAAD_Imvy2ydLyTGRX';

  /* Dizionario locale invece che dentro i18n.js: la decisione "un solo file" vale
     anche per le parole. `lang` e `T18` sono di i18n.js, che è già caricato. */
  var TR = {
    it: {
      apri: 'Contatta per info', titolo: 'Scrivi a {s}',
      nome: 'Il tuo nome', email: 'La tua email',
      arrivo: 'Arrivo', partenza: 'Partenza', ospiti: 'Ospiti',
      date_hint: 'Date e ospiti sono facoltativi — servono solo se vuoi un preventivo.',
      messaggio: 'La tua domanda', invia: 'Invia richiesta', invio: 'Invio…',
      ok: 'Richiesta inviata. Ti abbiamo mandato una copia via email.',
      err: 'Non è stato possibile inviare. Riprova fra poco.',
      manca: 'Servono nome, email e messaggio.',
      privacy: 'Usiamo questi dati solo per farti avere una risposta.'
    },
    en: {
      apri: 'Contact for info', titolo: 'Write to {s}',
      nome: 'Your name', email: 'Your email',
      arrivo: 'Check-in', partenza: 'Check-out', ospiti: 'Guests',
      date_hint: 'Dates and guests are optional — they only help if you want a quote.',
      messaggio: 'Your question', invia: 'Send enquiry', invio: 'Sending…',
      ok: 'Enquiry sent. We emailed you a copy.',
      err: 'We could not send it. Please try again shortly.',
      manca: 'Name, email and message are required.',
      privacy: 'We use these details only to get you an answer.'
    },
    de: {
      apri: 'Für Infos kontaktieren', titolo: 'Schreiben Sie an {s}',
      nome: 'Ihr Name', email: 'Ihre E-Mail',
      arrivo: 'Anreise', partenza: 'Abreise', ospiti: 'Gäste',
      date_hint: 'Daten und Gästezahl sind freiwillig — nur für ein Angebot nötig.',
      messaggio: 'Ihre Frage', invia: 'Anfrage senden', invio: 'Senden…',
      ok: 'Anfrage gesendet. Eine Kopie ist per E-Mail unterwegs.',
      err: 'Senden nicht möglich. Bitte versuchen Sie es gleich noch einmal.',
      manca: 'Name, E-Mail und Nachricht sind erforderlich.',
      privacy: 'Wir verwenden diese Daten nur, um Ihnen eine Antwort zu verschaffen.'
    },
    fr: {
      apri: 'Contacter pour infos', titolo: 'Écrire à {s}',
      nome: 'Votre nom', email: 'Votre e-mail',
      arrivo: 'Arrivée', partenza: 'Départ', ospiti: 'Voyageurs',
      date_hint: 'Dates et voyageurs sont facultatifs — utiles pour un devis.',
      messaggio: 'Votre question', invia: 'Envoyer la demande', invio: 'Envoi…',
      ok: 'Demande envoyée. Nous vous en avons envoyé une copie par e-mail.',
      err: "L'envoi n'a pas abouti. Réessayez dans un instant.",
      manca: 'Nom, e-mail et message sont obligatoires.',
      privacy: 'Nous utilisons ces données uniquement pour vous obtenir une réponse.'
    }
  };

  function t(k) {
    var l = (typeof lang !== 'undefined' && TR[lang]) ? lang : 'en';
    return TR[l][k] || TR.en[k] || k;
  }

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  var stato = { slug: '', nome: '', contenitore: null, aperto: false, widget: null };

  function html() {
    var oggi = new Date().toISOString().slice(0, 10);
    return '' +
      '<button type="button" class="str-book rq-apri" id="rq-apri">' +
        '<i class="ti ti-mail" aria-hidden="true"></i> ' + esc(t('apri')) +
      '</button>' +
      '<form class="rq-form" id="rq-form" hidden>' +
        '<h3 class="rq-titolo">' + esc(t('titolo').replace('{s}', stato.nome)) + '</h3>' +
        '<div class="rq-riga">' +
          '<input id="rq-nome" type="text" required placeholder="' + esc(t('nome')) + '">' +
          '<input id="rq-email" type="email" required placeholder="' + esc(t('email')) + '">' +
        '</div>' +
        '<div class="rq-riga rq-riga-3">' +
          '<label>' + esc(t('arrivo')) +
            '<input id="rq-arrivo" type="date" min="' + oggi + '"></label>' +
          '<label>' + esc(t('partenza')) +
            '<input id="rq-partenza" type="date" min="' + oggi + '"></label>' +
          '<label>' + esc(t('ospiti')) +
            '<input id="rq-ospiti" type="number" min="1" max="30"></label>' +
        '</div>' +
        '<small class="rq-hint">' + esc(t('date_hint')) + '</small>' +
        '<textarea id="rq-messaggio" rows="4" required placeholder="' +
          esc(t('messaggio')) + '"></textarea>' +
        /* Honeypot: invisibile e fuori dal giro della tastiera. Un umano non lo
           compila mai; se arriva pieno, per il server è un bot. */
        '<input id="rq-website" name="website" type="text" tabindex="-1" autocomplete="off"' +
          ' aria-hidden="true" style="position:absolute;left:-9999px;opacity:0;height:0">' +
        '<div class="cf-turnstile" id="rq-turnstile"></div>' +
        '<button type="submit" class="rq-invia" id="rq-invia">' + esc(t('invia')) + '</button>' +
        '<p class="rq-msg" id="rq-msg" hidden></p>' +
        '<small class="rq-privacy">' + esc(t('privacy')) + '</small>' +
      '</form>';
  }

  function apri() {
    var form = document.getElementById('rq-form');
    var bottone = document.getElementById('rq-apri');
    if (!form) return;
    form.hidden = false;
    if (bottone) bottone.hidden = true;
    stato.aperto = true;
    if (window.turnstile && stato.widget === null) {
      try {
        stato.widget = window.turnstile.render('#rq-turnstile',
          { sitekey: TURNSTILE_SITEKEY });
      } catch (e) { /* il modulo funziona lo stesso: decide il server */ }
    }
    var nome = document.getElementById('rq-nome');
    if (nome) nome.focus();
  }

  function invia(ev) {
    ev.preventDefault();
    var msg = document.getElementById('rq-msg');
    var bottone = document.getElementById('rq-invia');
    var val = function (id) { var e = document.getElementById(id); return e ? e.value.trim() : ''; };

    var nome = val('rq-nome'), email = val('rq-email'), messaggio = val('rq-messaggio');
    if (!nome || !email || !messaggio) {
      mostra(msg, t('manca'), 'err');
      return;
    }

    var token = '';
    if (window.turnstile && stato.widget !== null) {
      try { token = window.turnstile.getResponse(stato.widget) || ''; } catch (e) {}
    }

    var etichetta = bottone.textContent;
    bottone.disabled = true;
    bottone.textContent = t('invio');

    fetch(CDP_API + '/api/v1/richieste', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        struttura: stato.slug,
        nome: nome,
        email: email,
        messaggio: messaggio,
        lingua: (typeof lang !== 'undefined' ? lang : 'it'),
        arrivo: val('rq-arrivo'),
        partenza: val('rq-partenza'),
        ospiti: parseInt(val('rq-ospiti'), 10) || 0,
        website: val('rq-website'),
        turnstile_token: token
      })
    })
      .then(function (r) { return r.json().catch(function () { return {}; }); })
      .then(function (res) {
        if (res && res.ok) {
          /* Il messaggio a schermo è volutamente generico: se la richiesta sia
             stata girata o no lo dice l'email, non lo schermo. Il server non lo
             risponde nemmeno — dirlo equivarrebbe a far sondare quali dei nostri
             operatori hanno un'email. */
          document.getElementById('rq-form').reset();
          mostra(msg, t('ok'), 'ok');
        } else {
          mostra(msg, t('err'), 'err');
        }
      })
      .catch(function () { mostra(msg, t('err'), 'err'); })
      .then(function () {
        bottone.disabled = false;
        bottone.textContent = etichetta;
        if (window.turnstile && stato.widget !== null) {
          try { window.turnstile.reset(stato.widget); } catch (e) {}
        }
      });
  }

  function mostra(el, testo, classe) {
    if (!el) return;
    el.textContent = testo;
    el.className = 'rq-msg ' + classe;
    el.hidden = false;
  }

  window.AWRichiesta = {
    /* Chiamata dall'apertura della scheda. `idContenitore` è un div vuoto nel
       modal della pagina. */
    monta: function (idContenitore, slug, nome) {
      var c = document.getElementById(idContenitore);
      if (!c) return;
      stato.contenitore = idContenitore;
      stato.slug = slug || '';
      stato.nome = nome || '';
      stato.aperto = false;
      stato.widget = null;      /* il modal si richiude: il widget va rifatto */
      c.innerHTML = html();
      var b = document.getElementById('rq-apri');
      if (b) b.addEventListener('click', apri);
      var f = document.getElementById('rq-form');
      if (f) f.addEventListener('submit', invia);
    }
  };

  /* Cambiare lingua mentre il modulo è aperto non deve lasciarlo a metà in due
     lingue: si ricostruisce, perdendo quello che era stato scritto — che è meno
     peggio di un modulo metà inglese e metà tedesco. */
  document.addEventListener('aw:langchange', function () {
    if (stato.contenitore) window.AWRichiesta.monta(stato.contenitore, stato.slug, stato.nome);
  });
})();

/* ============================================================================
   Live Abruzzo — monta il contenuto di una pagina struttura (strutture/<slug>.html).

   L'involucro HTML (nav, hero, meta OG) lo scrive il CDP al momento della
   pubblicazione (vedi crm_strutture/adapters/live_abruzzo.py, render_struttura_html).
   Questo script legge data/strutture.js — gia' caricato dalla pagina prima di questo
   script — e riempie i contenitori vuoti: stesso identico meccanismo di
   dormire.html/openModal(), spostato da un modal a una pagina intera.
   ============================================================================ */
(function () {
  'use strict';

  var SERVIZI_ICON = {
    wifi: 'ti-wifi', parcheggio: 'ti-parking', piscina: 'ti-pool',
    pet_friendly: 'ti-paw', colazione_inclusa: 'ti-coffee'
  };

  var TIPO_ICON_PLACEHOLDER = {
    albergo_diffuso: 'ti-building-community', hotel: 'ti-building-skyscraper',
    bed_and_breakfast: 'ti-coffee', agriturismo: 'ti-plant-2',
    rifugio: 'ti-mountain', casa_vacanze: 'ti-home', ostello: 'ti-users'
  };

  var SERVIZI_CATEGORIA = {
    wifi: 'accoglienza', parcheggio: 'accoglienza',
    colazione_inclusa: 'ristorazione', piscina: 'benessere', pet_friendly: 'comfort'
  };
  var ORDINE_CATEGORIE_SERVIZI = ['accoglienza', 'ristorazione', 'benessere', 'comfort', 'altro'];

  function capit(s) { return (s || '').charAt(0).toUpperCase() + (s || '').slice(1); }

  function tipoLabel(t) {
    if (!t) return '';
    var k = 'dr_t_' + t;
    var v = T(k);
    return v !== k ? v : t.replace(/_/g, ' ').replace(/\b\w/g, function (c) { return c.toUpperCase(); });
  }

  /* I percorsi relativi in data/strutture.js (es. "img/x.jpg") sono scritti per
     pagine alla radice del sito. Questa pagina vive in strutture/<slug>.html: un
     percorso relativo va risalito di una cartella, altrimenti punterebbe a
     strutture/img/x.jpg, che non esiste. */
  function resolveImg(url) {
    if (!url) return '';
    return url.startsWith('http') ? url : '../' + url;
  }

  function servizioChip(codice) {
    var icona = SERVIZI_ICON[codice] || 'ti-check';
    var k = 'srv_' + codice;
    var etichetta = T(k) !== k ? T(k) : capit(codice.replace(/_/g, ' '));
    return '<span class="s-info-item"><i class="ti ' + icona + '" aria-hidden="true"></i> ' + etichetta + '</span>';
  }

  function renderBadges(s) {
    var html = '<span class="tag" style="background:rgba(61,74,46,.12);color:var(--olive-mid)">' +
      '<i class="ti ti-bed" aria-hidden="true"></i> ' + tipoLabel(s.tipo_ricettivo) + '</span>';
    (s.tags || []).forEach(function (t) { html += '<span class="tag">' + capit(t) + '</span>'; });
    document.getElementById('s-badges').innerHTML = html;
  }

  function renderSubtitle(s) {
    var loc = [s.comune, s.zona_geografica].filter(Boolean).join(' · ');
    var pezzi = [tipoLabel(s.tipo_ricettivo), loc, s.classificazione].filter(Boolean);
    document.getElementById('s-subtitle').textContent = pezzi.join(' · ');
  }

  function renderDesc(s) {
    var el = document.getElementById('s-desc');
    var testo = L(s.descrizione_estesa) || L(s.descrizione_breve) || '';
    el.textContent = testo;
    el.style.display = testo ? '' : 'none';
  }

  /* "Non spariscono i pezzi": la galleria resta sempre visibile. Senza foto, un
     placeholder grafico (icona per tipologia, nessuna foto stock/remota) invece di
     una sezione vuota o nascosta. */
  function renderGallery(s) {
    var foto = s.foto_url || [];
    var el = document.getElementById('s-gallery');
    if (foto.length === 0) {
      var icona = TIPO_ICON_PLACEHOLDER[s.tipo_ricettivo] || 'ti-bed';
      el.innerHTML = '<div class="s-gthumb-placeholder"><i class="ti ' + icona + '" aria-hidden="true"></i>' +
        '<span>' + T('s_foto_in_arrivo') + '</span></div>';
    } else {
      el.innerHTML = foto.map(function (f) {
        return '<div class="s-gthumb" style="background-image:url(\'' + resolveImg(f) + '\')"></div>';
      }).join('');
    }
  }

  /* Prezzo/capacità: vanno nella card sticky (prezzo-da e classificazione sono gli
     unici dati "minori" che possono non comparire, invariato rispetto a prima). */
  function renderPrezzoCapacita(s) {
    var pezzi = [];
    if (s.prezzo_da) {
      pezzi.push('<span class="s-info-item s-info-price"><i class="ti ti-tag" aria-hidden="true"></i> ' +
        T('s_price_from') + ' ' + s.prezzo_da + '€' + T('s_price_night') + '</span>');
    }
    var cap = L(s.capacita);
    if (cap) {
      pezzi.push('<span class="s-info-item"><i class="ti ti-users" aria-hidden="true"></i> ' + T('s_capacity') + ': ' + cap + '</span>');
    }
    var el = document.getElementById('s-sticky-price');
    el.innerHTML = pezzi.join('');
    el.style.display = pezzi.length ? '' : 'none';
  }

  /* Servizi raggruppati per categoria (stile Visit Tuscany). Lista vuota -> la
     sezione non compare: non e' uno dei due blocchi "mai spariscono" (galleria,
     disponibilita'), stesso trattamento di prima. */
  function renderServizi(s) {
    var el = document.getElementById('s-info');
    var servizi = s.servizi || [];
    if (!servizi.length) { el.innerHTML = ''; el.style.display = 'none'; return; }
    var gruppi = {};
    servizi.forEach(function (sv) {
      var cat = SERVIZI_CATEGORIA[sv] || 'altro';
      (gruppi[cat] = gruppi[cat] || []).push(sv);
    });
    var html = '<h3 class="s-info-title">' + T('s_amenities') + '</h3>';
    ORDINE_CATEGORIE_SERVIZI.forEach(function (cat) {
      if (!gruppi[cat]) return;
      html += '<div class="s-info-gruppo">' +
        '<p class="s-info-gruppo-titolo">' + T('srv_cat_' + cat) + '</p>' +
        '<div class="s-info-gruppo-chips">' + gruppi[cat].map(servizioChip).join('') + '</div>' +
        '</div>';
    });
    el.innerHTML = html;
    el.style.display = '';
  }

  /* Griglia del mese CORRENTE (calcolato nel browser, non fissato a quando la pagina
     e' stata generata — altrimenti sarebbe sbagliata appena cambia il mese, fino alla
     prossima pubblicazione manuale). */
  function renderDisponibilita(s) {
    var el = document.getElementById('s-disponibilita');
    if (!el) return;
    if (!s.ical_aggiornato_il) { el.style.display = 'none'; return; }

    var occupato = {};
    (s.ical_occupato || []).forEach(function (d) { occupato[d] = true; });

    var oggi = new Date();
    var anno = oggi.getFullYear(), mese = oggi.getMonth();
    var giorniNelMese = new Date(anno, mese + 1, 0).getDate();
    var primoGiornoSettimana = (new Date(anno, mese, 1).getDay() + 6) % 7; // lunedi'=0

    function isoDate(d) {
      var mm = String(mese + 1).padStart(2, '0');
      var dd = String(d).padStart(2, '0');
      return anno + '-' + mm + '-' + dd;
    }

    var oggiIso = isoDate(oggi.getDate());
    var primaLibera = '';
    var celle = '';
    for (var i = 0; i < primoGiornoSettimana; i++) celle += '<div class="s-day pad"></div>';
    for (var d = 1; d <= giorniNelMese; d++) {
      var iso = isoDate(d);
      var occ = !!occupato[iso];
      if (!occ && !primaLibera && iso >= oggiIso) primaLibera = iso;
      var isPast = iso < oggiIso;
      if (isPast) {
        celle += '<div class="s-day" style="opacity:.35">' + d + '</div>';
      } else {
        celle += '<div class="s-day ' + (occ ? 'busy' : 'free') + '">' + d + '</div>';
      }
    }

    var meseTxt = oggi.toLocaleDateString(typeof lang !== 'undefined' ? lang : 'en',
      { month: 'long', year: 'numeric' });
    meseTxt = meseTxt.charAt(0).toUpperCase() + meseTxt.slice(1);

    var html = '<p class="s-disp-mese">' + meseTxt + '</p>';
    if (primaLibera) {
      html += '<span class="s-disp-pill">' + T('s_disponibile_dal') + ' ' + primaLibera + '</span>';
    } else {
      html += '<span class="s-disp-pill">' + T('s_tutto_occupato') + '</span>';
    }
    html += '<div class="s-grid-mese">' + celle + '</div>';
    html += '<p class="s-disp-muted">' + T('s_aggiornato_il') + ' ' +
      s.ical_aggiornato_il.replace('T', ' ') + ' (' + T('s_da_ical') + ')</p>';

    el.innerHTML = html;
    el.style.display = '';
  }

  /* Mappa: iframe OpenStreetMap, nessuna chiave richiesta — coerente con l'attenzione
     gia' mostrata altrove nel progetto a non introdurre dipendenze/costi Google
     oltre al place_id. */
  function renderMap(s) {
    var el = document.getElementById('s-map');
    if (s.lat == null || s.lng == null) { el.style.display = 'none'; return; }
    var d = 0.01;
    var bbox = (s.lng - d) + ',' + (s.lat - d) + ',' + (s.lng + d) + ',' + (s.lat + d);
    el.innerHTML = '<iframe src="https://www.openstreetmap.org/export/embed.html?bbox=' +
      bbox + '&amp;marker=' + s.lat + ',' + s.lng + '" loading="lazy" title="' + T('s_map') + '"></iframe>';
    el.style.display = '';
  }

  function renderBook(s) {
    var el = document.getElementById('s-book');
    el.innerHTML = s.link_booking_esterno
      ? '<a class="str-book" href="' + s.link_booking_esterno + '" target="_blank" rel="noopener">' +
        '<i class="ti ti-external-link" aria-hidden="true"></i> ' + T('dr_book') + ' →</a>'
      : '';
  }

  var strutturaCorrente = null;

  function renderTutto(s) {
    renderSubtitle(s);
    renderBadges(s);
    renderDesc(s);
    renderGallery(s);
    renderPrezzoCapacita(s);
    renderServizi(s);
    renderDisponibilita(s);
    renderMap(s);
    renderBook(s);
    if (window.AWRichiesta) window.AWRichiesta.monta('s-richiesta', s.id, s.nome || '');
  }

  window.AWStrutturaPage = {
    monta: function (slug) {
      var lista = (window.AW && window.AW.strutture) || [];
      var s = lista.find(function (x) { return x.id === slug; });
      if (!s) return;
      strutturaCorrente = s;
      renderTutto(s);
    }
  };

  document.addEventListener('aw:langchange', function () {
    if (strutturaCorrente) renderTutto(strutturaCorrente);
  });
})();

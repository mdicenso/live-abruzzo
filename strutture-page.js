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

  function renderDesc(s) {
    var el = document.getElementById('s-desc');
    var testo = L(s.descrizione_estesa) || L(s.descrizione_breve) || '';
    el.textContent = testo;
    el.style.display = testo ? '' : 'none';
  }

  function renderGallery(s) {
    var foto = s.foto_url || [];
    var el = document.getElementById('s-gallery');
    el.innerHTML = foto.length > 1
      ? foto.map(function (f) {
          return '<div class="s-gthumb" style="background-image:url(\'' + resolveImg(f) + '\')"></div>';
        }).join('')
      : '';
  }

  function renderInfo(s) {
    var pezzi = [];
    if (s.prezzo_da) {
      pezzi.push('<span class="s-info-item"><i class="ti ti-tag" aria-hidden="true"></i> ' +
        T('s_price_from') + ' ' + s.prezzo_da + '€' + T('s_price_night') + '</span>');
    }
    var cap = L(s.capacita);
    if (cap) {
      pezzi.push('<span class="s-info-item"><i class="ti ti-users" aria-hidden="true"></i> ' + T('s_capacity') + ': ' + cap + '</span>');
    }
    if (s.servizi && s.servizi.length > 0) {
      pezzi.push('<span style="display:block;font-weight:600;margin-top:8px;">' + T('s_amenities') + '</span>');
    }
    (s.servizi || []).forEach(function (sv) { pezzi.push(servizioChip(sv)); });
    var el = document.getElementById('s-info');
    el.innerHTML = pezzi.join('');
    el.style.display = pezzi.length ? '' : 'none';
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
      bbox + '&marker=' + s.lat + ',' + s.lng + '" loading="lazy" title="' + T('s_map') + '"></iframe>';
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
    renderBadges(s);
    renderDesc(s);
    renderGallery(s);
    renderInfo(s);
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

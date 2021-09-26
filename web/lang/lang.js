const selLang = {
  "lang": "de",
  "numFor": "de-DE"
}

const selNumFor = new Intl.NumberFormat(selLang.numFor);

let translations = "";

$(document).ready( function() {
  $.getJSON( "lang/translations.json", function (data) {
    translations = data;
    docReady();
  });
});

function t(id, n = null) {
  if( translations.hasOwnProperty( id ) && translations[id].hasOwnProperty( selLang.lang ) ) {
    str = translations[id][selLang.lang];
    return str = str.replace( /\$n/g, n );
  }

  return id;
}

function n(num) {
  return selNumFor.format(num);
}

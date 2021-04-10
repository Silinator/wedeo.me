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
  str = translations[id][selLang.lang];
  return str = str.replace( /\$n/g, n );
}

function n(num) {
  return selNumFor.format(num);
}

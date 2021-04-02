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

function t(id) {
  return translations[id][selLang.lang];
}

function n(num) {
  return selNumFor.format(num);
}

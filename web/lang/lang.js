const selLang = {
  "lang": "de",
  "numFor": "de-DE"
}

const selNumFor = new Intl.NumberFormat(selLang.numFor);

let translations = "";
$.getJSON( "lang/translations.json", function (data) {
  translations = data;
});

function t(id) {
  return translations[id][selLang.lang];
}

function n(num) {
  return selNumFor.format(num);
}

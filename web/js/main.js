let wedeoPlayer = false;
let nextPageIsLoading = false;

function docReady() {
  if( window.matchMedia("(pointer: coarse)").matches ) {
    $(document.body).addClass('touch');
  }

  window.onpopstate = function() {
    var url = document.location.pathname + document.location.search;
    goToPage(url, true);
  }

  activateSamePageLinks();
}


function activateSamePageLinks() {
  $('a').unbind("click").click( function(e) {
    if(
      $(this).attr('target') != "_blank" && $(this).attr('load') != 'new' && !nextPageIsLoading
      && !e.ctrlKey && !e.shiftKey && e.which != 2 && e.button != 4
    ) {
      nextPageIsLoading = true;

      const url = $(this).attr('href');
      goToPage(url);
    }

    return false;
  });
}

function goToPage( url, fromNavigation = false ) {
  if( !fromNavigation ) { window.history.pushState( {page: true}, null, document.location ); } //adds current page as previous page
  window.history.replaceState('currentPage', 'wedeo.me', url); //changes browser url

  //add page loading progress

  if( ( url.startsWith("watchPage") || url.startsWith( new URL(document.baseURI).pathname + "watchPage") ) && wedeoPlayer ) {
    loadVideoPage(url);
  } else if( wedeoPlayer ) {
    moveIntoMiniplayer();
    loadPage(url);
  } else {
    loadPage(url);
  }
}

function loadVideoPage( url ) {
  $.post( url, { 'json': true, 'html': true, 'from': document.location.toString() }, function(d) {
    nextPageIsLoading = false;

    data = {};
    data.htmlTitle = "Aranoid Vortex - Other side [NSM Release] | wedeo.me";
    data.meta = {
      vuid: "pTRtfE39",
      datavuid: "q20Gc2ypR1BdXrtUZ5i1a7hpQ",
      availableSources: [ "audio", "240p", "480p", "1080p", "2160p" ],
      title: "Aranoid Vortex - Other side [NSM Release]",
      rating: [ 5, 0 ],
      user: {
        uuid: "G4bGS4TQajeo",
        name: "Silinator",
      },
      playlistId: "H3yS4FJ6691c",
      previousVideo: "mg7SY3On",
      nextVideo: "ppcistma"
    };

    wedeoPlayer.setVideo(data.meta);
    document.title = data.htmlTitle;
  });
}

function loadPage( url ) {
  $.post( url, { 'json': true, 'html': true, 'from': document.location.toString() }, function(d) {
    nextPageIsLoading = false;
    data = {};
    //$('.mainContainer').html(data.html);
    data.htmlTitle = "Back | wedeo.me";
    document.title = data.htmlTitle;
  });
}

function moveIntoMiniplayer() {

}

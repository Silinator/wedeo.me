let wedeoPlayer = false;
let wedeoBgPlayer = false;
let nextPageIsLoading = false;

function docReady() {
  if( window.matchMedia("(pointer: coarse)").matches ) {
    $(document.body).addClass('touch');
  }

  activateSamePageNavigation();
  activateSamePageLinks();
}

function activateSamePageNavigation() {
  window.onpopstate = function() {
    var url = document.location.pathname + document.location.search;
    goToPage(url, true);
  }
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
  console.log( 'loadVideoPage' );
  $.post( url, { 'json': true, 'html': false, 'from': document.location.toString() }, function(data) {
    nextPageIsLoading = false;

    document.title = data.htmlTitle;
    wedeoPlayer.setVideo(data.videoMeta);

    activateSamePageNavigation();
    activateSamePageLinks();
  });
}

function loadPage( url ) {
  console.log( 'loadPage' );
  if( wedeoBgPlayer ) { videojs(wedeoBgPlayer.playerId).dispose(); wedeoBgPlayer = false; }
  if( wedeoPlayer ) { videojs(wedeoPlayer.playerId).dispose();  wedeoPlayer = false; } //remove for miniplayer

  $.post( url, { 'json': true, 'html': true, 'from': document.location.toString() }, function(data) {
    nextPageIsLoading = false;

    document.title = data.htmlTitle;
    $('mainContainer').html(data.html);

    activateSamePageNavigation();
    activateSamePageLinks();
    pageScripts();
  });
}

function moveIntoMiniplayer() {

}

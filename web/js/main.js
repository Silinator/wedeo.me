let wedeoPlayer = false;
let wedeoBgPlayer = false;
let nextPageIsLoading = false;

document.removeEventListener( "click", clickOnLink );

document.addEventListener("click", clickOnLink );

function clickOnLink( event ) {
  const anchorElement = event.path.filter( element => {
    if( element.tagName ) {
      if( element.tagName.toLowerCase() == "a" ) {
          return true;
      } else {
        return false;
      }
    }
  })[0];

  const openInNewTab = anchorElement && anchorElement.getAttribute( "target" ) === "_blank" ? true : false;
  const url = anchorElement ? anchorElement.getAttribute( "href" ) : '';

  if(
    anchorElement && !openInNewTab && !nextPageIsLoading
    && !event.ctrlKey && !event.shiftKey && event.which != 2 && event.button != 4
  ) {
    event.preventDefault();
    nextPageIsLoading = true;

    goToPage(url);
  }
}

function activateSamePageNavigation() {
  window.onpopstate = function() {
    let url = document.location.pathname + document.location.search;
    url = url.indexOf('/') == 0 ? url.substring(1) : url;
    goToPage(url, true);
  }
}

function htmlLoaded() {
  if( window.matchMedia("(pointer: coarse)").matches ) {
    document.querySelector('body').classList.add('touch');
  }

  activateSamePageNavigation();
}

function goToPage( url, fromNavigation = false ) {
  //closeNavi();

  //add page loading progress

  const isVideoLink = ( url.startsWith("watch") || url.startsWith("w") || url.startsWith( new URL(document.baseURI).pathname + "watch/") || url.startsWith( new URL(document.baseURI).pathname + "w/") );
  const isNormalWedeoPlayer = ( wedeoPlayer && wedeoPlayer.type !== "mini" );
  const isMiniWedeoPlayer = ( wedeoPlayer && wedeoPlayer.type === "mini" );

  if( isVideoLink && isMiniWedeoPlayer ) {
    if( !fromNavigation ) { document.querySelector('.miniWedeoContainer').getAttribute('videoURL', url); }
  } else {
    if( !fromNavigation ) { window.history.pushState( {page: true}, null, document.location ); } //adds current page as previous page
    window.history.replaceState('currentPage', 'wedeo.me', url); //changes browser url
  }

  if( isVideoLink && isNormalWedeoPlayer ) {
    // from video page to video page (video page will be updated)
    loadVideoPage(url);
  } else if( isNormalWedeoPlayer ) {
    // from video page to not video page (video will stay open in mini player)
    wedeoPlayer.moveIntoMiniplayer();
    loadPage(url);
  } else if( fromNavigation && isVideoLink && isMiniWedeoPlayer ) {
    // from not video page BACK to video page (miniplayer video will be open again as full page)
    wedeoPlayer.backToMiniplayerVideo();
  } else if( isVideoLink && isMiniWedeoPlayer ) {
    // from not video page FORWARD to a new video (miniplayer video gets changed)
    loadVideoPage(url);
  } else {
    // from not video page (no miniplayer) to an other page (could be a video page)
    loadPage(url);
  }
}

function loadVideoPage( url ) {
  $.post( url, { 'json': true, 'from': document.location.toString() }, function(data) {
    nextPageIsLoading = false;

    document.title = data.htmlTitle;
    wedeoPlayer.setVideo(data.videoData);
    store.commit( 'setMainVideoData', data.videoData );

    activateSamePageNavigation();
  });
}

function loadPage( url ) {
  if( wedeoBgPlayer ) { videojs(wedeoBgPlayer.playerId).dispose(); wedeoBgPlayer = false; }

  $.post( url, { 'json': true, 'from': document.location.toString() }, function(data) {
    nextPageIsLoading = false;

    document.title = data.htmlTitle;

    if(data.pageType === "index") {
      store.commit( 'setSecondVideoData', data.videoData );
    } else {
      store.commit( 'setMainVideoData', data.videoData );
    }

    store.commit( 'setPage', data.pageType );
    activateSamePageNavigation();
  });
}


function dragMiniPlayer(el) {
  let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  el.addEventListener("mousedown", dragMouseDown );

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();

    pos3 = e.clientX;
    pos4 = e.clientY;

    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();

    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;

    const dragContainer   = el.parent();
    const min_pos_top     = 0;
    const min_pos_left    = 0;
    const max_pos_top     = window.innerHeight - dragContainer.height();
    const max_pos_left    = window.innerWidth - dragContainer.width() - 5; /* 5 = scrollbar */

    const offsetTop       = dragContainer.offset().top - window.scrollY;
    const offsetLeft      = dragContainer.offset().left;

    if(offsetTop - pos2 < min_pos_top) {
      dragContainer.css( "top", min_pos_top + "px" );
    } else if(offsetTop - pos2 > max_pos_top ) {
      dragContainer.css( "top", max_pos_top + "px" );
    } else {
      dragContainer.css( "top", (offsetTop - pos2) + "px" );
    }

    if(offsetLeft - pos1 < min_pos_left) {
      dragContainer.css( "left", min_pos_left + "px" );
    } else if(offsetLeft - pos1 > max_pos_left) {
      dragContainer.css( "left", max_pos_left + "px" );
    } else {
      dragContainer.css( "left", (offsetLeft - pos1) + "px" );
    }
  }

  function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

function closeMiniplayer() {
  if(wedeoPlayer !== false) {
    videojs(wedeoPlayer.playerId).dispose();
    wedeoPlayer = false;
    hideMiniplayer();
  }
}

function hideMiniplayer() {
  document.querySelector(".miniWedeoContainer").style.display = 'none';
  document.querySelector(".miniWedeoHeader .miniWedeoHeaderTitle").innerHTML = '';
}

function secondsToHms( d ) {
  if( d || d >= 0 ) {
    d = Number(d);
    const h = Math.floor(d / 3600);
    const m = Math.floor(d % 3600 / 60);
    const s = Math.floor(d % 3600 % 60);

    const hDisplay = h > 0 ? h + ":" : "";
    const mDisplay = m >= 0 ? ( h > 0 && m < 10 ? "0" + m + ":" : m + ":" ) : "0:";
    const sDisplay = s < 10 ? "0" + s : s;
    return hDisplay + mDisplay + sDisplay;
  } else {
    return "0:00";
  }
}

function deepObjCopy(obj) {
  return JSON.parse(JSON.stringify(obj));
}

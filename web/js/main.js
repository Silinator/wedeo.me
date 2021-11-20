let wedeoPlayer = false;
let wedeoBgPlayer = false;
let nextPageIsLoading = false;

document.removeEventListener( "click", clickOnLink );
document.addEventListener("click", clickOnLink );

function registerServiceWorker() {
  if('serviceWorker' in navigator) {
    navigator.serviceWorker.register('serviceWorker.js').then(function(registration) {
      // Registration was successful
    }, function(err) {
      // registration failed :(
      console.log('ServiceWorker registration failed: ', err);
    });
  }
}

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

function goToPage( url, fromNavigation = false ) {
  //closeNavi();

  store.commit( 'setPageLoading', 70 );

  const isVideoLink = ( url.startsWith("watch") || url.startsWith("w") || url.startsWith( new URL(document.baseURI).pathname + "watch/") || url.startsWith( new URL(document.baseURI).pathname + "w/") );
  const isNormalWedeoPlayer = ( wedeoPlayer && wedeoPlayer.type !== "mini" );
  const isMiniWedeoPlayer = ( wedeoPlayer && wedeoPlayer.type === "mini" );

  if( isVideoLink && isMiniWedeoPlayer ) {
    // miniWedeo got replaced
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
  axios.get( url, { params : { json: true, from: document.location.toString() } } )
  .then(response => response.data)
  .then(data => {
    nextPageIsLoading = false;

    document.title = data.htmlTitle;
    wedeoPlayer.setVideo(data.videoData);
    store.commit( 'setMainVideoData', data.videoData );

    store.commit( 'setPageLoading', 100 );
    setTimeout( () => {
      store.commit( 'setPageLoading', 0 );
    }, 100);
  });
}

function loadPage( url ) {
  if( wedeoBgPlayer ) { videojs(wedeoBgPlayer.playerId).dispose(); wedeoBgPlayer = false; }

  axios.get( url, { params : { json: true, from: document.location.toString() } } )
  .then(response => response.data)
  .then(data => {
    nextPageIsLoading = false;

    document.title = data.htmlTitle;

    if(data.pageType === "index") {
      store.commit( 'setSecondVideoData', data.videoData );
    } else {
      store.commit( 'setMainVideoData', data.videoData );
    }

    store.commit( 'setPage', data.pageType );

    store.commit( 'setPageLoading', 100 );
    setTimeout( () => {
      store.commit( 'setPageLoading', 0 );
    }, 100);
  });
}


function dragMiniPlayer(el) {
  let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  el.addEventListener("mousedown", dragMouseDown );
  el.addEventListener("touchstart", dragMouseDown );

  function dragMouseDown(e) {
    e = e || window.event;

    if(e.type === "touchstart") {
      pos3 = e.touches[0].clientX;
      pos4 = e.touches[0].clientY;

      document.ontouchend = closeDragElement;
      document.ontouchmove = elementDrag;
    } else {
      pos3 = e.clientX;
      pos4 = e.clientY;

      document.onmouseup = closeDragElement;
      document.onmousemove = elementDrag;
    }
  }

  function elementDrag(e) {
    e = e || window.event;

    if(e.type === "touchmove") {
      pos1 = pos3 - e.touches[0].clientX;
      pos2 = pos4 - e.touches[0].clientY;
      pos3 = e.touches[0].clientX;
      pos4 = e.touches[0].clientY;
      scrollbarWidth = 0;
    } else {
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      scrollbarWidth = 5;
    }

    const dragContainer   = el.parentNode;
    const min_pos_top     = 0;
    const min_pos_left    = 0;
    const containerHight  = parseFloat(getComputedStyle(dragContainer, null).height.replace("px", ""));
    const containerWidth  = parseFloat(getComputedStyle(dragContainer, null).width.replace("px", ""));
    const max_pos_top     = window.innerHeight - containerHight;
    const max_pos_left    = window.innerWidth - containerWidth - scrollbarWidth;

    const offset          = dragContainer.getBoundingClientRect();
    const offsetTop       = offset.top;
    const offsetLeft      = offset.left;

    if(offsetTop - pos2 < min_pos_top) {
      dragContainer.style.top = min_pos_top + "px";
    } else if(offsetTop - pos2 > max_pos_top ) {
      dragContainer.style.top = max_pos_top + "px";
    } else {
      dragContainer.style.top = (offsetTop - pos2) + "px";
    }

    if(offsetLeft - pos1 < min_pos_left) {
      dragContainer.style.left = min_pos_left + "px";
    } else if(offsetLeft - pos1 > max_pos_left) {
      dragContainer.style.left = max_pos_left + "px";
    } else {
      dragContainer.style.left = ( offsetLeft - pos1) + "px";
    }
  }

  function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
    document.ontouchend = null;
    document.ontouchmove = null;
  }
}

function closeMiniplayer() {
  if(wedeoPlayer !== false) {
    wedeoPlayer.topTitleApp.$destroy();
    wedeoPlayer.bottomTitleApp.$destroy();
    wedeoPlayer.sidebarApp.$destroy();
    wedeoPlayer.settingsMenuApp.$destroy();
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

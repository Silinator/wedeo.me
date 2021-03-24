/* makes seeking smooth */
{
  const SeekBar = videojs.getComponent('SeekBar')

  SeekBar.prototype.getPercent = function getPercent() {
    // Allows for smooth scrubbing, when player can't keep up.
    const time = this.player_.currentTime();
    const percent = time / this.player_.duration();
    return percent >= 1 ? 1 : percent;
  }

  SeekBar.prototype.handleMouseMove = function handleMouseMove(event) {
    let newTime = this.calculateDistance(event) * this.player_.duration();

    if( newTime === this.player_.duration() ) {
      newTime = newTime - 0.1;
    }

    this.player_.currentTime(newTime);
    this.update();
  }
}

/******/


class wedeoPlayerClass {
  constructor( playerId, options ) {
    this.URLbase      = "https://www.we-teve.com/";
    this.playerId     = playerId;
    this.defaultRes   = options.defaultResolution;
    this.playbackRate = options.playbackRate;
    this.fullscreenUi = options.fullscreenUi;
    this.availablePlaybackRates = [ 0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];
    this.availableFullscreenOptions = [ "auto", "on", "off"];
    this.inactivityTimeout = 2000;
    this.seekTime = 10;

    this.createPlayer();
  }

  createPlayer() {
    const self = this;

    this.Player = videojs( this.playerId, {
      preload: true,
      inactivityTimeout: self.inactivityTimeout,
      autoplay: "any"
    });

    if( $("#" + self.playerId).hasClass("wedeo-bg-player") ) {
      self.playerType = "background";
      self.createBackgroundPlayer();
    } else {
      self.playerType = "default";
      self.createDefaultPlayer();
    }
  }

  createDefaultPlayer() {
    const self = this;
    this.addHotkeys();
    this.addPlayerMenus();
    this.addPlayerVideoPreview();
    this.addPlayerHeader();
    this.addPlayerSidebar();
    this.addBigPlayerButtons();
    this.addPlayerTouchControls();

    this.Player.on('mouseout', function() {
      if( !self.playerSettingsMenuOpen ) { this.addClass('vjs-user-inactive'); }
    });

    this.Player.on('mouseover', function() { this.removeClass('vjs-user-inactive'); });
  }

  createBackgroundPlayer() {
    const self = this;
    $("#" + this.playerId).append( "<div class='background-player-mute-btn'></div>" );
    $("#" + this.playerId + " .background-player-mute-btn").click( function() {
      self.Player.muted(!self.Player.muted());
    });

    setTimeout(function () {
      self.Player.loop(true);
      self.Player.volume(0.5);
    }, 0);
  }

  addHotkeys() {
    const self = this;

    this.Player.ready(function() {
      this.hotkeys({
        volumeStep: 0.1,
        seekStep: 5,
        enableModifiersForNumbers: false,
        customKeys: {
          settingsMenuKey: {
            key: function(event) {
              return ( event.which === 83 || event.which === 79 ); //u
            },
            handler: function() {
              self.togglePlayerSettingsMenu(true);
            }
          },
          playerSizeKey: {
            key: function(event) {
              return (event.which === 84); //t
            },
            handler: function() {
              self.togglePlayerSize();
            }
          }
        }
      });
    });

    $('#'+this.playerId).focus();
  }

  addPlayerMenus() {
    const self = this;

    $(".vjs-custom-control-spacer").html(
      "<div class='vjs-control vjs-button vjs-settings-button' tabindex='0'><span class='material-icons'>settings</span></div>" +
      "<div class='vjs-control vjs-button vjs-size-button' tabindex='0'><span class='material-icons'>aspect_ratio</span></div>" /* crop_16_9 */
    );

    $(".vjs-settings-button").click( function() { self.togglePlayerSettingsMenu(); });

    $(".vjs-settings-button").keyup( function( event ) {
      if( event.which == 32 || event.which == 13 ) { self.togglePlayerSettingsMenu(true); }
      if( event.which == 27 ) { self.closePlayerSettingsMenu(); }
    });


    $(".vjs-size-button").click( function() { self.togglePlayerSize(); });

    $(".vjs-size-button").keyup( function( event ) {
      if( event.which == 32 || event.which == 13 ) { self.togglePlayerSize(); }
      if( event.which == 27 ) { self.closePlayerSettingsMenu(); }
    });

    $(".vjs-control-bar").after(
      "<div class='vjs-settings-menu'>" +
        "<div class='vjs-setting vjs-speed-settings'>" +
          "<div class='vjs-setting-title'>Geschwindigkeit</div>" +
          "<div class='vjs-setting-value-container'>" +
            "<div class='vjs-setting-value'>" + this.playbackRate + "</div>" +
            "<span class='material-icons'> keyboard_arrow_right </span>" +
          "</div>" +
        "</div>" +
        "<div class='vjs-setting vjs-resolution-settings'>" +
          "<div class='vjs-setting-title'>Qualität</div>" +
          "<div class='vjs-setting-value-container'>" +
            "<div class='vjs-setting-value'></div>" +
            "<span class='material-icons'> keyboard_arrow_right </span>" +
          "</div>" +
        "</div>" +
        "<div class='vjs-setting vjs-fullscreen-settings'>" +
          "<div class='vjs-setting-title'>Vollbild UI</div>" +
          "<div class='vjs-setting-value-container'>" +
            "<div class='vjs-setting-value'>Auto</div>" +
            "<span class='material-icons'> keyboard_arrow_right </span>" +
          "</div>" +
        "</div>" +
      "</div>" +
      "<div class='vjs-settings-dropdown'>" +
        "<div class='vjs-settings-dropdown-title-container'>" +
          "<span class='material-icons'> keyboard_arrow_left </span>" +
          "<div class='vjs-settings-dropdown-title'></div>" +
        "</div>" +
        "<div class='vjs-speed-settings-dropdown vjs-settings-dropdown-options'></div>" +
        "<div class='vjs-resolution-settings-dropdown vjs-settings-dropdown-options'></div>" +
        "<div class='vjs-fullscreen-settings-dropdown vjs-settings-dropdown-options'></div>" +
      "</div>"
    );

    /* speed */
    $('.vjs-speed-settings-dropdown').html( this.genDropDownOptions( this.availablePlaybackRates, this.playbackRate ) );

    $(".vjs-speed-settings").click( function() { self.openPlayerSpeedSettings(); });

    $(".vjs-speed-settings").keyup( function( event ) {
      if( event.which == 32 || event.which == 13 ) { self.openPlayerSpeedSettings(true); }
      if( event.which == 27 ) { self.closePlayerSettingsMenu(); }
    });

    $(".vjs-speed-settings-dropdown .vjs-settings-dropdown-option").click( function() {
      self.changePlaybackRate( $(this).attr("value") );
    });

    $(".vjs-speed-settings-dropdown .vjs-settings-dropdown-option").keyup( function( event ) {
      if( event.which == 32 || event.which == 13 ) { self.changePlaybackRate( $(this).attr("value") ); }
      if( event.which == 27 ) { self.closePlayerSettingsMenu(); }
    });

    /* fullscreen Ui */
    $('.vjs-fullscreen-settings-dropdown').html( this.genDropDownOptions( this.availableFullscreenOptions, this.fullscreenUi ) );

    $(".vjs-fullscreen-settings").click( function() { self.openPlayerFullscreenSettings(); });

    $(".vjs-fullscreen-settings").keyup( function( event ) {
      if( event.which == 32 || event.which == 13 ) { self.openPlayerFullscreenSettings(true); }
      if( event.which == 27 ) { self.closePlayerSettingsMenu(); }
    });

    $(".vjs-fullscreen-settings-dropdown .vjs-settings-dropdown-option").click( function() {
      self.changefullscreenUi( $(this).attr("value") );
    });

    $(".vjs-fullscreen-settings-dropdown .vjs-settings-dropdown-option").keyup( function( event ) {
      if( event.which == 32 || event.which == 13 ) { self.changefullscreenUi( $(this).attr("value") ); }
      if( event.which == 27 ) { self.closePlayerSettingsMenu(); }
    });


    $(".vjs-settings-dropdown-title-container").click( function() { self.closeDropdowns(); });

    $(".vjs-settings-dropdown-title-container").keyup( function( event ) {
      if( event.which == 32 || event.which == 13 ) { self.closeDropdowns(true); }
      if( event.which == 27 ) { self.closePlayerSettingsMenu(); }
    });
  }

  addPlayerSidebar() {
    $('.vjs-control-bar').before(
      "<div class='vjs-sidebar'>" +
        "<div class='vjs-sidebar-content'>" +
          "<div class='vjs-rating'>" +
            "<div class='vjs-rating-vote vjs-button vjs-rating-upvote'>" +
              "<span class='material-icons'>thumb_up_off_alt</span>" +
            "</div>" +
            "<div class='vjs-rating-percent'></div>" +
            "<div class='vjs-rating-vote vjs-button vjs-rating-downvote'>" +
              "<span class='material-icons'>thumb_down_off_alt</span>" +
            "</div>" +
          "</div>" +
          "<div class='vjs-share-buttons'>" +
            "<div class='vjs-share-button vjs-button vjs-add-playlist'>" +
              "<span class='material-icons'>playlist_add</span>" +
            "</div>" +
            "<div class='vjs-share-button vjs-button vjs-recommend'>" +
              "<span class='weicon-lightbulb'></span>" +
            "</div>" +
            "<div class='vjs-share-button vjs-button vjs-share'>" +
              "<span class='weicon-share'></span>" +
            "</div>" +
            "<div class='vjs-share-button vjs-button vjs-download'>" +
              "<span class='weicon-file_download'></span>" +
            "</div>" +
          "</div>" +
        "</div>" +
      "</div>"
    );
  }

  addPlayerHeader() {
    $('.vjs-control-bar').before("<div class='vjs-header'><div class='vjs-header-title'></div></div>");
  }

  addBigPlayerButtons() {
    const self = this;

    $('.vjs-control-bar').before(
      "<div class='vjs-big-buttons'>" +
        "<div class='vjs-big-button vjs-big-button-rewind-video' data-time='0'>" +
          "<span class='material-icons'>fast_rewind</span>" +
        "</div>" +
        "<div class='vjs-big-button vjs-big-button-core vjs-big-button-previous-video'>" +
        "<span class='material-icons'> skip_previous </span>" +
        "</div>" +
        "<div class='vjs-big-button vjs-big-button-core vjs-big-button-state-video vjs-big-button-pause-video'>" +
          "<span class='material-icons'>pause</span>" +
        "</div>" +
        "<div class='vjs-big-button vjs-big-button-core vjs-big-button-next-video'>" +
        "<span class='material-icons'>skip_next</span>" +
        "</div>" +
        "<div class='vjs-big-button vjs-big-button-forward-video' data-time='0'>" +
          "<span class='material-icons'>fast_forward</span>" +
        "</div>" +
      "</div>"
    );

    this.Player.on( 'pause', function() {
      $('.vjs-big-button-state-video').removeClass('vjs-big-button-pause-video');
      $('.vjs-big-button-state-video').addClass('vjs-big-button-play-video');
      $('.vjs-big-button-state-video .material-icons').html('play_arrow');
    });

    this.Player.on( 'play', function() {
      $('.vjs-big-button-state-video').removeClass('vjs-big-button-play-video');
      $('.vjs-big-button-state-video').addClass('vjs-big-button-pause-video');
      $('.vjs-big-button-state-video .material-icons').html('pause');
    });
  }

  addPlayerTouchControls() {
    if( window.matchMedia("(pointer: coarse)").matches ) {
      const self = this;
      let tappedRewind = false;
      let tappedForward = false;
      let rewindTime = 0;
      let forwardTime = 0;

      $('.vjs-control-bar').before(
        "<div class='vjs-big-skip-buttons'>" +
          "<div class='vjs-big-skip-button vjs-big-skip-button-rewind'></div>" +
          "<div class='vjs-big-skip-button vjs-big-skip-button-forward'></div>" +
        "</div>"
      );

      $('.vjs-big-button-state-video').bind( 'touchend', function() {
        if( $(this).hasClass('vjs-big-button-pause-video') ) { self.pause(); }
        if( $(this).hasClass('vjs-big-button-play-video') ) { self.play(); }
      });

      $('#'+this.playerId + ' .vjs-big-skip-button-rewind').on( 'touchstart', function(e) {
          if( !tappedRewind ) {
            tappedRewind = setTimeout( function() { resetTouchSeeking(); }, 300 );
          } else {
            clearTimeout( tappedRewind );
            tappedRewind = setTimeout( function() { resetTouchSeeking(); }, 300 );

            rewindTime = rewindTime + self.seekTime;
            $('#'+self.playerId+' .vjs-big-button').css('opacity', 0);
            $('#'+self.playerId+' .vjs-big-button-rewind-video').attr('data-time', "- " + rewindTime);
            $('#'+self.playerId+' .vjs-big-button-rewind-video').css('opacity', 1);
            self.seekBackward();
          }
      });

      $('#'+this.playerId + ' .vjs-big-skip-button-forward').on( 'touchstart', function(e) {
          if( !tappedForward ) {
            tappedForward = setTimeout( function() { resetTouchSeeking(); }, 300 );
          } else {
            clearTimeout( tappedForward );
            tappedForward = setTimeout( function() { resetTouchSeeking(); }, 300 );

            forwardTime = forwardTime + self.seekTime;
            $('#'+self.playerId+' .vjs-big-button').css('opacity', 0);
            $('#'+self.playerId+' .vjs-big-button-forward-video').attr('data-time', "+ " + forwardTime);
            $('#'+self.playerId+' .vjs-big-button-forward-video').css('opacity', 1);

            self.seekForward();
          }
      });

      function resetTouchSeeking() {
        tappedRewind = null;
        tappedForward = null;
        rewindTime = 0;
        forwardTime = 0;
        $('#'+self.playerId+' .vjs-big-button').attr('style', '');
        $('#'+self.playerId+' .vjs-big-button-rewind-video').attr('data-time', "0");
        $('#'+self.playerId+' .vjs-big-button-forward-video').attr('data-time', "0");
      }
    }
  }

  addPlayerVideoPreview() {
    const self = this;
    $('.vjs-progress-control').append("<div class='vjs-small-video-preview'></div>");
    $('.vjs-progress-control').append("<div class='vjs-small-time-preview'></div>");

    this.Player.on( 'seeking', function() {
      if( !$('.vjs-progress-control').is(":hover") ) {
        const maxWidth = $('.vjs-progress-control').width();
        const hoverTime = Math.floor( self.Player.currentTime() );
        const hoverPosFromLeft = Math.floor( maxWidth * (hoverTime / self.Player.duration()) );
        self.updatePlayerVideoPreview( hoverTime, hoverPosFromLeft, maxWidth );
      }
    });

    $('.vjs-progress-control').bind( 'mousemove', function(e) {
      const offset = $(this).offset();
      const hoverPosFromLeft = e.pageX - offset.left;
      const maxWidth = $('.vjs-progress-control').width();
      const maxTime = self.Player.duration();
      const hoverTime = Math.floor( maxTime / ( maxWidth / hoverPosFromLeft ) );
      self.updatePlayerVideoPreview( hoverTime, hoverPosFromLeft, maxWidth );
    });

    $('.vjs-progress-control').bind( 'touchmove', function(e) {
      $('.vjs-small-video-preview').show();
      $('.vjs-small-time-preview').css('display', 'flex');
      const touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
      const offset = $(this).offset();
      const hoverPosFromLeft = touch.pageX - offset.left;
      const maxWidth = $('.vjs-progress-control').width();
      const maxTime = self.Player.duration();
      const hoverTime = Math.floor( maxTime / ( maxWidth / hoverPosFromLeft ) );
      self.updatePlayerVideoPreview( hoverTime, hoverPosFromLeft, maxWidth );
    });

    $('.vjs-progress-control').bind( 'touchend', function() {
      $('.vjs-small-video-preview').hide();
      $('.vjs-small-time-preview').hide();
    });
  }

  updatePlayerVideoPreview( hoverTime, hoverPosFromLeft, maxWidth ) {
    const hoverImgTime = hoverTime + 4; // the preview is off by about 4s. idk why...

    //set img posi
    const imgSize = $('.vjs-small-video-preview').width();
    const halfImgSize = imgSize / 2;
    let newImgPos = hoverPosFromLeft - halfImgSize;
      if( newImgPos < 0 ){ newImgPos = 0; }
      if( newImgPos + imgSize > maxWidth ){ newImgPos = maxWidth - imgSize; }

    $('.vjs-small-video-preview').css('left', newImgPos);

    //set time posi
    const timeSize = $('.vjs-small-time-preview').width() + 8;
    const halfTimeSize = timeSize / 2;
    let newTimePos = hoverPosFromLeft - halfTimeSize;
      const videoPadding = halfImgSize - halfTimeSize;
      if( newTimePos < videoPadding ){ newTimePos = videoPadding; }
      if( newTimePos + timeSize > maxWidth - videoPadding ){ newTimePos = maxWidth - timeSize - videoPadding; }

    const displayTime = this.secondsToHms(hoverTime);
    $('.vjs-small-time-preview').html(displayTime);
    $('.vjs-small-time-preview').css('left', newTimePos);

    const getSingleImg = Math.floor( hoverImgTime / 5 / 20 );
    const getImgPreview = getSingleImg + 1;
    const getImg = Math.floor( hoverImgTime / 5 - getSingleImg * 20 );

    let imgPos;
    switch( getImg ) {
      case 1: imgPos = '-80em 0px'; break;     case 2: imgPos = '-96em 0px'; break;     case 3: imgPos = '-112em 0px'; break;    case 4: imgPos = '-128em 0px'; break;    case 5: imgPos = '-144em 0px'; break;
      case 6: imgPos = '-80em -9em'; break;    case 7: imgPos = '-96em -9em'; break;    case 8: imgPos = '-112em -9em'; break;   case 9: imgPos = '-128em -9em'; break;   case 10: imgPos = '-144em -9em'; break;
      case 11: imgPos = '-80em -18em'; break;  case 12: imgPos = '-96em -18em'; break;  case 13: imgPos = '-112em -18em'; break; case 14: imgPos = '-128em -18em'; break; case 15: imgPos = '-144em -18em'; break;
      case 16: imgPos = '-80em -27em'; break;  case 17: imgPos = '-96em -27em'; break;  case 18: imgPos = '-112em -27em'; break; case 19: imgPos = '-128em -27em'; break; case 20: imgPos = '-144em -27em'; break;
      default: imgPos = '-80em 0px';
    }

    if( getImgPreview ) {
      $('.vjs-small-video-preview').css( 'background-image', 'url(' + this.URLbase + 'images/thumb/preview/' + this.meta.vuid + '/pre' + getImgPreview + '.jpg)' );
      $('.vjs-small-video-preview').css( 'background-position', imgPos );
    }
  }

  secondsToHms( d ) {
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

  genDropDownOptions( array, active ) {
    let options = "";
    for( let i = 0; i < array.length; i++ ) {
      const opt = array[i];
      const activeOption = ( active == opt ? "active" : "" );

      options += "<div class='vjs-settings-dropdown-option " + activeOption + "' value='" + opt + "' >" + opt + "</div>";
    }

    return options;
  }

  /* menu events */
  togglePlayerSettingsMenu( key = false ) {
    this.playerSettingsMenuOpen ? this.closePlayerSettingsMenu() : this.openPlayerSettingsMenu(key);
  }

  openPlayerSettingsMenu( key = false ) {
    const self = this;
    this.playerSettingsMenuOpen = true;
    $('#'+this.playerId).addClass('vjs-open-menu');
    $('.vjs-settings-menu').css('display', 'flex');
    $('.vjs-setting').attr('tabindex',0);

    $(document).unbind('mouseup touchend').bind( 'mouseup touchend', function( e ) {
        const container = $(".vjs-settings-menu, .vjs-settings-button, .vjs-settings-dropdown");

        if( !container.is(e.target) && container.has(e.target).length === 0 ) {
          self.closePlayerSettingsMenu();
        }
    });

    if( key ) {
      $('.vjs-speed-settings').focus();
    }
  }

  closePlayerSettingsMenu() {
    this.playerSettingsMenuOpen = false;
    $('#'+this.playerId).removeClass('vjs-open-menu');
    this.closeDropdowns();
    $('.vjs-settings-menu').hide();

    $('.vjs-setting').attr('tabindex','');
    $('#'+this.playerId).focus();
    $(document).unbind( 'mouseup');
  }

  openPlayerSpeedSettings( key = false ) {
    this.PlayerSpeedSettingsOpen = true;
    $('.vjs-settings-menu').hide();
    $('.vjs-settings-dropdown-title').html( $('.vjs-speed-settings .vjs-setting-title').html() );
    $('.vjs-settings-dropdown').css('display', 'flex');
    $('.vjs-speed-settings-dropdown').css('display', 'flex');

    this.selectDropdownMenu(key);
  }

  openPlayerResolutionSettings( key = false ) {
    this.PlayerResolutionSettingsOpen = true;
    $('.vjs-settings-menu').hide();
    $('.vjs-settings-dropdown-title').html( $('.vjs-resolution-settings .vjs-setting-title').html() );
    $('.vjs-settings-dropdown').css('display', 'flex');
    $('.vjs-resolution-settings-dropdown').css('display', 'flex');

    this.selectDropdownMenu(key);
  }

  openPlayerFullscreenSettings( key = false ) {
    this.closePlayerFullscreenSettingsOpen = true;
    $('.vjs-settings-menu').hide();
    $('.vjs-settings-dropdown-title').html( $('.vjs-fullscreen-settings .vjs-setting-title').html() );
    $('.vjs-settings-dropdown').css('display', 'flex');
    $('.vjs-fullscreen-settings-dropdown').css('display', 'flex');

    this.selectDropdownMenu(key);
  }

  selectDropdownMenu( key ) {
    $('.vjs-settings-dropdown-title-container').attr('tabindex',0);
    $('.vjs-settings-dropdown-option').attr('tabindex',0);

    if( key ) {
      if( this.PlayerSpeedSettingsOpen ) { $('.vjs-speed-settings-dropdown .vjs-settings-dropdown-option:first').focus(); }
      if( this.PlayerResolutionSettingsOpen ) { $('.vjs-resolution-settings-dropdown .vjs-settings-dropdown-option:first').focus(); }
      if( this.closePlayerFullscreenSettingsOpen ) { $('.vjs-fullscreen-settings-dropdown .vjs-settings-dropdown-option:first').focus(); }
    }
  }

  closePlayerSpeedSettings( key ) {
    this.PlayerSpeedSettingsOpen = false;
    if( key ){ $('.vjs-speed-settings').focus(); }
  }
  closePlayerResolutionSettings( key ) {
    this.PlayerResolutionSettingsOpen = false;
    if( key ){ $('.vjs-resolution-settings').focus(); }
  }
  closePlayerFullscreenSettings( key ) {
    this.closePlayerFullscreenSettingsOpen = false;
    if( key ){ $('.vjs-fullscreen-settings').focus(); }
  }

  closeDropdowns( key = false ) {
    $('.vjs-settings-dropdown').hide();
    $('.vjs-settings-dropdown-options').hide();
    $('.vjs-settings-menu').css('display', 'flex');

    $('.vjs-settings-dropdown-title-container').attr('tabindex','');
    $('.vjs-settings-dropdown-option').attr('tabindex','');

    if( this.PlayerSpeedSettingsOpen ) { this.closePlayerSpeedSettings(key); }
    if( this.PlayerResolutionSettingsOpen ) { this.closePlayerResolutionSettings(key); }
    if( this.closePlayerFullscreenSettingsOpen ) { this.closePlayerFullscreenSettings(key); }
  }

  togglePlayerSize() {
    console.log( "toggle size" );
  }


  setVideo( meta ) {
    const self = this;
    this.meta = meta;

    this.media = {
      poster: this.URLbase + '/images/thumb/large_img/' + this.meta.vuid + '.jpg',
      src: this.URLbase + '/videos/' + this.meta.datavuid + '/' + this.defaultRes + ".mp4"
    };

    this.Player.loadMedia(this.media);
    this.Player.playbackRate(this.playbackRate);
    this.updatePlayerSettingsMenu();
    this.updatePlayerTitle();
    this.updatePlayerRating();

    if('mediaSession' in navigator) {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: this.meta.title,
        artist: this.meta.user.name,
        artwork: [
          { src: this.URLbase + '/images/thumb/small_img/' + this.meta.vuid + '.jpg', sizes: '320x180', type: 'image/png' }
        ]
      });

      navigator.mediaSession.setActionHandler('play', function() { self.play(); });
      navigator.mediaSession.setActionHandler('pause', function() { self.pause(); });
      navigator.mediaSession.setActionHandler('seekbackward', function() { self.seekBackward(); });
      navigator.mediaSession.setActionHandler('seekforward', function() { self.seekForward(); });
      navigator.mediaSession.setActionHandler('previoustrack', function() {});
      navigator.mediaSession.setActionHandler('nexttrack', function() {});
    }
  }

  play(){ this.Player.play(); }
  pause(){ this.Player.pause(); }
  seekBackward(){ this.Player.currentTime( this.Player.currentTime() - this.seekTime ); }
  seekForward(){ this.Player.currentTime( this.Player.currentTime() + this.seekTime ); }

  updatePlayerSettingsMenu() {
    const self = this;
    $('.vjs-resolution-settings .vjs-setting-value').html( this.defaultRes );
    $('.vjs-resolution-settings-dropdown').html( this.genDropDownOptions( this.meta.availableSources.reverse(), this.defaultRes ) );

    $(".vjs-resolution-settings").unbind('click').bind( 'click', function() { self.openPlayerResolutionSettings(); });

    $(".vjs-resolution-settings").keyup( function( event ) {
      if( event.which == 32 || event.which == 13 ) { self.openPlayerResolutionSettings(true); }
      if( event.which == 27 ) { self.closePlayerSettingsMenu(); }
    });

    $(".vjs-resolution-settings-dropdown .vjs-settings-dropdown-option").unbind('click').bind( 'click', function() {
      self.changeSource( $(this).attr("value") );
    });

    $(".vjs-resolution-settings-dropdown .vjs-settings-dropdown-option").keyup( function( event ) {
      if( event.which == 32 || event.which == 13 ) { self.changeSource( $(this).attr("value") ); }
      if( event.which == 27 ) { self.closePlayerSettingsMenu(); }
    });
  }

  updatePlayerTitle() {
    $('.vjs-header-title').html(this.meta.title);
  }

  updatePlayerRating() {
    $('.vjs-rating-percent').html( this.meta.rating[0] == 0 ? "0%" : Math.floor( this.meta.rating[0] / ( this.meta.rating[0] + this.meta.rating[1] ) * 100 ) + "%" );
  }

  changeSource( resolution ) {
    const self = this;

    if( this.defaultRes != resolution ) {
      this.defaultRes = resolution;
      const currentTime = this.Player.currentTime();
      const videoIsPlaused = this.Player.paused();
      const isVideoMuted = this.Player.muted();
      const fileType = ( this.defaultRes == "audio" ? ".mp3" : ".mp4" );

      this.Player.muted(true);
      this.Player.pause();

      this.Player.src( this.URLbase + '/videos/' + this.meta.datavuid  + '/' + this.defaultRes + fileType );

      this.Player.currentTime(currentTime);
      this.Player.play();

      if( !isVideoMuted ){ this.Player.muted(false) };

      if( videoIsPlaused ) {
        this.Player.on('playing', () => {
          self.Player.pause();
          self.Player.playbackRate(self.playbackRate);
          self.Player.off('playing')
        });
      } else {
        this.Player.on('playing', () => {
          self.Player.playbackRate(self.playbackRate);
          self.Player.off('playing')
        });
      }

      $('.vjs-resolution-settings .vjs-setting-value').html(resolution);
      $('.vjs-resolution-settings-dropdown .vjs-settings-dropdown-option').removeClass('active');
      $('.vjs-resolution-settings-dropdown .vjs-settings-dropdown-option[value="' + resolution + '"]').addClass('active');
    }

    this.closePlayerSettingsMenu();
  }

  changePlaybackRate( playbackRate ) {
    if( this.playbackRate != playbackRate ) {
      this.playbackRate = playbackRate;
      this.Player.playbackRate(this.playbackRate);

      $('.vjs-speed-settings .vjs-setting-value').html(playbackRate);
      $('.vjs-speed-settings-dropdown .vjs-settings-dropdown-option').removeClass('active');
      $('.vjs-speed-settings-dropdown .vjs-settings-dropdown-option[value="' + playbackRate + '"]').addClass('active');
    }

    this.closePlayerSettingsMenu();
  }

  changefullscreenUi( fullscreenUi ) {
    if( this.fullscreenUi != fullscreenUi ) {
      this.fullscreenUi = fullscreenUi;

      $('.vjs-fullscreen-settings .vjs-setting-value').html(fullscreenUi);
      $('.vjs-fullscreen-settings-dropdown .vjs-settings-dropdown-option').removeClass('active');
      $('.vjs-fullscreen-settings-dropdown .vjs-settings-dropdown-option[value="' + fullscreenUi + '"]').addClass('active');
    }

    this.closePlayerSettingsMenu();
  }
}

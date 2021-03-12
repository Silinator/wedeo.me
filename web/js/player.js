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
  constructor( playerId, defaultResolution ) {
    this.URLbase      = "https://www.we-teve.com/";
    this.playerId     = playerId;
    this.defaultRes   = defaultResolution;

    this.createPlayer();
  }

  createPlayer() {
    const self = this;

    this.Player = videojs( this.playerId, {
      preload: true,
      inactivityTimeout: 1000,
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
    this.addHotkeys();
  }

  createBackgroundPlayer() {
    const self = this;
    $("#" + this.playerId).append( "<div class='backgrpund-player-mute-btn'></div>" );
    $("#" + this.playerId  + " .backgrpund-player-mute-btn").click( function(){
      self.Player.muted(!self.Player.muted());
    });

    setTimeout(function () { self.Player.volume(  0.5 ); }, 0);
  }

  addHotkeys() {
    this.Player.ready(function() {
      this.hotkeys({
        volumeStep: 0.1,
        seekStep: 5,
        enableModifiersForNumbers: false
      });
    });
  }

  setVideo( vuid, datavuid ) {
    this.vuid = vuid;
    this.datavuid = datavuid;

    this.media = {
      poster: this.URLbase + '/images/thumb/large_img/' + this.vuid + '.jpg',
      src: this.URLbase + '/videos/' + this.datavuid + '/' + this.defaultRes
    };

    this.Player.loadMedia(this.media);
  }

  changeSource( resolution ) {
    this.defaultRes = resolution;
    const p = this.Player;
    const currentTime = p.currentTime();
    const videoIsPlaused = p.paused();
    const isVideoMuted = p.muted();

    p.muted(true);
    p.pause();
    p.src( this.URLbase + '/videos/' + this.datavuid  + '/' + this.defaultRes );

    p.load();
    p.pause();

    p.currentTime( currentTime );
    p.play();

    if( !isVideoMuted ){ p.muted(false) };

    if( videoIsPlaused ) {
      setTimeout( function() {
        p.pause();
      }, 150); /* how long it usually takes to play the video to not interrupt that */
    }
  }

  changePlayback( playbackRate ) {
    this.playbackRate = playbackRate;
    this.Player.playbackRate(this.playbackRate);
  }
}

/* makes seeking smooth */
{
  const SeekBar = videojs.getComponent('SeekBar')

var Player = videojs('wedeo-player', {
  poster: 'https://www.we-teve.com/images/thumb/large_img/ZL7CM0Rd.jpg',
  sources: [{
    src: 'https://www.we-teve.com/videos/JnhdhWTGOaCFMzPPAca0JkDyW/1080p.mp4',
    type: 'video/mp4'
  }],
  playbackRates: [0.5, 1, 1.5, 2],
  preload: true,
  inactivityTimeout: 700,
  autoplay: true
});

Player.ready(function() {
  this.hotkeys({
    volumeStep: 0.1,
    seekStep: 5,
    enableModifiersForNumbers: false
  });
});

function ChangeSource() {
  const currentTime = Player.currentTime();
  const videoIsPlaused = Player.paused();
  const isVideoMuted = Player.muted();

  Player.muted(true);
  Player.pause();
  Player.src( "https://www.we-teve.com/videos/rbhAs49EhXbxNgW8QJNkbdJcW/1080p.mp4" );

  Player.load();
  Player.pause();

  Player.currentTime( currentTime );
  Player.play();

  if( !isVideoMuted ){ Player.muted(false) };

  if( videoIsPlaused ) {
    setTimeout( function() {
        Player.pause();
    }, 150); /* how long it usually takes to play the video to not interrupt that */
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


  }
}


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
  }
}


var Player = videojs('wedeo-player', {
  autoplay: true
});

Player.ready(function() {
  this.hotkeys({
    volumeStep: 0.1,
    seekStep: 5,
    enableModifiersForNumbers: false
  });
});

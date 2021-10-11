Vue.component( 'watch', {
  template: `
  <div class='mainWedeoContainer'>
    <div class='wedeoContainer'>
      <video id="wedeo-player" class="wedeo-player video-js cover" controls></video>
    </div>

    <wedeoSideContainer/>
  </div>
  `,
  computed: {
    videoData() {
      return this.$store.state.mainVideoData;
    }
  },
  mounted() {
    if( $('.miniWedeo').html() === "" ) {
      wedeoPlayer = new wedeoPlayerClass( 'wedeo-player' );
      wedeoPlayer.addSizeButton();
      wedeoPlayer.setVideo( this.videoData );
      window.onresize = function() { wedeoPlayer.resizeWedeo(); };

      wedeoPlayer.resizeWedeo();
      this.$store.commit( 'setWedeoPlayer', wedeoPlayer );
    } else {
      $('.mainContainer .mainWedeoContainer .wedeoContainer').html( $(".miniWedeoContainer .miniWedeo .wedeoContainer") );
      wedeoPlayer.resizeWedeo();
    }
  }
});
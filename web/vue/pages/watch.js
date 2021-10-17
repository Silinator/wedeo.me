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
    },
    wedeoPlayer() {
      return this.$store.state.wedeoPlayer;
    }
  },
  mounted() {
    if( document.querySelector(' .miniWedeo').innerHTML === "" ) {
      wedeoPlayer = new wedeoPlayerClass( 'wedeo-player' );
      wedeoPlayer.addSizeButton();
      wedeoPlayer.setVideo( this.videoData );
      window.onresize = function() { wedeoPlayer.resizeWedeo(); };

      wedeoPlayer.resizeWedeo();
      this.$store.commit( 'setWedeoPlayer', wedeoPlayer );
    } else {
      document.querySelector(".mainContainer .mainWedeoContainer .wedeoContainer").innerHTML = "";
      document.querySelector(".mainContainer .mainWedeoContainer .wedeoContainer").appendChild( document.querySelector(".miniWedeoContainer .miniWedeo .wedeoContainer .wedeo-player") );

      this.wedeoPlayer.resizeWedeo();
    }
  }
});
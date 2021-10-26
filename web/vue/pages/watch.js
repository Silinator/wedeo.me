Vue.component( 'watch', {
  template: `
  <div class='mainWedeoContainer flex justify-between w-screen gap-5 max-w-full mt-16 pt-4 pr-4 pb-11 pl-4 overflow-x-hidden'>
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
    if( typeof this.wedeoPlayer.type === "undefined" || this.wedeoPlayer.type === "mini" ) {
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
Vue.component( 'index', {
  template: `
  <div class='indexContainer'>
    <video id="wedeo-bg-player" class="wedeo-bg-player video-js" controls></video>
    <allVideos/>
  </div>
  `,
  computed: {
    videoData() {
      return this.$store.state.secondVideoData;
    }
  },
  mounted() {
    wedeoBgPlayer = new wedeoPlayerClass( 'wedeo-bg-player' );
    wedeoBgPlayer.setVideo(this.videoData);

    const shortVideoInfo = new Vue({
      el: '#shortVideoInfo',
      store,
      template: `<shortVideoInfo/>`
    });
  }
});
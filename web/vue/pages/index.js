Vue.component( 'index', {
  template: `
  <div class='indexContainer'>
    <video id="wedeo-bg-player" class="wedeo-bg-player video-js" controls></video>
    <allVideos/>
  </div>
  `,
  computed: {
    bgVideoData() {
      return this.$store.state.bgVideoData;
    }
  },
  mounted() {
    wedeoBgPlayer = new wedeoPlayerClass( 'wedeo-bg-player' );
    wedeoBgPlayer.setVideo(this.bgVideoData);

    const shortVideoInfo = new Vue({
      el: '#shortVideoInfo',
      store,
      template: `<shortVideoInfo/>`
    });
  }
});
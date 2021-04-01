Vue.component( 'allVideos', {
	props: [ 'customerId', 'sections', 'data', 'thunderforest_url' ],
	data: function() {
		return {
		}
	},
  template: `
    <div class='allVideosContainer'>
      <thumb v-for="video in videos" :key="video.vuid" :videoData="video"/>
    </div>
  `,
  computed: {
		videos: function() {
			return this.$store.state.videos;
  	}
  },
  created() {
    this.$store.dispatch('fetchVideos');
  },
  mounted() {

  }
});

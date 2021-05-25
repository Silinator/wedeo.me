Vue.component( 'allVideos', {
	props: [ 'customerId', 'sections', 'data', 'thunderforest_url' ],
	data: function() {
		return {
		}
	},
  template: `
    <div class='allVideosContainer'>
			<h1>{{t('ALL_VIDEOS')}}</h1><br>
			<div class='allVideosList'>
      	<thumb v-for="video in videos" :key="video.uvid" :videoData="video"/>
			</div>
    </div>
  `,
  computed: {
		videos: function() {
			return this.$store.state.videos;
  	}
  },
  created() {
    this.$store.dispatch('fetchVideos');
  }
});

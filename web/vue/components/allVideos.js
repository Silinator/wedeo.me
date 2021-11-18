Vue.component( 'allVideos', {
	props: [ 'customerId', 'sections', 'data', 'thunderforest_url' ],
	data: function() {
		return {
		}
	},
  template: `
    <div class='allVideosContainer w-100 sm:pl-12 sm:pr-12'>
			<h1 class='text-white flex w-full mt-8 pl-4 sm:pl-0 pr-4 sm:pr-0'>{{this.$store.getters.t('ALL_VIDEOS')}}</h1><br>
			<div class='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-8 sm:justify-between w-full mb-24;'>
        <div v-for="video in videos">
          <thumb :key="video.uvid" :videoData="video"/>
          <div class="flex flex-col p-1 pl-2 pr-2 sm:p1 sm:pl-1 sm:pr-1">
            <a :href="'watch/'+video.uvid" class="overflow-hidden overflow-ellipsis whitespace-nowrap" :title="video.title">{{video.title}}</a>
            <div class="flex flex-row justify-between">
              <a :href="'user/'+video.user.name" class="text-gray-400 text-sm">{{video.user.name}}</a>
              <div class="text-gray-400 text-sm">{{video.publishDate}}</div>
            </div>
          </div>
        </div>
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

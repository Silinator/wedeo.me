Vue.component( 'wedeoSideInfo', {
  template: `
    <div class='flex flex-col h-full'>
			<h2>{{this.$store.getters.t('PUBLISHED_ON', this.uploadDate)}}</h2>
			<userPreview :userInfo="videoData.user"/>
      <p class="flex flex-col pb-2 h-auto break-words overflow-y-auto overflow-x-hidden" v-html="description"></p>
      <div class="wedeoSideShortInfo">
        <div class="text-gray-300">{{this.$store.getters.t('CAT_MAIN')}}:</div> <div>{{videoCategoryFull}}</div>
        <div class="text-gray-300">{{this.$store.getters.t('LANG_MAIN')}}:</div> <div>{{videoLanguageFull}}</div>
      </div>
    </div>
  `,
  computed: {
		videoData() {
			return this.$store.state.mainVideoData;
		},
    videoCategoryFull() {
      return this.$store.getters.t('CAT_' + this.videoData.category.toUpperCase() );
    },
    videoLanguageFull() {
      return this.$store.getters.t('LANG_' + this.videoData.language.toUpperCase() );
    },
		uploadDate() {
			return moment.unix(this.videoData.publishDate).format("DD.MM.YYYY");
		},
		description() {
			return this.videoData.description;
		}
  }
});

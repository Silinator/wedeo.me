Vue.component( 'wedeoSideInfo', {
  template: `
    <div class='wedeoSideInfo'>
			<h2>{{this.$store.getters.t('PUBLISHED_ON', this.uploadDate)}}</h2>
			<userPreview :userInfo="videoInfo.user"/>
      <p class="wedeoSideInfoDescription" v-html="description"></p>
      <div class="wedeoSideShortInfo">
        <div class="wedeoSideShortInfoTitle">{{this.$store.getters.t('CAT_MAIN')}}:</div> <div>{{videoCategoryFull}}</div>
        <div class="wedeoSideShortInfoTitle">{{this.$store.getters.t('LANG_MAIN')}}:</div> <div>{{videoLanguageFull}}</div>
      </div>
    </div>
  `,
  computed: {
		videoInfo() {
			return this.$store.state.currentVideoInfo;
		},
    videoCategoryFull() {
      return this.$store.getters.t('CAT_' + this.videoInfo.category.toUpperCase() );
    },
    videoLanguageFull() {
      return this.$store.getters.t('LANG_' + this.videoInfo.language.toUpperCase() );
    },
		uploadDate() {
			return moment.unix(this.videoInfo.publishDate).format("DD.MM.YYYY");
		},
		description() {
			return this.videoInfo.description;
		}
  }
});

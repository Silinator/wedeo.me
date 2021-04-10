Vue.component( 'wedeoSideInfo', {
  data: function() {
    return {
      activeTab: "comments",
    }
  },
  template: `
    <div class='wedeoSideInfo'>
			<h2>{{t('PUBLISHED_ON', this.uploadDate)}}</h2>
			<userPreview :userInfo="videoInfo.user"/>
      <div class="wedeoSideInfoDescription" v-html="description">
    </div>
  `,
  computed: {
		videoInfo() {
			return this.$store.state.currentVideoInfo;
		},
		uploadDate() {
			return moment.unix(this.videoInfo.publishDate).format("DD.MM.YYYY");
		},
		description() {
			return this.videoInfo.description;
		}
  },
  methods: {
    changeActiveTab( tab ) {
      this.activeTab = tab;
    },
    headerBtnClass( tab ) {
      return "wedeoSideContainerHeaderBtn noSel " + ( tab == this.activeTab ? "active" : "" );
    }
  },
  mounted() {
  }
});

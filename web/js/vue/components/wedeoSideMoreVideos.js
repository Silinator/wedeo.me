Vue.component( 'wedeoSideMoreVideos', {
	props: [ 'Player', 'videoData' ],
  data: function() {
    return {
      activeTab: "comments",
    }
  },
  template: `
    <div class='wedeoSideMoreVideos'>
			More Videos
    </div>
  `,
  computed: {
		videoInfo() {
			return this.$store.state.currentVideoInfo;
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

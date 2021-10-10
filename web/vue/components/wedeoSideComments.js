Vue.component( 'wedeoSideComments', {
  data: function() {
    return {
      activeTab: "comments",
    }
  },
  template: `
    <div class='wedeoSideComments'>
			Comments
    </div>
  `,
  computed: {
		videoData() {
			return this.$store.state.mainVideoData;
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

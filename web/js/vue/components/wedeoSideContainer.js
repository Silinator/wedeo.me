Vue.component( 'wedeoSideContainer', {
  data: function() {
    return {
      activeTab: "comments",
    }
  },
  template: `
    <div class='wedeoSideContainer'>
      <div class='wedeoSideContainerHeader'>
        <div :class='headerBtnClass("comments")' v-on:click='changeActiveTab("comments")'><span class="material-icons">chat_bubble_outline</span></div>
        <div :class='headerBtnClass("info")' v-on:click='changeActiveTab("info")'><span class='weicon-info'></span></div>
        <div :class='headerBtnClass("moreVideos")' v-on:click='changeActiveTab("moreVideos")'><span class="material-icons">theaters</span></div>
      </div>
			<div class='wedeoSideContainerHeaderLine' :style="linePosition"></div>
			<div class='wedeoSideContent'>
				<wedeoSideComments v-show='activeTab === "comments"'/>
				<wedeoSideInfo v-show='activeTab === "info"'/>
				<wedeoSideMoreVideos v-show='activeTab === "moreVideos"'/>
			</div>
    </div>
  `,
  computed: {
		wedeoPlayer() {
			return this.$store.state.wedeoPlayer;
		},
		linePosition() {
			switch (this.activeTab) {
				case 'comments': 		return "left: 0"; 	break;
				case 'info': 				return "left: 33%";	break;
				case 'moreVideos':	return "left: 66%"; break;
			}
		}
  },
  methods: {
    changeActiveTab( tab ) {
      this.activeTab = tab;
    },
    headerBtnClass( tab ) {
      return "wedeoSideContainerHeaderBtn noSel " + ( tab === this.activeTab ? "active" : "" );
    }
  },
  mounted() {
    this.wedeoPlayer.resizeWedeo();
  }
});

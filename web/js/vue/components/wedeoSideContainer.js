Vue.component( 'wedeoSideContainer', {
  data: function() {
    return {
      activeTab: "comments",
    }
  },
  template: `
    <div class='wedeoSideContainer'>
      <div class='wedeoSideContainerHeader'>
        <div v-if="inPlaylist" :class='headerBtnClass("playlist")'@click='changeActiveTab("playlist")'><span class="material-icons">view_list</span></div>
        <div :class='headerBtnClass("comments")' @click='changeActiveTab("comments")'><span class="material-icons">chat_bubble_outline</span></div>
        <div :class='headerBtnClass("info")' @click='changeActiveTab("info")'><span class='weicon-info'></span></div>
        <div :class='headerBtnClass("moreVideos")' @click='changeActiveTab("moreVideos")'><span class="material-icons">theaters</span></div>
      </div>
			<div :class="lineClass" :style="linePosition"></div>
			<div class='wedeoSideContent'>
				<wedeoSidePlaylist v-if="inPlaylist" v-show='activeTab === "playlist"'/>
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
    videoInfo() {
      return this.$store.state.currentVideoInfo;
    },
    inPlaylist() {
      return this.videoInfo.hasOwnProperty('playlist') && this.videoInfo.playlist.upid !== "";
    },
    lineClass() {
      return "wedeoSideContainerHeaderLine " + ( this.inPlaylist ? " widthPlaylist" : "" );
    },
		linePosition() {
      if( this.inPlaylist ) {
  			switch (this.activeTab) {
          case 'playlist': 		return "left: 0"; 	break;
          case 'comments': 		return "left: 25%"; break;
          case 'info': 				return "left: 50%";	break;
          case 'moreVideos':	return "left: 75%"; break;
  			}
      } else {
        switch (this.activeTab) {
          case 'comments': 		return "left: 0"; 	break;
  				case 'info': 				return "left: 33%";	break;
  				case 'moreVideos':	return "left: 66%"; break;
        }
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

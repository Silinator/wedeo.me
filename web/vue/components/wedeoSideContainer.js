Vue.component( 'wedeoSideContainer', {
  data: function() {
    return {
      activeTab: "comments",
    }
  },
  template: `
    <div class='wedeoSideContainer flex relative flex-col min-w-0 h-full max-w-lg'>
      <div class='flex justify-between flex-row w-full'>
        <div v-if="inPlaylist" :class='headerBtnClass("playlist")'@click='changeActiveTab("playlist")'><span class="material-icons">view_list</span></div>
        <div :class='headerBtnClass("comments")' @click='changeActiveTab("comments")'><span class="material-icons">chat_bubble_outline</span></div>
        <div :class='headerBtnClass("info")' @click='changeActiveTab("info")'><span class='weicon-info'></span></div>
        <div :class='headerBtnClass("moreVideos")' @click='changeActiveTab("moreVideos")'><span class="material-icons">theaters</span></div>
      </div>
			<div :class="lineClass" :style="linePosition"></div>
			<div class='wedeoSideContent'>
				<wedeoSidePlaylist v-if="inPlaylist && playlistLoaded" v-show='activeTab === "playlist"'/>
				<wedeoSideComments v-show='activeTab === "comments"'/>
				<wedeoSideInfo v-show='activeTab === "info"'/>
				<wedeoSideMoreVideos v-show='activeTab === "moreVideos"'/>
			</div>
    </div>
  `,
  watch: {
    videoData( data ) {
      this.fetchPlaylist();
    }
  },
  computed: {
		wedeoPlayer() {
			return this.$store.state.wedeoPlayer;
		},
    videoData() {
      return this.$store.state.mainVideoData;
    },
    inPlaylist() {
      return this.videoData.hasOwnProperty('playlist') && this.videoData.playlist.upid !== "";
    },
    playlist() {
      return this.$store.state.playlist;
    },
    playlistLoaded() {
      return this.playlist.loaded ? this.playlist.loaded : false;
    },
    lineClass() {
      return "wedeoSideContainerHeaderLine block absolute bg-white transition-all duration-200 ease-in-out " + ( this.inPlaylist ? " widthPlaylist" : "" );
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
    },
    fetchPlaylist() {
      if( this.inPlaylist && this.playlist.upid !== this.videoData.playlist.upid ) {
        this.$store.dispatch('fetchPlaylist', this.videoData.playlist.upid);
      }
    }
  },
  created() {
    this.fetchPlaylist();
  }
});

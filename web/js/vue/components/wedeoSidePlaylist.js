Vue.component( 'wedeoSidePlaylist', {
  data: function() {
    return {
      activeTab: "comments",
      videosBeforeIndex: 2
    }
  },
  template: `
    <div class='wedeoSidePlaylist'>
			<h2>{{videoInfo.playlist.title}}</h2>
      <div class='wedeoSideMoreVideosListContainer'>
        <div v-if="moreBeforeLoading != 'all'" id="loadMoreBeforeLine" class="loadMoreLine">{{t('LOAD_MORE_VIDEOS')}}</div>
        <div class='wedeoSideMoreVideosList'>
          <div v-for="videoData in morePlaylistVideos" :key="videoData.uvid" class='shortHorVideoContainer'>
            <div class='shortHorVideoNumber' v-html="getPlaylistVideoNumber(videoData.uvid)"></div>
            <thumb :videoData="videoData" :upid="upid"/>
            <div class='shortHorVideoContent'>
              <div class='shortHorVideoTitle'><a :href="videoUrl(videoData)"> {{videoData.title}}</a></div>
              <h6 class='shortHorVideoUser'><a :href="userUrl(videoData)">{{videoData.user.name}}</a></h6>
            </div>
          </div>
        </div>
        <div v-if="moreAfterLoading != 'all'" id="loadMoreAfterLine" class="loadMoreLine">{{t('LOAD_MORE_VIDEOS')}}</div>
      </div>
    </div>
  `,
  computed: {
    morePlaylistVideos() {
      return this.$store.state.morePlaylistVideos;
    },
    moreBeforeLoading() {
      return this.$store.state.morePlaylistVideosBeforeLoading;
    },
    moreAfterLoading() {
      return this.$store.state.morePlaylistVideosAfterLoading;
    },
		videoInfo() {
			return this.$store.state.currentVideoInfo;
		},
		limit() {
			return this.$store.state.morePlaylistVideosLimit;
		},
		upid() {
			return this.videoInfo.playlist.upid;
		},
    playlistVideos() {
      return this.videoInfo.playlist.videos;
    },
    videoIndex() {
      return this.videoInfo.playlist.videoIndex;
    },
		startIndex() {
      if(this.playlistVideos.length <= this.limit || this.videoIndex < this.videosBeforeIndex ) {
        return 0;
      } else {
        return this.videoIndex - this.videosBeforeIndex;
      }
		}
  },
  methods: {
    videoUrl(videoData) {
      var playlistURL = this.upid != null ? "&pl=" + this.upid : "";
      return "watch/" + videoData.uvid + playlistURL;
    },
    userUrl(videoData) {
      return "user/" + videoData.user.uuid;
    },
    changeActiveTab( tab ) {
      this.activeTab = tab;
    },
    headerBtnClass( tab ) {
      return "wedeoSideContainerHeaderBtn noSel " + ( tab == this.activeTab ? "active" : "" );
    },
    getPlaylistVideoNumber(uvid) {
      let num = this.playlistVideos.indexOf(uvid);

      if(num === this.videoIndex) {
        return "<span class='material-icons'>play_arrow</span>";
      } else {
        num++
        return num;
      }
    }
  },
  created() {
    this.$store.state.morePlaylistVideosIndexBefore = this.startIndex;
    this.$store.state.morePlaylistVideosIndexAfter = this.startIndex;
    this.$store.dispatch('fetchMorePlaylistVideosAfter');
  },
  mounted() {
    const self = this;

    let observerBefore = new IntersectionObserver( function() {
      if( !self.moreBeforeLoading ) { /* to prevent double load */
        self.$store.dispatch('fetchMorePlaylistVideosBefore');
      }
    }, {} );
    observerBefore.observe( document.querySelector('#loadMoreBeforeLine') );

    let observerAfter = new IntersectionObserver( function() {
      if( !self.moreAfterLoading ) { /* to prevent double load */
        self.$store.dispatch('fetchMorePlaylistVideosAfter');
      }
    }, {} );
    observerAfter.observe( document.querySelector('#loadMoreAfterLine') );
  }
});

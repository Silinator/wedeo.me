Vue.component( 'wedeoSidePlaylist', {
  data: function() {
    return {
      activeTab: "comments",
      videosBeforeIndex: 2,
      swtichActive: false,
      randomActive: false
    }
  },
  template: `
    <div class='wedeoSidePlaylist'>
      <div class='wedeoSidePlaylistTitle'>
        <h2>{{playlist.title}}</h2>
        <div>
          <div :class="'outlineIconBtn' + (swtichActive ? ' active' : '')" v-on:click="swtichOrder"> <span class="material-icons">swap_vert</span> </div>
          <div :class="'outlineIconBtn' + (randomActive ? ' active' : '')" v-on:click="randomOrder"> <span class="material-icons">shuffle</span> </div>
        </div>
      </div>
      <div class='wedeoSideMoreVideosListContainer'>
        <div v-if="moreBeforeLoading != 'all'" id="loadMoreBeforeLine" class="loadMoreLine">{{this.$store.getters.t('LOAD_MORE_VIDEOS')}}</div>
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
        <div v-if="moreAfterLoading != 'all'" id="loadMoreAfterLine" class="loadMoreLine">{{this.$store.getters.t('LOAD_MORE_VIDEOS')}}</div>
      </div>
    </div>
  `,
  watch: {
    videoData() {
      this.upPlaylistInfo();
    }
  },
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
		videoData() {
			return this.$store.state.mainVideoData;
		},
		limit() {
			return this.$store.state.morePlaylistVideosLimit;
		},
    upid() {
      return this.videoData.playlist.upid;
    },
    playlist() {
      return this.$store.state.playlist;
    },
    playlistVideos() {
      return this.playlist.videos;
    },
    videoIndex() {
      return this.playlist.videoIndex;
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
    },
    shuffel(array) {
      for(var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }

      return array;
    },
    swtichOrder() {
      if(this.swtichActive) {
        this.playlist.videos = deepObjCopy( this.playlist.orgOrder );
      } else {
        this.playlist.videos = this.playlist.videos.reverse();
      }

      this.swtichActive = !this.swtichActive;
      this.resetMorePlaylistVideos();
    },
    randomOrder() {
      if(this.randomActive) {
        this.playlist.videos = deepObjCopy( this.playlist.orgOrder );
      } else {
        this.playlist.videos = this.shuffel(this.playlist.videos);
      }

      this.randomActive = !this.randomActive;
      this.resetMorePlaylistVideos();
    },
    resetMorePlaylistVideos() {
      this.upPlaylistInfo();
      this.$store.dispatch('resetMorePlaylistVideos', this.startIndex);
      this.$store.dispatch('fetchMorePlaylistVideosBefore');
      this.$store.dispatch('fetchMorePlaylistVideosAfter');
    },
    upPlaylistInfo() {
      const videoIndex = this.playlist.videos.indexOf(this.videoData.uvid);
      const maxIndex = this.playlist.videos.length - 1;
      const previousVideoIndex = videoIndex - 1 < 0 ? maxIndex : videoIndex - 1;
      const nextVideoIndex = videoIndex + 1 > maxIndex ? 0 : videoIndex + 1;

      this.playlist.videoIndex = videoIndex;
      wedeoPlayer.setPreviousVideo(this.playlist.videos[previousVideoIndex]);
      wedeoPlayer.setNextVideo(this.playlist.videos[nextVideoIndex]);
    }
  },
  created() {
    this.$store.state.morePlaylistVideosIndexBefore = this.startIndex;
    this.$store.state.morePlaylistVideosIndexAfter = this.startIndex;
    this.$store.dispatch('fetchMorePlaylistVideosAfter');
    this.upPlaylistInfo();
  },
  mounted() {
    const self = this;

    let observerBefore = new IntersectionObserver( function() {
      if( !self.moreBeforeLoading ) { /* to prevent double load */
        self.$store.dispatch('fetchMorePlaylistVideosBefore');
      }
    }, {} );

    if( document.querySelector('#loadMoreLine') ) {
      observerBefore.observe( document.querySelector('#loadMoreBeforeLine') );
    }

    let observerAfter = new IntersectionObserver( function() {
      if( !self.moreAfterLoading ) { /* to prevent double load */
        self.$store.dispatch('fetchMorePlaylistVideosAfter');
      }
    }, {} );

    if( document.querySelector('#loadMoreLine') ) {
      observerAfter.observe( document.querySelector('#loadMoreAfterLine') );
    }
  }
});

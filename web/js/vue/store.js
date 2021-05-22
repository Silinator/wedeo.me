Vue.use( Vuex );

const store = new Vuex.Store({
  state: {
    cdnURLbase: "https://cdn.wedeo.me/",
    wedeoPlayer: {},
    currentVideoInfo: {},
    videosLoadedIndex: 0,
    videosLoading: false,
    videos: [],
    moreVideosIndex: 0,
    moreVideosLoading: false,
    moreVideos: [],
    moreVideosFilter: {
      catFilter	: "",
      langFilter: "",
      userFilter: "",
      tagFilter	: "",
      textFilter: ""
    }
  },

  mutations: {
    setWedeoPlayer( state, player ){
      state.wedeoPlayer = player;
    },
    setCurrentVideoInfo( state, info ) {
      state.currentVideoInfo = info;
    },
    addVideos( state, videos ) {
      state.videos = state.videos.concat(videos);
    },
    addMoreVideos( state, videos ) {
      state.moreVideos = state.moreVideos.concat(videos);
    },
  },

  actions: {
    fetchVideos( { commit, state } ) {
      if( state.videosLoading === false ) {
        state.videosLoading = true;

        $.getJSON( 'api/getVideos?index=' + state.videosLoadedIndex, data => {
          state.videosLoading = false;
          state.videosLoadedIndex = data.videos.length;
          commit( 'addVideos', data.videos );

          if( data.max ) {
            state.videosLoading = 'all';
          } else {
            state.videosLoading = false;
          }
        });
      }
    },
    fetchMoreVideos( { commit, state } ) {
      if( state.moreVideosLoading === false ) {
        state.moreVideosLoading = true;

        $.getJSON( 'api/getMoreVideos?index=' + state.moreVideosLoadedIndex + "&filter=" + JSON.stringify(state.moreVideosFilter), data => {
          state.moreVideosLoading = false;
          state.moreVideosLoadedIndex = data.videos.length;
          commit( 'addMoreVideos', data.videos );

          if( data.max ) {
            state.moreVideosLoading = 'all';
          } else {
            state.moreVideosLoading = false;
          }
        });
      }
    }
  }
});

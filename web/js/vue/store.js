Vue.use( Vuex );

const store = new Vuex.Store({
  state: {
    URLbase: "https://www.we-teve.com/",
    videosLoadedIndex: 0,
    videosLoading: false,
    allVideosLoaded: false,
    videos: []
  },

  mutations: {
    setVideosLoading( state, value ) {
      state.videosLoading = value;
    },
    setVideosLoadedIndex( state, value ) {
      state.videosLoadedIndex = value;
    },
    setAllVideosLoaded( state, value ) {
      state.setAllVideosLoaded = value;
    },
    addVideos( state, videos ) {
      state.videos = state.videos.concat(videos);
    }
  },

  actions: {
    fetchVideos( { commit, state } ) {
      if( state.videosLoading === false && !state.allVideosLoaded ) {
        commit( 'setVideosLoading', true );
          $.getJSON( 'api/getVideos.php?index=0' + state.videosLoadedIndex, ( videos ) => {
            commit( 'setVideosLoading', false );
            commit( 'addVideos', videos );

            //only for test
            commit( 'setAllVideosLoaded', true );
          });
      }
    }
  }
});

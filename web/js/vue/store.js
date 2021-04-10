Vue.use( Vuex );

const store = new Vuex.Store({
  state: {
    URLbase: "https://www.we-teve.com/",
    wedeoPlayer: {},
    mainVideosLoadedIndex: 0,
    mainVideosLoading: false,
    mainAllVideosLoaded: false,
    videos: [],
    currentVideoInfo: {}
  },

  mutations: {
    setWedeoPlayer( state, player ){
      state.wedeoPlayer = player;
    },
    setMainVideosLoading( state, value ) {
      state.mainVideosLoading = value;
    },
    setMainVideosLoadedIndex( state, value ) {
      state.mainVideosLoadedIndex = value;
    },
    setMainAllVideosLoaded( state, value ) {
      state.mainAllVideosLoaded = value;
    },
    setCurrentVideoInfo( state, info ) {
      state.currentVideoInfo = info;
    },
    addMainVideos( state, videos ) {
      state.videos = state.videos.concat(videos);
    },
  },

  actions: {
    fetchMainVideos( { commit, state } ) {
      if( state.mainVideosLoading === false && !state.mainAllVideosLoaded ) {
        commit( 'setMainVideosLoading', true );
          $.getJSON( 'api/getVideos.php?index=0' + state.mainVideosLoadedIndex, ( videos ) => {
            commit( 'setMainVideosLoading', false );
            commit( 'addMainVideos', videos );

            //only for test
            commit( 'setMainAllVideosLoaded', true );
          });
      }
    }
  }
});

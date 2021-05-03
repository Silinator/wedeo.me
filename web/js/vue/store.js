Vue.use( Vuex );

const store = new Vuex.Store({
  state: {
    URLbase: "https://www.we-teve.com/",
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
    setVideosLoading( state, value ) {
      state.videosLoading = value;
    },
    setVideosLoadedIndex( state, value ) {
      state.videosLoadedIndex = value;
    },
    addVideos( state, videos ) {
      state.videos = state.videos.concat(videos);
    },
    setMoreVideosLoading( state, value ) {
      state.moreVideosLoading = value;
    },
    setMoreVideosLoadedIndex( state, value ) {
      state.moreVideosLoadedIndex = value;
    },
    addMoreVideos( state, videos ) {
      state.moreVideos = state.moreVideos.concat(videos);
    },
  },

  actions: {
    fetchVideos( { commit, state } ) {
      if( state.videosLoading === false ) {
        commit( 'setVideosLoading', true );

        $.getJSON( 'api/getVideos?index=' + state.videosLoadedIndex, data => {
          commit( 'setVideosLoading', false );
          commit( 'setVideosLoadedIndex', data.videos.length );
          commit( 'addVideos', data.videos );

          if( data.max ) {
            commit( 'setVideosLoading', 'all' );
          } else {
            commit( 'setVideosLoading', false );
          }
        });
      }
    },
    fetchMoreVideos( { commit, state } ) {
      if( state.moreVideosLoading === false ) {
        commit( 'setMoreVideosLoading', true );

        $.getJSON( 'api/getMoreVideos?index=' + state.moreVideosLoadedIndex + "&filter=" + JSON.stringify(state.moreVideosFilter), data => {
          commit( 'setMoreVideosLoading', false );
          commit( 'setMoreVideosLoadedIndex', data.videos.length );
          commit( 'addMoreVideos', data.videos );

          if( data.max ) {
            commit( 'setMoreVideosLoading', 'all' );
          } else {
            commit( 'setMoreVideosLoading', false );
          }
        });
      }
    }
  }
});

Vue.use( Vuex );

const store = new Vuex.Store({
  state: {
    cdnURLbase: "https://cdn.wedeo.me/",
    page: '',
    sideNaviOpen: false,
    translations: {},
    selLang: {
      "lang": "de",
      "numFor": "de-DE"
    },
    selNumFor: '',
    mainVideoData: {},
    secondVideoData: {},
    wedeoPlayer: {},
    playlist: {},
    videosLoadedIndex: 0,
    videosLoading: false,
    videos: [],
    moreVideosLoadedIndex: 0,
    moreVideosLoading: false,
    moreVideos: [],
    moreVideosFilter: {
      catFilter	: "",
      langFilter: "",
      userFilter: "",
      tagFilter	: "",
      textFilter: ""
    },
    morePlaylistVideos: [],
    morePlaylistVideosLimit: 20,
    morePlaylistVideosIndexBefore: 0,
    morePlaylistVideosIndexAfter: 0,
    morePlaylistVideosBeforeLoading: false,
    morePlaylistVideosAfterLoading: false
  },
  getters: {
    t: (state) => (id, n = null ) => {
      if( state.translations.hasOwnProperty( id ) && state.translations[id].hasOwnProperty( state.selLang.lang ) ) {
        str = state.translations[id][state.selLang.lang];
        return str = str.replace( /\$n/g, n );
      }

      return id;
    },

    n: (state) => (num) => {
      return state.selNumFor !== '' ? state.selNumFor.format(num) : num;
    }
  },
  mutations: {
    setTranslations( state, data ) {
      state.translations = data;
      state.selNumFor = new Intl.NumberFormat(state.selLang.numFor);
    },
    setWedeoPlayer( state, player ) {
      state.wedeoPlayer = player;
    },
    addVideos( state, videos ) {
      state.videos = state.videos.concat(videos);
    },
    addMoreVideos( state, videos ) {
      state.moreVideos = state.moreVideos.concat(videos);
    },
    addMorePlaylistVideosBefore( state, videos ) {
      state.morePlaylistVideos = videos.concat(state.morePlaylistVideos);
    },
    addMorePlaylistVideosAfter( state, videos ) {
      state.morePlaylistVideos = state.morePlaylistVideos.concat(videos);
    },
    setPage( state, page ) {
      state.page = page;
    },
    setMainVideoData( state, data ) {
      state.mainVideoData = data;
    },
    setSecondVideoData( state, data ) {
      state.secondVideoData = data;
    },
    setSideNaviOpen( state, value ) {
      state.sideNaviOpen = value;
    }
  },

  actions: {
    fetchTranslations( { commit, state } ) {
      $.getJSON( "lang/translations.json", function (data) {
        commit( 'setTranslations', data );
      });
    },
    fetchVideos( { commit, state } ) {
      if( state.videosLoading === false ) {
        state.videosLoading = true;

        $.getJSON( 'api/getVideos?index=' + state.videosLoadedIndex, data => {
          state.videosLoading = false;
          state.videosLoadedIndex = data.videos.length;
          commit( 'addVideos', data.videos );

          if( data.max ) {
            state.videosLoading = 'all';
          }
        });
      }
    },
    fetchMoreVideos( { commit, state } ) {
      if( state.moreVideosLoading === false ) {
        state.moreVideosLoading = true;

        $.getJSON( 'api/getMoreVideos?index=' + state.moreVideosLoadedIndex + "&filter=" + JSON.stringify(state.moreVideosFilter), data => {
          state.moreVideosLoading = false;
          state.moreVideosLoadedIndex += data.videos.length;
          commit( 'addMoreVideos', data.videos );

          if( data.max ) {
            state.moreVideosLoading = 'all';
          }
        });
      }
    },
    fetchPlaylist( { commit, state }, upid ) {
      state.playlist.loaded = false;
      $.getJSON( 'api/getPlaylistInfos?upid=' + upid + '&uvid=' + state.mainVideoData.uvid, data => {
        state.playlist = data;
        state.playlist.loaded = true;
      });
    },
    resetMorePlaylistVideos( { commit, state }, startIndex ) {
      state.morePlaylistVideos = [];
      state.morePlaylistVideosIndexBefore = startIndex;
      state.morePlaylistVideosIndexAfter = startIndex;
      state.morePlaylistVideosBeforeLoading = false;
      state.morePlaylistVideosAfterLoading = false;
    },
    fetchMorePlaylistVideosBefore( { commit, state } ) {
      if(state.morePlaylistVideosBeforeLoading === false) {
        state.morePlaylistVideosBeforeLoading = true;

        const playlist = state.playlist.upid;
        const videos = state.playlist.videos;
        const limit = state.morePlaylistVideosLimit;
        const index = state.morePlaylistVideosIndexBefore - limit < 0 ? 0 : state.morePlaylistVideosIndexBefore - limit;
        const limitMax = index + limit > state.morePlaylistVideosIndexBefore ? state.morePlaylistVideosIndexBefore : index + limit;
        const uvids = [];

        for(var i = index; i < limitMax; i++) {
          uvids.push(videos[i]);
        }

        $.getJSON( 'api/getVideoInfos?uvids=' + JSON.stringify(uvids), data => {
          state.morePlaylistVideosBeforeLoading = false;

          state.morePlaylistVideosIndexBefore -= data.videos.length;
          commit('addMorePlaylistVideosBefore', data.videos);

          if(index === 0) {
            state.morePlaylistVideosBeforeLoading = 'all';
          }
        });
      }
    },
    fetchMorePlaylistVideosAfter( { commit, state } ) {
      if(state.morePlaylistVideosAfterLoading === false) {
        state.morePlaylistVideosAfterLoading = true;

        const playlist = state.playlist.upid;
        const videos = state.playlist.videos;
        const limit = state.morePlaylistVideosLimit;
        const index = state.morePlaylistVideosIndexAfter;
        const uvids = [];

        for(var i = index; i < index + limit; i++) {
          if(videos[i]) {
            uvids.push(videos[i]);
          } else {
            break;
          }
        }

        $.getJSON( 'api/getVideoInfos?uvids=' + JSON.stringify(uvids), data => {
          state.morePlaylistVideosAfterLoading = false;

          state.morePlaylistVideosIndexAfter += data.videos.length;
          commit('addMorePlaylistVideosAfter', data.videos);

          if( data.videos.length < limit ) {
            state.morePlaylistVideosAfterLoading = 'all';
          }
        });
      }
    }
  }
});

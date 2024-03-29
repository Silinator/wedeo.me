Vue.component( 'sideNavi', {
  data: function() {
    return {
    }
  },
  template: `
    <div class='sideNaviContainer'>
      <div :class="sideNaviClass">
        <div class='flex items-center p-4 -mt-1'>
          <div v-on:click="closeNavi" class="headerButton toggleLeftNaviButton">
            <span class="material-icons">menu</span>
          </div>

          <a href="/" class="headerLogo">
            <img src="img/icons/logo.svg"/>
          </a>
        </div>

        <a href="" class="naviButton">
          <span class="material-icons">home</span> <!--weicon-home-->
          {{this.$store.getters.t('NAVI_CHANNEL')}}
        </a>
        <a href="" class="naviButton">
          <span class="material-icons">star</span> <!--star-->
          {{this.$store.getters.t('NAVI_SUBSCRIBERS')}}
        </a>
        <a href="" class="naviButton">
          <span class="material-icons">lightbulb</span> <!--weicon-lightbulb-->
          {{this.$store.getters.t('NAVI_RECOMMENDED')}}
        </a>
        <a href="" class="naviButton">
          <span class="material-icons">movie</span> <!--weicon-videos-->
          {{this.$store.getters.t('NAVI_VIDEOS')}}
        </a>
        <a href="" class="naviButton">
          <span class="material-icons">settings</span>
          {{this.$store.getters.t('NAVI_OPTIONS')}}
        </a>
        <a href="" class="naviButton">
          <span class="material-icons">logout</span>
          {{this.$store.getters.t('NAVI_LOGOUT')}}
        </a>

        <h3>Playlists:</h3>
        <a href="/watch/49lUrQcO&pl=H3yS4FJ6691c" class="naviButton">
          <span class="material-icons">list</span>
          {{this.$store.getters.t('Test Playlist')}}
        </a>

      </div>
      <div v-on:click="closeNavi" :class="sideNaviBgClass"></div>
    </div>
  `,
  computed: {
		sideNaviOpen() {
			return this.$store.state.sideNaviOpen;
  	},
    sideNaviClass() {
      if( this.sideNaviOpen ) {
        return "sideNavi open";
      }

      return "sideNavi";
    },
    sideNaviBgClass() {
      if( this.sideNaviOpen ) {
        return "sideNaviBg open";
      }

      return "sideNaviBg hidden";
    }
  },
  methods: {
    openNavi() {
      this.sideNaviOpen = true;
      this.$store.commit('setSideNaviOpen', true );

      document.querySelector('.mainContainer').classList.add('blur');
      document.querySelector('body').classList.add('overflow-hidden');
    },
    closeNavi() {
      this.$store.commit('setSideNaviOpen', false );

      document.querySelector('.mainContainer').classList.remove('blur');
      document.querySelector('body').classList.remove('overflow-hidden');
    }
  }
});
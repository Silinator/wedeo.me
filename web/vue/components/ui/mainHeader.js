Vue.component( 'mainHeader', {
	data: function() {
		return {
		}
	},
  template: `
    <div :class="'header flex justify-between fixed top-0 left-0 w-full h-14 border-black ' + blurClass">
      <div v-if="pageLoading !== 0" class="flex w-full h-1 absolute top-0 bg-transparent">
        <div class="flex h-1 graidient" :style="'width:'+pageLoading+'%'"></div>
      </div>
      <div class='flex items-center p-4'>
        <div v-on:click="toggleSideNavi" class="headerButton toggleLeftNaviButton">
          <span class="material-icons">menu</span>
        </div>

        <a href="/" class="headerLogo noSel">
          <img class="hidden sm:block" src="img/icons/logo.svg"/>
          <img class="sm:hidden" src="img/icons/logo_short.svg"/>
        </a>
      </div>

      <div class='headerCenter hidden md:flex items-center relative'>
        <input class="headerSearchInput" :placeholder="this.$store.getters.t('HEADER_SEARCH')"/>
        <div class="mainSearchButton">
          <span class="material-icons">search</span>
        </div>
      </div>

      <div class='headerRight flex items-center p-4'>
        <div class="headerButton flex md:hidden mobileSearchButton">
          <span class="material-icons">search</span>
        </div>
        <div class="headerButton flex uploadButton">
          <span class="material-icons">upload</span>
        </div>
        <div class="headerButton flex bookmarkButton">
          <span class="material-icons">bookmark_border</span>
        </div>
        <div class="hidden sm:flex headerButton notificationsButton">
          <span class="material-icons">notifications_none</span>
        </div>
        <div class="hidden sm:flex headerButton friendsButton">
          <span class="material-icons">people_outline</span>
        </div>
        <div class="hidden sm:flex headerButton levelButton">
          <span class="material-icons">border_outer</span>
        </div>
        <div class="headerButton flex userButton">
          <img src="img/icons/avatar.png"/>
        </div>
      </div>

      <sideNavi/>

      <div :class="'miniWedeoContainer flex fixed w-80 shadow-lg' + blurClass" style="display:none;">
        <div class="miniWedeoHeader flex justify-between items-center text-white cursor-move">
          <div class="miniWedeoHeaderTitle p-1 pl-2 whitespace-nowrap overflow-hidden overflow-ellipsis"></div>
          <div v-on:click="closeMiniplayer" class="flex p-1 cursor-pointer">
            <span class="material-icons">close</span>
          </div>
        </div>
        <div class="miniWedeo"></div>
      </div>
    </div>
  `,
  computed: {
		sideNaviOpen() {
			return this.$store.state.sideNaviOpen;
  	},
    pageLoading() {
      return this.$store.state.pageLoading;
  	},
    blurClass() {
      if( this.sideNaviOpen ) {
        return "blur";
      }

      return "";
    },
  },
  methods: {
    toggleSideNavi() {
      if( this.sideNaviOpen ) {
        this.closeNavi();
      } else {
        this.openNavi();
      }
    },
    openNavi() {
      this.$store.commit('setSideNaviOpen', true );

      document.querySelector('.mainContainer').classList.add('blur');
      document.querySelector('body').classList.add('overflow-hidden');
    },
    closeNavi() {
      this.$store.commit('setSideNaviOpen', false );

      document.querySelector('.mainContainer').classList.remove('blur');
      document.querySelector('body').classList.remove('overflow-hidden');
    },
    closeMiniplayer() {
      closeMiniplayer();
    }
  },
  mounted() {
    document.addEventListener("scroll", function() {
      if( window.scrollY > 50 ) {
        document.querySelector('.header').classList.add('solid');
      }else{
        document.querySelector('.header').classList.remove('solid');
      }
    });

    dragMiniPlayer( document.querySelector('.miniWedeoHeader') );
  }
});

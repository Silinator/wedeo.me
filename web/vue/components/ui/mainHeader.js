Vue.component( 'mainHeader', {
	data: function() {
		return {
		}
	},
  template: `
    <div :class="'header flex justify-between fixed top-0 left-0 w-full ' + blurClass">
      <div class='headerLeft'>
        <div v-on:click="toggleSideNavi" class="headerButton toggleLeftNaviButton">
          <span class="material-icons">menu</span>
        </div>

        <a href="/" class="headerLogo noSel">
          <img src="img/icons/logo.svg"/>
        </a>
      </div>

      <div class='headerCenter'>
        <input class="headerSearchInput" :placeholder="this.$store.getters.t('HEADER_SEARCH')"/>
        <div class="mainSearchButton">
          <span class="material-icons">search</span>
        </div>
      </div>

      <div class='headerRight'>
        <div class="headerButton uploadButton">
          <span class="material-icons">upload</span>
        </div>
        <div class="headerButton bookmarkButton">
          <span class="material-icons">bookmark_border</span>
        </div>
        <div class="headerButton notificationsButton">
          <span class="material-icons">notifications_none</span>
        </div>
        <div class="headerButton friendsButton">
          <span class="material-icons">people_outline</span>
        </div>
        <div class="headerButton levelButton">
          <span class="material-icons">border_outer</span>
        </div>
        <div class="headerButton userButton">
          <img src="img/icons/avatar.png"/>
        </div>
      </div>

      <sideNavi/>

      <div :class="'miniWedeoContainer ' + blurClass" style="display:none;">
        <div class="miniWedeoHeader">
          <div class="miniWedeoHeaderTitle"></div>
          <div v-on:click="closeMiniplayer" class="miniWedeoHeaderClose">
            <span class="material-icons">close</span>
          </div>
        </div>
        <div class="miniWedeo"></div>
        <div class="miniWedeoContent"></div>
      </div>
    </div>
  `,
  computed: {
		sideNaviOpen() {
			return this.$store.state.sideNaviOpen;
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

      $('.mainContainer').addClass('blur');
      $('body').addClass('of-hidden');
    },
    closeNavi() {
      this.$store.commit('setSideNaviOpen', false );

      $('.mainContainer').removeClass('blur');
      $('body').removeClass('of-hidden');
    },
    closeMiniplayer() {
      closeMiniplayer();
    }
  },
  mounted() {
    $(document).scroll(function() {
      if( $(document).scrollTop() > 50 ) {
        $(".header").addClass('solid');
      }else{
        $(".header").removeClass('solid');
      }
    });

    dragMiniPlayer( $(".miniWedeoHeader") );
  }
});

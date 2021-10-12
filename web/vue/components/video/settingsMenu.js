Vue.component( 'settingsMenu', {
  props: [ 'wedeoPlayer', 'videoData' ],
  data() {
    return {
      activeMenu: "",
      playbackRates: [ 0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2],
      fullscreenOptions: [ 'OFF', 'ON', 'AUTO' ]
    }
  },
  template: `
    <div class="">
      <div v-show="activeMenu === '' && openMenu" class='vjs-settings-menu'>
        <div class='vjs-setting vjs-speed-settings'
          ref='speedsetting' tabindex='0'
          v-on:click="openSpeedSettings(false)"
          v-on:keyup.enter="openSpeedSettings(true)"
          v-on:keyup.space="openSpeedSettings(true)"
          v-on:keyup.right="openSpeedSettings(true)"
          v-on:keyup.esc="closeMenu"
        >
          <div class='vjs-setting-title'>{{$store.getters.t('VIDEO_PLAYBACK_SPEED-TITLE')}}</div>
          <div class='vjs-setting-value-container'>
            <div class='vjs-setting-value'>{{wedeoPlayer.playbackRate}}</div>
            <span class='material-icons'>keyboard_arrow_right</span>
          </div>
        </div>
        <div class='vjs-setting vjs-resolution-settings'
          ref='sourcesetting' tabindex='0'
          v-on:click="openResolutionSettings(false)"
          v-on:keyup.enter="openResolutionSettings(true)"
          v-on:keyup.space="openResolutionSettings(true)"
          v-on:keyup.right="openResolutionSettings(true)"
          v-on:keyup.esc="closeMenu"
        >
          <div class='vjs-setting-title'>{{$store.getters.t('VIDEO_QUALITY-TITLE')}}</div>
          <div class='vjs-setting-value-container'>
            <div class='vjs-setting-value'>{{selectedRes}}</div>
            <span class='material-icons'>keyboard_arrow_right</span>
          </div>
        </div>
        <div class='vjs-setting vjs-fullscreen-settings'
          ref='fullscreensetting' tabindex='0'
          v-on:click="openFullscreenSettings(false)"
          v-on:keyup.enter="openFullscreenSettings(true)"
          v-on:keyup.space="openFullscreenSettings(true)"
          v-on:keyup.right="openFullscreenSettings(true)"
          v-on:keyup.esc="closeMenu"
        >
          <div class='vjs-setting-title'>{{$store.getters.t('VIDEO_FULLSCREEN_UI-TITLE')}}</div>
          <div class='vjs-setting-value-container'>
            <div class='vjs-setting-value'>{{fullscreenUiText}}</div>
            <span class='material-icons'>keyboard_arrow_right</span>
          </div>
        </div>
      </div>
      <div v-show="activeMenu !== '' && openMenu" class='vjs-settings-dropdown'>
        <div class='vjs-settings-dropdown-title-container' tabindex='0'
          v-on:click="closeDropdowns(false)"
          v-on:keyup.enter="closeDropdowns(true)"
          v-on:keyup.space="closeDropdowns(true)"
          v-on:keyup.left="closeDropdowns(true)"
          v-on:keyup.esc="closeMenu"
        >
          <span class='material-icons'>keyboard_arrow_left</span>
          <div      v-if="activeMenu === 'speed'" class='vjs-settings-dropdown-title'>{{$store.getters.t('VIDEO_PLAYBACK_SPEED-TITLE')}}</div>
          <div v-else-if="activeMenu === 'resolution'" class='vjs-settings-dropdown-title i'>{{$store.getters.t('VIDEO_QUALITY-TITLE')}}</div>
          <div v-else-if="activeMenu === 'fullscreen'" class='vjs-settings-dropdown-title'>{{$store.getters.t('VIDEO_FULLSCREEN_UI-TITLE')}}</div>
        </div>
        <div v-show="activeMenu === 'speed'" class='vjs-speed-settings-dropdown vjs-settings-dropdown-options'>
          <div :class="'vjs-settings-dropdown-option ' + (opt === playbackRate ? 'active' : '')"
            v-for="(opt, i) in playbackRates" :key="i" ref="speed" tabindex="0"
            v-on:click="changePlaybackRate(opt)"
            v-on:keyup.enter="changePlaybackRate(opt)"
            v-on:keyup.space="changePlaybackRate(opt)"
            v-on:keyup.left="closeDropdowns(true)"
            v-on:keyup.esc="closeMenu"
          >
            {{opt}}
          </div>
        </div>
        <div v-show="activeMenu === 'resolution'" class='vjs-resolution-settings-dropdown vjs-settings-dropdown-options'>
          <div :class="'vjs-settings-dropdown-option ' + (opt === selectedRes ? 'active' : '')"
            v-for="(opt, i) in sources" :key="i" ref="source" tabindex="0"
            v-on:click="changeSource(opt)"
            v-on:keyup.enter="changeSource(opt)"
            v-on:keyup.space="changeSource(opt)"
            v-on:keyup.left="closeDropdowns(true)"
            v-on:keyup.esc="closeMenu"
          >
            {{opt}}
          </div>
        </div>
        <div v-show="activeMenu === 'fullscreen'" class='vjs-fullscreen-settings-dropdown vjs-settings-dropdown-options'>
          <div :class="'vjs-settings-dropdown-option ' + (opt === fullscreenUi ? 'active' : '')"
            v-for="(opt, i) in fullscreenOptions" :key="i" ref="fullscreen" tabindex="0"
            v-on:click="changefullscreenUi(opt)"
            v-on:keyup.enter="changefullscreenUi(opt)"
            v-on:keyup.space="changefullscreenUi(opt)"
            v-on:keyup.left="closeDropdowns(true)"
            v-on:keyup.esc="closeMenu"
          >
            {{$store.getters.t('VIDEO_FULLSCREEN_UI_'+opt)}}
          </div>
        </div>
      </div>
    </div>
  `,
  watch: {
    openMenu(state) {
      const self = this;
      this.closeDropdowns(self.usingKeys);

      Vue.nextTick(function () {
        if(state === true) {
          if(self.usingKeys) { self.$refs.speedsetting.focus(); }
        }
      });
    }
  },
  computed: {
		cdnURLbase() {
			return this.$store.state.cdnURLbase;
  	},
    openMenu() {
      return this.wedeoPlayer.hasOwnProperty('playerSettingsMenuOpen') ? this.wedeoPlayer.playerSettingsMenuOpen : false;
    },
    sources() {
      return this.videoData.hasOwnProperty('availableSources') ? this.videoData.availableSources.reverse() : [];
    },
    playbackRate() {
      return this.wedeoPlayer.playbackRate;
    },
    selectedRes() {
      return this.wedeoPlayer.selectedRes;
    },
    fullscreenUi() {
      return this.wedeoPlayer.fullscreenUi;
    },
    fullscreenUiText() {
      return this.$store.getters.t('VIDEO_FULLSCREEN_UI_'+ this.fullscreenUi);
    },
    usingKeys() {
      return this.wedeoPlayer.hasOwnProperty('usingKeys') ? this.wedeoPlayer.usingKeys : false;
    }
  },
  methods: {
    openSpeedSettings(key) {
      const self = this;
      this.activeMenu = "speed";

      Vue.nextTick(function () {
        if(key) { self.$refs.speed[0].focus(); }
      });
    },
    openResolutionSettings(key) {
      const self = this;
      this.activeMenu = "resolution";

      Vue.nextTick(function () {
        if(key) { self.$refs.source[0].focus(); }
      });
    },
    openFullscreenSettings(key) {
      const self = this;
      this.activeMenu = "fullscreen";

      Vue.nextTick(function () {
        if(key) { self.$refs.fullscreen[0].focus(); }
      });
    },
    closeDropdowns(key) {
      const self = this;
      this.activeMenu = "";

      Vue.nextTick(function () {
        if(key) { self.$refs.speedsetting.focus(); }
      });
    },
    closeMenu() {
      this.closeDropdowns(false);
      if( this.wedeoPlayer.closePlayerSettingsMenu ) {
        this.wedeoPlayer.closePlayerSettingsMenu();
      }
    },
    changePlaybackRate(value) {
      if( this.wedeoPlayer.changePlaybackRate ) {
        this.wedeoPlayer.changePlaybackRate(value);
        this.closeMenu();
      }
    },
    changeSource(value) {
      if( this.wedeoPlayer.changeSource ) {
        this.wedeoPlayer.changeSource(value);
        this.closeMenu();
      }
    },
    changefullscreenUi(value) {
      if( this.wedeoPlayer.changefullscreenUi ) {
        this.wedeoPlayer.changefullscreenUi(value);
        this.closeMenu();
      }
    }
  }
});

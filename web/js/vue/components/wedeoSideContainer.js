Vue.component( 'wedeoSideContainer', {
	props: [ 'Player', 'videoData' ],
  data: function() {
    return {
      activeTab: "comments",
    }
  },
  template: `
    <div class='wedeoSideContainer'>
      <div class='wedeoSideContainerHeader'>
        <div :class='headerBtnClass("comments")' v-on:click='changeActiveTab("comments")'><span class="material-icons">chat_bubble_outline</span></div>
        <div :class='headerBtnClass("info")' v-on:click='changeActiveTab("info")'><span class='weicon-info'></span></div>
        <div :class='headerBtnClass("moreVideos")' v-on:click='changeActiveTab("moreVideos")'><span class="material-icons">theaters</span></div>
      </div>
    </div>
  `,
  computed: {
    URLbase() {
      return this.$store.state.URLbase;
    }
  },
  methods: {
    changeActiveTab( tab ) {
      this.activeTab = tab;
    },
    headerBtnClass( tab ) {
      return "wedeoSideContainerHeaderBtn " + ( tab == this.activeTab ? "active" : "" );
    }
  },
  mounted() {
    this.Player.resizeWedeo();
  }
});

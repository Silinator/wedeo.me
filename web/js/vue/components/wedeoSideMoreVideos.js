Vue.component( 'wedeoSideMoreVideos', {
	props: [ 'Player', 'videoData' ],
  data: function() {
    return {
      activeTab: "comments",
    }
  },
  template: `
    <div class='wedeoSideMoreVideos'>
			<div class='wedeoSideMoreVideosCatContainer'>
				<div v-on:click="applyCatFilter(videoInfo.category)" class='outlineBtn' :title="videoCategoryFull">{{videoCategoryFull}}</div>
				<div v-on:click="applyLangFilter(videoInfo.language)" class='outlineBtn' :title="videoLanguageFull">{{videoLanguageFull}}</div>
				<div v-on:click="applyUserFilter(videoInfo.user.name)" class='outlineBtn' :title="videoInfo.user.name">{{videoInfo.user.name}}</div>
				<div v-on:click="apllyTagFilter(tag)" v-for="tag in tags" class='outlineBtn' :title="tag">{{tag}}</div>
			</div>
    </div>
  `,
  computed: {
		videoInfo() {
			return this.$store.state.currentVideoInfo;
		},
		videoCategoryFull() {
			return t('CAT_' + this.videoInfo.category.toUpperCase() );
		},
		videoLanguageFull() {
			return t('LANG_' + this.videoInfo.language.toUpperCase() );
		},
		tags() {
			let tags = this.videoInfo.tags.split(", ");
			return tags.filter( tag => { return tag.trim() != ""; });
		}
  },
  methods: {
    applyCatFilter(cat) {
	    //stuff
    },
    applyLangFilter(lang) {
      //stuff
    },
		applyUserFilter(user) {
			//stuff
		},
		applyTagFilter(tag) {
			//stuff
		}
  },
  mounted() {
  }
});

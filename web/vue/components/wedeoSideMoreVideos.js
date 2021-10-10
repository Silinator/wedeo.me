Vue.component( 'wedeoSideMoreVideos', {
  template: `
    <div class='wedeoSideMoreVideos'>
			<div class='wedeoSideMoreVideosCatContainer'>
				<div @click="applyCatFilter(videoData.category)" class='outlineBtn' :title="videoCategoryFull">{{videoCategoryFull}}</div>
				<div @click="applyLangFilter(videoData.language)" class='outlineBtn' :title="videoLanguageFull">{{videoLanguageFull}}</div>
				<div @click="applyUserFilter(videoData.user.name)" class='outlineBtn' :title="videoData.user.name">{{videoData.user.name}}</div>
				<div @click="apllyTagFilter(tag)" v-for="tag in tags" class='outlineBtn' :title="tag">{{tag}}</div>
			</div>
			<div class='wedeoSideMoreVideosSearchContainer'>
				<input class='wedeoSideMoreVideosSearchInput' @keyup.enter="applyTextFilter" :placeholder="this.$store.getters.t('MORE_VIDEOS_SEARCH')"/>
				<div class='wedeoSideMoreVideosSearchBtn' @click="applyTextFilter">
					<span class="material-icons">search</span>
				</div>
			</div>
			<h3>{{this.$store.getters.t('MORE_VIDEOS')}}</h3>
			<div class='wedeoSideMoreVideosListContainer'>
				<div class='wedeoSideMoreVideosList'>
					<div v-for="videoData in moreVideos" :key="videoData.uvid" class='shortHorVideoContainer'>
						<thumb :videoData="videoData"/>
						<div class='shortHorVideoContent'>
							<div class='shortHorVideoTitle'><a :href="videoUrl(videoData)"> {{videoData.title}}</a></div>
							<h6 class='shortHorVideoUser'><a :href="userUrl(videoData)">{{videoData.user.name}}</a></h6>
						</div>
					</div>
				</div>
				<div v-if="moreVideosLoading != 'all'" id="loadMoreLine" class="loadMoreLine">{{this.$store.getters.t('LOAD_MORE_VIDEOS')}}</div>
			</div>
    </div>
  `,
  computed: {
		videoData() {
			return this.$store.state.mainVideoData;
		},
		moreVideos() {
			return this.$store.state.moreVideos;
		},
		videoCategoryFull() {
			return this.$store.getters.t('CAT_' + this.videoData.category.toUpperCase() );
		},
		videoLanguageFull() {
			return this.$store.getters.t('LANG_' + this.videoData.language.toUpperCase() );
		},
		tags() {
			let tags = this.videoData.tags.split(", ");
			return tags.filter( tag => { return tag.trim() != ""; });
		},
		moreVideosLoading() {
			return this.$store.state.moreVideosLoading;
		}
  },
  methods: {
		videoUrl(videoData) {
			return "watch/" + videoData.uvid;
		},
		userUrl(videoData) {
			return "user/" + videoData.user.uuid;
		},
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
		},
		applyTextFilter() {
			//stuff
		}
  },
	mounted() {
		const self = this;

		let observer = new IntersectionObserver( function() {
			if( !self.moreVideosLoading ) { /* to prevent double load */
				self.$store.dispatch('fetchMoreVideos');
			}
		}, {} );

		if( document.querySelector('#loadMoreLine') ) {
			observer.observe( document.querySelector('#loadMoreLine') );
		}
	}
});

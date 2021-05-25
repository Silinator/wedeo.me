Vue.component( 'wedeoSideMoreVideos', {
	props: [ 'Player', 'videoData' ],
  template: `
    <div class='wedeoSideMoreVideos'>
			<div class='wedeoSideMoreVideosCatContainer'>
				<div @click="applyCatFilter(videoInfo.category)" class='outlineBtn' :title="videoCategoryFull">{{videoCategoryFull}}</div>
				<div @click="applyLangFilter(videoInfo.language)" class='outlineBtn' :title="videoLanguageFull">{{videoLanguageFull}}</div>
				<div @click="applyUserFilter(videoInfo.user.name)" class='outlineBtn' :title="videoInfo.user.name">{{videoInfo.user.name}}</div>
				<div @click="apllyTagFilter(tag)" v-for="tag in tags" class='outlineBtn' :title="tag">{{tag}}</div>
			</div>
			<div class='wedeoSideMoreVideosSearchContainer'>
				<input class='wedeoSideMoreVideosSearchInput' @keyup.enter="applyTextFilter" :placeholder="t('MORE_VIDEOS_SEARCH')"/>
				<div class='wedeoSideMoreVideosSearchBtn' @click="applyTextFilter">
					<span class="material-icons">search</span>
				</div>
			</div>
			<h3>{{t('MORE_VIDEOS')}}</h3>
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
				<div v-if="moreVideosLoading != 'all'" id="loadMoreLine" class="loadMoreLine">{{t('LOAD_MORE_VIDEOS')}}</div>
			</div>
    </div>
  `,
  computed: {
		videoInfo() {
			return this.$store.state.currentVideoInfo;
		},
		moreVideos() {
			return this.$store.state.moreVideos;
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
		observer.observe( document.querySelector('#loadMoreLine') );
	}
});

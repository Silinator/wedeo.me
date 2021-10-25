Vue.component( 'wedeoSideMoreVideos', {
  template: `
    <div class='flex flex-col h-full'>
			<div class='flex justify-start flex-wrap gap-1'>
				<div @click="applyCatFilter(videoData.category)" class='outlineBtn' :title="videoCategoryFull">{{videoCategoryFull}}</div>
				<div @click="applyLangFilter(videoData.language)" class='outlineBtn' :title="videoLanguageFull">{{videoLanguageFull}}</div>
				<div @click="applyUserFilter(videoData.user.name)" class='outlineBtn' :title="videoData.user.name">{{videoData.user.name}}</div>
				<div @click="apllyTagFilter(tag)" v-for="tag in tags" class='outlineBtn' :title="tag">{{tag}}</div>
			</div>
			<div class='relative mt-5 mb-5'>
				<input class='w-full text-base pt-1 pr-6 pb-1 pl-0 text-white border-b border-solid border-white bg-transparent' @keyup.enter="applyTextFilter" :placeholder="this.$store.getters.t('MORE_VIDEOS_SEARCH')"/>
				<div class='wedeoSideMoreVideosSearchBtn flex items-center absolute text-white top-1 right-0 h-6 cursor-pointer' @click="applyTextFilter">
					<span class="material-icons text-lg">search</span>
				</div>
			</div>
			<h3>{{this.$store.getters.t('MORE_VIDEOS')}}</h3>
			<div class='pr-2 overflow-x-hidden overflow-y-auto'>
				<div class='flex flex-col'>
					<div v-for="videoData in moreVideos" :key="videoData.uvid" class='shortHorVideoContainer'>
						<thumb :videoData="videoData"/>
						<div class='shortHorVideoContent flex flex-col'>
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

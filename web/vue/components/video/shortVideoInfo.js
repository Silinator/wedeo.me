Vue.component( 'shortVideoInfo', {
  template: `
    <div class='flex absolute flex-col p-5 w-10/12 lg:w-1/2 bottom-16 right-4 sm:right-12 bg-black bg-opacity-60 pointer-events-auto z-10'>
      <a :href="'watch/' + meta.uvid" :title="meta.title" class='text-3xl max-w-full md:mb-2 text-white font-medium whitespace-nowrap overflow-hidden overflow-ellipsis'>{{meta.title}}</a>
      <div class='hidden md:block mt-2 mb-2 text-2xl text-gray-400 max-h-14 w-full overflow-hidden' v-html="meta.description"></div>
      <div class='flex flex-col-reverse md:flex-row text-2xl mb-4'>
        <a :href="'user/' + meta.user.name" class='flex items-center no-underline text-white'>
          <img :src="userImg" class='w-6 h-6 mr-2'/>
          <p>{{meta.user.name}}</p>
        </a>
        <div class="flex flex-row">
          <span class='font-light ml-2 mr-2 hidden md:block'> • </span>
          <div class='shortVideoInfoLang'>{{meta.lang}}</div>
          <span class='font-light ml-2 mr-2'></span>
          <div class='flex items-center'>
            <div class='mr-1'>{{rating}}</div>
            <span class='material-icons'>thumb_up_off_alt</span>
          </div>
          <span class='font-light ml-2 mr-2'></span>
          <div class='flex items-center'>
            <div class='mr-1'>{{meta.commentsCount}}</div>
            <span class='material-icons'>chat_bubble_outline</span>
          </div>
        </div>
      </div>
      <a :href="'watch/' + meta.uvid" class='bigBtn self-end'>{{$store.getters.t("WATCH_NOW")}}</a>
    </div>
  `,
  computed: {
		cdnURLbase() {
			return this.$store.state.cdnURLbase;
  	},
    meta() {
			return this.$store.state.secondVideoData;
  	},
    userImg() {
      return this.cdnURLbase + 'images/user/' + this.meta.user.uuid + '/small.jpg';
    },
    rating() {
      return this.meta.rating[0] === 0 ? "0%" : Math.floor( this.meta.rating[0] / ( this.meta.rating[0] + this.meta.rating[1] ) * 100 ) + "%";
    }
  }
});

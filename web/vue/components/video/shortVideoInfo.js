Vue.component( 'shortVideoInfo', {
  template: `
    <div class='shortVideoInfo'>
      <a :href="'watch/' + meta.uvid" :title="meta.title" class='shortVideoInfoTitle'>{{meta.title}}</a>
      <div class='shortVideoInfoDescription' v-html="meta.description"></div>
      <div class='shortVideoInfoMeta'>
        <a :href="'user/' + meta.user.name" class='shortVideoInfoUser'>
          <img :src="userImg" class='shortVideoInfoUserImg'/>
          <p class='shortVideoInfoUserName'>{{meta.user.name}}</p>
        </a>
        <span class='shortVideoInfoMetaSpacing'> • </span>
        <div class='shortVideoInfoLang'>{{meta.lang}}</div>
        <span class='shortVideoInfoMetaSpacing'></span>
        <div class='shortVideoInfoRating'>
          <div class='shortVideoInfoRatingText'>{{rating}}</div>
          <span class='material-icons'>thumb_up_off_alt</span>
        </div>
        <span class='shortVideoInfoMetaSpacing'></span>
        <div class='shortVideoInfoComments'>
          <div class='shortVideoInfoCommentsText'>{{meta.commentsCount}}</div>
          <span class='material-icons'>chat_bubble_outline</span>
        </div>
      </div>
      <a :href="'watch/' + meta.uvid" class='bigBtn'>{{$store.getters.t("WATCH_NOW")}}</a>
    </div>
  `,
  computed: {
		cdnURLbase() {
			return this.$store.state.cdnURLbase;
  	},
    meta() {
			return this.$store.state.bgVideoData;
  	},
    userImg() {
      return this.cdnURLbase + 'images/user/' + this.meta.user.uuid + '/small.jpg';
    },
    rating() {
      return this.meta.rating[0] === 0 ? "0%" : Math.floor( this.meta.rating[0] / ( this.meta.rating[0] + this.meta.rating[1] ) * 100 ) + "%";
    }
  }
});

Vue.component( 'sidebar', {
  template: `
    <div class='vjs-sidebar'>
      <div class='vjs-sidebar-content'>
        <div class='vjs-rating'>
          <div class='vjs-rating-vote vjs-button vjs-rating-upvote' :data-title="upVoteTitle">
            <span class='material-icons'>thumb_up_off_alt</span>
          </div>
          <div class='vjs-rating-percent'>{{rating}}</div>
          <div class='vjs-rating-vote vjs-button vjs-rating-downvote' :data-title="downVoteTitle">
            <span class='material-icons'>thumb_down_off_alt</span>
          </div>
        </div>
        <div class='vjs-share-buttons'>
          <div class='vjs-share-button vjs-button vjs-add-playlist' :data-title="$store.getters.t('VIDEO_ADD_PLAYLIST')">
            <span class='material-icons'>playlist_add</span>
          </div>
          <div class='vjs-share-button vjs-button vjs-recommend' :data-title="$store.getters.t('VIDEO_RECOMMEND')">
            <span class='weicon-lightbulb'></span>
          </div>
          <div class='vjs-share-button vjs-button vjs-share' :data-title="$store.getters.t('VIDEO_SHARE')">
            <span class='weicon-share'></span>
          </div>
          <div class='vjs-share-button vjs-button vjs-download' :data-title="$store.getters.t('VIDEO_DOWNLOAD')">
            <span class='weicon-file_download'></span>
          </div>
        </div>
      </div>
    </div>
  `,
  computed: {
    videoData() {
      return this.$store.state.mainVideoData;
    },
    upVoteTitle() {
      return this.$store.getters.t('VIDEO_LIKE') + " (" + this.$store.getters.n(this.videoData.rating[0]) + ")";
    },
    downVoteTitle() {
      return this.$store.getters.t('VIDEO_DISLIKE') + " (" + this.$store.getters.n(this.videoData.rating[1]) + ")";
    },
    rating() {
      return this.videoData.rating[0] == 0 ? "0%" : Math.floor( this.videoData.rating[0] / ( this.videoData.rating[0] + this.videoData.rating[1] ) * 100 ) + "%";
    }
  }
});
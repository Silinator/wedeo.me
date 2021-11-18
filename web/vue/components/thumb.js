Vue.component( 'thumb', {
	props: {
		videoData: Object,
		upid: {
			type: String,
			default: null
		},
	},
	data: function() {
		return {
      thumbPreviewUrl: null,
			thumbImgNumber: 1,
      thumbDiashow: null,
			thumbHoverInfoTransitionHidden: false,
			thumbHoverInfoWidth: 0
    }
	},
  template: `
    <a :href="videoUrl" :id="thumbId"  :class="thumbClass" :data-uvid="videoData.uvid" @mouseenter="startThumbDiashow" @mouseleave="stopThumbDiashow">
      <img class="hidden sm:block" :src="thumbUrlSmall"/>
      <img class="sm:hidden" :src="thumbUrlLarge"/>
      <div :class="'thumbHoverInfo ' + thumbHoverInfoClass" :style="thumbHoverInfoWidthStyle"></div>
      <div class="thumbInfo">
        <div class="thumbMetaInfo">
          <span class="thumbLanguage">{{videoData.language.toUpperCase()}}</span>
          <span class="thumbRating">
            {{rating}}
            <span class="material-icons">thumb_up_off_alt</span>
          </span>
          <span class="thumbComents">
            {{videoData.commentsCount}}
            <span class="material-icons">chat_bubble_outline</span>
          </span>
        </div>
        <div class="thumbTimeInfo">
          {{duration}}
        </div>
      </div>
    </a>
  `,
  computed: {
    cdnURLbase() {
			return this.$store.state.cdnURLbase;
  	},
		videoUrl() {
			var playlistURL = this.upid != null ? "&pl=" + this.upid : "";
			return "watch/" + this.videoData.uvid + playlistURL;
  	},
    thumbClass() {
      return "thumbHolder " + this.videoData.color;
    },
		thumbHoverInfoClass() {
			return this.thumbHoverInfoTransitionHidden === true ? "thumbHoverInfoLeave" : "";
		},
		thumbHoverInfoWidthStyle() {
			return "width:" + this.thumbHoverInfoWidth + "%;";
		},
    thumbId() {
      return "thumb" + this.videoData.uvid;
    },
    thumbUrlSmall() {
      return this.thumbPreviewUrl ? this.thumbPreviewUrl : this.cdnURLbase + "images/thumb/" + this.videoData.uvid + "/small.jpg";
    },
    thumbUrlLarge() {
      return this.thumbPreviewUrl ? this.thumbPreviewUrl : this.cdnURLbase + "images/thumb/" + this.videoData.uvid + "/large.jpg";
    },
    rating() {
      return this.videoData.rating[0] == 0 ? "0%" : Math.floor( this.videoData.rating[0] / ( this.videoData.rating[0] + this.videoData.rating[1] ) * 100 ) + "%";
    },
    duration() {
      return secondsToHms(this.videoData.duration);
    }
  },
  methods: {
    startThumbDiashow() {
      const self = this;
    	this.thumbImgNumber = 1;

    	this.thumbHoverInfoTransitionHidden = false;
    	this.updateThumbDiashow();

    	this.thumbDiashow = setInterval( function() {
      	if( self.thumbImgNumber === 20 ){ self.thumbImgNumber = 0; }
        self.thumbImgNumber++;

    		self.updateThumbDiashow();
      }, 450);
    },
    updateThumbDiashow() {
    	this.thumbHoverInfoWidth = 100 / 20 * this.thumbImgNumber;
      this.thumbPreviewUrl = this.cdnURLbase + "images/thumb/" + this.videoData.uvid + "/" + this.thumbImgNumber + ".jpg";
    },
    stopThumbDiashow() {
      const self = this
			this.thumbHoverInfoTransitionHidden = true;
			this.thumbHoverInfoWidth = 0;
      this.thumbPreviewUrl = null;

    	if(this.thumbDiashow !== null) {
      	clearInterval(this.thumbDiashow);
      }
    }
  }
});

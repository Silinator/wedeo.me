Vue.component( 'thumb', {
	props: [ 'videoData', ],
	data: function() {
		return {
      thumbPreviewUrl: null,
      thumbDiashow: null
    }
	},
  template: `
    <a :href="videoUrl" :id="thumbId"  :class="thumbClass" :data-vuid="videoData.vuid" @mouseenter="startThumbDiashow" @mouseleave="stopThumbDiashow">
      <img :src="thumbUrl"/>
      <div class="thumbHoverInfo"></div>
      <div class="thumbInfo">
        <div class="thumbMetaInfo">
          <span class="thumbLanguage">{{videoData.lang.toUpperCase()}}</span>
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
    URLbase: function() {
			return this.$store.state.URLbase;
  	},
		videoUrl: function() {
      //TODO: add playlist
			return "watchPage.php?v=" + this.videoData.vuid;
  	},
    thumbClass: function() {
      return "thumbHolder " + this.videoData.color;
    },
    thumbId: function() {
      return "thumb" + this.videoData.vuid;
    },
    thumbUrl: function() {
      return this.thumbPreviewUrl ? this.thumbPreviewUrl : this.URLbase + "images/thumb/small_img/" + this.videoData.vuid + ".jpg";
    },
    rating: function() {
      return this.videoData.rating[0] == 0 ? "0%" : Math.floor( this.videoData.rating[0] / ( this.videoData.rating[0] + this.videoData.rating[1] ) * 100 ) + "%";
    },
    duration: function() {
      return secondsToHms(this.videoData.duration);
    }
  },
  methods: {
    startThumbDiashow(){
      const self = this;
    	img = 1;

    	$("#"+this.thumbId).find(".thumbHoverInfo").show();
    	this.updateThumbDiashow(img);

    	this.thumbDiashow = setInterval(function(){
      	if(img===20){ img=0; }
        img++;

    		self.updateThumbDiashow(img);
      }, 600);
    },
    updateThumbDiashow( img ){
    	$("#"+this.thumbId).find(".thumbHoverInfo").css("width", 100/20*img + "%" );
      this.thumbPreviewUrl = this.URLbase + "images/thumb/preview/" + this.videoData.vuid + "/"+img+".jpg";
    },
    stopThumbDiashow(){
      const self = this
    	$("#"+this.thumbId).find(".thumbHoverInfo").css("width", "0%" );
      $("#"+this.thumbId).find(".thumbHoverInfo").hide();
      this.thumbPreviewUrl = null;

    	if(this.thumbDiashow!==null){
      	clearInterval(self.thumbDiashow);
      }
    }
  },
  created() {
    console.log( this.videoData );
  }
});

Vue.component( 'userPreview', {
  props: ['userInfo'],
  template: `
    <div class='userPreviewContainer'>
      <a :href='userUrl'>
        <img :src='userImg'/>
      </a>
      <div class='userPreviewContent'>
        <a :href='userUrl' class='userName'>{{userInfo.name}}</a>
        <div class='smallBtn subBtn' @click='subscribe' v-html='subText'></div>
      </div>
    </div>
  `,
  computed: {
    cdnURLbase() {
      return this.$store.state.cdnURLbase;
    },
    userImg() {
      return this.cdnURLbase + "images/user/" + this.userInfo.uuid + "/small.jpg";
    },
    userUrl() {
      return "/user/" + this.userInfo.name;
    },
    subText() {
      return ( this.userInfo.subed ? '<span class="material-icons">done</span> ' + this.$store.getters.t('SUBSCRIBED') : this.$store.getters.t('SUBSCRIBE') );
    }
  },
  methods: {
    subscribe() {
      this.userInfo.subed = !this.userInfo.subed;
    }
  },
  mounted() {
  }
});

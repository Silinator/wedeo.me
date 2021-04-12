Vue.component( 'userPreview', {
  props: ['userInfo'],
  template: `
    <div class='userPreviewContainer'>
      <a :href='userUrl'>
        <img :src='userImg'/>
      </a>
      <div class='userPreviewContent'>
        <a :href='userUrl' class='userName'>{{userInfo.name}}</a>
        <div class='smallBtn subBtn' v-on:click='subscribe' v-html='subText'></div>
      </div>
    </div>
  `,
  computed: {
    URLbase() {
      return this.$store.state.URLbase;
    },
    userImg() {
      return this.URLbase + "images/avatar/small/" + this.userInfo.uuid + ".jpg";
    },
    userUrl() {
      return "/user/" + this.userInfo.name;
    },
    subText() {
      return ( this.userInfo.subed ? '<span class="material-icons">done</span> ' + t('SUBSCRIBED') : t('SUBSCRIBE') );
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

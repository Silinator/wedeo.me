Vue.component( 'userPreview', {
  props: ['userInfo'],
  template: `
    <div class='flex justify-start gap-2 mb-2'>
      <a :href='userUrl'>
        <img :src='userImg' height="58px" width="58px"/>
      </a>
      <div class='flex flex-col'>
        <a :href='userUrl' class='text-base mb-1 text-white no-underline'>{{userInfo.name}}</a>
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

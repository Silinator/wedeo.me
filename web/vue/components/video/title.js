Vue.component( 'playerTitle', {
  props: [ 'videoData', 'type' ],
  template: `
    <div v-if="type==='top'" class='vjs-header'>
      <div class='vjs-header-title' :title="title">{{title}}</div>
    </div>
    <div v-else-if="type==='bottom'" class='vjs-bottom-title' :title="title">{{title}}</div>
  `,
  computed: {
    title() {
      return this.videoData.title;
    }
  }
});

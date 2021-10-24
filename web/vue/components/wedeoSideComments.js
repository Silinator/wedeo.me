Vue.component( 'wedeoSideComments', {
  data: function() {
    return {
      activeTab: "comments",
    }
  },
  template: `
    <div class='wedeoSideComments'>
			Comments
    </div>
  `,
  computed: {
		videoData() {
			return this.$store.state.mainVideoData;
		}
  },
  methods: {
  },
  mounted() {
  }
});

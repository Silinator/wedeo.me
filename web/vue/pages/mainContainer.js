Vue.component( 'mainContainer', {
  template: `
    <div class="wedeoApp">
      <mainHeader/>
      <div class='mainContainer'>
        <index      v-if="page === 'index'"/>
        <watch v-else-if="page === 'watch'"/>
      </div>
    </div>
  `,
  computed: {
    page() {
      return this.$store.state.page;
    }
  }
});
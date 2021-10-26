<?php
require_once( __DIR__ . '/include/start.php' );

$page = isset( $_GET['page'] ) ? dbEsc( $_GET['page'] ) : 'index';

switch($page) {
  case 'index': require_once( __DIR__ . '/include/pages/index.php' ); break;
  case 'watch': require_once( __DIR__ . '/include/pages/watch.php' ); break;
}

if( isset( $_GET['json'] ) ) {
  $asJson = $_GET['json'] == "true";
} else {
  $asJson = false;
}

if( !$asJson ) {
?>
  <!DOCTYPE html>
  <html lang="de" dir="ltr">
    <head>
      <?php require_once("include/head.php"); ?>
    </head>
    <body class="bg-bg text-white">

    <?php // just for now, make this better later ?>
    <script>
      <?php if( $page === "watch" ) { ?>
      store.commit( 'setMainVideoData', JSON.parse('<?=json_encode($json->videoData)?>') );
      <?php } else if( $page === "index" ) { ?>
      store.commit( 'setSecondVideoData', JSON.parse('<?=json_encode($json->videoData)?>') );
      <?php } ?>
    </script>

    <script src="vue/pages/mainContainer.js"></script>
    <script src="vue/pages/watch.js"></script>
    <script src="vue/pages/index.js"></script>

    <script src="vue/components/video/shortVideoInfo.js"></script>
    <script src="vue/components/video/settingsMenu.js"></script>
    <script src="vue/components/video/sidebar.js"></script>
    <script src="vue/components/video/title.js"></script>

    <script src="vue/components/wedeoSideContainer.js"></script>
    <script src="vue/components/wedeoSidePlaylist.js"></script>
    <script src="vue/components/wedeoSideComments.js"></script>
    <script src="vue/components/wedeoSideInfo.js"></script>
    <script src="vue/components/wedeoSideMoreVideos.js"></script>

    <div id='mainContainer'></div>

    <script>
      store.commit( 'setPage', '<?=$page?>' );
      store.dispatch('fetchTranslations');

      if( window.matchMedia("(pointer: coarse)").matches ) {
        document.querySelector('body').classList.add('touch');
      }

      activateSamePageNavigation();

      const mainapp = new Vue({
        el: '#mainContainer',
        store,
        template: `<mainContainer/>`
      });

    </script>
  </body>
</html>
<?php
} else {
  header("Content-Type: application/json; charset=UTF-8");

  echo json_encode($json);
}
?>
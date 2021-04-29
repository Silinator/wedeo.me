<?php
  require_once( __DIR__ . '/include/start.php' );

  $vuid = dbEsc($_GET['v']);

  if( isset( $_POST['json'], $_POST['html'] ) ) {
    $asJson = $_POST['json'] == "true";
    $withHtml = $_POST['html'] == "true";
    $apiRequest = true;
  } else {
    $asJson = false;
    $withHtml = false;
    $apiRequest = false;
  }

  $videoData = getVideo( $vuid );

  /* playlistdata */
  if( isset($_GET['pl']) ) {
    //if playlist exist
      $videoData->playlistId = dbEsc($_GET['pl']);

    //get prev and next video
      $videoData->previousVideo = "";
      $videoData->nextVideo = "";
  }

  /* start at */
  if( isset($_GET['t']) && intval($_GET['t']) ) {
    $videoData->startAt = intval($_GET['t']);
  }

  $htmlTitle = $videoData->title . " | wedeo.me";
  $json = (object)[
    "htmlTitle" => $htmlTitle,
    "videoData" => $videoData
  ];

if( !$asJson ) {
?>
  <!DOCTYPE html>
  <html lang="de" dir="ltr">
    <head>
      <?php require_once("include/head.php"); ?>
    </head>
    <body>
      <script>
        let videoData;
      </script>
      <?php require_once("components/header.php"); ?>
      <mainContainer>
<?php
}

if( $withHtml || !$apiRequest ) {
  if( $asJson ) {
    ob_start();
  }
?>
    <script src="js/vue/components/wedeoSideContainer.js"></script>
    <script src="js/vue/components/wedeoSidePlaylist.js"></script>
    <script src="js/vue/components/wedeoSideComments.js"></script>
    <script src="js/vue/components/wedeoSideInfo.js"></script>
    <script src="js/vue/components/wedeoSideMoreVideos.js"></script>

    <mainWedeoContainer>
      <wedeoContainer>
        <video id="wedeo-player" class="wedeo-player video-js cover" controls></video>
      </wedeoContainer>

      <wedeoSideContainer></wedeoSideContainer>
    </mainWedeoContainer>

    <script type="text/javascript">
      videoData = JSON.parse('<?=json_encode($json->videoData)?>');

      function pageScripts() {
        wedeoPlayer = new wedeoPlayerClass( 'wedeo-player' );
        wedeoPlayer.addSizeButton();
        wedeoPlayer.setVideo(videoData);
        //wedeoPlayer.setTime( 42 );

        $( window ).resize(function() { wedeoPlayer.resizeWedeo(); });

        store.commit( 'setWedeoPlayer', wedeoPlayer );
        store.commit( 'setCurrentVideoInfo', videoData );

        const mainapp = new Vue({
          el: 'wedeoSideContainer',
          store,
          template: `
            <wedeoSideContainer></wedeoSideContainer>
          `
        });
      }

      function resizeWedeo() {
        const max = $( window ).width() - 320 - 30 - 20;
        let width = $('.wedeoSideContainer').height() / 9 * 16;

        if( width > max ) { width = max; }

        $('wedeoContainer').width( width );
      }
    </script>
<?php
}

if( !$asJson ) {
?>
    </mainContainer>
    <script type="text/javascript">
      function docReady() {
        htmlLoaded();
        pageScripts();
      }
    </script>
  </body>
</html>
<?php
} else {
  header("Content-Type: application/json; charset=UTF-8");

  if( $withHtml ) {
    $json->html = ob_get_contents();
    ob_end_clean();
  }

  echo json_encode($json);
}
?>

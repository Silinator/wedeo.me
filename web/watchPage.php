<?php
  require_once( __DIR__ . '/include/start.php' );

  $uvid = dbEsc($_GET['v']);

  if( isset( $_POST['json'], $_POST['html'] ) ) {
    $asJson = $_POST['json'] == "true";
    $withHtml = $_POST['html'] == "true";
    $apiRequest = true;
  } else {
    $asJson = false;
    $withHtml = false;
    $apiRequest = false;
  }

  $videoData = getVideo( $uvid );

  /* playlistdata */
  if( isset($_GET['pl']) ) {
    $upid = dbEsc($_GET['pl']);
    $playlist = getPlaylist( $upid, $uvid );

    if( $playlist != NULL ) {
      $videoData->playlist = (object)[];
      $videoData->playlist->upid = $upid;
    }
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
      <div class='mainContainer'>
<?php
}

if( $withHtml || !$apiRequest ) {
  if( $asJson ) {
    ob_start();
  }
?>
    <script src="vue/components/wedeoSideContainer.js"></script>
    <script src="vue/components/wedeoSidePlaylist.js"></script>
    <script src="vue/components/wedeoSideComments.js"></script>
    <script src="vue/components/wedeoSideInfo.js"></script>
    <script src="vue/components/wedeoSideMoreVideos.js"></script>

    <div class='mainWedeoContainer'>
      <div class='wedeoContainer'>
        <video id="wedeo-player" class="wedeo-player video-js cover" controls></video>
      </div>

      <div class='wedeoSideContainer'></div>
    </div>

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
          el: '.wedeoSideContainer',
          store,
          template: `
            <wedeoSideContainer></wedeoSideContainer>
          `
        });
      }
    </script>
<?php
}

if( !$asJson ) {
?>
    </div>
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

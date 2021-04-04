<?php
  require_once( __DIR__ . '/include/start.php' );

  $htmlTitle = "Willkommen | wedeo.me";

  if( isset( $_POST['json'], $_POST['html'] ) ) {
    $asJson = $_POST['json'] == true;
    $withHtml = $_POST['html'] == true;
    $apiRequest = true;
  } else {
    $asJson = false;
    $withHtml = false;
    $apiRequest = false;
  }

  $json = (object)[
    "htmlTitle" => $htmlTitle,
    "videoMeta" => (object)[
      "vuid" => "ZL7CM0Rd",
      "datavuid" => "JnhdhWTGOaCFMzPPAca0JkDyW",
      "availableSources" => [ "audio", "240p", "480p", "1080p" ],
      "title" => "Minecraft Server overview",
      "description" => "Musik: Mount Olympus - Approaching Nirvana <br/>https://www.youtube.com/watch?v=fe2s-7IYg-0 <br/>https://www.youtube.com/watch?v=fe2s-7IYg-0",
      "commentsCount" => 4,
      "rating" => [ 2, 0 ],
      "lang" => "ENG",
      "user" => (object)[
        "uuid" => "G4bGS4TQajeo",
        "name" => "Silinator",
      ],
      "playlistId" => "",
      "previousVideo" => "",
      "nextVideo" => ""
    ]
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
        let videoMeta;
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
    <video id="wedeo-bg-player" class="wedeo-bg-player video-js" controls></video>

    <!-- <a href="watchPage.php?v=uq7t73s7">Video Link</a> -->
    <div id="allVideos"></div>

    <script type="text/javascript">
      videoMeta = JSON.parse('<?=json_encode($json->videoMeta)?>');

      function pageScripts() {
        console.log( 'ready' );

        wedeoBgPlayer = new wedeoPlayerClass( 'wedeo-bg-player' );
        wedeoBgPlayer.setVideo(videoMeta);

        $(document).scroll(function() {
          if( $(document).scrollTop() > 50 ) {
            $("header").addClass('solid');
          }else{
            $("header").removeClass('solid');
          }
        });

        const app = new Vue({
          el: '#allVideos',
          store,
          template: `
            <allVideos></allVideos>
          `
        });
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

<?php
  require_once( __DIR__ . '/include/start.php' );

  $htmlTitle = "Willkommen | wedeo.me";

  if( isset( $_POST['json'], $_POST['html'] ) ) {
    $asJson = $_POST['json'] == "true";
    $withHtml = $_POST['html'] == "true";
    $apiRequest = true;
  } else {
    $asJson = false;
    $withHtml = false;
    $apiRequest = false;
  }

  $json = (object)[
    "htmlTitle" => $htmlTitle,
    "videoData" => (object)[
      "uvid" => "ZL7CM0Rd",
      "fileUvid" => "JnhdhWTGOaCFMzPPAca0JkDyW",
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
    <video id="wedeo-bg-player" class="wedeo-bg-player video-js" controls></video>

    <div id="allVideos"></div>

    <script type="text/javascript">
      videoData = JSON.parse('<?=json_encode($json->videoData)?>');

      function pageScripts() {
        console.log( 'ready' );

        wedeoBgPlayer = new wedeoPlayerClass( 'wedeo-bg-player' );
        wedeoBgPlayer.setVideo(videoData);

        $(document).scroll(function() {
          if( $(document).scrollTop() > 50 ) {
            $(".header").addClass('solid');
          }else{
            $(".header").removeClass('solid');
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
    </div>
    <script type="text/javascript">
      function docReady() {
        console.log( 'docReady' );
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

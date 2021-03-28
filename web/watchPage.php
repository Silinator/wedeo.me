<?php
  $htmlTitle = "Minecraft Server overview | wedeo.me";

  if( isset( $_POST['json'], $_POST['html'] ) ) {
    $asJson = $_POST['json'] == true;
    $withHtml = $_POST['html'] == true;
    $apiRequest = true;
  } else {
    $asJson = false;
    $withHtml = false;
    $apiRequest = false;
  }

  if( $_GET['v'] == "pTRtfE39" ) {
    $htmlTitle = "Aranoid Vortex - Other side [NSM Release] | wedeo.me";
    $json = (object)[
      "htmlTitle" => $htmlTitle,
      "videoMeta" => (object)[
        "vuid" => "pTRtfE39",
        "datavuid" => "q20Gc2ypR1BdXrtUZ5i1a7hpQ",
        "availableSources" => [ "audio", "240p", "480p", "1080p", "2160p" ],
        "title" => "Aranoid Vortex - Other side [NSM Release]",
        "rating" => [ 4, 0 ],
        "user" => (object)[
          "uuid" => "G4bGS4TQajeo",
          "name" => "Silinator",
        ],
        "playlistId" => "H3yS4FJ6691c",
        "previousVideo" => "",
        "nextVideo" => "uq7t73s7"
      ]
    ];
  } elseif( $_GET['v'] == "uq7t73s7" ) {
    $htmlTitle = "Floatinurboat - Limbo (feat. ELLIØT) [NSM Release] | wedeo.me";
    $json = (object)[
      "htmlTitle" => $htmlTitle,
      "videoMeta" => (object)[
        "vuid" => "uq7t73s7",
        "datavuid" => "QsFksSHmeNOW5BgjTCyZUtTfK",
        "availableSources" => [ "audio", "240p", "480p", "1080p", "2160p" ],
        "title" => "Floatinurboat - Limbo (feat. ELLIØT) [NSM Release]",
        "rating" => [ 2, 0 ],
        "user" => (object)[
          "uuid" => "G4bGS4TQajeo",
          "name" => "Silinator",
        ],
        "playlistId" => "H3yS4FJ6691c",
        "previousVideo" => "pTRtfE39",
        "nextVideo" => "pTRtfE39"
      ]
    ];
  }

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
      <mainContainer>
<?php
}

if( $withHtml || !$apiRequest ) {
  if( $asJson ) {
    ob_start();
  }
?>
    <wedeoContainer>
      <video id="wedeo-player" class="wedeo-player video-js" controls></video>
    </wedeoContainer>

    <a href="watchPage.php?v=pTRtfE39">Next Video</a>

    <script type="text/javascript">
      videoMeta = JSON.parse('<?=json_encode($json->videoMeta)?>');

      function pageScripts() {
        console.log( 'ready' );

        wedeoPlayer = new wedeoPlayerClass( 'wedeo-player' );
        wedeoPlayer.setVideo(videoMeta);
        //wedeoPlayer.setTime( 42 );
      }
    </script>
<?php
}

if( !$asJson ) {
?>
    </mainContainer>
    <script type="text/javascript">
      $(document).ready( function() {
        docReady();
        pageScripts();
      });
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

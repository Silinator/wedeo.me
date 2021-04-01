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
      "videoMeta" => (object)[
        "vuid" => "pTRtfE39",
        "datavuid" => "q20Gc2ypR1BdXrtUZ5i1a7hpQ",
        "availableSources" => [ "audio", "240p", "480p", "1080p", "2160p" ],
        "title" => "Aranoid Vortex - Other side [NSM Release]",
        "description" => "No Strike Music Songs with Hearts And Some More All Copyright Free and Free To use<br/><br/>Join Our TS3 and get youtuber Rank ore NSM Buddy:<br/>NoStrikeMusic.nitrado.net",
        "lang" => "ENG",
        "commentsCount" => 0,
        "rating" => [ 5, 0 ],
        "user" => (object)[
          "uuid" => "HmSFgY0X3DYX",
          "name" => "nsmRecords",
        ],
        "playlistId" => "H3yS4FJ6691c",
        "previousVideo" => "",
        "nextVideo" => "uq7t73s7"
      ]
    ];
  } elseif( $_GET['v'] == "uq7t73s7" ) {
    $htmlTitle = "Floatinurboat - Limbo (feat. ELLIØT) [NSM Release] | wedeo.me";
    $json = (object)[
      "videoMeta" => (object)[
        "vuid" => "uq7t73s7",
        "datavuid" => "QsFksSHmeNOW5BgjTCyZUtTfK",
        "availableSources" => [ "audio", "240p", "480p", "1080p", "2160p" ],
        "title" => "Floatinurboat - Limbo (feat. ELLIØT) [NSM Release]",
        "description" => "No one can get a copyright claim if you use our songs , Because this song is free to use for your youtube videos...",
        "rating" => [ 2, 0 ],
        "lang" => "ENG",
        "commentsCount" => 0,
        "user" => (object)[
          "uuid" => "HmSFgY0X3DYX",
          "name" => "nsmRecords",
        ],
        "playlistId" => "H3yS4FJ6691c",
        "previousVideo" => "pTRtfE39",
        "nextVideo" => "pTRtfE39"
      ]
    ];
  } elseif( $_GET['v'] == "ZL7CM0Rd" ) {
    $json = (object)[
      "videoMeta" => (object)[
        "vuid" => "ZL7CM0Rd",
        "datavuid" => "JnhdhWTGOaCFMzPPAca0JkDyW",
        "availableSources" => [ "audio", "240p", "480p", "1080p" ],
        "title" => "Minecraft Server overview",
        "description" => "Musik: Mount Olympus - Approaching Nirvana <br/>https://www.youtube.com/watch?v=fe2s-7IYg-0",
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
  } elseif( $_GET['v'] == "49lUrQcO" ) {
    $json = (object)[
      "videoMeta" => (object)[
        "vuid" => "49lUrQcO",
        "datavuid" => "HkgdCtAmwkmMbwK7OlISfR89R",
        "availableSources" => [ "audio", "240p", "360p", "480p", "720p", "1080p" ],
        "duration" => 212,
        "title" => "9MK2- Knaxi [NSM Release]",
        "color"=> "orange",
        "description" => "No one can get a copyright claim if you use our songs , Because this song is free to use for your youtube videos...",
        "rating" => [ 4, 0 ],
        "lang" => "ENG",
        "commentsCount" => 20,
        "user" => (object)[
          "uuid" => "HmSFgY0X3DYX",
          "name" => "nsmRecords",
        ],
        "playlistId" => "",
        "previousVideo" => "",
        "nextVideo" => ""
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
      <?php require_once("components/header.php"); ?>
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

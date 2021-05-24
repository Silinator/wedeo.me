<?php
  require_once( __DIR__ . '/../include/start.php' );

  $uvids = json_decode($_GET['uvids']);
  $uvids = array_map( function($uvid) {
    return dbEsc($uvid);
  }, $uvids);

  $videos = getVideos( $uvids );

  $data = (object)[
    "videos" => $videos
  ];

  header('Content-type: application/json');
  echo json_encode( $data );
?>

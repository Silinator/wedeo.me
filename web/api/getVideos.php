<?php
  require_once( __DIR__ . '/../include/start.php' );

  $limit = 24;
  $index = intval($_GET['index']);
  $videos = getAllVideos( $index, $limit );

  $data = (object)[
    "videos" => $videos,
    "max" => count($videos) < $limit ? true : false
  ];

  header('Content-type: application/json');
  echo json_encode( $data );
?>

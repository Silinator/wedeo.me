<?php
  require_once( __DIR__ . '/../include/start.php' );

  $limit = 12;
  $index = intval($_GET['index']);
  $filter = json_decode($_GET['filter']);

  $videos = getMoreVideos( $index, $filter, $limit );

  $data = (object)[
    "videos" => $videos,
    "max" => count($videos) < $limit ? true : false
  ];

  header('Content-type: application/json');
  echo json_encode( $data );
?>

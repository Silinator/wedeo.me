<?php
  require_once( __DIR__ . '/../include/start.php' );

  $index = intval($_GET['index']);
  $filter = json_encode($_GET['filter']);

  $videos = getMoreVideos( $index, $filter );

  header('Content-type: application/json');
  echo json_encode( $videos );
?>

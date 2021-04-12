<?php
  require_once( __DIR__ . '/../include/start.php' );

  $videos = getAllVideos();

  header('Content-type: application/json');
  echo json_encode( $videos );
?>

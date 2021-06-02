<?php
  require_once( __DIR__ . '/../include/start.php' );

  $uvid = dbEsc($_GET['uvid']);
  $upid = dbEsc($_GET['upid']);

  $data = getPlaylist($upid, $uvid);
  $data->orgOrder = $data->videos;

  header('Content-type: application/json');
  echo json_encode( $data );
?>

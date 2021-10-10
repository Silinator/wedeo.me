<?php
$uvid = dbEsc($_GET['v']);
$videoData = getVideo( $uvid );

/* playlistdata */
if( isset($_GET['pl']) ) {
  $upid = dbEsc($_GET['pl']);
  $playlist = getPlaylist( $upid, $uvid );

  if( $playlist != NULL ) {
    $videoData->playlist = (object)[];
    $videoData->playlist->upid = $upid;
  }
}

/* start at */
if( isset($_GET['t']) && intval($_GET['t']) ) {
  $videoData->startAt = intval($_GET['t']);
}

$htmlTitle = $videoData->title . " | wedeo.me";
$json = (object)[
  "pageType" => "watch",
  "htmlTitle" => $htmlTitle,
  "videoData" => $videoData
];
<?php
function getPlaylist($upid, $uvid, $userOrder = false) {
  $playlist_sql = db::$link->query("SELECT * FROM playlists WHERE upid = '$upid'");
  $playlist = $playlist_sql->fetch_object();

  if($playlist) {
    $allPlaylistVideos = getPlaylistVideos($upid, intval($playlist->orderBy));

    if($userOrder === "revers") {
      $allPlaylistVideos = array_reverse($allPlaylistVideos);
    } elseif($userOrder === "random") {
      //add get random order
    }

    $currentVideoIndex = array_search($uvid, $allPlaylistVideos);
    if($currentVideoIndex > -1) {
      $maxIndex = count($allPlaylistVideos) - 1;

      $previousVideo = $currentVideoIndex - 1 < 0 ? $maxIndex : $currentVideoIndex - 1;
      $nextVideo = $currentVideoIndex + 1 > $maxIndex ? 0 : $currentVideoIndex + 1;

      $playlist->videos = $allPlaylistVideos;
      $playlist->videoIndex = $currentVideoIndex;
      $playlist->previousVideo = $allPlaylistVideos[$previousVideo];
      $playlist->nextVideo = $allPlaylistVideos[$nextVideo];
    }else{
      return NULL;
    }

    return $playlist;
  } else {
    return NULL;
  }

}

function getPlaylistVideos($upid, $orderBy, $index = NULL, $limit = NULL) {
  $plVideos = [];
  $videoJoin = "";

  switch($orderBy) {
    case 0: $orderBySql = "ORDER BY pll.position ASC"; break;
    case 1: $orderBySql = "ORDER BY pll.added ASC"; break;
    case 2: $orderBySql = "ORDER BY pll.added DESC"; break;
    case 3:
      $videoJoin = "LEFT JOIN videos v on pll.uvid = v.uvid";
      $orderBySql = "ORDER BY v.publishDate ASC";
    break;
    case 4:
      $videoJoin = "LEFT JOIN videos v on pll.uvid = v.uvid";
      $orderBySql = "ORDER BY v.publishDate DESC";
    break;
  }

  $playlist_sql = db::$link->query(
    "SELECT pll.uvid FROM `playlists` pl
    LEFT JOIN playlistLinks pll on pl.upid = pll.upid
    $videoJoin
    WHERE pl.upid = '$upid' AND pll.status = 'public'
    $orderBySql"
  );

  while( $playlist_row = $playlist_sql->fetch_object() ) {
    $plVideos[] = $playlist_row->uvid;
  }

  return $plVideos;
}

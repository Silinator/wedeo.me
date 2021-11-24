<?php
function getAllVideos( $index, $limit ) {
  $videos_sql = db::$link->query("SELECT * FROM videos WHERE status = 'uploaded' AND privacy = 0 ORDER BY publishDate DESC");
  $videos = [];

  while( $video_row = $videos_sql->fetch_object() ) {
    $videos[] = genVideoJSON( $video_row );
  }

  return $videos;
}

function getMoreVideos( $index, $filter, $limit ) {
  $videos_sql = db::$link->query("SELECT * FROM videos WHERE status = 'uploaded' AND privacy = 0 ORDER BY publishDate DESC LIMIT $index, $limit");
  $videos = [];

  while( $video_row = $videos_sql->fetch_object() ) {
    $videos[] = genVideoJSON( $video_row );
  }

  return $videos;
}

function getVideo($uvid) {
  $videos_sql = db::$link->query("SELECT * FROM videos WHERE uvid = '$uvid'");
  $video = $videos_sql->fetch_object();
  $video = genVideoJSON( $video );

  return $video;
}

function getVideos($uvids) {
  $uvids = implode("','", $uvids);
  $videos_sql = db::$link->query("SELECT * FROM videos WHERE uvid IN ('$uvids') ORDER BY field(uvid, '$uvids') ");
  $videos = [];

  while( $video_row = $videos_sql->fetch_object() ) {
    $videos[] = genVideoJSON( $video_row );
  }

  return $videos;
}

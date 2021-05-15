<?php
function getAllVideos( $index, $limit ) {
  $videos_sql = db::$link->query("SELECT * FROM videos");
  $videos = [];

  while( $video_row = $videos_sql->fetch_object() ) {
    $videos[] = genVideoJSON( $video_row );
  }

  return $videos;
}

function getMoreVideos( $index, $filter, $limit ) {
  $videos_sql = db::$link->query("SELECT * FROM videos");
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


function genVideoJSON($video) {
  $video->rating = [ intval($video->likes), intval($video->dislikes) ];
  $video->resolutions = json_decode($video->resolutions);
  $video->description = genDescription($video->description);
  $video->user = (object)[
    "uuid" => "HmSFgY0X3DYX",
    "name" => "nsmRecords",
    "subed" => false,
  ];

  $video->availableSources = array_map( function($res) {
    return $res->res;
  }, $video->resolutions);

  return $video;
}

function genDescription($string) {
  $string = preg_replace( '/<br>/', "\n", $string);
  $string = htmlspecialchars( $string, ENT_QUOTES );
  $string = autolink( $string, array('target'=>'_blank') );
  $string = preg_replace("/\r\n|\r|\n/", '&nbsp;<br/>', $string); /* &nbsp; because firefox... */
  return $string;
}

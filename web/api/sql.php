<?php
function dbEsc($string) {
  return mysqli_real_escape_string( db::$link, $string );
}

function getAllVideos() {
  $videos_sql = db::$link->query("SELECT * FROM videos");
  $videos = [];

  while( $video_row = $videos_sql->fetch_object() ) {
    $videos[] = genVideoJSON( $video_row );
  }

  return $videos;
}

function getVideo($vuid) {
  $videos_sql = db::$link->query("SELECT * FROM videos WHERE vuid = '$vuid'");
  $video = $videos_sql->fetch_object();
  $video = genVideoJSON( $video );

  return $video;
}


function genVideoJSON($video) {
  $video->commentsCount = 0;
  $video->rating = [ 2, 0 ];
  $video->resolutions = json_decode($video->resolutions);
  $video->ipInfo = json_decode($video->ipInfo);
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

function autolink( $str, $attributes=array() ) {
  $http_re = array('https' => ' https','http' => ' http');
  $str = str_replace(array_keys($http_re),array_values($http_re), $str);

  $attrs = '';
  foreach( $attributes as $attribute => $value ) {
    $attrs .= " {$attribute}=`{$value}`";
  }

  $str = ' ' . $str;
  $str = preg_replace(
    '`([^"=\'>])(((http|https|ftp)://|www.)[^\s<]+[^\s<\.)])`i',
    '$1<a href=\"$2\"'.$attrs.'>$2</a>',
    $str
  );

  $str = substr($str, 1);
  $str = preg_replace('`href=\"www`','href="http://www',$str);

  return $str;
}

function genDescription($string) {
  $string = preg_replace( '/<br>/', "\n", $string);
  $string = htmlspecialchars( $string, ENT_QUOTES );
  $string = autolink( $string, array('target'=>'_blank') );
  $string = preg_replace("/\r\n|\r|\n/", '<br/>', $string);
  return $string;
}

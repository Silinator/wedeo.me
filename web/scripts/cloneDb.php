<?php
require_once( __DIR__ . '/../include/start.php' );

$sql = db::$weteveLink->query("SELECT * FROM `sql_we-teve_eu1`.`video_db`");
while( $row = $sql->fetch_object() ) {
  $uvid = $row->vuid;
  $fileUvid = $row->datavuid;
  $title = $row->video_title;
  $uuid = $row->uuid;
  $duration = $row->dauer;
  $views = $row->views;
  $likes = $row->pos_vote;
  $dislikes = $row->neg_vote;
  $orgResolution = $row->org_resolution;
  $description = $row->info;
  $tags = $row->tags;
  $size = $row->size;
  $resolutions = array_filter( array_map( function($a) {
    $single = explode(":", $a);

    return (OBJECT)[ "res" => $single[0], "size" => isset($single[1]) ? $single[1] : 0 ];
  }, explode(",", $size ) ), function($e) {
      return $e->res !== "audioviso";
  });

  $resolutions = json_encode( array( ...$resolutions ) );

  switch ($row->color) {
    case '#C50000': $color = "red" ; break;
    case '#007abf': $color = "blue" ; break;
    case '#00FFFC': $color = "cyan" ; break;
    case '#2130BC': $color = "Indigo" ; break;
    case '#FF7200': $color = "orange" ; break;
    case '#7EFF00': $color = "lime" ; break;
    case '#7638AD': $color = "purple" ; break;
    case '#00FF9C': $color = "teal" ; break;
    case '#00D100': $color = "green" ; break;
    case '#000000': $color = "black" ; break;
    case '#ffffff': $color = "white" ; break;
    case '#FFD200': $color = "yellow" ; break;
  };

  $lang = $row->sprache;
  $category = $row->kategorie;
  $lastUpdate = $row->last_update;
  $uploadstart = $row->uploadstart;
  $publishDate = $row->uploaddate;
  switch ($row->privacy) {
    case 'public': $privacy = "0" ; break;
    case 'unlist': $privacy = "1" ; break;
    case 'frinds': $privacy = "2" ; break;
    case 'privat': $privacy = "3" ; break;
  };
  $status = $row->status;

  $db = db::$link->query("INSERT INTO videos (uvid,fileUvid,title,uuid,duration,views,commentsCount,likes,dislikes,orgResolution,description,tags,resolutions,color,language,category,lastUpdate,uploadStart,publishDate,privacy,status)
  VALUES
  ('$uvid','$fileUvid','$title','$uuid','$duration','$views','-1','$likes','$dislikes','$orgResolution','$description','$tags','$resolutions','$color','$lang','$category','$lastUpdate','$uploadstart','$publishDate','$privacy','$status')");

  echo $db;
}
<?php
  $ini = parse_ini_file( __DIR__ . '/../../config/wedeome.ini' );
  require_once( __DIR__ . '/../lang/lang.php' );
  require_once( __DIR__ . '/dbConnection.php' );
  require_once( __DIR__ . '/../api/videoSql.php' );
  require_once( __DIR__ . '/../api/playlistSql.php' );
  require_once( __DIR__ . '/functions.php' );

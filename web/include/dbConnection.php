<?php
  class db {
    public static $link;
    public static $metaLink;
  }

  db::$link = new mysqli($ini['db_host'], $ini['db_user'], $ini['db_password'], $ini['db_name']);

  db::$metaLink = new mysqli($ini['meta_db_host'], $ini['meta_db_user'], $ini['meta_db_password'], $ini['meta_db_name']);

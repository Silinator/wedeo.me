<?php
  class db {
    public static $link;
  }

  db::$link = new mysqli($ini['db_host'], $ini['db_user'], $ini['db_password'], $ini['db_name']);

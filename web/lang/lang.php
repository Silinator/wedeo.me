<?php
  class language {
    public function __construct($selLang) {
      $this->selLang = $selLang;

      $translationsRaw = file_get_contents( __DIR__ . "/translations.json");
      $this->translations = json_decode($translationsRaw);
    }

    public function t($id) {
      return $this->translations->{$id}->{$this->selLang->lang};
    }
  }

  $selLang = (object)[
    "lang" => "de",
    "numFor"=> "de-DE"
  ];

  $l = new language($selLang);

  //how to use
  //echo $l->t("VIDEO_PLAYBACK_SPEED-TITLE");

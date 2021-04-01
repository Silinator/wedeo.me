<?php
  $videos =  [];

  $videos[] = (object)[
    "vuid" => "ZL7CM0Rd",
    "datavuid" => "JnhdhWTGOaCFMzPPAca0JkDyW",
    "availableSources" => [ "audio", "240p", "480p", "1080p" ],
    "duration"=> 138,
    "color"=> "green",
    "title" => "Minecraft Server overview",
    "description" => "Musik: Mount Olympus - Approaching Nirvana <br/>https://www.youtube.com/watch?v=fe2s-7IYg-0",
    "commentsCount" => 4,
    "rating" => [ 2, 0 ],
    "lang" => "ENG",
    "user" => (object)[
      "uuid" => "G4bGS4TQajeo",
      "name" => "Silinator",
    ],
    "playlistId" => "",
    "previousVideo" => "",
    "nextVideo" => ""
  ];

  $videos[] = (object)[
    "vuid" => "pTRtfE39",
    "datavuid" => "q20Gc2ypR1BdXrtUZ5i1a7hpQ",
    "availableSources" => [ "audio", "240p", "480p", "1080p", "2160p" ],
    "duration" => 279,
    "color"=> "blue",
    "title" => "Aranoid Vortex - Other side [NSM Release]",
    "description" => "No Strike Music Songs with Hearts And Some More All Copyright Free and Free To use<br/><br/>Join Our TS3 and get youtuber Rank ore NSM Buddy:<br/>NoStrikeMusic.nitrado.net",
    "lang" => "ENG",
    "commentsCount" => 0,
    "rating" => [ 5, 0 ],
    "user" => (object)[
      "uuid" => "HmSFgY0X3DYX",
      "name" => "nsmRecords",
    ],
    "playlistId" => "",
    "previousVideo" => "",
    "nextVideo" => ""
  ];

  $videos[] =  (object)[
    "vuid" => "49lUrQcO",
    "datavuid" => "HkgdCtAmwkmMbwK7OlISfR89R",
    "availableSources" => [ "audio", "240p", "360p", "480p", "720p", "1080p" ],
    "duration" => 212,
    "title" => "9MK2- Knaxi [NSM Release]",
    "color"=> "orange",
    "description" => "No one can get a copyright claim if you use our songs , Because this song is free to use for your youtube videos...",
    "rating" => [ 4, 0 ],
    "lang" => "ENG",
    "commentsCount" => 20,
    "user" => (object)[
      "uuid" => "HmSFgY0X3DYX",
      "name" => "nsmRecords",
    ],
    "playlistId" => "",
    "previousVideo" => "",
    "nextVideo" => ""
  ];

  $videos[] =  (object)[
    "vuid" => "uq7t73s7",
    "datavuid" => "QsFksSHmeNOW5BgjTCyZUtTfK",
    "availableSources" => [ "audio", "240p", "480p", "1080p", "2160p" ],
    "duration" => 195,
    "title" => "Floatinurboat - Limbo (feat. ELLIØT) [NSM Release]",
    "color"=> "purple",
    "description" => "No one can get a copyright claim if you use our songs , Because this song is free to use for your youtube videos...",
    "rating" => [ 2, 0 ],
    "lang" => "ENG",
    "commentsCount" => 0,
    "user" => (object)[
      "uuid" => "HmSFgY0X3DYX",
      "name" => "nsmRecords",
    ],
    "playlistId" => "",
    "previousVideo" => "",
    "nextVideo" => ""
  ];

  header('Content-type: application/json');
  echo json_encode( $videos );
?>

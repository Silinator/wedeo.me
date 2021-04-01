<meta charset="utf-8">

<?php
  echo "<title> " . $htmlTitle . " </title>";
?>

<base href="/wedeo.me/web/">
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=0.7, user-scalable=0">

<?php /* fonts */ ?>
<link href="https://fonts.googleapis.com/css2?family=Material+Icons" rel="stylesheet">
<link rel="preconnect" href="https://fonts.gstatic.com">
<link href="https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,600;0,700;0,800;1,300;1,400;1,600;1,700;1,800&display=swap" rel="stylesheet">

<?php /* own icon font */ ?>
<link rel="stylesheet" href="font/icon-font/style.css"></head>

<?php /* jQuery */ ?>
<script src="node_modules/jquery/dist/jquery.min.js"></script>

<?php /* own */ ?>
<link href="css/main.css" rel="stylesheet">
<script src="js/main.js"></script>

<?php /* vue core */ ?>
<script src="node_modules/vue/dist/vue.min.js"></script>
<script src="node_modules/vuex/dist/vuex.min.js"></script>

<?php /* vue components */ ?>
<script src="js/vue/store.js"></script>
<script src="js/vue/components/allVideos.js"></script>
<script src="js/vue/components/thumb.js"></script>

<?php /* language */ ?>
<script src="lang/lang.js"></script>

<?php /* wedeo player */ ?>
<link href="node_modules/video.js/dist/video-js.min.css" rel="stylesheet">
<script src="node_modules/video.js/dist/video.min.js"></script>
<script src="node_modules/videojs-hotkeys/videojs.hotkeys.min.js"></script>
<link href="css/player.css" rel="stylesheet">
<link href="css/backgroundPlayer.css" rel="stylesheet">
<script src="js/player.js"></script>

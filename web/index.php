<?php
  $htmlTitle = "Player Test";
?>

<!DOCTYPE html>
<html lang="de" dir="ltr">
  <head>
    <base href="/wedeo.me/web/">
    <?php require_once("include/head.php"); ?>
  </head>
  <body>
    <!-- <div class="videoContainer"> -->
    <div class="videoContainer-bg">
      <!-- <video id="wedeo-player" class="wedeo-player video-js" controls></video> -->
      <video id="wedeo-player" class="wedeo-bg-player video-js" controls loop></video>
    </div>
    <button onClick="wedeoPlayer.changeSource( '240p.mp4' )">240p</button>
    <script type="text/javascript">
      var defaultResult = "1080p.mp4";
      var wedeoPlayer = new wedeoPlayerClass( 'wedeo-player', defaultResult );
      wedeoPlayer.setVideo( "ZL7CM0Rd", "JnhdhWTGOaCFMzPPAca0JkDyW" );
    </script>
  </body>
</html>

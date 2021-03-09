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
    <div class="videoContainer">
      <video
        id="wedeo-player"
        class="wedeo-player video-js"
        controls
        poster="https://www.we-teve.com/images/thumb/large_img/ZL7CM0Rd.jpg"
      >
        <source src="https://www.we-teve.com/videos/JnhdhWTGOaCFMzPPAca0JkDyW/1080p.mp4" type="video/mp4" />
      </video>
    </div>
  </body>
</html>

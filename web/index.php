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
      <video id="wedeo-player" class="wedeo-player video-js" controls></video>
    </div>
    <button onClick="ChangeSource()">KLICK</button>
  </body>
</html>

<?php
  $htmlTitle = "Willkommen | wedeo.me";
?>

<!DOCTYPE html>
<html lang="de" dir="ltr">
  <head>
    <?php require_once("include/head.php"); ?>
  </head>
  <body>
    <video id="wedeo-player" class="wedeo-bg-player video-js" controls></video>

    <a href="watchPage.php">Video Link</a>

    <script type="text/javascript">
      const options = {
        defaultResolution: "1080p",
        playbackRate: 1,
        fullscreenUi: "auto"
      };

      const meta = {
        vuid: "H3yS4FJ6691c",
        datavuid: "JnhdhWTGOaCFMzPPAca0JkDyW",
        availableSources: [ "audio", "240p", "480p", "1080p", "2160p" ],
        title: "STUDYBREAK - Arms Wide Open ft. Shubha Vedula [NSM Release]",
        rating: [ 4, 0 ],
        user: {
          uuid: "G4bGS4TQajeo",
          name: "Silinator",
        },
        playlistId: "H3yS4FJ6691c",
        previousVideo: "mg7SY3On",
        nextVideo: "ppcistma"
      }

      $(document).ready( function() {
        docReady();

        wedeoBgPlayer = new wedeoPlayerClass( 'wedeo-player', options );
        wedeoBgPlayer.setVideo(meta);
        //wedeoPlayer.setTime( 42 );
      });
    </script>
  </body>
</html>

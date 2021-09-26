<?php
  require_once( __DIR__ . '/include/start.php' );

  $uuid = dbEsc($_GET['u']);

  if( isset( $_POST['json'], $_POST['html'] ) ) {
    $asJson = $_POST['json'] == "true";
    $withHtml = $_POST['html'] == "true";
    $apiRequest = true;
  } else {
    $asJson = false;
    $withHtml = false;
    $apiRequest = false;
  }

  $htmlTitle = "username | wedeo.me";
  $json = (object)[
    "htmlTitle" => $htmlTitle
  ];

if( !$asJson ) {
?>
  <!DOCTYPE html>
  <html lang="de" dir="ltr">
    <head>
      <?php require_once("include/head.php"); ?>
    </head>
    <body>
      <?php require_once("components/header.php"); ?>
      <div class='mainContainer'>
<?php
}

if( $withHtml || !$apiRequest ) {
  if( $asJson ) {
    ob_start();
  }
?>
    <?=$uuid?>

    <script type="text/javascript">
      function pageScripts() {

      }
    </script>
<?php
}

if( !$asJson ) {
?>
    </div>
    <script type="text/javascript">
      function docReady() {
        htmlLoaded();
        pageScripts();
      }
    </script>
  </body>
</html>
<?php
} else {
  header("Content-Type: application/json; charset=UTF-8");

  if( $withHtml ) {
    $json->html = ob_get_contents();
    ob_end_clean();
  }

  echo json_encode($json);
}
?>

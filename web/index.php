<?php

$page =
  $_GET['page']
  ?? 'dashboard';

$file =
  'pages/' .
  $page .
  '.php';

if (
  !file_exists($file)
) {

  $file =
    'pages/dashboard.php';
}

?>

<!DOCTYPE html>

<html>

<head>

  <meta charset="utf-8">

  <title>
    SIAPP Automation
  </title>

  <link
    rel="stylesheet"
    href="assets/css/app.css">

  <style>
    body {
      font-family: Arial;
      margin: 20px;
    }

    #log {
      background: black;
      color: #00ff00;
      padding: 15px;
      height: 500px;
      overflow: auto;
      white-space: pre-wrap;
      border-radius: 5px;
    }

    button {
      padding: 10px 20px;
      margin-right: 10px;
    }

    #status {
      font-size: 18px;
      font-weight: bold;
    }
  </style>

</head>

<body>

  <?php

  include
    'partials/sidebar.php';

  ?>

  <div class="main">

    <?php

    include
      $file;

    ?>

  </div>

  <script
    src="assets/js/app.js">
  </script>

</body>

</html>
<?php
session_start();

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

$name = $_SESSION['name'];
if ($name == null) {
    header('Location: index.php');
}

?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- <meta http-equiv="refresh" content="60"> -->
    <title>Document</title>
</head>

<body>
    <h1>Waiting for a second player</h1>
    <?php
    include_once 'DB.php';
    app\DB::connect();
    $requests = app\DB::get_requests($name);
    if (app\DB::is_playing($name)) {
        header('Location: game.php');
        exit();
    } else if (!app\DB::is_requested($name)) {
        app\DB::add_request($name);
        header('Location: refresh');
    } else if (count($requests) >= 1){
        $name2 = $requests[0]['name'];
        app\DB::start_play($name, $name2);
    }


    ?>
</body>

</html>
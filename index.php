<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

session_start();

if (isset($_SESSION['name'])) {
    header("Location: online.php");
    exit();
}

?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Home - Online Test</title>

    <?php
    if (isset($_POST['submit'])) {
        echo 'hello';
        include_once 'DB.php';
        $name =  trim(htmlspecialchars($_POST['name']));
        app\DB::connect();
        app\DB::add_to_online($name);

        header("Location: wait.php");
        exit();
    }
    ?>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
</head>

<body>

    <div class="container text-center">

        <h2>Log In </h2>

        <hr>


        <form action="index.php" method="post">
            <div class="form-group text-left center-block" style=" width:50%;">
                <label for="usr">UserName:</label>
                <input placeholder="Enter You Username..." type="text" class="form-control" name="name" required>
            </div>
            <h4><input name="submit" id="submit" type="submit" class="btn-primary" value="Log In" /> <button class="btn-primary" type="reset"> Clear </button></h4>
        </form>

    </div>
</body>

</html>
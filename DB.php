<?php


namespace app;


use mysqli;

class DB
{
    protected static string $db = 'tictac';
    protected static string $table = 'users';
    protected static string $pass = '';
    protected static string $user = 'root';
    protected static mysqli $connection;

    public static function setCreditionals($user, $pass)
    {
        self::$pass = $pass;
        self::$user = $user;
    }

    public static function setTable(string $table){
        self::$table = $table;
    }

    public static function connect()
    {
        self::$connection = new mysqli('localhost', self::$user, self::$pass, self::$db);
    }

    public static function get_user_name($name)
    {
        $result = self::$connection->query("select `name` from `users` where `name` = $name");
        return ($result->num_rows == 0) ? false : $result->fetch_assoc()['name'];
    }

    public static function insert_user_name($name){
        return self::$connection->query("insert into " . self::$table . "(name) values($name)");
    }

    public static function save_or_get_id($name)
    {
        if (empty(self::get_user_name($name))) {
            return self::insert_user_name($name);
        }
        return self::get_user_name($name);
    }

    public static function add_to_online($name){
        $_SESSION['name'] =  $name;
        $sql = "DELETE FROM `online` WHERE plrname='$name'";
        self::$connection->query($sql);
        $sql = "INSERT INTO `online`(`plrname`) VALUES ('$name')";
        self::$connection->query($sql);
    }

    public static function get_requests($name){
        $sql = "SELECT * FROM `requests` WHERE NOT `name`='$name'";
        return self::$connection->query($sql)->fetch_all(MYSQLI_ASSOC);
    }

    public static function add_request($name){
        $sql = "insert into `requests` (`name`) values ('$name')";
        return self::$connection->query($sql);
    }

    public static function is_playing($name){
        $sql = "SELECT * FROM `games` WHERE `pl_name`='$name' OR `pl2_name`='$name'";
        $result = self::$connection->query($sql)->fetch_all(MYSQLI_ASSOC);
        if(empty($result)){
            return false;
        }
        return $result[0]['id'];
    }
    public static function is_requested($name){
        $sql = "SELECT * FROM `requests` WHERE `name`='$name'";
        $result = self::$connection->query($sql)->fetch_all(MYSQLI_ASSOC);
        if(empty($result)){
            return false;
        }
        return true;
    }


    public static function start_play($name1, $name2){
        $sql = "DELETE FROM `requests` WHERE `name` = '$name1'";
        self::$connection->query($sql);
        $sql = "DELETE FROM `requests` WHERE `name` = '$name2'";
        self::$connection->query($sql);
        $sql = "insert into `games` (`pl_name`, `pl2_name`) values ('$name1', '$name2')";
        return self::$connection->query($sql);
    }

    public static function get_game_by_id($game_id){
        $sql = "SELECT * FROM `games` WHERE `id`='$game_id'";
        return $result = self::$connection->query($sql)->fetch_all(MYSQLI_ASSOC)[0];
    }


    public function __destruct(){
        self::$connection->close();
    }
}

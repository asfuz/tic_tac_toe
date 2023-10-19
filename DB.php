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
        $_SESSION['Name'] =  $name;
        $sql = "DELETE FROM `online` WHERE plrname='$name'";
        self::$connection->query($sql);
        $sql = "INSERT INTO `online`(`plrname`) VALUES ('$name')";
        self::$connection->query($sql);
    }


    public function __destruct(){
        self::$connection->close();
    }
}

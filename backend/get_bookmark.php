<?php
$connection = mysqli_connect("localhost", "root", "", "karapetyan");
if (mysqli_connect_errno()) {
    echo "Failed to connect to MySQL: " . mysqli_connect_error() . ". Try to connect again";
    exit();
}
$get_select="select user_id,move_id from bookmark where user_id='".addslashes($_COOKIE['user_id'])."'";
$get_select=mysqli_query($connection, $get_select);
$fetch_all=mysqli_fetch_all($get_select,MYSQLI_NUM);
echo json_encode($fetch_all,265);
?>
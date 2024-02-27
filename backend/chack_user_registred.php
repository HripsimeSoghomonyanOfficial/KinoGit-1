<?php
$connection = mysqli_connect("localhost", "edgar0j2_db", "Karapetyan7695", "edgar0j2_db");
if (mysqli_connect_errno()) {
    echo "Failed to connect to MySQL: " . mysqli_connect_error() . ". Try to connect again";
    exit();
}
$select_users = "select * from users";
$select_users = mysqli_query($connection, $select_users);
echo json_encode(mysqli_fetch_all($select_users, MYSQLI_NUM), 256);
?>
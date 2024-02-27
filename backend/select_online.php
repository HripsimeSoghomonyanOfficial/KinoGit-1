<?php
$connection = mysqli_connect("localhost", "edgar0j2_db", "Karapetyan7695", "edgar0j2_db");
if (mysqli_connect_errno()) {
    echo "Failed to connect to MySQL: " . mysqli_connect_error() . ". Try to connect again";
    exit();
}
$now = time();
$select_online = "select * from guests where last_entry>=" . ($now - 3);
$select_online = mysqli_query($connection, $select_online);
echo json_encode(array("online" => mysqli_num_rows($select_online)));
?>
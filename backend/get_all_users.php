<?php
$connection = mysqli_connect("localhost", "edgar0j2_db", "Karapetyan7695", "edgar0j2_db");
if (mysqli_connect_errno()) {
    echo "Failed to connect to MySQL: " . mysqli_connect_error() . ". Try to connect again";
    exit();
}
$cookie_information = "select * from users";
$cookie_query = mysqli_query($connection, $cookie_information);
$fetch_assoc = mysqli_fetch_all($cookie_query);

echo json_encode($fetch_assoc, 256);
?>
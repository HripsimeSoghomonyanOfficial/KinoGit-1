<?php
$connection = mysqli_connect("localhost", "root", "", "karapetyan");
if (mysqli_connect_errno()) {
	echo "Failed to connect to MySQL: " . mysqli_connect_error() . ". Try to connect again";
	exit();
}
$get_datas = "select * from users where id='" . addslashes($_COOKIE['user_id']) . "'";
$get_datas = mysqli_query($connection, $get_datas);
$fetch_assocc = mysqli_fetch_assoc($get_datas);
$array_data = array("name" => $fetch_assocc['username'], "surname" => $fetch_assocc['lastname'], "email" => $fetch_assocc['email'], "age" => $fetch_assocc['age']);
echo json_encode($array_data, 256);
?>
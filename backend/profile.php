<?php
$connection = mysqli_connect("localhost", "edgar0j2_db", "Karapetyan7695", "edgar0j2_db");
if (mysqli_connect_errno()) {
	echo "Failed to connect to MySQL: " . mysqli_connect_error() . ". Try to connect again";
	exit();
}
$get_datas = "select * from users where id='" . (isset($_COOKIE['user_id']) ? addslashes($_COOKIE['user_id']) : "") . "'";
$get_datas = mysqli_query($connection, $get_datas);
$num_rows = mysqli_num_rows($get_datas);
$fetch_assocc = mysqli_fetch_assoc($get_datas);
if ($num_rows != 0) {
	$array_data = array("name" => $fetch_assocc['username'], "surname" => $fetch_assocc['lastname'], "email" => $fetch_assocc['email'], "age" => $fetch_assocc['age']);
	echo json_encode($array_data, 256);
} else {
	$array_data = array("user" => "not registered");
	echo json_encode($array_data, 256);
}
// veradarcnuma name lastname email age
?>
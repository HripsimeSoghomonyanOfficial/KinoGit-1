<?php
$connection = mysqli_connect("localhost", "edgar0j2_db", "Karapetyan7695", "edgar0j2_db");
if (mysqli_connect_errno()) {
    echo "Failed to connect to MySQL: " . mysqli_connect_error() . ". Try to connect again";
    exit();
}
	$all = json_decode(file_get_contents('php://input'), true);
    $password=$all['password'];
    $mail=$all['mail'];
    $update_password="update users set password='".sha1($password)."' where email='".$mail."'";
    mysqli_query($connection,$update_password);
    echo json_encode(array("reseted"=>"ok"))
?>
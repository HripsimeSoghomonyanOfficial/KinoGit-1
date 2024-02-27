<?php
$login = addslashes($_POST['loginMail']);
$password = addslashes($_POST['loginPassword']);
if (!isset($_POST['keepMe']))
	$keep_me = 1;
else $keep_me=60;

$connection = mysqli_connect("localhost", "edgar0j2_db", "Karapetyan7695", "edgar0j2_db");
if (mysqli_connect_errno()) {
	echo "Failed to connect to MySQL: " . mysqli_connect_error() . ". Try to connect again";
	exit();
}

$sql_login = "select * from users where email='" . $login . "' and password='" . sha1($password) . "' limit 1";
$sql_login = mysqli_query($connection, $sql_login);
$sql_login_checking = mysqli_num_rows($sql_login);

if ($sql_login_checking == 1) {
	$assoc = mysqli_fetch_assoc($sql_login);
	setcookie('user_id', "", time() - 1000);
	setcookie('user_id', "", time() - 1000, "/", "kinogit.ru");
	setcookie('user_id_check', "", time() - 1000);
	setcookie('user_id_check', "", time() - 1000, "/", "kinogit.ru");
	setcookie('user_id', $assoc['id'], time() + (60 * 60 * 24 * $keep_me), "/", "kinogit.ru", false, true);
	setcookie('user_id_check', sha1($assoc['password']), time() + (60 * 60 * 24 * $keep_me), "/", "kinogit.ru", false, true);
	header("Location: https://kinogit.ru/pages/profile/profile.html");
	exit;
}
header("Location: https://kinogit.ru/index.html?not_correct");
// userin logina anum 
?>
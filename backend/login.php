<?php
$login = addslashes($_POST['loginMail']);
$password = addslashes($_POST['loginPassword']);
$keep_me = $_POST['keepMe'];
if (!isset($keep_me))
	$keep_me = 1;
else $keep_me=3;
$connect_for_login = mysqli_connect("kinogit", "root", "", "karapetyan");
if (mysqli_connect_errno()) {
	echo "Failed to connect to MySQL: " . mysqli_connect_error() . ". Try to connect again";
	exit();
}
$sql_login = "select * from users where email='" . $login . "' and password='" . sha1($password) . "' limit 1";
$sql_login = mysqli_query($connect_for_login, $sql_login);
$sql_login_checking = mysqli_num_rows($sql_login);
if ($sql_login_checking == 1) {
	$assoc = mysqli_fetch_assoc($sql_login);
	setcookie('user_id', "", time() - 1000);
	setcookie('user_id', "", time() - 1000, "/", "kinogit");
	setcookie('user_id_check', "", time() - 1000);
	setcookie('user_id_check', "", time() - 1000, "/", "kinogit");
	setcookie('user_id', $assoc['id'], time() + (60 * 60 * 24 * $keep_me), "/", "kinogit", false, true);
	setcookie('user_id_check', sha1($assoc['password']), time() + (60 * 60 * 24 * $keep_me), "/", "kinogit", false, true);
	header("Location: http://kinogit/index.html");
	exit;
}
header("Location: http://kinogit/index.html");
// userin logina anum 
?>
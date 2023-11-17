<?php
$regName = addslashes($_POST['regName']);
$regLname = addslashes($_POST['regLname']);
$regAge = addslashes($_POST['regAge']);
$regEmail = addslashes($_POST['regEmail']);
$regPassword = addslashes($_POST['regPassword']);
$regConfirm = addslashes($_POST['regConfirm']);
$gender = addslashes($_POST['gender']);
$connect = mysqli_connect("kinogit", "root", "", "karapetyan");
$e_mail_checking = "select email from users where email='$regEmail' limit 1";
$query_mail_checking = mysqli_query($connect, $e_mail_checking);
$query_mail_checking = mysqli_num_rows($query_mail_checking);
$insert_into = "insert into users  (username,lastname,email,password,age,gender)  values ('$regName','$regLname','$regEmail','" . sha1($regPassword) . "','$regAge','$gender')";
$query_insert_into = mysqli_query($connect, $insert_into);
$last_inserted_id = mysqli_insert_id($connect);
if (!file_exists("users"))
  mkdir("users");
if (!file_exists("users/" . $last_inserted_id))
  mkdir("users/" . $last_inserted_id);
setcookie('user_id', $last_inserted_id, time() + (60 * 60 * 24), "/", "kinogit", false, true);
setcookie('user_id_check', sha1(sha1($regPassword)), time() + (60 * 60 * 24), "/", "kinogit", false, true);
header("Location: http://kinogit/index.html");
?>
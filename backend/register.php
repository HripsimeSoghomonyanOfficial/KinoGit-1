<?php
$regName = addslashes($_POST['regName']);
$regLname = addslashes($_POST['regLname']);
$regAge = addslashes($_POST['regAge']);
$regEmail = addslashes($_POST['regEmail']);
$regPassword = addslashes($_POST['regPassword']);
$regConfirm = addslashes($_POST['regConfirm']);
$gender = addslashes($_POST['gender']);

$connection = mysqli_connect("localhost", "edgar0j2_db", "Karapetyan7695", "edgar0j2_db");
$e_mail_checking = "select email from users where email='$regEmail' limit 1";
$query_mail_checking = mysqli_query($connection, $e_mail_checking);
$query_mail_checking = mysqli_num_rows($query_mail_checking);
if ($query_mail_checking == 0) {
    $insert_into = "insert into users  (username,lastname,email,password,age,gender)  values ('$regName','$regLname','$regEmail','" . sha1($regPassword) . "','$regAge','$gender')";
    $query_insert_into = mysqli_query($connection, $insert_into);
    $last_inserted_id = mysqli_insert_id($connection);
    if (!file_exists("users"))
        mkdir("users");
    if (!file_exists("users/" . $last_inserted_id))
        mkdir("users/" . $last_inserted_id);
    setcookie('user_id', $last_inserted_id, time() + (60 * 60 * 24), "/", "kinogit.ru", false, true);
    setcookie('user_id_check', sha1(sha1($regPassword)), time() + (60 * 60 * 24), "/", "kinogit.ru", false, true);
    header("Location: https://kinogit.ru/pages/profile/profile.html");
} else
header("Location: https://kinogit.ru/index.html?match_email");
?>
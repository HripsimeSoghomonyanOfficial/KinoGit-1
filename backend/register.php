<?php
$regName = addslashes($_POST['regName']);
$regLname = addslashes($_POST['regLname']);
$regAge = addslashes($_POST['regAge']);
$regEmail = addslashes($_POST['regEmail']);
$regPassword = addslashes($_POST['regPassword']);
$regConfirm = addslashes($_POST['regConfirm']);
$connect = mysqli_connect("localhost", "root", "", "karapetyan");
$e_mail_checking = "select email from users where email='$regEmail' limit 1";
$query_mail_checking = mysqli_query($connect, $e_mail_checking);
$query_mail_checking = mysqli_num_rows($query_mail_checking);
$submit = $_POST['submit'];
if (isset($submit)) {
  if (preg_match("/^[-a-z0-9_\.]+\@[a-z]+\.[a-z]+$/i", $regEmail) && $query_mail_checking == 0) {
    if (preg_match("/^[\w-\.]{2,32}$/ui", $regName)) {
      if (preg_match("/^[\w-\.]{2,32}$/ui", $regLname)) {
        if (preg_match("/[\d]{1,3}/i", $regAge)) {
          if (preg_match("/^[\w-\.]{8,32}$/ui", $regPassword)) {
            if ($regPassword == $regConfirm) {
              $insert_into = "insert into users  (username,lastname,email,password,age)  values ('$regName','$regLname','$regEmail','" . sha1($regPassword) . "','$regAge')";
              $query_insert_into = mysqli_query($connect, $insert_into);
              $last_inserted_id = mysqli_insert_id($connect);
              if (!file_exists("users"))
                mkdir("users");
              if (!file_exists("users/" . $last_inserted_id))
                mkdir("users/" . $last_inserted_id);
              setcookie('user_id', $last_inserted_id, time() + (60 * 60 * 24), "/", "test1.ru", false, true);
              setcookie('user_id_check', sha1(sha1($regPassword)), time() + (60 * 60 * 24), "/", "test1.ru", false, true);
              header("Location: http://www.test1.ru/index.html?1");
              exit;
            }
          }
        }
      }
    }
  }
}
header("Location: http://www.test1.ru/index.html");

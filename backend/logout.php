<?php
if (isset($_POST['submit'])) {
    setcookie('user_id', "", time() - 1000, "/", "kinogit.ru");
    setcookie('user_id', "", time() - 1000);
    setcookie('user_id_check', "", time() - 1000, "/", "kinogit.ru");
    setcookie('user_id_check', "", time() - 1000);
    header("Location: https://kinogit.ru/index.html");
    exit;
}
header("Location: https://kinogit.ru/index.html");
// login exacin hanuma
?>
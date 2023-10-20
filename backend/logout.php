<?php
    if (isset($_POST['submit'])) {
        setcookie('user_id', "", time() - 1000, "/", "test1.ru");
        setcookie('user_id', "", time() - 1000);
        setcookie('user_id_check', "", time() - 1000, "/", "test1.ru");
        setcookie('user_id_check', "", time() - 1000);
        header("Location: http://www.test1.ru/index.html");
        exit;
    }
    header("Location: http://www.test1.ru/index.html");
?>
<?php
if (isset($_POST['submit'])) {
    setcookie('user_id', "", time() - 1000, "/", "kinogit");
    setcookie('user_id', "", time() - 1000);
    setcookie('user_id_check', "", time() - 1000, "/", "kinogit");
    setcookie('user_id_check', "", time() - 1000);
    header("Location: http://kinogit/index.html");
    exit;
}
header("Location: http://kinogit/index.html");
// login exacin hanuma
?>
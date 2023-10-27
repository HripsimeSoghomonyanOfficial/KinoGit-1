<?php
$get_id=addslashes(intval($_GET["id"]));
$connection = mysqli_connect("localhost", "root", "", "karapetyan");
    if (mysqli_connect_errno()) {
        echo "Failed to connect to MySQL: " . mysqli_connect_error() . ". Try to connect again";
        exit();
    }
$sql_select="select * from bookmark where user_id='".addslashes($_COOKIE['user_id'])."' and move_id='$get_id'";
$result_select=mysqli_query($connection,$sql_select);
if (mysqli_num_rows($result_select)==0){
    $insert_into="insert into bookmark (user_id,move_id) values('".addslashes($_COOKIE['user_id'])."','".$get_id."')";
    mysqli_query($connection,$insert_into);
}
else{
    $delete="delete from bookmark where user_id='".addslashes($_COOKIE['user_id'])."' and move_id='".$get_id."'";
    mysqli_query($connection,$delete);
}
?>
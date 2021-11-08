<?php
require "connect.php";
$ten = $_POST['ten'];
$email = $_POST['email'];
$pass = $_POST['pass'];
$sdt = $_POST['sdt'];
$query = "INSERT INTO user_nhi VALUES (null,'$ten','$email', '$pass','$sdt', null, null)";
if(mysqli_query($connect, $query)){
	echo "success";
}else{
	echo "error";
}
?>
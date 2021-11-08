<?php
$email = filter_input(INPUT_POST, "email");
$pass = filter_input(INPUT_POST, "pass");

 
$mysqli = new mysqli("localhost","root","","corona");
$result = mysqli_query($mysqli, "select * from user where email = '".$email."' and pass = '".$pass."'");
if ($data = mysqli_fetch_array($result)) {
	echo '1';
}else{
	echo '0';
}
?>
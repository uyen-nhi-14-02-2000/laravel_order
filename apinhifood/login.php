<?php
require "connect.php";
		//$con = mysqli_connect("localhost","root","","corona"); 
		//mysqli_set_charset($con,"SET NAMES 'utf8'");
		$sdt = filter_input(INPUT_POST, "sdt");
	    $pass = filter_input(INPUT_POST, "pass");
	    $query ="SELECT * FROM user_nhi WHERE sdt='$sdt'AND pass ='$pass'";
	if (mysqli_num_rows(mysqli_query($connect,$query)) > 0) {
		echo "".$sdt;
	}
	else{
		echo "error";
	}

?>
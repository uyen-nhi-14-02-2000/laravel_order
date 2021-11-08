<?php
	include 'connect.php';
	$json = $_POST['json'];
	$data = json_decode($json, true);
	foreach ($data as $value) {
		$madonhang = $value['madonhang'];
		$mamonan = $value['mamonan'];
		$tenmonan = $value['tenmonan'];
		$giatien = $value['giatien'];
		$soluong = $value['soluong'];
		$query = "INSERT INTO chitietdonhang (id,madonhang,mamonan,tenmonan,giatien,soluong) VALUES (null,'$madonhang','$mamonan','$tenmonan','$giatien','$soluong')";
		$Dta = mysqli_query($connect, $query);
	}
	if ($Dta) {
		echo "1";
	}else{
		echo "0";
	}
?>
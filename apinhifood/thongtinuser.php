<?php
	include 'connect.php';
	$ten = $_POST['ten'];
	$sdt =$_POST['sdt'];
	$diachi=$_POST['diachi'];
	$query1 = "SELECT * FROM user_nhi Where sdt= '$sdt'";
	$data1=mysqli_query($connect,$query1);
	while ($row1 = mysqli_fetch_assoc($data1)) {
		$idkh = $row1['id'];
	}
	if (strlen($ten)>0 &&strlen($sdt)>0 && strlen($diachi)>0) {
		$query ="INSERT INTO donhang(id,ten,diachi,idkh) VALUES (null,'$ten','$diachi','$idkh')";
		if (mysqli_query($connect,$query)) {
			$iddonhang = $connect ->insert_id;
			echo "".$iddonhang;
		}
		else{
			echo "Error";
		}
	}
	else {
		echo "Check data";
	}
?>
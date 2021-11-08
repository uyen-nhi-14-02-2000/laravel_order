<?php
	include 'connect.php';
	$dienthoai = filter_input(INPUT_POST, "sdt");
	$makhachhang = mysqli_query($connect,"SELECT * FROM user_nhi WHERE sdt=$dienthoai ");
	while ($row2 = mysqli_fetch_assoc($makhachhang)) {
			$makh = $row2['id'];
	}
	$query ="SELECT * FROM donhang WHERE idkh= '$makh'";
	$mang = array();
	$data=mysqli_query($connect,$query);
	while ($row = mysqli_fetch_assoc($data)) {

		$query1 = "SELECT * FROM chitietdonhang WHERE madonhang=".$row['madonhang'];
		$data1 = mysqli_query($connect,$query1);
		while ($row1 = mysqli_fetch_assoc($data1)) {
			//array_push($mang, new don($row1['giatien'],$row1['tenmonan']));	
			array_push($mang, $row1);	
		}

	
}
echo json_encode($mang);
class don{
	function don($giatien,$tenmonan){
		$this->giatien = $giatien;
			$this->tenmonan = $tenmonan;
	}
}

?>
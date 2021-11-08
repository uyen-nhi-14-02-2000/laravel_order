<?php
require "connect.php";
$query = "SELECT * FROM theloai";
$data = mysqli_query($connect, $query);
$mangth = array();
while ($row = mysqli_fetch_assoc($data)) {
	//array_push($mangth, new theloai(
	//$row['id'],
	//$row['ten'],
	//$row['anh']));
	array_push($mangth, $row);
}
echo json_encode($mangth);
class theloai{
	function theloai($id, $ten, $anh){
		$this->id = $id;
		$this->ten = $ten;
		$this->anh = $anh;
	}
}
?>
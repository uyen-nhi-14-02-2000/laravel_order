<?php
require "connect.php";
$query = "SELECT * FROM thuonghieu";
$data = mysqli_query($connect, $query);

$mangth = [];

while ($row = mysqli_fetch_assoc($data)) {
	array_push($mangth, $row);
	//array_push($mangth, new theloai(
	//$row['id'],
	//$row['ten'],
	//$row['anh'],
	//$row['mota'],
	//$row['diachi']));
}
echo json_encode($mangth);

class theloai{
	function theloai($id, $ten, $anh, $mota, $diachi){
		$this->id = $id;
		$this->ten = $ten;
		$this->anh = $anh;
		$this->mota = $mota;
		$this->diachi = $diachi;
	}
}
?>
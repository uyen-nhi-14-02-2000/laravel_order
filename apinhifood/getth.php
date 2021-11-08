<?php
require "connect.php";
$idmn = $_POST['idth'];
$mang = array();
$query = "SELECT * FROM menu WHERE idth = $idmn";
$data = mysqli_query($connect, $query);
while($row = mysqli_fetch_assoc($data)) {
	//array_push($mang,  new mn(
	//$row['id'],
	//$row['tenmon'],
	//$row['mota'],
	//$row['anh'],
	//$row['gia'],
	//$row['idtheloai'],
	//$row['idth']));
	array_push($mang, $row);
}
echo json_encode($mang);
class mn{
	function mn($id, $tenmon, $mota, $anh, $gia, $idtheloai, $idth){
		$this->id = $id;
		$this->tenmon = $tenmon;
		$this->mota = $mota;
		$this->anh = $anh;
		$this->gia = $gia;
		$this->idtheloai = $idtheloai;
		$this->idth = $idth;
	}
}
?>
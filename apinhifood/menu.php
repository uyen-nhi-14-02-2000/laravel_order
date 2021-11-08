<?php
require "connect.php";
$query = "SELECT * FROM menu";
$data = mysqli_query($connect, $query);
class Menu{
	function Menu($id, $tenmon, $anh, $mota, $gia, $idtheloai, $idth){
		$this->id = $id;
		$this->tenmon = $tenmon;
		$this->anh = $anh;
		$this->mota = $mota;
		$this->gia = $gia;
		$this->idtheloai = $idtheloai;
		$this->idth = $idth;
	} 
}
$mang = array();
while($row = mysqli_fetch_assoc($data)){
	//array_push($mang, new Menu($row['id'], $row['tenmon'], $row['anh'], $row['mota'], $row['gia'], $row['idtheloai'], $row['idth'] ));
	array_push($mang, $row);
}
echo json_encode($mang);
?>
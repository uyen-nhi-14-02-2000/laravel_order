-- MySQL dump 10.13  Distrib 8.0.25, for Win64 (x86_64)
--
-- Host: 192.168.10.10    Database: nhifood
-- ------------------------------------------------------
-- Server version	8.0.25-0ubuntu0.20.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `menu`
--

DROP TABLE IF EXISTS `menu`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `menu` (
  `id` int NOT NULL,
  `tenmon` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `mota` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `anh` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `gia` int NOT NULL,
  `idtheloai` int NOT NULL,
  `idth` int NOT NULL,
  `creaded_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `menu`
--

LOCK TABLES `menu` WRITE;
/*!40000 ALTER TABLE `menu` DISABLE KEYS */;
INSERT INTO `menu` VALUES (0,'gà','ngon','https://ameovat.com/wp-content/uploads/2016/05/cach-lam-ga-ran.jpg',59000,2,1,NULL,NULL),(1,'Trà đào','Nguyên liệu: 2 kg đào lai mận (mua loại 30.000 đồng/kg), 1 kg đường (nửa đỏ, nửa trắng), 3 quả chanh.','https://product.hstatic.net/1000075078/product/tra_dao_5f3925d9bfca4d0abc17f95b05fff5f7_master.jpg',29000,1,2,NULL,NULL),(2,'Bạc sỉu','Ngon tuyệt','http://bonpasbakery.com/image/cache/data/N%C6%B0%E1%BB%9Bc%20m%E1%BB%9Bi%202018/N%C6%B0%E1%BB%9Bc%20ly%20th%E1%BB%A7y%20tinh/1-472x378f.jpg',30000,1,2,NULL,NULL),(3,'CÀ PHÊ DỪA','CÀ PHÊ DỪA ngon tuyệt','http://bonpasbakery.com/image/cache/data/N%C6%B0%E1%BB%9Bc%20m%E1%BB%9Bi%202018/N%C6%B0%E1%BB%9Bc%20ly%20th%E1%BB%A7y%20tinh/cafe%20dua-472x378f.jpg',37000,1,2,NULL,NULL),(4,'CAFE ĐÁ XAY','ngon ngon ngon','http://bonpasbakery.com/image/cache/data/N%C6%B0%E1%BB%9Bc%20m%E1%BB%9Bi%202018/N%C6%B0%E1%BB%9Bc%20ly%20th%E1%BB%A7y%20tinh/cafe%20%C4%91%C3%A1%20xay-472x378f.jpg',35000,1,2,NULL,NULL),(5,'TRÀ DÂU RỪNG','TRÀ DÂU RỪNG siêu ngon','http://bonpasbakery.com/image/cache/data/N%C6%B0%E1%BB%9Bc%20m%E1%BB%9Bi%202018/N%C6%B0%E1%BB%9Bc%20ly%20th%E1%BB%A7y%20tinh/tr%C3%A0%20d%C3%A2u-472x378f.jpg',37000,1,2,NULL,NULL),(6,'SINH TỐ DÂU TƯƠI','SINH TỐ DÂU TƯƠI ngon ngon ngon','http://bonpasbakery.com/image/cache/data/N%C6%B0%E1%BB%9Bc%20m%E1%BB%9Bi%202018/N%C6%B0%E1%BB%9Bc%20ly%20th%E1%BB%A7y%20tinh/sinh%20t%E1%BB%91%20d%C3%A2u-472x378f.jpg',43000,1,2,NULL,NULL),(7,'Combo 2','Full phomai mozza + hotdog phomai Hàn Quốc','https://images.foody.vn/res/g81/800131/s120x120/712fe389-3607-4d8c-a345-dc139397e6dd.jpg',59000,2,1,NULL,NULL),(8,' Combo 1','Full hotdog bọc khoai tây + full hotdog + khoai tây chiên','https://images.foody.vn/res/g81/800131/s120x120/dc8ca11f-a2da-4716-b99d-4a3fe4e91585.jpg',59000,2,1,NULL,NULL),(9,'Hotdog phômai Hàn Quốc','Nhân một nữa là phomai mozza một nữa xúc xích','https://images.foody.vn/res/g81/800131/s120x120/a3cf142e-4028-4279-8301-17a5ed902ac5.jpg',59000,2,1,NULL,NULL),(10,' Full xúc xích - Hotdog Hàn Quốc','Xúc xích và lớp vỏ bánh giòn giòn','https://images.foody.vn/res/g81/800131/s120x120/9648abd8-5e4a-4127-ad97-f7afc369273f.jpg',29000,2,1,NULL,NULL),(11,'BÁNH KEM CHANH DÂY LÁT','bánh kem chanh dây 3 ngon','http://bonpasbakery.com/image/cache/data/20170316/20170512/fedfdrg-472x378f.png',27000,3,3,NULL,NULL),(12,'BÔNG LAN PHÔ MAI NHẬT BẢN MINI','bông lan','http://bonpasbakery.com/image/cache/data/20160222/46.1-472x378f.jpg',18000,3,3,NULL,NULL),(13,'BÔNG LAN 4 VỊ','bông lan 4 vị','http://bonpasbakery.com/image/cache/data/S%E1%BA%A3n%20ph%E1%BA%A9m%20m%E1%BB%9Bi/3-472x378f.png',39000,3,3,NULL,NULL),(14,'BÔNG LAN TRỨNG MUỐI','bông lan và trứng muối','http://bonpasbakery.com/image/cache/data/lam%2020.6.2018/bong%20lan%20trung%20muoi-472x378f.jpg',55000,3,3,NULL,NULL),(15,'CHIFFON PHÔ MAI CHẢY','CHIFFON PHÔ MAI CHẢY','http://bonpasbakery.com/image/cache/data/lam%2020.6.2018/9-472x378f.png',50000,3,3,NULL,NULL),(20,'bún mắm','ngon','https://beptruong.edu.vn/wp-content/uploads/2014/06/bun-ca-ha-noi.jpg',59000,2,1,NULL,NULL);
/*!40000 ALTER TABLE `menu` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-11-10 23:16:47

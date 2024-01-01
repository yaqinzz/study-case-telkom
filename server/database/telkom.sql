-- MySQL dump 10.13  Distrib 8.2.0, for Win64 (x86_64)
--
-- Host: localhost    Database: telkom
-- ------------------------------------------------------
-- Server version	8.2.0

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
-- Table structure for table `chat`
--

DROP TABLE IF EXISTS `chat`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `chat` (
  `id` int NOT NULL AUTO_INCREMENT,
  `content` text,
  `type` varchar(45) NOT NULL,
  `created_at` timestamp NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `idchat_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chat`
--

LOCK TABLES `chat` WRITE;
/*!40000 ALTER TABLE `chat` DISABLE KEYS */;
INSERT INTO `chat` VALUES (5,'apa itu react js','user','2024-01-01 22:45:55'),(6,'ReactJS adalah sebuah library JavaScript yang digunakan untuk membangun antarmuka pengguna (user interface) pada aplikasi web. ReactJS dikembangkan oleh Facebook dan memiliki fokus pada efisiensi performa serta kemudahan dalam pengembangan aplikasi yang kompleks. ReactJS menggunakan pendekatan komponen, dimana aplikasi dibangun dengan memecahnya menjadi komponen-komponen kecil yang bisa dikembangkan, dipelihara, dan digunakan kembali. ReactJS juga menggunakan Virtual DOM (Document Object Model) sebagai representasi dari DOM aktual pada browser untuk mempercepat proses pembaruan tampilan.','bot','2024-01-01 22:45:55'),(7,'How can I contact support?','user','2024-01-01 22:46:05'),(8,'To contact support, you can follow these steps:\n\n1. Visit the website or app of the company or service that you need support from.\n2. Look for a \"Contact\" or \"Support\" page usually located in the footer, header, or main menu of the website.\n3. There, you may find various options such as a phone number, email address, live chat, or a support ticket system.\n    - Phone: If a phone number is provided, you can call them directly.\n    - Email: If an email address is provided, you can send them an email explaining your issue or inquiry.\n    - Live Chat: If there is a live chat option, you can click on it and chat with a support representative in real-time.\n    - Support Ticket: Some companies may have a support ticket system where you can fill out a form or submit a ticket to describe your issue.\n4. Choose the contact method that suits you best and follow the instructions provided.\n\nIf you are unable to find the contact information on their website or app, you can also check their social media pages or search for a dedicated support page through an internet search engine.','bot','2024-01-01 22:46:05'),(9,'Tell me about your pricing','user','2024-01-01 22:46:12'),(10,'As an AI language model developed by OpenAI, my pricing is determined by OpenAI. However, I don\'t have direct information on specific details about pricing plans or structures. To get accurate information about pricing, I recommend visiting the OpenAI website or contacting their customer support team for the most up-to-date and accurate pricing information.','bot','2024-01-01 22:46:12');
/*!40000 ALTER TABLE `chat` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-01-02  5:50:10

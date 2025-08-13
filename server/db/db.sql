
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `f_name` varchar(255) DEFAULT NULL,
  `l_name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `added_at` date DEFAULT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `users` VALUES
  (1, 'Betelhem', 'W/Michael', 'betelhem.wmichael@example.com', 'user1', '$2b$10$qG0HQ2C.7JZsMqgxZ7CsSuuZ5eLeU6lLKbg03s4PT3x7GimWJpKzC', '2025-03-24', 'https://images.unsplash.com/photo-1559329007-40df8a9345d8?auto=format&fit=crop&w=1200&q=80'),
  (2, 'Ebise', 'Gutema', 'ebise.gutema@example.com', 'ebiseg', '$2b$10$FWMu8hO9IWlDMPsOE43NyeGj4hd43bit2gv8xo0OG7A.nTphJy/Y6', '2025-03-24', 'https://images.unsplash.com/photo-1559329007-40df8a9345d8?auto=format&fit=crop&w=1200&q=80'),
  (3, 'Fadima', 'Mohammed', 'fadima.mohammed@example.com', 'fadimam', 'pass123', '2025-03-24', 'https://images.unsplash.com/photo-1559329007-40df8a9345d8?auto=format&fit=crop&w=1200&q=80'),
  (4, 'Hawi', 'Belete', 'hawi.belete@example.com', 'hawib', 'pass123', '2025-03-24', 'https://images.unsplash.com/photo-1559329007-40df8a9345d8?auto=format&fit=crop&w=1200&q=80'),
  (5, 'Sinen', 'Abebe', 'sinen.abebe@example.com', 'sinena', 'pass123', '2025-03-24', 'https://images.unsplash.com/photo-1559329007-40df8a9345d8?auto=format&fit=crop&w=1200&q=80'),
  (6, 'Sifen', 'Abebe', 'sifenabebe@example.com', 'sifen', '$2b$10$qG0HQ2C.7JZsMqgxZ7CsSuuZ5eLeU6lLKbg03s4PT3x7GimWJpKzC', '2025-05-25', 'https://images.unsplash.com/photo-1559329007-40df8a9345d8?auto=format&fit=crop&w=1200&q=80'),
  (7, 'Hermela', 'Lakew', 'hermela@gmail.com', 'HermelaLakew1', '$2b$10$0xUoviOsJ1Eiohe60BP.heekAShcCWExMfjMOS0fR7EGtnGhMobjW', '2025-06-01', NULL);

DROP TABLE IF EXISTS `admin`;
CREATE TABLE `admin` (
  `admin_id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `added_at` date DEFAULT NULL,
  PRIMARY KEY (`admin_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `admin` WRITE;
INSERT INTO `admin` VALUES (1, 'admin1', '$2b$10$Ig3csQGwQmQJUw8s9/OWheSHS/qmuHUKeIHhLAazbWF9SsU/LFIaS', 'admin1@example.com', '2025-03-24');
UNLOCK TABLES;

DROP TABLE IF EXISTS `lounge_staff`;

CREATE TABLE `lounge_staff` (
  `lounge_staff_id` INT NOT NULL AUTO_INCREMENT,
  `lounge_id` INT DEFAULT NULL,
  `password` VARCHAR(255) DEFAULT NULL,
  `added_at` DATE DEFAULT NULL,
  `username` VARCHAR(255) DEFAULT NULL,
  PRIMARY KEY (`lounge_staff_id`),
  KEY `lounge_id` (`lounge_id`),
  CONSTRAINT `lounge_staff_ibfk_1` FOREIGN KEY (`lounge_id`) REFERENCES `lounges` (`lounge_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 
  DEFAULT CHARSET=utf8mb4 
  COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `lounge_staff` WRITE;

INSERT INTO `lounge_staff` (`lounge_staff_id`, `lounge_id`, `password`, `added_at`, `username`) VALUES
(1, 1, '$2b$10$5OaDnvAyluxabfQYkOg0wuXZQYNUZRejU6rVpxXburiSKWpieDZFS', '2025-03-24', 'staff1'),
(2, 2, 'pass123', '2025-03-24', 'staff2');

UNLOCK TABLES;

DROP TABLE IF EXISTS `lounges`;

CREATE TABLE `lounges` (
  `lounge_id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) DEFAULT NULL,
  `location` VARCHAR(255) DEFAULT NULL,
  `description` TEXT,
  `added_at` DATE DEFAULT NULL,
  `chapa_public_key` VARCHAR(255) DEFAULT NULL,
  `image_url` VARCHAR(500) DEFAULT NULL,
  `provides_delivery` TINYINT(1) DEFAULT 0,
  `provides_prepaid` TINYINT(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`lounge_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 
  DEFAULT CHARSET=utf8mb4 
  COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `lounges` WRITE;

INSERT INTO `lounges` (`lounge_id`, `name`, `location`, `description`, `added_at`, `chapa_public_key`, `image_url`, `provides_delivery`, `provides_prepaid`) VALUES
(1, 'Lounge One', 'Addis Ababa', 'Trendy downtown spot', '2025-03-24', 'pubkey', 'https://placehold.co/400x300', 1, 1),
(2, 'Chill Zone', 'Adama', 'Relaxed atmosphere.', '2025-03-24', 'pubkey2', 'https://placehold.co/400x300', 0, 1),
(6, 'lke', 'cs department', 'good', '2025-05-29', '', 'https://placehold.co/400x300', 1, 0);

UNLOCK TABLES;

DROP TABLE IF EXISTS `menu_items`;

CREATE TABLE `menu_items` (
  `menu_item_id` INT NOT NULL AUTO_INCREMENT,
  `lounge_id` INT DEFAULT NULL,
  `name` VARCHAR(255) DEFAULT NULL,
  `price` DECIMAL(10,2) DEFAULT NULL,
  `description` TEXT,
  `availability` TINYINT(1) DEFAULT NULL,
  `added_at` DATE DEFAULT NULL,
  `image_url` VARCHAR(255) DEFAULT NULL,
  PRIMARY KEY (`menu_item_id`),
  KEY `lounge_id` (`lounge_id`),
  CONSTRAINT `menu_items_ibfk_1` FOREIGN KEY (`lounge_id`) REFERENCES `lounges` (`lounge_id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 
  DEFAULT CHARSET=utf8mb4 
  COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `menu_items` WRITE;
/*!40000 ALTER TABLE `menu_items` DISABLE KEYS */;

INSERT INTO `menu_items` 
(`menu_item_id`, `lounge_id`, `name`, `price`, `description`, `availability`, `added_at`, `image_url`) VALUES
(1, 1, 'Misir Wot', 12.50, 'Spicy red lentil stew cooked with onions, garlic, and berbere', 0, '2025-03-24', 'https://placehold.co/200x150'),
(2, 1, 'Atkilt Alicha', 15.00, 'Mild stew of cabbage, potatoes, and carrots simmered in turmeric', 0, '2025-03-24', 'https://placehold.co/200x150'),
(3, 2, 'Fosolia', 10.00, 'Green beans and carrots sautéed with onions and herbs', 1, '2025-03-24', 'https://placehold.co/200x150'),
(9, 1, 'Gomen', 30.00, 'Collard greens seasoned with garlic, onions, and oil', 1, NULL, NULL),
(10, 1, 'Timatim Salad', 25.00, 'Fresh tomato and onion salad with olive oil and lemon', 1, NULL, NULL),
(11, 1, 'Shiro', 40.00, 'Chickpea flour stew with rich spices and slow-cooked flavor', 1, '2025-05-29', NULL);

/*!40000 ALTER TABLE `menu_items` ENABLE KEYS */;
UNLOCK TABLES;
DROP TABLE IF EXISTS `feedback`;
CREATE TABLE `feedback` (
  `feedback_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `lounge_id` int DEFAULT NULL,
  `rating` decimal(2,1) DEFAULT NULL,
  `comment` text,
  `added_at` date DEFAULT NULL,
  `responded` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`feedback_id`),
  KEY `user_id` (`user_id`),
  KEY `lounge_id` (`lounge_id`),
  CONSTRAINT `feedback_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  CONSTRAINT `feedback_ibfk_2` FOREIGN KEY (`lounge_id`) REFERENCES `lounges` (`lounge_id`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `feedback` WRITE;
INSERT INTO `feedback` VALUES 
(10,5,1,4.0,'Clean environment and good service.','2025-05-05',0),
(11,6,1,3.5,'Food was okay, delivery was slow.','2025-05-06',0),
(12,7,1,5.0,'Excellent lounge and food quality.','2025-05-07',0),
(13,1,2,4.0,'Tasty but a bit overpriced.','2025-05-08',0),
(14,2,2,3.5,'Nice menu variety.','2025-05-09',0),
(15,3,2,2.0,'Food was cold.','2025-05-10',0),
(16,4,2,4.5,'Loved the smoothies!','2025-05-11',0),
(17,5,2,3.0,'Average experience.','2025-05-12',0),
(18,6,2,4.0,'Good ambience.','2025-05-13',0),
(19,7,2,4.2,'Nice staff, fast service.','2025-05-14',0),
(20,1,3,5.0,'Fantastic pizza!','2025-05-15',0),
(21,2,3,3.8,'Good overall.','2025-05-16',0),
(22,3,3,4.1,'Would recommend.','2025-05-17',0),
(23,4,3,2.5,'Needs improvement.','2025-05-18',0),
(24,5,3,4.3,'Loved it!','2025-05-19',0),
(25,6,3,3.7,'Pretty decent.','2025-05-20',0),
(26,7,3,4.9,'Perfectly cooked meals.','2025-05-21',0);

UNLOCK TABLES;

DROP TABLE IF EXISTS `notifications`;

CREATE TABLE `notifications` (
  `notification_id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT DEFAULT NULL,
  `type` VARCHAR(255) DEFAULT NULL,
  `message` TEXT,
  `added_at` TIMESTAMP NULL DEFAULT NULL,
  `is_read` TINYINT(1) DEFAULT 0,
  PRIMARY KEY (`notification_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `notifications_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 
  DEFAULT CHARSET=utf8mb4 
  COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `notifications` WRITE;
/*!40000 ALTER TABLE `notifications` DISABLE KEYS */;

INSERT INTO `notifications` 
(`notification_id`, `user_id`, `type`, `message`, `added_at`, `is_read`) VALUES
(1, 1, 'order_info', 'Your order is ready.', '2025-05-08 18:24:41', 1),
(2, 2, 'info', 'Promo available now.', '2025-05-08 18:24:41', 0),
(3, 3, 'new_order', 'New order received.', '2025-05-08 18:24:41', 0),
(4, 4, 'info', 'Updated lounge hours.', '2025-05-08 18:24:41', 0),
(5, 5, 'order_info', 'Order #5 is completed.', '2025-05-08 18:24:41', 0),
(6, 5, 'feedback response', 'thanks', '2025-05-14 11:32:47', 0),
(7, 5, 'feedback response', 'recieved', '2025-05-14 17:47:13', 0),
(8, 5, 'feedback response', 'responded!', '2025-05-14 17:57:31', 0),
(9, 4, 'feedback response', 'thanks', '2025-05-14 18:05:00', 0);

/*!40000 ALTER TABLE `notifications` ENABLE KEYS */;
UNLOCK TABLES;


DROP TABLE IF EXISTS `favorites`;
CREATE TABLE `favorites` (
  `user_id` int NOT NULL,
  `menu_item_id` int NOT NULL,
  `added_at` date DEFAULT NULL,
  PRIMARY KEY (`user_id`, `menu_item_id`),
  KEY `menu_item_id` (`menu_item_id`),
  CONSTRAINT `favorites_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  CONSTRAINT `favorites_ibfk_2` FOREIGN KEY (`menu_item_id`) REFERENCES `menu_items` (`menu_item_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `favorites` WRITE;
INSERT INTO `favorites` VALUES 
(1, 1, '2025-03-24'),
(1, 2, '2025-03-24'),
(2, 3, '2025-03-24');
UNLOCK TABLES;


-- Drop tables if they exist
DROP TABLE IF EXISTS `order_items`;
DROP TABLE IF EXISTS `orders`;

-- Create `orders` table
CREATE TABLE `orders` (
  `order_id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT DEFAULT NULL,
  `lounge_id` INT DEFAULT NULL,
  `total_price` DECIMAL(10,2) DEFAULT NULL,
  `status` VARCHAR(255) DEFAULT NULL,
  `added_at` TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (`order_id`),
  KEY `user_id` (`user_id`),
  KEY `lounge_id` (`lounge_id`),
  CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`lounge_id`) REFERENCES `lounges` (`lounge_id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Create `order_items` table
CREATE TABLE `order_items` (
  `order_item_id` INT NOT NULL AUTO_INCREMENT,
  `order_id` INT DEFAULT NULL,
  `menu_item_id` INT DEFAULT NULL,
  `quantity` INT DEFAULT NULL,
  `price` DECIMAL(10,2) DEFAULT NULL,
  PRIMARY KEY (`order_item_id`),
  KEY `order_id` (`order_id`),
  KEY `menu_item_id` (`menu_item_id`),
  CONSTRAINT `order_items_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`),
  CONSTRAINT `order_items_ibfk_2` FOREIGN KEY (`menu_item_id`) REFERENCES `menu_items` (`menu_item_id`)
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Insert data into `orders`
INSERT INTO `orders` (`order_id`, `user_id`, `lounge_id`, `total_price`, `status`, `added_at`) VALUES
(1, 1, 1, 25.00, 'preparing', '2025-05-08 18:24:41'),
(2, 2, 2, 15.00, 'processing', '2025-05-08 18:24:41'),
(6, 1, 1, 100.00, 'pending', '2025-05-09 21:00:00'),
(7, 2, 1, 130.00, 'completed', '2025-05-10 21:00:00'),
(8, 3, 1, 55.00, 'completed', '2025-05-10 21:00:00'),
(9, 4, 1, 60.00, 'completed', '2025-04-24 21:00:00'),
(10, 5, 1, 90.00, 'completed', '2025-03-27 21:00:00'),
(11, 6, 2, 75.00, 'completed', '2025-05-14 21:00:00'),
(12, 4, 2, 40.00, 'completed', '2025-05-14 21:00:00'),
(16, 1, 2, 10.00, 'completed', NULL),
(17, 7, 2, 110.00, 'completed', '2025-06-01 23:00:11'),
(18, 1, 1, 24.50, 'pending', NULL),
(19, 1, 1, 64.50, 'pending', '2025-06-01 21:00:00'),
(20, 1, 1, 40.00, 'completed', '2025-06-02 02:50:12'),
(21, 1, 1, 15.00, 'completed', '2025-06-02 02:52:11'),
(22, 1, 2, 27.00, 'pending', '2025-06-01 21:00:00'),
(23, 1, 1, 30.00, 'completed', '2025-06-02 02:55:33');

-- Insert data into `order_items`
INSERT INTO `order_items` (`order_item_id`, `order_id`, `menu_item_id`, `quantity`, `price`) VALUES
(1, 1, 1, 2, 25.00),
(2, 7, 3, 1, 15.00),
(5, 10, 2, 1, 8.00),
(6, 6, 1, 2, 100.00),
(7, 7, 2, 1, 80.00),
(10, 9, 3, 1, 60.00),
(11, 10, 2, 1, 80.00),
(13, 11, 3, 2, 20.00),
(14, 11, 3, 1, 10.00),
(15, 12, 3, 2, 20.00),
(22, 16, 3, 1, 10.00),
(23, 17, 3, 1, 10.00),
(24, 17, 3, 1, 10.00),
(25, 17, 3, 1, 10.00),
(26, 17, 3, 1, 10.00),
(27, 17, 3, 1, 10.00),
(28, 17, 3, 1, 10.00),
(29, 17, 3, 1, 10.00),
(30, 17, 3, 1, 10.00),
(31, 17, 3, 1, 10.00),
(32, 17, 3, 1, 10.00),
(33, 17, 3, 1, 10.00),
(34, 18, 1, 1, 12.50),
(35, 19, 1, 1, 12.50),
(36, 19, 11, 1, 40.00),
(37, 20, 1, 1, 12.50),
(38, 20, 1, 1, 12.50),
(39, 20, 2, 1, 15.00),
(40, 21, 2, 1, 15.00),
(41, 22, 2, 1, 15.00),
(42, 23, 2, 1, 15.00),
(43, 23, 2, 1, 15.00);


DROP TABLE IF EXISTS `cart_items`;
CREATE TABLE `cart_items` (
  `cart_item_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `menu_item_id` int DEFAULT NULL,
  `quantity` int DEFAULT NULL,
  `added_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`cart_item_id`),
  KEY `user_id` (`user_id`),
  KEY `menu_item_id` (`menu_item_id`),
  CONSTRAINT `cart_items_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  CONSTRAINT `cart_items_ibfk_2` FOREIGN KEY (`menu_item_id`) REFERENCES `menu_items` (`menu_item_id`)
) ENGINE=InnoDB AUTO_INCREMENT=56 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `cart_items` WRITE;
INSERT INTO `cart_items` VALUES 
(12, 7, 2, 1, '2025-06-02 00:04:27'),
(13, 7, 2, 1, '2025-06-02 00:09:52'),
(18, 7, 2, 1, '2025-06-02 01:42:07'),
(19, 7, 2, 1, '2025-06-02 01:42:07'),
(27, 1, 3, 1, '2025-06-02 05:38:53'),
(28, 1, 3, 2, '2025-06-02 05:39:12'),
(29, 1, 3, 3, '2025-06-02 05:39:29'),
(30, 1, 3, 2, '2025-06-02 05:39:31'),
(31, 1, 3, 3, '2025-06-02 05:39:33'),
(32, 1, 3, 2, '2025-06-02 05:39:35'),
(33, 1, 3, 1, '2025-06-02 05:50:07'),
(34, 1, 3, 2, '2025-06-02 05:50:07'),
(35, 1, 3, 3, '2025-06-02 05:50:07'),
(36, 1, 3, 2, '2025-06-02 05:50:07'),
(37, 1, 3, 3, '2025-06-02 05:50:07'),
(38, 1, 3, 2, '2025-06-02 05:50:07'),
(39, 1, 3, 1, '2025-06-02 05:52:43'),
(40, 1, 3, 2, '2025-06-02 05:54:49'),
(41, 1, 3, 3, '2025-06-02 05:54:51'),
(42, 1, 3, 2, '2025-06-02 05:54:52'),
(43, 1, 3, 6, '2025-06-02 05:54:55'),
(44, 1, 3, 5, '2025-06-02 05:54:57'),
(45, 1, 3, 3, '2025-06-02 05:54:58'),
(46, 1, 3, 2, '2025-06-02 05:54:58'),
(47, 1, 3, 3, '2025-06-02 05:55:11'),
(48, 1, 3, 4, '2025-06-02 05:55:12'),
(49, 1, 3, 8, '2025-06-02 05:55:13'),
(50, 1, 3, 13, '2025-06-02 05:55:15'),
(51, 1, 3, 7, '2025-06-02 05:55:18'),
(52, 1, 3, 6, '2025-06-02 05:55:18'),
(53, 1, 3, 5, '2025-06-02 05:55:19'),
(54, 1, 3, 4, '2025-06-02 05:55:20'),
(55, 1, 3, 3, '2025-06-02 05:55:26');
UNLOCK TABLES;

DROP TABLE IF EXISTS `payments`;

CREATE TABLE `payments` (
  `payment_id` INT NOT NULL AUTO_INCREMENT,
  `tx_ref` VARCHAR(255) DEFAULT NULL,
  `order_id` INT DEFAULT NULL,
  `amount` DECIMAL(10,2) DEFAULT NULL,
  `status` VARCHAR(255) DEFAULT NULL,
  `added_at` TIMESTAMP NULL DEFAULT NULL,
  `prepaid_id` INT DEFAULT NULL,
  `type` VARCHAR(255) DEFAULT NULL,
  PRIMARY KEY (`payment_id`),
  KEY `order_id` (`order_id`),
  KEY `prepaid_id` (`prepaid_id`),
  CONSTRAINT `payments_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`),
  CONSTRAINT `payments_ibfk_2` FOREIGN KEY (`prepaid_id`) REFERENCES `prepaid_services` (`prepaid_id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `payments` (`payment_id`, `tx_ref`, `order_id`, `amount`, `status`, `added_at`, `prepaid_id`, `type`) VALUES
(1, 'TX1001', 1, 25.00, 'completed', '2025-05-08 18:24:41', NULL, 'payment'),
(2, 'TX1002', 2, 15.00, 'completed', '2025-05-08 18:24:41', NULL, 'payment'),
(6, NULL, 1, 1022.00, 'completed', NULL, NULL, NULL),
(7, NULL, 1, 1022.00, 'completed', NULL, NULL, NULL),
(8, NULL, 1, 1022.00, 'completed', NULL, NULL, NULL),
(9, 'tx-7977120f-6dbb-464f-a06c-8d3d4d0d4a09', 1, 1022.00, 'completed', NULL, NULL, NULL),
(10, 'tx-b10d9d9d-224a-472c-9dc4-670044106924', 1, 1022.00, 'completed', NULL, NULL, NULL),
(11, 'tx-0a312f8f-51a9-4e5b-8ac7-f771ad454d9b', 1, 1022.00, 'completed', NULL, NULL, NULL),
(12, 'tx-24e30347-54ed-4129-b80a-fbb43a5c17f4', 16, 1022.00, 'completed', NULL, NULL, NULL),
(15, 'wallet-topup-2af3247c-25b0-4fe5-9029-ca38d04ed290', NULL, 500.00, 'completed', '2025-06-01 22:12:00', 1, 'deposit'),
(16, 'wallet-topup-c6827f0f-be3a-4240-84ac-649a7f14c451', NULL, 1000.00, 'completed', '2025-06-01 22:17:41', 1, 'deposit'),
(17, 'tx-85ffcfc0-3951-4546-bb4b-773203411580', 17, 22.00, 'completed', '2025-06-01 23:00:11', NULL, 'cart'),
(18, NULL, 18, 24.50, 'completed', '2025-06-02 01:08:47', NULL, 'cash'),
(19, NULL, 19, 64.50, 'completed', '2025-06-02 01:17:22', NULL, 'cash'),
(20, 'tx-75bcf3fa-e53e-43a6-9bc7-6e19d5edc3e4', 20, 39.50, 'completed', '2025-06-02 02:50:12', NULL, 'cart'),
(21, 'tx-be72d77a-dffc-4841-8a0f-ecee6bcbd555', 21, 27.00, 'completed', '2025-06-02 02:52:11', NULL, 'cart'),
(22, NULL, 22, 27.00, 'not paid', '2025-06-01 21:00:00', NULL, 'cash'),
(23, 'tx-2ec0fcf6-5816-4327-9a53-4dbf04b21a30', 23, 27.00, 'completed', '2025-06-02 02:55:33', NULL, 'cart');

DROP TABLE IF EXISTS `prepaid_service_info`;

CREATE TABLE `prepaid_service_info` (
  `lounge_id` INT NOT NULL,
  `discount_percentage` DECIMAL(5,2) DEFAULT NULL,
  `minimum_top_up` DECIMAL(10,2) DEFAULT NULL,
  `additional_info` TEXT,
  PRIMARY KEY (`lounge_id`),
  CONSTRAINT `prepaid_service_info_ibfk_1` FOREIGN KEY (`lounge_id`) REFERENCES `lounges` (`lounge_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `prepaid_service_info`;
CREATE TABLE `prepaid_service_info` (
  `lounge_id` int NOT NULL,
  `discount_percentage` decimal(5,2) DEFAULT NULL,
  `minimum_top_up` decimal(10,2) DEFAULT NULL,
  `additional_info` text,
  PRIMARY KEY (`lounge_id`),
  CONSTRAINT `prepaid_service_info_ibfk_1` FOREIGN KEY (`lounge_id`) REFERENCES `lounges` (`lounge_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `prepaid_service_info` VALUES
  (1, 40.00, 100.00, 'Free coffee on top-ups over 100'),
  (2, 5.00, 30.00, 'Limited time offer');

DROP TABLE IF EXISTS `prepaid_services`;
CREATE TABLE `prepaid_services` (
  `prepaid_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `lounge_id` int DEFAULT NULL,
  `prepaid_amount` decimal(10,2) DEFAULT NULL,
  `remaining_balance` decimal(10,2) DEFAULT NULL,
  `added_at` date DEFAULT NULL,
  `type` enum('deposit','payment') NOT NULL DEFAULT 'deposit',
  PRIMARY KEY (`prepaid_id`),
  KEY `user_id` (`user_id`),
  KEY `lounge_id` (`lounge_id`),
  CONSTRAINT `prepaid_services_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  CONSTRAINT `prepaid_services_ibfk_2` FOREIGN KEY (`lounge_id`) REFERENCES `lounges` (`lounge_id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `prepaid_services` VALUES
  (1, 1, 1, 1600.00, 1580.00, '2025-06-02', 'deposit'),
  (2, 2, 2, 50.00, 50.00, '2025-03-24', 'deposit'),
  (7, 2, 1, 150.00, 120.00, '2025-05-03', 'deposit'),
  (8, 3, 1, 300.00, 280.00, '2025-05-04', 'deposit'),
  (9, 4, 1, 100.00, 50.00, '2025-05-06', 'deposit'),
  (10, 5, 1, 250.00, 250.00, '2025-05-07', 'deposit');

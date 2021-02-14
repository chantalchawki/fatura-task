DROP TABLE IF EXISTS `category`;
CREATE TABLE `category` (
  `id` int NOT NULL,
  `name` varchar(45) DEFAULT NULL,
  `parent_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `parent_id_idx` (`parent_id`),
  CONSTRAINT `parent_id` FOREIGN KEY (`parent_id`) REFERENCES `category` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
);

DROP TABLE IF EXISTS `product`;
CREATE TABLE `product` (
  `id` int NOT NULL,
  `name` varchar(45) NOT NULL,
  `image_uri` varchar(255) DEFAULT NULL,
  `category_id` int NOT NULL,
  `featured` tinyint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `category_id_idx` (`category_id`),
  CONSTRAINT `category_id` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
);

DROP TABLE IF EXISTS `provider`;
CREATE TABLE `provider` (
  `id` int NOT NULL,
  `name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
);

DROP TABLE IF EXISTS `product_provider`;
CREATE TABLE `product_provider` (
  `price` double NOT NULL,
  `available` tinyint DEFAULT NULL,
  `product_id` int NOT NULL,
  `provider_id` int NOT NULL,
  PRIMARY KEY (`product_id`,`provider_id`),
  KEY `provider_id_idx` (`provider_id`),
  CONSTRAINT `product_id` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `provider_id` FOREIGN KEY (`provider_id`) REFERENCES `provider` (`id`)
);


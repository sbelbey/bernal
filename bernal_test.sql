SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

CREATE DATABASE IF NOT EXISTS `bernal_test` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `bernal_test`;

CREATE TABLE `avatarImage` (
  `id` char(36) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `name` varchar(30) NOT NULL,
  `url` varchar(80) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `cart` (
  `id` char(36) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `isActive` tinyint(1) NOT NULL,
  `createdAt` datetime NOT NULL,
  `createdBy` char(36) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `updatedBy` char(36) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `cartProduct` (
  `id` char(36) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `cartId` char(36) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `productId` char(36) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `cartUser` (
  `id` char(36) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `userId` char(36) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `cartId` char(36) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `category` (
  `id` char(36) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `createdAt` datetime NOT NULL,
  `createdBy` char(36) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `updatedBy` char(36) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `product` (
  `id` char(36) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `name` varchar(40) NOT NULL,
  `brand` varchar(40) NOT NULL,
  `model` varchar(40) DEFAULT NULL,
  `price` decimal(5,2) NOT NULL,
  `description` text NOT NULL,
  `origin` varchar(10) NOT NULL,
  `maintenanceFree` tinyint(1) DEFAULT NULL,
  `waranty` int(2) NOT NULL,
  `voltage` int(2) DEFAULT NULL,
  `capacity` int(4) DEFAULT NULL,
  `height` decimal(3,2) DEFAULT NULL,
  `width` decimal(3,2) DEFAULT NULL,
  `length` decimal(3,2) DEFAULT NULL,
  `stock` int(4) NOT NULL,
  `isActive` tinyint(1) NOT NULL,
  `createdAt` datetime NOT NULL,
  `createdBy` char(36) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `updatedBy` char(36) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `productCategory` (
  `id` char(36) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `productId` char(36) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `categorytId` char(36) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `productStockImage` (
  `id` char(36) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `productId` char(36) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `stockImageId` char(36) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `productVehicle` (
  `id` char(36) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `productId` char(36) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `vehicleId` char(36) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `productVehicleType` (
  `id` char(36) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `productId` char(36) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `vehicleType` char(36) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `SequelizeMeta` (
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE `stockImage` (
  `id` char(36) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `name` varchar(30) NOT NULL,
  `url` varchar(80) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `user` (
  `id` char(36) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `name` varchar(40) DEFAULT NULL,
  `midleName` varchar(40) DEFAULT NULL,
  `lastName` varchar(80) DEFAULT NULL,
  `email` varchar(80) NOT NULL,
  `hasPassword` varchar(100) NOT NULL,
  `address` text,
  `phoneNumber` int(10) DEFAULT NULL,
  `cellphone` int(10) DEFAULT NULL,
  `city` varchar(20) DEFAULT NULL,
  `province` varchar(20) DEFAULT NULL,
  `isAdmin` tinyint(1) NOT NULL,
  `isActive` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `userAvatarImage` (
  `id` char(36) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `userId` char(36) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `avatarImageId` char(36) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `userVehicle` (
  `id` char(36) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `userId` char(36) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `vehicleId` char(36) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `vehicle` (
  `id` char(36) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `brand` varchar(40) NOT NULL,
  `model` varchar(40) NOT NULL,
  `engine` varchar(40) NOT NULL,
  `year` datetime NOT NULL,
  `isActive` tinyint(1) NOT NULL,
  `createdAt` datetime NOT NULL,
  `createdBy` char(36) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `updatedBy` char(36) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `vehicleType` (
  `id` char(36) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `type` varchar(20) NOT NULL,
  `vehicle` char(36) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


ALTER TABLE `avatarImage`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `cart`
  ADD PRIMARY KEY (`id`),
  ADD KEY `createdBy` (`createdBy`),
  ADD KEY `updatedBy` (`updatedBy`);

ALTER TABLE `cartProduct`
  ADD PRIMARY KEY (`id`),
  ADD KEY `cartId` (`cartId`),
  ADD KEY `productId` (`productId`);

ALTER TABLE `cartUser`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`),
  ADD KEY `cartId` (`cartId`);

ALTER TABLE `category`
  ADD PRIMARY KEY (`id`),
  ADD KEY `createdBy` (`createdBy`),
  ADD KEY `updatedBy` (`updatedBy`);

ALTER TABLE `product`
  ADD PRIMARY KEY (`id`),
  ADD KEY `createdBy` (`createdBy`),
  ADD KEY `updatedBy` (`updatedBy`);

ALTER TABLE `productCategory`
  ADD PRIMARY KEY (`id`),
  ADD KEY `productId` (`productId`),
  ADD KEY `categorytId` (`categorytId`);

ALTER TABLE `productStockImage`
  ADD PRIMARY KEY (`id`),
  ADD KEY `productId` (`productId`),
  ADD KEY `stockImageId` (`stockImageId`);

ALTER TABLE `productVehicle`
  ADD PRIMARY KEY (`id`),
  ADD KEY `productId` (`productId`),
  ADD KEY `vehicleId` (`vehicleId`);

ALTER TABLE `productVehicleType`
  ADD PRIMARY KEY (`id`),
  ADD KEY `productId` (`productId`),
  ADD KEY `vehicleType` (`vehicleType`);

ALTER TABLE `SequelizeMeta`
  ADD PRIMARY KEY (`name`),
  ADD UNIQUE KEY `name` (`name`);

ALTER TABLE `stockImage`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `userAvatarImage`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`),
  ADD KEY `avatarImageId` (`avatarImageId`);

ALTER TABLE `userVehicle`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`),
  ADD KEY `vehicleId` (`vehicleId`);

ALTER TABLE `vehicle`
  ADD PRIMARY KEY (`id`),
  ADD KEY `createdBy` (`createdBy`),
  ADD KEY `updatedBy` (`updatedBy`);

ALTER TABLE `vehicleType`
  ADD PRIMARY KEY (`id`),
  ADD KEY `vehicle` (`vehicle`);


ALTER TABLE `cart`
  ADD CONSTRAINT `cart_ibfk_1` FOREIGN KEY (`createdBy`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `cart_ibfk_2` FOREIGN KEY (`updatedBy`) REFERENCES `user` (`id`);

ALTER TABLE `cartProduct`
  ADD CONSTRAINT `cartproduct_ibfk_1` FOREIGN KEY (`cartId`) REFERENCES `cart` (`id`),
  ADD CONSTRAINT `cartproduct_ibfk_2` FOREIGN KEY (`productId`) REFERENCES `product` (`id`);

ALTER TABLE `cartUser`
  ADD CONSTRAINT `cartuser_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `cartuser_ibfk_2` FOREIGN KEY (`cartId`) REFERENCES `cart` (`id`);

ALTER TABLE `category`
  ADD CONSTRAINT `category_ibfk_1` FOREIGN KEY (`createdBy`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `category_ibfk_2` FOREIGN KEY (`updatedBy`) REFERENCES `user` (`id`);

ALTER TABLE `product`
  ADD CONSTRAINT `product_ibfk_1` FOREIGN KEY (`createdBy`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `product_ibfk_2` FOREIGN KEY (`updatedBy`) REFERENCES `user` (`id`);

ALTER TABLE `productCategory`
  ADD CONSTRAINT `productcategory_ibfk_1` FOREIGN KEY (`productId`) REFERENCES `product` (`id`),
  ADD CONSTRAINT `productcategory_ibfk_2` FOREIGN KEY (`categorytId`) REFERENCES `category` (`id`);

ALTER TABLE `productStockImage`
  ADD CONSTRAINT `productstockimage_ibfk_1` FOREIGN KEY (`productId`) REFERENCES `product` (`id`),
  ADD CONSTRAINT `productstockimage_ibfk_2` FOREIGN KEY (`stockImageId`) REFERENCES `stockImage` (`id`);

ALTER TABLE `productVehicle`
  ADD CONSTRAINT `productvehicle_ibfk_1` FOREIGN KEY (`productId`) REFERENCES `product` (`id`),
  ADD CONSTRAINT `productvehicle_ibfk_2` FOREIGN KEY (`vehicleId`) REFERENCES `vehicle` (`id`);

ALTER TABLE `productVehicleType`
  ADD CONSTRAINT `productvehicletype_ibfk_1` FOREIGN KEY (`productId`) REFERENCES `product` (`id`),
  ADD CONSTRAINT `productvehicletype_ibfk_2` FOREIGN KEY (`vehicleType`) REFERENCES `vehicleType` (`id`);

ALTER TABLE `userAvatarImage`
  ADD CONSTRAINT `useravatarimage_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `useravatarimage_ibfk_2` FOREIGN KEY (`avatarImageId`) REFERENCES `avatarImage` (`id`);

ALTER TABLE `userVehicle`
  ADD CONSTRAINT `uservehicle_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `uservehicle_ibfk_2` FOREIGN KEY (`vehicleId`) REFERENCES `vehicle` (`id`);

ALTER TABLE `vehicle`
  ADD CONSTRAINT `vehicle_ibfk_1` FOREIGN KEY (`createdBy`) REFERENCES `category` (`id`),
  ADD CONSTRAINT `vehicle_ibfk_2` FOREIGN KEY (`updatedBy`) REFERENCES `category` (`id`);

ALTER TABLE `vehicleType`
  ADD CONSTRAINT `vehicletype_ibfk_1` FOREIGN KEY (`vehicle`) REFERENCES `vehicle` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

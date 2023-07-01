-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 01, 2023 at 10:44 PM
-- Server version: 10.4.6-MariaDB
-- PHP Version: 7.1.31

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `booking_hotel`
--

-- --------------------------------------------------------

--
-- Table structure for table `address`
--

CREATE TABLE `address` (
                           `address_id` bigint(20) NOT NULL,
                           `full_address` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
                           `lat` double DEFAULT NULL,
                           `lng` double DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `address`
--

INSERT INTO `address` (`address_id`, `full_address`, `lat`, `lng`) VALUES
    (2, '58/19 Ba Tháng Hai, Ph??ng 1, Thành ph? ?à L?t, Lâm ??ng, Vi?t Nam', 11.9425783, 108.4343696);

-- --------------------------------------------------------

--
-- Table structure for table `feedback`
--

CREATE TABLE `feedback` (
                            `feedback_id` bigint(20) NOT NULL,
                            `content` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
                            `create_date` date DEFAULT NULL,
                            `number_of_stars` int(11) DEFAULT NULL,
                            `orders_id` bigint(20) DEFAULT NULL,
                            `user_id` bigint(20) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `image`
--

CREATE TABLE `image` (
                         `image_id` bigint(20) NOT NULL,
                         `url_image` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
                         `room_id` bigint(20) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `image`
--

INSERT INTO `image` (`image_id`, `url_image`, `room_id`) VALUES
                                                             (1, 'https://res.cloudinary.com/dtsfnikj0/image/upload/v1688244186/tgfisegmduaxsr5rbpkj.jpg', 1),
                                                             (2, 'https://res.cloudinary.com/dtsfnikj0/image/upload/v1688244188/eugskbvf08azb8nzxdes.jpg', 1),
                                                             (3, 'https://res.cloudinary.com/dtsfnikj0/image/upload/v1688244189/ihlaqmrlzo1knuvekptu.jpg', 1),
                                                             (4, 'https://res.cloudinary.com/dtsfnikj0/image/upload/v1688244191/dmdoueylnblu4ymu0qqi.jpg', 1),
                                                             (5, 'https://res.cloudinary.com/dtsfnikj0/image/upload/v1688244193/jgcnknwjgtcjrdw3qov9.jpg', 1),
                                                             (6, 'https://res.cloudinary.com/dtsfnikj0/image/upload/v1688244194/dan7wu9kuzmsci4yh9nc.jpg', 1);

-- --------------------------------------------------------

--
-- Table structure for table `location`
--

CREATE TABLE `location` (
                            `location_id` bigint(20) NOT NULL,
                            `code` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
                            `name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `location`
--

INSERT INTO `location` (`location_id`, `code`, `name`) VALUES
                                                           (1, 'AN-GIANG', 'An Giang'),
                                                           (2, 'BA-RIA-VUNG-TAU', 'Bà Rịa - Vũng Tàu'),
                                                           (3, 'BAC-GIANG', 'Bắc Giang'),
                                                           (4, 'BAC-KAN', 'Bắc Kạn'),
                                                           (5, 'BAC-LIEU', 'Bạc Liêu'),
                                                           (6, 'BAC-NINH', 'Bắc Ninh'),
                                                           (7, 'BEN-TRE', 'Bến Tre'),
                                                           (8, 'BINH-DINH', 'Bình Định'),
                                                           (9, 'BINH-DUONG', 'Bình Dương'),
                                                           (10, 'BINH-PHUOC', 'Bình Phước'),
                                                           (11, 'BINH-THUAN', 'Bình Thuận'),
                                                           (12, 'CA-MAU', 'Cà Mau'),
                                                           (13, 'CAO-BANG', 'Cao Bằng'),
                                                           (14, 'DA-NANG', 'Đà Nẵng'),
                                                           (15, 'DAK-LAK', 'Đắk Lắk'),
                                                           (16, 'DAK-NONG', 'Đắk Nông'),
                                                           (17, 'DIEN-BIEN', 'Điện Biên'),
                                                           (18, 'DONG-NAI', 'Đồng Nai'),
                                                           (19, 'DONG-THAP', 'Đồng Tháp'),
                                                           (20, 'GIA-LAI', 'Gia Lai'),
                                                           (21, 'HA-GIANG', 'Hà Giang'),
                                                           (22, 'HA-NAM', 'Hà Nam'),
                                                           (23, 'HA-NOI', 'Hà Nội'),
                                                           (24, 'HA-TAY', 'Hà Tây'),
                                                           (25, 'HA-TINH', 'Hà Tĩnh'),
                                                           (26, 'HAI-DUONG', 'Hải Dương'),
                                                           (27, 'HAI-PHONG', 'Hải Phòng'),
                                                           (28, 'HO-CHI-MINH', 'Hồ Chí Minh'),
                                                           (29, 'HOA-BINH', 'Hòa Bình'),
                                                           (30, 'HOA-BINH', 'Hòa Bình'),
                                                           (31, 'HUNG-YEN', 'Hưng Yên'),
                                                           (32, 'KHANH-HOA', 'Khánh Hòa'),
                                                           (33, 'KIEN-GIANG', 'Kiên Giang'),
                                                           (34, 'KON-TUM', 'Kon Tum'),
                                                           (35, 'LAI-CHAU', 'Lai Châu'),
                                                           (36, 'LAM-DONG', 'Lâm Đồng'),
                                                           (37, 'LANG-SON', 'Lạng Sơn'),
                                                           (38, 'LAO-CAI', 'Lào Cai'),
                                                           (39, 'LONG-AN', 'Long An'),
                                                           (40, 'NAM-DINH', 'Nam Định'),
                                                           (41, 'NGHE-AN', 'Nghệ An'),
                                                           (42, 'NINH-BINH', 'Ninh Bình'),
                                                           (43, 'NINH-THUAN', 'Ninh Thuận'),
                                                           (44, 'PHU-THO', 'Phú Thọ'),
                                                           (45, 'PHU-YEN', 'Phú Yên'),
                                                           (46, 'QUANG-BINH', 'Quảng Bình'),
                                                           (47, 'QUANG-NAM', 'Quảng Nam'),
                                                           (48, 'QUANG-NGAI', 'Quảng Ngãi'),
                                                           (49, 'QUANG-NINH', 'Quảng Ninh'),
                                                           (50, 'QUANG-TRI', 'Quảng Trị'),
                                                           (51, 'SOC-TRANG', 'Sóc Trăng'),
                                                           (52, 'SON-LA', 'Sơn La'),
                                                           (53, 'TAY-NINH', 'Tây Ninh'),
                                                           (54, 'THAI-BINH', 'Thái Bình'),
                                                           (55, 'THAI-NGUYEN', 'Thái Nguyên'),
                                                           (56, 'THANH-HOA', 'Thanh Hóa'),
                                                           (57, 'THUA-THIEN-HUE', 'Thừa Thiên Huế'),
                                                           (58, 'TIEN-GIANG', 'Tiền Giang'),
                                                           (59, 'TRA-VINH', 'Trà Vinh'),
                                                           (60, 'TUYEN-QUANG', 'Tuyên Quang'),
                                                           (61, 'VINH-LONG', 'Vĩnh Long'),
                                                           (62, 'VINH-PHUC', 'Vĩnh Phúc'),
                                                           (63, 'YEN-BAI', 'Yên Bái');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
                          `orders_id` bigint(20) NOT NULL,
                          `checkout_date` date DEFAULT NULL,
                          `num_guests` int(11) DEFAULT NULL,
                          `received_date` date DEFAULT NULL,
                          `status` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
                          `total_price` double DEFAULT NULL,
                          `room_id` bigint(20) DEFAULT NULL,
                          `user_id` bigint(20) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `room`
--

CREATE TABLE `room` (
                        `room_id` bigint(20) NOT NULL,
                        `air_conditioner` bit(1) DEFAULT NULL,
                        `description` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
                        `hot_and_cold_machine` bit(1) DEFAULT NULL,
                        `kitchen` bit(1) DEFAULT NULL,
                        `max_guests` int(11) DEFAULT NULL,
                        `name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
                        `num_bathrooms` int(11) DEFAULT NULL,
                        `num_bedrooms` int(11) DEFAULT NULL,
                        `num_living_rooms` int(11) DEFAULT NULL,
                        `parking` bit(1) DEFAULT NULL,
                        `pool` bit(1) DEFAULT NULL,
                        `price` double DEFAULT NULL,
                        `television` bit(1) DEFAULT NULL,
                        `washing_machine` bit(1) DEFAULT NULL,
                        `wifi` bit(1) DEFAULT NULL,
                        `address_id` bigint(20) DEFAULT NULL,
                        `location_id` bigint(20) DEFAULT NULL,
                        `users_id` bigint(20) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `room`
--

INSERT INTO `room` (`room_id`, `air_conditioner`, `description`, `hot_and_cold_machine`, `kitchen`, `max_guests`, `name`, `num_bathrooms`, `num_bedrooms`, `num_living_rooms`, `parking`, `pool`, `price`, `television`, `washing_machine`, `wifi`, `address_id`, `location_id`, `users_id`) VALUES
    (1, b'1', 'Apartments in a small nice house that located in the heart of center of city, and very quiet.', b'1', b'1', 4, 'CozyNook Gorgeous Apartment ArtView,DalatCenter', 2, 2, 1, b'0', b'0', 42, b'1', b'0', b'1', 2, 36, 1);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
                         `users_id` bigint(20) NOT NULL,
                         `birthday` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
                         `code_confirmed` varchar(6) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
                         `confirmed` bit(1) DEFAULT NULL,
                         `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
                         `gender` bit(1) DEFAULT NULL,
                         `name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
                         `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
                         `phone` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
                         `role` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
                         `status` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`users_id`, `birthday`, `code_confirmed`, `confirmed`, `email`, `gender`, `name`, `password`, `phone`, `role`, `status`) VALUES
    (1, NULL, '2z3JNF', b'0', 'nguyengianga32001@gmail.com', b'0', 'Nguy?n Tr??ng Giang', '$2a$10$CCPh6gibjRpExKCsWU2HcOlZLtKHb0DbdhqATHd8etgtjnfKDnuuW', '0394366313', 'OWNER', 'ACTIVE');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `address`
--
ALTER TABLE `address`
    ADD PRIMARY KEY (`address_id`);

--
-- Indexes for table `feedback`
--
ALTER TABLE `feedback`
    ADD PRIMARY KEY (`feedback_id`),
  ADD KEY `FKtf5c73w0uieq853vwct5nluur` (`orders_id`),
  ADD KEY `FKpwwmhguqianghvi1wohmtsm8l` (`user_id`);

--
-- Indexes for table `image`
--
ALTER TABLE `image`
    ADD PRIMARY KEY (`image_id`),
  ADD KEY `FKgfoef2g9bwlndgk8ttmf902dg` (`room_id`);

--
-- Indexes for table `location`
--
ALTER TABLE `location`
    ADD PRIMARY KEY (`location_id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
    ADD PRIMARY KEY (`orders_id`),
  ADD KEY `FKh59mvt18qbnv9htr8ye5s6wov` (`room_id`),
  ADD KEY `FK32ql8ubntj5uh44ph9659tiih` (`user_id`);

--
-- Indexes for table `room`
--
ALTER TABLE `room`
    ADD PRIMARY KEY (`room_id`),
  ADD KEY `FK98b6qeo4s2wbfach8x3g84a3d` (`address_id`),
  ADD KEY `FKrqejnp96gs9ldf7o6fciylxkt` (`location_id`),
  ADD KEY `FK4s0mr7ub1816c1yrbmkdhx389` (`users_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
    ADD PRIMARY KEY (`users_id`),
  ADD UNIQUE KEY `UK_6dotkott2kjsp8vw4d0m25fb7` (`email`) USING HASH;

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `address`
--
ALTER TABLE `address`
    MODIFY `address_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `feedback`
--
ALTER TABLE `feedback`
    MODIFY `feedback_id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `image`
--
ALTER TABLE `image`
    MODIFY `image_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `location`
--
ALTER TABLE `location`
    MODIFY `location_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=64;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
    MODIFY `orders_id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `room`
--
ALTER TABLE `room`
    MODIFY `room_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
    MODIFY `users_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

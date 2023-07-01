-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th6 30, 2023 lúc 09:40 AM
-- Phiên bản máy phục vụ: 10.4.27-MariaDB
-- Phiên bản PHP: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `booking_hotel`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `feedback`
--

CREATE TABLE `feedback` (
  `feedback_id` bigint(20) NOT NULL,
  `content` varchar(255) DEFAULT NULL,
  `create_date` date DEFAULT NULL,
  `number_of_stars` int(11) DEFAULT NULL,
  `orders_id` bigint(20) DEFAULT NULL,
  `user_id` bigint(20) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `image`
--

CREATE TABLE `image` (
  `image_id` bigint(20) NOT NULL,
  `url_image` varchar(255) DEFAULT NULL,
  `room_id` bigint(20) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;

--
-- Đang đổ dữ liệu cho bảng `image`
--

INSERT INTO `image` (`image_id`, `url_image`, `room_id`) VALUES
(1, 'https://res.cloudinary.com/dtsfnikj0/image/upload/v1688109808/gebo1ghkjortbsfwi64b.jpg', 1),
(2, 'https://res.cloudinary.com/dtsfnikj0/image/upload/v1688109811/empl7qz1tl5lwfzciofq.jpg', 1),
(3, 'https://res.cloudinary.com/dtsfnikj0/image/upload/v1688109813/xbz7uqjzo34raomnu00p.jpg', 1),
(4, 'https://res.cloudinary.com/dtsfnikj0/image/upload/v1688109816/usxfdxez5m0g6yf4c8hv.jpg', 1),
(5, 'https://res.cloudinary.com/dtsfnikj0/image/upload/v1688109818/gnw0dwnghpmybmji1eoe.jpg', 1),
(6, 'https://res.cloudinary.com/dtsfnikj0/image/upload/v1688110380/oxsqkhqtuu0glaafbeca.png', 2),
(7, 'https://res.cloudinary.com/dtsfnikj0/image/upload/v1688110382/omavf8z3ytjvnne5xc6w.png', 2),
(8, 'https://res.cloudinary.com/dtsfnikj0/image/upload/v1688110385/it2zz21fkod0cbechtnz.png', 2),
(9, 'https://res.cloudinary.com/dtsfnikj0/image/upload/v1688110388/af6pvck23ttdaqywfjim.png', 2),
(10, 'https://res.cloudinary.com/dtsfnikj0/image/upload/v1688110389/yir6em7xtcgg9i1hbqwq.png', 2),
(11, 'https://res.cloudinary.com/dtsfnikj0/image/upload/v1688110787/wlhb5mpckunbmzvapace.png', 3),
(12, 'https://res.cloudinary.com/dtsfnikj0/image/upload/v1688110790/j2htacqgaaaeumxiwg5o.png', 3),
(13, 'https://res.cloudinary.com/dtsfnikj0/image/upload/v1688110792/jelcood1xanipxon2nxe.png', 3),
(14, 'https://res.cloudinary.com/dtsfnikj0/image/upload/v1688110795/zaesfoxqlptrmpia39cy.png', 3),
(15, 'https://res.cloudinary.com/dtsfnikj0/image/upload/v1688110797/j6cyniubcd12olrswtet.png', 3);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `location`
--

CREATE TABLE `location` (
  `location_id` bigint(20) NOT NULL,
  `code` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;

--
-- Đang đổ dữ liệu cho bảng `location`
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
-- Cấu trúc bảng cho bảng `orders`
--

CREATE TABLE `orders` (
  `orders_id` bigint(20) NOT NULL,
  `checkout_date` date DEFAULT NULL,
  `num_guests` int(11) DEFAULT NULL,
  `received_date` date DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `total_price` double DEFAULT NULL,
  `room_id` bigint(20) DEFAULT NULL,
  `user_id` bigint(20) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `room`
--

CREATE TABLE `room` (
  `room_id` bigint(20) NOT NULL,
  `address` varchar(255) DEFAULT NULL,
  `air_conditioner` bit(1) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `hot_and_cold_machine` bit(1) DEFAULT NULL,
  `kitchen` bit(1) DEFAULT NULL,
  `max_guests` int(11) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `num_bathrooms` int(11) DEFAULT NULL,
  `num_bedrooms` int(11) DEFAULT NULL,
  `num_living_rooms` int(11) DEFAULT NULL,
  `parking` bit(1) DEFAULT NULL,
  `pool` bit(1) DEFAULT NULL,
  `price` double DEFAULT NULL,
  `television` bit(1) DEFAULT NULL,
  `washing_machine` bit(1) DEFAULT NULL,
  `wifi` bit(1) DEFAULT NULL,
  `location_id` bigint(20) DEFAULT NULL,
  `users_id` bigint(20) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;

--
-- Đang đổ dữ liệu cho bảng `room`
--

INSERT INTO `room` (`room_id`, `address`, `air_conditioner`, `description`, `hot_and_cold_machine`, `kitchen`, `max_guests`, `name`, `num_bathrooms`, `num_bedrooms`, `num_living_rooms`, `parking`, `pool`, `price`, `television`, `washing_machine`, `wifi`, `location_id`, `users_id`) VALUES
(1, '28 đường số 4, phường 8, thành phố Đà Lạt, Lâm Đồng', b'0', 'Nơi ở trong một nhà siêu nhỏ. Chủ nhà Sin Suoi Ho Bungalow And Homestay', b'1', b'1', 5, 'Sin Suoi Ho Bungalow và Homestay', 2, 2, 1, b'1', b'1', 1200000, b'1', b'1', b'1', 36, 2),
(2, 'đường Triệu Việt Vương, P4, Đà Lạt, Lâm Đồng', b'0', 'Nhà nghỉ nông trại', b'1', b'1', 4, 'Farm \'ily - nhà nghỉ nông trại tại thành phố Đà Lạt, tầm nhìn đẹp', 1, 1, 1, b'0', b'1', 700000, b'1', b'1', b'1', 36, 2),
(3, 'đường 16/4, thành phố Phan Rang Tháp Chàm, tỉnh Ninh Thuận', b'1', 'Phòng trong cabin', b'1', b'1', 3, 'Homestay du lịch 85', 1, 1, 1, b'1', b'1', 650000, b'1', b'1', b'1', 43, 2);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `users`
--

CREATE TABLE `users` (
  `users_id` bigint(20) NOT NULL,
  `birthday` varchar(255) DEFAULT NULL,
  `code_confirmed` varchar(6) DEFAULT NULL,
  `confirmed` bit(1) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `gender` bit(1) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `role` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;

--
-- Đang đổ dữ liệu cho bảng `users`
--

INSERT INTO `users` (`users_id`, `birthday`, `code_confirmed`, `confirmed`, `email`, `gender`, `name`, `password`, `phone`, `role`, `status`) VALUES
(1, NULL, 'tdYYF3', b'1', 'admin@gmail.com', b'1', 'Người quản trị', '$2a$10$F7YR2Ubf.pVZnbrA3OAVaeAzQjAHD2KqIItc5aUc1r8lYwLZiebEa', '18002704', 'ADMIN', 'ACTIVE'),
(2, NULL, '9otGco', b'1', 'motnghindong2704@gmail.com', b'1', 'Nguyễn Văn Hiếu', '$2a$10$BJ.c4Y.g5NpDbp6KhbN7M.ZcWZJKEQGJRJwPHmyzHHuHmLyTelbAG', '0798631497', 'OWNER', 'ACTIVE'),
(3, NULL, 'vJSiXT', b'1', 'truonggiang@gmail.com', b'1', 'Nguyễn Trường Giang', '$2a$10$z0v7mND8UTVWJAxmmykgxeMTy3UUV99Q5fyc.j6jSb5sQJclo45N2', '0796325946', 'OWNER', 'ACTIVE'),
(4, NULL, 'RRgDy6', b'1', 'dinhdanh@gmail.com', b'1', 'Trần Đình Danh', '$2a$10$B9pQnBnO0A20ha3MQ6f2vu5xTz5kXqD0IPiwPhWWjDINrCOzPU0Ui', '0386512359', 'OWNER', 'ACTIVE'),
(5, '27/01/2001', 'Cw4g4m', b'1', 'hoangduc@gmail.com', b'1', 'Nguyễn Hoàng Đức', '$2a$10$cBi/1yJjbAEyB5CJr4nd0.I/mjbsEX4nrF4scUfFh3PjIgomYm8AK', '0369846456', 'CUSTOMER', 'ACTIVE'),
(6, '27/02/2001', 'EmOi4z', b'1', 'thanhtai@gmail.com', b'1', 'Hoàng Thanh Tài', '$2a$10$WxHWnO0woQhSM8zrOfXwJu4aQLzcM4u6pRMhuWN.HmZQ5mVNKT95K', '0796354892', 'CUSTOMER', 'ACTIVE'),
(7, '27/03/2001', 'S99UWU', b'1', 'congdanh@gmail.com', b'1', 'Phạm Công Danh', '$2a$10$zAQ6HK0ONwr/GM1g8fNO.e5LYPYuEJYpE0iYRCZoa8YrXRo0yUxpu', '0336954135', 'CUSTOMER', 'ACTIVE');

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `feedback`
--
ALTER TABLE `feedback`
  ADD PRIMARY KEY (`feedback_id`),
  ADD KEY `FKtf5c73w0uieq853vwct5nluur` (`orders_id`),
  ADD KEY `FKpwwmhguqianghvi1wohmtsm8l` (`user_id`);

--
-- Chỉ mục cho bảng `image`
--
ALTER TABLE `image`
  ADD PRIMARY KEY (`image_id`),
  ADD KEY `FKgfoef2g9bwlndgk8ttmf902dg` (`room_id`);

--
-- Chỉ mục cho bảng `location`
--
ALTER TABLE `location`
  ADD PRIMARY KEY (`location_id`);

--
-- Chỉ mục cho bảng `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`orders_id`),
  ADD KEY `FKh59mvt18qbnv9htr8ye5s6wov` (`room_id`),
  ADD KEY `FK32ql8ubntj5uh44ph9659tiih` (`user_id`);

--
-- Chỉ mục cho bảng `room`
--
ALTER TABLE `room`
  ADD PRIMARY KEY (`room_id`),
  ADD KEY `FKrqejnp96gs9ldf7o6fciylxkt` (`location_id`),
  ADD KEY `FK4s0mr7ub1816c1yrbmkdhx389` (`users_id`);

--
-- Chỉ mục cho bảng `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`users_id`),
  ADD UNIQUE KEY `UK_6dotkott2kjsp8vw4d0m25fb7` (`email`) USING HASH,
  ADD UNIQUE KEY `UK6dotkott2kjsp8vw4d0m25fb7` (`email`) USING HASH;

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `feedback`
--
ALTER TABLE `feedback`
  MODIFY `feedback_id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `image`
--
ALTER TABLE `image`
  MODIFY `image_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT cho bảng `location`
--
ALTER TABLE `location`
  MODIFY `location_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=64;

--
-- AUTO_INCREMENT cho bảng `orders`
--
ALTER TABLE `orders`
  MODIFY `orders_id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `room`
--
ALTER TABLE `room`
  MODIFY `room_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT cho bảng `users`
--
ALTER TABLE `users`
  MODIFY `users_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

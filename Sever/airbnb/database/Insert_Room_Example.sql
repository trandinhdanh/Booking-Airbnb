-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3307
-- Generation Time: Aug 11, 2023 at 06:44 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `booking_hotel`
--

--
-- Dumping data for table `address`
--

INSERT INTO `address` (`address_id`, `full_address`, `lat`, `lng`) VALUES
(2, 'Hẻm 6 Mai Anh, 6 Đ. Mai Hắc Đế, Phường 6, Thành phố Đà Lạt, Tỉnh Lâm Đồng', 11.9492707, 108.429943),
(3, '03 Đ. Cổ Loa, Phường 2, Thành phố Đà Lạt, Tỉnh Lâm Đồng', 11.9544991, 108.4353591),
(4, '119 Đường Bùi Thị Xuân, Phường 2, Thành phố Đà Lạt, Tỉnh Lâm Đồng', 11.9474978, 108.4374859),
(5, 'Nguyen Trung Truc Apartment, Phường 3, Thành phố Đà Lạt, Tỉnh Lâm Đồng', 11.9306556, 108.4323871),
(7, '6 Đường Hà Huy Tập, Phường 3, Thành phố Đà Lạt, Tỉnh Lâm Đồng', 11.9359981, 108.4382036),
(8, '14/64 Đ. Đào Duy Từ, Phường 3, Thành phố Đà Lạt, Tỉnh Lâm Đồng', 11.9346278, 108.4311213),
(9, '48 Đường Hà Huy Tập, Phường 3, Thành phố Đà Lạt, Tỉnh Lâm Đồng', 11.9347006, 108.4379602),
(10, '58B Lê Thánh Tôn, Phường 6, Thành phố Đà Lạt, Tỉnh Lâm Đồng', 11.9468586, 108.4247802),
(11, '6B Đ. Mai Hắc Đế, Phường 6, Thành phố Đà Lạt, Tỉnh Lâm Đồng', 11.9489757, 108.4257314),
(12, '20 Đường 3 tháng 2, Phường 1, Thành phố Đà Lạt, Tỉnh Lâm Đồng', 11.943029, 108.4324775),
(13, 'Lô 16 LKX khu biệt thự Đại Phú Gia, Thành phố Qui Nhơn, Bình Định, Việt Nam', 13.8117059, 109.2188735),
(14, 'Nguyễn Trung Tín FLC Sea Tower, Quy Nhơn, Việt Nam', 13.7551023, 109.2124086),
(15, '141-143 Lê Đức Thọ, Phường Trần Hưng Đạo, Thành phố Quy Nhơn, Tỉnh Bình Định', 13.7782539, 109.2323592),
(16, '7B Nguyễn Thị Định, Quy Nhơn, Việt Nam, Phường Nguyễn Văn Cừ, Thành phố Quy Nhơn, Tỉnh Bình Định', 13.7613325, 109.2162466),
(17, '44 Võ Thị Yến, Phường Nguyễn Văn Cừ, Thành phố Quy Nhơn, Tỉnh Bình Định', 13.7553987, 109.2147687),
(18, '06 Trần Văn Cao, Phường Lê Lợi, Thành phố Quy Nhơn, Tỉnh Bình Định', 13.7640914, 109.215329),
(19, 'Võ Thị Yến, Phường Nguyễn Văn Cừ, Thành phố Quy Nhơn, Tỉnh Bình Định', 13.7559679, 109.2149374),
(20, '01 Hàn Mạc Tử, Phường Ghềnh Ráng, Thành phố Quy Nhơn, Tỉnh Bình Định', 13.7450068, 109.2138805),
(21, 'Nguyễn Trung Tín, Phường Nguyễn Văn Cừ, Thành phố Quy Nhơn, Tỉnh Bình Định', 13.7551367, 109.2148211);

--
-- Dumping data for table `image`
--

INSERT INTO `image` (`image_id`, `url_image`, `room_id`) VALUES
(1, 'https://res.cloudinary.com/dtsfnikj0/image/upload/v1691658357/phgwdcdksl5hi4qxy0ns.jpg', 1),
(2, 'https://res.cloudinary.com/dtsfnikj0/image/upload/v1691658359/g5yaog2lcjantkhftnar.jpg', 1),
(3, 'https://res.cloudinary.com/dtsfnikj0/image/upload/v1691658361/cxbanazfarjqp1wcdrnj.jpg', 1),
(4, 'https://res.cloudinary.com/dtsfnikj0/image/upload/v1691658363/kmizkvfvlyduqhnayzl9.jpg', 1),
(5, 'https://res.cloudinary.com/dtsfnikj0/image/upload/v1691658365/y9wa94sykceybmrvowje.jpg', 1),
(6, 'https://res.cloudinary.com/dtsfnikj0/image/upload/v1691658366/slqnwmyegppgfmy3wfvz.jpg', 1),
(7, 'https://res.cloudinary.com/dtsfnikj0/image/upload/v1691658925/ozndbahd4q5yamdcwszy.jpg', 2),
(8, 'https://res.cloudinary.com/dtsfnikj0/image/upload/v1691658927/nke3zab2kx3ti2bdcfta.jpg', 2),
(9, 'https://res.cloudinary.com/dtsfnikj0/image/upload/v1691658930/hnpfqpzwm7iuwkhtw5lh.jpg', 2),
(10, 'https://res.cloudinary.com/dtsfnikj0/image/upload/v1691658931/qfmetkmsvaedmtitcn2i.jpg', 2),
(11, 'https://res.cloudinary.com/dtsfnikj0/image/upload/v1691658933/qyn75q4al5fhalzrrvua.jpg', 2),
(12, 'https://res.cloudinary.com/dtsfnikj0/image/upload/v1691658935/qgyy1214qjmzhk3ewuoo.jpg', 2),
(13, 'https://res.cloudinary.com/dtsfnikj0/image/upload/v1691659360/eh6ktimkqztrukg5ytme.jpg', 3),
(14, 'https://res.cloudinary.com/dtsfnikj0/image/upload/v1691659362/oknk1g6uxtzysiwociyx.jpg', 3),
(15, 'https://res.cloudinary.com/dtsfnikj0/image/upload/v1691659364/t5rkft9htud4da89meap.jpg', 3),
(16, 'https://res.cloudinary.com/dtsfnikj0/image/upload/v1691659365/ulrhd0azndliycngfpjj.jpg', 3),
(17, 'https://res.cloudinary.com/dtsfnikj0/image/upload/v1691659367/ect3pbnuwvlwxq52sn7k.jpg', 3),
(18, 'https://res.cloudinary.com/dtsfnikj0/image/upload/v1691660658/woe7fqmmbidzpshsahyu.jpg', 4),
(19, 'https://res.cloudinary.com/dtsfnikj0/image/upload/v1691660660/jiycpew7xyeyjzsgpjpj.jpg', 4),
(20, 'https://res.cloudinary.com/dtsfnikj0/image/upload/v1691660662/ky99cevlweqszozlyes0.jpg', 4),
(21, 'https://res.cloudinary.com/dtsfnikj0/image/upload/v1691660664/ebopp6nohrjmsmo6fokr.jpg', 4),
(22, 'https://res.cloudinary.com/dtsfnikj0/image/upload/v1691660665/x6204jjkezjp5vnm1oja.jpg', 4),
(23, 'https://res.cloudinary.com/dtsfnikj0/image/upload/v1691661041/wstzs4zm4g31k544q9ux.jpg', 5),
(24, 'https://res.cloudinary.com/dtsfnikj0/image/upload/v1691661042/dhnmvhdvtoaex8zysoo6.jpg', 5),
(25, 'https://res.cloudinary.com/dtsfnikj0/image/upload/v1691661044/m26skxgniyaypbrr8jky.jpg', 5),
(26, 'https://res.cloudinary.com/dtsfnikj0/image/upload/v1691661046/addffsmi9iqpbhb8owh6.jpg', 5),
(27, 'https://res.cloudinary.com/dtsfnikj0/image/upload/v1691661048/ztjgxbhhfqzf2fhvwzdo.jpg', 5),
(28, 'https://res.cloudinary.com/dtsfnikj0/image/upload/v1691661374/uztr9r6lu6zgod0npppf.jpg', 6),
(29, 'https://res.cloudinary.com/dtsfnikj0/image/upload/v1691661376/eoqan27vjcecvw6zkoyh.jpg', 6),
(30, 'https://res.cloudinary.com/dtsfnikj0/image/upload/v1691661378/vnkzogba1jzjdmsth4nv.jpg', 6),
(31, 'https://res.cloudinary.com/dtsfnikj0/image/upload/v1691661380/mmekwxhbxy8jrgsqdffr.jpg', 6),
(32, 'https://res.cloudinary.com/dtsfnikj0/image/upload/v1691661382/royrdj6v3lcpuulzu31t.jpg', 6),
(33, 'https://res.cloudinary.com/dtsfnikj0/image/upload/v1691661863/szlx8wkh08fnmspyguij.jpg', 7),
(34, 'https://res.cloudinary.com/dtsfnikj0/image/upload/v1691661865/iz1yfymwtlgmckigld5w.jpg', 7),
(35, 'https://res.cloudinary.com/dtsfnikj0/image/upload/v1691661866/lytnvkg7jch3axct8zpv.jpg', 7),
(36, 'https://res.cloudinary.com/dtsfnikj0/image/upload/v1691661868/ctc6xgepimwtaw2lgpyf.jpg', 7),
(37, 'https://res.cloudinary.com/dtsfnikj0/image/upload/v1691661870/ms0lkzs2ymcj8hbyecnx.jpg', 7),
(38, 'https://res.cloudinary.com/dtsfnikj0/image/upload/v1691662206/pfra4borpyhptwbpdv6a.jpg', 8),
(39, 'https://res.cloudinary.com/dtsfnikj0/image/upload/v1691662208/y6xiqudklygd1fc1qg4i.jpg', 8),
(40, 'https://res.cloudinary.com/dtsfnikj0/image/upload/v1691662209/ccfjt9gkflcibgabc3ez.jpg', 8),
(41, 'https://res.cloudinary.com/dtsfnikj0/image/upload/v1691662212/sfghwvhvuimctadt70oz.jpg', 8),
(42, 'https://res.cloudinary.com/dtsfnikj0/image/upload/v1691662213/sf9hdd7vi86vacxpxk2b.jpg', 8),
(43, 'https://res.cloudinary.com/dtsfnikj0/image/upload/v1691662505/uapbowsr6vojtqiqrlvc.jpg', 9),
(44, 'https://res.cloudinary.com/dtsfnikj0/image/upload/v1691662507/ngin4msla3jf6vu7llu2.jpg', 9),
(45, 'https://res.cloudinary.com/dtsfnikj0/image/upload/v1691662509/dthxpkungkymtcx5k5go.jpg', 9),
(46, 'https://res.cloudinary.com/dtsfnikj0/image/upload/v1691662510/n3hoox3cei5mh9g9nhf4.jpg', 9),
(47, 'https://res.cloudinary.com/dtsfnikj0/image/upload/v1691662512/ptcjpigcdtw9g9z54rbd.jpg', 9),
(48, 'https://res.cloudinary.com/dtsfnikj0/image/upload/v1691662789/t0zl81i5nqoixyz1ombr.jpg', 10),
(49, 'https://res.cloudinary.com/dtsfnikj0/image/upload/v1691662791/vzu1rf9cnbz6gdwcayrn.jpg', 10),
(50, 'https://res.cloudinary.com/dtsfnikj0/image/upload/v1691662793/oc69ms1phkx1kubxucvg.jpg', 10),
(51, 'https://res.cloudinary.com/dtsfnikj0/image/upload/v1691662795/q1zovyid5zvgv9fojfcf.jpg', 10),
(52, 'https://res.cloudinary.com/dtsfnikj0/image/upload/v1691662797/zxmdayhmam7yj1jluw9q.jpg', 10),
(53, 'https://res.cloudinary.com/dtsfnikj0/image/upload/v1691718422/v0lfjhlyj1d0v0rsfhug.jpg', 11),
(54, 'https://res.cloudinary.com/dtsfnikj0/image/upload/v1691718424/dehazwipriymgx2rhzay.jpg', 11),
(55, 'https://res.cloudinary.com/dtsfnikj0/image/upload/v1691718425/g0di8f7nhoqeu0xza195.jpg', 11),
(56, 'https://res.cloudinary.com/dtsfnikj0/image/upload/v1691718427/r4dotknre5fm4zgx0epa.jpg', 11),
(57, 'https://res.cloudinary.com/dtsfnikj0/image/upload/v1691718429/d48v5qhahtindsb3ofoo.jpg', 11),
(58, 'https://res.cloudinary.com/dtsfnikj0/image/upload/v1691719548/xizgpfmsjctho0hcc2eo.jpg', 12),
(59, 'https://res.cloudinary.com/dtsfnikj0/image/upload/v1691719550/kkhcuweqoznbkkeqnzyl.jpg', 12),
(60, 'https://res.cloudinary.com/dtsfnikj0/image/upload/v1691719552/e2zpaevs1e8wy0eg6xve.jpg', 12),
(61, 'https://res.cloudinary.com/dtsfnikj0/image/upload/v1691719554/xm12ul7aqxuq5qyqaofu.jpg', 12),
(62, 'https://res.cloudinary.com/dtsfnikj0/image/upload/v1691719555/btm5g7synxfh8toq3btz.jpg', 12),
(63, 'https://res.cloudinary.com/dtsfnikj0/image/upload/v1691726578/nc7jy2hw3fivqu2y8gam.jpg', 13),
(64, 'https://res.cloudinary.com/dtsfnikj0/image/upload/v1691726580/qie5nts0hgqslhrxnd50.jpg', 13),
(65, 'https://res.cloudinary.com/dtsfnikj0/image/upload/v1691726582/lkmlhitpsjsmjoromqfs.jpg', 13),
(66, 'https://res.cloudinary.com/dtsfnikj0/image/upload/v1691726584/l7lmxavunz0t1qkj8dpo.jpg', 13),
(67, 'https://res.cloudinary.com/dtsfnikj0/image/upload/v1691726585/hmwoogri2g8cu5tm9wh8.jpg', 13),
(68, 'https://res.cloudinary.com/dtsfnikj0/image/upload/v1691727057/sprktukxq2djgedsimep.jpg', 14),
(69, 'https://res.cloudinary.com/dtsfnikj0/image/upload/v1691727059/vtirbwubwdwjmujakyxl.jpg', 14),
(70, 'https://res.cloudinary.com/dtsfnikj0/image/upload/v1691727060/vjnourubrgqajq1qdeeo.jpg', 14),
(71, 'https://res.cloudinary.com/dtsfnikj0/image/upload/v1691727062/sijuheeqsxjugwknckjn.jpg', 14),
(72, 'https://res.cloudinary.com/dtsfnikj0/image/upload/v1691727064/q0c52bqw4f4aehzr6vuh.jpg', 14),
(73, 'https://res.cloudinary.com/dtsfnikj0/image/upload/v1691727247/xujjbho9xttlkguyqdzp.jpg', 15),
(74, 'https://res.cloudinary.com/dtsfnikj0/image/upload/v1691727249/woob7alx36s4dz1pvaef.jpg', 15),
(75, 'https://res.cloudinary.com/dtsfnikj0/image/upload/v1691727250/egvvjgmjhz3eutvz7sbv.jpg', 15),
(76, 'https://res.cloudinary.com/dtsfnikj0/image/upload/v1691727252/ohlf54ca6hdeau5nm655.jpg', 15),
(77, 'https://res.cloudinary.com/dtsfnikj0/image/upload/v1691727254/arcvyyicu7ld43t079rn.jpg', 15),
(78, 'https://res.cloudinary.com/dtsfnikj0/image/upload/v1691727256/xzu8vngipfzixsqwqjxk.jpg', 15),
(79, 'https://res.cloudinary.com/dtsfnikj0/image/upload/v1691727631/xk66fllnbz7lrfloyzs3.jpg', 16),
(80, 'https://res.cloudinary.com/dtsfnikj0/image/upload/v1691727633/gghrxhs7tqeev00yfugu.jpg', 16),
(81, 'https://res.cloudinary.com/dtsfnikj0/image/upload/v1691727634/gbzvmvkp4rtasee2o8et.jpg', 16),
(82, 'https://res.cloudinary.com/dtsfnikj0/image/upload/v1691727636/djkn0c1fvy7ctzcdy6i0.jpg', 16),
(83, 'https://res.cloudinary.com/dtsfnikj0/image/upload/v1691727638/nadwu6qvmnalkqun0zjp.jpg', 16),
(84, 'https://res.cloudinary.com/dtsfnikj0/image/upload/v1691727641/gv2v6vgq2qxqt6sttzwg.jpg', 16),
(85, 'https://res.cloudinary.com/dtsfnikj0/image/upload/v1691727841/vztm4r3j9diyflkwkqbo.jpg', 17),
(86, 'https://res.cloudinary.com/dtsfnikj0/image/upload/v1691727846/ncqtqwrfzhy6uzp2pzgm.jpg', 17),
(87, 'https://res.cloudinary.com/dtsfnikj0/image/upload/v1691727847/ojwq3wc66ejxxcitgqry.jpg', 17),
(88, 'https://res.cloudinary.com/dtsfnikj0/image/upload/v1691727849/dsis5ocwcwgv448j3rtq.jpg', 17),
(89, 'https://res.cloudinary.com/dtsfnikj0/image/upload/v1691727851/lntbsixeiupwg6c6ykmj.jpg', 17),
(90, 'https://res.cloudinary.com/dtsfnikj0/image/upload/v1691727853/vjo4btmkfngvxs1yzipr.jpg', 17),
(91, 'https://res.cloudinary.com/dtsfnikj0/image/upload/v1691728040/vtc23b3j6xgqzbb2rwtf.jpg', 18),
(92, 'https://res.cloudinary.com/dtsfnikj0/image/upload/v1691728042/ls6jsyzc1ymygngpqo64.jpg', 18),
(93, 'https://res.cloudinary.com/dtsfnikj0/image/upload/v1691728043/nfagxaz4jxcugfprmwbp.jpg', 18),
(94, 'https://res.cloudinary.com/dtsfnikj0/image/upload/v1691728045/xh67hcz8na1psbvzhjgn.jpg', 18),
(95, 'https://res.cloudinary.com/dtsfnikj0/image/upload/v1691728047/rfhi3cglttzki75cvltu.jpg', 18),
(96, 'https://res.cloudinary.com/dtsfnikj0/image/upload/v1691728261/eqawdbyga9cfqsukv1be.jpg', 19),
(97, 'https://res.cloudinary.com/dtsfnikj0/image/upload/v1691728263/sdfqrfq8qnoadov1mcuu.jpg', 19),
(98, 'https://res.cloudinary.com/dtsfnikj0/image/upload/v1691728264/n5toqn3yhdh15r4qifjn.jpg', 19),
(99, 'https://res.cloudinary.com/dtsfnikj0/image/upload/v1691728266/y3qjyyq1d07o6c6fveac.jpg', 19),
(100, 'https://res.cloudinary.com/dtsfnikj0/image/upload/v1691728268/fio5hc6fngxlsfgfvcyf.jpg', 19),
(101, 'https://res.cloudinary.com/dtsfnikj0/image/upload/v1691728269/qi2ueddojosc1t4hwwwh.jpg', 19);

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

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`orders_id`, `checkout_date`, `num_guests`, `payment_method`, `received_date`, `status`, `total_price`, `room_id`, `user_id`) VALUES
(1, '2023-08-14', 2, 'CASH', '2023-08-13', 'BOOKED', 576000, 1, 7),
(2, '2023-08-25', 6, 'CASH', '2023-08-24', 'BOOKED', 862000, 8, 7),
(3, '2023-08-19', 2, 'CASH', '2023-08-18', 'BOOKED', 820000, 16, 7),
(4, '2023-08-21', 4, 'CASH', '2023-08-19', 'BOOKED', 1152000, 1, 8),
(5, '2023-08-23', 3, 'CASH', '2023-08-22', 'BOOKED', 420000, 2, 8),
(6, '2023-08-30', 3, 'CASH', '2023-08-29', 'BOOKED', 600000, 3, 8),
(7, '2023-08-20', 6, 'CASH', '2023-08-15', 'BOOKED', 3000000, 3, 8);

--
-- Dumping data for table `room`
--

INSERT INTO `room` (`room_id`, `air_conditioner`, `description`, `hot_and_cold_machine`, `kitchen`, `max_guests`, `name`, `num_bathrooms`, `num_bedrooms`, `num_living_rooms`, `parking`, `pool`, `price`, `television`, `washing_machine`, `wifi`, `address_id`, `location_id`, `users_id`) VALUES
(1, b'1', 'Situated in Da Lat in the Lam Dong region with Hang Nga Crazy House nearby, ROSERIE Homes Garden features accommodation with free private parking.', b'0', b'1', 10, 'ROSERIE Homes Garden', 2, 3, 1, b'1', b'0', 576000, b'1', b'1', b'1', 2, 36, 1),
(2, b'1', 'Featuring city views and a terrace, LanaHome Đà Lạt features accommodation ideally set in Da Lat, within a short distance of Dalat Palace Golf Club.', b'0', b'1', 6, 'LanaHome Đà Lạt', 3, 3, 1, b'1', b'1', 420000, b'1', b'1', b'1', 3, 36, 1),
(3, b'1', 'Rooms at SODA HOTEL are equipped with a work desk, a flat-screen TV and a hairdryer. Some rooms also have city views and a private bathroom with a shower/bath and free toiletries.', b'0', b'1', 12, 'SODA HOTEL', 3, 4, 2, b'1', b'1', 600000, b'1', b'1', b'1', 4, 36, 1),
(4, b'1', 'Set in Da Lat, 4 km from Truc Lam Zen Monastery and 4 km from Tuyen Lam Lake, GOLDEN HILL - Da Lat offers accommodation with free WiFi, a garden and a sauna.', b'0', b'1', 10, 'GOLDEN HILL - Đà Lạt', 2, 5, 2, b'1', b'1', 2475000, b'1', b'1', b'1', 5, 36, 2),
(5, b'0', 'ORIANA Da Lat is located in Da Lat, within 4.4 km of Tuyen Lam Lake and 25 km of Lang Bian Moutain. The property is around 3.2 km from Dalat Flower Gardens, 3.6 km from Dalat Palace Golf Club and 4.4 km from Truc Lam Temple.', b'0', b'1', 4, 'ORIANA Đà Lạt', 2, 2, 2, b'0', b'0', 432000, b'1', b'1', b'1', 7, 36, 2),
(6, b'1', 'Each unit is fitted with a private bathroom with a shower/bath, free toiletries, a hairdryer and slippers.', b'0', b'1', 8, 'Ấm Bụng Homestay Đà Lạt', 2, 3, 1, b'1', b'0', 843600, b'1', b'1', b'1', 8, 36, 2),
(7, b'1', 'Popular points of interest near HANZ Thanh Tai Hotel include Yersin Park, Xuan Huong Lake and Hang Nga Villa (Mad House). The nearest airport is Lien Khuong Airport, 27 km away, and the property offers an airport shuttle service at a surcharge.', b'0', b'1', 16, 'HANZ Thanh Tai Hotel', 4, 4, 1, b'1', b'0', 455000, b'1', b'1', b'1', 9, 36, 3),
(8, b'1', 'Located in Da Lat, 2.7 km from Lam Vien Square, HANZ Pho Hoa Hotel offers accommodation with a shared lounge, free private parking, a terrace and a restaurant. This 3-star hotel offers free WiFi, room service and a 24-hour front desk', b'0', b'1', 6, 'HANZ Pho Hoa Hotel', 2, 2, 1, b'1', b'1', 862000, b'1', b'1', b'0', 10, 36, 3),
(9, b'1', 'Set 2.8 km from Lam Vien Square and 3 km from Xuan Huong Lake, HANZ Thien Nien Ky Hotel offers accommodation in Da Lat. Complimentary WiFi is featuredthroughout the property.', b'0', b'1', 12, 'HANZ Thien Nien Ky Hotel', 4, 4, 1, b'1', b'1', 405000, b'1', b'1', b'1', 11, 36, 3),
(10, b'1', 'At the hotel, every room has a desk, a flat-screen TV, a private bathroom, bed linen and towels. The rooms come with a kettle, while certain rooms here will provide you with a balcony and others also provide guests with city views.', b'0', b'1', 6, 'HANZ Ngoc Sang Hotel Dalat', 2, 2, 1, b'1', b'1', 922000, b'1', b'1', b'0', 12, 36, 3),
(11, b'0', 'Each unit is fitted with air conditioning, private bathroom and a kitchen including an oven, fridge, stovetop and kitchenware. Some units include a terrace and/or a balcony with sea views.', b'0', b'1', 6, 'MyTran Homestay- HauLoan', 2, 3, 1, b'0', b'0', 249000, b'1', b'1', b'1', 13, 8, 4),
(12, b'1', 'Offering pool with a view and sea view, FLC Sea Tower Quy Nhon Apartment is set in Quy Nhon, 300 metres from Quy Nhon Beach and 1.9 km from Queen\'s Beach. This beachfront property offers access to a balcony, free private parking and free WiFi.', b'0', b'1', 30, 'FLC Sea Tower Quy Nhon Apartment', 6, 10, 4, b'1', b'1', 5300000, b'1', b'1', b'1', 14, 8, 4),
(13, b'0', 'Tọa lạc tại thành phố Quy Nhơn, cách Bãi biển Quy Nhơn 1,2 km và Bãi Rạng 2,5 km, La Beaute Hotel- Quy Nhơn cung cấp chỗ nghỉ với sân hiên và WiFi miễn phí cũng như chỗ đỗ xe riêng miễn phí cho khách lái xe.', b'0', b'1', 3, 'Le Beauty Hotel Quy Nhơn', 1, 1, 2, b'1', b'1', 1000000, b'1', b'1', b'0', 15, 8, 3),
(14, b'1', 'RAON Hotel nằm cách Bãi tắm Hoàng hậu 1,7 km. Sân bay gần nhất là sân bay Phù Cát, nằm trong bán kính 32 km từ khách sạn.', b'0', b'1', 6, 'RAON Hotel', 1, 2, 3, b'0', b'0', 950000, b'0', b'1', b'1', 16, 8, 4),
(15, b'1', 'Tọa lạc tại thành phố Quy Nhơn, HPlus Apartment -FLC Sea Tower Quy Nhon có nhà hàng, dịch vụ phòng, quầy bar, khu vườn và sân hiên. Chỗ nghỉ này được bố trí máy điều hòa và bể sục.', b'0', b'0', 6, 'HPlus Apartment -FLC Sea Tower Quy Nhon', 1, 2, 4, b'1', b'0', 870000, b'1', b'1', b'1', 17, 8, 4),
(16, b'1', 'Chỗ nghỉ nằm cách Bãi Rạng 2,6 km. Sân bay gần nhất là sân bay Phù Cát, nằm trong bán kính 32 km từ Odin Hotel Quy Nhon.', b'0', b'1', 2, 'Odin Hotel Quy Nhon', 2, 2, 5, b'1', b'0', 820000, b'1', b'0', b'1', 18, 8, 6),
(17, b'1', 'Căn Hộ Biển Cao Cấp FLC Sea Tower Quy Nhơn cách Bãi tắm Hoàng Hậu 1,9 km. Sân bay gần nhất là sân bay Phù Cát, cách chỗ nghỉ 32 km và tại đây cung cấp dịch vụ đưa đón sân bay với một khoản phụ phí.', b'0', b'1', 3, 'Căn Hộ Biển Cao Cấp FLC Sea Tower Quy Nhơn', 1, 2, 5, b'0', b'0', 730000, b'1', b'1', b'0', 19, 8, 6),
(18, b'0', 'Là chỗ nghỉ 4 sao tọa lạc tại trung tâm thành phố, Dankbaar Resort Quy Nhon có các tiện nghi giải trí như sân tennis, hồ bơi ngoài trời và spa. Nhìn ra bờ biển ở thành phố Quy Nhơn, chỗ nghỉ này cung cấp miễn phí WiFi và chỗ đỗ xe.', b'0', b'1', 5, 'Dankbaar Resort Quy Nhon', 2, 4, 3, b'0', b'0', 670000, b'1', b'1', b'1', 20, 8, 6),
(19, b'0', 'Cách Bãi biển Quy Nhơn 300 m, Chiến Apartment- FLC Sea Tower-Quy Nhơn có khu vực bãi biển riêng, hồ bơi với tầm nhìn và chỗ nghỉ gắn máy điều hòa với ban công cùng WiFi miễn phí. Chỗ nghỉ có bồn tắm spa và phòng xông hơi khô.', b'0', b'0', 4, 'Chiến Apartment- FLC Sea Tower-Quy Nhơn', 3, 3, 1, b'1', b'0', 540000, b'1', b'1', b'1', 21, 8, 6);

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`users_id`, `birthday`, `code_confirmed`, `confirmed`, `email`, `gender`, `name`, `password`, `phone`, `role`, `status`) VALUES
(1, NULL, 'l9oWNw', b'1', 'ntgiangwk@owner.airbnb', b'0', 'Nguyễn Trường Giang', '$2a$10$qUbvHt71kG8TnEkiIGbcgOheLYP63vl/tWHmTLZ0RMVn1kt27ZYJS', '0394366313', 'OWNER', 'ACTIVE'),
(2, NULL, 'sYABrD', b'1', 'dinhdanh@owner.airbnb', b'0', 'Trần Đình Danh', '$2a$10$./NFk3hPCdOvMqmBixl5VOhTgGNDVlVK6/lSvfL33WsBp77Hbo9oG', '0915111222', 'OWNER', 'ACTIVE'),
(3, NULL, '4PrRni', b'1', 'thanhtai@owner.airbnb', b'0', 'Hoàng Thanh Tài', '$2a$10$TSu0ggf39WJgfZeF7eYqJeqxNE6NrAe1eYCUqbR23qVRRTPFtMJA2', '0919130192', 'OWNER', 'ACTIVE'),
(4, NULL, 'u6JREl', b'1', 'vanhieu@owner.airbnb', b'0', 'Nguyễn Văn Hiếu', '$2a$10$oKqZbO/pVaNuNUoHYHrlNuUbojy01GkRLyEPgdaAmWLSy4yGwJrG6', '0919130074', 'OWNER', 'ACTIVE'),
(5, NULL, 'u6ugUi', b'1', 'hoangduc@owner.airbnb', b'0', 'Nguyễn Hoàng Đức', '$2a$10$ugZdRjASE76/m3jwuPmSaenbRt8oWqDyLrX9TK5dd6mhEFKoAhCp6', '0919130049', 'OWNER', 'ACTIVE'),
(6, NULL, 'kuKP7F', b'1', 'congdanh@owner.airbnb', b'0', 'Phạm Công Danh', '$2a$10$6Z9y7DLNRDhaSmObMT4Bm.HYG.3n4PQBswa0XB780CRK0UZNaGlPW', '0919130027', 'OWNER', 'ACTIVE'),
(7, '21/07/2001', 'OxGldI', b'1', 'thanhtai21701@gmail.com', b'1', 'Hoàng Thanh Tài', '$2a$10$fzGGluYF/HnYKS4c4q2e3u4PtN/5P4P2uf.XV/T.J93.fPdRLnp/O', '0123456778', 'CUSTOMER', 'ACTIVE'),
(8, '28/01/2001', '2CFSqa', b'1', 'truongdai.game@gmail.com', b'1', 'Nguyễn Trương Giang', '$2a$10$EQnogYYYRHQUxqQoleBDruj4387d5/zKlxyIG1HVgzbyjAdBoIJVa', '0394366313', 'CUSTOMER', 'ACTIVE');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

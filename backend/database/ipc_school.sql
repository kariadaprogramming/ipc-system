-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 26, 2026 at 01:15 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ipc_school`
--

-- --------------------------------------------------------

--
-- Table structure for table `activity_logs`
--

CREATE TABLE `activity_logs` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `action` varchar(255) NOT NULL,
  `details` text DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `activity_logs`
--

INSERT INTO `activity_logs` (`id`, `user_id`, `action`, `details`, `ip_address`, `created_at`) VALUES
(1, 1, 'Login', 'User logged in', NULL, '2026-05-01 00:32:27'),
(2, 1, 'Login', 'User logged in', NULL, '2026-05-01 00:40:30'),
(3, 1, 'Login', 'User logged in', NULL, '2026-05-01 01:02:12'),
(4, 1, 'Login', 'User logged in', NULL, '2026-05-01 01:06:30'),
(5, 1, 'Login', 'User logged in', NULL, '2026-05-01 01:17:47'),
(6, 1, 'Login', 'User logged in', NULL, '2026-05-01 01:20:18'),
(7, 1, 'Login', 'User logged in', NULL, '2026-05-01 01:23:56'),
(8, 1, 'Login', 'User logged in', NULL, '2026-05-01 01:24:51'),
(9, 1, 'Login', 'User logged in', NULL, '2026-05-01 01:38:12'),
(10, 1, 'Login', 'User logged in', NULL, '2026-05-01 01:53:48'),
(11, 1, 'Login', 'User logged in', NULL, '2026-05-01 02:20:49'),
(12, 1, 'Login', 'User logged in', NULL, '2026-05-01 02:22:18'),
(13, 1, 'Login', 'User logged in', NULL, '2026-05-01 02:25:29'),
(14, 1, 'Create Teacher', 'Created teacher account for agus (88)', NULL, '2026-05-01 02:32:35'),
(15, 1, 'Update IPC', 'Updated IPC for user ID 2 to -90', NULL, '2026-05-01 02:32:56'),
(16, 1, 'Create Student', 'Created student account for agus (123124)', NULL, '2026-05-01 02:33:49'),
(17, 1, 'Delete User', 'Deleted user ID 2', NULL, '2026-05-01 02:34:10'),
(18, 3, 'Login', 'User logged in', NULL, '2026-05-01 02:35:51'),
(19, 1, 'Create Teacher', 'Created teacher account for gurujr (dwdw)', NULL, '2026-05-01 02:37:50'),
(20, 1, 'Login', 'User logged in', NULL, '2026-05-01 02:38:23'),
(21, 1, 'Delete User', 'Deleted user ID 4', NULL, '2026-05-01 02:38:35'),
(22, 1, 'Create Teacher', 'Created teacher account for kariada (069)', NULL, '2026-05-01 02:39:07'),
(23, 5, 'Login', 'User logged in', NULL, '2026-05-01 02:39:20'),
(24, 1, 'Login', 'User logged in', NULL, '2026-05-01 02:39:40'),
(25, 1, 'Update Permissions', 'Updated permissions for user ID 5', NULL, '2026-05-01 02:39:58'),
(26, 5, 'Login', 'User logged in', NULL, '2026-05-01 02:40:09'),
(27, 1, 'Update Permissions', 'Updated permissions for user ID 5', NULL, '2026-05-01 04:48:51'),
(28, 5, 'Login', 'User logged in', NULL, '2026-05-01 04:49:03'),
(29, 1, 'Login', 'User logged in', NULL, '2026-05-01 04:49:15'),
(30, 1, 'Assign Wali Kelas', 'Assigned teacher ID 5 as wali kelas for KELAS 12 TKJ 1', NULL, '2026-05-01 04:49:29'),
(31, 1, 'Remove Wali Kelas', 'Removed wali kelas assignment ID 1', NULL, '2026-05-01 04:49:34'),
(32, 1, 'Bulk Update Permissions', 'Updated permissions for all students', NULL, '2026-05-01 05:01:21'),
(33, 1, 'Bulk Update Permissions', 'Updated permissions for all students', NULL, '2026-05-01 05:01:28'),
(34, 1, 'Bulk Update Permissions', 'Updated permissions for all students', NULL, '2026-05-01 05:01:29'),
(35, 1, 'Bulk Update Permissions', 'Updated permissions for all students', NULL, '2026-05-01 05:01:31'),
(36, 1, 'Login', 'User logged in', NULL, '2026-05-01 05:01:51'),
(37, 1, 'Create Student', 'Created student account for kariada (1208)', NULL, '2026-05-01 05:02:19'),
(38, 6, 'Login', 'User logged in', NULL, '2026-05-01 05:02:28'),
(39, 1, 'Login', 'User logged in', NULL, '2026-05-01 05:05:31'),
(40, 1, 'Update Permissions', 'Updated permissions for user ID 5', NULL, '2026-05-01 05:13:11'),
(41, 1, 'Update Permissions', 'Updated permissions for user ID 3', NULL, '2026-05-01 05:13:13'),
(42, 5, 'Login', 'User logged in', NULL, '2026-05-01 05:13:21'),
(43, 1, 'Login', 'User logged in', NULL, '2026-05-01 05:13:47'),
(44, 1, 'Login', 'User logged in', NULL, '2026-05-01 05:33:55'),
(45, 5, 'Login', 'User logged in', NULL, '2026-05-01 05:36:56'),
(46, 1, 'Login', 'User logged in', NULL, '2026-05-01 05:37:20'),
(47, 1, 'Create Student', 'Created student account for bagaiada (1231)', NULL, '2026-05-01 05:37:52'),
(48, 7, 'Login', 'User logged in', NULL, '2026-05-01 05:38:07'),
(49, 6, 'Login', 'User logged in', NULL, '2026-05-01 05:39:58'),
(50, 6, 'Login', 'User logged in', NULL, '2026-05-01 05:41:00'),
(51, 6, 'Login', 'User logged in', NULL, '2026-05-01 05:41:29'),
(52, 1, 'Login', 'User logged in', NULL, '2026-05-01 05:41:50'),
(53, 1, 'Bulk Update Permissions', 'Updated permissions for all students', NULL, '2026-05-01 05:42:03'),
(54, 1, 'Update Permissions', 'Updated permissions for user ID 3', NULL, '2026-05-01 05:42:09'),
(55, 1, 'Update Permissions', 'Updated permissions for user ID 5', NULL, '2026-05-01 05:42:10'),
(56, 1, 'Update Permissions', 'Updated permissions for user ID 5', NULL, '2026-05-01 05:42:11'),
(57, 1, 'Update Permissions', 'Updated permissions for user ID 6', NULL, '2026-05-01 05:42:11'),
(58, 1, 'Update Permissions', 'Updated permissions for user ID 7', NULL, '2026-05-01 05:42:12'),
(59, 6, 'Login', 'User logged in', NULL, '2026-05-01 05:42:22'),
(60, 6, 'Login', 'User logged in', NULL, '2026-05-01 05:42:33'),
(61, 5, 'Login', 'User logged in', NULL, '2026-05-01 05:49:54'),
(62, 6, 'Login', 'User logged in', NULL, '2026-05-01 05:50:28'),
(63, 5, 'Login', 'User logged in', NULL, '2026-05-01 05:57:13'),
(64, 6, 'Login', 'User logged in', NULL, '2026-05-01 05:57:48'),
(65, 5, 'Login', 'User logged in', NULL, '2026-05-01 05:58:30'),
(66, 5, 'Login', 'User logged in', NULL, '2026-05-01 05:58:38'),
(67, 6, 'Login', 'User logged in', NULL, '2026-05-01 06:02:22'),
(68, 1, 'Login', 'User logged in', NULL, '2026-05-01 06:02:51'),
(69, 5, 'Login', 'User logged in', NULL, '2026-05-01 06:03:47'),
(70, 1, 'Login', 'User logged in', NULL, '2026-05-01 06:04:12'),
(71, 5, 'Login', 'User logged in', NULL, '2026-05-01 06:30:41'),
(72, 5, 'Login', 'User logged in', NULL, '2026-05-01 06:34:54'),
(73, 1, 'Login', 'User logged in', NULL, '2026-05-01 06:35:44'),
(74, 5, 'Login', 'User logged in', NULL, '2026-05-01 06:36:29'),
(75, 6, 'Login', 'User logged in', NULL, '2026-05-01 06:40:14'),
(76, 1, 'Login', 'User logged in', NULL, '2026-05-01 06:42:24'),
(77, 1, 'Assign Wali Kelas', 'Assigned teacher ID 5 as wali kelas for KELAS 12 TO 1', NULL, '2026-05-01 06:42:43'),
(78, 5, 'Login', 'User logged in', NULL, '2026-05-01 06:44:04'),
(79, 5, 'Login', 'User logged in', NULL, '2026-05-01 06:44:26'),
(80, 6, 'Login', 'User logged in', NULL, '2026-05-01 06:44:35'),
(81, 1, 'Login', 'User logged in', NULL, '2026-05-01 06:48:22'),
(82, 5, 'Login', 'User logged in', NULL, '2026-05-01 07:13:36'),
(83, 1, 'Login', 'User logged in', NULL, '2026-05-01 07:40:09'),
(84, 6, 'Login', 'User logged in', NULL, '2026-05-01 07:40:57'),
(85, 1, 'Login', 'User logged in', NULL, '2026-05-01 07:50:30'),
(86, 1, 'Login', 'User logged in', NULL, '2026-05-01 08:18:47'),
(87, 1, 'Create Student', 'Created student account for kariadaofjapan (1212)', NULL, '2026-05-01 08:19:15'),
(88, 1, 'Create Teacher', 'Created teacher account for raja harem (3131)', NULL, '2026-05-01 08:19:54'),
(89, 8, 'Login', 'User logged in', NULL, '2026-05-01 08:20:28'),
(90, 1, 'Login', 'User logged in', NULL, '2026-05-01 08:29:16'),
(91, 1, 'Login', 'User logged in', NULL, '2026-05-01 08:31:35'),
(92, 1, 'Login', 'User logged in', NULL, '2026-05-01 08:37:53'),
(93, 1, 'Create Student', 'Created student account for dean (1334)', NULL, '2026-05-01 08:39:56'),
(94, 10, 'Login', 'User logged in', NULL, '2026-05-01 08:40:32'),
(95, 1, 'Login', 'User logged in', NULL, '2026-05-01 08:41:01'),
(96, 5, 'Login', 'User logged in', NULL, '2026-05-01 08:41:24'),
(97, 10, 'Login', 'User logged in', NULL, '2026-05-01 08:41:49'),
(98, 10, 'Login', 'User logged in', NULL, '2026-05-01 08:42:01'),
(99, 10, 'Login', 'User logged in', NULL, '2026-05-01 08:44:49'),
(100, 10, 'Login', 'User logged in', NULL, '2026-05-01 08:46:31'),
(101, 1, 'Login', 'User logged in', NULL, '2026-05-01 09:06:33'),
(102, 1, 'Login', 'User logged in', NULL, '2026-05-02 05:42:21'),
(103, 1, 'Submit Event', 'Submitted event: lomba succubus tingakat internasional', NULL, '2026-05-02 06:19:39'),
(104, 5, 'Login', 'User logged in', NULL, '2026-05-02 06:20:33'),
(105, 1, 'Login', 'User logged in', NULL, '2026-05-02 06:21:13'),
(106, 5, 'Login', 'User logged in', NULL, '2026-05-02 06:29:15'),
(107, 1, 'Login', 'User logged in', NULL, '2026-05-02 06:31:46'),
(108, 5, 'Login', 'User logged in', NULL, '2026-05-02 06:32:49'),
(109, 6, 'Login', 'User logged in', NULL, '2026-05-02 06:35:43'),
(110, 5, 'Login', 'User logged in', NULL, '2026-05-02 06:37:46'),
(111, 1, 'Login', 'User logged in', NULL, '2026-05-02 06:38:07'),
(112, 1, 'Login', 'User logged in', NULL, '2026-05-02 06:39:57'),
(113, 5, 'Login', 'User logged in', NULL, '2026-05-02 06:40:30'),
(114, 1, 'Login', 'User logged in', NULL, '2026-05-02 06:41:19'),
(115, 5, 'Login', 'User logged in', NULL, '2026-05-02 06:41:41'),
(116, 1, 'Login', 'User logged in', NULL, '2026-05-02 06:42:07'),
(117, 6, 'Login', 'User logged in', NULL, '2026-05-02 06:53:24'),
(118, 1, 'Login', 'User logged in', NULL, '2026-05-02 06:56:44'),
(119, 1, 'Remove Wali Kelas', 'Removed wali kelas assignment ID 2', NULL, '2026-05-02 06:56:52'),
(120, 5, 'Login', 'User logged in', NULL, '2026-05-02 06:58:51'),
(121, 1, 'Login', 'User logged in', NULL, '2026-05-02 07:01:10'),
(122, 1, 'Update Biodata', 'Updated biodata for siswa ID 3', NULL, '2026-05-02 07:02:28'),
(123, 1, 'Update Biodata', 'Updated biodata for siswa ID 3', NULL, '2026-05-02 07:02:32'),
(124, 1, 'Login', 'User logged in', NULL, '2026-05-02 07:02:50'),
(125, 5, 'Login', 'User logged in', NULL, '2026-05-02 07:03:29'),
(126, 5, 'Login', 'User logged in', NULL, '2026-05-02 07:20:06'),
(127, 1, 'Login', 'User logged in', NULL, '2026-05-02 07:20:18'),
(128, 5, 'Login', 'User logged in', NULL, '2026-05-02 07:21:01'),
(129, 5, 'Create Student', 'Created student account for adwa (1213)', NULL, '2026-05-02 07:21:34'),
(130, 5, 'Login', 'User logged in', NULL, '2026-05-02 07:33:32'),
(131, 1, 'Login', 'User logged in', NULL, '2026-05-02 07:34:46'),
(132, 5, 'Login', 'User logged in', NULL, '2026-05-02 07:35:54'),
(133, 1, 'Login', 'User logged in', NULL, '2026-05-02 07:38:37'),
(134, 5, 'Login', 'User logged in', NULL, '2026-05-02 07:42:01'),
(135, 1, 'Login', 'User logged in', NULL, '2026-05-02 07:42:29'),
(136, 5, 'Login', 'User logged in', NULL, '2026-05-02 07:46:25'),
(137, 1, 'Login', 'User logged in', NULL, '2026-05-02 07:46:41'),
(138, 5, 'Login', 'User logged in', NULL, '2026-05-02 07:50:10'),
(139, 1, 'Login', 'User logged in', NULL, '2026-05-02 07:50:38'),
(140, 5, 'Login', 'User logged in', NULL, '2026-05-02 07:50:59'),
(141, 1, 'Login', 'User logged in', NULL, '2026-05-02 07:51:30'),
(142, 6, 'Login', 'User logged in', NULL, '2026-05-02 07:52:07'),
(143, 5, 'Login', 'User logged in', NULL, '2026-05-02 07:52:53'),
(144, 1, 'Login', 'User logged in', NULL, '2026-05-02 07:53:20'),
(145, 6, 'Login', 'User logged in', NULL, '2026-05-02 07:53:39'),
(146, 6, 'Submit Organisasi', 'Submitted organisasi: ketua', NULL, '2026-05-02 07:54:53'),
(147, 5, 'Login', 'User logged in', NULL, '2026-05-02 07:55:13'),
(148, 6, 'Login', 'User logged in', NULL, '2026-05-02 07:55:33'),
(149, 6, 'Submit Organisasi', 'Submitted organisasi: ketua', NULL, '2026-05-02 07:55:59'),
(150, 5, 'Login', 'User logged in', NULL, '2026-05-02 07:56:10'),
(151, 1, 'Login', 'User logged in', NULL, '2026-05-02 07:56:34'),
(152, 6, 'Login', 'User logged in', NULL, '2026-05-02 08:01:02'),
(153, 6, 'Submit Organisasi', 'Submitted organisasi: ketua', NULL, '2026-05-02 08:01:40'),
(154, 5, 'Login', 'User logged in', NULL, '2026-05-02 08:01:47'),
(155, 6, 'Login', 'User logged in', NULL, '2026-05-02 08:20:15'),
(156, 5, 'Login', 'User logged in', NULL, '2026-05-02 08:26:45'),
(157, 1, 'Login', 'User logged in', NULL, '2026-05-02 08:27:42'),
(158, 5, 'Login', 'User logged in', NULL, '2026-05-02 08:28:07'),
(159, 14, 'Login', 'User logged in', NULL, '2026-05-02 08:28:30'),
(160, 5, 'Login', 'User logged in', NULL, '2026-05-02 08:31:13'),
(161, 1, 'Login', 'User logged in', NULL, '2026-05-02 08:31:33'),
(162, 14, 'Login', 'User logged in', NULL, '2026-05-02 08:34:38'),
(163, 14, 'Submit Event', 'Submitted event: lomba succubus tingakat internasionaldwdwdwd', NULL, '2026-05-02 08:35:07'),
(164, 5, 'Login', 'User logged in', NULL, '2026-05-02 08:35:17'),
(165, 1, 'Login', 'User logged in', NULL, '2026-05-02 08:36:39'),
(166, 14, 'Login', 'User logged in', NULL, '2026-05-02 08:39:14'),
(167, 14, 'Submit Event', 'Submitted event: lomba succubus tingakat internasional sdsdsdsd', NULL, '2026-05-02 08:43:23'),
(168, 5, 'Login', 'User logged in', NULL, '2026-05-02 08:43:32'),
(169, 14, 'Login', 'User logged in', NULL, '2026-05-02 08:43:50'),
(170, 14, 'Submit Event', 'Submitted event: 2121', NULL, '2026-05-02 08:44:07'),
(171, 5, 'Login', 'User logged in', NULL, '2026-05-02 08:44:23'),
(172, 1, 'Login', 'User logged in', NULL, '2026-05-02 08:45:02'),
(173, 5, 'Login', 'User logged in', NULL, '2026-05-02 08:46:23'),
(174, 14, 'Login', 'User logged in', NULL, '2026-05-02 08:46:33'),
(175, 14, 'Submit Event', 'Submitted event: lomba succubus tingakat internasional sdsdsdsd', NULL, '2026-05-02 08:46:52'),
(176, 5, 'Login', 'User logged in', NULL, '2026-05-02 08:47:01'),
(177, 14, 'Login', 'User logged in', NULL, '2026-05-02 08:47:20'),
(178, 14, 'Submit Event', 'Submitted event: lomba succubus tingakat internasionaldwdwdwd', NULL, '2026-05-02 08:47:44'),
(179, 5, 'Login', 'User logged in', NULL, '2026-05-02 08:50:47'),
(180, 14, 'Login', 'User logged in', NULL, '2026-05-02 09:00:11'),
(181, 5, 'Login', 'User logged in', NULL, '2026-05-02 09:00:43'),
(182, 1, 'Login', 'User logged in', NULL, '2026-05-02 09:00:59'),
(183, 14, 'Login', 'User logged in', NULL, '2026-05-02 09:04:10'),
(184, 1, 'Login', 'User logged in', NULL, '2026-05-03 07:17:40'),
(185, 14, 'Login', 'User logged in', NULL, '2026-05-03 07:32:22'),
(186, 1, 'Login', 'User logged in', NULL, '2026-05-03 07:33:07'),
(187, 5, 'Login', 'User logged in', NULL, '2026-05-03 07:33:25'),
(188, 1, 'Login', 'User logged in', NULL, '2026-05-03 07:33:42'),
(189, 6, 'Login', 'User logged in', NULL, '2026-05-03 08:11:01'),
(190, 5, 'Login', 'User logged in', NULL, '2026-05-03 08:17:51'),
(191, 1, 'Login', 'User logged in', NULL, '2026-05-03 08:18:12'),
(192, 14, 'Login', 'User logged in', NULL, '2026-05-03 09:25:21'),
(193, 5, 'Login', 'User logged in', NULL, '2026-05-03 09:26:03'),
(194, 1, 'Login', 'User logged in', NULL, '2026-05-03 09:26:36'),
(195, 14, 'Login', 'User logged in', NULL, '2026-05-03 09:29:53'),
(196, 5, 'Login', 'User logged in', NULL, '2026-05-03 09:30:25'),
(197, 1, 'Login', 'User logged in', NULL, '2026-05-03 09:30:41'),
(198, 14, 'Login', 'User logged in', NULL, '2026-05-03 10:24:45'),
(199, 5, 'Login', 'User logged in', NULL, '2026-05-03 10:25:40'),
(200, 1, 'Login', 'User logged in', NULL, '2026-05-03 10:26:11'),
(201, 14, 'Login', 'User logged in', NULL, '2026-05-03 10:26:54'),
(202, 5, 'Login', 'User logged in', NULL, '2026-05-03 10:27:44'),
(203, 1, 'Login', 'User logged in', NULL, '2026-05-03 10:28:02'),
(204, 14, 'Login', 'User logged in', NULL, '2026-05-03 10:28:44'),
(205, 1, 'Login', 'User logged in', NULL, '2026-05-03 10:29:03'),
(206, 1, 'Login', 'User logged in', NULL, '2026-05-03 10:29:28'),
(207, 14, 'Login', 'User logged in', NULL, '2026-05-03 10:30:34'),
(208, 5, 'Login', 'User logged in', NULL, '2026-05-03 23:38:05'),
(209, 1, 'Login', 'User logged in', NULL, '2026-05-03 23:38:26'),
(210, 14, 'Login', 'User logged in', NULL, '2026-05-04 00:13:14'),
(211, 1, 'Login', 'User logged in', NULL, '2026-05-04 00:13:47'),
(212, 14, 'Login', 'User logged in', NULL, '2026-05-04 00:14:18'),
(213, 1, 'Login', 'User logged in', NULL, '2026-05-04 00:26:52'),
(214, 14, 'Login', 'User logged in', NULL, '2026-05-04 00:27:21'),
(215, 14, 'Login', 'User logged in', NULL, '2026-05-04 00:28:51'),
(216, 1, 'Login', 'User logged in', NULL, '2026-05-04 00:29:14'),
(217, 14, 'Login', 'User logged in', NULL, '2026-05-04 00:31:26'),
(218, 1, 'Login', 'User logged in', NULL, '2026-05-04 00:31:43'),
(219, 14, 'Login', 'User logged in', NULL, '2026-05-04 00:32:44'),
(220, 1, 'Login', 'User logged in', NULL, '2026-05-04 00:33:28'),
(221, 14, 'Login', 'User logged in', NULL, '2026-05-04 00:33:46'),
(222, 1, 'Login', 'User logged in', NULL, '2026-05-04 00:40:23'),
(223, 14, 'Login', 'User logged in', NULL, '2026-05-04 00:42:19'),
(224, 1, 'Login', 'User logged in', NULL, '2026-05-04 00:47:57'),
(225, 14, 'Login', 'User logged in', NULL, '2026-05-04 00:48:15'),
(226, 1, 'Login', 'User logged in', NULL, '2026-05-04 00:53:18'),
(227, 1, 'Login', 'User logged in', NULL, '2026-05-04 00:53:37'),
(228, 14, 'Login', 'User logged in', NULL, '2026-05-04 00:53:51'),
(229, 1, 'Login', 'User logged in', NULL, '2026-05-04 01:00:41'),
(230, 14, 'Login', 'User logged in', NULL, '2026-05-04 01:01:12'),
(231, 1, 'Login', 'User logged in', NULL, '2026-05-04 01:02:02'),
(232, 14, 'Login', 'User logged in', NULL, '2026-05-04 01:02:25'),
(233, 14, 'Login', 'User logged in', NULL, '2026-05-04 01:10:41'),
(234, 1, 'Login', 'User logged in', NULL, '2026-05-04 01:10:51'),
(235, 14, 'Login', 'User logged in', NULL, '2026-05-04 01:11:15'),
(236, 1, 'Login', 'User logged in', NULL, '2026-05-04 01:18:15'),
(237, 14, 'Login', 'User logged in', NULL, '2026-05-04 01:18:37'),
(238, 1, 'Login', 'User logged in', NULL, '2026-05-04 01:18:51'),
(239, 14, 'Login', 'User logged in', NULL, '2026-05-04 01:19:18'),
(240, 1, 'Login', 'User logged in', NULL, '2026-05-04 01:19:29'),
(241, 14, 'Login', 'User logged in', NULL, '2026-05-04 01:22:53'),
(242, 1, 'Login', 'User logged in', NULL, '2026-05-04 01:23:11'),
(243, 1, 'Login', 'User logged in', NULL, '2026-05-04 01:23:42'),
(244, 14, 'Login', 'User logged in', NULL, '2026-05-04 01:23:52'),
(245, 1, 'Login', 'User logged in', NULL, '2026-05-04 01:24:29'),
(246, 14, 'Login', 'User logged in', NULL, '2026-05-04 01:24:53'),
(247, 1, 'Login', 'User logged in', NULL, '2026-05-04 01:25:10'),
(248, 14, 'Login', 'User logged in', NULL, '2026-05-04 01:25:27'),
(249, 1, 'Login', 'User logged in', NULL, '2026-05-04 01:27:16'),
(250, 14, 'Login', 'User logged in', NULL, '2026-05-04 01:43:15'),
(251, 1, 'Login', 'User logged in', NULL, '2026-05-04 01:43:33'),
(252, 14, 'Login', 'User logged in', NULL, '2026-05-04 01:44:17'),
(253, 1, 'Login', 'User logged in', NULL, '2026-05-04 01:44:26'),
(254, 14, 'Login', 'User logged in', NULL, '2026-05-04 01:44:47'),
(255, 1, 'Login', 'User logged in', NULL, '2026-05-04 01:44:57'),
(256, 1, 'Login', 'User logged in', NULL, '2026-05-04 01:45:37'),
(257, 14, 'Login', 'User logged in', NULL, '2026-05-04 01:45:45'),
(258, 1, 'Login', 'User logged in', NULL, '2026-05-04 01:52:14'),
(259, 14, 'Login', 'User logged in', NULL, '2026-05-04 02:00:17'),
(260, 1, 'Login', 'User logged in', NULL, '2026-05-04 02:00:28'),
(261, 14, 'Login', 'User logged in', NULL, '2026-05-04 02:00:47'),
(262, 1, 'Login', 'User logged in', NULL, '2026-05-04 02:03:04'),
(263, 14, 'Login', 'User logged in', NULL, '2026-05-04 02:03:24'),
(264, 1, 'Login', 'User logged in', NULL, '2026-05-04 02:03:39'),
(265, 14, 'Login', 'User logged in', NULL, '2026-05-04 02:04:06'),
(266, 1, 'Login', 'User logged in', NULL, '2026-05-04 02:04:20'),
(267, 14, 'Login', 'User logged in', NULL, '2026-05-04 02:14:00'),
(268, 1, 'Login', 'User logged in', NULL, '2026-05-04 02:14:12'),
(269, 14, 'Login', 'User logged in', NULL, '2026-05-04 02:14:28'),
(270, 1, 'Login', 'User logged in', NULL, '2026-05-04 02:14:39'),
(271, 14, 'Login', 'User logged in', NULL, '2026-05-04 02:26:35'),
(272, 1, 'Login', 'User logged in', NULL, '2026-05-04 02:26:45'),
(273, 14, 'Login', 'User logged in', NULL, '2026-05-04 02:27:01'),
(274, 1, 'Login', 'User logged in', NULL, '2026-05-04 02:31:59'),
(275, 5, 'Login', 'User logged in', NULL, '2026-05-04 02:32:26'),
(276, 1, 'Login', 'User logged in', NULL, '2026-05-04 02:32:44'),
(277, 5, 'Login', 'User logged in', NULL, '2026-05-04 02:33:01'),
(278, 1, 'Login', 'User logged in', NULL, '2026-05-04 02:33:19'),
(279, 5, 'Login', 'User logged in', NULL, '2026-05-04 02:33:36'),
(280, 1, 'Login', 'User logged in', NULL, '2026-05-04 02:34:05'),
(281, 14, 'Login', 'User logged in', NULL, '2026-05-04 03:51:49'),
(282, 1, 'Login', 'User logged in', NULL, '2026-05-04 03:52:03'),
(283, 14, 'Login', 'User logged in', NULL, '2026-05-04 03:52:23'),
(284, 1, 'Login', 'User logged in', NULL, '2026-05-04 03:53:29'),
(285, 1, 'Login', 'User logged in', NULL, '2026-05-04 03:54:24'),
(286, 1, 'Assign Wali Kelas', 'Assigned teacher ID 5 as wali kelas for KELAS 10 TKJ 1', NULL, '2026-05-04 04:04:15'),
(287, 1, 'Assign Wali Kelas', 'Assigned teacher kariada as wali kelas for KELAS 10 TKJ 1', NULL, '2026-05-04 04:51:37'),
(288, 1, 'Remove Wali Kelas', 'Removed kariada as wali kelas for KELAS 10 TKJ 1', NULL, '2026-05-04 04:51:46'),
(289, 1, 'Remove Wali Kelas', 'Removed kariada as wali kelas for KELAS 10 TKJ 1', NULL, '2026-05-04 04:51:49'),
(290, 1, 'Assign Wali Kelas', 'Assigned teacher kariada as wali kelas for KELAS 10 TO 2', NULL, '2026-05-04 04:51:58'),
(291, 5, 'Login', 'User logged in', NULL, '2026-05-04 04:52:18'),
(292, 1, 'Login', 'User logged in', NULL, '2026-05-04 05:51:00'),
(293, 5, 'Login', 'User logged in', NULL, '2026-05-04 06:03:29'),
(294, 1, 'Login', 'User logged in', NULL, '2026-05-04 06:17:56'),
(295, 5, 'Login', 'User logged in', NULL, '2026-05-04 06:21:40'),
(296, 1, 'Login', 'User logged in', NULL, '2026-05-04 06:22:01'),
(297, 5, 'Login', 'User logged in', NULL, '2026-05-04 07:13:16'),
(298, 1, 'Login', 'User logged in', NULL, '2026-05-04 07:13:36'),
(299, 1, 'Create Teacher', 'Created teacher account for sudi (44444)', NULL, '2026-05-04 07:14:03'),
(300, 1, 'Login', 'User logged in', NULL, '2026-05-04 07:14:27'),
(301, 1, 'Login', 'User logged in', NULL, '2026-05-05 07:28:53'),
(302, 5, 'Login', 'User logged in', NULL, '2026-05-05 07:29:43'),
(303, 1, 'Login', 'User logged in', NULL, '2026-05-05 07:29:57'),
(304, 14, 'Login', 'User logged in', NULL, '2026-05-05 07:41:23'),
(305, 1, 'Login', 'User logged in', NULL, '2026-05-05 07:41:34'),
(306, 14, 'Login', 'User logged in', NULL, '2026-05-05 07:41:49'),
(307, 1, 'Login', 'User logged in', NULL, '2026-05-05 07:42:33'),
(308, 5, 'Login', 'User logged in', NULL, '2026-05-05 07:58:27'),
(309, 1, 'Login', 'User logged in', NULL, '2026-05-05 07:58:49'),
(310, 14, 'Login', 'User logged in', NULL, '2026-05-05 07:59:59'),
(311, 5, 'Login', 'User logged in', NULL, '2026-05-05 08:00:43'),
(312, 1, 'Login', 'User logged in', NULL, '2026-05-05 08:01:26'),
(313, 1, 'Create Teacher', 'Created teacher account for surya (4333)', NULL, '2026-05-05 08:02:45'),
(314, 16, 'Login', 'User logged in', NULL, '2026-05-05 08:02:57'),
(315, 1, 'Login', 'User logged in', NULL, '2026-05-05 08:03:27'),
(316, 1, 'Assign Wali Kelas', 'Assigned teacher surya as wali kelas for KELAS 10 TKJ 1', NULL, '2026-05-05 08:03:57'),
(317, 16, 'Login', 'User logged in', NULL, '2026-05-05 08:04:11'),
(318, 1, 'Login', 'User logged in', NULL, '2026-05-05 08:04:27'),
(319, 5, 'Login', 'User logged in', NULL, '2026-05-05 08:04:53'),
(320, 1, 'Login', 'User logged in', NULL, '2026-05-05 08:05:27'),
(321, 14, 'Login', 'User logged in', NULL, '2026-05-05 08:05:51'),
(322, 1, 'Login', 'User logged in', NULL, '2026-05-05 08:05:59'),
(323, 14, 'Login', 'User logged in', NULL, '2026-05-05 08:06:22'),
(324, 1, 'Login', 'User logged in', NULL, '2026-05-05 08:07:27'),
(325, 1, 'Login', 'User logged in', NULL, '2026-05-05 08:09:28'),
(326, 1, 'Login', 'User logged in', NULL, '2026-05-07 07:05:53'),
(327, 1, 'Login', 'User logged in', NULL, '2026-05-07 07:16:54'),
(328, 1, 'Login', 'User logged in', NULL, '2026-05-07 07:35:32'),
(329, 14, 'Login', 'User logged in', NULL, '2026-05-07 07:44:59'),
(330, 1, 'Login', 'User logged in', NULL, '2026-05-07 07:45:37'),
(331, 1, 'Login', 'User logged in', NULL, '2026-05-07 07:51:48'),
(332, 1, 'Login', 'User logged in', NULL, '2026-05-07 08:01:41'),
(333, 5, 'Login', 'User logged in', NULL, '2026-05-07 08:02:29'),
(334, 5, 'Login', 'User logged in', NULL, '2026-05-07 08:02:38'),
(335, 1, 'Login', 'User logged in', NULL, '2026-05-07 08:03:07'),
(336, 16, 'Login', 'User logged in', NULL, '2026-05-07 08:03:28'),
(337, 1, 'Login', 'User logged in', NULL, '2026-05-07 08:03:42'),
(338, 1, 'Login', 'User logged in', NULL, '2026-05-07 08:26:30'),
(339, 1, 'Login', 'User logged in', NULL, '2026-05-07 08:29:46'),
(340, 1, 'Login', 'User logged in', NULL, '2026-05-08 07:36:39'),
(341, 1, 'Login', 'User logged in', NULL, '2026-05-14 05:56:20'),
(342, 1, 'Login', 'User logged in', NULL, '2026-05-14 06:24:25'),
(343, 14, 'Login', 'User logged in', NULL, '2026-05-14 06:27:31'),
(344, 5, 'Login', 'User logged in', NULL, '2026-05-14 06:28:49'),
(345, 5, 'Login', 'User logged in', NULL, '2026-05-14 06:29:49'),
(346, 5, 'Login', 'User logged in', NULL, '2026-05-14 06:31:11'),
(347, 14, 'Login', 'User logged in', NULL, '2026-05-14 06:32:05'),
(348, 14, 'Login', 'User logged in', NULL, '2026-05-14 06:35:10'),
(349, 5, 'Login', 'User logged in', NULL, '2026-05-14 06:35:39'),
(350, 14, 'Login', 'User logged in', NULL, '2026-05-14 06:35:49'),
(351, 5, 'Login', 'User logged in', NULL, '2026-05-14 06:41:56'),
(352, 1, 'Login', 'User logged in', NULL, '2026-05-14 06:42:53'),
(353, 1, 'Login', 'User logged in', NULL, '2026-05-14 06:43:20'),
(354, 14, 'Login', 'User logged in', NULL, '2026-05-14 06:48:22'),
(355, 5, 'Login', 'User logged in', NULL, '2026-05-14 06:48:55'),
(356, 1, 'Login', 'User logged in', NULL, '2026-05-14 06:49:13'),
(357, 14, 'Login', 'User logged in', NULL, '2026-05-14 06:53:48'),
(358, 5, 'Login', 'User logged in', NULL, '2026-05-14 06:54:24'),
(359, 1, 'Login', 'User logged in', NULL, '2026-05-14 06:54:41'),
(360, 1, 'Login', 'User logged in', NULL, '2026-05-18 10:21:45'),
(361, 1, 'Login', 'User logged in', NULL, '2026-05-25 22:54:43'),
(362, 1, 'Login', 'User logged in', NULL, '2026-05-25 23:00:54'),
(363, 1, 'Login', 'User logged in', NULL, '2026-05-25 23:03:37'),
(364, 1, 'Update IPC', 'Updated IPC for user ID 3 to 80', NULL, '2026-05-25 23:04:09'),
(365, 1, 'Update IPC', 'Updated IPC for user ID 3 to 30', NULL, '2026-05-25 23:04:18'),
(366, 1, 'Login', 'User logged in', NULL, '2026-05-25 23:07:24');

-- --------------------------------------------------------

--
-- Table structure for table `biodata_update_approvals`
--

CREATE TABLE `biodata_update_approvals` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `nama_baru` varchar(100) DEFAULT NULL,
  `nis_baru` varchar(20) DEFAULT NULL,
  `nisn_baru` varchar(20) DEFAULT NULL,
  `kelas_baru` varchar(50) DEFAULT NULL,
  `jurusan_baru` enum('TKJ','TO','DPIB') DEFAULT NULL,
  `grha_baru` varchar(50) DEFAULT NULL,
  `nama_lama` varchar(100) DEFAULT NULL,
  `nis_lama` varchar(20) DEFAULT NULL,
  `nisn_lama` varchar(20) DEFAULT NULL,
  `kelas_lama` varchar(50) DEFAULT NULL,
  `jurusan_lama` enum('TKJ','TO','DPIB') DEFAULT NULL,
  `grha_lama` varchar(50) DEFAULT NULL,
  `requested_by` int(11) NOT NULL,
  `pembina_status` enum('pending','approved','rejected') DEFAULT 'pending',
  `superadmin_status` enum('pending','approved','rejected') DEFAULT 'pending',
  `pembina_notes` text DEFAULT NULL,
  `superadmin_notes` text DEFAULT NULL,
  `pembina_approved_at` timestamp NULL DEFAULT NULL,
  `superadmin_approved_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `biodata_update_approvals`
--

INSERT INTO `biodata_update_approvals` (`id`, `user_id`, `nama_baru`, `nis_baru`, `nisn_baru`, `kelas_baru`, `jurusan_baru`, `grha_baru`, `nama_lama`, `nis_lama`, `nisn_lama`, `kelas_lama`, `jurusan_lama`, `grha_lama`, `requested_by`, `pembina_status`, `superadmin_status`, `pembina_notes`, `superadmin_notes`, `pembina_approved_at`, `superadmin_approved_at`, `created_at`) VALUES
(1, 3, 'agus', '123124', '12431241', 'KELAS 11 DPIB 1', 'DPIB', 'Airsanya', 'agus', '123124', '12431241', 'KELAS 11 DPIB 1', 'TKJ', 'Airsanya', 5, 'pending', 'approved', NULL, 'ok', NULL, '2026-05-02 07:49:43', '2026-05-02 07:38:24'),
(2, 3, 'agus', '123124', '12431241', 'KELAS 11 DPIB 1', 'TKJ', 'Genya', 'agus', '123124', '12431241', 'KELAS 11 DPIB 1', 'TKJ', 'Airsanya', 5, 'pending', 'approved', NULL, 'ok', NULL, '2026-05-02 07:49:38', '2026-05-02 07:46:32'),
(3, 12, 'wdwd', 'wdwd', 'wdwd', 'KELAS 12 DPIB 1', 'TKJ', 'Daksina', 'wdwd', 'wdwd', 'wdwd', 'KELAS 12 DPIB 1', 'TKJ', 'Airsanya', 5, 'pending', 'approved', NULL, 'oke', NULL, '2026-05-02 07:50:50', '2026-05-02 07:50:30'),
(4, 3, 'agus', '123124', '12431241', 'KELAS 11 DPIB 1', 'DPIB', 'Airsanya', 'agus', '123124', '12431241', 'KELAS 11 DPIB 1', 'DPIB', 'Airsanya', 16, 'pending', 'rejected', NULL, 'ok', NULL, NULL, '2026-05-05 08:03:17');

-- --------------------------------------------------------

--
-- Table structure for table `drive_links`
--

CREATE TABLE `drive_links` (
  `id` int(11) NOT NULL,
  `type` enum('prestasi','event','organisasi','pelanggaran','perilaku') NOT NULL,
  `drive_url` varchar(500) NOT NULL,
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `drive_links`
--

INSERT INTO `drive_links` (`id`, `type`, `drive_url`, `updated_at`, `created_at`) VALUES
(1, 'prestasi', 'https://drive.google.com/drive/folders/1DCd68ReEP13U_5rbycEAILtvNws0mG5d', '2026-05-03 08:57:02', '2026-05-01 09:05:12'),
(2, 'event', 'https://drive.google.com/drive/folders/12HQZd1NjpUBeAVQvMgz314kIk_GoqONq', '2026-05-03 09:21:14', '2026-05-01 09:05:12'),
(3, 'organisasi', 'https://drive.google.com/drive/folders/1SoM-ilCibbRzAXuVJmBmtLXBbXsXEj3C', '2026-05-03 08:07:50', '2026-05-01 09:05:12'),
(4, 'pelanggaran', 'https://drive.google.com/drive/folders/1W1ofGRL3iF0JIvQ99AX8B0TN5JmD9mF4', '2026-05-03 09:21:18', '2026-05-01 09:05:12'),
(5, 'perilaku', 'https://drive.google.com/drive/folders/1A_Q6xqUsKdkZu0pjnWqMXwVZbK5mtdDy', '2026-05-03 09:21:21', '2026-05-01 09:05:12');

-- --------------------------------------------------------

--
-- Table structure for table `event`
--

CREATE TABLE `event` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `nama` varchar(100) NOT NULL,
  `nis` varchar(20) NOT NULL,
  `kelas` varchar(50) DEFAULT NULL,
  `grha` varchar(50) DEFAULT NULL,
  `jurusan` enum('TKJ','TO','DPIB') DEFAULT NULL,
  `nama_event` varchar(255) NOT NULL,
  `tingkat` enum('sekolah','kecamatan','kabupaten','provinsi','nasional','internasional') NOT NULL,
  `foto` varchar(255) DEFAULT NULL,
  `point` int(11) NOT NULL,
  `status` enum('pending','approved','rejected') DEFAULT 'pending',
  `rejection_reason` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `event`
--

INSERT INTO `event` (`id`, `user_id`, `nama`, `nis`, `kelas`, `grha`, `jurusan`, `nama_event`, `tingkat`, `foto`, `point`, `status`, `rejection_reason`, `created_at`) VALUES
(1, 1, 'kariada', '1208', 'KELAS 10 DPIB 1', 'dkjdwdw', 'TKJ', 'lomba succubus tingakat internasional', 'internasional', '1777702779296.png', 12, 'pending', NULL, '2026-05-02 06:19:39'),
(2, 14, 'dean', '4321', 'KELAS 10 TKJ 1', 'Genya', 'TKJ', 'lomba succubus tingakat internasionaldwdwdwd', 'kecamatan', '1777710907420.png', 4, 'pending', NULL, '2026-05-02 08:35:07'),
(3, 14, 'dean', '4321', 'KELAS 10 TKJ 1', 'Genya', 'TKJ', 'lomba succubus tingakat internasional sdsdsdsd', 'kecamatan', '1777711403188.png', 4, 'pending', NULL, '2026-05-02 08:43:23'),
(4, 14, 'dean', '4321', 'KELAS 10 TKJ 1', 'Genya', 'TKJ', '2121', 'kecamatan', '1777711447455.png', 4, 'pending', NULL, '2026-05-02 08:44:07'),
(5, 14, 'dean', '4321', 'KELAS 10 TKJ 1', 'Genya', 'TKJ', 'lomba succubus tingakat internasional sdsdsdsd', 'kecamatan', '1777711612033.png', 4, 'pending', NULL, '2026-05-02 08:46:52'),
(6, 14, 'dean', '4321', 'KELAS 10 TKJ 1', 'Genya', 'TKJ', 'lomba succubus tingakat internasionaldwdwdwd', 'sekolah', '1777711664476.png', 2, 'pending', NULL, '2026-05-02 08:47:44'),
(7, 14, 'dean', '4321', 'KELAS 10 TKJ 1', 'Genya', 'TKJ', 'edwdwdw', 'kecamatan', '1777712432313-553097424.png', 4, 'approved', NULL, '2026-05-02 09:03:50');

-- --------------------------------------------------------

--
-- Table structure for table `event_approvals`
--

CREATE TABLE `event_approvals` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `nama` varchar(255) NOT NULL,
  `nis` varchar(50) NOT NULL,
  `kelas` varchar(50) DEFAULT NULL,
  `grha` varchar(50) DEFAULT NULL,
  `jurusan` varchar(50) DEFAULT NULL,
  `pembina` varchar(255) DEFAULT NULL,
  `nama_event` varchar(255) NOT NULL,
  `tingkat` varchar(50) DEFAULT NULL,
  `foto_path` varchar(255) DEFAULT NULL,
  `pembina_status` enum('pending','approved','rejected') DEFAULT 'pending',
  `superadmin_status` enum('pending','approved','rejected') DEFAULT 'pending',
  `pembina_id` int(11) DEFAULT NULL,
  `pembina_approved_at` timestamp NULL DEFAULT NULL,
  `superadmin_approved_at` timestamp NULL DEFAULT NULL,
  `pembina_notes` text DEFAULT NULL,
  `superadmin_notes` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `event_approvals`
--

INSERT INTO `event_approvals` (`id`, `user_id`, `nama`, `nis`, `kelas`, `grha`, `jurusan`, `pembina`, `nama_event`, `tingkat`, `foto_path`, `pembina_status`, `superadmin_status`, `pembina_id`, `pembina_approved_at`, `superadmin_approved_at`, `pembina_notes`, `superadmin_notes`, `created_at`, `updated_at`) VALUES
(1, 14, 'dean', '4321', 'KELAS 10 TKJ 1', 'Genya', 'TKJ', 'kariada', 'edwdwdw', 'kecamatan', '1777712432313-553097424.png', 'approved', 'approved', 5, '2026-05-02 09:00:48', '2026-05-02 09:03:50', 'ewe', 'ayok', '2026-05-02 09:00:32', '2026-05-02 09:03:50'),
(2, 14, 'dean', '4321', 'KELAS 10 TKJ 1', 'Genya', 'TKJ', 'kariada', 'gaatau', 'sekolah', 'https://drive.google.com/file/d/1jzQA7OBGAiM6O09SmaUgnq9miYlOTPKw/view?usp=drivesdk', 'rejected', 'rejected', 5, NULL, NULL, 'ok', 'ok', '2026-05-05 08:07:16', '2026-05-14 06:44:15');

-- --------------------------------------------------------

--
-- Table structure for table `input_access_control`
--

CREATE TABLE `input_access_control` (
  `id` int(11) NOT NULL,
  `control_type` enum('global','role') NOT NULL,
  `role_target` enum('siswa','guru','all') DEFAULT 'all',
  `jenis_input` enum('prestasi','organisasi','event','pelanggaran','perilaku','all') NOT NULL,
  `is_enabled` tinyint(1) DEFAULT 1,
  `updated_by` int(11) NOT NULL,
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `input_access_control`
--

INSERT INTO `input_access_control` (`id`, `control_type`, `role_target`, `jenis_input`, `is_enabled`, `updated_by`, `updated_at`) VALUES
(1, 'global', 'all', 'prestasi', 1, 1, '2026-05-04 00:10:46'),
(2, 'global', 'all', 'organisasi', 1, 1, '2026-05-04 00:10:46'),
(3, 'global', 'all', 'event', 1, 1, '2026-05-04 00:10:46'),
(4, 'global', 'all', 'pelanggaran', 1, 1, '2026-05-04 00:10:46'),
(5, 'global', 'all', 'perilaku', 1, 1, '2026-05-04 00:10:46'),
(6, 'global', 'all', 'prestasi', 0, 1, '2026-05-04 00:12:28'),
(7, 'global', 'all', 'prestasi', 1, 1, '2026-05-04 00:12:41'),
(140, 'global', 'all', 'prestasi', 1, 1, '2026-05-04 01:18:25'),
(141, 'global', 'all', 'organisasi', 1, 1, '2026-05-04 01:18:25'),
(142, 'global', 'all', 'event', 1, 1, '2026-05-04 01:18:25'),
(143, 'global', 'all', 'pelanggaran', 1, 1, '2026-05-04 01:18:25'),
(144, 'global', 'all', 'perilaku', 1, 1, '2026-05-04 01:18:25'),
(160, 'global', 'all', 'prestasi', 1, 1, '2026-05-04 01:23:22'),
(161, 'global', 'all', 'organisasi', 1, 1, '2026-05-04 01:23:22'),
(162, 'global', 'all', 'event', 1, 1, '2026-05-04 01:23:22'),
(163, 'global', 'all', 'pelanggaran', 1, 1, '2026-05-04 01:23:22'),
(164, 'global', 'all', 'perilaku', 1, 1, '2026-05-04 01:23:22'),
(180, 'global', 'all', 'prestasi', 1, 1, '2026-05-04 01:25:17'),
(181, 'global', 'all', 'organisasi', 1, 1, '2026-05-04 01:25:17'),
(182, 'global', 'all', 'event', 1, 1, '2026-05-04 01:25:17'),
(183, 'global', 'all', 'pelanggaran', 1, 1, '2026-05-04 01:25:17'),
(184, 'global', 'all', 'perilaku', 1, 1, '2026-05-04 01:25:17'),
(185, 'role', 'siswa', 'prestasi', 0, 1, '2026-05-04 01:44:00'),
(186, 'role', 'siswa', 'organisasi', 0, 1, '2026-05-04 01:44:01'),
(187, 'role', 'siswa', 'event', 0, 1, '2026-05-04 01:44:02'),
(188, 'role', 'siswa', 'prestasi', 0, 1, '2026-05-04 01:44:04'),
(189, 'role', 'siswa', 'organisasi', 0, 1, '2026-05-04 01:44:04'),
(190, 'role', 'siswa', 'event', 0, 1, '2026-05-04 01:44:04'),
(191, 'role', 'siswa', 'pelanggaran', 0, 1, '2026-05-04 01:44:04'),
(192, 'role', 'siswa', 'perilaku', 0, 1, '2026-05-04 01:44:04'),
(193, 'role', 'siswa', 'prestasi', 1, 1, '2026-05-04 01:44:06'),
(194, 'role', 'siswa', 'organisasi', 1, 1, '2026-05-04 01:44:06'),
(195, 'role', 'siswa', 'event', 1, 1, '2026-05-04 01:44:06'),
(196, 'role', 'siswa', 'pelanggaran', 1, 1, '2026-05-04 01:44:06'),
(197, 'role', 'siswa', 'perilaku', 1, 1, '2026-05-04 01:44:06'),
(198, 'role', 'siswa', 'prestasi', 1, 1, '2026-05-04 01:44:31'),
(199, 'role', 'siswa', 'organisasi', 1, 1, '2026-05-04 01:44:31'),
(200, 'role', 'siswa', 'event', 1, 1, '2026-05-04 01:44:31'),
(201, 'role', 'siswa', 'pelanggaran', 1, 1, '2026-05-04 01:44:31'),
(202, 'role', 'siswa', 'perilaku', 1, 1, '2026-05-04 01:44:31'),
(203, 'role', 'siswa', 'prestasi', 1, 1, '2026-05-04 02:00:06'),
(204, 'role', 'siswa', 'organisasi', 1, 1, '2026-05-04 02:00:06'),
(205, 'role', 'siswa', 'event', 1, 1, '2026-05-04 02:00:06'),
(206, 'role', 'siswa', 'pelanggaran', 1, 1, '2026-05-04 02:00:06'),
(207, 'role', 'siswa', 'perilaku', 1, 1, '2026-05-04 02:00:06'),
(208, 'role', 'siswa', 'prestasi', 0, 1, '2026-05-04 02:00:09'),
(209, 'role', 'siswa', 'organisasi', 0, 1, '2026-05-04 02:00:09'),
(210, 'role', 'siswa', 'event', 0, 1, '2026-05-04 02:00:09'),
(211, 'role', 'siswa', 'pelanggaran', 0, 1, '2026-05-04 02:00:09'),
(212, 'role', 'siswa', 'perilaku', 0, 1, '2026-05-04 02:00:09'),
(213, 'role', 'siswa', 'prestasi', 1, 1, '2026-05-04 02:00:38'),
(214, 'role', 'siswa', 'organisasi', 1, 1, '2026-05-04 02:00:38'),
(215, 'role', 'siswa', 'event', 1, 1, '2026-05-04 02:00:38'),
(216, 'role', 'siswa', 'pelanggaran', 1, 1, '2026-05-04 02:00:38'),
(217, 'role', 'siswa', 'perilaku', 1, 1, '2026-05-04 02:00:38'),
(218, 'global', 'all', 'prestasi', 1, 1, '2026-05-04 02:14:19'),
(219, 'global', 'all', 'organisasi', 1, 1, '2026-05-04 02:14:19'),
(220, 'global', 'all', 'event', 1, 1, '2026-05-04 02:14:19'),
(221, 'global', 'all', 'pelanggaran', 1, 1, '2026-05-04 02:14:19'),
(222, 'global', 'all', 'perilaku', 1, 1, '2026-05-04 02:14:19'),
(223, 'global', 'all', 'prestasi', 0, 1, '2026-05-04 02:14:49'),
(224, 'global', 'all', 'organisasi', 0, 1, '2026-05-04 02:14:49'),
(225, 'global', 'all', 'event', 0, 1, '2026-05-04 02:14:49'),
(226, 'global', 'all', 'pelanggaran', 0, 1, '2026-05-04 02:14:49'),
(227, 'global', 'all', 'perilaku', 0, 1, '2026-05-04 02:14:49');

-- --------------------------------------------------------

--
-- Table structure for table `input_access_logs`
--

CREATE TABLE `input_access_logs` (
  `id` int(11) NOT NULL,
  `control_type` enum('global','role','individual') NOT NULL,
  `target_role` enum('siswa','guru','all') DEFAULT NULL,
  `target_user_id` int(11) DEFAULT NULL,
  `jenis_input` varchar(50) NOT NULL,
  `action` enum('enabled','disabled') NOT NULL,
  `performed_by` int(11) NOT NULL,
  `performed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `input_access_logs`
--

INSERT INTO `input_access_logs` (`id`, `control_type`, `target_role`, `target_user_id`, `jenis_input`, `action`, `performed_by`, `performed_at`) VALUES
(1, 'global', 'all', NULL, 'prestasi', 'disabled', 1, '2026-05-04 00:12:28'),
(2, 'global', 'all', NULL, 'prestasi', 'enabled', 1, '2026-05-04 00:12:41'),
(3, 'role', 'siswa', NULL, 'prestasi', 'disabled', 1, '2026-05-04 00:12:48'),
(4, 'role', 'siswa', NULL, 'organisasi', 'disabled', 1, '2026-05-04 00:12:51'),
(5, 'role', 'siswa', NULL, 'event', 'disabled', 1, '2026-05-04 00:12:53'),
(6, 'role', 'siswa', NULL, 'prestasi', 'disabled', 1, '2026-05-04 00:13:55'),
(7, 'role', 'siswa', NULL, 'organisasi', 'disabled', 1, '2026-05-04 00:13:55'),
(8, 'role', 'siswa', NULL, 'event', 'disabled', 1, '2026-05-04 00:13:55'),
(9, 'role', 'siswa', NULL, 'pelanggaran', 'disabled', 1, '2026-05-04 00:13:55'),
(10, 'role', 'siswa', NULL, 'perilaku', 'disabled', 1, '2026-05-04 00:13:55'),
(11, 'role', 'siswa', NULL, 'prestasi', 'disabled', 1, '2026-05-04 00:13:59'),
(12, 'role', 'siswa', NULL, 'organisasi', 'disabled', 1, '2026-05-04 00:13:59'),
(13, 'role', 'siswa', NULL, 'event', 'disabled', 1, '2026-05-04 00:13:59'),
(14, 'role', 'siswa', NULL, 'pelanggaran', 'disabled', 1, '2026-05-04 00:13:59'),
(15, 'role', 'siswa', NULL, 'perilaku', 'disabled', 1, '2026-05-04 00:13:59'),
(16, 'role', 'siswa', NULL, 'prestasi', 'disabled', 1, '2026-05-04 00:14:03'),
(17, 'role', 'siswa', NULL, 'organisasi', 'disabled', 1, '2026-05-04 00:14:03'),
(18, 'role', 'siswa', NULL, 'event', 'disabled', 1, '2026-05-04 00:14:03'),
(19, 'role', 'siswa', NULL, 'pelanggaran', 'disabled', 1, '2026-05-04 00:14:03'),
(20, 'role', 'siswa', NULL, 'perilaku', 'disabled', 1, '2026-05-04 00:14:03'),
(21, 'role', 'siswa', NULL, 'prestasi', 'enabled', 1, '2026-05-04 00:14:07'),
(22, 'role', 'siswa', NULL, 'organisasi', 'enabled', 1, '2026-05-04 00:14:07'),
(23, 'role', 'siswa', NULL, 'event', 'enabled', 1, '2026-05-04 00:14:07'),
(24, 'role', 'siswa', NULL, 'pelanggaran', 'enabled', 1, '2026-05-04 00:14:07'),
(25, 'role', 'siswa', NULL, 'perilaku', 'enabled', 1, '2026-05-04 00:14:07'),
(26, 'role', 'siswa', NULL, 'prestasi', 'disabled', 1, '2026-05-04 00:14:09'),
(27, 'role', 'siswa', NULL, 'organisasi', 'disabled', 1, '2026-05-04 00:14:09'),
(28, 'role', 'siswa', NULL, 'event', 'disabled', 1, '2026-05-04 00:14:09'),
(29, 'role', 'siswa', NULL, 'pelanggaran', 'disabled', 1, '2026-05-04 00:14:09'),
(30, 'role', 'siswa', NULL, 'perilaku', 'disabled', 1, '2026-05-04 00:14:09'),
(31, 'role', 'siswa', NULL, 'prestasi', 'disabled', 1, '2026-05-04 00:27:03'),
(32, 'role', 'siswa', NULL, 'organisasi', 'disabled', 1, '2026-05-04 00:27:03'),
(33, 'role', 'siswa', NULL, 'event', 'disabled', 1, '2026-05-04 00:27:03'),
(34, 'role', 'siswa', NULL, 'pelanggaran', 'disabled', 1, '2026-05-04 00:27:03'),
(35, 'role', 'siswa', NULL, 'perilaku', 'disabled', 1, '2026-05-04 00:27:03'),
(36, 'role', 'siswa', NULL, 'prestasi', 'enabled', 1, '2026-05-04 00:31:16'),
(37, 'role', 'siswa', NULL, 'organisasi', 'enabled', 1, '2026-05-04 00:31:16'),
(38, 'role', 'siswa', NULL, 'event', 'enabled', 1, '2026-05-04 00:31:16'),
(39, 'role', 'siswa', NULL, 'pelanggaran', 'enabled', 1, '2026-05-04 00:31:16'),
(40, 'role', 'siswa', NULL, 'perilaku', 'enabled', 1, '2026-05-04 00:31:16'),
(41, 'role', 'siswa', NULL, 'prestasi', 'enabled', 1, '2026-05-04 00:31:52'),
(42, 'role', 'siswa', NULL, 'organisasi', 'enabled', 1, '2026-05-04 00:31:52'),
(43, 'role', 'siswa', NULL, 'event', 'enabled', 1, '2026-05-04 00:31:52'),
(44, 'role', 'siswa', NULL, 'pelanggaran', 'enabled', 1, '2026-05-04 00:31:52'),
(45, 'role', 'siswa', NULL, 'perilaku', 'enabled', 1, '2026-05-04 00:31:52'),
(46, 'role', 'siswa', NULL, 'prestasi', 'enabled', 1, '2026-05-04 00:33:33'),
(47, 'role', 'siswa', NULL, 'organisasi', 'enabled', 1, '2026-05-04 00:33:33'),
(48, 'role', 'siswa', NULL, 'event', 'enabled', 1, '2026-05-04 00:33:33'),
(49, 'role', 'siswa', NULL, 'pelanggaran', 'enabled', 1, '2026-05-04 00:33:33'),
(50, 'role', 'siswa', NULL, 'perilaku', 'enabled', 1, '2026-05-04 00:33:33'),
(51, 'role', 'siswa', NULL, 'prestasi', 'enabled', 1, '2026-05-04 00:33:34'),
(52, 'role', 'siswa', NULL, 'organisasi', 'enabled', 1, '2026-05-04 00:33:34'),
(53, 'role', 'siswa', NULL, 'event', 'enabled', 1, '2026-05-04 00:33:34'),
(54, 'role', 'siswa', NULL, 'pelanggaran', 'enabled', 1, '2026-05-04 00:33:34'),
(55, 'role', 'siswa', NULL, 'perilaku', 'enabled', 1, '2026-05-04 00:33:34'),
(56, 'role', 'siswa', NULL, 'prestasi', 'enabled', 1, '2026-05-04 00:48:06'),
(57, 'role', 'siswa', NULL, 'organisasi', 'enabled', 1, '2026-05-04 00:48:06'),
(58, 'role', 'siswa', NULL, 'event', 'enabled', 1, '2026-05-04 00:48:06'),
(59, 'role', 'siswa', NULL, 'pelanggaran', 'enabled', 1, '2026-05-04 00:48:06'),
(60, 'role', 'siswa', NULL, 'perilaku', 'enabled', 1, '2026-05-04 00:48:06'),
(61, 'role', 'siswa', NULL, 'prestasi', 'enabled', 1, '2026-05-04 00:53:25'),
(62, 'role', 'siswa', NULL, 'organisasi', 'enabled', 1, '2026-05-04 00:53:25'),
(63, 'role', 'siswa', NULL, 'event', 'enabled', 1, '2026-05-04 00:53:25'),
(64, 'role', 'siswa', NULL, 'pelanggaran', 'enabled', 1, '2026-05-04 00:53:25'),
(65, 'role', 'siswa', NULL, 'perilaku', 'enabled', 1, '2026-05-04 00:53:25'),
(66, 'role', 'siswa', NULL, 'prestasi', 'enabled', 1, '2026-05-04 00:53:26'),
(67, 'role', 'siswa', NULL, 'organisasi', 'enabled', 1, '2026-05-04 00:53:26'),
(68, 'role', 'siswa', NULL, 'event', 'enabled', 1, '2026-05-04 00:53:26'),
(69, 'role', 'siswa', NULL, 'pelanggaran', 'enabled', 1, '2026-05-04 00:53:26'),
(70, 'role', 'siswa', NULL, 'perilaku', 'enabled', 1, '2026-05-04 00:53:26'),
(71, 'role', 'siswa', NULL, 'prestasi', 'enabled', 1, '2026-05-04 00:53:27'),
(72, 'role', 'siswa', NULL, 'organisasi', 'enabled', 1, '2026-05-04 00:53:27'),
(73, 'role', 'siswa', NULL, 'event', 'enabled', 1, '2026-05-04 00:53:27'),
(74, 'role', 'siswa', NULL, 'pelanggaran', 'enabled', 1, '2026-05-04 00:53:27'),
(75, 'role', 'siswa', NULL, 'perilaku', 'enabled', 1, '2026-05-04 00:53:27'),
(76, 'role', 'siswa', NULL, 'prestasi', 'enabled', 1, '2026-05-04 00:53:27'),
(77, 'role', 'siswa', NULL, 'organisasi', 'enabled', 1, '2026-05-04 00:53:27'),
(78, 'role', 'siswa', NULL, 'event', 'enabled', 1, '2026-05-04 00:53:27'),
(79, 'role', 'siswa', NULL, 'pelanggaran', 'enabled', 1, '2026-05-04 00:53:27'),
(80, 'role', 'siswa', NULL, 'perilaku', 'enabled', 1, '2026-05-04 00:53:27'),
(81, 'role', 'siswa', NULL, 'prestasi', 'enabled', 1, '2026-05-04 00:53:27'),
(82, 'role', 'siswa', NULL, 'organisasi', 'enabled', 1, '2026-05-04 00:53:27'),
(83, 'role', 'siswa', NULL, 'event', 'enabled', 1, '2026-05-04 00:53:27'),
(84, 'role', 'siswa', NULL, 'pelanggaran', 'enabled', 1, '2026-05-04 00:53:27'),
(85, 'role', 'siswa', NULL, 'perilaku', 'enabled', 1, '2026-05-04 00:53:27'),
(86, 'role', 'siswa', NULL, 'prestasi', 'enabled', 1, '2026-05-04 00:53:27'),
(87, 'role', 'siswa', NULL, 'organisasi', 'enabled', 1, '2026-05-04 00:53:27'),
(88, 'role', 'siswa', NULL, 'event', 'enabled', 1, '2026-05-04 00:53:27'),
(89, 'role', 'siswa', NULL, 'pelanggaran', 'enabled', 1, '2026-05-04 00:53:27'),
(90, 'role', 'siswa', NULL, 'perilaku', 'enabled', 1, '2026-05-04 00:53:27'),
(91, 'role', 'siswa', NULL, 'prestasi', 'enabled', 1, '2026-05-04 00:53:27'),
(92, 'role', 'siswa', NULL, 'organisasi', 'enabled', 1, '2026-05-04 00:53:27'),
(93, 'role', 'siswa', NULL, 'event', 'enabled', 1, '2026-05-04 00:53:27'),
(94, 'role', 'siswa', NULL, 'pelanggaran', 'enabled', 1, '2026-05-04 00:53:27'),
(95, 'role', 'siswa', NULL, 'perilaku', 'enabled', 1, '2026-05-04 00:53:27'),
(96, 'role', 'siswa', NULL, 'prestasi', 'disabled', 1, '2026-05-04 00:53:29'),
(97, 'role', 'siswa', NULL, 'organisasi', 'disabled', 1, '2026-05-04 00:53:29'),
(98, 'role', 'siswa', NULL, 'event', 'disabled', 1, '2026-05-04 00:53:29'),
(99, 'role', 'siswa', NULL, 'pelanggaran', 'disabled', 1, '2026-05-04 00:53:29'),
(100, 'role', 'siswa', NULL, 'perilaku', 'disabled', 1, '2026-05-04 00:53:29'),
(101, 'role', 'siswa', NULL, 'prestasi', 'enabled', 1, '2026-05-04 00:53:30'),
(102, 'role', 'siswa', NULL, 'organisasi', 'enabled', 1, '2026-05-04 00:53:30'),
(103, 'role', 'siswa', NULL, 'event', 'enabled', 1, '2026-05-04 00:53:30'),
(104, 'role', 'siswa', NULL, 'pelanggaran', 'enabled', 1, '2026-05-04 00:53:30'),
(105, 'role', 'siswa', NULL, 'perilaku', 'enabled', 1, '2026-05-04 00:53:30'),
(106, 'role', 'siswa', NULL, 'prestasi', 'enabled', 1, '2026-05-04 01:00:50'),
(107, 'role', 'siswa', NULL, 'organisasi', 'enabled', 1, '2026-05-04 01:00:50'),
(108, 'role', 'siswa', NULL, 'event', 'enabled', 1, '2026-05-04 01:00:50'),
(109, 'role', 'siswa', NULL, 'pelanggaran', 'enabled', 1, '2026-05-04 01:00:50'),
(110, 'role', 'siswa', NULL, 'perilaku', 'enabled', 1, '2026-05-04 01:00:50'),
(111, 'role', 'siswa', NULL, 'prestasi', 'enabled', 1, '2026-05-04 01:00:53'),
(112, 'role', 'siswa', NULL, 'organisasi', 'enabled', 1, '2026-05-04 01:00:53'),
(113, 'role', 'siswa', NULL, 'event', 'enabled', 1, '2026-05-04 01:00:53'),
(114, 'role', 'siswa', NULL, 'pelanggaran', 'enabled', 1, '2026-05-04 01:00:53'),
(115, 'role', 'siswa', NULL, 'perilaku', 'enabled', 1, '2026-05-04 01:00:53'),
(116, 'role', 'siswa', NULL, 'pelanggaran', 'disabled', 1, '2026-05-04 01:00:54'),
(117, 'role', 'siswa', NULL, 'pelanggaran', 'enabled', 1, '2026-05-04 01:00:56'),
(118, 'role', 'siswa', NULL, 'prestasi', 'disabled', 1, '2026-05-04 01:00:57'),
(119, 'role', 'siswa', NULL, 'prestasi', 'enabled', 1, '2026-05-04 01:00:58'),
(120, 'role', 'siswa', NULL, 'prestasi', 'enabled', 1, '2026-05-04 01:01:04'),
(121, 'role', 'siswa', NULL, 'organisasi', 'enabled', 1, '2026-05-04 01:01:04'),
(122, 'role', 'siswa', NULL, 'event', 'enabled', 1, '2026-05-04 01:01:04'),
(123, 'role', 'siswa', NULL, 'pelanggaran', 'enabled', 1, '2026-05-04 01:01:04'),
(124, 'role', 'siswa', NULL, 'perilaku', 'enabled', 1, '2026-05-04 01:01:04'),
(125, 'role', 'siswa', NULL, 'prestasi', 'enabled', 1, '2026-05-04 01:02:11'),
(126, 'role', 'siswa', NULL, 'organisasi', 'enabled', 1, '2026-05-04 01:02:11'),
(127, 'role', 'siswa', NULL, 'event', 'enabled', 1, '2026-05-04 01:02:11'),
(128, 'role', 'siswa', NULL, 'pelanggaran', 'enabled', 1, '2026-05-04 01:02:11'),
(129, 'role', 'siswa', NULL, 'perilaku', 'enabled', 1, '2026-05-04 01:02:11'),
(130, 'role', 'siswa', NULL, 'prestasi', 'enabled', 1, '2026-05-04 01:11:06'),
(131, 'role', 'siswa', NULL, 'organisasi', 'enabled', 1, '2026-05-04 01:11:06'),
(132, 'role', 'siswa', NULL, 'event', 'enabled', 1, '2026-05-04 01:11:06'),
(133, 'role', 'siswa', NULL, 'pelanggaran', 'enabled', 1, '2026-05-04 01:11:06'),
(134, 'role', 'siswa', NULL, 'perilaku', 'enabled', 1, '2026-05-04 01:11:06'),
(135, 'global', 'all', NULL, 'all', 'enabled', 1, '2026-05-04 01:18:25'),
(136, 'role', 'siswa', NULL, 'prestasi', 'enabled', 1, '2026-05-04 01:19:01'),
(137, 'role', 'siswa', NULL, 'organisasi', 'enabled', 1, '2026-05-04 01:19:01'),
(138, 'role', 'siswa', NULL, 'event', 'enabled', 1, '2026-05-04 01:19:01'),
(139, 'role', 'siswa', NULL, 'pelanggaran', 'enabled', 1, '2026-05-04 01:19:01'),
(140, 'role', 'siswa', NULL, 'perilaku', 'enabled', 1, '2026-05-04 01:19:01'),
(141, 'role', 'siswa', NULL, 'prestasi', 'disabled', 1, '2026-05-04 01:19:06'),
(142, 'role', 'siswa', NULL, 'organisasi', 'disabled', 1, '2026-05-04 01:19:06'),
(143, 'role', 'siswa', NULL, 'event', 'disabled', 1, '2026-05-04 01:19:06'),
(144, 'role', 'siswa', NULL, 'pelanggaran', 'disabled', 1, '2026-05-04 01:19:06'),
(145, 'role', 'siswa', NULL, 'perilaku', 'disabled', 1, '2026-05-04 01:19:06'),
(146, 'role', 'siswa', NULL, 'prestasi', 'disabled', 1, '2026-05-04 01:22:44'),
(147, 'role', 'siswa', NULL, 'organisasi', 'disabled', 1, '2026-05-04 01:22:44'),
(148, 'role', 'siswa', NULL, 'event', 'disabled', 1, '2026-05-04 01:22:44'),
(149, 'role', 'siswa', NULL, 'pelanggaran', 'disabled', 1, '2026-05-04 01:22:44'),
(150, 'role', 'siswa', NULL, 'perilaku', 'disabled', 1, '2026-05-04 01:22:44'),
(151, 'global', 'all', NULL, 'all', 'enabled', 1, '2026-05-04 01:23:22'),
(152, 'role', 'siswa', NULL, 'prestasi', 'disabled', 1, '2026-05-04 01:23:31'),
(153, 'role', 'siswa', NULL, 'organisasi', 'disabled', 1, '2026-05-04 01:23:31'),
(154, 'role', 'siswa', NULL, 'event', 'disabled', 1, '2026-05-04 01:23:31'),
(155, 'role', 'siswa', NULL, 'pelanggaran', 'disabled', 1, '2026-05-04 01:23:31'),
(156, 'role', 'siswa', NULL, 'perilaku', 'disabled', 1, '2026-05-04 01:23:31'),
(157, 'role', 'siswa', NULL, 'prestasi', 'disabled', 1, '2026-05-04 01:23:35'),
(158, 'role', 'siswa', NULL, 'organisasi', 'disabled', 1, '2026-05-04 01:23:35'),
(159, 'role', 'siswa', NULL, 'event', 'disabled', 1, '2026-05-04 01:23:35'),
(160, 'role', 'siswa', NULL, 'pelanggaran', 'disabled', 1, '2026-05-04 01:23:35'),
(161, 'role', 'siswa', NULL, 'perilaku', 'disabled', 1, '2026-05-04 01:23:35'),
(162, 'role', 'siswa', NULL, 'prestasi', 'enabled', 1, '2026-05-04 01:24:45'),
(163, 'role', 'siswa', NULL, 'organisasi', 'enabled', 1, '2026-05-04 01:24:45'),
(164, 'role', 'siswa', NULL, 'event', 'enabled', 1, '2026-05-04 01:24:45'),
(165, 'role', 'siswa', NULL, 'pelanggaran', 'enabled', 1, '2026-05-04 01:24:45'),
(166, 'role', 'siswa', NULL, 'perilaku', 'enabled', 1, '2026-05-04 01:24:45'),
(167, 'global', 'all', NULL, 'all', 'enabled', 1, '2026-05-04 01:25:17'),
(168, 'individual', NULL, 5, 'prestasi', 'enabled', 1, '2026-05-04 01:43:51'),
(169, 'individual', NULL, 5, 'organisasi', 'disabled', 1, '2026-05-04 01:43:51'),
(170, 'individual', NULL, 5, 'event', 'disabled', 1, '2026-05-04 01:43:51'),
(171, 'individual', NULL, 5, 'pelanggaran', 'disabled', 1, '2026-05-04 01:43:51'),
(172, 'individual', NULL, 5, 'perilaku', 'disabled', 1, '2026-05-04 01:43:51'),
(173, 'individual', NULL, 5, 'prestasi', 'disabled', 1, '2026-05-04 01:43:53'),
(174, 'individual', NULL, 5, 'organisasi', 'disabled', 1, '2026-05-04 01:43:53'),
(175, 'individual', NULL, 5, 'event', 'disabled', 1, '2026-05-04 01:43:53'),
(176, 'individual', NULL, 5, 'pelanggaran', 'disabled', 1, '2026-05-04 01:43:53'),
(177, 'individual', NULL, 5, 'perilaku', 'disabled', 1, '2026-05-04 01:43:53'),
(178, 'role', 'siswa', NULL, 'prestasi', 'disabled', 1, '2026-05-04 01:44:00'),
(179, 'role', 'siswa', NULL, 'organisasi', 'disabled', 1, '2026-05-04 01:44:01'),
(180, 'role', 'siswa', NULL, 'event', 'disabled', 1, '2026-05-04 01:44:02'),
(181, 'role', 'siswa', NULL, 'prestasi', 'disabled', 1, '2026-05-04 01:44:04'),
(182, 'role', 'siswa', NULL, 'organisasi', 'disabled', 1, '2026-05-04 01:44:04'),
(183, 'role', 'siswa', NULL, 'event', 'disabled', 1, '2026-05-04 01:44:04'),
(184, 'role', 'siswa', NULL, 'pelanggaran', 'disabled', 1, '2026-05-04 01:44:04'),
(185, 'role', 'siswa', NULL, 'perilaku', 'disabled', 1, '2026-05-04 01:44:04'),
(186, 'role', 'siswa', NULL, 'prestasi', 'enabled', 1, '2026-05-04 01:44:06'),
(187, 'role', 'siswa', NULL, 'organisasi', 'enabled', 1, '2026-05-04 01:44:06'),
(188, 'role', 'siswa', NULL, 'event', 'enabled', 1, '2026-05-04 01:44:06'),
(189, 'role', 'siswa', NULL, 'pelanggaran', 'enabled', 1, '2026-05-04 01:44:06'),
(190, 'role', 'siswa', NULL, 'perilaku', 'enabled', 1, '2026-05-04 01:44:06'),
(191, 'role', 'siswa', NULL, 'prestasi', 'enabled', 1, '2026-05-04 01:44:31'),
(192, 'role', 'siswa', NULL, 'organisasi', 'enabled', 1, '2026-05-04 01:44:31'),
(193, 'role', 'siswa', NULL, 'event', 'enabled', 1, '2026-05-04 01:44:31'),
(194, 'role', 'siswa', NULL, 'pelanggaran', 'enabled', 1, '2026-05-04 01:44:31'),
(195, 'role', 'siswa', NULL, 'perilaku', 'enabled', 1, '2026-05-04 01:44:31'),
(196, 'individual', NULL, 14, 'prestasi', 'enabled', 1, '2026-05-04 01:45:12'),
(197, 'individual', NULL, 14, 'organisasi', 'disabled', 1, '2026-05-04 01:45:12'),
(198, 'individual', NULL, 14, 'event', 'disabled', 1, '2026-05-04 01:45:12'),
(199, 'individual', NULL, 14, 'pelanggaran', 'disabled', 1, '2026-05-04 01:45:12'),
(200, 'individual', NULL, 14, 'perilaku', 'disabled', 1, '2026-05-04 01:45:12'),
(201, 'individual', NULL, 14, 'prestasi', 'enabled', 1, '2026-05-04 01:45:13'),
(202, 'individual', NULL, 14, 'organisasi', 'enabled', 1, '2026-05-04 01:45:13'),
(203, 'individual', NULL, 14, 'event', 'disabled', 1, '2026-05-04 01:45:13'),
(204, 'individual', NULL, 14, 'pelanggaran', 'disabled', 1, '2026-05-04 01:45:13'),
(205, 'individual', NULL, 14, 'perilaku', 'disabled', 1, '2026-05-04 01:45:13'),
(206, 'individual', NULL, 14, 'prestasi', 'enabled', 1, '2026-05-04 01:45:14'),
(207, 'individual', NULL, 14, 'organisasi', 'enabled', 1, '2026-05-04 01:45:14'),
(208, 'individual', NULL, 14, 'event', 'enabled', 1, '2026-05-04 01:45:14'),
(209, 'individual', NULL, 14, 'pelanggaran', 'disabled', 1, '2026-05-04 01:45:14'),
(210, 'individual', NULL, 14, 'perilaku', 'disabled', 1, '2026-05-04 01:45:14'),
(211, 'individual', NULL, 14, 'prestasi', 'enabled', 1, '2026-05-04 01:45:17'),
(212, 'individual', NULL, 14, 'organisasi', 'disabled', 1, '2026-05-04 01:45:17'),
(213, 'individual', NULL, 14, 'event', 'enabled', 1, '2026-05-04 01:45:17'),
(214, 'individual', NULL, 14, 'pelanggaran', 'disabled', 1, '2026-05-04 01:45:17'),
(215, 'individual', NULL, 14, 'perilaku', 'disabled', 1, '2026-05-04 01:45:17'),
(216, 'individual', NULL, 14, 'prestasi', 'enabled', 1, '2026-05-04 01:45:18'),
(217, 'individual', NULL, 14, 'organisasi', 'enabled', 1, '2026-05-04 01:45:18'),
(218, 'individual', NULL, 14, 'event', 'enabled', 1, '2026-05-04 01:45:18'),
(219, 'individual', NULL, 14, 'pelanggaran', 'disabled', 1, '2026-05-04 01:45:18'),
(220, 'individual', NULL, 14, 'perilaku', 'disabled', 1, '2026-05-04 01:45:18'),
(221, 'individual', NULL, 14, 'prestasi', 'enabled', 1, '2026-05-04 01:45:21'),
(222, 'individual', NULL, 14, 'organisasi', 'enabled', 1, '2026-05-04 01:45:21'),
(223, 'individual', NULL, 14, 'event', 'disabled', 1, '2026-05-04 01:45:21'),
(224, 'individual', NULL, 14, 'pelanggaran', 'disabled', 1, '2026-05-04 01:45:21'),
(225, 'individual', NULL, 14, 'perilaku', 'disabled', 1, '2026-05-04 01:45:21'),
(226, 'individual', NULL, 14, 'prestasi', 'enabled', 1, '2026-05-04 01:45:22'),
(227, 'individual', NULL, 14, 'organisasi', 'enabled', 1, '2026-05-04 01:45:22'),
(228, 'individual', NULL, 14, 'event', 'enabled', 1, '2026-05-04 01:45:22'),
(229, 'individual', NULL, 14, 'pelanggaran', 'disabled', 1, '2026-05-04 01:45:22'),
(230, 'individual', NULL, 14, 'perilaku', 'disabled', 1, '2026-05-04 01:45:22'),
(231, 'role', 'siswa', NULL, 'prestasi', 'enabled', 1, '2026-05-04 02:00:06'),
(232, 'role', 'siswa', NULL, 'organisasi', 'enabled', 1, '2026-05-04 02:00:06'),
(233, 'role', 'siswa', NULL, 'event', 'enabled', 1, '2026-05-04 02:00:06'),
(234, 'role', 'siswa', NULL, 'pelanggaran', 'enabled', 1, '2026-05-04 02:00:06'),
(235, 'role', 'siswa', NULL, 'perilaku', 'enabled', 1, '2026-05-04 02:00:06'),
(236, 'role', 'siswa', NULL, 'prestasi', 'disabled', 1, '2026-05-04 02:00:09'),
(237, 'role', 'siswa', NULL, 'organisasi', 'disabled', 1, '2026-05-04 02:00:09'),
(238, 'role', 'siswa', NULL, 'event', 'disabled', 1, '2026-05-04 02:00:09'),
(239, 'role', 'siswa', NULL, 'pelanggaran', 'disabled', 1, '2026-05-04 02:00:09'),
(240, 'role', 'siswa', NULL, 'perilaku', 'disabled', 1, '2026-05-04 02:00:09'),
(241, 'role', 'siswa', NULL, 'prestasi', 'enabled', 1, '2026-05-04 02:00:38'),
(242, 'role', 'siswa', NULL, 'organisasi', 'enabled', 1, '2026-05-04 02:00:38'),
(243, 'role', 'siswa', NULL, 'event', 'enabled', 1, '2026-05-04 02:00:38'),
(244, 'role', 'siswa', NULL, 'pelanggaran', 'enabled', 1, '2026-05-04 02:00:38'),
(245, 'role', 'siswa', NULL, 'perilaku', 'enabled', 1, '2026-05-04 02:00:38'),
(246, 'individual', NULL, 14, 'prestasi', 'enabled', 1, '2026-05-04 02:03:13'),
(247, 'individual', NULL, 14, 'organisasi', 'disabled', 1, '2026-05-04 02:03:13'),
(248, 'individual', NULL, 14, 'event', 'disabled', 1, '2026-05-04 02:03:13'),
(249, 'individual', NULL, 14, 'pelanggaran', 'disabled', 1, '2026-05-04 02:03:13'),
(250, 'individual', NULL, 14, 'perilaku', 'disabled', 1, '2026-05-04 02:03:13'),
(251, 'individual', NULL, 14, 'prestasi', 'enabled', 1, '2026-05-04 02:03:14'),
(252, 'individual', NULL, 14, 'organisasi', 'enabled', 1, '2026-05-04 02:03:14'),
(253, 'individual', NULL, 14, 'event', 'disabled', 1, '2026-05-04 02:03:14'),
(254, 'individual', NULL, 14, 'pelanggaran', 'disabled', 1, '2026-05-04 02:03:14'),
(255, 'individual', NULL, 14, 'perilaku', 'disabled', 1, '2026-05-04 02:03:14'),
(256, 'individual', NULL, 14, 'prestasi', 'enabled', 1, '2026-05-04 02:03:15'),
(257, 'individual', NULL, 14, 'organisasi', 'enabled', 1, '2026-05-04 02:03:15'),
(258, 'individual', NULL, 14, 'event', 'enabled', 1, '2026-05-04 02:03:15'),
(259, 'individual', NULL, 14, 'pelanggaran', 'disabled', 1, '2026-05-04 02:03:15'),
(260, 'individual', NULL, 14, 'perilaku', 'disabled', 1, '2026-05-04 02:03:15'),
(261, 'individual', NULL, 14, 'prestasi', 'enabled', 1, '2026-05-04 02:03:57'),
(262, 'individual', NULL, 14, 'organisasi', 'disabled', 1, '2026-05-04 02:03:57'),
(263, 'individual', NULL, 14, 'event', 'enabled', 1, '2026-05-04 02:03:57'),
(264, 'individual', NULL, 14, 'pelanggaran', 'disabled', 1, '2026-05-04 02:03:57'),
(265, 'individual', NULL, 14, 'perilaku', 'disabled', 1, '2026-05-04 02:03:57'),
(266, 'individual', NULL, 14, 'prestasi', 'enabled', 1, '2026-05-04 02:03:58'),
(267, 'individual', NULL, 14, 'organisasi', 'disabled', 1, '2026-05-04 02:03:58'),
(268, 'individual', NULL, 14, 'event', 'disabled', 1, '2026-05-04 02:03:58'),
(269, 'individual', NULL, 14, 'pelanggaran', 'disabled', 1, '2026-05-04 02:03:58'),
(270, 'individual', NULL, 14, 'perilaku', 'disabled', 1, '2026-05-04 02:03:58'),
(271, 'individual', NULL, 14, 'prestasi', 'enabled', 1, '2026-05-04 02:04:33'),
(272, 'individual', NULL, 14, 'organisasi', 'disabled', 1, '2026-05-04 02:04:33'),
(273, 'individual', NULL, 14, 'event', 'enabled', 1, '2026-05-04 02:04:33'),
(274, 'individual', NULL, 14, 'pelanggaran', 'disabled', 1, '2026-05-04 02:04:33'),
(275, 'individual', NULL, 14, 'perilaku', 'disabled', 1, '2026-05-04 02:04:33'),
(276, 'individual', NULL, 14, 'prestasi', 'enabled', 1, '2026-05-04 02:04:34'),
(277, 'individual', NULL, 14, 'organisasi', 'enabled', 1, '2026-05-04 02:04:34'),
(278, 'individual', NULL, 14, 'event', 'enabled', 1, '2026-05-04 02:04:34'),
(279, 'individual', NULL, 14, 'pelanggaran', 'disabled', 1, '2026-05-04 02:04:34'),
(280, 'individual', NULL, 14, 'perilaku', 'disabled', 1, '2026-05-04 02:04:34'),
(281, 'individual', NULL, 14, 'prestasi', 'enabled', 1, '2026-05-04 02:13:43'),
(282, 'individual', NULL, 14, 'organisasi', 'disabled', 1, '2026-05-04 02:13:43'),
(283, 'individual', NULL, 14, 'event', 'enabled', 1, '2026-05-04 02:13:43'),
(284, 'individual', NULL, 14, 'pelanggaran', 'disabled', 1, '2026-05-04 02:13:43'),
(285, 'individual', NULL, 14, 'perilaku', 'disabled', 1, '2026-05-04 02:13:43'),
(286, 'individual', NULL, 14, 'prestasi', 'enabled', 1, '2026-05-04 02:13:43'),
(287, 'individual', NULL, 14, 'organisasi', 'disabled', 1, '2026-05-04 02:13:43'),
(288, 'individual', NULL, 14, 'event', 'disabled', 1, '2026-05-04 02:13:43'),
(289, 'individual', NULL, 14, 'pelanggaran', 'disabled', 1, '2026-05-04 02:13:43'),
(290, 'individual', NULL, 14, 'perilaku', 'disabled', 1, '2026-05-04 02:13:43'),
(291, 'individual', NULL, 14, 'prestasi', 'disabled', 1, '2026-05-04 02:13:46'),
(292, 'individual', NULL, 14, 'organisasi', 'disabled', 1, '2026-05-04 02:13:46'),
(293, 'individual', NULL, 14, 'event', 'disabled', 1, '2026-05-04 02:13:46'),
(294, 'individual', NULL, 14, 'pelanggaran', 'disabled', 1, '2026-05-04 02:13:46'),
(295, 'individual', NULL, 14, 'perilaku', 'disabled', 1, '2026-05-04 02:13:46'),
(296, 'individual', NULL, 14, 'prestasi', 'enabled', 1, '2026-05-04 02:13:50'),
(297, 'individual', NULL, 14, 'organisasi', 'disabled', 1, '2026-05-04 02:13:50'),
(298, 'individual', NULL, 14, 'event', 'disabled', 1, '2026-05-04 02:13:50'),
(299, 'individual', NULL, 14, 'pelanggaran', 'disabled', 1, '2026-05-04 02:13:50'),
(300, 'individual', NULL, 14, 'perilaku', 'disabled', 1, '2026-05-04 02:13:50'),
(301, 'individual', NULL, 7, 'prestasi', 'enabled', 1, '2026-05-04 02:13:51'),
(302, 'individual', NULL, 7, 'organisasi', 'disabled', 1, '2026-05-04 02:13:51'),
(303, 'individual', NULL, 7, 'event', 'disabled', 1, '2026-05-04 02:13:51'),
(304, 'individual', NULL, 7, 'pelanggaran', 'disabled', 1, '2026-05-04 02:13:51'),
(305, 'individual', NULL, 7, 'perilaku', 'disabled', 1, '2026-05-04 02:13:51'),
(306, 'individual', NULL, 7, 'prestasi', 'disabled', 1, '2026-05-04 02:13:53'),
(307, 'individual', NULL, 7, 'organisasi', 'disabled', 1, '2026-05-04 02:13:53'),
(308, 'individual', NULL, 7, 'event', 'disabled', 1, '2026-05-04 02:13:53'),
(309, 'individual', NULL, 7, 'pelanggaran', 'disabled', 1, '2026-05-04 02:13:53'),
(310, 'individual', NULL, 7, 'perilaku', 'disabled', 1, '2026-05-04 02:13:53'),
(311, 'individual', NULL, 14, 'prestasi', 'disabled', 1, '2026-05-04 02:13:53'),
(312, 'individual', NULL, 14, 'organisasi', 'disabled', 1, '2026-05-04 02:13:53'),
(313, 'individual', NULL, 14, 'event', 'disabled', 1, '2026-05-04 02:13:53'),
(314, 'individual', NULL, 14, 'pelanggaran', 'disabled', 1, '2026-05-04 02:13:53'),
(315, 'individual', NULL, 14, 'perilaku', 'disabled', 1, '2026-05-04 02:13:53'),
(316, 'global', 'all', NULL, 'prestasi', 'enabled', 1, '2026-05-04 02:14:19'),
(317, 'global', 'all', NULL, 'organisasi', 'enabled', 1, '2026-05-04 02:14:19'),
(318, 'global', 'all', NULL, 'event', 'enabled', 1, '2026-05-04 02:14:19'),
(319, 'global', 'all', NULL, 'pelanggaran', 'enabled', 1, '2026-05-04 02:14:19'),
(320, 'global', 'all', NULL, 'perilaku', 'enabled', 1, '2026-05-04 02:14:19'),
(321, 'global', 'all', NULL, 'prestasi', 'disabled', 1, '2026-05-04 02:14:49'),
(322, 'global', 'all', NULL, 'organisasi', 'disabled', 1, '2026-05-04 02:14:49'),
(323, 'global', 'all', NULL, 'event', 'disabled', 1, '2026-05-04 02:14:49'),
(324, 'global', 'all', NULL, 'pelanggaran', 'disabled', 1, '2026-05-04 02:14:49'),
(325, 'global', 'all', NULL, 'perilaku', 'disabled', 1, '2026-05-04 02:14:49'),
(326, 'individual', NULL, 11, 'prestasi', 'enabled', 1, '2026-05-04 02:26:13'),
(327, 'individual', NULL, 11, 'organisasi', 'enabled', 1, '2026-05-04 02:26:13'),
(328, 'individual', NULL, 11, 'event', 'enabled', 1, '2026-05-04 02:26:13'),
(329, 'individual', NULL, 11, 'pelanggaran', 'enabled', 1, '2026-05-04 02:26:13'),
(330, 'individual', NULL, 11, 'perilaku', 'enabled', 1, '2026-05-04 02:26:13'),
(331, 'individual', NULL, 3, 'prestasi', 'enabled', 1, '2026-05-04 02:26:13'),
(332, 'individual', NULL, 3, 'organisasi', 'enabled', 1, '2026-05-04 02:26:13'),
(333, 'individual', NULL, 3, 'event', 'enabled', 1, '2026-05-04 02:26:13'),
(334, 'individual', NULL, 3, 'pelanggaran', 'enabled', 1, '2026-05-04 02:26:13'),
(335, 'individual', NULL, 3, 'perilaku', 'enabled', 1, '2026-05-04 02:26:13'),
(336, 'individual', NULL, 7, 'prestasi', 'enabled', 1, '2026-05-04 02:26:13'),
(337, 'individual', NULL, 7, 'organisasi', 'enabled', 1, '2026-05-04 02:26:13'),
(338, 'individual', NULL, 7, 'event', 'enabled', 1, '2026-05-04 02:26:13'),
(339, 'individual', NULL, 7, 'pelanggaran', 'enabled', 1, '2026-05-04 02:26:13'),
(340, 'individual', NULL, 7, 'perilaku', 'enabled', 1, '2026-05-04 02:26:13'),
(341, 'individual', NULL, 14, 'prestasi', 'enabled', 1, '2026-05-04 02:26:13'),
(342, 'individual', NULL, 14, 'organisasi', 'enabled', 1, '2026-05-04 02:26:13'),
(343, 'individual', NULL, 14, 'event', 'enabled', 1, '2026-05-04 02:26:13'),
(344, 'individual', NULL, 14, 'pelanggaran', 'enabled', 1, '2026-05-04 02:26:13'),
(345, 'individual', NULL, 14, 'perilaku', 'enabled', 1, '2026-05-04 02:26:13'),
(346, 'individual', NULL, 10, 'prestasi', 'enabled', 1, '2026-05-04 02:26:13'),
(347, 'individual', NULL, 10, 'organisasi', 'enabled', 1, '2026-05-04 02:26:13'),
(348, 'individual', NULL, 10, 'event', 'enabled', 1, '2026-05-04 02:26:13'),
(349, 'individual', NULL, 10, 'pelanggaran', 'enabled', 1, '2026-05-04 02:26:13'),
(350, 'individual', NULL, 10, 'perilaku', 'enabled', 1, '2026-05-04 02:26:13'),
(351, 'individual', NULL, 6, 'prestasi', 'enabled', 1, '2026-05-04 02:26:13'),
(352, 'individual', NULL, 6, 'organisasi', 'enabled', 1, '2026-05-04 02:26:13'),
(353, 'individual', NULL, 6, 'event', 'enabled', 1, '2026-05-04 02:26:13'),
(354, 'individual', NULL, 6, 'pelanggaran', 'enabled', 1, '2026-05-04 02:26:13'),
(355, 'individual', NULL, 6, 'perilaku', 'enabled', 1, '2026-05-04 02:26:13'),
(356, 'individual', NULL, 8, 'prestasi', 'enabled', 1, '2026-05-04 02:26:13'),
(357, 'individual', NULL, 8, 'organisasi', 'enabled', 1, '2026-05-04 02:26:13'),
(358, 'individual', NULL, 8, 'event', 'enabled', 1, '2026-05-04 02:26:13'),
(359, 'individual', NULL, 8, 'pelanggaran', 'enabled', 1, '2026-05-04 02:26:13'),
(360, 'individual', NULL, 8, 'perilaku', 'enabled', 1, '2026-05-04 02:26:13'),
(361, 'individual', NULL, 12, 'prestasi', 'enabled', 1, '2026-05-04 02:26:13'),
(362, 'individual', NULL, 12, 'organisasi', 'enabled', 1, '2026-05-04 02:26:13'),
(363, 'individual', NULL, 12, 'event', 'enabled', 1, '2026-05-04 02:26:13'),
(364, 'individual', NULL, 12, 'pelanggaran', 'enabled', 1, '2026-05-04 02:26:13'),
(365, 'individual', NULL, 12, 'perilaku', 'enabled', 1, '2026-05-04 02:26:13'),
(366, 'individual', NULL, 13, 'prestasi', 'enabled', 1, '2026-05-04 02:26:13'),
(367, 'individual', NULL, 13, 'organisasi', 'enabled', 1, '2026-05-04 02:26:13'),
(368, 'individual', NULL, 13, 'event', 'enabled', 1, '2026-05-04 02:26:13'),
(369, 'individual', NULL, 13, 'pelanggaran', 'enabled', 1, '2026-05-04 02:26:13'),
(370, 'individual', NULL, 13, 'perilaku', 'enabled', 1, '2026-05-04 02:26:13'),
(371, 'individual', NULL, 11, 'prestasi', 'disabled', 1, '2026-05-04 02:26:17'),
(372, 'individual', NULL, 11, 'organisasi', 'disabled', 1, '2026-05-04 02:26:17'),
(373, 'individual', NULL, 11, 'event', 'disabled', 1, '2026-05-04 02:26:17'),
(374, 'individual', NULL, 11, 'pelanggaran', 'disabled', 1, '2026-05-04 02:26:17'),
(375, 'individual', NULL, 11, 'perilaku', 'disabled', 1, '2026-05-04 02:26:17'),
(376, 'individual', NULL, 3, 'prestasi', 'disabled', 1, '2026-05-04 02:26:17'),
(377, 'individual', NULL, 3, 'organisasi', 'disabled', 1, '2026-05-04 02:26:17'),
(378, 'individual', NULL, 3, 'event', 'disabled', 1, '2026-05-04 02:26:17'),
(379, 'individual', NULL, 3, 'pelanggaran', 'disabled', 1, '2026-05-04 02:26:17'),
(380, 'individual', NULL, 3, 'perilaku', 'disabled', 1, '2026-05-04 02:26:17'),
(381, 'individual', NULL, 7, 'prestasi', 'disabled', 1, '2026-05-04 02:26:17'),
(382, 'individual', NULL, 7, 'organisasi', 'disabled', 1, '2026-05-04 02:26:17'),
(383, 'individual', NULL, 7, 'event', 'disabled', 1, '2026-05-04 02:26:17'),
(384, 'individual', NULL, 7, 'pelanggaran', 'disabled', 1, '2026-05-04 02:26:17'),
(385, 'individual', NULL, 7, 'perilaku', 'disabled', 1, '2026-05-04 02:26:17'),
(386, 'individual', NULL, 10, 'prestasi', 'disabled', 1, '2026-05-04 02:26:17'),
(387, 'individual', NULL, 10, 'organisasi', 'disabled', 1, '2026-05-04 02:26:17'),
(388, 'individual', NULL, 10, 'event', 'disabled', 1, '2026-05-04 02:26:17'),
(389, 'individual', NULL, 10, 'pelanggaran', 'disabled', 1, '2026-05-04 02:26:17'),
(390, 'individual', NULL, 10, 'perilaku', 'disabled', 1, '2026-05-04 02:26:17'),
(391, 'individual', NULL, 14, 'prestasi', 'disabled', 1, '2026-05-04 02:26:17'),
(392, 'individual', NULL, 14, 'organisasi', 'disabled', 1, '2026-05-04 02:26:17'),
(393, 'individual', NULL, 14, 'event', 'disabled', 1, '2026-05-04 02:26:17'),
(394, 'individual', NULL, 14, 'pelanggaran', 'disabled', 1, '2026-05-04 02:26:17'),
(395, 'individual', NULL, 14, 'perilaku', 'disabled', 1, '2026-05-04 02:26:17'),
(396, 'individual', NULL, 6, 'prestasi', 'disabled', 1, '2026-05-04 02:26:17'),
(397, 'individual', NULL, 6, 'organisasi', 'disabled', 1, '2026-05-04 02:26:17'),
(398, 'individual', NULL, 6, 'event', 'disabled', 1, '2026-05-04 02:26:17'),
(399, 'individual', NULL, 6, 'pelanggaran', 'disabled', 1, '2026-05-04 02:26:17'),
(400, 'individual', NULL, 6, 'perilaku', 'disabled', 1, '2026-05-04 02:26:17'),
(401, 'individual', NULL, 8, 'prestasi', 'disabled', 1, '2026-05-04 02:26:17'),
(402, 'individual', NULL, 8, 'organisasi', 'disabled', 1, '2026-05-04 02:26:17'),
(403, 'individual', NULL, 8, 'event', 'disabled', 1, '2026-05-04 02:26:17'),
(404, 'individual', NULL, 8, 'pelanggaran', 'disabled', 1, '2026-05-04 02:26:17'),
(405, 'individual', NULL, 8, 'perilaku', 'disabled', 1, '2026-05-04 02:26:17'),
(406, 'individual', NULL, 12, 'prestasi', 'disabled', 1, '2026-05-04 02:26:17'),
(407, 'individual', NULL, 12, 'organisasi', 'disabled', 1, '2026-05-04 02:26:17'),
(408, 'individual', NULL, 12, 'event', 'disabled', 1, '2026-05-04 02:26:17'),
(409, 'individual', NULL, 12, 'pelanggaran', 'disabled', 1, '2026-05-04 02:26:17'),
(410, 'individual', NULL, 12, 'perilaku', 'disabled', 1, '2026-05-04 02:26:17'),
(411, 'individual', NULL, 13, 'prestasi', 'disabled', 1, '2026-05-04 02:26:17'),
(412, 'individual', NULL, 13, 'organisasi', 'disabled', 1, '2026-05-04 02:26:17'),
(413, 'individual', NULL, 13, 'event', 'disabled', 1, '2026-05-04 02:26:17'),
(414, 'individual', NULL, 13, 'pelanggaran', 'disabled', 1, '2026-05-04 02:26:17'),
(415, 'individual', NULL, 13, 'perilaku', 'disabled', 1, '2026-05-04 02:26:17'),
(416, 'individual', NULL, 11, 'prestasi', 'enabled', 1, '2026-05-04 02:26:24'),
(417, 'individual', NULL, 11, 'organisasi', 'enabled', 1, '2026-05-04 02:26:24'),
(418, 'individual', NULL, 11, 'event', 'enabled', 1, '2026-05-04 02:26:24'),
(419, 'individual', NULL, 11, 'pelanggaran', 'enabled', 1, '2026-05-04 02:26:24'),
(420, 'individual', NULL, 11, 'perilaku', 'enabled', 1, '2026-05-04 02:26:24'),
(421, 'individual', NULL, 3, 'prestasi', 'enabled', 1, '2026-05-04 02:26:24'),
(422, 'individual', NULL, 3, 'organisasi', 'enabled', 1, '2026-05-04 02:26:24'),
(423, 'individual', NULL, 3, 'event', 'enabled', 1, '2026-05-04 02:26:24'),
(424, 'individual', NULL, 3, 'pelanggaran', 'enabled', 1, '2026-05-04 02:26:24'),
(425, 'individual', NULL, 3, 'perilaku', 'enabled', 1, '2026-05-04 02:26:24'),
(426, 'individual', NULL, 7, 'prestasi', 'enabled', 1, '2026-05-04 02:26:25'),
(427, 'individual', NULL, 7, 'organisasi', 'enabled', 1, '2026-05-04 02:26:25'),
(428, 'individual', NULL, 7, 'event', 'enabled', 1, '2026-05-04 02:26:25'),
(429, 'individual', NULL, 7, 'pelanggaran', 'enabled', 1, '2026-05-04 02:26:25'),
(430, 'individual', NULL, 7, 'perilaku', 'enabled', 1, '2026-05-04 02:26:25'),
(431, 'individual', NULL, 10, 'prestasi', 'enabled', 1, '2026-05-04 02:26:25'),
(432, 'individual', NULL, 10, 'organisasi', 'enabled', 1, '2026-05-04 02:26:25'),
(433, 'individual', NULL, 10, 'event', 'enabled', 1, '2026-05-04 02:26:25'),
(434, 'individual', NULL, 10, 'pelanggaran', 'enabled', 1, '2026-05-04 02:26:25'),
(435, 'individual', NULL, 10, 'perilaku', 'enabled', 1, '2026-05-04 02:26:25'),
(436, 'individual', NULL, 14, 'prestasi', 'enabled', 1, '2026-05-04 02:26:25'),
(437, 'individual', NULL, 14, 'organisasi', 'enabled', 1, '2026-05-04 02:26:25'),
(438, 'individual', NULL, 14, 'event', 'enabled', 1, '2026-05-04 02:26:25'),
(439, 'individual', NULL, 14, 'pelanggaran', 'enabled', 1, '2026-05-04 02:26:25'),
(440, 'individual', NULL, 14, 'perilaku', 'enabled', 1, '2026-05-04 02:26:25'),
(441, 'individual', NULL, 6, 'prestasi', 'enabled', 1, '2026-05-04 02:26:25'),
(442, 'individual', NULL, 6, 'organisasi', 'enabled', 1, '2026-05-04 02:26:25'),
(443, 'individual', NULL, 6, 'event', 'enabled', 1, '2026-05-04 02:26:25'),
(444, 'individual', NULL, 6, 'pelanggaran', 'enabled', 1, '2026-05-04 02:26:25'),
(445, 'individual', NULL, 6, 'perilaku', 'enabled', 1, '2026-05-04 02:26:25'),
(446, 'individual', NULL, 8, 'prestasi', 'enabled', 1, '2026-05-04 02:26:25'),
(447, 'individual', NULL, 8, 'organisasi', 'enabled', 1, '2026-05-04 02:26:25'),
(448, 'individual', NULL, 8, 'event', 'enabled', 1, '2026-05-04 02:26:25'),
(449, 'individual', NULL, 8, 'pelanggaran', 'enabled', 1, '2026-05-04 02:26:25'),
(450, 'individual', NULL, 8, 'perilaku', 'enabled', 1, '2026-05-04 02:26:25'),
(451, 'individual', NULL, 12, 'prestasi', 'enabled', 1, '2026-05-04 02:26:25'),
(452, 'individual', NULL, 12, 'organisasi', 'enabled', 1, '2026-05-04 02:26:25'),
(453, 'individual', NULL, 12, 'event', 'enabled', 1, '2026-05-04 02:26:25'),
(454, 'individual', NULL, 12, 'pelanggaran', 'enabled', 1, '2026-05-04 02:26:25'),
(455, 'individual', NULL, 12, 'perilaku', 'enabled', 1, '2026-05-04 02:26:25'),
(456, 'individual', NULL, 13, 'prestasi', 'enabled', 1, '2026-05-04 02:26:25'),
(457, 'individual', NULL, 13, 'organisasi', 'enabled', 1, '2026-05-04 02:26:25'),
(458, 'individual', NULL, 13, 'event', 'enabled', 1, '2026-05-04 02:26:25'),
(459, 'individual', NULL, 13, 'pelanggaran', 'enabled', 1, '2026-05-04 02:26:25'),
(460, 'individual', NULL, 13, 'perilaku', 'enabled', 1, '2026-05-04 02:26:25'),
(461, 'individual', NULL, 11, 'prestasi', 'disabled', 1, '2026-05-04 02:26:53'),
(462, 'individual', NULL, 11, 'organisasi', 'disabled', 1, '2026-05-04 02:26:53'),
(463, 'individual', NULL, 11, 'event', 'disabled', 1, '2026-05-04 02:26:53'),
(464, 'individual', NULL, 11, 'pelanggaran', 'disabled', 1, '2026-05-04 02:26:53'),
(465, 'individual', NULL, 11, 'perilaku', 'disabled', 1, '2026-05-04 02:26:53'),
(466, 'individual', NULL, 3, 'prestasi', 'disabled', 1, '2026-05-04 02:26:53'),
(467, 'individual', NULL, 3, 'organisasi', 'disabled', 1, '2026-05-04 02:26:53'),
(468, 'individual', NULL, 3, 'event', 'disabled', 1, '2026-05-04 02:26:53'),
(469, 'individual', NULL, 3, 'pelanggaran', 'disabled', 1, '2026-05-04 02:26:53'),
(470, 'individual', NULL, 3, 'perilaku', 'disabled', 1, '2026-05-04 02:26:53'),
(471, 'individual', NULL, 7, 'prestasi', 'disabled', 1, '2026-05-04 02:26:53'),
(472, 'individual', NULL, 7, 'organisasi', 'disabled', 1, '2026-05-04 02:26:53'),
(473, 'individual', NULL, 7, 'event', 'disabled', 1, '2026-05-04 02:26:53'),
(474, 'individual', NULL, 7, 'pelanggaran', 'disabled', 1, '2026-05-04 02:26:53'),
(475, 'individual', NULL, 7, 'perilaku', 'disabled', 1, '2026-05-04 02:26:53'),
(476, 'individual', NULL, 10, 'prestasi', 'disabled', 1, '2026-05-04 02:26:53'),
(477, 'individual', NULL, 10, 'organisasi', 'disabled', 1, '2026-05-04 02:26:53'),
(478, 'individual', NULL, 10, 'event', 'disabled', 1, '2026-05-04 02:26:53'),
(479, 'individual', NULL, 10, 'pelanggaran', 'disabled', 1, '2026-05-04 02:26:53'),
(480, 'individual', NULL, 10, 'perilaku', 'disabled', 1, '2026-05-04 02:26:53'),
(481, 'individual', NULL, 14, 'prestasi', 'disabled', 1, '2026-05-04 02:26:53'),
(482, 'individual', NULL, 14, 'organisasi', 'disabled', 1, '2026-05-04 02:26:53'),
(483, 'individual', NULL, 14, 'event', 'disabled', 1, '2026-05-04 02:26:53'),
(484, 'individual', NULL, 14, 'pelanggaran', 'disabled', 1, '2026-05-04 02:26:53'),
(485, 'individual', NULL, 14, 'perilaku', 'disabled', 1, '2026-05-04 02:26:53'),
(486, 'individual', NULL, 6, 'prestasi', 'disabled', 1, '2026-05-04 02:26:53'),
(487, 'individual', NULL, 6, 'organisasi', 'disabled', 1, '2026-05-04 02:26:53'),
(488, 'individual', NULL, 6, 'event', 'disabled', 1, '2026-05-04 02:26:53'),
(489, 'individual', NULL, 6, 'pelanggaran', 'disabled', 1, '2026-05-04 02:26:53'),
(490, 'individual', NULL, 6, 'perilaku', 'disabled', 1, '2026-05-04 02:26:53'),
(491, 'individual', NULL, 8, 'prestasi', 'disabled', 1, '2026-05-04 02:26:53'),
(492, 'individual', NULL, 8, 'organisasi', 'disabled', 1, '2026-05-04 02:26:53'),
(493, 'individual', NULL, 8, 'event', 'disabled', 1, '2026-05-04 02:26:53'),
(494, 'individual', NULL, 8, 'pelanggaran', 'disabled', 1, '2026-05-04 02:26:53'),
(495, 'individual', NULL, 8, 'perilaku', 'disabled', 1, '2026-05-04 02:26:53'),
(496, 'individual', NULL, 12, 'prestasi', 'disabled', 1, '2026-05-04 02:26:53'),
(497, 'individual', NULL, 12, 'organisasi', 'disabled', 1, '2026-05-04 02:26:53'),
(498, 'individual', NULL, 12, 'event', 'disabled', 1, '2026-05-04 02:26:53'),
(499, 'individual', NULL, 12, 'pelanggaran', 'disabled', 1, '2026-05-04 02:26:53'),
(500, 'individual', NULL, 12, 'perilaku', 'disabled', 1, '2026-05-04 02:26:53'),
(501, 'individual', NULL, 13, 'prestasi', 'disabled', 1, '2026-05-04 02:26:53'),
(502, 'individual', NULL, 13, 'organisasi', 'disabled', 1, '2026-05-04 02:26:53'),
(503, 'individual', NULL, 13, 'event', 'disabled', 1, '2026-05-04 02:26:53'),
(504, 'individual', NULL, 13, 'pelanggaran', 'disabled', 1, '2026-05-04 02:26:53'),
(505, 'individual', NULL, 13, 'perilaku', 'disabled', 1, '2026-05-04 02:26:53'),
(506, 'individual', NULL, 5, 'prestasi', 'enabled', 1, '2026-05-04 02:32:06'),
(507, 'individual', NULL, 5, 'organisasi', 'enabled', 1, '2026-05-04 02:32:06'),
(508, 'individual', NULL, 5, 'event', 'enabled', 1, '2026-05-04 02:32:06'),
(509, 'individual', NULL, 5, 'pelanggaran', 'enabled', 1, '2026-05-04 02:32:06'),
(510, 'individual', NULL, 5, 'perilaku', 'enabled', 1, '2026-05-04 02:32:06'),
(511, 'individual', NULL, 9, 'prestasi', 'enabled', 1, '2026-05-04 02:32:06'),
(512, 'individual', NULL, 9, 'organisasi', 'enabled', 1, '2026-05-04 02:32:06'),
(513, 'individual', NULL, 9, 'event', 'enabled', 1, '2026-05-04 02:32:06'),
(514, 'individual', NULL, 9, 'pelanggaran', 'enabled', 1, '2026-05-04 02:32:06'),
(515, 'individual', NULL, 9, 'perilaku', 'enabled', 1, '2026-05-04 02:32:06'),
(516, 'individual', NULL, 5, 'prestasi', 'disabled', 1, '2026-05-04 02:32:52'),
(517, 'individual', NULL, 5, 'organisasi', 'disabled', 1, '2026-05-04 02:32:52'),
(518, 'individual', NULL, 5, 'event', 'disabled', 1, '2026-05-04 02:32:52'),
(519, 'individual', NULL, 5, 'pelanggaran', 'disabled', 1, '2026-05-04 02:32:52'),
(520, 'individual', NULL, 5, 'perilaku', 'disabled', 1, '2026-05-04 02:32:52'),
(521, 'individual', NULL, 9, 'prestasi', 'disabled', 1, '2026-05-04 02:32:52'),
(522, 'individual', NULL, 9, 'organisasi', 'disabled', 1, '2026-05-04 02:32:52'),
(523, 'individual', NULL, 9, 'event', 'disabled', 1, '2026-05-04 02:32:52'),
(524, 'individual', NULL, 9, 'pelanggaran', 'disabled', 1, '2026-05-04 02:32:52'),
(525, 'individual', NULL, 9, 'perilaku', 'disabled', 1, '2026-05-04 02:32:52'),
(526, 'individual', NULL, 5, 'prestasi', 'disabled', 1, '2026-05-04 02:33:24'),
(527, 'individual', NULL, 5, 'organisasi', 'disabled', 1, '2026-05-04 02:33:24'),
(528, 'individual', NULL, 5, 'event', 'disabled', 1, '2026-05-04 02:33:24'),
(529, 'individual', NULL, 5, 'pelanggaran', 'disabled', 1, '2026-05-04 02:33:24'),
(530, 'individual', NULL, 5, 'perilaku', 'disabled', 1, '2026-05-04 02:33:24'),
(531, 'individual', NULL, 9, 'prestasi', 'disabled', 1, '2026-05-04 02:33:24'),
(532, 'individual', NULL, 9, 'organisasi', 'disabled', 1, '2026-05-04 02:33:24'),
(533, 'individual', NULL, 9, 'event', 'disabled', 1, '2026-05-04 02:33:24'),
(534, 'individual', NULL, 9, 'pelanggaran', 'disabled', 1, '2026-05-04 02:33:24'),
(535, 'individual', NULL, 9, 'perilaku', 'disabled', 1, '2026-05-04 02:33:24'),
(536, 'individual', NULL, 5, 'prestasi', 'enabled', 1, '2026-05-04 02:33:27'),
(537, 'individual', NULL, 5, 'organisasi', 'enabled', 1, '2026-05-04 02:33:27'),
(538, 'individual', NULL, 5, 'event', 'enabled', 1, '2026-05-04 02:33:27'),
(539, 'individual', NULL, 5, 'pelanggaran', 'enabled', 1, '2026-05-04 02:33:27'),
(540, 'individual', NULL, 5, 'perilaku', 'enabled', 1, '2026-05-04 02:33:27'),
(541, 'individual', NULL, 9, 'prestasi', 'enabled', 1, '2026-05-04 02:33:28'),
(542, 'individual', NULL, 9, 'organisasi', 'enabled', 1, '2026-05-04 02:33:28'),
(543, 'individual', NULL, 9, 'event', 'enabled', 1, '2026-05-04 02:33:28'),
(544, 'individual', NULL, 9, 'pelanggaran', 'enabled', 1, '2026-05-04 02:33:28'),
(545, 'individual', NULL, 9, 'perilaku', 'enabled', 1, '2026-05-04 02:33:28'),
(546, 'individual', NULL, 11, 'prestasi', 'disabled', 1, '2026-05-04 02:41:21'),
(547, 'individual', NULL, 11, 'organisasi', 'disabled', 1, '2026-05-04 02:41:21'),
(548, 'individual', NULL, 11, 'event', 'disabled', 1, '2026-05-04 02:41:21'),
(549, 'individual', NULL, 11, 'pelanggaran', 'disabled', 1, '2026-05-04 02:41:21'),
(550, 'individual', NULL, 11, 'perilaku', 'disabled', 1, '2026-05-04 02:41:21'),
(551, 'individual', NULL, 3, 'prestasi', 'disabled', 1, '2026-05-04 02:41:21'),
(552, 'individual', NULL, 3, 'organisasi', 'disabled', 1, '2026-05-04 02:41:21'),
(553, 'individual', NULL, 3, 'event', 'disabled', 1, '2026-05-04 02:41:21'),
(554, 'individual', NULL, 3, 'pelanggaran', 'disabled', 1, '2026-05-04 02:41:21'),
(555, 'individual', NULL, 3, 'perilaku', 'disabled', 1, '2026-05-04 02:41:21'),
(556, 'individual', NULL, 7, 'prestasi', 'disabled', 1, '2026-05-04 02:41:21'),
(557, 'individual', NULL, 7, 'organisasi', 'disabled', 1, '2026-05-04 02:41:21'),
(558, 'individual', NULL, 7, 'event', 'disabled', 1, '2026-05-04 02:41:21'),
(559, 'individual', NULL, 7, 'pelanggaran', 'disabled', 1, '2026-05-04 02:41:21'),
(560, 'individual', NULL, 7, 'perilaku', 'disabled', 1, '2026-05-04 02:41:21'),
(561, 'individual', NULL, 10, 'prestasi', 'disabled', 1, '2026-05-04 02:41:21'),
(562, 'individual', NULL, 10, 'organisasi', 'disabled', 1, '2026-05-04 02:41:21'),
(563, 'individual', NULL, 10, 'event', 'disabled', 1, '2026-05-04 02:41:21'),
(564, 'individual', NULL, 10, 'pelanggaran', 'disabled', 1, '2026-05-04 02:41:21'),
(565, 'individual', NULL, 10, 'perilaku', 'disabled', 1, '2026-05-04 02:41:21'),
(566, 'individual', NULL, 14, 'prestasi', 'disabled', 1, '2026-05-04 02:41:21'),
(567, 'individual', NULL, 14, 'organisasi', 'disabled', 1, '2026-05-04 02:41:21'),
(568, 'individual', NULL, 14, 'event', 'disabled', 1, '2026-05-04 02:41:21'),
(569, 'individual', NULL, 14, 'pelanggaran', 'disabled', 1, '2026-05-04 02:41:21'),
(570, 'individual', NULL, 14, 'perilaku', 'disabled', 1, '2026-05-04 02:41:21'),
(571, 'individual', NULL, 6, 'prestasi', 'disabled', 1, '2026-05-04 02:41:21'),
(572, 'individual', NULL, 6, 'organisasi', 'disabled', 1, '2026-05-04 02:41:21'),
(573, 'individual', NULL, 6, 'event', 'disabled', 1, '2026-05-04 02:41:21'),
(574, 'individual', NULL, 6, 'pelanggaran', 'disabled', 1, '2026-05-04 02:41:21'),
(575, 'individual', NULL, 6, 'perilaku', 'disabled', 1, '2026-05-04 02:41:21'),
(576, 'individual', NULL, 8, 'prestasi', 'disabled', 1, '2026-05-04 02:41:21'),
(577, 'individual', NULL, 8, 'organisasi', 'disabled', 1, '2026-05-04 02:41:21'),
(578, 'individual', NULL, 8, 'event', 'disabled', 1, '2026-05-04 02:41:21'),
(579, 'individual', NULL, 8, 'pelanggaran', 'disabled', 1, '2026-05-04 02:41:21'),
(580, 'individual', NULL, 8, 'perilaku', 'disabled', 1, '2026-05-04 02:41:21'),
(581, 'individual', NULL, 12, 'prestasi', 'disabled', 1, '2026-05-04 02:41:21'),
(582, 'individual', NULL, 12, 'organisasi', 'disabled', 1, '2026-05-04 02:41:21'),
(583, 'individual', NULL, 12, 'event', 'disabled', 1, '2026-05-04 02:41:21'),
(584, 'individual', NULL, 12, 'pelanggaran', 'disabled', 1, '2026-05-04 02:41:21'),
(585, 'individual', NULL, 12, 'perilaku', 'disabled', 1, '2026-05-04 02:41:21'),
(586, 'individual', NULL, 13, 'prestasi', 'disabled', 1, '2026-05-04 02:41:21'),
(587, 'individual', NULL, 13, 'organisasi', 'disabled', 1, '2026-05-04 02:41:21'),
(588, 'individual', NULL, 13, 'event', 'disabled', 1, '2026-05-04 02:41:21'),
(589, 'individual', NULL, 13, 'pelanggaran', 'disabled', 1, '2026-05-04 02:41:21'),
(590, 'individual', NULL, 13, 'perilaku', 'disabled', 1, '2026-05-04 02:41:21'),
(591, 'individual', NULL, 11, 'prestasi', 'disabled', 1, '2026-05-04 02:41:22'),
(592, 'individual', NULL, 11, 'organisasi', 'disabled', 1, '2026-05-04 02:41:22'),
(593, 'individual', NULL, 11, 'event', 'disabled', 1, '2026-05-04 02:41:22'),
(594, 'individual', NULL, 11, 'pelanggaran', 'disabled', 1, '2026-05-04 02:41:22'),
(595, 'individual', NULL, 11, 'perilaku', 'disabled', 1, '2026-05-04 02:41:22'),
(596, 'individual', NULL, 3, 'prestasi', 'disabled', 1, '2026-05-04 02:41:22'),
(597, 'individual', NULL, 3, 'organisasi', 'disabled', 1, '2026-05-04 02:41:22'),
(598, 'individual', NULL, 3, 'event', 'disabled', 1, '2026-05-04 02:41:22'),
(599, 'individual', NULL, 3, 'pelanggaran', 'disabled', 1, '2026-05-04 02:41:22'),
(600, 'individual', NULL, 3, 'perilaku', 'disabled', 1, '2026-05-04 02:41:22'),
(601, 'individual', NULL, 7, 'prestasi', 'disabled', 1, '2026-05-04 02:41:22'),
(602, 'individual', NULL, 7, 'organisasi', 'disabled', 1, '2026-05-04 02:41:22'),
(603, 'individual', NULL, 7, 'event', 'disabled', 1, '2026-05-04 02:41:22'),
(604, 'individual', NULL, 7, 'pelanggaran', 'disabled', 1, '2026-05-04 02:41:22'),
(605, 'individual', NULL, 7, 'perilaku', 'disabled', 1, '2026-05-04 02:41:22'),
(606, 'individual', NULL, 10, 'prestasi', 'disabled', 1, '2026-05-04 02:41:22'),
(607, 'individual', NULL, 10, 'organisasi', 'disabled', 1, '2026-05-04 02:41:22'),
(608, 'individual', NULL, 10, 'event', 'disabled', 1, '2026-05-04 02:41:22'),
(609, 'individual', NULL, 10, 'pelanggaran', 'disabled', 1, '2026-05-04 02:41:22'),
(610, 'individual', NULL, 10, 'perilaku', 'disabled', 1, '2026-05-04 02:41:22'),
(611, 'individual', NULL, 14, 'prestasi', 'disabled', 1, '2026-05-04 02:41:22'),
(612, 'individual', NULL, 14, 'organisasi', 'disabled', 1, '2026-05-04 02:41:22'),
(613, 'individual', NULL, 14, 'event', 'disabled', 1, '2026-05-04 02:41:22'),
(614, 'individual', NULL, 14, 'pelanggaran', 'disabled', 1, '2026-05-04 02:41:22'),
(615, 'individual', NULL, 14, 'perilaku', 'disabled', 1, '2026-05-04 02:41:22'),
(616, 'individual', NULL, 6, 'prestasi', 'disabled', 1, '2026-05-04 02:41:22'),
(617, 'individual', NULL, 6, 'organisasi', 'disabled', 1, '2026-05-04 02:41:22'),
(618, 'individual', NULL, 6, 'event', 'disabled', 1, '2026-05-04 02:41:22'),
(619, 'individual', NULL, 6, 'pelanggaran', 'disabled', 1, '2026-05-04 02:41:22'),
(620, 'individual', NULL, 6, 'perilaku', 'disabled', 1, '2026-05-04 02:41:22'),
(621, 'individual', NULL, 8, 'prestasi', 'disabled', 1, '2026-05-04 02:41:22'),
(622, 'individual', NULL, 8, 'organisasi', 'disabled', 1, '2026-05-04 02:41:22'),
(623, 'individual', NULL, 8, 'event', 'disabled', 1, '2026-05-04 02:41:22'),
(624, 'individual', NULL, 8, 'pelanggaran', 'disabled', 1, '2026-05-04 02:41:22'),
(625, 'individual', NULL, 8, 'perilaku', 'disabled', 1, '2026-05-04 02:41:22'),
(626, 'individual', NULL, 11, 'prestasi', 'disabled', 1, '2026-05-04 02:41:22'),
(627, 'individual', NULL, 11, 'organisasi', 'disabled', 1, '2026-05-04 02:41:22'),
(628, 'individual', NULL, 11, 'event', 'disabled', 1, '2026-05-04 02:41:22'),
(629, 'individual', NULL, 11, 'pelanggaran', 'disabled', 1, '2026-05-04 02:41:22'),
(630, 'individual', NULL, 11, 'perilaku', 'disabled', 1, '2026-05-04 02:41:22'),
(631, 'individual', NULL, 12, 'prestasi', 'disabled', 1, '2026-05-04 02:41:22'),
(632, 'individual', NULL, 12, 'organisasi', 'disabled', 1, '2026-05-04 02:41:22'),
(633, 'individual', NULL, 12, 'event', 'disabled', 1, '2026-05-04 02:41:22'),
(634, 'individual', NULL, 3, 'prestasi', 'disabled', 1, '2026-05-04 02:41:22'),
(635, 'individual', NULL, 12, 'pelanggaran', 'disabled', 1, '2026-05-04 02:41:22'),
(636, 'individual', NULL, 3, 'organisasi', 'disabled', 1, '2026-05-04 02:41:22'),
(637, 'individual', NULL, 12, 'perilaku', 'disabled', 1, '2026-05-04 02:41:22');
INSERT INTO `input_access_logs` (`id`, `control_type`, `target_role`, `target_user_id`, `jenis_input`, `action`, `performed_by`, `performed_at`) VALUES
(638, 'individual', NULL, 3, 'event', 'disabled', 1, '2026-05-04 02:41:22'),
(639, 'individual', NULL, 3, 'pelanggaran', 'disabled', 1, '2026-05-04 02:41:22'),
(640, 'individual', NULL, 3, 'perilaku', 'disabled', 1, '2026-05-04 02:41:22'),
(641, 'individual', NULL, 13, 'prestasi', 'disabled', 1, '2026-05-04 02:41:22'),
(642, 'individual', NULL, 13, 'organisasi', 'disabled', 1, '2026-05-04 02:41:22'),
(643, 'individual', NULL, 13, 'event', 'disabled', 1, '2026-05-04 02:41:22'),
(644, 'individual', NULL, 7, 'prestasi', 'disabled', 1, '2026-05-04 02:41:22'),
(645, 'individual', NULL, 13, 'pelanggaran', 'disabled', 1, '2026-05-04 02:41:22'),
(646, 'individual', NULL, 7, 'organisasi', 'disabled', 1, '2026-05-04 02:41:22'),
(647, 'individual', NULL, 13, 'perilaku', 'disabled', 1, '2026-05-04 02:41:22'),
(648, 'individual', NULL, 7, 'event', 'disabled', 1, '2026-05-04 02:41:22'),
(649, 'individual', NULL, 7, 'pelanggaran', 'disabled', 1, '2026-05-04 02:41:22'),
(650, 'individual', NULL, 7, 'perilaku', 'disabled', 1, '2026-05-04 02:41:22'),
(651, 'individual', NULL, 10, 'prestasi', 'disabled', 1, '2026-05-04 02:41:22'),
(652, 'individual', NULL, 10, 'organisasi', 'disabled', 1, '2026-05-04 02:41:22'),
(653, 'individual', NULL, 10, 'event', 'disabled', 1, '2026-05-04 02:41:22'),
(654, 'individual', NULL, 10, 'pelanggaran', 'disabled', 1, '2026-05-04 02:41:22'),
(655, 'individual', NULL, 10, 'perilaku', 'disabled', 1, '2026-05-04 02:41:22'),
(656, 'individual', NULL, 14, 'prestasi', 'disabled', 1, '2026-05-04 02:41:22'),
(657, 'individual', NULL, 14, 'organisasi', 'disabled', 1, '2026-05-04 02:41:22'),
(658, 'individual', NULL, 11, 'prestasi', 'disabled', 1, '2026-05-04 02:41:22'),
(659, 'individual', NULL, 14, 'event', 'disabled', 1, '2026-05-04 02:41:22'),
(660, 'individual', NULL, 11, 'organisasi', 'disabled', 1, '2026-05-04 02:41:22'),
(661, 'individual', NULL, 14, 'pelanggaran', 'disabled', 1, '2026-05-04 02:41:22'),
(662, 'individual', NULL, 11, 'event', 'disabled', 1, '2026-05-04 02:41:22'),
(663, 'individual', NULL, 14, 'perilaku', 'disabled', 1, '2026-05-04 02:41:22'),
(664, 'individual', NULL, 11, 'pelanggaran', 'disabled', 1, '2026-05-04 02:41:22'),
(665, 'individual', NULL, 11, 'perilaku', 'disabled', 1, '2026-05-04 02:41:22'),
(666, 'individual', NULL, 6, 'prestasi', 'disabled', 1, '2026-05-04 02:41:23'),
(667, 'individual', NULL, 6, 'organisasi', 'disabled', 1, '2026-05-04 02:41:23'),
(668, 'individual', NULL, 3, 'prestasi', 'disabled', 1, '2026-05-04 02:41:23'),
(669, 'individual', NULL, 6, 'event', 'disabled', 1, '2026-05-04 02:41:23'),
(670, 'individual', NULL, 3, 'organisasi', 'disabled', 1, '2026-05-04 02:41:23'),
(671, 'individual', NULL, 6, 'pelanggaran', 'disabled', 1, '2026-05-04 02:41:23'),
(672, 'individual', NULL, 3, 'event', 'disabled', 1, '2026-05-04 02:41:23'),
(673, 'individual', NULL, 6, 'perilaku', 'disabled', 1, '2026-05-04 02:41:23'),
(674, 'individual', NULL, 3, 'pelanggaran', 'disabled', 1, '2026-05-04 02:41:23'),
(675, 'individual', NULL, 3, 'perilaku', 'disabled', 1, '2026-05-04 02:41:23'),
(676, 'individual', NULL, 8, 'prestasi', 'disabled', 1, '2026-05-04 02:41:23'),
(677, 'individual', NULL, 8, 'organisasi', 'disabled', 1, '2026-05-04 02:41:23'),
(678, 'individual', NULL, 7, 'prestasi', 'disabled', 1, '2026-05-04 02:41:23'),
(679, 'individual', NULL, 8, 'event', 'disabled', 1, '2026-05-04 02:41:23'),
(680, 'individual', NULL, 7, 'organisasi', 'disabled', 1, '2026-05-04 02:41:23'),
(681, 'individual', NULL, 8, 'pelanggaran', 'disabled', 1, '2026-05-04 02:41:23'),
(682, 'individual', NULL, 7, 'event', 'disabled', 1, '2026-05-04 02:41:23'),
(683, 'individual', NULL, 8, 'perilaku', 'disabled', 1, '2026-05-04 02:41:23'),
(684, 'individual', NULL, 7, 'pelanggaran', 'disabled', 1, '2026-05-04 02:41:23'),
(685, 'individual', NULL, 7, 'perilaku', 'disabled', 1, '2026-05-04 02:41:23'),
(686, 'individual', NULL, 12, 'prestasi', 'disabled', 1, '2026-05-04 02:41:23'),
(687, 'individual', NULL, 10, 'prestasi', 'disabled', 1, '2026-05-04 02:41:23'),
(688, 'individual', NULL, 12, 'organisasi', 'disabled', 1, '2026-05-04 02:41:23'),
(689, 'individual', NULL, 10, 'organisasi', 'disabled', 1, '2026-05-04 02:41:23'),
(690, 'individual', NULL, 12, 'event', 'disabled', 1, '2026-05-04 02:41:23'),
(691, 'individual', NULL, 10, 'event', 'disabled', 1, '2026-05-04 02:41:23'),
(692, 'individual', NULL, 12, 'pelanggaran', 'disabled', 1, '2026-05-04 02:41:23'),
(693, 'individual', NULL, 10, 'pelanggaran', 'disabled', 1, '2026-05-04 02:41:23'),
(694, 'individual', NULL, 12, 'perilaku', 'disabled', 1, '2026-05-04 02:41:23'),
(695, 'individual', NULL, 10, 'perilaku', 'disabled', 1, '2026-05-04 02:41:23'),
(696, 'individual', NULL, 13, 'prestasi', 'disabled', 1, '2026-05-04 02:41:23'),
(697, 'individual', NULL, 13, 'organisasi', 'disabled', 1, '2026-05-04 02:41:23'),
(698, 'individual', NULL, 14, 'prestasi', 'disabled', 1, '2026-05-04 02:41:23'),
(699, 'individual', NULL, 13, 'event', 'disabled', 1, '2026-05-04 02:41:23'),
(700, 'individual', NULL, 14, 'organisasi', 'disabled', 1, '2026-05-04 02:41:23'),
(701, 'individual', NULL, 13, 'pelanggaran', 'disabled', 1, '2026-05-04 02:41:23'),
(702, 'individual', NULL, 14, 'event', 'disabled', 1, '2026-05-04 02:41:23'),
(703, 'individual', NULL, 13, 'perilaku', 'disabled', 1, '2026-05-04 02:41:23'),
(704, 'individual', NULL, 14, 'pelanggaran', 'disabled', 1, '2026-05-04 02:41:23'),
(705, 'individual', NULL, 14, 'perilaku', 'disabled', 1, '2026-05-04 02:41:23'),
(706, 'individual', NULL, 6, 'prestasi', 'disabled', 1, '2026-05-04 02:41:23'),
(707, 'individual', NULL, 6, 'organisasi', 'disabled', 1, '2026-05-04 02:41:23'),
(708, 'individual', NULL, 6, 'event', 'disabled', 1, '2026-05-04 02:41:23'),
(709, 'individual', NULL, 6, 'pelanggaran', 'disabled', 1, '2026-05-04 02:41:23'),
(710, 'individual', NULL, 6, 'perilaku', 'disabled', 1, '2026-05-04 02:41:23'),
(711, 'individual', NULL, 8, 'prestasi', 'disabled', 1, '2026-05-04 02:41:23'),
(712, 'individual', NULL, 8, 'organisasi', 'disabled', 1, '2026-05-04 02:41:23'),
(713, 'individual', NULL, 8, 'event', 'disabled', 1, '2026-05-04 02:41:23'),
(714, 'individual', NULL, 8, 'pelanggaran', 'disabled', 1, '2026-05-04 02:41:23'),
(715, 'individual', NULL, 8, 'perilaku', 'disabled', 1, '2026-05-04 02:41:23'),
(716, 'individual', NULL, 12, 'prestasi', 'disabled', 1, '2026-05-04 02:41:23'),
(717, 'individual', NULL, 12, 'organisasi', 'disabled', 1, '2026-05-04 02:41:23'),
(718, 'individual', NULL, 12, 'event', 'disabled', 1, '2026-05-04 02:41:23'),
(719, 'individual', NULL, 12, 'pelanggaran', 'disabled', 1, '2026-05-04 02:41:23'),
(720, 'individual', NULL, 12, 'perilaku', 'disabled', 1, '2026-05-04 02:41:23'),
(721, 'individual', NULL, 13, 'prestasi', 'disabled', 1, '2026-05-04 02:41:23'),
(722, 'individual', NULL, 13, 'organisasi', 'disabled', 1, '2026-05-04 02:41:23'),
(723, 'individual', NULL, 13, 'event', 'disabled', 1, '2026-05-04 02:41:23'),
(724, 'individual', NULL, 13, 'pelanggaran', 'disabled', 1, '2026-05-04 02:41:23'),
(725, 'individual', NULL, 13, 'perilaku', 'disabled', 1, '2026-05-04 02:41:23'),
(726, 'individual', NULL, 11, 'prestasi', 'enabled', 1, '2026-05-04 02:41:23'),
(727, 'individual', NULL, 11, 'organisasi', 'disabled', 1, '2026-05-04 02:41:23'),
(728, 'individual', NULL, 11, 'event', 'disabled', 1, '2026-05-04 02:41:23'),
(729, 'individual', NULL, 11, 'pelanggaran', 'disabled', 1, '2026-05-04 02:41:23'),
(730, 'individual', NULL, 11, 'perilaku', 'disabled', 1, '2026-05-04 02:41:23'),
(731, 'individual', NULL, 3, 'prestasi', 'enabled', 1, '2026-05-04 02:41:23'),
(732, 'individual', NULL, 3, 'organisasi', 'disabled', 1, '2026-05-04 02:41:23'),
(733, 'individual', NULL, 3, 'event', 'disabled', 1, '2026-05-04 02:41:23'),
(734, 'individual', NULL, 3, 'pelanggaran', 'disabled', 1, '2026-05-04 02:41:23'),
(735, 'individual', NULL, 3, 'perilaku', 'disabled', 1, '2026-05-04 02:41:23'),
(736, 'individual', NULL, 7, 'prestasi', 'enabled', 1, '2026-05-04 02:41:23'),
(737, 'individual', NULL, 7, 'organisasi', 'disabled', 1, '2026-05-04 02:41:23'),
(738, 'individual', NULL, 7, 'event', 'disabled', 1, '2026-05-04 02:41:23'),
(739, 'individual', NULL, 7, 'pelanggaran', 'disabled', 1, '2026-05-04 02:41:23'),
(740, 'individual', NULL, 7, 'perilaku', 'disabled', 1, '2026-05-04 02:41:23'),
(741, 'individual', NULL, 10, 'prestasi', 'enabled', 1, '2026-05-04 02:41:23'),
(742, 'individual', NULL, 10, 'organisasi', 'disabled', 1, '2026-05-04 02:41:23'),
(743, 'individual', NULL, 10, 'event', 'disabled', 1, '2026-05-04 02:41:23'),
(744, 'individual', NULL, 10, 'pelanggaran', 'disabled', 1, '2026-05-04 02:41:23'),
(745, 'individual', NULL, 10, 'perilaku', 'disabled', 1, '2026-05-04 02:41:23'),
(746, 'individual', NULL, 14, 'prestasi', 'enabled', 1, '2026-05-04 02:41:23'),
(747, 'individual', NULL, 14, 'organisasi', 'disabled', 1, '2026-05-04 02:41:23'),
(748, 'individual', NULL, 14, 'event', 'disabled', 1, '2026-05-04 02:41:23'),
(749, 'individual', NULL, 14, 'pelanggaran', 'disabled', 1, '2026-05-04 02:41:23'),
(750, 'individual', NULL, 14, 'perilaku', 'disabled', 1, '2026-05-04 02:41:23'),
(751, 'individual', NULL, 6, 'prestasi', 'enabled', 1, '2026-05-04 02:41:23'),
(752, 'individual', NULL, 6, 'organisasi', 'disabled', 1, '2026-05-04 02:41:23'),
(753, 'individual', NULL, 6, 'event', 'disabled', 1, '2026-05-04 02:41:23'),
(754, 'individual', NULL, 6, 'pelanggaran', 'disabled', 1, '2026-05-04 02:41:23'),
(755, 'individual', NULL, 6, 'perilaku', 'disabled', 1, '2026-05-04 02:41:23'),
(756, 'individual', NULL, 8, 'prestasi', 'enabled', 1, '2026-05-04 02:41:23'),
(757, 'individual', NULL, 8, 'organisasi', 'disabled', 1, '2026-05-04 02:41:23'),
(758, 'individual', NULL, 11, 'prestasi', 'enabled', 1, '2026-05-04 02:41:23'),
(759, 'individual', NULL, 8, 'event', 'disabled', 1, '2026-05-04 02:41:23'),
(760, 'individual', NULL, 11, 'organisasi', 'disabled', 1, '2026-05-04 02:41:23'),
(761, 'individual', NULL, 8, 'pelanggaran', 'disabled', 1, '2026-05-04 02:41:23'),
(762, 'individual', NULL, 11, 'event', 'disabled', 1, '2026-05-04 02:41:23'),
(763, 'individual', NULL, 8, 'perilaku', 'disabled', 1, '2026-05-04 02:41:23'),
(764, 'individual', NULL, 11, 'pelanggaran', 'disabled', 1, '2026-05-04 02:41:23'),
(765, 'individual', NULL, 11, 'perilaku', 'disabled', 1, '2026-05-04 02:41:23'),
(766, 'individual', NULL, 12, 'prestasi', 'enabled', 1, '2026-05-04 02:41:23'),
(767, 'individual', NULL, 3, 'prestasi', 'enabled', 1, '2026-05-04 02:41:23'),
(768, 'individual', NULL, 12, 'organisasi', 'disabled', 1, '2026-05-04 02:41:23'),
(769, 'individual', NULL, 3, 'organisasi', 'disabled', 1, '2026-05-04 02:41:23'),
(770, 'individual', NULL, 12, 'event', 'disabled', 1, '2026-05-04 02:41:23'),
(771, 'individual', NULL, 3, 'event', 'disabled', 1, '2026-05-04 02:41:23'),
(772, 'individual', NULL, 12, 'pelanggaran', 'disabled', 1, '2026-05-04 02:41:23'),
(773, 'individual', NULL, 3, 'pelanggaran', 'disabled', 1, '2026-05-04 02:41:23'),
(774, 'individual', NULL, 12, 'perilaku', 'disabled', 1, '2026-05-04 02:41:23'),
(775, 'individual', NULL, 3, 'perilaku', 'disabled', 1, '2026-05-04 02:41:23'),
(776, 'individual', NULL, 7, 'prestasi', 'enabled', 1, '2026-05-04 02:41:23'),
(777, 'individual', NULL, 13, 'prestasi', 'enabled', 1, '2026-05-04 02:41:23'),
(778, 'individual', NULL, 7, 'organisasi', 'disabled', 1, '2026-05-04 02:41:23'),
(779, 'individual', NULL, 13, 'organisasi', 'disabled', 1, '2026-05-04 02:41:23'),
(780, 'individual', NULL, 7, 'event', 'disabled', 1, '2026-05-04 02:41:23'),
(781, 'individual', NULL, 13, 'event', 'disabled', 1, '2026-05-04 02:41:23'),
(782, 'individual', NULL, 7, 'pelanggaran', 'disabled', 1, '2026-05-04 02:41:23'),
(783, 'individual', NULL, 13, 'pelanggaran', 'disabled', 1, '2026-05-04 02:41:23'),
(784, 'individual', NULL, 7, 'perilaku', 'disabled', 1, '2026-05-04 02:41:23'),
(785, 'individual', NULL, 13, 'perilaku', 'disabled', 1, '2026-05-04 02:41:23'),
(786, 'individual', NULL, 10, 'prestasi', 'enabled', 1, '2026-05-04 02:41:23'),
(787, 'individual', NULL, 10, 'organisasi', 'disabled', 1, '2026-05-04 02:41:23'),
(788, 'individual', NULL, 10, 'event', 'disabled', 1, '2026-05-04 02:41:23'),
(789, 'individual', NULL, 10, 'pelanggaran', 'disabled', 1, '2026-05-04 02:41:23'),
(790, 'individual', NULL, 10, 'perilaku', 'disabled', 1, '2026-05-04 02:41:23'),
(791, 'individual', NULL, 14, 'prestasi', 'enabled', 1, '2026-05-04 02:41:23'),
(792, 'individual', NULL, 14, 'organisasi', 'disabled', 1, '2026-05-04 02:41:23'),
(793, 'individual', NULL, 14, 'event', 'disabled', 1, '2026-05-04 02:41:23'),
(794, 'individual', NULL, 14, 'pelanggaran', 'disabled', 1, '2026-05-04 02:41:23'),
(795, 'individual', NULL, 14, 'perilaku', 'disabled', 1, '2026-05-04 02:41:23'),
(796, 'individual', NULL, 6, 'prestasi', 'enabled', 1, '2026-05-04 02:41:23'),
(797, 'individual', NULL, 6, 'organisasi', 'disabled', 1, '2026-05-04 02:41:23'),
(798, 'individual', NULL, 6, 'event', 'disabled', 1, '2026-05-04 02:41:23'),
(799, 'individual', NULL, 6, 'pelanggaran', 'disabled', 1, '2026-05-04 02:41:23'),
(800, 'individual', NULL, 6, 'perilaku', 'disabled', 1, '2026-05-04 02:41:23'),
(801, 'individual', NULL, 11, 'prestasi', 'enabled', 1, '2026-05-04 02:41:23'),
(802, 'individual', NULL, 11, 'organisasi', 'disabled', 1, '2026-05-04 02:41:23'),
(803, 'individual', NULL, 11, 'event', 'disabled', 1, '2026-05-04 02:41:23'),
(804, 'individual', NULL, 11, 'pelanggaran', 'disabled', 1, '2026-05-04 02:41:23'),
(805, 'individual', NULL, 8, 'prestasi', 'enabled', 1, '2026-05-04 02:41:23'),
(806, 'individual', NULL, 11, 'perilaku', 'disabled', 1, '2026-05-04 02:41:23'),
(807, 'individual', NULL, 8, 'organisasi', 'disabled', 1, '2026-05-04 02:41:23'),
(808, 'individual', NULL, 8, 'event', 'disabled', 1, '2026-05-04 02:41:23'),
(809, 'individual', NULL, 8, 'pelanggaran', 'disabled', 1, '2026-05-04 02:41:23'),
(810, 'individual', NULL, 3, 'prestasi', 'enabled', 1, '2026-05-04 02:41:23'),
(811, 'individual', NULL, 8, 'perilaku', 'disabled', 1, '2026-05-04 02:41:23'),
(812, 'individual', NULL, 3, 'organisasi', 'disabled', 1, '2026-05-04 02:41:23'),
(813, 'individual', NULL, 3, 'event', 'disabled', 1, '2026-05-04 02:41:23'),
(814, 'individual', NULL, 3, 'pelanggaran', 'disabled', 1, '2026-05-04 02:41:23'),
(815, 'individual', NULL, 3, 'perilaku', 'disabled', 1, '2026-05-04 02:41:23'),
(816, 'individual', NULL, 12, 'prestasi', 'enabled', 1, '2026-05-04 02:41:23'),
(817, 'individual', NULL, 12, 'organisasi', 'disabled', 1, '2026-05-04 02:41:23'),
(818, 'individual', NULL, 12, 'event', 'disabled', 1, '2026-05-04 02:41:23'),
(819, 'individual', NULL, 12, 'pelanggaran', 'disabled', 1, '2026-05-04 02:41:23'),
(820, 'individual', NULL, 7, 'prestasi', 'enabled', 1, '2026-05-04 02:41:23'),
(821, 'individual', NULL, 12, 'perilaku', 'disabled', 1, '2026-05-04 02:41:23'),
(822, 'individual', NULL, 7, 'organisasi', 'disabled', 1, '2026-05-04 02:41:23'),
(823, 'individual', NULL, 7, 'event', 'disabled', 1, '2026-05-04 02:41:23'),
(824, 'individual', NULL, 7, 'pelanggaran', 'disabled', 1, '2026-05-04 02:41:23'),
(825, 'individual', NULL, 7, 'perilaku', 'disabled', 1, '2026-05-04 02:41:23'),
(826, 'individual', NULL, 13, 'prestasi', 'enabled', 1, '2026-05-04 02:41:23'),
(827, 'individual', NULL, 13, 'organisasi', 'disabled', 1, '2026-05-04 02:41:23'),
(828, 'individual', NULL, 13, 'event', 'disabled', 1, '2026-05-04 02:41:23'),
(829, 'individual', NULL, 13, 'pelanggaran', 'disabled', 1, '2026-05-04 02:41:23'),
(830, 'individual', NULL, 10, 'prestasi', 'enabled', 1, '2026-05-04 02:41:23'),
(831, 'individual', NULL, 13, 'perilaku', 'disabled', 1, '2026-05-04 02:41:23'),
(832, 'individual', NULL, 10, 'organisasi', 'disabled', 1, '2026-05-04 02:41:23'),
(833, 'individual', NULL, 10, 'event', 'disabled', 1, '2026-05-04 02:41:23'),
(834, 'individual', NULL, 10, 'pelanggaran', 'disabled', 1, '2026-05-04 02:41:23'),
(835, 'individual', NULL, 10, 'perilaku', 'disabled', 1, '2026-05-04 02:41:23'),
(836, 'individual', NULL, 14, 'prestasi', 'enabled', 1, '2026-05-04 02:41:23'),
(837, 'individual', NULL, 14, 'organisasi', 'disabled', 1, '2026-05-04 02:41:23'),
(838, 'individual', NULL, 14, 'event', 'disabled', 1, '2026-05-04 02:41:23'),
(839, 'individual', NULL, 14, 'pelanggaran', 'disabled', 1, '2026-05-04 02:41:23'),
(840, 'individual', NULL, 14, 'perilaku', 'disabled', 1, '2026-05-04 02:41:23'),
(841, 'individual', NULL, 6, 'prestasi', 'enabled', 1, '2026-05-04 02:41:23'),
(842, 'individual', NULL, 6, 'organisasi', 'disabled', 1, '2026-05-04 02:41:23'),
(843, 'individual', NULL, 6, 'event', 'disabled', 1, '2026-05-04 02:41:23'),
(844, 'individual', NULL, 6, 'pelanggaran', 'disabled', 1, '2026-05-04 02:41:23'),
(845, 'individual', NULL, 6, 'perilaku', 'disabled', 1, '2026-05-04 02:41:23'),
(846, 'individual', NULL, 8, 'prestasi', 'enabled', 1, '2026-05-04 02:41:23'),
(847, 'individual', NULL, 8, 'organisasi', 'disabled', 1, '2026-05-04 02:41:23'),
(848, 'individual', NULL, 8, 'event', 'disabled', 1, '2026-05-04 02:41:23'),
(849, 'individual', NULL, 8, 'pelanggaran', 'disabled', 1, '2026-05-04 02:41:23'),
(850, 'individual', NULL, 8, 'perilaku', 'disabled', 1, '2026-05-04 02:41:23'),
(851, 'individual', NULL, 12, 'prestasi', 'enabled', 1, '2026-05-04 02:41:23'),
(852, 'individual', NULL, 12, 'organisasi', 'disabled', 1, '2026-05-04 02:41:23'),
(853, 'individual', NULL, 12, 'event', 'disabled', 1, '2026-05-04 02:41:23'),
(854, 'individual', NULL, 12, 'pelanggaran', 'disabled', 1, '2026-05-04 02:41:23'),
(855, 'individual', NULL, 12, 'perilaku', 'disabled', 1, '2026-05-04 02:41:23'),
(856, 'individual', NULL, 13, 'prestasi', 'enabled', 1, '2026-05-04 02:41:23'),
(857, 'individual', NULL, 13, 'organisasi', 'disabled', 1, '2026-05-04 02:41:23'),
(858, 'individual', NULL, 13, 'event', 'disabled', 1, '2026-05-04 02:41:23'),
(859, 'individual', NULL, 13, 'pelanggaran', 'disabled', 1, '2026-05-04 02:41:23'),
(860, 'individual', NULL, 13, 'perilaku', 'disabled', 1, '2026-05-04 02:41:23'),
(861, 'individual', NULL, 11, 'prestasi', 'disabled', 1, '2026-05-04 02:41:28'),
(862, 'individual', NULL, 11, 'organisasi', 'disabled', 1, '2026-05-04 02:41:28'),
(863, 'individual', NULL, 11, 'event', 'disabled', 1, '2026-05-04 02:41:28'),
(864, 'individual', NULL, 11, 'pelanggaran', 'disabled', 1, '2026-05-04 02:41:28'),
(865, 'individual', NULL, 11, 'perilaku', 'disabled', 1, '2026-05-04 02:41:28'),
(866, 'individual', NULL, 3, 'prestasi', 'disabled', 1, '2026-05-04 02:41:28'),
(867, 'individual', NULL, 3, 'organisasi', 'disabled', 1, '2026-05-04 02:41:28'),
(868, 'individual', NULL, 3, 'event', 'disabled', 1, '2026-05-04 02:41:28'),
(869, 'individual', NULL, 3, 'pelanggaran', 'disabled', 1, '2026-05-04 02:41:28'),
(870, 'individual', NULL, 3, 'perilaku', 'disabled', 1, '2026-05-04 02:41:28'),
(871, 'individual', NULL, 7, 'prestasi', 'disabled', 1, '2026-05-04 02:41:28'),
(872, 'individual', NULL, 7, 'organisasi', 'disabled', 1, '2026-05-04 02:41:28'),
(873, 'individual', NULL, 7, 'event', 'disabled', 1, '2026-05-04 02:41:28'),
(874, 'individual', NULL, 7, 'pelanggaran', 'disabled', 1, '2026-05-04 02:41:28'),
(875, 'individual', NULL, 7, 'perilaku', 'disabled', 1, '2026-05-04 02:41:28'),
(876, 'individual', NULL, 10, 'prestasi', 'disabled', 1, '2026-05-04 02:41:28'),
(877, 'individual', NULL, 10, 'organisasi', 'disabled', 1, '2026-05-04 02:41:28'),
(878, 'individual', NULL, 10, 'event', 'disabled', 1, '2026-05-04 02:41:28'),
(879, 'individual', NULL, 10, 'pelanggaran', 'disabled', 1, '2026-05-04 02:41:28'),
(880, 'individual', NULL, 10, 'perilaku', 'disabled', 1, '2026-05-04 02:41:28'),
(881, 'individual', NULL, 14, 'prestasi', 'disabled', 1, '2026-05-04 02:41:28'),
(882, 'individual', NULL, 14, 'organisasi', 'disabled', 1, '2026-05-04 02:41:28'),
(883, 'individual', NULL, 14, 'event', 'disabled', 1, '2026-05-04 02:41:28'),
(884, 'individual', NULL, 14, 'pelanggaran', 'disabled', 1, '2026-05-04 02:41:28'),
(885, 'individual', NULL, 14, 'perilaku', 'disabled', 1, '2026-05-04 02:41:28'),
(886, 'individual', NULL, 6, 'prestasi', 'disabled', 1, '2026-05-04 02:41:28'),
(887, 'individual', NULL, 6, 'organisasi', 'disabled', 1, '2026-05-04 02:41:28'),
(888, 'individual', NULL, 6, 'event', 'disabled', 1, '2026-05-04 02:41:28'),
(889, 'individual', NULL, 6, 'pelanggaran', 'disabled', 1, '2026-05-04 02:41:28'),
(890, 'individual', NULL, 6, 'perilaku', 'disabled', 1, '2026-05-04 02:41:28'),
(891, 'individual', NULL, 8, 'prestasi', 'disabled', 1, '2026-05-04 02:41:28'),
(892, 'individual', NULL, 8, 'organisasi', 'disabled', 1, '2026-05-04 02:41:28'),
(893, 'individual', NULL, 8, 'event', 'disabled', 1, '2026-05-04 02:41:28'),
(894, 'individual', NULL, 8, 'pelanggaran', 'disabled', 1, '2026-05-04 02:41:28'),
(895, 'individual', NULL, 8, 'perilaku', 'disabled', 1, '2026-05-04 02:41:28'),
(896, 'individual', NULL, 12, 'prestasi', 'disabled', 1, '2026-05-04 02:41:28'),
(897, 'individual', NULL, 12, 'organisasi', 'disabled', 1, '2026-05-04 02:41:28'),
(898, 'individual', NULL, 12, 'event', 'disabled', 1, '2026-05-04 02:41:28'),
(899, 'individual', NULL, 12, 'pelanggaran', 'disabled', 1, '2026-05-04 02:41:28'),
(900, 'individual', NULL, 12, 'perilaku', 'disabled', 1, '2026-05-04 02:41:28'),
(901, 'individual', NULL, 13, 'prestasi', 'disabled', 1, '2026-05-04 02:41:28'),
(902, 'individual', NULL, 13, 'organisasi', 'disabled', 1, '2026-05-04 02:41:28'),
(903, 'individual', NULL, 13, 'event', 'disabled', 1, '2026-05-04 02:41:28'),
(904, 'individual', NULL, 13, 'pelanggaran', 'disabled', 1, '2026-05-04 02:41:28'),
(905, 'individual', NULL, 13, 'perilaku', 'disabled', 1, '2026-05-04 02:41:28'),
(906, 'individual', NULL, 5, 'prestasi', 'disabled', 1, '2026-05-04 02:41:31'),
(907, 'individual', NULL, 5, 'organisasi', 'enabled', 1, '2026-05-04 02:41:31'),
(908, 'individual', NULL, 5, 'event', 'enabled', 1, '2026-05-04 02:41:31'),
(909, 'individual', NULL, 5, 'pelanggaran', 'enabled', 1, '2026-05-04 02:41:31'),
(910, 'individual', NULL, 5, 'perilaku', 'enabled', 1, '2026-05-04 02:41:31'),
(911, 'individual', NULL, 9, 'prestasi', 'disabled', 1, '2026-05-04 02:41:31'),
(912, 'individual', NULL, 9, 'organisasi', 'enabled', 1, '2026-05-04 02:41:31'),
(913, 'individual', NULL, 9, 'event', 'enabled', 1, '2026-05-04 02:41:31'),
(914, 'individual', NULL, 9, 'pelanggaran', 'enabled', 1, '2026-05-04 02:41:31'),
(915, 'individual', NULL, 9, 'perilaku', 'enabled', 1, '2026-05-04 02:41:31'),
(916, 'individual', NULL, 5, 'prestasi', 'disabled', 1, '2026-05-04 02:41:32'),
(917, 'individual', NULL, 5, 'organisasi', 'enabled', 1, '2026-05-04 02:41:32'),
(918, 'individual', NULL, 5, 'event', 'enabled', 1, '2026-05-04 02:41:32'),
(919, 'individual', NULL, 5, 'pelanggaran', 'enabled', 1, '2026-05-04 02:41:32'),
(920, 'individual', NULL, 5, 'perilaku', 'enabled', 1, '2026-05-04 02:41:32'),
(921, 'individual', NULL, 9, 'prestasi', 'disabled', 1, '2026-05-04 02:41:32'),
(922, 'individual', NULL, 9, 'organisasi', 'enabled', 1, '2026-05-04 02:41:32'),
(923, 'individual', NULL, 9, 'event', 'enabled', 1, '2026-05-04 02:41:32'),
(924, 'individual', NULL, 9, 'pelanggaran', 'enabled', 1, '2026-05-04 02:41:32'),
(925, 'individual', NULL, 9, 'perilaku', 'enabled', 1, '2026-05-04 02:41:32'),
(926, 'individual', NULL, 5, 'prestasi', 'disabled', 1, '2026-05-04 02:41:33'),
(927, 'individual', NULL, 5, 'organisasi', 'disabled', 1, '2026-05-04 02:41:33'),
(928, 'individual', NULL, 5, 'event', 'enabled', 1, '2026-05-04 02:41:33'),
(929, 'individual', NULL, 5, 'pelanggaran', 'enabled', 1, '2026-05-04 02:41:33'),
(930, 'individual', NULL, 5, 'perilaku', 'enabled', 1, '2026-05-04 02:41:33'),
(931, 'individual', NULL, 9, 'prestasi', 'disabled', 1, '2026-05-04 02:41:33'),
(932, 'individual', NULL, 9, 'organisasi', 'disabled', 1, '2026-05-04 02:41:33'),
(933, 'individual', NULL, 9, 'event', 'enabled', 1, '2026-05-04 02:41:33'),
(934, 'individual', NULL, 9, 'pelanggaran', 'enabled', 1, '2026-05-04 02:41:33'),
(935, 'individual', NULL, 9, 'perilaku', 'enabled', 1, '2026-05-04 02:41:33'),
(936, 'individual', NULL, 5, 'prestasi', 'disabled', 1, '2026-05-04 02:41:36'),
(937, 'individual', NULL, 5, 'organisasi', 'disabled', 1, '2026-05-04 02:41:36'),
(938, 'individual', NULL, 5, 'event', 'disabled', 1, '2026-05-04 02:41:36'),
(939, 'individual', NULL, 5, 'pelanggaran', 'enabled', 1, '2026-05-04 02:41:36'),
(940, 'individual', NULL, 5, 'perilaku', 'enabled', 1, '2026-05-04 02:41:36'),
(941, 'individual', NULL, 9, 'prestasi', 'disabled', 1, '2026-05-04 02:41:36'),
(942, 'individual', NULL, 9, 'organisasi', 'disabled', 1, '2026-05-04 02:41:36'),
(943, 'individual', NULL, 9, 'event', 'disabled', 1, '2026-05-04 02:41:36'),
(944, 'individual', NULL, 9, 'pelanggaran', 'enabled', 1, '2026-05-04 02:41:36'),
(945, 'individual', NULL, 9, 'perilaku', 'enabled', 1, '2026-05-04 02:41:36'),
(946, 'individual', NULL, 5, 'prestasi', 'disabled', 1, '2026-05-04 02:49:38'),
(947, 'individual', NULL, 5, 'organisasi', 'disabled', 1, '2026-05-04 02:49:38'),
(948, 'individual', NULL, 5, 'event', 'disabled', 1, '2026-05-04 02:49:38'),
(949, 'individual', NULL, 5, 'pelanggaran', 'disabled', 1, '2026-05-04 02:49:38'),
(950, 'individual', NULL, 5, 'perilaku', 'enabled', 1, '2026-05-04 02:49:38'),
(951, 'individual', NULL, 9, 'prestasi', 'disabled', 1, '2026-05-04 02:49:38'),
(952, 'individual', NULL, 9, 'organisasi', 'disabled', 1, '2026-05-04 02:49:38'),
(953, 'individual', NULL, 9, 'event', 'disabled', 1, '2026-05-04 02:49:38'),
(954, 'individual', NULL, 9, 'pelanggaran', 'disabled', 1, '2026-05-04 02:49:38'),
(955, 'individual', NULL, 9, 'perilaku', 'enabled', 1, '2026-05-04 02:49:38'),
(956, 'individual', NULL, 5, 'prestasi', 'disabled', 1, '2026-05-04 02:49:39'),
(957, 'individual', NULL, 5, 'organisasi', 'disabled', 1, '2026-05-04 02:49:39'),
(958, 'individual', NULL, 5, 'event', 'disabled', 1, '2026-05-04 02:49:39'),
(959, 'individual', NULL, 5, 'pelanggaran', 'disabled', 1, '2026-05-04 02:49:39'),
(960, 'individual', NULL, 5, 'perilaku', 'disabled', 1, '2026-05-04 02:49:39'),
(961, 'individual', NULL, 9, 'prestasi', 'disabled', 1, '2026-05-04 02:49:39'),
(962, 'individual', NULL, 9, 'organisasi', 'disabled', 1, '2026-05-04 02:49:39'),
(963, 'individual', NULL, 9, 'event', 'disabled', 1, '2026-05-04 02:49:39'),
(964, 'individual', NULL, 9, 'pelanggaran', 'disabled', 1, '2026-05-04 02:49:39'),
(965, 'individual', NULL, 9, 'perilaku', 'disabled', 1, '2026-05-04 02:49:39'),
(966, 'individual', NULL, 5, 'prestasi', 'enabled', 1, '2026-05-04 02:52:47'),
(967, 'individual', NULL, 5, 'organisasi', 'disabled', 1, '2026-05-04 02:52:47'),
(968, 'individual', NULL, 5, 'event', 'disabled', 1, '2026-05-04 02:52:47'),
(969, 'individual', NULL, 5, 'pelanggaran', 'disabled', 1, '2026-05-04 02:52:47'),
(970, 'individual', NULL, 5, 'perilaku', 'disabled', 1, '2026-05-04 02:52:47'),
(971, 'individual', NULL, 5, 'prestasi', 'disabled', 1, '2026-05-04 02:52:47'),
(972, 'individual', NULL, 5, 'organisasi', 'disabled', 1, '2026-05-04 02:52:47'),
(973, 'individual', NULL, 5, 'event', 'disabled', 1, '2026-05-04 02:52:47'),
(974, 'individual', NULL, 5, 'pelanggaran', 'disabled', 1, '2026-05-04 02:52:47'),
(975, 'individual', NULL, 5, 'perilaku', 'disabled', 1, '2026-05-04 02:52:47'),
(976, 'individual', NULL, 11, 'prestasi', 'enabled', 1, '2026-05-04 03:52:12'),
(977, 'individual', NULL, 11, 'organisasi', 'disabled', 1, '2026-05-04 03:52:12'),
(978, 'individual', NULL, 11, 'event', 'disabled', 1, '2026-05-04 03:52:12'),
(979, 'individual', NULL, 11, 'pelanggaran', 'disabled', 1, '2026-05-04 03:52:12'),
(980, 'individual', NULL, 11, 'perilaku', 'disabled', 1, '2026-05-04 03:52:12'),
(981, 'individual', NULL, 3, 'prestasi', 'enabled', 1, '2026-05-04 03:52:12'),
(982, 'individual', NULL, 3, 'organisasi', 'disabled', 1, '2026-05-04 03:52:12'),
(983, 'individual', NULL, 3, 'event', 'disabled', 1, '2026-05-04 03:52:12'),
(984, 'individual', NULL, 3, 'pelanggaran', 'disabled', 1, '2026-05-04 03:52:12'),
(985, 'individual', NULL, 3, 'perilaku', 'disabled', 1, '2026-05-04 03:52:12'),
(986, 'individual', NULL, 7, 'prestasi', 'enabled', 1, '2026-05-04 03:52:12'),
(987, 'individual', NULL, 7, 'organisasi', 'disabled', 1, '2026-05-04 03:52:12'),
(988, 'individual', NULL, 7, 'event', 'disabled', 1, '2026-05-04 03:52:12'),
(989, 'individual', NULL, 7, 'pelanggaran', 'disabled', 1, '2026-05-04 03:52:12'),
(990, 'individual', NULL, 7, 'perilaku', 'disabled', 1, '2026-05-04 03:52:12'),
(991, 'individual', NULL, 10, 'prestasi', 'enabled', 1, '2026-05-04 03:52:12'),
(992, 'individual', NULL, 10, 'organisasi', 'disabled', 1, '2026-05-04 03:52:12'),
(993, 'individual', NULL, 10, 'event', 'disabled', 1, '2026-05-04 03:52:12'),
(994, 'individual', NULL, 10, 'pelanggaran', 'disabled', 1, '2026-05-04 03:52:12'),
(995, 'individual', NULL, 10, 'perilaku', 'disabled', 1, '2026-05-04 03:52:12'),
(996, 'individual', NULL, 14, 'prestasi', 'enabled', 1, '2026-05-04 03:52:12'),
(997, 'individual', NULL, 14, 'organisasi', 'disabled', 1, '2026-05-04 03:52:12'),
(998, 'individual', NULL, 14, 'event', 'disabled', 1, '2026-05-04 03:52:12'),
(999, 'individual', NULL, 14, 'pelanggaran', 'disabled', 1, '2026-05-04 03:52:12'),
(1000, 'individual', NULL, 14, 'perilaku', 'disabled', 1, '2026-05-04 03:52:12'),
(1001, 'individual', NULL, 6, 'prestasi', 'enabled', 1, '2026-05-04 03:52:12'),
(1002, 'individual', NULL, 6, 'organisasi', 'disabled', 1, '2026-05-04 03:52:12'),
(1003, 'individual', NULL, 6, 'event', 'disabled', 1, '2026-05-04 03:52:12'),
(1004, 'individual', NULL, 6, 'pelanggaran', 'disabled', 1, '2026-05-04 03:52:12'),
(1005, 'individual', NULL, 6, 'perilaku', 'disabled', 1, '2026-05-04 03:52:12'),
(1006, 'individual', NULL, 8, 'prestasi', 'enabled', 1, '2026-05-04 03:52:12'),
(1007, 'individual', NULL, 8, 'organisasi', 'disabled', 1, '2026-05-04 03:52:12'),
(1008, 'individual', NULL, 8, 'event', 'disabled', 1, '2026-05-04 03:52:12'),
(1009, 'individual', NULL, 8, 'pelanggaran', 'disabled', 1, '2026-05-04 03:52:12'),
(1010, 'individual', NULL, 8, 'perilaku', 'disabled', 1, '2026-05-04 03:52:12'),
(1011, 'individual', NULL, 12, 'prestasi', 'enabled', 1, '2026-05-04 03:52:12'),
(1012, 'individual', NULL, 12, 'organisasi', 'disabled', 1, '2026-05-04 03:52:12'),
(1013, 'individual', NULL, 12, 'event', 'disabled', 1, '2026-05-04 03:52:12'),
(1014, 'individual', NULL, 12, 'pelanggaran', 'disabled', 1, '2026-05-04 03:52:12'),
(1015, 'individual', NULL, 12, 'perilaku', 'disabled', 1, '2026-05-04 03:52:12'),
(1016, 'individual', NULL, 13, 'prestasi', 'enabled', 1, '2026-05-04 03:52:12'),
(1017, 'individual', NULL, 13, 'organisasi', 'disabled', 1, '2026-05-04 03:52:12'),
(1018, 'individual', NULL, 13, 'event', 'disabled', 1, '2026-05-04 03:52:12'),
(1019, 'individual', NULL, 13, 'pelanggaran', 'disabled', 1, '2026-05-04 03:52:12'),
(1020, 'individual', NULL, 13, 'perilaku', 'disabled', 1, '2026-05-04 03:52:12'),
(1021, 'individual', NULL, 11, 'prestasi', 'disabled', 1, '2026-05-04 06:18:33'),
(1022, 'individual', NULL, 11, 'organisasi', 'disabled', 1, '2026-05-04 06:18:33'),
(1023, 'individual', NULL, 11, 'event', 'disabled', 1, '2026-05-04 06:18:33'),
(1024, 'individual', NULL, 11, 'pelanggaran', 'disabled', 1, '2026-05-04 06:18:33'),
(1025, 'individual', NULL, 11, 'perilaku', 'disabled', 1, '2026-05-04 06:18:33'),
(1026, 'individual', NULL, 3, 'prestasi', 'disabled', 1, '2026-05-04 06:18:33'),
(1027, 'individual', NULL, 3, 'organisasi', 'disabled', 1, '2026-05-04 06:18:33'),
(1028, 'individual', NULL, 3, 'event', 'disabled', 1, '2026-05-04 06:18:33'),
(1029, 'individual', NULL, 3, 'pelanggaran', 'disabled', 1, '2026-05-04 06:18:33'),
(1030, 'individual', NULL, 3, 'perilaku', 'disabled', 1, '2026-05-04 06:18:33'),
(1031, 'individual', NULL, 7, 'prestasi', 'disabled', 1, '2026-05-04 06:18:33'),
(1032, 'individual', NULL, 7, 'organisasi', 'disabled', 1, '2026-05-04 06:18:33'),
(1033, 'individual', NULL, 7, 'event', 'disabled', 1, '2026-05-04 06:18:33'),
(1034, 'individual', NULL, 7, 'pelanggaran', 'disabled', 1, '2026-05-04 06:18:33'),
(1035, 'individual', NULL, 7, 'perilaku', 'disabled', 1, '2026-05-04 06:18:33'),
(1036, 'individual', NULL, 10, 'prestasi', 'disabled', 1, '2026-05-04 06:18:33'),
(1037, 'individual', NULL, 10, 'organisasi', 'disabled', 1, '2026-05-04 06:18:33'),
(1038, 'individual', NULL, 10, 'event', 'disabled', 1, '2026-05-04 06:18:33'),
(1039, 'individual', NULL, 10, 'pelanggaran', 'disabled', 1, '2026-05-04 06:18:33'),
(1040, 'individual', NULL, 10, 'perilaku', 'disabled', 1, '2026-05-04 06:18:33'),
(1041, 'individual', NULL, 14, 'prestasi', 'disabled', 1, '2026-05-04 06:18:33'),
(1042, 'individual', NULL, 14, 'organisasi', 'disabled', 1, '2026-05-04 06:18:33'),
(1043, 'individual', NULL, 14, 'event', 'disabled', 1, '2026-05-04 06:18:33'),
(1044, 'individual', NULL, 14, 'pelanggaran', 'disabled', 1, '2026-05-04 06:18:33'),
(1045, 'individual', NULL, 14, 'perilaku', 'disabled', 1, '2026-05-04 06:18:33'),
(1046, 'individual', NULL, 6, 'prestasi', 'disabled', 1, '2026-05-04 06:18:33'),
(1047, 'individual', NULL, 6, 'organisasi', 'disabled', 1, '2026-05-04 06:18:33'),
(1048, 'individual', NULL, 6, 'event', 'disabled', 1, '2026-05-04 06:18:33'),
(1049, 'individual', NULL, 6, 'pelanggaran', 'disabled', 1, '2026-05-04 06:18:33'),
(1050, 'individual', NULL, 6, 'perilaku', 'disabled', 1, '2026-05-04 06:18:33'),
(1051, 'individual', NULL, 8, 'prestasi', 'disabled', 1, '2026-05-04 06:18:33'),
(1052, 'individual', NULL, 8, 'organisasi', 'disabled', 1, '2026-05-04 06:18:33'),
(1053, 'individual', NULL, 8, 'event', 'disabled', 1, '2026-05-04 06:18:33'),
(1054, 'individual', NULL, 8, 'pelanggaran', 'disabled', 1, '2026-05-04 06:18:33'),
(1055, 'individual', NULL, 8, 'perilaku', 'disabled', 1, '2026-05-04 06:18:33'),
(1056, 'individual', NULL, 12, 'prestasi', 'disabled', 1, '2026-05-04 06:18:33'),
(1057, 'individual', NULL, 12, 'organisasi', 'disabled', 1, '2026-05-04 06:18:33'),
(1058, 'individual', NULL, 12, 'event', 'disabled', 1, '2026-05-04 06:18:33'),
(1059, 'individual', NULL, 12, 'pelanggaran', 'disabled', 1, '2026-05-04 06:18:33'),
(1060, 'individual', NULL, 12, 'perilaku', 'disabled', 1, '2026-05-04 06:18:33'),
(1061, 'individual', NULL, 13, 'prestasi', 'disabled', 1, '2026-05-04 06:18:33'),
(1062, 'individual', NULL, 13, 'organisasi', 'disabled', 1, '2026-05-04 06:18:33'),
(1063, 'individual', NULL, 13, 'event', 'disabled', 1, '2026-05-04 06:18:33'),
(1064, 'individual', NULL, 13, 'pelanggaran', 'disabled', 1, '2026-05-04 06:18:33'),
(1065, 'individual', NULL, 13, 'perilaku', 'disabled', 1, '2026-05-04 06:18:33'),
(1066, 'individual', NULL, 11, 'prestasi', 'enabled', 1, '2026-05-05 07:41:40'),
(1067, 'individual', NULL, 11, 'organisasi', 'disabled', 1, '2026-05-05 07:41:40'),
(1068, 'individual', NULL, 11, 'event', 'disabled', 1, '2026-05-05 07:41:40'),
(1069, 'individual', NULL, 11, 'pelanggaran', 'disabled', 1, '2026-05-05 07:41:40'),
(1070, 'individual', NULL, 11, 'perilaku', 'disabled', 1, '2026-05-05 07:41:40'),
(1071, 'individual', NULL, 3, 'prestasi', 'enabled', 1, '2026-05-05 07:41:40'),
(1072, 'individual', NULL, 3, 'organisasi', 'disabled', 1, '2026-05-05 07:41:40'),
(1073, 'individual', NULL, 3, 'event', 'disabled', 1, '2026-05-05 07:41:40'),
(1074, 'individual', NULL, 3, 'pelanggaran', 'disabled', 1, '2026-05-05 07:41:40'),
(1075, 'individual', NULL, 3, 'perilaku', 'disabled', 1, '2026-05-05 07:41:40'),
(1076, 'individual', NULL, 7, 'prestasi', 'enabled', 1, '2026-05-05 07:41:40'),
(1077, 'individual', NULL, 7, 'organisasi', 'disabled', 1, '2026-05-05 07:41:40'),
(1078, 'individual', NULL, 7, 'event', 'disabled', 1, '2026-05-05 07:41:40'),
(1079, 'individual', NULL, 7, 'pelanggaran', 'disabled', 1, '2026-05-05 07:41:40'),
(1080, 'individual', NULL, 7, 'perilaku', 'disabled', 1, '2026-05-05 07:41:40'),
(1081, 'individual', NULL, 14, 'prestasi', 'enabled', 1, '2026-05-05 07:41:40'),
(1082, 'individual', NULL, 14, 'organisasi', 'disabled', 1, '2026-05-05 07:41:40'),
(1083, 'individual', NULL, 14, 'event', 'disabled', 1, '2026-05-05 07:41:40'),
(1084, 'individual', NULL, 14, 'pelanggaran', 'disabled', 1, '2026-05-05 07:41:40'),
(1085, 'individual', NULL, 14, 'perilaku', 'disabled', 1, '2026-05-05 07:41:40'),
(1086, 'individual', NULL, 10, 'prestasi', 'enabled', 1, '2026-05-05 07:41:40'),
(1087, 'individual', NULL, 10, 'organisasi', 'disabled', 1, '2026-05-05 07:41:40'),
(1088, 'individual', NULL, 10, 'event', 'disabled', 1, '2026-05-05 07:41:40'),
(1089, 'individual', NULL, 10, 'pelanggaran', 'disabled', 1, '2026-05-05 07:41:40'),
(1090, 'individual', NULL, 10, 'perilaku', 'disabled', 1, '2026-05-05 07:41:40'),
(1091, 'individual', NULL, 6, 'prestasi', 'enabled', 1, '2026-05-05 07:41:40'),
(1092, 'individual', NULL, 6, 'organisasi', 'disabled', 1, '2026-05-05 07:41:40'),
(1093, 'individual', NULL, 6, 'event', 'disabled', 1, '2026-05-05 07:41:40'),
(1094, 'individual', NULL, 6, 'pelanggaran', 'disabled', 1, '2026-05-05 07:41:40'),
(1095, 'individual', NULL, 6, 'perilaku', 'disabled', 1, '2026-05-05 07:41:41'),
(1096, 'individual', NULL, 8, 'prestasi', 'enabled', 1, '2026-05-05 07:41:41'),
(1097, 'individual', NULL, 8, 'organisasi', 'disabled', 1, '2026-05-05 07:41:41'),
(1098, 'individual', NULL, 8, 'event', 'disabled', 1, '2026-05-05 07:41:41'),
(1099, 'individual', NULL, 8, 'pelanggaran', 'disabled', 1, '2026-05-05 07:41:41'),
(1100, 'individual', NULL, 8, 'perilaku', 'disabled', 1, '2026-05-05 07:41:41'),
(1101, 'individual', NULL, 12, 'prestasi', 'enabled', 1, '2026-05-05 07:41:41'),
(1102, 'individual', NULL, 12, 'organisasi', 'disabled', 1, '2026-05-05 07:41:41'),
(1103, 'individual', NULL, 12, 'event', 'disabled', 1, '2026-05-05 07:41:41'),
(1104, 'individual', NULL, 12, 'pelanggaran', 'disabled', 1, '2026-05-05 07:41:41'),
(1105, 'individual', NULL, 12, 'perilaku', 'disabled', 1, '2026-05-05 07:41:41'),
(1106, 'individual', NULL, 13, 'prestasi', 'enabled', 1, '2026-05-05 07:41:41'),
(1107, 'individual', NULL, 13, 'organisasi', 'disabled', 1, '2026-05-05 07:41:41'),
(1108, 'individual', NULL, 13, 'event', 'disabled', 1, '2026-05-05 07:41:41'),
(1109, 'individual', NULL, 13, 'pelanggaran', 'disabled', 1, '2026-05-05 07:41:41'),
(1110, 'individual', NULL, 13, 'perilaku', 'disabled', 1, '2026-05-05 07:41:41'),
(1111, 'individual', NULL, 11, 'prestasi', 'enabled', 1, '2026-05-05 08:06:05'),
(1112, 'individual', NULL, 11, 'organisasi', 'enabled', 1, '2026-05-05 08:06:06'),
(1113, 'individual', NULL, 11, 'event', 'disabled', 1, '2026-05-05 08:06:06'),
(1114, 'individual', NULL, 11, 'pelanggaran', 'disabled', 1, '2026-05-05 08:06:06'),
(1115, 'individual', NULL, 11, 'perilaku', 'disabled', 1, '2026-05-05 08:06:06'),
(1116, 'individual', NULL, 3, 'prestasi', 'enabled', 1, '2026-05-05 08:06:06'),
(1117, 'individual', NULL, 3, 'organisasi', 'enabled', 1, '2026-05-05 08:06:06'),
(1118, 'individual', NULL, 3, 'event', 'disabled', 1, '2026-05-05 08:06:06'),
(1119, 'individual', NULL, 3, 'pelanggaran', 'disabled', 1, '2026-05-05 08:06:06'),
(1120, 'individual', NULL, 3, 'perilaku', 'disabled', 1, '2026-05-05 08:06:06'),
(1121, 'individual', NULL, 7, 'prestasi', 'enabled', 1, '2026-05-05 08:06:06'),
(1122, 'individual', NULL, 7, 'organisasi', 'enabled', 1, '2026-05-05 08:06:06'),
(1123, 'individual', NULL, 7, 'event', 'disabled', 1, '2026-05-05 08:06:06'),
(1124, 'individual', NULL, 7, 'pelanggaran', 'disabled', 1, '2026-05-05 08:06:06'),
(1125, 'individual', NULL, 7, 'perilaku', 'disabled', 1, '2026-05-05 08:06:06'),
(1126, 'individual', NULL, 14, 'prestasi', 'enabled', 1, '2026-05-05 08:06:06'),
(1127, 'individual', NULL, 14, 'organisasi', 'enabled', 1, '2026-05-05 08:06:06'),
(1128, 'individual', NULL, 14, 'event', 'disabled', 1, '2026-05-05 08:06:06'),
(1129, 'individual', NULL, 14, 'pelanggaran', 'disabled', 1, '2026-05-05 08:06:06'),
(1130, 'individual', NULL, 14, 'perilaku', 'disabled', 1, '2026-05-05 08:06:06'),
(1131, 'individual', NULL, 10, 'prestasi', 'enabled', 1, '2026-05-05 08:06:06'),
(1132, 'individual', NULL, 10, 'organisasi', 'enabled', 1, '2026-05-05 08:06:06'),
(1133, 'individual', NULL, 10, 'event', 'disabled', 1, '2026-05-05 08:06:06'),
(1134, 'individual', NULL, 10, 'pelanggaran', 'disabled', 1, '2026-05-05 08:06:06'),
(1135, 'individual', NULL, 10, 'perilaku', 'disabled', 1, '2026-05-05 08:06:06'),
(1136, 'individual', NULL, 6, 'prestasi', 'enabled', 1, '2026-05-05 08:06:06'),
(1137, 'individual', NULL, 6, 'organisasi', 'enabled', 1, '2026-05-05 08:06:06'),
(1138, 'individual', NULL, 6, 'event', 'disabled', 1, '2026-05-05 08:06:06'),
(1139, 'individual', NULL, 6, 'pelanggaran', 'disabled', 1, '2026-05-05 08:06:06'),
(1140, 'individual', NULL, 6, 'perilaku', 'disabled', 1, '2026-05-05 08:06:06'),
(1141, 'individual', NULL, 8, 'prestasi', 'enabled', 1, '2026-05-05 08:06:06'),
(1142, 'individual', NULL, 8, 'organisasi', 'enabled', 1, '2026-05-05 08:06:06'),
(1143, 'individual', NULL, 8, 'event', 'disabled', 1, '2026-05-05 08:06:06'),
(1144, 'individual', NULL, 8, 'pelanggaran', 'disabled', 1, '2026-05-05 08:06:06'),
(1145, 'individual', NULL, 8, 'perilaku', 'disabled', 1, '2026-05-05 08:06:06'),
(1146, 'individual', NULL, 12, 'prestasi', 'enabled', 1, '2026-05-05 08:06:06'),
(1147, 'individual', NULL, 12, 'organisasi', 'enabled', 1, '2026-05-05 08:06:06'),
(1148, 'individual', NULL, 12, 'event', 'disabled', 1, '2026-05-05 08:06:06'),
(1149, 'individual', NULL, 12, 'pelanggaran', 'disabled', 1, '2026-05-05 08:06:06'),
(1150, 'individual', NULL, 12, 'perilaku', 'disabled', 1, '2026-05-05 08:06:06'),
(1151, 'individual', NULL, 13, 'prestasi', 'enabled', 1, '2026-05-05 08:06:06'),
(1152, 'individual', NULL, 13, 'organisasi', 'enabled', 1, '2026-05-05 08:06:06'),
(1153, 'individual', NULL, 13, 'event', 'disabled', 1, '2026-05-05 08:06:06'),
(1154, 'individual', NULL, 13, 'pelanggaran', 'disabled', 1, '2026-05-05 08:06:06'),
(1155, 'individual', NULL, 13, 'perilaku', 'disabled', 1, '2026-05-05 08:06:06'),
(1156, 'individual', NULL, 11, 'prestasi', 'enabled', 1, '2026-05-05 08:06:07'),
(1157, 'individual', NULL, 11, 'organisasi', 'enabled', 1, '2026-05-05 08:06:07'),
(1158, 'individual', NULL, 11, 'event', 'enabled', 1, '2026-05-05 08:06:07'),
(1159, 'individual', NULL, 11, 'pelanggaran', 'disabled', 1, '2026-05-05 08:06:07'),
(1160, 'individual', NULL, 11, 'perilaku', 'disabled', 1, '2026-05-05 08:06:07'),
(1161, 'individual', NULL, 3, 'prestasi', 'enabled', 1, '2026-05-05 08:06:08'),
(1162, 'individual', NULL, 3, 'organisasi', 'enabled', 1, '2026-05-05 08:06:08'),
(1163, 'individual', NULL, 3, 'event', 'enabled', 1, '2026-05-05 08:06:08'),
(1164, 'individual', NULL, 3, 'pelanggaran', 'disabled', 1, '2026-05-05 08:06:08'),
(1165, 'individual', NULL, 3, 'perilaku', 'disabled', 1, '2026-05-05 08:06:08'),
(1166, 'individual', NULL, 7, 'prestasi', 'enabled', 1, '2026-05-05 08:06:08'),
(1167, 'individual', NULL, 7, 'organisasi', 'enabled', 1, '2026-05-05 08:06:08'),
(1168, 'individual', NULL, 7, 'event', 'enabled', 1, '2026-05-05 08:06:08'),
(1169, 'individual', NULL, 7, 'pelanggaran', 'disabled', 1, '2026-05-05 08:06:08'),
(1170, 'individual', NULL, 7, 'perilaku', 'disabled', 1, '2026-05-05 08:06:08'),
(1171, 'individual', NULL, 14, 'prestasi', 'enabled', 1, '2026-05-05 08:06:08'),
(1172, 'individual', NULL, 14, 'organisasi', 'enabled', 1, '2026-05-05 08:06:08'),
(1173, 'individual', NULL, 14, 'event', 'enabled', 1, '2026-05-05 08:06:08'),
(1174, 'individual', NULL, 14, 'pelanggaran', 'disabled', 1, '2026-05-05 08:06:08'),
(1175, 'individual', NULL, 14, 'perilaku', 'disabled', 1, '2026-05-05 08:06:08'),
(1176, 'individual', NULL, 10, 'prestasi', 'enabled', 1, '2026-05-05 08:06:08'),
(1177, 'individual', NULL, 10, 'organisasi', 'enabled', 1, '2026-05-05 08:06:08'),
(1178, 'individual', NULL, 10, 'event', 'enabled', 1, '2026-05-05 08:06:08'),
(1179, 'individual', NULL, 10, 'pelanggaran', 'disabled', 1, '2026-05-05 08:06:08'),
(1180, 'individual', NULL, 10, 'perilaku', 'disabled', 1, '2026-05-05 08:06:08'),
(1181, 'individual', NULL, 6, 'prestasi', 'enabled', 1, '2026-05-05 08:06:08'),
(1182, 'individual', NULL, 6, 'organisasi', 'enabled', 1, '2026-05-05 08:06:08'),
(1183, 'individual', NULL, 6, 'event', 'enabled', 1, '2026-05-05 08:06:08'),
(1184, 'individual', NULL, 6, 'pelanggaran', 'disabled', 1, '2026-05-05 08:06:08'),
(1185, 'individual', NULL, 6, 'perilaku', 'disabled', 1, '2026-05-05 08:06:08'),
(1186, 'individual', NULL, 8, 'prestasi', 'enabled', 1, '2026-05-05 08:06:08'),
(1187, 'individual', NULL, 8, 'organisasi', 'enabled', 1, '2026-05-05 08:06:08'),
(1188, 'individual', NULL, 8, 'event', 'enabled', 1, '2026-05-05 08:06:08'),
(1189, 'individual', NULL, 8, 'pelanggaran', 'disabled', 1, '2026-05-05 08:06:08'),
(1190, 'individual', NULL, 8, 'perilaku', 'disabled', 1, '2026-05-05 08:06:08'),
(1191, 'individual', NULL, 12, 'prestasi', 'enabled', 1, '2026-05-05 08:06:08'),
(1192, 'individual', NULL, 12, 'organisasi', 'enabled', 1, '2026-05-05 08:06:08'),
(1193, 'individual', NULL, 12, 'event', 'enabled', 1, '2026-05-05 08:06:08'),
(1194, 'individual', NULL, 12, 'pelanggaran', 'disabled', 1, '2026-05-05 08:06:08'),
(1195, 'individual', NULL, 12, 'perilaku', 'disabled', 1, '2026-05-05 08:06:08'),
(1196, 'individual', NULL, 13, 'prestasi', 'enabled', 1, '2026-05-05 08:06:08'),
(1197, 'individual', NULL, 13, 'organisasi', 'enabled', 1, '2026-05-05 08:06:08'),
(1198, 'individual', NULL, 13, 'event', 'enabled', 1, '2026-05-05 08:06:08'),
(1199, 'individual', NULL, 13, 'pelanggaran', 'disabled', 1, '2026-05-05 08:06:08'),
(1200, 'individual', NULL, 13, 'perilaku', 'disabled', 1, '2026-05-05 08:06:08');

-- --------------------------------------------------------

--
-- Table structure for table `ipc_history`
--

CREATE TABLE `ipc_history` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `jenis_perubahan` enum('prestasi','organisasi','event','pelanggaran','perilaku','initial','manual') NOT NULL,
  `point_change` int(11) NOT NULL,
  `ipc_sebelum` int(11) NOT NULL,
  `ipc_sesudah` int(11) NOT NULL,
  `keterangan` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `ipc_history`
--

INSERT INTO `ipc_history` (`id`, `user_id`, `jenis_perubahan`, `point_change`, `ipc_sebelum`, `ipc_sesudah`, `keterangan`, `created_at`) VALUES
(2, 3, 'initial', 80, 0, 80, 'IPC awal diberikan', '2026-05-01 02:33:49'),
(3, 6, 'initial', 80, 0, 80, 'IPC awal diberikan', '2026-05-01 05:02:19'),
(4, 7, 'initial', 80, 0, 80, 'IPC awal diberikan', '2026-05-01 05:37:52'),
(5, 8, 'initial', 80, 0, 80, 'IPC awal diberikan', '2026-05-01 08:19:15'),
(6, 10, 'initial', 80, 0, 80, 'IPC awal diberikan', '2026-05-01 08:39:56'),
(7, 1, 'prestasi', 20, 0, 20, 'Poin dari Prestasi: juara 1', '2026-05-02 06:52:32'),
(8, 11, 'initial', 80, 0, 80, 'IPC awal diberikan', '2026-05-02 07:21:34'),
(9, 12, 'initial', 80, 0, 80, 'IPC awal diberikan', '2026-05-02 07:49:48'),
(10, 13, 'initial', 80, 0, 80, 'IPC awal diberikan', '2026-05-02 07:49:51'),
(11, 6, 'prestasi', 0, 80, 80, 'Poin dari Prestasi: juara harapan 1', '2026-05-02 07:53:31'),
(12, 14, 'initial', 80, 0, 80, 'IPC awal diberikan', '2026-05-02 08:27:53'),
(13, 14, 'organisasi', 6, 80, 86, 'Poin dari Organisasi: ketua', '2026-05-02 08:34:20'),
(14, 14, 'event', 4, 86, 90, 'Poin dari Event: kecamatan', '2026-05-02 09:03:50'),
(15, 14, 'prestasi', 0, 90, 90, 'Poin dari Prestasi: juara harapan 1', '2026-05-02 09:04:02'),
(16, 14, 'prestasi', 10, 90, 100, 'Poin dari Prestasi: juara 3', '2026-05-03 07:33:49'),
(17, 6, 'prestasi', 10, 80, 90, 'Poin dari Prestasi: juara 3', '2026-05-03 08:18:19'),
(18, 14, 'prestasi', 15, 100, 115, 'Poin dari Prestasi: juara 2', '2026-05-03 09:26:50'),
(19, 14, 'prestasi', 15, 115, 130, 'Poin dari Prestasi: juara 2', '2026-05-03 10:29:50'),
(20, 14, 'organisasi', 1, 130, 131, 'Poin dari Organisasi: anggota', '2026-05-03 10:29:55'),
(21, 14, 'prestasi', 0, 131, 131, 'Poin dari Prestasi: peserta', '2026-05-05 07:58:56'),
(22, 14, 'prestasi', 10, 131, 141, 'Poin dari Prestasi: juara 3', '2026-05-05 08:01:37'),
(23, 14, 'prestasi', 20, 141, 161, 'Poin dari Prestasi: juara 1', '2026-05-14 06:43:56'),
(24, 17, 'initial', 80, 0, 80, 'IPC awal diberikan', '2026-05-14 06:44:28'),
(25, 14, 'prestasi', 0, 161, 161, 'Poin dari Prestasi: peserta', '2026-05-14 06:49:37'),
(26, 14, 'prestasi', 20, 161, 181, 'Poin dari Prestasi: juara 1', '2026-05-14 06:54:59'),
(27, 14, 'prestasi', 20, 181, 201, 'Poin dari Prestasi: juara 1', '2026-05-14 06:55:01'),
(28, 14, 'prestasi', 20, 201, 221, 'Poin dari Prestasi: juara 1', '2026-05-14 06:55:11'),
(29, 14, 'prestasi', 20, 221, 241, 'Poin dari Prestasi: juara 1', '2026-05-14 06:55:13'),
(30, 3, 'manual', 0, 80, 80, 'Manual adjustment by superadmin', '2026-05-25 23:04:09'),
(31, 3, 'manual', -50, 80, 30, 'Manual adjustment by superadmin', '2026-05-25 23:04:18');

-- --------------------------------------------------------

--
-- Table structure for table `notifications`
--

CREATE TABLE `notifications` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `type` varchar(50) NOT NULL,
  `title` varchar(255) NOT NULL,
  `message` text NOT NULL,
  `related_id` int(11) DEFAULT NULL,
  `related_type` enum('prestasi','event','organisasi','siswa') NOT NULL,
  `is_read` tinyint(1) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `notifications`
--

INSERT INTO `notifications` (`id`, `user_id`, `type`, `title`, `message`, `related_id`, `related_type`, `is_read`, `created_at`) VALUES
(1, 5, 'approval_needed', 'Persetujuan Prestasi', 'kariada (1208) mengajukan prestasi: lomba pejgan', 1, 'prestasi', 1, '2026-05-02 06:28:42'),
(2, 1, 'new_submission', 'Pengajuan Prestasi Baru', 'kariada (1208) mengajukan prestasi: lomba pejgan', 1, 'prestasi', 0, '2026-05-02 06:28:42'),
(3, 1, 'pembina_approved', 'Persetujuan Pembina', 'Pengajuan Anda telah disetujui oleh Pembina dan menunggu persetujuan SuperAdmin', 1, 'prestasi', 0, '2026-05-02 06:41:50'),
(4, 1, 'approved', 'Pengajuan Disetujui', 'Selamat! Pengajuan Prestasi Anda telah disetujui dan poin telah ditambahkan.', 1, 'prestasi', 0, '2026-05-02 06:52:32'),
(5, 1, 'approval_needed', 'Persetujuan Pembuatan Akun Siswa', 'Guru mengajukan pembuatan akun siswa: wwdw (123212)', 1, '', 0, '2026-05-02 07:33:44'),
(6, 1, 'approval_needed', 'Persetujuan Update Biodata', 'Guru mengajukan perubahan biodata untuk siswa: agus (123124)', 1, '', 0, '2026-05-02 07:38:24'),
(7, 1, 'approval_needed', 'Persetujuan Pembuatan Akun Siswa', 'Guru mengajukan pembuatan akun siswa: wdwd (wdwd)', 2, '', 0, '2026-05-02 07:42:12'),
(8, 1, 'approval_needed', 'Persetujuan Update Biodata', 'Guru mengajukan perubahan biodata untuk siswa: agus (123124)', 2, '', 0, '2026-05-02 07:46:32'),
(9, 3, 'approved', 'Biodata Diperbarui', 'Biodata Anda telah berhasil diperbarui oleh SuperAdmin.', 2, '', 0, '2026-05-02 07:49:38'),
(10, 3, 'approved', 'Biodata Diperbarui', 'Biodata Anda telah berhasil diperbarui oleh SuperAdmin.', 1, '', 0, '2026-05-02 07:49:43'),
(11, 5, 'approved', 'Pembuatan Akun Siswa Disetujui', 'Pembuatan akun siswa wdwd (wdwd) telah disetujui oleh SuperAdmin.', 2, '', 1, '2026-05-02 07:49:48'),
(12, 5, 'approved', 'Pembuatan Akun Siswa Disetujui', 'Pembuatan akun siswa wwdw (123212) telah disetujui oleh SuperAdmin.', 1, '', 1, '2026-05-02 07:49:51'),
(13, 1, 'approval_needed', 'Persetujuan Update Biodata', 'Guru mengajukan perubahan biodata untuk siswa: wdwd (wdwd)', 3, '', 0, '2026-05-02 07:50:30'),
(14, 12, 'approved', 'Biodata Diperbarui', 'Biodata Anda telah berhasil diperbarui oleh SuperAdmin.', 3, '', 0, '2026-05-02 07:50:50'),
(15, 5, 'approval_needed', 'Persetujuan Prestasi', 'kariada (1208) mengajukan prestasi: lomba untuk dapetin elf', 2, 'prestasi', 1, '2026-05-02 07:52:44'),
(16, 1, 'new_submission', 'Pengajuan Prestasi Baru', 'kariada (1208) mengajukan prestasi: lomba untuk dapetin elf', 2, 'prestasi', 0, '2026-05-02 07:52:44'),
(17, 6, 'pembina_approved', 'Persetujuan Pembina', 'Pengajuan Anda telah disetujui oleh Pembina dan menunggu persetujuan SuperAdmin', 2, 'prestasi', 1, '2026-05-02 07:53:08'),
(18, 6, 'approved', 'Pengajuan Disetujui', 'Selamat! Pengajuan Prestasi Anda telah disetujui dan poin telah ditambahkan.', 2, 'prestasi', 1, '2026-05-02 07:53:31'),
(19, 1, 'approval_needed', 'Persetujuan Pembuatan Akun Siswa', 'Guru mengajukan pembuatan akun siswa: dean (4321)', 3, '', 0, '2026-05-02 08:27:14'),
(20, 5, 'approved', 'Pembuatan Akun Siswa Disetujui', 'Pembuatan akun siswa dean (4321) telah disetujui oleh SuperAdmin.', 3, '', 1, '2026-05-02 08:27:53'),
(21, 5, 'approval_needed', 'Persetujuan Organisasi', 'dean (4321) mengajukan organisasi: osis', 1, 'organisasi', 1, '2026-05-02 08:30:56'),
(22, 1, 'new_submission', 'Pengajuan Organisasi Baru', 'dean (4321) mengajukan organisasi: osis', 1, 'organisasi', 0, '2026-05-02 08:30:56'),
(23, 14, 'pembina_approved', 'Persetujuan Pembina', 'Pengajuan Anda telah disetujui oleh Pembina dan menunggu persetujuan SuperAdmin', 1, 'organisasi', 1, '2026-05-02 08:31:20'),
(24, 1, 'approval_needed', 'Persetujuan SuperAdmin Diperlukan', 'Pengajuan organisasi dari dean telah disetujui oleh Pembina dan menunggu persetujuan Anda: osis', 1, 'organisasi', 0, '2026-05-02 08:31:20'),
(25, 14, 'approved', 'Pengajuan Disetujui', 'Selamat! Pengajuan Organisasi Anda telah disetujui dan poin telah ditambahkan.', 1, 'organisasi', 1, '2026-05-02 08:34:20'),
(26, 5, 'approval_needed', 'Persetujuan Prestasi', 'dean (4321) mengajukan prestasi: sdds', 3, 'prestasi', 1, '2026-05-02 08:39:38'),
(27, 1, 'new_submission', 'Pengajuan Prestasi Baru', 'dean (4321) mengajukan prestasi: sdds', 3, 'prestasi', 0, '2026-05-02 08:39:38'),
(28, 14, 'pembina_approved', 'Persetujuan Pembina', 'Pengajuan Anda telah disetujui oleh Pembina dan menunggu persetujuan SuperAdmin', 3, 'prestasi', 1, '2026-05-02 08:50:54'),
(29, 1, 'approval_needed', 'Persetujuan SuperAdmin Diperlukan', 'Pengajuan prestasi dari dean telah disetujui oleh Pembina dan menunggu persetujuan Anda: sdds', 3, 'prestasi', 0, '2026-05-02 08:50:54'),
(30, 5, 'approval_needed', 'Persetujuan Event', 'dean (4321) mengajukan event: edwdwdw', 1, 'event', 1, '2026-05-02 09:00:32'),
(31, 1, 'new_submission', 'Pengajuan Event Baru', 'dean (4321) mengajukan event: edwdwdw', 1, 'event', 0, '2026-05-02 09:00:32'),
(32, 14, 'pembina_approved', 'Persetujuan Pembina', 'Pengajuan Anda telah disetujui oleh Pembina dan menunggu persetujuan SuperAdmin', 1, 'event', 1, '2026-05-02 09:00:48'),
(33, 1, 'approval_needed', 'Persetujuan SuperAdmin Diperlukan', 'Pengajuan event dari dean telah disetujui oleh Pembina dan menunggu persetujuan Anda: edwdwdw', 1, 'event', 0, '2026-05-02 09:00:48'),
(34, 14, 'approved', 'Pengajuan Disetujui', 'Selamat! Pengajuan Event Anda telah disetujui dan poin telah ditambahkan.', 1, 'event', 1, '2026-05-02 09:03:50'),
(35, 14, 'approved', 'Pengajuan Disetujui', 'Selamat! Pengajuan Prestasi Anda telah disetujui dan poin telah ditambahkan.', 3, 'prestasi', 1, '2026-05-02 09:04:02'),
(36, 5, 'approval_needed', 'Persetujuan Prestasi', 'dean (4321) mengajukan prestasi: lomba agyus', 4, 'prestasi', 1, '2026-05-03 07:32:54'),
(37, 1, 'new_submission', 'Pengajuan Prestasi Baru', 'dean (4321) mengajukan prestasi: lomba agyus', 4, 'prestasi', 0, '2026-05-03 07:32:54'),
(38, 14, 'pembina_approved', 'Persetujuan Pembina', 'Pengajuan Anda telah disetujui oleh Pembina dan menunggu persetujuan SuperAdmin', 4, 'prestasi', 1, '2026-05-03 07:33:32'),
(39, 1, 'approval_needed', 'Persetujuan SuperAdmin Diperlukan', 'Pengajuan prestasi dari dean telah disetujui oleh Pembina dan menunggu persetujuan Anda: lomba agyus', 4, 'prestasi', 0, '2026-05-03 07:33:32'),
(40, 14, 'approved', 'Pengajuan Disetujui', 'Selamat! Pengajuan Prestasi Anda telah disetujui dan poin telah ditambahkan.', 4, 'prestasi', 1, '2026-05-03 07:33:49'),
(41, 5, 'approval_needed', 'Persetujuan Prestasi', 'dean (4321) mengajukan prestasi: karaidasss', 5, 'prestasi', 1, '2026-05-03 08:17:37'),
(42, 1, 'new_submission', 'Pengajuan Prestasi Baru', 'dean (4321) mengajukan prestasi: karaidasss', 5, 'prestasi', 0, '2026-05-03 08:17:37'),
(43, 6, 'pembina_approved', 'Persetujuan Pembina', 'Pengajuan Anda telah disetujui oleh Pembina dan menunggu persetujuan SuperAdmin', 5, 'prestasi', 0, '2026-05-03 08:18:01'),
(44, 1, 'approval_needed', 'Persetujuan SuperAdmin Diperlukan', 'Pengajuan prestasi dari dean telah disetujui oleh Pembina dan menunggu persetujuan Anda: karaidasss', 5, 'prestasi', 0, '2026-05-03 08:18:01'),
(45, 6, 'approved', 'Pengajuan Disetujui', 'Selamat! Pengajuan Prestasi Anda telah disetujui dan poin telah ditambahkan.', 5, 'prestasi', 0, '2026-05-03 08:18:19'),
(46, 5, 'approval_needed', 'Persetujuan Prestasi', 'dean (4321) mengajukan prestasi: lomba untuk dapetin elfsdsds', 6, 'prestasi', 1, '2026-05-03 09:25:48'),
(47, 1, 'new_submission', 'Pengajuan Prestasi Baru', 'dean (4321) mengajukan prestasi: lomba untuk dapetin elfsdsds', 6, 'prestasi', 0, '2026-05-03 09:25:48'),
(48, 14, 'pembina_approved', 'Persetujuan Pembina', 'Pengajuan Anda telah disetujui oleh Pembina dan menunggu persetujuan SuperAdmin', 6, 'prestasi', 1, '2026-05-03 09:26:23'),
(49, 1, 'approval_needed', 'Persetujuan SuperAdmin Diperlukan', 'Pengajuan prestasi dari dean telah disetujui oleh Pembina dan menunggu persetujuan Anda: lomba untuk dapetin elfsdsds', 6, 'prestasi', 0, '2026-05-03 09:26:23'),
(50, 14, 'approved', 'Pengajuan Disetujui', 'Selamat! Pengajuan Prestasi Anda telah disetujui dan poin telah ditambahkan.', 6, 'prestasi', 1, '2026-05-03 09:26:50'),
(51, 5, 'approval_needed', 'Persetujuan Prestasi', 'dean (4321) mengajukan prestasi: fefeff', 7, 'prestasi', 1, '2026-05-03 09:30:18'),
(52, 1, 'new_submission', 'Pengajuan Prestasi Baru', 'dean (4321) mengajukan prestasi: fefeff', 7, 'prestasi', 0, '2026-05-03 09:30:18'),
(53, 14, 'pembina_approved', 'Persetujuan Pembina', 'Pengajuan Anda telah disetujui oleh Pembina dan menunggu persetujuan SuperAdmin', 7, 'prestasi', 1, '2026-05-03 09:30:30'),
(54, 1, 'approval_needed', 'Persetujuan SuperAdmin Diperlukan', 'Pengajuan prestasi dari dean telah disetujui oleh Pembina dan menunggu persetujuan Anda: fefeff', 7, 'prestasi', 0, '2026-05-03 09:30:30'),
(55, 5, 'approval_needed', 'Persetujuan Prestasi', 'dean (4321) mengajukan prestasi: lpo', 8, 'prestasi', 1, '2026-05-03 10:25:20'),
(56, 1, 'new_submission', 'Pengajuan Prestasi Baru', 'dean (4321) mengajukan prestasi: lpo', 8, 'prestasi', 0, '2026-05-03 10:25:20'),
(57, 14, 'pembina_approved', 'Persetujuan Pembina', 'Pengajuan Anda telah disetujui oleh Pembina dan menunggu persetujuan SuperAdmin', 8, 'prestasi', 1, '2026-05-03 10:25:50'),
(58, 1, 'approval_needed', 'Persetujuan SuperAdmin Diperlukan', 'Pengajuan prestasi dari dean telah disetujui oleh Pembina dan menunggu persetujuan Anda: lpo', 8, 'prestasi', 0, '2026-05-03 10:25:50'),
(59, 5, 'approval_needed', 'Persetujuan Organisasi', 'dean (4321) mengajukan organisasi: osis', 2, 'organisasi', 1, '2026-05-03 10:27:22'),
(60, 1, 'new_submission', 'Pengajuan Organisasi Baru', 'dean (4321) mengajukan organisasi: osis', 2, 'organisasi', 0, '2026-05-03 10:27:22'),
(61, 14, 'pembina_approved', 'Persetujuan Pembina', 'Pengajuan Anda telah disetujui oleh Pembina dan menunggu persetujuan SuperAdmin', 2, 'organisasi', 1, '2026-05-03 10:27:54'),
(62, 1, 'approval_needed', 'Persetujuan SuperAdmin Diperlukan', 'Pengajuan organisasi dari dean telah disetujui oleh Pembina dan menunggu persetujuan Anda: osis', 2, 'organisasi', 0, '2026-05-03 10:27:54'),
(63, 14, 'rejected', 'Pengajuan Ditolak', 'Pengajuan Anda ditolak oleh SuperAdmin: ok', 7, 'prestasi', 1, '2026-05-03 10:29:36'),
(64, 14, 'approved', 'Pengajuan Disetujui', 'Selamat! Pengajuan Prestasi Anda telah disetujui dan poin telah ditambahkan.', 8, 'prestasi', 1, '2026-05-03 10:29:50'),
(65, 14, 'approved', 'Pengajuan Disetujui', 'Selamat! Pengajuan Organisasi Anda telah disetujui dan poin telah ditambahkan.', 2, 'organisasi', 1, '2026-05-03 10:29:55'),
(66, 3, 'system', '❌ Input Data Dimatikan', 'SuperAdmin telah mematikan input data prestasi. Anda tidak dapat menginput data untuk sementara.', NULL, '', 0, '2026-05-04 00:12:28'),
(67, 5, 'system', '❌ Input Data Dimatikan', 'SuperAdmin telah mematikan input data prestasi. Anda tidak dapat menginput data untuk sementara.', NULL, '', 1, '2026-05-04 00:12:28'),
(68, 6, 'system', '❌ Input Data Dimatikan', 'SuperAdmin telah mematikan input data prestasi. Anda tidak dapat menginput data untuk sementara.', NULL, '', 0, '2026-05-04 00:12:28'),
(69, 7, 'system', '❌ Input Data Dimatikan', 'SuperAdmin telah mematikan input data prestasi. Anda tidak dapat menginput data untuk sementara.', NULL, '', 0, '2026-05-04 00:12:28'),
(70, 8, 'system', '❌ Input Data Dimatikan', 'SuperAdmin telah mematikan input data prestasi. Anda tidak dapat menginput data untuk sementara.', NULL, '', 0, '2026-05-04 00:12:28'),
(71, 9, 'system', '❌ Input Data Dimatikan', 'SuperAdmin telah mematikan input data prestasi. Anda tidak dapat menginput data untuk sementara.', NULL, '', 0, '2026-05-04 00:12:28'),
(72, 10, 'system', '❌ Input Data Dimatikan', 'SuperAdmin telah mematikan input data prestasi. Anda tidak dapat menginput data untuk sementara.', NULL, '', 0, '2026-05-04 00:12:28'),
(73, 11, 'system', '❌ Input Data Dimatikan', 'SuperAdmin telah mematikan input data prestasi. Anda tidak dapat menginput data untuk sementara.', NULL, '', 0, '2026-05-04 00:12:28'),
(74, 12, 'system', '❌ Input Data Dimatikan', 'SuperAdmin telah mematikan input data prestasi. Anda tidak dapat menginput data untuk sementara.', NULL, '', 0, '2026-05-04 00:12:28'),
(75, 13, 'system', '❌ Input Data Dimatikan', 'SuperAdmin telah mematikan input data prestasi. Anda tidak dapat menginput data untuk sementara.', NULL, '', 0, '2026-05-04 00:12:28'),
(76, 14, 'system', '❌ Input Data Dimatikan', 'SuperAdmin telah mematikan input data prestasi. Anda tidak dapat menginput data untuk sementara.', NULL, '', 1, '2026-05-04 00:12:28'),
(77, 3, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data prestasi. Anda sekarang dapat menginput data.', NULL, '', 0, '2026-05-04 00:12:41'),
(78, 5, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data prestasi. Anda sekarang dapat menginput data.', NULL, '', 1, '2026-05-04 00:12:41'),
(79, 6, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data prestasi. Anda sekarang dapat menginput data.', NULL, '', 0, '2026-05-04 00:12:41'),
(80, 7, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data prestasi. Anda sekarang dapat menginput data.', NULL, '', 0, '2026-05-04 00:12:41'),
(81, 8, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data prestasi. Anda sekarang dapat menginput data.', NULL, '', 0, '2026-05-04 00:12:41'),
(82, 9, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data prestasi. Anda sekarang dapat menginput data.', NULL, '', 0, '2026-05-04 00:12:41'),
(83, 10, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data prestasi. Anda sekarang dapat menginput data.', NULL, '', 0, '2026-05-04 00:12:41'),
(84, 11, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data prestasi. Anda sekarang dapat menginput data.', NULL, '', 0, '2026-05-04 00:12:41'),
(85, 12, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data prestasi. Anda sekarang dapat menginput data.', NULL, '', 0, '2026-05-04 00:12:41'),
(86, 13, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data prestasi. Anda sekarang dapat menginput data.', NULL, '', 0, '2026-05-04 00:12:41'),
(87, 14, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data prestasi. Anda sekarang dapat menginput data.', NULL, '', 1, '2026-05-04 00:12:41'),
(88, 3, 'system', '❌ Input Data Dimatikan', 'SuperAdmin telah mematikan input data prestasi untuk Siswa. Anda tidak dapat menginput data untuk sementara.', NULL, '', 0, '2026-05-04 00:12:49'),
(89, 6, 'system', '❌ Input Data Dimatikan', 'SuperAdmin telah mematikan input data prestasi untuk Siswa. Anda tidak dapat menginput data untuk sementara.', NULL, '', 0, '2026-05-04 00:12:49'),
(90, 7, 'system', '❌ Input Data Dimatikan', 'SuperAdmin telah mematikan input data prestasi untuk Siswa. Anda tidak dapat menginput data untuk sementara.', NULL, '', 0, '2026-05-04 00:12:49'),
(91, 8, 'system', '❌ Input Data Dimatikan', 'SuperAdmin telah mematikan input data prestasi untuk Siswa. Anda tidak dapat menginput data untuk sementara.', NULL, '', 0, '2026-05-04 00:12:49'),
(92, 10, 'system', '❌ Input Data Dimatikan', 'SuperAdmin telah mematikan input data prestasi untuk Siswa. Anda tidak dapat menginput data untuk sementara.', NULL, '', 0, '2026-05-04 00:12:49'),
(93, 11, 'system', '❌ Input Data Dimatikan', 'SuperAdmin telah mematikan input data prestasi untuk Siswa. Anda tidak dapat menginput data untuk sementara.', NULL, '', 0, '2026-05-04 00:12:49'),
(94, 12, 'system', '❌ Input Data Dimatikan', 'SuperAdmin telah mematikan input data prestasi untuk Siswa. Anda tidak dapat menginput data untuk sementara.', NULL, '', 0, '2026-05-04 00:12:49'),
(95, 13, 'system', '❌ Input Data Dimatikan', 'SuperAdmin telah mematikan input data prestasi untuk Siswa. Anda tidak dapat menginput data untuk sementara.', NULL, '', 0, '2026-05-04 00:12:49'),
(96, 14, 'system', '❌ Input Data Dimatikan', 'SuperAdmin telah mematikan input data prestasi untuk Siswa. Anda tidak dapat menginput data untuk sementara.', NULL, '', 1, '2026-05-04 00:12:49'),
(97, 3, 'system', '❌ Input Data Dimatikan', 'SuperAdmin telah mematikan input data organisasi untuk Siswa. Anda tidak dapat menginput data untuk sementara.', NULL, '', 0, '2026-05-04 00:12:51'),
(98, 6, 'system', '❌ Input Data Dimatikan', 'SuperAdmin telah mematikan input data organisasi untuk Siswa. Anda tidak dapat menginput data untuk sementara.', NULL, '', 0, '2026-05-04 00:12:51'),
(99, 7, 'system', '❌ Input Data Dimatikan', 'SuperAdmin telah mematikan input data organisasi untuk Siswa. Anda tidak dapat menginput data untuk sementara.', NULL, '', 0, '2026-05-04 00:12:51'),
(100, 8, 'system', '❌ Input Data Dimatikan', 'SuperAdmin telah mematikan input data organisasi untuk Siswa. Anda tidak dapat menginput data untuk sementara.', NULL, '', 0, '2026-05-04 00:12:51'),
(101, 10, 'system', '❌ Input Data Dimatikan', 'SuperAdmin telah mematikan input data organisasi untuk Siswa. Anda tidak dapat menginput data untuk sementara.', NULL, '', 0, '2026-05-04 00:12:51'),
(102, 11, 'system', '❌ Input Data Dimatikan', 'SuperAdmin telah mematikan input data organisasi untuk Siswa. Anda tidak dapat menginput data untuk sementara.', NULL, '', 0, '2026-05-04 00:12:51'),
(103, 12, 'system', '❌ Input Data Dimatikan', 'SuperAdmin telah mematikan input data organisasi untuk Siswa. Anda tidak dapat menginput data untuk sementara.', NULL, '', 0, '2026-05-04 00:12:51'),
(104, 13, 'system', '❌ Input Data Dimatikan', 'SuperAdmin telah mematikan input data organisasi untuk Siswa. Anda tidak dapat menginput data untuk sementara.', NULL, '', 0, '2026-05-04 00:12:51'),
(105, 14, 'system', '❌ Input Data Dimatikan', 'SuperAdmin telah mematikan input data organisasi untuk Siswa. Anda tidak dapat menginput data untuk sementara.', NULL, '', 1, '2026-05-04 00:12:51'),
(106, 3, 'system', '❌ Input Data Dimatikan', 'SuperAdmin telah mematikan input data event untuk Siswa. Anda tidak dapat menginput data untuk sementara.', NULL, '', 0, '2026-05-04 00:12:53'),
(107, 6, 'system', '❌ Input Data Dimatikan', 'SuperAdmin telah mematikan input data event untuk Siswa. Anda tidak dapat menginput data untuk sementara.', NULL, '', 0, '2026-05-04 00:12:53'),
(108, 7, 'system', '❌ Input Data Dimatikan', 'SuperAdmin telah mematikan input data event untuk Siswa. Anda tidak dapat menginput data untuk sementara.', NULL, '', 0, '2026-05-04 00:12:53'),
(109, 8, 'system', '❌ Input Data Dimatikan', 'SuperAdmin telah mematikan input data event untuk Siswa. Anda tidak dapat menginput data untuk sementara.', NULL, '', 0, '2026-05-04 00:12:53'),
(110, 10, 'system', '❌ Input Data Dimatikan', 'SuperAdmin telah mematikan input data event untuk Siswa. Anda tidak dapat menginput data untuk sementara.', NULL, '', 0, '2026-05-04 00:12:53'),
(111, 11, 'system', '❌ Input Data Dimatikan', 'SuperAdmin telah mematikan input data event untuk Siswa. Anda tidak dapat menginput data untuk sementara.', NULL, '', 0, '2026-05-04 00:12:53'),
(112, 12, 'system', '❌ Input Data Dimatikan', 'SuperAdmin telah mematikan input data event untuk Siswa. Anda tidak dapat menginput data untuk sementara.', NULL, '', 0, '2026-05-04 00:12:53'),
(113, 13, 'system', '❌ Input Data Dimatikan', 'SuperAdmin telah mematikan input data event untuk Siswa. Anda tidak dapat menginput data untuk sementara.', NULL, '', 0, '2026-05-04 00:12:53'),
(114, 14, 'system', '❌ Input Data Dimatikan', 'SuperAdmin telah mematikan input data event untuk Siswa. Anda tidak dapat menginput data untuk sementara.', NULL, '', 1, '2026-05-04 00:12:53'),
(115, 5, 'approval_needed', 'Persetujuan Prestasi', 'dean (4321) mengajukan prestasi: lomba pejgan', 9, 'prestasi', 1, '2026-05-04 00:13:34'),
(116, 1, 'new_submission', 'Pengajuan Prestasi Baru', 'dean (4321) mengajukan prestasi: lomba pejgan', 9, 'prestasi', 0, '2026-05-04 00:13:34'),
(117, 3, 'system', '❌ Input Data Dimatikan', 'SuperAdmin telah mematikan input data semua jenis untuk Siswa. Anda tidak dapat menginput data untuk sementara.', NULL, '', 0, '2026-05-04 00:13:55'),
(118, 6, 'system', '❌ Input Data Dimatikan', 'SuperAdmin telah mematikan input data semua jenis untuk Siswa. Anda tidak dapat menginput data untuk sementara.', NULL, '', 0, '2026-05-04 00:13:55'),
(119, 7, 'system', '❌ Input Data Dimatikan', 'SuperAdmin telah mematikan input data semua jenis untuk Siswa. Anda tidak dapat menginput data untuk sementara.', NULL, '', 0, '2026-05-04 00:13:55'),
(120, 8, 'system', '❌ Input Data Dimatikan', 'SuperAdmin telah mematikan input data semua jenis untuk Siswa. Anda tidak dapat menginput data untuk sementara.', NULL, '', 0, '2026-05-04 00:13:55'),
(121, 10, 'system', '❌ Input Data Dimatikan', 'SuperAdmin telah mematikan input data semua jenis untuk Siswa. Anda tidak dapat menginput data untuk sementara.', NULL, '', 0, '2026-05-04 00:13:55'),
(122, 11, 'system', '❌ Input Data Dimatikan', 'SuperAdmin telah mematikan input data semua jenis untuk Siswa. Anda tidak dapat menginput data untuk sementara.', NULL, '', 0, '2026-05-04 00:13:55'),
(123, 12, 'system', '❌ Input Data Dimatikan', 'SuperAdmin telah mematikan input data semua jenis untuk Siswa. Anda tidak dapat menginput data untuk sementara.', NULL, '', 0, '2026-05-04 00:13:55'),
(124, 13, 'system', '❌ Input Data Dimatikan', 'SuperAdmin telah mematikan input data semua jenis untuk Siswa. Anda tidak dapat menginput data untuk sementara.', NULL, '', 0, '2026-05-04 00:13:55'),
(125, 14, 'system', '❌ Input Data Dimatikan', 'SuperAdmin telah mematikan input data semua jenis untuk Siswa. Anda tidak dapat menginput data untuk sementara.', NULL, '', 1, '2026-05-04 00:13:55'),
(126, 3, 'system', '❌ Input Data Dimatikan', 'SuperAdmin telah mematikan input data semua jenis untuk Siswa. Anda tidak dapat menginput data untuk sementara.', NULL, '', 0, '2026-05-04 00:13:59'),
(127, 6, 'system', '❌ Input Data Dimatikan', 'SuperAdmin telah mematikan input data semua jenis untuk Siswa. Anda tidak dapat menginput data untuk sementara.', NULL, '', 0, '2026-05-04 00:13:59'),
(128, 7, 'system', '❌ Input Data Dimatikan', 'SuperAdmin telah mematikan input data semua jenis untuk Siswa. Anda tidak dapat menginput data untuk sementara.', NULL, '', 0, '2026-05-04 00:13:59'),
(129, 8, 'system', '❌ Input Data Dimatikan', 'SuperAdmin telah mematikan input data semua jenis untuk Siswa. Anda tidak dapat menginput data untuk sementara.', NULL, '', 0, '2026-05-04 00:13:59'),
(130, 10, 'system', '❌ Input Data Dimatikan', 'SuperAdmin telah mematikan input data semua jenis untuk Siswa. Anda tidak dapat menginput data untuk sementara.', NULL, '', 0, '2026-05-04 00:13:59'),
(131, 11, 'system', '❌ Input Data Dimatikan', 'SuperAdmin telah mematikan input data semua jenis untuk Siswa. Anda tidak dapat menginput data untuk sementara.', NULL, '', 0, '2026-05-04 00:13:59'),
(132, 12, 'system', '❌ Input Data Dimatikan', 'SuperAdmin telah mematikan input data semua jenis untuk Siswa. Anda tidak dapat menginput data untuk sementara.', NULL, '', 0, '2026-05-04 00:13:59'),
(133, 13, 'system', '❌ Input Data Dimatikan', 'SuperAdmin telah mematikan input data semua jenis untuk Siswa. Anda tidak dapat menginput data untuk sementara.', NULL, '', 0, '2026-05-04 00:13:59'),
(134, 14, 'system', '❌ Input Data Dimatikan', 'SuperAdmin telah mematikan input data semua jenis untuk Siswa. Anda tidak dapat menginput data untuk sementara.', NULL, '', 1, '2026-05-04 00:13:59'),
(135, 3, 'system', '❌ Input Data Dimatikan', 'SuperAdmin telah mematikan input data semua jenis untuk Siswa. Anda tidak dapat menginput data untuk sementara.', NULL, '', 0, '2026-05-04 00:14:03'),
(136, 6, 'system', '❌ Input Data Dimatikan', 'SuperAdmin telah mematikan input data semua jenis untuk Siswa. Anda tidak dapat menginput data untuk sementara.', NULL, '', 0, '2026-05-04 00:14:03'),
(137, 7, 'system', '❌ Input Data Dimatikan', 'SuperAdmin telah mematikan input data semua jenis untuk Siswa. Anda tidak dapat menginput data untuk sementara.', NULL, '', 0, '2026-05-04 00:14:03'),
(138, 8, 'system', '❌ Input Data Dimatikan', 'SuperAdmin telah mematikan input data semua jenis untuk Siswa. Anda tidak dapat menginput data untuk sementara.', NULL, '', 0, '2026-05-04 00:14:03'),
(139, 10, 'system', '❌ Input Data Dimatikan', 'SuperAdmin telah mematikan input data semua jenis untuk Siswa. Anda tidak dapat menginput data untuk sementara.', NULL, '', 0, '2026-05-04 00:14:03'),
(140, 11, 'system', '❌ Input Data Dimatikan', 'SuperAdmin telah mematikan input data semua jenis untuk Siswa. Anda tidak dapat menginput data untuk sementara.', NULL, '', 0, '2026-05-04 00:14:03'),
(141, 12, 'system', '❌ Input Data Dimatikan', 'SuperAdmin telah mematikan input data semua jenis untuk Siswa. Anda tidak dapat menginput data untuk sementara.', NULL, '', 0, '2026-05-04 00:14:03'),
(142, 13, 'system', '❌ Input Data Dimatikan', 'SuperAdmin telah mematikan input data semua jenis untuk Siswa. Anda tidak dapat menginput data untuk sementara.', NULL, '', 0, '2026-05-04 00:14:03'),
(143, 14, 'system', '❌ Input Data Dimatikan', 'SuperAdmin telah mematikan input data semua jenis untuk Siswa. Anda tidak dapat menginput data untuk sementara.', NULL, '', 1, '2026-05-04 00:14:03'),
(144, 3, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data semua jenis untuk Siswa. Anda sekarang dapat menginput data.', NULL, '', 0, '2026-05-04 00:14:07'),
(145, 6, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data semua jenis untuk Siswa. Anda sekarang dapat menginput data.', NULL, '', 0, '2026-05-04 00:14:07'),
(146, 7, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data semua jenis untuk Siswa. Anda sekarang dapat menginput data.', NULL, '', 0, '2026-05-04 00:14:07'),
(147, 8, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data semua jenis untuk Siswa. Anda sekarang dapat menginput data.', NULL, '', 0, '2026-05-04 00:14:07'),
(148, 10, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data semua jenis untuk Siswa. Anda sekarang dapat menginput data.', NULL, '', 0, '2026-05-04 00:14:07'),
(149, 11, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data semua jenis untuk Siswa. Anda sekarang dapat menginput data.', NULL, '', 0, '2026-05-04 00:14:07'),
(150, 12, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data semua jenis untuk Siswa. Anda sekarang dapat menginput data.', NULL, '', 0, '2026-05-04 00:14:07'),
(151, 13, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data semua jenis untuk Siswa. Anda sekarang dapat menginput data.', NULL, '', 0, '2026-05-04 00:14:07'),
(152, 14, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data semua jenis untuk Siswa. Anda sekarang dapat menginput data.', NULL, '', 1, '2026-05-04 00:14:07'),
(153, 3, 'system', '❌ Input Data Dimatikan', 'SuperAdmin telah mematikan input data semua jenis untuk Siswa. Anda tidak dapat menginput data untuk sementara.', NULL, '', 0, '2026-05-04 00:14:09'),
(154, 6, 'system', '❌ Input Data Dimatikan', 'SuperAdmin telah mematikan input data semua jenis untuk Siswa. Anda tidak dapat menginput data untuk sementara.', NULL, '', 0, '2026-05-04 00:14:09'),
(155, 7, 'system', '❌ Input Data Dimatikan', 'SuperAdmin telah mematikan input data semua jenis untuk Siswa. Anda tidak dapat menginput data untuk sementara.', NULL, '', 0, '2026-05-04 00:14:09'),
(156, 8, 'system', '❌ Input Data Dimatikan', 'SuperAdmin telah mematikan input data semua jenis untuk Siswa. Anda tidak dapat menginput data untuk sementara.', NULL, '', 0, '2026-05-04 00:14:09'),
(157, 10, 'system', '❌ Input Data Dimatikan', 'SuperAdmin telah mematikan input data semua jenis untuk Siswa. Anda tidak dapat menginput data untuk sementara.', NULL, '', 0, '2026-05-04 00:14:09'),
(158, 11, 'system', '❌ Input Data Dimatikan', 'SuperAdmin telah mematikan input data semua jenis untuk Siswa. Anda tidak dapat menginput data untuk sementara.', NULL, '', 0, '2026-05-04 00:14:09'),
(159, 12, 'system', '❌ Input Data Dimatikan', 'SuperAdmin telah mematikan input data semua jenis untuk Siswa. Anda tidak dapat menginput data untuk sementara.', NULL, '', 0, '2026-05-04 00:14:09'),
(160, 13, 'system', '❌ Input Data Dimatikan', 'SuperAdmin telah mematikan input data semua jenis untuk Siswa. Anda tidak dapat menginput data untuk sementara.', NULL, '', 0, '2026-05-04 00:14:09'),
(161, 14, 'system', '❌ Input Data Dimatikan', 'SuperAdmin telah mematikan input data semua jenis untuk Siswa. Anda tidak dapat menginput data untuk sementara.', NULL, '', 1, '2026-05-04 00:14:09'),
(162, 5, 'approval_needed', 'Persetujuan Prestasi', 'dean (4321) mengajukan prestasi: sdds', 10, 'prestasi', 1, '2026-05-04 00:14:31'),
(163, 1, 'new_submission', 'Pengajuan Prestasi Baru', 'dean (4321) mengajukan prestasi: sdds', 10, 'prestasi', 0, '2026-05-04 00:14:31'),
(164, 9, 'approval_needed', 'Persetujuan Prestasi', 'dean (4321) mengajukan prestasi: ddwdwdw', 11, 'prestasi', 0, '2026-05-04 00:14:54'),
(165, 1, 'new_submission', 'Pengajuan Prestasi Baru', 'dean (4321) mengajukan prestasi: ddwdwdw', 11, 'prestasi', 0, '2026-05-04 00:14:54'),
(166, 3, 'system', '❌ Input Data Dimatikan', 'SuperAdmin telah mematikan input data semua jenis untuk Siswa. Anda tidak dapat menginput data untuk sementara.', NULL, '', 0, '2026-05-04 00:27:03'),
(167, 6, 'system', '❌ Input Data Dimatikan', 'SuperAdmin telah mematikan input data semua jenis untuk Siswa. Anda tidak dapat menginput data untuk sementara.', NULL, '', 0, '2026-05-04 00:27:03'),
(168, 7, 'system', '❌ Input Data Dimatikan', 'SuperAdmin telah mematikan input data semua jenis untuk Siswa. Anda tidak dapat menginput data untuk sementara.', NULL, '', 0, '2026-05-04 00:27:03'),
(169, 8, 'system', '❌ Input Data Dimatikan', 'SuperAdmin telah mematikan input data semua jenis untuk Siswa. Anda tidak dapat menginput data untuk sementara.', NULL, '', 0, '2026-05-04 00:27:03'),
(170, 10, 'system', '❌ Input Data Dimatikan', 'SuperAdmin telah mematikan input data semua jenis untuk Siswa. Anda tidak dapat menginput data untuk sementara.', NULL, '', 0, '2026-05-04 00:27:03'),
(171, 11, 'system', '❌ Input Data Dimatikan', 'SuperAdmin telah mematikan input data semua jenis untuk Siswa. Anda tidak dapat menginput data untuk sementara.', NULL, '', 0, '2026-05-04 00:27:03'),
(172, 12, 'system', '❌ Input Data Dimatikan', 'SuperAdmin telah mematikan input data semua jenis untuk Siswa. Anda tidak dapat menginput data untuk sementara.', NULL, '', 0, '2026-05-04 00:27:03'),
(173, 13, 'system', '❌ Input Data Dimatikan', 'SuperAdmin telah mematikan input data semua jenis untuk Siswa. Anda tidak dapat menginput data untuk sementara.', NULL, '', 0, '2026-05-04 00:27:03'),
(174, 14, 'system', '❌ Input Data Dimatikan', 'SuperAdmin telah mematikan input data semua jenis untuk Siswa. Anda tidak dapat menginput data untuk sementara.', NULL, '', 1, '2026-05-04 00:27:03'),
(175, 3, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data semua jenis untuk Siswa. Anda sekarang dapat menginput data.', NULL, '', 0, '2026-05-04 00:31:16'),
(176, 6, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data semua jenis untuk Siswa. Anda sekarang dapat menginput data.', NULL, '', 0, '2026-05-04 00:31:16'),
(177, 7, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data semua jenis untuk Siswa. Anda sekarang dapat menginput data.', NULL, '', 0, '2026-05-04 00:31:16'),
(178, 8, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data semua jenis untuk Siswa. Anda sekarang dapat menginput data.', NULL, '', 0, '2026-05-04 00:31:16'),
(179, 10, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data semua jenis untuk Siswa. Anda sekarang dapat menginput data.', NULL, '', 0, '2026-05-04 00:31:16'),
(180, 11, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data semua jenis untuk Siswa. Anda sekarang dapat menginput data.', NULL, '', 0, '2026-05-04 00:31:16'),
(181, 12, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data semua jenis untuk Siswa. Anda sekarang dapat menginput data.', NULL, '', 0, '2026-05-04 00:31:16'),
(182, 13, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data semua jenis untuk Siswa. Anda sekarang dapat menginput data.', NULL, '', 0, '2026-05-04 00:31:16'),
(183, 14, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data semua jenis untuk Siswa. Anda sekarang dapat menginput data.', NULL, '', 1, '2026-05-04 00:31:16'),
(184, 3, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data semua jenis untuk Siswa. Anda sekarang dapat menginput data.', NULL, '', 0, '2026-05-04 00:31:52'),
(185, 6, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data semua jenis untuk Siswa. Anda sekarang dapat menginput data.', NULL, '', 0, '2026-05-04 00:31:52'),
(186, 7, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data semua jenis untuk Siswa. Anda sekarang dapat menginput data.', NULL, '', 0, '2026-05-04 00:31:52'),
(187, 8, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data semua jenis untuk Siswa. Anda sekarang dapat menginput data.', NULL, '', 0, '2026-05-04 00:31:52'),
(188, 10, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data semua jenis untuk Siswa. Anda sekarang dapat menginput data.', NULL, '', 0, '2026-05-04 00:31:52'),
(189, 11, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data semua jenis untuk Siswa. Anda sekarang dapat menginput data.', NULL, '', 0, '2026-05-04 00:31:52'),
(190, 12, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data semua jenis untuk Siswa. Anda sekarang dapat menginput data.', NULL, '', 0, '2026-05-04 00:31:52'),
(191, 13, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data semua jenis untuk Siswa. Anda sekarang dapat menginput data.', NULL, '', 0, '2026-05-04 00:31:52'),
(192, 14, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data semua jenis untuk Siswa. Anda sekarang dapat menginput data.', NULL, '', 1, '2026-05-04 00:31:52'),
(193, 3, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data semua jenis untuk Siswa. Anda sekarang dapat menginput data.', NULL, '', 0, '2026-05-04 00:33:33'),
(194, 6, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data semua jenis untuk Siswa. Anda sekarang dapat menginput data.', NULL, '', 0, '2026-05-04 00:33:33'),
(195, 7, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data semua jenis untuk Siswa. Anda sekarang dapat menginput data.', NULL, '', 0, '2026-05-04 00:33:33'),
(196, 8, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data semua jenis untuk Siswa. Anda sekarang dapat menginput data.', NULL, '', 0, '2026-05-04 00:33:33'),
(197, 10, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data semua jenis untuk Siswa. Anda sekarang dapat menginput data.', NULL, '', 0, '2026-05-04 00:33:33'),
(198, 11, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data semua jenis untuk Siswa. Anda sekarang dapat menginput data.', NULL, '', 0, '2026-05-04 00:33:33'),
(199, 12, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data semua jenis untuk Siswa. Anda sekarang dapat menginput data.', NULL, '', 0, '2026-05-04 00:33:33'),
(200, 13, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data semua jenis untuk Siswa. Anda sekarang dapat menginput data.', NULL, '', 0, '2026-05-04 00:33:33'),
(201, 14, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data semua jenis untuk Siswa. Anda sekarang dapat menginput data.', NULL, '', 1, '2026-05-04 00:33:33'),
(202, 3, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data semua jenis untuk Siswa. Anda sekarang dapat menginput data.', NULL, '', 0, '2026-05-04 00:33:34'),
(203, 6, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data semua jenis untuk Siswa. Anda sekarang dapat menginput data.', NULL, '', 0, '2026-05-04 00:33:34'),
(204, 7, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data semua jenis untuk Siswa. Anda sekarang dapat menginput data.', NULL, '', 0, '2026-05-04 00:33:34'),
(205, 8, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data semua jenis untuk Siswa. Anda sekarang dapat menginput data.', NULL, '', 0, '2026-05-04 00:33:34'),
(206, 10, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data semua jenis untuk Siswa. Anda sekarang dapat menginput data.', NULL, '', 0, '2026-05-04 00:33:34'),
(207, 11, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data semua jenis untuk Siswa. Anda sekarang dapat menginput data.', NULL, '', 0, '2026-05-04 00:33:34'),
(208, 12, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data semua jenis untuk Siswa. Anda sekarang dapat menginput data.', NULL, '', 0, '2026-05-04 00:33:34'),
(209, 13, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data semua jenis untuk Siswa. Anda sekarang dapat menginput data.', NULL, '', 0, '2026-05-04 00:33:34'),
(210, 14, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data semua jenis untuk Siswa. Anda sekarang dapat menginput data.', NULL, '', 1, '2026-05-04 00:33:34'),
(211, 3, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data semua jenis untuk Siswa. Anda sekarang dapat menginput data.', NULL, '', 0, '2026-05-04 00:48:06'),
(212, 6, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data semua jenis untuk Siswa. Anda sekarang dapat menginput data.', NULL, '', 0, '2026-05-04 00:48:06'),
(213, 7, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data semua jenis untuk Siswa. Anda sekarang dapat menginput data.', NULL, '', 0, '2026-05-04 00:48:06'),
(214, 8, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data semua jenis untuk Siswa. Anda sekarang dapat menginput data.', NULL, '', 0, '2026-05-04 00:48:06'),
(215, 10, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data semua jenis untuk Siswa. Anda sekarang dapat menginput data.', NULL, '', 0, '2026-05-04 00:48:06'),
(216, 11, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data semua jenis untuk Siswa. Anda sekarang dapat menginput data.', NULL, '', 0, '2026-05-04 00:48:06'),
(217, 12, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data semua jenis untuk Siswa. Anda sekarang dapat menginput data.', NULL, '', 0, '2026-05-04 00:48:06'),
(218, 13, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data semua jenis untuk Siswa. Anda sekarang dapat menginput data.', NULL, '', 0, '2026-05-04 00:48:06'),
(219, 14, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data semua jenis untuk Siswa. Anda sekarang dapat menginput data.', NULL, '', 1, '2026-05-04 00:48:06'),
(220, 3, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data semua jenis untuk Siswa. Anda sekarang dapat menginput data.', NULL, '', 0, '2026-05-04 00:53:25'),
(221, 6, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data semua jenis untuk Siswa. Anda sekarang dapat menginput data.', NULL, '', 0, '2026-05-04 00:53:25'),
(222, 7, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data semua jenis untuk Siswa. Anda sekarang dapat menginput data.', NULL, '', 0, '2026-05-04 00:53:25'),
(223, 8, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data semua jenis untuk Siswa. Anda sekarang dapat menginput data.', NULL, '', 0, '2026-05-04 00:53:25'),
(224, 10, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data semua jenis untuk Siswa. Anda sekarang dapat menginput data.', NULL, '', 0, '2026-05-04 00:53:25'),
(225, 11, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data semua jenis untuk Siswa. Anda sekarang dapat menginput data.', NULL, '', 0, '2026-05-04 00:53:25'),
(226, 12, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data semua jenis untuk Siswa. Anda sekarang dapat menginput data.', NULL, '', 0, '2026-05-04 00:53:25'),
(227, 13, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data semua jenis untuk Siswa. Anda sekarang dapat menginput data.', NULL, '', 0, '2026-05-04 00:53:25'),
(228, 14, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data semua jenis untuk Siswa. Anda sekarang dapat menginput data.', NULL, '', 1, '2026-05-04 00:53:25'),
(229, 3, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data semua jenis untuk Siswa. Anda sekarang dapat menginput data.', NULL, '', 0, '2026-05-04 00:53:26'),
(230, 6, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data semua jenis untuk Siswa. Anda sekarang dapat menginput data.', NULL, '', 0, '2026-05-04 00:53:26'),
(231, 7, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data semua jenis untuk Siswa. Anda sekarang dapat menginput data.', NULL, '', 0, '2026-05-04 00:53:26'),
(232, 8, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data semua jenis untuk Siswa. Anda sekarang dapat menginput data.', NULL, '', 0, '2026-05-04 00:53:26'),
(233, 10, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data semua jenis untuk Siswa. Anda sekarang dapat menginput data.', NULL, '', 0, '2026-05-04 00:53:26'),
(234, 11, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data semua jenis untuk Siswa. Anda sekarang dapat menginput data.', NULL, '', 0, '2026-05-04 00:53:26'),
(235, 12, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data semua jenis untuk Siswa. Anda sekarang dapat menginput data.', NULL, '', 0, '2026-05-04 00:53:26'),
(236, 13, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data semua jenis untuk Siswa. Anda sekarang dapat menginput data.', NULL, '', 0, '2026-05-04 00:53:26'),
(237, 14, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data semua jenis untuk Siswa. Anda sekarang dapat menginput data.', NULL, '', 1, '2026-05-04 00:53:26'),
(238, 3, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data semua jenis untuk Siswa. Anda sekarang dapat menginput data.', NULL, '', 0, '2026-05-04 00:53:27'),
(239, 6, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data semua jenis untuk Siswa. Anda sekarang dapat menginput data.', NULL, '', 0, '2026-05-04 00:53:27'),
(240, 7, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data semua jenis untuk Siswa. Anda sekarang dapat menginput data.', NULL, '', 0, '2026-05-04 00:53:27'),
(241, 8, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data semua jenis untuk Siswa. Anda sekarang dapat menginput data.', NULL, '', 0, '2026-05-04 00:53:27'),
(242, 10, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data semua jenis untuk Siswa. Anda sekarang dapat menginput data.', NULL, '', 0, '2026-05-04 00:53:27'),
(243, 11, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data semua jenis untuk Siswa. Anda sekarang dapat menginput data.', NULL, '', 0, '2026-05-04 00:53:27'),
(244, 12, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data semua jenis untuk Siswa. Anda sekarang dapat menginput data.', NULL, '', 0, '2026-05-04 00:53:27'),
(245, 13, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data semua jenis untuk Siswa. Anda sekarang dapat menginput data.', NULL, '', 0, '2026-05-04 00:53:27'),
(246, 14, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data semua jenis untuk Siswa. Anda sekarang dapat menginput data.', NULL, '', 1, '2026-05-04 00:53:27'),
(247, 3, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data semua jenis untuk Siswa. Anda sekarang dapat menginput data.', NULL, '', 0, '2026-05-04 00:53:27'),
(248, 6, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data semua jenis untuk Siswa. Anda sekarang dapat menginput data.', NULL, '', 0, '2026-05-04 00:53:27'),
(249, 7, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data semua jenis untuk Siswa. Anda sekarang dapat menginput data.', NULL, '', 0, '2026-05-04 00:53:27'),
(250, 8, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data semua jenis untuk Siswa. Anda sekarang dapat menginput data.', NULL, '', 0, '2026-05-04 00:53:27'),
(251, 10, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data semua jenis untuk Siswa. Anda sekarang dapat menginput data.', NULL, '', 0, '2026-05-04 00:53:27'),
(252, 11, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data semua jenis untuk Siswa. Anda sekarang dapat menginput data.', NULL, '', 0, '2026-05-04 00:53:27'),
(253, 12, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data semua jenis untuk Siswa. Anda sekarang dapat menginput data.', NULL, '', 0, '2026-05-04 00:53:27'),
(254, 13, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data semua jenis untuk Siswa. Anda sekarang dapat menginput data.', NULL, '', 0, '2026-05-04 00:53:27'),
(255, 14, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data semua jenis untuk Siswa. Anda sekarang dapat menginput data.', NULL, '', 1, '2026-05-04 00:53:27'),
(256, 3, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data semua jenis untuk Siswa. Anda sekarang dapat menginput data.', NULL, '', 0, '2026-05-04 00:53:27'),
(257, 6, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data semua jenis untuk Siswa. Anda sekarang dapat menginput data.', NULL, '', 0, '2026-05-04 00:53:27'),
(258, 7, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data semua jenis untuk Siswa. Anda sekarang dapat menginput data.', NULL, '', 0, '2026-05-04 00:53:27'),
(259, 8, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data semua jenis untuk Siswa. Anda sekarang dapat menginput data.', NULL, '', 0, '2026-05-04 00:53:27'),
(260, 10, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data semua jenis untuk Siswa. Anda sekarang dapat menginput data.', NULL, '', 0, '2026-05-04 00:53:27'),
(261, 11, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data semua jenis untuk Siswa. Anda sekarang dapat menginput data.', NULL, '', 0, '2026-05-04 00:53:27'),
(262, 12, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data semua jenis untuk Siswa. Anda sekarang dapat menginput data.', NULL, '', 0, '2026-05-04 00:53:27'),
(263, 13, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data semua jenis untuk Siswa. Anda sekarang dapat menginput data.', NULL, '', 0, '2026-05-04 00:53:27'),
(264, 14, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data semua jenis untuk Siswa. Anda sekarang dapat menginput data.', NULL, '', 1, '2026-05-04 00:53:27'),
(265, 3, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data semua jenis untuk Siswa. Anda sekarang dapat menginput data.', NULL, '', 0, '2026-05-04 00:53:27'),
(266, 6, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data semua jenis untuk Siswa. Anda sekarang dapat menginput data.', NULL, '', 0, '2026-05-04 00:53:27'),
(267, 7, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data semua jenis untuk Siswa. Anda sekarang dapat menginput data.', NULL, '', 0, '2026-05-04 00:53:27'),
(268, 8, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data semua jenis untuk Siswa. Anda sekarang dapat menginput data.', NULL, '', 0, '2026-05-04 00:53:27'),
(269, 10, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data semua jenis untuk Siswa. Anda sekarang dapat menginput data.', NULL, '', 0, '2026-05-04 00:53:27'),
(270, 11, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data semua jenis untuk Siswa. Anda sekarang dapat menginput data.', NULL, '', 0, '2026-05-04 00:53:27'),
(271, 12, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data semua jenis untuk Siswa. Anda sekarang dapat menginput data.', NULL, '', 0, '2026-05-04 00:53:27'),
(272, 13, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data semua jenis untuk Siswa. Anda sekarang dapat menginput data.', NULL, '', 0, '2026-05-04 00:53:27'),
(273, 14, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data semua jenis untuk Siswa. Anda sekarang dapat menginput data.', NULL, '', 1, '2026-05-04 00:53:27'),
(274, 3, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data semua jenis untuk Siswa. Anda sekarang dapat menginput data.', NULL, '', 0, '2026-05-04 00:53:27'),
(275, 6, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data semua jenis untuk Siswa. Anda sekarang dapat menginput data.', NULL, '', 0, '2026-05-04 00:53:27'),
(276, 7, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data semua jenis untuk Siswa. Anda sekarang dapat menginput data.', NULL, '', 0, '2026-05-04 00:53:27');
INSERT INTO `notifications` (`id`, `user_id`, `type`, `title`, `message`, `related_id`, `related_type`, `is_read`, `created_at`) VALUES
(277, 8, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data semua jenis untuk Siswa. Anda sekarang dapat menginput data.', NULL, '', 0, '2026-05-04 00:53:27'),
(278, 10, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data semua jenis untuk Siswa. Anda sekarang dapat menginput data.', NULL, '', 0, '2026-05-04 00:53:27'),
(279, 11, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data semua jenis untuk Siswa. Anda sekarang dapat menginput data.', NULL, '', 0, '2026-05-04 00:53:27'),
(280, 12, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data semua jenis untuk Siswa. Anda sekarang dapat menginput data.', NULL, '', 0, '2026-05-04 00:53:27'),
(281, 13, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data semua jenis untuk Siswa. Anda sekarang dapat menginput data.', NULL, '', 0, '2026-05-04 00:53:27'),
(282, 14, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data semua jenis untuk Siswa. Anda sekarang dapat menginput data.', NULL, '', 1, '2026-05-04 00:53:27'),
(283, 3, 'system', '❌ Input Data Dimatikan', 'SuperAdmin telah mematikan input data semua jenis untuk Siswa. Anda tidak dapat menginput data untuk sementara.', NULL, '', 0, '2026-05-04 00:53:29'),
(284, 6, 'system', '❌ Input Data Dimatikan', 'SuperAdmin telah mematikan input data semua jenis untuk Siswa. Anda tidak dapat menginput data untuk sementara.', NULL, '', 0, '2026-05-04 00:53:29'),
(285, 7, 'system', '❌ Input Data Dimatikan', 'SuperAdmin telah mematikan input data semua jenis untuk Siswa. Anda tidak dapat menginput data untuk sementara.', NULL, '', 0, '2026-05-04 00:53:29'),
(286, 8, 'system', '❌ Input Data Dimatikan', 'SuperAdmin telah mematikan input data semua jenis untuk Siswa. Anda tidak dapat menginput data untuk sementara.', NULL, '', 0, '2026-05-04 00:53:29'),
(287, 10, 'system', '❌ Input Data Dimatikan', 'SuperAdmin telah mematikan input data semua jenis untuk Siswa. Anda tidak dapat menginput data untuk sementara.', NULL, '', 0, '2026-05-04 00:53:29'),
(288, 11, 'system', '❌ Input Data Dimatikan', 'SuperAdmin telah mematikan input data semua jenis untuk Siswa. Anda tidak dapat menginput data untuk sementara.', NULL, '', 0, '2026-05-04 00:53:29'),
(289, 12, 'system', '❌ Input Data Dimatikan', 'SuperAdmin telah mematikan input data semua jenis untuk Siswa. Anda tidak dapat menginput data untuk sementara.', NULL, '', 0, '2026-05-04 00:53:29'),
(290, 13, 'system', '❌ Input Data Dimatikan', 'SuperAdmin telah mematikan input data semua jenis untuk Siswa. Anda tidak dapat menginput data untuk sementara.', NULL, '', 0, '2026-05-04 00:53:29'),
(291, 14, 'system', '❌ Input Data Dimatikan', 'SuperAdmin telah mematikan input data semua jenis untuk Siswa. Anda tidak dapat menginput data untuk sementara.', NULL, '', 1, '2026-05-04 00:53:29'),
(292, 3, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data semua jenis untuk Siswa. Anda sekarang dapat menginput data.', NULL, '', 0, '2026-05-04 00:53:30'),
(293, 6, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data semua jenis untuk Siswa. Anda sekarang dapat menginput data.', NULL, '', 0, '2026-05-04 00:53:30'),
(294, 7, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data semua jenis untuk Siswa. Anda sekarang dapat menginput data.', NULL, '', 0, '2026-05-04 00:53:30'),
(295, 8, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data semua jenis untuk Siswa. Anda sekarang dapat menginput data.', NULL, '', 0, '2026-05-04 00:53:30'),
(296, 10, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data semua jenis untuk Siswa. Anda sekarang dapat menginput data.', NULL, '', 0, '2026-05-04 00:53:30'),
(297, 11, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data semua jenis untuk Siswa. Anda sekarang dapat menginput data.', NULL, '', 0, '2026-05-04 00:53:30'),
(298, 12, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data semua jenis untuk Siswa. Anda sekarang dapat menginput data.', NULL, '', 0, '2026-05-04 00:53:30'),
(299, 13, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data semua jenis untuk Siswa. Anda sekarang dapat menginput data.', NULL, '', 0, '2026-05-04 00:53:30'),
(300, 14, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data semua jenis untuk Siswa. Anda sekarang dapat menginput data.', NULL, '', 1, '2026-05-04 00:53:30'),
(301, 3, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data semua jenis untuk Siswa. Anda sekarang dapat menginput data.', NULL, '', 0, '2026-05-04 01:00:50'),
(302, 6, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data semua jenis untuk Siswa. Anda sekarang dapat menginput data.', NULL, '', 0, '2026-05-04 01:00:50'),
(303, 7, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data semua jenis untuk Siswa. Anda sekarang dapat menginput data.', NULL, '', 0, '2026-05-04 01:00:50'),
(304, 8, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data semua jenis untuk Siswa. Anda sekarang dapat menginput data.', NULL, '', 0, '2026-05-04 01:00:50'),
(305, 10, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data semua jenis untuk Siswa. Anda sekarang dapat menginput data.', NULL, '', 0, '2026-05-04 01:00:50'),
(306, 11, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data semua jenis untuk Siswa. Anda sekarang dapat menginput data.', NULL, '', 0, '2026-05-04 01:00:50'),
(307, 12, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data semua jenis untuk Siswa. Anda sekarang dapat menginput data.', NULL, '', 0, '2026-05-04 01:00:50'),
(308, 13, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data semua jenis untuk Siswa. Anda sekarang dapat menginput data.', NULL, '', 0, '2026-05-04 01:00:50'),
(309, 14, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data semua jenis untuk Siswa. Anda sekarang dapat menginput data.', NULL, '', 1, '2026-05-04 01:00:50'),
(310, 3, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data semua jenis untuk Siswa. Anda sekarang dapat menginput data.', NULL, '', 0, '2026-05-04 01:00:53'),
(311, 6, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data semua jenis untuk Siswa. Anda sekarang dapat menginput data.', NULL, '', 0, '2026-05-04 01:00:53'),
(312, 7, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data semua jenis untuk Siswa. Anda sekarang dapat menginput data.', NULL, '', 0, '2026-05-04 01:00:53'),
(313, 8, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data semua jenis untuk Siswa. Anda sekarang dapat menginput data.', NULL, '', 0, '2026-05-04 01:00:53'),
(314, 10, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data semua jenis untuk Siswa. Anda sekarang dapat menginput data.', NULL, '', 0, '2026-05-04 01:00:53'),
(315, 11, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data semua jenis untuk Siswa. Anda sekarang dapat menginput data.', NULL, '', 0, '2026-05-04 01:00:53'),
(316, 12, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data semua jenis untuk Siswa. Anda sekarang dapat menginput data.', NULL, '', 0, '2026-05-04 01:00:53'),
(317, 13, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data semua jenis untuk Siswa. Anda sekarang dapat menginput data.', NULL, '', 0, '2026-05-04 01:00:53'),
(318, 14, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data semua jenis untuk Siswa. Anda sekarang dapat menginput data.', NULL, '', 1, '2026-05-04 01:00:53'),
(319, 3, 'system', '❌ Input Data Dimatikan', 'SuperAdmin telah mematikan input data pelanggaran untuk Siswa. Anda tidak dapat menginput data untuk sementara.', NULL, '', 0, '2026-05-04 01:00:54'),
(320, 6, 'system', '❌ Input Data Dimatikan', 'SuperAdmin telah mematikan input data pelanggaran untuk Siswa. Anda tidak dapat menginput data untuk sementara.', NULL, '', 0, '2026-05-04 01:00:54'),
(321, 7, 'system', '❌ Input Data Dimatikan', 'SuperAdmin telah mematikan input data pelanggaran untuk Siswa. Anda tidak dapat menginput data untuk sementara.', NULL, '', 0, '2026-05-04 01:00:54'),
(322, 8, 'system', '❌ Input Data Dimatikan', 'SuperAdmin telah mematikan input data pelanggaran untuk Siswa. Anda tidak dapat menginput data untuk sementara.', NULL, '', 0, '2026-05-04 01:00:54'),
(323, 10, 'system', '❌ Input Data Dimatikan', 'SuperAdmin telah mematikan input data pelanggaran untuk Siswa. Anda tidak dapat menginput data untuk sementara.', NULL, '', 0, '2026-05-04 01:00:54'),
(324, 11, 'system', '❌ Input Data Dimatikan', 'SuperAdmin telah mematikan input data pelanggaran untuk Siswa. Anda tidak dapat menginput data untuk sementara.', NULL, '', 0, '2026-05-04 01:00:54'),
(325, 12, 'system', '❌ Input Data Dimatikan', 'SuperAdmin telah mematikan input data pelanggaran untuk Siswa. Anda tidak dapat menginput data untuk sementara.', NULL, '', 0, '2026-05-04 01:00:54'),
(326, 13, 'system', '❌ Input Data Dimatikan', 'SuperAdmin telah mematikan input data pelanggaran untuk Siswa. Anda tidak dapat menginput data untuk sementara.', NULL, '', 0, '2026-05-04 01:00:54'),
(327, 14, 'system', '❌ Input Data Dimatikan', 'SuperAdmin telah mematikan input data pelanggaran untuk Siswa. Anda tidak dapat menginput data untuk sementara.', NULL, '', 1, '2026-05-04 01:00:54'),
(328, 3, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data pelanggaran untuk Siswa. Anda sekarang dapat menginput data.', NULL, '', 0, '2026-05-04 01:00:56'),
(329, 6, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data pelanggaran untuk Siswa. Anda sekarang dapat menginput data.', NULL, '', 0, '2026-05-04 01:00:56'),
(330, 7, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data pelanggaran untuk Siswa. Anda sekarang dapat menginput data.', NULL, '', 0, '2026-05-04 01:00:56'),
(331, 8, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data pelanggaran untuk Siswa. Anda sekarang dapat menginput data.', NULL, '', 0, '2026-05-04 01:00:56'),
(332, 10, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data pelanggaran untuk Siswa. Anda sekarang dapat menginput data.', NULL, '', 0, '2026-05-04 01:00:56'),
(333, 11, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data pelanggaran untuk Siswa. Anda sekarang dapat menginput data.', NULL, '', 0, '2026-05-04 01:00:56'),
(334, 12, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data pelanggaran untuk Siswa. Anda sekarang dapat menginput data.', NULL, '', 0, '2026-05-04 01:00:56'),
(335, 13, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data pelanggaran untuk Siswa. Anda sekarang dapat menginput data.', NULL, '', 0, '2026-05-04 01:00:56'),
(336, 14, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data pelanggaran untuk Siswa. Anda sekarang dapat menginput data.', NULL, '', 1, '2026-05-04 01:00:56'),
(337, 3, 'system', '❌ Input Data Dimatikan', 'SuperAdmin telah mematikan input data prestasi untuk Siswa. Anda tidak dapat menginput data untuk sementara.', NULL, '', 0, '2026-05-04 01:00:57'),
(338, 6, 'system', '❌ Input Data Dimatikan', 'SuperAdmin telah mematikan input data prestasi untuk Siswa. Anda tidak dapat menginput data untuk sementara.', NULL, '', 0, '2026-05-04 01:00:57'),
(339, 7, 'system', '❌ Input Data Dimatikan', 'SuperAdmin telah mematikan input data prestasi untuk Siswa. Anda tidak dapat menginput data untuk sementara.', NULL, '', 0, '2026-05-04 01:00:57'),
(340, 8, 'system', '❌ Input Data Dimatikan', 'SuperAdmin telah mematikan input data prestasi untuk Siswa. Anda tidak dapat menginput data untuk sementara.', NULL, '', 0, '2026-05-04 01:00:57'),
(341, 10, 'system', '❌ Input Data Dimatikan', 'SuperAdmin telah mematikan input data prestasi untuk Siswa. Anda tidak dapat menginput data untuk sementara.', NULL, '', 0, '2026-05-04 01:00:57'),
(342, 11, 'system', '❌ Input Data Dimatikan', 'SuperAdmin telah mematikan input data prestasi untuk Siswa. Anda tidak dapat menginput data untuk sementara.', NULL, '', 0, '2026-05-04 01:00:57'),
(343, 12, 'system', '❌ Input Data Dimatikan', 'SuperAdmin telah mematikan input data prestasi untuk Siswa. Anda tidak dapat menginput data untuk sementara.', NULL, '', 0, '2026-05-04 01:00:57'),
(344, 13, 'system', '❌ Input Data Dimatikan', 'SuperAdmin telah mematikan input data prestasi untuk Siswa. Anda tidak dapat menginput data untuk sementara.', NULL, '', 0, '2026-05-04 01:00:57'),
(345, 14, 'system', '❌ Input Data Dimatikan', 'SuperAdmin telah mematikan input data prestasi untuk Siswa. Anda tidak dapat menginput data untuk sementara.', NULL, '', 1, '2026-05-04 01:00:57'),
(346, 3, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data prestasi untuk Siswa. Anda sekarang dapat menginput data.', NULL, '', 0, '2026-05-04 01:00:58'),
(347, 6, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data prestasi untuk Siswa. Anda sekarang dapat menginput data.', NULL, '', 0, '2026-05-04 01:00:58'),
(348, 7, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data prestasi untuk Siswa. Anda sekarang dapat menginput data.', NULL, '', 0, '2026-05-04 01:00:58'),
(349, 8, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data prestasi untuk Siswa. Anda sekarang dapat menginput data.', NULL, '', 0, '2026-05-04 01:00:58'),
(350, 10, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data prestasi untuk Siswa. Anda sekarang dapat menginput data.', NULL, '', 0, '2026-05-04 01:00:58'),
(351, 11, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data prestasi untuk Siswa. Anda sekarang dapat menginput data.', NULL, '', 0, '2026-05-04 01:00:58'),
(352, 12, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data prestasi untuk Siswa. Anda sekarang dapat menginput data.', NULL, '', 0, '2026-05-04 01:00:58'),
(353, 13, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data prestasi untuk Siswa. Anda sekarang dapat menginput data.', NULL, '', 0, '2026-05-04 01:00:58'),
(354, 14, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data prestasi untuk Siswa. Anda sekarang dapat menginput data.', NULL, '', 1, '2026-05-04 01:00:58'),
(355, 3, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data semua jenis untuk Siswa. Anda sekarang dapat menginput data.', NULL, '', 0, '2026-05-04 01:01:04'),
(356, 6, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data semua jenis untuk Siswa. Anda sekarang dapat menginput data.', NULL, '', 0, '2026-05-04 01:01:04'),
(357, 7, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data semua jenis untuk Siswa. Anda sekarang dapat menginput data.', NULL, '', 0, '2026-05-04 01:01:04'),
(358, 8, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data semua jenis untuk Siswa. Anda sekarang dapat menginput data.', NULL, '', 0, '2026-05-04 01:01:04'),
(359, 10, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data semua jenis untuk Siswa. Anda sekarang dapat menginput data.', NULL, '', 0, '2026-05-04 01:01:04'),
(360, 11, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data semua jenis untuk Siswa. Anda sekarang dapat menginput data.', NULL, '', 0, '2026-05-04 01:01:04'),
(361, 12, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data semua jenis untuk Siswa. Anda sekarang dapat menginput data.', NULL, '', 0, '2026-05-04 01:01:04'),
(362, 13, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data semua jenis untuk Siswa. Anda sekarang dapat menginput data.', NULL, '', 0, '2026-05-04 01:01:04'),
(363, 14, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data semua jenis untuk Siswa. Anda sekarang dapat menginput data.', NULL, '', 1, '2026-05-04 01:01:04'),
(364, 3, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data semua jenis untuk Siswa. Anda sekarang dapat menginput data.', NULL, '', 0, '2026-05-04 01:02:11'),
(365, 6, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data semua jenis untuk Siswa. Anda sekarang dapat menginput data.', NULL, '', 0, '2026-05-04 01:02:11'),
(366, 7, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data semua jenis untuk Siswa. Anda sekarang dapat menginput data.', NULL, '', 0, '2026-05-04 01:02:11'),
(367, 8, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data semua jenis untuk Siswa. Anda sekarang dapat menginput data.', NULL, '', 0, '2026-05-04 01:02:11'),
(368, 10, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data semua jenis untuk Siswa. Anda sekarang dapat menginput data.', NULL, '', 0, '2026-05-04 01:02:11'),
(369, 11, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data semua jenis untuk Siswa. Anda sekarang dapat menginput data.', NULL, '', 0, '2026-05-04 01:02:11'),
(370, 12, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data semua jenis untuk Siswa. Anda sekarang dapat menginput data.', NULL, '', 0, '2026-05-04 01:02:11'),
(371, 13, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data semua jenis untuk Siswa. Anda sekarang dapat menginput data.', NULL, '', 0, '2026-05-04 01:02:11'),
(372, 14, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data semua jenis untuk Siswa. Anda sekarang dapat menginput data.', NULL, '', 1, '2026-05-04 01:02:11'),
(373, 3, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data semua jenis untuk Siswa. Anda sekarang dapat menginput data.', NULL, '', 0, '2026-05-04 01:11:06'),
(374, 6, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data semua jenis untuk Siswa. Anda sekarang dapat menginput data.', NULL, '', 0, '2026-05-04 01:11:06'),
(375, 7, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data semua jenis untuk Siswa. Anda sekarang dapat menginput data.', NULL, '', 0, '2026-05-04 01:11:06'),
(376, 8, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data semua jenis untuk Siswa. Anda sekarang dapat menginput data.', NULL, '', 0, '2026-05-04 01:11:06'),
(377, 10, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data semua jenis untuk Siswa. Anda sekarang dapat menginput data.', NULL, '', 0, '2026-05-04 01:11:06'),
(378, 11, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data semua jenis untuk Siswa. Anda sekarang dapat menginput data.', NULL, '', 0, '2026-05-04 01:11:06'),
(379, 12, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data semua jenis untuk Siswa. Anda sekarang dapat menginput data.', NULL, '', 0, '2026-05-04 01:11:06'),
(380, 13, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data semua jenis untuk Siswa. Anda sekarang dapat menginput data.', NULL, '', 0, '2026-05-04 01:11:06'),
(381, 14, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data semua jenis untuk Siswa. Anda sekarang dapat menginput data.', NULL, '', 1, '2026-05-04 01:11:06'),
(382, 3, 'system', '✅ Sistem Di-Reset', 'SuperAdmin telah mereset sistem izin. Semua user sekarang dapat menginput data sesuai pengaturan global.', NULL, '', 0, '2026-05-04 01:18:25'),
(383, 5, 'system', '✅ Sistem Di-Reset', 'SuperAdmin telah mereset sistem izin. Semua user sekarang dapat menginput data sesuai pengaturan global.', NULL, '', 1, '2026-05-04 01:18:25'),
(384, 6, 'system', '✅ Sistem Di-Reset', 'SuperAdmin telah mereset sistem izin. Semua user sekarang dapat menginput data sesuai pengaturan global.', NULL, '', 0, '2026-05-04 01:18:25'),
(385, 7, 'system', '✅ Sistem Di-Reset', 'SuperAdmin telah mereset sistem izin. Semua user sekarang dapat menginput data sesuai pengaturan global.', NULL, '', 0, '2026-05-04 01:18:25'),
(386, 8, 'system', '✅ Sistem Di-Reset', 'SuperAdmin telah mereset sistem izin. Semua user sekarang dapat menginput data sesuai pengaturan global.', NULL, '', 0, '2026-05-04 01:18:25'),
(387, 9, 'system', '✅ Sistem Di-Reset', 'SuperAdmin telah mereset sistem izin. Semua user sekarang dapat menginput data sesuai pengaturan global.', NULL, '', 0, '2026-05-04 01:18:25'),
(388, 10, 'system', '✅ Sistem Di-Reset', 'SuperAdmin telah mereset sistem izin. Semua user sekarang dapat menginput data sesuai pengaturan global.', NULL, '', 0, '2026-05-04 01:18:25'),
(389, 11, 'system', '✅ Sistem Di-Reset', 'SuperAdmin telah mereset sistem izin. Semua user sekarang dapat menginput data sesuai pengaturan global.', NULL, '', 0, '2026-05-04 01:18:25'),
(390, 12, 'system', '✅ Sistem Di-Reset', 'SuperAdmin telah mereset sistem izin. Semua user sekarang dapat menginput data sesuai pengaturan global.', NULL, '', 0, '2026-05-04 01:18:25'),
(391, 13, 'system', '✅ Sistem Di-Reset', 'SuperAdmin telah mereset sistem izin. Semua user sekarang dapat menginput data sesuai pengaturan global.', NULL, '', 0, '2026-05-04 01:18:25'),
(392, 14, 'system', '✅ Sistem Di-Reset', 'SuperAdmin telah mereset sistem izin. Semua user sekarang dapat menginput data sesuai pengaturan global.', NULL, '', 1, '2026-05-04 01:18:25'),
(393, 3, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data semua jenis untuk Siswa. Anda sekarang dapat menginput data.', NULL, '', 0, '2026-05-04 01:19:01'),
(394, 6, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data semua jenis untuk Siswa. Anda sekarang dapat menginput data.', NULL, '', 0, '2026-05-04 01:19:01'),
(395, 7, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data semua jenis untuk Siswa. Anda sekarang dapat menginput data.', NULL, '', 0, '2026-05-04 01:19:01'),
(396, 8, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data semua jenis untuk Siswa. Anda sekarang dapat menginput data.', NULL, '', 0, '2026-05-04 01:19:01'),
(397, 10, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data semua jenis untuk Siswa. Anda sekarang dapat menginput data.', NULL, '', 0, '2026-05-04 01:19:01'),
(398, 11, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data semua jenis untuk Siswa. Anda sekarang dapat menginput data.', NULL, '', 0, '2026-05-04 01:19:01'),
(399, 12, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data semua jenis untuk Siswa. Anda sekarang dapat menginput data.', NULL, '', 0, '2026-05-04 01:19:01'),
(400, 13, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data semua jenis untuk Siswa. Anda sekarang dapat menginput data.', NULL, '', 0, '2026-05-04 01:19:01'),
(401, 14, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data semua jenis untuk Siswa. Anda sekarang dapat menginput data.', NULL, '', 1, '2026-05-04 01:19:01'),
(402, 3, 'system', '❌ Input Data Dimatikan', 'SuperAdmin telah mematikan input data semua jenis untuk Siswa. Anda tidak dapat menginput data untuk sementara.', NULL, '', 0, '2026-05-04 01:19:06'),
(403, 6, 'system', '❌ Input Data Dimatikan', 'SuperAdmin telah mematikan input data semua jenis untuk Siswa. Anda tidak dapat menginput data untuk sementara.', NULL, '', 0, '2026-05-04 01:19:06'),
(404, 7, 'system', '❌ Input Data Dimatikan', 'SuperAdmin telah mematikan input data semua jenis untuk Siswa. Anda tidak dapat menginput data untuk sementara.', NULL, '', 0, '2026-05-04 01:19:06'),
(405, 8, 'system', '❌ Input Data Dimatikan', 'SuperAdmin telah mematikan input data semua jenis untuk Siswa. Anda tidak dapat menginput data untuk sementara.', NULL, '', 0, '2026-05-04 01:19:06'),
(406, 10, 'system', '❌ Input Data Dimatikan', 'SuperAdmin telah mematikan input data semua jenis untuk Siswa. Anda tidak dapat menginput data untuk sementara.', NULL, '', 0, '2026-05-04 01:19:06'),
(407, 11, 'system', '❌ Input Data Dimatikan', 'SuperAdmin telah mematikan input data semua jenis untuk Siswa. Anda tidak dapat menginput data untuk sementara.', NULL, '', 0, '2026-05-04 01:19:06'),
(408, 12, 'system', '❌ Input Data Dimatikan', 'SuperAdmin telah mematikan input data semua jenis untuk Siswa. Anda tidak dapat menginput data untuk sementara.', NULL, '', 0, '2026-05-04 01:19:06'),
(409, 13, 'system', '❌ Input Data Dimatikan', 'SuperAdmin telah mematikan input data semua jenis untuk Siswa. Anda tidak dapat menginput data untuk sementara.', NULL, '', 0, '2026-05-04 01:19:06'),
(410, 14, 'system', '❌ Input Data Dimatikan', 'SuperAdmin telah mematikan input data semua jenis untuk Siswa. Anda tidak dapat menginput data untuk sementara.', NULL, '', 1, '2026-05-04 01:19:06'),
(411, 3, 'system', '❌ Input Data Dimatikan', 'SuperAdmin telah mematikan input data semua jenis untuk Siswa. Anda tidak dapat menginput data untuk sementara.', NULL, '', 0, '2026-05-04 01:22:44'),
(412, 6, 'system', '❌ Input Data Dimatikan', 'SuperAdmin telah mematikan input data semua jenis untuk Siswa. Anda tidak dapat menginput data untuk sementara.', NULL, '', 0, '2026-05-04 01:22:44'),
(413, 7, 'system', '❌ Input Data Dimatikan', 'SuperAdmin telah mematikan input data semua jenis untuk Siswa. Anda tidak dapat menginput data untuk sementara.', NULL, '', 0, '2026-05-04 01:22:44'),
(414, 8, 'system', '❌ Input Data Dimatikan', 'SuperAdmin telah mematikan input data semua jenis untuk Siswa. Anda tidak dapat menginput data untuk sementara.', NULL, '', 0, '2026-05-04 01:22:44'),
(415, 10, 'system', '❌ Input Data Dimatikan', 'SuperAdmin telah mematikan input data semua jenis untuk Siswa. Anda tidak dapat menginput data untuk sementara.', NULL, '', 0, '2026-05-04 01:22:44'),
(416, 11, 'system', '❌ Input Data Dimatikan', 'SuperAdmin telah mematikan input data semua jenis untuk Siswa. Anda tidak dapat menginput data untuk sementara.', NULL, '', 0, '2026-05-04 01:22:44'),
(417, 12, 'system', '❌ Input Data Dimatikan', 'SuperAdmin telah mematikan input data semua jenis untuk Siswa. Anda tidak dapat menginput data untuk sementara.', NULL, '', 0, '2026-05-04 01:22:44'),
(418, 13, 'system', '❌ Input Data Dimatikan', 'SuperAdmin telah mematikan input data semua jenis untuk Siswa. Anda tidak dapat menginput data untuk sementara.', NULL, '', 0, '2026-05-04 01:22:44'),
(419, 14, 'system', '❌ Input Data Dimatikan', 'SuperAdmin telah mematikan input data semua jenis untuk Siswa. Anda tidak dapat menginput data untuk sementara.', NULL, '', 1, '2026-05-04 01:22:44'),
(420, 3, 'system', '✅ Sistem Di-Reset', 'SuperAdmin telah mereset sistem izin. Semua user sekarang dapat menginput data sesuai pengaturan global.', NULL, '', 0, '2026-05-04 01:23:22'),
(421, 5, 'system', '✅ Sistem Di-Reset', 'SuperAdmin telah mereset sistem izin. Semua user sekarang dapat menginput data sesuai pengaturan global.', NULL, '', 1, '2026-05-04 01:23:22'),
(422, 6, 'system', '✅ Sistem Di-Reset', 'SuperAdmin telah mereset sistem izin. Semua user sekarang dapat menginput data sesuai pengaturan global.', NULL, '', 0, '2026-05-04 01:23:22'),
(423, 7, 'system', '✅ Sistem Di-Reset', 'SuperAdmin telah mereset sistem izin. Semua user sekarang dapat menginput data sesuai pengaturan global.', NULL, '', 0, '2026-05-04 01:23:22'),
(424, 8, 'system', '✅ Sistem Di-Reset', 'SuperAdmin telah mereset sistem izin. Semua user sekarang dapat menginput data sesuai pengaturan global.', NULL, '', 0, '2026-05-04 01:23:22'),
(425, 9, 'system', '✅ Sistem Di-Reset', 'SuperAdmin telah mereset sistem izin. Semua user sekarang dapat menginput data sesuai pengaturan global.', NULL, '', 0, '2026-05-04 01:23:22'),
(426, 10, 'system', '✅ Sistem Di-Reset', 'SuperAdmin telah mereset sistem izin. Semua user sekarang dapat menginput data sesuai pengaturan global.', NULL, '', 0, '2026-05-04 01:23:22'),
(427, 11, 'system', '✅ Sistem Di-Reset', 'SuperAdmin telah mereset sistem izin. Semua user sekarang dapat menginput data sesuai pengaturan global.', NULL, '', 0, '2026-05-04 01:23:22'),
(428, 12, 'system', '✅ Sistem Di-Reset', 'SuperAdmin telah mereset sistem izin. Semua user sekarang dapat menginput data sesuai pengaturan global.', NULL, '', 0, '2026-05-04 01:23:22'),
(429, 13, 'system', '✅ Sistem Di-Reset', 'SuperAdmin telah mereset sistem izin. Semua user sekarang dapat menginput data sesuai pengaturan global.', NULL, '', 0, '2026-05-04 01:23:22'),
(430, 14, 'system', '✅ Sistem Di-Reset', 'SuperAdmin telah mereset sistem izin. Semua user sekarang dapat menginput data sesuai pengaturan global.', NULL, '', 1, '2026-05-04 01:23:22'),
(431, 3, 'system', '❌ Input Data Dimatikan', 'SuperAdmin telah mematikan input data semua jenis untuk Siswa. Anda tidak dapat menginput data untuk sementara.', NULL, '', 0, '2026-05-04 01:23:31'),
(432, 6, 'system', '❌ Input Data Dimatikan', 'SuperAdmin telah mematikan input data semua jenis untuk Siswa. Anda tidak dapat menginput data untuk sementara.', NULL, '', 0, '2026-05-04 01:23:31'),
(433, 7, 'system', '❌ Input Data Dimatikan', 'SuperAdmin telah mematikan input data semua jenis untuk Siswa. Anda tidak dapat menginput data untuk sementara.', NULL, '', 0, '2026-05-04 01:23:31'),
(434, 8, 'system', '❌ Input Data Dimatikan', 'SuperAdmin telah mematikan input data semua jenis untuk Siswa. Anda tidak dapat menginput data untuk sementara.', NULL, '', 0, '2026-05-04 01:23:31'),
(435, 10, 'system', '❌ Input Data Dimatikan', 'SuperAdmin telah mematikan input data semua jenis untuk Siswa. Anda tidak dapat menginput data untuk sementara.', NULL, '', 0, '2026-05-04 01:23:31'),
(436, 11, 'system', '❌ Input Data Dimatikan', 'SuperAdmin telah mematikan input data semua jenis untuk Siswa. Anda tidak dapat menginput data untuk sementara.', NULL, '', 0, '2026-05-04 01:23:31'),
(437, 12, 'system', '❌ Input Data Dimatikan', 'SuperAdmin telah mematikan input data semua jenis untuk Siswa. Anda tidak dapat menginput data untuk sementara.', NULL, '', 0, '2026-05-04 01:23:31'),
(438, 13, 'system', '❌ Input Data Dimatikan', 'SuperAdmin telah mematikan input data semua jenis untuk Siswa. Anda tidak dapat menginput data untuk sementara.', NULL, '', 0, '2026-05-04 01:23:31'),
(439, 14, 'system', '❌ Input Data Dimatikan', 'SuperAdmin telah mematikan input data semua jenis untuk Siswa. Anda tidak dapat menginput data untuk sementara.', NULL, '', 1, '2026-05-04 01:23:31'),
(440, 3, 'system', '❌ Input Data Dimatikan', 'SuperAdmin telah mematikan input data semua jenis untuk Siswa. Anda tidak dapat menginput data untuk sementara.', NULL, '', 0, '2026-05-04 01:23:35'),
(441, 6, 'system', '❌ Input Data Dimatikan', 'SuperAdmin telah mematikan input data semua jenis untuk Siswa. Anda tidak dapat menginput data untuk sementara.', NULL, '', 0, '2026-05-04 01:23:35'),
(442, 7, 'system', '❌ Input Data Dimatikan', 'SuperAdmin telah mematikan input data semua jenis untuk Siswa. Anda tidak dapat menginput data untuk sementara.', NULL, '', 0, '2026-05-04 01:23:35'),
(443, 8, 'system', '❌ Input Data Dimatikan', 'SuperAdmin telah mematikan input data semua jenis untuk Siswa. Anda tidak dapat menginput data untuk sementara.', NULL, '', 0, '2026-05-04 01:23:35'),
(444, 10, 'system', '❌ Input Data Dimatikan', 'SuperAdmin telah mematikan input data semua jenis untuk Siswa. Anda tidak dapat menginput data untuk sementara.', NULL, '', 0, '2026-05-04 01:23:35'),
(445, 11, 'system', '❌ Input Data Dimatikan', 'SuperAdmin telah mematikan input data semua jenis untuk Siswa. Anda tidak dapat menginput data untuk sementara.', NULL, '', 0, '2026-05-04 01:23:35'),
(446, 12, 'system', '❌ Input Data Dimatikan', 'SuperAdmin telah mematikan input data semua jenis untuk Siswa. Anda tidak dapat menginput data untuk sementara.', NULL, '', 0, '2026-05-04 01:23:35'),
(447, 13, 'system', '❌ Input Data Dimatikan', 'SuperAdmin telah mematikan input data semua jenis untuk Siswa. Anda tidak dapat menginput data untuk sementara.', NULL, '', 0, '2026-05-04 01:23:35'),
(448, 14, 'system', '❌ Input Data Dimatikan', 'SuperAdmin telah mematikan input data semua jenis untuk Siswa. Anda tidak dapat menginput data untuk sementara.', NULL, '', 1, '2026-05-04 01:23:35'),
(449, 3, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data semua jenis untuk Siswa. Anda sekarang dapat menginput data.', NULL, '', 0, '2026-05-04 01:24:45'),
(450, 6, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data semua jenis untuk Siswa. Anda sekarang dapat menginput data.', NULL, '', 0, '2026-05-04 01:24:45'),
(451, 7, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data semua jenis untuk Siswa. Anda sekarang dapat menginput data.', NULL, '', 0, '2026-05-04 01:24:45'),
(452, 8, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data semua jenis untuk Siswa. Anda sekarang dapat menginput data.', NULL, '', 0, '2026-05-04 01:24:45'),
(453, 10, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data semua jenis untuk Siswa. Anda sekarang dapat menginput data.', NULL, '', 0, '2026-05-04 01:24:45'),
(454, 11, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data semua jenis untuk Siswa. Anda sekarang dapat menginput data.', NULL, '', 0, '2026-05-04 01:24:45'),
(455, 12, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data semua jenis untuk Siswa. Anda sekarang dapat menginput data.', NULL, '', 0, '2026-05-04 01:24:45'),
(456, 13, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data semua jenis untuk Siswa. Anda sekarang dapat menginput data.', NULL, '', 0, '2026-05-04 01:24:45'),
(457, 14, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data semua jenis untuk Siswa. Anda sekarang dapat menginput data.', NULL, '', 1, '2026-05-04 01:24:45'),
(458, 3, 'system', '✅ Sistem Di-Reset', 'SuperAdmin telah mereset sistem izin. Semua user sekarang dapat menginput data sesuai pengaturan global.', NULL, '', 0, '2026-05-04 01:25:17'),
(459, 5, 'system', '✅ Sistem Di-Reset', 'SuperAdmin telah mereset sistem izin. Semua user sekarang dapat menginput data sesuai pengaturan global.', NULL, '', 1, '2026-05-04 01:25:17'),
(460, 6, 'system', '✅ Sistem Di-Reset', 'SuperAdmin telah mereset sistem izin. Semua user sekarang dapat menginput data sesuai pengaturan global.', NULL, '', 0, '2026-05-04 01:25:17'),
(461, 7, 'system', '✅ Sistem Di-Reset', 'SuperAdmin telah mereset sistem izin. Semua user sekarang dapat menginput data sesuai pengaturan global.', NULL, '', 0, '2026-05-04 01:25:17'),
(462, 8, 'system', '✅ Sistem Di-Reset', 'SuperAdmin telah mereset sistem izin. Semua user sekarang dapat menginput data sesuai pengaturan global.', NULL, '', 0, '2026-05-04 01:25:17'),
(463, 9, 'system', '✅ Sistem Di-Reset', 'SuperAdmin telah mereset sistem izin. Semua user sekarang dapat menginput data sesuai pengaturan global.', NULL, '', 0, '2026-05-04 01:25:17'),
(464, 10, 'system', '✅ Sistem Di-Reset', 'SuperAdmin telah mereset sistem izin. Semua user sekarang dapat menginput data sesuai pengaturan global.', NULL, '', 0, '2026-05-04 01:25:17'),
(465, 11, 'system', '✅ Sistem Di-Reset', 'SuperAdmin telah mereset sistem izin. Semua user sekarang dapat menginput data sesuai pengaturan global.', NULL, '', 0, '2026-05-04 01:25:17'),
(466, 12, 'system', '✅ Sistem Di-Reset', 'SuperAdmin telah mereset sistem izin. Semua user sekarang dapat menginput data sesuai pengaturan global.', NULL, '', 0, '2026-05-04 01:25:17'),
(467, 13, 'system', '✅ Sistem Di-Reset', 'SuperAdmin telah mereset sistem izin. Semua user sekarang dapat menginput data sesuai pengaturan global.', NULL, '', 0, '2026-05-04 01:25:17'),
(468, 14, 'system', '✅ Sistem Di-Reset', 'SuperAdmin telah mereset sistem izin. Semua user sekarang dapat menginput data sesuai pengaturan global.', NULL, '', 1, '2026-05-04 01:25:17'),
(469, 14, 'system', '✅ Akses Diperbarui', 'SuperAdmin telah menghapus individual permission Anda. Akses Anda sekarang mengikuti pengaturan global/role.', NULL, '', 1, '2026-05-04 01:42:31'),
(470, 14, 'system', '✅ Akses Diperbarui', 'SuperAdmin telah menghapus individual permission Anda. Akses Anda sekarang mengikuti pengaturan global/role.', NULL, '', 1, '2026-05-04 01:42:34'),
(471, 5, 'system', '📝 Perubahan Akses Input Data', 'SuperAdmin telah mengubah akses input data Anda. Aktif: prestasi. Nonaktif: organisasi, event, pelanggaran, perilaku.', NULL, '', 1, '2026-05-04 01:43:51'),
(472, 5, 'system', '❌ Akses Input Data Dicabut', 'SuperAdmin telah mencabut akses Anda untuk input data: prestasi, organisasi, event, pelanggaran, perilaku. Anda tidak dapat menginput data tersebut untuk sementara.', NULL, '', 1, '2026-05-04 01:43:53'),
(473, 3, 'system', '❌ Input Data Dimatikan', 'SuperAdmin telah mematikan input data prestasi untuk Siswa. Anda tidak dapat menginput data untuk sementara.', NULL, '', 0, '2026-05-04 01:44:00'),
(474, 6, 'system', '❌ Input Data Dimatikan', 'SuperAdmin telah mematikan input data prestasi untuk Siswa. Anda tidak dapat menginput data untuk sementara.', NULL, '', 0, '2026-05-04 01:44:00'),
(475, 7, 'system', '❌ Input Data Dimatikan', 'SuperAdmin telah mematikan input data prestasi untuk Siswa. Anda tidak dapat menginput data untuk sementara.', NULL, '', 0, '2026-05-04 01:44:00'),
(476, 8, 'system', '❌ Input Data Dimatikan', 'SuperAdmin telah mematikan input data prestasi untuk Siswa. Anda tidak dapat menginput data untuk sementara.', NULL, '', 0, '2026-05-04 01:44:00'),
(477, 10, 'system', '❌ Input Data Dimatikan', 'SuperAdmin telah mematikan input data prestasi untuk Siswa. Anda tidak dapat menginput data untuk sementara.', NULL, '', 0, '2026-05-04 01:44:00'),
(478, 11, 'system', '❌ Input Data Dimatikan', 'SuperAdmin telah mematikan input data prestasi untuk Siswa. Anda tidak dapat menginput data untuk sementara.', NULL, '', 0, '2026-05-04 01:44:00'),
(479, 12, 'system', '❌ Input Data Dimatikan', 'SuperAdmin telah mematikan input data prestasi untuk Siswa. Anda tidak dapat menginput data untuk sementara.', NULL, '', 0, '2026-05-04 01:44:00'),
(480, 13, 'system', '❌ Input Data Dimatikan', 'SuperAdmin telah mematikan input data prestasi untuk Siswa. Anda tidak dapat menginput data untuk sementara.', NULL, '', 0, '2026-05-04 01:44:00'),
(481, 14, 'system', '❌ Input Data Dimatikan', 'SuperAdmin telah mematikan input data prestasi untuk Siswa. Anda tidak dapat menginput data untuk sementara.', NULL, '', 1, '2026-05-04 01:44:00'),
(482, 3, 'system', '❌ Input Data Dimatikan', 'SuperAdmin telah mematikan input data organisasi untuk Siswa. Anda tidak dapat menginput data untuk sementara.', NULL, '', 0, '2026-05-04 01:44:01'),
(483, 6, 'system', '❌ Input Data Dimatikan', 'SuperAdmin telah mematikan input data organisasi untuk Siswa. Anda tidak dapat menginput data untuk sementara.', NULL, '', 0, '2026-05-04 01:44:01'),
(484, 7, 'system', '❌ Input Data Dimatikan', 'SuperAdmin telah mematikan input data organisasi untuk Siswa. Anda tidak dapat menginput data untuk sementara.', NULL, '', 0, '2026-05-04 01:44:01'),
(485, 8, 'system', '❌ Input Data Dimatikan', 'SuperAdmin telah mematikan input data organisasi untuk Siswa. Anda tidak dapat menginput data untuk sementara.', NULL, '', 0, '2026-05-04 01:44:01'),
(486, 10, 'system', '❌ Input Data Dimatikan', 'SuperAdmin telah mematikan input data organisasi untuk Siswa. Anda tidak dapat menginput data untuk sementara.', NULL, '', 0, '2026-05-04 01:44:01'),
(487, 11, 'system', '❌ Input Data Dimatikan', 'SuperAdmin telah mematikan input data organisasi untuk Siswa. Anda tidak dapat menginput data untuk sementara.', NULL, '', 0, '2026-05-04 01:44:01'),
(488, 12, 'system', '❌ Input Data Dimatikan', 'SuperAdmin telah mematikan input data organisasi untuk Siswa. Anda tidak dapat menginput data untuk sementara.', NULL, '', 0, '2026-05-04 01:44:01'),
(489, 13, 'system', '❌ Input Data Dimatikan', 'SuperAdmin telah mematikan input data organisasi untuk Siswa. Anda tidak dapat menginput data untuk sementara.', NULL, '', 0, '2026-05-04 01:44:01'),
(490, 14, 'system', '❌ Input Data Dimatikan', 'SuperAdmin telah mematikan input data organisasi untuk Siswa. Anda tidak dapat menginput data untuk sementara.', NULL, '', 1, '2026-05-04 01:44:01'),
(491, 3, 'system', '❌ Input Data Dimatikan', 'SuperAdmin telah mematikan input data event untuk Siswa. Anda tidak dapat menginput data untuk sementara.', NULL, '', 0, '2026-05-04 01:44:02'),
(492, 6, 'system', '❌ Input Data Dimatikan', 'SuperAdmin telah mematikan input data event untuk Siswa. Anda tidak dapat menginput data untuk sementara.', NULL, '', 0, '2026-05-04 01:44:02'),
(493, 7, 'system', '❌ Input Data Dimatikan', 'SuperAdmin telah mematikan input data event untuk Siswa. Anda tidak dapat menginput data untuk sementara.', NULL, '', 0, '2026-05-04 01:44:02'),
(494, 8, 'system', '❌ Input Data Dimatikan', 'SuperAdmin telah mematikan input data event untuk Siswa. Anda tidak dapat menginput data untuk sementara.', NULL, '', 0, '2026-05-04 01:44:02'),
(495, 10, 'system', '❌ Input Data Dimatikan', 'SuperAdmin telah mematikan input data event untuk Siswa. Anda tidak dapat menginput data untuk sementara.', NULL, '', 0, '2026-05-04 01:44:02'),
(496, 11, 'system', '❌ Input Data Dimatikan', 'SuperAdmin telah mematikan input data event untuk Siswa. Anda tidak dapat menginput data untuk sementara.', NULL, '', 0, '2026-05-04 01:44:02'),
(497, 12, 'system', '❌ Input Data Dimatikan', 'SuperAdmin telah mematikan input data event untuk Siswa. Anda tidak dapat menginput data untuk sementara.', NULL, '', 0, '2026-05-04 01:44:02'),
(498, 13, 'system', '❌ Input Data Dimatikan', 'SuperAdmin telah mematikan input data event untuk Siswa. Anda tidak dapat menginput data untuk sementara.', NULL, '', 0, '2026-05-04 01:44:02'),
(499, 14, 'system', '❌ Input Data Dimatikan', 'SuperAdmin telah mematikan input data event untuk Siswa. Anda tidak dapat menginput data untuk sementara.', NULL, '', 1, '2026-05-04 01:44:02'),
(500, 3, 'system', '❌ Input Data Dimatikan', 'SuperAdmin telah mematikan input data semua jenis untuk Siswa. Anda tidak dapat menginput data untuk sementara.', NULL, '', 0, '2026-05-04 01:44:04'),
(501, 6, 'system', '❌ Input Data Dimatikan', 'SuperAdmin telah mematikan input data semua jenis untuk Siswa. Anda tidak dapat menginput data untuk sementara.', NULL, '', 0, '2026-05-04 01:44:04'),
(502, 7, 'system', '❌ Input Data Dimatikan', 'SuperAdmin telah mematikan input data semua jenis untuk Siswa. Anda tidak dapat menginput data untuk sementara.', NULL, '', 0, '2026-05-04 01:44:04'),
(503, 8, 'system', '❌ Input Data Dimatikan', 'SuperAdmin telah mematikan input data semua jenis untuk Siswa. Anda tidak dapat menginput data untuk sementara.', NULL, '', 0, '2026-05-04 01:44:04'),
(504, 10, 'system', '❌ Input Data Dimatikan', 'SuperAdmin telah mematikan input data semua jenis untuk Siswa. Anda tidak dapat menginput data untuk sementara.', NULL, '', 0, '2026-05-04 01:44:04'),
(505, 11, 'system', '❌ Input Data Dimatikan', 'SuperAdmin telah mematikan input data semua jenis untuk Siswa. Anda tidak dapat menginput data untuk sementara.', NULL, '', 0, '2026-05-04 01:44:04'),
(506, 12, 'system', '❌ Input Data Dimatikan', 'SuperAdmin telah mematikan input data semua jenis untuk Siswa. Anda tidak dapat menginput data untuk sementara.', NULL, '', 0, '2026-05-04 01:44:04'),
(507, 13, 'system', '❌ Input Data Dimatikan', 'SuperAdmin telah mematikan input data semua jenis untuk Siswa. Anda tidak dapat menginput data untuk sementara.', NULL, '', 0, '2026-05-04 01:44:04'),
(508, 14, 'system', '❌ Input Data Dimatikan', 'SuperAdmin telah mematikan input data semua jenis untuk Siswa. Anda tidak dapat menginput data untuk sementara.', NULL, '', 1, '2026-05-04 01:44:04'),
(509, 3, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data semua jenis untuk Siswa. Anda sekarang dapat menginput data.', NULL, '', 0, '2026-05-04 01:44:06'),
(510, 6, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data semua jenis untuk Siswa. Anda sekarang dapat menginput data.', NULL, '', 0, '2026-05-04 01:44:06'),
(511, 7, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data semua jenis untuk Siswa. Anda sekarang dapat menginput data.', NULL, '', 0, '2026-05-04 01:44:06'),
(512, 8, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data semua jenis untuk Siswa. Anda sekarang dapat menginput data.', NULL, '', 0, '2026-05-04 01:44:06'),
(513, 10, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data semua jenis untuk Siswa. Anda sekarang dapat menginput data.', NULL, '', 0, '2026-05-04 01:44:06'),
(514, 11, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data semua jenis untuk Siswa. Anda sekarang dapat menginput data.', NULL, '', 0, '2026-05-04 01:44:06'),
(515, 12, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data semua jenis untuk Siswa. Anda sekarang dapat menginput data.', NULL, '', 0, '2026-05-04 01:44:06'),
(516, 13, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data semua jenis untuk Siswa. Anda sekarang dapat menginput data.', NULL, '', 0, '2026-05-04 01:44:06'),
(517, 14, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data semua jenis untuk Siswa. Anda sekarang dapat menginput data.', NULL, '', 1, '2026-05-04 01:44:06'),
(518, 3, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data semua jenis untuk Siswa. Anda sekarang dapat menginput data.', NULL, '', 0, '2026-05-04 01:44:31'),
(519, 6, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data semua jenis untuk Siswa. Anda sekarang dapat menginput data.', NULL, '', 0, '2026-05-04 01:44:31'),
(520, 7, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data semua jenis untuk Siswa. Anda sekarang dapat menginput data.', NULL, '', 0, '2026-05-04 01:44:31'),
(521, 8, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data semua jenis untuk Siswa. Anda sekarang dapat menginput data.', NULL, '', 0, '2026-05-04 01:44:31'),
(522, 10, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data semua jenis untuk Siswa. Anda sekarang dapat menginput data.', NULL, '', 0, '2026-05-04 01:44:31'),
(523, 11, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data semua jenis untuk Siswa. Anda sekarang dapat menginput data.', NULL, '', 0, '2026-05-04 01:44:31'),
(524, 12, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data semua jenis untuk Siswa. Anda sekarang dapat menginput data.', NULL, '', 0, '2026-05-04 01:44:31'),
(525, 13, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data semua jenis untuk Siswa. Anda sekarang dapat menginput data.', NULL, '', 0, '2026-05-04 01:44:31'),
(526, 14, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data semua jenis untuk Siswa. Anda sekarang dapat menginput data.', NULL, '', 1, '2026-05-04 01:44:31'),
(527, 14, 'system', '📝 Perubahan Akses Input Data', 'SuperAdmin telah mengubah akses input data Anda. Aktif: prestasi. Nonaktif: organisasi, event, pelanggaran, perilaku.', NULL, '', 1, '2026-05-04 01:45:12'),
(528, 14, 'system', '📝 Perubahan Akses Input Data', 'SuperAdmin telah mengubah akses input data Anda. Aktif: prestasi, organisasi. Nonaktif: event, pelanggaran, perilaku.', NULL, '', 1, '2026-05-04 01:45:13'),
(529, 14, 'system', '📝 Perubahan Akses Input Data', 'SuperAdmin telah mengubah akses input data Anda. Aktif: prestasi, organisasi, event. Nonaktif: pelanggaran, perilaku.', NULL, '', 1, '2026-05-04 01:45:14'),
(530, 14, 'system', '📝 Perubahan Akses Input Data', 'SuperAdmin telah mengubah akses input data Anda. Aktif: prestasi, event. Nonaktif: organisasi, pelanggaran, perilaku.', NULL, '', 1, '2026-05-04 01:45:17'),
(531, 14, 'system', '📝 Perubahan Akses Input Data', 'SuperAdmin telah mengubah akses input data Anda. Aktif: prestasi, organisasi, event. Nonaktif: pelanggaran, perilaku.', NULL, '', 1, '2026-05-04 01:45:18'),
(532, 14, 'system', '📝 Perubahan Akses Input Data', 'SuperAdmin telah mengubah akses input data Anda. Aktif: prestasi, organisasi. Nonaktif: event, pelanggaran, perilaku.', NULL, '', 1, '2026-05-04 01:45:21'),
(533, 14, 'system', '📝 Perubahan Akses Input Data', 'SuperAdmin telah mengubah akses input data Anda. Aktif: prestasi, organisasi, event. Nonaktif: pelanggaran, perilaku.', NULL, '', 1, '2026-05-04 01:45:22'),
(534, 3, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data semua jenis untuk Siswa. Anda sekarang dapat menginput data.', NULL, '', 0, '2026-05-04 02:00:06'),
(535, 6, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data semua jenis untuk Siswa. Anda sekarang dapat menginput data.', NULL, '', 0, '2026-05-04 02:00:06'),
(536, 7, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data semua jenis untuk Siswa. Anda sekarang dapat menginput data.', NULL, '', 0, '2026-05-04 02:00:06'),
(537, 8, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data semua jenis untuk Siswa. Anda sekarang dapat menginput data.', NULL, '', 0, '2026-05-04 02:00:06'),
(538, 10, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data semua jenis untuk Siswa. Anda sekarang dapat menginput data.', NULL, '', 0, '2026-05-04 02:00:06');
INSERT INTO `notifications` (`id`, `user_id`, `type`, `title`, `message`, `related_id`, `related_type`, `is_read`, `created_at`) VALUES
(539, 11, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data semua jenis untuk Siswa. Anda sekarang dapat menginput data.', NULL, '', 0, '2026-05-04 02:00:06'),
(540, 12, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data semua jenis untuk Siswa. Anda sekarang dapat menginput data.', NULL, '', 0, '2026-05-04 02:00:06'),
(541, 13, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data semua jenis untuk Siswa. Anda sekarang dapat menginput data.', NULL, '', 0, '2026-05-04 02:00:06'),
(542, 14, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data semua jenis untuk Siswa. Anda sekarang dapat menginput data.', NULL, '', 1, '2026-05-04 02:00:06'),
(543, 3, 'system', '❌ Input Data Dimatikan', 'SuperAdmin telah mematikan input data semua jenis untuk Siswa. Anda tidak dapat menginput data untuk sementara.', NULL, '', 0, '2026-05-04 02:00:09'),
(544, 6, 'system', '❌ Input Data Dimatikan', 'SuperAdmin telah mematikan input data semua jenis untuk Siswa. Anda tidak dapat menginput data untuk sementara.', NULL, '', 0, '2026-05-04 02:00:09'),
(545, 7, 'system', '❌ Input Data Dimatikan', 'SuperAdmin telah mematikan input data semua jenis untuk Siswa. Anda tidak dapat menginput data untuk sementara.', NULL, '', 0, '2026-05-04 02:00:09'),
(546, 8, 'system', '❌ Input Data Dimatikan', 'SuperAdmin telah mematikan input data semua jenis untuk Siswa. Anda tidak dapat menginput data untuk sementara.', NULL, '', 0, '2026-05-04 02:00:09'),
(547, 10, 'system', '❌ Input Data Dimatikan', 'SuperAdmin telah mematikan input data semua jenis untuk Siswa. Anda tidak dapat menginput data untuk sementara.', NULL, '', 0, '2026-05-04 02:00:09'),
(548, 11, 'system', '❌ Input Data Dimatikan', 'SuperAdmin telah mematikan input data semua jenis untuk Siswa. Anda tidak dapat menginput data untuk sementara.', NULL, '', 0, '2026-05-04 02:00:09'),
(549, 12, 'system', '❌ Input Data Dimatikan', 'SuperAdmin telah mematikan input data semua jenis untuk Siswa. Anda tidak dapat menginput data untuk sementara.', NULL, '', 0, '2026-05-04 02:00:09'),
(550, 13, 'system', '❌ Input Data Dimatikan', 'SuperAdmin telah mematikan input data semua jenis untuk Siswa. Anda tidak dapat menginput data untuk sementara.', NULL, '', 0, '2026-05-04 02:00:09'),
(551, 14, 'system', '❌ Input Data Dimatikan', 'SuperAdmin telah mematikan input data semua jenis untuk Siswa. Anda tidak dapat menginput data untuk sementara.', NULL, '', 1, '2026-05-04 02:00:09'),
(552, 3, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data semua jenis untuk Siswa. Anda sekarang dapat menginput data.', NULL, '', 0, '2026-05-04 02:00:38'),
(553, 6, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data semua jenis untuk Siswa. Anda sekarang dapat menginput data.', NULL, '', 0, '2026-05-04 02:00:38'),
(554, 7, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data semua jenis untuk Siswa. Anda sekarang dapat menginput data.', NULL, '', 0, '2026-05-04 02:00:38'),
(555, 8, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data semua jenis untuk Siswa. Anda sekarang dapat menginput data.', NULL, '', 0, '2026-05-04 02:00:38'),
(556, 10, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data semua jenis untuk Siswa. Anda sekarang dapat menginput data.', NULL, '', 0, '2026-05-04 02:00:38'),
(557, 11, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data semua jenis untuk Siswa. Anda sekarang dapat menginput data.', NULL, '', 0, '2026-05-04 02:00:38'),
(558, 12, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data semua jenis untuk Siswa. Anda sekarang dapat menginput data.', NULL, '', 0, '2026-05-04 02:00:38'),
(559, 13, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data semua jenis untuk Siswa. Anda sekarang dapat menginput data.', NULL, '', 0, '2026-05-04 02:00:38'),
(560, 14, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data semua jenis untuk Siswa. Anda sekarang dapat menginput data.', NULL, '', 1, '2026-05-04 02:00:38'),
(561, 14, 'system', '📝 Perubahan Akses Input Data', 'SuperAdmin telah mengubah akses input data Anda. Aktif: prestasi. Nonaktif: organisasi, event, pelanggaran, perilaku.', NULL, '', 1, '2026-05-04 02:03:13'),
(562, 14, 'system', '📝 Perubahan Akses Input Data', 'SuperAdmin telah mengubah akses input data Anda. Aktif: prestasi, organisasi. Nonaktif: event, pelanggaran, perilaku.', NULL, '', 1, '2026-05-04 02:03:14'),
(563, 14, 'system', '📝 Perubahan Akses Input Data', 'SuperAdmin telah mengubah akses input data Anda. Aktif: prestasi, organisasi, event. Nonaktif: pelanggaran, perilaku.', NULL, '', 1, '2026-05-04 02:03:15'),
(564, 14, 'system', '📝 Perubahan Akses Input Data', 'SuperAdmin telah mengubah akses input data Anda. Aktif: prestasi, event. Nonaktif: organisasi, pelanggaran, perilaku.', NULL, '', 1, '2026-05-04 02:03:57'),
(565, 14, 'system', '📝 Perubahan Akses Input Data', 'SuperAdmin telah mengubah akses input data Anda. Aktif: prestasi. Nonaktif: organisasi, event, pelanggaran, perilaku.', NULL, '', 1, '2026-05-04 02:03:58'),
(566, 14, 'system', '📝 Perubahan Akses Input Data', 'SuperAdmin telah mengubah akses input data Anda. Aktif: prestasi, event. Nonaktif: organisasi, pelanggaran, perilaku.', NULL, '', 1, '2026-05-04 02:04:33'),
(567, 14, 'system', '📝 Perubahan Akses Input Data', 'SuperAdmin telah mengubah akses input data Anda. Aktif: prestasi, organisasi, event. Nonaktif: pelanggaran, perilaku.', NULL, '', 1, '2026-05-04 02:04:34'),
(568, 14, 'system', '📝 Perubahan Akses Input Data', 'SuperAdmin telah mengubah akses input data Anda. Aktif: prestasi, event. Nonaktif: organisasi, pelanggaran, perilaku.', NULL, '', 1, '2026-05-04 02:13:43'),
(569, 14, 'system', '📝 Perubahan Akses Input Data', 'SuperAdmin telah mengubah akses input data Anda. Aktif: prestasi. Nonaktif: organisasi, event, pelanggaran, perilaku.', NULL, '', 1, '2026-05-04 02:13:43'),
(570, 14, 'system', '❌ Akses Input Data Dicabut', 'SuperAdmin telah mencabut akses Anda untuk input data: prestasi, organisasi, event, pelanggaran, perilaku. Anda tidak dapat menginput data tersebut untuk sementara.', NULL, '', 1, '2026-05-04 02:13:46'),
(571, 14, 'system', '📝 Perubahan Akses Input Data', 'SuperAdmin telah mengubah akses input data Anda. Aktif: prestasi. Nonaktif: organisasi, event, pelanggaran, perilaku.', NULL, '', 1, '2026-05-04 02:13:50'),
(572, 7, 'system', '📝 Perubahan Akses Input Data', 'SuperAdmin telah mengubah akses input data Anda. Aktif: prestasi. Nonaktif: organisasi, event, pelanggaran, perilaku.', NULL, '', 0, '2026-05-04 02:13:51'),
(573, 7, 'system', '❌ Akses Input Data Dicabut', 'SuperAdmin telah mencabut akses Anda untuk input data: prestasi, organisasi, event, pelanggaran, perilaku. Anda tidak dapat menginput data tersebut untuk sementara.', NULL, '', 0, '2026-05-04 02:13:53'),
(574, 14, 'system', '❌ Akses Input Data Dicabut', 'SuperAdmin telah mencabut akses Anda untuk input data: prestasi, organisasi, event, pelanggaran, perilaku. Anda tidak dapat menginput data tersebut untuk sementara.', NULL, '', 1, '2026-05-04 02:13:53'),
(575, 3, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data semua jenis. Anda sekarang dapat menginput data.', NULL, '', 0, '2026-05-04 02:14:19'),
(576, 5, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data semua jenis. Anda sekarang dapat menginput data.', NULL, '', 1, '2026-05-04 02:14:19'),
(577, 6, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data semua jenis. Anda sekarang dapat menginput data.', NULL, '', 0, '2026-05-04 02:14:19'),
(578, 7, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data semua jenis. Anda sekarang dapat menginput data.', NULL, '', 0, '2026-05-04 02:14:19'),
(579, 8, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data semua jenis. Anda sekarang dapat menginput data.', NULL, '', 0, '2026-05-04 02:14:19'),
(580, 9, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data semua jenis. Anda sekarang dapat menginput data.', NULL, '', 0, '2026-05-04 02:14:19'),
(581, 10, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data semua jenis. Anda sekarang dapat menginput data.', NULL, '', 0, '2026-05-04 02:14:19'),
(582, 11, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data semua jenis. Anda sekarang dapat menginput data.', NULL, '', 0, '2026-05-04 02:14:19'),
(583, 12, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data semua jenis. Anda sekarang dapat menginput data.', NULL, '', 0, '2026-05-04 02:14:19'),
(584, 13, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data semua jenis. Anda sekarang dapat menginput data.', NULL, '', 0, '2026-05-04 02:14:19'),
(585, 14, 'system', '✅ Input Data Diaktifkan', 'SuperAdmin telah mengaktifkan input data semua jenis. Anda sekarang dapat menginput data.', NULL, '', 1, '2026-05-04 02:14:19'),
(586, 3, 'system', '❌ Input Data Dimatikan', 'SuperAdmin telah mematikan input data semua jenis. Anda tidak dapat menginput data untuk sementara.', NULL, '', 0, '2026-05-04 02:14:49'),
(587, 5, 'system', '❌ Input Data Dimatikan', 'SuperAdmin telah mematikan input data semua jenis. Anda tidak dapat menginput data untuk sementara.', NULL, '', 1, '2026-05-04 02:14:49'),
(588, 6, 'system', '❌ Input Data Dimatikan', 'SuperAdmin telah mematikan input data semua jenis. Anda tidak dapat menginput data untuk sementara.', NULL, '', 0, '2026-05-04 02:14:49'),
(589, 7, 'system', '❌ Input Data Dimatikan', 'SuperAdmin telah mematikan input data semua jenis. Anda tidak dapat menginput data untuk sementara.', NULL, '', 0, '2026-05-04 02:14:49'),
(590, 8, 'system', '❌ Input Data Dimatikan', 'SuperAdmin telah mematikan input data semua jenis. Anda tidak dapat menginput data untuk sementara.', NULL, '', 0, '2026-05-04 02:14:49'),
(591, 9, 'system', '❌ Input Data Dimatikan', 'SuperAdmin telah mematikan input data semua jenis. Anda tidak dapat menginput data untuk sementara.', NULL, '', 0, '2026-05-04 02:14:49'),
(592, 10, 'system', '❌ Input Data Dimatikan', 'SuperAdmin telah mematikan input data semua jenis. Anda tidak dapat menginput data untuk sementara.', NULL, '', 0, '2026-05-04 02:14:49'),
(593, 11, 'system', '❌ Input Data Dimatikan', 'SuperAdmin telah mematikan input data semua jenis. Anda tidak dapat menginput data untuk sementara.', NULL, '', 0, '2026-05-04 02:14:49'),
(594, 12, 'system', '❌ Input Data Dimatikan', 'SuperAdmin telah mematikan input data semua jenis. Anda tidak dapat menginput data untuk sementara.', NULL, '', 0, '2026-05-04 02:14:49'),
(595, 13, 'system', '❌ Input Data Dimatikan', 'SuperAdmin telah mematikan input data semua jenis. Anda tidak dapat menginput data untuk sementara.', NULL, '', 0, '2026-05-04 02:14:49'),
(596, 14, 'system', '❌ Input Data Dimatikan', 'SuperAdmin telah mematikan input data semua jenis. Anda tidak dapat menginput data untuk sementara.', NULL, '', 1, '2026-05-04 02:14:49'),
(597, 11, 'system', '✅ Akses Input Data Diberikan', 'SuperAdmin telah memberikan Anda akses untuk input data: prestasi, organisasi, event, pelanggaran, perilaku. Anda sekarang dapat menginput data.', NULL, '', 0, '2026-05-04 02:26:13'),
(598, 3, 'system', '✅ Akses Input Data Diberikan', 'SuperAdmin telah memberikan Anda akses untuk input data: prestasi, organisasi, event, pelanggaran, perilaku. Anda sekarang dapat menginput data.', NULL, '', 0, '2026-05-04 02:26:13'),
(599, 7, 'system', '✅ Akses Input Data Diberikan', 'SuperAdmin telah memberikan Anda akses untuk input data: prestasi, organisasi, event, pelanggaran, perilaku. Anda sekarang dapat menginput data.', NULL, '', 0, '2026-05-04 02:26:13'),
(600, 14, 'system', '✅ Akses Input Data Diberikan', 'SuperAdmin telah memberikan Anda akses untuk input data: prestasi, organisasi, event, pelanggaran, perilaku. Anda sekarang dapat menginput data.', NULL, '', 1, '2026-05-04 02:26:13'),
(601, 10, 'system', '✅ Akses Input Data Diberikan', 'SuperAdmin telah memberikan Anda akses untuk input data: prestasi, organisasi, event, pelanggaran, perilaku. Anda sekarang dapat menginput data.', NULL, '', 0, '2026-05-04 02:26:13'),
(602, 6, 'system', '✅ Akses Input Data Diberikan', 'SuperAdmin telah memberikan Anda akses untuk input data: prestasi, organisasi, event, pelanggaran, perilaku. Anda sekarang dapat menginput data.', NULL, '', 0, '2026-05-04 02:26:13'),
(603, 8, 'system', '✅ Akses Input Data Diberikan', 'SuperAdmin telah memberikan Anda akses untuk input data: prestasi, organisasi, event, pelanggaran, perilaku. Anda sekarang dapat menginput data.', NULL, '', 0, '2026-05-04 02:26:13'),
(604, 12, 'system', '✅ Akses Input Data Diberikan', 'SuperAdmin telah memberikan Anda akses untuk input data: prestasi, organisasi, event, pelanggaran, perilaku. Anda sekarang dapat menginput data.', NULL, '', 0, '2026-05-04 02:26:13'),
(605, 13, 'system', '✅ Akses Input Data Diberikan', 'SuperAdmin telah memberikan Anda akses untuk input data: prestasi, organisasi, event, pelanggaran, perilaku. Anda sekarang dapat menginput data.', NULL, '', 0, '2026-05-04 02:26:13'),
(606, 11, 'system', '❌ Akses Input Data Dicabut', 'SuperAdmin telah mencabut akses Anda untuk input data: prestasi, organisasi, event, pelanggaran, perilaku. Anda tidak dapat menginput data tersebut untuk sementara.', NULL, '', 0, '2026-05-04 02:26:17'),
(607, 3, 'system', '❌ Akses Input Data Dicabut', 'SuperAdmin telah mencabut akses Anda untuk input data: prestasi, organisasi, event, pelanggaran, perilaku. Anda tidak dapat menginput data tersebut untuk sementara.', NULL, '', 0, '2026-05-04 02:26:17'),
(608, 7, 'system', '❌ Akses Input Data Dicabut', 'SuperAdmin telah mencabut akses Anda untuk input data: prestasi, organisasi, event, pelanggaran, perilaku. Anda tidak dapat menginput data tersebut untuk sementara.', NULL, '', 0, '2026-05-04 02:26:17'),
(609, 10, 'system', '❌ Akses Input Data Dicabut', 'SuperAdmin telah mencabut akses Anda untuk input data: prestasi, organisasi, event, pelanggaran, perilaku. Anda tidak dapat menginput data tersebut untuk sementara.', NULL, '', 0, '2026-05-04 02:26:17'),
(610, 14, 'system', '❌ Akses Input Data Dicabut', 'SuperAdmin telah mencabut akses Anda untuk input data: prestasi, organisasi, event, pelanggaran, perilaku. Anda tidak dapat menginput data tersebut untuk sementara.', NULL, '', 1, '2026-05-04 02:26:17'),
(611, 6, 'system', '❌ Akses Input Data Dicabut', 'SuperAdmin telah mencabut akses Anda untuk input data: prestasi, organisasi, event, pelanggaran, perilaku. Anda tidak dapat menginput data tersebut untuk sementara.', NULL, '', 0, '2026-05-04 02:26:17'),
(612, 8, 'system', '❌ Akses Input Data Dicabut', 'SuperAdmin telah mencabut akses Anda untuk input data: prestasi, organisasi, event, pelanggaran, perilaku. Anda tidak dapat menginput data tersebut untuk sementara.', NULL, '', 0, '2026-05-04 02:26:17'),
(613, 12, 'system', '❌ Akses Input Data Dicabut', 'SuperAdmin telah mencabut akses Anda untuk input data: prestasi, organisasi, event, pelanggaran, perilaku. Anda tidak dapat menginput data tersebut untuk sementara.', NULL, '', 0, '2026-05-04 02:26:17'),
(614, 13, 'system', '❌ Akses Input Data Dicabut', 'SuperAdmin telah mencabut akses Anda untuk input data: prestasi, organisasi, event, pelanggaran, perilaku. Anda tidak dapat menginput data tersebut untuk sementara.', NULL, '', 0, '2026-05-04 02:26:17'),
(615, 11, 'system', '✅ Akses Input Data Diberikan', 'SuperAdmin telah memberikan Anda akses untuk input data: prestasi, organisasi, event, pelanggaran, perilaku. Anda sekarang dapat menginput data.', NULL, '', 0, '2026-05-04 02:26:24'),
(616, 3, 'system', '✅ Akses Input Data Diberikan', 'SuperAdmin telah memberikan Anda akses untuk input data: prestasi, organisasi, event, pelanggaran, perilaku. Anda sekarang dapat menginput data.', NULL, '', 0, '2026-05-04 02:26:24'),
(617, 7, 'system', '✅ Akses Input Data Diberikan', 'SuperAdmin telah memberikan Anda akses untuk input data: prestasi, organisasi, event, pelanggaran, perilaku. Anda sekarang dapat menginput data.', NULL, '', 0, '2026-05-04 02:26:25'),
(618, 10, 'system', '✅ Akses Input Data Diberikan', 'SuperAdmin telah memberikan Anda akses untuk input data: prestasi, organisasi, event, pelanggaran, perilaku. Anda sekarang dapat menginput data.', NULL, '', 0, '2026-05-04 02:26:25'),
(619, 14, 'system', '✅ Akses Input Data Diberikan', 'SuperAdmin telah memberikan Anda akses untuk input data: prestasi, organisasi, event, pelanggaran, perilaku. Anda sekarang dapat menginput data.', NULL, '', 1, '2026-05-04 02:26:25'),
(620, 6, 'system', '✅ Akses Input Data Diberikan', 'SuperAdmin telah memberikan Anda akses untuk input data: prestasi, organisasi, event, pelanggaran, perilaku. Anda sekarang dapat menginput data.', NULL, '', 0, '2026-05-04 02:26:25'),
(621, 8, 'system', '✅ Akses Input Data Diberikan', 'SuperAdmin telah memberikan Anda akses untuk input data: prestasi, organisasi, event, pelanggaran, perilaku. Anda sekarang dapat menginput data.', NULL, '', 0, '2026-05-04 02:26:25'),
(622, 12, 'system', '✅ Akses Input Data Diberikan', 'SuperAdmin telah memberikan Anda akses untuk input data: prestasi, organisasi, event, pelanggaran, perilaku. Anda sekarang dapat menginput data.', NULL, '', 0, '2026-05-04 02:26:25'),
(623, 13, 'system', '✅ Akses Input Data Diberikan', 'SuperAdmin telah memberikan Anda akses untuk input data: prestasi, organisasi, event, pelanggaran, perilaku. Anda sekarang dapat menginput data.', NULL, '', 0, '2026-05-04 02:26:25'),
(624, 11, 'system', '❌ Akses Input Data Dicabut', 'SuperAdmin telah mencabut akses Anda untuk input data: prestasi, organisasi, event, pelanggaran, perilaku. Anda tidak dapat menginput data tersebut untuk sementara.', NULL, '', 0, '2026-05-04 02:26:53'),
(625, 3, 'system', '❌ Akses Input Data Dicabut', 'SuperAdmin telah mencabut akses Anda untuk input data: prestasi, organisasi, event, pelanggaran, perilaku. Anda tidak dapat menginput data tersebut untuk sementara.', NULL, '', 0, '2026-05-04 02:26:53'),
(626, 7, 'system', '❌ Akses Input Data Dicabut', 'SuperAdmin telah mencabut akses Anda untuk input data: prestasi, organisasi, event, pelanggaran, perilaku. Anda tidak dapat menginput data tersebut untuk sementara.', NULL, '', 0, '2026-05-04 02:26:53'),
(627, 10, 'system', '❌ Akses Input Data Dicabut', 'SuperAdmin telah mencabut akses Anda untuk input data: prestasi, organisasi, event, pelanggaran, perilaku. Anda tidak dapat menginput data tersebut untuk sementara.', NULL, '', 0, '2026-05-04 02:26:53'),
(628, 14, 'system', '❌ Akses Input Data Dicabut', 'SuperAdmin telah mencabut akses Anda untuk input data: prestasi, organisasi, event, pelanggaran, perilaku. Anda tidak dapat menginput data tersebut untuk sementara.', NULL, '', 1, '2026-05-04 02:26:53'),
(629, 6, 'system', '❌ Akses Input Data Dicabut', 'SuperAdmin telah mencabut akses Anda untuk input data: prestasi, organisasi, event, pelanggaran, perilaku. Anda tidak dapat menginput data tersebut untuk sementara.', NULL, '', 0, '2026-05-04 02:26:53'),
(630, 8, 'system', '❌ Akses Input Data Dicabut', 'SuperAdmin telah mencabut akses Anda untuk input data: prestasi, organisasi, event, pelanggaran, perilaku. Anda tidak dapat menginput data tersebut untuk sementara.', NULL, '', 0, '2026-05-04 02:26:53'),
(631, 12, 'system', '❌ Akses Input Data Dicabut', 'SuperAdmin telah mencabut akses Anda untuk input data: prestasi, organisasi, event, pelanggaran, perilaku. Anda tidak dapat menginput data tersebut untuk sementara.', NULL, '', 0, '2026-05-04 02:26:53'),
(632, 13, 'system', '❌ Akses Input Data Dicabut', 'SuperAdmin telah mencabut akses Anda untuk input data: prestasi, organisasi, event, pelanggaran, perilaku. Anda tidak dapat menginput data tersebut untuk sementara.', NULL, '', 0, '2026-05-04 02:26:53'),
(633, 5, 'system', '✅ Akses Input Data Diberikan', 'SuperAdmin telah memberikan Anda akses untuk input data: prestasi, organisasi, event, pelanggaran, perilaku. Anda sekarang dapat menginput data.', NULL, '', 1, '2026-05-04 02:32:06'),
(634, 9, 'system', '✅ Akses Input Data Diberikan', 'SuperAdmin telah memberikan Anda akses untuk input data: prestasi, organisasi, event, pelanggaran, perilaku. Anda sekarang dapat menginput data.', NULL, '', 0, '2026-05-04 02:32:06'),
(635, 5, 'system', '❌ Akses Input Data Dicabut', 'SuperAdmin telah mencabut akses Anda untuk input data: prestasi, organisasi, event, pelanggaran, perilaku. Anda tidak dapat menginput data tersebut untuk sementara.', NULL, '', 1, '2026-05-04 02:32:52'),
(636, 9, 'system', '❌ Akses Input Data Dicabut', 'SuperAdmin telah mencabut akses Anda untuk input data: prestasi, organisasi, event, pelanggaran, perilaku. Anda tidak dapat menginput data tersebut untuk sementara.', NULL, '', 0, '2026-05-04 02:32:52'),
(637, 5, 'system', '❌ Akses Input Data Dicabut', 'SuperAdmin telah mencabut akses Anda untuk input data: prestasi, organisasi, event, pelanggaran, perilaku. Anda tidak dapat menginput data tersebut untuk sementara.', NULL, '', 1, '2026-05-04 02:33:24'),
(638, 9, 'system', '❌ Akses Input Data Dicabut', 'SuperAdmin telah mencabut akses Anda untuk input data: prestasi, organisasi, event, pelanggaran, perilaku. Anda tidak dapat menginput data tersebut untuk sementara.', NULL, '', 0, '2026-05-04 02:33:24'),
(639, 5, 'system', '✅ Akses Input Data Diberikan', 'SuperAdmin telah memberikan Anda akses untuk input data: prestasi, organisasi, event, pelanggaran, perilaku. Anda sekarang dapat menginput data.', NULL, '', 1, '2026-05-04 02:33:27'),
(640, 9, 'system', '✅ Akses Input Data Diberikan', 'SuperAdmin telah memberikan Anda akses untuk input data: prestasi, organisasi, event, pelanggaran, perilaku. Anda sekarang dapat menginput data.', NULL, '', 0, '2026-05-04 02:33:28'),
(641, 11, 'system', '❌ Akses Input Data Dicabut', 'SuperAdmin telah mencabut akses Anda untuk input data: prestasi, organisasi, event, pelanggaran, perilaku. Anda tidak dapat menginput data tersebut untuk sementara.', NULL, '', 0, '2026-05-04 02:41:21'),
(642, 3, 'system', '❌ Akses Input Data Dicabut', 'SuperAdmin telah mencabut akses Anda untuk input data: prestasi, organisasi, event, pelanggaran, perilaku. Anda tidak dapat menginput data tersebut untuk sementara.', NULL, '', 0, '2026-05-04 02:41:21'),
(643, 7, 'system', '❌ Akses Input Data Dicabut', 'SuperAdmin telah mencabut akses Anda untuk input data: prestasi, organisasi, event, pelanggaran, perilaku. Anda tidak dapat menginput data tersebut untuk sementara.', NULL, '', 0, '2026-05-04 02:41:21'),
(644, 10, 'system', '❌ Akses Input Data Dicabut', 'SuperAdmin telah mencabut akses Anda untuk input data: prestasi, organisasi, event, pelanggaran, perilaku. Anda tidak dapat menginput data tersebut untuk sementara.', NULL, '', 0, '2026-05-04 02:41:21'),
(645, 14, 'system', '❌ Akses Input Data Dicabut', 'SuperAdmin telah mencabut akses Anda untuk input data: prestasi, organisasi, event, pelanggaran, perilaku. Anda tidak dapat menginput data tersebut untuk sementara.', NULL, '', 1, '2026-05-04 02:41:21'),
(646, 6, 'system', '❌ Akses Input Data Dicabut', 'SuperAdmin telah mencabut akses Anda untuk input data: prestasi, organisasi, event, pelanggaran, perilaku. Anda tidak dapat menginput data tersebut untuk sementara.', NULL, '', 0, '2026-05-04 02:41:21'),
(647, 8, 'system', '❌ Akses Input Data Dicabut', 'SuperAdmin telah mencabut akses Anda untuk input data: prestasi, organisasi, event, pelanggaran, perilaku. Anda tidak dapat menginput data tersebut untuk sementara.', NULL, '', 0, '2026-05-04 02:41:21'),
(648, 12, 'system', '❌ Akses Input Data Dicabut', 'SuperAdmin telah mencabut akses Anda untuk input data: prestasi, organisasi, event, pelanggaran, perilaku. Anda tidak dapat menginput data tersebut untuk sementara.', NULL, '', 0, '2026-05-04 02:41:21'),
(649, 13, 'system', '❌ Akses Input Data Dicabut', 'SuperAdmin telah mencabut akses Anda untuk input data: prestasi, organisasi, event, pelanggaran, perilaku. Anda tidak dapat menginput data tersebut untuk sementara.', NULL, '', 0, '2026-05-04 02:41:21'),
(650, 11, 'system', '❌ Akses Input Data Dicabut', 'SuperAdmin telah mencabut akses Anda untuk input data: prestasi, organisasi, event, pelanggaran, perilaku. Anda tidak dapat menginput data tersebut untuk sementara.', NULL, '', 0, '2026-05-04 02:41:22'),
(651, 3, 'system', '❌ Akses Input Data Dicabut', 'SuperAdmin telah mencabut akses Anda untuk input data: prestasi, organisasi, event, pelanggaran, perilaku. Anda tidak dapat menginput data tersebut untuk sementara.', NULL, '', 0, '2026-05-04 02:41:22'),
(652, 7, 'system', '❌ Akses Input Data Dicabut', 'SuperAdmin telah mencabut akses Anda untuk input data: prestasi, organisasi, event, pelanggaran, perilaku. Anda tidak dapat menginput data tersebut untuk sementara.', NULL, '', 0, '2026-05-04 02:41:22'),
(653, 10, 'system', '❌ Akses Input Data Dicabut', 'SuperAdmin telah mencabut akses Anda untuk input data: prestasi, organisasi, event, pelanggaran, perilaku. Anda tidak dapat menginput data tersebut untuk sementara.', NULL, '', 0, '2026-05-04 02:41:22'),
(654, 14, 'system', '❌ Akses Input Data Dicabut', 'SuperAdmin telah mencabut akses Anda untuk input data: prestasi, organisasi, event, pelanggaran, perilaku. Anda tidak dapat menginput data tersebut untuk sementara.', NULL, '', 1, '2026-05-04 02:41:22'),
(655, 6, 'system', '❌ Akses Input Data Dicabut', 'SuperAdmin telah mencabut akses Anda untuk input data: prestasi, organisasi, event, pelanggaran, perilaku. Anda tidak dapat menginput data tersebut untuk sementara.', NULL, '', 0, '2026-05-04 02:41:22'),
(656, 8, 'system', '❌ Akses Input Data Dicabut', 'SuperAdmin telah mencabut akses Anda untuk input data: prestasi, organisasi, event, pelanggaran, perilaku. Anda tidak dapat menginput data tersebut untuk sementara.', NULL, '', 0, '2026-05-04 02:41:22'),
(657, 11, 'system', '❌ Akses Input Data Dicabut', 'SuperAdmin telah mencabut akses Anda untuk input data: prestasi, organisasi, event, pelanggaran, perilaku. Anda tidak dapat menginput data tersebut untuk sementara.', NULL, '', 0, '2026-05-04 02:41:22'),
(658, 12, 'system', '❌ Akses Input Data Dicabut', 'SuperAdmin telah mencabut akses Anda untuk input data: prestasi, organisasi, event, pelanggaran, perilaku. Anda tidak dapat menginput data tersebut untuk sementara.', NULL, '', 0, '2026-05-04 02:41:22'),
(659, 3, 'system', '❌ Akses Input Data Dicabut', 'SuperAdmin telah mencabut akses Anda untuk input data: prestasi, organisasi, event, pelanggaran, perilaku. Anda tidak dapat menginput data tersebut untuk sementara.', NULL, '', 0, '2026-05-04 02:41:22'),
(660, 13, 'system', '❌ Akses Input Data Dicabut', 'SuperAdmin telah mencabut akses Anda untuk input data: prestasi, organisasi, event, pelanggaran, perilaku. Anda tidak dapat menginput data tersebut untuk sementara.', NULL, '', 0, '2026-05-04 02:41:22'),
(661, 7, 'system', '❌ Akses Input Data Dicabut', 'SuperAdmin telah mencabut akses Anda untuk input data: prestasi, organisasi, event, pelanggaran, perilaku. Anda tidak dapat menginput data tersebut untuk sementara.', NULL, '', 0, '2026-05-04 02:41:22'),
(662, 10, 'system', '❌ Akses Input Data Dicabut', 'SuperAdmin telah mencabut akses Anda untuk input data: prestasi, organisasi, event, pelanggaran, perilaku. Anda tidak dapat menginput data tersebut untuk sementara.', NULL, '', 0, '2026-05-04 02:41:22'),
(663, 14, 'system', '❌ Akses Input Data Dicabut', 'SuperAdmin telah mencabut akses Anda untuk input data: prestasi, organisasi, event, pelanggaran, perilaku. Anda tidak dapat menginput data tersebut untuk sementara.', NULL, '', 1, '2026-05-04 02:41:22'),
(664, 11, 'system', '❌ Akses Input Data Dicabut', 'SuperAdmin telah mencabut akses Anda untuk input data: prestasi, organisasi, event, pelanggaran, perilaku. Anda tidak dapat menginput data tersebut untuk sementara.', NULL, '', 0, '2026-05-04 02:41:23'),
(665, 6, 'system', '❌ Akses Input Data Dicabut', 'SuperAdmin telah mencabut akses Anda untuk input data: prestasi, organisasi, event, pelanggaran, perilaku. Anda tidak dapat menginput data tersebut untuk sementara.', NULL, '', 0, '2026-05-04 02:41:23'),
(666, 3, 'system', '❌ Akses Input Data Dicabut', 'SuperAdmin telah mencabut akses Anda untuk input data: prestasi, organisasi, event, pelanggaran, perilaku. Anda tidak dapat menginput data tersebut untuk sementara.', NULL, '', 0, '2026-05-04 02:41:23'),
(667, 8, 'system', '❌ Akses Input Data Dicabut', 'SuperAdmin telah mencabut akses Anda untuk input data: prestasi, organisasi, event, pelanggaran, perilaku. Anda tidak dapat menginput data tersebut untuk sementara.', NULL, '', 0, '2026-05-04 02:41:23'),
(668, 7, 'system', '❌ Akses Input Data Dicabut', 'SuperAdmin telah mencabut akses Anda untuk input data: prestasi, organisasi, event, pelanggaran, perilaku. Anda tidak dapat menginput data tersebut untuk sementara.', NULL, '', 0, '2026-05-04 02:41:23'),
(669, 12, 'system', '❌ Akses Input Data Dicabut', 'SuperAdmin telah mencabut akses Anda untuk input data: prestasi, organisasi, event, pelanggaran, perilaku. Anda tidak dapat menginput data tersebut untuk sementara.', NULL, '', 0, '2026-05-04 02:41:23'),
(670, 10, 'system', '❌ Akses Input Data Dicabut', 'SuperAdmin telah mencabut akses Anda untuk input data: prestasi, organisasi, event, pelanggaran, perilaku. Anda tidak dapat menginput data tersebut untuk sementara.', NULL, '', 0, '2026-05-04 02:41:23'),
(671, 13, 'system', '❌ Akses Input Data Dicabut', 'SuperAdmin telah mencabut akses Anda untuk input data: prestasi, organisasi, event, pelanggaran, perilaku. Anda tidak dapat menginput data tersebut untuk sementara.', NULL, '', 0, '2026-05-04 02:41:23'),
(672, 14, 'system', '❌ Akses Input Data Dicabut', 'SuperAdmin telah mencabut akses Anda untuk input data: prestasi, organisasi, event, pelanggaran, perilaku. Anda tidak dapat menginput data tersebut untuk sementara.', NULL, '', 1, '2026-05-04 02:41:23'),
(673, 6, 'system', '❌ Akses Input Data Dicabut', 'SuperAdmin telah mencabut akses Anda untuk input data: prestasi, organisasi, event, pelanggaran, perilaku. Anda tidak dapat menginput data tersebut untuk sementara.', NULL, '', 0, '2026-05-04 02:41:23'),
(674, 8, 'system', '❌ Akses Input Data Dicabut', 'SuperAdmin telah mencabut akses Anda untuk input data: prestasi, organisasi, event, pelanggaran, perilaku. Anda tidak dapat menginput data tersebut untuk sementara.', NULL, '', 0, '2026-05-04 02:41:23'),
(675, 12, 'system', '❌ Akses Input Data Dicabut', 'SuperAdmin telah mencabut akses Anda untuk input data: prestasi, organisasi, event, pelanggaran, perilaku. Anda tidak dapat menginput data tersebut untuk sementara.', NULL, '', 0, '2026-05-04 02:41:23'),
(676, 13, 'system', '❌ Akses Input Data Dicabut', 'SuperAdmin telah mencabut akses Anda untuk input data: prestasi, organisasi, event, pelanggaran, perilaku. Anda tidak dapat menginput data tersebut untuk sementara.', NULL, '', 0, '2026-05-04 02:41:23'),
(677, 11, 'system', '📝 Perubahan Akses Input Data', 'SuperAdmin telah mengubah akses input data Anda. Aktif: prestasi. Nonaktif: organisasi, event, pelanggaran, perilaku.', NULL, '', 0, '2026-05-04 02:41:23'),
(678, 3, 'system', '📝 Perubahan Akses Input Data', 'SuperAdmin telah mengubah akses input data Anda. Aktif: prestasi. Nonaktif: organisasi, event, pelanggaran, perilaku.', NULL, '', 0, '2026-05-04 02:41:23'),
(679, 7, 'system', '📝 Perubahan Akses Input Data', 'SuperAdmin telah mengubah akses input data Anda. Aktif: prestasi. Nonaktif: organisasi, event, pelanggaran, perilaku.', NULL, '', 0, '2026-05-04 02:41:23'),
(680, 10, 'system', '📝 Perubahan Akses Input Data', 'SuperAdmin telah mengubah akses input data Anda. Aktif: prestasi. Nonaktif: organisasi, event, pelanggaran, perilaku.', NULL, '', 0, '2026-05-04 02:41:23'),
(681, 14, 'system', '📝 Perubahan Akses Input Data', 'SuperAdmin telah mengubah akses input data Anda. Aktif: prestasi. Nonaktif: organisasi, event, pelanggaran, perilaku.', NULL, '', 1, '2026-05-04 02:41:23'),
(682, 6, 'system', '📝 Perubahan Akses Input Data', 'SuperAdmin telah mengubah akses input data Anda. Aktif: prestasi. Nonaktif: organisasi, event, pelanggaran, perilaku.', NULL, '', 0, '2026-05-04 02:41:23'),
(683, 8, 'system', '📝 Perubahan Akses Input Data', 'SuperAdmin telah mengubah akses input data Anda. Aktif: prestasi. Nonaktif: organisasi, event, pelanggaran, perilaku.', NULL, '', 0, '2026-05-04 02:41:23'),
(684, 11, 'system', '📝 Perubahan Akses Input Data', 'SuperAdmin telah mengubah akses input data Anda. Aktif: prestasi. Nonaktif: organisasi, event, pelanggaran, perilaku.', NULL, '', 0, '2026-05-04 02:41:23'),
(685, 12, 'system', '📝 Perubahan Akses Input Data', 'SuperAdmin telah mengubah akses input data Anda. Aktif: prestasi. Nonaktif: organisasi, event, pelanggaran, perilaku.', NULL, '', 0, '2026-05-04 02:41:23'),
(686, 3, 'system', '📝 Perubahan Akses Input Data', 'SuperAdmin telah mengubah akses input data Anda. Aktif: prestasi. Nonaktif: organisasi, event, pelanggaran, perilaku.', NULL, '', 0, '2026-05-04 02:41:23'),
(687, 7, 'system', '📝 Perubahan Akses Input Data', 'SuperAdmin telah mengubah akses input data Anda. Aktif: prestasi. Nonaktif: organisasi, event, pelanggaran, perilaku.', NULL, '', 0, '2026-05-04 02:41:23'),
(688, 13, 'system', '📝 Perubahan Akses Input Data', 'SuperAdmin telah mengubah akses input data Anda. Aktif: prestasi. Nonaktif: organisasi, event, pelanggaran, perilaku.', NULL, '', 0, '2026-05-04 02:41:23'),
(689, 10, 'system', '📝 Perubahan Akses Input Data', 'SuperAdmin telah mengubah akses input data Anda. Aktif: prestasi. Nonaktif: organisasi, event, pelanggaran, perilaku.', NULL, '', 0, '2026-05-04 02:41:23'),
(690, 14, 'system', '📝 Perubahan Akses Input Data', 'SuperAdmin telah mengubah akses input data Anda. Aktif: prestasi. Nonaktif: organisasi, event, pelanggaran, perilaku.', NULL, '', 1, '2026-05-04 02:41:23'),
(691, 6, 'system', '📝 Perubahan Akses Input Data', 'SuperAdmin telah mengubah akses input data Anda. Aktif: prestasi. Nonaktif: organisasi, event, pelanggaran, perilaku.', NULL, '', 0, '2026-05-04 02:41:23'),
(692, 11, 'system', '📝 Perubahan Akses Input Data', 'SuperAdmin telah mengubah akses input data Anda. Aktif: prestasi. Nonaktif: organisasi, event, pelanggaran, perilaku.', NULL, '', 0, '2026-05-04 02:41:23'),
(693, 8, 'system', '📝 Perubahan Akses Input Data', 'SuperAdmin telah mengubah akses input data Anda. Aktif: prestasi. Nonaktif: organisasi, event, pelanggaran, perilaku.', NULL, '', 0, '2026-05-04 02:41:23'),
(694, 3, 'system', '📝 Perubahan Akses Input Data', 'SuperAdmin telah mengubah akses input data Anda. Aktif: prestasi. Nonaktif: organisasi, event, pelanggaran, perilaku.', NULL, '', 0, '2026-05-04 02:41:23'),
(695, 12, 'system', '📝 Perubahan Akses Input Data', 'SuperAdmin telah mengubah akses input data Anda. Aktif: prestasi. Nonaktif: organisasi, event, pelanggaran, perilaku.', NULL, '', 0, '2026-05-04 02:41:23'),
(696, 7, 'system', '📝 Perubahan Akses Input Data', 'SuperAdmin telah mengubah akses input data Anda. Aktif: prestasi. Nonaktif: organisasi, event, pelanggaran, perilaku.', NULL, '', 0, '2026-05-04 02:41:23'),
(697, 13, 'system', '📝 Perubahan Akses Input Data', 'SuperAdmin telah mengubah akses input data Anda. Aktif: prestasi. Nonaktif: organisasi, event, pelanggaran, perilaku.', NULL, '', 0, '2026-05-04 02:41:23'),
(698, 10, 'system', '📝 Perubahan Akses Input Data', 'SuperAdmin telah mengubah akses input data Anda. Aktif: prestasi. Nonaktif: organisasi, event, pelanggaran, perilaku.', NULL, '', 0, '2026-05-04 02:41:23'),
(699, 14, 'system', '📝 Perubahan Akses Input Data', 'SuperAdmin telah mengubah akses input data Anda. Aktif: prestasi. Nonaktif: organisasi, event, pelanggaran, perilaku.', NULL, '', 1, '2026-05-04 02:41:23'),
(700, 6, 'system', '📝 Perubahan Akses Input Data', 'SuperAdmin telah mengubah akses input data Anda. Aktif: prestasi. Nonaktif: organisasi, event, pelanggaran, perilaku.', NULL, '', 0, '2026-05-04 02:41:23'),
(701, 8, 'system', '📝 Perubahan Akses Input Data', 'SuperAdmin telah mengubah akses input data Anda. Aktif: prestasi. Nonaktif: organisasi, event, pelanggaran, perilaku.', NULL, '', 0, '2026-05-04 02:41:23'),
(702, 12, 'system', '📝 Perubahan Akses Input Data', 'SuperAdmin telah mengubah akses input data Anda. Aktif: prestasi. Nonaktif: organisasi, event, pelanggaran, perilaku.', NULL, '', 0, '2026-05-04 02:41:23'),
(703, 13, 'system', '📝 Perubahan Akses Input Data', 'SuperAdmin telah mengubah akses input data Anda. Aktif: prestasi. Nonaktif: organisasi, event, pelanggaran, perilaku.', NULL, '', 0, '2026-05-04 02:41:23'),
(704, 11, 'system', '❌ Akses Input Data Dicabut', 'SuperAdmin telah mencabut akses Anda untuk input data: prestasi, organisasi, event, pelanggaran, perilaku. Anda tidak dapat menginput data tersebut untuk sementara.', NULL, '', 0, '2026-05-04 02:41:28'),
(705, 3, 'system', '❌ Akses Input Data Dicabut', 'SuperAdmin telah mencabut akses Anda untuk input data: prestasi, organisasi, event, pelanggaran, perilaku. Anda tidak dapat menginput data tersebut untuk sementara.', NULL, '', 0, '2026-05-04 02:41:28'),
(706, 7, 'system', '❌ Akses Input Data Dicabut', 'SuperAdmin telah mencabut akses Anda untuk input data: prestasi, organisasi, event, pelanggaran, perilaku. Anda tidak dapat menginput data tersebut untuk sementara.', NULL, '', 0, '2026-05-04 02:41:28'),
(707, 10, 'system', '❌ Akses Input Data Dicabut', 'SuperAdmin telah mencabut akses Anda untuk input data: prestasi, organisasi, event, pelanggaran, perilaku. Anda tidak dapat menginput data tersebut untuk sementara.', NULL, '', 0, '2026-05-04 02:41:28'),
(708, 14, 'system', '❌ Akses Input Data Dicabut', 'SuperAdmin telah mencabut akses Anda untuk input data: prestasi, organisasi, event, pelanggaran, perilaku. Anda tidak dapat menginput data tersebut untuk sementara.', NULL, '', 1, '2026-05-04 02:41:28'),
(709, 6, 'system', '❌ Akses Input Data Dicabut', 'SuperAdmin telah mencabut akses Anda untuk input data: prestasi, organisasi, event, pelanggaran, perilaku. Anda tidak dapat menginput data tersebut untuk sementara.', NULL, '', 0, '2026-05-04 02:41:28'),
(710, 8, 'system', '❌ Akses Input Data Dicabut', 'SuperAdmin telah mencabut akses Anda untuk input data: prestasi, organisasi, event, pelanggaran, perilaku. Anda tidak dapat menginput data tersebut untuk sementara.', NULL, '', 0, '2026-05-04 02:41:28'),
(711, 12, 'system', '❌ Akses Input Data Dicabut', 'SuperAdmin telah mencabut akses Anda untuk input data: prestasi, organisasi, event, pelanggaran, perilaku. Anda tidak dapat menginput data tersebut untuk sementara.', NULL, '', 0, '2026-05-04 02:41:28'),
(712, 13, 'system', '❌ Akses Input Data Dicabut', 'SuperAdmin telah mencabut akses Anda untuk input data: prestasi, organisasi, event, pelanggaran, perilaku. Anda tidak dapat menginput data tersebut untuk sementara.', NULL, '', 0, '2026-05-04 02:41:28'),
(713, 5, 'system', '📝 Perubahan Akses Input Data', 'SuperAdmin telah mengubah akses input data Anda. Aktif: organisasi, event, pelanggaran, perilaku. Nonaktif: prestasi.', NULL, '', 1, '2026-05-04 02:41:31'),
(714, 9, 'system', '📝 Perubahan Akses Input Data', 'SuperAdmin telah mengubah akses input data Anda. Aktif: organisasi, event, pelanggaran, perilaku. Nonaktif: prestasi.', NULL, '', 0, '2026-05-04 02:41:31'),
(715, 5, 'system', '📝 Perubahan Akses Input Data', 'SuperAdmin telah mengubah akses input data Anda. Aktif: organisasi, event, pelanggaran, perilaku. Nonaktif: prestasi.', NULL, '', 1, '2026-05-04 02:41:32'),
(716, 9, 'system', '📝 Perubahan Akses Input Data', 'SuperAdmin telah mengubah akses input data Anda. Aktif: organisasi, event, pelanggaran, perilaku. Nonaktif: prestasi.', NULL, '', 0, '2026-05-04 02:41:32'),
(717, 5, 'system', '📝 Perubahan Akses Input Data', 'SuperAdmin telah mengubah akses input data Anda. Aktif: event, pelanggaran, perilaku. Nonaktif: prestasi, organisasi.', NULL, '', 1, '2026-05-04 02:41:33'),
(718, 9, 'system', '📝 Perubahan Akses Input Data', 'SuperAdmin telah mengubah akses input data Anda. Aktif: event, pelanggaran, perilaku. Nonaktif: prestasi, organisasi.', NULL, '', 0, '2026-05-04 02:41:33'),
(719, 5, 'system', '📝 Perubahan Akses Input Data', 'SuperAdmin telah mengubah akses input data Anda. Aktif: pelanggaran, perilaku. Nonaktif: prestasi, organisasi, event.', NULL, '', 1, '2026-05-04 02:41:36'),
(720, 9, 'system', '📝 Perubahan Akses Input Data', 'SuperAdmin telah mengubah akses input data Anda. Aktif: pelanggaran, perilaku. Nonaktif: prestasi, organisasi, event.', NULL, '', 0, '2026-05-04 02:41:36'),
(721, 5, 'system', '📝 Perubahan Akses Input Data', 'SuperAdmin telah mengubah akses input data Anda. Aktif: perilaku. Nonaktif: prestasi, organisasi, event, pelanggaran.', NULL, '', 1, '2026-05-04 02:49:38'),
(722, 9, 'system', '📝 Perubahan Akses Input Data', 'SuperAdmin telah mengubah akses input data Anda. Aktif: perilaku. Nonaktif: prestasi, organisasi, event, pelanggaran.', NULL, '', 0, '2026-05-04 02:49:38'),
(723, 5, 'system', '❌ Akses Input Data Dicabut', 'SuperAdmin telah mencabut akses Anda untuk input data: prestasi, organisasi, event, pelanggaran, perilaku. Anda tidak dapat menginput data tersebut untuk sementara.', NULL, '', 1, '2026-05-04 02:49:39'),
(724, 9, 'system', '❌ Akses Input Data Dicabut', 'SuperAdmin telah mencabut akses Anda untuk input data: prestasi, organisasi, event, pelanggaran, perilaku. Anda tidak dapat menginput data tersebut untuk sementara.', NULL, '', 0, '2026-05-04 02:49:39'),
(725, 5, 'system', '📝 Perubahan Akses Input Data', 'SuperAdmin telah mengubah akses input data Anda. Aktif: prestasi. Nonaktif: organisasi, event, pelanggaran, perilaku.', NULL, '', 1, '2026-05-04 02:52:47'),
(726, 5, 'system', '❌ Akses Input Data Dicabut', 'SuperAdmin telah mencabut akses Anda untuk input data: prestasi, organisasi, event, pelanggaran, perilaku. Anda tidak dapat menginput data tersebut untuk sementara.', NULL, '', 1, '2026-05-04 02:52:47'),
(727, 11, 'system', '📝 Perubahan Akses Input Data', 'SuperAdmin telah mengubah akses input data Anda. Aktif: prestasi. Nonaktif: organisasi, event, pelanggaran, perilaku.', NULL, '', 0, '2026-05-04 03:52:12'),
(728, 3, 'system', '📝 Perubahan Akses Input Data', 'SuperAdmin telah mengubah akses input data Anda. Aktif: prestasi. Nonaktif: organisasi, event, pelanggaran, perilaku.', NULL, '', 0, '2026-05-04 03:52:12'),
(729, 7, 'system', '📝 Perubahan Akses Input Data', 'SuperAdmin telah mengubah akses input data Anda. Aktif: prestasi. Nonaktif: organisasi, event, pelanggaran, perilaku.', NULL, '', 0, '2026-05-04 03:52:12'),
(730, 10, 'system', '📝 Perubahan Akses Input Data', 'SuperAdmin telah mengubah akses input data Anda. Aktif: prestasi. Nonaktif: organisasi, event, pelanggaran, perilaku.', NULL, '', 0, '2026-05-04 03:52:12'),
(731, 14, 'system', '📝 Perubahan Akses Input Data', 'SuperAdmin telah mengubah akses input data Anda. Aktif: prestasi. Nonaktif: organisasi, event, pelanggaran, perilaku.', NULL, '', 1, '2026-05-04 03:52:12'),
(732, 6, 'system', '📝 Perubahan Akses Input Data', 'SuperAdmin telah mengubah akses input data Anda. Aktif: prestasi. Nonaktif: organisasi, event, pelanggaran, perilaku.', NULL, '', 0, '2026-05-04 03:52:12'),
(733, 8, 'system', '📝 Perubahan Akses Input Data', 'SuperAdmin telah mengubah akses input data Anda. Aktif: prestasi. Nonaktif: organisasi, event, pelanggaran, perilaku.', NULL, '', 0, '2026-05-04 03:52:12'),
(734, 12, 'system', '📝 Perubahan Akses Input Data', 'SuperAdmin telah mengubah akses input data Anda. Aktif: prestasi. Nonaktif: organisasi, event, pelanggaran, perilaku.', NULL, '', 0, '2026-05-04 03:52:12'),
(735, 13, 'system', '📝 Perubahan Akses Input Data', 'SuperAdmin telah mengubah akses input data Anda. Aktif: prestasi. Nonaktif: organisasi, event, pelanggaran, perilaku.', NULL, '', 0, '2026-05-04 03:52:12'),
(736, 5, 'wali_kelas_assigned', 'Wali Kelas Baru', 'kariada ditunjuk sebagai Wali Kelas KELAS 10 TKJ 1', 4, '', 1, '2026-05-04 04:51:37'),
(737, 9, 'wali_kelas_assigned', 'Wali Kelas Baru', 'kariada ditunjuk sebagai Wali Kelas KELAS 10 TKJ 1', 4, '', 0, '2026-05-04 04:51:37'),
(738, 5, 'wali_kelas_assigned', 'Anda Ditunjuk sebagai Wali Kelas', 'Anda telah ditunjuk sebagai Wali Kelas KELAS 10 TKJ 1 untuk tahun ajaran 2026. Sekarang Anda dapat mengakses menu Wali Kelas.', 4, '', 1, '2026-05-04 04:51:37'),
(739, 5, 'wali_kelas_removed', 'Anda Dicopot sebagai Wali Kelas', 'Anda telah dicopot dari jabatan Wali Kelas KELAS 10 TKJ 1. Menu Wali Kelas tidak lagi tersedia.', 4, '', 1, '2026-05-04 04:51:46'),
(740, 5, 'wali_kelas_removed', 'Anda Dicopot sebagai Wali Kelas', 'Anda telah dicopot dari jabatan Wali Kelas KELAS 10 TKJ 1. Menu Wali Kelas tidak lagi tersedia.', 3, '', 1, '2026-05-04 04:51:49'),
(741, 5, 'wali_kelas_assigned', 'Wali Kelas Baru', 'kariada ditunjuk sebagai Wali Kelas KELAS 10 TO 2', 5, '', 1, '2026-05-04 04:51:58'),
(742, 9, 'wali_kelas_assigned', 'Wali Kelas Baru', 'kariada ditunjuk sebagai Wali Kelas KELAS 10 TO 2', 5, '', 0, '2026-05-04 04:51:58'),
(743, 5, 'wali_kelas_assigned', 'Anda Ditunjuk sebagai Wali Kelas', 'Anda telah ditunjuk sebagai Wali Kelas KELAS 10 TO 2 untuk tahun ajaran 2026. Sekarang Anda dapat mengakses menu Wali Kelas.', 5, '', 1, '2026-05-04 04:51:58'),
(744, 11, 'system', '❌ Akses Input Data Dicabut', 'SuperAdmin telah mencabut akses Anda untuk input data: prestasi, organisasi, event, pelanggaran, perilaku. Anda tidak dapat menginput data tersebut untuk sementara.', NULL, '', 0, '2026-05-04 06:18:33'),
(745, 3, 'system', '❌ Akses Input Data Dicabut', 'SuperAdmin telah mencabut akses Anda untuk input data: prestasi, organisasi, event, pelanggaran, perilaku. Anda tidak dapat menginput data tersebut untuk sementara.', NULL, '', 0, '2026-05-04 06:18:33'),
(746, 7, 'system', '❌ Akses Input Data Dicabut', 'SuperAdmin telah mencabut akses Anda untuk input data: prestasi, organisasi, event, pelanggaran, perilaku. Anda tidak dapat menginput data tersebut untuk sementara.', NULL, '', 0, '2026-05-04 06:18:33'),
(747, 10, 'system', '❌ Akses Input Data Dicabut', 'SuperAdmin telah mencabut akses Anda untuk input data: prestasi, organisasi, event, pelanggaran, perilaku. Anda tidak dapat menginput data tersebut untuk sementara.', NULL, '', 0, '2026-05-04 06:18:33'),
(748, 14, 'system', '❌ Akses Input Data Dicabut', 'SuperAdmin telah mencabut akses Anda untuk input data: prestasi, organisasi, event, pelanggaran, perilaku. Anda tidak dapat menginput data tersebut untuk sementara.', NULL, '', 1, '2026-05-04 06:18:33'),
(749, 6, 'system', '❌ Akses Input Data Dicabut', 'SuperAdmin telah mencabut akses Anda untuk input data: prestasi, organisasi, event, pelanggaran, perilaku. Anda tidak dapat menginput data tersebut untuk sementara.', NULL, '', 0, '2026-05-04 06:18:33'),
(750, 8, 'system', '❌ Akses Input Data Dicabut', 'SuperAdmin telah mencabut akses Anda untuk input data: prestasi, organisasi, event, pelanggaran, perilaku. Anda tidak dapat menginput data tersebut untuk sementara.', NULL, '', 0, '2026-05-04 06:18:33'),
(751, 12, 'system', '❌ Akses Input Data Dicabut', 'SuperAdmin telah mencabut akses Anda untuk input data: prestasi, organisasi, event, pelanggaran, perilaku. Anda tidak dapat menginput data tersebut untuk sementara.', NULL, '', 0, '2026-05-04 06:18:33'),
(752, 13, 'system', '❌ Akses Input Data Dicabut', 'SuperAdmin telah mencabut akses Anda untuk input data: prestasi, organisasi, event, pelanggaran, perilaku. Anda tidak dapat menginput data tersebut untuk sementara.', NULL, '', 0, '2026-05-04 06:18:33'),
(753, 11, 'system', '📝 Perubahan Akses Input Data', 'SuperAdmin telah mengubah akses input data Anda. Aktif: prestasi. Nonaktif: organisasi, event, pelanggaran, perilaku.', NULL, '', 0, '2026-05-05 07:41:40'),
(754, 3, 'system', '📝 Perubahan Akses Input Data', 'SuperAdmin telah mengubah akses input data Anda. Aktif: prestasi. Nonaktif: organisasi, event, pelanggaran, perilaku.', NULL, '', 0, '2026-05-05 07:41:40'),
(755, 7, 'system', '📝 Perubahan Akses Input Data', 'SuperAdmin telah mengubah akses input data Anda. Aktif: prestasi. Nonaktif: organisasi, event, pelanggaran, perilaku.', NULL, '', 0, '2026-05-05 07:41:40'),
(756, 14, 'system', '📝 Perubahan Akses Input Data', 'SuperAdmin telah mengubah akses input data Anda. Aktif: prestasi. Nonaktif: organisasi, event, pelanggaran, perilaku.', NULL, '', 1, '2026-05-05 07:41:40'),
(757, 10, 'system', '📝 Perubahan Akses Input Data', 'SuperAdmin telah mengubah akses input data Anda. Aktif: prestasi. Nonaktif: organisasi, event, pelanggaran, perilaku.', NULL, '', 0, '2026-05-05 07:41:40'),
(758, 6, 'system', '📝 Perubahan Akses Input Data', 'SuperAdmin telah mengubah akses input data Anda. Aktif: prestasi. Nonaktif: organisasi, event, pelanggaran, perilaku.', NULL, '', 0, '2026-05-05 07:41:41'),
(759, 8, 'system', '📝 Perubahan Akses Input Data', 'SuperAdmin telah mengubah akses input data Anda. Aktif: prestasi. Nonaktif: organisasi, event, pelanggaran, perilaku.', NULL, '', 0, '2026-05-05 07:41:41'),
(760, 12, 'system', '📝 Perubahan Akses Input Data', 'SuperAdmin telah mengubah akses input data Anda. Aktif: prestasi. Nonaktif: organisasi, event, pelanggaran, perilaku.', NULL, '', 0, '2026-05-05 07:41:41'),
(761, 13, 'system', '📝 Perubahan Akses Input Data', 'SuperAdmin telah mengubah akses input data Anda. Aktif: prestasi. Nonaktif: organisasi, event, pelanggaran, perilaku.', NULL, '', 0, '2026-05-05 07:41:41'),
(762, 5, 'approval_needed', 'Persetujuan Prestasi', 'dean (4321) mengajukan prestasi: lomba glm', 12, 'prestasi', 1, '2026-05-05 07:42:20'),
(763, 1, 'new_submission', 'Pengajuan Prestasi Baru', 'dean (4321) mengajukan prestasi: lomba glm', 12, 'prestasi', 0, '2026-05-05 07:42:20'),
(764, 14, 'pembina_approved', 'Persetujuan Pembina', 'Pengajuan Anda telah disetujui oleh Pembina dan menunggu persetujuan SuperAdmin', 12, 'prestasi', 1, '2026-05-05 07:58:40');
INSERT INTO `notifications` (`id`, `user_id`, `type`, `title`, `message`, `related_id`, `related_type`, `is_read`, `created_at`) VALUES
(765, 1, 'approval_needed', 'Persetujuan SuperAdmin Diperlukan', 'Pengajuan prestasi dari dean telah disetujui oleh Pembina dan menunggu persetujuan Anda: lomba glm', 12, 'prestasi', 0, '2026-05-05 07:58:40'),
(766, 14, 'approved', 'Pengajuan Disetujui', 'Selamat! Pengajuan Prestasi Anda telah disetujui dan poin telah ditambahkan.', 12, 'prestasi', 1, '2026-05-05 07:58:56'),
(767, 5, 'approval_needed', 'Persetujuan Prestasi', 'dean (4321) mengajukan prestasi: lomba bmc', 13, 'prestasi', 1, '2026-05-05 08:00:34'),
(768, 1, 'new_submission', 'Pengajuan Prestasi Baru', 'dean (4321) mengajukan prestasi: lomba bmc', 13, 'prestasi', 0, '2026-05-05 08:00:34'),
(769, 14, 'pembina_approved', 'Persetujuan Pembina', 'Pengajuan Anda telah disetujui oleh Pembina dan menunggu persetujuan SuperAdmin', 13, 'prestasi', 1, '2026-05-05 08:01:20'),
(770, 1, 'approval_needed', 'Persetujuan SuperAdmin Diperlukan', 'Pengajuan prestasi dari dean telah disetujui oleh Pembina dan menunggu persetujuan Anda: lomba bmc', 13, 'prestasi', 0, '2026-05-05 08:01:20'),
(771, 14, 'approved', 'Pengajuan Disetujui', 'Selamat! Pengajuan Prestasi Anda telah disetujui dan poin telah ditambahkan.', 13, 'prestasi', 1, '2026-05-05 08:01:37'),
(772, 1, 'approval_needed', 'Persetujuan Update Biodata', 'Guru mengajukan perubahan biodata untuk siswa: agus (123124)', 4, '', 0, '2026-05-05 08:03:17'),
(773, 5, 'wali_kelas_assigned', 'Wali Kelas Baru', 'surya ditunjuk sebagai Wali Kelas KELAS 10 TKJ 1', 6, '', 1, '2026-05-05 08:03:57'),
(774, 9, 'wali_kelas_assigned', 'Wali Kelas Baru', 'surya ditunjuk sebagai Wali Kelas KELAS 10 TKJ 1', 6, '', 0, '2026-05-05 08:03:57'),
(775, 15, 'wali_kelas_assigned', 'Wali Kelas Baru', 'surya ditunjuk sebagai Wali Kelas KELAS 10 TKJ 1', 6, '', 0, '2026-05-05 08:03:57'),
(776, 16, 'wali_kelas_assigned', 'Wali Kelas Baru', 'surya ditunjuk sebagai Wali Kelas KELAS 10 TKJ 1', 6, '', 0, '2026-05-05 08:03:57'),
(777, 16, 'wali_kelas_assigned', 'Anda Ditunjuk sebagai Wali Kelas', 'Anda telah ditunjuk sebagai Wali Kelas KELAS 10 TKJ 1 untuk tahun ajaran 2026. Sekarang Anda dapat mengakses menu Wali Kelas.', 6, '', 0, '2026-05-05 08:03:57'),
(778, 1, 'approval_needed', 'Persetujuan Pembuatan Akun Siswa', 'Guru mengajukan pembuatan akun siswa: suryaburitk (433)', 4, '', 0, '2026-05-05 08:05:14'),
(779, 11, 'system', '📝 Perubahan Akses Input Data', 'SuperAdmin telah mengubah akses input data Anda. Aktif: prestasi, organisasi. Nonaktif: event, pelanggaran, perilaku.', NULL, '', 0, '2026-05-05 08:06:06'),
(780, 3, 'system', '📝 Perubahan Akses Input Data', 'SuperAdmin telah mengubah akses input data Anda. Aktif: prestasi, organisasi. Nonaktif: event, pelanggaran, perilaku.', NULL, '', 0, '2026-05-05 08:06:06'),
(781, 7, 'system', '📝 Perubahan Akses Input Data', 'SuperAdmin telah mengubah akses input data Anda. Aktif: prestasi, organisasi. Nonaktif: event, pelanggaran, perilaku.', NULL, '', 0, '2026-05-05 08:06:06'),
(782, 14, 'system', '📝 Perubahan Akses Input Data', 'SuperAdmin telah mengubah akses input data Anda. Aktif: prestasi, organisasi. Nonaktif: event, pelanggaran, perilaku.', NULL, '', 1, '2026-05-05 08:06:06'),
(783, 10, 'system', '📝 Perubahan Akses Input Data', 'SuperAdmin telah mengubah akses input data Anda. Aktif: prestasi, organisasi. Nonaktif: event, pelanggaran, perilaku.', NULL, '', 0, '2026-05-05 08:06:06'),
(784, 6, 'system', '📝 Perubahan Akses Input Data', 'SuperAdmin telah mengubah akses input data Anda. Aktif: prestasi, organisasi. Nonaktif: event, pelanggaran, perilaku.', NULL, '', 0, '2026-05-05 08:06:06'),
(785, 8, 'system', '📝 Perubahan Akses Input Data', 'SuperAdmin telah mengubah akses input data Anda. Aktif: prestasi, organisasi. Nonaktif: event, pelanggaran, perilaku.', NULL, '', 0, '2026-05-05 08:06:06'),
(786, 12, 'system', '📝 Perubahan Akses Input Data', 'SuperAdmin telah mengubah akses input data Anda. Aktif: prestasi, organisasi. Nonaktif: event, pelanggaran, perilaku.', NULL, '', 0, '2026-05-05 08:06:06'),
(787, 13, 'system', '📝 Perubahan Akses Input Data', 'SuperAdmin telah mengubah akses input data Anda. Aktif: prestasi, organisasi. Nonaktif: event, pelanggaran, perilaku.', NULL, '', 0, '2026-05-05 08:06:06'),
(788, 11, 'system', '📝 Perubahan Akses Input Data', 'SuperAdmin telah mengubah akses input data Anda. Aktif: prestasi, organisasi, event. Nonaktif: pelanggaran, perilaku.', NULL, '', 0, '2026-05-05 08:06:08'),
(789, 3, 'system', '📝 Perubahan Akses Input Data', 'SuperAdmin telah mengubah akses input data Anda. Aktif: prestasi, organisasi, event. Nonaktif: pelanggaran, perilaku.', NULL, '', 0, '2026-05-05 08:06:08'),
(790, 7, 'system', '📝 Perubahan Akses Input Data', 'SuperAdmin telah mengubah akses input data Anda. Aktif: prestasi, organisasi, event. Nonaktif: pelanggaran, perilaku.', NULL, '', 0, '2026-05-05 08:06:08'),
(791, 14, 'system', '📝 Perubahan Akses Input Data', 'SuperAdmin telah mengubah akses input data Anda. Aktif: prestasi, organisasi, event. Nonaktif: pelanggaran, perilaku.', NULL, '', 1, '2026-05-05 08:06:08'),
(792, 10, 'system', '📝 Perubahan Akses Input Data', 'SuperAdmin telah mengubah akses input data Anda. Aktif: prestasi, organisasi, event. Nonaktif: pelanggaran, perilaku.', NULL, '', 0, '2026-05-05 08:06:08'),
(793, 6, 'system', '📝 Perubahan Akses Input Data', 'SuperAdmin telah mengubah akses input data Anda. Aktif: prestasi, organisasi, event. Nonaktif: pelanggaran, perilaku.', NULL, '', 0, '2026-05-05 08:06:08'),
(794, 8, 'system', '📝 Perubahan Akses Input Data', 'SuperAdmin telah mengubah akses input data Anda. Aktif: prestasi, organisasi, event. Nonaktif: pelanggaran, perilaku.', NULL, '', 0, '2026-05-05 08:06:08'),
(795, 12, 'system', '📝 Perubahan Akses Input Data', 'SuperAdmin telah mengubah akses input data Anda. Aktif: prestasi, organisasi, event. Nonaktif: pelanggaran, perilaku.', NULL, '', 0, '2026-05-05 08:06:08'),
(796, 13, 'system', '📝 Perubahan Akses Input Data', 'SuperAdmin telah mengubah akses input data Anda. Aktif: prestasi, organisasi, event. Nonaktif: pelanggaran, perilaku.', NULL, '', 0, '2026-05-05 08:06:08'),
(797, 5, 'approval_needed', 'Persetujuan Organisasi', 'dean (4321) mengajukan organisasi: osis', 3, 'organisasi', 1, '2026-05-05 08:06:47'),
(798, 1, 'new_submission', 'Pengajuan Organisasi Baru', 'dean (4321) mengajukan organisasi: osis', 3, 'organisasi', 0, '2026-05-05 08:06:47'),
(799, 5, 'approval_needed', 'Persetujuan Event', 'dean (4321) mengajukan event: gaatau', 2, 'event', 1, '2026-05-05 08:07:16'),
(800, 1, 'new_submission', 'Pengajuan Event Baru', 'dean (4321) mengajukan event: gaatau', 2, 'event', 0, '2026-05-05 08:07:16'),
(801, 14, 'rejected', 'Pengajuan Ditolak', 'Pengajuan Anda ditolak oleh Pembina: ok', 9, 'prestasi', 1, '2026-05-14 06:29:27'),
(802, 14, 'rejected', 'Pengajuan Ditolak', 'Pengajuan Anda ditolak oleh Pembina: ok', 9, 'prestasi', 1, '2026-05-14 06:29:31'),
(803, 14, 'rejected', 'Pengajuan Ditolak', 'Pengajuan Anda ditolak oleh Pembina: ok', 9, 'prestasi', 1, '2026-05-14 06:29:33'),
(804, 14, 'rejected', 'Pengajuan Ditolak', 'Pengajuan Anda ditolak oleh Pembina: ok', 9, 'prestasi', 1, '2026-05-14 06:29:34'),
(805, 14, 'rejected', 'Pengajuan Ditolak', 'Pengajuan Anda ditolak oleh Pembina: ok', 9, 'prestasi', 1, '2026-05-14 06:29:35'),
(806, 14, 'rejected', 'Pengajuan Ditolak', 'Pengajuan Anda ditolak oleh Pembina: ok', 9, 'prestasi', 1, '2026-05-14 06:29:36'),
(807, 14, 'rejected', 'Pengajuan Ditolak', 'Pengajuan Anda ditolak oleh Pembina: ok', 9, 'prestasi', 1, '2026-05-14 06:29:41'),
(808, 14, 'rejected', 'Pengajuan Ditolak', 'Pengajuan Anda ditolak oleh Pembina: ok', 9, 'prestasi', 1, '2026-05-14 06:29:41'),
(809, 14, 'rejected', 'Pengajuan Ditolak', 'Pengajuan Anda ditolak oleh Pembina: ok', 9, 'prestasi', 1, '2026-05-14 06:29:41'),
(810, 14, 'rejected', 'Pengajuan Ditolak', 'Pengajuan Anda ditolak oleh Pembina: ok', 9, 'prestasi', 1, '2026-05-14 06:29:41'),
(811, 14, 'rejected', 'Pengajuan Ditolak', 'Pengajuan Anda ditolak oleh Pembina: ok', 9, 'prestasi', 1, '2026-05-14 06:29:45'),
(812, 14, 'rejected', 'Pengajuan Ditolak', 'Pengajuan Anda ditolak oleh Pembina: ok', 9, 'prestasi', 1, '2026-05-14 06:29:47'),
(813, 14, 'rejected', 'Pengajuan Ditolak', 'Pengajuan Anda ditolak oleh Pembina: ok', 9, 'prestasi', 1, '2026-05-14 06:29:49'),
(814, 14, 'rejected', 'Pengajuan Ditolak', 'Pengajuan Anda ditolak oleh Pembina: ok', 9, 'prestasi', 1, '2026-05-14 06:29:51'),
(815, 14, 'rejected', 'Pengajuan Ditolak', 'Pengajuan Anda ditolak oleh Pembina: ok', 9, 'prestasi', 1, '2026-05-14 06:29:52'),
(816, 14, 'rejected', 'Pengajuan Ditolak', 'Pengajuan Anda ditolak oleh Pembina: ok', 10, 'prestasi', 1, '2026-05-14 06:30:11'),
(817, 14, 'rejected', 'Pengajuan Ditolak', 'Pengajuan Anda ditolak oleh Pembina: ok', 2, 'event', 1, '2026-05-14 06:30:56'),
(818, 14, 'rejected', 'Pengajuan Ditolak', 'Pengajuan Anda ditolak oleh Pembina: ok', 3, 'organisasi', 1, '2026-05-14 06:31:23'),
(819, 14, 'rejected', 'Pengajuan Ditolak', 'Pengajuan Anda ditolak oleh Pembina: ok', 3, 'organisasi', 1, '2026-05-14 06:31:25'),
(820, 14, 'rejected', 'Pengajuan Ditolak', 'Pengajuan Anda ditolak oleh Pembina: ok', 3, 'organisasi', 1, '2026-05-14 06:31:26'),
(821, 14, 'rejected', 'Pengajuan Ditolak', 'Pengajuan Anda ditolak oleh Pembina: ok', 3, 'organisasi', 1, '2026-05-14 06:31:27'),
(822, 14, 'rejected', 'Pengajuan Ditolak', 'Pengajuan Anda ditolak oleh Pembina: ok', 3, 'organisasi', 1, '2026-05-14 06:31:27'),
(823, 14, 'rejected', 'Pengajuan Ditolak', 'Pengajuan Anda ditolak oleh Pembina: ok', 3, 'organisasi', 1, '2026-05-14 06:31:28'),
(824, 5, 'approval_needed', 'Persetujuan Prestasi', 'dean (4321) mengajukan prestasi: karaidasdsdwddwdddwdw', 14, 'prestasi', 1, '2026-05-14 06:40:39'),
(825, 1, 'new_submission', 'Pengajuan Prestasi Baru', 'dean (4321) mengajukan prestasi: karaidasdsdwddwdddwdw', 14, 'prestasi', 0, '2026-05-14 06:40:39'),
(826, 14, 'pembina_approved', 'Persetujuan Pembina', 'Pengajuan Anda telah disetujui oleh Pembina dan menunggu persetujuan SuperAdmin', 14, 'prestasi', 0, '2026-05-14 06:42:44'),
(827, 1, 'approval_needed', 'Persetujuan SuperAdmin Diperlukan', 'Pengajuan prestasi dari dean telah disetujui oleh Pembina dan menunggu persetujuan Anda: karaidasdsdwddwdddwdw', 14, 'prestasi', 0, '2026-05-14 06:42:44'),
(828, 14, 'pembina_approved', 'Persetujuan Pembina', 'Pengajuan Anda telah disetujui oleh Pembina dan menunggu persetujuan SuperAdmin', 14, 'prestasi', 0, '2026-05-14 06:43:13'),
(829, 1, 'approval_needed', 'Persetujuan SuperAdmin Diperlukan', 'Pengajuan prestasi dari dean telah disetujui oleh Pembina dan menunggu persetujuan Anda: karaidasdsdwddwdddwdw', 14, 'prestasi', 0, '2026-05-14 06:43:13'),
(830, 14, 'rejected', 'Pengajuan Ditolak', 'Pengajuan Anda ditolak oleh SuperAdmin: p', 9, 'prestasi', 0, '2026-05-14 06:43:44'),
(831, 14, 'rejected', 'Pengajuan Ditolak', 'Pengajuan Anda ditolak oleh SuperAdmin: ok', 10, 'prestasi', 0, '2026-05-14 06:43:47'),
(832, 14, 'approved', 'Pengajuan Disetujui', 'Selamat! Pengajuan Prestasi Anda telah disetujui dan poin telah ditambahkan.', 14, 'prestasi', 0, '2026-05-14 06:43:56'),
(833, 14, 'rejected', 'Pengajuan Ditolak', 'Pengajuan Anda ditolak oleh SuperAdmin: ok', 2, 'event', 0, '2026-05-14 06:44:15'),
(834, 14, 'rejected', 'Pengajuan Ditolak', 'Pengajuan Anda ditolak oleh SuperAdmin: ok', 3, 'organisasi', 0, '2026-05-14 06:44:20'),
(835, 5, 'approved', 'Pembuatan Akun Siswa Disetujui', 'Pembuatan akun siswa suryaburitk (433) telah disetujui oleh SuperAdmin.', 4, '', 1, '2026-05-14 06:44:28'),
(836, 3, 'rejected', 'Pengajuan Update Biodata Ditolak', 'Pengajuan update biodata ditolak: ok', 4, '', 0, '2026-05-14 06:44:33'),
(837, 5, 'approval_needed', 'Persetujuan Prestasi', 'dean (4321) mengajukan prestasi: fseegret4t44343', 15, 'prestasi', 1, '2026-05-14 06:48:46'),
(838, 1, 'new_submission', 'Pengajuan Prestasi Baru', 'dean (4321) mengajukan prestasi: fseegret4t44343', 15, 'prestasi', 0, '2026-05-14 06:48:46'),
(839, 14, 'pembina_approved', 'Persetujuan Pembina', 'Pengajuan Anda telah disetujui oleh Pembina dan menunggu persetujuan SuperAdmin', 15, 'prestasi', 0, '2026-05-14 06:49:02'),
(840, 1, 'approval_needed', 'Persetujuan SuperAdmin Diperlukan', 'Pengajuan prestasi dari dean telah disetujui oleh Pembina dan menunggu persetujuan Anda: fseegret4t44343', 15, 'prestasi', 0, '2026-05-14 06:49:02'),
(841, 14, 'approved', 'Pengajuan Disetujui', 'Selamat! Pengajuan Prestasi Anda telah disetujui dan poin telah ditambahkan.', 15, 'prestasi', 0, '2026-05-14 06:49:37'),
(842, 5, 'approval_needed', 'Persetujuan Prestasi', 'dean (4321) mengajukan prestasi: efefeeefe3ee', 16, 'prestasi', 1, '2026-05-14 06:54:12'),
(843, 1, 'new_submission', 'Pengajuan Prestasi Baru', 'dean (4321) mengajukan prestasi: efefeeefe3ee', 16, 'prestasi', 0, '2026-05-14 06:54:12'),
(844, 14, 'pembina_approved', 'Persetujuan Pembina', 'Pengajuan Anda telah disetujui oleh Pembina dan menunggu persetujuan SuperAdmin', 16, 'prestasi', 0, '2026-05-14 06:54:31'),
(845, 1, 'approval_needed', 'Persetujuan SuperAdmin Diperlukan', 'Pengajuan prestasi dari dean telah disetujui oleh Pembina dan menunggu persetujuan Anda: efefeeefe3ee', 16, 'prestasi', 0, '2026-05-14 06:54:31'),
(846, 14, 'approved', 'Pengajuan Disetujui', 'Selamat! Pengajuan Prestasi Anda telah disetujui dan poin telah ditambahkan.', 16, 'prestasi', 0, '2026-05-14 06:54:59'),
(847, 14, 'approved', 'Pengajuan Disetujui', 'Selamat! Pengajuan Prestasi Anda telah disetujui dan poin telah ditambahkan.', 16, 'prestasi', 0, '2026-05-14 06:55:01'),
(848, 14, 'approved', 'Pengajuan Disetujui', 'Selamat! Pengajuan Prestasi Anda telah disetujui dan poin telah ditambahkan.', 16, 'prestasi', 0, '2026-05-14 06:55:11'),
(849, 14, 'approved', 'Pengajuan Disetujui', 'Selamat! Pengajuan Prestasi Anda telah disetujui dan poin telah ditambahkan.', 16, 'prestasi', 0, '2026-05-14 06:55:13');

-- --------------------------------------------------------

--
-- Table structure for table `organisasi`
--

CREATE TABLE `organisasi` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `nama` varchar(100) NOT NULL,
  `nis` varchar(20) NOT NULL,
  `kelas` varchar(50) DEFAULT NULL,
  `grha` varchar(50) DEFAULT NULL,
  `jurusan` enum('TKJ','TO','DPIB') DEFAULT NULL,
  `jabatan_organisasi` varchar(100) NOT NULL,
  `foto` varchar(255) DEFAULT NULL,
  `kategori_organisasi` varchar(100) DEFAULT NULL,
  `point` int(11) NOT NULL,
  `status` enum('pending','approved','rejected') DEFAULT 'pending',
  `rejection_reason` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `organisasi`
--

INSERT INTO `organisasi` (`id`, `user_id`, `nama`, `nis`, `kelas`, `grha`, `jurusan`, `jabatan_organisasi`, `foto`, `kategori_organisasi`, `point`, `status`, `rejection_reason`, `created_at`) VALUES
(1, 6, 'kariada', '1208', 'KELAS 10 DPIB 1', 'Daksina', 'TO', 'ketua', '1777708493722.png', 'osis', 6, 'pending', NULL, '2026-05-02 07:54:53'),
(2, 6, 'kariada', '1208', 'KELAS 10 DPIB 1', 'Airsanya', 'TKJ', 'ketua', '1777708559897.png', 'osis', 6, 'pending', NULL, '2026-05-02 07:55:59'),
(3, 6, 'kariada', '1208', 'KELAS 10 DPIB 1', 'Airsanya', 'TKJ', 'ketua', '1777708900476.png', 'osis', 6, 'pending', NULL, '2026-05-02 08:01:40'),
(4, 14, 'dean', '4321', 'KELAS 10 TKJ 1', 'Genya', 'TKJ', 'ketua', '1777710656502-456319677.png', 'osis', 6, 'approved', NULL, '2026-05-02 08:34:20'),
(5, 14, 'dean', '4321', 'KELAS 10 TKJ 1', 'Genya', 'TKJ', 'anggota', 'https://drive.google.com/file/d/1jk9pdhcUzcf_ciXPb-fWOIbJ4ABUJbRD/view?usp=drivesdk', 'osis', 1, 'approved', NULL, '2026-05-03 10:29:55');

-- --------------------------------------------------------

--
-- Table structure for table `organisasi_approvals`
--

CREATE TABLE `organisasi_approvals` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `nama` varchar(255) NOT NULL,
  `nis` varchar(50) NOT NULL,
  `kelas` varchar(50) DEFAULT NULL,
  `grha` varchar(50) DEFAULT NULL,
  `jurusan` varchar(50) DEFAULT NULL,
  `pembina` varchar(255) DEFAULT NULL,
  `jabatan_organisasi` varchar(100) DEFAULT NULL,
  `kategori_organisasi` varchar(255) DEFAULT NULL,
  `foto_path` varchar(255) DEFAULT NULL,
  `pembina_status` enum('pending','approved','rejected') DEFAULT 'pending',
  `superadmin_status` enum('pending','approved','rejected') DEFAULT 'pending',
  `pembina_id` int(11) DEFAULT NULL,
  `pembina_approved_at` timestamp NULL DEFAULT NULL,
  `superadmin_approved_at` timestamp NULL DEFAULT NULL,
  `pembina_notes` text DEFAULT NULL,
  `superadmin_notes` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `organisasi_approvals`
--

INSERT INTO `organisasi_approvals` (`id`, `user_id`, `nama`, `nis`, `kelas`, `grha`, `jurusan`, `pembina`, `jabatan_organisasi`, `kategori_organisasi`, `foto_path`, `pembina_status`, `superadmin_status`, `pembina_id`, `pembina_approved_at`, `superadmin_approved_at`, `pembina_notes`, `superadmin_notes`, `created_at`, `updated_at`) VALUES
(1, 14, 'dean', '4321', 'KELAS 10 TKJ 1', 'Genya', 'TKJ', 'kariada', 'ketua', 'osis', '1777710656502-456319677.png', 'approved', 'approved', 5, '2026-05-02 08:31:20', '2026-05-02 08:34:20', 'oke', 'ok', '2026-05-02 08:30:56', '2026-05-02 08:34:20'),
(2, 14, 'dean', '4321', 'KELAS 10 TKJ 1', 'Genya', 'TKJ', 'kariada', 'anggota', 'osis', 'https://drive.google.com/file/d/1jk9pdhcUzcf_ciXPb-fWOIbJ4ABUJbRD/view?usp=drivesdk', 'approved', 'approved', 5, '2026-05-03 10:27:54', '2026-05-03 10:29:55', 'ok', 'ok', '2026-05-03 10:27:22', '2026-05-03 10:29:55'),
(3, 14, 'dean', '4321', 'KELAS 10 TKJ 1', 'Genya', 'TKJ', 'kariada', 'anggota', 'osis', 'https://drive.google.com/file/d/1q3gyqrvm82Fp74-RPv8iUtt4FQFRpr4i/view?usp=drivesdk', 'rejected', 'rejected', 5, NULL, NULL, 'ok', 'ok', '2026-05-05 08:06:47', '2026-05-14 06:44:20');

-- --------------------------------------------------------

--
-- Table structure for table `pelanggaran`
--

CREATE TABLE `pelanggaran` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `nama` varchar(100) NOT NULL,
  `nis` varchar(20) NOT NULL,
  `kelas` varchar(50) DEFAULT NULL,
  `jurusan` enum('TKJ','TO','DPIB') DEFAULT NULL,
  `grha` varchar(50) DEFAULT NULL,
  `keterangan` text NOT NULL,
  `foto` varchar(255) DEFAULT NULL,
  `jenis_pelanggaran` enum('ringan','sedang','berat') NOT NULL,
  `point_dikurangi` int(11) NOT NULL,
  `status` enum('pending','approved','rejected') DEFAULT 'pending',
  `rejection_reason` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `perilaku`
--

CREATE TABLE `perilaku` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `nama` varchar(100) NOT NULL,
  `nis` varchar(20) NOT NULL,
  `kelas` varchar(50) DEFAULT NULL,
  `jurusan` enum('TKJ','TO','DPIB') DEFAULT NULL,
  `grha` varchar(50) DEFAULT NULL,
  `karakter_siswa` text NOT NULL,
  `point` int(11) NOT NULL,
  `status` enum('pending','approved','rejected') DEFAULT 'pending',
  `rejection_reason` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `permissions`
--

CREATE TABLE `permissions` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `can_input_prestasi` tinyint(1) DEFAULT 0,
  `can_input_organisasi` tinyint(1) DEFAULT 0,
  `can_input_event` tinyint(1) DEFAULT 0,
  `can_input_pelanggaran` tinyint(1) DEFAULT 0,
  `can_input_perilaku` tinyint(1) DEFAULT 0,
  `can_view_all_data` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `permissions`
--

INSERT INTO `permissions` (`id`, `user_id`, `can_input_prestasi`, `can_input_organisasi`, `can_input_event`, `can_input_pelanggaran`, `can_input_perilaku`, `can_view_all_data`) VALUES
(18, 11, 1, 1, 1, 0, 0, 0),
(19, 3, 1, 1, 1, 0, 0, 0),
(20, 7, 1, 1, 1, 0, 0, 0),
(21, 14, 1, 1, 1, 0, 0, 0),
(22, 10, 1, 1, 1, 0, 0, 0),
(23, 6, 1, 1, 1, 0, 0, 0),
(24, 8, 1, 1, 1, 0, 0, 0),
(25, 12, 1, 1, 1, 0, 0, 0),
(26, 13, 1, 1, 1, 0, 0, 0),
(27, 5, 0, 0, 0, 0, 0, 0),
(28, 9, 0, 0, 0, 0, 0, 0),
(29, 15, 0, 0, 0, 0, 0, 0),
(30, 16, 0, 0, 0, 0, 0, 0),
(31, 17, 0, 0, 0, 0, 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `prestasi`
--

CREATE TABLE `prestasi` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `nama` varchar(100) NOT NULL,
  `nis` varchar(20) NOT NULL,
  `jenis` enum('akademik','nonakademik') NOT NULL,
  `nama_lomba` varchar(255) NOT NULL,
  `jurusan` enum('TKJ','TO','DPIB') DEFAULT NULL,
  `foto` varchar(255) DEFAULT NULL,
  `kelas` varchar(50) DEFAULT NULL,
  `pembina` varchar(100) DEFAULT NULL,
  `grha` varchar(50) DEFAULT NULL,
  `juara` enum('juara 1','juara 2','juara 3','juara harapan 1','juara harapan 2','juara harapan 3','finalis','peserta') NOT NULL,
  `kategori` enum('kecamatan','kabupaten','provinsi','nasional','internasional') NOT NULL,
  `point` int(11) NOT NULL,
  `status` enum('pending','approved','rejected') DEFAULT 'pending',
  `rejection_reason` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `prestasi`
--

INSERT INTO `prestasi` (`id`, `user_id`, `nama`, `nis`, `jenis`, `nama_lomba`, `jurusan`, `foto`, `kelas`, `pembina`, `grha`, `juara`, `kategori`, `point`, `status`, `rejection_reason`, `created_at`) VALUES
(1, 1, 'kariada', '1208', 'akademik', 'lomba pejgan', 'TKJ', 'uploads\\approvals\\1777703322457-183717317.png', 'KELAS 10 DPIB 1', 'kariada', 'Airsanya', 'juara 1', 'internasional', 20, 'approved', NULL, '2026-05-02 06:52:32'),
(2, 6, 'kariada', '1208', 'akademik', 'lomba untuk dapetin elf', 'TKJ', 'uploads\\approvals\\1777708364308-959971205.png', 'KELAS 10 DPIB 1', 'kariada', 'Wayabhya', 'juara harapan 1', 'internasional', 0, 'approved', NULL, '2026-05-02 07:53:31'),
(3, 14, 'dean', '4321', 'akademik', 'sdds', 'TKJ', 'uploads\\approvals\\1777711178816-721024068.png', 'KELAS 10 TKJ 1', 'kariada', 'Genya', 'juara harapan 1', 'kecamatan', 0, 'approved', NULL, '2026-05-02 09:04:02'),
(4, 14, 'dean', '4321', 'akademik', 'lomba agyus', 'TKJ', 'uploads\\approvals\\1777793574041-379057094.png', 'KELAS 10 TKJ 1', 'kariada', 'Genya', 'juara 3', 'provinsi', 10, 'approved', NULL, '2026-05-03 07:33:49'),
(5, 6, 'dean', '4321', 'akademik', 'karaidasss', 'TKJ', 'uploads\\approvals\\1777796257681-816181855.png', 'KELAS 10 TKJ 1', 'kariada', 'Genya', 'juara 3', 'provinsi', 10, 'approved', NULL, '2026-05-03 08:18:19'),
(6, 14, 'dean', '4321', 'akademik', 'lomba untuk dapetin elfsdsds', 'TKJ', 'https://drive.google.com/file/d/1E67HfAizNoIme8GFPm9c53Os_Q-EuLO_/view?usp=drivesdk', 'KELAS 10 TKJ 1', 'kariada', 'Genya', 'juara 2', 'internasional', 15, 'approved', NULL, '2026-05-03 09:26:50'),
(7, 14, 'dean', '4321', 'akademik', 'lpo', 'TKJ', 'https://drive.google.com/file/d/1JbzCYTDhTv16JCS18DIX4e2C9To1gpyy/view?usp=drivesdk', 'KELAS 10 TKJ 1', 'kariada', 'Genya', 'juara 2', 'kabupaten', 15, 'approved', NULL, '2026-05-03 10:29:50'),
(8, 14, 'dean', '4321', 'akademik', 'lomba glm', 'TKJ', 'uploads\\approvals\\1777966940325-37467671.png', 'KELAS 10 TKJ 1', 'kariada', 'Genya', 'peserta', 'internasional', 0, 'approved', NULL, '2026-05-05 07:58:56'),
(9, 14, 'dean', '4321', 'akademik', 'lomba bmc', 'TKJ', 'https://drive.google.com/file/d/1kvsxJGWISEX4o_UxOO59oIZ8A17ACmId/view?usp=drivesdk', 'KELAS 10 TKJ 1', 'kariada', 'Genya', 'juara 3', 'internasional', 10, 'approved', NULL, '2026-05-05 08:01:37'),
(10, 14, 'dean', '4321', 'akademik', 'karaidasdsdwddwdddwdw', 'TKJ', '/uploads/approvals/1778740839158-697994080.png', 'KELAS 10 TKJ 1', 'kariada', 'Genya', 'juara 1', 'internasional', 20, 'approved', NULL, '2026-05-14 06:43:56'),
(11, 14, 'dean', '4321', 'akademik', 'fseegret4t44343', 'TKJ', '/uploads/approvals/1778741326873-604176883.png', 'KELAS 10 TKJ 1', 'kariada', 'Genya', 'peserta', 'internasional', 0, 'approved', NULL, '2026-05-14 06:49:37'),
(12, 14, 'dean', '4321', 'akademik', 'efefeeefe3ee', 'TKJ', 'https://drive.google.com/file/d/1ksm_7J4deu6HnDijhuW6vsqnTCwBIWNw/view?usp=drivesdk', 'KELAS 10 TKJ 1', 'kariada', 'Genya', 'juara 1', 'kecamatan', 20, 'approved', NULL, '2026-05-14 06:54:59'),
(13, 14, 'dean', '4321', 'akademik', 'efefeeefe3ee', 'TKJ', 'https://drive.google.com/file/d/1ksm_7J4deu6HnDijhuW6vsqnTCwBIWNw/view?usp=drivesdk', 'KELAS 10 TKJ 1', 'kariada', 'Genya', 'juara 1', 'kecamatan', 20, 'approved', NULL, '2026-05-14 06:55:01'),
(14, 14, 'dean', '4321', 'akademik', 'efefeeefe3ee', 'TKJ', 'https://drive.google.com/file/d/1ksm_7J4deu6HnDijhuW6vsqnTCwBIWNw/view?usp=drivesdk', 'KELAS 10 TKJ 1', 'kariada', 'Genya', 'juara 1', 'kecamatan', 20, 'approved', NULL, '2026-05-14 06:55:11'),
(15, 14, 'dean', '4321', 'akademik', 'efefeeefe3ee', 'TKJ', 'https://drive.google.com/file/d/1ksm_7J4deu6HnDijhuW6vsqnTCwBIWNw/view?usp=drivesdk', 'KELAS 10 TKJ 1', 'kariada', 'Genya', 'juara 1', 'kecamatan', 20, 'approved', NULL, '2026-05-14 06:55:13');

-- --------------------------------------------------------

--
-- Table structure for table `prestasi_approvals`
--

CREATE TABLE `prestasi_approvals` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `nama` varchar(255) NOT NULL,
  `nis` varchar(50) NOT NULL,
  `jenis` enum('akademik','non_akademik') DEFAULT 'akademik',
  `nama_lomba` varchar(255) NOT NULL,
  `jurusan` varchar(50) DEFAULT NULL,
  `kelas` varchar(50) DEFAULT NULL,
  `pembina` varchar(255) DEFAULT NULL,
  `grha` varchar(50) DEFAULT NULL,
  `juara` varchar(50) DEFAULT NULL,
  `kategori` varchar(50) DEFAULT NULL,
  `foto_path` varchar(255) DEFAULT NULL,
  `pembina_status` enum('pending','approved','rejected') DEFAULT 'pending',
  `superadmin_status` enum('pending','approved','rejected') DEFAULT 'pending',
  `pembina_id` int(11) DEFAULT NULL,
  `pembina_approved_at` timestamp NULL DEFAULT NULL,
  `superadmin_approved_at` timestamp NULL DEFAULT NULL,
  `pembina_notes` text DEFAULT NULL,
  `superadmin_notes` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `prestasi_approvals`
--

INSERT INTO `prestasi_approvals` (`id`, `user_id`, `nama`, `nis`, `jenis`, `nama_lomba`, `jurusan`, `kelas`, `pembina`, `grha`, `juara`, `kategori`, `foto_path`, `pembina_status`, `superadmin_status`, `pembina_id`, `pembina_approved_at`, `superadmin_approved_at`, `pembina_notes`, `superadmin_notes`, `created_at`, `updated_at`) VALUES
(1, 1, 'kariada', '1208', 'akademik', 'lomba pejgan', 'TKJ', 'KELAS 10 DPIB 1', 'kariada', 'Airsanya', 'juara 1', 'internasional', 'uploads\\approvals\\1777703322457-183717317.png', 'approved', 'approved', 5, '2026-05-02 06:41:50', '2026-05-02 06:52:32', 'kamu ganteng', 'bangsat', '2026-05-02 06:28:42', '2026-05-02 06:52:32'),
(2, 6, 'kariada', '1208', 'akademik', 'lomba untuk dapetin elf', 'TKJ', 'KELAS 10 DPIB 1', 'kariada', 'Wayabhya', 'juara harapan 1', 'internasional', 'uploads\\approvals\\1777708364308-959971205.png', 'approved', 'approved', 5, '2026-05-02 07:53:08', '2026-05-02 07:53:31', 'bagus kamu sayang', 'kamu ganteng banget ajir', '2026-05-02 07:52:44', '2026-05-02 07:53:31'),
(3, 14, 'dean', '4321', 'akademik', 'sdds', 'TKJ', 'KELAS 10 TKJ 1', 'kariada', 'Genya', 'juara harapan 1', 'kecamatan', 'uploads\\approvals\\1777711178816-721024068.png', 'approved', 'approved', 5, '2026-05-02 08:50:53', '2026-05-02 09:04:02', 'ra', 'ayok', '2026-05-02 08:39:38', '2026-05-02 09:04:02'),
(4, 14, 'dean', '4321', 'akademik', 'lomba agyus', 'TKJ', 'KELAS 10 TKJ 1', 'kariada', 'Genya', 'juara 3', 'provinsi', 'uploads\\approvals\\1777793574041-379057094.png', 'approved', 'approved', 5, '2026-05-03 07:33:32', '2026-05-03 07:33:49', 'mantap', 'oke', '2026-05-03 07:32:54', '2026-05-03 07:33:49'),
(5, 6, 'dean', '4321', 'akademik', 'karaidasss', 'TKJ', 'KELAS 10 TKJ 1', 'kariada', 'Genya', 'juara 3', 'provinsi', 'uploads\\approvals\\1777796257681-816181855.png', 'approved', 'approved', 5, '2026-05-03 08:18:01', '2026-05-03 08:18:19', 'ok', 'ok', '2026-05-03 08:17:37', '2026-05-03 08:18:19'),
(6, 14, 'dean', '4321', 'akademik', 'lomba untuk dapetin elfsdsds', 'TKJ', 'KELAS 10 TKJ 1', 'kariada', 'Genya', 'juara 2', 'internasional', 'https://drive.google.com/file/d/1E67HfAizNoIme8GFPm9c53Os_Q-EuLO_/view?usp=drivesdk', 'approved', 'approved', 5, '2026-05-03 09:26:23', '2026-05-03 09:26:50', 'e', 'ok', '2026-05-03 09:25:48', '2026-05-03 09:26:50'),
(7, 14, 'dean', '4321', 'akademik', 'fefeff', 'TKJ', 'KELAS 10 TKJ 1', 'kariada', 'Genya', 'juara 3', 'provinsi', 'https://drive.google.com/file/d/1ZFOBWMcpOPDTlJ48kzbqmSz255Fgw0Tt/view?usp=drivesdk', 'approved', 'rejected', 5, '2026-05-03 09:30:30', NULL, 'ok', 'ok', '2026-05-03 09:30:18', '2026-05-03 10:29:36'),
(8, 14, 'dean', '4321', 'akademik', 'lpo', 'TKJ', 'KELAS 10 TKJ 1', 'kariada', 'Genya', 'juara 2', 'kabupaten', 'https://drive.google.com/file/d/1JbzCYTDhTv16JCS18DIX4e2C9To1gpyy/view?usp=drivesdk', 'approved', 'approved', 5, '2026-05-03 10:25:50', '2026-05-03 10:29:50', 'ok', 'ok', '2026-05-03 10:25:20', '2026-05-03 10:29:50'),
(9, 14, 'dean', '4321', 'akademik', 'lomba pejgan', 'TKJ', 'KELAS 10 TKJ 1', 'kariada', 'Genya', 'juara 1', 'kecamatan', NULL, 'rejected', 'rejected', 5, NULL, NULL, 'ok', 'p', '2026-05-04 00:13:34', '2026-05-14 06:43:44'),
(10, 14, 'dean', '4321', 'akademik', 'sdds', 'TKJ', 'KELAS 10 TKJ 1', 'kariada', 'Genya', 'juara 1', 'kecamatan', NULL, 'rejected', 'rejected', 5, NULL, NULL, 'ok', 'ok', '2026-05-04 00:14:31', '2026-05-14 06:43:47'),
(11, 14, 'dean', '4321', 'akademik', 'ddwdwdw', 'TKJ', 'KELAS 10 TKJ 1', 'raja harem', 'Genya', 'juara 1', 'kecamatan', 'uploads\\approvals\\1777853694673-513875848.png', 'pending', 'pending', 9, NULL, NULL, NULL, NULL, '2026-05-04 00:14:54', '2026-05-04 00:14:54'),
(12, 14, 'dean', '4321', 'akademik', 'lomba glm', 'TKJ', 'KELAS 10 TKJ 1', 'kariada', 'Genya', 'peserta', 'internasional', 'uploads\\approvals\\1777966940325-37467671.png', 'approved', 'approved', 5, '2026-05-05 07:58:40', '2026-05-05 07:58:56', 'oke', 'oke', '2026-05-05 07:42:20', '2026-05-05 07:58:56'),
(13, 14, 'dean', '4321', 'akademik', 'lomba bmc', 'TKJ', 'KELAS 10 TKJ 1', 'kariada', 'Genya', 'juara 3', 'internasional', 'https://drive.google.com/file/d/1kvsxJGWISEX4o_UxOO59oIZ8A17ACmId/view?usp=drivesdk', 'approved', 'approved', 5, '2026-05-05 08:01:20', '2026-05-05 08:01:37', 'mantap', 'ok', '2026-05-05 08:00:34', '2026-05-05 08:01:37'),
(14, 14, 'dean', '4321', 'akademik', 'karaidasdsdwddwdddwdw', 'TKJ', 'KELAS 10 TKJ 1', 'kariada', 'Genya', 'juara 1', 'internasional', '/uploads/approvals/1778740839158-697994080.png', 'approved', 'approved', 1, '2026-05-14 06:43:13', '2026-05-14 06:43:56', 'ok', 'okuy', '2026-05-14 06:40:39', '2026-05-14 06:43:56'),
(15, 14, 'dean', '4321', 'akademik', 'fseegret4t44343', 'TKJ', 'KELAS 10 TKJ 1', 'kariada', 'Genya', 'peserta', 'internasional', '/uploads/approvals/1778741326873-604176883.png', 'approved', 'approved', 5, '2026-05-14 06:49:02', '2026-05-14 06:49:37', 'ok', 'mantap lur', '2026-05-14 06:48:46', '2026-05-14 06:49:37'),
(16, 14, 'dean', '4321', 'akademik', 'efefeeefe3ee', 'TKJ', 'KELAS 10 TKJ 1', 'kariada', 'Genya', 'juara 1', 'kecamatan', 'https://drive.google.com/file/d/1ksm_7J4deu6HnDijhuW6vsqnTCwBIWNw/view?usp=drivesdk', 'approved', 'approved', 5, '2026-05-14 06:54:31', '2026-05-14 06:55:13', 'okbto', 'mntp', '2026-05-14 06:54:12', '2026-05-14 06:55:13');

-- --------------------------------------------------------

--
-- Table structure for table `siswa_approvals`
--

CREATE TABLE `siswa_approvals` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `nama` varchar(255) NOT NULL,
  `nis` varchar(50) NOT NULL,
  `nisn` varchar(50) NOT NULL,
  `kelas` varchar(50) DEFAULT NULL,
  `jurusan` varchar(50) DEFAULT NULL,
  `grha` varchar(50) DEFAULT NULL,
  `password_hash` varchar(255) DEFAULT NULL,
  `ipc_awal` int(11) DEFAULT 80,
  `created_by` int(11) NOT NULL,
  `superadmin_status` enum('pending','approved','rejected') DEFAULT 'pending',
  `superadmin_approved_at` timestamp NULL DEFAULT NULL,
  `superadmin_notes` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `student_creation_approvals`
--

CREATE TABLE `student_creation_approvals` (
  `id` int(11) NOT NULL,
  `nama` varchar(100) NOT NULL,
  `nis` varchar(20) NOT NULL,
  `nisn` varchar(20) NOT NULL,
  `kelas` varchar(50) NOT NULL,
  `jurusan` enum('TKJ','TO','DPIB') NOT NULL,
  `grha` varchar(50) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `requested_by` int(11) NOT NULL,
  `superadmin_status` enum('pending','approved','rejected') DEFAULT 'pending',
  `superadmin_notes` text DEFAULT NULL,
  `superadmin_approved_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `student_creation_approvals`
--

INSERT INTO `student_creation_approvals` (`id`, `nama`, `nis`, `nisn`, `kelas`, `jurusan`, `grha`, `password`, `requested_by`, `superadmin_status`, `superadmin_notes`, `superadmin_approved_at`, `created_at`) VALUES
(1, 'wwdw', '123212', '1212', 'KELAS 10 TKJ 1', 'TKJ', 'Airsanya', '$2a$10$gOCMdC3Xri5t6Kv7UzguOOuSSxOOLvXFB41bAHNf/OdCdoxG5.isW', 5, 'approved', 'ok', '2026-05-02 07:49:51', '2026-05-02 07:33:44'),
(2, 'wdwd', 'wdwd', 'wdwd', 'KELAS 12 DPIB 1', 'TKJ', 'Airsanya', '$2a$10$7NJQ.QqxrYsnj2lMlo/mMOJd3WhocW0ix2lddIYM.TncxTU29iROO', 5, 'approved', 'ok', '2026-05-02 07:49:48', '2026-05-02 07:42:12'),
(3, 'dean', '4321', '54321', 'KELAS 10 TKJ 1', 'TKJ', 'Genya', '$2a$10$AsyrINEeMVCfNtCz6D5PnefQHVoOvwqsQtPYLUh08wVozS4dBYogG', 5, 'approved', 'oke', '2026-05-02 08:27:53', '2026-05-02 08:27:14'),
(4, 'suryaburitk', '433', '433', 'KELAS 10 TKJ 1', 'TKJ', 'Airsanya', '$2a$10$ykwmBx.Q6oFKatwoqwqeC.SIDr3XsgkSloYMeUXbyqg70UbVZE8Um', 5, 'approved', 'pk', '2026-05-14 06:44:28', '2026-05-05 08:05:14');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `nama` varchar(100) NOT NULL,
  `nis` varchar(20) DEFAULT NULL,
  `nisn` varchar(20) DEFAULT NULL,
  `nip` varchar(20) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('superadmin','guru','siswa') NOT NULL,
  `kelas` varchar(50) DEFAULT NULL,
  `jurusan` enum('TKJ','TO','DPIB') DEFAULT NULL,
  `grha` varchar(50) DEFAULT NULL,
  `wali_kelas` varchar(50) DEFAULT NULL,
  `ipc_total` int(11) DEFAULT 80,
  `ipc_awal` int(11) DEFAULT 80,
  `alamat` text DEFAULT NULL,
  `no_hp` varchar(20) DEFAULT NULL,
  `jabatan` varchar(100) DEFAULT NULL,
  `foto` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `nama`, `nis`, `nisn`, `nip`, `password`, `role`, `kelas`, `jurusan`, `grha`, `wali_kelas`, `ipc_total`, `ipc_awal`, `alamat`, `no_hp`, `jabatan`, `foto`, `created_at`, `updated_at`) VALUES
(1, 'Super Admin', 'ADMIN001', NULL, NULL, '$2a$10$fOSdZvM6MhmVp4ovPft6fOGVNChYpfHMmT5B8m26Kog.4/9svwqUa', 'superadmin', NULL, NULL, NULL, NULL, 20, 0, NULL, NULL, NULL, NULL, '2026-04-30 23:56:01', '2026-05-02 06:52:32'),
(3, 'agus', '123124', '12431241', NULL, '$2a$10$/4PPLmrFQea8GY6O970C8O3IOfyiBJENwzAtmio/XPtgv5xyrT9y.', 'siswa', 'KELAS 11 DPIB 1', 'DPIB', 'Airsanya', 'sd', 30, 80, NULL, NULL, NULL, NULL, '2026-05-01 02:33:49', '2026-05-25 23:04:18'),
(5, 'kariada', NULL, NULL, '069', '$2a$10$fsnVzaQRSR8FKrVTgmwOt.25mxty5U07tKEGsaYhOqmBK5XqfaTum', 'guru', NULL, NULL, NULL, 'KELAS 10 TO 2', 0, 0, 'isekai', '0831', 'raja iblis', NULL, '2026-05-01 02:39:07', '2026-05-04 04:51:58'),
(6, 'kariada', '1208', '1208', NULL, '$2a$10$/hveahCyeCqlPzhy7q9jAeNt5k/anKy2lVDdE6Jl6awaPbzJA0Zzq', 'siswa', 'KELAS 10 DPIB 1', NULL, 'dkjdwdw', '12', 90, 80, NULL, NULL, NULL, NULL, '2026-05-01 05:02:19', '2026-05-03 08:18:19'),
(7, 'bagaiada', '1231', '1231', NULL, '$2a$10$IlXvMo6UznQXF6viaiEkH.ji.t9qwhwngS7DU1.I9gfyC7Nf768W.', 'siswa', 'KELAS 12 TKJ 1', NULL, 'Nairiti', NULL, 80, 80, NULL, NULL, NULL, NULL, '2026-05-01 05:37:52', '2026-05-01 05:37:52'),
(8, 'kariadaofjapan', '1212', '121212', NULL, '$2a$10$KzZ0/rnNQ4Uc4piA4yUHDepBGNzxt8ZCP0LM3jGx2coC7QAbglw8O', 'siswa', 'KELAS 10 TKJ 1', NULL, 'Airsanya', NULL, 80, 80, NULL, NULL, NULL, NULL, '2026-05-01 08:19:15', '2026-05-01 08:19:15'),
(9, 'raja harem', NULL, NULL, '3131', '$2a$10$UyBhFkZz5HOkJQdOuaN7Ku0IOuWKIyLrTicUBTXA6FBmOm.Bmo/D6', 'guru', NULL, NULL, NULL, NULL, 0, 0, 'isekai', '09', 'succusbus', NULL, '2026-05-01 08:19:54', '2026-05-01 08:19:54'),
(10, 'dean', '1334', '1111111', NULL, '$2a$10$VNrdi0j1xZfskoSp9STHmemhaCksdedJq6G5teGXa.Rx7fXSUCGZy', 'siswa', 'KELAS 10 TKJ 1', 'TO', 'Nairiti', NULL, 80, 80, NULL, NULL, NULL, NULL, '2026-05-01 08:39:56', '2026-05-01 08:39:56'),
(11, 'adwa', '1213', '121313', NULL, '$2a$10$A.h204EfSzCIlpFX7gbvPuXcObhHJIhLnMxjbFGkbu791eT8bEufe', 'siswa', 'KELAS 10 TKJ 1', 'TKJ', 'Airsanya', NULL, 80, 80, NULL, NULL, NULL, NULL, '2026-05-02 07:21:34', '2026-05-02 07:21:34'),
(12, 'wdwd', 'wdwd', 'wdwd', NULL, '$2a$10$7NJQ.QqxrYsnj2lMlo/mMOJd3WhocW0ix2lddIYM.TncxTU29iROO', 'siswa', 'KELAS 12 DPIB 1', 'TKJ', 'Daksina', NULL, 80, 80, NULL, NULL, NULL, NULL, '2026-05-02 07:49:48', '2026-05-02 07:50:50'),
(13, 'wwdw', '123212', '1212', NULL, '$2a$10$gOCMdC3Xri5t6Kv7UzguOOuSSxOOLvXFB41bAHNf/OdCdoxG5.isW', 'siswa', 'KELAS 10 TKJ 1', 'TKJ', 'Airsanya', NULL, 80, 80, NULL, NULL, NULL, NULL, '2026-05-02 07:49:51', '2026-05-02 07:49:51'),
(14, 'dean', '4321', '54321', NULL, '$2a$10$AsyrINEeMVCfNtCz6D5PnefQHVoOvwqsQtPYLUh08wVozS4dBYogG', 'siswa', 'KELAS 10 TKJ 1', 'TKJ', 'Genya', NULL, 241, 80, NULL, NULL, NULL, '/uploads/avatars/avatar-14-1778139914963-173128716.png', '2026-05-02 08:27:53', '2026-05-14 06:55:13'),
(15, 'sudi', NULL, NULL, '44444', '$2a$10$XXPlLA5Tma0UR03S0nnzY.dfqa9siZTk2qqXr/XXtOkvcZOKnEKxO', 'guru', NULL, NULL, NULL, NULL, 0, 0, 'efefe', 'efefe', '4ty', NULL, '2026-05-04 07:14:03', '2026-05-04 07:14:03'),
(16, 'surya', NULL, NULL, '4333', '$2a$10$.w0W.JX7WYaJj3QP8Ft5Cu.X3t9emTSmuCn.q3EqqQChBNHyg3Jy2', 'guru', NULL, NULL, NULL, 'KELAS 10 TKJ 1', 0, 0, 'kok', '08080', '444', NULL, '2026-05-05 08:02:45', '2026-05-05 08:03:57'),
(17, 'suryaburitk', '433', '433', NULL, '$2a$10$ykwmBx.Q6oFKatwoqwqeC.SIDr3XsgkSloYMeUXbyqg70UbVZE8Um', 'siswa', 'KELAS 10 TKJ 1', 'TKJ', 'Airsanya', NULL, 80, 80, NULL, NULL, NULL, NULL, '2026-05-14 06:44:28', '2026-05-14 06:44:28');

-- --------------------------------------------------------

--
-- Table structure for table `wali_kelas_assignment`
--

CREATE TABLE `wali_kelas_assignment` (
  `id` int(11) NOT NULL,
  `guru_id` int(11) NOT NULL,
  `kelas` varchar(50) NOT NULL,
  `tahun_ajaran` varchar(20) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `wali_kelas_assignment`
--

INSERT INTO `wali_kelas_assignment` (`id`, `guru_id`, `kelas`, `tahun_ajaran`, `created_at`) VALUES
(5, 5, 'KELAS 10 TO 2', '2026', '2026-05-04 04:51:58'),
(6, 16, 'KELAS 10 TKJ 1', '2026', '2026-05-05 08:03:57');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `activity_logs`
--
ALTER TABLE `activity_logs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `biodata_update_approvals`
--
ALTER TABLE `biodata_update_approvals`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `requested_by` (`requested_by`);

--
-- Indexes for table `drive_links`
--
ALTER TABLE `drive_links`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `type` (`type`);

--
-- Indexes for table `event`
--
ALTER TABLE `event`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `event_approvals`
--
ALTER TABLE `event_approvals`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_event_user` (`user_id`),
  ADD KEY `idx_event_pembina` (`pembina_id`),
  ADD KEY `idx_event_status` (`pembina_status`,`superadmin_status`);

--
-- Indexes for table `input_access_control`
--
ALTER TABLE `input_access_control`
  ADD PRIMARY KEY (`id`),
  ADD KEY `updated_by` (`updated_by`);

--
-- Indexes for table `input_access_logs`
--
ALTER TABLE `input_access_logs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `performed_by` (`performed_by`),
  ADD KEY `target_user_id` (`target_user_id`);

--
-- Indexes for table `ipc_history`
--
ALTER TABLE `ipc_history`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_notifications_user` (`user_id`),
  ADD KEY `idx_notifications_read` (`user_id`,`is_read`);

--
-- Indexes for table `organisasi`
--
ALTER TABLE `organisasi`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `organisasi_approvals`
--
ALTER TABLE `organisasi_approvals`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_organisasi_user` (`user_id`),
  ADD KEY `idx_organisasi_pembina` (`pembina_id`),
  ADD KEY `idx_organisasi_status` (`pembina_status`,`superadmin_status`);

--
-- Indexes for table `pelanggaran`
--
ALTER TABLE `pelanggaran`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `perilaku`
--
ALTER TABLE `perilaku`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `permissions`
--
ALTER TABLE `permissions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `prestasi`
--
ALTER TABLE `prestasi`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `prestasi_approvals`
--
ALTER TABLE `prestasi_approvals`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_prestasi_user` (`user_id`),
  ADD KEY `idx_prestasi_pembina` (`pembina_id`),
  ADD KEY `idx_prestasi_status` (`pembina_status`,`superadmin_status`);

--
-- Indexes for table `siswa_approvals`
--
ALTER TABLE `siswa_approvals`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `created_by` (`created_by`);

--
-- Indexes for table `student_creation_approvals`
--
ALTER TABLE `student_creation_approvals`
  ADD PRIMARY KEY (`id`),
  ADD KEY `requested_by` (`requested_by`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nis` (`nis`),
  ADD UNIQUE KEY `nisn` (`nisn`),
  ADD UNIQUE KEY `nip` (`nip`);

--
-- Indexes for table `wali_kelas_assignment`
--
ALTER TABLE `wali_kelas_assignment`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_guru_kelas` (`guru_id`,`kelas`,`tahun_ajaran`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `activity_logs`
--
ALTER TABLE `activity_logs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=367;

--
-- AUTO_INCREMENT for table `biodata_update_approvals`
--
ALTER TABLE `biodata_update_approvals`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `drive_links`
--
ALTER TABLE `drive_links`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `event`
--
ALTER TABLE `event`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `event_approvals`
--
ALTER TABLE `event_approvals`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `input_access_control`
--
ALTER TABLE `input_access_control`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=228;

--
-- AUTO_INCREMENT for table `input_access_logs`
--
ALTER TABLE `input_access_logs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1201;

--
-- AUTO_INCREMENT for table `ipc_history`
--
ALTER TABLE `ipc_history`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT for table `notifications`
--
ALTER TABLE `notifications`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=850;

--
-- AUTO_INCREMENT for table `organisasi`
--
ALTER TABLE `organisasi`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `organisasi_approvals`
--
ALTER TABLE `organisasi_approvals`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `pelanggaran`
--
ALTER TABLE `pelanggaran`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `perilaku`
--
ALTER TABLE `perilaku`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `permissions`
--
ALTER TABLE `permissions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT for table `prestasi`
--
ALTER TABLE `prestasi`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `prestasi_approvals`
--
ALTER TABLE `prestasi_approvals`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `siswa_approvals`
--
ALTER TABLE `siswa_approvals`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `student_creation_approvals`
--
ALTER TABLE `student_creation_approvals`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `wali_kelas_assignment`
--
ALTER TABLE `wali_kelas_assignment`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `activity_logs`
--
ALTER TABLE `activity_logs`
  ADD CONSTRAINT `activity_logs_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `biodata_update_approvals`
--
ALTER TABLE `biodata_update_approvals`
  ADD CONSTRAINT `biodata_update_approvals_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `biodata_update_approvals_ibfk_2` FOREIGN KEY (`requested_by`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `event`
--
ALTER TABLE `event`
  ADD CONSTRAINT `event_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `event_approvals`
--
ALTER TABLE `event_approvals`
  ADD CONSTRAINT `event_approvals_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `event_approvals_ibfk_2` FOREIGN KEY (`pembina_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `input_access_control`
--
ALTER TABLE `input_access_control`
  ADD CONSTRAINT `input_access_control_ibfk_1` FOREIGN KEY (`updated_by`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `input_access_logs`
--
ALTER TABLE `input_access_logs`
  ADD CONSTRAINT `input_access_logs_ibfk_1` FOREIGN KEY (`performed_by`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `input_access_logs_ibfk_2` FOREIGN KEY (`target_user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `ipc_history`
--
ALTER TABLE `ipc_history`
  ADD CONSTRAINT `ipc_history_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `notifications`
--
ALTER TABLE `notifications`
  ADD CONSTRAINT `notifications_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `organisasi`
--
ALTER TABLE `organisasi`
  ADD CONSTRAINT `organisasi_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `organisasi_approvals`
--
ALTER TABLE `organisasi_approvals`
  ADD CONSTRAINT `organisasi_approvals_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `organisasi_approvals_ibfk_2` FOREIGN KEY (`pembina_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `pelanggaran`
--
ALTER TABLE `pelanggaran`
  ADD CONSTRAINT `pelanggaran_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `perilaku`
--
ALTER TABLE `perilaku`
  ADD CONSTRAINT `perilaku_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `permissions`
--
ALTER TABLE `permissions`
  ADD CONSTRAINT `permissions_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `prestasi`
--
ALTER TABLE `prestasi`
  ADD CONSTRAINT `prestasi_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `prestasi_approvals`
--
ALTER TABLE `prestasi_approvals`
  ADD CONSTRAINT `prestasi_approvals_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `prestasi_approvals_ibfk_2` FOREIGN KEY (`pembina_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `siswa_approvals`
--
ALTER TABLE `siswa_approvals`
  ADD CONSTRAINT `siswa_approvals_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `siswa_approvals_ibfk_2` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`);

--
-- Constraints for table `student_creation_approvals`
--
ALTER TABLE `student_creation_approvals`
  ADD CONSTRAINT `student_creation_approvals_ibfk_1` FOREIGN KEY (`requested_by`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `wali_kelas_assignment`
--
ALTER TABLE `wali_kelas_assignment`
  ADD CONSTRAINT `wali_kelas_assignment_ibfk_1` FOREIGN KEY (`guru_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

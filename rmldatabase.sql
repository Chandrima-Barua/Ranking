-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 22, 2019 at 05:08 AM
-- Server version: 10.1.38-MariaDB
-- PHP Version: 5.6.40

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `rmldatabase`
--

-- --------------------------------------------------------

--
-- Table structure for table `contributionflag`
--

CREATE TABLE `contributionflag` (
  `id` int(255) NOT NULL,
  `contributions_pointer` int(255) NOT NULL,
  `lists_pointer` int(255) NOT NULL,
  `users_pointer` int(255) NOT NULL,
  `flaguser_pointer` int(255) NOT NULL,
  `abusive` tinyint(2) DEFAULT '0',
  `spam` tinyint(2) DEFAULT '0',
  `iip` tinyint(2) DEFAULT '0',
  `ip_pointer` int(11) NOT NULL,
  `time` datetime NOT NULL,
  `time_offset` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `contributionflag`
--

INSERT INTO `contributionflag` (`id`, `contributions_pointer`, `lists_pointer`, `users_pointer`, `flaguser_pointer`, `abusive`, `spam`, `iip`, `ip_pointer`, `time`, `time_offset`) VALUES
(1, 8, 6, 3, 2, 0, 1, 1, 2, '2019-12-11 12:28:37', 0),
(2, 8, 6, 3, 2, 0, 0, 1, 2, '2019-12-11 12:29:00', 0),
(3, 8, 6, 3, 2, 0, 0, 0, 2, '2019-12-11 12:29:42', 0),
(4, 7, 6, 3, 2, 0, 1, 0, 2, '2019-12-16 19:00:42', 0);

-- --------------------------------------------------------

--
-- Table structure for table `contributionflag_index1`
--

CREATE TABLE `contributionflag_index1` (
  `id` int(255) NOT NULL,
  `contributions_pointer` int(255) NOT NULL,
  `lists_pointer` int(255) NOT NULL,
  `users_pointer` int(255) NOT NULL,
  `flaguser_pointer` int(255) NOT NULL,
  `abusive` tinyint(2) NOT NULL DEFAULT '0',
  `spam` tinyint(2) NOT NULL DEFAULT '0',
  `iip` tinyint(2) NOT NULL DEFAULT '0',
  `ip_pointer` int(11) NOT NULL,
  `time` datetime NOT NULL,
  `time_offset` float NOT NULL,
  `contributionflag_pointer` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `contributionflag_index1`
--

INSERT INTO `contributionflag_index1` (`id`, `contributions_pointer`, `lists_pointer`, `users_pointer`, `flaguser_pointer`, `abusive`, `spam`, `iip`, `ip_pointer`, `time`, `time_offset`, `contributionflag_pointer`) VALUES
(1, 8, 6, 3, 2, 0, 1, 1, 2, '2019-12-11 12:28:37', 0, 1),
(2, 8, 6, 3, 2, 0, 0, 1, 2, '2019-12-11 12:29:00', 0, 2),
(3, 8, 6, 3, 2, 0, 0, 0, 2, '2019-12-11 12:29:42', 0, 3);

-- --------------------------------------------------------

--
-- Table structure for table `contributionflag_index2`
--

CREATE TABLE `contributionflag_index2` (
  `id` int(255) NOT NULL,
  `contributions_pointer` int(255) NOT NULL,
  `lists_pointer` int(255) NOT NULL,
  `users_pointer` int(255) NOT NULL,
  `flaguser_pointer` int(255) NOT NULL,
  `abusive` tinyint(2) NOT NULL DEFAULT '0',
  `spam` tinyint(2) NOT NULL DEFAULT '0',
  `iip` tinyint(2) NOT NULL DEFAULT '0',
  `ip_pointer` int(11) NOT NULL,
  `time` datetime NOT NULL,
  `time_offset` float NOT NULL,
  `contributionflag_pointer` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `contributionflag_index2`
--

INSERT INTO `contributionflag_index2` (`id`, `contributions_pointer`, `lists_pointer`, `users_pointer`, `flaguser_pointer`, `abusive`, `spam`, `iip`, `ip_pointer`, `time`, `time_offset`, `contributionflag_pointer`) VALUES
(1, 8, 6, 3, 2, 0, 1, 1, 2, '2019-12-11 12:28:37', 0, 1),
(2, 8, 6, 3, 2, 0, 0, 1, 2, '2019-12-11 12:29:00', 0, 2),
(3, 8, 6, 3, 2, 0, 0, 0, 2, '2019-12-11 12:29:42', 0, 3);

-- --------------------------------------------------------

--
-- Table structure for table `contributionflag_queue1`
--

CREATE TABLE `contributionflag_queue1` (
  `id` int(255) NOT NULL,
  `contributions_pointer` int(255) NOT NULL,
  `lists_pointer` int(255) NOT NULL,
  `users_pointer` int(255) NOT NULL,
  `flaguser_pointer` int(255) NOT NULL,
  `abusive` tinyint(2) DEFAULT '0',
  `spam` tinyint(2) DEFAULT '0',
  `iip` tinyint(2) DEFAULT '0',
  `ip_pointer` int(11) NOT NULL,
  `time` datetime NOT NULL,
  `time_offset` float NOT NULL,
  `contributionflag_pointer` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `contributionflag_queue1`
--

INSERT INTO `contributionflag_queue1` (`id`, `contributions_pointer`, `lists_pointer`, `users_pointer`, `flaguser_pointer`, `abusive`, `spam`, `iip`, `ip_pointer`, `time`, `time_offset`, `contributionflag_pointer`) VALUES
(1, 7, 6, 3, 2, 0, 1, 0, 2, '2019-12-16 19:00:42', 0, 4);

-- --------------------------------------------------------

--
-- Table structure for table `contributionflag_queue2`
--

CREATE TABLE `contributionflag_queue2` (
  `id` int(255) NOT NULL,
  `contributions_pointer` int(255) NOT NULL,
  `lists_pointer` int(255) NOT NULL,
  `users_pointer` int(255) NOT NULL,
  `flaguser_pointer` int(255) NOT NULL,
  `abusive` tinyint(2) DEFAULT '0',
  `spam` tinyint(2) DEFAULT '0',
  `iip` tinyint(2) DEFAULT '0',
  `ip_pointer` int(11) NOT NULL,
  `time` datetime NOT NULL,
  `time_offset` float NOT NULL,
  `contributionflag_pointer` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `contributions`
--

CREATE TABLE `contributions` (
  `id` int(255) NOT NULL,
  `text` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `text_censored` longtext COLLATE utf8mb4_unicode_ci,
  `user_id` int(255) NOT NULL,
  `lists_pointer` int(255) NOT NULL,
  `selected` tinyint(1) DEFAULT '0',
  `time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `ip` int(40) NOT NULL,
  `likes` int(11) NOT NULL,
  `dislikes` int(11) NOT NULL,
  `score` float NOT NULL,
  `recorded` tinyint(2) NOT NULL DEFAULT '1',
  `total_spam` int(11) NOT NULL,
  `total_abusive` int(11) NOT NULL,
  `total_iip` int(11) NOT NULL,
  `time_offset_delete` tinyint(2) NOT NULL,
  `time_offset_add` tinyint(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `contributions`
--

INSERT INTO `contributions` (`id`, `text`, `text_censored`, `user_id`, `lists_pointer`, `selected`, `time`, `ip`, `likes`, `dislikes`, `score`, `recorded`, `total_spam`, `total_abusive`, `total_iip`, `time_offset_delete`, `time_offset_add`) VALUES
(1, 'wefwefwf', 'wefwefwf', 1, 6, 0, '2019-12-07 10:33:38', 2, 0, 0, 0, 1, 0, 0, 0, 0, 0),
(2, 'wwwwqqewfwefwasdad', 'wwwwqqewfwefwasdad', 1, 6, 0, '2019-12-07 10:33:44', 2, 0, 0, 0, 1, 0, 0, 0, 0, 0),
(3, 'ffdddfd', 'ffdddfd', 1, 1, 0, '2019-12-07 10:36:36', 2, 0, 0, 0, 1, 0, 0, 0, 0, 0),
(4, 'sdasdasd', 'sdasdasd', 2, 1, 0, '2019-12-07 10:49:12', 2, 0, 0, 0, 1, 0, 0, 0, 0, 0),
(5, 'fdgdfgdfgdfg', 'fdgdfgdfgdfg', 3, 6, 0, '2019-12-07 11:10:59', 2, 0, 0, 0, 1, 0, 0, 0, 0, 0),
(6, 'dgfdgd', 'dgfdgd', 3, 6, 0, '2019-12-07 11:11:11', 2, 0, 0, 0, 1, 0, 0, 0, 0, 0),
(7, 'dfgdgd', 'dfgdgd', 3, 6, 0, '2019-12-07 11:11:14', 2, 0, 0, 0, 1, 0, 0, 0, 0, 0),
(8, 'rtetretert', 'rtetretert', 3, 6, 0, '2019-12-07 11:13:43', 2, 0, 0, 0, 1, 0, 0, 0, 0, 0),
(9, 'cxbxbxb', 'cxbxbxb', 2, 6, 0, '2019-12-07 11:15:31', 2, 0, 0, 0, 1, 0, 0, 0, 0, 0),
(10, 'sdgsgsgs', 'sdgsgsgs', 3, 6, 1, '2019-12-07 11:15:55', 2, 0, 0, 0, 1, 0, 0, 0, 0, 0),
(11, 'sdggsg', 'sdggsg', 2, 6, 0, '2019-12-07 11:17:10', 2, 0, 0, 0, 1, 0, 0, 0, 0, 0),
(12, 'sdfsdfsf', 'sdfsdfsf', 3, 6, 0, '2019-12-07 11:17:32', 2, 0, 0, 0, 1, 0, 0, 0, 0, 0),
(13, 'dfsfsddff', 'dfsfsddff', 3, 7, 0, '2019-12-07 11:23:03', 2, 0, 0, 0, 1, 0, 0, 0, 0, 0),
(14, 'sfsfsfs', 'sfsfsfs', 3, 7, 0, '2019-12-07 11:23:06', 2, 0, 0, 0, 1, 0, 0, 0, 0, 0),
(15, 'sfsdfsdf', 'sfsdfsdf', 3, 7, 0, '2019-12-07 11:23:10', 2, 0, 0, 0, 1, 0, 0, 0, 0, 0),
(16, 'sdfsfs', 'sdfsfs', 2, 4, 0, '2019-12-11 09:55:46', 2, 0, 0, 0, 1, 0, 0, 0, 0, 0),
(17, 'zxczxcxzczxc', 'zxczxcxzczxc', 2, 4, 0, '2019-12-11 12:49:59', 2, 0, 0, 0, 1, 0, 0, 0, 0, 0),
(18, 'czxczxcz', 'czxczxcz', 2, 4, 0, '2019-12-11 12:50:05', 2, 0, 0, 0, 1, 0, 0, 0, 0, 0),
(19, 'dsfsdfsdfsdf', 'dsfsdfsdfsdf', 2, 6, 0, '2019-12-14 12:21:57', 2, 0, 0, 0, 1, 0, 0, 0, 0, 0),
(20, 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\\\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\\\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.', 2, 2, 0, '2019-12-14 12:26:54', 2, 0, 0, 0, 1, 0, 0, 0, 0, 0),
(21, 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\\\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\\\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.', 2, 2, 0, '2019-12-14 12:27:05', 2, 0, 0, 0, 1, 0, 0, 0, 0, 0),
(22, 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\\\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\\\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.', 2, 2, 0, '2019-12-14 12:27:14', 2, 0, 0, 0, 1, 0, 0, 0, 0, 0),
(23, 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using \\\'Content here, content here\\\', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for \\\'lorem ipsum\\\' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)', 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using \\\'Content here, content here\\\', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for \\\'lorem ipsum\\\' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)', 2, 2, 0, '2019-12-14 12:30:00', 2, 0, 0, 0, 1, 0, 0, 0, 0, 0),
(24, 'zxvzxvzxv', 'zxvzxvzxv', 2, 1, 0, '2019-12-15 11:16:28', 2, 0, 0, 0, 0, 0, 0, 0, 6, 0),
(25, 'cbxcb', 'cbxcb', 2, 1, 0, '2019-12-15 11:19:10', 2, 0, 0, 0, 0, 0, 0, 0, 6, 0),
(26, 'asfasasf', 'asfasasf', 2, 1, 0, '2019-12-16 15:44:36', 2, 0, 0, 0, 1, 0, 0, 0, 0, 0),
(27, 'fdddd', 'fdddd', 2, 1, 0, '2019-12-17 11:35:14', 2, 0, 0, 0, 1, 0, 0, 0, 0, 0),
(28, 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of \\\"de Finibus Bonorum et Malorum\\\" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, \\\"Lorem ipsum dolor sit amet..\\\", comes from a line in section 1.10.32.\n\nThe standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from \\\"de Finibus Bonorum et Malorum\\\" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham', 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of \\\"de Finibus Bonorum et Malorum\\\" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, \\\"Lorem ipsum dolor sit amet..\\\", comes from a line in section 1.10.32.\n\nThe standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from \\\"de Finibus Bonorum et Malorum\\\" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham', 1, 7, 0, '2019-12-21 12:28:46', 2, 0, 0, 0, 1, 0, 0, 0, 0, 0),
(29, 'fsdfdsfsf', 'fsdfdsfsf', 1, 7, 0, '2019-12-21 12:31:33', 2, 0, 0, 0, 1, 0, 0, 0, 0, 0),
(30, 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?', 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?', 1, 7, 0, '2019-12-21 14:35:50', 2, 0, 0, 0, 1, 0, 0, 0, 0, 0),
(31, 'afasffa', 'afasffa', 2, 1, 0, '2019-12-21 11:45:34', 2, 0, 0, 0, 1, 0, 0, 0, 0, 0),
(32, 'erterter', 'erterter', 2, 1, 0, '2019-12-21 16:49:35', 2, 0, 0, 0, 1, 0, 0, 0, 0, 0),
(33, 'rwrwerwerw', 'rwrwerwerw', 2, 1, 0, '2019-12-21 17:07:27', 2, 0, 0, 0, 1, 0, 0, 0, 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `contributionslikedislike`
--

CREATE TABLE `contributionslikedislike` (
  `id` int(255) UNSIGNED NOT NULL,
  `user_id` int(255) NOT NULL,
  `like_status` tinyint(2) NOT NULL,
  `dislike_status` tinyint(2) NOT NULL,
  `contributions_pointer` int(255) NOT NULL,
  `time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `contributionslikedislike`
--

INSERT INTO `contributionslikedislike` (`id`, `user_id`, `like_status`, `dislike_status`, `contributions_pointer`, `time`) VALUES
(1, 2, 1, 0, 30, '2019-12-21 11:42:20'),
(2, 2, -1, 1, 30, '2019-12-21 11:43:37'),
(3, 2, 1, 0, 31, '2019-12-21 16:49:21');

-- --------------------------------------------------------

--
-- Table structure for table `contributionslikedislike_index1`
--

CREATE TABLE `contributionslikedislike_index1` (
  `id` int(255) UNSIGNED NOT NULL,
  `user_id` int(255) NOT NULL,
  `like_status` tinyint(2) NOT NULL,
  `dislike_status` tinyint(2) NOT NULL,
  `contributions_pointer` int(255) NOT NULL,
  `time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `contributionslikedislike_pointer` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `contributionslikedislike_index2`
--

CREATE TABLE `contributionslikedislike_index2` (
  `id` int(255) UNSIGNED NOT NULL,
  `user_id` int(255) NOT NULL,
  `like_status` tinyint(2) NOT NULL,
  `dislike_status` tinyint(2) NOT NULL,
  `contributions_pointer` int(255) NOT NULL,
  `time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `contributionslikedislike_pointer` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `contributionslikedislike_queue1`
--

CREATE TABLE `contributionslikedislike_queue1` (
  `id` int(255) UNSIGNED NOT NULL,
  `user_id` int(255) NOT NULL,
  `like_status` tinyint(2) NOT NULL,
  `dislike_status` tinyint(2) NOT NULL,
  `contributions_pointer` int(255) NOT NULL,
  `time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `contributionslikedislike_pointer` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `contributionslikedislike_queue2`
--

CREATE TABLE `contributionslikedislike_queue2` (
  `id` int(255) UNSIGNED NOT NULL,
  `user_id` int(255) NOT NULL,
  `like_status` tinyint(2) NOT NULL,
  `dislike_status` tinyint(2) NOT NULL,
  `contributions_pointer` int(255) NOT NULL,
  `time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `contributionslikedislike_pointer` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `contributionslikedislike_queue2`
--

INSERT INTO `contributionslikedislike_queue2` (`id`, `user_id`, `like_status`, `dislike_status`, `contributions_pointer`, `time`, `contributionslikedislike_pointer`) VALUES
(1, 2, 1, 0, 30, '2019-12-21 11:42:20', 1),
(2, 2, -1, 1, 30, '2019-12-21 11:43:37', 2),
(3, 2, 1, 0, 31, '2019-12-21 16:49:21', 3);

-- --------------------------------------------------------

--
-- Table structure for table `contributions_index1`
--

CREATE TABLE `contributions_index1` (
  `id` int(255) NOT NULL,
  `text` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `text_censored` longtext COLLATE utf8mb4_unicode_ci,
  `user_id` int(255) NOT NULL,
  `lists_pointer` int(255) NOT NULL,
  `selected` tinyint(1) DEFAULT '0',
  `time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `ip` int(40) NOT NULL,
  `likes` int(11) NOT NULL,
  `dislikes` int(11) NOT NULL,
  `score` float NOT NULL,
  `recorded` tinyint(2) NOT NULL DEFAULT '1',
  `total_spam` int(11) NOT NULL,
  `total_abusive` int(11) NOT NULL,
  `total_iip` int(11) NOT NULL,
  `time_offset_delete` tinyint(2) NOT NULL,
  `time_offset_add` tinyint(2) NOT NULL,
  `contributions_pointer` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `contributions_index2`
--

CREATE TABLE `contributions_index2` (
  `id` int(255) NOT NULL,
  `text` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `text_censored` longtext COLLATE utf8mb4_unicode_ci,
  `user_id` int(255) NOT NULL,
  `lists_pointer` int(255) NOT NULL,
  `selected` tinyint(1) DEFAULT '0',
  `time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `ip` int(40) NOT NULL,
  `likes` int(11) NOT NULL,
  `dislikes` int(11) NOT NULL,
  `score` float NOT NULL,
  `recorded` tinyint(2) NOT NULL DEFAULT '1',
  `total_spam` int(11) NOT NULL,
  `total_abusive` int(11) NOT NULL,
  `total_iip` int(11) NOT NULL,
  `time_offset_delete` tinyint(2) NOT NULL,
  `time_offset_add` tinyint(2) NOT NULL,
  `contributions_pointer` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `contributions_index2`
--

INSERT INTO `contributions_index2` (`id`, `text`, `text_censored`, `user_id`, `lists_pointer`, `selected`, `time`, `ip`, `likes`, `dislikes`, `score`, `recorded`, `total_spam`, `total_abusive`, `total_iip`, `time_offset_delete`, `time_offset_add`, `contributions_pointer`) VALUES
(1, 'wefwefwf', 'wefwefwf', 1, 6, 0, '2019-12-07 10:33:38', 2, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1),
(2, 'wwwwqqewfwefwasdad', 'wwwwqqewfwefwasdad', 1, 6, 0, '2019-12-07 10:33:44', 2, 0, 0, 0, 1, 0, 0, 0, 0, 0, 2),
(3, 'ffdddfd', 'ffdddfd', 1, 1, 0, '2019-12-07 10:36:36', 2, 0, 0, 0, 1, 0, 0, 0, 0, 0, 3),
(4, 'sdasdasd', 'sdasdasd', 2, 1, 0, '2019-12-07 10:49:12', 2, 0, 0, 0, 1, 0, 0, 0, 0, 0, 4),
(5, 'fdgdfgdfgdfg', 'fdgdfgdfgdfg', 3, 6, 0, '2019-12-07 11:10:59', 2, 0, 0, 0, 1, 0, 0, 0, 0, 0, 5),
(6, 'dgfdgd', 'dgfdgd', 3, 6, 0, '2019-12-07 11:11:11', 2, 0, 0, 0, 1, 0, 0, 0, 0, 0, 6),
(7, 'dfgdgd', 'dfgdgd', 3, 6, 0, '2019-12-07 11:11:14', 2, 0, 0, 0, 1, 0, 0, 0, 0, 0, 7),
(8, 'rtetretert', 'rtetretert', 3, 6, 0, '2019-12-07 11:13:43', 2, 0, 0, 0, 1, 1, 0, 2, 0, 0, 8),
(9, 'cxbxbxb', 'cxbxbxb', 2, 6, 0, '2019-12-07 11:15:31', 2, 0, 0, 0, 1, 0, 0, 0, 0, 0, 9),
(10, 'sdgsgsgs', 'sdgsgsgs', 3, 6, 0, '2019-12-07 11:15:56', 2, 0, 0, 0, 1, 0, 0, 0, 0, 0, 10),
(11, 'sdggsg', 'sdggsg', 2, 6, 0, '2019-12-07 11:17:10', 2, 0, 0, 0, 1, 0, 0, 0, 0, 0, 11),
(12, 'sdfsdfsf', 'sdfsdfsf', 3, 6, 0, '2019-12-07 11:17:32', 2, 0, 0, 0, 1, 0, 0, 0, 0, 0, 12),
(13, 'dfsfsddff', 'dfsfsddff', 3, 7, 0, '2019-12-07 11:23:03', 2, 0, 0, 0, 1, 0, 0, 0, 0, 0, 13),
(14, 'sfsfsfs', 'sfsfsfs', 3, 7, 0, '2019-12-07 11:23:06', 2, 0, 0, 0, 1, 0, 0, 0, 0, 0, 14),
(15, 'sfsdfsdf', 'sfsdfsdf', 3, 7, 0, '2019-12-07 11:23:10', 2, 0, 0, 0, 1, 0, 0, 0, 0, 0, 15);

-- --------------------------------------------------------

--
-- Table structure for table `contributions_queue1`
--

CREATE TABLE `contributions_queue1` (
  `id` int(255) NOT NULL,
  `text` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `text_censored` longtext COLLATE utf8mb4_unicode_ci,
  `user_id` int(255) NOT NULL,
  `lists_pointer` int(255) NOT NULL,
  `selected` tinyint(1) DEFAULT '0',
  `time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `ip` int(40) NOT NULL,
  `likes` int(11) NOT NULL,
  `dislikes` int(11) NOT NULL,
  `score` float NOT NULL,
  `recorded` tinyint(2) NOT NULL DEFAULT '1',
  `total_spam` int(11) NOT NULL,
  `total_abusive` int(11) NOT NULL,
  `total_iip` int(11) NOT NULL,
  `time_offset_delete` tinyint(2) NOT NULL,
  `time_offset_add` tinyint(2) NOT NULL,
  `contributions_pointer` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `contributions_queue2`
--

CREATE TABLE `contributions_queue2` (
  `id` int(255) NOT NULL,
  `text` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `text_censored` longtext COLLATE utf8mb4_unicode_ci,
  `user_id` int(255) NOT NULL,
  `lists_pointer` int(255) NOT NULL,
  `selected` tinyint(1) DEFAULT '0',
  `time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `ip` int(40) NOT NULL,
  `likes` int(11) NOT NULL,
  `dislikes` int(11) NOT NULL,
  `score` float NOT NULL,
  `recorded` tinyint(2) NOT NULL DEFAULT '1',
  `total_spam` int(11) NOT NULL,
  `total_abusive` int(11) NOT NULL,
  `total_iip` int(11) NOT NULL,
  `time_offset_delete` tinyint(2) NOT NULL,
  `time_offset_add` tinyint(2) NOT NULL,
  `contributions_pointer` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `contributions_queue2`
--

INSERT INTO `contributions_queue2` (`id`, `text`, `text_censored`, `user_id`, `lists_pointer`, `selected`, `time`, `ip`, `likes`, `dislikes`, `score`, `recorded`, `total_spam`, `total_abusive`, `total_iip`, `time_offset_delete`, `time_offset_add`, `contributions_pointer`) VALUES
(1, 'sdfsfs', NULL, 2, 4, 0, '2019-12-11 09:55:46', 2, 0, 0, 0, 1, 0, 0, 0, 0, 0, 16),
(2, 'zxczxcxzczxc', NULL, 2, 4, 0, '2019-12-11 12:49:59', 2, 0, 0, 0, 1, 0, 0, 0, 0, 0, 17),
(3, 'czxczxcz', NULL, 2, 4, 0, '2019-12-11 12:50:05', 2, 0, 0, 0, 1, 0, 0, 0, 0, 0, 18),
(4, 'dsfsdfsdfsdf', NULL, 2, 6, 0, '2019-12-14 12:21:57', 2, 0, 0, 0, 1, 0, 0, 0, 0, 0, 19),
(5, 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\\\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.', NULL, 2, 2, 0, '2019-12-14 12:26:54', 2, 0, 0, 0, 1, 0, 0, 0, 0, 0, 20),
(6, 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\\\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.', NULL, 2, 2, 0, '2019-12-14 12:27:05', 2, 0, 0, 0, 1, 0, 0, 0, 0, 0, 21),
(7, 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\\\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.', NULL, 2, 2, 0, '2019-12-14 12:27:14', 2, 0, 0, 0, 1, 0, 0, 0, 0, 0, 22),
(8, 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using \\\'Content here, content here\\\', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for \\\'lorem ipsum\\\' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)', NULL, 2, 2, 0, '2019-12-14 12:30:00', 2, 0, 0, 0, 1, 0, 0, 0, 0, 0, 23),
(9, 'zxvzxvzxv', NULL, 2, 1, 0, '2019-12-15 11:16:28', 2, 0, 0, 0, 1, 0, 0, 0, 0, 0, 24),
(10, 'cbxcb', NULL, 2, 1, 0, '2019-12-15 11:19:10', 2, 0, 0, 0, 1, 0, 0, 0, 0, 0, 25),
(11, 'asfasasf', NULL, 2, 1, 0, '2019-12-16 15:44:36', 2, 0, 0, 0, 1, 0, 0, 0, 0, 0, 26),
(12, 'fdddd', NULL, 2, 1, 0, '2019-12-17 11:35:14', 2, 0, 0, 0, 1, 0, 0, 0, 0, 0, 27),
(13, 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of \\\"de Finibus Bonorum et Malorum\\\" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, \\\"Lorem ipsum dolor sit amet..\\\", comes from a line in section 1.10.32.\n\nThe standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from \\\"de Finibus Bonorum et Malorum\\\" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham', NULL, 1, 7, 0, '2019-12-21 12:28:46', 2, 0, 0, 0, 1, 0, 0, 0, 0, 0, 28),
(14, 'fsdfdsfsf', NULL, 1, 7, 0, '2019-12-21 12:31:33', 2, 0, 0, 0, 1, 0, 0, 0, 0, 0, 29),
(15, 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?', NULL, 1, 7, 0, '2019-12-21 14:35:50', 2, 0, 0, 0, 1, 0, 0, 0, 0, 0, 30),
(16, 'afasffa', NULL, 2, 1, 0, '2019-12-21 11:45:34', 2, 0, 0, 0, 1, 0, 0, 0, 0, 0, 31),
(17, 'erterter', NULL, 2, 1, 0, '2019-12-21 16:49:35', 2, 0, 0, 0, 1, 0, 0, 0, 0, 0, 32),
(18, 'rwrwerwerw', NULL, 2, 1, 0, '2019-12-21 17:07:27', 2, 0, 0, 0, 1, 0, 0, 0, 0, 0, 33);

-- --------------------------------------------------------

--
-- Table structure for table `contributions_update1`
--

CREATE TABLE `contributions_update1` (
  `id` int(255) NOT NULL,
  `text` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `text_censored` longtext COLLATE utf8mb4_unicode_ci,
  `user_id` int(255) NOT NULL,
  `lists_pointer` int(255) NOT NULL,
  `selected` tinyint(1) DEFAULT '0',
  `time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `ip` int(40) NOT NULL,
  `likes` int(11) NOT NULL,
  `dislikes` int(11) NOT NULL,
  `score` float NOT NULL,
  `recorded` tinyint(2) NOT NULL DEFAULT '1',
  `total_spam` int(11) NOT NULL,
  `total_abusive` int(11) NOT NULL,
  `total_iip` int(11) NOT NULL,
  `time_offset_delete` tinyint(2) NOT NULL,
  `time_offset_add` tinyint(2) NOT NULL,
  `contributions_pointer` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `contributions_update2`
--

CREATE TABLE `contributions_update2` (
  `id` int(255) NOT NULL,
  `text` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `text_censored` longtext COLLATE utf8mb4_unicode_ci,
  `user_id` int(255) NOT NULL,
  `lists_pointer` int(255) NOT NULL,
  `selected` tinyint(1) DEFAULT '0',
  `time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `ip` int(40) NOT NULL,
  `likes` int(11) NOT NULL,
  `dislikes` int(11) NOT NULL,
  `score` float NOT NULL,
  `recorded` tinyint(2) NOT NULL DEFAULT '1',
  `total_spam` int(11) NOT NULL,
  `total_abusive` int(11) NOT NULL,
  `total_iip` int(11) NOT NULL,
  `time_offset_delete` tinyint(2) NOT NULL,
  `time_offset_add` tinyint(2) NOT NULL,
  `contributions_pointer` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `contributions_update2`
--

INSERT INTO `contributions_update2` (`id`, `text`, `text_censored`, `user_id`, `lists_pointer`, `selected`, `time`, `ip`, `likes`, `dislikes`, `score`, `recorded`, `total_spam`, `total_abusive`, `total_iip`, `time_offset_delete`, `time_offset_add`, `contributions_pointer`) VALUES
(1, 'sdgsgsgs', NULL, 3, 6, 1, '2019-12-07 11:15:56', 2, 0, 0, 0, 1, 0, 0, 0, 0, 0, 10),
(2, 'rtetretert', NULL, 3, 6, 0, '2019-12-07 11:13:43', 2, 0, 0, 0, 1, 0, 0, 0, 0, 0, 8),
(3, 'cxbxbxb', NULL, 2, 6, 0, '2019-12-07 11:15:31', 2, 0, 0, 0, 1, 0, 0, 0, 0, 0, 9),
(4, 'sdggsg', NULL, 2, 6, 0, '2019-12-07 11:17:10', 2, 0, 0, 0, 1, 0, 0, 0, 0, 0, 11),
(5, 'dfgdgd', NULL, 3, 6, 0, '2019-12-07 11:11:14', 2, 0, 0, 0, 1, 0, 0, 0, 0, 0, 7),
(6, 'dgfdgd', NULL, 3, 6, 0, '2019-12-07 11:11:11', 2, 0, 0, 0, 1, 0, 0, 0, 0, 0, 6),
(7, 'cbxcb', NULL, 2, 1, 0, '2019-12-15 11:19:10', 2, 0, 0, 0, 0, 0, 0, 0, 6, 0, 25),
(8, 'zxvzxvzxv', NULL, 2, 1, 0, '2019-12-15 11:16:28', 2, 0, 0, 0, 0, 0, 0, 0, 6, 0, 24),
(9, 'wefwefwf', NULL, 1, 6, 0, '2019-12-07 10:33:38', 2, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1),
(10, 'fdgdfgdfgdfg', NULL, 3, 6, 0, '2019-12-07 11:10:59', 2, 0, 0, 0, 1, 0, 0, 0, 0, 0, 5),
(11, 'wwwwqqewfwefwasdad', NULL, 1, 6, 0, '2019-12-07 10:33:44', 2, 0, 0, 0, 1, 0, 0, 0, 0, 0, 2),
(12, 'dsfsdfsdfsdf', NULL, 2, 6, 0, '2019-12-14 12:21:57', 2, 0, 0, 0, 1, 0, 0, 0, 0, 0, 19);

-- --------------------------------------------------------

--
-- Table structure for table `cronjobstatus`
--

CREATE TABLE `cronjobstatus` (
  `pointer` int(11) NOT NULL,
  `type` varchar(30) CHARACTER SET latin1 COLLATE latin1_general_ci DEFAULT NULL,
  `cronstatus` tinyint(1) DEFAULT NULL,
  `last_pointer` int(11) UNSIGNED NOT NULL DEFAULT '0',
  `last_pointer_queue1` int(11) NOT NULL DEFAULT '0',
  `last_pointer_queue2` int(11) NOT NULL DEFAULT '0',
  `last_daily_digest` int(11) NOT NULL DEFAULT '0',
  `last_weekly_digest` int(11) NOT NULL DEFAULT '0',
  `last_pointer_index1` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `cronjobstatus`
--

INSERT INTO `cronjobstatus` (`pointer`, `type`, `cronstatus`, `last_pointer`, `last_pointer_queue1`, `last_pointer_queue2`, `last_daily_digest`, `last_weekly_digest`, `last_pointer_index1`) VALUES
(1, 'users', 1, 0, 0, 0, 0, 0, 0),
(2, 'pastactivity', 1, 0, 0, 0, 0, 0, 0),
(3, 'loginrecord', 1, 0, 0, 0, 0, 0, 0),
(4, 'lists', 1, 0, 0, 0, 0, 0, 0),
(5, 'comments', 1, 0, 0, 0, 0, 0, 0),
(6, 'discussions', 1, 0, 0, 0, 0, 0, 0),
(7, 'listshares', 1, 0, 0, 0, 0, 0, 0),
(8, 'suggestions', 1, 0, 0, 0, 0, 0, 0),
(9, 'subscribes', 1, 0, 0, 0, 0, 0, 0),
(10, 'images', 1, 0, 0, 0, 0, 0, 0),
(11, 'imagephash', 1, 75976, 0, 0, 0, 0, 0),
(12, 'listlikedislike', 1, 0, 0, 0, 0, 0, 0),
(13, 'suggestionlikedislike', 1, 0, 0, 0, 0, 0, 0),
(14, 'commentlikedislike', 1, 0, 0, 0, 0, 0, 0),
(15, 'discussionlikedislike', 1, 0, 0, 0, 0, 0, 0),
(16, 'items', 1, 0, 0, 0, 0, 0, 0),
(17, 'itemlikedislike', 1, 0, 0, 0, 0, 0, 0),
(18, 'messages', 1, 0, 0, 0, 0, 0, 0),
(19, 'conversations', 1, 0, 0, 0, 0, 0, 0),
(20, 'suggestionflag', 1, 0, 0, 0, 0, 0, 0),
(21, 'discussionflag', 1, 0, 0, 0, 0, 0, 0),
(22, 'profileflag', 1, 0, 0, 0, 0, 0, 0),
(23, 'commentflag', 1, 0, 0, 0, 0, 0, 0),
(24, 'listflag', 1, 0, 0, 0, 0, 0, 0),
(25, 'itemflag', 1, 0, 0, 0, 0, 0, 0),
(26, 'profileshares', 1, 0, 0, 0, 0, 0, 0),
(27, 'rankings', 1, 0, 0, 0, 0, 0, 0),
(28, 'itemsremoved', 1, 0, 0, 0, 0, 0, 0),
(29, 'profileuniqueviews', 1, 0, 0, 0, 0, 0, 0),
(30, 'listuniqueviews', 1, 0, 0, 0, 0, 0, 0),
(31, 'listview', 1, 0, 0, 0, 0, 0, 0),
(32, 'profileview', 1, 0, 0, 0, 0, 0, 0),
(33, 'messages_deleted', 1, 0, 0, 0, 0, 0, 0),
(34, 'rankrecords', 1, 0, 0, 0, 0, 0, 0),
(35, 'imagetoresource', 1, 0, 0, 0, 0, 0, 0),
(36, 'username', 1, 0, 0, 0, 0, 0, 0),
(37, 'ip_view', 1, 0, 0, 0, 0, 0, 0),
(38, 'adclick_log', 1, 0, 0, 0, 0, 0, 0),
(39, 'adview_log', 1, 0, 0, 0, 0, 0, 0),
(40, 'adview_per_ip', 1, 0, 0, 0, 0, 0, 0),
(41, 'suggestionsforipchannels', 1, 0, 0, 0, 0, 0, 0),
(42, 'one_to_many_email_send', 1, 0, 0, 0, 0, 0, 0),
(43, 'indexuniqueviews', 1, 0, 0, 0, 0, 0, 0),
(44, 'indexview', 1, 0, 0, 0, 0, 0, 0),
(45, 'searchview', 1, 0, 0, 0, 0, 0, 0),
(46, 'searchuniqueviews', 1, 0, 0, 0, 0, 0, 0),
(47, 'footerpageuniqueviews', 1, 0, 0, 0, 0, 0, 0),
(48, 'rank_invitation', 1, 0, 0, 0, 0, 0, 0),
(49, 'signup_invitation', 1, 0, 0, 0, 0, 0, 0),
(50, 'email_preferences', 1, 0, 0, 0, 0, 0, 0),
(51, 'suggestionsforiplists', 1, 0, 0, 0, 0, 0, 0),
(52, 'addtofavlists_lists', 1, 0, 0, 0, 0, 0, 0),
(53, 'not_interested_lists', 1, 0, 0, 0, 0, 0, 0),
(54, 'listscategory', 1, 0, 0, 0, 0, 0, 0),
(55, 'settingsuniqueview', 1, 0, 0, 0, 0, 0, 0),
(56, 'settingsview', 1, 0, 0, 0, 0, 0, 0),
(57, 'listmanageruniqueview', 1, 0, 0, 0, 0, 0, 0),
(58, 'listmanagerview', 1, 0, 0, 0, 0, 0, 0),
(59, 'createlistuniqueview', 1, 0, 0, 0, 0, 0, 0),
(60, 'createlistview', 1, 0, 0, 0, 0, 0, 0),
(61, 'archive', 1, 0, 0, 0, 0, 0, 0),
(62, 'bannedimages', 1, 0, 0, 0, 0, 0, 0),
(63, 'cookie_consent_record', 1, 0, 0, 0, 0, 0, 0),
(64, 'itunesaddlinks', 1, 0, 0, 0, 0, 0, 0),
(65, 'adverts', 1, 0, 0, 0, 0, 0, 0),
(66, 'advert_impressions', 1, 0, 0, 0, 0, 0, 0),
(67, 'accepted_signup_invitation', 1, 0, 0, 0, 0, 0, 0),
(68, 'stages', 1, 0, 0, 0, 0, 0, 0),
(69, 'groups', 1, 0, 0, 0, 0, 0, 0),
(70, 'stage_group_relations', 1, 0, 0, 0, 0, 0, 0),
(71, 'profilecoverimage', 1, 0, 0, 0, 0, 0, 0),
(72, 'one_to_one_email_send', 1, 0, 0, 0, 0, 0, 0),
(73, 'thirdpartyref', 1, 0, 0, 0, 0, 0, 0),
(74, 'contributionslikedislike', 4, 0, 0, 7, 0, 0, 0),
(75, 'contributions', 4, 0, 0, 15, 0, 0, 0),
(76, 'contributionflag', 1, 0, 3, 0, 0, 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `ip_view`
--

CREATE TABLE `ip_view` (
  `pointer` int(11) NOT NULL,
  `ip` varchar(40) COLLATE utf8_unicode_ci NOT NULL,
  `zipcode` varchar(20) COLLATE utf8_unicode_ci DEFAULT NULL,
  `country_name` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `country_code` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `latitude` double NOT NULL,
  `longitude` double NOT NULL,
  `city` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `region_code` varchar(20) COLLATE utf8_unicode_ci DEFAULT NULL,
  `region_name` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `time_zone` varchar(50) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `ip_view`
--

INSERT INTO `ip_view` (`pointer`, `ip`, `zipcode`, `country_name`, `country_code`, `latitude`, `longitude`, `city`, `region_code`, `region_name`, `time_zone`) VALUES
(1, '54.236.1.14', '20146', 'United States', 'US', 39.0437, -77.4875, 'Ashburn', 'VA', 'Virginia', 'America/New_York'),
(2, '173.252.86.71', '94025', 'United States', 'US', 37.4538, -122.1822, 'Menlo Park', 'CA', 'California', 'America/Los_Angeles');

-- --------------------------------------------------------

--
-- Table structure for table `lists`
--

CREATE TABLE `lists` (
  `id` int(255) NOT NULL,
  `content` longtext COLLATE utf8mb4_unicode_ci,
  `content_censored` longtext COLLATE utf8mb4_unicode_ci,
  `user_id` int(255) NOT NULL,
  `image` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `total_contribution` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `lists`
--

INSERT INTO `lists` (`id`, `content`, `content_censored`, `user_id`, `image`, `time`, `total_contribution`) VALUES
(1, 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.', NULL, 7, 'Screenshot (17).png', '2019-11-20 15:10:26', 0),
(2, 'hey there', NULL, 7, 'Screenshot (23).png', '2019-11-20 15:12:05', 0),
(3, 'dfsdfsdfsdfsdf', NULL, 7, '', '2019-11-20 15:14:47', 0),
(4, 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using \'Content here, content here\', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default m', NULL, 1, '', '2019-11-20 15:21:22', 0),
(5, 'slang test', 'slang test', 2, NULL, '2019-11-21 15:02:04', 0),
(6, '', '', 2, NULL, '2019-11-27 15:19:26', 0),
(7, '', '', 2, NULL, '2019-12-07 11:10:08', 0);

-- --------------------------------------------------------

--
-- Table structure for table `lists_index1`
--

CREATE TABLE `lists_index1` (
  `id` int(255) NOT NULL,
  `content` longtext COLLATE utf8mb4_unicode_ci,
  `content_censored` longtext COLLATE utf8mb4_unicode_ci,
  `user_id` int(255) NOT NULL,
  `image` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `total_contribution` int(255) NOT NULL,
  `lists_pointer` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `lists_index1`
--

INSERT INTO `lists_index1` (`id`, `content`, `content_censored`, `user_id`, `image`, `time`, `total_contribution`, `lists_pointer`) VALUES
(1, 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.', NULL, 7, 'Screenshot (17).png', '2019-11-20 15:10:26', 14, 1),
(2, 'hey there', NULL, 7, 'Screenshot (23).png', '2019-11-20 15:12:05', 1, 2),
(3, 'dfsdfsdfsdfsdf', NULL, 7, NULL, '2019-11-20 15:14:47', 6, 3),
(4, 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using \'Content here, content here\', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default m', 'slang test', 7, NULL, '2019-11-20 15:21:22', 16, 4);

-- --------------------------------------------------------

--
-- Table structure for table `lists_index2`
--

CREATE TABLE `lists_index2` (
  `id` int(255) NOT NULL,
  `content` longtext COLLATE utf8mb4_unicode_ci,
  `content_censored` longtext COLLATE utf8mb4_unicode_ci,
  `user_id` int(255) NOT NULL,
  `image` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `total_contribution` int(255) NOT NULL,
  `lists_pointer` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `lists_index2`
--

INSERT INTO `lists_index2` (`id`, `content`, `content_censored`, `user_id`, `image`, `time`, `total_contribution`, `lists_pointer`) VALUES
(1, 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.', NULL, 7, 'Screenshot (17).png', '2019-11-20 15:10:26', 14, 1),
(2, 'hey there', NULL, 7, 'Screenshot (23).png', '2019-11-20 15:12:05', 1, 2),
(3, 'dfsdfsdfsdfsdf', NULL, 7, NULL, '2019-11-20 15:14:47', 6, 3),
(4, 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using \'Content here, content here\', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default m', 'slang test', 7, NULL, '2019-11-20 15:21:22', 16, 4);

-- --------------------------------------------------------

--
-- Table structure for table `lists_queue1`
--

CREATE TABLE `lists_queue1` (
  `id` int(255) NOT NULL,
  `content` longtext COLLATE utf8mb4_unicode_ci,
  `content_censored` longtext COLLATE utf8mb4_unicode_ci,
  `user_id` int(255) NOT NULL,
  `image` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `total_contribution` int(255) NOT NULL,
  `lists_pointer` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `lists_queue2`
--

CREATE TABLE `lists_queue2` (
  `id` int(255) NOT NULL,
  `content` longtext COLLATE utf8mb4_unicode_ci,
  `content_censored` longtext COLLATE utf8mb4_unicode_ci,
  `user_id` int(255) NOT NULL,
  `image` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `total_contribution` int(255) NOT NULL,
  `lists_pointer` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `lists_update1`
--

CREATE TABLE `lists_update1` (
  `id` int(255) NOT NULL,
  `content` longtext COLLATE utf8mb4_unicode_ci,
  `content_censored` longtext COLLATE utf8mb4_unicode_ci,
  `user_id` int(255) NOT NULL,
  `image` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `total_contribution` int(255) NOT NULL,
  `lists_pointer` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `lists_update2`
--

CREATE TABLE `lists_update2` (
  `id` int(255) NOT NULL,
  `content` longtext COLLATE utf8mb4_unicode_ci,
  `content_censored` longtext COLLATE utf8mb4_unicode_ci,
  `user_id` int(255) NOT NULL,
  `image` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `total_contribution` int(255) NOT NULL,
  `lists_pointer` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `dob` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `created_at`, `dob`) VALUES
(1, 'anne', '$2y$10$TPWGaAxrfBIRy33G7jQDTOABft9IwLTiCsNv9.QXBNmPHdyPGd7KW', '2019-11-24 11:43:52', '2005-01-28 00:00:00'),
(2, 'tushi', '$2y$10$.eF3vsMRuRMIQbROjfvQau1/DtJcL4uPrRewSEpvvuqcKz338ZHxW', '2019-11-24 11:44:21', '1995-08-22 00:00:00'),
(3, 'rasel', '$2y$10$rL3M.rHkqMl7IVx00eoYuumRDM4gQ1K8NzKhQw.YNDYQAGS9RC0N6', '2019-11-24 11:44:48', '1995-01-23 00:00:00'),
(4, 'yamin', '$2y$10$vKohgZT4NVpCh5hbBjotTOFglQwzKz/fnNsHXBvtaaYJqn7tNoNdG', '2019-11-24 11:45:22', '1990-09-22 00:00:00'),
(5, 'samia', '$2y$10$J4/VPDlbiIbG3wFPLqLt0ePL4fqzM88XK1bhCfN1BW1aZKC4GmYmS', '2019-11-24 11:45:48', '1995-02-21 00:00:00'),
(6, 'tasnim', '$2y$10$J4/VPDlbiIbG3wFPLqLt0ePL4fqzM88XK1bhCfN1BW1aZKC4GmYmS', '2019-11-24 11:45:48', '1995-02-21 00:00:00'),
(7, 'tanvir', '$2y$10$J4/VPDlbiIbG3wFPLqLt0ePL4fqzM88XK1bhCfN1BW1aZKC4GmYmS', '2019-11-24 11:45:48', '1995-02-21 00:00:00'),
(8, 'zcxzcZC', '$2y$10$hBrhBL2BvaABXnHws4/AlOGwtrrdc66wzIghf1J7cKOK/lZ2mRmpa', '2019-11-24 11:57:40', '1997-02-02 00:00:00');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `contributionflag`
--
ALTER TABLE `contributionflag`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `contributionflag_index1`
--
ALTER TABLE `contributionflag_index1`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `contributionflag_index2`
--
ALTER TABLE `contributionflag_index2`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `contributionflag_queue1`
--
ALTER TABLE `contributionflag_queue1`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `contributionflag_queue2`
--
ALTER TABLE `contributionflag_queue2`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `contributions`
--
ALTER TABLE `contributions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `content_id` (`lists_pointer`);

--
-- Indexes for table `contributionslikedislike`
--
ALTER TABLE `contributionslikedislike`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `contributionslikedislike_index1`
--
ALTER TABLE `contributionslikedislike_index1`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `contributionslikedislike_index2`
--
ALTER TABLE `contributionslikedislike_index2`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `contributionslikedislike_queue1`
--
ALTER TABLE `contributionslikedislike_queue1`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `contributionslikedislike_queue2`
--
ALTER TABLE `contributionslikedislike_queue2`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `contributions_index1`
--
ALTER TABLE `contributions_index1`
  ADD PRIMARY KEY (`id`),
  ADD KEY `content_id` (`lists_pointer`);

--
-- Indexes for table `contributions_index2`
--
ALTER TABLE `contributions_index2`
  ADD PRIMARY KEY (`id`),
  ADD KEY `content_id` (`lists_pointer`);

--
-- Indexes for table `contributions_queue1`
--
ALTER TABLE `contributions_queue1`
  ADD PRIMARY KEY (`id`),
  ADD KEY `content_id` (`lists_pointer`);

--
-- Indexes for table `contributions_queue2`
--
ALTER TABLE `contributions_queue2`
  ADD PRIMARY KEY (`id`),
  ADD KEY `content_id` (`lists_pointer`);

--
-- Indexes for table `contributions_update1`
--
ALTER TABLE `contributions_update1`
  ADD PRIMARY KEY (`id`),
  ADD KEY `content_id` (`lists_pointer`);

--
-- Indexes for table `contributions_update2`
--
ALTER TABLE `contributions_update2`
  ADD PRIMARY KEY (`id`),
  ADD KEY `content_id` (`lists_pointer`);

--
-- Indexes for table `cronjobstatus`
--
ALTER TABLE `cronjobstatus`
  ADD PRIMARY KEY (`pointer`),
  ADD KEY `type` (`type`);

--
-- Indexes for table `ip_view`
--
ALTER TABLE `ip_view`
  ADD PRIMARY KEY (`pointer`);

--
-- Indexes for table `lists`
--
ALTER TABLE `lists`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `lists_index1`
--
ALTER TABLE `lists_index1`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `lists_index2`
--
ALTER TABLE `lists_index2`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `lists_queue1`
--
ALTER TABLE `lists_queue1`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `lists_queue2`
--
ALTER TABLE `lists_queue2`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `lists_update1`
--
ALTER TABLE `lists_update1`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `lists_update2`
--
ALTER TABLE `lists_update2`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `contributionflag`
--
ALTER TABLE `contributionflag`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `contributionflag_index1`
--
ALTER TABLE `contributionflag_index1`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `contributionflag_index2`
--
ALTER TABLE `contributionflag_index2`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `contributionflag_queue1`
--
ALTER TABLE `contributionflag_queue1`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `contributionflag_queue2`
--
ALTER TABLE `contributionflag_queue2`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `contributions`
--
ALTER TABLE `contributions`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT for table `contributionslikedislike`
--
ALTER TABLE `contributionslikedislike`
  MODIFY `id` int(255) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `contributionslikedislike_index1`
--
ALTER TABLE `contributionslikedislike_index1`
  MODIFY `id` int(255) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `contributionslikedislike_index2`
--
ALTER TABLE `contributionslikedislike_index2`
  MODIFY `id` int(255) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `contributionslikedislike_queue1`
--
ALTER TABLE `contributionslikedislike_queue1`
  MODIFY `id` int(255) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `contributionslikedislike_queue2`
--
ALTER TABLE `contributionslikedislike_queue2`
  MODIFY `id` int(255) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `contributions_index1`
--
ALTER TABLE `contributions_index1`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `contributions_index2`
--
ALTER TABLE `contributions_index2`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `contributions_queue1`
--
ALTER TABLE `contributions_queue1`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `contributions_queue2`
--
ALTER TABLE `contributions_queue2`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `contributions_update1`
--
ALTER TABLE `contributions_update1`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `contributions_update2`
--
ALTER TABLE `contributions_update2`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `cronjobstatus`
--
ALTER TABLE `cronjobstatus`
  MODIFY `pointer` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=77;

--
-- AUTO_INCREMENT for table `ip_view`
--
ALTER TABLE `ip_view`
  MODIFY `pointer` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `lists`
--
ALTER TABLE `lists`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `lists_index1`
--
ALTER TABLE `lists_index1`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `lists_index2`
--
ALTER TABLE `lists_index2`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `lists_queue1`
--
ALTER TABLE `lists_queue1`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `lists_queue2`
--
ALTER TABLE `lists_queue2`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `lists_update1`
--
ALTER TABLE `lists_update1`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `lists_update2`
--
ALTER TABLE `lists_update2`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

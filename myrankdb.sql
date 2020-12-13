-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 13, 2020 at 09:30 AM
-- Server version: 10.4.11-MariaDB
-- PHP Version: 7.4.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `myrankdb`
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
  `abusive` tinyint(2) DEFAULT 0,
  `spam` tinyint(2) DEFAULT 0,
  `iip` tinyint(2) DEFAULT 0,
  `ip_pointer` int(11) NOT NULL,
  `time` datetime NOT NULL,
  `time_offset` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

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
  `abusive` tinyint(2) NOT NULL DEFAULT 0,
  `spam` tinyint(2) NOT NULL DEFAULT 0,
  `iip` tinyint(2) NOT NULL DEFAULT 0,
  `ip_pointer` int(11) NOT NULL,
  `time` datetime NOT NULL,
  `time_offset` float NOT NULL,
  `contributionflag_pointer` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

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
  `abusive` tinyint(2) NOT NULL DEFAULT 0,
  `spam` tinyint(2) NOT NULL DEFAULT 0,
  `iip` tinyint(2) NOT NULL DEFAULT 0,
  `ip_pointer` int(11) NOT NULL,
  `time` datetime NOT NULL,
  `time_offset` float NOT NULL,
  `contributionflag_pointer` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

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
  `abusive` tinyint(2) DEFAULT 0,
  `spam` tinyint(2) DEFAULT 0,
  `iip` tinyint(2) DEFAULT 0,
  `ip_pointer` int(11) NOT NULL,
  `time` datetime NOT NULL,
  `time_offset` float NOT NULL,
  `contributionflag_pointer` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

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
  `abusive` tinyint(2) DEFAULT 0,
  `spam` tinyint(2) DEFAULT 0,
  `iip` tinyint(2) DEFAULT 0,
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
  `text_censored` longtext COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_id` int(255) NOT NULL,
  `lists_pointer` int(255) NOT NULL,
  `selected` tinyint(1) DEFAULT 0,
  `time` datetime NOT NULL DEFAULT current_timestamp(),
  `ip` int(40) NOT NULL,
  `likes` int(11) NOT NULL,
  `dislikes` int(11) NOT NULL,
  `score` float NOT NULL,
  `recorded` tinyint(2) NOT NULL DEFAULT 1,
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
(1, 'You are right!\n', 'You are right!\n', 1, 1, 0, '2020-12-13 12:52:20', 1, 0, 0, 0, 1, 0, 0, 0, 0, 0),
(2, 'ss', 'ss', 1, 1, 0, '2020-12-13 12:56:10', 1, 0, 0, 0, 1, 0, 0, 0, 0, 0),
(3, 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using \\\'Content here, content here\\\', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for \\\'lorem ipsum\\\' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like', 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using \\\'Content here, content here\\\', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for \\\'lorem ipsum\\\' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like', 1, 1, 0, '2020-12-13 13:50:09', 1, 0, 0, 0, 1, 0, 0, 0, 0, 0);

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
  `time` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `contributionslikedislike`
--

INSERT INTO `contributionslikedislike` (`id`, `user_id`, `like_status`, `dislike_status`, `contributions_pointer`, `time`) VALUES
(1, 1, 1, 0, 1, '2020-12-13 13:45:37');

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
  `time` datetime NOT NULL DEFAULT current_timestamp(),
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
  `time` datetime NOT NULL DEFAULT current_timestamp(),
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
  `time` datetime NOT NULL DEFAULT current_timestamp(),
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
  `time` datetime NOT NULL DEFAULT current_timestamp(),
  `contributionslikedislike_pointer` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `contributionslikedislike_queue2`
--

INSERT INTO `contributionslikedislike_queue2` (`id`, `user_id`, `like_status`, `dislike_status`, `contributions_pointer`, `time`, `contributionslikedislike_pointer`) VALUES
(1, 1, 1, 0, 1, '2020-12-13 13:45:37', 1);

-- --------------------------------------------------------

--
-- Table structure for table `contributions_index1`
--

CREATE TABLE `contributions_index1` (
  `id` int(255) NOT NULL,
  `text` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `text_censored` longtext COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_id` int(255) NOT NULL,
  `lists_pointer` int(255) NOT NULL,
  `selected` tinyint(1) DEFAULT 0,
  `time` datetime NOT NULL DEFAULT current_timestamp(),
  `ip` int(40) NOT NULL,
  `likes` int(11) NOT NULL,
  `dislikes` int(11) NOT NULL,
  `score` float NOT NULL,
  `recorded` tinyint(2) NOT NULL DEFAULT 1,
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
  `text_censored` longtext COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_id` int(255) NOT NULL,
  `lists_pointer` int(255) NOT NULL,
  `selected` tinyint(1) DEFAULT 0,
  `time` datetime NOT NULL DEFAULT current_timestamp(),
  `ip` int(40) NOT NULL,
  `likes` int(11) NOT NULL,
  `dislikes` int(11) NOT NULL,
  `score` float NOT NULL,
  `recorded` tinyint(2) NOT NULL DEFAULT 1,
  `total_spam` int(11) NOT NULL,
  `total_abusive` int(11) NOT NULL,
  `total_iip` int(11) NOT NULL,
  `time_offset_delete` tinyint(2) NOT NULL,
  `time_offset_add` tinyint(2) NOT NULL,
  `contributions_pointer` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `contributions_queue1`
--

CREATE TABLE `contributions_queue1` (
  `id` int(255) NOT NULL,
  `text` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `text_censored` longtext COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_id` int(255) NOT NULL,
  `lists_pointer` int(255) NOT NULL,
  `selected` tinyint(1) DEFAULT 0,
  `time` datetime NOT NULL DEFAULT current_timestamp(),
  `ip` int(40) NOT NULL,
  `likes` int(11) NOT NULL,
  `dislikes` int(11) NOT NULL,
  `score` float NOT NULL,
  `recorded` tinyint(2) NOT NULL DEFAULT 1,
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
  `text_censored` longtext COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_id` int(255) NOT NULL,
  `lists_pointer` int(255) NOT NULL,
  `selected` tinyint(1) DEFAULT 0,
  `time` datetime NOT NULL DEFAULT current_timestamp(),
  `ip` int(40) NOT NULL,
  `likes` int(11) NOT NULL,
  `dislikes` int(11) NOT NULL,
  `score` float NOT NULL,
  `recorded` tinyint(2) NOT NULL DEFAULT 1,
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
(1, 'You are right!\n', NULL, 1, 1, 0, '2020-12-13 12:52:20', 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1),
(2, 'ss', NULL, 1, 1, 0, '2020-12-13 12:56:10', 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 2),
(3, 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using \\\'Content here, content here\\\', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for \\\'lorem ipsum\\\' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like', NULL, 1, 1, 0, '2020-12-13 13:50:10', 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 3);

-- --------------------------------------------------------

--
-- Table structure for table `contributions_update1`
--

CREATE TABLE `contributions_update1` (
  `id` int(255) NOT NULL,
  `text` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `text_censored` longtext COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_id` int(255) NOT NULL,
  `lists_pointer` int(255) NOT NULL,
  `selected` tinyint(1) DEFAULT 0,
  `time` datetime NOT NULL DEFAULT current_timestamp(),
  `ip` int(40) NOT NULL,
  `likes` int(11) NOT NULL,
  `dislikes` int(11) NOT NULL,
  `score` float NOT NULL,
  `recorded` tinyint(2) NOT NULL DEFAULT 1,
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
  `text_censored` longtext COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_id` int(255) NOT NULL,
  `lists_pointer` int(255) NOT NULL,
  `selected` tinyint(1) DEFAULT 0,
  `time` datetime NOT NULL DEFAULT current_timestamp(),
  `ip` int(40) NOT NULL,
  `likes` int(11) NOT NULL,
  `dislikes` int(11) NOT NULL,
  `score` float NOT NULL,
  `recorded` tinyint(2) NOT NULL DEFAULT 1,
  `total_spam` int(11) NOT NULL,
  `total_abusive` int(11) NOT NULL,
  `total_iip` int(11) NOT NULL,
  `time_offset_delete` tinyint(2) NOT NULL,
  `time_offset_add` tinyint(2) NOT NULL,
  `contributions_pointer` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cronjobstatus`
--

CREATE TABLE `cronjobstatus` (
  `pointer` int(11) NOT NULL,
  `type` varchar(30) CHARACTER SET latin1 COLLATE latin1_general_ci DEFAULT NULL,
  `cronstatus` tinyint(1) DEFAULT NULL,
  `last_pointer` int(11) UNSIGNED NOT NULL DEFAULT 0,
  `last_pointer_queue1` int(11) NOT NULL DEFAULT 0,
  `last_pointer_queue2` int(11) NOT NULL DEFAULT 0,
  `last_daily_digest` int(11) NOT NULL DEFAULT 0,
  `last_weekly_digest` int(11) NOT NULL DEFAULT 0,
  `last_pointer_index1` int(11) NOT NULL DEFAULT 0
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
(76, 'contributionflag', 1, 0, 3, 0, 0, 0, 0),
(77, 'multimedia_contributions', 1, 0, 0, 0, 0, 0, 0),
(78, 'multimedialikedislike', 1, 0, 0, 0, 0, 0, 0),
(79, 'multimedia_contributionflag', 1, 0, 0, 0, 0, 0, 0);

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
(1, '173.252.86.71', '94025', 'United States', 'US', 37.4538, -122.1822, 'Menlo Park', 'CA', 'California', 'America/Los_Angeles');

-- --------------------------------------------------------

--
-- Table structure for table `lists`
--

CREATE TABLE `lists` (
  `id` int(255) NOT NULL,
  `content` longtext COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `content_censored` longtext COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_id` int(255) NOT NULL,
  `image` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `time` datetime NOT NULL DEFAULT current_timestamp(),
  `total_contribution` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `lists`
--

INSERT INTO `lists` (`id`, `content`, `content_censored`, `user_id`, `image`, `time`, `total_contribution`) VALUES
(1, 'This is the demo lists. If you want make a contribution to this post! Thank You!', 'This is the demo lists. If you want make a contribution to this post! Thank You!', 2, 'orientation-1.jpg', '2020-12-13 12:04:57', 0);

-- --------------------------------------------------------

--
-- Table structure for table `lists_index1`
--

CREATE TABLE `lists_index1` (
  `id` int(255) NOT NULL,
  `content` longtext COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `content_censored` longtext COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_id` int(255) NOT NULL,
  `image` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `time` datetime NOT NULL DEFAULT current_timestamp(),
  `total_contribution` int(255) NOT NULL,
  `lists_pointer` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `lists_index2`
--

CREATE TABLE `lists_index2` (
  `id` int(255) NOT NULL,
  `content` longtext COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `content_censored` longtext COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_id` int(255) NOT NULL,
  `image` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `time` datetime NOT NULL DEFAULT current_timestamp(),
  `total_contribution` int(255) NOT NULL,
  `lists_pointer` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `lists_queue1`
--

CREATE TABLE `lists_queue1` (
  `id` int(255) NOT NULL,
  `content` longtext COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `content_censored` longtext COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_id` int(255) NOT NULL,
  `image` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `time` datetime NOT NULL DEFAULT current_timestamp(),
  `total_contribution` int(255) NOT NULL,
  `lists_pointer` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `lists_queue2`
--

CREATE TABLE `lists_queue2` (
  `id` int(255) NOT NULL,
  `content` longtext COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `content_censored` longtext COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_id` int(255) NOT NULL,
  `image` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `time` datetime NOT NULL DEFAULT current_timestamp(),
  `total_contribution` int(255) NOT NULL,
  `lists_pointer` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `lists_update1`
--

CREATE TABLE `lists_update1` (
  `id` int(255) NOT NULL,
  `content` longtext COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `content_censored` longtext COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_id` int(255) NOT NULL,
  `image` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `time` datetime NOT NULL DEFAULT current_timestamp(),
  `total_contribution` int(255) NOT NULL,
  `lists_pointer` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `lists_update2`
--

CREATE TABLE `lists_update2` (
  `id` int(255) NOT NULL,
  `content` longtext COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `content_censored` longtext COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_id` int(255) NOT NULL,
  `image` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `time` datetime NOT NULL DEFAULT current_timestamp(),
  `total_contribution` int(255) NOT NULL,
  `lists_pointer` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `multimedialikedislike`
--

CREATE TABLE `multimedialikedislike` (
  `id` int(255) NOT NULL,
  `user_id` int(255) NOT NULL,
  `like_status` tinyint(2) NOT NULL,
  `dislike_status` tinyint(2) NOT NULL,
  `multimedia_contributions_pointer` int(255) NOT NULL,
  `time` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `multimedialikedislike_index1`
--

CREATE TABLE `multimedialikedislike_index1` (
  `id` int(255) NOT NULL,
  `user_id` int(255) NOT NULL,
  `like_status` tinyint(2) NOT NULL,
  `dislike_status` tinyint(2) NOT NULL,
  `multimedia_contributions_pointer` int(255) NOT NULL,
  `time` datetime NOT NULL,
  `multimedialikedislike_pointer` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `multimedialikedislike_index2`
--

CREATE TABLE `multimedialikedislike_index2` (
  `id` int(255) NOT NULL,
  `user_id` int(255) NOT NULL,
  `like_status` tinyint(2) NOT NULL,
  `dislike_status` tinyint(2) NOT NULL,
  `multimedia_contributions_pointer` int(255) NOT NULL,
  `time` datetime NOT NULL,
  `multimedialikedislike_pointer` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `multimedialikedislike_queue1`
--

CREATE TABLE `multimedialikedislike_queue1` (
  `id` int(255) NOT NULL,
  `user_id` int(255) NOT NULL,
  `like_status` tinyint(2) NOT NULL,
  `dislike_status` tinyint(2) NOT NULL,
  `multimedia_contributions_pointer` int(255) NOT NULL,
  `time` datetime NOT NULL,
  `multimedialikedislike_pointer` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `multimedialikedislike_queue2`
--

CREATE TABLE `multimedialikedislike_queue2` (
  `id` int(255) NOT NULL,
  `user_id` int(255) NOT NULL,
  `like_status` tinyint(2) NOT NULL,
  `dislike_status` tinyint(2) NOT NULL,
  `multimedia_contributions_pointer` int(255) NOT NULL,
  `time` datetime NOT NULL,
  `multimedialikedislike_pointer` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `multimedia_contributionflag`
--

CREATE TABLE `multimedia_contributionflag` (
  `id` int(255) NOT NULL,
  `multimedia_contributions_pointer` int(255) NOT NULL,
  `lists_pointer` int(255) NOT NULL,
  `users_pointer` int(255) NOT NULL,
  `flaguser_pointer` int(255) NOT NULL,
  `abusive` tinyint(2) NOT NULL,
  `spam` tinyint(2) NOT NULL,
  `iip` tinyint(2) NOT NULL,
  `ip_pointer` int(11) NOT NULL,
  `time` datetime NOT NULL,
  `time_offset` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `multimedia_contributionflag_index1`
--

CREATE TABLE `multimedia_contributionflag_index1` (
  `id` int(255) NOT NULL,
  `multimedia_contributions_pointer` int(255) NOT NULL,
  `lists_pointer` int(255) NOT NULL,
  `users_pointer` int(255) NOT NULL,
  `flaguser_pointer` int(255) NOT NULL,
  `abusive` tinyint(2) NOT NULL DEFAULT 0,
  `spam` tinyint(2) NOT NULL DEFAULT 0,
  `iip` tinyint(2) NOT NULL DEFAULT 0,
  `ip_pointer` int(11) NOT NULL,
  `time` datetime NOT NULL,
  `time_offset` float NOT NULL,
  `multimedia_contributionflag_pointer` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `multimedia_contributionflag_index2`
--

CREATE TABLE `multimedia_contributionflag_index2` (
  `id` int(255) NOT NULL,
  `multimedia_contributions_pointer` int(255) NOT NULL,
  `lists_pointer` int(255) NOT NULL,
  `users_pointer` int(255) NOT NULL,
  `flaguser_pointer` int(255) NOT NULL,
  `abusive` tinyint(2) NOT NULL DEFAULT 0,
  `spam` tinyint(2) NOT NULL DEFAULT 0,
  `iip` tinyint(2) NOT NULL DEFAULT 0,
  `ip_pointer` int(11) NOT NULL,
  `time` datetime NOT NULL,
  `time_offset` float NOT NULL,
  `multimedia_contributionflag_pointer` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `multimedia_contributionflag_queue1`
--

CREATE TABLE `multimedia_contributionflag_queue1` (
  `id` int(255) NOT NULL,
  `multimedia_contributions_pointer` int(255) NOT NULL,
  `lists_pointer` int(255) NOT NULL,
  `users_pointer` int(255) NOT NULL,
  `flaguser_pointer` int(255) NOT NULL,
  `abusive` tinyint(2) NOT NULL DEFAULT 0,
  `spam` tinyint(2) NOT NULL DEFAULT 0,
  `iip` tinyint(2) NOT NULL DEFAULT 0,
  `ip_pointer` int(11) NOT NULL,
  `time` datetime NOT NULL,
  `time_offset` float NOT NULL,
  `multimedia_contributionflag_pointer` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `multimedia_contributionflag_queue2`
--

CREATE TABLE `multimedia_contributionflag_queue2` (
  `id` int(255) NOT NULL,
  `multimedia_contributions_pointer` int(255) NOT NULL,
  `lists_pointer` int(255) NOT NULL,
  `users_pointer` int(255) NOT NULL,
  `flaguser_pointer` int(255) NOT NULL,
  `abusive` tinyint(2) NOT NULL DEFAULT 0,
  `spam` tinyint(2) NOT NULL DEFAULT 0,
  `iip` tinyint(2) NOT NULL DEFAULT 0,
  `ip_pointer` int(11) NOT NULL,
  `time` datetime NOT NULL,
  `time_offset` float NOT NULL,
  `multimedia_contributionflag_pointer` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `multimedia_contributions`
--

CREATE TABLE `multimedia_contributions` (
  `id` int(255) NOT NULL,
  `image` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` int(255) NOT NULL,
  `lists_pointer` int(255) NOT NULL,
  `selected` tinyint(2) DEFAULT 0,
  `time` datetime NOT NULL DEFAULT current_timestamp(),
  `ip` int(40) NOT NULL,
  `likes` int(11) NOT NULL,
  `dislikes` int(11) NOT NULL,
  `score` float NOT NULL,
  `recorded` tinyint(2) NOT NULL DEFAULT 1,
  `total_spam` int(11) NOT NULL,
  `total_abusive` int(11) NOT NULL,
  `total_iip` int(11) NOT NULL,
  `time_offset_delete` tinyint(2) NOT NULL,
  `time_offset_add` tinyint(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `multimedia_contributions_index1`
--

CREATE TABLE `multimedia_contributions_index1` (
  `id` int(255) NOT NULL,
  `image` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` int(255) NOT NULL,
  `lists_pointer` int(255) NOT NULL,
  `selected` tinyint(2) DEFAULT 0,
  `time` datetime NOT NULL DEFAULT current_timestamp(),
  `ip` int(40) NOT NULL,
  `likes` int(11) NOT NULL,
  `dislikes` int(11) NOT NULL,
  `score` float NOT NULL,
  `recorded` tinyint(2) NOT NULL DEFAULT 1,
  `total_spam` int(11) NOT NULL,
  `total_abusive` int(11) NOT NULL,
  `total_iip` int(11) NOT NULL,
  `time_offset_delete` tinyint(2) NOT NULL,
  `time_offset_add` tinyint(2) NOT NULL,
  `multimedia_contributions_pointer` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `multimedia_contributions_index2`
--

CREATE TABLE `multimedia_contributions_index2` (
  `id` int(255) NOT NULL,
  `image` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` int(255) NOT NULL,
  `lists_pointer` int(255) NOT NULL,
  `selected` tinyint(2) DEFAULT 0,
  `time` datetime NOT NULL DEFAULT current_timestamp(),
  `ip` int(40) NOT NULL,
  `likes` int(11) NOT NULL,
  `dislikes` int(11) NOT NULL,
  `score` float NOT NULL,
  `recorded` tinyint(2) NOT NULL DEFAULT 1,
  `total_spam` int(11) NOT NULL,
  `total_abusive` int(11) NOT NULL,
  `total_iip` int(11) NOT NULL,
  `time_offset_delete` tinyint(2) NOT NULL,
  `time_offset_add` tinyint(2) NOT NULL,
  `multimedia_contributions_pointer` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `multimedia_contributions_queue1`
--

CREATE TABLE `multimedia_contributions_queue1` (
  `id` int(255) NOT NULL,
  `image` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` int(255) NOT NULL,
  `lists_pointer` int(255) NOT NULL,
  `selected` tinyint(2) DEFAULT 0,
  `time` datetime NOT NULL DEFAULT current_timestamp(),
  `ip` int(40) NOT NULL,
  `likes` int(11) NOT NULL,
  `dislikes` int(11) NOT NULL,
  `score` float NOT NULL,
  `recorded` tinyint(2) NOT NULL DEFAULT 1,
  `total_spam` int(11) NOT NULL,
  `total_abusive` int(11) NOT NULL,
  `total_iip` int(11) NOT NULL,
  `time_offset_delete` tinyint(2) NOT NULL,
  `time_offset_add` tinyint(2) NOT NULL,
  `multimedia_contributions_pointer` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `multimedia_contributions_queue2`
--

CREATE TABLE `multimedia_contributions_queue2` (
  `id` int(255) NOT NULL,
  `image` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` int(255) NOT NULL,
  `lists_pointer` int(255) NOT NULL,
  `selected` tinyint(2) DEFAULT 0,
  `time` datetime NOT NULL DEFAULT current_timestamp(),
  `ip` int(40) NOT NULL,
  `likes` int(11) NOT NULL,
  `dislikes` int(11) NOT NULL,
  `score` float NOT NULL,
  `recorded` tinyint(2) NOT NULL DEFAULT 1,
  `total_spam` int(11) NOT NULL,
  `total_abusive` int(11) NOT NULL,
  `total_iip` int(11) NOT NULL,
  `time_offset_delete` tinyint(2) NOT NULL,
  `time_offset_add` tinyint(2) NOT NULL,
  `multimedia_contributions_pointer` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `multimedia_contributions_update1`
--

CREATE TABLE `multimedia_contributions_update1` (
  `id` int(255) NOT NULL,
  `image` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` int(255) NOT NULL,
  `lists_pointer` int(255) NOT NULL,
  `selected` tinyint(2) DEFAULT 0,
  `time` datetime NOT NULL DEFAULT current_timestamp(),
  `ip` int(40) NOT NULL,
  `likes` int(11) NOT NULL,
  `dislikes` int(11) NOT NULL,
  `score` float NOT NULL,
  `recorded` tinyint(2) NOT NULL DEFAULT 1,
  `total_spam` int(11) NOT NULL,
  `total_abusive` int(11) NOT NULL,
  `total_iip` int(11) NOT NULL,
  `time_offset_delete` tinyint(2) NOT NULL,
  `time_offset_add` tinyint(2) NOT NULL,
  `multimedia_contributions_pointer` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `multimedia_contributions_update2`
--

CREATE TABLE `multimedia_contributions_update2` (
  `id` int(255) NOT NULL,
  `image` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` int(255) NOT NULL,
  `lists_pointer` int(255) NOT NULL,
  `selected` tinyint(2) DEFAULT 0,
  `time` datetime NOT NULL DEFAULT current_timestamp(),
  `ip` int(40) NOT NULL,
  `likes` int(11) NOT NULL,
  `dislikes` int(11) NOT NULL,
  `score` float NOT NULL,
  `recorded` tinyint(2) NOT NULL DEFAULT 1,
  `total_spam` int(11) NOT NULL,
  `total_abusive` int(11) NOT NULL,
  `total_iip` int(11) NOT NULL,
  `time_offset_delete` tinyint(2) NOT NULL,
  `time_offset_add` tinyint(2) NOT NULL,
  `multimedia_contributions_pointer` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `dob` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `created_at`, `dob`) VALUES
(1, 'Anne', '$2y$10$hcUDWx6O3YXrAlWJsbf6S.AJxiZ3cuNzhgkMei7yOzvxPYM4.wvk2', '2020-12-13 12:08:29', '1998-12-08 00:00:00'),
(2, 'Chandrima', '$2y$10$hcUDWx6O3YXrAlWJsbf6S.AJxiZ3cuNzhgkMei7yOzvxPYM4.wvk2', '2020-12-13 12:08:29', '1998-12-08 00:00:00');

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
-- Indexes for table `multimedialikedislike`
--
ALTER TABLE `multimedialikedislike`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `multimedialikedislike_index1`
--
ALTER TABLE `multimedialikedislike_index1`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `multimedialikedislike_index2`
--
ALTER TABLE `multimedialikedislike_index2`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `multimedialikedislike_queue1`
--
ALTER TABLE `multimedialikedislike_queue1`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `multimedialikedislike_queue2`
--
ALTER TABLE `multimedialikedislike_queue2`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `multimedia_contributionflag`
--
ALTER TABLE `multimedia_contributionflag`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `multimedia_contributionflag_index1`
--
ALTER TABLE `multimedia_contributionflag_index1`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `multimedia_contributionflag_index2`
--
ALTER TABLE `multimedia_contributionflag_index2`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `multimedia_contributionflag_queue1`
--
ALTER TABLE `multimedia_contributionflag_queue1`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `multimedia_contributionflag_queue2`
--
ALTER TABLE `multimedia_contributionflag_queue2`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `multimedia_contributions`
--
ALTER TABLE `multimedia_contributions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `multimedia_contributions_index1`
--
ALTER TABLE `multimedia_contributions_index1`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `multimedia_contributions_index2`
--
ALTER TABLE `multimedia_contributions_index2`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `multimedia_contributions_queue1`
--
ALTER TABLE `multimedia_contributions_queue1`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `multimedia_contributions_queue2`
--
ALTER TABLE `multimedia_contributions_queue2`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `multimedia_contributions_update1`
--
ALTER TABLE `multimedia_contributions_update1`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `multimedia_contributions_update2`
--
ALTER TABLE `multimedia_contributions_update2`
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
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `contributionflag_index1`
--
ALTER TABLE `contributionflag_index1`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `contributionflag_index2`
--
ALTER TABLE `contributionflag_index2`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `contributionflag_queue1`
--
ALTER TABLE `contributionflag_queue1`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `contributionflag_queue2`
--
ALTER TABLE `contributionflag_queue2`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `contributions`
--
ALTER TABLE `contributions`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `contributionslikedislike`
--
ALTER TABLE `contributionslikedislike`
  MODIFY `id` int(255) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

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
  MODIFY `id` int(255) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `contributions_index1`
--
ALTER TABLE `contributions_index1`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `contributions_index2`
--
ALTER TABLE `contributions_index2`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `contributions_queue1`
--
ALTER TABLE `contributions_queue1`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `contributions_queue2`
--
ALTER TABLE `contributions_queue2`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `contributions_update1`
--
ALTER TABLE `contributions_update1`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `contributions_update2`
--
ALTER TABLE `contributions_update2`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `cronjobstatus`
--
ALTER TABLE `cronjobstatus`
  MODIFY `pointer` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=80;

--
-- AUTO_INCREMENT for table `ip_view`
--
ALTER TABLE `ip_view`
  MODIFY `pointer` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `lists`
--
ALTER TABLE `lists`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `lists_index1`
--
ALTER TABLE `lists_index1`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `lists_index2`
--
ALTER TABLE `lists_index2`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT;

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
-- AUTO_INCREMENT for table `multimedialikedislike`
--
ALTER TABLE `multimedialikedislike`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `multimedialikedislike_index1`
--
ALTER TABLE `multimedialikedislike_index1`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `multimedialikedislike_index2`
--
ALTER TABLE `multimedialikedislike_index2`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `multimedialikedislike_queue1`
--
ALTER TABLE `multimedialikedislike_queue1`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `multimedialikedislike_queue2`
--
ALTER TABLE `multimedialikedislike_queue2`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `multimedia_contributionflag`
--
ALTER TABLE `multimedia_contributionflag`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `multimedia_contributionflag_index1`
--
ALTER TABLE `multimedia_contributionflag_index1`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `multimedia_contributionflag_index2`
--
ALTER TABLE `multimedia_contributionflag_index2`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `multimedia_contributionflag_queue1`
--
ALTER TABLE `multimedia_contributionflag_queue1`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `multimedia_contributionflag_queue2`
--
ALTER TABLE `multimedia_contributionflag_queue2`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `multimedia_contributions`
--
ALTER TABLE `multimedia_contributions`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `multimedia_contributions_index1`
--
ALTER TABLE `multimedia_contributions_index1`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `multimedia_contributions_index2`
--
ALTER TABLE `multimedia_contributions_index2`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `multimedia_contributions_queue1`
--
ALTER TABLE `multimedia_contributions_queue1`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `multimedia_contributions_queue2`
--
ALTER TABLE `multimedia_contributions_queue2`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `multimedia_contributions_update1`
--
ALTER TABLE `multimedia_contributions_update1`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `multimedia_contributions_update2`
--
ALTER TABLE `multimedia_contributions_update2`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

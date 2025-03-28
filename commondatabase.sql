-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost:8889
-- Généré le : dim. 16 mars 2025 à 17:28
-- Version du serveur : 8.0.40
-- Version de PHP : 8.3.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `commondatabase`
--

-- --------------------------------------------------------

--
-- Structure de la table `Comments`
--

CREATE TABLE `Comments` (
  `comment_id` int NOT NULL,
  `user_id` int NOT NULL,
  `post_id` int NOT NULL,
  `content` text NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `parent_comment_id` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `Comments`
--

INSERT INTO `Comments` (`comment_id`, `user_id`, `post_id`, `content`, `created_at`, `parent_comment_id`) VALUES
(8, 12, 94, 'jjj', '2025-03-15 17:31:47', NULL),
(9, 12, 96, 'kk', '2025-03-16 14:38:10', NULL),
(10, 12, 97, 'jhbihkj', '2025-03-16 14:51:52', NULL);

-- --------------------------------------------------------

--
-- Structure de la table `Follows`
--

CREATE TABLE `Follows` (
  `follower_id` int NOT NULL,
  `following_id` int NOT NULL,
  `followed_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `Follows`
--

INSERT INTO `Follows` (`follower_id`, `following_id`, `followed_at`) VALUES
(12, 13, '2025-03-16 16:54:54'),
(13, 12, '2025-03-16 15:08:15');

-- --------------------------------------------------------

--
-- Structure de la table `Hashtags`
--

CREATE TABLE `Hashtags` (
  `hashtag_id` int NOT NULL,
  `tag` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `Likes`
--

CREATE TABLE `Likes` (
  `user_id` int NOT NULL,
  `post_id` int NOT NULL,
  `liked_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `Likes`
--

INSERT INTO `Likes` (`user_id`, `post_id`, `liked_at`) VALUES
(12, 97, '2025-03-16 14:40:18');

-- --------------------------------------------------------

--
-- Structure de la table `Media`
--

CREATE TABLE `Media` (
  `media_id` int NOT NULL,
  `file_name` varchar(255) NOT NULL,
  `short_url` varchar(8) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `Media`
--

INSERT INTO `Media` (`media_id`, `file_name`, `short_url`) VALUES
(1, '1741618677_Zc0cmkDWrP.png', '9M2CokIM'),
(2, '1741619946_QqXPTI81e5.png', 'GtqDBHqv'),
(3, '1741621759_SnQyT6B1oX.png', '1nPKlmFm'),
(4, '1741622417_hzhp1uTwRX.png', 'Guiht47C'),
(5, '1741623537_2rxRnLRctH.png', 'kd1PsR3W'),
(6, '1741638948_BwnkdjIs5B.png', 'bHJS2ENQ'),
(7, '1741639157_O8ON8YHwJG.png', 'LIpvRmpu'),
(8, '1741639396_TXxCDkhvBf.png', '7jP1gQBG'),
(9, '1741639419_ZQ1GqwLpi9.png', '2vFhATwV'),
(10, '1741639419_oKSE0wfOF0.png', 'qGoh1FjJ'),
(11, '1741639419_lfCazdHSBd.png', 'git1QbTr'),
(12, '1741640023_zMWZWNPjCr.png', 'lYqVjxn7'),
(13, '1741640073_1tKdBz4zVJ.png', '0gslSgvs'),
(14, '1741640211_uEg0yPrHMN.jpg', 'CcJrooeZ'),
(15, '1741703584_ssTM42TJSf.png', 'sHhRFcvo'),
(16, '1741818715_6h3tytpRna.png', '5G8d3PBx'),
(17, '1741821780_sLGR9DgH5N.png', '2V7OKsor'),
(18, '1741865784_lZqkF6JdLm.png', 'l3BMWXyj'),
(19, '1742059894_COWV8xylhp.png', 'BdYo5Nw6'),
(20, '1742145471_qjxdtNXiyP.png', 'rVn3IdNv');

-- --------------------------------------------------------

--
-- Structure de la table `MessageMedia`
--

CREATE TABLE `MessageMedia` (
  `message_id` int DEFAULT NULL,
  `media_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `Messages`
--

CREATE TABLE `Messages` (
  `message_id` int NOT NULL,
  `sender_id` int NOT NULL,
  `receiver_id` int NOT NULL,
  `content` text NOT NULL,
  `sent_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `Messages`
--

INSERT INTO `Messages` (`message_id`, `sender_id`, `receiver_id`, `content`, `sent_at`) VALUES
(78, 12, 13, 'jjj', '2025-03-16 16:51:33'),
(79, 12, 13, 'aaa', '2025-03-16 16:52:10'),
(80, 12, 13, 'hello', '2025-03-16 16:55:00'),
(81, 12, 13, 'lll', '2025-03-16 16:55:48'),
(82, 13, 12, 'wesh', '2025-03-16 17:04:14');

-- --------------------------------------------------------

--
-- Structure de la table `migrations`
--

CREATE TABLE `migrations` (
  `id` int UNSIGNED NOT NULL,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2025_02_26_141850_create_personal_access_tokens_table', 1);

-- --------------------------------------------------------

--
-- Structure de la table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text COLLATE utf8mb4_unicode_ci,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `personal_access_tokens`
--

INSERT INTO `personal_access_tokens` (`id`, `tokenable_type`, `tokenable_id`, `name`, `token`, `abilities`, `last_used_at`, `expires_at`, `created_at`, `updated_at`) VALUES
(2, 'App\\Models\\User', 2, 'authToken', 'f181adfd25544bcba5b30d0a519ee3d8caab29bbc1a8745e18850158366973a7', '[\"*\"]', '2025-03-06 22:50:00', NULL, '2025-03-06 22:25:10', '2025-03-06 22:50:00'),
(3, 'App\\Models\\User', 1, 'authToken', '481e9204d285bbbd7a8c0f8767816d59ad697eaa9bfbbdc8aed2948368f32fe5', '[\"*\"]', '2025-03-07 09:43:44', NULL, '2025-03-07 08:47:58', '2025-03-07 09:43:44'),
(4, 'App\\Models\\User', 1, 'authToken', '8c90fc4a006b4b1f225dad59814906374b0c89f0b425d715d35c3e9b3eb79aec', '[\"*\"]', '2025-03-07 10:00:43', NULL, '2025-03-07 09:54:57', '2025-03-07 10:00:43'),
(5, 'App\\Models\\User', 1, 'authToken', '9a0145e75ae7983a061a4a20e767ff8b8b178bad38bb08bf9a250a963663991a', '[\"*\"]', '2025-03-07 10:03:03', NULL, '2025-03-07 10:02:56', '2025-03-07 10:03:03'),
(6, 'App\\Models\\User', 1, 'authToken', '2ad26fc5ca662390a4f953430c03172e22d12ceda0c82993bb09b92973c80db7', '[\"*\"]', '2025-03-07 11:03:43', NULL, '2025-03-07 10:03:50', '2025-03-07 11:03:43'),
(7, 'App\\Models\\User', 1, 'authToken', 'a99e7daa0df75f555f689d43be1f2602ad2fdef450c9e2ac12dd6c4d3b9e07fe', '[\"*\"]', '2025-03-07 11:25:39', NULL, '2025-03-07 11:05:26', '2025-03-07 11:25:39'),
(8, 'App\\Models\\User', 2, 'authToken', '58e5915e8c7cbf6996883d925069455fc19561657096859e34a5b84488ec42b7', '[\"*\"]', '2025-03-07 11:28:22', NULL, '2025-03-07 11:26:09', '2025-03-07 11:28:22'),
(9, 'App\\Models\\User', 3, 'authToken', 'bf85656265207e99ab2987c2c9a19a6857f6b56c1a79f975a42d573dc8d8c6bc', '[\"*\"]', '2025-03-07 11:51:37', NULL, '2025-03-07 11:37:13', '2025-03-07 11:51:37'),
(10, 'App\\Models\\User', 1, 'authToken', 'bdb59ea81ab4863c08ebf8c8f85ce0a30bd8e9a2b24046d4947b2bf0d225c081', '[\"*\"]', '2025-03-07 14:02:57', NULL, '2025-03-07 13:11:47', '2025-03-07 14:02:57'),
(11, 'App\\Models\\User', 1, 'authToken', '953f17182c15674e76da0f3347f59876f9cadb2de1bd6f50a6bea9f293ef7037', '[\"*\"]', '2025-03-07 15:40:12', NULL, '2025-03-07 15:11:55', '2025-03-07 15:40:12'),
(12, 'App\\Models\\User', 1, 'authToken', 'dd55dc804cdf65313837e32c9e4a5a1e9de2e7aa5ca64ea4c6ae5a8b7b16f302', '[\"*\"]', '2025-03-07 18:15:59', NULL, '2025-03-07 17:34:59', '2025-03-07 18:15:59'),
(13, 'App\\Models\\User', 1, 'authToken', 'c65f43dd19856fcd8f0ee84546cc3448301124e05a22ef8075a8e3b5e11b28a0', '[\"*\"]', '2025-03-08 13:06:16', NULL, '2025-03-08 12:45:09', '2025-03-08 13:06:16'),
(14, 'App\\Models\\User', 1, 'authToken', 'c561b38016dc1d4b569811fcc199f1009b746583e0a3e79ce2c1f22750fa8859', '[\"*\"]', '2025-03-08 13:32:23', NULL, '2025-03-08 13:06:33', '2025-03-08 13:32:23'),
(15, 'App\\Models\\User', 1, 'authToken', 'cbf1fcb3d21c5ad15cb3a247fd67aaa12ae6d8240fe637953fff1ed445341592', '[\"*\"]', '2025-03-09 10:52:28', NULL, '2025-03-09 10:37:26', '2025-03-09 10:52:28'),
(16, 'App\\Models\\User', 1, 'authToken', 'bb4b01b03ea81d0d9724aea97fbea1c21857d0caf03d21e60f13653a335ad8ba', '[\"*\"]', '2025-03-09 11:03:21', NULL, '2025-03-09 11:00:44', '2025-03-09 11:03:21'),
(17, 'App\\Models\\User', 1, 'authToken', '582da39b13649f72d5761d9729ab3dc1e7d172d6e4a831b9c6a7a512d03b5089', '[\"*\"]', '2025-03-09 14:44:28', NULL, '2025-03-09 14:31:44', '2025-03-09 14:44:28'),
(18, 'App\\Models\\User', 1, 'authToken', '14dff41e1cd1d3c79b4a63cf70f95e87bc9075d0785176120760c523a6ae4ae1', '[\"*\"]', '2025-03-09 15:41:53', NULL, '2025-03-09 14:44:44', '2025-03-09 15:41:53'),
(19, 'App\\Models\\User', 1, 'authToken', 'bda120bec449e46ad870ec281c9098acd8a6ed95f4d4c440b002008bcc1e4dfe', '[\"*\"]', '2025-03-09 17:07:54', NULL, '2025-03-09 16:28:14', '2025-03-09 17:07:54'),
(20, 'App\\Models\\User', 2, 'authToken', 'd9e186ecb205b7c0faed6a4cf14141fc4ca01c2f41cbc75ab79341a3af3b23f2', '[\"*\"]', '2025-03-09 17:50:18', NULL, '2025-03-09 17:08:12', '2025-03-09 17:50:18'),
(21, 'App\\Models\\User', 1, 'authToken', '3ed3d148c6c45a0659abbcde8e981114c271794364b28b8b7548de69cd3ebc3a', '[\"*\"]', '2025-03-09 21:09:59', NULL, '2025-03-09 20:25:09', '2025-03-09 21:09:59'),
(22, 'App\\Models\\User', 1, 'authToken', '0da8c0020a4be3f6fdf3f563f9b6e0a62f94f71c0f4d4f3a7861912ea11cc4d2', '[\"*\"]', '2025-03-10 09:04:30', NULL, '2025-03-10 08:33:15', '2025-03-10 09:04:30'),
(23, 'App\\Models\\User', 2, 'authToken', 'e967db915c9c0c8c2e7ae97b3ac3fbae27ff64d99b33307e316049c56054b66e', '[\"*\"]', '2025-03-10 09:12:45', NULL, '2025-03-10 09:05:03', '2025-03-10 09:12:45'),
(24, 'App\\Models\\User', 1, 'authToken', 'f90eaf1ca4bcdbacc02750d94275a4b89bf9b5d2a7898ef6e0c90028e6c93726', '[\"*\"]', '2025-03-10 09:56:22', NULL, '2025-03-10 09:12:48', '2025-03-10 09:56:22'),
(25, 'App\\Models\\User', 2, 'authToken', '40a3fc2563206102acdfea2d7b98701bc0d1aa8bcbd20a6b005a15f734f40c0d', '[\"*\"]', '2025-03-10 10:14:24', NULL, '2025-03-10 09:14:28', '2025-03-10 10:14:24'),
(26, 'App\\Models\\User', 1, 'authToken', '621f39feba795ba025e350ef0c95a26742fd98375fa281448b90c55a2885d1aa', '[\"*\"]', '2025-03-10 10:56:39', NULL, '2025-03-10 09:56:57', '2025-03-10 10:56:39'),
(27, 'App\\Models\\User', 4, 'authToken', '017236ff74637c258a3f80036e35c24783255d073653537ae89a1ab744b8ed00', '[\"*\"]', '2025-03-10 11:06:07', NULL, '2025-03-10 10:24:15', '2025-03-10 11:06:07'),
(28, 'App\\Models\\User', 1, 'authToken', '6fdff4b8501b3108885ce33e9459395ec5f9b2e6283ae0fd9a93da5f5206a2cf', '[\"*\"]', '2025-03-10 11:40:53', NULL, '2025-03-10 11:24:36', '2025-03-10 11:40:53'),
(29, 'App\\Models\\User', 1, 'authToken', 'a1981ef16e4ec8402416a8882777a426f390ba58cb6078735cd99711706ae4d0', '[\"*\"]', '2025-03-10 13:01:14', NULL, '2025-03-10 12:34:08', '2025-03-10 13:01:14'),
(30, 'App\\Models\\User', 4, 'authToken', 'b5a9b8b5f1701b60906cfdb6244349eed34ef1b48d449c96db2a4a58eeb204e3', '[\"*\"]', '2025-03-10 13:50:49', NULL, '2025-03-10 13:01:30', '2025-03-10 13:50:49'),
(31, 'App\\Models\\User', 1, 'authToken', '46483ec7fb046928f516817091cf6a7d74322c4f61ccdc223591b11de371325d', '[\"*\"]', '2025-03-10 14:49:23', NULL, '2025-03-10 13:51:26', '2025-03-10 14:49:23'),
(32, 'App\\Models\\User', 1, 'authToken', '515506738dce6ee6b5da326b069650723acea58da70e7bd91a75ee8e9c0810d2', '[\"*\"]', '2025-03-10 15:42:47', NULL, '2025-03-10 14:52:05', '2025-03-10 15:42:47'),
(33, 'App\\Models\\User', 1, 'authToken', '61b3a33877114f873e6f5241f08198c5e12a10d0635b3f643da0380c6041f3ec', '[\"*\"]', '2025-03-10 15:43:13', NULL, '2025-03-10 15:43:06', '2025-03-10 15:43:13'),
(34, 'App\\Models\\User', 1, 'authToken', '8d3eda458af263a260845f038872b6d2ac0a7353584546a6ea1e6c18c829e544', '[\"*\"]', '2025-03-10 19:55:35', NULL, '2025-03-10 19:34:39', '2025-03-10 19:55:35'),
(35, 'App\\Models\\User', 4, 'authToken', 'b538e3d4edac3a62d0302df6686edf70d6a0627b3d46a8a8fcd283f2a0c4af62', '[\"*\"]', '2025-03-10 19:56:54', NULL, '2025-03-10 19:55:58', '2025-03-10 19:56:54'),
(36, 'App\\Models\\User', 1, 'authToken', '67028513f8603d5120d36f32d77c526d4b0de108e6b5b1d1620c0dc21a9bb5ae', '[\"*\"]', '2025-03-11 13:33:55', NULL, '2025-03-11 13:31:45', '2025-03-11 13:33:55'),
(37, 'App\\Models\\User', 1, 'authToken', 'fec4b85667ce00410b042550e2daa27983bcde10ceb6ba906f5ac6d862d00ad3', '[\"*\"]', '2025-03-11 13:58:23', NULL, '2025-03-11 13:36:30', '2025-03-11 13:58:23'),
(38, 'App\\Models\\User', 1, 'authToken', 'd949c09fe0f0f021a2383d3c4fa8d2f71a093e8766e8cf4ae32ee61ca94bd8c4', '[\"*\"]', '2025-03-11 14:44:33', NULL, '2025-03-11 14:44:27', '2025-03-11 14:44:33'),
(39, 'App\\Models\\User', 1, 'authToken', '4963ebb6fda778eed7d692bd100e81dff7493921f5927e8387ea70d426a1ec9e', '[\"*\"]', '2025-03-12 09:02:41', NULL, '2025-03-12 08:23:19', '2025-03-12 09:02:41'),
(40, 'App\\Models\\User', 1, 'authToken', '868e1e2c0ea8fe85ff3267cd6afe76b583c9aeeb653e5049fc60ece3fbda61f6', '[\"*\"]', '2025-03-12 10:12:17', NULL, '2025-03-12 09:25:58', '2025-03-12 10:12:17'),
(41, 'App\\Models\\User', 1, 'authToken', '616f7d112b1e6d4fa8df34f9c87ac36de9a835877130230e004113f38970abba', '[\"*\"]', '2025-03-12 10:37:06', NULL, '2025-03-12 10:12:33', '2025-03-12 10:37:06'),
(42, 'App\\Models\\User', 1, 'authToken', '26ce1ee84e7d5ad3d6f73ec77f6d473bebdf583e3eaee45fe4645709cd7da721', '[\"*\"]', '2025-03-12 10:38:40', NULL, '2025-03-12 10:37:26', '2025-03-12 10:38:40'),
(43, 'App\\Models\\User', 1, 'authToken', 'd02ecbd81596dd6fa8a53949a560af8c5cff20f299dc7cc3d14b424efa5e17ec', '[\"*\"]', '2025-03-12 10:39:14', NULL, '2025-03-12 10:39:07', '2025-03-12 10:39:14'),
(44, 'App\\Models\\User', 1, 'authToken', '62b7f3a6567fd057be34544ab315e25420240c3aa0973309f2c26a5089f0dcf8', '[\"*\"]', '2025-03-12 11:38:59', NULL, '2025-03-12 10:39:38', '2025-03-12 11:38:59'),
(45, 'App\\Models\\User', 1, 'authToken', '8e0bd8763b1474423587fa6161b4b58a11dead7632a1a9d893527233d4aff631', '[\"*\"]', '2025-03-12 12:17:10', NULL, '2025-03-12 11:42:50', '2025-03-12 12:17:10'),
(46, 'App\\Models\\User', 1, 'authToken', '72e8727d5d69c8fc87ed60a5d5a68f7fc8e5d833590938bc7ebfc9f44fdca0da', '[\"*\"]', '2025-03-12 13:46:04', NULL, '2025-03-12 12:50:59', '2025-03-12 13:46:04'),
(47, 'App\\Models\\User', 1, 'authToken', '8fe200202f1750de713e871deae5097f0a5c79cee77e5b0f6bc9a153d6e3a44a', '[\"*\"]', '2025-03-12 14:05:41', NULL, '2025-03-12 13:53:36', '2025-03-12 14:05:41'),
(48, 'App\\Models\\User', 1, 'authToken', 'dbf6a47d9b8153b7785ed41a0b1d5c6afb48510239c740b6ac727b07ca5ac5f2', '[\"*\"]', '2025-03-12 15:05:22', NULL, '2025-03-12 14:06:48', '2025-03-12 15:05:22'),
(49, 'App\\Models\\User', 1, 'authToken', 'fe3641f7ce99aac687c18160dcfb12d0dc19f8a688962862ba29e229264ff1df', '[\"*\"]', '2025-03-12 15:18:56', NULL, '2025-03-12 15:17:18', '2025-03-12 15:18:56'),
(50, 'App\\Models\\User', 1, 'authToken', 'bf06f799fbd9c323e5a7bcc04bf2bb88e85cacc6451bf3effb3a96be11d80e21', '[\"*\"]', '2025-03-12 22:02:55', NULL, '2025-03-12 21:24:02', '2025-03-12 22:02:55'),
(51, 'App\\Models\\User', 2, 'authToken', '464f4168599f86c525d5287a5b5b08d14e6752b8147d5d290870b53281f1670a', '[\"*\"]', '2025-03-12 22:23:37', NULL, '2025-03-12 22:03:19', '2025-03-12 22:23:37'),
(52, 'App\\Models\\User', 1, 'authToken', 'aa2fad51ee1114a597d9c9dded387ef4f27077be6d1e3c08d24076f1aaff8f13', '[\"*\"]', '2025-03-12 22:29:06', NULL, '2025-03-12 22:23:57', '2025-03-12 22:29:06'),
(53, 'App\\Models\\User', 2, 'authToken', '4ff4075676eb9ef079f82770703c211377ddcc9f7a4d9d278ecf00337a7843c9', '[\"*\"]', '2025-03-12 23:24:28', NULL, '2025-03-12 22:29:33', '2025-03-12 23:24:28'),
(54, 'App\\Models\\User', 1, 'authToken', '7e1d3815ab932b369211ddb18ce272d7b3f2c29726d9b22b4bfd5d7ebd2c24ae', '[\"*\"]', '2025-03-13 00:07:54', NULL, '2025-03-12 23:34:20', '2025-03-13 00:07:54'),
(55, 'App\\Models\\User', 1, 'authToken', '82e34229dce31c9cf172308f25f574d4ac9d9e4a53acc5dd13789dfffc7b766f', '[\"*\"]', '2025-03-13 08:13:46', NULL, '2025-03-13 08:08:25', '2025-03-13 08:13:46'),
(56, 'App\\Models\\User', 1, 'authToken', '34d88bf5c6bf4dff1895def1f08fcc19f38bdadde6db765dbf09029ba56f6386', '[\"*\"]', '2025-03-13 08:49:31', NULL, '2025-03-13 08:26:45', '2025-03-13 08:49:31'),
(57, 'App\\Models\\User', 2, 'authToken', '85f82045618d823fd4ddb9df39738de8ffc57d69fb16f5764b5e041bd08dcda8', '[\"*\"]', '2025-03-13 09:28:09', NULL, '2025-03-13 08:28:47', '2025-03-13 09:28:09'),
(58, 'App\\Models\\User', 1, 'authToken', '85b7ccf1cf046b2ec174a2095992d4f868e46fde5e5fa510599952d6e608eca7', '[\"*\"]', '2025-03-13 09:50:37', NULL, '2025-03-13 08:55:44', '2025-03-13 09:50:37'),
(59, 'App\\Models\\User', 1, 'authToken', 'a86330baa435fa4d430a24b37dc56666757ea97225f68c34a14602bf4cd0a38e', '[\"*\"]', '2025-03-13 10:50:15', NULL, '2025-03-13 09:58:46', '2025-03-13 10:50:15'),
(60, 'App\\Models\\User', 1, 'authToken', '6c0490f0d4a9a184e492781531b6129f60d4c21d1f2e2178a0e1606fb1716e4f', '[\"*\"]', '2025-03-13 11:48:59', NULL, '2025-03-13 11:23:10', '2025-03-13 11:48:59'),
(61, 'App\\Models\\User', 1, 'authToken', '3f2302da520a37d80a844e37827785bd89449dcc0b76767ec625e372f4d007ca', '[\"*\"]', '2025-03-13 14:47:51', NULL, '2025-03-13 13:59:55', '2025-03-13 14:47:51'),
(62, 'App\\Models\\User', 1, 'authToken', '03d4ffdc0e076932985827a1512a8396f105a8cc67a9efa4c6ff3ae5b9fbe37e', '[\"*\"]', '2025-03-13 21:46:18', NULL, '2025-03-13 20:47:47', '2025-03-13 21:46:18'),
(63, 'App\\Models\\User', 1, 'authToken', '724a160f0cf698c63d48c8e915ee5ea6d4917a1038f320af152d1888bfe67dbf', '[\"*\"]', '2025-03-13 22:50:44', NULL, '2025-03-13 21:50:45', '2025-03-13 22:50:44'),
(64, 'App\\Models\\User', 1, 'authToken', '2cedc6d2c951e19ca43884c7f924e87455cf456f3b8f29dc0efd815f8d2a095e', '[\"*\"]', '2025-03-13 23:41:12', NULL, '2025-03-13 22:51:00', '2025-03-13 23:41:12'),
(65, 'App\\Models\\User', 1, 'authToken', 'db22aa52fe246e2a06fd6d4ce85da4c3b1cdfdbc8181477fa94a4bbc8016f165', '[\"*\"]', '2025-03-14 00:16:23', NULL, '2025-03-13 23:41:35', '2025-03-14 00:16:23'),
(66, 'App\\Models\\User', 1, 'authToken', 'e770c85aa811b0d56523c3f7fed264d3f9c80e02fd4ba751063291527497d1a8', '[\"*\"]', '2025-03-14 10:26:28', NULL, '2025-03-14 10:05:52', '2025-03-14 10:26:28'),
(67, 'App\\Models\\User', 1, 'authToken', '95f8fb6c45b10189378f46b70adf7e6842c133de3f1abc8fff7c35715ce73d1d', '[\"*\"]', '2025-03-14 11:10:59', NULL, '2025-03-14 11:10:11', '2025-03-14 11:10:59'),
(68, 'App\\Models\\User', 1, 'authToken', 'e689511fcd7e468d13efe7fe0087a3093e49fa3f2c365f7fd64eb7d51469b365', '[\"*\"]', '2025-03-14 11:13:09', NULL, '2025-03-14 11:11:26', '2025-03-14 11:13:09'),
(69, 'App\\Models\\User', 1, 'authToken', '5fee740003e5a05d41a3fe6efb9b2e23603604ffb62e86b78f99252f7bc448c0', '[\"*\"]', '2025-03-14 11:31:01', NULL, '2025-03-14 11:13:26', '2025-03-14 11:31:01'),
(70, 'App\\Models\\User', 1, 'authToken', '03eed12016ac8f0ed8a151fc9a012524c8c3941943796981992702173ef68df2', '[\"*\"]', '2025-03-14 11:32:08', NULL, '2025-03-14 11:31:53', '2025-03-14 11:32:08'),
(71, 'App\\Models\\User', 6, 'authToken', 'a371cc73c4f21ac837cc1b325d9f04d1bc580ade5fb00c3cad8d5c0a88893e18', '[\"*\"]', '2025-03-14 12:33:19', NULL, '2025-03-14 11:34:06', '2025-03-14 12:33:19'),
(72, 'App\\Models\\User', 1, 'authToken', '663216fe2df4b927c79be71ec5a98077faf1eeb6b7a504f3c6b433be93786bbe', '[\"*\"]', '2025-03-14 13:27:12', NULL, '2025-03-14 12:40:27', '2025-03-14 13:27:12'),
(73, 'App\\Models\\User', 7, 'authToken', '7552e4d7a08170f5069cb207d2f9a45d584b90915da3e1b3868a012fa69c79d8', '[\"*\"]', '2025-03-14 14:54:59', NULL, '2025-03-14 14:37:31', '2025-03-14 14:54:59'),
(74, 'App\\Models\\User', 12, 'authToken', '64d16f99db08aa26c1c68125de9c746415b28177eb97847ca832e83571be8bc0', '[\"*\"]', '2025-03-14 17:02:41', NULL, '2025-03-14 16:04:01', '2025-03-14 17:02:41'),
(75, 'App\\Models\\User', 12, 'authToken', 'ad762a07d43fe8ba2edae9ffc1c86c7fc6bbb42991d33671cc5b96db7a836bb6', '[\"*\"]', '2025-03-15 16:20:52', NULL, '2025-03-15 16:06:35', '2025-03-15 16:20:52'),
(76, 'App\\Models\\User', 12, 'authToken', '5d7b895b0ccfcb8fa742c600a6585e2adaded27d33b7889827469ea634805eb5', '[\"*\"]', '2025-03-15 16:32:35', NULL, '2025-03-15 16:29:36', '2025-03-15 16:32:35'),
(77, 'App\\Models\\User', 12, 'authToken', '1f222e7fa94e2f3a05e95e394790167cada1ddb2bd1b3673326e2b53f1540479', '[\"*\"]', '2025-03-16 11:16:52', NULL, '2025-03-16 11:12:06', '2025-03-16 11:16:52'),
(78, 'App\\Models\\User', 12, 'authToken', 'eaa31d4a422f38905170e6df38fc878ae645eb8563060771873a15e24cc71692', '[\"*\"]', '2025-03-16 13:47:13', NULL, '2025-03-16 13:37:30', '2025-03-16 13:47:13'),
(79, 'App\\Models\\User', 12, 'authToken', 'ce5bb0210dbb7d68467eeb067ba8e6ea5b8ce1ffa106789f63f5bd0e65827711', '[\"*\"]', '2025-03-16 14:04:49', NULL, '2025-03-16 13:47:48', '2025-03-16 14:04:49'),
(80, 'App\\Models\\User', 13, 'authToken', '312098a2fa04b4c1392ecdea4f1fb2e80a1cf471aa6dc5b684b9115cf33ce178', '[\"*\"]', '2025-03-16 15:07:00', NULL, '2025-03-16 14:07:01', '2025-03-16 15:07:00'),
(81, 'App\\Models\\User', 12, 'authToken', '32c04bf68f2311abf57f8cd2f41051346f90512aef6ad19c41002bcde46ebc15', '[\"*\"]', '2025-03-16 14:12:15', NULL, '2025-03-16 14:08:41', '2025-03-16 14:12:15'),
(82, 'App\\Models\\User', 12, 'authToken', 'b03cb7be8dc84ab4b2b7f885f5542a543da298c102173cc5f73682b0ac497685', '[\"*\"]', '2025-03-16 14:14:00', NULL, '2025-03-16 14:13:10', '2025-03-16 14:14:00'),
(83, 'App\\Models\\User', 12, 'authToken', 'bce0ef32e40a5e8b0e3ab7b292eca23db947b4db4343804f54c47b4c00107715', '[\"*\"]', '2025-03-16 14:16:30', NULL, '2025-03-16 14:16:07', '2025-03-16 14:16:30'),
(84, 'App\\Models\\User', 13, 'authToken', 'caad555306677d8ba1fd836f872d6ea857d30d3969392be9fbc81cf9c5874b9f', '[\"*\"]', '2025-03-16 15:16:42', NULL, '2025-03-16 14:16:50', '2025-03-16 15:16:42'),
(85, 'App\\Models\\User', 12, 'authToken', '977713a64f81472c27ecc398ecfc61c94f3081a3a0a44e8a4749154f9ad22a02', '[\"*\"]', '2025-03-16 15:50:31', NULL, '2025-03-16 15:07:39', '2025-03-16 15:50:31'),
(86, 'App\\Models\\User', 13, 'authToken', 'ede8b5ffa4d814cac5f08d90d3d44cc914e8eb483029058f03cae608f2468c26', '[\"*\"]', '2025-03-16 15:53:12', NULL, '2025-03-16 15:24:11', '2025-03-16 15:53:12'),
(87, 'App\\Models\\User', 12, 'authToken', '7b0483b4e0264e5f7b1cc73c4e3a3bae8fb51cee0fa5794b8dce5d672f3c805b', '[\"*\"]', '2025-03-16 15:52:46', NULL, '2025-03-16 15:51:15', '2025-03-16 15:52:46'),
(88, 'App\\Models\\User', 12, 'authToken', '04f633cdaa53666a25666cf04ad305ea09f21a590bb786ca0b80671e498adf7d', '[\"*\"]', '2025-03-16 15:57:31', NULL, '2025-03-16 15:54:00', '2025-03-16 15:57:31'),
(89, 'App\\Models\\User', 12, 'authToken', 'bd35652e33a5eb3f460df676de279e5ea475b4c87d0916a6ffde61c9800a567f', '[\"*\"]', '2025-03-16 15:58:57', NULL, '2025-03-16 15:57:54', '2025-03-16 15:58:57'),
(90, 'App\\Models\\User', 12, 'authToken', 'b65079dfee1182a593915b8873ce57e9a03a7a999ce5b16653b19cb8faafa6b9', '[\"*\"]', '2025-03-16 16:01:06', NULL, '2025-03-16 15:59:13', '2025-03-16 16:01:06'),
(91, 'App\\Models\\User', 12, 'authToken', '1bcee38e5d24c14991c38022df7862d42dbcd4708f81a9a3e6236f995ecb9ae2', '[\"*\"]', '2025-03-16 16:02:33', NULL, '2025-03-16 16:01:36', '2025-03-16 16:02:33'),
(92, 'App\\Models\\User', 12, 'authToken', '824f2de74aec4acaba16a15ec62331e183c2de58dc1863920bba012aa9f7dd67', '[\"*\"]', '2025-03-16 16:19:18', NULL, '2025-03-16 16:02:48', '2025-03-16 16:19:18'),
(93, 'App\\Models\\User', 13, 'authToken', '485c64dc31b641fe3c070550d0e07d5eb8aed7ff4fceda529cb7f6349c940688', '[\"*\"]', '2025-03-16 16:28:28', NULL, '2025-03-16 16:03:34', '2025-03-16 16:28:28'),
(94, 'App\\Models\\User', 12, 'authToken', '6756d13369d1f66a9d89702ae0ac3677125b5a715fc50b30bf5ef2c0ed9db9ae', '[\"*\"]', '2025-03-16 16:28:32', NULL, '2025-03-16 16:20:18', '2025-03-16 16:28:32');

-- --------------------------------------------------------

--
-- Structure de la table `PostHashtag`
--

CREATE TABLE `PostHashtag` (
  `post_id` int NOT NULL,
  `hashtag_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `PostMedia`
--

CREATE TABLE `PostMedia` (
  `post_id` int DEFAULT NULL,
  `media_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `PostMedia`
--

INSERT INTO `PostMedia` (`post_id`, `media_id`) VALUES
(NULL, 1),
(NULL, 2),
(NULL, 3),
(NULL, 4),
(NULL, 5),
(NULL, 6),
(NULL, 7),
(NULL, 8),
(NULL, 9),
(NULL, 10),
(NULL, 11),
(NULL, 12),
(NULL, 13),
(NULL, 14),
(NULL, 15),
(NULL, 16),
(NULL, 17),
(NULL, 18),
(94, 19),
(99, 20);

-- --------------------------------------------------------

--
-- Structure de la table `Posts`
--

CREATE TABLE `Posts` (
  `post_id` int NOT NULL,
  `user_id` int NOT NULL,
  `content` varchar(140) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `reply_to` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `Posts`
--

INSERT INTO `Posts` (`post_id`, `user_id`, `content`, `created_at`, `reply_to`) VALUES
(91, 12, 'he', '2025-03-15 17:13:08', NULL),
(92, 12, 'jjj', '2025-03-15 17:20:48', NULL),
(93, 12, 'jjj', '2025-03-15 17:31:19', NULL),
(94, 12, 'nnnn😃', '2025-03-15 17:31:34', NULL),
(95, 12, '#jj', '2025-03-16 12:12:12', NULL),
(96, 12, '#hh', '2025-03-16 12:13:15', NULL),
(97, 12, '#kk', '2025-03-16 14:39:51', NULL),
(98, 12, '#jjj', '2025-03-16 17:17:34', NULL),
(99, 12, '#n', '2025-03-16 17:17:51', NULL),
(100, 12, '@junior{13}', '2025-03-16 17:20:27', NULL);

-- --------------------------------------------------------

--
-- Structure de la table `Reposts`
--

CREATE TABLE `Reposts` (
  `post_id` int NOT NULL,
  `user_id` int NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `Reposts`
--

INSERT INTO `Reposts` (`post_id`, `user_id`, `created_at`) VALUES
(94, 12, '2025-03-15 17:31:40'),
(95, 12, '2025-03-16 14:39:58'),
(97, 12, '2025-03-16 14:40:11');

-- --------------------------------------------------------

--
-- Structure de la table `SavedPosts`
--

CREATE TABLE `SavedPosts` (
  `user_id` int NOT NULL,
  `post_id` int NOT NULL,
  `saved_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `SavedPosts`
--

INSERT INTO `SavedPosts` (`user_id`, `post_id`, `saved_at`) VALUES
(12, 97, '2025-03-16 14:40:41'),
(13, 97, '2025-03-16 15:17:02');

-- --------------------------------------------------------

--
-- Structure de la table `Themes`
--

CREATE TABLE `Themes` (
  `theme_id` int NOT NULL,
  `theme_name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `Themes`
--

INSERT INTO `Themes` (`theme_id`, `theme_name`) VALUES
(9, 'Actualités & Politique'),
(4, 'Art & Culture'),
(14, 'Bien-être & Santé'),
(12, 'Business & Finance'),
(7, 'Cinéma & Séries'),
(10, 'Cuisine & Gastronomie'),
(3, 'Gaming'),
(8, 'Livres & Littérature'),
(13, 'Mode & Lifestyle'),
(1, 'Musique'),
(11, 'Science & Espace'),
(2, 'Sport'),
(6, 'Technologie'),
(5, 'Travel');

-- --------------------------------------------------------

--
-- Structure de la table `Users`
--

CREATE TABLE `Users` (
  `id` int NOT NULL,
  `username` varchar(50) NOT NULL,
  `display_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `password_hash` char(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `email` varchar(100) NOT NULL,
  `bio` text,
  `date_of_birth` date DEFAULT NULL,
  `theme_id` int DEFAULT '1',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `profile_picture` varchar(255) DEFAULT NULL,
  `cover_photo` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `Users`
--

INSERT INTO `Users` (`id`, `username`, `display_name`, `password_hash`, `email`, `bio`, `date_of_birth`, `theme_id`, `created_at`, `updated_at`, `profile_picture`, `cover_photo`) VALUES
(12, 'rigel', '@yesrigel', 'a56dc3898fdd9fbe435517eba2b9d3cb73b7801b', 'rigelcodjia@gmail.com', 'bbbbb', NULL, 8, '2025-03-14 15:40:30', '2025-03-16 13:48:02', 'http://127.0.0.1:8000/storage/profile_pictures/profile__1741971878.png', 'http://127.0.0.1:8000/storage/cover_photos/cover__1741971878.png'),
(13, 'junior', '@junior', 'a56dc3898fdd9fbe435517eba2b9d3cb73b7801b', 'juniorduval369@gmail.com', 'ccc', NULL, 11, '2025-03-16 14:06:36', '2025-03-16 14:07:58', 'http://127.0.0.1:8000/storage/profile_pictures/profile_13_1742137678.png', 'http://127.0.0.1:8000/storage/cover_photos/cover_13_1742137678.png'),
(17, 'nn', 'nn', 'a56dc3898fdd9fbe435517eba2b9d3cb73b7801b', 'nn@gmail.com', NULL, NULL, 1, '2025-03-16 14:15:39', '2025-03-16 14:15:39', NULL, NULL);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `Comments`
--
ALTER TABLE `Comments`
  ADD PRIMARY KEY (`comment_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `post_id` (`post_id`),
  ADD KEY `parent_comment_id` (`parent_comment_id`);

--
-- Index pour la table `Follows`
--
ALTER TABLE `Follows`
  ADD PRIMARY KEY (`follower_id`,`following_id`),
  ADD KEY `following_id` (`following_id`);

--
-- Index pour la table `Hashtags`
--
ALTER TABLE `Hashtags`
  ADD PRIMARY KEY (`hashtag_id`),
  ADD UNIQUE KEY `tag` (`tag`);

--
-- Index pour la table `Likes`
--
ALTER TABLE `Likes`
  ADD PRIMARY KEY (`user_id`,`post_id`),
  ADD KEY `post_id` (`post_id`);

--
-- Index pour la table `Media`
--
ALTER TABLE `Media`
  ADD PRIMARY KEY (`media_id`),
  ADD UNIQUE KEY `file_name` (`file_name`),
  ADD UNIQUE KEY `short_url` (`short_url`);

--
-- Index pour la table `MessageMedia`
--
ALTER TABLE `MessageMedia`
  ADD KEY `message_id` (`message_id`),
  ADD KEY `media_id` (`media_id`);

--
-- Index pour la table `Messages`
--
ALTER TABLE `Messages`
  ADD PRIMARY KEY (`message_id`),
  ADD KEY `sender_id` (`sender_id`),
  ADD KEY `receiver_id` (`receiver_id`);

--
-- Index pour la table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Index pour la table `PostHashtag`
--
ALTER TABLE `PostHashtag`
  ADD PRIMARY KEY (`post_id`,`hashtag_id`),
  ADD KEY `hashtag_id` (`hashtag_id`);

--
-- Index pour la table `PostMedia`
--
ALTER TABLE `PostMedia`
  ADD KEY `post_id` (`post_id`),
  ADD KEY `media_id` (`media_id`);

--
-- Index pour la table `Posts`
--
ALTER TABLE `Posts`
  ADD PRIMARY KEY (`post_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `reply_to` (`reply_to`);

--
-- Index pour la table `Reposts`
--
ALTER TABLE `Reposts`
  ADD PRIMARY KEY (`post_id`,`user_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Index pour la table `SavedPosts`
--
ALTER TABLE `SavedPosts`
  ADD PRIMARY KEY (`user_id`,`post_id`),
  ADD KEY `post_id` (`post_id`);

--
-- Index pour la table `Themes`
--
ALTER TABLE `Themes`
  ADD PRIMARY KEY (`theme_id`),
  ADD UNIQUE KEY `theme_name` (`theme_name`);

--
-- Index pour la table `Users`
--
ALTER TABLE `Users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `theme_id` (`theme_id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `Comments`
--
ALTER TABLE `Comments`
  MODIFY `comment_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT pour la table `Hashtags`
--
ALTER TABLE `Hashtags`
  MODIFY `hashtag_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `Media`
--
ALTER TABLE `Media`
  MODIFY `media_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT pour la table `Messages`
--
ALTER TABLE `Messages`
  MODIFY `message_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=83;

--
-- AUTO_INCREMENT pour la table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=95;

--
-- AUTO_INCREMENT pour la table `Posts`
--
ALTER TABLE `Posts`
  MODIFY `post_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=101;

--
-- AUTO_INCREMENT pour la table `Themes`
--
ALTER TABLE `Themes`
  MODIFY `theme_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT pour la table `Users`
--
ALTER TABLE `Users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `Comments`
--
ALTER TABLE `Comments`
  ADD CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `Users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`post_id`) REFERENCES `Posts` (`post_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `comments_ibfk_3` FOREIGN KEY (`parent_comment_id`) REFERENCES `Comments` (`comment_id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `Follows`
--
ALTER TABLE `Follows`
  ADD CONSTRAINT `follows_ibfk_1` FOREIGN KEY (`follower_id`) REFERENCES `Users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `follows_ibfk_2` FOREIGN KEY (`following_id`) REFERENCES `Users` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `Likes`
--
ALTER TABLE `Likes`
  ADD CONSTRAINT `likes_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `Users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `likes_ibfk_2` FOREIGN KEY (`post_id`) REFERENCES `Posts` (`post_id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `MessageMedia`
--
ALTER TABLE `MessageMedia`
  ADD CONSTRAINT `messagemedia_ibfk_1` FOREIGN KEY (`message_id`) REFERENCES `Messages` (`message_id`) ON DELETE SET NULL,
  ADD CONSTRAINT `messagemedia_ibfk_2` FOREIGN KEY (`media_id`) REFERENCES `Media` (`media_id`);

--
-- Contraintes pour la table `Messages`
--
ALTER TABLE `Messages`
  ADD CONSTRAINT `messages_ibfk_1` FOREIGN KEY (`sender_id`) REFERENCES `Users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `messages_ibfk_2` FOREIGN KEY (`receiver_id`) REFERENCES `Users` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `PostHashtag`
--
ALTER TABLE `PostHashtag`
  ADD CONSTRAINT `posthashtag_ibfk_1` FOREIGN KEY (`post_id`) REFERENCES `Posts` (`post_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `posthashtag_ibfk_2` FOREIGN KEY (`hashtag_id`) REFERENCES `Hashtags` (`hashtag_id`);

--
-- Contraintes pour la table `PostMedia`
--
ALTER TABLE `PostMedia`
  ADD CONSTRAINT `postmedia_ibfk_1` FOREIGN KEY (`post_id`) REFERENCES `Posts` (`post_id`) ON DELETE SET NULL,
  ADD CONSTRAINT `postmedia_ibfk_2` FOREIGN KEY (`media_id`) REFERENCES `Media` (`media_id`);

--
-- Contraintes pour la table `Posts`
--
ALTER TABLE `Posts`
  ADD CONSTRAINT `posts_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `Users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `posts_ibfk_2` FOREIGN KEY (`reply_to`) REFERENCES `Posts` (`post_id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `Reposts`
--
ALTER TABLE `Reposts`
  ADD CONSTRAINT `reposts_ibfk_1` FOREIGN KEY (`post_id`) REFERENCES `Posts` (`post_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `reposts_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `Users` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `SavedPosts`
--
ALTER TABLE `SavedPosts`
  ADD CONSTRAINT `savedposts_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `Users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `savedposts_ibfk_2` FOREIGN KEY (`post_id`) REFERENCES `Posts` (`post_id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `Users`
--
ALTER TABLE `Users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`theme_id`) REFERENCES `Themes` (`theme_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

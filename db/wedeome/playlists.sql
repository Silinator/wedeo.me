-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: db
-- Erstellungszeit: 15. Mai 2021 um 01:53
-- Server-Version: 8.0.23
-- PHP-Version: 7.4.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Datenbank: `wedeome`
--

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `playlists`
--

CREATE TABLE `playlists` (
  `upid` varchar(12) NOT NULL,
  `title` tinytext NOT NULL,
  `uuid` varchar(12) NOT NULL,
  `thumb` varchar(12) DEFAULT NULL COMMENT 'NULL = AUTO',
  `info` text NOT NULL,
  `views` bigint NOT NULL,
  `orderBy` int NOT NULL,
  `privacy` int NOT NULL,
  `lastChange` bigint NOT NULL,
  `time` bigint NOT NULL,
  `status` tinytext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Daten für Tabelle `playlists`
--

INSERT INTO `playlists` (`upid`, `title`, `uuid`, `thumb`, `info`, `views`, `orderBy`, `privacy`, `lastChange`, `time`, `status`) VALUES
('H3yS4FJ6691c', 'wedeo.me test', '7Sr37urK0A3f', NULL, 'test info', 0, 0, 2, 1616716108, 1616642134, 'public');

--
-- Indizes der exportierten Tabellen
--

--
-- Indizes für die Tabelle `playlists`
--
ALTER TABLE `playlists`
  ADD PRIMARY KEY (`upid`),
  ADD UNIQUE KEY `upid` (`upid`),
  ADD KEY `uuid` (`uuid`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

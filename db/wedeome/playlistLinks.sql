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
-- Tabellenstruktur für Tabelle `playlistLinks`
--

CREATE TABLE `playlistLinks` (
  `upid` varchar(12) NOT NULL,
  `uvid` varchar(12) NOT NULL,
  `position` smallint NOT NULL,
  `added` bigint NOT NULL,
  `status` tinytext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Daten für Tabelle `playlistLinks`
--

INSERT INTO `playlistLinks` (`upid`, `uvid`, `position`, `added`, `status`) VALUES
('H3yS4FJ6691c', '49lUrQcO', 1, 1621042025, 'public'),
('H3yS4FJ6691c', 'pTRtfE39', 2, 1621042027, 'public'),
('H3yS4FJ6691c', 'uq7t73s7', 3, 1621042080, 'public'),
('H3yS4FJ6691c', 'ZL7CM0Rd', 4, 1621042194, 'public');

--
-- Indizes der exportierten Tabellen
--

--
-- Indizes für die Tabelle `playlistLinks`
--
ALTER TABLE `playlistLinks`
  ADD UNIQUE KEY `uvid` (`upid`,`uvid`) USING BTREE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

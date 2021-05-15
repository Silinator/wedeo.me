-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: db
-- Erstellungszeit: 15. Mai 2021 um 00:31
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
-- Datenbank: `wedeomeMeta`
--

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `videoMetas`
--

CREATE TABLE `videoMetas` (
  `uvid` varchar(12) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `ipInfo` json NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Daten für Tabelle `videoMetas`
--

INSERT INTO `videoMetas` (`uvid`, `ipInfo`) VALUES
('49lUrQcO', '{\"ip\": \"000.000.000.000\", \"host\": \"xxx.xxx0.xxxxx.xx\"}'),
('pTRtfE39', '{\"ip\": \"000.000.000.000\", \"host\": \"xxx.xxx0.xxxxx.xx\"}'),
('uq7t73s7', '{\"ip\": \"000.000.000.000\", \"host\": \"xxx.xxx0.xxxxx.xx\"}'),
('ZL7CM0Rd', '{\"ip\": \"000.000.000.000\", \"host\": \"xxx.xxx0.xxxxx.xx\"}');

--
-- Indizes der exportierten Tabellen
--

--
-- Indizes für die Tabelle `videoMetas`
--
ALTER TABLE `videoMetas`
  ADD PRIMARY KEY (`uvid`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

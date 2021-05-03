-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: db
-- Erstellungszeit: 03. Mai 2021 um 12:09
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
-- Tabellenstruktur für Tabelle `videos`
--

CREATE TABLE `videos` (
  `vuid` varchar(12) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `datavuid` varchar(25) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `title` tinytext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `uuid` varchar(12) NOT NULL,
  `duration` smallint NOT NULL,
  `views` bigint NOT NULL,
  `commentsCount` int NOT NULL,
  `likes` int NOT NULL,
  `dislikes` int NOT NULL,
  `orgResolution` varchar(9) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `description` text NOT NULL,
  `tags` text NOT NULL,
  `resolutions` json NOT NULL,
  `color` varchar(12) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `language` varchar(3) NOT NULL,
  `category` varchar(3) NOT NULL,
  `lastUpdate` bigint NOT NULL,
  `uploadStart` bigint NOT NULL,
  `publishDate` bigint NOT NULL,
  `privacy` tinyint NOT NULL,
  `status` tinytext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Daten für Tabelle `videos`
--

INSERT INTO `videos` (`vuid`, `datavuid`, `title`, `uuid`, `duration`, `views`, `commentsCount`, `likes`, `dislikes`, `orgResolution`, `description`, `tags`, `resolutions`, `color`, `language`, `category`, `lastUpdate`, `uploadStart`, `publishDate`, `privacy`, `status`) VALUES
('49lUrQcO', 'HkgdCtAmwkmMbwK7OlISfR89R', '9MK2- Knaxi [NSM Release]', 'HmSFgY0X3DYX', 213, 42, 20, 4, 0, '1920x1080', 'No Strike Music Songs with Hearts And Some More All Copyright Free and Free To use  <br><br>Spend to us: paypal.me/BenjaminZobel<br><br>No one can get a copyright claim if you use our songs , Because this song is free to use for your youtube videos , Contact us if you have any problems, we will solve your problems as much as we can , Thanks   <br><br>See Here The AGB/s <br>https://docs.google.com/document/d/1j2TWWenGI0tKEzuQVABASB4QZwEEuZk3T6nzv08NQzw/edit?usp=sharing<br><br><br>Support us At Patreon: https://www.patreon.com/nostrikemusic<br><br>Chat with us at Discord: https://discord.gg/ByCSRya<br><br>The Artist: 9MK2<br>https://www.youtube.com/watch?v=2Bxq--SBXdw<br><br>Sozial Media<br><br>Hearthis: https://hearthis.at/nostrikemusik/<br><br>Twitch: https://www.twitch.tv/nostrikemusic<br><br>Facebook: https://www.facebook.com/Nostrikemusic/<br><br>Want to use this track? You must put this in your video description:<br><br>Song: Knaxi   9MK2 [NSM Release]<br>Music provided by No Strike music.<br>Video: https://youtu.be/3nzbiEbbIGc<br><br>If you are the Owner of the song pleas contact me per E-mail in the Channel Info tap and i Will remove the video', '', '[{\"res\": \"audio\", \"size\": \"4463613\"}, {\"res\": \"240p\", \"size\": \"25557142\"}, {\"res\": \"360p\", \"size\": \"43373549\"}, {\"res\": \"480p\", \"size\": \"65641752\"}, {\"res\": \"720p\", \"size\": \"126825122\"}, {\"res\": \"1080p\", \"size\": \"153882571\"}]', 'orange', 'eng', 'mus', 1521541536, 1520592327, 1520592329, 0, 'uploaded'),
('pTRtfE39', 'q20Gc2ypR1BdXrtUZ5i1a7hpQ', 'Aranoid Vortex - Other side [NSM Release]', 'HmSFgY0X3DYX', 280, 41, 0, 5, 0, '3840x2160', 'No Strike Music Songs with Hearts And Some More All Copyright Free and Free To use <br><br>Join Our TS3 and get youtuber Rank ore NSM Buddy:<br>NoStrikeMusic.nitrado.net<br><br>donate to us: paypal.me/BenjaminZobel<br><br>No one can get a copyright claim if you use our songs , Because this song is free to use for your youtube videos , Contact us if you have any problems, we will solve your problems as much as we can, Thanks <br><br>See Here The AGB/s <br>https://docs.google.com/document/d/1j2TWWenGI0tKEzuQVABASB4QZwEEuZk3T6nzv08NQzw/edit?usp=sharing<br><br><br>Support us At Patreon: https://www.patreon.com/nostrikemusic<br><br>Chat with us at Discord: https://discord.gg/ByCSRya<br><br>The Artist: Aranoid Vortex<br>https://www.youtube.com/channel/UCOAcuotmgg-uYXNvcTcSChw<br><br><br>Sozial Media<br><br>Hearthis: https://hearthis.at/nostrikemusik/<br><br>Twitch: https://www.twitch.tv/nostrikemusic<br><br>Facebook: https://www.facebook.com/Nostrikemusic/<br><br>Want to use this track? You must put this in your video description:<br><br>Song: Aranoid Vortex - Other side [NSM Release]<br>Music provided by No Strike music<br>Video: https://youtu.be/xw0DvPXqLEs<br><br>If you are the Owner of the song pleas contact me per E-mail in the Channel Info tap and i Will remove the video<br><br>Tags:<br><br>#NSM #Release #Adobe #After #Effekts', '', '[{\"res\": \"audio\", \"size\": \"6053284\"}, {\"res\": \"240p\", \"size\": \"16013443\"}, {\"res\": \"480p\", \"size\": \"47081549\"}, {\"res\": \"1080p\", \"size\": \"173538882\"}, {\"res\": \"2160p\", \"size\": \"610603062\"}]', 'blue', 'eng', 'mus', 1540482921, 1540482918, 1540482921, 0, 'uploaded'),
('uq7t73s7', 'QsFksSHmeNOW5BgjTCyZUtTfK', 'Floatinurboat - Limbo (feat. ELLIØT)  [NSM Release]', 'HmSFgY0X3DYX', 195, 35, 0, 2, 0, '3840x2160', 'No Strike Music Songs with Hearts And Some More \";-- All Copyright Free and Free To use <br><br>Join Our TS3 and get youtuber Rank ore NSM Buddy:<br>NoStrikeMusic.nitrado.net<br><br>donate to us: paypal.me/BenjaminZobel<br><br>No one can get a copyright claim if you use our songs , Because this song is free to use for your youtube videos , Contact us if you have any problems, we will solve your problems as much as we can, Thanks <br><br>See Here The AGB/s <br>https://docs.google.com/document/d/1j2TWWenGI0tKEzuQVABASB4QZwEEuZk3T6nzv08NQzw/edit?usp=sharing<br><br><br>Support us At Patreon: https://www.patreon.com/nostrikemusic<br><br>Chat with us at Discord: https://discord.gg/ByCSRya<br><br>The Artist: [Floatinurboat]<br>• http://soundcloud.com/floatinurboat<br>• http://facebook.com/iamfloatinurboat/<br>• http://twitter.com/floatinurboat<br>• http://instagram.com/floatinurboat<br><br><br><br>Sozial Media<br><br>Hearthis: https://hearthis.at/nostrikemusik/<br><br>Twitch: https://www.twitch.tv/nostrikemusic<br><br>Facebook: https://www.facebook.com/Nostrikemusic/<br><br>Want to use this track? You must put this in your video description:<br><br>Song: Floatinurboat - Limbo (feat. ELLIØT)  [NSM Release]<br>Music provided by No Strike music<br>Video: https://youtu.be/Nvgdssc-uEY<br><br>If you are the Owner of the song pleas contact me per E-mail in the Channel Info tap and i Will remove the video<br><br>Tags:<br><br>#NSM #Release #Adobe #After #Effekts', '', '[{\"res\": \"audio\", \"size\": \"4078492\"}, {\"res\": \"240p\", \"size\": \"8173449\"}, {\"res\": \"480p\", \"size\": \"21107896\"}, {\"res\": \"1080p\", \"size\": \"81297588\"}, {\"res\": \"2160p\", \"size\": \"296648668\"}]', 'purple', 'eng', 'mus', 1537023863, 1537023856, 1537023863, 0, 'uploaded'),
('ZL7CM0Rd', 'JnhdhWTGOaCFMzPPAca0JkDyW', 'Minecraft Server overview', 'G4bGS4TQajeo', 139, 34, 4, 2, 0, '1920x1080', 'Musik: Mount Olympus - Approaching Nirvana<br>https://www.youtube.com/watch?v=fe2s-7IYg-0', 'Minecraft, Server', '[{\"res\": \"audio\", \"size\": \"3217108\"}, {\"res\": \"240p\", \"size\": \"8812276\"}, {\"res\": \"480p\", \"size\": \"25800459\"}, {\"res\": \"1080p\", \"size\": \"92025884\"}]', 'green', 'ger', 'gam', 1612744125, 1612116815, 1612116937, 0, 'uploaded');

--
-- Indizes der exportierten Tabellen
--

--
-- Indizes für die Tabelle `videos`
--
ALTER TABLE `videos`
  ADD PRIMARY KEY (`vuid`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

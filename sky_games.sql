-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Czas generowania: 13 Mar 2022, 13:24
-- Wersja serwera: 10.4.17-MariaDB
-- Wersja PHP: 8.0.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Baza danych: `sky_games`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `favourite_games`
--

CREATE TABLE `favourite_games` (
  `favourite_games_id` int(11) NOT NULL,
  `game_id` int(11) DEFAULT NULL,
  `users_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Zrzut danych tabeli `favourite_games`
--

INSERT INTO `favourite_games` (`favourite_games_id`, `game_id`, `users_id`) VALUES
(71, 3, 11),
(72, 7, 11),
(74, 3, 10),
(76, 7, 10),
(78, 2, 8),
(79, 9, 10),
(81, 10, 9),
(82, 7, 14),
(83, 2, 14),
(84, 2, 9);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `games`
--

CREATE TABLE `games` (
  `game_id` int(11) NOT NULL,
  `title` varchar(30) NOT NULL,
  `preview` varchar(200) NOT NULL,
  `game_src` varchar(200) NOT NULL,
  `addTime` timestamp NOT NULL DEFAULT current_timestamp(),
  `rating` float NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Zrzut danych tabeli `games`
--

INSERT INTO `games` (`game_id`, `title`, `preview`, `game_src`, `addTime`, `rating`) VALUES
(1, 'Ping-Pong', 'games/Ping-Pong/preview.png', 'games/Ping-Pong/index.php', '2021-03-15 09:46:38', 0),
(2, 'Chess', 'games/Chess/preview.png', 'games/Chess/index.php', '2021-03-15 09:43:00', 75),
(3, 'King of Ladders', 'games/KingOfLadders/preview.png', 'games/KingOfLadders/index.php', '2021-03-15 09:33:00', 100),
(4, 'Meteor Rush', 'games/MeteorRush/preview.png', 'games/MeteorRush/index.php', '2021-03-15 09:41:00', 0),
(6, 'Wisielec', 'games/Wisielec/preview.png', 'games/Wisielec/index.php', '2021-03-15 11:36:09', 100),
(7, '2048', 'games/2048/preview.png', 'games/2048/index.php', '2021-03-17 12:36:04', 50),
(9, 'Eagles Memory', 'games/EaglesMemory/preview.png', 'games/EaglesMemory/index.php', '2021-03-23 12:09:39', 0),
(10, 'Saper', 'games/saper/preview.png', 'games/saper/index.php', '2021-03-24 09:51:27', 0);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `rating`
--

CREATE TABLE `rating` (
  `rating_id` int(11) NOT NULL,
  `game_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `rate_type` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Zrzut danych tabeli `rating`
--

INSERT INTO `rating` (`rating_id`, `game_id`, `user_id`, `rate_type`) VALUES
(1, 2, 9, 1),
(3, 2, 11, 0),
(4, 2, 10, 1),
(5, 3, 10, 1),
(6, 7, 9, 1),
(9, 2, 14, 1),
(10, 6, 10, 1);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `nick` varchar(20) NOT NULL,
  `password` varchar(300) NOT NULL,
  `email` varchar(40) NOT NULL,
  `profile_img` varchar(100) DEFAULT 'resources/profile.png'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Zrzut danych tabeli `users`
--

INSERT INTO `users` (`user_id`, `nick`, `password`, `email`, `profile_img`) VALUES
(8, 'adam', '$2y$10$qrcbJNaBhLW1YRWpdh8DkeGzSgwUdJVf9I9N.HsnRuBT5vxwGuR3a', 'email@gmail.com', 'resources/profile.png'),
(9, 'Kader', '$2y$10$aQ0s1Z4L0vcTMKvVGhMDEuQBPyFcFuufkfzNtmu2Tx5aUAS.UMCKG', 'test@gmail.com', 'resources/profiles/9.png'),
(10, 'maciek', '$2y$10$sdEE3JBeYNFHTURuKPjau.GPsUQKjUoF5XKSsV1CFpuSjXS85lSPy', 'maciek@gmail.com', 'resources/profiles/10.png'),
(11, 'dede', '$2y$10$8Fdi0XwGrsuXGKXu8uLv9ekGAxvLtLUcBluLSUEX..CctDLBneBDa', 'dede@gmail.com', 'resources/profile.png'),
(12, 'Gamer1234567', '$2y$10$o4e22zq2RMFKzTPgThwUk.TQMmAbWO8CnpDb2rAgusqoJNJzt5V.G', 'gamer@gmail.com', 'resources/profile.png'),
(13, 'nowy', '$2y$10$.DmTwMnchHwNokFiHZNVV.TU5kQhBeiymi6SZWkiwX9c6TOspoD1K', 'wasp@wp.pl', 'resources/profile.png'),
(14, 'Imie', '$2y$10$0S7xNSDOc4ZU/e4fNBPOCeu1RSyj4grz8NDCQhc3jFQ6HhHlfcGvq', 'imie@gmail.com', 'resources/profiles/14.png'),
(15, 'Login', '$2y$10$siuLkWeE97GLpp0pKCw/f.1aWwetMyVb/rA3lRCVMdXjSXYDdbCZS', 'wsasp@wp.pl', 'resources/profile.png'),
(16, 'witaj', '$2y$10$caK08/FPReIwmbGcdK/IB.nlDlm.lvsBlmrGNVXxUPaVjmcCx13/i', 'hi@gmail.com', 'resources/profile.png');

--
-- Indeksy dla zrzutów tabel
--

--
-- Indeksy dla tabeli `favourite_games`
--
ALTER TABLE `favourite_games`
  ADD PRIMARY KEY (`favourite_games_id`),
  ADD KEY `game_id` (`game_id`),
  ADD KEY `users_id` (`users_id`);

--
-- Indeksy dla tabeli `games`
--
ALTER TABLE `games`
  ADD PRIMARY KEY (`game_id`);

--
-- Indeksy dla tabeli `rating`
--
ALTER TABLE `rating`
  ADD PRIMARY KEY (`rating_id`),
  ADD KEY `game_id` (`game_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indeksy dla tabeli `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT dla zrzuconych tabel
--

--
-- AUTO_INCREMENT dla tabeli `favourite_games`
--
ALTER TABLE `favourite_games`
  MODIFY `favourite_games_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=85;

--
-- AUTO_INCREMENT dla tabeli `games`
--
ALTER TABLE `games`
  MODIFY `game_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT dla tabeli `rating`
--
ALTER TABLE `rating`
  MODIFY `rating_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT dla tabeli `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- Ograniczenia dla zrzutów tabel
--

--
-- Ograniczenia dla tabeli `favourite_games`
--
ALTER TABLE `favourite_games`
  ADD CONSTRAINT `favourite_games_ibfk_1` FOREIGN KEY (`game_id`) REFERENCES `games` (`game_id`),
  ADD CONSTRAINT `favourite_games_ibfk_2` FOREIGN KEY (`users_id`) REFERENCES `users` (`user_id`);

--
-- Ograniczenia dla tabeli `rating`
--
ALTER TABLE `rating`
  ADD CONSTRAINT `rating_ibfk_1` FOREIGN KEY (`game_id`) REFERENCES `games` (`game_id`),
  ADD CONSTRAINT `rating_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

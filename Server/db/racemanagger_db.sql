-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 23, 2025 at 05:57 PM
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
-- Database: `racemanagger_db`
--
CREATE DATABASE IF NOT EXISTS `racemanagger_db` DEFAULT CHARACTER SET utf32 COLLATE utf32_spanish2_ci;
USE `racemanagger_db`;

-- --------------------------------------------------------

--
-- Table structure for table `athletes`
--

DROP TABLE IF EXISTS `athletes`;
CREATE TABLE `athletes` (
  `id_athlete` int(11) NOT NULL,
  `name_athlete` varchar(100) NOT NULL,
  `lastname_athlete` varchar(100) NOT NULL,
  `age_athlete` int(2) NOT NULL,
  `weight_athlete` int(11) NOT NULL,
  `phone_athlete` varchar(20) NOT NULL,
  `sex_athlete` enum('masculino','femenino') NOT NULL,
  `email_athlete` varchar(200) NOT NULL,
  `nation_athlete` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf32 COLLATE=utf32_spanish2_ci;

--
-- Dumping data for table `athletes`
--

INSERT INTO `athletes` (`id_athlete`, `name_athlete`, `lastname_athlete`, `age_athlete`, `weight_athlete`, `phone_athlete`, `sex_athlete`, `email_athlete`, `nation_athlete`) VALUES
(1, 'Anderson', 'Rodriguez', 22, 75, '+584120686329', 'masculino', 'example@aa.com', 'Venezuela'),
(10, 'Kendry', 'Vazquez', 30, 80, '+584120686330', 'masculino', 'example@aa.com', 'Andorra');

-- --------------------------------------------------------

--
-- Table structure for table `competitions`
--

DROP TABLE IF EXISTS `competitions`;
CREATE TABLE `competitions` (
  `id_competition` int(11) NOT NULL,
  `name_competition` varchar(400) NOT NULL,
  `type_competition` enum('Torneo','Competición') NOT NULL,
  `discipline_competition` enum('Aguas Abiertas','Natación','Atletismo','Acuatlón','Triatlón') NOT NULL,
  `dateStart_competition` datetime NOT NULL,
  `dateEnd_competition` datetime NOT NULL,
  `location_competition` varchar(4000) NOT NULL,
  `description_competition` text NOT NULL,
  `mode_competition` enum('Liga','Eliminación Directa','Final') NOT NULL,
  `participants_competition` int(11) NOT NULL,
  `rounds_competition` int(11) NOT NULL,
  `results_competition` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`results_competition`))
) ENGINE=InnoDB DEFAULT CHARSET=utf32 COLLATE=utf32_spanish2_ci;

--
-- Dumping data for table `competitions`
--

INSERT INTO `competitions` (`id_competition`, `name_competition`, `type_competition`, `discipline_competition`, `dateStart_competition`, `dateEnd_competition`, `location_competition`, `description_competition`, `mode_competition`, `participants_competition`, `rounds_competition`, `results_competition`) VALUES
(3, 'Juegos Olimpicos 2024: Atletismo', 'Competición', 'Atletismo', '2024-08-18 00:00:00', '2024-08-26 00:00:00', 'Francia', 'La mejor competicón de atletismo', 'Final', 16, 2, '{\"podio\":\"No definido\"}'),
(4, 'Juegos Olimpicos 2024: Atletismo 3', 'Competición', 'Atletismo', '2024-08-18 00:00:00', '2024-08-26 00:00:00', 'Francia', 'La mejor competicón de atletismo', 'Final', 16, 2, '{\"podio\":\"No definido\"}'),
(7, 'asdasd', 'Torneo', 'Natación', '2025-03-16 00:00:00', '2025-03-27 00:00:00', 'asdasd', 'asdasd', 'Eliminación Directa', 23, 2, '{\"podio\":\"No definido\"}');

-- --------------------------------------------------------

--
-- Table structure for table `enrolled`
--

DROP TABLE IF EXISTS `enrolled`;
CREATE TABLE `enrolled` (
  `id_enrolled` int(11) NOT NULL,
  `id_athlete` int(11) NOT NULL,
  `id_competition` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf32 COLLATE=utf32_spanish2_ci;

-- --------------------------------------------------------

--
-- Table structure for table `results`
--

DROP TABLE IF EXISTS `results`;
CREATE TABLE `results` (
  `id_result` int(11) NOT NULL,
  `id_competition` int(11) NOT NULL,
  `id_athlete` int(11) NOT NULL,
  `time_result` time NOT NULL,
  `round_result` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf32 COLLATE=utf32_spanish2_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id_user` int(11) NOT NULL,
  `name_user` varchar(100) NOT NULL,
  `lastname_user` varchar(100) NOT NULL,
  `username_user` varchar(200) NOT NULL,
  `password_user` varchar(400) NOT NULL,
  `role_user` enum('admin','user') NOT NULL,
  `email_user` varchar(400) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf32 COLLATE=utf32_spanish2_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id_user`, `name_user`, `lastname_user`, `username_user`, `password_user`, `role_user`, `email_user`) VALUES
(1, 'Alexander', 'Terán', 'Root', '$2b$10$Lq96NOxd043BftPovi9CN.TIdkVRX4SM3vMB3dnKiQSFuyBAkTGfC', 'admin', 'alexander2@gmail.com'),
(3, 'Example', 'Example', 'ExampleUser', '$2b$10$gFLhj8JHLFLgtWR6NTE2WOmR9bfCGc4pxcHUW6UBPqqz.9yC7JRJ.', 'user', 'alexander@gmail.com');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `athletes`
--
ALTER TABLE `athletes`
  ADD PRIMARY KEY (`id_athlete`);

--
-- Indexes for table `competitions`
--
ALTER TABLE `competitions`
  ADD PRIMARY KEY (`id_competition`),
  ADD UNIQUE KEY `name_competition` (`name_competition`);

--
-- Indexes for table `enrolled`
--
ALTER TABLE `enrolled`
  ADD PRIMARY KEY (`id_enrolled`),
  ADD KEY `athlete` (`id_athlete`),
  ADD KEY `competition` (`id_competition`);

--
-- Indexes for table `results`
--
ALTER TABLE `results`
  ADD PRIMARY KEY (`id_result`),
  ADD KEY `athlete result` (`id_athlete`),
  ADD KEY `competition result` (`id_competition`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id_user`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `athletes`
--
ALTER TABLE `athletes`
  MODIFY `id_athlete` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `competitions`
--
ALTER TABLE `competitions`
  MODIFY `id_competition` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `enrolled`
--
ALTER TABLE `enrolled`
  MODIFY `id_enrolled` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `results`
--
ALTER TABLE `results`
  MODIFY `id_result` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `enrolled`
--
ALTER TABLE `enrolled`
  ADD CONSTRAINT `athlete` FOREIGN KEY (`id_athlete`) REFERENCES `athletes` (`id_athlete`) ON DELETE CASCADE,
  ADD CONSTRAINT `competition` FOREIGN KEY (`id_competition`) REFERENCES `competitions` (`id_competition`) ON DELETE CASCADE;

--
-- Constraints for table `results`
--
ALTER TABLE `results`
  ADD CONSTRAINT `athlete result` FOREIGN KEY (`id_athlete`) REFERENCES `athletes` (`id_athlete`) ON DELETE CASCADE,
  ADD CONSTRAINT `competition result` FOREIGN KEY (`id_competition`) REFERENCES `competitions` (`id_competition`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

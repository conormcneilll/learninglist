-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: Jun 17, 2024 at 09:36 AM
-- Server version: 5.7.39
-- PHP Version: 7.4.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `learninglist`
--



--
-- Table structure for table `FavoriteLearnlist`
--

CREATE TABLE `FavoriteLearnlist` (
  `user_id` int(11) NOT NULL,
  `learnlist_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `FavoriteLearnlist`
--

INSERT INTO `FavoriteLearnlist` (`user_id`, `learnlist_id`) VALUES
(14, 2),
(14, 4),
(14, 7),
(14, 8);

-- --------------------------------------------------------

--
-- Table structure for table `Learnlist`
--

CREATE TABLE `Learnlist` (
  `learnlist_id` int(11) NOT NULL,
  `creator_id` int(11) DEFAULT NULL,
  `title` varchar(255) NOT NULL,
  `subject_topic` varchar(255) NOT NULL,
  `description` text,
  `publication_status` enum('validated','not_validated') DEFAULT 'not_validated',
  `rating` float DEFAULT '0',
  `img_url` varchar(255) NOT NULL,
  `average_rating` float DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Learnlist`
--

INSERT INTO `Learnlist` (`learnlist_id`, `creator_id`, `title`, `subject_topic`, `description`, `publication_status`, `rating`, `img_url`, `average_rating`) VALUES
(2, 8, 'World War 1', 'History', 'Information on the important events of World War 1', 'validated', 5, 'https://cdn.theatlantic.com/thumbor/DAqEZyiBzUFU5BwjhyHNNBS0Jdg=/0x0:1920x1165/1920x1165/media/img/specialreports/deluxe/2016/11/10/widhd-1/original.jpg', 5),
(3, 8, 'World War II', 'History', 'The important events that led to World War II!', 'validated', 5, 'https://cdn.theatlantic.com/thumbor/g-gJHaW90SkxRci9i3j8w_7bdoE=/0x0:898x898/898x898/media/img/specialreports/lead/2023/05/11/ww2.jpg', 4),
(4, 11, 'Family Law ', 'Law', 'The different orders issues in the family Court.', 'validated', 5, 'https://mrcollege.ac.uk/wp-content/uploads/2019/05/Family-Law-copy.jpg', 4),
(5, 9, 'Eye Makeup', 'Beauty', 'This is the perfect guide on how to do a smoky eye!', 'validated', 4, 'https://i.ytimg.com/vi/ne-AKvLKvnc/maxresdefault.jpg', 4),
(6, 9, 'Hair Styling', 'Beauty', 'Different ways you can style your hair!', 'validated', 5, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzcQUNVp-w7nL8WsNNEWYJPjLLeBVVlBQFtw&s', 5),
(7, 10, 'Website Building 101', 'Coding', 'This is a basic guide on how to build a website using NODE', 'validated', 5, 'https://entrepreneurhandbook.co.uk/wp-content/uploads/2019/10/Website-builder.jpg.webp', 3),
(8, 10, 'HTML Coding', 'Coding', 'This is a guide on basic HTML!', 'validated', 5, 'https://www.ionos.co.uk/digitalguide/fileadmin/DigitalGuide/Teaser/html-tagst.jpg', 2),
(9, 13, 'Pokemon Trading Cards!', 'Pokemon', 'How to play Pokemon Cards!', 'validated', 2, 'https://www.hillscards.co.uk/images/pokemon-trading-card-game-86-108-slowbro-spirit-link-uncommon-xy-12-evolutions-p39729-106145_image.jpg', 5),
(10, 12, 'Painting', 'Painting', 'How to Paint!', 'validated', 1, 'https://cdn.britannica.com/03/193803-050-CBC590FA/Bob-Ross.jpg', 4),
(12, 14, 'NO WAYYY', 'Mwdn', 'dwwddw', 'not_validated', 0, 'http://localhost:3000/logo.png', 3),
(13, 14, 'This is', 'A Test', 'OMGGGG this is a TEST', 'not_validated', 0, 'http://localhost:3000/logo.png', 3);

-- --------------------------------------------------------

--
-- Table structure for table `learnlist_resource`
--

CREATE TABLE `learnlist_resource` (
  `learnlist_id` int(11) NOT NULL,
  `resource_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `learnlist_resource`
--

INSERT INTO `learnlist_resource` (`learnlist_id`, `resource_id`) VALUES
(2, 1),
(2, 2),
(2, 3),
(2, 4),
(2, 5),
(3, 11),
(3, 12),
(3, 13),
(3, 14),
(3, 15),
(6, 16),
(6, 17),
(6, 18),
(6, 19),
(5, 24),
(5, 25),
(5, 26),
(5, 27),
(9, 28),
(9, 29),
(9, 30),
(9, 31),
(7, 32),
(8, 32),
(8, 33),
(2, 39),
(3, 39),
(7, 40),
(8, 40),
(7, 41),
(7, 42),
(7, 43),
(4, 44),
(4, 45),
(4, 46),
(4, 47),
(4, 48),
(10, 53),
(10, 54),
(10, 55),
(10, 56);

-- --------------------------------------------------------

--
-- Table structure for table `profile`
--

CREATE TABLE `profile` (
  `user_id` int(11) DEFAULT NULL,
  `city` varchar(100) DEFAULT NULL,
  `occupation` varchar(100) DEFAULT NULL,
  `profile_picture` varchar(255) DEFAULT NULL,
  `interests` text,
  `profile_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `profile`
--

INSERT INTO `profile` (`user_id`, `city`, `occupation`, `profile_picture`, `interests`, `profile_id`) VALUES
(14, 'DentistD', 'd', 'd', 'd', 1);

-- --------------------------------------------------------

--
-- Table structure for table `Rating`
--

CREATE TABLE `Rating` (
  `rating_id` int(11) NOT NULL,
  `rater_id` int(11) NOT NULL,
  `learnlist_id` int(11) NOT NULL,
  `rating_value` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `Resource`
--

CREATE TABLE `Resource` (
  `resource_id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `url` varchar(255) NOT NULL,
  `res_type` enum('video','pdf','webpage','other') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Resource`
--

INSERT INTO `Resource` (`resource_id`, `title`, `url`, `res_type`) VALUES
(1, 'How World War I Started', 'https://youtu.be/c7nUDLKKEBY', 'video'),
(2, 'Study Guide - How WW1 Begun', 'https://grafhamgrangeschool.org/wp-content/uploads/2020/03/t2-h-5310-how-did-the-first-world-war-start-differentiated-reading-comprehension-activity_ver_6.pdf', 'pdf'),
(3, 'How WW1 ended!', 'https://www.theworldwar.org/learn/about-wwi/armistice#:~:text=Armistice%20on%20the%20Western%20Front,to%20ending%20World%20War%20I.', 'webpage'),
(4, 'Allies v Axis', 'https://youtu.be/3rwihAKeMsE', 'video'),
(5, 'The most important battles!', 'https://www.youtube.com/watch?v=482Gw0FOqWc', 'video'),
(11, 'How WW2 Begun!', 'https://www.youtube.com/watch?v=YoaXGUq-l50', 'video'),
(12, 'When the Axis and Allies troops worked together?', 'https://youtu.be/oj5k89auJ2E', 'video'),
(13, 'WW2 Timeline', 'https://www.pbs.org/wgbh/masterpiece/specialfeatures/world-war-ii-major-events-timeline/', 'webpage'),
(14, '22 Unknown facts about WW2', 'https://www.history.co.uk/articles/little-known-facts-about-wwii', 'webpage'),
(15, 'How WW2 Ended', 'https://youtu.be/Xe-q-B8NoNs', 'video'),
(16, 'Bridal Hair Guide', 'https://youtu.be/3DDVnv32aeo', 'video'),
(17, 'Cut your own bangs!', 'https://www.youtube.com/shorts/vA9Xh3qo-Y4', 'video'),
(18, 'Bleach your own hair!', 'https://youtu.be/cTKeZbcPAEM', 'video'),
(19, 'Flat Iron Curls!', 'https://youtu.be/P2kT3DDRT5E', 'video'),
(24, 'Smoky Eye Tutorial', 'https://youtu.be/x2oBO4A1irc', 'video'),
(25, 'Glitter Eye Makeup', 'https://youtu.be/CMNGzQ08tUY', 'video'),
(26, 'Winged Eyeliner', 'https://youtu.be/xJyx2VZY-Is', 'video'),
(27, 'beginner eye makeup look', 'https://youtu.be/d8bct2_ix4U', 'video'),
(28, 'Getting started Pokemon!', 'https://economictimes.indiatimes.com/news/international/us/pokmon-trading-card-game-how-to-play-what-are-the-basics-of-pokemon-how-each-card-works-heres-all-you-need-to-know/articleshow/101992216.cms?from=mdr', 'webpage'),
(29, 'How to play video tutorial!', 'https://www.youtube.com/watch?v=rJdEYAuoVIQ', 'video'),
(30, 'ABCS with Pokemon!', 'https://www.youtube.com/watch?v=OO4NwD9Q5yg', 'video'),
(31, 'Tutorial for Beginngers!', 'https://www.youtube.com/watch?v=FQdaUv95mR8', 'video'),
(32, 'HTML 101', 'https://medium.com/@webtutorseo/html-101-the-ultimate-beginners-guide-to-writing-learning-using-html-15f787792d71', 'webpage'),
(33, 'Crash Course', 'https://www.youtube.com/watch?v=qz0aGYrrlhU', 'video'),
(39, 'The Costs of WAR', 'https://watson.brown.edu/costsofwar/', 'webpage'),
(40, 'How to become a web dev', 'https://brainstation.io/career-guides/how-to-become-a-web-developer', 'webpage'),
(41, 'Tutorial for beginners!', 'https://youtu.be/gQojMIhELvM', 'video'),
(42, 'Installing Node ', 'https://www.youtube.com/watch?v=06X51c6WHsQ', 'video'),
(43, 'How to create a database', 'https://youtu.be/PPFyoXA_FC0', 'video'),
(44, 'Family Law 101', 'https://youtu.be/SmSn06A8suA', 'video'),
(45, 'Role of Family Law Solicitors', 'https://youtu.be/dLmsiNQf6i0', 'video'),
(46, 'Family Law Act 1996 ', 'https://www.legislation.gov.uk/ukpga/1996/27/contents', 'webpage'),
(47, 'What is family law?', 'https://www.law.ac.uk/employability/legal-practice-areas/family-law/#:~:text=Family%20law%20is%20made%20up,guardianship%2C%20child%20abuse%20and%20neglect.', 'webpage'),
(48, 'Mock Family Court Trial', 'https://youtu.be/vzrG6SfahLI', 'video'),
(53, 'Lets paint trees!', 'https://youtu.be/uKRmIMg-QT8', 'video'),
(54, 'Paint a winter night', 'https://youtu.be/8ysFkNYwhAE', 'video'),
(55, 'Painting Clouds', 'https://youtu.be/jyknCVczn3Q', 'video'),
(56, 'Mountain Painting', 'https://youtu.be/aaSl7ZU3ppM', 'video'),
(57, 'ff', 'ff', 'video');

--
-- Triggers `Resource`
--
DELIMITER $$
CREATE TRIGGER `after_insert_resource` AFTER INSERT ON `Resource` FOR EACH ROW BEGIN
    IF NEW.res_type = 'video' THEN
        INSERT INTO VideoTutorial (video_id, title, url)
        VALUES (NEW.resource_id, NEW.title, NEW.url);
    END IF;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `Users`
--

CREATE TABLE `Users` (
  `user_id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Users`
--

INSERT INTO `Users` (`user_id`, `username`, `password`, `email`) VALUES
(1, 'conormcneill', 'password', 'conormcneill422@gmail.com'),
(8, 'warman', '$2b$10$TVjZBV7M8bDnDipOU1NgHevywTmsmOAzGc1.bRi3WCIZSoSuX67ku', 'ilovewar@gmail.com'),
(9, 'beautygirl871', '$2b$10$Me63Z6gi/h5nT7r/Medh8.FSyRPtJZ4VT1x5uUpl7XpTAwmAC3Wy6', 'rachel@yahoo.com'),
(10, 'Johnbusch', '$2b$10$HLFesXgGPhlDBDS5IF7XxO7DPoYr9P5KNCxNrhJ1gWLKWluYFLo6a', 'jbuch@qub.ac.uk'),
(11, 'local lawyer', '$2b$10$dtcnhvKjpYI8MF8esxRtDuf/11Z.i2d0HZpIXe7sZelAznt1s8JMK', 'law@gmail.com'),
(12, 'bobross', '$2b$10$CPZ.4fBxnKxXwVk1f6TwWeqh/GLNcq0BYzhgu2iDXCBZ0VslVGwzS', 'bob@hotmail.com'),
(13, 'askketchup', '$2b$10$xuCyXWLwGHI0AjKPrQkskOxMXX.CIYYyxJfpw/tuyG/Kp9qeKqg9G', 'ash@picka.com'),
(14, 'Conor', '$2b$10$O9eR.7EADj3cgZE9k6ZCCujIYvdK9XwapRnauCEtpzPfjPFAbiqS6', 'conor@gmail.com'),
(15, 'you', '$2b$10$GcluOdPNgApLFVvJv6.NauDB0d.9.VNxyikTrqGQzeqwpUKUOaQ8a', 'you@gmail.com'),
(16, 'xxx', '$2b$10$.Ivu4PsmMiYvPO/i0GUmP.wx8e2fWmoDLwafgGXT/Jpx8KIqSIr8q', 'xxx@gmail.com'),
(17, 'bob', '$2b$10$uuauoY2yL3QsYKVaJbK61.NdfE9x.zQm10D6JNZwg/WHbMvC1CTDS', 'bob@gmail.com'),
(18, 'asd', '$2b$10$AFFmHoNXI6A/hBvBoW6WcOdFfpT0tp0ffETJZhs/TEW1lNW3uLWq2', 'asd@gmail.com');

-- --------------------------------------------------------

--
-- Table structure for table `Validation`
--

CREATE TABLE `Validation` (
  `validation_id` int(11) NOT NULL,
  `learnlist_id` int(11) DEFAULT NULL,
  `validator_id` int(11) DEFAULT NULL,
  `validation_status` enum('validated','not_validated') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `VideoTutorial`
--

CREATE TABLE `VideoTutorial` (
  `video_id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `url` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `VideoTutorial`
--

INSERT INTO `VideoTutorial` (`video_id`, `title`, `url`) VALUES
(1, 'How World War I Started', 'https://youtu.be/c7nUDLKKEBY'),
(4, 'Allies v Axis', 'https://youtu.be/3rwihAKeMsE'),
(5, 'The most important battles!', 'https://www.youtube.com/watch?v=482Gw0FOqWc'),
(11, 'How WW2 Begun!', 'https://www.youtube.com/watch?v=YoaXGUq-l50'),
(12, 'When the Axis and Allies troops worked together?', 'https://youtu.be/oj5k89auJ2E'),
(15, 'How WW2 Ended', 'https://youtu.be/Xe-q-B8NoNs'),
(16, 'Bridal Hair Guide', 'https://youtu.be/3DDVnv32aeo'),
(17, 'Cut your own bangs!', 'https://www.youtube.com/shorts/vA9Xh3qo-Y4'),
(18, 'Bleach your own hair!', 'https://youtu.be/cTKeZbcPAEM'),
(19, 'Flat Iron Curls!', 'https://youtu.be/P2kT3DDRT5E'),
(24, 'Smoky Eye Tutorial', 'https://youtu.be/x2oBO4A1irc'),
(25, 'Glitter Eye Makeup', 'https://youtu.be/CMNGzQ08tUY'),
(26, 'Winged Eyeliner', 'https://youtu.be/xJyx2VZY-Is'),
(27, 'beginner eye makeup look', 'https://youtu.be/d8bct2_ix4U'),
(29, 'How to play video tutorial!', 'https://www.youtube.com/watch?v=rJdEYAuoVIQ'),
(30, 'ABCS with Pokemon!', 'https://www.youtube.com/watch?v=OO4NwD9Q5yg'),
(31, 'Tutorial for Beginngers!', 'https://www.youtube.com/watch?v=FQdaUv95mR8'),
(33, 'Crash Course', 'https://www.youtube.com/watch?v=qz0aGYrrlhU'),
(41, 'Tutorial for beginners!', 'https://youtu.be/gQojMIhELvM'),
(42, 'Installing Node ', 'https://www.youtube.com/watch?v=06X51c6WHsQ'),
(43, 'How to create a database', 'https://youtu.be/PPFyoXA_FC0'),
(44, 'Family Law 101', 'https://youtu.be/SmSn06A8suA'),
(45, 'Role of Family Law Solicitors', 'https://youtu.be/dLmsiNQf6i0'),
(48, 'Mock Family Court Trial', 'https://youtu.be/vzrG6SfahLI'),
(53, 'Lets paint trees!', 'https://youtu.be/uKRmIMg-QT8'),
(54, 'Paint a winter night', 'https://youtu.be/8ysFkNYwhAE'),
(55, 'Painting Clouds', 'https://youtu.be/jyknCVczn3Q'),
(56, 'Mountain Painting', 'https://youtu.be/aaSl7ZU3ppM'),
(57, 'ff', 'ff');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `FavoriteLearnlist`
--
ALTER TABLE `FavoriteLearnlist`
  ADD PRIMARY KEY (`user_id`,`learnlist_id`),
  ADD KEY `learnlist_id` (`learnlist_id`);

--
-- Indexes for table `Learnlist`
--
ALTER TABLE `Learnlist`
  ADD PRIMARY KEY (`learnlist_id`),
  ADD KEY `creator_id` (`creator_id`);

--
-- Indexes for table `learnlist_resource`
--
ALTER TABLE `learnlist_resource`
  ADD PRIMARY KEY (`learnlist_id`,`resource_id`),
  ADD KEY `resource_id` (`resource_id`);

--
-- Indexes for table `profile`
--
ALTER TABLE `profile`
  ADD PRIMARY KEY (`profile_id`),
  ADD UNIQUE KEY `user_id` (`user_id`);

--
-- Indexes for table `Rating`
--
ALTER TABLE `Rating`
  ADD PRIMARY KEY (`rating_id`),
  ADD KEY `fk_rating_user` (`rater_id`),
  ADD KEY `fk_rating_learnlist` (`learnlist_id`);

--
-- Indexes for table `Resource`
--
ALTER TABLE `Resource`
  ADD PRIMARY KEY (`resource_id`);

--
-- Indexes for table `Users`
--
ALTER TABLE `Users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Indexes for table `Validation`
--
ALTER TABLE `Validation`
  ADD PRIMARY KEY (`validation_id`),
  ADD KEY `learnlist_id` (`learnlist_id`),
  ADD KEY `validator_id` (`validator_id`);

--
-- Indexes for table `VideoTutorial`
--
ALTER TABLE `VideoTutorial`
  ADD PRIMARY KEY (`video_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Learnlist`
--
ALTER TABLE `Learnlist`
  MODIFY `learnlist_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `profile`
--
ALTER TABLE `profile`
  MODIFY `profile_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `Rating`
--
ALTER TABLE `Rating`
  MODIFY `rating_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `Resource`
--
ALTER TABLE `Resource`
  MODIFY `resource_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=58;

--
-- AUTO_INCREMENT for table `Users`
--
ALTER TABLE `Users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `Validation`
--
ALTER TABLE `Validation`
  MODIFY `validation_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `VideoTutorial`
--
ALTER TABLE `VideoTutorial`
  MODIFY `video_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=58;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `FavoriteLearnlist`
--
ALTER TABLE `FavoriteLearnlist`
  ADD CONSTRAINT `favoritelearnlist_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `Users` (`user_id`),
  ADD CONSTRAINT `favoritelearnlist_ibfk_2` FOREIGN KEY (`learnlist_id`) REFERENCES `Learnlist` (`learnlist_id`);

--
-- Constraints for table `Learnlist`
--
ALTER TABLE `Learnlist`
  ADD CONSTRAINT `learnlist_ibfk_1` FOREIGN KEY (`creator_id`) REFERENCES `Users` (`user_id`);

--
-- Constraints for table `learnlist_resource`
--
ALTER TABLE `learnlist_resource`
  ADD CONSTRAINT `learnlist_resource_ibfk_1` FOREIGN KEY (`learnlist_id`) REFERENCES `learnlist` (`learnlist_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `learnlist_resource_ibfk_2` FOREIGN KEY (`resource_id`) REFERENCES `Resource` (`resource_id`);

--
-- Constraints for table `profile`
--
ALTER TABLE `profile`
  ADD CONSTRAINT `profile_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `Users` (`user_id`);

--
-- Constraints for table `Rating`
--
ALTER TABLE `Rating`
  ADD CONSTRAINT `fk_rating_learnlist` FOREIGN KEY (`learnlist_id`) REFERENCES `Learnlist` (`learnlist_id`),
  ADD CONSTRAINT `fk_rating_user` FOREIGN KEY (`rater_id`) REFERENCES `Users` (`user_id`);

--
-- Constraints for table `Validation`
--
ALTER TABLE `Validation`
  ADD CONSTRAINT `validation_ibfk_1` FOREIGN KEY (`learnlist_id`) REFERENCES `Learnlist` (`learnlist_id`),
  ADD CONSTRAINT `validation_ibfk_2` FOREIGN KEY (`validator_id`) REFERENCES `Users` (`user_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

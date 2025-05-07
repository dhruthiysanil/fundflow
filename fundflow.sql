-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 07, 2025 at 08:59 AM
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
-- Database: `fundflow`
--

-- --------------------------------------------------------

--
-- Table structure for table `campaign`
--

CREATE TABLE `campaign` (
  `campaign_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `campaign_title` varchar(255) NOT NULL,
  `beneficiary_type` enum('Myself','Family','Friend','Other') NOT NULL,
  `beneficiary_name` varchar(255) NOT NULL,
  `beneficiary_age` int(11) DEFAULT NULL CHECK (`beneficiary_age` >= 0),
  `beneficiary_location` varchar(255) NOT NULL,
  `beneficiary_phone` varchar(15) DEFAULT NULL,
  `category_id` int(11) NOT NULL,
  `target_amount` decimal(12,2) NOT NULL CHECK (`target_amount` > 0),
  `campaign_duration` int(11) NOT NULL CHECK (`campaign_duration` > 0),
  `campaign_photo` varchar(255) DEFAULT NULL,
  `campaign_story` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `raised_amount` decimal(10,2) DEFAULT 0.00
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `campaign`
--

INSERT INTO `campaign` (`campaign_id`, `user_id`, `campaign_title`, `beneficiary_type`, `beneficiary_name`, `beneficiary_age`, `beneficiary_location`, `beneficiary_phone`, `category_id`, `target_amount`, `campaign_duration`, `campaign_photo`, `campaign_story`, `created_at`, `raised_amount`) VALUES
(41, 14, 'Help my child', 'Family', 'rahul', 7, 'india', '9878789876', 4, 80000.00, 30, '/uploads/campaigns/campaign-1742729635587-928434746.jpg', 'My child is battling cancer, and we are in desperate need of support. The total cost of treatment is ₹2,00,000, and we have managed to arrange ₹1,20,000. However, we still need ₹80,000 within the next 30 days to continue the life-saving treatment. Please help us in this difficult time—every contribution, big or small, brings us closer to saving my child\'s life. Your kindness can make a difference. Donate now and be a ray of hope for my little one! ????', '2025-03-23 11:33:55', 0.00),
(42, 13, 'Help Us Give Homeless Dogs a Second Chance!', 'Other', 'Astha dog shelter', 4, 'manipal', '9878987890', 6, 50000.00, 60, '/uploads/campaigns/campaign-1742729994068-999544764.jpg', 'Help Us Give Homeless Dogs a Second Chance!\r\n\r\nOur shelter is home to dozens of rescued dogs who have been abandoned, injured, or left without care. We provide them with food, medical treatment, and a safe place to heal, but we are struggling to meet their needs. To continue giving them the love and care they deserve, we urgently need ₹50,000. Every contribution, big or small, helps provide food, medicine, and shelter for these innocent souls. Please donate and be their hope for a better tomorrow! ????❤️', '2025-03-23 11:39:54', 45000.00),
(43, 12, 'Help Us Raise ₹5,00,000 for Underprivileged Students!', 'Other', 'NGS school', 11, 'manglore', '9878987876', 3, 500000.00, 60, '/uploads/campaigns/campaign-1742730390525-631356442.jpg', 'We urgently need funds to support the education of children for the academic year 2024-25. Your contributions will help us provide essential learning resources and tailored academic support to ensure no child is left behind.\r\n\r\nHow Your Donations Will Be Used:\r\n???? FLN Programs & Remedial Coaching – Strengthening foundational literacy and numeracy skills for students in grades 5-8, along with remedial coaching for grades 9-10 to help them recover from pandemic-related learning gaps.\r\n???? School Supplies – Providing notebooks, textbooks, uniforms, and other essentials so every child has the tools they need to learn.\r\n????️ Extracurricular Activities – Organizing summer camps, field trips, and annual events to foster holistic development.\r\n????‍???? Teacher Support – Equipping educators with training and resources to improve teaching effectiveness.\r\n\r\nWith ₹5,00,000, we can make a significant impact on these young lives. Every donation, no matter the size, brings us closer to ensuring quality education for all. Please support this cause and help us shape a brighter future!', '2025-03-23 11:46:30', 13494.00),
(44, 12, 'Urgent Help Needed: My Husband\'s Emergency Surgery', 'Family', 'manoj', 38, 'mumbai', '9878767895', 1, 800000.00, 30, '/uploads/campaigns/campaign-1742795510896-439950745.jpg', 'Dear friends and kind-hearted supporters,\r\n\r\nI am reaching out with a heavy heart as my husband has met with a severe accident and is in critical condition. He has suffered multiple injuries and requires an urgent life-saving surgery that will cost between ₹8 to ₹10 lakhs. We are devastated and struggling to arrange the required funds on such short notice. Every second counts, and we need your support to save his life. Please help us by donating whatever you can and sharing this with others. Your kindness and generosity can make a difference in bringing him back to us.\r\n\r\nPlease contribute and pray for his recovery. ????', '2025-03-24 05:51:50', 1503.00);

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `category_id` int(11) NOT NULL,
  `category_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`category_id`, `category_name`) VALUES
(6, 'Animals'),
(10, 'Arts and Media'),
(5, 'Children'),
(8, 'Community'),
(27, 'Creative Projects'),
(16, 'Disaster Relief'),
(3, 'Education'),
(9, 'Elderly'),
(4, 'Emergencies'),
(13, 'Environment'),
(22, 'Health & Wellness'),
(24, 'Housing & Homelessness'),
(18, 'Human Rights'),
(29, 'Infrastructure Development'),
(26, 'Legal Aid'),
(1, 'Medical'),
(2, 'Memorials'),
(23, 'Mental Health'),
(15, 'Others'),
(25, 'Refugee Support'),
(17, 'Religious Causes'),
(14, 'Rural Development'),
(28, 'Scholarships & Grants'),
(21, 'Scientific Research'),
(19, 'Social Justice'),
(7, 'Sports'),
(20, 'Startups & Small Businesses'),
(12, 'Technology'),
(30, 'Water & Sanitation'),
(11, 'Women');

-- --------------------------------------------------------

--
-- Table structure for table `donations`
--

CREATE TABLE `donations` (
  `id` int(11) NOT NULL,
  `campaign_id` int(11) DEFAULT NULL,
  `donor_id` int(11) DEFAULT NULL,
  `amount` decimal(10,2) NOT NULL,
  `donated_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `note` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `donations`
--

INSERT INTO `donations` (`id`, `campaign_id`, `donor_id`, `amount`, `donated_date`, `note`) VALUES
(2, 44, 13, 500.00, '2025-04-23 06:03:15', 'my contribution'),
(5, 42, 12, 40000.00, '2025-04-23 06:40:14', 'get well soon'),
(6, 43, 12, 4444.00, '2025-04-23 06:47:06', ''),
(7, 42, 12, 555.00, '2025-04-23 06:48:17', ''),
(8, 42, 13, 9000.00, '2025-04-23 08:27:40', ''),
(9, 44, 13, 3.00, '2025-04-23 09:17:19', ''),
(10, 42, 13, 4.00, '2025-04-23 09:22:21', ''),
(11, 43, 13, 5000.00, '2025-04-24 09:13:21', ''),
(12, 43, 13, 4000.00, '2025-04-24 09:17:45', ''),
(13, 43, 13, 50.00, '2025-04-24 09:19:01', '');

-- --------------------------------------------------------

--
-- Table structure for table `feedback`
--

CREATE TABLE `feedback` (
  `feedback_id` int(11) NOT NULL,
  `content` text NOT NULL,
  `user_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `feedback`
--

INSERT INTO `feedback` (`feedback_id`, `content`, `user_id`) VALUES
(11, 'The Aineta aryballos is an Ancient Greek aryballos (a small, spherical flask or vase), made between approximately 625 and 570 BCE in the city of Corinth in southern Greece. Approximately 6.35 centimetres (2.50 in) in both height and diameter, it was intended to contain perfumed oil or unguent, and is likely to have been owned by a high-class courtesan (hetaira) by the name of Aineta. ', 13),
(12, 'REALLY NICE,IT HELPED TO RAISE MONEY FOR MY MOTHER', 12),
(13, 'good website, helped a lot', 12);

-- --------------------------------------------------------

--
-- Table structure for table `updates`
--

CREATE TABLE `updates` (
  `id` int(11) NOT NULL,
  `title` varchar(50) NOT NULL,
  `campaign_id` int(11) NOT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp(),
  `note` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `updates`
--

INSERT INTO `updates` (`id`, `title`, `campaign_id`, `date`, `note`) VALUES
(3, '', 41, '2025-03-23 11:34:34', 'is '),
(4, '', 44, '2025-03-25 08:51:14', 'he is doing well\n'),
(5, '', 44, '2025-03-25 09:14:54', 'okay. he is good'),
(6, '', 44, '2025-03-25 09:36:31', 'oops'),
(7, '', 42, '2025-03-26 09:57:50', 'good');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(100) NOT NULL,
  `name` varchar(100) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phone_number` varchar(15) NOT NULL,
  `pan_name` varchar(50) NOT NULL,
  `pan_number` varchar(10) DEFAULT NULL,
  `address` text NOT NULL,
  `country` varchar(25) NOT NULL,
  `state` varchar(15) NOT NULL,
  `city` varchar(25) NOT NULL,
  `pincode` varchar(10) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `profile_pic` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `name`, `last_name`, `password`, `phone_number`, `pan_name`, `pan_number`, `address`, `country`, `state`, `city`, `pincode`, `created_at`, `profile_pic`) VALUES
(12, 'aditya123@gmail.com', 'aditya', '', '$2a$10$qih2gjU3aXpLuEd2Kn0ygOFPGS73XPXrNM3T16JOabgbAGexty/g6', '', '', '', '', '', '', '', '', '2025-03-18 05:18:25', '/uploads/profile/12.jpg'),
(13, 'vra@gmail.com', 'vradhika', '', '$2a$10$nWAzELecT/juVVTak2qFH.WdeyxIShpwQQAM8S2kEBv9vw5qce4.2', '', 'vradhika   MK', '989899', 'near jagatha nivas manglore', 'India', 'karnataka', 'manglore', '575019', '2025-03-19 05:20:37', '/uploads/profile/13.jpg'),
(14, 'mansi@gmail.com', 'mansi', '', '$2a$10$6SPSfTk0u3LLCXMIZAJISuptjiJg7Jyu8wkvWA2pPaeicHsESWfMK', '', '', NULL, '', '', '', '', '', '2025-03-23 11:29:12', NULL),
(15, 'dddd@gmail.com', 'd', '', '$2a$10$5rTHfXp3Io6XQta7k6tVH.fJAHj900hcShnIQlfJ/jlyOlNWV4Tva', '', '', NULL, '', '', '', '', '', '2025-04-05 12:37:41', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `campaign`
--
ALTER TABLE `campaign`
  ADD PRIMARY KEY (`campaign_id`),
  ADD KEY `fk_campaign_user` (`user_id`),
  ADD KEY `fk_campaign_category` (`category_id`);

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`category_id`),
  ADD UNIQUE KEY `category_name` (`category_name`);

--
-- Indexes for table `donations`
--
ALTER TABLE `donations`
  ADD PRIMARY KEY (`id`),
  ADD KEY `campaign_id` (`campaign_id`),
  ADD KEY `donor_id` (`donor_id`);

--
-- Indexes for table `feedback`
--
ALTER TABLE `feedback`
  ADD PRIMARY KEY (`feedback_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `updates`
--
ALTER TABLE `updates`
  ADD PRIMARY KEY (`id`),
  ADD KEY `campaign_id` (`campaign_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `pan_number` (`pan_number`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `campaign`
--
ALTER TABLE `campaign`
  MODIFY `campaign_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `category_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `donations`
--
ALTER TABLE `donations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `feedback`
--
ALTER TABLE `feedback`
  MODIFY `feedback_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `updates`
--
ALTER TABLE `updates`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `campaign`
--
ALTER TABLE `campaign`
  ADD CONSTRAINT `fk_campaign_category` FOREIGN KEY (`category_id`) REFERENCES `category` (`category_id`),
  ADD CONSTRAINT `fk_campaign_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `donations`
--
ALTER TABLE `donations`
  ADD CONSTRAINT `donations_ibfk_1` FOREIGN KEY (`campaign_id`) REFERENCES `campaign` (`campaign_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `donations_ibfk_2` FOREIGN KEY (`donor_id`) REFERENCES `users` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `feedback`
--
ALTER TABLE `feedback`
  ADD CONSTRAINT `feedback_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `updates`
--
ALTER TABLE `updates`
  ADD CONSTRAINT `updates_ibfk_1` FOREIGN KEY (`campaign_id`) REFERENCES `campaign` (`campaign_id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

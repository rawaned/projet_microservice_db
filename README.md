# projet_microservice_db


Database model : 
CREATE TABLE `actor` (
  `id` int(10) NOT NULL,
  `name` varchar(30) NOT NULL,
  `description` varchar(30) NOT NULL
)
CREATE TABLE `video` (
  `id` int(10) NOT NULL,
  `title` varchar(30) NOT NULL,
  `description` varchar(30) NOT NULL
)
INSERT INTO `video` (`id`, `title`, `description`) VALUES
(1, 'youtube video', 'nice video'),
(2, 'facebook video', 'relly nice video');
COMMIT;

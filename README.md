# projet_microservice_db

** how to start ** 
// to start the project you have to download the node models using this command : 
- npm install



// create the sql data base using this db schema : 

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


// lunch the micro services and the GraphQL server using these commands : 

- node videoMicroservice.ts
- node actorMicroservice.ts
- node apiGateway.ts 



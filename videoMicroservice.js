// videoMicroservice.js
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
//database configuration 
const mysql = require('mysql');
const dbConfig = {
    host: '127.0.0.1',
    user: 'root',   
    password: '',
    database: 'microservice',
  };
  const pool = mysql.createPool(dbConfig);
// Charger le fichier video.proto
const videoProtoPath = 'video.proto';
const videoProtoDefinition = protoLoader.loadSync(videoProtoPath, {
 keepCase: true,
 longs: String,
 enums: String,
 defaults: true,
 oneofs: true,
});
const videoProto = grpc.loadPackageDefinition(videoProtoDefinition).video;
// Implémenter le service video
const videoService = {
    getVideo: (call, callback) => {
       
        const query = 'SELECT * FROM video ';
      
        pool.getConnection((err, connection) => {
          if (err) {
            console.error('Failed to get database connection:', err);
            callback(err);
            return;
          }
      
          connection.query(query, (error, results) => {
            connection.release();
      
            if (error) {
              console.error('Failed to retrieve video from database:', error);
              callback(error);
              return;
            }
      
            if (results.length === 0) {
              const errorMessage = `Video  not found`;
              console.error(errorMessage);
              callback(new Error(errorMessage));
              return;
            }
      
            const video = results;
            callback(null, { video });
          });
        });
      },
      searchVideo: (call, callback) => {
        const { query } = call.request;
        const searchQuery = '%' + query + '%';
        const searchVideosQuery = 'SELECT * FROM video WHERE title LIKE ? OR description LIKE ?';
      
        pool.getConnection((err, connection) => {
          if (err) {
            console.error('Failed to get database connection:', err);
            callback(err);
            return;
          }
      
          connection.query(searchVideosQuery, [searchQuery, searchQuery], (error, results) => {
            connection.release();
      
            if (error) {
              console.error('Failed to search videos in database:', error);
              callback(error);
              return;
            }
      
            const videos = results;
            callback(null, { videos });
          });
        });
      },
 // Ajouter d'autres méthodes au besoin
};
// Créer et démarrer le serveur gRPC
const server = new grpc.Server();
server.addService(videoProto.VideoService.service, videoService);
const port = 50051;
server.bindAsync(`0.0.0.0:${port}`, grpc.ServerCredentials.createInsecure(), (err, port) => {
    if (err) {
      console.error('Échec de la liaison du serveur:', err);
      return;
    }
    console.log(`Le serveur s'exécute sur le port ${port}`);
    server.start();
  });
console.log(`Microservice de videos en cours d'exécution sur le port ${port}`);
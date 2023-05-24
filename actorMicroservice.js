// actorMicroservice.js
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
// Charger le fichier actor.proto
const actorProtoPath = 'actor.proto';
const actorProtoDefinition = protoLoader.loadSync(actorProtoPath, {
 keepCase: true,
 longs: String,
 enums: String,
 defaults: true,
 oneofs: true,
});
const actorProto = grpc.loadPackageDefinition(actorProtoDefinition).actor;
// Implémenter le service de séries TV
const actorService = {
 getActor: (call, callback) => {
 // Récupérer les détails de la série TV à partir de la base de données
 const tv_show = {
 id: call.request.actor_id,
 title: 'Exemple de série TV',
 description: 'Ceci est un exemple de série TV.',
 // Ajouter d'autres champs de données pour la série TV au besoin
 };
 callback(null, { actor });
 },
 searchActors: (call, callback) => {
 const { query } = call.request;
 // Effectuer une recherche de actoren fonction de la requête
 const actors = [
 {
 id: '1',
 title: 'Exemple de l acteur 1',
 description: 'Ceci est le premier exemple d acteur.',
 },
 {
 id: '2',
 title: 'Exemple de acteur 2',
 description: 'Ceci est le deuxième exemple de acteur.',
 },
 // Ajouter d'autres résultats de recherche de actor au besoin
 ];
 callback(null, { actors });
 },
 // Ajouter d'autres méthodes au besoin
};
// Créer et démarrer le serveur gRPC
const server = new grpc.Server();
server.addService(actorProto.ActorService.service, actorService);
const port = 50052;
server.bindAsync(`0.0.0.0:${port}`, grpc.ServerCredentials.createInsecure(),
(err, port) => {
 if (err) {
 console.error('Échec de la liaison du serveur:', err);
 return;
 }
 console.log(`Le serveur s'exécute sur le port ${port}`);
 server.start();
});
console.log(`Microservice de actor en cours d'exécution sur le port
${port}`);
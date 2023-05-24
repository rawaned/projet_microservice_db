// resolvers.js
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
// Charger les fichiers proto pour les films et les séries TV
const videoProtoPath = 'video.proto';
const actorProtoPath = 'actor.proto';
const videoProtoDefinition = protoLoader.loadSync(videoProtoPath, {
 keepCase: true,
 longs: String,
 enums: String,
 defaults: true,
 oneofs: true,
});
const actorProtoDefinition = protoLoader.loadSync(actorProtoPath, {
 keepCase: true,
 longs: String,
 enums: String,
 defaults: true,
 oneofs: true,
});
const videoProto = grpc.loadPackageDefinition(videoProtoDefinition).video;
const actorProto = grpc.loadPackageDefinition(actorProtoDefinition).actor;
// Définir les résolveurs pour les requêtes GraphQL
const resolvers = {
 Query: {
 video: (_, { id }) => {
 // Effectuer un appel gRPC au microservice de films
 const client = new videoProto.VideoService('localhost:50051',
grpc.credentials.createInsecure());
 return new Promise((resolve, reject) => {
 client.searchVideo({ videoId: id }, (err, response) => {
 if (err) {
 reject(err);
 } else {
 resolve(response.video);
 }
 });
 });
 },
 videos: () => {
 // Effectuer un appel gRPC au microservice de video
 const client = new videoProto.VideoService('localhost:50051',
grpc.credentials.createInsecure());
 return new Promise((resolve, reject) => {
 client.getVideos({}, (err, response) => {
 if (err) {
 reject(err);
 } else {
 resolve(response.videos);
 }
 });
 });
 }, 
 actor: (_, { id }) => {
    // Effectuer un appel gRPC au microservice de acteur
    const client = new actorProto.ActorService('localhost:50052',
   grpc.credentials.createInsecure());
    return new Promise((resolve, reject) => {
    client.getActors({ actorId: id }, (err, response) => {
    if (err) {
    reject(err);
    } else {
    resolve(response.actor);
    }
    });
    });
    },
    actors: () => {
    // Effectuer un appel gRPC au microservice de acteur
    const client = new actorProto.ActorService('localhost:50052',
   grpc.credentials.createInsecure());
    return new Promise((resolve, reject) => {
    client.searchActors({}, (err, response) => {
    if (err) {
    reject(err);
    } else {
    resolve(response.actors);
    }
    });
    });
    },
    },
   };
   module.exports = resolvers;
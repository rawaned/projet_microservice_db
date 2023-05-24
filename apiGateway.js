// apiGateway.js
const express = require('express');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require ('@apollo/server/express4');
const bodyParser = require('body-parser');
const cors = require('cors');
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
// Charger les fichiers proto pour les films et les séries TV
const videoProtoPath = 'video.proto';
const actorProtoPath = 'actor.proto';
const resolvers = require('./resolvers');
const typeDefs = require('./schema');
// Créer une nouvelle application Express
const app = express();
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
// Créer une instance ApolloServer avec le schéma et les résolveurs importés
const server = new ApolloServer({ typeDefs, resolvers });
// Appliquer le middleware ApolloServer à l'application Express
server.start().then(() => {
 app.use(
 cors(),
 bodyParser.json(),
 expressMiddleware(server),
 );
});
app.get('/videos', (req, res) => {
    const client = new videoProto.VideoService('localhost:50051',
   grpc.credentials.createInsecure());
    client.getVideo({}, (err, response) => {
    if (err) {
    res.status(500).send(err);
    } else {
    res.json(response.videos);
    }
    });
   });
   app.get('/videos/:id', (req, res) => {
    const client = new videoProto.VideoService('localhost:50051',
   grpc.credentials.createInsecure());
    const id = req.params.id;
    client.searchVideo({ videoId: id }, (err, response) => {
    if (err) {
    res.status(500).send(err);
    } else {
    res.json(response.video);
    }
    });
   });
   app.get('/actors', (req, res) => {
    const client = new actorProto.TVShowService('localhost:50052',
   grpc.credentials.createInsecure());
    client.searchActors({}, (err, response) => {
    if (err) {
    res.status(500).send(err);
    } else {
    res.json(response.tv_shows);
    }
    });
   });
   app.get('/Actors/:id', (req, res) => {
    const client = new actorProto.ActorsService('localhost:50052',
   grpc.credentials.createInsecure());
    const id = req.params.id;
    client.getActor({ actorId: id }, (err, response) => {
    if (err) {
    res.status(500).send(err);
    } else {
    res.json(response.tv_show);
    }
    });
   });
   // Démarrer l'application Express
   const port = 3000;
   app.listen(port, () => {
    console.log(`API Gateway en cours d'exécution sur le port ${port}`);
   });
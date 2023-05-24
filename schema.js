const { gql } = require('@apollo/server');
// Définir le schéma GraphQL
const typeDefs = `#graphql
 type Video {
 id: String!
 title: String!
 description: String!
 }
 type Actor {
 id: String!
 name: String!
 description: String!
 }
 type Query {
 video(id: String!): Video
 videos: [Video]
 actor(id: String!): Actor
 actors: [Actor]
 }
 type Query {
    getVideo(id: String!): Video
    searchVideos(query: String!): [Video]
  }


`;
module.exports = typeDefs
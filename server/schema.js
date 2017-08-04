// define the types and graphql queries for our api

import { makeExecutableSchema } from 'graphql-tools';
import resolvers                from './resolvers';

const schema = `
type Movie {
  movieId: String
  title: String
  released: Int
  tagline: String
  actors: [Actor]
  directors: [Director]
}
type Person {
  name: ID!
  born: Int
  movies: [Movie]
}
type Actor {
  name: ID!
  born: Int
  movies: [Movie]
}
type Director {
  name: ID!
  born: Int
  movies: [Movie]
}

type Query {
  movies(subString: String!, limit: Int!): [Movie]
}

schema {
  query: Query
}
`;

export default makeExecutableSchema({
  typeDefs: schema,
  resolvers,
});

const { ApolloServer } = require('apollo-server');
const gql = require('graphql-tag');
const mongoose = require('mongoose');

const Post = require('./models/Post');
const { MONGODB } = require('./config.js');

const typeDefs = gql`
  type Post {
    id: ID! # exclamation mark to make it a required field
    body: String!
    createdAt: String!
    username: String!
  }
  type Query {
    getPosts: [Post]
  }
`;

const resolvers = { // create a resolver for each query/mutation/subscription
  Query: {
    async getPosts() {
      try {
        const posts = await Post.find();
        return posts;
      } catch (err) {
        throw new Error(err);
      }
    }
  }
};

const server = new ApolloServer({  // set up apollo server
  typeDefs,
  resolvers
});

mongoose
  .connect(MONGODB, { useNewUrlParser: true }) // start mongodb then return promise to start server on port
  .then(() => {
    console.log('MongoDB Connected');
    return server.listen({ port: 5000 });  // start server on port then return promise of console.log
  })
  .then((res) => {
    console.log(`Server running at ${res.url}`);
  });
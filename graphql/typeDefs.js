const { gql } = require('apollo-server');

module.exports = gql`
  type Post {
    id: ID!
    body: String!
    createdAt: String!
    username: String!
    comments: [Comment]!
    likes: [Like]!
    likeCount: Int!
    commentCount: Int!
  }
  type Comment {
    id: ID!
    createdAt: String!
    username: String!
    body: String!
  }
  type Like {
    id: ID!
    createdAt: String!
    username: String!
  }
  type User {
    id: ID!
    email: String!
    token: String!
    username: String!
    createdAt: String!
  }
  input RegisterInput {
    username: String!
    password: String!
    confirmPassword: String!
    email: String!
  }
  type Query {  # to query data from db - read
    getPosts: [Post]
    getPost(postId: ID!): Post # post has to have an id value: !=required
  }
  type Mutation { # mutations - specify actions to change the data - create, update, delete
    register(registerInput: RegisterInput): User!  # return user being registered
    login(username: String!, password: String!): User!
    createPost(body: String!): Post! # return post being created
    deletePost(postId: ID!): String!
    createComment(postId: String!, body: String!): Post! # return post being commented on
    deleteComment(postId: ID!, commentId: ID!): Post!
    likePost(postId: ID!): Post!
  }
  type Subscription {
    newPost: Post!
  }
`;
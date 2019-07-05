const {
  makeExecutableSchema
} = require('graphql-tools')
const resolvers = require('./resolvers')

// Define our schema using the GraphQL schema language
const typeDefs = `
 type User {
   id: Int!
   username: String!
   email: String!
 }

 type Todo {
  userId: ID!
  title: String!
}

 type Query {
   me: User
   myTodos: [Todo]
 }

 type Mutation {
   signup (username: String!, email: String!, password: String!): String
   login (email: String!, password: String!): String
   addTodo(title: String!): Todo
   addLocation(location: String!)
   addSocialNetwork(facebook: String, youtube: String, twitter: String, bandcamp: String)
 }
`
module.exports = makeExecutableSchema({
  typeDefs,
  resolvers
})
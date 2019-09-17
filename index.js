// import { GraphQLServer } from 'graphql-yoga'
// ... or using `require()`
const { GraphQLServer } = require('graphql-yoga')
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/TodoGraphQL', {useNewUrlParser: true,useUnifiedTopology: true},() => {
    console.log("mongodb running");
    
}
);


const typeDefs = `
  type Query {
    hello(name: String): String!
  }
`

const resolvers = {
  Query: {
    hello: (_, { name }) => `Hello ${name || 'World'}`, //string litteral
    hello: (name) => "hello world", //string litteral

  },
}

const server = new GraphQLServer({ typeDefs, resolvers })
server.start(() => console.log('Server is running on localhost:4000'))
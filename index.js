// import { GraphQLServer } from 'graphql-yoga'
// ... or using `require()`
const { GraphQLServer } = require('graphql-yoga')
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/TodoGraphQL', {useNewUrlParser: true,useUnifiedTopology: true},() => {
    console.log("mongodb running");

    
}
);
var Todo = mongoose.model('Todo', {
    text:String,
    completed:Boolean

});



const typeDefs = `
type Todo {
    id:ID!
    text: String!
    completed:Boolean!           
  }
  type Query {
    hello(name: String): String!
    todos: [Todo]
   findTodo(id:ID):Todo

    

  }

  type Mutation {
    createTodo(text:String): Todo
    updateTodo(text:String,completed:Boolean,id:ID): String
    deleteTodo(id:ID): String


  }
`

const resolvers = {
  Query: {
    hello: (_, { name }) => `Hello ${name || 'World'}`,          
    hello: (name) => "hello world",             //string litteral
    todos:() => Todo.find(),
    findTodo: async (_, {id}) => {

       return await Todo.findById(id)
        // return true
    },   

        
    

  },
  Mutation: {
    createTodo: async (_, { text }) => {
        const todo=new Todo({text,completed:false}) 
        await todo.save()
        return todo
    }, 
    updateTodo: async (_, {id,text,completed }) => {

        await Todo.findByIdAndUpdate(id,{text,completed})
        return true
    },   
    deleteTodo: async (_,{id}) => {

        await Todo.findByIdAndDelete(id)
        return true
    },               
        

  },
}

const server = new GraphQLServer({ typeDefs, resolvers })
server.start(() => console.log('Server is running on localhost:4000'))
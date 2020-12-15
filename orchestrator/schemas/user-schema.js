const axios = require("axios")
const { ApolloServer, gql } = require("apollo-server");


// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
  
  type User {
    _id: ID,
    name: String
    username: String,
    password: String,
    address: String,
    birthdate: String
  }
  type Token {
      access_token: String
  }

  input InputUser {
    name: String,
    username: String,
    password: String,
    address: String,
    birthdate: String
  }
  input loginUser {
      username: String,
      password: String
  }

  extend type Query {
    getUsers(access_token: String): [User],
    getUser(_id: ID, access_token: String): User,
  }


  extend type Mutation {
      registerUser(newUser: InputUser): User,
      loginUser(user: loginUser ): Token,
      delUser(_id: ID, access_token: String): String,
      updateUser(_id: ID, newPolicy: InputPolicy, access_token: String): Policy,
  }

`;
const resolvers = {
    Query: {
        getUsers: async (parents,args, context, info) => {
            const {data} = await axios({method:'GET',url:`http://localhost:3000/users`})
            return data  
        }
    },
    Mutation: {
        registerUser: async (parents,args, context, info) => {
            const {newUser} = args
            const {data} = await axios({method: 'post',url:"http://localhost:3000/register", data: newUser})  
            return data        
        },
        loginUser: async (parents,args, context, info) => {
            const {user} = args
            const {data} = await axios({method: 'POST', url: 'http://localhost:3000/login', data: user})
            return data
        },
        delUser: async (parents,args, context, info) => {
            const {_id,access_token} = args
            console.log(_id)
            axios({method: 'delete',url:`http://localhost:3001/policy/${_id}`,headers: {access_token}})
            .then(res => {
                console.log("?????")
                return `success to delete`
            })
            .catch(err => {
                return err
            })
        },
        updateUser: async (parents,args, context, info) => {
          const {_id, newPolicy} = args
          const {data} = await axios.put(`http://localhost:3001/policies/${_id}`,newPolicy)
          return data
        }
        //---------------------------------------------------------------------------------------------
    }
}


module.exports = {typeDefs, resolvers}
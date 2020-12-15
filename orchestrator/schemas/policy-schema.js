const axios = require("axios")
const { ApolloServer, gql } = require("apollo-server");


// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
  
  type Policy {
    _id: ID,
    name: String
    userId: String
  }

  input InputPolicy {
    name: String
  }
  type Message {
      message: String
  }

  extend type Query {
    getPolicies(access_token: String): [Policy],
    getPolicy(_id: ID, access_token: String): Policy,
    
  }


  extend type Mutation {
      postPolicy(newPolicy: InputPolicy, access_token: String): Policy,
      delPolicy(_id: ID, access_token: String): Message,
      updatePolicy(_id: ID, access_token: String, newPolicy: InputPolicy): Policy,
  }

`;
const resolvers = {
    Query: {
        getPolicies: async (parents,args, context, info) => {
            const {access_token} = args
            const {data} = await axios({method:'GET',url:`http://localhost:3001/policies`,headers: {access_token}})
            return data  
        },
        getPolicy: async (parents,args, context, info) => {
            const {_id, access_token} = await args
              const {data} = await axios({method:'GET',url:`http://localhost:3001/policies/${_id}`,headers: {access_token}})
              return data
        }
    },
    Mutation: {
        postPolicy: async (parents,args, context, info) => {
            const {newPolicy, access_token} = args
            const {data} = await axios({method: 'post',url:"http://localhost:3001/policies", data: newPolicy, headers: {access_token}})  
            return data        
        },
        delPolicy: async (parents,args, context, info) => {
            const {_id,access_token} = args
            console.log(_id)
            const {data} = await axios({method: 'delete',url:`http://localhost:3001/policy/${_id}`,headers: {access_token}})
            return data
        },
        updatePolicy: async (parents,args, context, info) => {
          const {_id, newPolicy, access_token} = args
          const {data} = await axios({method: 'PUT',url:`http://localhost:3001/policy/${_id}`, data: newPolicy, headers: {access_token}})
          return data
        }
        //---------------------------------------------------------------------------------------------
    }
}


module.exports = {typeDefs, resolvers}
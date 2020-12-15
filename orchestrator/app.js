const policySchema = require('./schemas/policy-schema')
const userSchema = require('./schemas/user-schema')

const { ApolloServer, gql, makeExecutableSchema } = require("apollo-server");

const typeDefs = gql`
  type Query,
  type Mutation
`;
const schema = makeExecutableSchema({
  typeDefs: [typeDefs, policySchema.typeDefs,userSchema.typeDefs],
  resolvers: [policySchema.resolvers,userSchema.resolvers]
})

const server = new ApolloServer({schema});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
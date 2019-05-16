const makeExecutableSchema = require('graphql-tools').makeExecutableSchema
const importSchema = require('graphql-import').importSchema

const resolvers = require('./resolvers').resolvers
const typeDefs = importSchema('./schema.graphql')

exports.schema = makeExecutableSchema({
	typeDefs,
	resolvers,
})
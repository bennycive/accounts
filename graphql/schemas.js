// graphql/schema.js

const { GraphQLObjectType, GraphQLSchema, GraphQLString, GraphQLInt } = require('graphql');
const UserPostgres = require('../models/UserPostgres');
const UserMySQL = require('../models/UserMySQL');

// Define User Type for PostgreSQL
const UserPostgresType = new GraphQLObjectType({
    name: 'UserPostgres',
    fields: () => ({
        id: { type: GraphQLInt },
        username: { type: GraphQLString },
        email: { type: GraphQLString },
    }),
});

// Define User Type for MySQL
const UserMySQLType = new GraphQLObjectType({
    name: 'UserMySQL',
    fields: () => ({
        id: { type: GraphQLInt },
        username: { type: GraphQLString },
        email: { type: GraphQLString },
    }),
});

// Root Query
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        userPostgres: {
            type: UserPostgresType,
            args: { id: { type: GraphQLInt } },
            resolve(parent, args) {
                return UserPostgres.findByPk(args.id);  // Fetch user from PostgreSQL
            },
        },
        userMySQL: {
            type: UserMySQLType,
            args: { id: { type: GraphQLInt } },
            resolve(parent, args) {
                return UserMySQL.findByPk(args.id);  // Fetch user from MySQL
            },
        },
    },
});

// Mutation to create user
const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addUserPostgres: {
            type: UserPostgresType,
            args: {
                username: { type: GraphQLString },
                email: { type: GraphQLString },
            },
            resolve(parent, args) {
                return UserPostgres.create({ username: args.username, email: args.email }); // Create user in PostgreSQL
            },
        },
        addUserMySQL: {
            type: UserMySQLType,
            args: {
                username: { type: GraphQLString },
                email: { type: GraphQLString },
            },
            resolve(parent, args) {
                return UserMySQL.create({ username: args.username, email: args.email }); // Create user in MySQL
            },
        },
    },
});

// Export schema
module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation,
});

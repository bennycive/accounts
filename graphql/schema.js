const { GraphQLObjectType, GraphQLSchema, GraphQLString, GraphQLInt } = require('graphql');
const User = require('../models/User'); // General User model
const Department = require('../models/Department');
const Role = require('../models/Role'); 
const User = require('../models/User');
const Department = require('../models/Department');
const Role = require('../models/Role');
const Permission = require('../models/Permission');
const UserGroup = require('../models/UserGroup');
const UserPermission = require('../models/UserPermission');
const GroupPermission = require('../models/GroupPermission');



// Define User Type
const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: GraphQLInt },
        username: { type: GraphQLString },
        email: { type: GraphQLString },
        // Include other fields as necessary
    }),
});

// Root Query
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        user: {
            type: UserType,
            args: { id: { type: GraphQLInt } },
            resolve(parent, args) {
                return User.findByPk(args.id); // Fetch user
            },
        },
    },
});

// Mutation to create user
const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addUser: {
            type: UserType,
            args: {
                username: { type: GraphQLString },
                email: { type: GraphQLString },
                databaseType: { type: GraphQLString }, // Optional: Specify which database
            },
            resolve(parent, args) {
                if (args.databaseType === 'postgres') {
                    // Logic for adding user to PostgreSQL
                    return User.create({ username: args.username, email: args.email }); // Adjust as needed
                } else if (args.databaseType === 'mysql') {
                    // Logic for adding user to MySQL
                    return User.create({ username: args.username, email: args.email }); // Adjust as needed
                }
                throw new Error("Invalid database type");
            },
        },
    },
});

// Export schema
module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation,
});

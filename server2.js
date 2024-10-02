const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const sequelize = require('./config/database'); // Import your sequelize instance

const app = express();

// Import your models
const User = require('./models/User');
const Department = require('./models/Department');
const Role = require('./models/Role');
const Permission = require('./models/Permission');
const UserGroup = require('./models/UserGroup');
const UserPermission = require('./models/UserPermission');
const GroupPermission = require('./models/GroupPermission');
const DepartmentPermission = require('./models/DepartmentPermission'); // Adjust the path if necessary

// Import GraphQL schema and resolvers
const schema = require('./graphql/schema'); // Adjust the path to your GraphQL schema file

// Define associations
Department.hasMany(DepartmentPermission, {
  foreignKey: 'departmentId',
  as: 'departmentPermissions', // Alias for the association
});

DepartmentPermission.belongsTo(Department, {
  foreignKey: 'departmentId',
  as: 'department', // Alias for the association
});

Permission.hasMany(DepartmentPermission, {
  foreignKey: 'permissionId',
  as: 'departmentPermissions', // Alias for the association
});

DepartmentPermission.belongsTo(Permission, {
  foreignKey: 'permissionId',
  as: 'permission', // Alias for the association
});

// Sync all models with the database
const syncModels = async () => {
  try {
    await sequelize.sync({ alter: true }); // Use { alter: true } to modify existing tables
    console.log('\x1b[32mAll models were synchronized successfully.\x1b[0m'); // Print in green
  } catch (error) {
    console.error('Error synchronizing models:', error);
  }
};

// Set up GraphQL endpoint
app.use('/graphql', graphqlHTTP({
  schema: schema, // Use your GraphQL schema
  graphiql: true, // Enable GraphiQL UI for testing
}));

// Start the server and sync models
app.listen(4000, () => {
  console.log('Server is running on http://localhost:4000');
  syncModels(); // Sync models when the server starts
});



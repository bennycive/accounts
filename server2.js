const express = require('express');
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

// Sync all models with the database
const syncModels = async () => {
  try {
    await sequelize.sync({ force: false }); // Use { force: true } to drop existing tables and recreate them
    console.log('All models were synchronized successfully.');
  } catch (error) {
    console.error('Error synchronizing models:', error);
  }
};

syncModels();

app.listen(4000, () => {
  console.log('Server is running on http://localhost:4000');
});

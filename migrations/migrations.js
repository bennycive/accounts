// migrations/migration.js
const { sequelize, createMySQLDatabase } = require('../config/database');

const User = require('../models/User'); 
const Department = require('../models/Department');
const Role = require('../models/Role'); 
const UserGroup = require('../models/UserGroup');
const UserPermission = require('../models/UserPermission');
const GroupPermission = require('../models/GroupPermission');
const Permission = require('../models/Permission');
const DepartmentPermission = require('../models/DepartmentPermission');

const runMigrations = async () => {
    try {
        // Ensure the database is created
        await createMySQLDatabase();
        // Authenticate the connection
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        
        // Sync the models (this will create the tables defined in your models)
        await sequelize.sync({ force: false }); // Use force: true to drop tables if they exist
        console.log('Database synchronization (migrations) completed.');

        console.log("All defined models have been synchronized to the database.");

    } catch (error) {
        console.error('Unable to connect to the database:', error.message);
        console.error('Stack trace:', error.stack);
    } finally {
        // Close the Sequelize connection
        await sequelize.close();
    }
};

// Execute the migration process
runMigrations();

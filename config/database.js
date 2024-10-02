// const { Sequelize } = require('sequelize');
// const mysql = require('mysql2/promise');
// require('dotenv').config();

// // Extract database details from the .env file
// const { MYSQL_USER, MYSQL_PASSWORD, MYSQL_DB, MYSQL_HOST } = process.env;

// // Function to create the MySQL database if it doesn't exist
// const createMySQLDatabase = async () => {
//     try {
//         // Establish a connection to MySQL server without specifying the database
//         const connection = await mysql.createConnection({
//             host: MYSQL_HOST,
//             user: MYSQL_USER,
//             password: MYSQL_PASSWORD || '',  // Handle empty password if it's not provided
//         });

//         // Check if the database exists and create it if not
//         await connection.query(`CREATE DATABASE IF NOT EXISTS \`${MYSQL_DB}\`;`);
//         console.log(`Database ${MYSQL_DB} ensured (created if not existed).`);

//         // Close the connection
//         await connection.end();
//     } catch (error) {
//         console.error('Error creating database:', error);
//         throw error;
//     }
// };

// // Create a Sequelize instance to work with the database
// const sequelize = new Sequelize(MYSQL_DB, MYSQL_USER, MYSQL_PASSWORD, {
//     host: MYSQL_HOST,
//     dialect: 'mysql'
// });

// const initializeSequelize = () => {
//     try {
//         console.log(`Connected to the MySQL database: ${MYSQL_DB}`);
//     } catch (error) {
//         console.error('Unable to connect to the database:', error);
//         throw error;
//     }
// };

// module.exports = {
//     sequelize,           // Export the Sequelize instance
//     createMySQLDatabase,
//     initializeSequelize
// };


// config/database.js
require('dotenv').config();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT,
  logging: false, // Set to console.log to see SQL queries
});

// Test the database connection
const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

testConnection();

module.exports = sequelize;

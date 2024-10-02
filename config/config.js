require('dotenv').config();

module.exports = {
    development: {
        username: process.env.MYSQL_USER,       // Use MYSQL_USER instead of MYSQL_USERNAME
        password: process.env.MYSQL_PASSWORD,   // Use MYSQL_PASSWORD
        database: process.env.MYSQL_DB,         // Use MYSQL_DB instead of MYSQL_DB_NAME
        host: process.env.MYSQL_HOST,           // Use MYSQL_HOST
        dialect: 'mysql',
    },
};

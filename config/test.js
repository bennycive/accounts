require('dotenv').config();

console.log("MYSQL_USER:", process.env.MYSQL_USER); // Should print 'root'
console.log("MYSQL_PASSWORD:", process.env.MYSQL_PASSWORD); // Should print your password or ''
console.log("MYSQL_DB:", process.env.MYSQL_DB); // Should print 'contract'
console.log("MYSQL_HOST:", process.env.MYSQL_HOST); // Should print 'localhost'

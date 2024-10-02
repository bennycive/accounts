// Entry point to start the Node.js server

// server.js

const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { postgresDB, mysqlDB } = require('./config/database');
const schema = require('./graphql/schema');

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware for GraphQL
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true,  // Enable GraphiQL for testing the API
}));

// Test database connections
async function testConnections() {
    try {
        await postgresDB.authenticate();
        console.log('PostgreSQL connected successfully.');
    } catch (error) {
        console.error('Unable to connect to PostgreSQL:', error);
    }

    try {
        await mysqlDB.authenticate();
        console.log('MySQL connected successfully.');
    } catch (error) {
        console.error('Unable to connect to MySQL:', error);
    }
}

testConnections();

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}/graphql`);
});

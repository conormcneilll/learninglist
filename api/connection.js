require('dotenv').config({ path: __dirname + '/../.env' }); // This loads environment variables from .env file
const mysql = require('mysql');

// Then we create a MySQL connection linking the API to my database
const connection = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    connectionLimit: 10,
    queueLimit:10,
    port:process.env.DB_PORT,
    multipleStatements: true
});

// connection.connect((err) => {
//     if (err) {
//         console.error('Error connecting to the database:', err.stack);
//         return;
//     }
//     console.log('Connected to the database', connection.threadId);
// });

module.exports = connection;
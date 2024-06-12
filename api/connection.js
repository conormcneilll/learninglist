require('dotenv').config(); // This loads environment variables from .env file
const mysql = require('mysql2');

// Then we create a MySQL connection linking the API to my database
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    connectionLimit: 10,
    queueLimit:10,
    port:process.env.DB_PORT,
    multipleStatements: true
});
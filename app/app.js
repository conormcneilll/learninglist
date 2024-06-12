require('dotenv').config(); // This loads environment variables from .env file
const express = require('express'); // These import the required modules from the node_modules folder
const mysql = require('mysql2');

const app = express(); // This line makes the web server come online 

// Then we create a MySQL connection pool in order for CRUD to take place 
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


pool.getConnection((err, connection) => {
    if (err) {
        console.error('Database connection error:', err);
    } else {
        console.log('Database connected...');
        connection.release();
    }
}); // This tests the databases connection

// Define your routes and other middleware here

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

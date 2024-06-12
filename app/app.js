<<<<<<< HEAD
/// imports
require('dotenv').config();
const express = require("express");
const sessions = require('express-session');
const fs = require('fs');

/// app and ports 
const app = express();
const APP_PORT = process.env.APP_PORT || 3000;

/// their middleware 
app.use(express.static('static'));
app.set('view engine', 'ejs');
app.use(sessions({
    secret: process.env.SESSIONS_SECRET,
    saveUninitialized: false,
    resave: false
    })
);
app.use(express.urlencoded({extended: true})); 

/// my middleware
app.use((req, res, next) => {
    res.locals.query = req.query;
    res.locals.user_id = req.session.user_id;
    res.locals.member = req.session.sess_valid;
    next();
}); /// exposes session to ejs templates
const globalErrHandler = require("./middleware/errorHandler");

/// route handler
const routeFiles = fs.readdirSync('./routes')
    .filter(file => ( file.endsWith('.js') && !file.startsWith('_') ));
for (const file of routeFiles) {
	const route = require(`./routes/${file}`);
    routePath = file.slice(0,-3);
    if (file=='home.js') routePath="";
	app.use(`/${routePath}`, route);
}
// console.log("Routes:", routeFiles);
 
/// more middleware
app.use(globalErrHandler);

/// server
const server = app.listen(APP_PORT, () => {
    console.log(`App started at http://localhost:${server.address().port}/`);
}); 
=======
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
>>>>>>> origin/master

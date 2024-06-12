/// imports
require('dotenv').config();
const express = require("express");
const app = express();
const API_PORT = process.env.API_PORT || 4000;
const fs = require('fs');

// middleware
app.use(express.urlencoded({extended: true}));

/// my middleware
const connection = require("./connection.js");
const globalErrHandler = require("./middleware/errorHandler");

/// database connection
connection.getConnection((err)=>{
    if(err) return console.log(err.message);
    console.log("API Database connection successful.");
});

/// route handler
const routeFiles = fs.readdirSync('./routes')
    .filter(file => ( file.endsWith('.js') && !file.startsWith('_') ));
for (const file of routeFiles) {
	const route = require(`./routes/${file}`);
	app.use(`/${file.slice(0,-3)}`, route);
};
// console.log("Routes:", routeFiles);

/// late middleware
app.use(globalErrHandler);

/// server start
const server = app.listen(API_PORT, () => {
    console.log(`API started at http://localhost:${server.address().port}/`);
});

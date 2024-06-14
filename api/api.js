require('dotenv').config({ path: __dirname + '/../.env' });
const express = require("express");
const sessions = require('express-session');
const app = express();
const API_PORT = process.env.API_PORT || 4000;
const fs = require('fs');

app.use(express.urlencoded({extended: true}));

app.use(sessions({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    })
);

app.use((req, res, next) => {
    res.locals.query = req.query;
    res.locals.user_id = req.session.user_id;
    res.locals.member = req.session.sess_valid;
    next();

}); 

const connection = require("./connection.js");
const globalErrHandler = require("./middleware/errorHandler");

// db connection
connection.getConnection((err)=>{
    if(err) return console.log(err.message);
    console.log("API Database connection successful.");
});

const routeFiles = fs.readdirSync('./routes')
    .filter(file => ( file.endsWith('.js') && !file.startsWith('_') ));
for (const file of routeFiles) {
	const route = require(`./routes/${file}`);
	app.use(`/${file.slice(0,-3)}`, route);
};

app.use(globalErrHandler);

const server = app.listen(API_PORT, () => {
    console.log(`API started at http://localhost:${server.address().port}/`);
});
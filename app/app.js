require('dotenv').config({ path: __dirname + '/../.env' });
const express = require("express");
const sessions = require('express-session');
const fs = require('fs');

 
const app = express();
const APP_PORT = process.env.APP_PORT || 3000;

app.use(express.static('static'));

app.set('view engine', 'ejs');

app.use(express.urlencoded({extended: true})); 
app.use(express.json());

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

const routeFiles = fs.readdirSync('./routes')
    .filter(file => ( file.endsWith('.js') && !file.startsWith('_') ));
for (const file of routeFiles) {
	const route = require(`./routes/${file}`);
    routePath = file.slice(0,-3);
    if (file=='home.js') routePath="";
	app.use(`/${routePath}`, route);
}

const globalErrHandler = require("./middleware/errorHandler");
app.use(globalErrHandler);

const server = app.listen(APP_PORT, () => {
    console.log(`App started at http://localhost:${server.address().port}/`);
}); 
const express = require('express');
const router = express.Router();
const axios = require('axios');

const API_PORT = process.env.API_PORT || 4000;

router.get('/', (req, res, next) => {
  // Attempt to render 'home' EJS template with dynamic data
  res.render('home', {
    title: 'Home Page',
    message: 'This is a message from your backend'
  });
});

module.exports = router;

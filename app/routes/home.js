const express = require('express');
const router = express.Router();
const axios = require('axios');

const API_PORT = process.env.API_PORT || 4000;


router.get('/', (req, res, next) => {
  res.send('Home Page');
});

module.exports = router;

const express = require("express");
const router = express.Router();
const axios = require('axios');

const API_PORT = process.env.API_PORT || 4000;

// Route to render the home page
router.get('/home', async (req, res, next) => {
    try {
        let learninglistsEP = `http://localhost:${API_PORT}/learninglists`;

        // Fetch data from the backend API
        const response = await axios.get(learninglistsEP);
        const learninglistdata = response.data.goodstuff;

        res.render('home', {
            title: 'Learning Lists',
            learninglistdata: learninglistdata  // Ensure variable name matches your EJS template
        });
        
    } catch (err) {

        console.error('Error fetching data:', err);
        next(err); // Pass error to the error handling middleware
    }
});

module.exports = router;

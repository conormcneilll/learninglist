const express = require("express");
const router = express.Router();
const axios = require('axios');

const API_PORT = process.env.API_PORT || 4000;

router.get('/', async (req, res, next) => {
    try {
        if (!req.session.sess_valid) {
            return res.redirect('/login'); // Redirect to login if not logged in
        }

        let user_id = req.session.user_id;
        let learninglistsEP = `http://localhost:${API_PORT}/learninglists`;

        // Fetch data from the backend API
        const response = await axios.get(learninglistsEP, {
            params: { user_id } // Pass user_id as query parameter to filter by user
        });
        
        const learninglistdata = response.data.goodstuff;

        res.render('learninglists', {
            title: 'Learning Lists',
            learninglistdata: learninglistdata  // Ensure variable name matches your EJS template
        });

    } catch (err) {
        console.error('Error fetching data:', err);
        next(err); // Pass error to the error handling middleware
    }
});

module.exports = router;

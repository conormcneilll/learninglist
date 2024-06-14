const express = require("express");
const router = express.Router();
const axios = require('axios');

const API_PORT = process.env.API_PORT || 4000;

// Route to render the home page
router.get('/', async (req, res, next) => {
    try {
        let browsevideosEP = `http://localhost:${API_PORT}/browsevideos`;

        const response = await axios.get(browsevideosEP)
        const browsevideosdata = response.data.goodstuff;

        res.render('browsevideos', {
            title: 'Browse Videos',
            browsevideosdata: browsevideosdata  // variable will go into my EJS template
        });
        
    } catch (err) {
        console.error('Error fetching video data:', err.message);
        console.error(err.stack);
        res.redirect('/?message=videobug'); 
    }
});

module.exports = router;

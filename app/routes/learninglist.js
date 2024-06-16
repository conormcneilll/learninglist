const express = require("express");
const router = express.Router();
const axios = require('axios');

const API_PORT = process.env.API_PORT || 4000;

router.get('/', async (req, res, next) => {

    try {

        let learninglist_id = req.query.id;

        let learninglistEP = `http://localhost:${API_PORT}/learninglist?learninglist_id=${learninglist_id}`;

        
        const response = await axios.get(learninglistEP);
        const learnlist = response.data.goodstuff; 

        res.render('learninglistdetails', {
            title: 'Learning List Details',
            learnlist: learnlist
        });
        
    } catch (err) {
        console.error('Error fetching data:', err);
        next(err); // Pass error to the error handling middleware
    }
});

module.exports = router;

const express = require('express');
const router = express.Router();
const axios = require('axios');

const API_PORT = process.env.API_PORT || 4000;

// GET route to render the form
router.get('/', async (req, res, next) => {
    try {
        let learninglist_id = req.query.id;
        let learninglistEP = `http://localhost:${API_PORT}/learninglist?learninglist_id=${learninglist_id}`;

        const response = await axios.get(learninglistEP);
        const learnlistdata = response.data.goodstuff;

        console.log('Learnlist data:', learnlistdata);
        res.render('addresource', {
            title: 'Add Resource',
            learninglistdata: learnlistdata // Pass learnlistdata to the EJS template
        });

    } catch (err) {
        console.error('Error fetching data:', err);
        next(err); // Pass error to the error handling middleware
    }
});

router.post('/', (req, res) => {

    try {

        let { learnlist_id, title, url, res_type } = req.body;

        const config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        };

        const postdata = { learnlist_id, title, url, res_type };
        console.log(postdata);
        let addresourceEP = `http://localhost:${API_PORT}/addresource`; 

        axios.post(addresourceEP, postdata, config)
        .then((results) => {

            let me = results.data.goodstuff;
            if (results.data.badstuff) console.log(results.data.badstuff);

            if (me) {
                res.redirect('/myprofile?message=resourceadded'); 
            } else {
                res.redirect('/myprofile?message=resourcenotadded'); 
            }
    
        });

    } catch (err) {

        console.log("Error in me POST route:", err.message);
        res.redirect("/?message=resourcebug");

    }

});

module.exports = router;

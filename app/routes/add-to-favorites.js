const express = require("express");
const router = express.Router();
const axios = require('axios');

const API_PORT = process.env.API_PORT || 4000;

router.post('/', (req, res)=> { 

    try {


        let learnlist_id = req.body.learnlist_id;
        let user_id = req.session.user_id;


        const postdata = {learnlist_id, user_id}
        const config = { 
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        };

        let favouriteEP = `http://localhost:${API_PORT}/addfavourite`;

        axios.post(favouriteEP, postdata, config)
        .then((results) => {
            
            let favouritedata = results.data.goodstuff;
            
            if (results.data.badstuff) console.log(results.data.badstuff);
        
            if (favouritedata) {
                res.redirect(`/myprofile?message=faved`);
            } else {
                console.log("Faved route received no data from the API.");
                console.log("Response:", results.data.badstuff);
                res.redirect(`/myprofile?message=nopeeee`);
            };

        });

    } catch (err) {

        console.log("Error in favourited POST route: ", err.message);
        res.redirect(`/myprofile?message=nopeeeeBIGerror`);

    };

});

module.exports = router;
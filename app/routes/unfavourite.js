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

        let favouriteEP = `http://localhost:${API_PORT}/removefavourite`;

        axios.post(favouriteEP, postdata, config)
        .then((results) => {
            
            let unfavouritedata = results.data.goodstuff;
            
            if (results.data.badstuff) console.log(results.data.badstuff);
        
            if (unfavouritedata) {
                res.redirect(`/myprofile?message=unfaved`);
            } else {
                console.log("Faved route received no data from the API.");
                console.log("Response:", results.data.badstuff);
                res.redirect(`/myprofile?message=NODATA`);
            };

        });

    } catch (err) {

        console.log("Error in favourited POST route: ", err.message);
        res.redirect(`/myprofile?message=nopeeeeBIGGerror`);

    };

});

router.post('/', (req, res) => {
    try {
        let { learnlist_id, user_id } = req.body;

        // Query to unfavorite the learnlist
        let unfavoriteQ = `DELETE FROM FavoriteLearnlist WHERE learnlist_id = ? AND user_id = ?;`;

        connection.query(unfavoriteQ, [learnlist_id, user_id], (err, data) => {
            if (err) {
                console.error("Error removing favorite: ", err);
                return res.status(500).json({ badstuff: err });
            }

            if (data.affectedRows > 0) {
                return res.redirect('/myprofile?message=unfavorited');
            } else {
                return res.status(400).json({ badstuff: { apimessage: "Failed to unfavorite or already not favorited." } });
            }
        });
    } catch (err) {
        console.error("Error in unfavorite route: ", err.message);
        return res.status(500).json({ badstuff: err.message });
    }
});


module.exports = router;
const express = require("express");
const router = express.Router();
const axios = require('axios');

const API_PORT = process.env.API_PORT || 4000;

router.post('/', (req, res) => {
    try {
        let from = req.headers.referer;
        let { learnlist_id } = req.body;

        console.log("Learnlist", learnlist_id, "deleted");

        const config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        };

        const postdata = { learnlist_id };

        let deleteLearnlistEP = `http://localhost:${API_PORT}/deletelearninglist`;

        axios.post(deleteLearnlistEP, postdata, config)
            .then((results) => {
                if (from.includes('http://localhost:3000/myprofile')) {
                    res.redirect('/myprofile');
                }
            })
            .catch((err) => {
                console.log("Error in deleteLearnlist POST route:", err.message);
                res.redirect("/?message=deleteLearnlistbug");
            });

    } catch (err) {
        console.log("Error in deleteLearnlist POST route:", err.message);
        res.redirect("/?message=deleteLearnlistbug");
    }
});

module.exports = router;

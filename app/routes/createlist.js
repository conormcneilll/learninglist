const express = require("express");
const router = express.Router();
const axios = require('axios');


const API_PORT = process.env.API_PORT || 4000;

router.get('/', (req, res) => {
    try {
        res.render('createlist', {
            title: 'Create list',
            member: req.session.sess_valid,
            query: req.query,
        });
    } catch (err) {
        console.log("Error rendering create list page:", err.message);
        res.redirect("/myprofile?message=loginerror");
    }
});

router.post('/', (req, res) => {
    try {
        const creator_id = req.session.user_id;
        const { title, subject_topic, description, img_url } = req.body;
        console.log(req.body);

        const postdata = { creator_id, title, subject_topic, description, img_url };

        const config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded' 
            }
        };

        const createlearnlistEP = `http://localhost:${API_PORT}/createlearnlist`;

        if (req.session.sess_valid) {
            axios.post(createlearnlistEP, postdata, config)
                .then((results) => {
                    console.log(`Learnlist "${title}" added by user ${creator_id}`);

                    const goodstuff = results.data.goodstuff;

                    if (goodstuff) {
                        res.redirect(`/myprofile?message=learnlistadded`);
                    } else {
                        console.log(results.data.badstuff);
                        res.redirect(`/createlist?message=insertfailed`);
                    }
                })
                .catch((err) => {
                    console.log("Error adding learnlist:", err.message);
                    res.redirect(`/myprofile?message=addlearnlisterror`);
                });
        } else {
            res.redirect('/');
        }
    } catch (err) {
        console.log("Error in create learnlist POST route:", err.message);
        res.redirect("/?message=createlearnlistbug");
    }
});

module.exports = router;

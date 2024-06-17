const express = require("express");
const router = express.Router();
const axios = require('axios');

const API_PORT = process.env.API_PORT || 4000;

// GET route for rendering edit profile form
router.get('/', (req, res) => {
    try {
        if (req.session.sess_valid) {
            res.render('edit-profile', {
                title: 'Edit Profile',
                member: req.session.sess_valid,
                query: req.query,
            });
        } else {
            res.redirect("/?message=profilediterror");
        }
    } catch (err) {
        console.log("Error rendering edit profile page:", err.message);
        res.redirect("/?message=profilediterror");
    }
});

// POST route for handling profile updates
router.post('/', async (req, res) => {
    try {
        let user_id = req.session.user_id;
        let { city, occupation, profile_picture, interests } = req.body;
        
        const config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        };

        const postdata = { user_id, city, occupation, profile_picture, interests };
        console.log(postdata);

        let editprofileEP = `http://localhost:${API_PORT}/editprofile`;

        const results = await axios.post(editprofileEP, postdata, config);

        let me = results.data.goodstuff;
        if (results.data.badstuff) {
            console.log(results.data.badstuff);
        }

        if (me) {
            res.redirect('/myprofile?message=profileupdated');
        } else {
            res.redirect('/myprofile?message=profilenotupdated');
        }
    
    } catch (err) {
        console.log("Error in editprofile POST route:", err.message);
        res.redirect("/?message=mebug");
    }
});

module.exports = router;

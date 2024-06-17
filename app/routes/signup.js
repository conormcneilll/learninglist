const express = require("express");
const router = express.Router();
const axios = require('axios');

const API_PORT = process.env.API_PORT || 4000;

router.get('/', (req, res) => {
    try {
        res.render('signup', {
            title: 'Sign Up',
            member: req.session.sess_valid,
            query: req.query,
        });
    } catch (err) {
        console.log("Error in GETTING Signup route:", err.message);
        res.redirect("/?message=signupbug");
    }
});

router.post('/', (req, res, next) => {
    const { username, email, passwordraw1 } = req.body;

    if (!username || !email || !passwordraw1) {
        return res.status(400).json({ badstuff: 'Username, email, and password are required.' });
    }

    const checkdata = { username, email, passwordraw: passwordraw1 };
    const config = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    };

    const signupEP = `http://localhost:${API_PORT}/signup`;
    axios.post(signupEP, checkdata, config)
        .then((response) => {
            const user_created = response.data.user_id;

            if (user_created) {
                req.session.user_id = user_created; // Set user_id in the session
                req.session.sess_valid = true; // Set session as valid
                console.log("Signup was a success.");
                return res.redirect("/successlogin");
            } else {
                console.log("Signup failed: no data received from the API.");
                console.log("Response:", response.data.badstuff);
                return res.redirect("/signup?message=signupfailed");
            }
        })
        .catch((error) => {
            console.error("Error during signup API call:", error.message);
            return res.redirect("/signup?message=signupfailed");
        });
});

module.exports = router;

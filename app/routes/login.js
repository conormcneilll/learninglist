const express = require('express');
const router = express.Router();
const axios = require('axios');

const API_PORT = process.env.API_PORT || 4000;

// Handle GET request to /login
router.get('/', (req, res) => {
    try {
        res.render('login', {
            title: 'Log In',
            member: req.session.sess_valid,
            query: req.query
        });
    } catch (err) {
        console.log("Error rendering login page:", err.message);
        res.redirect("/?message=loginbug");
    }
});

// Handle POST request to /login
router.post('/', async (req, res) => {
    const { username, passwordraw } = req.body;

    // Validate inputs
    if (!username || !passwordraw) {
        return res.status(400).json({ badstuff: 'Username and password are required.' });
    }

    try {
        // Prepare data for API request
        const checkdata = { username, passwordraw };
        const config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        };

        // Make API call to your backend
        let loginEP = `http://localhost:${API_PORT}/login`;
        axios.post(loginEP, checkdata, config)
            .then((results) => {
                let goodstuff = results.data.goodstuff;

                if (goodstuff) {
                    req.session.user_id = goodstuff.user_id;
                    console.log("Login successful.");
                    res.redirect("/myprofile"); // Redirect to user's profile page
                } else {
                    console.log("Login failed: no data received from the API.");
                    console.log("Response:", results.data.badstuff);
                    res.redirect("/?message=loginfailed");
                }
            })
            .catch((error) => {
                console.error("Error during login API call:", error.message);
                res.redirect("/?message=loginfailed");
            });
    } catch (err) {
        console.error('Error during login process:', err.message);
        res.redirect("/?message=loginfailed");
    }
});

module.exports = router;

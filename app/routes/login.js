const express = require('express');
const router = express.Router();
const axios = require('axios');

const API_PORT = process.env.API_PORT || 4000;

router.get('/', (req, res) => {
    try {
        res.render('login', {
            title: 'Log In',
            member: req.session.sess_valid,
            query: req.query,
        });
    } catch (err) {
        console.log("Error rendering login page:", err.message);
        res.redirect("/?message=loginerror");
    }
});

router.post('/', (req, res, next) => {
    const { username, passwordraw } = req.body;

    if (!username || !passwordraw) {
        return res.status(400).json({ badstuff: 'Username and password are required.' });
    }

    const checkdata = { username, passwordraw };
    const config = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    };

    const loginEP = `http://localhost:${API_PORT}/login`;
    axios.post(loginEP, checkdata, config)
        .then((response) => {
            const goodstuff = response.data.goodstuff;

            if (goodstuff) {
                req.session.user_id = goodstuff.user_id;
                req.session.sess_valid = true;
                console.log("Login successful.");
                return res.redirect("/successlogin");
            } else {
                console.log("Login failed: no data received from the API.");
                console.log("Response:", response.data.badstuff);
                return res.redirect("/login?message=loginfailed");
            }
        })
        .catch((error) => {
            console.error("Error during login API call:", error.message);
            return res.redirect("/login?message=loginfailed");
        });
});

module.exports = router;

const express = require("express");
const router = express.Router();
const axios = require('axios');

const API_PORT = process.env.API_PORT || 4000;


// the below renders the login ejs and will show it or will display error if it doesnt SHOW 
router.get('/', (req, res)=> { 

    try {

        res.render('signup', {
            title: 'Sign Up', 
            member: req.session.sess_valid,
            query: req.query
        }); 

    } catch (err) {

        console.log("Error in GETTING Signup route:", err.message);
        res.redirect("/?message=loginbug");

    };

});

// This is the part where the front end begins to speak to the back end 

router.post('/', (req, res)=> { 

    try {

        let username = req.body.username;
        let email = req.body.email;
        let passwordraw = req.body.passwordraw1;
    
        const checkdata = {username, email, passwordraw};
    
        const config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        };
    
        let signupEP = `http://localhost:${API_PORT}/signup`; 
        
        axios.post(signupEP, checkdata, config)
        .then((results) => {

            let goodstuff = results.data.goodstuff;
    
            if (goodstuff) {
                req.session.user_id = goodstuff.insertId; 
                console.log("Signup was a success.");
                res.redirect("/successlogin");
            } else {
                console.log("Signup failed: no data received from the API.");
                console.log("Response:", results.data.badstuff);
                res.redirect("/?message=loginfailed"); 
            };
    
        });    

    } catch (err) {

        console.log("Error signing UP:", err.message);
        res.redirect("/?message=signupbug");

    };

});

module.exports = router;
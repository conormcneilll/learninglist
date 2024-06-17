const express = require("express");
const router = express.Router();
const axios = require('axios');

const API_PORT = process.env.API_PORT || 4000;

router.get('/', (req, res) => { 

    try {

        if (req.session.sess_valid) {

            let user_id = req.session.user_id;

            let userdataEP = `http://localhost:${API_PORT}/userdata?user_id=${user_id}&sessionuserid=${user_id}`;
            let favouriteEP = `http://localhost:${API_PORT}/favouritelists?user_id=${user_id}&sessionuserid=${user_id}`;
            let mylistsEP = `http://localhost:${API_PORT}/mylists?user_id=${user_id}`;
        
            axios.get(userdataEP)
            .then((results0) => {

                let userdata = results0.data.goodstuff;
                if (results0.data.badstuff) console.log(results0.data.badstuff);

                axios.get(favouriteEP)
                .then((results1) => {
                    
                    let favouritesdata = results1.data.goodstuff;
                    if (results1.data.badstuff) console.log(results1.data.badstuff);

                    axios.get(mylistsEP)   
                    .then((results2) => {

                        let mylistsdata = results2.data.goodstuff;
                        if (results2.data.badstuff) console.log(results2.data.badstuff);

                        if (userdata) {

                            res.render('myprofile', {
                                title: `My Profile`, 
                                userdata,
                                favouritesdata, 
                                mylistsdata,
                            });

                        } else {

                            console.log("Me route received no user data from the API.")
                            res.redirect('/?message=nouserdata');

                        }
                    });
                    
                });

            });

        } else {
            res.redirect('/?message=unauthorised');
        }

    } catch (err) {

        console.log("Error in me GET route:", err.message);
        res.redirect("/?message=mebug");

    }

});

router.post('/', (req, res) => {

    try {

        let { profile_id, user_id, username, city, occupation, profile_picture, interests } = req.body;

        const config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        };

        const postdata = { profile_id, user_id, username, city, occupation, profile_picture, interests };
        console.log(postdata);
        let editprofileEP = `http://localhost:${API_PORT}/editprofile`; 

        axios.post(editprofileEP, postdata, config)
        .then((results) => {

            let me = results.data.goodstuff;
            if (results.data.badstuff) console.log(results.data.badstuff);

            if (me) {
                res.redirect('/myprofile?message=profileupdated'); 
            } else {
                res.redirect('/myprofile?message=profilenotupdated'); 
            }
    
        });

    } catch (err) {

        console.log("Error in me POST route:", err.message);
        res.redirect("/?message=mebug");

    }

});


module.exports = router;

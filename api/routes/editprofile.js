const express = require("express");
const router = express.Router();
const connection = require("../connection.js");

router.post('/', (req, res) => {
    let user_id = req.body.user_id; // Assume user_id is passed in the request body
    let { city, occupation, profile_picture, interests } = req.body;

    let editprofileQ = `
        UPDATE profile 
        SET city = ?, occupation = ?, profile_picture = ?, interests = ? 
        WHERE user_id = ?;
    `;

    connection.query(editprofileQ, [city, occupation, profile_picture, interests, user_id], (err, results) => {
        if (err) {
            console.error("Profile update failed: ", err.sqlMessage);
            res.status(500).json({ badstuff: err }); 
            return;
        }

        console.log(results);

        let responseobject = {};

        if (results.affectedRows == 1) {
            responseobject.goodstuff = results;
            responseobject.goodstuff.apimessage = "Profile updated.";
            res.json(responseobject); 
        } else {
            responseobject.badstuff = {
                apimessage: "Something went wrong with editing the profile."
            };
            res.json(responseobject);
        }
    });
});

module.exports = router;

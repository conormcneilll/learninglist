const express = require("express");
const router = express.Router();
const connection = require("../connection.js");

router.get('/', (req, res) => { 
    let id = req.query.id;
    let sessionuserid = req.query.sessionuserid;

    let userQ = `
        SELECT 
            p.profile_id,
            p.user_id,
            p.city,
            p.occupation,
            p.profile_picture,
            p.interests,
            u.username
        FROM 
            profile p
        JOIN 
            users u ON p.user_id = u.user_id
        WHERE 
            p.user_id = ? AND u.user_id = ?;
    `;

    connection.query(userQ, [id, sessionuserid], (err, data) => {
        if (err) {
            res.json({ badstuff: err }); 
            return;
        };

        let goodstuff = data[0];
        
        if (goodstuff) { 
            res.json({ goodstuff: goodstuff }); 
        } else {
            let badstuff = {
                apimessage: "The user requested does not exist, or is not visible."
            };
            res.json({ badstuff: badstuff });
        };
    });
});

module.exports = router;

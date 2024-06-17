const express = require("express");
const router = express.Router();
const connection = require("../connection.js");

router.get('/', (req, res) => { 

    try {
        let { user_id, sessionuserid } = req.query;

        
        let userclause = '';
        if (user_id) userclause = `${user_id}`;

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
                p.user_id = ${userclause};
        `;

        connection.query(userQ, [sessionuserid], (err, data) => {
            if (err) {
                console.error('Error fetching profile data:', err);
                return res.status(500).json({ error: 'Failed to fetch profile data' });
            }

            if (data.length > 0) {
                const profileData = data[0];
                res.json({ goodstuff: profileData });
            } else {
                res.json({ badstuff: 'No profile found for the specified user_id' });
            }
        });

    } catch (err) {
        console.error("Error in GET /profile route:", err.message);
        res.status(500).json({ error: 'Internal server error' });
    }

});

module.exports = router;

const express = require("express");
const router = express.Router();
const connection = require("../connection.js");

// Route to get learning lists for the logged-in user
router.get('/', (req, res) => {
    const username = req.session.username; // Assuming the username is stored in the session
    if (!username) {
        return res.status(401).json({ badstuff: "User not logged in" });
    }

    const userQ = `
        SELECT 
            l.learnlist_id,
            l.creator_id,
            l.title,
            l.subject_topic,
            l.description,
            l.rating,
            l.img_url,
            u.username
        FROM 
            LearnList l
        JOIN 
            users u ON l.creator_id = u.user_id
        WHERE 
            u.username = ?;
    `;

    connection.query(userQ, [username], (err, data) => {
        if (err) {
            return res.status(500).json({ badstuff: err.message });
        }

        if (data.length > 0) {
            return res.json({ goodstuff: data });
        } else {
            return res.json({ badstuff: "No learning lists found for this user" });
        }
    });
});

module.exports = router;

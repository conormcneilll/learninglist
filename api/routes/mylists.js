const express = require("express");
const router = express.Router();
const connection = require("../connection.js");

router.get('/', (req, res) => {
    
    let { user_id } = req.query;

    const userQ = `
        SELECT 
            l.learnlist_id,
            l.creator_id,
            l.title,
            l.subject_topic,
            l.description,
            l.rating,
            l.img_url,
            u.username AS creator_username
        FROM 
            LearnList l
        JOIN 
            users u ON l.creator_id = u.user_id
        WHERE 
            l.creator_id = ?;
    `;

    connection.query(userQ, [user_id], (err, data) => {
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

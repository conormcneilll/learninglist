const express = require("express");
const router = express.Router();
const connection = require("../connection.js");

// Route to get favourite learning lists for the logged-in user
router.get('/', (req, res) => {
    
    try {
        let { user_id } = req.query;

        // Query to fetch favourite learning lists
    
        const favouritesQ = `
        SELECT 
            ll.learnlist_id,
            ll.creator_id,
            ll.title,
            ll.subject_topic,
            ll.description,
            ll.rating,
            ll.img_url,
            u.username,
            f.user_id,
            f.learnlist_id
        FROM 
            FavoriteLearnlist f
        JOIN 
            LearnList ll ON f.learnlist_id = ll.learnlist_id
        JOIN 
            users u ON ll.creator_id = u.user_id
        WHERE 
            f.user_id = ?;  -- Filter by the user_id parameter
    `;

        connection.query(favouritesQ, [user_id], (err, data) => {
            if (err) {
                return res.status(500).json({ badstuff: err.message });
            }

            if (data.length > 0) {
                return res.json({ goodstuff: data });
            } else {
                return res.json({ badstuff: "No favourite learning lists found for this user" });
            }
        });
    } catch (err) {
        console.error("Error in GET /favouritelists route:", err.message);
        res.status(500).json({ badstuff: 'Internal server error' });
    }
});

module.exports = router;

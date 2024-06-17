const express = require("express");
const router = express.Router();
const connection = require("../connection.js");

// Route to unfavorite a learning list
router.post('/', async (req, res) => {
    try {
        // Extract learnlist_id and user_id from the request body
        let { learnlist_id, user_id } = req.body;

        // If favorited, remove it from the FavoriteLearnlist table
        let unfavoriteQ = `DELETE FROM FavoriteLearnlist WHERE learnlist_id = ? AND user_id = ?;`;

        connection.query(unfavoriteQ, [learnlist_id, user_id], async (err, data) => {
            if (err) {
                console.error("Error removing favorite: ", err);
                return res.status(500).json({ badstuff: err });
            }

            if (data.affectedRows > 0) {
                return res.json({ goodstuff: { apimessage: `Learnlist unfavorited.` } });
            } else {
                return res.json({ badstuff: { apimessage: "Failed to unfavorite or already not favorited." } });
            }
        });

    } catch (err) {
        console.error("Error in unfavoriting route: ", err.message);
        return res.status(500).json({ badstuff: err.message });
    }
});

module.exports = router;

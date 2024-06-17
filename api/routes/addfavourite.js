const express = require("express");
const router = express.Router();
const connection = require("../connection.js");
const axios = require('axios');

const API_PORT = process.env.API_PORT || 4000;

router.post('/', async (req, res) => {
    try {
        // Extract learnlist_id and user_id from the request body
        let { learnlist_id, user_id } = req.body;


        // Check if the learnlist is already favorited by the user
        let checkFavoriteQ = `SELECT * FROM FavoriteLearnlist WHERE learnlist_id = ? AND user_id = ?;`;

        connection.query(checkFavoriteQ, [learnlist_id, user_id], async (err, data) => {
            if (err) {
                console.error("Error checking favorite: ", err);
                return res.status(500).json({ badstuff: err });
            }

            if (data.length > 0) {
                return res.json({ badstuff: { apimessage: "Learnlist is already favorited." } });
            } else {
                // If not favorited, add it to the FavoriteLearnlist table
                let favoriteQ = `INSERT INTO FavoriteLearnlist (learnlist_id, user_id) VALUES (?, ?);`;

                connection.query(favoriteQ, [learnlist_id, user_id], async (err, data) => {
                    if (err) {
                        console.error("Error adding favorite: ", err);
                        return res.status(500).json({ badstuff: err });
                    }

                    if (data.insertId) {
                        return res.json({ goodstuff: { apimessage: `Learnlist favorited.` } });
                    } else {
                        return res.json({ badstuff: { apimessage: "Failed to favorite." } });
                    }
                });
            }
        });

    } catch (err) {
        console.error("Error in favoriting route: ", err.message);
        return res.status(500).json({ badstuff: err.message });
    }
});

module.exports = router;

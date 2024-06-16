const express = require("express");
const router = express.Router();
const connection = require("../connection.js");

router.post('/', (req, res) => {
    try {
        const { profile_id, user_id, city, occupation, profile_picture, interests } = req.body;

        const updateProfileQuery = `
            UPDATE profile
            SET 
                city = ?,
                occupation = ?,
                profile_picture = ?,
                interests = ?
            WHERE
                user_id = ?;
        `;

        const values = [profile_id, user_id, city, occupation, profile_picture, interests];

        connection.query(updateProfileQuery, values, (err, results) => {
            if (err) {
                console.error('Error updating profile:', err);
                return res.status(500).json({ badstuff: 'Failed to update profile' });
            }

            if (results.affectedRows > 0) {
                res.json({ goodstuff: 'Profile updated successfully' });
            } else {
                res.json({ badstuff: 'No profile found for the given user_id' });
            }
        });
    } catch (err) {
        console.error("Error in editprofile POST route:", err.message);
        res.status(500).json({ badstuff: 'Internal server error' });
    }
});

module.exports = router;

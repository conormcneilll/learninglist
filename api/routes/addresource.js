const express = require('express');
const router = express.Router();
const connection = require('../connection.js');

const API_PORT = process.env.API_PORT || 4000;

router.post('/', (req, res) => {
    const creator_id = req.session.user_id; // Assuming you have the user ID stored in the session
    const { learnlist_id, title, url, res_type } = req.body;

        const addResourceQuery = `
            INSERT INTO Resource (title, url, res_type)
            VALUES (?, ?, ?);
        `;

        connection.query(addResourceQuery, [title, url, res_type], (err, result) => {
            if (err) {
                console.error('Error adding resource:', err);
                return res.status(500).json({ error: 'Error adding resource.' });
            }

            const resource_id = result.insertId;

            // Associate the resource with the learnlist in Learnlist_Resource table
            const addLearnlistResourceQuery = `
                INSERT INTO Learnlist_Resource (learnlist_id, resource_id)
                VALUES (?, ?);
            `;

            connection.query(addLearnlistResourceQuery, [learnlist_id, resource_id], (err) => {
                if (err) {
                    console.error('Error associating resource with learnlist:', err);
                    return res.status(500).json({ error: 'Error associating resource with learnlist.' });
                }

                res.status(200).json({ message: 'Resource added to learnlist successfully.' });
            });
        });
    });


module.exports = router;

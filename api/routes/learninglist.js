const express = require('express');
const router = express.Router();
const connection = require('../connection.js');

const API_PORT = process.env.API_PORT || 4000;

router.get('/', (req, res) => { 
    let { learninglist_id } = req.query;
    
    const learnlistQ = `
        SELECT
            ll.learnlist_id,
            ll.title AS learnlist_title,
            ll.subject_topic,
            ll.description,
            ll.rating,
            ll.img_url,
            u.username AS creator_username,
            r.resource_id,
            r.title AS resource_title,
            r.url AS resource_url,
            r.res_type AS resource_type
        FROM
            Learnlist ll
        JOIN
            users u ON ll.creator_id = u.user_id
        LEFT JOIN
            Learnlist_Resource lr ON ll.learnlist_id = lr.learnlist_id
        LEFT JOIN
            resource r ON lr.resource_id = r.resource_id
        WHERE
            ll.learnlist_id = ?
    `;

    connection.query(learnlistQ, [learninglist_id], (err, data) => {
        if (err) {
            console.error('Database query error:', err);
            return res.status(500).json({ badstuff: 'Database query error with learninglist resources loading.' });
        }
        
        if (data.length > 0) {
            // Consolidate resources into a single learnlist object
            const learnlist = {
                learnlist_id: data[0].learnlist_id,
                learnlist_title: data[0].learnlist_title,
                subject_topic: data[0].subject_topic,
                description: data[0].description,
                rating: data[0].rating,
                img_url: data[0].img_url,
                creator_username: data[0].creator_username,
                resources: data.map(row => ({
                    resource_id: row.resource_id,
                    resource_title: row.resource_title,
                    resource_url: row.resource_url,
                    resource_type: row.resource_type
                }))
            };
            return res.json({ goodstuff: learnlist });
        } else {
            return res.status(404).json({ badstuff: 'No data found.' });
        }
    });
});


router.post('/', (req, res) => {
    const creator_id = req.session.user_id; // Assuming you have the user ID stored in the session
    const { learnlist_id, title, url, res_type } = req.body;

    // Verify that the learnlist belongs to the user
    const verifyQuery = `SELECT * FROM Learnlist WHERE learnlist_id = ? AND creator_id = ?`;

    connection.query(verifyQuery, [learnlist_id, creator_id], (err, results) => {
        if (err) {
            console.error('Error verifying learnlist ownership:', err);
            return res.status(500).json({ error: 'Error verifying learnlist ownership.' });
        }

        if (results.length === 0) {
            return res.status(403).json({ error: 'You do not have permission to add resources to this learnlist.' });
        }

        // Insert the resource into the Resource table
        const addResourceQuery = `
            INSERT INTO Resource (creator_id, title, url, res_type)
            VALUES (?, ?, ?, ?);
        `;

        connection.query(addResourceQuery, [creator_id, title, url, res_type], (err, result) => {
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
});


module.exports = router;

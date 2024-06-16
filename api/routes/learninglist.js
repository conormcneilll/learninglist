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

module.exports = router;

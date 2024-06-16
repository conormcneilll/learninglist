const express = require('express');
const router = express.Router();
const connection = require('../connection.js');

const API_PORT = process.env.API_PORT || 4000;

router.get('/', (req, res) => { 
    
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
        
    `;

    connection.query(learnlistQ, (err, data) => {
        if (err) {
            console.error('Database query error:', err);
            return res.status(500).json({ badstuff: 'Database query error with learninglist resources loading.' });
        }
        
        if (data.length > 0) {
            return res.json({ goodstuff: data });
        } else {
            return res.status(404).json({ badstuff: 'No data found.' });
        }
    });
});

module.exports = router;

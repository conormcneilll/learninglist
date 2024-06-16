const express = require('express');
const router = express.Router();
const connection = require('../connection.js');

const API_PORT = process.env.API_PORT || 4000;

router.get('/', (req, res) => { 
    
    const learnlistQ = `
        SELECT 
            ll.learnlist_id,
            ll.title, 
            ll.subject_topic, 
            ll.description, 
            ll.rating, 
            ll.img_url, 
            u.username
        FROM 
            Learnlist ll
        JOIN 
            users u ON ll.creator_id = u.user_id;
    `;

    connection.query(learnlistQ, (err, data) => { // Corrected variable name to learnlistQ
        if (err) {
            console.error('Database query error:', err);
            return res.status(500).json({ badstuff: 'Database query error with ll.' });
        }
        
        if (data.length > 0) {
            return res.json({ goodstuff: data });
        } else {
            return res.status(404).json({ badstuff: 'No data found.' });
        }
    });
});

module.exports = router;

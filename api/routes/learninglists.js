const express = require('express');
const router = express.Router();
const connection = require('../connection.js');

const API_PORT = process.env.API_PORT || 4000;

router.get('/', (req, res) => { 
    
    const learnlistQ = `
        SELECT title, description, rating, img_url
        FROM Learnlist
    `;

    connection.query(learnlistQ, (err, data) => { // Corrected variable name to learnlistQ
        if (err) {
            console.error('Database query error:', err);
            return res.status(500).json({ badstuff: 'Database query error.' });
        }
        
        if (data.length > 0) {
            return res.json({ goodstuff: data });
        } else {
            return res.status(404).json({ badstuff: 'No data found.' });
        }
    });
});

module.exports = router;

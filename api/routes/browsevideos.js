const express = require('express');
const router = express.Router();
const connection = require('../connection');

// Route to fetch video tutorials from the database
router.get('/', async (req, res) => {
    
    const videosQ = `
        SELECT title, url, subject_topic
        FROM VideoTutorial
    `;

    connection.query(videosQ, (err, data) => { 
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
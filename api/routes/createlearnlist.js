const express = require('express');
const router = express.Router();
const connection = require('../connection.js');

router.post('/', (req, res) => {
    const { creator_id, title, subject_topic, description, img_url } = req.body;

    const addLearnlistQ = `
        INSERT INTO learnlist (creator_id, title, subject_topic, description, img_url)
        VALUES (?, ?, ?, ?, ?);
    `;

    connection.query(addLearnlistQ, [creator_id, title, subject_topic, description, img_url], (err, data) => {
        if (err) {
            console.error('Error adding learnlist:', err.sqlMessage);
            res.status(500).json({ badstuff: err });
            return;
        }

        if (data.insertId) {
            const goodstuff = {
                learnlist_id: data.insertId,
                title,
                subject_topic,
                description,
                img_url,
                apimessage: 'LearnList added.'
            };
            res.json({ goodstuff });
        } else {
            const badstuff = {
                apimessage: "Oops, Learnlist addition didn't work."
            };
            res.json({ badstuff });
        }
    });
});

module.exports = router;

const express = require('express');
const router = express.Router();
const connection = require('../connection.js');

router.post('/', (req, res) => {
    const { user_id, title, url, res_type } = req.body;

    const addresourcetQ = `
        INSERT INTO Resource (user_id, title, url, res_type)
        VALUES (?, ?, ?, ?, ?);
    `;

    connection.query(addresourceQ, [user_id, title, url, res_type], (err, data) => {
        if (err) {
            console.error('Error adding resource:', err.sqlMessage);
            res.status(500).json({ badstuff: err });
            return;
        }

        if (data.insertId) {
            const goodstuff = {
                title,
                url,
                res_type,
                apimessage: 'LearnList added.'
            };
            res.json({ goodstuff });
        } else {
            const badstuff = {
                apimessage: "Oops, Resource addition didn't work."
            };
            res.json({ badstuff });
        }
    });
});

module.exports = router;

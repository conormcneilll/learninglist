const express = require('express');
const router = express.Router();
const connection = require('../connection');
const bcrypt = require ('bcrypt');
const saltRounds = 10;

const API_PORT = process.env.API_PORT || 4000;

router.post('/', async (req, res) => {
    const { username, email, passwordraw } = req.body;

    // Validate inputs
    if (!username || !email || !passwordraw) {
        return res.status(400).json({ badstuff: 'All fields are required.' });
    }

    try {
        // Check if the user already exists
        const checkUserQuery = 'SELECT * FROM Users WHERE username = ? OR email = ?';
        connection.query(checkUserQuery, [username, email], async (err, results) => {
            if (err) {
                console.error('Database query error:', err);
                return res.status(500).json({ badstuff: 'Database query error.' });
            }

            if (results.length > 0) {
                return res.status(409).json({ badstuff: 'User already exists.' });
            }

            // Hash the password
            const hashedPassword = await bcrypt.hash(passwordraw, saltRounds);

            // Insert the new user into the database
            const insertUserQuery = 'INSERT INTO Users (username, email, password) VALUES (?, ?, ?)';
            connection.query(insertUserQuery, [username, email, hashedPassword], (err, results) => {
                if (err) {
                    console.error('Database insert error:', err);
                    return res.status(500).json({ badstuff: 'Database insert error.' });
                }

                const goodstuff = {
                    insertId: results.insertId,
                    apimessage: 'Successfully Signed UP!'
                };

                return res.status(201).json({ goodstuff });
            });
        });
    } catch (err) {
        console.error('Error during signup process:', err);
        res.status(500).json({ badstuff: 'Internal server error.' });
    }
});


module.exports = router
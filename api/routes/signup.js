const express = require('express');
const router = express.Router();
const connection = require('../connection');
const bcrypt = require('bcrypt');
const saltRounds = 10;

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

            try {
                // Hash the password
                const hashedPassword = await bcrypt.hash(passwordraw, saltRounds);

                // Insert the new user into the database
                const insertUserQuery = 'INSERT INTO Users (username, email, password) VALUES (?, ?, ?)';
                connection.query(insertUserQuery, [username, email, hashedPassword], (err, results) => {
                    if (err) {
                        console.error('Database insert error:', err);
                        return res.status(500).json({ badstuff: 'Database insert error.' });
                    }

                    const userId = results.insertId; // Assuming results.insertId is the user_id

                    // Insert user profile into the profile table with default values
                    const insertProfileQuery = 'INSERT INTO profile (user_id, city, occupation, profile_picture, interests) VALUES (?, ?, ?, ?, ?)';
                    connection.query(insertProfileQuery, [userId, 'Click edit to add', 'Click edit to add', 'https://t3.ftcdn.net/jpg/05/08/02/74/360_F_508027415_4QUICcSCBjIkykkZPVFrsF5gaVEuYvmB.jpg', 'Click edit to add'], (err, profileResult) => {
                        if (err) {
                            console.error('Error inserting profile:', err);
                            return res.status(500).json({ badstuff: 'Failed to create profile for user' });
                        }

                        return res.status(200).json({ user_id: userId });
                    });
                });

            } catch (err) {
                console.error('Error hashing password:', err);
                return res.status(500).json({ badstuff: 'Error hashing password.' });
            }
        });

    } catch (err) {
        console.error('Error during signup process:', err);
        return res.status(500).json({ badstuff: 'Internal server error.' });
    }
});

module.exports = router;

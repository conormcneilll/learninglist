const express = require('express');
const router = express.Router();
const connection = require('../connection');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const API_PORT = process.env.API_PORT || 4000;

router.post('/', async (req, res) => {
    const { username, passwordraw } = req.body;

    // Validate inputs
    if (!username || !passwordraw) {
        return res.status(400).json({ badstuff: 'Username and password are required.' });
    }

    try {
        // Check if the user exists in the database
        const getUserQuery = 'SELECT * FROM Users WHERE username = ?';
        connection.query(getUserQuery, [username], async (err, results) => {
            if (err) {
                console.error('Database query error:', err);
                return res.status(500).json({ badstuff: 'Database query error.' });
            }

            // Check if user was found
            if (results.length === 0) {
                return res.status(401).json({ badstuff: 'Username or password is incorrect.' });
            }

            const user = results[0];
            
            // Compare the provided password with the hashed password stored in the database
            const match = await bcrypt.compare(passwordraw, user.password);

            if (!match) {
                return res.status(401).json({ badstuff: 'Username or password is incorrect.' });
            }

            // // If passwords match, create a session or JWT token for authentication
            req.session.sess_valid = true; 
            req.session.user_id = user.user_id; 
            
            const goodstuff = {
                user_id: user.user_id,
                username: user.username,
                apimessage: 'Login successful.'
            };

            return res.status(200).json({ goodstuff });
        });
    } catch (err) {
        console.error('Error during login process:', err);
        res.status(500).json({ badstuff: 'Internal server error.' });
    }
});

module.exports = router;

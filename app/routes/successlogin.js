const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/', (req, res) => {

    res.render('myprofile', {
        title: 'Home Page',
        message: 'This is a message from your backend'
      });

    // try {
    //     req.session.sess_valid = true;
    //     console.log('User login successful');
    //     res.redirect('/myprofile?message=successful_login');

    // } catch (error) {
    //     console.error('Error encountered during login redirection:', error.message);
    //     res.redirect('/?message=login_error');
    // }
});

module.exports = router;

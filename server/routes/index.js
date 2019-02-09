var express = require('express');
var router = express.Router();

import Users from '../models/Users';

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/create_user', async (req, res, next) => {
    console.log("CREATE USER", req.body)
    // { username: 'Sugo',
    // password: 'P@ssword0579',
    // email: 'kjossendal@gmail.com',
    // phone_number: '',
    // authenticationCode: '367613',
    // showConfirmationForm: true,
    // user_id: 'us-west-2:24849724-b83a-43cc-8b99-e802e8b42730' }
    try {
        const response = await Users.createUser(req.body);
        res.json({
            status: 'success',
            data: response
        })
    } catch (err) {
        console.log("Error creating user record", err)
    }
});

module.exports = router;

var express = require('express');
var router = express.Router();

import Users from '../models/Users';

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/create_user', async (req, res, next) => {
    console.log("CREATE USER", req.body)
    // console.log("PHOTO", req.body.)
    // { username: 'Sugo',
    // password: 'P@ssword0579',
    // email: 'kjossendal@gmail.com',
    // phone_number: '',
    // authenticationCode: '367613',
    // showConfirmationForm: true,
    // user_id: 'us-west-2:24849724-b83a-43cc-8b99-e802e8b42730' }
    try {
        const response = await Users.createUser(req.body);
        // singleUpload(req, res, function(err, some) {
        //     if (err) {
        //         return res.status(422).send({errors: [{title: 'Image Upload Error', detail: err.message}] });
        //     }
        //     console.log('FILE', req.file)
        //     // return res.json({'imageUrl': req.file.location});
        // });
        res.json({
            status: 'success',
            data: response
        })
    } catch (err) {
        console.log("Error creating user record", err)
    }
});

module.exports = router;

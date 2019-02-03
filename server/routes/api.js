var express = require('express');
var router = express.Router();

const Messages = require('../models/Messages');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/get_messages', function(req, res, next) {
    console.log('REQUEST', req.body)
    const messages = [
        {
            toUser: 'us-west-2:938ff5c2-550d-48c7-90ef-ffaf9c11d762',
            fromUser: 'Siopao',
            message: 'Hey Biff',
            dateTime: new Date()
        },
        {
            toUser: 'us-west-2:938ff5c2-550d-48c7-90ef-ffaf9c11d762',
            fromUser: 'Admin',
            message: 'Youre banned',
            dateTime: new Date()
        },
        {
            toUser: 'Biff',
            fromUser: 'Siopao',
            message: 'Hey Biff',
            dateTime: new Date()
        },
        {
            toUser: 'Biff',
            fromUser: 'Siopao',
            message: 'Hey Biff',
            dateTime: new Date()
        },
        {
            toUser: 'Biff',
            fromUser: 'Siopao',
            message: 'Hey Biff',
            dateTime: new Date()
        },
        {
            toUser: 'Biff',
            fromUser: 'Siopao',
            message: 'Hey Biff',
            dateTime: new Date()
        },
        {
            toUser: 'Biff',
            fromUser: 'Siopao',
            message: 'Hey Biff',
            dateTime: new Date()
        },
        {
            toUser: 'Biff',
            fromUser: 'Siopao',
            message: 'Hey Biff',
            dateTime: new Date()
        },
    ].filter(message => {
        return message.toUser == req.body.user.id
    });
    
    res.json({
        status: 'success',
        data: messages
    })
})

module.exports = router;

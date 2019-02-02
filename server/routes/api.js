var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/:resource', function(req, res, next) {
    const messages = [
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
    ];
    res.json({
        status: 'success',
        data: messages
    })
})

module.exports = router;

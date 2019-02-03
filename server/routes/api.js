var express = require('express');
var router = express.Router();

const Messages = require('../models/Messages');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/get_messages', async (req, res, next) => {
    console.log('USER_ID GOING IN', req.body.user_id)
    const user_id = req.body.user_id;
    let messages = [];
    try {
        messages = await Messages.getUserMessages(user_id)
        console.log("MESSAGES", messages)
        res.json({
            status: 'success',
            data: messages
        })
    } catch(err) {
        console.log("ERR", err)
    }
})

module.exports = router;

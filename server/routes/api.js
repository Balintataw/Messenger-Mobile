var express = require('express');
var router = express.Router();
const upload = require('../services/multer');

const singleUpload = upload.single('image')

const Messages = require('../models/Messages');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('Welcome to AWS HELL');
});

router.get('/me', async (req,res, next) => {
    const user_id = req.body.user_id;
    try {
        const me = await Messages.getUserRecord(user_id);
        res.json({
            status: 'success',
            data: me
        })
    } catch (err) {
        console.log("ERROR GETTING ME", err)
    }
})

router.post('/get_messages', async (req, res, next) => {
    const user_id = req.body.user_id;
    let messages = [];
    try {
        messages = await Messages.getUserMessages(user_id);
        res.json({
            status: 'success',
            data: messages
        })
    } catch(err) {
        console.log("ERR", err)
    }
});

router.post('/get_conversation', async (req, res, next) => {
    const user_id = req.body.user_id;
    const talking_to_id = req.body.talking_to_id;
    try {
        const messages = await Messages.getConversation(user_id, talking_to_id)
        console.log("MESSAGES", messages)
        res.json({
            status: 'success',
            data: messages
        })
    } catch(err) {
        console.log("ERR", err);
    }
})

router.post('/image_upload', function(req, res) {
    console.log("RECEIVING IMAGE", req.body)
    singleUpload(req, res, function(err, some) {
        if (err) {
            return res.status(422).send({errors: [{title: 'Image Upload Error', detail: err.message}] });
        }
        return res.json({'imageUrl': req.file.location});
    });
})

module.exports = router;

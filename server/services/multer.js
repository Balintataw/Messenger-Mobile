const multer = require('multer');
const multerS3 = require('multer-s3');
// const aws = require('aws-sdk');
var AWS = require('aws-sdk/dist/aws-sdk-react-native'); // native specific sdk
const s3 = new AWS.S3();

const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'messagingpp-20190202095441-deployment',
        acl: 'public-read',
        metadata: function (req, file, cb) {
            cb(null, {fieldName: file.fieldname});
        },
        key: function (req, file, cb) {
            cb(null, Date.now().toString())
        }
    })
})

module.exports = upload;
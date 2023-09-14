
const express = require('express');
const router = express.Router();
const { S3 } = require("@aws-sdk/client-s3");
const multer = require('multer');
const multerS3 = require('multer-s3');
require("dotenv").config();

// Connect to the SQL database
// const connection = require("$/database");

// configuring the AWS environment
var s3 = new S3({
    credentials: { 
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_KEY,
    },
    region: 'us-west-2'
});

var upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: process.env.AWS_S3_BUCKET,
        cacheControl: 'max-age=604800', // Cache profile photos for one week
        contentType: multerS3.AUTO_CONTENT_TYPE,
        key: function (req, file, cb) {
            let filetype = '.' + file.mimetype.split("/")[1];
            let path = 'photos/' + ((new Date()).getTime()).toString() + filetype
            console.log("Uploading file to S3:", path)
            cb(null, path);
        }
    })
});

// Save a photo to S3
router.post('/upload', [upload.single('image')], function (req, res, next) {
    console.log("Uploading a new profile photo")
    let file = req.file
    console.log('Uploaded file:', file)
    let url = process.env.PRODUCTION ? process.env.AWS_S3_BUCKET_URL + file.key : file.location
    // savePhoto(url, req.user.id)
    res.status(200).send({
        message: "Uploaded!",
        file: {url: url, name: file.key, type: file.mimetype, size: file.size}
    })
}, (error, req, res, next) => {
    console.log(error)
    res.status(400).send({error: error.message})
});

// async function savePhoto(photo_url, uid) {
//     return new Promise(function(resolve, reject) {
//         var queryStatement = 'UPDATE users SET photo_url = ? WHERE id = ?'
//         connection.query(queryStatement, [photo_url, uid], function(err, results) {
//             if (err) {
//                 reject(err)
//             }
//             else {
//                 resolve(results)
//             }
//         });
//     });
// }

module.exports = router; 
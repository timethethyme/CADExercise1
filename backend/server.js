
const express = require('express');
const ejs = require('ejs')
const path = require('path')

const app = express();

app.set('view engine', 'ejs')

const aws = require('aws-sdk')
const multer = require('multer');
const multerS3 = require('multer-s3')

aws.config.update({
    secretAccessKey: 'XXX',
    accessKeyId: 'XXX',
    region: 'eu-central-1'
});

const s3 = new aws.S3({ /* ... */})
const ddb = new aws.DynamoDB({apiVersion: '2012-10-17'});
const docClient = new aws.DynamoDB.DocumentClient();
const uuid = require('uuid-random');


let upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: '404bucket',
        metadata: function (req, file, cb) {
            cb(null, {fieldName: file.fieldname});
        },
        key: function (req, file, cb) {
            cb(null, 'public/uploads/' + file.fieldname + '-' + Date.now() + path.extname(file.originalname))
        },
        limits: {fileSize: 1000000},
    })
})

app.get('/', (req, res) => {
    const params = {
        TableName: '404table',
        ProjectionExpression: "PICTURE_NAME, PICTURE_PATH"
    }

    docClient.scan(params, function (err, data) {
        if (err) {
            console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
        } else {
            res.render('index', {uploads: data.Items})
        }
    });
})
app.get('/upload', (req, res) => res.render('upload'))
app.post('/upload', upload.single('uploaded_file'), function (req, res) {
    const params = {
        TableName: '404table',
        Item: {
            'PICTURE_ID': {S: uuid()},
            'PICTURE_NAME': {S: req.body.name},
            'PICTURE_PATH': {S: req.file.location}
        }
    };
    ddb.putItem(params, function (err, data) {
        if (err) {
            console.log("Error", err);
        } else {
            console.log("Success", data);
        }
    });
    res.render('upload')
});
const port = 3000;
app.listen(port, () => console.log('View server is running!'));

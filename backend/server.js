const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const url = 'mongodb://localhost:27017';

const client = new MongoClient(url);

const dbName = 'cad';

var db;
var collection;

client.connect(function(err) {
    assert.equal(null, err);

    console.log("Connected successfully to server");

    db = client.db(dbName);
    collection = db.collection('documents');
});

function insert(data) {
    collection.insertOne(data, function(err, res) {
        if (err) throw err;
        console.log("1 document inserted");
    });
}

function show() {
    collection.find({}).toArray(function(err, docs) {
        assert.equal(err, null);
        console.log("Found the following records");
        console.log(docs)
        callback(docs);
    });
}

const express = require('express');
const ejs = require('ejs')
const path = require('path')

const app = express();

app.set('view engine', 'ejs')

//Set path for frontend views
const view_path = path.join(__dirname, '/..', '/frontend')
app.set('views', view_path)
app.use(express.static(view_path))

const image_path = path.join(__dirname, '/..', '/assets')
app.use('/images',  express.static(image_path))

app.get('/', (req, res) => res.render('index'))
app.get('/upload', (req, res) => res.render('upload'))

const port = 3000;
app.listen(port, () => console.log('Running'))

/*
var http = require('http');

http.createServer(function(request, response){

    //The following code will print out the incoming request text
    request.pipe(response);

}).listen(8080, '127.0.0.1');

console.log('Listening on port 8080...');

http.get('http://127.0.0.1:8080', (resp) => {
    let data = '';

    // A chunk of data has been recieved.
    resp.on('data', (chunk) => {
        data += chunk;
    });

    // The whole response has been received. Print out the result.
    resp.on('end', () => {
        console.log(JSON.parse(data).explanation);
    });

}).on("error", (err) => {
    console.log("Error: " + err.message);
});

const https = require('https')

const getoptions = {
    hostname: '127.0.0.1',
    port: 8080,
    path: '/get',
    method: 'GET'
}

const getreq = https.request(getoptions, res => {
    console.log(`statusCode: ${res.statusCode}`)

    res.on('data', d => {
        process.stdout.write(d)
        show()
    })
})

getreq.on('error', error => {
    console.error(error)
})

getreq.end()

const postoptions = {
    hostname: '127.0.0.1',
    port: 8080,
    path: '/post',
    method: 'POST'
}

const postreq = https.request(postoptions, res => {
    console.log(`statusCode: ${res.statusCode}`)

    res.on('data', d => {
        process.stdout.write(d)
        insert()
    })
})

postreq.on('error', error => {
    console.error(error)
})

postreq.end();
 */
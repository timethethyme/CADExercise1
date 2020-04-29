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

const https = require('https')

const getoptions = {
    hostname: '127.0.0.1',
    port: 443,
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
    port: 443,
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

postreq.end()
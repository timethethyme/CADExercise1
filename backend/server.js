const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const url = 'mongodb://localhost:27017';

const dbName = 'cad';

const client = new MongoClient(url);

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

/*
var http = require('http');
http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hello World\n');
}).listen(1337, "127.0.0.1");
console.log('Server running at http://127.0.0.1:1337/');
*/

var myobj = { name: "Test" };

insert(myobj);
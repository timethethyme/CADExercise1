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

/*
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
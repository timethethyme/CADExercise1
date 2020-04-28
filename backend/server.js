var db;
MongoClient.connect('mongodb://localhost:27017', (err, client) => {
    db = client.db('CADStorage')
});
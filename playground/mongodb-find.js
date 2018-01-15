// const MongoClient = require('mongodb').MongoClient;
const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err) {
        return console.log('Unable to connect to db server!');
    }
    console.log('Connected to MongoDb server');

    // db.collection('Todos').find({
    //     _id: new ObjectID('5a5cf653df6503e6b000165d')
    //  }).toArray().then((docs) => {
    //     console.log('todos:');
    //     console.log(JSON.stringify(docs, undefined, 2));
    // }, (err) => {
    //     console.log('unable to fetch todos!', err);
    // })

    // db.collection('Todos').find().count().then((count) => {
    //     console.log(`todos count: ${count}`);
    //     }, (err) => {
    //     console.log('unable to fetch todos!', err);
    // });

    db.collection('Users').find({
        name: 'Milos'
    }).toArray().then((names) => {
        if (names.length == 0) {
            console.log('no documents with that parameter!');
        }
        console.log('Names: ', names);
    }, (err) => {
        console.log('unable to fetch!', err);
    })

    // db.close();
})
// const MongoClient = require('mongodb').MongoClient;
const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err) {
        return console.log('Unable to connect to db server!');
    }
    console.log('Connected to MongoDb server');

    // db.collection('Todos').findOneAndUpdate({
    //     _id: new ObjectID('5a5d0038ab46226c36b868f0')
    // }, {
    //     $set: {
    //         completed: true
    //     }
    // }, {
    //     returnOriginal: false
    // }).then((res) => {
    //     console.log(res);
    // })

    db.collection('Users').findOneAndUpdate({
        _id: new ObjectID('5a5d0962ab46226c36b87233')
    }, {
        $set: {
            name: 'Giran'
        },
        $inc: {
            age: 1
        }
    }, {
        returnedOriginal: false
    }).then((res) => {
        console.log(res);
    });

    // db.close();
})
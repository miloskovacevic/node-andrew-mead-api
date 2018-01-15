// const MongoClient = require('mongodb').MongoClient;
const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err) {
        return console.log('Unable to connect to db server!');
    }
    console.log('Connected to MongoDb server');

    // delete many
    // db.collection('Users').deleteMany({name:"Milos"}).then((result) => {
    //     console.log(result);  
    // });
    // delete one
    //  db.collection('Users').deleteOne({name:"Srdjan"}).then((result) => {
    //     console.log(result);  
    // });
    // find one and delete
    db.collection('Users').findOneAndDelete({name: 'Srdjan'}).then((result) => {
        console.log(result);
    })


    // db.close();
})
const { ObjectId} = require('mongodb');
const { mongoose } = require('./../server/db/mongoose');
const { Todo } = require('./../server/models/todo');
const { User } = require('./../server/models/user');

// let id = '5a5fca6cef61439d6306c57911';
// if (!ObjectId.isValid(id)) {
//     console.log('id not valid!');
// } 

// Todo.find({
//     _id: id
// }).then((todos) => {
//     console.log('Todos:', todos);
// });

// Todo.findOne({
//     _id: id
// }).then((todo) => {
//     console.log('Todo:', todo);
// });

// Todo.findById(id)
//     .then((todo) => {
//         if (!todo) 
//             return console.log('id not found!')
//         console.log('todo by id: ', todo);
//     })
//     .catch((err) => {
//         console.log(err);
//     })


let id = '5a5d13f4455fe104c0d65c60';
if (!ObjectId.isValid(id)) {
    console.log('id not valid!');
}

User.findById(id)
    .then((user) => {
        if (!user)
            return console.log('user not found!');
        console.log('user: ', user);
    })
    .catch((err) => {
        console.log(err);
    })
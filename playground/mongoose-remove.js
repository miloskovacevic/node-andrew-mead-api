const { ObjectId} = require('mongodb');
const { mongoose } = require('./../server/db/mongoose');
const { Todo } = require('./../server/models/todo');
const { User } = require('./../server/models/user');


// Todo.remove({}).then((res) => {
//     console.log(res);
// })

Todo.findOneAndRemove({_id: '5a6e50f1384f21bbdd452efd'}).then((todo) => {
    
});

Todo.findByIdAndRemove('5a6e50f1384f21bbdd452efd').then((todo) => {
    console.log(todo);
})
const {ObjectId} = require('mongodb');

const {Todo} = require('./../../models/todo');
const {User} = require('./../../models/user');
const jwt = require('jsonwebtoken');


const userOneId = new ObjectId();
const userTwoId = new ObjectId();

const users = [{
    _id: userOneId,
    email:'milos@gmail.com',
    password: 'userOnePass',
    tokens: [
        {
            access:'auth', 
            token: jwt.sign({_id: userOneId, access: 'auth'},'abc123').toString()
        }
    ]
},
{
    _id: userTwoId,
    email:'milica@gmail.com',
    password: 'userTwoPass'
}
]


const todos = [{
    _id: new ObjectId(),
    text: 'first todo'
},
{
    _id: new ObjectId(),    
    text: 'second todo'
}];

const populateTodos = (done) => {
    Todo.remove({}).then(() => {
        return Todo.insertMany(todos);
    }).then(() => {
         done();
    })
};

const populateUsers = (done) => {
    User.remove({}).then(() => {
        let userOne = new User(users[0]).save();
        let userTwo = new User(users[1]).save();

        return Promise.all([userOne, userTwo]);
    }).then(() => {
         done();
    });
};


module.exports = {
    todos,
    populateTodos,
    populateUsers
};
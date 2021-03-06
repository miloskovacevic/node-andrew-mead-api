let env = process.env.NODE_ENV || 'development';

console.log('env ********', env);
if (env === 'development') {
    process.env.port = 3000;
    process.env.MONGODB_URI = 'mongodb://localhost:27107/TodoApp';
} else if (env === 'test') {
    process.env.port = 3000;
    process.env.MONGODB_URI = 'mongodb://localhost:27107/TodoAppTest'
}



const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');


const { ObjectId} = require('mongodb');
let { mongoose } = require('./db/mongoose');
let { Todo } = require('./models/todo');
let { User } = require('./models/user');
let { authenticate } = require('./middleware/authenticate');

let app = express();

app.use(bodyParser.json());

app.post('/users', (req, res) => {
    let body = _.pick(req.body, ['email','password']);
    let user = new User(body);

    user.save()
    .then(() => {
         return user.generateAuthToken();
    }).then((token) => {
        res.header('x-auth', token).send(user);
    }).catch(e => res.status(400).send(e));
});

app.get('/users/me', authenticate, (req, res) => {
    res.send(req.user);
});

app.post('/todos', authenticate, (req, res) => {
    console.log(req.body);
    let todo = new Todo({
        text: req.body.text,
        _creator: req.user._id
    })
    todo.save()
        .then((doc) => {
            res.send(doc);
        }, (err) => {
            res.status(400).send(err);
        });

});

app.get('/todos', authenticate, (req, res) => {
    Todo.find({
        _creator: req.user._id
    }).then((todos) => {
        res.send({todos});
    }, (err) => {
        res.status(400).send(e);
    })
});

app.get('/todos/:id', authenticate, (req, res) => {
    let id = req.params.id;
    if (!ObjectId.isValid(id)) {
        res.status(404).send();
    }
    Todo.findOne({
        _id: id,
        _creator: req.user._id
    })
        .then((todo) => {
            if (!todo) 
                return res.status(404).send();
            res.send({todo});
        }, (err) => {
            res.status(400).send();
        })
})


app.delete('/todos/:id', authenticate, (req,res) => {
    let id = req.params.id;

    if (!ObjectId.isValid(id)) {
        res.status(404).send();
    }

    Todo.findOneAndRemove({
        _id: id,
        _creator: req.user._id
    }).then((todo) => {
        if (!todo)
            return res.status(404).send();
        res.status(200).send({todo});
    }, (err) => {
        res.status(400).send();
    })
})


app.patch('/todos/:id', authenticate, (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['text','completed']);

    if (!ObjectId.isValid(id)) {
        res.status(404).send();
    }

    if (_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();
    } else {
        body.completed = false;
        body.completedAt = null;
    }

    Todo.findOneAndUpdate({
        _id: id,
        _creator: req.user._id
    }, {
        $set: body
    }, {new : true}).then((todo) => {
        if (!todo)
            return res.status(404).send();

            res.send({todo});
    }).catch(e => {
        res.status(400).send();
    })

});


// POST /users/login
app.post('/users/login', (req, res) => {
    let body = _.pick(req.body, ['email','password']);
    
    User.findByCredentials(body.email, body.password).then((user) => {
        return user.generateAuthToken().then((token) => {
            res.header('x-auth', token).send(user);
        });


    }).catch((err) => {
        res.status(400).send();
    })
});

app.delete('/users/me/token', authenticate, (req, res) => {
    req.user.removeToken(req.token).then(() => {
        res.status(200).send();
    }, () => {
        res.status(400).send();
    });


});


app.listen(3000, () => {
    console.log('app listens on port 3000...');
});

module.exports = { app }




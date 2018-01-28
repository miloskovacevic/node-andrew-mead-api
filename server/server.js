let express = require('express');
let bodyParser = require('body-parser');

const { ObjectId} = require('mongodb');
let { mongoose } = require('./db/mongoose');
let { Todo } = require('./models/todo');
let { User } = require('./models/user');

let app = express();

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
    console.log(req.body);
    let todo = new Todo({
        text: req.body.text
    })
    todo.save()
        .then((doc) => {
            res.send(doc);
        }, (err) => {
            res.status(400).send(err);
        });

});

app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        res.send({todos});
    }, (err) => {
        res.status(400).send(e);
    })
});

app.get('/todos/:id', (req, res) => {
    let id = req.params.id;
    if (!ObjectId.isValid(id)) {
        res.status(404).send();
    }
    Todo.findById(id)
        .then((todo) => {
            if (!todo) 
                return res.status(404).send();
            res.send({todo});
        }, (err) => {
            res.status(400).send();
        })
})


app.delete('/todos/:id', (req,res) => {
    let id = req.params.id;

    if (!ObjectId.isValid(id)) {
        res.status(404).send();
    }

    Todo.findByIdAndRemove(id).then((todo) => {
        if (!todo)
            return res.status(404).send();
        res.status(200).send({todo});
    }, (err) => {
        res.status(400).send();
    })
})

console.log('nja');



app.listen(3000, () => {
    console.log('app listens on port 3000...');
});

module.exports = { app }




const expect = require('expect');
const request = require('supertest');

const { app } = require('./../server');
const { Todo } = require('./../models/todo');

const { ObjectId }  = require('mongodb');



const todos = [{
    _id: new ObjectId(),
    text: 'first todo'
},
{
    _id: new ObjectId(),    
    text: 'second todo'
}];

beforeEach((done) => {
    Todo.remove({}).then(() => {
        return Todo.insertMany(todos);
    }).then(() => {
         done();
    })
});


describe('POST /todos', () => {
    it('should create a new todo', (done) => {
        let text = 'Test todo test';

        request(app)
          .post('/todos')
          .send({text})
          .expect(200)
          .expect((res) => {
              expect(res.body.text).toBe(text);
          })
          .end((err, res) => {
            if(err) {
                return done(err);
            }

            Todo.find({text}).then((todos) => {
                expect(todos.length).toBe(1);
                expect(todos[0].text).toBe(text);
                done();
            }).catch((err) => done(err));
          })
    })

    it('should not create todo with invalid data', (done) => {
        request(app)
          .post('/todos')
          .send({})
          .expect(400)
          .end((err, res) => {
              if (err) {
                  return done(err);
              }

              Todo.find().then((todos) => {
                  expect(todos.length).toBe(2);
                  done();
              }).catch((err) => done(err));


          })
    })
})

describe('GET /todos', () => {
    it('should get all todos', (done) => {
        request(app)
          .get('/todos')
          .expect(200)
          .expect((res) => {
              expect(res.body.todos.length).toBe(2);
          })
          .end(done)
    })
})

describe('GET /todos/:id', () => {
    it('should return todo doc!', (done) => {
        request(app)
        .get(`/todos/${todos[0]._id.toHexString()}`)
        .expect(200)
        .expect((res) => {
            expect(res.body.todo.text).toBe(todos[0].text);
        })
        .end(done);
    })

    it('should return 404 if todo not found!', (done) => {
        let hexId = new ObjectId().toHexString();

        request(app)
            .get(`/todos/${hexId}`)
            .expect(404)
            .end(done);
    });

    it('should return 404 for nonobject ids', (done) => {
        request(app)
            .get('/todos/123asd')
            .expect(404)
            .end(done);
    });
})

describe('DELETE /todos/:id', () => {
    it('should remove todo', (done) => {
        let hexId = todos[1]._id.toHexString();

        request(app)
        .delete(`/todos/${hexId}`)
        .expect(200)
        .expect((res) => {
            expect(res.body.todo._id).toBe(hexId);
        }).end((err, res) => {
            if (err)
                return done(err);
        })

        Todo.findById(hexId).then((todo) => {
            expect(todo).toNotExist();
            done();
        }).catch((e) => done(e));
        
    });

    it('should return 404 if todo not found', (done) => {
        let hexId = new ObjectId().toHexString();

        request(app)
            .delete(`/todos/${hexId}`)
            .expect(404)
            .end(done);
    })


    it('should return 404 if object id invalid', (done) => {
         request(app)
            .delete('/todos/123asd')
            .expect(404)
            .end(done);
    })
    
})

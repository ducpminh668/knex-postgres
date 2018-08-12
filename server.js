const express = require('express');
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;
const app = express();
const knex = require('./db/knex');
const knex_pooulate = require('knex-populate');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get('/todos', (req, res) => {
    knex.select().table('todos').then(todos => {
        res.send(todos)
    })
});

app.post('/todos', (req, res) => {
    knex.insert([{title: 'Great Gatsby', user_id: 1}, {title: 'Fahrenheit 451', user_id: 2}], 'id').into('todos')
        .then(() => {
            knex.select().table('todos').then(todos => {
                res.send(todos)
            })
        }).catch(err => console.log(err))
});

app.get('/todos-of-user/:id', (req, res) => {
    knex('todos').join('users', 'todos.user_id', 'users.id')
        .select('users.email').then(data => res.json(data))
});

app.get('/ttt', (req, res) => {
    knex_pooulate(knex, 'users')
        .find()
        .populate('todos', 'user_id', 'todos')
        .exec()
        .then(data => res.send('<pre><code>' +JSON.stringify(data, null, 4) + '</code></pre>'));
});

app.listen(port, () => {
    console.log('listen at port' + port);
});

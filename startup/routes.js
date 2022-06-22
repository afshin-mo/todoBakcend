const express = require('express');
const users = require('../routes/users');
const login = require('../routes/login');
const todos = require('../routes/todos');
const error = require('../middlewares/error');


module.exports = ( app ) => {
    app.use( express.json());
    app.use('/api/users', users);
    app.use('/api/login', login);
    app.use('/api/todos', todos);
    app.use(error);
}

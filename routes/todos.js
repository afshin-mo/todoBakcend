const express = require('express');
const { User } = require('../models/user.model');
const { Todo, validate } = require('../models/todo.model');
const _ = require('lodash');
const auth = require('../middlewares/auth');
const Joi = require('joi');

const router = express.Router();

// create new todo
router.post('/', auth, async( req, res ) => {

    const { error } = validate( req.body );
    if(error){
        return res.status(400).send( error.details[0].message );
    }
    const user = await User.findById( req.body.userId ).select('-password');
    if( !user ) {
        return res.status(404).send('Invalid userId');
    }
    const todo = new Todo ( _.pick( req.body, ['userId', 'title', 'content', 'createdOn', 'status']));
    await todo.save();
    res.status(200).send(_.pick( todo, ['title', 'content', 'createdOn', 'status']));
})

// update todo
router.put('/:id', auth, async ( req, res ) => {

    // check valid id
    const isValid = checkValidId({ todoId: req.params.id });
    if( isValid.error ){
        return res.status(400).send( isValid.error.details[0].message );
    }
    // check if todo data is valid
    const { error } = validate( req.body );
    if(error){
        return res.status(400).send( error.details[0].message );
    }

    // check existance of todo with given id
    let todo = await Todo.findOneAndUpdate(
        { 
            _id: req.params.id, userId: req.body.userId 
        },
        {
            $set:  _.pick( req.body, ['title', 'content', 'createdOn', 'status'])
        },{
            new: true
        });

    if( !todo ){
        res.status(404).send('todo with given id does not exists!');
    }
    res.status(200).send(todo);
})

// delete user's todo
router.delete('/:id', auth, async( req, res ) => {
    // check valid id
    const isValid = checkValidId({ todoId: req.params.id });
    if( isValid.error ){
        return res.status(400).send( isValid.error.details[0].message );
    }
    // find and delete user's todo if exists
    let result = await Todo.deleteOne({_id: req.params.id, userId: req.body.userId });
    if ( !result.deletedCount ) {
        return res.status(404).send('todo with given id does not exists!');
    }
    res.status(200).send(result);
})

// return all todos related to auth user
router.get('/', auth, async( req, res ) => {
    const todos = await Todo.find({ userId: req.body.userId }).sort( { createdOn: 1 })
    if( !todos.length ){
        return res.status(200).send('this user has no todos yet!');
    }
    res.status(200).send(todos);
})

const checkValidId = ( id ) =>{
    //check valid todo id
    const schema  = Joi.object({
        todoId: Joi.string()
            .regex(/^[0-9a-fA-F]{24}$/)
            .required()
            .messages({ "Id": "must be of type object" })
    },
    );
    return schema.validate( id );
}

module.exports = router;
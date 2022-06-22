const mongoose = require('mongoose');
const Joi  = require('joi');
const { date } = require('joi');

const todoSchema = mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    title:{
        type: String,
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255
    },
    content:{
        type: String,
        required: true,
        minlength: 10,
        maxlength: 1024
    },
    createdOn:{
        type: Date,
        default: Date.now,
        required: true
    },
    status:{
        type: Boolean,
        required: true
    }
});
const Todo =  mongoose.model('Todo', todoSchema);

const validateTodo = ( todo ) => {
    const schema = Joi.object({
        userId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
        title: Joi.string().min(5).max(255).required(),
        content: Joi.string().min(10).max(1024).required(),
        createdOn: Joi.date(),
        status: Joi.boolean().required()
    }).unknown();
    return schema.validate( todo );
}

exports.validate = validateTodo;
exports.Todo = Todo;
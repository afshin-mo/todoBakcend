const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config()
const mongoConnectionString = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.rqlqi.mongodb.net/myTodoApp?retryWrites=true&w=majority`;

module.exports = ()=>{
    mongoose.connect(mongoConnectionString)
    .then( console.log('connected to todoDatabase'));
}

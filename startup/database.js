const mongoose = require('mongoose');
const dotenv = require('dotenv');
const logger = require('../logging/logger');

dotenv.config()
const mongoConnectionString = process.env.DB_CONNECTION_STRING;

module.exports = ()=>{
    mongoose.connect( mongoConnectionString, { useUnifiedTopology: true })
    .then( logger.info('connected to todoDatabase'));
}

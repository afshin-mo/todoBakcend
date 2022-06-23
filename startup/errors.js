require('express-async-errors');
const logger = require('../logging/logger');
const winston = require('winston');

module.exports = function () {

    process.on('uncaughtException',( ex )=>{
        logger.error(ex.message, ex);
    });

    process.on('unhandledRejection',( ex )=>{
        throw (ex);
    })
}

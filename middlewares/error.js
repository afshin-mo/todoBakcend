const logger = require('../logging/logger');
module.exports =  ( err, req, res, next ) => {
    logger.error(err.message);
    res.status(500).json({
        msg: err.message,
        success: false
    })
}
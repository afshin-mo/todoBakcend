const logger = require('../logging/logger');
const dotenv = require('dotenv');
dotenv.config();

module.exports = () => {
    if( !process.env.jwtPrivateKey){
        throw new Error('Fatal Error: jwtPrivateKey not provided!');
    }
}
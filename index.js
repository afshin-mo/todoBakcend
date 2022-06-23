require('express-async-errors');
const express = require ('express');
const app = express();
const logger = require('./logging/logger');

require('./startup/errors')();
require('./startup/routes')( app );
require('./startup/config')();
require('./startup/database')();


const port = process.env.PORT || 3000;
app.listen( port, () => logger.info(`listen to port number ${port}`))
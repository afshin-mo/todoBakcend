require('express-async-errors');
const express = require ('express');
const app = express();

require('./startup/errors');
require('./startup/database')();
require('./startup/routes')( app );

const port = process.env.PORT || 3000;
app.listen( port, () => console.log(`listen to port number ${port}`))
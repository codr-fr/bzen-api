const express = require('express');
//const bearerToken = require('express-bearer-token');
//const checkBearerToken = require('./middlewares/checkBearerToken');
const cors = require('./middlewares/cors');

const app = express();

app.use(express.json()); // for application/json
app.use(express.urlencoded({ extended: true })); //for application/xwww-
app.use(cors);
//app.use(bearerToken());
//app.use(checkBearerToken);

module.exports = app;
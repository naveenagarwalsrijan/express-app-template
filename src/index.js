if (!process.env.ALREADY_SET) require('dotenv').config();
if (process.env.NEW_RELIC_KEY) require('newrelic');

const express = require('express');
const app = express();
const port = process.env.PORT;
const bodyParser = require('body-parser');
const logger = require('./config/logger');
const middlewares = require('./middlewares')
const { NOT_FOUND_STATUS_CODE, NOT_FOUND_STATUS_MESSAGE } = require('./config/constants');

global.Promise = require('bluebird');
global.env = process.env.ENV;
global.config = require(`./config/environments/${global.env}`);
const params = require('strong-params');

logger.init();

// your pre-routes-middlewares
app.use(bodyParser.json());
app.use(params.expressMiddleware());
// your routes
// your post-routes-middlewares
app.use(middlewares.handleErrors);
// Catch 404 and forward to error handlers
app.use((req, res, next) => {
    const err = new Error(NOT_FOUND_STATUS_MESSAGE);
    res.statusCode = NOT_FOUND_STATUS_CODE;
    res.send(err.message);
});

app.get('/health', (req, res) => res.json({status: true, message: 'Health OK!'}));

app.listen(port, () => global.logger.info(`Example app listening on port ${port}!`));
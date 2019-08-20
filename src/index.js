if (!process.env.ALREADY_SET) require('dotenv').config();
if (process.env.NEW_RELIC_KEY) require('newrelic');

const express = require('express');
const app = express();
const port = process.env.PORT;
const bodyParser = require('body-parser');
const logger = require('./config/logger');
const middlewares = require('./middlewares')
const { NOT_FOUND_STATUS_CODE } = require('./config/constants');

logger.init();

// your pre-routes-middlewares
app.use(bodyParser.json());
// your routes
// your post-routes-middlewares
app.use(middlewares.handleErrors);
// Catch 404 and forward to error handlers
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = NOT_FOUND_STATUS_CODE;
    next(err);
});

app.get('/', (req, res) => res.json({message: 'Hello World!'}));
app.get('/health', (req, res) => res.json({status: true, message: 'Health OK!'}));

app.listen(port, () => global.logger.info(`Example app listening on port ${port}!`));
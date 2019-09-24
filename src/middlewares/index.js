const {
  NOT_FOUND_STATUS_CODE,
  NOT_FOUND_STATUS_MESSAGE,
  BAD_REQUEST_STATUS_CODE,
  INTERVAL_SERVER_STATUS_CODE,
  INTERVAL_SERVER_MESSAGE,
  BAD_REQUEST_STATUS_MESSAGE
} = require ('../config/constants');

const util = require('../utility/util');

const { NotFoundException, ServerException, BadRequestException } = require('../lib/custom-errors');

const middlewares = {
  setDefaultHeaders (req, res, next) {
    if (!req.url.includes ('api-specs')) res.setHeader ('Content-Type', 'application/json');
    next ();
  },

  handleRequestError (error, req, res, next) {

    switch (true) {
      case (error instanceof  NotFoundException):
        res.status (NOT_FOUND_STATUS_CODE).json ({
          success: false, error: NOT_FOUND_STATUS_MESSAGE, statusCode: NOT_FOUND_STATUS_CODE
        });
        break;
      case (error instanceof  ServerException):
        res.status (INTERVAL_SERVER_STATUS_CODE).json ({
          success: false, error: INTERVAL_SERVER_MESSAGE , statusCode: INTERVAL_SERVER_STATUS_CODE
        });
        break;
      case (error instanceof  BadRequestException):
        res.status (BAD_REQUEST_STATUS_CODE).json ({
          success: false, error: BAD_REQUEST_STATUS_MESSAGE, statusCode: BAD_REQUEST_STATUS_CODE
        });
        break;
      default:
        res.status (INTERVAL_SERVER_STATUS_CODE).json ({
          success: false, error: INTERVAL_SERVER_MESSAGE , statusCode: INTERVAL_SERVER_STATUS_CODE
        });
        util.handleRuntimeError(error);
    }
    global.logger.info ('Request handle error!!');
    res.end();
  },
};

module.exports = middlewares;
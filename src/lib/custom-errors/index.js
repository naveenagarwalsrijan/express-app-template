module.exports = {
  BadRequestException : class BadRequestException extends Error {},
  NotFoundException: class NotFoundException extends Error {},
  ServerException: class ServerException extends Error {}
};
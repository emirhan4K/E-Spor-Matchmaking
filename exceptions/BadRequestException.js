const BaseException = require("./BaseException");

class BadRequestException extends BaseException {
  constructor(message) {
    super(message, 400);
  }
}

module.exports = BadRequestException;
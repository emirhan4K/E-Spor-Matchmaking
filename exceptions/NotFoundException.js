const BaseException = require("./BaseException");

class NotFoundException extends BaseException {
  constructor(message) {
    super(message, 404);
  }
}

module.exports = NotFoundException;
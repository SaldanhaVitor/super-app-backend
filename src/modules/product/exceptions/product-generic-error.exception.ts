import { HttpException, HttpStatus } from '@nestjs/common';

export default class ProductGenericException extends HttpException {
  constructor(message?: string, httpStatus?: HttpStatus) {
    super(message, httpStatus);
  }
}

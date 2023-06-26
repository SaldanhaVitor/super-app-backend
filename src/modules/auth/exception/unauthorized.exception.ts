import { HttpException, HttpStatus } from '@nestjs/common';
import getConstant from '../../../constants/get-constants';

export default class UnauthorizedException extends HttpException {
  constructor(message?: string, httpStatus?: HttpStatus) {
    super(
      message || getConstant().LOGIN.UNAUTHORIZED,
      httpStatus || HttpStatus.UNAUTHORIZED,
    );
  }
}

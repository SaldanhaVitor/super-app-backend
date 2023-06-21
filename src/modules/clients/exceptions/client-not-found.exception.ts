import { HttpException, HttpStatus } from '@nestjs/common';
import getConstant from '../../../constants/get-constants';

export default class ClientNotFoundException extends HttpException {
  constructor(message?: string, httpStatus?: HttpStatus) {
    super(
      message || getConstant().CLIENT.NOT_FOUND,
      httpStatus || HttpStatus.NOT_FOUND,
    );
  }
}

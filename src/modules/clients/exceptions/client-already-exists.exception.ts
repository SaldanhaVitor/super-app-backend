import { HttpException, HttpStatus } from '@nestjs/common';
import getConstant from '../../../constants/get-constants';

export default class ClientAlreadyExistsException extends HttpException {
  constructor(message?: string, httpStatus?: HttpStatus) {
    super(
      message || getConstant().CLIENT.ALREADY_EXISTS,
      httpStatus || HttpStatus.UNPROCESSABLE_ENTITY,
    );
  }
}

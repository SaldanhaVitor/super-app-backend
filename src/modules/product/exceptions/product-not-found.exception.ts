import { HttpException, HttpStatus } from '@nestjs/common';
import getConstant from '../../../constants/get-constants';

export default class ProductNotFoundException extends HttpException {
  constructor(message?: string, httpStatus?: HttpStatus) {
    super(
      message || getConstant().PRODUCT.NOT_FOUND,
      httpStatus || HttpStatus.NOT_FOUND,
    );
  }
}

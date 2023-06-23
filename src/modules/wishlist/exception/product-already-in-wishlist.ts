import { HttpException, HttpStatus } from '@nestjs/common';
import getConstant from '../../../constants/get-constants';

export default class ProductAlreadyInWishlistException extends HttpException {
  constructor(message?: string, httpStatus?: HttpStatus) {
    super(
      message || getConstant().WISHLIST.PRODUCT_ALREADY_EXISTS,
      httpStatus || HttpStatus.CONFLICT,
    );
  }
}

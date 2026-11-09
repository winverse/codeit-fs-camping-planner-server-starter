import { HTTP_STATUS } from '#constants';
import { HttpException } from './http.exception.js';

export class BadRequestException extends HttpException {
  constructor(message, details = null) {
    super(HTTP_STATUS.BAD_REQUEST, message, details);
  }
}

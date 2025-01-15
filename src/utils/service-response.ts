import { StatusCodes } from 'http-status-codes';

/**
 * This class is used to return service errors / info back to the controller so the controller can respond with the correct message.
 */
export class ServiceResponse<T = null> {
  readonly success: boolean;
  readonly statusCode: number;
  readonly message: string;
  readonly responseObject: T;

  private constructor(success: boolean, message: string, responseObject: T, statusCode: number) {
    this.success = success;
    this.statusCode = statusCode;
    this.message = message;
    this.responseObject = responseObject;
  }

  static setResponse<T>(success: boolean, message: string, responseObject: T, statusCode: number = StatusCodes.OK): ServiceResponse<T> {
    return new ServiceResponse(success, message, responseObject, statusCode);
  }
}

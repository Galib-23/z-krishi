export class CustomError extends Error {
  statusCode: number;
  errorCode?: string;
  errors?: any;

  constructor(message: string, statusCode: number = 500, errorCode?: string, errors?: any) {
    super(message);
    this.statusCode = statusCode;
    this.errorCode = errorCode;
    this.errors = errors;
    Object.setPrototypeOf(this, CustomError.prototype);
  }
}

import {HttpErrors} from '@loopback/rest';

export class Error {
  constructor(message?: string, status?: number) {
    throw this.parseError(message, status);
  }

  parseError(message?: string, status?: number) {
    if (status === 417) {
      return new HttpErrors.ExpectationFailed(message);
    } else if (status === 400) {
      return new HttpErrors.BadRequest(message);
    } else if (status === 401) {
      return new HttpErrors.Unauthorized(message);
    } else if (status === 403) {
      return new HttpErrors.Forbidden(message);
    } else if (status === 404) {
      return new HttpErrors.NotFound(message);
    }
    return new HttpErrors.UnprocessableEntity(message);
  }
}

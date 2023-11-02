import { FieldErrors } from '../validators/validator-fields.interface';

export class ValidationError extends Error {
  constructor(message?: string) {
    super(message ?? 'ValidationError');
    this.name = 'ValidationError';
    this.stack = `${this.message}\n${this.stack}`;
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export class EntityValidationError extends Error {
  constructor(public errors: FieldErrors) {
    super(`${JSON.stringify(errors, null, 2)}`);
    this.name = 'EntityValidationError';
  }
}

import { FieldErrors } from '../validators/validator-fields.interface';

export class ValidationError extends Error {}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export class EntityValidationError<T = any> extends Error {
  constructor(public errors?: FieldErrors<T> | null) {
    super(`EntityValidationError: ${JSON.stringify(errors, null, 2)}`);
    this.name = 'EntityValidationError';
  }
}

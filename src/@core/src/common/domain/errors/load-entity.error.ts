import { FieldErrors } from '../validators';

export class LoadEntityError extends Error {
  constructor(
    public errors: FieldErrors,
    message?: string
  ) {
    super(message ?? 'An entity cannot be loaded');
    this.name = 'LoadEntityError';
  }
}

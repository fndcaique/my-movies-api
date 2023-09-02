import { randomUUID } from 'crypto';
import { InvalidUuidError } from '../errors/invalid-uuid.error';
import { isValidUUID } from '../utils/is-valid-uuid';
import { ValueObject } from './value-object';

export class UniqueEntityId extends ValueObject<string> {
  constructor(id?: string) {
    super(id || randomUUID());
    this.validate();
  }

  private validate() {
    const isValid = isValidUUID(this.value);
    if (!isValid) {
      throw new InvalidUuidError();
    }
  }
}

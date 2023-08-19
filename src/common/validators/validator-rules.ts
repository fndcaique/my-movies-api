import ValidationError from '../errors/validation.error';

export default class ValidatorRules {
  private constructor(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private value: any,
    private label: string
  ) {}

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static values(value: any, label: string) {
    return new ValidatorRules(value, label);
  }

  required() {
    if (this.value === null || this.value === undefined || this.value === '') {
      throw new ValidationError(`The ${this.label} is required`);
    }
    return this;
  }
  string() {
    if (
      this.value !== undefined &&
      this.value !== null &&
      typeof this.value !== 'string'
    ) {
      throw new ValidationError(`The ${this.label} must be a string`);
    }
    return this;
  }
  maxLength(max: number) {
    const s = max > 1 ? 's' : '';
    if (
      this.value !== undefined &&
      this.value !== null &&
      this.value.length > max
    ) {
      throw new ValidationError(
        `The ${this.label} must have a maximum of ${max} ${
          typeof this.value === 'string' ? 'character' + s : 'item' + s
        }`
      );
    }
    return this;
  }
  minLength(min: number) {
    const s = min > 1 ? 's' : '';
    if (
      this.value !== undefined &&
      this.value !== null &&
      this.value.length < min
    ) {
      throw new ValidationError(
        `The ${this.label} must have a minimum of ${min} ${
          typeof this.value === 'string' ? 'character' + s : 'item' + s
        }`
      );
    }
    return this;
  }
  boolean() {
    if (
      this.value !== undefined &&
      this.value !== null &&
      typeof this.value !== 'boolean'
    ) {
      throw new ValidationError(`The ${this.label} must be a boolean`);
    }
    return this;
  }
}

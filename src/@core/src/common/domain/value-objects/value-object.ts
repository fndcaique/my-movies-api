import { deepFreeze } from '../utils/functions';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export abstract class ValueObject<Value = any> {
  public readonly value: Value;

  constructor(value: Value) {
    this.value = deepFreeze(value);
  }

  toString() {
    if (typeof this.value !== 'object' || this.value === null) {
      return this.value + '';
    }
    const valueString = this.value.toString();
    return valueString === '[object Object]'
      ? JSON.stringify(this.value)
      : valueString;
  }
}

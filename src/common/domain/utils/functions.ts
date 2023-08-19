export function deepFreeze<T>(obj: T) {
  if (typeof obj !== 'object' || obj === null) {
    return obj;
  }
  const propNames = Object.getOwnPropertyNames(obj);
  propNames.forEach((name) => {
    const value = obj[name as keyof T];

    if (value && typeof value === 'object') {
      deepFreeze(value);
    }
  });
  return Object.freeze(obj);
}

export function toInteger(value: unknown): number {
  return parseInt(`${value}`, 10);
}

export function toString(value: unknown): string {
  return isDefined(value) ? `${value}` : '';
}

export function isString(value: unknown): value is string {
  return typeof value === 'string';
}

export function isNumber(value: unknown): value is number {
  return !isNaN(toInteger(value));
}

export function isInteger(value: unknown): value is number {
  return (
    typeof value === 'number' && isFinite(value) && Math.floor(value) === value
  );
}

export function isDefined(value: unknown): boolean {
  return value !== undefined && value !== null;
}

export function padNumber(value: number) {
  if (isNumber(value)) {
    return `0${value}`.slice(-2);
  } else {
    return '';
  }
}

export function removeAccents(str: string): string {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

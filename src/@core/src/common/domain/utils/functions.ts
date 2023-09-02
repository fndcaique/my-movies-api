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

export function isEmpty(value: unknown): boolean {
  return (
    !isDefined(value) ||
    (typeof (value as { length?: number }).length !== 'undefined' &&
      (value as { length?: number }).length === 0)
  );
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function deepEqual(object1: any, object2: any) {
  if (
    (!isObject(object1) && isObject(object2)) ||
    (isObject(object1) && !isObject(object2))
  ) {
    return false;
  }
  const keys1 = Object.keys(object1);
  const keys2 = Object.keys(object2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  for (const key of keys1) {
    const val1 = object1[key];
    const val2 = object2[key];
    const areObjects = isObject(val1) && isObject(val2);
    if (
      (areObjects && !deepEqual(val1, val2)) ||
      (!areObjects && val1 !== val2)
    ) {
      return false;
    }
  }

  return true;
}

export function isObject(object: unknown) {
  return object != null && typeof object === 'object';
}

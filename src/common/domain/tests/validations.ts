/* eslint-disable @typescript-eslint/no-explicit-any */
import { EntityValidationError } from '../errors/validation.error';
import ClassValidatorFields from '../validators/class-validator-fields';
import { FieldErrors } from '../validators/validator-fields.interface';

type TestData =
  | { validator: ClassValidatorFields<any>; data: any }
  | (() => unknown);

expect.extend({
  containsErrorMessages(
    testData: TestData,
    expected: FieldErrors<any>
  ): { pass: boolean; message: () => string } {
    if (typeof testData === 'function') {
      try {
        testData();
        return { pass: false, message: () => 'Expected data to be invalid' };
      } catch (error) {
        const e = error as EntityValidationError;

        return assertContains(expected, e.errors ?? {});
      }
    } else {
      const { validator, data } = testData;
      const isValid = validator.validate(data);

      if (isValid) {
        return { pass: false, message: () => 'Expected data to be invalid' };
      }

      return assertContains(expected, validator.errors ?? {});
    }
  }
});

function assertContains(expected: FieldErrors, received: FieldErrors) {
  const pass = expect.objectContaining(received).asymmetricMatch(expected);

  return {
    pass,
    message: () =>
      `Expected errors to ${pass ? 'not ' : ''}equal: ${JSON.stringify(
        expected,
        null,
        2
      )}\n\nReceived: ${JSON.stringify(received, null, 2)}`
  };
}

import ClassValidatorFields from '../validators/class-validator-fields';
import { FieldErrors } from '../validators/validator-fields.interface';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type TestData = { validator: ClassValidatorFields<any>; data: any };

expect.extend({
  containsErrorMessages(
    testData: TestData,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    received: FieldErrors<any>
  ): { pass: boolean; message: () => string } {
    const { validator, data } = testData;
    const isValid = validator.validate(data);

    if (isValid) {
      return { pass: false, message: () => 'Expected data to be invalid' };
    }

    const pass = expect
      .objectContaining(received)
      .asymmetricMatch(validator.errors);

    return {
      pass,
      message: () =>
        `Expected errors to ${pass ? 'not ' : ''}equal: ${JSON.stringify(
          received,
          null,
          2
        )}\n\nReceived: ${JSON.stringify(validator.errors, null, 2)}`
    };
  }
});

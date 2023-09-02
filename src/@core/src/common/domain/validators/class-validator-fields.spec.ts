import * as libClassValidator from 'class-validator';
import { ClassValidatorFields } from './class-validator-fields';

class StubClassValidatorFields extends ClassValidatorFields<{
  field: string;
}> {}

describe('ClassValidatorFields Unit Tests', () => {
  it('should initialize errors and validatedData attributes with null', () => {
    const validator = new StubClassValidatorFields();
    expect(validator.errors).toBeNull();
    expect(validator.validatedData).toBeNull();
  });

  it('should validate with errors', () => {
    const spyValidateSync = jest.spyOn(libClassValidator, 'validateSync');
    spyValidateSync.mockReturnValue([
      { property: 'field', constraints: { isRequired: 'some error' } }
    ]);
    const validator = new StubClassValidatorFields();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect(validator.validate(null as any)).toBe(false);
    expect(spyValidateSync).toHaveBeenCalledTimes(1);
    expect(validator.validatedData).toBeNull();
    expect(validator.errors).toEqual({ field: ['some error'] });
  });

  it('should validate without errors', () => {
    const spyValidateSync = jest.spyOn(libClassValidator, 'validateSync');
    spyValidateSync.mockReturnValue([]);
    const validator = new StubClassValidatorFields();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect(validator.validate({ field: 'value' })).toBe(true);
    expect(spyValidateSync).toHaveBeenCalledTimes(1);
    expect(validator.validatedData).toEqual({ field: 'value' });
    expect(validator.errors).toBeNull();
  });
});

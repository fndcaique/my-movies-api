/* eslint-disable @typescript-eslint/no-explicit-any */
import { ValidationError } from '../errors/validation.error';
import { ValidatorRules } from './validator-rules';

type AssertParams = {
  value: any;
  label: string;
  rule: keyof ValidatorRules;
  error: ValidationError;
  params?: any[];
};

function runRule({ value, label, rule, params = [] }: AssertParams) {
  const validator = ValidatorRules.values(value, label) as any;
  const method = validator[rule];
  method.apply(validator, params);
}

function assertIsInvalid(params: AssertParams) {
  expect(() => {
    runRule(params);
  }).toThrow(params.error);
}

function assertIsValid(params: AssertParams) {
  expect(() => {
    runRule(params);
  }).not.toThrow(params.error);
}

describe('ValidatorRules Unit Tests', () => {
  test('values method', () => {
    const validator = ValidatorRules.values('some value', 'field');
    expect(validator).toBeInstanceOf(ValidatorRules);
    expect(validator['value']).toBe('some value');
    expect(validator['label']).toBe('field');
  });

  describe('required validation rule', () => {
    it('should throw required error', () => {
      const arrange = [
        {
          value: null,
          label: 'field',
          errorMessage: 'The field is required',
        },
        {
          value: undefined,
          label: 'field',
          errorMessage: 'The field is required',
        },
        {
          value: '',
          label: 'field',
          errorMessage: 'The field is required',
        },
      ];

      arrange.forEach(({ value, label, errorMessage }) => {
        assertIsInvalid({
          value,
          label,
          rule: 'required',
          error: new ValidationError(errorMessage),
        });
      });
    });

    it('should not throw required error', () => {
      const arrange = [
        {
          value: 'a',
          label: 'field',
          errorMessage: 'The field is required',
        },
        {
          value: 0,
          label: 'field',
          errorMessage: 'The field is required',
        },
        {
          value: 100,
          label: 'field',
          errorMessage: 'The field is required',
        },
        {
          value: true,
          label: 'field',
          errorMessage: 'The field is required',
        },
        {
          value: false,
          label: 'field',
          errorMessage: 'The field is required',
        },
        {
          value: [],
          label: 'field',
          errorMessage: 'The field is required',
        },
        {
          value: {},
          label: 'field',
          errorMessage: 'The field is required',
        },
      ];

      arrange.forEach(({ value, label, errorMessage }) => {
        assertIsValid({
          value,
          label,
          rule: 'required',
          error: new ValidationError(errorMessage),
        });
      });
    });
  });

  describe('string validation rule', () => {
    it('should throw string error', () => {
      const arrange = [
        {
          value: 0,
          label: 'field',
          errorMessage: 'The field must be a string',
        },
        {
          value: true,
          label: 'field',
          errorMessage: 'The field must be a string',
        },
        {
          value: false,
          label: 'field',
          errorMessage: 'The field must be a string',
        },
        {
          value: {},
          label: 'field',
          errorMessage: 'The field must be a string',
        },
        {
          value: [],
          label: 'field',
          errorMessage: 'The field must be a string',
        },
      ];

      arrange.forEach(({ value, label, errorMessage }) => {
        assertIsInvalid({
          value,
          label,
          rule: 'string',
          error: new ValidationError(errorMessage),
        });
      });
    });

    it('should not throw string error', () => {
      const arrange = [
        {
          value: undefined,
          label: 'field',
          errorMessage: 'The field must be a string',
        },
        {
          value: null,
          label: 'field',
          errorMessage: 'The field must be a string',
        },
        {
          value: 'a',
          label: 'field',
          errorMessage: 'The field must be a string',
        },
        {
          value: '0',
          label: 'field',
          errorMessage: 'The field must be a string',
        },
        {
          value: '',
          label: 'field',
          errorMessage: 'The field must be a string',
        },
        {
          value: 'true',
          label: 'field',
          errorMessage: 'The field must be a string',
        },
        {
          value: 'false',
          label: 'field',
          errorMessage: 'The field must be a string',
        },
        {
          value: '[]',
          label: 'field',
          errorMessage: 'The field must be a string',
        },
        {
          value: '{}',
          label: 'field',
          errorMessage: 'The field must be a string',
        },
      ];

      arrange.forEach(({ value, label, errorMessage }) => {
        assertIsValid({
          value,
          label,
          rule: 'string',
          error: new ValidationError(errorMessage),
        });
      });
    });
  });

  describe('maxLength validation rule', () => {
    it('should throw maxLength error', () => {
      const arrange: { value: any; label: string; errorMessage: string }[] = [
        {
          value: 'me',
          label: 'field',
          errorMessage: 'The field must have a maximum of 1 character',
        },
        {
          value: 'you',
          label: 'field',
          errorMessage: 'The field must have a maximum of 1 character',
        },
        {
          value: 'he',
          label: 'field',
          errorMessage: 'The field must have a maximum of 1 character',
        },
        {
          value: ['', 'she'],
          label: 'field',
          errorMessage: 'The field must have a maximum of 1 item',
        },
      ];

      arrange.forEach(({ value, label, errorMessage }) => {
        assertIsInvalid({
          value,
          label,
          rule: 'maxLength',
          error: new ValidationError(errorMessage),
          params: [1],
        });
      });
    });

    it('should not throw maxLength error', () => {
      const arrange = [
        {
          value: null,
          label: 'field',
          errorMessage: 'The field must have a maximum of 1 character',
        },
        {
          value: undefined,
          label: 'field',
          errorMessage: 'The field must have a maximum of 1 character',
        },
        {
          value: 'a',
          label: 'field',
          errorMessage: 'The field must have a maximum of 1 character',
        },
        {
          value: '0',
          label: 'field',
          errorMessage: 'The field must have a maximum of 1 character',
        },
        {
          value: '',
          label: 'field',
          errorMessage: 'The field must have a maximum of 1 character',
        },
        {
          value: ['she'],
          label: 'field',
          errorMessage: 'The field must have a maximum of 1 item',
        },
        {
          value: [],
          label: 'field',
          errorMessage: 'The field must have a maximum of 1 item',
        },
      ];

      arrange.forEach(({ value, label, errorMessage }) => {
        assertIsValid({
          value,
          label,
          rule: 'maxLength',
          error: new ValidationError(errorMessage),
          params: [1],
        });
      });
    });
  });

  describe('minLength validation rule', () => {
    it('should throw minLength error', () => {
      const arrange: { value: any; label: string; errorMessage: string }[] = [
        {
          value: '',
          label: 'field',
          errorMessage: 'The field must have a minimum of 1 character',
        },
        {
          value: [],
          label: 'field',
          errorMessage: 'The field must have a minimum of 1 item',
        },
      ];

      arrange.forEach(({ value, label, errorMessage }) => {
        assertIsInvalid({
          value,
          label,
          rule: 'minLength',
          error: new ValidationError(errorMessage),
          params: [1],
        });
      });
    });

    it('should not throw minLength error', () => {
      const arrange = [
        {
          value: null,
          label: 'field',
          errorMessage: 'The field must have a minimum of 1 character',
        },
        {
          value: undefined,
          label: 'field',
          errorMessage: 'The field must have a minimum of 1 character',
        },
        {
          value: 'ab',
          label: 'field',
          errorMessage: 'The field must have a minimum of 1 character',
        },
        {
          value: '0',
          label: 'field',
          errorMessage: 'The field must have a minimum of 1 character',
        },
        {
          value: ['she'],
          label: 'field',
          errorMessage: 'The field must have a minimum of 1 item',
        },
      ];

      arrange.forEach(({ value, label, errorMessage }) => {
        assertIsValid({
          value,
          label,
          rule: 'minLength',
          error: new ValidationError(errorMessage),
          params: [1],
        });
      });
    });
  });

  describe('boolean validation rule', () => {
    it('should throw boolean error', () => {
      const arrange: { value: any; label: string; errorMessage: string }[] = [
        {
          value: '',
          label: 'field',
          errorMessage: 'The field must be a boolean',
        },
        {
          value: 0,
          label: 'field',
          errorMessage: 'The field must be a boolean',
        },
        {
          value: {},
          label: 'field',
          errorMessage: 'The field must be a boolean',
        },
        {
          value: [],
          label: 'field',
          errorMessage: 'The field must be a boolean',
        },
      ];

      arrange.forEach(({ value, label, errorMessage }) => {
        assertIsInvalid({
          value,
          label,
          rule: 'boolean',
          error: new ValidationError(errorMessage),
          params: [1],
        });
      });
    });

    it('should not throw boolean error', () => {
      const arrange = [
        {
          value: undefined,
          label: 'field',
          errorMessage: 'The field must be a boolean',
        },
        {
          value: null,
          label: 'field',
          errorMessage: 'The field must be a boolean',
        },
        {
          value: true,
          label: 'field',
          errorMessage: 'The field must be a boolean',
        },
        {
          value: false,
          label: 'field',
          errorMessage: 'The field must be a boolean',
        },
      ];

      arrange.forEach(({ value, label, errorMessage }) => {
        assertIsValid({
          value,
          label,
          rule: 'boolean',
          error: new ValidationError(errorMessage),
          params: [1],
        });
      });
    });
  });

  it('should throw a validation error when value not pass on one of rules', () => {
    let validator = ValidatorRules.values(null, 'xablau');
    expect(() => validator.required().string().maxLength(5)).toThrow(
      new ValidationError('The xablau is required'),
    );
    expect(() => validator.string().maxLength(5).required()).toThrow(
      new ValidationError('The xablau is required'),
    );

    validator = ValidatorRules.values(undefined, 'xablau');
    expect(() => validator.required().string().maxLength(5)).toThrow(
      new ValidationError('The xablau is required'),
    );
    expect(() => validator.string().maxLength(5).required()).toThrow(
      new ValidationError('The xablau is required'),
    );

    validator = ValidatorRules.values(0, 'xablau');
    expect(() => validator.required().string().maxLength(5)).toThrow(
      new ValidationError('The xablau must be a string'),
    );

    validator = ValidatorRules.values('123456', 'xablau');
    expect(() => validator.required().string().maxLength(5)).toThrow(
      new ValidationError('The xablau must have a maximum of 5 characters'),
    );

    validator = ValidatorRules.values(null, 'xablau');
    expect(() => validator.required().boolean()).toThrow(
      new ValidationError('The xablau is required'),
    );
    expect(() => validator.boolean().required()).toThrow(
      new ValidationError('The xablau is required'),
    );

    validator = ValidatorRules.values(undefined, 'xablau');
    expect(() => validator.required().boolean()).toThrow(
      new ValidationError('The xablau is required'),
    );
    expect(() => validator.boolean().required()).toThrow(
      new ValidationError('The xablau is required'),
    );

    validator = ValidatorRules.values('undefined', 'xablau');
    expect(() => validator.required().boolean()).toThrow(
      new ValidationError('The xablau must be a boolean'),
    );
  });

  it('should not throw a validation error when the value pass on all rules', () => {
    expect.assertions(0);
    ValidatorRules.values('1234', 'field1234').required().string();
    ValidatorRules.values('1', 'field1').required().string().minLength(1);
    ValidatorRules.values('12345', 'field12345')
      .required()
      .string()
      .maxLength(5);
    ValidatorRules.values(true, 'fieldTrue').required().boolean();
    ValidatorRules.values(false, 'fieldFalse').required().boolean();
  });
});

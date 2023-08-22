import { CreateCategoryProperties } from '../entities/category';
import CategoryValidatorFactory, {
  CategoryRules,
  CategoryValidator
} from './category.validator';

describe('CategoryValidator Tests', () => {
  let validator: CategoryValidator;

  beforeEach(() => {
    validator = CategoryValidatorFactory.create();
  });

  it('should test invalid cases for name field', () => {
    let isValid = validator.validate(
      null as unknown as CreateCategoryProperties
    );
    expect(isValid).toBe(false);
    expect(validator.errors?.name).toEqual([
      'name should not be empty',
      'name must be a string',
      'name must be longer than or equal to 2 characters',
      'name must be shorter than or equal to 128 characters'
    ]);

    isValid = validator.validate({ name: '' });
    expect(isValid).toBe(false);
    expect(validator.errors?.name).toEqual([
      'name should not be empty',
      'name must be longer than or equal to 2 characters'
    ]);

    isValid = validator.validate({ name: 5 as unknown as string });
    expect(isValid).toBe(false);
    expect(validator.errors?.name).toEqual([
      'name must be a string',
      'name must be longer than or equal to 2 characters',
      'name must be shorter than or equal to 128 characters'
    ]);

    isValid = validator.validate({ name: 'n'.repeat(129) });
    expect(isValid).toBe(false);
    expect(validator.errors?.name).toEqual([
      'name must be shorter than or equal to 128 characters'
    ]);
  });

  it('should test valid cases for fields', () => {
    const arrange = [
      {
        name: 'value'
      },
      {
        name: 'value',
        description: undefined
      },
      {
        name: 'value',
        description: null
      },
      {
        name: 'value',
        isActive: false
      },
      {
        name: 'value',
        isActive: true
      },
      {
        name: 'v'.repeat(128)
      }
    ];

    arrange.forEach((item) => {
      expect(validator.validate(item)).toBe(true);
      expect(validator.validatedData).toEqual(new CategoryRules(item));
    });
  });
});

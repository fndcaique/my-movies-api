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
    expect({ validator, data: null }).containsErrorMessages({
      name: [
        'name should not be empty',
        'name must be a string',
        'name must be longer than or equal to 2 characters',
        'name must be shorter than or equal to 128 characters'
      ]
    });

    expect({ validator, data: { name: '' } }).containsErrorMessages({
      name: [
        'name should not be empty',
        'name must be longer than or equal to 2 characters'
      ]
    });

    expect({ validator, data: { name: 5 } }).containsErrorMessages({
      name: [
        'name must be a string',
        'name must be longer than or equal to 2 characters',
        'name must be shorter than or equal to 128 characters'
      ]
    });

    expect({
      validator,
      data: { name: 'n'.repeat(129) }
    }).containsErrorMessages({
      name: ['name must be shorter than or equal to 128 characters']
    });
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

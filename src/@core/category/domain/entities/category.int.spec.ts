import { EntityValidationError } from '@core/common/domain/errors/validation.error';
import { Category } from './category';

describe('Category Integration Tests', () => {
  describe('constructor method', () => {
    it('should throw a validation error when create a category with an invalid name property', () => {
      expect(() => {
        new Category({ name: null as unknown as string });
      }).containsErrorMessages({
        name: [
          'name should not be empty',
          'name must be a string',
          'name must be longer than or equal to 2 characters',
          'name must be shorter than or equal to 128 characters',
        ],
      });

      expect(() => {
        new Category({ name: undefined as unknown as string });
      }).toThrow(
        new EntityValidationError({
          name: [
            'name should not be empty',
            'name must be a string',
            'name must be longer than or equal to 2 characters',
            'name must be shorter than or equal to 128 characters',
          ],
        }),
      );

      expect(() => {
        new Category({ name: '' });
      }).containsErrorMessages({
        name: [
          'name should not be empty',
          'name must be longer than or equal to 2 characters',
        ],
      });

      expect(() => {
        new Category({ name: 0 as unknown as string });
      }).toThrow(
        new EntityValidationError({
          name: [
            'name must be a string',
            'name must be longer than or equal to 2 characters',
            'name must be shorter than or equal to 128 characters',
          ],
        }),
      );

      expect(() => {
        new Category({ name: '1' });
      }).toThrow(
        new EntityValidationError({
          name: ['name must be longer than or equal to 2 characters'],
        }),
      );

      expect(() => {
        new Category({ name: '*'.repeat(129) });
      }).toThrow(
        new EntityValidationError({
          name: ['name must be shorter than or equal to 128 characters'],
        }),
      );

      expect(() => {
        new Category({ name: 'asdf', description: 'a'.repeat(257) });
      }).containsErrorMessages({
        description: [
          'description must be shorter than or equal to 256 characters',
        ],
      });
    });

    it('should throw a validation error when create a category with an invalid description property', () => {
      expect(() => {
        new Category({ name: 'name', description: 0 as unknown as string });
      }).containsErrorMessages({
        description: [
          'description must be a string',
          'description must be shorter than or equal to 256 characters',
        ],
      });

      expect(() => {
        new Category({ name: 'name', description: [] as unknown as string });
      }).containsErrorMessages({
        description: [
          'description must be a string',
          'description must be shorter than or equal to 256 characters',
        ],
      });
    });

    it('should throw a validation error when create a category with an invalid isActive property', () => {
      expect(() => {
        new Category({ name: 'name', isActive: 'yes' as unknown as boolean });
      }).containsErrorMessages({
        isActive: ['isActive must be a boolean value'],
      });

      expect(() => {
        new Category({ name: 'name', isActive: '' as unknown as boolean });
      }).containsErrorMessages({
        isActive: ['isActive must be a boolean value'],
      });
    });

    it('should not throw any error when create a category with valid properties', () => {
      expect.assertions(0);
      new Category({ name: 'name' });
      new Category({ name: 'name', description: null });
      new Category({ name: 'name', description: 'd'.repeat(256) });
      new Category({
        name: 'name',
        description: 'description',
        isActive: true,
      });
      new Category({
        name: 'name',
        description: 'description',
        isActive: false,
      });
      new Category({ name: 'name', isActive: true });
      new Category({ name: 'name', isActive: false });
    });
  });

  describe('update method', () => {
    it('should throw a validation error when update a category with an invalid name or description params', () => {
      const category = new Category({
        name: 'Category1',
        description: 'The first category',
      });

      expect(() => {
        category.update(undefined as unknown as string);
      }).containsErrorMessages({
        name: [
          'name should not be empty',
          'name must be a string',
          'name must be longer than or equal to 2 characters',
          'name must be shorter than or equal to 128 characters',
        ],
      });

      expect(() => {
        category.update(null as unknown as string);
      }).containsErrorMessages({
        name: [
          'name should not be empty',
          'name must be a string',
          'name must be longer than or equal to 2 characters',
          'name must be shorter than or equal to 128 characters',
        ],
      });

      expect(() => {
        category.update('');
      }).containsErrorMessages({
        name: [
          'name should not be empty',
          'name must be longer than or equal to 2 characters',
        ],
      });

      expect(() => {
        category.update('C');
      }).containsErrorMessages({
        name: ['name must be longer than or equal to 2 characters'],
      });

      expect(() => {
        category.update('C'.repeat(129));
      }).containsErrorMessages({
        name: ['name must be shorter than or equal to 128 characters'],
      });
    });

    it('should not throw a validation error when update a category with valid name and description params', () => {
      const category = new Category({
        name: 'Category1',
        description: 'The first category',
      });

      expect(() => {
        category.update('Category 2', 'The best category');
      }).not.toThrow();

      expect(() => {
        category.update('C2');
      }).not.toThrow();

      expect(() => {
        category.update('a'.repeat(128));
      }).not.toThrow();

      expect(() => {
        category.update('Cc', '');
      }).not.toThrow();

      expect(() => {
        category.update('asdf', 'a'.repeat(256));
      }).not.toThrow();
    });

    it('should not throw any error when update a category with valid params', () => {
      expect.assertions(0);
      const category = new Category({ name: 'name' });

      category.update('name 2', 'd'.repeat(256));
      category.update('name 3', 'd');
      category.update('name 4');
      category.update('name 5', null);
    });
  });
});

/*
  describe('constructor method', () => {
    it('should throw a validation error when create a category with an invalid name property', () => {
      expect(() => {
        new Category({ name: null as unknown as string });
      }).toThrow(new ValidationError('The name is required'));

      expect(() => {
        new Category({ name: undefined as unknown as string });
      }).toThrow(new ValidationError('The name is required'));

      expect(() => {
        new Category({ name: '' });
      }).toThrow(new ValidationError('The name is required'));

      expect(() => {
        new Category({ name: 0 as unknown as string });
      }).toThrow(new ValidationError('The name must be a string'));

      expect(() => {
        new Category({ name: '1' });
      }).toThrow(
        new ValidationError('The name must have a minimum of 2 characters')
      );

      expect(() => {
        new Category({ name: '*'.repeat(129) });
      }).toThrow(
        new ValidationError('The name must have a maximum of 128 characters')
      );

      expect(() => {
        new Category({ name: 'asdf', description: 'a'.repeat(257) });
      }).toThrow(
        new ValidationError(
          'The description must have a maximum of 256 characters'
        )
      );
    });

    it('should throw a validation error when create a category with an invalid description property', () => {
      expect(() => {
        new Category({ name: 'name', description: 0 as unknown as string });
      }).toThrow(new ValidationError('The description must be a string'));

      expect(() => {
        new Category({ name: 'name', description: [] as unknown as string });
      }).toThrow(new ValidationError('The description must be a string'));
    });

    it('should throw a validation error when create a category with an invalid isActive property', () => {
      expect(() => {
        new Category({ name: 'name', isActive: 'yes' as unknown as boolean });
      }).toThrow(new ValidationError('The isActive must be a boolean'));

      expect(() => {
        new Category({ name: 'name', isActive: '' as unknown as boolean });
      }).toThrow(new ValidationError('The isActive must be a boolean'));
    });

    it('should not throw any error when create a category with valid properties', () => {
      expect.assertions(0);
      new Category({ name: 'name' });
      new Category({ name: 'name', description: null });
      new Category({ name: 'name', description: 'd'.repeat(256) });
      new Category({
        name: 'name',
        description: 'description',
        isActive: true
      });
      new Category({
        name: 'name',
        description: 'description',
        isActive: false
      });
      new Category({ name: 'name', isActive: true });
      new Category({ name: 'name', isActive: false });
    });
  });

  describe('update method', () => {
    it('should throw a validation error when update a category with an invalid name or description params', () => {
      const category = new Category({
        name: 'Category1',
        description: 'The first category'
      });

      expect(() => {
        category.update(undefined as unknown as string);
      }).toThrow(new ValidationError('The name is required'));

      expect(() => {
        category.update(null as unknown as string);
      }).toThrow(new ValidationError('The name is required'));

      expect(() => {
        category.update('');
      }).toThrow(new ValidationError('The name is required'));

      expect(() => {
        category.update('C');
      }).toThrow(
        new ValidationError('The name must have a minimum of 2 characters')
      );

      expect(() => {
        category.update('C'.repeat(129));
      }).toThrow(
        new ValidationError('The name must have a maximum of 128 characters')
      );
    });

    it('should not throw a validation error when update a category with valid name and description params', () => {
      const category = new Category({
        name: 'Category1',
        description: 'The first category'
      });

      expect(() => {
        category.update('Category 2', 'The best category');
      }).not.toThrow();

      expect(() => {
        category.update('C2');
      }).not.toThrow();

      expect(() => {
        category.update('a'.repeat(128));
      }).not.toThrow();

      expect(() => {
        category.update('Cc', '');
      }).not.toThrow();

      expect(() => {
        category.update('asdf', 'a'.repeat(256));
      }).not.toThrow();
    });

    it('should not throw any error when update a category with valid params', () => {
      expect.assertions(0);
      const category = new Category({ name: 'name' });

      category.update('name 2', 'd'.repeat(256));
      category.update('name 3', 'd');
      category.update('name 4');
      category.update('name 5', null);
    });
  });
*/

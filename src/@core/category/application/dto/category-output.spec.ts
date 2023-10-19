import { Category } from '../../domain/entities/category';
import { CategoryOuputMappper } from './category-output';

describe('CategoryOuputMapper Unit Tests', () => {
  it('should convert a category entity to category output', () => {
    const createdAt = new Date();
    const entity = new Category({
      name: 'Category1',
      description: 'Category description',
      isActive: true,
      createdAt,
    });
    const spyToJSON = jest.spyOn(entity, 'toJSON');
    const output = CategoryOuputMappper.toOutput(entity);
    expect(spyToJSON).toHaveBeenCalledTimes(1);
    expect(output).toEqual({
      id: entity.id,
      name: 'Category1',
      description: 'Category description',
      isActive: true,
      createdAt,
    });
  });
});
